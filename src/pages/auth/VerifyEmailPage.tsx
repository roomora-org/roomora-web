import { AuthCard, VerifyEmailCard } from "@/components/auth";
import { SEO } from "@/components/layout";

export default function VerifyEmailPage() {
  return (
    <>
      <SEO
        title="Verify Email"
        description="Verify your Roomora email address."
        path="/verify-email"
      />
      <AuthCard title="Email verification">
        <VerifyEmailCard />
      </AuthCard>
    </>
  );
}