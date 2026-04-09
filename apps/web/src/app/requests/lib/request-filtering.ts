import type { CapturedRequest } from "@/tools/request-bin/types";

import type { FilterGroup, FilterOperator, FilterState, SingleFilter } from "../requests-page.types";

export function createFilterId(): string {
  return Math.random().toString(36).substring(2, 10);
}

export function createDefaultFilterState(): FilterState {
  return { logic: "AND", groups: [] };
}

export function operatorLabel(operator: FilterOperator): string {
  const labels: Record<FilterOperator, string> = {
    is: "is",
    is_any_of: "is any of",
    is_none_of: "is none of",
    contains: "contains",
    not_contains: "does not contain",
    starts_with: "starts with",
    equals: "equals",
    after: "after",
    before: "before",
    between: "between",
  };

  return labels[operator];
}

export function filterDisplayValue(filter: SingleFilter): string {
  if (filter.operator === "is_any_of" || filter.operator === "is_none_of") {
    return filter.values?.join(", ") ?? "";
  }

  if (filter.operator === "between") {
    return `${filter.value} - ${filter.valueTo ?? ""}`;
  }

  return filter.value;
}

export function matchesSingleFilter(
  request: CapturedRequest,
  filter: SingleFilter,
): boolean {
  switch (filter.field) {
    case "method": {
      if (filter.operator === "is") {
        return request.method === filter.value;
      }

      if (filter.operator === "is_any_of") {
        return filter.values?.includes(request.method) ?? false;
      }

      if (filter.operator === "is_none_of") {
        return !(filter.values?.includes(request.method) ?? false);
      }

      return true;
    }

    case "path": {
      const path = request.path.toLowerCase();
      const value = filter.value.toLowerCase();

      if (filter.operator === "contains") {
        return path.includes(value);
      }

      if (filter.operator === "not_contains") {
        return !path.includes(value);
      }

      if (filter.operator === "starts_with") {
        return path.startsWith(value);
      }

      if (filter.operator === "equals") {
        return path === value;
      }

      return true;
    }

    case "time": {
      const timestamp = new Date(request.timestamp).getTime();

      if (filter.operator === "after") {
        return timestamp > new Date(filter.value).getTime();
      }

      if (filter.operator === "before") {
        return timestamp < new Date(filter.value).getTime();
      }

      if (filter.operator === "between") {
        const from = new Date(filter.value).getTime();
        const to = new Date(filter.valueTo ?? "").getTime();

        return timestamp >= from && timestamp <= to;
      }

      return true;
    }

    case "body": {
      const bodyString =
        typeof request.body === "string"
          ? request.body
          : JSON.stringify(request.body ?? "");
      const value = filter.value.toLowerCase();
      const normalizedBody = bodyString.toLowerCase();

      if (filter.operator === "contains") {
        return normalizedBody.includes(value);
      }

      if (filter.operator === "not_contains") {
        return !normalizedBody.includes(value);
      }

      return true;
    }

    case "headers": {
      const value = filter.value.toLowerCase();
      const headerString = JSON.stringify(request.headers).toLowerCase();

      if (filter.operator === "contains") {
        return headerString.includes(value);
      }

      if (filter.operator === "not_contains") {
        return !headerString.includes(value);
      }

      return true;
    }
  }
}

function matchesGroup(request: CapturedRequest, group: FilterGroup): boolean {
  if (group.filters.length === 0) {
    return true;
  }

  if (group.logic === "AND") {
    return group.filters.every((filter) => matchesSingleFilter(request, filter));
  }

  return group.filters.some((filter) => matchesSingleFilter(request, filter));
}

export function matchesFilterState(
  request: CapturedRequest,
  state: FilterState,
): boolean {
  if (state.groups.length === 0) {
    return true;
  }

  if (state.logic === "AND") {
    return state.groups.every((group) => matchesGroup(request, group));
  }

  return state.groups.some((group) => matchesGroup(request, group));
}

export function getAllFilters(state: FilterState): SingleFilter[] {
  return state.groups.flatMap((group) => group.filters);
}
