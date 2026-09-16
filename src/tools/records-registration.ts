import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { languageSchema } from "../contracts.js";
import { createGeneratorRegistrar } from "../registration.js";
import {
  generateCompany,
  generateEducationRecord,
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
      description: "Generates a synthetic education record.",
      inputSchema: { language: languageSchema.optional() },
    },
    async ({ language }) => ({
      content: [
        {
          type: "text",
          text: JSON.stringify(generateEducationRecord(language), null, 2),
        },
      ],
    }),
  );
  register(
    "generate_work_record",
    {
      title: "Generate a work record",
      description: "Generates a synthetic work record.",
    },
    async () => ({
      content: [
        { type: "text", text: JSON.stringify(generateWorkRecord(), null, 2) },
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
}
