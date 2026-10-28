import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { authService } from "@/services/auth.service";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormData,
} from "@/lib/validations/auth";
import { showApiError } from "@/lib/api-error";
import { Loader2, Mail, ArrowLeft, CheckCircle2 } from "lucide-react";

const RESEND_SECONDS = 60;

export function ForgotPasswordForm() {
  const [sentTo, setSentTo] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(0);
  const [resending, setResending] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = window.setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => window.clearTimeout(t);
  }, [cooldown]);

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      await authService.forgotPassword(data);
      setSentTo(data.email);
      setCooldown(RESEND_SECONDS);
      toast.success("Email sent!", {
        description: "Check your inbox for the reset link.",
      });
    } catch (error) {
      showApiError(toast.error, error, "Failed to send email");
    }
  };

  const resend = async () => {
    if (!sentTo || cooldown > 0 || resending) return;
    setResending(true);
    try {
      await authService.forgotPassword({ email: sentTo });
      setCooldown(RESEND_SECONDS);
      toast.success("Email sent again");
    } catch (error) {
      showApiError(toast.error, error, "Failed to resend");
    } finally {
      setResending(false);
    }
  };

  if (sentTo) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="text-center py-6 sm:py-8"
      >
        <div className="inline-flex items-center justify-center h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-success-50 dark:bg-success-500/15 mb-4">
          <CheckCircle2 className="h-7 w-7 sm:h-8 sm:w-8 text-success-700 dark:text-success-500" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-fg-strong mb-2">
          Check your email
        </h2>
        <p className="text-sm text-fg-muted mb-1 max-w-sm mx-auto">
          If an account with that email exists, we've sent a password reset link to
        </p>
        <p className="text-sm font-semibold text-fg-strong mb-6 break-all">
          {sentTo}
        </p>

        <Link to="/login">
          <Button variant="outline" size="md" className="w-full">
            <ArrowLeft className="h-4 w-4" /> Back to Sign In
          </Button>
        </Link>

        <div className="mt-5 space-y-1 text-sm text-fg-muted">
          <p>
            Didn't get it?{" "}
            <button
              type="button"
              onClick={resend}
              disabled={cooldown > 0 || resending}
              className="font-semibold text-brand hover:underline disabled:opacity-60 disabled:no-underline disabled:cursor-not-allowed"
            >
              {resending
                ? "Sending..."
                : cooldown > 0
                  ? `Resend in ${cooldown}s`
                  : "Resend email"}
            </button>
          </p>
          <p>
            Wrong address?{" "}
            <button
              type="button"
              onClick={() => setSentTo(null)}
              className="font-semibold text-brand hover:underline"
            >
              Use a different email
            </button>
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5" noValidate>
      <Input
        type="email"
        label="Email"
        placeholder="you@example.com"
        leftIcon={<Mail />}
        error={errors.email?.message}
        autoComplete="email"
        {...register("email")}
      />

      <Button
        type="submit"
        variant="accent"
        size="lg"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Sending...
          </>
        ) : (
          "Send Reset Link"
        )}
      </Button>

      <Link
        to="/login"
        className="flex items-center justify-center gap-2 text-sm text-fg-muted hover:text-brand pt-2"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Sign In
      </Link>
    </form>
  );
}