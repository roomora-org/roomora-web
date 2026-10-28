import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { WifiOff, RefreshCw, X, CheckCircle2 } from "lucide-react";
import { useNetworkStatus } from "@/hooks/useNetworkStatus";
import { useHealthPing } from "@/hooks/useHealthPing";

type BannerState = "offline" | "retrying" | "restored" | "hidden";

const RESTORED_VISIBLE_MS = 1400;

export function OfflineBanner() {
  const { isOnline } = useNetworkStatus();
  const { ping, isPinging } = useHealthPing();

  const [state, setState] = useState<BannerState>("hidden");
  const [dismissed, setDismissed] = useState(false);
  const restoredTimer = useRef<number | null>(null);

  useEffect(() => {
    if (!isOnline) {
      setState("offline");
      setDismissed(false);
    }
  }, [isOnline]);

  useEffect(() => {
    return () => {
      if (restoredTimer.current) window.clearTimeout(restoredTimer.current);
    };
  }, []);

  const handleRetry = useCallback(async () => {
    if (isPinging) return;
    setState("retrying");

    const result = await ping();

    if (result.ok) {
      setState("restored");
      if (restoredTimer.current) window.clearTimeout(restoredTimer.current);
      restoredTimer.current = window.setTimeout(() => {
        setState("hidden");
        setDismissed(false);
      }, RESTORED_VISIBLE_MS);
    } else {
      setState("offline");
    }
  }, [isPinging, ping]);

  const show = !dismissed && state !== "hidden";
  const isRetrying = state === "retrying" || isPinging;
  const isRestored = state === "restored";

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="offline-banner"
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed top-4 left-0 right-0 z-[9999] flex justify-center px-4 pointer-events-none"
          role="alert"
          aria-live="assertive"
        >
          <div
            className={[
              "pointer-events-auto relative w-full sm:w-auto sm:min-w-[420px] sm:max-w-lg",
              "overflow-hidden rounded-2xl",
              "border backdrop-blur-xl backdrop-saturate-150",
              "transition-colors duration-300",
              isRestored
                ? [
                    "border-success-500/30",
                    "bg-success-50/85 dark:bg-neutral-900/80",
                    "shadow-[0_12px_32px_-8px_rgba(34,197,94,0.35)]",
                  ].join(" ")
                : [
                    "border-danger-500/30",
                    "bg-danger-50/85 dark:bg-neutral-900/80",
                    "shadow-[0_12px_32px_-8px_rgba(239,68,68,0.35)]",
                  ].join(" "),
            ].join(" ")}
          >
            {/* Subtle glow behind */}
            <div
              aria-hidden
              className={[
                "pointer-events-none absolute -top-16 -right-16 h-32 w-32 rounded-full blur-3xl opacity-50",
                isRestored ? "bg-success-500/40" : "bg-danger-500/40",
              ].join(" ")}
            />

            {/* Top accent line */}
            <div
              className={[
                "absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent to-transparent",
                isRestored ? "via-success-500" : "via-danger-500",
              ].join(" ")}
            />

            <div className="relative flex items-center gap-3 px-4 py-3 sm:px-5 sm:py-3.5">
              {/* Icon */}
              <div className="relative shrink-0">
                {!isRestored && (
                  <span className="absolute inset-0 rounded-full bg-danger-500/25 animate-ping" />
                )}
                <div
                  className={[
                    "relative flex h-10 w-10 items-center justify-center rounded-full ring-1 transition-colors",
                    isRestored
                      ? "bg-success-500/15 text-success-700 dark:text-success-400 ring-success-500/30"
                      : "bg-danger-500/15 text-danger-700 dark:text-danger-400 ring-danger-500/30",
                  ].join(" ")}
                >
                  {isRestored ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : isRetrying ? (
                    <RefreshCw className="h-5 w-5 animate-spin" />
                  ) : (
                    <WifiOff className="h-5 w-5" />
                  )}
                </div>
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-fg-strong leading-tight">
                  {isRestored
                    ? "Connection restored"
                    : isRetrying
                      ? "Reconnecting…"
                      : "You're offline"}
                </p>
                <p className="text-xs text-fg-muted leading-snug mt-0.5">
                  {isRestored
                    ? "You're back online."
                    : isRetrying
                      ? "Checking your connection…"
                      : "Please check your internet connection."}
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0">
                {!isRestored && (
                  <button
                    type="button"
                    onClick={handleRetry}
                    disabled={isRetrying}
                    className={[
                      "inline-flex items-center gap-1.5",
                      "rounded-lg px-3 py-1.5",
                      "text-xs font-semibold",
                      "bg-danger-500 hover:bg-danger-600",
                      "text-white",
                      "shadow-sm shadow-danger-500/30",
                      "transition-colors",
                      "disabled:opacity-60 disabled:cursor-not-allowed",
                    ].join(" ")}
                    aria-label="Retry connection"
                  >
                    <RefreshCw
                      className={`h-3.5 w-3.5 ${isRetrying ? "animate-spin" : ""}`}
                    />
                    {isRetrying ? "Checking" : "Retry"}
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setDismissed(true)}
                  className={[
                    "inline-flex items-center justify-center h-8 w-8 rounded-lg",
                    "text-fg-muted",
                    "hover:bg-danger-500/10 hover:text-danger-700",
                    "dark:hover:text-danger-300",
                    "transition-colors",
                  ].join(" ")}
                  aria-label="Dismiss"
                  title="Dismiss"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Bottom progress */}
            <div className="relative h-[2px] w-full overflow-hidden">
              {isRetrying && (
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{
                    duration: 1.4,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-danger-500 to-transparent"
                />
              )}
              {isRestored && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: RESTORED_VISIBLE_MS / 1000 }}
                  className="absolute inset-y-0 left-0 right-0 origin-left bg-success-500"
                />
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}