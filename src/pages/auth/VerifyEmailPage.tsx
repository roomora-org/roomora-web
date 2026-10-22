import { AuthLayout, SEO } from "@/components/layout";
import { AuthCard, VerifyEmailCard } from "@/components/auth";

export default function VerifyEmailPage() {
  return (
    <>
      <SEO
        title="Verify Email"
        description="Verify your Roomora email address."
        path="/verify-email"
      />
      <AuthLayout variant="verify-email">
        <AuthCard title="Email verification">
          <VerifyEmailCard />
        </AuthCard>
      </AuthLayout>
    </>
  );
}