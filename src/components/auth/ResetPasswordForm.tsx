import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { authService } from "@/services/auth.service";
import {
  resetPasswordSchema,
  type ResetPasswordFormData,
} from "@/lib/validations/auth";
import { Loader2, Lock, ArrowLeft, CheckCircle2, XCircle } from "lucide-react";

interface ResetPasswordFormProps {
  /** true while an invalid-link or success screen is showing */
  onDone?: (done: boolean) => void;
}

export function ResetPasswordForm({ onDone }: ResetPasswordFormProps) {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  useEffect(() => {
    onDone?.(!token || success);
  }, [token, success, onDone]);

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      // now goes through the service (was an inline fake timeout)
      await authService.resetPassword({
        token,
        password: data.password,
        confirmPassword: data.confirmPassword,
      });
      setSuccess(true);
      toast.success("Password reset!", {
        description: "You can now sign in with your new password.",
      });
    } catch (error) {
      toast.error("Reset failed", {
        description:
          error instanceof Error ? error.message : "The link may be expired.",
      });
    }
  };

  // No token in the URL: don't let the user type a password just to fail at the end
  if (!token) {
    return (
      <div className="text-center py-6 sm:py-8">
        <div className="inline-flex items-center justify-center h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-danger-50 dark:bg-danger-500/15 mb-4">
          <XCircle className="h-7 w-7 sm:h-8 sm:w-8 text-danger-700 dark:text-danger-500" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-fg-strong mb-2">
          Invalid reset link
        </h2>
        <p className="text-sm text-fg-muted mb-6">
          This link is missing or has expired. Request a new one to continue.
        </p>
        <Link to="/forgot-password">
          <Button variant="accent" size="lg" className="w-full">
            Request a new link
          </Button>
        </Link>
      </div>
    );
  }

  if (success) {
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
          Password updated
        </h2>
        <p className="text-sm text-fg-muted mb-6">
          Your password has been changed successfully.
        </p>
        <Link to="/login">
          <Button variant="accent" size="lg" className="w-full">
            Continue to Sign In
          </Button>
        </Link>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5" noValidate>
      <Input
        type="password"
        label="New password"
        placeholder="••••••••"
        leftIcon={<Lock />}
        error={errors.password?.message}
        helperText="At least 8 chars, with uppercase, lowercase, and number."
        autoComplete="new-password"
        {...register("password")}
      />

      <Input
        type="password"
        label="Confirm new password"
        placeholder="••••••••"
        leftIcon={<Lock />}
        error={errors.confirmPassword?.message}
        autoComplete="new-password"
        {...register("confirmPassword")}
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
            Updating...
          </>
        ) : (
          "Reset Password"
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
