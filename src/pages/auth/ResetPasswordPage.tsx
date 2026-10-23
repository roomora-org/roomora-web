import { AuthCard, ResetPasswordForm } from "@/components/auth";
import { SEO } from "@/components/layout";

export default function ResetPasswordPage() {
  return (
    <>
      <SEO
        title="Reset Password"
        description="Choose a new password for your Roomora account."
        path="/reset-password"
      />
      <AuthCard
        title="Set a new password"
        subtitle="Choose a strong password to secure your account."
      >
        <ResetPasswordForm />
      </AuthCard>
    </>
  );
}