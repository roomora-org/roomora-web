import { forwardRef, useId, useState, type InputHTMLAttributes } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

type InputSize = "sm" | "md" | "lg";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  inputSize?: InputSize;
  fullWidth?: boolean;
}

const sizeMap: Record<
  InputSize,
  { height: string; text: string; radius: string; icon: string; leftPad: string; rightPad: string; togglePad: string }
> = {
  sm: {
    height: "h-9",
    text: "text-sm",
    radius: "rounded-lg",
    icon: "h-3.5 w-3.5",
    leftPad: "pl-8",
    rightPad: "pr-8",
    togglePad: "pr-8",
  },
  md: {
    height: "h-10 sm:h-11",
    text: "text-sm sm:text-base",
    radius: "rounded-lg sm:rounded-xl",
    icon: "h-4 w-4",
    leftPad: "pl-9",
    rightPad: "pr-9",
    togglePad: "pr-9",
  },
  lg: {
    height: "h-12",
    text: "text-base",
    radius: "rounded-xl",
    icon: "h-5 w-5",
    leftPad: "pl-11",
    rightPad: "pr-11",
    togglePad: "pr-11",
  },
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      inputSize = "md",
      fullWidth = true,
      type = "text",
      className,
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";
    const actualType = isPassword && showPassword ? "text" : type;
    const hasError = !!error;

    // stable id (the old Math.random() changed on every render, breaking label <-> input links)
    const autoId = useId();
    const inputId = id || props.name || autoId;
    const s = sizeMap[inputSize];

    const hasLeftIcon = !!leftIcon;
    const hasRightIcon = isPassword || !!rightIcon;

    const paddingLeft = hasLeftIcon ? s.leftPad : "pl-3 sm:pl-4";
    const paddingRight = hasRightIcon ? s.togglePad : "pr-3 sm:pr-4";

    return (
      <div className={cn("flex flex-col gap-1.5", fullWidth && "w-full")}>
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-fg">
            {label}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div
              className={cn(
                "absolute left-3 top-1/2 -translate-y-1/2 text-fg-muted pointer-events-none flex items-center justify-center",
                s.icon
              )}
            >
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            type={actualType}
            disabled={disabled}
            aria-invalid={hasError}
            aria-describedby={
              hasError
                ? `${inputId}-error`
                : helperText
                ? `${inputId}-helper`
                : undefined
            }
            className={cn(
              "w-full border bg-surface text-fg placeholder:text-fg-muted/50",
              "focus:outline-none focus:ring-2 transition-all",
              "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-chip",
              s.height,
              s.text,
              s.radius,
              paddingLeft,
              paddingRight,
              hasError
                ? "border-danger-500 focus:ring-danger-500/30"
                : "border-line-strong focus:ring-accent-500/40 focus:border-accent-400",
              className
            )}
            {...props}
          />

          {isPassword ? (
            <button
              type="button"
              onClick={() => setShowPassword((p) => !p)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-fg-muted hover:text-fg transition-colors flex items-center justify-center"
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
            >
              {showPassword ? (
                <EyeOff className={s.icon} />
              ) : (
                <Eye className={s.icon} />
              )}
            </button>
          ) : (
            rightIcon && (
              <div
                className={cn(
                  "absolute right-3 top-1/2 -translate-y-1/2 text-fg-muted pointer-events-none flex items-center justify-center",
                  s.icon
                )}
              >
                {rightIcon}
              </div>
            )
          )}
        </div>

        {hasError && (
          <p
            id={`${inputId}-error`}
            className="text-xs text-danger-700 dark:text-danger-500"
          >
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

Input.displayName = "Input";