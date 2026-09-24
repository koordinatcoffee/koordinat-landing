import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useFinePointer, useReducedMotionPref } from "../lib/hooks";
import { useLang } from "../lib/i18n";
import type { Lang } from "../routes";

const LABELS: Record<Lang, Record<string, string>> = {
  en: { view: "View", open: "Open", discover: "Discover", go: "Go" },
  tr: { view: "Gör", open: "Aç", discover: "Keşfet", go: "Git" },
};

/**
 * Desktop-only cursor. Reads the nearest [data-theme] under the pointer so it
 * is espresso on cream sections and cream on dark ones, and grows with a
 * label over [data-cursor] targets (other links/buttons read "Open").
 */
export function CoffeeCursor() {
  const fine = useFinePointer();
  const reduced = useReducedMotionPref();
  const enabled = fine && !reduced;
  const labels = LABELS[useLang()];

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });

  const [label, setLabel] = useState<string | null>(null);
  const [light, setLight] = useState(false);
  const [hidden, setHidden] = useState(true);
  const last = useRef({ x: -100, y: -100 });
  const frame = useRef(0);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("has-cursor");

    const sample = () => {
      frame.current = 0;
      const el = document.elementFromPoint(last.current.x, last.current.y);
      if (!el) return;
      setLight(el.closest("[data-theme]")?.getAttribute("data-theme") === "light");
      const t = el.closest("[data-cursor], a, button");
      setLabel(t ? (t.getAttribute("data-cursor") ?? "open") : null);
    };
    const schedule = () => {
      if (!frame.current) frame.current = requestAnimationFrame(sample);
    };
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      last.current = { x: e.clientX, y: e.clientY };
      x.set(e.clientX);
      y.set(e.clientY);
      setHidden(false);
      schedule();
    };
    const leave = () => setHidden(true);

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("scroll", schedule, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("scroll", schedule);
      document.documentElement.removeEventListener("pointerleave", leave);
      cancelAnimationFrame(frame.current);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;
  const active = label !== null;
  const size = !active ? 12 : label === "discover" ? 72 : 52;

  return (
    <motion.div aria-hidden="true" className="pointer-events-none fixed top-0 left-0 z-[100]" style={{ x: sx, y: sy }}>
      <motion.div
        className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
        animate={{
          width: size,
          height: size,
          opacity: hidden ? 0 : 1,
          backgroundColor: light ? "#2a1b14" : "#f4ebdd",
          color: light ? "#f4ebdd" : "#15110e",
          // contrasting ring keeps the dot readable over photos and mid-tones
          boxShadow: light
            ? "0 0 0 1px rgba(244,235,221,0.55), 0 6px 18px -6px rgba(42,27,20,0.45)"
            : "0 0 0 1px rgba(21,17,14,0.45), 0 6px 18px -6px rgba(0,0,0,0.5)",
        }}
        transition={{ type: "spring", stiffness: 380, damping: 30 }}
      >
        <motion.span
          className="text-[9px] font-semibold tracking-[0.18em] uppercase"
          animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 0.6 }}
          transition={{ duration: 0.25 }}
        >
          {label ? labels[label] : null}
        </motion.span>
      </motion.div>
    </motion.div>
  );
}
