import { z } from "zod";

const rateEntrySchema = z.object({
  count: z.number(),
  windowStart: z.number(),
});
export type RateEntry = z.infer<typeof rateEntrySchema>;
