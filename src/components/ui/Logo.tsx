import { cn } from "@/lib/utils";

type LogoVariant = "auto" | "onDark" | "onLight";

interface LogoProps {
  className?: string;
  /**
   * auto    -> follows the site theme (default)
   * onDark  -> always the cream version (for permanently dark panels, e.g. the auth side panel, CTA)
   * onLight -> always the original brown version
   */
  variant?: LogoVariant;
}

const base = "w-auto object-contain";

export function Logo({ className, variant = "auto" }: LogoProps) {
  if (variant === "onDark") {
    return <img src="/logo-dark.png" alt="Roomora logo" width={426} height={640} className={cn(base, className)} />;
  }
  if (variant === "onLight") {
    return <img src="/logo.png" alt="Roomora logo" width={426} height={640} className={cn(base, className)} />;
  }
  return (
    <>
      <img src="/logo.png" alt="Roomora logo" width={426} height={640} className={cn(base, "dark:hidden", className)} />
      <img src="/logo-dark.png" alt="" aria-hidden="true" width={426} height={640} className={cn(base, "hidden dark:block", className)} />
    </>
  );
}
