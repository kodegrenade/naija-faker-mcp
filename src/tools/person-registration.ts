import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import {
  consistentPersonListOutputSchema,
  consistentPersonOutputSchema,
  countSchema,
  detailedPersonListOutputSchema,
  detailedPersonOutputSchema,
  genderSchema,
  languageSchema,
  personListOutputSchema,
  personOutputSchema,
} from "../contracts.js";
import { createGeneratorRegistrar } from "../registration.js";
import {
  generateConsistentPeople,
  generateConsistentPerson,
  generateDetailedPeople,
  generateDetailedPerson,
  generatePeople,
  generatePerson,
} from "./person.js";

const language = languageSchema.optional();
const gender = genderSchema.optional();

export function registerPersonTools(server: McpServer) {
  const registerGenerator = createGeneratorRegistrar(server);

  registerGenerator(
    "generate_person",
    {
      title: "Generate a fake person",
      description:
        "Generates one basic composite person record with identity and contact fields. Use atomic tools when you need only one attribute. Accepts optional language (hausa, igbo, or yoruba) and gender (male or female). Returns one synthetic object.",
      inputSchema: {
        language: language.describe("The person's language"),
        gender: gender.describe("The person's gender"),
      },
      outputSchema: personOutputSchema,
    },
    async ({ language, gender }) => {
      try {
        const person = generatePerson(language, gender);
        return {
          content: [{ type: "text", text: JSON.stringify(person, null, 2) }],
          structuredContent: { ...person },
        };
      } catch (error) {
        return {
          content: [{ type: "text", text: `Error: ${error}` }],
          isError: true,
        };
      }
    },
  );

  registerGenerator(
    "generate_people",
    {
      title: "Generate fake people",
      description:
        "Generates an array of basic composite synthetic person records. Accepts an optional positive count and returns 10 records by default.",
      inputSchema: {
        count: countSchema
          .optional()
          .describe("The number of people to generate"),
      },
      outputSchema: personListOutputSchema,
    },
    async ({ count }) => {
      try {
        const people = generatePeople(count);
        return {
          content: [{ type: "text", text: JSON.stringify(people, null, 2) }],
          structuredContent: { items: people },
        };
      } catch (error) {
        return {
          content: [{ type: "text", text: `Error: ${error}` }],
          isError: true,
        };
      }
    },
  );

  registerGenerator(
    "generate_consistent_person",
    {
      title: "Generate a geographically consistent person",
      description:
        "Generates one synthetic person whose identity, address, state, and LGA are geographically coherent. Accepts optional language and gender.",
      inputSchema: {
        language: language.describe("The person's language"),
        gender: gender.describe("The person's gender"),
      },
      outputSchema: consistentPersonOutputSchema,
    },
    async ({ language, gender }) => {
      try {
        const person = generateConsistentPerson(language, gender);
        return {
          content: [{ type: "text", text: JSON.stringify(person, null, 2) }],
          structuredContent: { ...person },
        };
      } catch (error) {
        return {
          content: [{ type: "text", text: `Error: ${error}` }],
          isError: true,
        };
      }
    },
  );

  registerGenerator(
    "generate_consistent_people",
    {
      title: "Generate geographically consistent people",
      description:
        "Generates an array of synthetic people with geographically coherent identity, address, state, and LGA fields. Accepts an optional positive count and returns 10 records by default.",
      inputSchema: {
        language: language.describe("The person's language"),
        gender: gender.describe("The person's gender"),
        count: countSchema
          .optional()
          .describe("The number of people to generate"),
      },
      outputSchema: consistentPersonListOutputSchema,
    },
    async ({ count, language, gender }) => {
      try {
        const people = generateConsistentPeople(count, language, gender);
        return {
          content: [{ type: "text", text: JSON.stringify(people, null, 2) }],
          structuredContent: { items: people },
        };
      } catch (error) {
        return {
          content: [{ type: "text", text: `Error: ${error}` }],
          isError: true,
        };
      }
    },
  );

  registerGenerator(
    "generate_detailed_person",
    {
      title: "Generate a detailed person",
      description:
        "Generates one synthetic detailed person, including geographically consistent identity data plus health, financial, kin, education, work, and vehicle records. Accepts optional language and gender.",
      inputSchema: {
        language: language.describe("The person's language"),
        gender: gender.describe("The person's gender"),
      },
      outputSchema: detailedPersonOutputSchema,
    },
    async ({ language, gender }) => {
      try {
        const person = generateDetailedPerson(language, gender);
        return {
          content: [{ type: "text", text: JSON.stringify(person, null, 2) }],
          structuredContent: { ...person },
        };
      } catch (error) {
        return {
          content: [{ type: "text", text: `Error: ${error}` }],
          isError: true,
        };
      }
    },
  );

  registerGenerator(
    "generate_detailed_people",
    {
      title: "Generate detailed people",
      description:
        "Generates an array of synthetic detailed people. Each record includes geographically consistent identity data plus health, financial, kin, education, work, and vehicle records. Returns one record by default.",
      inputSchema: {
        language: language.describe("The person's language"),
        gender: gender.describe("The person's gender"),
        count: countSchema
          .optional()
          .describe("The number of people to generate"),
      },
      outputSchema: detailedPersonListOutputSchema,
    },
    async ({ language, gender, count }) => {
      try {
        const people = generateDetailedPeople(count ?? 1, language, gender);
        return {
          content: [{ type: "text", text: JSON.stringify(people, null, 2) }],
          structuredContent: { items: people },
        };
      } catch (error) {
        return {
          content: [{ type: "text", text: `Error: ${error}` }],
          isError: true,
        };
      }
    },
  );
}
