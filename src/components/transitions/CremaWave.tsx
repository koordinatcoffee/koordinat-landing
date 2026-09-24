import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useIsMobile, useReducedMotionPref } from "../../lib/hooks";

const W = 1440;
const H = 180;

/**
 * Top edge of a section that rises into the one above like crema:
 * flat → swells into a dome as it scrolls in → settles flat again.
 * Place as the first child of a `relative` section; `fill` = that section's colour.
 */
export function CremaWave({ fill, className = "" }: { fill: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotionPref();
  const mobile = useIsMobile();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["end end", "end 0.25"] });

  const amp = mobile ? 0.55 : 1;
  const d = useTransform(scrollYProgress, (p) => {
    const lift = Math.sin(Math.min(1, Math.max(0, p)) * Math.PI) * H * amp;
    // two controls: a slightly off-centre swell reads as liquid, not geometry
    return `M0 ${H} C ${W * 0.28} ${H - lift * 1.25}, ${W * 0.62} ${H - lift * 1.35}, ${W} ${H} Z`;
  });

  if (reduced) return null;
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 bottom-full z-10 h-[180px] translate-y-px ${className}`}
    >
      <svg className="h-full w-full" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
        <motion.path d={d} fill={fill} />
      </svg>
    </div>
  );
}
