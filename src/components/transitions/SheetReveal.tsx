import { motion, useMotionTemplate, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { useIsMobile, useReducedMotionPref } from "../../lib/hooks";

/**
 * The next section arrives as a rounded sheet, inset from the edges,
 * and opens to full bleed as its top reaches the top of the viewport.
 * `under` is the colour of the section it slides over (shown in the margins).
 */
export function SheetReveal({ under, children }: { under: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotionPref();
  const mobile = useIsMobile();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start start"] });

  const side = useTransform(scrollYProgress, [0, 1], [mobile ? 3 : 5, 0]);
  const radius = useTransform(scrollYProgress, [0, 0.85, 1], [mobile ? 28 : 64, mobile ? 8 : 16, 0]);
  const clipPath = useMotionTemplate`inset(0% ${side}% 0% ${side}% round ${radius}px ${radius}px 0px 0px)`;

  return (
    <div ref={ref} style={{ background: under }} className="relative">
      <motion.div style={reduced ? undefined : { clipPath }}>{children}</motion.div>
    </div>
  );
}
