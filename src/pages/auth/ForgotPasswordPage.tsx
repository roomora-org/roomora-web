import { AuthCard, ForgotPasswordForm } from "@/components/auth";
import { SEO } from "@/components/layout";

export default function ForgotPasswordPage() {
  return (
    <>
      <SEO
        title="Forgot Password"
        description="Reset your Roomora account password."
        path="/forgot-password"
      />
      <AuthCard
        title="Forgot your password?"
        subtitle="Enter your email and we'll send you a link to reset it."
      >
        <ForgotPasswordForm />
      </AuthCard>
    </>
  );
}