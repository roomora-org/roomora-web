import { useCallback, useRef, useState } from "react";

const API_BASE =
  (import.meta.env.VITE_API_URL as string | undefined) ||
  "http://localhost:3000";

const PING_TIMEOUT_MS = 4000;

const IS_LOCALHOST =
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1" ||
    window.location.hostname === "0.0.0.0");

export type PingResult =
  | { ok: true; latencyMs: number; source: "browser" | "server" }
  | {
      ok: false;
      reason: "timeout" | "network" | "server" | "browser-offline";
      source: "browser" | "server";
    };

export function useHealthPing() {
  const [isPinging, setIsPinging] = useState(false);
  const [lastResult, setLastResult] = useState<PingResult | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const ping = useCallback(async (): Promise<PingResult> => {
    // On localhost the server is on the same machine, so pinging it
    // does NOT prove internet connectivity. Trust the browser instead.
    if (IS_LOCALHOST) {
      const online =
        typeof navigator !== "undefined" ? navigator.onLine : true;
      const result: PingResult = online
        ? { ok: true, latencyMs: 0, source: "browser" }
        : { ok: false, reason: "browser-offline", source: "browser" };
      setLastResult(result);
      return result;
    }

    setIsPinging(true);
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    const timeoutId = window.setTimeout(
      () => controller.abort(),
      PING_TIMEOUT_MS
    );

    const startedAt = performance.now();
    let result: PingResult;

    try {
      const res = await fetch(`${API_BASE}/health/live`, {
        method: "GET",
        cache: "no-store",
        signal: controller.signal,
      });

      if (!res.ok) {
        result = { ok: false, reason: "server", source: "server" };
      } else {
        result = {
          ok: true,
          latencyMs: Math.round(performance.now() - startedAt),
          source: "server",
        };
      }
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") {
        result = { ok: false, reason: "timeout", source: "server" };
      } else {
        result = { ok: false, reason: "network", source: "server" };
      }
    } finally {
      window.clearTimeout(timeoutId);
      setIsPinging(false);
    }

    setLastResult(result);
    return result;
  }, []);

  const cancel = useCallback(() => {
    abortRef.current?.abort();
  }, []);

  return { ping, cancel, isPinging, lastResult };
}