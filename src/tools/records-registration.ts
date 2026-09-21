import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import {
  ageSchema,
  countSchema,
  languageSchema,
  seedSchema,
  yearSchema,
} from "../contracts.js";
import { createGeneratorRegistrar } from "../registration.js";
import {
  generateCompany,
  generateEducationRecord,
  generateExport,
  generateLicensePlate,
  generateLgas,
  generateStates,
  generateUniversity,
  generateVehicleRecord,
  generateWorkRecord,
} from "./records.js";

export function registerRecordsTools(server: McpServer) {
  const register = createGeneratorRegistrar(server);
  register(
    "generate_vehicle_record",
    {
      title: "Generate a vehicle record",
      description: "Generates a synthetic Nigerian vehicle record.",
      inputSchema: { state: z.string().optional() },
    },
    async ({ state }) => ({
      content: [
        {
          type: "text",
          text: JSON.stringify(generateVehicleRecord(state), null, 2),
        },
      ],
    }),
  );
  register(
    "generate_license_plate",
    {
      title: "Generate a license plate",
      description: "Generates a synthetic Nigerian license plate.",
      inputSchema: { state: z.string().optional() },
    },
    async ({ state }) => ({
      content: [{ type: "text", text: generateLicensePlate(state) }],
    }),
  );
  register(
    "generate_company",
    {
      title: "Generate a company",
      description: "Generates a synthetic Nigerian company record.",
    },
    async () => ({
      content: [
        { type: "text", text: JSON.stringify(generateCompany(), null, 2) },
      ],
    }),
  );
  register(
    "generate_university",
    {
      title: "Generate a university",
      description: "Generates a synthetic Nigerian university record.",
    },
    async () => ({
      content: [
        { type: "text", text: JSON.stringify(generateUniversity(), null, 2) },
      ],
    }),
  );
  register(
    "generate_education_record",
    {
      title: "Generate an education record",
      description:
        "Generates a synthetic education record. Pass an age and the degree is one the person lived long enough to earn, with a course that fits the degree's discipline. Returns null when the age is too young to have finished a qualification.",
      inputSchema: {
        language: languageSchema.optional(),
        age: ageSchema
          .optional()
          .describe("Age of the person the record belongs to"),
      },
    },
    async ({ language, age }) => ({
      content: [
        {
          type: "text",
          text: JSON.stringify(generateEducationRecord(language, age), null, 2),
        },
      ],
    }),
  );
  register(
    "generate_work_record",
    {
      title: "Generate a work record",
      description:
        "Generates a synthetic work record. Pass an age and graduation year and the job starts after the degree, with seniority, position, and salary band following years of experience.",
      inputSchema: {
        age: ageSchema
          .optional()
          .describe("Age of the person the record belongs to"),
        graduationYear: yearSchema
          .optional()
          .describe("Year the person graduated; employment starts after it"),
      },
    },
    async ({ age, graduationYear }) => ({
      content: [
        {
          type: "text",
          text: JSON.stringify(
            generateWorkRecord(age, graduationYear),
            null,
            2,
          ),
        },
      ],
    }),
  );
  register(
    "generate_states",
    {
      title: "Generate Nigerian states",
      description: "Returns the available Nigerian states.",
    },
    async () => ({
      content: [
        { type: "text", text: JSON.stringify(generateStates(), null, 2) },
      ],
    }),
  );
  register(
    "generate_lgas",
    {
      title: "Generate Nigerian LGAs",
      description: "Returns the available Nigerian LGAs.",
    },
    async () => ({
      content: [
        { type: "text", text: JSON.stringify(generateLgas(), null, 2) },
      ],
    }),
  );
  register(
    "export_records",
    {
      title: "Export records in bulk",
      description:
        "Generates a batch of synthetic person records as a single JSON or CSV payload. Use this instead of repeated single-record calls when producing a dataset or fixture file. Nested fields are flattened in CSV.",
      inputSchema: {
        type: z
          .enum(["person", "detailedPerson", "consistentPerson"])
          .optional()
          .describe("The kind of record to export"),
        count: countSchema
          .optional()
          .describe("The number of records to export"),
        format: z
          .enum(["json", "csv"])
          .optional()
          .describe("Output format; defaults to json"),
        seed: seedSchema
          .optional()
          .describe("Seed for a reproducible export batch"),
      },
    },
    async ({ type, count, format }) => ({
      content: [{ type: "text", text: generateExport(type, count, format) }],
    }),
  );
}
