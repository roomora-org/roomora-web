import { cn } from "@/lib/utils";

/**
 * Theme-aware logo.
 * - Light mode: /logo.png      (original brown + orange, transparent)
 * - Dark mode:  /logo-dark.png (brown recolored to cream, orange kept)
 * Both files live in /public. Control the size with a height class: <Logo className="h-10" />
 */
export function Logo({ className }: { className?: string }) {
  return (
    <>
      <img
        src="/logo.png"
        alt="Roomora logo"
        width={426}
        height={640}
        className={cn("w-auto object-contain dark:hidden", className)}
      />
      <img
        src="/logo-dark.png"
        alt=""
        aria-hidden="true"
        width={426}
        height={640}
        className={cn("hidden w-auto object-contain dark:block", className)}
      />
    </>
  );
}
