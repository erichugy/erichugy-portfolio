import type { MouseEvent as ReactMouseEvent, ReactNode, RefObject } from "react";

import {
  filterDisplayValue,
  operatorLabel,
} from "../lib/request-filtering";
import {
  FIELD_OPERATORS,
  FILTER_FIELDS,
  HTTP_METHODS,
  MAX_FILTER_VALUE_LENGTH,
} from "../requests-page.constants";
import type {
  DropdownPosition,
  FilterField,
  FilterOperator,
  FilterState,
  SingleFilter,
} from "../requests-page.types";

type FilterControls = {
  addFilter: (
    groupId: string | null,
    field: FilterField,
    operator: FilterOperator,
    value: string,
    values?: string[],
    valueTo?: string,
  ) => void;
  addFilterGroup: () => string;
  allFilters: SingleFilter[];
  clearAllFilters: () => void;
  filterState: FilterState;
  removeFilter: (filterId: string) => void;
  toggleGroupLogic: (groupId: string) => void;
  toggleTopLevelLogic: () => void;
};

type DropdownControls = {
  activeFieldMenu: FilterField | null;
  activeOperatorMenu: FilterOperator | null;
  addingToGroupId: string | null;
  closeFilterDropdown: () => void;
  dropdownPosition: DropdownPosition | null;
  filterDropdownOpen: boolean;
  filterDropdownRef: RefObject<HTMLDivElement | null>;
  openFieldMenu: (field: FilterField) => void;
  openFilterDropdown: (
    event: ReactMouseEvent<HTMLButtonElement>,
    groupId: string | null,
  ) => void;
  openOperatorMenu: (operator: FilterOperator) => void;
  pendingInputValue: string;
  pendingInputValueTo: string;
  pendingMethodSelections: Set<string>;
  setAddingToGroupId: (groupId: string | null) => void;
  setPendingInputValue: (value: string) => void;
  setPendingInputValueTo: (value: string) => void;
  toggleMethodSelection: (method: string) => void;
};

type RequestFilterBarProps = {
  dropdownControls: DropdownControls;
  filterControls: FilterControls;
};

export function RequestFilterBar({
  dropdownControls,
  filterControls,
}: RequestFilterBarProps) {
  const {
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
  } = dropdownControls;
  const {
    addFilter,
    addFilterGroup,
    allFilters,
    clearAllFilters,
    filterState,
    removeFilter,
    toggleGroupLogic,
    toggleTopLevelLogic,
  } = filterControls;

  const handleApplyFilter = (field: FilterField, operator: FilterOperator) => {
    if (field === "method") {
      if (
        (operator === "is_any_of" || operator === "is_none_of") &&
        pendingMethodSelections.size > 0
      ) {
        addFilter(addingToGroupId, field, operator, "", [
          ...pendingMethodSelections,
        ]);
      }
      closeFilterDropdown();
      return;
    }

    if (field === "time") {
      if (Number.isNaN(new Date(pendingInputValue).getTime())) {
        return;
      }

      if (
        operator === "between" &&
        Number.isNaN(new Date(pendingInputValueTo).getTime())
      ) {
        return;
      }

      addFilter(
        addingToGroupId,
        field,
        operator,
        pendingInputValue,
        undefined,
        operator === "between" ? pendingInputValueTo : undefined,
      );
      closeFilterDropdown();
      return;
    }

    if (pendingInputValue) {
      addFilter(addingToGroupId, field, operator, pendingInputValue);
      closeFilterDropdown();
    }
  };

  const handleMethodSingleSelect = (method: string) => {
    addFilter(addingToGroupId, "method", "is", method);
    closeFilterDropdown();
  };

  const renderOperatorInput = (
    field: FilterField,
    operator: FilterOperator,
  ): ReactNode => {
    if (field === "method") {
      if (operator === "is") {
        return (
          <div className="rb-submenu">
            {HTTP_METHODS.map((method) => (
              <button
                key={method}
                type="button"
                className="rb-method-option"
                onClick={() => handleMethodSingleSelect(method)}
              >
                <span className={`rb-method rb-method-${method.toLowerCase()}`}>
                  {method}
                </span>
              </button>
            ))}
          </div>
        );
      }

      return (
        <div className="rb-submenu">
          {HTTP_METHODS.map((method) => (
            <label key={method} className="rb-method-option">
              <input
                type="checkbox"
                className="rb-method-checkbox"
                checked={pendingMethodSelections.has(method)}
                onChange={() => toggleMethodSelection(method)}
              />
              <span className={`rb-method rb-method-${method.toLowerCase()}`}>
                {method}
              </span>
            </label>
          ))}
          <div className="rb-submenu-input-row">
            <button
              type="button"
              className="rb-submenu-apply"
              onClick={() => handleApplyFilter(field, operator)}
            >
              Apply
            </button>
          </div>
        </div>
      );
    }

    if (field === "time") {
      if (operator === "between") {
        return (
          <div className="rb-submenu">
            <div className="rb-submenu-input-row">
              <span className="rb-submenu-label">From</span>
              <input
                type="datetime-local"
                className="rb-submenu-input"
                value={pendingInputValue}
                onChange={(event) => setPendingInputValue(event.target.value)}
              />
            </div>
            <div className="rb-submenu-input-row">
              <span className="rb-submenu-label">To</span>
              <input
                type="datetime-local"
                className="rb-submenu-input"
                value={pendingInputValueTo}
                onChange={(event) => setPendingInputValueTo(event.target.value)}
              />
            </div>
            <div className="rb-submenu-input-row">
              <button
                type="button"
                className="rb-submenu-apply"
                onClick={() => handleApplyFilter(field, operator)}
              >
                Apply
              </button>
            </div>
          </div>
        );
      }

      return (
        <div className="rb-submenu">
          <div className="rb-submenu-input-row">
            <input
              type="datetime-local"
              className="rb-submenu-input"
              value={pendingInputValue}
              onChange={(event) => setPendingInputValue(event.target.value)}
            />
            <button
              type="button"
              className="rb-submenu-apply"
              onClick={() => handleApplyFilter(field, operator)}
            >
              Apply
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="rb-submenu">
        <div className="rb-submenu-input-row">
          <input
            type="text"
            className="rb-submenu-input"
            placeholder={`Enter ${field} value...`}
            value={pendingInputValue}
            maxLength={MAX_FILTER_VALUE_LENGTH}
            onChange={(event) =>
              setPendingInputValue(
                event.target.value.slice(0, MAX_FILTER_VALUE_LENGTH),
              )
            }
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleApplyFilter(field, operator);
              }
            }}
          />
          <button
            type="button"
            className="rb-submenu-apply"
            onClick={() => handleApplyFilter(field, operator)}
          >
            Apply
          </button>
        </div>
      </div>
    );
  };

  const renderFilterTree = (): ReactNode => {
    if (allFilters.length === 0) {
      return (
        <div className="rb-filter-header">
          <span className="rb-filter-header-label">Filters</span>
          <button
            type="button"
            className="rb-filter-add-btn"
            onClick={(event) => openFilterDropdown(event, null)}
            title="Add filter"
          >
            +
          </button>
        </div>
      );
    }

    const rows: ReactNode[] = [];
    const hasMultipleGroups = filterState.groups.length > 1;

    filterState.groups.forEach((group, groupIndex) => {
      if (groupIndex > 0) {
        rows.push(
          <div key={`group-${group.id}`} className="rb-filter-row rb-filter-indent">
            <button
              type="button"
              className="rb-group-logic-toggle"
              onClick={toggleTopLevelLogic}
              title={`Click to toggle ${
                filterState.logic === "AND" ? "OR" : "AND"
              }`}
            >
              {filterState.logic}
            </button>
          </div>,
        );
      }

      if (hasMultipleGroups && group.filters.length > 0) {
        group.filters.forEach((filter, filterIndex) => {
          const rowClassName = "rb-filter-row rb-filter-indent-2";

          if (filterIndex > 0) {
            rows.push(
              <div key={`logic-${filter.id}`} className={rowClassName}>
                {filterIndex === 1 ? (
                  <span className="rb-group-bracket rb-group-bracket-spacer">
                    &nbsp;&nbsp;
                  </span>
                ) : null}
                <button
                  type="button"
                  className="rb-group-logic-toggle"
                  onClick={() => toggleGroupLogic(group.id)}
                  title={`Click to toggle ${
                    group.logic === "AND" ? "OR" : "AND"
                  }`}
                >
                  {group.logic}
                </button>
              </div>,
            );
          }

          rows.push(
            <div key={filter.id} className={rowClassName}>
              <span
                className={`rb-group-bracket rb-group-bracket-spacer${
                  filterIndex > 0 ? " rb-group-bracket-hidden" : ""
                }`}
              >
                (
              </span>
              <span className="rb-chip">
                <span className="rb-chip-field">{filter.field}</span>
                {operatorLabel(filter.operator)}
                {filterDisplayValue(filter)}
                <button
                  type="button"
                  className="rb-chip-remove"
                  onClick={() => removeFilter(filter.id)}
                  aria-label="Remove filter"
                >
                  ×
                </button>
              </span>
            </div>,
          );
        });

        rows.push(
          <div key={`add-${group.id}`} className="rb-filter-row rb-filter-indent-2">
            <span className="rb-group-bracket rb-group-bracket-hidden rb-group-bracket-spacer">
              (
            </span>
            <button
              type="button"
              className="rb-filter-add-btn"
              onClick={(event) => openFilterDropdown(event, group.id)}
              title="Add filter to group"
            >
              +
            </button>
            <span className="rb-group-bracket rb-group-bracket-close">)</span>
          </div>,
        );

        return;
      }

      group.filters.forEach((filter, filterIndex) => {
        if (filterIndex > 0) {
          rows.push(
            <div key={`logic-${filter.id}`} className="rb-filter-row rb-filter-indent">
              <button
                type="button"
                className="rb-group-logic-toggle"
                onClick={() => toggleGroupLogic(group.id)}
                title={`Click to toggle ${group.logic === "AND" ? "OR" : "AND"}`}
              >
                {group.logic}
              </button>
            </div>,
          );
        }

        rows.push(
          <div key={filter.id} className="rb-filter-row rb-filter-indent">
            <span className="rb-chip">
              <span className="rb-chip-field">{filter.field}</span>
              {operatorLabel(filter.operator)}
              {filterDisplayValue(filter)}
              <button
                type="button"
                className="rb-chip-remove"
                onClick={() => removeFilter(filter.id)}
                aria-label="Remove filter"
              >
                ×
              </button>
            </span>
          </div>,
        );
      });

      rows.push(
        <div key={`add-${group.id}`} className="rb-filter-row rb-filter-indent">
          <button
            type="button"
            className="rb-filter-add-btn"
            onClick={(event) => openFilterDropdown(event, group.id)}
            title="Add filter to group"
          >
            +
          </button>
        </div>,
      );
    });

    rows.push(
      <div key="add-top" className="rb-filter-row rb-filter-indent">
        <button
          type="button"
          className="rb-filter-add-btn"
          onClick={(event) => openFilterDropdown(event, null)}
          title="Add filter"
        >
          +
        </button>
        <button
          type="button"
          className="rb-filter-clear-all"
          onClick={clearAllFilters}
        >
          Clear all
        </button>
      </div>,
    );

    return (
      <>
        <div className="rb-filter-header">
          <span className="rb-filter-header-label">Filters</span>
        </div>
        <div className="rb-filter-tree">{rows}</div>
      </>
    );
  };

  const renderFilterDropdown = (): ReactNode => {
    if (!filterDropdownOpen || dropdownPosition === null) {
      return null;
    }

    return (
      <div
        className="rb-filter-dropdown"
        ref={filterDropdownRef}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            closeFilterDropdown();
          }
        }}
        style={{
          left: dropdownPosition.left,
          position: "fixed",
          top: dropdownPosition.top,
        }}
      >
        <div className="rb-filter-dropdown-title">Add Filter...</div>
        <div className="rb-filter-dropdown-divider" />
        <button
          type="button"
          className="rb-filter-dropdown-item"
          onClick={() => {
            const newGroupId = addFilterGroup();
            setAddingToGroupId(newGroupId);
          }}
        >
          <span>( ) Add filter group</span>
        </button>
        <div className="rb-filter-dropdown-divider" />
        {FILTER_FIELDS.map((fieldOption) => (
          <div key={fieldOption.value} className="rb-submenu-wrap">
            <button
              type="button"
              className="rb-filter-dropdown-item"
              onMouseEnter={() => openFieldMenu(fieldOption.value)}
              onFocus={() => openFieldMenu(fieldOption.value)}
            >
              <span>{fieldOption.label}</span>
              <span className="rb-arrow">&#9656;</span>
            </button>
            {activeFieldMenu === fieldOption.value &&
              (() => {
                const submenuWidth = 220;
                const parentRight = dropdownPosition.left + 220;
                const shouldFlip = parentRight + submenuWidth > window.innerWidth;
                const submenuLeft = shouldFlip
                  ? dropdownPosition.left - submenuWidth
                  : parentRight;

                return (
                  <div
                    className="rb-submenu"
                    style={{
                      left: Math.max(0, submenuLeft),
                      position: "fixed",
                      top: dropdownPosition.top,
                    }}
                  >
                    {FIELD_OPERATORS[fieldOption.value].map((operatorOption) => (
                      <div key={operatorOption.value} className="rb-submenu-wrap">
                        <button
                          type="button"
                          className="rb-filter-dropdown-item"
                          onMouseEnter={() => openOperatorMenu(operatorOption.value)}
                          onFocus={() => openOperatorMenu(operatorOption.value)}
                          onClick={() => {
                            if (
                              fieldOption.value !== "method" &&
                              fieldOption.value !== "time"
                            ) {
                              openOperatorMenu(operatorOption.value);
                            }
                          }}
                        >
                          <span>{operatorOption.label}</span>
                          <span className="rb-arrow">&#9656;</span>
                        </button>
                        {activeOperatorMenu === operatorOption.value &&
                          (() => {
                            const operatorSubmenuWidth = 220;
                            const parentSubmenuRight = submenuLeft + submenuWidth;
                            const shouldFlipOperator =
                              parentSubmenuRight + operatorSubmenuWidth >
                              window.innerWidth;
                            const operatorLeft = shouldFlipOperator
                              ? submenuLeft - operatorSubmenuWidth
                              : parentSubmenuRight;

                            return (
                              <div
                                className="rb-operator-submenu"
                                style={{
                                  left: Math.max(0, operatorLeft),
                                  position: "fixed",
                                  top: dropdownPosition.top,
                                }}
                              >
                                {renderOperatorInput(
                                  fieldOption.value,
                                  operatorOption.value,
                                )}
                              </div>
                            );
                          })()}
                      </div>
                    ))}
                  </div>
                );
              })()}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="rb-filter-area">
      {renderFilterTree()}
      {renderFilterDropdown()}
    </div>
  );
}
