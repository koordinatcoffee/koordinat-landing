import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE_CINE } from "../../lib/motion";
import { COORDS } from "../../lib/site";
import { CoffeeDust } from "../CoffeeDust";
import { LazyVideo } from "../ui/LazyVideo";
import { RevealText } from "../ui/RevealText";

type Props = {
  eyebrow: string;
  code: string;
  lines: ReactNode[];
  intro?: ReactNode;
  meta?: [string, ReactNode][];
  media?: { src: string; poster: string };
  /** Tall cinematic hero (about/contact) vs compact document hero (legal). */
  tall?: boolean;
};

/** Dark page opener shared by corporate and legal pages. */
export function PageHero({ eyebrow, code, lines, intro, meta = [], media, tall = false }: Props) {
  return (
    <section
      data-theme="dark"
      className={`relative flex flex-col justify-end overflow-hidden bg-ink text-cream ${
        tall ? "min-h-[92svh]" : "min-h-[78svh]"
      }`}
    >
      {media && (
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.4, ease: EASE_CINE }}
        >
          {/* real <img> under the video: paints without JS and serves as the LCP */}
          <img src={media.poster} alt="" fetchPriority="high" className="absolute inset-0 h-full w-full object-cover" />
          <LazyVideo eager src={media.src} className="relative h-full w-full object-cover" />
          <div className="absolute inset-0 bg-coffee/30 mix-blend-multiply" />
          <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/60 to-ink/40" />
        </motion.div>
      )}
      <div aria-hidden="true" className="grain pointer-events-none absolute inset-0" />
      <CoffeeDust count={14} />

      {/* coordinate grid drawing from the centre */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <motion.span
          className="absolute top-[38%] right-0 left-0 h-px bg-cream/10"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.6, ease: EASE_CINE, delay: 0.2 }}
        />
        <motion.span
          className="absolute top-0 bottom-0 left-[72%] w-px bg-cream/10 max-md:left-[86%]"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.6, ease: EASE_CINE, delay: 0.3 }}
        />
        <motion.span
          className="absolute top-[38%] left-[72%] size-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber/50 max-md:left-[86%]"
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: EASE_CINE, delay: 1 }}
        />
      </div>

      <div className="micro pointer-events-none absolute top-[104px] right-6 left-6 flex justify-between text-cream/50 md:right-10 md:left-10">
        <span>{code}</span>
        <span className="max-md:hidden">
          {COORDS.lat} / {COORDS.lng}
        </span>
      </div>

      <div className="relative mx-auto w-full max-w-[1440px] px-6 pt-40 pb-24 md:px-10 md:pb-32 lg:px-[6%]">
        <motion.p
          className="micro mb-6 flex items-center gap-3 text-foam/80"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_CINE, delay: 0.3 }}
        >
          <span className="h-px w-8 bg-amber" aria-hidden="true" />
          {eyebrow}
        </motion.p>
        <RevealText
          as="h1"
          immediate
          delay={0.4}
          className={`display text-cream ${
            tall ? "text-[clamp(3.4rem,10vw,9.6rem)]" : "text-[clamp(3rem,7.4vw,7.4rem)]"
          }`}
          lines={lines}
        />
        {(intro || meta.length > 0) && (
          <motion.div
            className="mt-10 grid gap-8 md:grid-cols-[minmax(0,520px)_1fr] md:items-end"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE_CINE, delay: 0.8 }}
          >
            {intro ? <div className="text-[15.5px] leading-relaxed text-foam/75">{intro}</div> : <span />}
            {meta.length > 0 && (
              <dl className="flex flex-wrap gap-x-10 gap-y-4 md:justify-end">
                {meta.map(([k, v]) => (
                  <div key={k}>
                    <dt className="micro text-muted">{k}</dt>
                    <dd className="mt-1.5 text-[14px] text-cream">{v}</dd>
                  </div>
                ))}
              </dl>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
}
