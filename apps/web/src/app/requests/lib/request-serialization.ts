import type { CapturedRequest } from "@/tools/request-bin/types";

export function isCapturedRequest(value: unknown): value is CapturedRequest {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  return (
    "id" in value &&
    "method" in value &&
    "path" in value &&
    "timestamp" in value
  );
}

export function downloadJsonFile(filename: string, value: unknown): void {
  const json = JSON.stringify(value, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");

  anchor.href = url;
  anchor.download = filename;
  anchor.click();

  URL.revokeObjectURL(url);
}
