#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import faker from "@codegrenade/naija-faker";
import {
  ageSchema,
  consistentPersonListOutputSchema,
  consistentPersonOutputSchema,
  countSchema,
  detailedPersonListOutputSchema,
  detailedPersonOutputSchema,
  genderSchema,
  languageSchema,
  networkSchema,
  personListOutputSchema,
  personOutputSchema,
  salaryLevelSchema,
} from "./contracts.js";
import { createGeneratorRegistrar } from "./registration.js";
import { registerPackageDocsResource } from "./resources.js";
import { registerPersonPrompt } from "./prompts.js";
import {
  generateConsistentPeople,
  generateConsistentPerson,
  generateDetailedPeople,
  generateDetailedPerson,
  generatePeople,
  generatePerson,
} from "./tools/person.js";
import {
  generateAddress,
  generateBvn,
  generateEmail,
  generateName,
  generateNin,
  generatePhoneNumber,
  generateTitle,
} from "./tools/identity.js";
import {
  generateCompany,
  generateEducationRecord,
  generateLicensePlate,
  generateLgas,
  generateStates,
  generateUniversity,
  generateVehicleRecord,
  generateWorkRecord,
} from "./tools/records.js";

const server = new McpServer({
  name: "Naija Faker Library",
  version: "1.0.1",
});
const registerGenerator = createGeneratorRegistrar(server);

registerGenerator(
  "generate_person",
  {
    title: "Generates a fake person data using naija-faker tool",
    description:
      "Generates one basic composite person record with title, firstName, lastName, fullName, email, phone, and address. Use the atomic person tools such as generate_name, generate_email, or generate_address when you need only one attribute. Accepts optional language (hausa, igbo, or yoruba) and gender (male or female). Returns one object.",
    inputSchema: {
      language: languageSchema
        .optional()
        .describe(
          "The language of the person data. Accepted values are hausa, igbo, and yoruba",
        ),
      gender: genderSchema
        .optional()
        .describe(
          "The gender of the person data. The accepted gender values are male and female",
        ),
    },
    outputSchema: personOutputSchema,
  },
  async ({ language, gender }) => {
    try {
      const person = generatePerson(
        language as "yoruba" | "igbo" | "hausa",
        gender as "male" | "female",
      );
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
    title: "Generate a list of fake people using naija-faker tool",
    description:
      "Generates an array of basic composite person records. Each record contains title, firstName, lastName, fullName, email, phone, and address; use the atomic person tools for individual attributes. Accepts an optional count and returns an array of objects (10 by default).",
    inputSchema: {
      count: countSchema
        .optional()
        .describe(
          "The number of persons to be generated as part of the people list",
        ),
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
  "generate_title",
  {
    title: "Generate a fake title using naija-faker tool",
    description:
      "Generates a fake title data. Accepts a string payload for the gender of the title data. The accepted gender values are male and female. Returns the processed result as a string",
    inputSchema: {
      gender: genderSchema
        .optional()
        .describe(
          "The gender of the title data. The accepted gender values are male and female",
        ),
    },
  },
  async ({ gender }) => {
    try {
      const title = generateTitle(gender as "male" | "female");
      return {
        content: [{ type: "text", text: title }],
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
  "generate_name",
  {
    title: "Generate a fake name using naija-faker tool",
    description:
      "Generates a fake name data. Accepts a string payload for the language of the name data and a string payload for the gender of the name data. The available languages are Hausa, Igbo and Yoruba. The accepted gender values are male and female. Returns the processed result as a string",
    inputSchema: {
      language: languageSchema
        .optional()
        .describe(
          "The language of the name data. Accepted values are hausa, igbo, and yoruba",
        ),
      gender: genderSchema
        .optional()
        .describe(
          "The gender of the name data. The accepted gender values are male and female",
        ),
    },
  },
  async ({ language, gender }) => {
    try {
      const name = generateName(
        language as "yoruba" | "igbo" | "hausa",
        gender as "male" | "female",
      );
      return {
        content: [{ type: "text", text: name }],
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
  "generate_phone_number",
  {
    title: "Generate a fake phone number using naija-faker tool",
    description:
      "Generates a fake phone number. Accepts a string payload for the network of the preferred telco. The available networks are MTN, Glo, Airtel and 9mobile. Returns the processed result as a string",
    inputSchema: {
      network: networkSchema
        .optional()
        .describe(
          "The network of the preferred telco. The available networks are MTN, Glo, Airtel and 9mobile",
        ),
    },
  },
  async ({ network }) => {
    try {
      const phone = generatePhoneNumber(
        network as "mtn" | "glo" | "airtel" | "9mobile",
      );
      return {
        content: [{ type: "text", text: phone }],
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
  "generate_email",
  {
    title: "Generate a fake email using naija-faker tool",
    description:
      "Generates a fake email data. Accepts a string payload for the name of the email data. Returns the processed result as a string",
    inputSchema: {
      name: z.string().optional().describe("The name of the email data"),
    },
  },
  async ({ name }) => {
    try {
      const email = generateEmail(name as string);
      return {
        content: [{ type: "text", text: email }],
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
  "generate_address",
  {
    title: "Generate a fake address using naija-faker tool",
    description:
      "Generates a fake address data. Returns the processed result as a string",
  },
  async () => {
    try {
      const address = generateAddress();
      return {
        content: [{ type: "text", text: address }],
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
  "generate_bvn",
  {
    title: "Generate a fake bvn using naija-faker tool",
    description:
      "Generates a fake bvn data. Returns the processed result as a string",
  },
  async () => {
    try {
      const bvn = generateBvn();
      return {
        content: [{ type: "text", text: bvn }],
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
  "generate_nin",
  {
    title: "Generate a fake nin using naija-faker tool",
    description:
      "Generates a fake nin data. Returns the processed result as a string",
  },
  async () => {
    try {
      const nin = generateNin();
      return {
        content: [{ type: "text", text: nin }],
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
  "generate_vehicle_record",
  {
    title: "Generate a fake vehicle record using naija-faker tool",
    description:
      "Generates a fake vehicle record data. Accept a payload of string for the state of the preferred vehicle. Returns the processed result as an object",
    inputSchema: {
      state: z
        .string()
        .optional()
        .describe("The state of the preferred vehicle"),
    },
  },
  async ({ state }) => {
    try {
      const vehicle = generateVehicleRecord(state as string);
      return {
        content: [{ type: "text", text: JSON.stringify(vehicle, null, 2) }],
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
  "generate_license_plate",
  {
    title: "Generate a fake license plate using naija-faker tool",
    description:
      "Generates a fake license plate data. Accept a payload of string for the state of the preferred license plate. Returns the processed result as a string",
    inputSchema: {
      state: z
        .string()
        .optional()
        .describe("The state of the preferred license plate"),
    },
  },
  async ({ state }) => {
    try {
      const license = generateLicensePlate(state as string);
      return {
        content: [{ type: "text", text: license }],
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
  "generate_company",
  {
    title: "Generate a fake company using naija-faker tool",
    description:
      "Generates a fake company data. Returns the processed result as an object",
  },
  async () => {
    try {
      const company = generateCompany();
      return {
        content: [{ type: "text", text: JSON.stringify(company, null, 2) }],
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
  "generate_university",
  {
    title: "Generate a fake university using naija-faker tool",
    description:
      "Generates a fake university data. Returns the processed result as an object",
  },
  async () => {
    try {
      const university = generateUniversity();
      return {
        content: [{ type: "text", text: JSON.stringify(university, null, 2) }],
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
  "generate_education_record",
  {
    title: "Generate a fake education record using naija-faker tool",
    description:
      "Generates a fake education record data. Accept a payload of string for the language of the preferred education record. Returns the processed result as an object",
    inputSchema: {
      language: languageSchema
        .optional()
        .describe(
          "The language of the education record. Accepted values are hausa, igbo, and yoruba",
        ),
    },
  },
  async ({ language }) => {
    try {
      const educationRecord = generateEducationRecord(
        language as "hausa" | "igbo" | "yoruba",
      );
      return {
        content: [
          { type: "text", text: JSON.stringify(educationRecord, null, 2) },
        ],
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
  "generate_work_record",
  {
    title: "Generate a fake work record using naija-faker tool",
    description:
      "Generates a fake work record data. Returns the processed result as an object",
  },
  async () => {
    try {
      const workRecord = generateWorkRecord();
      return {
        content: [{ type: "text", text: JSON.stringify(workRecord, null, 2) }],
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
    title: "Generate a fake detailed person using naija-faker tool",
    description:
      "Generates one detailed composite person record. It includes all fields from generate_consistent_person, plus dateOfBirth, maritalStatus, bloodGroup, genotype, salary, nextOfKin, education, work, and vehicle. Use the atomic person tools when you need only one attribute. Accepts optional language (hausa, igbo, or yoruba) and gender (male or female). Returns one object.",
    inputSchema: {
      language: languageSchema
        .optional()
        .describe(
          "The language of the detailed person. Accepted values are hausa, igbo, and yoruba",
        ),
      gender: genderSchema
        .optional()
        .describe(
          "The gender of the detailed person. The accepted gender values are male and female",
        ),
    },
    outputSchema: detailedPersonOutputSchema,
  },
  async ({ language, gender }) => {
    try {
      const detailedPerson = generateDetailedPerson(
        language as "hausa" | "igbo" | "yoruba",
        gender as "male" | "female",
      );
      return {
        content: [
          { type: "text", text: JSON.stringify(detailedPerson, null, 2) },
        ],
        structuredContent: { ...detailedPerson },
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
    title: "Generate a fake detailed people using naija-faker tool",
    description:
      "Generates an array of detailed composite person records. Each record includes all fields from generate_consistent_person, plus dateOfBirth, maritalStatus, bloodGroup, genotype, salary, nextOfKin, education, work, and vehicle. Use the atomic person tools when you need only one attribute. Accepts optional language (hausa, igbo, or yoruba), gender (male or female), and count. Returns an array of objects (1 by default).",
    inputSchema: {
      language: languageSchema
        .optional()
        .describe(
          "The language of the detailed people. Accepted values are hausa, igbo, and yoruba",
        ),
      gender: genderSchema
        .optional()
        .describe(
          "The gender of the detailed people. The accepted gender values are male and female",
        ),
      count: countSchema
        .optional()
        .describe("The number of detailed people to generate"),
    },
    outputSchema: detailedPersonListOutputSchema,
  },
  async ({ language, gender, count }) => {
    try {
      const detailedPeople = generateDetailedPeople(
        count ?? 1,
        language as "hausa" | "igbo" | "yoruba",
        gender as "male" | "female",
      );
      return {
        content: [
          { type: "text", text: JSON.stringify(detailedPeople, null, 2) },
        ],
        structuredContent: { items: detailedPeople },
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
  "generate_date_of_birth",
  {
    title: "Generate a fake date of birth using naija-faker tool",
    description:
      "Generates a fake date of birth data. Returns the processed result as an object",
    inputSchema: {
      minAge: ageSchema
        .optional()
        .describe("The minimum age of the date of birth"),
      maxAge: ageSchema
        .optional()
        .describe("The maximum age of the date of birth"),
    },
  },
  async ({ minAge, maxAge }) => {
    try {
      const dateOfBirth = faker.dateOfBirth({
        minAge: minAge ?? 1,
        maxAge: maxAge ?? 100,
      });
      return {
        content: [{ type: "text", text: JSON.stringify(dateOfBirth, null, 2) }],
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
  "generate_marital_status",
  {
    title: "Generate a fake marital status using naija-faker tool",
    description:
      "Generates a fake marital status data. Returns the processed result as a string",
  },
  async () => {
    try {
      const maritalStatus = faker.maritalStatus();
      return {
        content: [{ type: "text", text: maritalStatus }],
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
  "generate_blood_group",
  {
    title: "Generate a fake blood group using naija-faker tool",
    description:
      "Generates a fake blood group data. Returns the processed result as a string",
  },
  async () => {
    try {
      const bloodGroup = faker.bloodGroup();
      return {
        content: [{ type: "text", text: bloodGroup }],
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
  "generate_genotype",
  {
    title: "Generate a fake genotype using naija-faker tool",
    description:
      "Generates a fake genotype data. Returns the processed result as a string",
  },
  async () => {
    try {
      const genotype = faker.genotype();
      return {
        content: [{ type: "text", text: genotype }],
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
  "generate_salary",
  {
    title: "Generate a fake salary using naija-faker tool",
    description:
      "Generates a fake salary record. Returns an object containing amount, currency, level, and frequency.",
    inputSchema: {
      level: salaryLevelSchema
        .optional()
        .describe(
          "The level of the salary. The accepted level values are entry, mid, executive and senior",
        ),
    },
  },
  async ({ level }) => {
    try {
      const salary = faker.salary({
        level: level as "entry" | "mid" | "executive" | "senior",
      });
      return {
        content: [{ type: "text", text: JSON.stringify(salary, null, 2) }],
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
  "generate_next_of_kin",
  {
    title: "Generate a fake next of kin using naija-faker tool",
    description:
      "Generates a fake next of kin data. Accepts a payload of string for the language of the preferred next of kin and a string payload for the gender of the next of kin. Returns the processed result as an object",
    inputSchema: {
      language: languageSchema
        .optional()
        .describe(
          "The language of the next of kin. Accepted values are hausa, igbo, and yoruba",
        ),
      gender: genderSchema
        .optional()
        .describe(
          "The gender of the next of kin. The accepted gender values are male and female",
        ),
    },
  },
  async ({ language, gender }) => {
    try {
      const nextOfKin = faker.nextOfKin(
        language as "hausa" | "igbo" | "yoruba",
        gender as "male" | "female",
      );
      return {
        content: [{ type: "text", text: JSON.stringify(nextOfKin, null, 2) }],
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
  "generate_states",
  {
    title: "Generate a list of states using naija-faker tool",
    description:
      "Generates a list of states data. Returns the processed result as an array",
  },
  async () => {
    try {
      const states = generateStates();
      return {
        content: [{ type: "text", text: JSON.stringify(states, null, 2) }],
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
  "generate_lgas",
  {
    title: "Generate a list of LGAs using naija-faker tool",
    description:
      "Generates a list of LGAs data. Returns the processed result as an array",
  },
  async () => {
    try {
      const lgas = generateLgas();
      return {
        content: [{ type: "text", text: JSON.stringify(lgas, null, 2) }],
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
  "generate_bank_account",
  {
    title: "Generate a fake bank account using naija-faker tool",
    description:
      "Generates a fake bank account data. Accepts a string payload for the bank name. Returns the processed result as an object",
    inputSchema: {
      bankName: z.string().optional().describe("The name of the bank"),
    },
  },
  async ({ bankName }) => {
    try {
      const bankAccount = faker.bankAccount(bankName as string);
      return {
        content: [{ type: "text", text: JSON.stringify(bankAccount, null, 2) }],
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
    title: "Generate a consistent fake person using naija-faker tool",
    description:
      "Generates one geographically consistent composite person record. It includes all fields from generate_person, plus state and lga whose values are coherent with the person's name ethnicity and address. Use generate_person for a basic record or the atomic person tools for individual attributes. Accepts optional language (hausa, igbo, or yoruba) and gender (male or female). Returns one object.",
    inputSchema: {
      language: languageSchema
        .optional()
        .describe(
          "The language of the person data. Accepted values are hausa, igbo, and yoruba",
        ),
      gender: genderSchema
        .optional()
        .describe(
          "The gender of the person data. The accepted gender values are male and female",
        ),
    },
    outputSchema: consistentPersonOutputSchema,
  },
  async ({ language, gender }) => {
    try {
      const consistentPerson = generateConsistentPerson(
        language as "hausa" | "igbo" | "yoruba",
        gender as "male" | "female",
      );
      return {
        content: [
          { type: "text", text: JSON.stringify(consistentPerson, null, 2) },
        ],
        structuredContent: { ...consistentPerson },
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
    title: "Generate a list of consistent fake people using naija-faker tool",
    description:
      "Generates an array of geographically consistent composite person records. Each record includes all fields from generate_person, plus state and lga whose values are coherent with the person's name ethnicity and address. Use generate_person for basic records or the atomic person tools for individual attributes. Accepts optional language (hausa, igbo, or yoruba), gender (male or female), and count. Returns an array of objects (10 by default).",
    inputSchema: {
      language: languageSchema
        .optional()
        .describe(
          "The language of the person data. Accepted values are hausa, igbo, and yoruba",
        ),
      gender: genderSchema
        .optional()
        .describe(
          "The gender of the person data. The accepted gender values are male and female",
        ),
      count: countSchema
        .optional()
        .describe("The number of people to generate"),
    },
    outputSchema: consistentPersonListOutputSchema,
  },
  async ({ count, language, gender }) => {
    try {
      const consistentPeople = generateConsistentPeople(
        count as number,
        language as "hausa" | "igbo" | "yoruba",
        gender as "male" | "female",
      );
      return {
        content: [
          { type: "text", text: JSON.stringify(consistentPeople, null, 2) },
        ],
        structuredContent: { items: consistentPeople },
      };
    } catch (error) {
      return {
        content: [{ type: "text", text: `Error: ${error}` }],
        isError: true,
      };
    }
  },
);

registerPackageDocsResource(server);
registerPersonPrompt(server);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Naija Faker MCP server running on stdio");
}

main().catch(console.error);
