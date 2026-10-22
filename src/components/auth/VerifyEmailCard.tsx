import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { authService } from "@/services/auth.service";
import { toast } from "sonner";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";

type Status = "loading" | "success" | "error";

export function VerifyEmailCard() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    let cancelled = false;
    const verify = async () => {
      if (!token) {
        setStatus("error");
        return;
      }
      try {
        await authService.verifyEmail(token);
        if (!cancelled) {
          setStatus("success");
          toast.success("Email verified!", {
            description: "You can now sign in to your account.",
          });
        }
      } catch {
        if (!cancelled) setStatus("error");
      }
    };
    verify();
    return () => {
      cancelled = true;
    };
  }, [token]);

  if (status === "loading") {
    return (
      <div className="text-center py-8 sm:py-10">
        <Loader2 className="h-9 w-9 sm:h-10 sm:w-10 animate-spin text-accent-500 mx-auto mb-4" />
        <h2 className="text-lg sm:text-xl font-semibold text-fg-strong mb-2">
          Verifying your email...
        </h2>
        <p className="text-sm text-fg-muted">Please wait a moment.</p>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="text-center py-6 sm:py-8">
        <div className="inline-flex items-center justify-center h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-success-50 dark:bg-success-500/15 mb-4">
          <CheckCircle2 className="h-7 w-7 sm:h-8 sm:w-8 text-success-700 dark:text-success-500" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-fg-strong mb-2">
          Email verified!
        </h2>
        <p className="text-sm text-fg-muted mb-6">
          Your email has been verified. You can now sign in.
        </p>
        <Link to="/login">
          <Button variant="accent" size="lg" className="w-full">
            Continue to Sign In
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="text-center py-6 sm:py-8">
      <div className="inline-flex items-center justify-center h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-danger-50 dark:bg-danger-500/15 mb-4">
        <XCircle className="h-7 w-7 sm:h-8 sm:w-8 text-danger-700 dark:text-danger-500" />
      </div>
      <h2 className="text-xl sm:text-2xl font-bold text-fg-strong mb-2">
        Verification failed
      </h2>
      <p className="text-sm text-fg-muted mb-6">
        The verification link is invalid or has expired.
      </p>
      <Link to="/register">
        <Button variant="accent" size="lg" className="w-full">
          Request New Link
        </Button>
      </Link>
    </div>
  );
}