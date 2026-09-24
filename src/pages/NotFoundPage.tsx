import { motion } from "framer-motion";
import { useCopy, useHref } from "../lib/i18n";
import { SiteShell } from "../components/layout/SiteShell";
import { Pill, TextLink } from "../components/ui/Pill";
import { RevealText } from "../components/ui/RevealText";
import { EASE_CINE } from "../lib/motion";
import { COORDS } from "../lib/site";

const COPY = {
  en: {
    err: "Error 404",
    l1: "Lost your",
    l2: "coordinates?",
    body: "This page has moved or never existed. The coffee, however, is exactly where it always is.",
    back: "Back to Koordinat",
    menu: "See the menu",
  },
  tr: {
    err: "Hata 404",
    l1: "Koordinatını",
    l2: "mı kaybettin?",
    body: "Bu sayfa taşınmış ya da hiç var olmamış. Kahve ise her zamanki yerinde.",
    back: "Koordinat'a dön",
    menu: "Menüye bak",
  },
};

export default function NotFoundPage() {
  const t = useCopy(COPY);
  const href = useHref();
  return (
    <SiteShell>
      <section data-theme="dark" className="relative flex min-h-[100svh] items-center overflow-hidden bg-ink text-cream">
        <div aria-hidden="true" className="grain pointer-events-none absolute inset-0" />
        {/* a coordinate cross that never quite lands */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          animate={{ x: [0, 14, -10, 0], y: [0, -8, 12, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="absolute top-1/2 right-0 left-0 h-px bg-cream/10" />
          <span className="absolute top-0 bottom-0 left-[66%] w-px bg-cream/10" />
          <span className="absolute top-1/2 left-[66%] size-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-amber/60" />
        </motion.div>

        <div className="relative mx-auto w-full max-w-[1440px] px-6 md:px-10 lg:px-[6%]">
          <p className="micro mb-6 text-amber">{t.err} / {COORDS.lat} ?</p>
          <RevealText
            as="h1"
            immediate
            delay={0.2}
            className="display text-[clamp(3.4rem,10vw,9.6rem)]"
            lines={[t.l1, <em key="c" className="text-amber italic">{t.l2}</em>]}
          />
          <motion.p
            className="mt-8 max-w-[440px] text-[15px] leading-relaxed text-foam/70"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE_CINE, delay: 0.7 }}
          >
            {t.body}
          </motion.p>
          <motion.div
            className="mt-10 flex flex-wrap items-center gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <Pill href={href("home")} ring>
              {t.back}
            </Pill>
            <TextLink href={href("menu")} className="text-cream">
              {t.menu}
            </TextLink>
          </motion.div>
        </div>
      </section>
    </SiteShell>
  );
}
