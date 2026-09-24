import { AnimatePresence, motion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { useFinePointer } from "../lib/hooks";
import { useCopy } from "../lib/i18n";
import { EASE_CINE, reveal } from "../lib/motion";
import { appStoreUrl, stampsPerCard, stores } from "../lib/site";
import { Logo } from "./ui/Logo";
import { Pill, TextLink } from "./ui/Pill";
import { RevealText } from "./ui/RevealText";

const PARROT = "/assets/img/parrot-damn.png";
// the parrot's own palette, used for the burst
const BURST_COLORS = ["#e8453c", "#f5a623", "#0f6e5e", "#f4ebdd"];
const BURST = Array.from({ length: 10 }, (_, i) => (i / 10) * Math.PI * 2);

const COPY = {
  en: {
    aria: "Papağan loyalty",
    eyebrow: "Papağan / Loyalty",
    l1: "Coffee rewards,",
    l2: "the Koordinat way.",
    body: (n: number) =>
      `Scan the QR code at the counter in the Koordinat Coffee app and the parrot lands on your card. ${n} stamps, and the next coffee is on us.`,
    join: "Join Papağan",
    card: "Loyalty card",
    hover: "Hover a stamp",
    tap: "Tap a stamp",
    done1: "One more coffee.",
    done2: "On us.",
    left: (n: number) => `${n} stamp${n === 1 ? "" : "s"} to a free coffee`,
    reset: "Reset card",
    stamp: (i: number, filled: boolean) => `Stamp ${i}${filled ? " — collected" : ""}`,
  },
  tr: {
    aria: "Papağan sadakat kartı",
    eyebrow: "Papağan / Sadakat",
    l1: "Kahve ödülleri,",
    l2: "Koordinat usulü.",
    body: (n: number) =>
      `Koordinat Coffee uygulamasından tezgahtaki QR kodu okut, papağan kartına konsun. ${n} damgada bir sonraki kahve bizden.`,
    join: "Papağan'a katıl",
    card: "Sadakat kartı",
    hover: "Bir damganın üzerine gel",
    tap: "Bir damgaya dokun",
    done1: "Bir kahve daha.",
    done2: "Bizden.",
    left: (n: number) => `Bedava kahveye ${n} damga kaldı`,
    reset: "Kartı sıfırla",
    stamp: (i: number, filled: boolean) => `Damga ${i}${filled ? " — toplandı" : ""}`,
  },
};

function Stamp({ index, filled, onFill }: { index: number; filled: boolean; onFill: () => void }) {
  const fine = useFinePointer();
  const t = useCopy(COPY);
  return (
    <button
      type="button"
      aria-pressed={filled}
      aria-label={t.stamp(index + 1, filled)}
      onClick={onFill}
      onPointerEnter={fine ? onFill : undefined}
      data-cursor="view"
      className="relative flex aspect-square w-full max-w-[92px] items-center justify-center rounded-full"
    >
      {/* empty slot: dashed ring + a ghost of the parrot */}
      <span className="absolute inset-0 rounded-full border border-dashed border-cream/25" />
      <img
        src={PARROT}
        alt=""
        width="144"
        height="124"
        className="w-[52%] opacity-[0.1] grayscale"
        draggable={false}
      />
      <span className="micro absolute -bottom-6 text-[9px] text-cream/35">0{index + 1}</span>

      <AnimatePresence>
        {filled && (
          <>
            {/* the stamp is "pressed" onto the card */}
            <motion.span
              key="disc"
              className="absolute inset-[5%] flex items-center justify-center rounded-full bg-cream shadow-[inset_0_0_0_3px_#f4ebdd,inset_0_0_0_4px_rgba(42,27,20,0.25),0_10px_30px_-10px_rgba(0,0,0,0.7)]"
              initial={{ scale: 1.6, opacity: 0, rotate: -18 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.6, opacity: 0 }}
              transition={{ type: "spring", stiffness: 520, damping: 22 }}
            >
              <img src={PARROT} alt="" width="144" height="124" className="w-[62%]" draggable={false} />
            </motion.span>
            {/* coffee ring */}
            <motion.span
              key="ring"
              className="absolute inset-0 rounded-full border-2 border-amber/60"
              initial={{ scale: 0.6, opacity: 0.35 }}
              animate={{ scale: 1.6, opacity: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            />
            {BURST.map((a, i) => (
              <motion.span
                key={`p${i}`}
                className="absolute top-1/2 left-1/2 size-1.5 rounded-full"
                style={{ background: BURST_COLORS[i % BURST_COLORS.length] }}
                initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                animate={{ x: Math.cos(a) * 54, y: Math.sin(a) * 54, opacity: 0, scale: 0.3 }}
                transition={{ duration: 0.8, ease: EASE_CINE }}
              />
            ))}
          </>
        )}
      </AnimatePresence>
    </button>
  );
}

export function LoyaltySection() {
  const TOTAL = stampsPerCard;
  const t = useCopy(COPY);
  const [filled, setFilled] = useState<boolean[]>(() => Array(TOTAL).fill(false));
  const [joinUrl, setJoinUrl] = useState<string>(stores.appStore);
  useEffect(() => setJoinUrl(appStoreUrl()), []);

  const count = filled.filter(Boolean).length;
  const complete = count === TOTAL;
  const left = TOTAL - count;

  const fill = (i: number) =>
    setFilled((f) => {
      if (f[i]) return f;
      const next = [...f];
      next[i] = true;
      return next;
    });

  return (
    <section data-theme="dark" className="relative overflow-hidden bg-espresso text-cream" aria-label={t.aria}>
      {/* faint grid texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#f4ebdd_1px,transparent_1px),linear-gradient(to_bottom,#f4ebdd_1px,transparent_1px)] bg-size-[88px_88px] opacity-[0.05]"
      />

      <div className="relative mx-auto grid max-w-[1440px] items-center gap-16 px-6 pt-28 pb-36 md:px-10 md:pt-36 md:pb-44 lg:grid-cols-12 lg:gap-10 lg:px-[6%]">
        <div className="lg:col-span-5">
          <motion.p className="micro mb-6 text-amber" {...reveal}>
            {t.eyebrow}
          </motion.p>
          <RevealText
            className="display text-[clamp(3rem,6vw,6.2rem)]"
            lines={[t.l1, <em key="k" className="text-amber italic">{t.l2}</em>]}
          />
          <motion.p
            className="mt-8 max-w-[400px] text-[15px] leading-relaxed text-muted"
            {...reveal}
            transition={{ ...reveal.transition, delay: 0.15 }}
          >
            {t.body(TOTAL)}
          </motion.p>
          <motion.div
            className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3"
            {...reveal}
            transition={{ ...reveal.transition, delay: 0.25 }}
          >
            <Pill href={joinUrl} external ring>
              {t.join}
            </Pill>
            <TextLink href={stores.googlePlay} external className="text-foam/80">
              Google Play
            </TextLink>
          </motion.div>
        </div>

        <motion.div
          className="lg:col-span-6 lg:col-start-7"
          initial={{ opacity: 0, y: 60, rotate: -2 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.1, ease: EASE_CINE }}
        >
          <div className="relative overflow-hidden rounded-[26px] border border-cream/10 bg-[linear-gradient(135deg,#211a15_0%,#15110e_60%,#2a1b14_100%)] p-6 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.8)] md:p-10">
            <div aria-hidden="true" className="grain pointer-events-none absolute inset-0" />
            {/* big ghost parrot watermark */}
            <img
              src={PARROT}
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute -right-10 -bottom-12 w-[46%] opacity-[0.05]"
            />

            <div className="relative flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <Logo className="w-[64px] md:w-[76px]" />
                <span aria-hidden="true" className="h-10 w-px bg-cream/15" />
                <div>
                  <p className="text-[12px] font-semibold tracking-[0.3em]">PAPAĞAN</p>
                  <p className="micro mt-1 text-[9px] text-muted">{t.card}</p>
                </div>
              </div>
              <p className="micro text-right text-[9px] whitespace-nowrap text-muted">
                KCF / 005
                <br />
                <span className="text-cream/70">
                  {count} / {TOTAL}
                </span>
              </p>
            </div>

            {/* progress bars, like the app header */}
            <div className="relative mt-8 grid gap-1.5" style={{ gridTemplateColumns: `repeat(${TOTAL}, 1fr)` }}>
              {filled.map((f, i) => (
                <span key={i} className="h-[3px] overflow-hidden rounded-full bg-cream/10">
                  <motion.span
                    className="block h-full origin-left bg-amber"
                    initial={false}
                    animate={{ scaleX: f ? 1 : 0 }}
                    transition={{ duration: 0.6, ease: EASE_CINE }}
                  />
                </span>
              ))}
            </div>

            <p className="micro relative mt-8 mb-5 text-[9px] text-muted md:mt-10">
              <span className="max-md:hidden">{t.hover}</span>
              <span className="md:hidden">{t.tap}</span>
            </p>
            <div
              className="relative grid place-items-center gap-2 pb-6 sm:gap-4"
              style={{ gridTemplateColumns: `repeat(${TOTAL}, minmax(0, 1fr))` }}
            >
              {filled.map((f, i) => (
                <Stamp key={i} index={i} filled={f} onFill={() => fill(i)} />
              ))}
            </div>

            <div className="relative mt-8 flex min-h-[56px] items-end justify-between border-t border-cream/10 pt-5 md:mt-10">
              <AnimatePresence mode="wait">
                {complete ? (
                  <motion.p
                    key="done"
                    className="display text-[clamp(1.6rem,3.4vw,2.6rem)] text-amber"
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7, ease: EASE_CINE }}
                    role="status"
                  >
                    {t.done1} <em className="text-cream italic">{t.done2}</em>
                  </motion.p>
                ) : (
                  <motion.p
                    key="todo"
                    className="micro text-muted"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {t.left(left)}
                  </motion.p>
                )}
              </AnimatePresence>
              {count > 0 && (
                <button
                  type="button"
                  onClick={() => setFilled(Array(TOTAL).fill(false))}
                  className="flex min-h-[44px] min-w-[44px] items-center justify-end text-muted transition-colors hover:text-cream"
                  aria-label={t.reset}
                >
                  <RotateCcw className="size-4" strokeWidth={1.5} />
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
