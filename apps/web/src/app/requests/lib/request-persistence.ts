import {
  DEFAULT_PANEL_WIDTH,
  MAX_PANEL_WIDTH,
  MAX_VIEWS,
  MIN_PANEL_WIDTH,
  REQUESTBIN_ACTIVE_VIEW_STORAGE_KEY,
  REQUESTBIN_PANEL_WIDTH_STORAGE_KEY,
  REQUESTBIN_VIEWS_STORAGE_KEY,
} from "../requests-page.constants";
import type { SavedView } from "../requests-page.types";

const FILTER_FIELDS = new Set(["method", "path", "time", "body", "headers"]);
const FILTER_LOGIC = new Set(["AND", "OR"]);
const FILTER_OPERATORS = new Set([
  "is",
  "is_any_of",
  "is_none_of",
  "contains",
  "not_contains",
  "starts_with",
  "equals",
  "after",
  "before",
  "between",
]);

function loadFromStorage(key: string): unknown {
  try {
    const rawValue = localStorage.getItem(key);

    if (rawValue === null) {
      return null;
    }

    return JSON.parse(rawValue);
  } catch {
    return null;
  }
}

function saveToStorage(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // localStorage may be unavailable or full
  }
}

function hasStringProp(value: object, key: string): boolean {
  return key in value && typeof (value as Record<string, unknown>)[key] === "string";
}

function hasBooleanProp(value: object, key: string): boolean {
  return key in value && typeof (value as Record<string, unknown>)[key] === "boolean";
}

function isValidFilter(value: unknown): boolean {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const filter = value as Record<string, unknown>;

  if (
    typeof filter.id !== "string" ||
    typeof filter.field !== "string" ||
    typeof filter.operator !== "string" ||
    typeof filter.value !== "string"
  ) {
    return false;
  }

  if (!FILTER_FIELDS.has(filter.field) || !FILTER_OPERATORS.has(filter.operator)) {
    return false;
  }

  if (
    "values" in filter &&
    filter.values !== undefined &&
    (!Array.isArray(filter.values) ||
      !filter.values.every((entry) => typeof entry === "string"))
  ) {
    return false;
  }

  if (
    "valueTo" in filter &&
    filter.valueTo !== undefined &&
    typeof filter.valueTo !== "string"
  ) {
    return false;
  }

  return true;
}

export function isValidSavedView(value: unknown): value is SavedView {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  if (!hasStringProp(value, "id") || !hasStringProp(value, "name")) {
    return false;
  }

  if ("filterGroups" in value) {
    const groups = (value as Record<string, unknown>).filterGroups;

    if (!Array.isArray(groups)) {
      return false;
    }

    for (const group of groups) {
      if (typeof group !== "object" || group === null) {
        return false;
      }

      const parsedGroup = group as Record<string, unknown>;

      if (
        typeof parsedGroup.id !== "string" ||
        typeof parsedGroup.logic !== "string" ||
        !FILTER_LOGIC.has(parsedGroup.logic) ||
        !Array.isArray(parsedGroup.filters)
      ) {
        return false;
      }

      if (!parsedGroup.filters.every(isValidFilter)) {
        return false;
      }
    }
  }

  if ("search" in value) {
    const search = (value as Record<string, unknown>).search;

    if (typeof search !== "object" || search === null) {
      return false;
    }

    if (
      !hasStringProp(search, "query") ||
      !hasBooleanProp(search, "isRegex") ||
      !hasBooleanProp(search, "caseSensitive") ||
      !hasBooleanProp(search, "wholeWord")
    ) {
      return false;
    }
  }

  return true;
}

export function loadViews(): SavedView[] {
  const rawViews = loadFromStorage(REQUESTBIN_VIEWS_STORAGE_KEY);

  if (!Array.isArray(rawViews)) {
    return [];
  }

  return rawViews.filter(isValidSavedView).slice(0, MAX_VIEWS);
}

export function saveViews(views: SavedView[]): void {
  saveToStorage(REQUESTBIN_VIEWS_STORAGE_KEY, views);
}

export function loadActiveViewId(): string {
  const activeViewId = loadFromStorage(REQUESTBIN_ACTIVE_VIEW_STORAGE_KEY);
  return typeof activeViewId === "string" ? activeViewId : "default";
}

export function saveActiveViewId(viewId: string): void {
  saveToStorage(REQUESTBIN_ACTIVE_VIEW_STORAGE_KEY, viewId);
}

export function loadPanelWidth(): number {
  try {
    const savedWidth = localStorage.getItem(REQUESTBIN_PANEL_WIDTH_STORAGE_KEY);

    if (savedWidth === null) {
      return DEFAULT_PANEL_WIDTH;
    }

    const numericWidth = Number(savedWidth);

    if (Number.isNaN(numericWidth)) {
      return DEFAULT_PANEL_WIDTH;
    }

    return Math.max(MIN_PANEL_WIDTH, Math.min(numericWidth, MAX_PANEL_WIDTH));
  } catch {
    return DEFAULT_PANEL_WIDTH;
  }
}

export function savePanelWidth(width: number): void {
  try {
    localStorage.setItem(REQUESTBIN_PANEL_WIDTH_STORAGE_KEY, String(width));
  } catch {
    // localStorage may be unavailable or full
  }
}
