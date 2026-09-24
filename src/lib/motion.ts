export const EASE_CINE = [0.16, 1, 0.3, 1] as const;
export const EASE_SOFT = [0.22, 1, 0.36, 1] as const;

/** Shared once-only section reveal. */
export const reveal = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: EASE_CINE },
} as const;
