import { z } from "zod";

export const keywordCounterStatusSchema = z.enum(["running", "completed", "failed"]);
export type KeywordCounterStatus = z.infer<typeof keywordCounterStatusSchema>;

export const keywordCounterInputSchema = z.object({
  pat: z.string(),
  botId: z.string(),
  keywords: z.string(),
  startDate: z.string(),
  endDate: z.string().optional(),
  verbose: z.boolean().optional(),
});
export type KeywordCounterInput = z.infer<typeof keywordCounterInputSchema>;

export const messageMatchRowSchema = z.object({
  conversationId: z.string(),
  keywords: z.string(),
  sender: z.string(),
  messageId: z.string(),
  message: z.string(),
});
export type MessageMatchRow = z.infer<typeof messageMatchRowSchema>;

export const summaryResultSchema = z.object({
  runId: z.string(),
  createdAtUtc: z.string(),
  dateRangeUtc: z.object({ start: z.string(), end: z.string() }),
  keywords: z.array(z.string()),
  totals: z.object({
    pagesFetched: z.number(),
    messagesScanned: z.number(),
    messagesWithAnyKeyword: z.number(),
    uniqueConversationsWithAnyKeyword: z.number(),
  }),
  keywordStats: z.record(
    z.string(),
    z.object({
      occurrences: z.number(),
      messagesContainingKeyword: z.number(),
    }),
  ),
  conversationIdsWithAnyKeyword: z.array(z.string()),
});
export type SummaryResult = z.infer<typeof summaryResultSchema>;

export const keywordCounterJobSchema = z.object({
  id: z.string(),
  status: keywordCounterStatusSchema,
  createdAt: z.string(),
  updatedAt: z.string(),
  outputDir: z.string(),
  error: z.string().optional(),
  summaryText: z.string().optional(),
  summary: summaryResultSchema.optional(),
  files: z.array(z.object({ name: z.string(), size: z.number() })),
  messageMatchesCount: z.number(),
  messageMatchesPreview: z.array(messageMatchRowSchema),
  progress: z.object({
    stage: z.string(),
    pagesFetched: z.number(),
    messagesScanned: z.number(),
    messagesWithAnyKeyword: z.number(),
    matchedConversations: z.number(),
    elapsedSeconds: z.number(),
  }),
});
export type KeywordCounterJob = z.infer<typeof keywordCounterJobSchema>;
