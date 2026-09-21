import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import {
  genderSchema,
  languageSchema,
  networkSchema,
  regionSchema,
} from "../contracts.js";
import { createGeneratorRegistrar } from "../registration.js";
import {
  generateAddress,
  generateBvn,
  generateEmail,
  generateName,
  generateNin,
  generatePhoneNumber,
  generateTitle,
} from "./identity.js";

export function registerIdentityTools(server: McpServer) {
  const register = createGeneratorRegistrar(server);

  register(
    "generate_title",
    {
      title: "Generate a fake title",
      description: "Generates a synthetic Nigerian title.",
      inputSchema: { gender: genderSchema.optional() },
    },
    async ({ gender }) => ({
      content: [{ type: "text", text: generateTitle(gender) }],
    }),
  );
  register(
    "generate_name",
    {
      title: "Generate a fake name",
      description: "Generates a synthetic Nigerian name.",
      inputSchema: {
        language: languageSchema.optional(),
        gender: genderSchema.optional(),
      },
    },
    async ({ language, gender }) => ({
      content: [{ type: "text", text: generateName(language, gender) }],
    }),
  );
  register(
    "generate_phone_number",
    {
      title: "Generate a fake phone number",
      description: "Generates a synthetic Nigerian phone number.",
      inputSchema: { network: networkSchema.optional() },
    },
    async ({ network }) => ({
      content: [{ type: "text", text: generatePhoneNumber(network) }],
    }),
  );
  register(
    "generate_email",
    {
      title: "Generate a fake email",
      description: "Generates a synthetic email address.",
      inputSchema: { name: z.string().optional() },
    },
    async ({ name }) => ({
      content: [{ type: "text", text: generateEmail(name) }],
    }),
  );
  register(
    "generate_address",
    {
      title: "Generate a fake address",
      description:
        "Generates a synthetic Nigerian address. Pass a region to place it in that part of the country.",
      inputSchema: { region: regionSchema.optional() },
    },
    async ({ region }) => ({
      content: [{ type: "text", text: generateAddress(region) }],
    }),
  );
  register(
    "generate_bvn",
    {
      title: "Generate a fake BVN",
      description: "Generates a synthetic BVN for test data only.",
    },
    async () => ({ content: [{ type: "text", text: generateBvn() }] }),
  );
  register(
    "generate_nin",
    {
      title: "Generate a fake NIN",
      description: "Generates a synthetic NIN for test data only.",
    },
    async () => ({ content: [{ type: "text", text: generateNin() }] }),
  );
}
