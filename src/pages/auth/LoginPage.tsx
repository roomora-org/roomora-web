import { AuthLayout, SEO } from "@/components/layout";
import { AuthCard, SignInForm } from "@/components/auth";

export default function LoginPage() {
  return (
    <>
      <SEO
        title="Sign In"
        description="Sign in to your Roomora account to manage your hotel operations."
        path="/login"
      />
      <AuthLayout variant="login">
        <AuthCard
          title="Sign in to your account"
          subtitle="Welcome back! Please enter your details."
        >
          <SignInForm />
        </AuthCard>
      </AuthLayout>
    </>
  );
}