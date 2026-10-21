"use client";

import { useEffect, useRef } from "react";

/**
 * Soft amber glow that follows the mouse. Mounted once in App.tsx,
 * so it shows on every page (Home, About, Contact...).
 * - Sits above page content but under the header (z-40), never blocks clicks.
 * - Eased with requestAnimationFrame for a smooth trail.
 * - Disabled on touch devices; no easing when reduced motion is requested.
 */
export function Spotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const ease = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 1 : 0.14;
    let tx = 0, ty = 0, x = 0, y = 0, raf = 0, shown = false;

    const paint = () => {
      x += (tx - x) * ease;
      y += (ty - y) * ease;
      el.style.setProperty("--spot-x", `${x}px`);
      el.style.setProperty("--spot-y", `${y}px`);
      raf = Math.hypot(tx - x, ty - y) > 0.5 ? requestAnimationFrame(paint) : 0;
    };

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!shown) {
        shown = true;
        x = tx;
        y = ty;
        el.style.opacity = "1";
      }
      if (!raf) raf = requestAnimationFrame(paint);
    };

    const onLeave = () => {
      shown = false;
      el.style.opacity = "0";
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-40 opacity-0 transition-opacity duration-500"
      style={{
        background:
          "radial-gradient(520px circle at var(--spot-x, 50%) var(--spot-y, 50%), var(--spotlight-color), transparent 45%)",
      }}
    />
  );
}
