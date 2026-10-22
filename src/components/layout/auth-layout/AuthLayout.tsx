import { Link } from "react-router-dom";
import { Logo } from "@/components/ui/Logo";
import { Spotlight } from "@/components/ui/Spotlight";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";

type AuthVariant =
  | "login"
  | "register"
  | "forgot-password"
  | "reset-password"
  | "verify-email";

interface AuthLayoutProps {
  children: React.ReactNode;
  variant?: AuthVariant;
}

interface ContentItem {
  headline: string;
  subline: string;
  features: string[];
  visualSide: "left" | "right";
}

const content: Record<AuthVariant, ContentItem> = {
  login: {
    headline: "Welcome back to Roomora",
    subline:
      "Sign in to manage your hotel operations, reservations, and staff — all from one powerful dashboard.",
    features: [
      "Real-time room readiness",
      "Smart task auto-dispatch",
      "Reservations & billing",
    ],
    visualSide: "left",
  },
  register: {
    headline: "Start your journey with Roomora",
    subline:
      "Join hundreds of boutique hotels streamlining their operations with our smart PMS.",
    features: [
      "14-day free trial",
      "No credit card required",
      "Cancel anytime",
    ],
    visualSide: "right",
  },
  "forgot-password": {
    headline: "Forgot your password?",
    subline:
      "No worries — it happens. Enter your email and we'll send you a secure reset link.",
    features: [
      "Secure reset link",
      "Expires in 15 minutes",
      "Check your spam folder",
    ],
    visualSide: "left",
  },
  "reset-password": {
    headline: "Create a new password",
    subline:
      "Choose a strong password to keep your hotel data safe and secure.",
    features: [
      "Minimum 8 characters",
      "Mix letters & numbers",
      "Avoid common passwords",
    ],
    visualSide: "right",
  },
  "verify-email": {
    headline: "Almost there!",
    subline:
      "We sent a verification link to your email. Click it to activate your account.",
    features: [
      "Check your inbox",
      "Link expires in 24 hours",
      "Can't find it? Check spam",
    ],
    visualSide: "left",
  },
};

const SLIDE_EASE = [0.65, 0, 0.35, 1] as const;

export function AuthLayout({ children, variant = "login" }: AuthLayoutProps) {
  const data = content[variant];
  const visualOnLeft = data.visualSide === "left";

  return (
    <div className="relative min-h-screen flex flex-col bg-surface overflow-hidden">
      <Spotlight />

      {/* Top bar */}
      <header className="relative z-10 flex items-center justify-between px-4 sm:px-6 lg:px-10 py-4 sm:py-5">
        <Link to="/" className="flex items-center gap-2 group">
          <Logo className="h-9 sm:h-10 transition-transform group-hover:scale-105" />
          <span className="text-xl sm:text-2xl font-bold text-fg-strong tracking-tight">
            Roomora
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-4">
          <ThemeToggle />
          <div className="hidden sm:flex items-center gap-5 text-sm">
            <Link
              to="/"
              className="text-fg-muted hover:text-brand transition-colors"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-fg-muted hover:text-brand transition-colors"
            >
              About
            </Link>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-6 py-6 sm:py-8">
        <div className="w-full max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* ---------- Visual Side (hidden on mobile) ---------- */}
            <motion.div
              layout
              transition={{ duration: 0.7, ease: SLIDE_EASE }}
              className={`relative hidden lg:flex flex-col justify-center ${
                visualOnLeft ? "lg:order-1" : "lg:order-2"
              }`}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={variant}
                  initial={{ opacity: 0, x: visualOnLeft ? -40 : 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: visualOnLeft ? 40 : -40 }}
                  transition={{ duration: 0.5, ease: SLIDE_EASE }}
                  className="relative w-full"
                >
                  <div className="relative rounded-3xl overflow-hidden border border-line bg-gradient-to-br from-primary-900 via-primary-950 to-primary-800 p-10 min-h-[560px] flex flex-col justify-center items-center text-center shadow-2xl">
                    <div
                      aria-hidden
                      className="absolute inset-0 opacity-30"
                      style={{
                        backgroundImage:
                          "radial-gradient(rgba(253,250,246,0.12) 1px, transparent 1px)",
                        backgroundSize: "22px 22px",
                      }}
                    />
                    <div
                      aria-hidden
                      className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-accent-500/30 blur-[90px]"
                    />
                    <div
                      aria-hidden
                      className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-primary-500/30 blur-[90px]"
                    />

                    <div className="relative z-10 mb-8">
                      <Logo className="h-24 brightness-0 invert" />
                    </div>

                    <div className="relative z-10 flex flex-col items-center gap-4 w-full max-w-sm">
                      <h2 className="text-3xl font-bold text-primary-50 leading-tight">
                        {data.headline}
                      </h2>
                      <p className="text-primary-200/90 leading-relaxed">
                        {data.subline}
                      </p>
                      <ul className="flex flex-col items-start gap-3 pt-4 w-full">
                        {data.features.map((f) => (
                          <li
                            key={f}
                            className="flex items-start gap-3 text-sm text-primary-100/90"
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-accent-400 mt-1.5 shrink-0" />
                            <span className="text-left">{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* ---------- Form Side ---------- */}
            <motion.div
              layout
              transition={{ duration: 0.7, ease: SLIDE_EASE }}
              className={`w-full flex justify-center ${
                visualOnLeft ? "lg:order-2" : "lg:order-1"
              }`}
            >
              <div className="w-full max-w-md">
                {/* Mobile-only logo above the form */}
                <div className="flex lg:hidden justify-center mb-6">
                  <Logo className="h-16" />
                </div>

                <AnimatePresence mode="wait">{children}</AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 px-4 sm:px-6 lg:px-10 py-4 sm:py-6 border-t border-line">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3 text-xs text-fg-muted text-center sm:text-left">
          <p>© 2026 Roomora. All rights reserved.</p>
          <nav className="flex gap-4 sm:gap-5">
            <Link to="/privacy" className="hover:text-brand transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-brand transition-colors">
              Terms of Service
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}