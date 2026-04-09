import type { CapturedRequest } from "@/tools/request-bin/types";

import type { SearchState } from "../requests-page.types";

export function createDefaultSearch(): SearchState {
  return {
    query: "",
    isRegex: false,
    caseSensitive: false,
    wholeWord: false,
  };
}

export function matchesSearch(
  request: CapturedRequest,
  search: SearchState,
): boolean {
  if (!search.query.trim()) {
    return true;
  }

  const searchableContent = [
    request.method,
    request.path,
    request.id,
    request.timestamp,
    JSON.stringify(request.body),
    JSON.stringify(request.headers),
    JSON.stringify(request.query),
  ].join("\n");

  try {
    let pattern: RegExp;

    if (search.isRegex) {
      pattern = new RegExp(search.query, search.caseSensitive ? "" : "i");
    } else {
      const escapedQuery = search.query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const query = search.wholeWord ? `\\b${escapedQuery}\\b` : escapedQuery;
      pattern = new RegExp(query, search.caseSensitive ? "" : "i");
    }

    return pattern.test(searchableContent);
  } catch {
    return false;
  }
}
