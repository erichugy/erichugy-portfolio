"use client";

import { useCallback, useEffect } from "react";

import type { CapturedRequest } from "@/tools/request-bin/types";

import { RequestDetailPanel } from "./components/request-detail-panel";
import { RequestFilterBar } from "./components/request-filter-bar";
import { RequestListPanel } from "./components/request-list-panel";
import { RequestSearchBar } from "./components/request-search-bar";
import { RequestToolbar } from "./components/request-toolbar";
import { RequestViewsBar } from "./components/request-views-bar";
import { useRequestBinData } from "./hooks/use-request-bin-data";
import { useRequestBinFilters } from "./hooks/use-request-bin-filters";
import { useRequestBinUi } from "./hooks/use-request-bin-ui";
import { useResizablePanel } from "./hooks/use-resizable-panel";
import { downloadJsonFile } from "./lib/request-serialization";

export function RequestsPageClient() {
  const {
    clearRequests,
    refreshRequests,
    requests,
  } = useRequestBinData();
  const {
    activeViewId,
    addFilter,
    addFilterGroup,
    allFilters,
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
  } = useRequestBinFilters(requests);
  const {
    activeFieldMenu,
    activeOperatorMenu,
    addingToGroupId,
    closeFilterDropdown,
    collapsed,
    dropdownPosition,
    filterDropdownOpen,
    filterDropdownRef,
    openFieldMenu,
    openFilterDropdown,
    openOperatorMenu,
    pendingInputValue,
    pendingInputValueTo,
    pendingMethodSelections,
    resetSelectedIndex,
    selectedIndex,
    setAddingToGroupId,
    setPendingInputValue,
    setPendingInputValueTo,
    setSelectedIndex,
    tabContextMenuId,
    tabContextMenuRef,
    toggleCollapse,
    toggleMethodSelection,
    toggleTabContextMenu,
  } = useRequestBinUi();
  const { handleResizeStart, isDragging, panelWidth } = useResizablePanel();

  useEffect(() => {
    resetSelectedIndex();
  }, [filterState, resetSelectedIndex, searchState]);

  useEffect(() => {
    if (selectedIndex >= displayedRequests.length) {
      resetSelectedIndex();
    }
  }, [displayedRequests.length, resetSelectedIndex, selectedIndex]);

  const handleDownloadRequest = useCallback((request: CapturedRequest) => {
    downloadJsonFile(
      `requestbin-request-${request.method.toLowerCase()}-${request.id}.json`,
      request,
    );
  }, []);

  const matchCount = searchState.query.trim() ? displayedRequests.length : null;
  const selectedRequest = displayedRequests[selectedIndex] ?? null;

  return (
    <div className="rb-root">
      <RequestToolbar onClear={clearRequests} onRefresh={refreshRequests} />
      <RequestViewsBar
        activeViewId={activeViewId}
        onDeleteView={deleteView}
        onExportView={exportView}
        onImportViews={importViews}
        onRenameView={renameView}
        onSaveView={saveCurrentView}
        onSwitchView={switchView}
        onToggleContextMenu={toggleTabContextMenu}
        savedViews={savedViews}
        tabContextMenuId={tabContextMenuId}
        tabContextMenuRef={tabContextMenuRef}
      />
      <RequestFilterBar
        filterControls={{
          addFilter,
          addFilterGroup,
          allFilters,
          clearAllFilters,
          filterState,
          removeFilter,
          toggleGroupLogic,
          toggleTopLevelLogic,
        }}
        dropdownControls={{
          activeFieldMenu,
          activeOperatorMenu,
          addingToGroupId,
          closeFilterDropdown,
          dropdownPosition,
          filterDropdownOpen,
          filterDropdownRef,
          openFieldMenu,
          openFilterDropdown,
          openOperatorMenu,
          pendingInputValue,
          pendingInputValueTo,
          pendingMethodSelections,
          setAddingToGroupId,
          setPendingInputValue,
          setPendingInputValueTo,
          toggleMethodSelection,
        }}
      />
      <RequestSearchBar
        matchCount={matchCount}
        onQueryChange={setSearchQuery}
        onToggleSearchFlag={toggleSearchFlag}
        searchState={searchState}
      />
      <div className="rb-container">
        <RequestListPanel
          onSelectRequest={setSelectedIndex}
          requests={displayedRequests}
          selectedIndex={selectedIndex}
          width={panelWidth}
        />
        <div
          className={`rb-divider${isDragging ? " rb-dragging" : ""}`}
          onMouseDown={handleResizeStart}
        />
        <RequestDetailPanel
          collapsed={collapsed}
          onDownloadRequest={handleDownloadRequest}
          onToggleCollapse={toggleCollapse}
          selectedRequest={selectedRequest}
        />
      </div>
    </div>
  );
}
