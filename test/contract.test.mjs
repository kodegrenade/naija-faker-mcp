import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const client = new Client({
  name: "naija-faker-contract-test",
  version: "1.0.0",
});

const expectedToolNames = [
  "generate_person",
  "generate_people",
  "generate_title",
  "generate_name",
  "generate_phone_number",
  "generate_email",
  "generate_address",
  "generate_bvn",
  "generate_nin",
  "generate_vehicle_record",
  "generate_license_plate",
  "generate_company",
  "generate_university",
  "generate_education_record",
  "generate_work_record",
  "generate_detailed_person",
  "generate_detailed_people",
  "generate_date_of_birth",
  "generate_marital_status",
  "generate_blood_group",
  "generate_genotype",
  "generate_salary",
  "generate_next_of_kin",
  "generate_states",
  "generate_lgas",
  "generate_bank_account",
  "generate_consistent_person",
  "generate_consistent_people",
  "export_records",
];

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

test("registers the complete tool inventory with safe metadata", async () => {
  const { tools } = await client.listTools();
  assert.deepEqual(
    tools.map((tool) => tool.name).sort(),
    [...expectedToolNames].sort(),
  );

  for (const tool of tools) {
    assert.equal(tool.annotations?.readOnlyHint, true);
    assert.equal(tool.annotations?.destructiveHint, false);
    assert.equal(tool.annotations?.openWorldHint, false);
    assert.ok(tool.description);
    assert.ok(tool.inputSchema);
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

test("invokes every tool family successfully", async () => {
  const calls = [
    ["generate_person", { language: "yoruba", gender: "female" }],
    ["generate_people", { count: 1 }],
    ["generate_title", { gender: "male" }],
    ["generate_name", { language: "igbo", gender: "female" }],
    ["generate_phone_number", { network: "mtn" }],
    ["generate_email", { name: "Ada Okafor" }],
    ["generate_address", {}],
    ["generate_bvn", {}],
    ["generate_nin", {}],
    ["generate_vehicle_record", { state: "Lagos" }],
    ["generate_license_plate", { state: "Lagos" }],
    ["generate_company", {}],
    ["generate_university", {}],
    ["generate_education_record", { language: "hausa" }],
    ["generate_work_record", {}],
    ["generate_detailed_person", { language: "yoruba", gender: "male" }],
    ["generate_detailed_people", { count: 1 }],
    ["generate_date_of_birth", { minAge: 20, maxAge: 40 }],
    ["generate_marital_status", {}],
    ["generate_blood_group", {}],
    ["generate_genotype", {}],
    ["generate_salary", { level: "mid" }],
    ["generate_next_of_kin", { language: "igbo", gender: "female" }],
    ["generate_states", {}],
    ["generate_lgas", {}],
    ["generate_bank_account", {}],
    ["generate_consistent_person", { language: "hausa", gender: "male" }],
    ["generate_consistent_people", { count: 1 }],
    ["export_records", { type: "person", count: 2, format: "csv" }],
  ];

  for (const [name, arguments_] of calls) {
    const result = await client.callTool({ name, arguments: arguments_ });
    assert.equal(result.isError, undefined, `Tool failed: ${name}`);
    assert.ok(result.content?.length, `Tool returned no content: ${name}`);
  }
});

test("rejects unsupported enum values before generation", async () => {
  const result = await client.callTool({
    name: "generate_person",
    arguments: { language: "Hausa" },
  });
  assert.equal(result.isError, true);
});

test("rejects invalid numeric and enum parameters", async () => {
  const invalidCalls = [
    ["generate_people", { count: 0 }],
    ["generate_date_of_birth", { minAge: -1 }],
    ["generate_date_of_birth", { maxAge: 3.5 }],
    ["generate_phone_number", { network: "unknown" }],
    ["generate_salary", { level: "junior" }],
  ];

  for (const [name, arguments_] of invalidCalls) {
    const result = await client.callTool({ name, arguments: arguments_ });
    assert.equal(result.isError, true, `Invalid input accepted: ${name}`);
  }
});

test("provides a structured fallback for atomic tool results", async () => {
  const result = await client.callTool({
    name: "generate_salary",
    arguments: {},
  });
  assert.equal(result.isError, undefined);
  assert.equal(typeof result.structuredContent.value, "object");
});

test("carries the v2 consistency fields on consistent persons", async () => {
  const result = await client.callTool({
    name: "generate_consistent_person",
    arguments: { language: "igbo", gender: "male" },
  });
  assert.equal(result.isError, undefined);
  assert.equal(result.structuredContent.language, "igbo");
  assert.ok(
    ["east", "west", "north", "south"].includes(result.structuredContent.region),
  );
});

test("returns a null education record for people too young to have one", async () => {
  const result = await client.callTool({
    name: "generate_detailed_person",
    arguments: { language: "yoruba", minAge: 18, maxAge: 19 },
  });
  assert.equal(result.isError, undefined);
  assert.equal(result.structuredContent.education, null);
  assert.equal(typeof result.structuredContent.work.yearsOfExperience, "number");

  const atomic = await client.callTool({
    name: "generate_education_record",
    arguments: { language: "yoruba", age: 18 },
  });
  assert.equal(atomic.isError, undefined);
  assert.equal(atomic.structuredContent.value, null);
});

test("keeps the library's default age range when no bounds are given", async () => {
  const ages = [];
  // Enough samples that a regression to the wider 18-65 range cannot slip through.
  for (let i = 0; i < 60; i++) {
    const result = await client.callTool({
      name: "generate_detailed_person",
      arguments: { language: "yoruba" },
    });
    assert.equal(result.isError, undefined);
    ages.push(result.structuredContent.dateOfBirth.age);
    // Within the default range everyone is old enough to hold a qualification.
    assert.notEqual(result.structuredContent.education, null);
  }
  assert.ok(
    Math.min(...ages) >= 22,
    `default range leaked below 22: got ${Math.min(...ages)}`,
  );
});

test("produces reproducible output for a given seed without leaking it", async () => {
  const call = (args) =>
    client.callTool({ name: "generate_person", arguments: args });

  const first = await call({ language: "yoruba", gender: "female", seed: 4242 });
  const second = await call({ language: "yoruba", gender: "female", seed: 4242 });
  assert.deepEqual(first.structuredContent, second.structuredContent);

  // The seed must be reset afterwards, so an unseeded call is not pinned to it.
  const unseeded = await Promise.all(
    Array.from({ length: 5 }, () =>
      call({ language: "yoruba", gender: "female" }),
    ),
  );
  assert.ok(
    unseeded.some(
      (r) => r.structuredContent.fullName !== first.structuredContent.fullName,
    ),
    "unseeded calls stayed pinned to the previous seed",
  );
});

test("surfaces machine-readable error codes from the library", async () => {
  const result = await client.callTool({
    name: "generate_license_plate",
    arguments: { state: "Atlantis" },
  });
  assert.equal(result.isError, true);
  assert.match(result.content[0].text, /INVALID_STATE/);
});

test("exposes the package documentation resource", async () => {
  const { resources } = await client.listResources();
  assert.ok(resources.some((resource) => resource.name === "package-docs"));

  const result = await client.readResource({
    uri: "https://github.com/kodegrenade/naija-faker/blob/main/README.md",
  });
  assert.match(result.contents[0].text, /Naija Faker MCP/i);
});

test("exposes the person generation prompt", async () => {
  const { prompts } = await client.listPrompts();
  assert.ok(prompts.some((prompt) => prompt.name === "generate_person"));

  const result = await client.getPrompt({
    name: "generate_person",
    arguments: { language: "yoruba", gender: "female" },
  });
  assert.match(result.messages[0].content.text, /yoruba female person/i);
});
