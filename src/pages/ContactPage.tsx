import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { SEO } from "@/components/layout/SEO";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactInfo } from "@/components/contact/ContactInfo";
import { Button } from "@/components/ui/Button";
import { ArrowRight, MessageCircle } from "lucide-react";

export default function ContactPage() {
  return (
    <>
      <SEO
        title="Contact Us"
        description="Get in touch with the Roomora team. We're here to help."
        path="/contact"
      />

      {/* Hero Section */}
      <section className="container-custom pt-12 sm:pt-16 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-100 dark:bg-accent-500/15 text-accent-700 dark:text-accent-300 text-sm font-medium mb-4">
            <MessageCircle className="h-4 w-4" />
            We'd love to hear from you
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-fg-strong tracking-tight mb-4">
            Get in Touch
          </h1>
          <p className="text-base sm:text-lg text-fg-muted leading-relaxed">
            Whether you have a question about features, pricing, or need a
            custom demo, our team is ready to answer all your questions.
          </p>
        </motion.div>
      </section>

      {/* Form + Info Side by Side */}
      <section className="container-custom pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          <div className="lg:col-span-3">
            <ContactForm />
          </div>
          <div className="lg:col-span-2">
            <ContactInfo />
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="container-custom pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl bg-gradient-to-br from-primary-900 to-primary-950 px-6 py-10 md:px-12 md:py-12 text-center shadow-xl"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-primary-50 mb-3">
            Prefer to explore on your own?
          </h2>
          <p className="text-primary-200 mb-6 max-w-lg mx-auto">
            Start your 14-day free trial today. No credit card required.
          </p>
          <Link to="/register">
            <Button variant="accent" size="lg" className="gap-2">
              Start Free Trial <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </section>
    </>
  );
}