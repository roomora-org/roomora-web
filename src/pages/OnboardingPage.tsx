import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { StarRating } from "@/components/ui/StarRating";
import { Logo } from "@/components/ui/Logo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useAuth } from "@/context/AuthContext";
import { SEO } from "@/components/layout";
import {
  hotelProfileSchema,
  type HotelProfileFormData,
} from "@/lib/validations/auth";
import { authService } from "@/services/auth.service";
import {
  Loader2,
  ArrowRight,
  Building2,
  MapPin,
  Globe,
  Phone,
  CheckCircle2,
  Users,
  Plus,
  Clock,
} from "lucide-react";

type Step = 1 | 2 | 3;

const STEP_LABELS = ["Account", "Hotel", "Team"];

const SLIDE_EASE = [0.65, 0, 0.35, 1] as const;

export default function OnboardingPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [step, setStep] = useState<Step>(2);
  const [isLoading, setIsLoading] = useState(false);

  const hotelForm = useForm<HotelProfileFormData>({
    resolver: zodResolver(hotelProfileSchema),
    defaultValues: {
      hotelName: "",
      city: "",
      country: "",
      address: "",
      starRating: 3,
      hotelPhone: "",
    },
  });

  const currentRating = hotelForm.watch("starRating");
  const ratingError = hotelForm.formState.errors.starRating?.message;

  // 🎉 Confetti when reaching step 3
  useEffect(() => {
    if (step !== 3) return;
    // respect users who asked for less motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const duration = 2000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };
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
      const response = await authService.completeOnboarding(data);
      // keep the app's user in sync (onboardingCompleted is now true)
      login(response.user, response.accessToken, true);
      toast.success("Hotel profile saved!", {
        description: "Let's move on to the final step.",
      });
      setStep(3);
    } catch (error) {
      toast.error("Failed to save", {
        description:
          error instanceof Error ? error.message : "Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // TODO: these routes don't exist in App.tsx yet -> they currently show the 404 page.
  const handleAddStaff = () => navigate("/dashboard/staff");
  const handleAddLater = () => navigate("/dashboard");

  /**
   * Line colors:
   *  - Completed (step > lineAfter): green
   *  - Active (step === lineAfter): amber ("Ready")
   *  - Upcoming: gray
   */
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

      <div className="min-h-screen flex flex-col">
        {/* ---------- Progress Header ---------- */}
        <div className="w-full border-b border-line bg-surface-card">
          <div className="container-custom relative py-5 sm:py-6">
            <Link
              to="/"
              aria-label="Roomora home"
              className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 flex items-center gap-2"
            >
              <Logo className="h-8 sm:h-9" />
              <span className="hidden lg:inline text-xl font-bold text-fg-strong tracking-tight">
                Roomora
              </span>
            </Link>
            <div className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2">
              <ThemeToggle />
            </div>
            <div className="flex items-center justify-center gap-1 sm:gap-3">
              {[1, 2, 3].map((num, idx) => {
                const isCompleted = step > num;
                const isActive = step === num;

                return (
                  <div key={num} className="flex items-center gap-1 sm:gap-3">
                    {/* Circle */}
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

                    {/* Label */}
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

                    {/* Line */}
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

        {/* ---------- Content ---------- */}
        <div className="flex-1 flex items-center justify-center p-4 sm:p-6">
          <div className="w-full max-w-lg">
            <AnimatePresence mode="wait">
              {/* ========== STEP 2: Hotel Info ========== */}
              {step === 2 && (
                <motion.form
                  key="step2"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.45, ease: SLIDE_EASE }}
                  onSubmit={hotelForm.handleSubmit(handleHotelSubmit)}
                  className="space-y-4 bg-surface-card p-6 sm:p-8 rounded-2xl border border-line shadow-xl"
                  noValidate
                >
                  <div className="text-center sm:text-left">
                    <h2 className="text-xl sm:text-2xl font-bold text-fg-strong mb-1">
                      Tell us about your hotel
                    </h2>
                    <p className="text-sm text-fg-muted">
                      This information helps us personalize your experience.
                    </p>
                  </div>

                  <Input
                    label="Hotel name"
                    placeholder="e.g. Grand Palace Hotel"
                    leftIcon={<Building2 />}
                    error={hotelForm.formState.errors.hotelName?.message}
                    {...hotelForm.register("hotelName")}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Input
                      label="City"
                      placeholder="e.g. Ramallah"
                      leftIcon={<MapPin />}
                      error={hotelForm.formState.errors.city?.message}
                      {...hotelForm.register("city")}
                    />
                    <Input
                      label="Country"
                      placeholder="e.g. Palestine"
                      leftIcon={<Globe />}
                      error={hotelForm.formState.errors.country?.message}
                      {...hotelForm.register("country")}
                    />
                  </div>

                  <Input
                    label="Address"
                    placeholder="Street, building number..."
                    error={hotelForm.formState.errors.address?.message}
                    {...hotelForm.register("address")}
                  />

                  {/* ===== Star Rating ===== */}
                  <div>
                    <p className="block text-sm font-medium text-fg mb-2">
                      Star rating
                    </p>
                    <StarRating
                      value={currentRating}
                      onChange={(val) =>
                        hotelForm.setValue("starRating", val, {
                          shouldValidate: true,
                          shouldDirty: true,
                        })
                      }
                      size="lg"
                      error={!!ratingError}
                    />
                    {ratingError && (
                      <p className="mt-1.5 text-xs text-danger-700 dark:text-danger-500">
                        {ratingError}
                      </p>
                    )}
                  </div>

                  <Input
                    type="tel"
                    label="Hotel phone"
                    placeholder="+970 2 123 4567"
                    leftIcon={<Phone />}
                    error={hotelForm.formState.errors.hotelPhone?.message}
                    {...hotelForm.register("hotelPhone")}
                  />

                  <Button
                    type="submit"
                    variant="accent"
                    size="lg"
                    className="w-full"
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
                </motion.form>
              )}

              {/* ========== STEP 3: Staff (Celebration) ========== */}
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
                      Almost there! 🎉
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