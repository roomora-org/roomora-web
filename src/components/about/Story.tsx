import { motion } from "framer-motion";

export function Story() {
  return (
    <section className="container-custom py-12 sm:py-16">
      <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand">
            About Roomora
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-fg-strong tracking-tight leading-tight">
            Our Story
          </h1>
          
          {/* تم إضافة text-left للموبايل و text-justify للديسكتوب */}
          <p className="mt-6 text-lg leading-8 text-fg-muted text-left md:text-justify">
            Roomora was born from a simple observation: hotel managers were
            drowning in spreadsheets, WhatsApp groups, and paper logs. We saw
            teams losing hours every day just to coordinate housekeeping,
            maintenance, and front-desk tasks.
          </p>
          
          <p className="mt-4 leading-7 text-fg-muted text-left md:text-justify">
            So we built Roomora, a unified platform that brings essential hotel
            operations together in one place. From room readiness to guest
            folios, we help teams work smarter, not harder.
          </p>
          
          <p className="mt-4 leading-7 text-fg-muted text-left md:text-justify font-medium text-fg-strong">
            More than software, Roomora is a partner in hospitality.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
          className="overflow-hidden rounded-2xl"
        >
          <img
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80"
            alt="Modern hotel with a swimming pool"
            className="h-72 w-full object-cover md:h-96 hover:scale-105 transition-transform duration-500"
          />
        </motion.div>
      </div>
    </section>
  );
}