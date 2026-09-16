import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { languageSchema, genderSchema } from "./contracts.js";

export function registerPersonPrompt(server: McpServer) {
  server.registerPrompt(
    "generate_person",
    {
      title: "Generates a fake person data using naija-faker tool",
      description: "Generates a fake person data using naija-faker tool",
      argsSchema: {
        language: languageSchema.describe(
          "The language of the person data. Accepted values are hausa, igbo, and yoruba",
        ),
        gender: genderSchema.describe(
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
}
