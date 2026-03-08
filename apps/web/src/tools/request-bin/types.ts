import { z } from "zod";

export const capturedRequestSchema = z.object({
  id: z.string(),
  timestamp: z.string(),
  method: z.string(),
  path: z.string(),
  query: z.record(z.string(), z.string()),
  headers: z.record(z.string(), z.string()),
  body: z.unknown(),
});
export type CapturedRequest = z.infer<typeof capturedRequestSchema>;
