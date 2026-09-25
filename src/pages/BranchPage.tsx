import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { PageHero } from "../components/layout/PageHero";
import { SiteShell } from "../components/layout/SiteShell";
import { CremaWave } from "../components/transitions/CremaWave";
import { SheetReveal } from "../components/transitions/SheetReveal";
import { Pill, TextLink } from "../components/ui/Pill";
import { RevealText } from "../components/ui/RevealText";
import { useCopy, useHref, useLang } from "../lib/i18n";
import { EASE_CINE, reveal } from "../lib/motion";
import { appStoreUrl, branches, fromPrice, hours, phone, price, stampsPerCard, stores, telHref } from "../lib/site";

type Item = { t: string; d: string };

const ESPRESSO = "#2a1b14";

const COPY = {
  en: {
    eyebrow: (n: string) => `Branch ${n} / Samandağ`,
    where: "Address",
    open: "Open daily",
    coords: "Coordinates",
    here: "At this branch",
    h1: "Coffee, food,",
    h2: "staying longer.",
    items: [
      { t: "Coffee", d: `Espresso drinks, filter, Turkish coffee and cold brew — from ${price(fromPrice("coffee"))}.` },
      { t: "Breakfast & food", d: `Breakfast plate, toasts, sandwiches, burgers and pasta — from ${price(fromPrice("food"))}.` },
      { t: "Sweets", d: `San Sebastián cheesecake, tiramisu, brownie and waffle — from ${price(fromPrice("sweet"))}.` },
      { t: "Order ahead", d: `Order and pay in the Koordinat Coffee app, collect at the counter, earn a free coffee every ${stampsPerCard} stamps.` },
    ] as Item[],
    visit: "Visit",
    directions: "Get directions",
    menu: "See the menu",
    call: "Phone",
    other: "Our other branch",
    otherTitle: "One Koordinat,",
    otherTitle2: "two addresses.",
    otherBody: "Same menu, same prices, same app — pick the branch that is closer.",
    guide: "Exploring Samandağ?",
    guideBody: "Titus Tunnel, Çevlik, Vakıflı and the turtle beach — our guide to the area, with a coffee stop on the way.",
    guideLink: "Read the Samandağ guide",
    app: "Get the app",
    contact: "All contact details",
  },
  tr: {
    eyebrow: (n: string) => `Şube ${n} / Samandağ`,
    where: "Adres",
    open: "Her gün açık",
    coords: "Koordinatlar",
    here: "Bu şubede",
    h1: "Kahve, yemek,",
    h2: "uzun sohbetler.",
    items: [
      { t: "Kahve", d: `Espresso bazlı içecekler, filtre kahve, Türk kahvesi ve cold brew — başlangıç fiyatı ${price(fromPrice("coffee"))}.` },
      { t: "Kahvaltı ve yemek", d: `Kahvaltı tabağı, tost, sandviç, burger ve makarna — başlangıç fiyatı ${price(fromPrice("food"))}.` },
      { t: "Tatlılar", d: `San Sebastian cheesecake, tiramisu, brownie ve waffle — başlangıç fiyatı ${price(fromPrice("sweet"))}.` },
      { t: "Önceden sipariş", d: `Koordinat Coffee uygulamasından sipariş ver, kartla öde, tezgahtan al; her ${stampsPerCard} damgada bir kahve bizden.` },
    ] as Item[],
    visit: "Ziyaret",
    directions: "Yol tarifi al",
    menu: "Menüyü gör",
    call: "Telefon",
    other: "Diğer şubemiz",
    otherTitle: "Aynı Koordinat,",
    otherTitle2: "iki adres.",
    otherBody: "Aynı menü, aynı fiyatlar, aynı uygulama — sana yakın olan şubeyi seç.",
    guide: "Samandağ'ı mı geziyorsun?",
    guideBody: "Titus Tüneli, Çevlik, Vakıflı ve kaplumbağa sahili — yolun üstünde bir kahve molasıyla Samandağ rehberimiz.",
    guideLink: "Samandağ rehberini oku",
    app: "Uygulamayı indir",
    contact: "Tüm iletişim bilgileri",
  },
};

export default function BranchPage({ branchId }: { branchId: string }) {
  const lang = useLang();
  const t = useCopy(COPY);
  const href = useHref();
  const [join, setJoin] = useState<string>(stores.appStore);
  useEffect(() => setJoin(appStoreUrl()), []);

  const b = branches.find((x) => x.id === branchId) ?? branches[0];
  const others = branches.filter((x) => x.id !== b.id);
  const note = lang === "tr" ? b.noteTr : b.note;

  return (
    <SiteShell footerUnder={ESPRESSO}>
      <PageHero
        tall
        eyebrow={t.eyebrow(b.n)}
        code={`KCF / B${b.n}`}
        lines={[
          <>
            {b.area}
            <span className="sr-only"> — Samandağ, Hatay:</span>
          </>,
          <em key="n" className="text-amber italic">
            {b.name}
          </em>,
        ]}
        intro={lang === "tr" ? b.aboutTr : b.about}
        meta={[
          [t.where, `${b.address}, ${b.postcode} Samandağ`],
          [t.open, hours.short],
        ]}
        media={{ src: `/media/${b.video}.mp4`, poster: `/media/${b.video}.jpg` }}
      />

      {/* what's here + visit details */}
      <section data-theme="light" className="relative z-10 bg-cream text-ink">
        <CremaWave fill="#f4ebdd" />
        <div className="mx-auto grid max-w-[1440px] gap-14 px-6 pt-20 pb-32 md:px-10 md:pt-28 lg:grid-cols-12 lg:gap-8 lg:px-[6%]">
          <div className="lg:col-span-6">
            <motion.p className="micro mb-6 text-coffee" {...reveal}>
              {t.here}
            </motion.p>
            <RevealText
              className="display text-[clamp(2.8rem,5.6vw,5.6rem)] text-espresso"
              lines={[t.h1, <em key="s" className="text-coffee italic">{t.h2}</em>]}
            />
            <ul className="mt-12 border-t border-espresso/15">
              {t.items.map((it, i) => (
                <motion.li
                  key={it.t}
                  className="grid gap-2 border-b border-espresso/15 py-6 sm:grid-cols-[180px_1fr] sm:gap-8"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.7, ease: EASE_CINE, delay: i * 0.06 }}
                >
                  <h3 className="text-[17px] font-medium text-espresso">{it.t}</h3>
                  <p className="text-[15px] leading-relaxed text-espresso/65">{it.d}</p>
                </motion.li>
              ))}
            </ul>
          </div>

          <motion.div className="lg:col-span-5 lg:col-start-8" {...reveal}>
            <div className="bg-foam p-8 md:p-10">
              <p className="micro text-coffee">
                {t.visit} · {note}
              </p>
              <p className="display mt-4 text-[clamp(2.2rem,3.4vw,3rem)] text-espresso">{b.name}</p>
              <dl className="mt-8 grid gap-6 text-[15px] text-espresso/80">
                <div>
                  <dt className="micro text-coffee/80">{t.where}</dt>
                  <dd className="mt-1.5">
                    <address className="not-italic">
                      {b.address}
                      <br />
                      {b.postcode} Samandağ / Hatay
                    </address>
                  </dd>
                </div>
                <div>
                  <dt className="micro text-coffee/80">{t.open}</dt>
                  <dd className="mt-1.5">
                    {hours.days(lang)}, {hours.short}
                  </dd>
                </div>
                {phone && telHref && (
                  <div>
                    <dt className="micro text-coffee/80">{t.call}</dt>
                    <dd className="mt-1.5">
                      <a href={telHref} className="underline decoration-coffee/40 underline-offset-4">
                        {phone}
                      </a>
                    </dd>
                  </div>
                )}
                <div>
                  <dt className="micro text-coffee/80">{t.coords}</dt>
                  <dd className="micro mt-1.5 text-[10.5px] text-espresso/70">
                    {b.dms.lat} / {b.dms.lng}
                  </dd>
                </div>
              </dl>
              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                <Pill href={b.mapsUrl} external variant="dark">
                  {t.directions}
                </Pill>
                <TextLink href={href("menu")} className="text-espresso">
                  {t.menu}
                </TextLink>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* the other branch + guide */}
      <SheetReveal under="#f4ebdd">
        <section data-theme="dark" className="bg-espresso text-cream">
          <div className="mx-auto grid max-w-[1440px] gap-14 px-6 py-28 md:px-10 md:py-36 lg:grid-cols-2 lg:gap-20 lg:px-[6%]">
            <div>
              <motion.p className="micro mb-6 text-amber" {...reveal}>
                {t.other}
              </motion.p>
              <RevealText
                className="display text-[clamp(2.4rem,4.4vw,4.2rem)]"
                lines={[t.otherTitle, <em key="o" className="text-amber italic">{t.otherTitle2}</em>]}
              />
              <motion.p className="mt-6 max-w-[480px] text-[15px] leading-[1.8] text-foam/70" {...reveal}>
                {t.otherBody}
              </motion.p>
              <ul className="mt-10 border-t border-cream/15">
                {others.map((o) => (
                  <li key={o.id}>
                    <a
                      href={href(o.route)}
                      data-cursor="go"
                      className="group flex items-center justify-between gap-6 border-b border-cream/15 py-6"
                    >
                      <span>
                        <span className="micro text-amber">
                          {o.n} · {o.name}
                        </span>
                        <span className="display mt-2 block text-[clamp(2rem,3.2vw,2.8rem)]">{o.area}</span>
                        <span className="mt-1 block text-[13.5px] text-muted">{o.address}</span>
                      </span>
                      <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-cream/25 transition-[transform,background-color,color] duration-700 ease-soft group-hover:rotate-45 group-hover:bg-cream group-hover:text-ink">
                        <ArrowUpRight className="size-4" strokeWidth={1.5} aria-hidden="true" />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:pt-16">
              <motion.p className="micro mb-6 text-amber" {...reveal}>
                {t.guide}
              </motion.p>
              <motion.p className="max-w-[480px] font-serif text-[clamp(1.6rem,2.4vw,2.1rem)] leading-tight text-foam italic" {...reveal}>
                {t.guideBody}
              </motion.p>
              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                <Pill href={href("guide")} ring>
                  {t.guideLink}
                </Pill>
                <TextLink href={join} external className="text-foam/80">
                  {t.app}
                </TextLink>
              </div>
              <p className="mt-10">
                <TextLink href={href("contact")} className="text-foam/80">
                  {t.contact}
                </TextLink>
              </p>
            </div>
          </div>
        </section>
      </SheetReveal>
    </SiteShell>
  );
}
