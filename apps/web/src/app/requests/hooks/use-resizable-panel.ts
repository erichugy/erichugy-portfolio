"use client";

import {
  startTransition,
  type MouseEvent as ReactMouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { loadPanelWidth, savePanelWidth } from "../lib/request-persistence";
import { DEFAULT_PANEL_WIDTH, MAX_PANEL_WIDTH, MIN_PANEL_WIDTH } from "../requests-page.constants";

export function useResizablePanel() {
  const [isDragging, setIsDragging] = useState(false);
  const [panelWidth, setPanelWidth] = useState(DEFAULT_PANEL_WIDTH);
  const cleanupRef = useRef<(() => void) | null>(null);
  const isDraggingRef = useRef(false);
  const panelWidthRef = useRef(panelWidth);

  useEffect(() => {
    const nextWidth = loadPanelWidth();
    panelWidthRef.current = nextWidth;

    startTransition(() => {
      setPanelWidth(nextWidth);
    });

    return () => {
      cleanupRef.current?.();
    };
  }, []);

  useEffect(() => {
    panelWidthRef.current = panelWidth;
  }, [panelWidth]);

  const handleResizeStart = useCallback(
    (event: ReactMouseEvent<HTMLDivElement>) => {
      event.preventDefault();
      isDraggingRef.current = true;
      setIsDragging(true);
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";

      const handleMouseMove = (moveEvent: MouseEvent) => {
        if (!isDraggingRef.current) {
          return;
        }

        const nextWidth = Math.max(
          MIN_PANEL_WIDTH,
          Math.min(moveEvent.clientX, MAX_PANEL_WIDTH),
        );

        setPanelWidth(nextWidth);
      };

      const handleMouseUp = () => {
        isDraggingRef.current = false;
        setIsDragging(false);
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        savePanelWidth(panelWidthRef.current);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);

      cleanupRef.current = () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
      };
    },
    [],
  );

  return {
    handleResizeStart,
    isDragging,
    panelWidth,
  };
}
