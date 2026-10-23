import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function CallToAction() {
  return (
    <section className="container-custom py-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-900 via-primary-950 to-primary-800 px-6 py-12 text-center md:px-12 md:py-16 shadow-xl"
      >
        {/* Decorative glow */}
        <div
          aria-hidden
          className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-accent-500/20 blur-[100px]"
        />
        <div
          aria-hidden
          className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-primary-500/20 blur-[100px]"
        />

        <div className="relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-50">
            Ready to Simplify Your Hotel Operations?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-primary-200 leading-relaxed">
            Discover how Roomora can help your team manage rooms, reservations,
            and daily tasks more efficiently.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/register"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent-500 px-8 py-3.5 text-base font-semibold text-primary-950 shadow-xl shadow-black/20 transition-all hover:-translate-y-0.5 hover:bg-accent-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-300 w-full sm:w-auto"
            >
              Get Started Free <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-xl border border-primary-300/40 px-8 py-3.5 text-base font-semibold text-primary-50 transition-colors hover:bg-primary-50/10 w-full sm:w-auto"
            >
              Explore Roomora
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}