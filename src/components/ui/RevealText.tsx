import { motion, type Variants } from "framer-motion";
import type { ElementType, ReactNode } from "react";
import { EASE_CINE } from "../../lib/motion";

type Props = {
  lines: ReactNode[];
  as?: ElementType;
  className?: string;
  /** Seconds before the first line starts. */
  delay?: number;
  /** Animate on mount instead of on scroll (used by the hero). */
  immediate?: boolean;
  stagger?: number;
  duration?: number;
};

/** Headline reveal through a vertical mask: each line slides up from translateY(110%). */
export function RevealText({
  lines,
  as: Tag = "h2",
  className = "",
  delay = 0,
  immediate = false,
  stagger = 0.09,
  duration = 0.95,
}: Props) {
  const line: Variants = {
    hidden: { y: "110%" },
    show: (i: number) => ({ y: "0%", transition: { duration, ease: EASE_CINE, delay: delay + i * stagger } }),
  };
  // Above-the-fold headlines animate in CSS (.k-line-up in index.css): it starts at first
  // paint of the prerendered HTML instead of after JS loads — the headline is often the LCP.
  if (immediate) {
    return (
      <Tag className={className}>
        {lines.map((content, i) => (
          <span key={i} className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
            <span
              className="k-line-up block"
              style={{ animationDuration: `${duration}s`, animationDelay: `${delay + i * stagger}s` }}
            >
              {content}
              {i < lines.length - 1 && " "}
            </span>
          </span>
        ))}
      </Tag>
    );
  }

  // The in-view trigger sits on the (untransformed) mask, not on the shifted line,
  // so headlines anchored near the bottom of the viewport still fire.
  const trigger = { whileInView: "show", viewport: { once: true, margin: "-60px 0px" } };

  return (
    <Tag className={className}>
      {lines.map((content, i) => (
        // padding-bottom keeps descenders (g, y, ç) from being clipped by the mask
        <motion.span
          key={i}
          className="block overflow-hidden pb-[0.12em] -mb-[0.12em]"
          initial="hidden"
          {...trigger}
        >
          <motion.span className="block will-change-transform" variants={line} custom={i}>
            {content}
            {/* keeps words apart in the text crawlers read ("tam koordinatında", not "tamkoordinatında") */}
            {i < lines.length - 1 && " "}
          </motion.span>
        </motion.span>
      ))}
    </Tag>
  );
}
