import { AuthLayout, SEO } from "@/components/layout";
import { AuthCard, ForgotPasswordForm } from "@/components/auth";

export default function ForgotPasswordPage() {
  return (
    <>
      <SEO
        title="Forgot Password"
        description="Reset your Roomora account password."
        path="/forgot-password"
      />
      <AuthLayout variant="forgot-password">
        <AuthCard
          title="Forgot your password?"
          subtitle="Enter your email and we'll send you a link to reset it."
        >
          <ForgotPasswordForm />
        </AuthCard>
      </AuthLayout>
    </>
  );
}