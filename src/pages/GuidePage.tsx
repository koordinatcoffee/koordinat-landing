import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "../components/layout/PageHero";
import { SiteShell } from "../components/layout/SiteShell";
import { CremaWave } from "../components/transitions/CremaWave";
import { SheetReveal } from "../components/transitions/SheetReveal";
import { Pill } from "../components/ui/Pill";
import { RevealText } from "../components/ui/RevealText";
import { guideFor } from "../content/guide";
import { useCopy, useHref, useLang } from "../lib/i18n";
import { EASE_CINE, reveal } from "../lib/motion";
import { branches, hours } from "../lib/site";

const COPY = {
  en: {
    eyebrow: "Guide / Samandağ",
    l1: "Samandağ:",
    l2: "places to visit.",
    intro: "Where to go in Samandağ, Hatay — ancient tunnels, the turtle beach, Çevlik, Vakıflı — what to eat, and where to stop for a coffee in between.",
    places: "Places",
    count: (n: number) => `${n} stops`,
    updated: "Updated",
    visit: "Places to visit",
    v1: "Coordinate by",
    v2: "coordinate.",
    food: "Local flavours",
    stop: "Coffee stop",
    s1: "Between two stops,",
    s2: "a coffee.",
    stopBody: `Both Koordinat Coffee branches are open every day, ${hours.short} — breakfast before Çevlik, a cold brew after the beach, dessert late at night.`,
    menu: "See the menu",
  },
  tr: {
    eyebrow: "Rehber / Samandağ",
    l1: "Samandağ'da",
    l2: "gezilecek yerler.",
    intro: "Samandağ'da gezilecek yerler — antik tüneller, kaplumbağa sahili, Çevlik, Vakıflı — ne yenir ve aralarda nerede kahve molası verilir.",
    places: "Duraklar",
    count: (n: number) => `${n} durak`,
    updated: "Güncelleme",
    visit: "Gezilecek yerler",
    v1: "Koordinat",
    v2: "koordinat.",
    food: "Yöresel tatlar",
    stop: "Kahve molası",
    s1: "İki durak arasında,",
    s2: "bir kahve.",
    stopBody: `İki Koordinat Coffee şubesi de her gün ${hours.short} açık — Çevlik öncesi kahvaltı, sahil dönüşü cold brew, gece geç saatte tatlı.`,
    menu: "Menüyü gör",
  },
};

export default function GuidePage() {
  const lang = useLang();
  const t = useCopy(COPY);
  const href = useHref();
  const g = guideFor(lang);

  return (
    <SiteShell footerUnder="#e8d8c3">
      <PageHero
        tall
        eyebrow={t.eyebrow}
        code="KCF / 005"
        lines={[t.l1, <em key="k" className="text-amber italic">{t.l2}</em>]}
        intro={t.intro}
        meta={[
          [t.places, t.count(g.places.length)],
          [t.updated, g.updated],
        ]}
        media={{ src: "/media/place.mp4", poster: "/media/place.jpg" }}
      />

      {/* places */}
      <section data-theme="light" className="relative z-10 bg-cream text-ink">
        <CremaWave fill="#f4ebdd" />
        <div className="mx-auto max-w-[1440px] px-6 pt-20 pb-32 md:px-10 md:pt-28 lg:px-[6%]">
          <motion.p className="micro mb-6 text-coffee" {...reveal}>
            {t.visit}
          </motion.p>
          <RevealText
            className="display text-[clamp(2.8rem,5.6vw,5.6rem)] text-espresso"
            lines={[t.v1, <em key="g" className="text-coffee italic">{t.v2}</em>]}
          />
          <ol className="mt-16 grid border-t border-espresso/15 md:grid-cols-2">
            {g.places.map((p, i) => (
              <motion.li
                key={p.id}
                id={p.id}
                className="border-b border-espresso/15 py-10 md:odd:border-r md:odd:pr-10 md:even:pl-10"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.8, ease: EASE_CINE, delay: (i % 2) * 0.08 }}
              >
                <div className="flex items-baseline justify-between gap-4">
                  <span className="micro text-coffee">{String(i + 1).padStart(2, "0")}</span>
                  <span className="micro text-right text-espresso/50">{p.tag}</span>
                </div>
                <h2 className="display mt-5 text-[clamp(2rem,3.2vw,2.8rem)] text-espresso">{p.name}</h2>
                <p className="mt-4 max-w-[560px] text-[15px] leading-[1.8] text-espresso/70">{p.text}</p>
              </motion.li>
            ))}
          </ol>
          <p className="mt-8 max-w-[640px] text-[13px] leading-relaxed text-espresso/55">{g.note}</p>
        </div>
      </section>

      {/* food */}
      <SheetReveal under="#f4ebdd">
        <section data-theme="dark" className="bg-espresso text-cream">
          <div className="mx-auto grid max-w-[1440px] gap-14 px-6 py-28 md:px-10 md:py-36 lg:grid-cols-12 lg:px-[6%]">
            <div className="lg:col-span-5">
              <motion.p className="micro mb-6 text-amber" {...reveal}>
                {t.food}
              </motion.p>
              <RevealText className="display text-[clamp(2.4rem,4.4vw,4.2rem)]" lines={[g.foodTitle]} />
            </div>
            <ul className="border-t border-cream/15 lg:col-span-6 lg:col-start-7">
              {g.food.map((f, i) => (
                <motion.li
                  key={f}
                  className="flex gap-6 border-b border-cream/15 py-6 text-[15.5px] leading-relaxed text-foam/80"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.7, ease: EASE_CINE, delay: i * 0.06 }}
                >
                  <span className="micro pt-1 text-amber">{String(i + 1).padStart(2, "0")}</span>
                  <span>{f}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </section>
      </SheetReveal>

      {/* coffee stop */}
      <section data-theme="light" className="relative z-10 bg-foam text-ink">
        <CremaWave fill="#e8d8c3" />
        <div className="mx-auto grid max-w-[1440px] gap-12 px-6 pt-20 pb-32 md:px-10 md:pt-28 lg:grid-cols-12 lg:px-[6%]">
          <div className="lg:col-span-5">
            <motion.p className="micro mb-6 text-coffee" {...reveal}>
              {t.stop}
            </motion.p>
            <RevealText
              className="display text-[clamp(2.6rem,4.8vw,4.6rem)] text-espresso"
              lines={[t.s1, <em key="c" className="text-coffee italic">{t.s2}</em>]}
            />
            <motion.p className="mt-6 max-w-[460px] text-[15px] leading-[1.8] text-espresso/70" {...reveal}>
              {t.stopBody}
            </motion.p>
            <div className="mt-8">
              <Pill href={href("menu")} variant="dark">
                {t.menu}
              </Pill>
            </div>
          </div>
          <ul className="border-t border-espresso/20 lg:col-span-6 lg:col-start-7">
            {branches.map((b) => (
              <li key={b.id}>
                <a
                  href={href(b.route)}
                  data-cursor="go"
                  className="group flex items-center justify-between gap-6 border-b border-espresso/20 py-7"
                >
                  <span>
                    <span className="micro text-coffee">
                      {b.n} · {lang === "tr" ? b.noteTr : b.note}
                    </span>
                    <span className="display mt-2 block text-[clamp(2rem,3.2vw,2.8rem)] text-espresso">
                      {b.name} {b.area}
                    </span>
                    <span className="mt-1 block text-[13.5px] text-espresso/60">{b.address}</span>
                  </span>
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-espresso/25 transition-[transform,background-color,color] duration-700 ease-soft group-hover:rotate-45 group-hover:bg-espresso group-hover:text-cream">
                    <ArrowUpRight className="size-4" strokeWidth={1.5} aria-hidden="true" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </SiteShell>
  );
}
