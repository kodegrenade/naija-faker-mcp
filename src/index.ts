#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import faker from "@codegrenade/naija-faker";
import { readFile } from "node:fs/promises";

const server = new McpServer({
  name: "naija-faker-mcp",
  version: "1.0.0",
});

server.registerTool(
  "generate_person",
  {
    title: "Generates a fake person data using naija-faker tool",
    description:
      "Generates a fake person data. Accepts a string payload for the language of the person data and a string payload for the gender of the person data. The available languages are Hausa, Igbo and Yoruba. The accepted gender values are male and female. Returns the processed result as an object",
    inputSchema: {
      language: z
        .string()
        .optional()
        .describe(
          "The language of the person data. The available languages are Hausa, Igbo and Yoruba",
        ),
      gender: z
        .string()
        .optional()
        .describe(
          "The gender of the person data. The accepted gender values are male and female",
        ),
    },
  },
  async ({ language, gender }) => {
    try {
      const person = faker.person(
        language as "yoruba" | "igbo" | "hausa",
        gender as "male" | "female",
      );
      return {
        content: [{ type: "text", text: JSON.stringify(person, null, 2) }],
      };
    } catch (error) {
      return {
        content: [{ type: "text", text: `Error: ${error}` }],
        isError: true,
      };
    }
  },
);

server.registerTool(
  "generate_people",
  {
    title: "Generate a list of fake people using naija-faker tool",
    description:
      "Generates a list of fake people data. Accepts a number payload the number of persons to be generated as part of the people list. Returns the processed results as an array of object",
    inputSchema: {
      count: z
        .number()
        .optional()
        .describe(
          "The number of persons to be generated as part of the people list",
        ),
    },
  },
  async ({ count }) => {
    try {
      const people = faker.people(count);
      return {
        content: [{ type: "text", text: JSON.stringify(people, null, 2) }],
      };
    } catch (error) {
      return {
        content: [{ type: "text", text: `Error: ${error}` }],
        isError: true,
      };
    }
  },
);

server.registerTool(
  "generate_title",
  {
    title: "Generate a fake title using naija-faker tool",
    description:
      "Generates a fake title data. Accepts a string payload for the gender of the title data. The accepted gender values are male and female. Returns the processed result as a string",
    inputSchema: {
      gender: z
        .string()
        .optional()
        .describe(
          "The gender of the title data. The accepted gender values are male and female",
        ),
    },
  },
  async ({ gender }) => {
    try {
      const title = faker.title(gender as "male" | "female");
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

server.registerTool(
  "generate_name",
  {
    title: "Generate a fake name using naija-faker tool",
    description:
      "Generates a fake name data. Accepts a string payload for the language of the name data and a string payload for the gender of the name data. The available languages are Hausa, Igbo and Yoruba. The accepted gender values are male and female. Returns the processed result as a string",
    inputSchema: {
      language: z
        .string()
        .optional()
        .describe(
          "The language of the name data. The available languages are Hausa, Igbo and Yoruba",
        ),
      gender: z
        .string()
        .optional()
        .describe(
          "The gender of the name data. The accepted gender values are male and female",
        ),
    },
  },
  async ({ language, gender }) => {
    try {
      const name = faker.name(
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

server.registerTool(
  "generate_phone_number",
  {
    title: "Generate a fake phone number using naija-faker tool",
    description:
      "Generates a fake phone number. Accepts a string payload for the network of the preferred telco. The available networks are MTN, Glo, Airtel and 9mobile. Returns the processed result as a string",
    inputSchema: {
      network: z
        .string()
        .optional()
        .describe(
          "The network of the preferred telco. The available networks are MTN, Glo, Airtel and 9mobile",
        ),
    },
  },
  async ({ network }) => {
    try {
      const phone = faker.phoneNumber(
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

server.registerTool(
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
      const email = faker.email(name as string);
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

server.registerTool(
  "generate_address",
  {
    title: "Generate a fake address using naija-faker tool",
    description:
      "Generates a fake address data. Returns the processed result as a string",
  },
  async () => {
    try {
      const address = faker.address();
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

server.registerTool(
  "generate_bvn",
  {
    title: "Generate a fake bvn using naija-faker tool",
    description:
      "Generates a fake bvn data. Returns the processed result as a string",
  },
  async () => {
    try {
      const bvn = faker.bvn();
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

server.registerTool(
  "generate_nin",
  {
    title: "Generate a fake nin using naija-faker tool",
    description:
      "Generates a fake nin data. Returns the processed result as a string",
  },
  async () => {
    try {
      const nin = faker.nin();
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

server.registerTool(
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
      const vehicle = faker.vehicleRecord(state as string);
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

server.registerTool(
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
      const license = faker.licensePlate(state as string);
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

server.registerTool(
  "generate_company",
  {
    title: "Generate a fake company using naija-faker tool",
    description:
      "Generates a fake company data. Returns the processed result as an object",
  },
  async () => {
    try {
      const company = faker.company();
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

server.registerTool(
  "generate_university",
  {
    title: "Generate a fake university using naija-faker tool",
    description:
      "Generates a fake university data. Returns the processed result as an object",
  },
  async () => {
    try {
      const university = faker.university();
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

server.registerTool(
  "generate_education_record",
  {
    title: "Generate a fake education record using naija-faker tool",
    description:
      "Generates a fake education record data. Accept a payload of string for the language of the preferred education record. Returns the processed result as an object",
    inputSchema: {
      language: z
        .string()
        .optional()
        .describe(
          "The language of the education record. The available languages are Hausa, Igbo and Yoruba",
        ),
    },
  },
  async ({ language }) => {
    try {
      const educationRecord = faker.educationRecord(
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

server.registerTool(
  "generate_work_record",
  {
    title: "Generate a fake work record using naija-faker tool",
    description:
      "Generates a fake work record data. Returns the processed result as an object",
  },
  async () => {
    try {
      const workRecord = faker.workRecord();
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

server.registerTool(
  "generate_detailed_person",
  {
    title: "Generate a fake detailed person using naija-faker tool",
    description:
      "Generates a fake detailed person data. Accepts a payload of string for the language of the preferred detailed person and a string payload for the gender of the detailed person. Returns the processed result as an object",
    inputSchema: {
      language: z
        .string()
        .optional()
        .describe(
          "The language of the detailed person. The available languages are Hausa, Igbo and Yoruba",
        ),
      gender: z
        .string()
        .optional()
        .describe(
          "The gender of the detailed person. The accepted gender values are male and female",
        ),
    },
  },
  async ({ language, gender }) => {
    try {
      const detailedPerson = faker.detailedPerson(
        language as "hausa" | "igbo" | "yoruba",
        gender as "male" | "female",
      );
      return {
        content: [
          { type: "text", text: JSON.stringify(detailedPerson, null, 2) },
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

server.registerTool(
  "generate_detailed_people",
  {
    title: "Generate a fake detailed people using naija-faker tool",
    description:
      "Generates a fake detailed people data. Accepts a payload of string for the language of the preferred detailed people and a string payload for the gender of the detailed people. Returns the processed result as an object",
    inputSchema: {
      language: z
        .string()
        .optional()
        .describe(
          "The language of the detailed people. The available languages are Hausa, Igbo and Yoruba",
        ),
      gender: z
        .string()
        .optional()
        .describe(
          "The gender of the detailed people. The accepted gender values are male and female",
        ),
      count: z
        .number()
        .optional()
        .describe("The number of detailed people to generate"),
    },
  },
  async ({ language, gender, count }) => {
    try {
      const detailedPeople = faker.detailedPeople(
        (count as number) || 1,
        language as "hausa" | "igbo" | "yoruba",
        gender as "male" | "female",
      );
      return {
        content: [
          { type: "text", text: JSON.stringify(detailedPeople, null, 2) },
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

server.registerTool(
  "generate_date_of_birth",
  {
    title: "Generate a fake date of birth using naija-faker tool",
    description:
      "Generates a fake date of birth data. Returns the processed result as an object",
    inputSchema: {
      minAge: z
        .number()
        .optional()
        .describe("The minimum age of the date of birth"),
      maxAge: z
        .number()
        .optional()
        .describe("The maximum age of the date of birth"),
    },
  },
  async ({ minAge, maxAge }) => {
    try {
      const dateOfBirth = faker.dateOfBirth({
        minAge: (minAge as number) || 1,
        maxAge: (maxAge as number) || 100,
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

server.registerTool(
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

server.registerTool(
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

server.registerTool(
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

server.registerTool(
  "generate_salary",
  {
    title: "Generate a fake salary using naija-faker tool",
    description:
      "Generates a fake salary data. Returns the processed result as a string",
    inputSchema: {
      level: z
        .string()
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

server.registerTool(
  "generate_next_of_kin",
  {
    title: "Generate a fake next of kin using naija-faker tool",
    description:
      "Generates a fake next of kin data. Accepts a payload of string for the language of the preferred next of kin and a string payload for the gender of the next of kin. Returns the processed result as an object",
    inputSchema: {
      language: z
        .string()
        .optional()
        .describe(
          "The language of the next of kin. The available languages are Hausa, Igbo and Yoruba",
        ),
      gender: z
        .string()
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

server.registerTool(
  "generate_states",
  {
    title: "Generate a list of states using naija-faker tool",
    description:
      "Generates a list of states data. Returns the processed result as an array",
  },
  async () => {
    try {
      const states = faker.states();
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

server.registerTool(
  "generate_lgas",
  {
    title: "Generate a list of LGAs using naija-faker tool",
    description:
      "Generates a list of LGAs data. Returns the processed result as an array",
  },
  async () => {
    try {
      const lgas = faker.lgas();
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

server.registerTool(
  "genereate_bank_account",
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

server.registerTool(
  "generate_consistent_person",
  {
    title: "Generate a consistent fake person using naija-faker tool",
    description:
      "Generates a consistent fake person data where name ethincity, address, state and LGA are all geographically coherent. Accepts a string payload for the language of the person data and a string payload for the gender of the person data. Returns the processed result as an object",
    inputSchema: {
      language: z
        .string()
        .optional()
        .describe(
          "The language of the person data. The available languages are Hausa, Igbo and Yoruba",
        ),
      gender: z
        .string()
        .optional()
        .describe(
          "The gender of the person data. The accepted gender values are male and female",
        ),
    },
  },
  async ({ language, gender }) => {
    try {
      const consistentPerson = faker.consistentPerson(
        language as "hausa" | "igbo" | "yoruba",
        gender as "male" | "female",
      );
      return {
        content: [
          { type: "text", text: JSON.stringify(consistentPerson, null, 2) },
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

server.registerTool(
  "generate_consistent_people",
  {
    title: "Generate a list of consistent fake people using naija-faker tool",
    description:
      "Generates a list of consistent fake people data where name ethincity, address, state and LGA are all geographically coherent. Accepts a string payload for the language of the person data and a string payload for the gender of the person data. Returns the processed result as an array",
    inputSchema: {
      language: z
        .string()
        .optional()
        .describe(
          "The language of the person data. The available languages are Hausa, Igbo and Yoruba",
        ),
      gender: z
        .string()
        .optional()
        .describe(
          "The gender of the person data. The accepted gender values are male and female",
        ),
      count: z.number().optional().describe("The number of people to generate"),
    },
  },
  async ({ count, language, gender }) => {
    try {
      const consistentPeople = faker.consistentPeople(
        count as number,
        language as "hausa" | "igbo" | "yoruba",
        gender as "male" | "female",
      );
      return {
        content: [
          { type: "text", text: JSON.stringify(consistentPeople, null, 2) },
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

server.registerResource(
  "package-docs",
  "https://github.com/kodegrenade/naija-faker/blob/main/readme.md",
  {
    title: "Package documentation",
    description: "Package documentation",
  },
  async (uri) => ({
    contents: [
      {
        uri: uri.toString(),
        text: await readFile("readme.md", "utf8"),
      },
    ],
  }),
);

server.registerPrompt(
  "generate_person",
  {
    title: "Generates a fake person data using naija-faker tool",
    description: "Generates a fake person data using naija-faker tool",
    argsSchema: {
      language: z
        .string()
        .describe(
          "The language of the person data. The available languages are Hausa, Igbo and Yoruba",
        ),
      gender: z
        .string()
        .describe(
          "The gender of the person data. The accepted gender values are male and female",
        ),
    },
  },
  ({ language, gender }) => ({
    messages: [
      {
        role: "user",
        content: {
          type: "text",
          text: `Generate a fake ${language} ${gender} person. Return a JSON object of the person data`,
        },
      },
    ],
  }),
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("MCP server running on stdio");
}

main().catch(console.error);
