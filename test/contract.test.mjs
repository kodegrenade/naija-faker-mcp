import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const client = new Client({ name: "naija-faker-contract-test", version: "1.0.0" });

before(async () => {
  const transport = new StdioClientTransport({
    command: process.execPath,
    args: ["dist/index.js"],
    cwd: process.cwd(),
  });
  await client.connect(transport);
});

after(async () => {
  await client.close();
});

test("registers the person tool family with behavioral annotations", async () => {
  const { tools } = await client.listTools();
  const personTools = tools.filter((tool) =>
    [
      "generate_person",
      "generate_people",
      "generate_consistent_person",
      "generate_consistent_people",
      "generate_detailed_person",
      "generate_detailed_people",
    ].includes(tool.name),
  );

  assert.equal(personTools.length, 6);
  for (const tool of personTools) {
    assert.equal(tool.annotations?.readOnlyHint, true);
    assert.equal(tool.annotations?.destructiveHint, false);
    assert.equal(tool.annotations?.openWorldHint, false);
    assert.ok(tool.outputSchema);
  }
});

test("returns structured basic and consistent person records", async () => {
  const person = await client.callTool({
    name: "generate_person",
    arguments: { language: "yoruba", gender: "female" },
  });
  assert.equal(person.isError, undefined);
  assert.equal(typeof person.structuredContent.fullName, "string");
  assert.equal(typeof person.structuredContent.email, "string");

  const consistent = await client.callTool({
    name: "generate_consistent_people",
    arguments: { count: 2, language: "igbo" },
  });
  assert.equal(consistent.isError, undefined);
  assert.equal(consistent.structuredContent.items.length, 2);
  assert.equal(typeof consistent.structuredContent.items[0].state, "string");
});

test("rejects unsupported enum values before generation", async () => {
  const result = await client.callTool({
    name: "generate_person",
    arguments: { language: "Hausa" },
  });
  assert.equal(result.isError, true);
});

test("provides a structured fallback for atomic tool results", async () => {
  const result = await client.callTool({ name: "generate_salary", arguments: {} });
  assert.equal(result.isError, undefined);
  assert.equal(typeof result.structuredContent.value, "object");
});
