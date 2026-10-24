import type { CSSProperties } from "react";
import { Toaster as SonnerToaster } from "sonner";
import { useTheme } from "@/context/ThemeContext";

/**
 * Themed toasts.
 * - `theme` follows the site's light/dark switch (sonner defaulted to light).
 * - Colors come from sonner's own CSS variables, mapped to our tokens. Tailwind classes
 *   passed through `toastOptions.classNames` lose to sonner's un-layered CSS, so they
 *   never changed the toast background.
 * - bottom-right: top-right sat exactly on top of the header buttons / theme toggle.
 */
export function Toaster() {
  const { theme } = useTheme();

  return (
    <SonnerToaster
      theme={theme}
      position="bottom-right"
      richColors
      closeButton
      style={
        {
          "--normal-bg": "var(--color-surface-card)",
          "--normal-text": "var(--color-fg)",
          "--normal-border": "var(--color-line)",
        } as CSSProperties
      }
      toastOptions={{
        classNames: {
          title: "font-semibold",
          actionButton: "!bg-accent-500 !text-primary-950",
          cancelButton: "!bg-chip !text-fg",
        },
      }}
    />
  );
}
