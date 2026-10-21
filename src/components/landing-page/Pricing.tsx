import { Button } from "@/components/ui/Button";
import { Link } from "react-router-dom";
import { Check, Sparkles, CreditCard } from "lucide-react";
import { motion } from "framer-motion";

export function Pricing() {
  const features = [
    "Unlimited rooms & reservations",
    "Smart task auto-dispatch",
    "AI-powered guest request classification",
    "Real-time room status tracking",
    "Staff management & role-based access",
    "Detailed reports & analytics",
    "Export to Excel (Rooms, Staff, Tasks)",
    "24/7 email support",
  ];

  return (
    <section id="pricing" className="py-24 bg-surface">
      <div className="container-custom">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-100 text-accent-700 dark:bg-accent-500/15 dark:text-accent-300 text-sm font-medium mb-4">
            <Sparkles className="h-4 w-4" />
            Simple Pricing
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-fg-strong mb-4">One plan. Everything included.</h2>
          <p className="text-fg-muted max-w-2xl mx-auto">No hidden fees. No complicated tiers. Just one powerful plan to run your hotel.</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-lg mx-auto"
        >
          <div className="relative rounded-2xl border-2 border-primary-900 dark:border-accent-500/70 bg-surface-card p-8 shadow-xl shadow-primary-900/5">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary-900 text-white dark:bg-accent-500 dark:text-primary-950 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="h-3.5 w-3.5" />
                Best for Beginners
              </span>
            </div>

            <div className="text-center mb-8 pt-4">
              <h3 className="text-2xl font-bold text-fg-strong mb-2">Starter Plan</h3>
              <p className="text-sm text-fg-muted">Perfect for small & medium hotels</p>
            </div>

            <div className="text-center mb-8">
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-5xl font-bold text-fg-strong">$49</span>
                <span className="text-fg-muted text-lg">/month</span>
              </div>
              <p className="text-sm text-fg-muted mt-2">Billed monthly. Cancel anytime.</p>
            </div>

            <ul className="space-y-3 mb-8">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="h-5 w-5 rounded-full bg-success-50 dark:bg-success-500/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="h-3 w-3 text-success-700 dark:text-success-500" />
                  </div>
                  <span className="text-sm text-fg">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="space-y-3">
              <Link to="/register" className="block">
                <Button variant="accent" size="lg" className="w-full">Start 14-Day Free Trial</Button>
              </Link>
              <Link to="/checkout" className="block">
                <Button variant="outline" size="lg" className="w-full gap-2">
                  <CreditCard className="h-4 w-4" /> Subscribe Now
                </Button>
              </Link>
            </div>

            <p className="text-center text-xs text-fg-muted mt-4">No credit card required for trial</p>
          </div>
        </motion.div>

        <div className="text-center mt-12">
          <p className="text-sm text-fg-muted">
            Need a custom plan for a large hotel chain?{" "}
            <Link to="/contact" className="text-brand font-medium hover:underline">Contact us</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
