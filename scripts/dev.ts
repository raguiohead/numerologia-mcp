/**
 * Servidor local para testar o endpoint MCP sem a Vercel.
 * Uso: npm run dev  →  http://localhost:3000/api/mcp
 */
import { createServer } from "node:http";
import { POST } from "../api/mcp.js";

const porta = Number(process.env.PORT ?? 3000);

createServer(async (req, res) => {
  if (!req.url?.startsWith("/api/mcp")) {
    res.writeHead(404).end();
    return;
  }
  const chunks: Buffer[] = [];
  for await (const c of req) chunks.push(c as Buffer);
  const body = Buffer.concat(chunks);

  const request = new Request(`http://localhost:${porta}${req.url}`, {
    method: req.method,
    headers: req.headers as Record<string, string>,
    body: ["GET", "HEAD"].includes(req.method ?? "") ? undefined : body,
  });
  const response = await POST(request);
  res.writeHead(response.status, Object.fromEntries(response.headers));
  res.end(Buffer.from(await response.arrayBuffer()));
}).listen(porta, () => console.log(`MCP em http://localhost:${porta}/api/mcp`));
