"use client";

import { Button } from "@/components/ui/Button";
import { Link } from "react-router-dom";
import { ArrowRight, PlayCircle, Sparkles, ShieldCheck, Zap, LayoutDashboard } from "lucide-react";
import { motion } from "framer-motion";

type RoomStatus = "ready" | "occupied" | "cleaning" | "maintenance";

const roomStatuses: RoomStatus[] = [
  "occupied", "ready", "occupied", "cleaning", "ready", "occupied", "maintenance", "ready",
  "occupied", "occupied", "ready", "cleaning", "occupied", "ready", "ready", "occupied",
];

const statusStyle: Record<RoomStatus, string> = {
  ready: "bg-success-50 text-success-700 border-success-500/30 dark:bg-success-500/10 dark:text-success-500",
  occupied: "bg-primary-100 text-primary-800 border-primary-300 dark:bg-primary-500/15 dark:text-primary-300 dark:border-primary-500/30",
  cleaning: "bg-warning-50 text-warning-700 border-warning-500/30 dark:bg-warning-500/10 dark:text-warning-500",
  maintenance: "bg-danger-50 text-danger-700 border-danger-500/30 dark:bg-danger-500/10 dark:text-danger-500",
};

const stats = [
  { label: "Occupied", value: "42", dot: "bg-primary-500" },
  { label: "Ready", value: "18", dot: "bg-success-500" },
  { label: "Cleaning", value: "7", dot: "bg-warning-500" },
];

export function Hero() {
  return (
    <section className="relative pt-16 md:pt-24 pb-24 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-accent-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="container-custom relative z-10 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-card border border-line shadow-sm text-brand text-sm font-semibold mb-8"
        >
          <Sparkles className="h-4 w-4 text-accent-500" />
          <span>Now with AI-Powered Task Dispatch</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-fg-strong tracking-tight mb-6 leading-[1.1]"
        >
          Manage Your Hotel <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-900 to-accent-600 dark:from-primary-200 dark:to-accent-400">
            Smartly from One Place
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-fg-muted mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          Roomora helps you manage reservations, rooms, and tasks efficiently. Eliminate double bookings and automate your housekeeping with our smart readiness engine.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link to="/register" className="w-full sm:w-auto">
            <Button variant="accent" size="lg" className="gap-2 w-full hover:-translate-y-0.5">
              Start Free Trial <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Button variant="outline" size="lg" className="gap-2 w-full sm:w-auto bg-surface-card/50 backdrop-blur-sm">
            <PlayCircle className="h-5 w-5" /> Watch Demo
          </Button>
        </motion.div>

        {/* Dashboard mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="relative max-w-5xl mx-auto"
          aria-hidden="true"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-accent-500 to-primary-900 rounded-2xl blur opacity-20" />

          <div className="relative rounded-2xl border border-line bg-surface-card shadow-2xl p-2 overflow-hidden">
            <div className="rounded-xl bg-surface border border-line h-[450px] flex flex-col text-left">
              {/* window bar */}
              <div className="h-12 shrink-0 border-b border-line flex items-center px-4 gap-2 bg-surface-card rounded-t-xl">
                <div className="h-3 w-3 rounded-full bg-danger-500/80"></div>
                <div className="h-3 w-3 rounded-full bg-warning-500/80"></div>
                <div className="h-3 w-3 rounded-full bg-success-500/80"></div>
                <div className="ml-4 flex-1 h-6 bg-chip rounded-md flex items-center px-3 text-xs text-fg-muted">
                  app.roomora.com/dashboard
                </div>
              </div>

              <div className="flex-1 p-4 sm:p-6 grid grid-cols-4 gap-4 min-h-0">
                {/* sidebar */}
                <div className="col-span-1 bg-surface-card rounded-lg border border-line p-4 space-y-4 hidden md:block">
                  <div className="h-8 w-24 bg-chip rounded"></div>
                  <div className="space-y-2 mt-8">
                    <div className="h-8 bg-accent-100/70 dark:bg-accent-500/10 rounded border border-accent-200 dark:border-accent-500/20 flex items-center px-2 gap-2 text-brand text-xs font-medium"><LayoutDashboard className="h-4 w-4"/> Dashboard</div>
                    <div className="h-8 rounded px-2 flex items-center gap-2 text-fg-muted text-xs"><ShieldCheck className="h-4 w-4"/> Rooms</div>
                    <div className="h-8 rounded px-2 flex items-center gap-2 text-fg-muted text-xs"><Zap className="h-4 w-4"/> Tasks</div>
                  </div>
                </div>

                <div className="col-span-4 md:col-span-3 space-y-4">
                  {/* stat cards */}
                  <div className="grid grid-cols-3 gap-3 sm:gap-4">
                    {stats.map((s) => (
                      <div key={s.label} className="bg-surface-card p-3 sm:p-4 rounded-lg border border-line h-24 flex flex-col justify-between">
                        <div className="flex items-center gap-2 text-xs text-fg-muted">
                          <span className={`h-2 w-2 rounded-full ${s.dot}`} />
                          {s.label}
                        </div>
                        <div className="text-2xl sm:text-3xl font-bold text-fg-strong">{s.value}</div>
                      </div>
                    ))}
                  </div>

                  {/* room map */}
                  <div className="bg-surface-card rounded-lg border border-line p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-semibold text-fg-strong">Live Room Status</span>
                      <span className="hidden sm:flex items-center gap-3 text-[11px] text-fg-muted">
                        <span className="flex items-center gap-1"><i className="h-2 w-2 rounded-full bg-success-500" />Ready</span>
                        <span className="flex items-center gap-1"><i className="h-2 w-2 rounded-full bg-primary-500" />Occupied</span>
                        <span className="flex items-center gap-1"><i className="h-2 w-2 rounded-full bg-warning-500" />Cleaning</span>
                        <span className="flex items-center gap-1"><i className="h-2 w-2 rounded-full bg-danger-500" />Maintenance</span>
                      </span>
                    </div>
                    <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                      {roomStatuses.map((status, i) => (
                        <div
                          key={i}
                          className={`h-9 rounded-md border text-xs font-semibold items-center justify-center ${statusStyle[status]} ${i >= 8 ? "hidden sm:flex" : "flex"}`}
                        >
                          {101 + i}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
