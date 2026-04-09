"use client";

import {
  type MouseEvent as ReactMouseEvent,
  type RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import type {
  CollapsedSections,
  DropdownPosition,
  FilterField,
  FilterOperator,
} from "../requests-page.types";

function refContainsTarget<T extends HTMLElement>(
  ref: RefObject<T | null>,
  event: MouseEvent,
): boolean {
  return ref.current !== null && event.target instanceof Node && ref.current.contains(event.target);
}

export function useRequestBinUi() {
  const [activeFieldMenu, setActiveFieldMenuState] = useState<FilterField | null>(null);
  const [activeOperatorMenu, setActiveOperatorMenuState] =
    useState<FilterOperator | null>(null);
  const [addingToGroupId, setAddingToGroupId] = useState<string | null>(null);
  const [collapsed, setCollapsed] = useState<CollapsedSections>({
    body: false,
    headers: false,
    query: false,
  });
  const [dropdownPosition, setDropdownPosition] = useState<DropdownPosition | null>(
    null,
  );
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [pendingInputValue, setPendingInputValue] = useState("");
  const [pendingInputValueTo, setPendingInputValueTo] = useState("");
  const [pendingMethodSelections, setPendingMethodSelections] = useState<Set<string>>(
    new Set(),
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [tabContextMenuId, setTabContextMenuId] = useState<string | null>(null);
  const filterDropdownRef = useRef<HTMLDivElement>(null);
  const tabContextMenuRef = useRef<HTMLSpanElement>(null);

  const resetPendingFilterInputs = useCallback(() => {
    setPendingMethodSelections(new Set());
    setPendingInputValue("");
    setPendingInputValueTo("");
  }, []);

  const closeFilterDropdown = useCallback(() => {
    setFilterDropdownOpen(false);
    setActiveFieldMenuState(null);
    setActiveOperatorMenuState(null);
    setAddingToGroupId(null);
    setDropdownPosition(null);
    resetPendingFilterInputs();
  }, [resetPendingFilterInputs]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (
        filterDropdownRef.current &&
        !refContainsTarget(filterDropdownRef, event)
      ) {
        closeFilterDropdown();
      }
    };

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [closeFilterDropdown]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (
        tabContextMenuRef.current &&
        !refContainsTarget(tabContextMenuRef, event)
      ) {
        setTabContextMenuId(null);
      }
    };

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  const openFilterDropdown = useCallback(
    (
      event: ReactMouseEvent<HTMLButtonElement>,
      groupId: string | null,
    ) => {
      const buttonRect = event.currentTarget.getBoundingClientRect();
      const dropdownWidth = 220;
      const left =
        buttonRect.right + dropdownWidth > window.innerWidth
          ? buttonRect.left - dropdownWidth
          : buttonRect.right + 4;

      setDropdownPosition({
        top: buttonRect.bottom + 4,
        left: Math.max(0, left),
      });
      setAddingToGroupId(groupId);
      setFilterDropdownOpen(true);
      setActiveFieldMenuState(null);
      setActiveOperatorMenuState(null);
      resetPendingFilterInputs();
    },
    [resetPendingFilterInputs],
  );

  const openFieldMenu = useCallback(
    (field: FilterField) => {
      setActiveFieldMenuState(field);
      setActiveOperatorMenuState(null);
      resetPendingFilterInputs();
    },
    [resetPendingFilterInputs],
  );

  const openOperatorMenu = useCallback(
    (operator: FilterOperator) => {
      setActiveOperatorMenuState(operator);
      resetPendingFilterInputs();
    },
    [resetPendingFilterInputs],
  );

  const resetSelectedIndex = useCallback(() => {
    setSelectedIndex(0);
  }, []);

  const toggleCollapse = useCallback((section: keyof CollapsedSections) => {
    setCollapsed((previousState) => ({
      ...previousState,
      [section]: !previousState[section],
    }));
  }, []);

  const toggleMethodSelection = useCallback((method: string) => {
    setPendingMethodSelections((previousSelections) => {
      const nextSelections = new Set(previousSelections);

      if (nextSelections.has(method)) {
        nextSelections.delete(method);
      } else {
        nextSelections.add(method);
      }

      return nextSelections;
    });
  }, []);

  const toggleTabContextMenu = useCallback((viewId: string) => {
    setTabContextMenuId((previousViewId) =>
      previousViewId === viewId ? null : viewId,
    );
  }, []);

  return {
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
  };
}
