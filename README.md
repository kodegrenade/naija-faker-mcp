# Naija Faker MCP Server

MCP server for [@codegrenade/naija-faker](https://www.npmjs.com/package/@codegrenade/naija-faker). Let's AI assistant generates fake typical Nigerian data ranging from name, address, phone number, LGAs and states for you. It supports Yoruba, Igbo, and Hausa ethnic groups with culturally authentic data.

> NB: You can invoke the server in any AI assistant that supports MCP.

## Quick Start
Add to your Claude Desktop config at:
- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "naija-faker-mcp": {
      "command": "npx",
      "args": ["-y", "@codegrenade/naija-faker-mcp@latest"]
    }
  }
}
```

> PS: You can also use the inspector to debug the server. See the development section for more information.

## Available tools

| Tool | Description |
| --- | --- |
| generate_person | Generate one basic composite person record with identity and contact fields: title, name, email, phone, and address. Use atomic tools for individual attributes. |
| generate_address | Generate a fake Nigerian address. |
| generate_phone_number | Generate a fake Nigerian phone number. |
| generate_lgas | Generate fake Nigerian LGAs. |
| generate_states | Generate fake Nigerian states. |
| generate_email | Generate a fake Nigerian email. |
| generate_nin | Generate a fake Nigerian NIN. |
| generate_bvn | Generate a fake Nigerian BVN. |
| generate_license_plate | Generate a fake Nigerian license plate. |
| generate_people | Generate an array of basic composite person records. Defaults to 10 records. |
| generate_title | Generate a fake Nigerian title. |
| generate_name | Generate a fake Nigerian name. |
| generate_vehicle_record | Generate a fake Nigerian vehicle record. |
| generate_company | Genereate a fake Nigerian company. |
| generate_university | Generate a fake Nigerian university |
| generate_education_record | Generate a fake Nigerian education record |
| generate_work_record | Generate a fake Nigerian work record |
| generate_detailed_person | Generate one detailed composite record containing a consistent person plus date of birth, marital, health, financial, kin, education, work, and vehicle fields. |
| generate_detailed_people | Generate an array of detailed composite person records. Defaults to 1 record. |
| generate_date_of_birth | Generate a fake date of birth |
| genereate_marital_status | Genereate a fake marital status |
| generate_blood_group | Generate a fake blood group |
| generate_genotype | Generate a fake genotype |
| generate_salary | Generate a fake salary |
| generate_next_of_kin | Generate a fake Nigerian next of kin |
| generate_bank_account | Generate a fake Nigerian bank account |
| generate_consistent_person | Generate one basic composite person record plus geographically coherent state and LGA fields. |
| generate_consistent_people | Generate an array of geographically consistent composite person records. Defaults to 10 records. |

### Development

Clone Repository
```bash
git clone https://github.com/kodegrenade/naija-faker-mcp.git
```

Navigate to the project directory
```bash
cd naija-faker-mcp
```

Install dependencies
```bash
npm install
```

Run the server
```bash
npm run dev
```

Debug with inspector
```bash
npx @modelcontextprotocol/inspector npm run dev
```

## License

MIT
