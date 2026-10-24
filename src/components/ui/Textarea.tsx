import { forwardRef, useId, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
}

/** Same look and behavior as <Input />, for multi-line text. */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { label, error, helperText, fullWidth = true, className, id, disabled, rows = 5, ...props },
    ref
  ) => {
    const autoId = useId();
    const inputId = id || props.name || autoId;
    const hasError = !!error;

    return (
      <div className={cn("flex flex-col gap-1.5", fullWidth && "w-full")}>
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-fg">
            {label}
          </label>
        )}

        <textarea
          ref={ref}
          id={inputId}
          rows={rows}
          disabled={disabled}
          aria-invalid={hasError}
          aria-describedby={
            hasError ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
          }
          className={cn(
            "w-full resize-y border bg-surface px-3 sm:px-4 py-3 text-sm sm:text-base text-fg",
            "rounded-lg sm:rounded-xl placeholder:text-fg-muted/50",
            "focus:outline-none focus:ring-2 transition-all",
            "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-chip",
            hasError
              ? "border-danger-500 focus:ring-danger-500/30"
              : "border-line-strong focus:ring-accent-500/40 focus:border-accent-400",
            className
          )}
          {...props}
        />

        {hasError && (
          <p id={`${inputId}-error`} className="text-xs text-danger-700 dark:text-danger-500">
            {error}
          </p>
        )}
        {!hasError && helperText && (
          <p id={`${inputId}-helper`} className="text-xs text-fg-muted">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
