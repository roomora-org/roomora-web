import { AuthLayout, SEO } from "@/components/layout";
import { SignUpForm } from "@/components/auth";

export default function RegisterPage() {
  return (
    <>
      <SEO
        title="Create Account"
        description="Create your Roomora account and start your 14-day free trial."
        path="/register"
      />
      <AuthLayout variant="register">
        <SignUpForm />
      </AuthLayout>
    </>
  );
}