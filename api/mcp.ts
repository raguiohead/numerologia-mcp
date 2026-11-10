import { WebStandardStreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js";
import { criarServidor } from "../src/server.js";

/**
 * Endpoint MCP stateless (Streamable HTTP) para Vercel Functions.
 * Cada requisição cria um servidor e um transporte novos.
 */
async function handler(request: Request): Promise<Response> {
  const transport = new WebStandardStreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
    enableJsonResponse: true,
  });
  const server = criarServidor();
  await server.connect(transport);
  return transport.handleRequest(request);
}

export const POST = handler;
export const GET = handler;
export const DELETE = handler;
