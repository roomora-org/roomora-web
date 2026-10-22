import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  resetPasswordSchema,
  type ResetPasswordFormData,
} from "@/lib/validations/auth";
import { Loader2, Lock, ArrowLeft } from "lucide-react";

export function ResetPasswordForm() {
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

  const onSubmit = async (_data: ResetPasswordFormData) => {
    try {
      await new Promise((r) => setTimeout(r, 900));
      if (!token) throw new Error("Invalid reset link");
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

  if (success) {
    return (
      <div className="text-center py-6 sm:py-8">
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
      </div>
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