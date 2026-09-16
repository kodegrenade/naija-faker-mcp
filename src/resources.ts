import { readFile } from "node:fs/promises";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

export function registerPackageDocsResource(server: McpServer) {
  server.registerResource(
    "package-docs",
    "https://github.com/kodegrenade/naija-faker/blob/main/README.md",
    {
      title: "Package documentation",
      description: "Package documentation",
    },
    async (uri) => ({
      contents: [
        {
          uri: uri.toString(),
          text: await readFile(
            new URL("../README.md", import.meta.url),
            "utf8",
          ),
        },
      ],
    }),
  );
}
