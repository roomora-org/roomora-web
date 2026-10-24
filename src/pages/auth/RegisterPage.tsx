import { AuthCard, SignUpForm } from "@/components/auth";
import { SEO } from "@/components/layout";

export default function RegisterPage() {
  return (
    <>
      <SEO
        title="Create Account"
        description="Create your Roomora account and start your 14-day free trial."
        path="/register"
      />
      {/* The heading now lives here (like every other auth page), so the page has a real <h1>. */}
      <AuthCard
        title="Create your account"
        subtitle="Start your 14-day free trial. No credit card required."
      >
        <SignUpForm />
      </AuthCard>
    </>
  );
}
