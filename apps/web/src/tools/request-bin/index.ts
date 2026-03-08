import { type CapturedRequest } from "./types";

export type { CapturedRequest } from "./types";
export { capturedRequestSchema } from "./types";

const MAX_REQUESTS = 100;

const globalState = globalThis as typeof globalThis & {
  __requestBinStore?: CapturedRequest[];
};

const capturedRequests: CapturedRequest[] =
  globalState.__requestBinStore ?? [];
globalState.__requestBinStore = capturedRequests;

export function generateId(): string {
  return Math.random().toString(36).substring(2, 10);
}

export function addRequest(req: CapturedRequest): void {
  capturedRequests.unshift(req);
  if (capturedRequests.length > MAX_REQUESTS) {
    capturedRequests.pop();
  }
}

export function getRequests(): CapturedRequest[] {
  return capturedRequests;
}

export function clearRequests(): void {
  capturedRequests.length = 0;
}
