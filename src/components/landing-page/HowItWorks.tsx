"use client";

import { motion } from "framer-motion";
import { Building2, UserPlus, Rocket } from "lucide-react";

export function HowItWorks() {
  const steps = [
    { number: "01", title: "Register Your Hotel", description: "Create your tenant profile and configure room types, capacities, and base rates in minutes.", icon: Building2 },
    { number: "02", title: "Add Your Staff", description: "Invite your team and assign roles like Receptionist, Housekeeping, and Maintenance.", icon: UserPlus },
    { number: "03", title: "Start Managing", description: "Manage reservations, trigger cleaning tasks, and track room readiness from one dashboard.", icon: Rocket },
  ];

  return (
    <section id="how-it-works" className="py-section relative overflow-hidden">
      <div className="container-custom relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-fg-strong mb-4">How It Works</h2>
          <p className="text-fg-muted text-lg">Get your hotel up and running in three simple steps.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          <div className="hidden md:block absolute top-10 left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-transparent via-accent-300 dark:via-accent-600/60 to-transparent z-0"></div>

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative text-center z-10 group"
            >
              <div className="w-20 h-20 mx-auto bg-surface-card rounded-2xl border border-line shadow-sm flex items-center justify-center mb-6 group-hover:border-accent-400 group-hover:shadow-md transition-all relative">
                <step.icon className="h-8 w-8 text-brand" />
                <div className="absolute -top-3 -right-3 h-8 w-8 rounded-full bg-primary-900 text-white dark:bg-accent-500 dark:text-primary-950 text-xs font-bold flex items-center justify-center border-2 border-surface">
                  {step.number}
                </div>
              </div>
              <h3 className="text-xl font-bold text-fg-strong mb-3">{step.title}</h3>
              <p className="text-fg-muted text-sm leading-relaxed max-w-xs mx-auto">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
