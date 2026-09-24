import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { EASE_CINE, reveal } from "../lib/motion";
import { useCopy, useHref, useLang } from "../lib/i18n";
import { COORDS, fromPrice, menuFor, price, type MenuCategory } from "../lib/site";
import { CremaWave } from "./transitions/CremaWave";
import { RevealText } from "./ui/RevealText";

const PANELS: { group: MenuCategory["group"]; img: string; tag: string }[] = [
  { group: "coffee", img: "/media/menu-coffee.jpg", tag: `${COORDS.decimal.lat} N` },
  { group: "food", img: "/media/menu-food.jpg", tag: `${COORDS.decimal.lng} E` },
  { group: "sweet", img: "/media/menu-sweet.jpg", tag: "KCF" },
];

const COPY = {
  en: {
    eyebrow: "Signature menu / KCF 002",
    l1: "Made for",
    l2: "your mood.",
    groups: "Coffee / Food / Sweet",
    explore: "Explore the full menu",
    note: "All prices in Turkish lira, VAT included. Order ahead in the Koordinat Coffee app and pick up at the counter.",
    panels: {
      coffee: { title: "Coffee", line: "Pulled, poured and brewed through the day.", alt: "A cup of black coffee on a bed of roasted coffee beans" },
      food: { title: "Food", line: "Something warm to sit down with.", alt: "A double cheeseburger against a dark background" },
      sweet: { title: "Sweet", line: "For the second coffee.", alt: "Stacked brownie slices with chocolate being poured over them" },
    },
  },
  tr: {
    eyebrow: "İmza menü / KCF 002",
    l1: "Ruh haline",
    l2: "göre.",
    groups: "Kahve / Yemek / Tatlı",
    explore: "Tüm menüyü keşfet",
    note: "Tüm fiyatlar Türk lirası ve KDV dahildir. Koordinat Coffee uygulamasından önceden sipariş verip tezgahtan teslim alabilirsin.",
    panels: {
      coffee: { title: "Kahve", line: "Gün boyu çekilen, dökülen, demlenen.", alt: "Kavrulmuş kahve çekirdekleri üzerinde bir fincan sade kahve" },
      food: { title: "Yemek", line: "Oturup keyifle yenecek sıcak bir şey.", alt: "Koyu arka plan önünde duble hamburger" },
      sweet: { title: "Tatlı", line: "İkinci kahvenin yanına.", alt: "Üzerine çikolata dökülen brownie dilimleri" },
    },
  },
};

const ease = "ease-[cubic-bezier(.22,1,.36,1)]";

export function SignatureMenuSection() {
  const lang = useLang();
  const t = useCopy(COPY);
  const href = useHref();
  const menu = menuFor(lang);
  const highlights = (group: MenuCategory["group"]) =>
    menu
      .filter((m) => m.group === group)
      .flatMap((m) => m.items)
      .slice(0, 4);

  return (
    <section id="menu" data-theme="light" className="relative z-10 bg-cream text-ink">
      <CremaWave fill="#f4ebdd" />
      <div className="mx-auto max-w-[1440px] px-6 pt-24 pb-24 md:px-10 md:pt-32 md:pb-32 lg:px-[6%]">
        <div className="mb-14 flex flex-col gap-8 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div>
            <motion.p className="micro mb-6 text-coffee" {...reveal}>
              {t.eyebrow}
            </motion.p>
            <RevealText
              className="display text-[clamp(3.2rem,7vw,7.4rem)] text-espresso"
              lines={[t.l1, <em key="m" className="text-coffee italic">{t.l2}</em>]}
            />
          </div>
          <motion.p className="micro text-espresso/60 md:pb-4" {...reveal}>
            {t.groups}
          </motion.p>
        </div>

        <ul className="grid gap-4 lg:grid-cols-3 lg:gap-4">
          {PANELS.map((c, i) => (
            <motion.li
              key={c.group}
              initial={{ clipPath: "inset(8% 8% 8% 8%)", opacity: 0.7 }}
              whileInView={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.0, ease: EASE_CINE, delay: i * 0.12 }}
            >
              <a
                href={href("menu", c.group)}
                data-cursor="discover"
                data-theme="dark"
                className="group relative isolate block h-[72vh] max-h-[760px] min-h-[480px] overflow-hidden bg-espresso text-cream max-md:h-[580px]"
              >
                <img
                  src={c.img}
                  alt={t.panels[c.group].alt}
                  loading="lazy"
                  decoding="async"
                  className={`absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-700 ${ease} group-hover:scale-[1.06] group-focus-visible:scale-[1.06]`}
                />
                <div
                  aria-hidden="true"
                  className={`absolute inset-0 -z-10 bg-linear-to-t from-ink via-ink/50 to-ink/10 md:opacity-90`}
                />
                <div
                  aria-hidden="true"
                  className={`absolute inset-0 -z-10 bg-ink/0 transition-colors duration-700 ${ease} group-hover:bg-ink/25`}
                />

                <div className="flex items-start justify-between p-6">
                  <span
                    className={`micro text-amber transition-[opacity,transform] duration-600 ${ease} md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100`}
                  >
                    0{i + 1} — {c.tag}
                  </span>
                  <span className="micro rounded-full border border-cream/25 px-3 py-1.5 text-cream/80">
                    {lang === "tr" ? "Başlangıç" : "from"} {price(fromPrice(c.group))}
                  </span>
                </div>

                <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
                  <div className={`transition-transform duration-700 ${ease} md:group-hover:-translate-y-2`}>
                    <h3 className="display text-[clamp(3.2rem,5.4vw,5.6rem)] uppercase">{t.panels[c.group].title}</h3>
                    <p className="mt-2 font-serif text-xl text-foam/85 italic">{t.panels[c.group].line}</p>
                  </div>

                  <ul className="mt-6 space-y-1.5 border-t border-cream/20 pt-4 text-[13px] text-cream/80">
                    {highlights(c.group).map((it) => (
                      <li key={it.name} className="flex items-baseline gap-3">
                        <span>{it.name}</span>
                        <span aria-hidden="true" className="flex-1 border-b border-dotted border-cream/25" />
                        <span className="tabular-nums text-cream">{price(it.price)}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex items-center justify-between">
                    <span className="micro">{t.explore}</span>
                    <span
                      className={`flex size-11 items-center justify-center rounded-full border border-cream/30 transition-[transform,background-color,color,border-color] duration-700 ${ease} group-hover:translate-x-1 group-hover:rotate-45 group-hover:border-cream group-hover:bg-cream group-hover:text-ink`}
                      aria-hidden="true"
                    >
                      <ArrowUpRight className="size-4" strokeWidth={1.5} />
                    </span>
                  </div>
                </div>
              </a>
            </motion.li>
          ))}
        </ul>

        <motion.p className="mt-8 max-w-[520px] text-[13px] leading-relaxed text-espresso/55" {...reveal}>
          {t.note}
        </motion.p>
      </div>
    </section>
  );
}
