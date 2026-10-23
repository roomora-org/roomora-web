import { SignUpForm } from "@/components/auth";
import { SEO } from "@/components/layout";

export default function RegisterPage() {
  return (
    <>
      <SEO
        title="Create Account"
        description="Create your Roomora account and start your 14-day free trial."
        path="/register"
      />
      <SignUpForm />
    </>
  );
}