import { Toaster as SonnerToaster } from "sonner";

export function Toaster() {
  return (
    <SonnerToaster
      position="top-right"
      richColors
      closeButton
      toastOptions={{
        classNames: {
          toast: "bg-surface-card border-line text-fg",
          title: "text-fg-strong font-semibold",
          description: "text-fg-muted",
          actionButton: "bg-accent-500 text-primary-950",
          cancelButton: "bg-chip text-fg",
        },
      }}
    />
  );
}