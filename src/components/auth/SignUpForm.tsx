import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { signUpSchema, type SignUpFormData } from "@/lib/validations/auth";
import { authService } from "@/services/auth.service";
import { showApiError } from "@/lib/api-error";
import { Loader2, Mail, Lock, User, Phone } from "lucide-react";

export function SignUpForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  });

  const onSubmit = async (data: SignUpFormData) => {
    try {
      await authService.registerStepOne({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        password: data.password,
        confirmPassword: data.confirmPassword,
      });
      toast.success("Account created!", {
        description: "Check your email to verify your account.",
      });
      navigate(
        `/verify-email?pending=true&email=${encodeURIComponent(data.email)}`,
        { replace: true }
      );
    } catch (error) {
      showApiError(toast.error, error, "Registration failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-3 sm:space-y-4"
      noValidate
    >
      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        <Input
          label="First name"
          placeholder="John"
          leftIcon={<User />}
          error={errors.firstName?.message}
          autoComplete="given-name"
          {...register("firstName")}
        />
        <Input
          label="Last name"
          placeholder="Doe"
          error={errors.lastName?.message}
          autoComplete="family-name"
          {...register("lastName")}
        />
      </div>

      <Input
        type="email"
        label="Email"
        placeholder="you@example.com"
        leftIcon={<Mail />}
        error={errors.email?.message}
        autoComplete="email"
        {...register("email")}
      />

      <Input
        type="tel"
        label="Phone"
        placeholder="+970 59 123 4567"
        leftIcon={<Phone />}
        error={errors.phone?.message}
        autoComplete="tel"
        {...register("phone")}
      />

      <Input
        type="password"
        label="Password"
        placeholder="********"
        leftIcon={<Lock />}
        error={errors.password?.message}
        helperText="At least 8 chars, with uppercase, lowercase, and number."
        autoComplete="new-password"
        {...register("password")}
      />

      <Input
        type="password"
        label="Confirm password"
        placeholder="********"
        leftIcon={<Lock />}
        error={errors.confirmPassword?.message}
        autoComplete="new-password"
        {...register("confirmPassword")}
      />

      <div>
        <label className="flex items-start gap-2.5 text-xs text-fg-muted cursor-pointer select-none">
          <input
            type="checkbox"
            {...register("acceptTerms")}
            className="h-4 w-4 mt-0.5 shrink-0 rounded border-line-strong bg-surface cursor-pointer"
            style={{ accentColor: "var(--color-accent-500)" }}
          />
          <span className="leading-relaxed">
            I agree to the{" "}
            <Link to="/terms" className="text-brand font-medium hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="text-brand font-medium hover:underline">
              Privacy Policy
            </Link>
          </span>
        </label>
        {errors.acceptTerms && (
          <p className="mt-1.5 text-xs text-danger-700 dark:text-danger-500" role="alert">
            {errors.acceptTerms.message}
          </p>
        )}
      </div>

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
            Signing up...
          </>
        ) : (
          "Sign Up"
        )}
      </Button>

      <p className="text-center text-sm text-fg-muted pt-2">
        Already have an account?{" "}
        <Link to="/login" className="text-brand font-semibold hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  );
}