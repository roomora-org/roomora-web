import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { authService } from "@/services/auth.service";
import {
  resetPasswordSchema,
  type ResetPasswordFormData,
} from "@/lib/validations/auth";
import { showApiError } from "@/lib/api-error";
import { Loader2, Lock, ArrowLeft, CheckCircle2 } from "lucide-react";

interface ResetPasswordFormProps {
  token: string;
}

export function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
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
      showApiError(toast.error, error, "Reset failed");
    }
  };

  // FULL navigation: bypasses React Router entirely,
  // avoids the AnimatePresence "FrozenOutlet" re-render glitch,
  // and guarantees no flash of the "Invalid reset link" page.
  const goToSignIn = () => {
    window.location.replace("/login");
  };

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
        <Button
          variant="accent"
          size="lg"
          className="w-full"
          onClick={goToSignIn}
        >
          Continue to Sign In
        </Button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 sm:space-y-5"
      noValidate
    >
      <Input
        type="password"
        label="New password"
        placeholder="********"
        leftIcon={<Lock />}
        error={errors.password?.message}
        helperText="At least 8 chars, with uppercase, lowercase, and number."
        autoComplete="new-password"
        {...register("password")}
      />

      <Input
        type="password"
        label="Confirm new password"
        placeholder="********"
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
        replace
        className="flex items-center justify-center gap-2 text-sm text-fg-muted hover:text-brand pt-2"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Sign In
      </Link>
    </form>
  );
}