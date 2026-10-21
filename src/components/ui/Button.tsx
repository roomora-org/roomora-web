import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "accent" | "outline" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-semibold " +
  "transition-all duration-200 select-none " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500 " +
  "disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-primary-900 text-primary-50 hover:bg-primary-800 " +
    "dark:bg-primary-200 dark:text-primary-950 dark:hover:bg-primary-100",
  // dark text on amber = readable contrast in both themes
  accent:
    "bg-accent-500 text-primary-950 shadow-md shadow-accent-500/25 hover:bg-accent-400 hover:shadow-lg hover:shadow-accent-500/30",
  outline:
    "border border-neutral-300 dark:border-neutral-700 bg-transparent text-fg hover:bg-chip",
  ghost: "bg-transparent text-fg-muted hover:bg-chip hover:text-fg-strong",
  danger: "bg-danger-700 text-white hover:bg-danger-500",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-7 text-base",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  )
);
Button.displayName = "Button";
