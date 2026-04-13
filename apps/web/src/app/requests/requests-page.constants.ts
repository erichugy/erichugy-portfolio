import type { FilterField, FilterOperator } from "./requests-page.types";

export const HTTP_METHODS = [
  "GET",
  "POST",
  "PUT",
  "DELETE",
  "PATCH",
  "HEAD",
  "OPTIONS",
] as const;

export const DEFAULT_PANEL_WIDTH = 340;
export const MIN_PANEL_WIDTH = 200;
export const MAX_PANEL_WIDTH = 800;
export const MAX_VIEWS = 50;
export const MAX_VIEW_NAME_LENGTH = 100;
export const MAX_SEARCH_QUERY_LENGTH = 1000;
export const MAX_FILTER_VALUE_LENGTH = 500;

export const REQUESTBIN_VIEWS_STORAGE_KEY = "requestbin-views-v2";
export const REQUESTBIN_ACTIVE_VIEW_STORAGE_KEY = "requestbin-active-view-v2";
export const REQUESTBIN_PANEL_WIDTH_STORAGE_KEY = "requestbin-panel-width";

export const FIELD_OPERATORS: Record<
  FilterField,
  { value: FilterOperator; label: string }[]
> = {
  method: [
    { value: "is", label: "is" },
    { value: "is_any_of", label: "is any of" },
    { value: "is_none_of", label: "is none of" },
  ],
  path: [
    { value: "contains", label: "contains" },
    { value: "not_contains", label: "does not contain" },
    { value: "starts_with", label: "starts with" },
    { value: "equals", label: "equals" },
  ],
  time: [
    { value: "after", label: "after" },
    { value: "before", label: "before" },
    { value: "between", label: "between" },
  ],
  body: [
    { value: "contains", label: "contains" },
    { value: "not_contains", label: "does not contain" },
  ],
  headers: [
    { value: "contains", label: "contains" },
    { value: "not_contains", label: "does not contain" },
  ],
};

export const FILTER_FIELDS: { value: FilterField; label: string }[] = [
  { value: "method", label: "Method" },
  { value: "path", label: "Path" },
  { value: "time", label: "Time" },
  { value: "body", label: "Body" },
  { value: "headers", label: "Headers" },
];
