import { IncomingMessage, ServerResponse } from "http";
// @ts-ignore
import server from "../dist/server/server.js";

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  // 1. Determine protocol and host
  const protocol = req.headers["x-forwarded-proto"] || "http";
  const host = req.headers["x-forwarded-host"] || req.headers.host || "localhost";
  const url = `${protocol}://${host}${req.url}`;

  // 2. Retrieve request body (if POST, PUT, PATCH, etc.)
  let body: any = null;
  if (req.method !== "GET" && req.method !== "HEAD") {
    const buffers = [];
    for await (const chunk of req) {
      buffers.push(chunk);
    }
    body = Buffer.concat(buffers);
  }

  // 3. Construct Headers object
  const webHeaders = new Headers();
  for (const [key, value] of Object.entries(req.headers)) {
    if (value !== undefined) {
      if (Array.isArray(value)) {
        for (const val of value) {
          webHeaders.append(key, val);
        }
      } else {
        webHeaders.set(key, value);
      }
    }
  }

  // 4. Create Web-compatible Request
  const webRequest = new Request(url, {
    method: req.method,
    headers: webHeaders,
    body: body,
  });

  try {
    // 5. Execute server fetch handler
    const webResponse = await server.fetch(webRequest);

    // 6. Write status and headers back to Node response
    res.statusCode = webResponse.status;
    webResponse.headers.forEach((value: string, key: string) => {
      res.setHeader(key, value);
    });

    // 7. Write response body chunk-by-chunk for streaming support
    if (webResponse.body) {
      const reader = webResponse.body.getReader();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        res.write(value);
      }
    }
    res.end();
  } catch (error) {
    console.error("Error handling request:", error);
    res.statusCode = 500;
    res.end("Internal Server Error");
  }
}
