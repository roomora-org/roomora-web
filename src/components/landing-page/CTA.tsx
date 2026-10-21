"use client";

import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

/**
 * Self-contained: uses fixed palette colors (not theme tokens) because this card is
 * dark espresso in BOTH themes, and plain <Link> buttons so it never depends on Button variants.
 */
export function CTA() {
  return (
    <section className="py-24">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-900 to-primary-950 px-6 py-16 sm:px-12 sm:py-20 text-center shadow-2xl ring-1 ring-primary-300/20"
        >
          {/* decoration */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              backgroundImage: "radial-gradient(rgba(253,250,246,0.10) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
          <div aria-hidden="true" className="pointer-events-none absolute -top-32 -right-24 h-80 w-80 rounded-full bg-accent-500/25 blur-[100px]" />
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-primary-500/25 blur-[100px]" />

          <div className="relative z-10 mx-auto max-w-3xl">
            <h2 className="text-3xl md:text-5xl font-bold text-primary-50 mb-6 leading-tight tracking-tight">
              Ready to transform your hotel operations?
            </h2>
            <p className="text-primary-200 mb-10 max-w-xl mx-auto text-lg leading-relaxed">
              Join hundreds of hotels using Roomora to streamline operations, eliminate double bookings, and elevate guest experiences.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent-500 px-8 py-4 text-base font-semibold text-primary-950 shadow-xl shadow-black/25 transition-all hover:-translate-y-0.5 hover:bg-accent-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-300 w-full sm:w-auto"
              >
                Get Started for Free <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-xl border border-primary-300/40 px-8 py-4 text-base font-semibold text-primary-50 transition-colors hover:bg-primary-50/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-300 w-full sm:w-auto"
              >
                Talk to us
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
