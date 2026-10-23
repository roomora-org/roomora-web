import { motion } from "framer-motion";
import { Sparkles, Zap, Lightbulb, Users } from "lucide-react";

const values = [
  {
    icon: Sparkles,
    title: "Simplicity",
    description:
      "We strip away complexity so hotel teams can focus on what matters: their guests.",
  },
  {
    icon: Zap,
    title: "Efficiency",
    description:
      "Every feature is designed to save time and eliminate repetitive manual work.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "We embrace smart automation and AI to solve real operational challenges.",
  },
  {
    icon: Users,
    title: "Teamwork",
    description:
      "We believe connected teams deliver better results, for staff and guests alike.",
  },
];

export function Values() {
  return (
    <section className="container-custom py-16">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-brand">
          Our Values
        </p>
        <h2 className="mt-3 text-3xl font-bold md:text-4xl text-fg-strong">
          What Guides Us
        </h2>
        <p className="mt-5 leading-7 text-fg-muted">
          The principles behind the way we build Roomora and support hotel teams.
        </p>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {values.map((value, index) => (
          <motion.article
            key={value.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group rounded-2xl border border-line bg-surface-card p-6 hover:border-accent-400 hover:shadow-lg transition-all duration-300"
          >
            <div className="inline-flex items-center justify-center h-11 w-11 rounded-xl bg-accent-100 dark:bg-accent-500/15 mb-4 group-hover:scale-110 transition-transform">
              <value.icon className="h-5 w-5 text-accent-600 dark:text-accent-400" />
            </div>
            <h3 className="text-lg font-semibold text-fg-strong">
              {value.title}
            </h3>
            <p className="mt-3 leading-7 text-fg-muted text-sm">
              {value.description}
            </p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}