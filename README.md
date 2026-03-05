## Naija Faker MCP Server

This is a ModelContextProtocol server that provides a fake person data generator tool.

## Usage

```bash
npx naija-faker-mcp
```

### Inspector

```bash
npx run inspector
```

### Use with Claude Desktop

Add this to your MCP servers configuration: `claude_desktop_config.json`

```json
{
  "mcpServers": {
    "naija-faker-mcp": {
      "command": "npx",
      "args": ["-y", "naija-faker-mcp"]
    }
  }
}
```

## License

MIT
