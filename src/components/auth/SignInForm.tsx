import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { signInSchema, type SignInFormData } from "@/lib/validations/auth";
import { authService } from "@/services/auth.service";
import { useAuth } from "@/context/AuthContext";
import { GoogleButton } from "./GoogleButton";
import { AuthDivider } from "./AuthDivider";
import { Loader2, Mail, Lock } from "lucide-react";

export function SignInForm() {
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "", rememberMe: false },
  });

  const onSubmit = async (data: SignInFormData) => {
    try {
      const response = await authService.login({
        email: data.email,
        password: data.password,
      });
      login(response.user, response.accessToken);
      toast.success("Welcome back!", {
        description: "You have been signed in successfully.",
      });
    } catch (error) {
      toast.error("Sign in failed", {
        description:
          error instanceof Error
            ? error.message
            : "Please check your credentials and try again.",
      });
    }
  };

  return (
    <div className="space-y-0">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 sm:space-y-5"
        noValidate
      >
        <Input
          type="email"
          label="Email"
          placeholder="you@example.com"
          leftIcon={<Mail />}
          error={errors.email?.message}
          autoComplete="email"
          {...register("email")}
        />

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-sm font-medium text-fg">Password</span>
            <Link
              to="/forgot-password"
              className="text-xs font-medium text-brand hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <Input
            type="password"
            placeholder="••••••••"
            leftIcon={<Lock />}
            error={errors.password?.message}
            autoComplete="current-password"
            {...register("password")}
          />
        </div>

        <label className="flex items-center gap-2.5 text-sm text-fg-muted cursor-pointer select-none">
          <input
            type="checkbox"
            {...register("rememberMe")}
            className="h-4 w-4 rounded border-line bg-surface cursor-pointer"
            style={{ accentColor: "var(--color-accent-500)" }}
          />
          Remember me for 30 days
        </label>

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
              Signing in...
            </>
          ) : (
            "Sign In"
          )}
        </Button>
      </form>

      {/* Divider + Google (only in Sign In) */}
      <AuthDivider />
      <GoogleButton mode="login" />

      <p className="text-center text-sm text-fg-muted pt-4">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="text-brand font-semibold hover:underline"
        >
          Create one
        </Link>
      </p>
    </div>
  );
}