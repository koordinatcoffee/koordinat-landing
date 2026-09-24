import { motion } from "framer-motion";
import { useCopy } from "../lib/i18n";
import { EASE_CINE } from "../lib/motion";
import { INSTAGRAM, mapsUrl } from "../lib/site";
import { CoffeeDust } from "./CoffeeDust";
import { LazyVideo } from "./ui/LazyVideo";
import { Logo } from "./ui/Logo";
import { Pill } from "./ui/Pill";
import { RevealText } from "./ui/RevealText";
import { Steam } from "./ui/Steam";

const COPY = {
  en: {
    l1: "Your next coffee",
    l2: "has a coordinate.",
    visit: "VISIT KOORDİNAT",
    follow: "Follow us",
  },
  tr: {
    l1: "Bir sonraki kahvenin",
    l2: "bir koordinatı var.",
    visit: "KOORDİNAT'A GEL",
    follow: "Bizi takip et",
  },
};

export function FinalCTA() {
  const t = useCopy(COPY);
  return (
    <section data-theme="dark" className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-ink text-cream" aria-label={t.visit}>
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.12, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 1.8, ease: EASE_CINE }}
      >
        <LazyVideo src="/media/final.mp4" poster="/media/final.jpg" className="h-full w-full object-cover object-[62%_center]" />
      </motion.div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-ink/55" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(21,17,14,0.2)_0%,rgba(21,17,14,0.92)_75%)]" />
        <div className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-ink to-transparent" />
      </div>
      <div aria-hidden="true" className="grain pointer-events-none absolute inset-0" />
      <CoffeeDust count={16} />
      <Steam className="top-[14%] left-1/2 h-40 w-24 -translate-x-1/2 opacity-60" />

      <div className="relative z-10 px-6 py-32 text-center">
        <RevealText
          className="display text-[clamp(3.2rem,9vw,9.6rem)]"
          lines={[t.l1, <em key="h" className="text-amber italic">{t.l2}</em>]}
        />
        <motion.div
          className="mt-10 flex justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <Logo className="w-[140px] md:w-[170px]" />
        </motion.div>
        <motion.div
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE_CINE, delay: 0.5 }}
        >
          <Pill href={mapsUrl} external ring>
            {t.visit}
          </Pill>
          <Pill href={INSTAGRAM} external variant="ghost">
            {t.follow}
          </Pill>
        </motion.div>
      </div>
    </section>
  );
}
