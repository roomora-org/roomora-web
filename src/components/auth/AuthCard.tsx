import { motion } from "framer-motion";

interface AuthCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function AuthCard({ title, subtitle, children, footer }: AuthCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="w-full max-w-md"
    >
      <div className="mb-6 sm:mb-8 text-center lg:text-left">
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
    </motion.div>
  );
}