import faker from "@codegrenade/naija-faker";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";
import type {
  AnySchema,
  ZodRawShapeCompat,
} from "@modelcontextprotocol/sdk/server/zod-compat.js";
import type { ToolAnnotations } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";

const genericOutputSchema = z.object({ value: z.unknown() });
const generatorAnnotations: ToolAnnotations = {
  readOnlyHint: true,
  destructiveHint: false,
  openWorldHint: false,
};

type GeneratorRegistrar = {
  <Args extends ZodRawShapeCompat>(
    name: string,
    config: {
      title?: string;
      description?: string;
      inputSchema: Args;
      outputSchema?: AnySchema;
    },
    handler: ToolCallback<Args>,
  ): ReturnType<McpServer["registerTool"]>;
  (
    name: string,
    config: {
      title?: string;
      description?: string;
      outputSchema?: AnySchema;
    },
    handler: ToolCallback<undefined>,
  ): ReturnType<McpServer["registerTool"]>;
};

export function createGeneratorRegistrar(
  server: McpServer,
): GeneratorRegistrar {
  return function registerGenerator(
    name: string,
    config: {
      title?: string;
      description?: string;
      inputSchema?: ZodRawShapeCompat;
      outputSchema?: AnySchema;
    },
    handler: (...args: any[]) => any,
  ) {
    const wrappedHandler = async (...args: any[]) => {
      // Tools that accept a seed opt in via their inputSchema; seeding is reset
      // afterwards so one reproducible call never makes later calls deterministic.
      const seed = args[0]?.seed;
      let result: any;
      try {
        if (typeof seed === "number") {
          faker.seed(seed);
        }
        result = await handler(...args);
      } catch (error) {
        const code = (error as { code?: string })?.code;
        const message = error instanceof Error ? error.message : String(error);
        return {
          content: [
            {
              type: "text",
              text: code ? `${code}: ${message}` : `Error: ${message}`,
            },
          ],
          isError: true,
        };
      } finally {
        if (typeof seed === "number") {
          faker.seed();
        }
      }

      if (
        result?.isError ||
        result?.structuredContent ||
        !Array.isArray(result?.content)
      ) {
        return result;
      }

      const text = result.content.find(
        (item: { type?: string; text?: string }) =>
          item.type === "text" && typeof item.text === "string",
      )?.text;

      if (text === undefined) {
        return result;
      }

      let value: unknown = text;
      try {
        value = JSON.parse(text);
      } catch {
        // Keep scalar text results as strings.
      }

      return { ...result, structuredContent: { value } };
    };

    return server.registerTool(
      name,
      {
        ...config,
        annotations: generatorAnnotations,
        outputSchema: config.outputSchema ?? genericOutputSchema,
      },
      wrappedHandler,
    );
  } as GeneratorRegistrar;
}
