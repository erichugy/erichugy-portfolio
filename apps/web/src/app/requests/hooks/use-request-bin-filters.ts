"use client";

import { startTransition, useCallback, useEffect, useMemo, useState } from "react";

import type { CapturedRequest } from "@/tools/request-bin/types";

import {
  createDefaultFilterState,
  createFilterId,
  getAllFilters,
  matchesFilterState,
} from "../lib/request-filtering";
import {
  loadActiveViewId,
  isValidSavedView,
  loadViews,
  saveActiveViewId,
  saveViews,
} from "../lib/request-persistence";
import { matchesSearch, createDefaultSearch } from "../lib/request-search";
import { downloadJsonFile } from "../lib/request-serialization";
import {
  MAX_SEARCH_QUERY_LENGTH,
  MAX_VIEW_NAME_LENGTH,
  MAX_VIEWS,
} from "../requests-page.constants";
import type {
  FilterField,
  FilterOperator,
  FilterState,
  SavedView,
  SearchState,
} from "../requests-page.types";

function createViewId(): string {
  return typeof crypto.randomUUID === "function"
    ? crypto.randomUUID()
    : createFilterId();
}

function applySavedView(view: SavedView) {
  return {
    filterState: {
      logic: view.filterLogic ?? "AND",
      groups: view.filterGroups ?? [],
    } satisfies FilterState,
    searchState: {
      query: view.search?.query ?? "",
      isRegex: Boolean(view.search?.isRegex),
      caseSensitive: Boolean(view.search?.caseSensitive),
      wholeWord: Boolean(view.search?.wholeWord),
    } satisfies SearchState,
  };
}

function loadPersistedFilterState() {
  const savedViews = loadViews();
  const activeViewId = loadActiveViewId();
  const activeView =
    activeViewId === "default"
      ? null
      : savedViews.find((view) => view.id === activeViewId) ?? null;

  if (activeView === null) {
    return {
      activeViewId: "default",
      filterState: createDefaultFilterState(),
      savedViews,
      searchState: createDefaultSearch(),
    };
  }

  const nextState = applySavedView(activeView);

  return {
    activeViewId: activeView.id,
    filterState: nextState.filterState,
    savedViews,
    searchState: nextState.searchState,
  };
}

export function useRequestBinFilters(requests: CapturedRequest[]) {
  const [activeViewId, setActiveViewId] = useState("default");
  const [filterState, setFilterState] = useState<FilterState>(createDefaultFilterState);
  const [savedViews, setSavedViews] = useState<SavedView[]>([]);
  const [searchState, setSearchState] = useState<SearchState>(createDefaultSearch);

  useEffect(() => {
    const nextState = loadPersistedFilterState();

    startTransition(() => {
      setActiveViewId(nextState.activeViewId);
      setFilterState(nextState.filterState);
      setSavedViews(nextState.savedViews);
      setSearchState(nextState.searchState);
    });
  }, []);

  const displayedRequests = useMemo(() => {
    const filteredRequests = requests.filter((request) =>
      matchesFilterState(request, filterState),
    );

    if (!searchState.query.trim()) {
      return filteredRequests;
    }

    return filteredRequests.filter((request) => matchesSearch(request, searchState));
  }, [filterState, requests, searchState]);

  const addFilter = useCallback(
    (
      groupId: string | null,
      field: FilterField,
      operator: FilterOperator,
      value: string,
      values?: string[],
      valueTo?: string,
    ) => {
      const nextFilter = {
        id: createFilterId(),
        field,
        operator,
        value,
        valueTo,
        values,
      };

      setFilterState((previousState) => {
        if (groupId !== null) {
          return {
            ...previousState,
            groups: previousState.groups.map((group) =>
              group.id === groupId
                ? { ...group, filters: [...group.filters, nextFilter] }
                : group,
            ),
          };
        }

        if (previousState.groups.length === 0) {
          return {
            ...previousState,
            groups: [
              {
                id: createFilterId(),
                logic: "AND",
                filters: [nextFilter],
              },
            ],
          };
        }

        const [firstGroup, ...remainingGroups] = previousState.groups;

        return {
          ...previousState,
          groups: [
            { ...firstGroup, filters: [...firstGroup.filters, nextFilter] },
            ...remainingGroups,
          ],
        };
      });
    },
    [],
  );

  const addFilterGroup = useCallback((): string => {
    const nextGroupId = createFilterId();

    setFilterState((previousState) => ({
      ...previousState,
      groups: [
        ...previousState.groups,
        {
          id: nextGroupId,
          logic: "OR",
          filters: [],
        },
      ],
    }));

    return nextGroupId;
  }, []);

  const clearAllFilters = useCallback(() => {
    setFilterState(createDefaultFilterState());
    setSearchState(createDefaultSearch());
  }, []);

  const deleteView = useCallback(
    (viewId: string) => {
      setSavedViews((previousViews) => {
        const nextViews = previousViews.filter((view) => view.id !== viewId);
        saveViews(nextViews);
        return nextViews;
      });

      if (activeViewId === viewId) {
        setActiveViewId("default");
        saveActiveViewId("default");
        setFilterState(createDefaultFilterState());
        setSearchState(createDefaultSearch());
      }
    },
    [activeViewId],
  );

  const exportView = useCallback(
    (viewId: string) => {
      const view = savedViews.find((candidateView) => candidateView.id === viewId);

      if (!view) {
        return;
      }

      const exportDate = new Date().toISOString().slice(0, 10);
      downloadJsonFile(
        `requestbin-view-${view.name.replace(/\s+/g, "-").toLowerCase()}-${exportDate}.json`,
        [view],
      );
    },
    [savedViews],
  );

  const importViews = useCallback((file: File) => {
    const reader = new FileReader();

    reader.onload = () => {
      try {
        const rawViews: unknown = JSON.parse(String(reader.result));

        if (!Array.isArray(rawViews)) {
          return;
        }

        const validViews = rawViews.filter(isValidSavedView);

        if (validViews.length === 0) {
          return;
        }

        setSavedViews((previousViews) => {
          const existingIds = new Set(previousViews.map((view) => view.id));
          const existingNames = new Set(
            previousViews.map((view) => view.name.toLowerCase()),
          );
          const nextViews = validViews.filter(
            (view) =>
              !existingIds.has(view.id) &&
              !existingNames.has(view.name.toLowerCase()),
          );
          const mergedViews = [...previousViews, ...nextViews].slice(-MAX_VIEWS);

          saveViews(mergedViews);
          return mergedViews;
        });
      } catch {
        // file did not contain valid json
      }
    };

    reader.readAsText(file);
  }, []);

  const removeFilter = useCallback((filterId: string) => {
    setFilterState((previousState) => ({
      ...previousState,
      groups: previousState.groups
        .map((group) => ({
          ...group,
          filters: group.filters.filter((filter) => filter.id !== filterId),
        }))
        .filter((group) => group.filters.length > 0),
    }));
  }, []);

  const renameView = useCallback(
    (viewId: string) => {
      const currentView = savedViews.find((view) => view.id === viewId);

      if (!currentView) {
        return;
      }

      const rawName = window.prompt("New name:", currentView.name);

      if (!rawName) {
        return;
      }

      const name = rawName.trim().slice(0, MAX_VIEW_NAME_LENGTH);

      if (name.length < 1) {
        return;
      }

      setSavedViews((previousViews) => {
        const nextViews = previousViews.map((view) =>
          view.id === viewId ? { ...view, name } : view,
        );

        saveViews(nextViews);
        return nextViews;
      });
    },
    [savedViews],
  );

  const saveCurrentView = useCallback(() => {
    const rawName = window.prompt("View name:");

    if (!rawName) {
      return;
    }

    const name = rawName.trim().slice(0, MAX_VIEW_NAME_LENGTH);

    if (name.length < 1) {
      return;
    }

    const nextView: SavedView = {
      id: createViewId(),
      name,
      createdAt: new Date().toISOString(),
      filterLogic: filterState.logic,
      filterGroups: filterState.groups,
      search: searchState,
    };

    setSavedViews((previousViews) => {
      const nextViews = [...previousViews, nextView].slice(-MAX_VIEWS);
      saveViews(nextViews);
      return nextViews;
    });

    setActiveViewId(nextView.id);
    saveActiveViewId(nextView.id);
  }, [filterState, searchState]);

  const setSearchQuery = useCallback((query: string) => {
    setSearchState((previousState) => ({
      ...previousState,
      query: query.slice(0, MAX_SEARCH_QUERY_LENGTH),
    }));
  }, []);

  const switchView = useCallback(
    (viewId: string) => {
      setActiveViewId(viewId);
      saveActiveViewId(viewId);

      if (viewId === "default") {
        setFilterState(createDefaultFilterState());
        setSearchState(createDefaultSearch());
        return;
      }

      const nextView = savedViews.find((view) => view.id === viewId);

      if (!nextView) {
        return;
      }

      const nextState = applySavedView(nextView);
      setFilterState(nextState.filterState);
      setSearchState(nextState.searchState);
    },
    [savedViews],
  );

  const toggleGroupLogic = useCallback((groupId: string) => {
    setFilterState((previousState) => ({
      ...previousState,
      groups: previousState.groups.map((group) =>
        group.id === groupId
          ? { ...group, logic: group.logic === "AND" ? "OR" : "AND" }
          : group,
      ),
    }));
  }, []);

  const toggleSearchFlag = useCallback(
    (flag: keyof Omit<SearchState, "query">) => {
      setSearchState((previousState) => ({
        ...previousState,
        [flag]: !previousState[flag],
      }));
    },
    [],
  );

  const toggleTopLevelLogic = useCallback(() => {
    setFilterState((previousState) => ({
      ...previousState,
      logic: previousState.logic === "AND" ? "OR" : "AND",
    }));
  }, []);

  return {
    activeViewId,
    addFilter,
    addFilterGroup,
    allFilters: getAllFilters(filterState),
    clearAllFilters,
    deleteView,
    displayedRequests,
    exportView,
    filterState,
    importViews,
    removeFilter,
    renameView,
    saveCurrentView,
    savedViews,
    searchState,
    setSearchQuery,
    switchView,
    toggleGroupLogic,
    toggleSearchFlag,
    toggleTopLevelLogic,
  };
}
