"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import type { CapturedRequest } from "@/tools/request-bin/types";

import { isCapturedRequest } from "../lib/request-serialization";

export function useRequestBinData() {
  const [requests, setRequests] = useState<CapturedRequest[]>([]);
  const activeControllerRef = useRef<AbortController | null>(null);
  const fetchIdRef = useRef(0);
  const isClearingRef = useRef(false);
  const isMountedRef = useRef(true);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
      activeControllerRef.current?.abort();
    };
  }, []);

  const refreshRequests = useCallback((): AbortController => {
    activeControllerRef.current?.abort();

    const currentFetchId = ++fetchIdRef.current;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10_000);

    activeControllerRef.current = controller;

    void (async () => {
      try {
        const response = await fetch("/api/requests", { signal: controller.signal });

        if (!response.ok) {
          return;
        }

        const rawRequests: unknown = await response.json().catch(() => null);

        if (!Array.isArray(rawRequests)) {
          return;
        }

        const validatedRequests = rawRequests.filter(isCapturedRequest);

        if (isMountedRef.current && fetchIdRef.current === currentFetchId) {
          setRequests(validatedRequests);
        }
      } catch {
        // request was aborted or failed
      } finally {
        clearTimeout(timeoutId);
      }
    })();

    return controller;
  }, []);

  useEffect(() => {
    const controller = refreshRequests();

    return () => {
      controller.abort();
    };
  }, [refreshRequests]);

  const clearRequests = useCallback(async () => {
    if (isClearingRef.current) {
      return;
    }

    isClearingRef.current = true;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10_000);

    try {
      await fetch("/api/requests", {
        method: "DELETE",
        signal: controller.signal,
      });

      if (isMountedRef.current) {
        setRequests([]);
      }
    } catch {
      // request was aborted or failed
    } finally {
      clearTimeout(timeoutId);
      isClearingRef.current = false;
    }
  }, []);

  return {
    clearRequests,
    refreshRequests,
    requests,
  };
}
