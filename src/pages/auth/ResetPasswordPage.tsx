import { Link, useSearchParams } from "react-router-dom";
import { AuthCard, ResetPasswordForm } from "@/components/auth";
import { SEO } from "@/components/layout";
import { Button } from "@/components/ui/Button";
import { XCircle } from "lucide-react";

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  if (!token) {
    return (
      <>
        <SEO
          title="Invalid Reset Link"
          description="This reset link is invalid or expired."
          path="/reset-password"
          noIndex
        />
        <AuthCard title="Reset password" hideHeader>
          <div className="text-center py-6 sm:py-8">
            <div className="inline-flex items-center justify-center h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-danger-50 dark:bg-danger-500/15 mb-4">
              <XCircle className="h-7 w-7 sm:h-8 sm:w-8 text-danger-700 dark:text-danger-500" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-fg-strong mb-2">
              Invalid reset link
            </h2>
            <p className="text-sm text-fg-muted mb-6">
              This link is missing or has expired. Request a new one to continue.
            </p>
            <Link to="/forgot-password" replace>
              <Button variant="accent" size="lg" className="w-full">
                Request a new link
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
        title="Reset Password"
        description="Choose a new password for your Roomora account."
        path="/reset-password"
        noIndex
      />
      <AuthCard
        title="Set a new password"
        subtitle="Choose a strong password to secure your account."
      >
        <ResetPasswordForm token={token} />
      </AuthCard>
    </>
  );
}