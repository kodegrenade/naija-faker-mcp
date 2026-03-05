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

server.registerTool("generate_fake_title", {
  title: "Generate a fake title using naija-faker tool",
  description: "Generates a fake title data. Accepts a string payload for the gender of the title data. The accepted gender values are male and female. Returns the processed result as a string",
  inputSchema: {
    gender: z.string().optional().describe("The gender of the title data. The accepted gender values are male and female"),
  }
}, async ({ gender }) => {
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
});

server.registerTool("generate_fake_name", {
  title: "Generate a fake name using naija-faker tool",
  description: "Generates a fake name data. Accepts a string payload for the language of the name data and a string payload for the gender of the name data. The available languages are Hausa, Igbo and Yoruba. The accepted gender values are male and female. Returns the processed result as a string",
  inputSchema: {
    language: z.string().optional().describe("The language of the name data. The available languages are Hausa, Igbo and Yoruba"),
    gender: z.string().optional().describe("The gender of the name data. The accepted gender values are male and female"),
  }
}, async ({ language, gender }) => {
  try {
    const name = faker.name(language as "yoruba" | "igbo" | "hausa", gender as "male" | "female");
    return {
      content: [{ type: "text", text: name }],
    };
  } catch (error) {
    return {
      content: [{ type: "text", text: `Error: ${error}` }],
      isError: true,
    };
  }
});

server.registerTool("generate_fake_phone_number", {
  title: "Generate a fake phone number using naija-faker tool",
  description: "Generates a fake phone number. Accepts a string payload for the network of the preferred telco. The available networks are MTN, Glo, Airtel and 9mobile. Returns the processed result as a string",
  inputSchema: {
    network: z.string().optional().describe("The network of the preferred telco. The available networks are MTN, Glo, Airtel and 9mobile"),
  }
}, async ({ network }) => {
  try {
    const phone = faker.phoneNumber(network as "mtn" | "glo" | "airtel" | "9mobile");
    return {
      content: [{ type: "text", text: phone }],
    };
  } catch (error) {
    return {
      content: [{ type: "text", text: `Error: ${error}` }],
      isError: true,
    };
  }
});

server.registerTool("generate_fake_email", {
  title: "Generate a fake email using naija-faker tool",
  description: "Generates a fake email data. Accepts a string payload for the name of the email data. Returns the processed result as a string",
  inputSchema: {
    name: z.string().optional().describe("The name of the email data"),
  }
}, async ({ name }) => {
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
});

server.registerTool("generate_fake_address", {
  title: "Generate a fake address using naija-faker tool",
  description: "Generates a fake address data. Returns the processed result as a string",
}, async () => {
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
});

server.registerTool("generate_fake_bvn", {
  title: "Generate a fake bvn using naija-faker tool",
  description: "Generates a fake bvn data. Returns the processed result as a string",
}, async () => {
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
});

server.registerTool("generate_fake_nin", {
  title: "Generate a fake nin using naija-faker tool",
  description: "Generates a fake nin data. Returns the processed result as a string",
}, async () => {
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
});

server.registerTool("generate_fake_vehicle", {
  title: "Generate a fake vehicle using naija-faker tool",
  description: "Generates a fake vehicle data. Accept a payload of string for the state of the preferred vehicle. Returns the processed result as an object",
  inputSchema: {
    state: z.string().optional().describe("The state of the preferred vehicle"),
  }
}, async ({ state }) => {
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
});

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
      content: { type: "text", text: `Generate a fake ${language} ${gender} person. Return a JSON object of the person data` },
    }]
  })
)

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("MCP server running on stdio");
}

main().catch(console.error);