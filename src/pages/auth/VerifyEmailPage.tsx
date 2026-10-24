import { AuthCard, VerifyEmailCard } from "@/components/auth";
import { SEO } from "@/components/layout";

export default function VerifyEmailPage() {
  return (
    <>
      <SEO
        title="Verify Email"
        description="Verify your Roomora email address."
        path="/verify-email"
        noIndex
      />
      {/* VerifyEmailCard always shows its own visible heading, so the AuthCard one is screen-reader only */}
      <AuthCard title="Email verification" hideHeader>
        <VerifyEmailCard />
      </AuthCard>
    </>
  );
}
