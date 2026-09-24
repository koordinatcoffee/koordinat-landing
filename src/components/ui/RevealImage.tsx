import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE_CINE } from "../../lib/motion";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

/** Cinematic media reveal: clip-path inset(8%) → 0, inner scale 1.08 → 1. */
export function RevealImage({ children, className = "", delay = 0 }: Props) {
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      initial={{ clipPath: "inset(8% 8% 8% 8%)", opacity: 0.7 }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1.0, ease: EASE_CINE, delay }}
    >
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.08 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.2, ease: EASE_CINE, delay }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
