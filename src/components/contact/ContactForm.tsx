import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Loader2, Send, User, Mail, Tag } from "lucide-react";

const contactSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { fullName: "", email: "", subject: "", message: "" },
  });

  const onSubmit = async (_data: ContactFormData) => {
    await new Promise((r) => setTimeout(r, 900));
    toast.success("Message sent!", {
      description: "We'll get back to you as soon as possible.",
    });
    reset();
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
      className="bg-surface-card rounded-2xl border border-line p-6 sm:p-8 shadow-sm"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Full Name"
            placeholder="Enter your full name"
            leftIcon={<User />}
            error={errors.fullName?.message}
            {...register("fullName")}
          />
          <Input
            type="email"
            label="Email Address"
            placeholder="example@email.com"
            leftIcon={<Mail />}
            error={errors.email?.message}
            {...register("email")}
          />
        </div>

        <Input
          label="Subject"
          placeholder="What is your message about?"
          leftIcon={<Tag />}
          error={errors.subject?.message}
          {...register("subject")}
        />

        <div>
          <label className="block text-sm font-medium text-fg mb-1.5">
            Your Message
          </label>
          <textarea
            {...register("message")}
            rows={5}
            placeholder="Write your message here..."
            className={`w-full rounded-xl border bg-surface px-4 py-3 text-sm text-fg placeholder:text-fg-muted/50 focus:outline-none focus:ring-2 transition-all resize-y ${
              errors.message
                ? "border-danger-500 focus:ring-danger-500/30"
                : "border-line focus:ring-accent-500/40"
            }`}
          />
          {errors.message && (
            <p className="mt-1.5 text-xs text-danger-700 dark:text-danger-500">
              {errors.message.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          variant="accent"
          size="lg"
          className="w-full sm:w-auto"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" /> Sending...
            </>
          ) : (
            <>
              <Send className="h-4 w-4" /> Send Message
            </>
          )}
        </Button>
      </form>
    </motion.div>
  );
}