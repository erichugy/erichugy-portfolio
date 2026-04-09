export type FilterLogic = "AND" | "OR";

export type FilterOperator =
  | "is"
  | "is_any_of"
  | "is_none_of"
  | "contains"
  | "not_contains"
  | "starts_with"
  | "equals"
  | "after"
  | "before"
  | "between";

export type FilterField = "method" | "path" | "time" | "body" | "headers";

export type SingleFilter = {
  id: string;
  field: FilterField;
  operator: FilterOperator;
  value: string;
  values?: string[];
  valueTo?: string;
};

export type FilterGroup = {
  id: string;
  logic: FilterLogic;
  filters: SingleFilter[];
};

export type FilterState = {
  logic: FilterLogic;
  groups: FilterGroup[];
};

export type SearchState = {
  query: string;
  isRegex: boolean;
  caseSensitive: boolean;
  wholeWord: boolean;
};

export type CollapsedSections = {
  body: boolean;
  headers: boolean;
  query: boolean;
};

export type SavedView = {
  id: string;
  name: string;
  createdAt: string;
  filterLogic: FilterLogic;
  filterGroups: FilterGroup[];
  search: SearchState;
};

export type DropdownPosition = {
  top: number;
  left: number;
};
