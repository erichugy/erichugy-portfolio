import { type NextRequest } from "next/server";

import { addRequest, generateId } from "./index";
import { type CapturedRequest } from "./types";

export async function captureFromNextRequest(
  request: NextRequest,
  path: string,
): Promise<CapturedRequest> {
  const url = new URL(request.url);

  const query: Record<string, string> = {};
  url.searchParams.forEach((value, key) => {
    query[key] = value;
  });

  const headers: Record<string, string> = {};
  request.headers.forEach((value, key) => {
    headers[key] = value;
  });

  let body: unknown = null;
  if (request.method !== "GET" && request.method !== "HEAD") {
    try {
      const text = await request.text();
      try {
        body = JSON.parse(text);
      } catch {
        body = text || null;
      }
    } catch {
      body = null;
    }
  }

  const captured: CapturedRequest = {
    id: generateId(),
    timestamp: new Date().toISOString(),
    method: request.method,
    path,
    query,
    headers,
    body,
  };

  addRequest(captured);
  return captured;
}
