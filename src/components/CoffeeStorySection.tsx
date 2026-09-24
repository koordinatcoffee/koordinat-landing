import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { useCopy } from "../lib/i18n";
import { EASE_CINE, reveal } from "../lib/motion";
import type { Lang } from "../routes";
import { LazyVideo } from "./ui/LazyVideo";
import { RevealText } from "./ui/RevealText";

const STEPS = [
  { key: "bean", tint: "rgba(90,56,37,0.55)" },
  { key: "grind", tint: "rgba(111,128,100,0.28)" },
  { key: "extraction", tint: "rgba(185,138,90,0.32)" },
  { key: "pour", tint: "rgba(232,216,195,0.16)" },
  { key: "sip", tint: "rgba(42,27,20,0.9)" },
] as const;

type StepCopy = { label: string; title: string; text: string };
const COPY: Record<Lang, { eyebrow: string; l1: string; l2: string; process: string; steps: StepCopy[] }> = {
  en: {
    eyebrow: "Coffee story / Process",
    l1: "From bean",
    l2: "to moment.",
    process: "KCF / Process",
    steps: [
      { label: "Bean", title: "The beginning matters.", text: "Every cup begins with the character of the bean." },
      { label: "Grind", title: "Precision creates balance.", text: "The grind sets the rhythm for everything that follows." },
      { label: "Extraction", title: "Pressure. Time. Balance.", text: "A few seconds can change everything." },
      { label: "Pour", title: "Watch the texture change.", text: "Crema, milk, steam and movement come together." },
      { label: "Sip", title: "Then everything slows down.", text: "The final step is simply enjoying it." },
    ],
  },
  tr: {
    eyebrow: "Kahvenin hikayesi / Süreç",
    l1: "Çekirdekten",
    l2: "o ana.",
    process: "KCF / Süreç",
    steps: [
      { label: "Çekirdek", title: "Her şey başlangıçta.", text: "Her fincan, çekirdeğin karakteriyle başlar." },
      { label: "Öğütme", title: "Hassasiyet dengeyi getirir.", text: "Öğütme, sonrasındaki her şeyin ritmini belirler." },
      { label: "Demleme", title: "Basınç. Zaman. Denge.", text: "Birkaç saniye her şeyi değiştirebilir." },
      { label: "Döküm", title: "Dokunun değişimini izle.", text: "Krema, süt, buhar ve hareket buluşur." },
      { label: "Yudum", title: "Sonra her şey yavaşlar.", text: "Son adım, sadece tadını çıkarmak." },
    ],
  },
};

const pad = (i: number) => String(i + 1).padStart(2, "0");

function StepText({ i }: { i: number }) {
  const s = useCopy(COPY).steps[i];
  return (
    <>
      <p className="micro text-amber">
        {pad(i)} / {s.label}
      </p>
      <h3 className="display mt-4 text-[clamp(2.2rem,4vw,3.8rem)] text-cream">{s.title}</h3>
      <p className="mt-4 max-w-[340px] text-[15px] leading-relaxed text-muted">{s.text}</p>
    </>
  );
}

/** Desktop/tablet: pinned stage, steps advance with scroll. */
function PinnedStory() {
  const t = useCopy(COPY);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // points sit at 0, ¼, ½, ¾, 1 of the line; each step owns a fifth of the scroll
  const toLine = useTransform(scrollYProgress, [0.1, 0.3, 0.5, 0.7, 0.9], [0, 0.25, 0.5, 0.75, 1]);
  const progress = useSpring(toLine, { stiffness: 120, damping: 30 });
  const [active, setActive] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = Math.min(STEPS.length - 1, Math.max(0, Math.floor(v * STEPS.length)));
    setActive((prev) => (prev === next ? prev : next));
  });

  const goTo = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const travel = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + travel * ((i + 0.5) / STEPS.length), behavior: "smooth" });
  };

  return (
    <div ref={ref} className="relative hidden md:block" style={{ height: `${STEPS.length * 100}vh` }}>
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        {/* background texture per step */}
        {STEPS.map((s, i) => (
          <motion.div
            key={s.key}
            aria-hidden="true"
            className="absolute inset-0"
            style={{ background: `radial-gradient(ellipse 70% 60% at 70% 45%, ${s.tint}, transparent 70%)` }}
            animate={{ opacity: i === active ? 1 : 0 }}
            transition={{ duration: 1.2, ease: EASE_CINE }}
          />
        ))}
        <div aria-hidden="true" className="grain pointer-events-none absolute inset-0" />

        {/* giant step number as texture */}
        <AnimatePresence mode="popLayout">
          <motion.span
            key={active}
            aria-hidden="true"
            className="display pointer-events-none absolute right-[3%] bottom-[8%] text-[28vw] leading-none text-cream/[0.035] select-none"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -60 }}
            transition={{ duration: 1, ease: EASE_CINE }}
          >
            {pad(active)}
          </motion.span>
        </AnimatePresence>

        <div className="relative mx-auto grid w-full max-w-[1440px] flex-1 grid-cols-12 items-center gap-8 px-10 pt-28 lg:px-[6%]">
          <div className="col-span-5 flex h-full flex-col justify-between pb-10">
            <div>
              <p className="micro mb-6 text-muted">{t.eyebrow}</p>
              <RevealText
                className="display text-[clamp(3.2rem,6vw,6.4rem)] text-cream"
                lines={[t.l1, <em key="m" className="text-amber italic">{t.l2}</em>]}
              />
            </div>
            <div className="relative min-h-[190px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.6, ease: EASE_CINE }}
                  aria-live="polite"
                >
                  <StepText i={active} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="col-span-7 col-start-6 flex h-full items-center pb-10">
            <div className="relative aspect-[16/11] w-full overflow-hidden bg-espresso" data-cursor="discover">
              {STEPS.map((s, i) => (
                <motion.div
                  key={s.key}
                  className="absolute inset-0"
                  initial={false}
                  animate={{ opacity: i === active ? 1 : 0, scale: i === active ? 1 : 1.06 }}
                  transition={{ duration: 1.1, ease: EASE_CINE }}
                >
                  <LazyVideo
                    src={`/media/${s.key}.mp4`}
                    poster={`/media/${s.key}.jpg`}
                    active={i === active}
                    className="h-full w-full object-cover"
                  />
                </motion.div>
              ))}
              <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-ink/50 to-transparent" />
              <span className="micro absolute top-4 left-4 text-cream/70">{t.process}</span>
              <span className="micro absolute top-4 right-4 text-cream/70">
                {pad(active)} — 05
              </span>
            </div>
          </div>
        </div>

        {/* horizontal timeline */}
        <div className="relative mx-auto w-full max-w-[1440px] px-10 pb-10 lg:px-[6%]">
          <div className="relative">
            <div className="absolute top-[7px] right-0 left-0 h-px bg-cream/15" />
            <motion.div
              className="absolute top-[7px] right-0 left-0 h-px origin-left bg-amber"
              style={{ scaleX: progress }}
            />
            <ol className="relative grid grid-cols-5">
              {STEPS.map((s, i) => {
                const on = i <= active;
                const current = i === active;
                return (
                  <li key={s.key} className={i === 0 ? "" : i === STEPS.length - 1 ? "text-right" : "text-center"}>
                    <button
                      type="button"
                      onClick={() => goTo(i)}
                      aria-current={current ? "step" : undefined}
                      className={`group inline-flex min-h-[44px] flex-col gap-3 ${i === 0 ? "items-start" : i === STEPS.length - 1 ? "items-end" : "items-center"}`}
                    >
                      <span
                        className={`relative block size-[15px] rounded-full border transition-colors duration-500 ${on ? "border-amber bg-ink" : "border-cream/30 bg-ink"}`}
                      >
                        <span
                          className={`absolute inset-[3px] rounded-full bg-amber transition-[opacity,transform] duration-500 ${current ? "scale-100 opacity-100 shadow-[0_0_18px_4px_rgba(185,138,90,0.55)]" : on ? "scale-75 opacity-60" : "scale-0 opacity-0"}`}
                        />
                      </span>
                      <span
                        className={`micro transition-colors duration-500 ${current ? "text-cream" : "text-muted/70 group-hover:text-cream/80"}`}
                      >
                        {pad(i)} {t.steps[i].label}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Mobile: the horizontal sequence becomes a vertical one. */
function StackedStory() {
  const t = useCopy(COPY);
  return (
    <div className="px-6 pt-28 pb-24 md:hidden">
      <p className="micro mb-6 text-muted">{t.eyebrow}</p>
      <RevealText
        className="display text-[clamp(3rem,14vw,4.5rem)] text-cream"
        lines={[t.l1, <em key="m" className="text-amber italic">{t.l2}</em>]}
      />
      <ol className="relative mt-16 space-y-16 border-l border-cream/15 pl-6">
        {STEPS.map((s, i) => (
          <motion.li key={s.key} className="relative" {...reveal}>
            <span className="absolute top-1 -left-[31px] size-[13px] rounded-full border border-amber bg-ink">
              <span className="absolute inset-[3px] rounded-full bg-amber" />
            </span>
            <div className="relative mb-6 aspect-[4/5] overflow-hidden bg-espresso">
              <LazyVideo src={`/media/${s.key}.mp4`} poster={`/media/${s.key}.jpg`} className="h-full w-full object-cover" />
            </div>
            <StepText i={i} />
          </motion.li>
        ))}
      </ol>
    </div>
  );
}

export function CoffeeStorySection() {
  const t = useCopy(COPY);
  return (
    <section id="story" data-theme="dark" className="relative bg-ink text-cream" aria-label={`${t.l1} ${t.l2}`}>
      <PinnedStory />
      <StackedStory />
    </section>
  );
}
