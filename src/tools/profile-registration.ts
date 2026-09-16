import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import {
  ageSchema,
  genderSchema,
  languageSchema,
  salaryLevelSchema,
} from "../contracts.js";
import { createGeneratorRegistrar } from "../registration.js";
import {
  generateBankAccount,
  generateBloodGroup,
  generateDateOfBirth,
  generateGenotype,
  generateMaritalStatus,
  generateNextOfKin,
  generateSalary,
} from "./profile.js";

export function registerProfileTools(server: McpServer) {
  const register = createGeneratorRegistrar(server);
  register(
    "generate_date_of_birth",
    {
      title: "Generate a date of birth",
      description: "Generates a synthetic date of birth and age.",
      inputSchema: {
        minAge: ageSchema.optional(),
        maxAge: ageSchema.optional(),
      },
    },
    async ({ minAge, maxAge }) => ({
      content: [
        {
          type: "text",
          text: JSON.stringify(
            generateDateOfBirth(minAge ?? 1, maxAge ?? 100),
            null,
            2,
          ),
        },
      ],
    }),
  );
  register(
    "generate_marital_status",
    {
      title: "Generate marital status",
      description: "Generates a synthetic marital status.",
    },
    async () => ({
      content: [{ type: "text", text: generateMaritalStatus() }],
    }),
  );
  register(
    "generate_blood_group",
    {
      title: "Generate blood group",
      description: "Generates a synthetic blood group.",
    },
    async () => ({ content: [{ type: "text", text: generateBloodGroup() }] }),
  );
  register(
    "generate_genotype",
    {
      title: "Generate genotype",
      description: "Generates a synthetic genotype.",
    },
    async () => ({ content: [{ type: "text", text: generateGenotype() }] }),
  );
  register(
    "generate_salary",
    {
      title: "Generate a salary record",
      description: "Generates a synthetic salary record.",
      inputSchema: { level: salaryLevelSchema.optional() },
    },
    async ({ level }) => ({
      content: [
        { type: "text", text: JSON.stringify(generateSalary(level), null, 2) },
      ],
    }),
  );
  register(
    "generate_next_of_kin",
    {
      title: "Generate next of kin",
      description: "Generates a synthetic next-of-kin record.",
      inputSchema: {
        language: languageSchema.optional(),
        gender: genderSchema.optional(),
      },
    },
    async ({ language, gender }) => ({
      content: [
        {
          type: "text",
          text: JSON.stringify(generateNextOfKin(language, gender), null, 2),
        },
      ],
    }),
  );
  register(
    "generate_bank_account",
    {
      title: "Generate a bank account",
      description: "Generates a synthetic bank account for test data.",
      inputSchema: { bankName: z.string().optional() },
    },
    async ({ bankName }) => ({
      content: [
        {
          type: "text",
          text: JSON.stringify(generateBankAccount(bankName), null, 2),
        },
      ],
    }),
  );
}
