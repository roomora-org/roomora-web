"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  PlayCircle,
  Sparkles,
  BedDouble,
  ClipboardList,
  LayoutDashboard,
  Lock,
} from "lucide-react";
import {
  motion,
  AnimatePresence,
  animate,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

const DEMO_URL = "https://roomora-new.vercel.app/";
const DEMO_LABEL = "roomora-new.vercel.app";

type RoomStatus = "ready" | "occupied" | "cleaning" | "maintenance";

const initialRooms: RoomStatus[] = [
  "occupied", "ready", "occupied", "cleaning", "ready", "occupied", "maintenance", "ready",
  "occupied", "occupied", "ready", "cleaning", "occupied", "ready", "ready", "occupied",
];

const statusStyle: Record<RoomStatus, string> = {
  ready: "bg-success-50 text-success-700 border-success-500/30 dark:bg-success-500/10 dark:text-success-500",
  occupied: "bg-primary-100 text-primary-800 border-primary-300 dark:bg-primary-500/15 dark:text-primary-300 dark:border-primary-500/30",
  cleaning: "bg-warning-50 text-warning-700 border-warning-500/30 dark:bg-warning-500/10 dark:text-warning-500",
  maintenance: "bg-danger-50 text-danger-700 border-danger-500/30 dark:bg-danger-500/10 dark:text-danger-500",
};

const statusDot: Record<RoomStatus, string> = {
  ready: "bg-success-500",
  occupied: "bg-primary-500",
  cleaning: "bg-warning-500",
  maintenance: "bg-danger-500",
};

// what happens to a room on each "live" tick
const nextStatus: Record<RoomStatus, RoomStatus> = {
  occupied: "cleaning",
  cleaning: "ready",
  ready: "occupied",
  maintenance: "ready",
};

const eventText: Record<RoomStatus, string> = {
  ready: "is now ready",
  occupied: "just checked in",
  cleaning: "sent to housekeeping",
  maintenance: "needs maintenance",
};

const countOf = (rooms: RoomStatus[], s: RoomStatus) => rooms.filter((r) => r === s).length;

const statsConfig = [
  { key: "occupied" as const, label: "Occupied", base: 42, bar: "bg-primary-500" },
  { key: "ready" as const, label: "Ready", base: 18, bar: "bg-success-500" },
  { key: "cleaning" as const, label: "Cleaning", base: 7, bar: "bg-warning-500" },
];

const initialCounts = {
  occupied: countOf(initialRooms, "occupied"),
  ready: countOf(initialRooms, "ready"),
  cleaning: countOf(initialRooms, "cleaning"),
};

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, active: true },
  { label: "Rooms", icon: BedDouble, active: false },
  { label: "Tasks", icon: ClipboardList, active: false },
];

/* ------------------------------------------------------------------ */
/* Animation variants                                                  */
/* ------------------------------------------------------------------ */

const group: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};
const roomsGroup: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.03, delayChildren: 0.5 } },
};
const tileVariant: Variants = {
  hidden: { opacity: 0, scale: 0.6 },
  show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 320, damping: 22 } },
};

/* ------------------------------------------------------------------ */
/* Small helpers                                                       */
/* ------------------------------------------------------------------ */

/** Number that counts up on first reveal and eases to every later change. */
function CountUp({ to, start }: { to: number; start: boolean }) {
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);
  const from = useRef(0);

  useEffect(() => {
    if (!start) return;
    if (reduce) {
      from.current = to;
      setValue(to);
      return;
    }
    const controls = animate(from.current, to, {
      duration: from.current === 0 ? 1.4 : 0.5,
      ease: "easeOut",
      onUpdate: (v) => {
        from.current = v;
        setValue(Math.round(v));
      },
    });
    return () => controls.stop();
  }, [to, start, reduce]);

  return <span className="tabular-nums">{value}</span>;
}

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

export function Hero() {
  const reduce = useReducedMotion();
  const mockRef = useRef<HTMLDivElement>(null);
  const started = useInView(mockRef, { once: true, amount: 0.3 }); // first reveal
  const visible = useInView(mockRef, { amount: 0.1 });             // pause when off-screen

  const [rooms, setRooms] = useState<RoomStatus[]>(initialRooms);
  const roomsRef = useRef<RoomStatus[]>(initialRooms);
  const lastIndex = useRef(-1);
  const eventId = useRef(0);
  const [event, setEvent] = useState<{ id: number; index: number; status: RoomStatus } | null>(null);

  // "Live" simulation: every few seconds one room changes status
  useEffect(() => {
    if (!started || !visible || reduce) return;

    let hideTimer: number | undefined;
    const tick = window.setInterval(() => {
      const visibleCount = window.innerWidth < 640 ? 8 : 16; // mobile only shows 8 tiles
      let i = Math.floor(Math.random() * visibleCount);
      if (i === lastIndex.current) i = (i + 1) % visibleCount;
      lastIndex.current = i;

      const next = nextStatus[roomsRef.current[i]];
      const copy = [...roomsRef.current];
      copy[i] = next;
      roomsRef.current = copy;
      setRooms(copy);

      eventId.current += 1;
      setEvent({ id: eventId.current, index: i, status: next });
      window.clearTimeout(hideTimer);
      hideTimer = window.setTimeout(() => setEvent(null), 2200);
    }, 2800);

    return () => {
      window.clearInterval(tick);
      window.clearTimeout(hideTimer);
    };
  }, [started, visible, reduce]);

  const stats = statsConfig.map((s) => ({
    ...s,
    value: s.base + (countOf(rooms, s.key) - initialCounts[s.key]),
  }));

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

        {/* ---------------- Animated dashboard mockup ---------------- */}
        <motion.div
          ref={mockRef}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="relative max-w-5xl mx-auto"
        >
          {/* gentle floating */}
          <motion.div
            animate={reduce ? undefined : { y: [0, -8, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            <motion.div
              animate={reduce ? undefined : { opacity: [0.15, 0.3, 0.15] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -inset-1 bg-gradient-to-r from-accent-500 to-primary-900 rounded-2xl blur opacity-20"
            />

            <div className="relative rounded-2xl border border-line bg-surface-card shadow-2xl p-2 overflow-hidden">
              <div className="relative rounded-xl bg-surface border border-line h-[450px] flex flex-col text-left overflow-hidden">
                {/* window bar */}
                <div className="h-12 shrink-0 border-b border-line flex items-center px-4 gap-2 bg-surface-card rounded-t-xl">
                  <div className="h-3 w-3 rounded-full bg-danger-500/80" />
                  <div className="h-3 w-3 rounded-full bg-warning-500/80" />
                  <div className="h-3 w-3 rounded-full bg-success-500/80" />
                  <a
                    href={DEMO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open the Roomora live demo"
                    className="ml-4 flex-1 h-7 bg-chip hover:bg-chip/70 rounded-md flex items-center gap-1.5 px-3 text-xs text-fg-muted hover:text-fg-strong transition-colors"
                  >
                    <Lock className="h-3 w-3 shrink-0 text-success-500" />
                    <span className="truncate">{DEMO_LABEL}</span>
                  </a>
                </div>

                {/* page-load progress line */}
                <motion.div
                  aria-hidden="true"
                  initial={{ scaleX: 0, opacity: 1 }}
                  animate={started ? { scaleX: 1, opacity: [1, 1, 0] } : { scaleX: 0, opacity: 1 }}
                  transition={{ duration: 1.3, ease: "easeOut" }}
                  className="absolute top-12 left-0 right-0 h-0.5 origin-left bg-accent-500 z-10"
                />

                {/* body */}
                <motion.div
                  aria-hidden="true"
                  variants={group}
                  initial="hidden"
                  animate={started ? "show" : "hidden"}
                  className="flex-1 p-4 sm:p-6 grid grid-cols-4 gap-4 min-h-0"
                >
                  {/* sidebar */}
                  <motion.div variants={item} className="col-span-1 bg-surface-card rounded-lg border border-line p-4 hidden md:block">
                    <div className="h-8 w-24 bg-chip rounded animate-pulse" />
                    <motion.div variants={group} className="space-y-2 mt-8">
                      {navItems.map(({ label, icon: Icon, active }) => (
                        <motion.div
                          key={label}
                          variants={item}
                          className={`h-8 rounded px-2 flex items-center gap-2 text-xs transition-colors ${
                            active
                              ? "bg-accent-100/70 dark:bg-accent-500/10 border border-accent-200 dark:border-accent-500/20 text-brand font-medium"
                              : "text-fg-muted hover:bg-chip"
                          }`}
                        >
                          <Icon className="h-4 w-4" /> {label}
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.div>

                  {/* main column */}
                  <motion.div variants={group} className="col-span-4 md:col-span-3 space-y-4">
                    {/* stat cards */}
                    <motion.div variants={group} className="grid grid-cols-3 gap-3 sm:gap-4">
                      {stats.map((s) => (
                        <motion.div
                          key={s.key}
                          variants={item}
                          className="bg-surface-card p-3 sm:p-4 rounded-lg border border-line h-24 flex flex-col justify-between"
                        >
                          <div className="flex items-center gap-2 text-xs text-fg-muted">
                            <span className={`h-2 w-2 rounded-full ${s.bar}`} />
                            {s.label}
                          </div>
                          <div className="text-2xl sm:text-3xl font-bold text-fg-strong leading-none">
                            <CountUp to={s.value} start={started} />
                          </div>
                          <div className="h-1 rounded-full bg-chip overflow-hidden">
                            <motion.div
                              className={`h-full rounded-full ${s.bar}`}
                              initial={{ width: 0 }}
                              animate={{ width: started ? `${Math.min(100, (s.value / 60) * 100)}%` : 0 }}
                              transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }}
                            />
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>

                    {/* room map */}
                    <motion.div variants={item} className="bg-surface-card rounded-lg border border-line p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="flex items-center gap-2 text-sm font-semibold text-fg-strong">
                          Live Room Status
                          <span className="inline-flex items-center gap-1 rounded-full bg-success-50 dark:bg-success-500/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-success-700 dark:text-success-500">
                            <span className="relative flex h-1.5 w-1.5">
                              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success-500 opacity-75" />
                              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success-500" />
                            </span>
                            Live
                          </span>
                        </span>
                        <span className="hidden sm:flex items-center gap-3 text-[11px] text-fg-muted">
                          <span className="flex items-center gap-1"><i className="h-2 w-2 rounded-full bg-success-500" />Ready</span>
                          <span className="flex items-center gap-1"><i className="h-2 w-2 rounded-full bg-primary-500" />Occupied</span>
                          <span className="flex items-center gap-1"><i className="h-2 w-2 rounded-full bg-warning-500" />Cleaning</span>
                          <span className="flex items-center gap-1"><i className="h-2 w-2 rounded-full bg-danger-500" />Maintenance</span>
                        </span>
                      </div>

                      <motion.div variants={roomsGroup} className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                        {rooms.map((status, i) => (
                          <motion.div
                            key={i}
                            variants={tileVariant}
                            whileHover={{ scale: 1.08 }}
                            className={`relative h-9 rounded-md border text-xs font-semibold items-center justify-center transition-colors duration-500 ${statusStyle[status]} ${i >= 8 ? "hidden sm:flex" : "flex"}`}
                          >
                            {101 + i}
                            {event?.index === i && (
                              <motion.span
                                key={event.id}
                                className="pointer-events-none absolute inset-0 rounded-md ring-2 ring-accent-500"
                                initial={{ opacity: 0.9, scale: 1 }}
                                animate={{ opacity: 0, scale: 1.45 }}
                                transition={{ duration: 1, ease: "easeOut" }}
                              />
                            )}
                          </motion.div>
                        ))}
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </motion.div>

                {/* live notification */}
                <div aria-hidden="true" className="pointer-events-none absolute bottom-3 right-3 z-20">
                  <AnimatePresence>
                    {event && (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, y: 16, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 380, damping: 26 }}
                        className="flex items-center gap-2 rounded-lg border border-line bg-surface-card px-3 py-2 text-xs shadow-lg"
                      >
                        <span className={`h-2 w-2 rounded-full ${statusDot[event.status]}`} />
                        <span className="text-fg-muted">
                          <b className="font-semibold text-fg-strong">Room {101 + event.index}</b>{" "}
                          {eventText[event.status]}
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}