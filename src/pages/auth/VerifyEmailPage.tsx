import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { AuthCard } from "@/components/auth/AuthCard";
import { SEO } from "@/components/layout";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { authService } from "@/services/auth.service";
import { showApiError } from "@/lib/api-error";
import {
  Mail,
  Loader2,
  CheckCircle2,
  XCircle,
  ArrowLeft,
  Send,
} from "lucide-react";

export default function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const isPending = searchParams.get("pending") === "true";
  const emailFromQuery = searchParams.get("email") || "";

  if (isPending) {
    return <PendingVerificationCard initialEmail={emailFromQuery} />;
  }
  if (token) {
    return <VerifyTokenCard token={token} />;
  }
  return <PendingVerificationCard initialEmail="" />;
}

function PendingVerificationCard({ initialEmail }: { initialEmail: string }) {
  const [email, setEmail] = useState(initialEmail);
  const [cooldown, setCooldown] = useState(0);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  const handleResend = async () => {
    if (!email.trim()) {
      toast.error("Please enter your email address.");
      return;
    }
    setSending(true);
    try {
      await authService.resendVerification(email.trim());
      setCooldown(60);
      toast.success("Verification email sent!", {
        description: "Check your inbox (and spam folder).",
      });
    } catch (error) {
      showApiError(toast.error, error, "Could not resend email");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <SEO
        title="Verify Email"
        description="Please verify your email to continue."
        path="/verify-email"
        noIndex
      />
      <AuthCard title="Verify your email" hideHeader>
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="text-center py-2"
        >
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-accent-100 dark:bg-accent-500/15 mb-5">
            <Mail className="h-8 w-8 text-accent-600 dark:text-accent-400" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-fg-strong mb-2">
            Check your inbox
          </h2>
          <p className="text-sm text-fg-muted mb-6 max-w-sm mx-auto">
            We sent a verification link to your email. Click the link to
            activate your account.
          </p>

          <div className="space-y-3 text-left">
            <Input
              type="email"
              label="Email address"
              placeholder="you@example.com"
              leftIcon={<Mail />}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={sending || cooldown > 0}
              autoComplete="email"
            />

            <Button
              variant="accent"
              size="lg"
              className="w-full"
              onClick={handleResend}
              disabled={sending || cooldown > 0 || !email.trim()}
            >
              {sending ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Sending...
                </>
              ) : cooldown > 0 ? (
                `Resend in ${cooldown}s`
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Resend verification email
                </>
              )}
            </Button>

            <Link to="/login" className="block">
              <Button variant="outline" size="md" className="w-full">
                <ArrowLeft className="h-4 w-4" />
                Back to Sign In
              </Button>
            </Link>
          </div>

          <p className="text-xs text-fg-muted mt-6">
            Didn't receive the email? Check your spam folder, or resend above.
          </p>
        </motion.div>
      </AuthCard>
    </>
  );
}

function VerifyTokenCard({ token }: { token: string }) {
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let cancelled = false;
    const verify = async () => {
      try {
        await authService.verifyEmail(token);
        if (!cancelled) {
          setStatus("success");
          toast.success("Email verified!", {
            description: "You can now sign in to your account.",
          });
        }
      } catch (error) {
        if (cancelled) return;
        
        const msg =
          (error as any)?.response?.data?.message ||
          "The verification link is invalid or has expired.";
        setErrorMessage(msg);
        setStatus("error");
      }
    };
    verify();
    return () => {
      cancelled = true;
    };
  }, [token]);

  if (status === "loading") {
    return (
      <>
        <SEO
          title="Verifying Email"
          description="Please wait while we verify your email."
          path="/verify-email"
          noIndex
        />
        <AuthCard title="Email verification" hideHeader>
          <div className="text-center py-8" role="status" aria-live="polite">
            <Loader2 className="h-10 w-10 animate-spin text-accent-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-fg-strong mb-2">
              Verifying your email...
            </h2>
            <p className="text-sm text-fg-muted">Please wait a moment.</p>
          </div>
        </AuthCard>
      </>
    );
  }

  if (status === "success") {
    return (
      <>
        <SEO
          title="Email Verified"
          description="Your email has been verified."
          path="/verify-email"
          noIndex
        />
        <AuthCard title="Email verified" hideHeader>
          <div className="text-center py-6">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-success-50 dark:bg-success-500/15 mb-4">
              <CheckCircle2 className="h-8 w-8 text-success-700 dark:text-success-500" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-fg-strong mb-2">
              Email verified
            </h2>
            <p className="text-sm text-fg-muted mb-6">
              Your email has been verified successfully. You can now sign in.
            </p>
            <Link to="/login" replace>
              <Button variant="accent" size="lg" className="w-full">
                Continue to Sign In
              </Button>
            </Link>
          </div>
        </AuthCard>
      </>
    );
  }

  return (
    <>
      <SEO
        title="Verification Failed"
        description="The verification link is invalid or expired."
        path="/verify-email"
        noIndex
      />
      <AuthCard title="Verification failed" hideHeader>
        <div className="text-center py-6">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-danger-50 dark:bg-danger-500/15 mb-4">
            <XCircle className="h-8 w-8 text-danger-700 dark:text-danger-500" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-fg-strong mb-2">
            Verification failed
          </h2>
          <p className="text-sm text-fg-muted mb-6">{errorMessage}</p>
          <div className="space-y-3">
            <Link to="/verify-email" replace className="block">
              <Button variant="accent" size="lg" className="w-full">
                <Send className="h-4 w-4" />
                Request new verification link
              </Button>
            </Link>
            <Link to="/login" replace className="block">
              <Button variant="outline" size="md" className="w-full">
                <ArrowLeft className="h-4 w-4" />
                Back to Sign In
              </Button>
            </Link>
          </div>
        </div>
      </AuthCard>
    </>
  );
}