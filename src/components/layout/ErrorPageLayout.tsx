import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Logo } from "@/components/ui/Logo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

type Tone = "danger" | "accent";

interface ErrorPageLayoutProps {
  /** Big status code, e.g. "404". Leave out for icon-style pages (401/403). */
  code?: string;
  /** A lucide icon element, e.g. <Lock className="h-10 w-10" /> */
  icon?: React.ReactNode;
  tone?: Tone;
  title: string;
  description: string;
  /** Optional extra line under the description (e.g. the missing URL) */
  detail?: React.ReactNode;
  /** Action buttons */
  children: React.ReactNode;
}

const toneStyles: Record<Tone, string> = {
  danger: "bg-danger-50 dark:bg-danger-500/15 text-danger-700 dark:text-danger-500",
  accent: "bg-accent-100 dark:bg-accent-500/15 text-accent-600 dark:text-accent-400",
};

/**
 * Shared shell for 401 / 403 / 404 / 500.
 * Same top bar as the auth pages (logo + theme toggle) and no solid background,
 * so the dotted page background and the global Spotlight stay visible.
 */
export function ErrorPageLayout({
  code,
  icon,
  tone = "accent",
  title,
  description,
  detail,
  children,
}: ErrorPageLayoutProps) {
  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      <header className="relative z-10 flex items-center justify-between px-4 sm:px-6 lg:px-10 py-4 sm:py-5">
        <Link to="/" className="flex items-center gap-2 group" aria-label="Roomora home">
          <Logo className="h-9 sm:h-10 transition-transform group-hover:scale-105" />
          <span className="text-xl sm:text-2xl font-bold text-fg-strong tracking-tight">
            Roomora
          </span>
        </Link>
        <ThemeToggle />
      </header>

      <main className="relative z-10 flex-1 flex items-center justify-center px-6 py-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-72 w-72 rounded-full bg-accent-500/10 blur-[100px]"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative text-center max-w-md"
        >
          {code && (
            <p
              aria-hidden="true"
              className="text-8xl sm:text-9xl font-black tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-b from-primary-900 to-accent-600 dark:from-primary-200 dark:to-accent-400"
            >
              {code}
            </p>
          )}

          {icon && (
            <div
              aria-hidden="true"
              className={`inline-flex items-center justify-center h-20 w-20 rounded-full mb-6 ${toneStyles[tone]}`}
            >
              {icon}
            </div>
          )}

          <h1 className="text-2xl sm:text-3xl font-bold text-fg-strong mb-3">{title}</h1>
          <p className="text-fg-muted mb-4 leading-relaxed">{description}</p>

          {detail && <div className="mb-6">{detail}</div>}
          {!detail && <div className="mb-4" />}

          <div className="flex flex-col sm:flex-row gap-3 justify-center">{children}</div>
        </motion.div>
      </main>
    </div>
  );
}
