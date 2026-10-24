import { useState } from "react";
import { AuthCard, ForgotPasswordForm } from "@/components/auth";
import { SEO } from "@/components/layout";

export default function ForgotPasswordPage() {
  // true while the form shows its "Check your email" screen
  const [done, setDone] = useState(false);

  return (
    <>
      <SEO
        title="Forgot Password"
        description="Reset your Roomora account password."
        path="/forgot-password"
      />
      <AuthCard
        title={done ? "Check your email" : "Forgot your password?"}
        subtitle="Enter your email and we'll send you a link to reset it."
        hideHeader={done}
      >
        <ForgotPasswordForm onDone={setDone} />
      </AuthCard>
    </>
  );
}
