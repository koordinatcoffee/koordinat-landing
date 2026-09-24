import { motion, useScroll, useTransform } from "framer-motion";
import { useCopy } from "../lib/i18n";
import { useRef } from "react";
import { useIsMobile, useReducedMotionPref } from "../lib/hooks";
import { COORDS } from "../lib/site";
import { LazyVideo } from "./ui/LazyVideo";
import { Logo } from "./ui/Logo";
import { RevealText } from "./ui/RevealText";

/** "The place" — one full-bleed film frame with slow parallax. */
const COPY = {
  en: {
    aria: "The place",
    scene: "Scene 04 / The place",
    l1: "Come for the coffee.",
    l2: "Stay for the moment.",
  },
  tr: {
    aria: "Mekân",
    scene: "Sahne 04 / Mekân",
    l1: "Kahve için gel.",
    l2: "An için kal.",
  },
};

export function AtmosphereSection() {
  const t = useCopy(COPY);
  const ref = useRef<HTMLElement>(null);
  const mobile = useIsMobile();
  const reduced = useReducedMotionPref();
  const still = mobile || reduced;

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const mediaY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);
  const textY = useTransform(scrollYProgress, [0, 1], [20, -20]);

  return (
    <section
      ref={ref}
      data-theme="dark"
      className="relative h-[100svh] min-h-[560px] overflow-hidden bg-ink text-cream"
      aria-label={t.aria}
    >
      <motion.div className="absolute -inset-y-[6%] inset-x-0" style={still ? undefined : { y: mediaY }}>
        <LazyVideo src="/media/place.mp4" poster="/media/place.jpg" className="h-full w-full object-cover" />
      </motion.div>

      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-coffee/30 mix-blend-multiply" />
        <div className="absolute inset-x-0 top-0 h-1/3 bg-linear-to-b from-cream/0 via-ink/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-ink/90 via-ink/40 to-transparent" />
        {/* letterbox bars — film frame */}
        <div className="absolute inset-x-0 top-0 h-[4.5vh] bg-ink" />
        <div className="absolute inset-x-0 bottom-0 h-[4.5vh] bg-ink" />
      </div>
      <div aria-hidden="true" className="grain pointer-events-none absolute inset-0" />

      <div aria-hidden="true" className="micro pointer-events-none absolute top-[calc(4.5vh+20px)] right-6 left-6 flex justify-between text-cream/55 md:right-10 md:left-10">
        <span>{t.scene}</span>
        <span className="max-md:hidden">
          {COORDS.lat} — {COORDS.lng}
        </span>
      </div>

      <motion.div
        className="absolute inset-x-0 bottom-[calc(4.5vh+40px)] px-6 md:px-10 lg:px-[6%]"
        style={still ? undefined : { y: textY }}
      >
        <Logo className="mb-6 w-[96px] md:w-[120px]" />
        <RevealText
          className="display text-[clamp(3rem,8vw,8.4rem)]"
          lines={[t.l1, <em key="s" className="text-foam italic">{t.l2}</em>]}
        />
      </motion.div>
    </section>
  );
}
