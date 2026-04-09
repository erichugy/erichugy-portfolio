import { MAX_SEARCH_QUERY_LENGTH } from "../requests-page.constants";
import type { SearchState } from "../requests-page.types";

type RequestSearchBarProps = {
  matchCount: number | null;
  onQueryChange: (query: string) => void;
  onToggleSearchFlag: (flag: keyof Omit<SearchState, "query">) => void;
  searchState: SearchState;
};

export function RequestSearchBar({
  matchCount,
  onQueryChange,
  onToggleSearchFlag,
  searchState,
}: RequestSearchBarProps) {
  return (
    <div className="rb-search-bar">
      <input
        className="rb-search-input"
        placeholder="Search requests..."
        value={searchState.query}
        maxLength={MAX_SEARCH_QUERY_LENGTH}
        onChange={(event) => onQueryChange(event.target.value)}
      />
      <button
        type="button"
        className={`rb-search-toggle${searchState.isRegex ? " rb-active" : ""}`}
        onClick={() => onToggleSearchFlag("isRegex")}
        title="Regex mode"
      >
        .*
      </button>
      <button
        type="button"
        className={`rb-search-toggle${
          searchState.caseSensitive ? " rb-active" : ""
        }`}
        onClick={() => onToggleSearchFlag("caseSensitive")}
        title="Case sensitive"
      >
        Aa
      </button>
      <button
        type="button"
        className={`rb-search-toggle${searchState.wholeWord ? " rb-active" : ""}`}
        onClick={() => onToggleSearchFlag("wholeWord")}
        title="Whole word"
      >
        {"\\bW\\b"}
      </button>
      {matchCount !== null && (
        <span className="rb-search-count">
          {matchCount} match{matchCount === 1 ? "" : "es"}
        </span>
      )}
    </div>
  );
}
