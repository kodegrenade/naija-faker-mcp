import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import {
  ageSchema,
  consistentPersonListOutputSchema,
  consistentPersonOutputSchema,
  countSchema,
  detailedPersonListOutputSchema,
  detailedPersonOutputSchema,
  genderSchema,
  languageSchema,
  personListOutputSchema,
  personOutputSchema,
  seedSchema,
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
const seed = seedSchema
  .optional()
  .describe(
    "Seed for reproducible output; the same seed returns the same record",
  );
const minAge = ageSchema.optional().describe("Youngest age to generate");
const maxAge = ageSchema.optional().describe("Oldest age to generate");

// An explicit {minAge: undefined} is not the same as omitting the argument:
// the library defaults to 22-65 only when no range object is passed at all.
const ageRange = (minAge?: number, maxAge?: number) =>
  minAge === undefined && maxAge === undefined ? undefined : { minAge, maxAge };

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
        seed,
      },
      outputSchema: personOutputSchema,
    },
    async ({ language, gender }) => {
      const person = generatePerson(language, gender);
      return {
        content: [{ type: "text", text: JSON.stringify(person, null, 2) }],
        structuredContent: { ...person },
      };
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
        seed,
      },
      outputSchema: personListOutputSchema,
    },
    async ({ count }) => {
      const people = generatePeople(count);
      return {
        content: [{ type: "text", text: JSON.stringify(people, null, 2) }],
        structuredContent: { items: people },
      };
    },
  );

  registerGenerator(
    "generate_consistent_person",
    {
      title: "Generate a geographically consistent person",
      description:
        "Generates one synthetic person whose identity, address, state, and LGA are geographically coherent. The title is filtered to match the ethnic group. Also returns the language and region the record was drawn from. Accepts optional language and gender.",
      inputSchema: {
        language: language.describe("The person's language"),
        gender: gender.describe("The person's gender"),
        seed,
      },
      outputSchema: consistentPersonOutputSchema,
    },
    async ({ language, gender }) => {
      const person = generateConsistentPerson(language, gender);
      return {
        content: [{ type: "text", text: JSON.stringify(person, null, 2) }],
        structuredContent: { ...person },
      };
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
        seed,
      },
      outputSchema: consistentPersonListOutputSchema,
    },
    async ({ count, language, gender }) => {
      const people = generateConsistentPeople(count, language, gender);
      return {
        content: [{ type: "text", text: JSON.stringify(people, null, 2) }],
        structuredContent: { items: people },
      };
    },
  );

  registerGenerator(
    "generate_detailed_person",
    {
      title: "Generate a detailed person",
      description:
        "Generates one synthetic detailed person, including geographically consistent identity data plus health, financial, kin, education, work, and vehicle records. Every field is derived from one identity, so graduation follows birth and employment follows graduation. Defaults to ages 22-65; widen the range with minAge and maxAge, and education is null for anyone too young to have finished a qualification.",
      inputSchema: {
        language: language.describe("The person's language"),
        gender: gender.describe("The person's gender"),
        minAge,
        maxAge,
        seed,
      },
      outputSchema: detailedPersonOutputSchema,
    },
    async ({ language, gender, minAge, maxAge }) => {
      const person = generateDetailedPerson(
        language,
        gender,
        ageRange(minAge, maxAge),
      );
      return {
        content: [{ type: "text", text: JSON.stringify(person, null, 2) }],
        structuredContent: { ...person },
      };
    },
  );

  registerGenerator(
    "generate_detailed_people",
    {
      title: "Generate detailed people",
      description:
        "Generates an array of synthetic detailed people. Each record includes geographically consistent identity data plus health, financial, kin, education, work, and vehicle records. Returns one record by default. Defaults to ages 22-65; widen the range with minAge and maxAge.",
      inputSchema: {
        language: language.describe("The person's language"),
        gender: gender.describe("The person's gender"),
        count: countSchema
          .optional()
          .describe("The number of people to generate"),
        minAge,
        maxAge,
        seed,
      },
      outputSchema: detailedPersonListOutputSchema,
    },
    async ({ language, gender, count, minAge, maxAge }) => {
      const people = generateDetailedPeople(
        count ?? 1,
        language,
        gender,
        ageRange(minAge, maxAge),
      );
      return {
        content: [{ type: "text", text: JSON.stringify(people, null, 2) }],
        structuredContent: { items: people },
      };
    },
  );
}
