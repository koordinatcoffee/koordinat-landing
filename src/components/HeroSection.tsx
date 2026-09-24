import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion";
import { ArrowDown } from "lucide-react";
import type { PointerEvent } from "react";
import { useFinePointer, useIsMobile, useReducedMotionPref } from "../lib/hooks";
import { useCopy } from "../lib/i18n";
import { EASE_CINE } from "../lib/motion";
import { COORDS } from "../lib/site";
import { CoffeeDust } from "./CoffeeDust";
import { LazyVideo } from "./ui/LazyVideo";
import { Pill, TextLink } from "./ui/Pill";
import { RevealText } from "./ui/RevealText";
import { Steam } from "./ui/Steam";

const COPY = {
  en: {
    // read with the headline by search engines and screen readers
    brand: "Koordinat Coffee, Samandağ — ",
    l1: "Coffee, at your",
    l2: "coordinates.",
    line: "A place for coffee, conversations and slow moments.",
    body: "Koordinat Coffee Factory brings coffee, food and community together in the heart of Samandağ.",
    cta: "EXPLORE KOORDİNAT",
    find: "Find us",
    scroll: "Scroll to explore",
    scrollLabel: "Scroll down",
  },
  tr: {
    brand: "Koordinat Coffee, Samandağ — ",
    l1: "Kahve, tam",
    l2: "koordinatında.",
    line: "Kahve, sohbet ve yavaş anlar için bir yer.",
    body: "Koordinat Coffee Factory, Samandağ'ın kalbinde kahveyi, yemeği ve insanları bir araya getirir.",
    cta: "KOORDİNAT'I KEŞFET",
    find: "Bizi bulun",
    scroll: "Keşfetmek için kaydır",
    scrollLabel: "Aşağı kaydır",
  },
};

function useLayer(mx: MotionValue<number>, my: MotionValue<number>, range: number) {
  return {
    x: useTransform(mx, [-1, 1], [-range, range]),
    y: useTransform(my, [-1, 1], [-range, range]),
  };
}

const fadeUp = (delay: number, duration = 0.7) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration, ease: EASE_CINE, delay },
});

export function HeroSection() {
  const fine = useFinePointer();
  const reduced = useReducedMotionPref();
  const mobile = useIsMobile();
  const parallax = fine && !reduced;
  const t = useCopy(COPY);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mx = useSpring(rawX, { stiffness: 60, damping: 20, mass: 0.6 });
  const my = useSpring(rawY, { stiffness: 60, damping: 20, mass: 0.6 });

  const video = useLayer(mx, my, 8);
  const grid = useLayer(mx, my, 12);
  const deco = useLayer(mx, my, 18);
  const type = useLayer(mx, my, 4);

  const onMove = (e: PointerEvent<HTMLElement>) => {
    if (!parallax) return;
    const r = e.currentTarget.getBoundingClientRect();
    rawX.set(((e.clientX - r.left) / r.width) * 2 - 1);
    rawY.set(((e.clientY - r.top) / r.height) * 2 - 1);
  };

  const labelIn = (delay: number) => ({
    initial: { opacity: 0 },
    animate: { opacity: 0.5 },
    transition: { duration: 1, ease: EASE_CINE, delay },
  });

  return (
    <section
      id="top"
      onPointerMove={onMove}
      data-theme="dark"
      className="relative h-dvh min-h-[620px] w-full overflow-hidden bg-ink"
      aria-label="Koordinat Coffee Factory"
    >
      {/* 1 — video */}
      <motion.div
        className="absolute -inset-4"
        style={parallax ? video : undefined}
        initial={{ opacity: 0, scale: 1.08 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: EASE_CINE }}
      >
        <LazyVideo
          key={mobile ? "m" : "d"}
          eager
          src={mobile ? "/media/hero-mobile.mp4" : "/media/hero.mp4"}
          poster={mobile ? "/media/hero-mobile.jpg" : "/media/hero.jpg"}
          className="h-full w-full object-cover object-center"
        />
      </motion.div>

      {/* 2 — cinematic overlays */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-[38%] bg-linear-to-b from-ink/85 via-ink/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-[62%] bg-linear-to-t from-ink via-ink/60 to-transparent" />
        <div className="absolute inset-0 bg-coffee/25 mix-blend-multiply" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(21,17,14,0.55)_100%)]" />
      </div>
      <div aria-hidden="true" className="grain pointer-events-none absolute inset-0" />

      {/* 3 — coordinate grid, draws from center */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60 max-md:opacity-30"
        style={parallax ? grid : undefined}
      >
        <motion.span
          className="absolute top-[34%] right-0 left-0 h-px bg-cream/15"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.6, ease: EASE_CINE, delay: 0.4 }}
        />
        <motion.span
          className="absolute top-0 bottom-0 left-[64%] w-px bg-cream/15 max-md:left-[82%]"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.6, ease: EASE_CINE, delay: 0.5 }}
        />
        <motion.span
          className="absolute top-0 bottom-0 left-[8%] hidden w-px bg-cream/[0.07] md:block"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.8, ease: EASE_CINE, delay: 0.6 }}
        />
        <motion.span
          className="absolute right-0 bottom-[14%] left-0 hidden h-px bg-cream/[0.07] md:block"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.8, ease: EASE_CINE, delay: 0.65 }}
        />
        {/* crosshair at the intersection */}
        <motion.span
          className="absolute top-[34%] left-[64%] size-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber/50 max-md:left-[82%]"
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: EASE_CINE, delay: 1.3 }}
        />
        <motion.span
          className="absolute top-[34%] left-[64%] size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber max-md:left-[82%]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.5 }}
        />
        <motion.span
          className="micro absolute top-[34%] left-[64%] mt-4 ml-7 hidden text-cream/60 md:block"
          {...labelIn(1.7)}
        >
          x {COORDS.decimal.lng} / y {COORDS.decimal.lat}
        </motion.span>
      </motion.div>

      {/* 4 — decorative coffee elements */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={parallax ? deco : undefined}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 1 }}
      >
        <CoffeeDust count={22} />
        <Steam className="bottom-[30%] left-[58%] hidden h-40 w-24 opacity-70 md:flex" />
      </motion.div>

      {/* 5 — corner coordinate labels */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 text-cream">
        <motion.span className="micro absolute top-[104px] left-6 md:left-10" {...labelIn(1.9)}>
          KCF / 001
        </motion.span>
        <motion.span className="micro absolute top-[104px] right-6 md:right-10" {...labelIn(1.95)}>
          Samandağ
        </motion.span>
        <motion.span
          className="micro absolute bottom-[max(28px,env(safe-area-inset-bottom))] left-10 hidden md:block"
          {...labelIn(2.0)}
        >
          {COORDS.lat} / {COORDS.lng}
        </motion.span>
        <motion.span
          className="micro absolute right-10 bottom-[max(28px,env(safe-area-inset-bottom))] hidden md:block"
          {...labelIn(2.05)}
        >
          Coffee Factory
        </motion.span>
      </div>

      {/* 6 — content */}
      <motion.div
        className="relative z-10 flex h-full flex-col justify-end px-6 pb-[calc(112px+env(safe-area-inset-bottom))] md:px-10 md:pb-[18vh] lg:px-[8%]"
        style={parallax ? type : undefined}
      >
        <div className="max-w-[1100px]">
          <motion.p className="micro mb-6 flex items-center gap-3 text-foam/80" {...fadeUp(0.9)}>
            <span className="h-px w-8 bg-amber" aria-hidden="true" />
            Samandağ / Hatay
          </motion.p>

          <RevealText
            as="h1"
            immediate
            delay={1.05}
            duration={1.0}
            stagger={0.12}
            className="display text-[clamp(3.4rem,15vw,5.6rem)] text-cream md:text-[clamp(3.4rem,10.5vw,10.5rem)]"
            lines={[
              <>
                <span className="sr-only">{t.brand}</span>
                {t.l1}
              </>,
              <em key="c" className="text-amber italic">
                {t.l2}
              </em>,
            ]}
          />

          <div className="mt-8 grid gap-8 md:mt-10 md:grid-cols-[minmax(0,420px)_auto] md:items-end md:gap-16">
            <motion.div {...fadeUp(1.5)}>
              <p className="font-serif text-2xl leading-tight text-foam italic md:text-[1.7rem]">
                {t.line}
              </p>
              <p className="mt-3 max-w-[380px] text-[13px] leading-relaxed text-muted md:text-[14px]">
                {t.body}
              </p>
            </motion.div>

            <motion.div
              className="flex flex-wrap items-center gap-x-8 gap-y-3"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: EASE_CINE, delay: 1.7 }}
            >
              <Pill href="#experience" ring>
                {t.cta}
              </Pill>
              <TextLink href="#location" className="text-cream">
                {t.find}
              </TextLink>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* 7 — scroll indicator */}
      <motion.a
        href="#experience"
        className="absolute bottom-[max(20px,env(safe-area-inset-bottom))] left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-cream/70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.4 }}
        aria-label={t.scrollLabel}
        data-cursor="view"
      >
        <span className="micro text-[9px] max-md:hidden">{t.scroll}</span>
        <span className="scroll-cue flex size-9 items-center justify-center rounded-full border border-cream/25">
          <ArrowDown className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
        </span>
      </motion.a>
    </section>
  );
}
