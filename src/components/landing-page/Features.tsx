"use client";

import { BedDouble, ClipboardList, Sparkles, ShieldCheck, BarChart3, Wrench } from "lucide-react";
import { motion } from "framer-motion";

export function Features() {
  // Icon chips: light = solid pastel, dark = translucent tint (readable on dark cards)
  const features = [
    { icon: BedDouble, title: "Room Management", description: "Track occupancy, cleaning, and maintenance statuses independently in real-time.", color: "text-primary-700 dark:text-primary-300", bg: "bg-primary-100 dark:bg-primary-500/15" },
    { icon: Sparkles, title: "Smart Readiness Engine", description: "Dynamically prioritize room cleaning based on upcoming guest arrivals and urgency.", color: "text-accent-600 dark:text-accent-400", bg: "bg-accent-100 dark:bg-accent-500/15" },
    { icon: ClipboardList, title: "Auto-Dispatch Tasks", description: "Automatically route tasks to available staff based on workload and floor proximity.", color: "text-primary-600 dark:text-primary-400", bg: "bg-primary-50 dark:bg-primary-500/10" },
    { icon: ShieldCheck, title: "Role-Based Access", description: "Strict data isolation and secure access tailored for Managers, Receptionists, and Staff.", color: "text-success-700 dark:text-success-500", bg: "bg-success-50 dark:bg-success-500/15" },
    { icon: BarChart3, title: "Smart Reports", description: "Detailed analytics on occupancy rates, room readiness, and delayed maintenance issues.", color: "text-primary-800 dark:text-primary-300", bg: "bg-primary-100 dark:bg-primary-500/15" },
    { icon: Wrench, title: "Maintenance Tracking", description: "Log faults, lock rooms (Out of Service), and track resolution timestamps efficiently.", color: "text-danger-700 dark:text-danger-500", bg: "bg-danger-50 dark:bg-danger-500/15" },
  ];

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

  return (
    <section id="features" className="py-section bg-surface-card relative">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-fg-strong mb-4">Everything you need to operate</h2>
          <p className="text-fg-muted max-w-2xl mx-auto text-lg">Powerful features designed to simplify daily hotel operations and elevate guest experience.</p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="p-8 rounded-2xl bg-surface border border-line hover:border-accent-300 dark:hover:border-accent-500/50 hover:shadow-lg transition-all duration-300 group cursor-default"
            >
              <div className={`h-14 w-14 rounded-xl ${feature.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className={`h-7 w-7 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-bold text-fg-strong mb-3">{feature.title}</h3>
              <p className="text-fg-muted leading-relaxed text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
