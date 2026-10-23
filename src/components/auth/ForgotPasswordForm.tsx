import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { authService } from "@/services/auth.service";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormData,
} from "@/lib/validations/auth";
import { Loader2, Mail, ArrowLeft, CheckCircle2 } from "lucide-react";

export function ForgotPasswordForm() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      await authService.forgotPassword(data);
      setSent(true);
      toast.success("Email sent!", {
        description: "Check your inbox for the reset link.",
      });
    } catch (error) {
      toast.error("Failed to send email", {
        description:
          error instanceof Error ? error.message : "Please try again.",
      });
    }
  };

  if (sent) {
    return (
      <div className="text-center py-6 sm:py-8">
        <div className="inline-flex items-center justify-center h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-success-50 dark:bg-success-500/15 mb-4">
          <CheckCircle2 className="h-7 w-7 sm:h-8 sm:w-8 text-success-700 dark:text-success-500" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-fg-strong mb-2">
          Check your email
        </h2>
        <p className="text-sm text-fg-muted mb-6 max-w-sm mx-auto">
          We've sent a password reset link to your email address.
        </p>
        <Link to="/login">
          <Button variant="outline" size="md" className="w-full">
            <ArrowLeft className="h-4 w-4" /> Back to Sign In
          </Button>
        </Link>
      </div>
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