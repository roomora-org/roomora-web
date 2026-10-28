import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import {
  Star,
  Building2,
  MapPin,
  Contact,
  FileText,
  Phone,
  PhoneCall,
  Hash,
  Loader2,
  ArrowRight,
  CheckCircle2,
  Users,
  Plus,
  Clock,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import {
  CountryCitySelect,
  type LocationValue,
} from "@/components/ui/CountryCitySelect";
import { Logo } from "@/components/ui/Logo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useAuth } from "@/context/AuthContext";
import { SEO } from "@/components/layout";
import { onboardingService } from "@/services/onboarding.service";
import { showApiError } from "@/lib/api-error";
import {
  hotelProfileSchema,
  type HotelProfileFormData,
} from "@/lib/validations/auth";

type Step = 1 | 2 | 3;
const STEP_LABELS = ["Account", "Hotel", "Team"];
const SLIDE_EASE = [0.65, 0, 0.35, 1] as const;

export default function OnboardingPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [step, setStep] = useState<Step>(2);
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState<LocationValue>({});

  const hotelForm = useForm<HotelProfileFormData>({
    resolver: zodResolver(hotelProfileSchema),
    defaultValues: {
      hotelName: "",
      city: "",
      country: "",
      address: "",
      starRating: 3,
      hotelPhone: "",
      description: "",
      alternativePhone: "",
      postalCode: "",
    },
  });

  // Sync LocationValue → form fields (dropdown + manual entry)
  useEffect(() => {
    if (location.countryName) {
      hotelForm.setValue("country", location.countryName, {
        shouldValidate: true,
      });
    }
    if (location.cityName) {
      hotelForm.setValue("city", location.cityName, {
        shouldValidate: true,
      });
    }
  }, [location, hotelForm]);

  const ratingError = hotelForm.formState.errors.starRating?.message;

  // Confetti when reaching step 3
  useEffect(() => {
    if (step !== 3) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const duration = 2000;
    const animationEnd = Date.now() + duration;
    const defaults = {
      startVelocity: 30,
      spread: 360,
      ticks: 60,
      zIndex: 9999,
    };
    const colors = ["#f59e0b", "#d97706", "#4a2c1d", "#f8ad5a", "#22c55e"];
    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) {
        window.clearInterval(interval);
        return;
      }
      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        colors,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        colors,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);

    return () => window.clearInterval(interval);
  }, [step]);

  const handleHotelSubmit = async (data: HotelProfileFormData) => {
    setIsLoading(true);
    try {
      const response = await onboardingService.complete(data);
      login(
        response.user,
        response.accessToken,
        true,
        response.onboardingCompleted
      );
      toast.success("Hotel profile saved!", {
        description: "Let's move on to the final step.",
      });
      setStep(3);
    } catch (error) {
      showApiError(toast.error, error, "Failed to save hotel profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddStaff = () => navigate("/dashboard/staff");
  const handleAddLater = () => navigate("/dashboard");

  const getLineClass = (lineAfterStep: 1 | 2) => {
    if (step > lineAfterStep) return "bg-success-500";
    if (step === lineAfterStep) return "bg-accent-500";
    return "bg-line";
  };

  return (
    <>
      <SEO
        title="Onboarding"
        description="Set up your hotel profile and start managing your property."
        path="/onboarding"
        noIndex
      />

      <div className="min-h-screen flex flex-col bg-surface">
        {/* Header + Stepper */}
        <div className="w-full border-b border-line bg-surface-card">
          <div className="container-custom relative py-5 sm:py-6">
            <button
              onClick={() => navigate("/")}
              className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 flex items-center gap-2"
              aria-label="Roomora home"
            >
              <Logo className="h-8 sm:h-9" />
              <span className="hidden lg:inline text-xl font-bold text-fg-strong tracking-tight">
                Roomora
              </span>
            </button>
            <div className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2">
              <ThemeToggle />
            </div>
            <div className="flex items-center justify-center gap-1 sm:gap-3">
              {[1, 2, 3].map((num, idx) => {
                const isCompleted = step > num;
                const isActive = step === num;
                return (
                  <div key={num} className="flex items-center gap-1 sm:gap-3">
                    <motion.div
                      initial={false}
                      animate={{ scale: isActive ? [1, 1.1, 1] : 1 }}
                      transition={{ duration: 0.5 }}
                      className={`h-8 w-8 sm:h-9 sm:w-9 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold transition-colors ${
                        isCompleted
                          ? "bg-success-500 text-white"
                          : isActive
                            ? "bg-accent-500 text-primary-950 ring-4 ring-accent-500/20"
                            : "bg-chip text-fg-muted"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5" />
                      ) : (
                        num
                      )}
                    </motion.div>
                    <span
                      className={`text-xs sm:text-sm font-medium hidden sm:block transition-colors ${
                        isCompleted
                          ? "text-success-700 dark:text-success-500"
                          : isActive
                            ? "text-fg-strong"
                            : "text-fg-muted"
                      }`}
                    >
                      {STEP_LABELS[idx]}
                    </span>
                    {idx < 2 && (
                      <div
                        className={`h-0.5 w-6 sm:w-16 rounded mx-1 sm:mx-2 transition-colors duration-500 ${getLineClass(
                          num as 1 | 2
                        )}`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex-1 flex items-start sm:items-center justify-center p-4 sm:p-6">
          <div className="w-full max-w-2xl">
            <AnimatePresence mode="wait">
              {step === 2 && (
                <motion.form
                  key="step2"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.45, ease: SLIDE_EASE }}
                  onSubmit={hotelForm.handleSubmit(handleHotelSubmit)}
                  className="bg-surface-card rounded-2xl border border-line shadow-xl overflow-hidden"
                  noValidate
                >
                  {/* ============ PAGE HEADER ============ */}
                  <div className="relative px-6 sm:px-8 pt-7 sm:pt-9 pb-6 border-b border-line overflow-hidden">
                    <div
                      aria-hidden
                      className="pointer-events-none absolute -top-20 -right-20 h-56 w-56 rounded-full bg-accent-500/10 blur-3xl"
                    />
                    <div
                      aria-hidden
                      className="pointer-events-none absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-accent-500/5 blur-3xl"
                    />
                    <div className="relative">
                      <div className="inline-flex items-center gap-1.5 rounded-full bg-accent-100 dark:bg-accent-500/15 text-accent-700 dark:text-accent-300 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide mb-3">
                        <Sparkles className="h-3 w-3" />
                        Step 2 of 3
                      </div>
                      <h1 className="text-2xl sm:text-3xl font-bold text-fg-strong leading-tight">
                        Tell us about your hotel
                      </h1>
                      <p className="text-sm text-fg-muted mt-1.5 max-w-lg">
                        Share a few details so we can tailor Roomora to your
                        property. You can update everything later from settings.
                      </p>
                    </div>
                  </div>

                  {/* ============ FORM BODY ============ */}
                  <div className="px-6 sm:px-8 py-7 space-y-8">
                    {/* 1. Identity */}
                    <FormSection
                      icon={<Building2 />}
                      title="Hotel identity"
                      description="The name guests will see when booking."
                    >
                      <Input
                        label="Hotel name"
                        placeholder="e.g. Grand Palace Hotel"
                        leftIcon={<Building2 />}
                        error={hotelForm.formState.errors.hotelName?.message}
                        {...hotelForm.register("hotelName")}
                      />

                      <div className="rounded-2xl border border-line bg-surface p-5">
                        <div className="text-center mb-3">
                          <p className="text-sm font-semibold text-fg-strong">
                            Star rating
                          </p>
                          <p className="text-xs text-fg-muted mt-0.5">
                            How would you rate your hotel?
                          </p>
                        </div>
                        <Controller
                          control={hotelForm.control}
                          name="starRating"
                          render={({ field }) => (
                            <StarRatingInput
                              value={field.value}
                              onChange={field.onChange}
                              max={5}
                            />
                          )}
                        />
                        {ratingError && (
                          <p className="mt-2 text-center text-xs text-danger-700 dark:text-danger-500">
                            {ratingError}
                          </p>
                        )}
                      </div>
                    </FormSection>

                    {/* 2. Location */}
                    <FormSection
                      icon={<MapPin />}
                      title="Location"
                      description="Where guests will find your property."
                    >
                      <CountryCitySelect
                        value={location}
                        onChange={setLocation}
                        error={
                          hotelForm.formState.errors.country?.message ||
                          hotelForm.formState.errors.city?.message
                        }
                      />

                      <Input
                        label="Street address"
                        placeholder="Street, building number..."
                        error={hotelForm.formState.errors.address?.message}
                        {...hotelForm.register("address")}
                      />

                      <Input
                        label="Postal code (optional)"
                        placeholder="e.g. 00970"
                        leftIcon={<Hash />}
                        error={hotelForm.formState.errors.postalCode?.message}
                        {...hotelForm.register("postalCode")}
                      />
                    </FormSection>

                    {/* 3. Contact */}
                    <FormSection
                      icon={<Contact />}
                      title="Contact"
                      description="How guests and staff can reach you."
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input
                          type="tel"
                          label="Hotel phone"
                          placeholder="+970 2 123 4567"
                          leftIcon={<Phone />}
                          error={hotelForm.formState.errors.hotelPhone?.message}
                          {...hotelForm.register("hotelPhone")}
                        />
                        <Input
                          type="tel"
                          label="Alternative phone (optional)"
                          placeholder="+970 59 123 4567"
                          leftIcon={<PhoneCall />}
                          error={
                            hotelForm.formState.errors.alternativePhone?.message
                          }
                          {...hotelForm.register("alternativePhone")}
                        />
                      </div>
                    </FormSection>

                    {/* 4. Description */}
                    <FormSection
                      icon={<FileText />}
                      title="About your hotel"
                      description="Optional — tell guests what makes you special."
                    >
                      <Textarea
                        label="Description"
                        rows={4}
                        placeholder="A boutique hotel in the heart of the city, offering comfortable rooms and personalized service..."
                        error={hotelForm.formState.errors.description?.message}
                        {...hotelForm.register("description")}
                      />
                    </FormSection>
                  </div>

                  {/* ============ FORM FOOTER ============ */}
                  <div className="px-6 sm:px-8 py-5 bg-surface border-t border-line flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3">
                    <p className="text-xs text-fg-muted text-center sm:text-left">
                      All fields marked optional can be skipped — you can
                      complete them anytime from settings.
                    </p>
                    <Button
                      type="submit"
                      variant="accent"
                      size="lg"
                      className="w-full sm:w-auto"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          Continue <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </div>
                </motion.form>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: SLIDE_EASE }}
                  className="bg-surface-card p-6 sm:p-8 rounded-2xl border border-line shadow-xl"
                >
                  <div className="text-center">
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{
                        duration: 0.6,
                        delay: 0.1,
                        type: "spring",
                        stiffness: 200,
                      }}
                      className="inline-flex items-center justify-center h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-gradient-to-br from-accent-400 to-accent-600 mb-5 shadow-lg shadow-accent-500/30"
                    >
                      <Users className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                    </motion.div>

                    <motion.h2
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-xl sm:text-2xl font-bold text-fg-strong mb-2"
                    >
                      Almost there!
                    </motion.h2>

                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-sm text-fg-muted mb-2"
                    >
                      Your hotel profile is ready.
                    </motion.p>

                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-sm text-fg-muted mb-8 max-w-sm mx-auto"
                    >
                      Next, you can add your team members (receptionists,
                      housekeepers, maintenance) to start assigning tasks. Or
                      skip and do it later from your dashboard.
                    </motion.p>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-col gap-3"
                  >
                    <Button
                      variant="accent"
                      size="lg"
                      className="w-full"
                      onClick={handleAddStaff}
                    >
                      <Plus className="h-4 w-4" /> Add Staff Now
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full"
                      onClick={handleAddLater}
                    >
                      <Clock className="h-4 w-4" /> I'll Do It Later
                    </Button>
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-xs text-fg-muted text-center mt-6"
                  >
                    You can always add or manage staff later from{" "}
                    <span className="text-brand font-medium">
                      Dashboard → Staff
                    </span>
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* StarRatingInput — simple, stable, horizontal                       */
/* ------------------------------------------------------------------ */
function StarRatingInput({
  value,
  onChange,
  max = 5,
}: {
  value: number;
  onChange: (v: number) => void;
  max?: number;
}) {
  const [hovered, setHovered] = useState<number | null>(null);
  const display = hovered ?? value;

  return (
    <div
      className="flex flex-col items-center gap-2"
      role="radiogroup"
      aria-label="Star rating"
      onMouseLeave={() => setHovered(null)}
    >
      <div className="flex items-center gap-1.5">
        {Array.from({ length: max }, (_, i) => {
          const n = i + 1;
          const filled = n <= display;
          return (
            <button
              key={n}
              type="button"
              onClick={() => onChange(n)}
              onMouseEnter={() => setHovered(n)}
              aria-label={`${n} star${n > 1 ? "s" : ""}`}
              aria-checked={value === n}
              role="radio"
              className="rounded-md p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500/40"
            >
              <Star
                className={`h-7 w-7 transition-colors ${
                  filled
                    ? "fill-accent-500 text-accent-500"
                    : "fill-transparent text-fg-muted/30"
                }`}
                strokeWidth={1.5}
              />
            </button>
          );
        })}
      </div>
      <p className="text-xs font-medium text-fg-muted">
        {display} {display === 1 ? "star" : "stars"}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* FormSection — icon + title + description + content                 */
/* ------------------------------------------------------------------ */
function FormSection({
  icon,
  title,
  description,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4">
      <div className="flex items-start gap-3">
        <div className="inline-flex items-center justify-center h-9 w-9 rounded-lg bg-accent-100 dark:bg-accent-500/15 text-accent-700 dark:text-accent-400 shrink-0 [&>svg]:h-4 [&>svg]:w-4">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-fg-strong leading-tight">
            {title}
          </h3>
          {description && (
            <p className="text-xs text-fg-muted mt-0.5 leading-snug">
              {description}
            </p>
          )}
        </div>
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  );
}