interface AuthCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  /** Hide the header visually (kept for screen readers) when the child shows its own heading, e.g. a success screen. */
  hideHeader?: boolean;
}

// No entrance animation here on purpose: AuthLayout already animates every page change,
// a second animation on top made the form "double-slide".
export function AuthCard({ title, subtitle, children, footer, hideHeader = false }: AuthCardProps) {
  return (
    <div className="w-full max-w-md">
      <div className={hideHeader ? "sr-only" : "mb-6 sm:mb-8 text-center lg:text-left"}>
        <h1 className="text-2xl sm:text-3xl font-bold text-fg-strong tracking-tight mb-2">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm text-fg-muted leading-relaxed">{subtitle}</p>
        )}
      </div>

      {children}

      {footer && (
        <div className="mt-6 text-sm text-fg-muted text-center lg:text-left">
          {footer}
        </div>
      )}
    </div>
  );
}
