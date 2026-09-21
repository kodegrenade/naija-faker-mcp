#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerPackageDocsResource } from "./resources.js";
import { registerPersonPrompt } from "./prompts.js";
import { registerIdentityTools } from "./tools/identity-registration.js";
import { registerPersonTools } from "./tools/person-registration.js";
import { registerProfileTools } from "./tools/profile-registration.js";
import { registerRecordsTools } from "./tools/records-registration.js";

const server = new McpServer({
  name: "Naija Faker Library",
  version: "2.1.0",
});

registerPersonTools(server);
registerIdentityTools(server);
registerRecordsTools(server);
registerProfileTools(server);
registerPackageDocsResource(server);
registerPersonPrompt(server);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Naija Faker MCP server running on stdio");
}

main().catch(console.error);
