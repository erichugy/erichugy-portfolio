import { type SheetConfig } from "@/services/google-sheets/types";
import { appendRow, deleteRow, getRows, updateRow } from "@/services/google-sheets";

import { type JobRow } from "./types";

const COLUMNS = [
  "id",
  "jobTitle",
  "company",
  "jobDescription",
  "datePosted",
  "dateApplied",
  "location",
  "link",
] as const;

function getConfig(): SheetConfig {
  const spreadsheetId = process.env.GOOGLE_SHEETS_ID;
  if (!spreadsheetId) throw new Error("GOOGLE_SHEETS_ID not configured");
  return {
    spreadsheetId,
    tabName: process.env.GOOGLE_SHEETS_TAB_NAME ?? "Sheet1",
  };
}

function rowToJob(row: string[]): JobRow {
  return {
    id: row[0] ?? "",
    jobTitle: row[1] ?? "",
    company: row[2] ?? "",
    jobDescription: row[3] ?? "",
    datePosted: row[4] ?? "",
    dateApplied: row[5] ?? "",
    location: row[6] ?? "",
    link: row[7] ?? "",
  };
}

function jobToRow(job: JobRow): string[] {
  return COLUMNS.map((col) => job[col]);
}

export async function getAllJobs(): Promise<JobRow[]> {
  const rows = await getRows(getConfig(), "A2:H");
  return rows.map(rowToJob);
}

export async function getJobById(id: string): Promise<JobRow | null> {
  const jobs = await getAllJobs();
  return jobs.find((j) => j.id === id) ?? null;
}

export async function appendJob(job: Omit<JobRow, "id">): Promise<JobRow> {
  const id = crypto.randomUUID();
  const fullJob: JobRow = { id, ...job };
  await appendRow(getConfig(), "A:H", jobToRow(fullJob));
  return fullJob;
}

async function findRowNumber(id: string): Promise<number | null> {
  const rows = await getRows(getConfig(), "A:A");
  // Row 0 in values = row 1 in sheet (header), so data starts at index 1
  for (let i = 1; i < rows.length; i++) {
    if (rows[i]?.[0] === id) return i + 1; // 1-indexed sheet row
  }
  return null;
}

export async function updateJob(
  id: string,
  updates: Partial<Omit<JobRow, "id">>,
): Promise<JobRow | null> {
  const config = getConfig();
  const rowNum = await findRowNumber(id);
  if (!rowNum) return null;

  const currentRows = await getRows(config, `A${rowNum}:H${rowNum}`);
  const currentRow = currentRows[0];
  if (!currentRow) return null;

  const current = rowToJob(currentRow);
  const updated: JobRow = { ...current, ...updates, id };

  await updateRow(config, `A${rowNum}:H${rowNum}`, jobToRow(updated));
  return updated;
}

export async function deleteJob(id: string): Promise<boolean> {
  const rowNum = await findRowNumber(id);
  if (!rowNum) return false;
  await deleteRow(getConfig(), rowNum);
  return true;
}
