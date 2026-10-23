import { motion } from "framer-motion";
import { Target, Eye } from "lucide-react";

const cards = [
  {
    icon: Target,
    title: "Our Mission",
    text: "To simplify hotel operations through organized tools that help teams save time and deliver better guest experiences.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    text: "To make smart, efficient hotel management accessible to hotels of different sizes.",
  },
];

export function MissionVision() {
  return (
    <section className="container-custom grid gap-6 sm:gap-8 pb-16 md:grid-cols-2">
      {cards.map((card, index) => (
        <motion.article
          key={card.title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.15 }}
          className="group rounded-2xl border border-line bg-surface-card p-6 sm:p-8 hover:border-accent-400 hover:shadow-xl transition-all duration-300"
        >
          <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-accent-100 dark:bg-accent-500/15 mb-4 group-hover:scale-110 transition-transform">
            <card.icon className="h-6 w-6 text-accent-600 dark:text-accent-400" />
          </div>
          <h2 className="text-xl sm:text-2xl font-semibold text-fg-strong">
            {card.title}
          </h2>
          <p className="mt-4 leading-7 text-fg-muted">{card.text}</p>
        </motion.article>
      ))}
    </section>
  );
}