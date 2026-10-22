import { AuthLayout, SEO } from "@/components/layout";
import { AuthCard, ResetPasswordForm } from "@/components/auth";

export default function ResetPasswordPage() {
  return (
    <>
      <SEO
        title="Reset Password"
        description="Choose a new password for your Roomora account."
        path="/reset-password"
      />
      <AuthLayout variant="reset-password">
        <AuthCard
          title="Set a new password"
          subtitle="Choose a strong password to secure your account."
        >
          <ResetPasswordForm />
        </AuthCard>
      </AuthLayout>
    </>
  );
}