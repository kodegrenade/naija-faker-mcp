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
  "generate_fake_person",
  {
    title: "Generates a fake person data using naija-faker tool",
    description: "Generates a fake person data. Accepts a string payload for the language of the person data and a string payload for the gender of the person data. The available languages are Hausa, Igbo and Yoruba. The accepted gender values are male and female. Returns the processed result as an object",
    inputSchema: {
      language: z.string().optional().describe("The language of the person data. The available languages are Hausa, Igbo and Yoruba"),
      gender: z.string().optional().describe("The gender of the person data. The accepted gender values are male and female"),
    }
  },
  async ({ language, gender }) => {
    try {
      const person = faker.person(language as "yoruba" | "igbo" | "hausa", gender as "male" | "female");
      return {
        content: [{ type: "text", text: JSON.stringify(person, null, 2) }],
      };
    } catch (error) {
      return {
        content: [{ type: "text", text: `Error: ${error}` }],
        isError: true,
      };
    }
  }
);

server.registerTool(
  "generate_fake_people",
  {
    title: "Generate a list of fake people using naija-faker tool",
    description: "Generates a list of fake people data. Accepts a number payload the number of persons to be generated as part of the people list. Returns the processed results as an array of object",
    inputSchema: {
      count: z.number().optional().describe("The number of persons to be generated as part of the people list")
    }
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
  }
);

server.registerResource(
  "package-docs",
  "https://github.com/kodegrenade/naija-faker/blob/main/readme.md",
  {
    title: "Package documentation",
    description: "Package documentation",
  },
  async (uri) => ({
    contents: [{
      uri: uri.toString(),
      text: await readFile("readme.md", "utf8"),
    }],
  })
)

server.registerPrompt(
  "generate_fake_person",
  {
    title: "Generates a fake person data using naija-faker tool",
    description: "Generates a fake person data using naija-faker tool",
    argsSchema: {
      language: z.string().describe("The language of the person data. The available languages are Hausa, Igbo and Yoruba"),
      gender: z.string().describe("The gender of the person data. The accepted gender values are male and female")
    },
  },
  ({ language, gender }) => ({
    messages: [{
      role: "user",
      content: { type: "text", text: `Generate a fake person data for ${language} and ${gender}. Return a JSON object of the person data` },
    }]
  })
)

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("MCP server running on stdio");
}

main().catch(console.error);