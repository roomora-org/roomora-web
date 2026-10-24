import { useState } from "react";
import { AuthCard, ResetPasswordForm } from "@/components/auth";
import { SEO } from "@/components/layout";

export default function ResetPasswordPage() {
  // true while the form shows its "Invalid link" or "Password updated" screen
  const [done, setDone] = useState(false);

  return (
    <>
      <SEO
        title="Reset Password"
        description="Choose a new password for your Roomora account."
        path="/reset-password"
        noIndex
      />
      <AuthCard
        title={done ? "Reset password" : "Set a new password"}
        subtitle="Choose a strong password to secure your account."
        hideHeader={done}
      >
        <ResetPasswordForm onDone={setDone} />
      </AuthCard>
    </>
  );
}
