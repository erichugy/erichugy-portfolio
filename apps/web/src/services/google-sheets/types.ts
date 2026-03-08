import { z } from "zod";

export const sheetConfigSchema = z.object({
  spreadsheetId: z.string(),
  tabName: z.string().default("Sheet1"),
});
export type SheetConfig = z.infer<typeof sheetConfigSchema>;
