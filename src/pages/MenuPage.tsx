import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { PageHero } from "../components/layout/PageHero";
import { SiteShell } from "../components/layout/SiteShell";
import { CremaWave } from "../components/transitions/CremaWave";
import { Pill } from "../components/ui/Pill";
import { RevealImage } from "../components/ui/RevealImage";
import { RevealText } from "../components/ui/RevealText";
import { useCopy, useLang } from "../lib/i18n";
import { EASE_CINE } from "../lib/motion";
import { appStoreUrl, hours, menuFor, menuItemCount, price, stores, type MenuCategory } from "../lib/site";

type Group = { id: MenuCategory["group"]; title: string; line: string; img: string; alt: string };

const COPY = {
  en: {
    eyebrow: "Menu & prices",
    l1: "The",
    l2: "menu.",
    intro: "Coffee, food and something sweet — made to order, all day. All prices in Turkish lira, VAT included.",
    open: "Open daily",
    onMenu: "On the menu",
    items: (n: number) => `${n} items`,
    ahead: "Order ahead",
    app: "Koordinat Coffee app",
    sections: "Menu sections",
    count: (n: number) => `${String(n).padStart(2, "0")} items`,
    note: "All prices are in Turkish lira and include VAT. Menu and prices may change; the price shown in the app when you confirm your order is the one you pay. Ask our team about allergens.",
    order: "Order in the app",
    groups: [
      { id: "coffee", title: "Coffee", line: "From the first espresso to the last cold brew.", img: "/media/menu-coffee.jpg", alt: "A cup of black coffee on roasted coffee beans" },
      { id: "food", title: "Food", line: "Something warm to sit down with.", img: "/media/menu-food.jpg", alt: "A cheeseburger" },
      { id: "sweet", title: "Sweet", line: "For the second coffee.", img: "/media/menu-sweet.jpg", alt: "Brownies with chocolate" },
    ] as Group[],
  },
  tr: {
    eyebrow: "Menü ve fiyatlar",
    l1: "Menü",
    l2: "burada.",
    intro: "Kahve, yemek ve tatlı bir şeyler — gün boyu, siparişe özel hazırlanır. Tüm fiyatlar Türk lirası ve KDV dahildir.",
    open: "Her gün açık",
    onMenu: "Menüde",
    items: (n: number) => `${n} ürün`,
    ahead: "Önceden sipariş",
    app: "Koordinat Coffee uygulaması",
    sections: "Menü bölümleri",
    count: (n: number) => `${String(n).padStart(2, "0")} ürün`,
    note: "Tüm fiyatlar Türk lirası cinsindendir ve KDV dahildir. Menü ve fiyatlar değişebilir; siparişi onayladığın anda uygulamada gösterilen fiyat geçerlidir. Alerjenler için ekibimize danışabilirsin.",
    order: "Uygulamadan sipariş ver",
    groups: [
      { id: "coffee", title: "Kahve", line: "Sabahın ilk espressosundan son cold brew'a.", img: "/media/menu-coffee.jpg", alt: "Kavrulmuş kahve çekirdekleri üzerinde bir fincan sade kahve" },
      { id: "food", title: "Yemek", line: "Oturup keyifle yenecek sıcak bir şey.", img: "/media/menu-food.jpg", alt: "Hamburger" },
      { id: "sweet", title: "Tatlı", line: "İkinci kahvenin yanına.", img: "/media/menu-sweet.jpg", alt: "Çikolatalı brownie" },
    ] as Group[],
  },
};

const pad = (n: number) => String(n).padStart(2, "0");

function useActiveGroup(ids: string[]) {
  const [active, setActive] = useState<string>(ids[0]);
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [ids]);
  return active;
}

function Category({ cat, count }: { cat: MenuCategory; count: string }) {
  return (
    <div className="mb-14 last:mb-0">
      <div className="mb-5 flex items-baseline justify-between gap-4 border-b border-espresso/25 pb-3">
        <h3 className="display text-[1.9rem] text-espresso">{cat.title}</h3>
        <span className="micro shrink-0 text-coffee/70">{count}</span>
      </div>
      <ul>
        {cat.items.map((it, i) => (
          <motion.li
            key={it.name}
            className="group border-b border-espresso/10 py-4"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: EASE_CINE, delay: Math.min(i, 6) * 0.04 }}
          >
            <div className="flex items-baseline gap-4">
              <span className="text-[16px] font-medium text-espresso transition-transform duration-500 ease-soft group-hover:translate-x-1">
                {it.name}
              </span>
              <span aria-hidden="true" className="flex-1 translate-y-[-3px] border-b border-dotted border-espresso/25" />
              <span className="display shrink-0 text-[1.5rem] text-coffee tabular-nums">{price(it.price)}</span>
            </div>
            <p className="mt-1 text-[13.5px] text-espresso/55">{it.desc}</p>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

const GROUP_IDS = ["coffee", "food", "sweet"];

export default function MenuPage() {
  const lang = useLang();
  const t = useCopy(COPY);
  const menu = menuFor(lang);
  const active = useActiveGroup(GROUP_IDS);
  const [join, setJoin] = useState<string>(stores.appStore);
  useEffect(() => setJoin(appStoreUrl()), []);

  return (
    <SiteShell footerUnder="#f4ebdd">
      <PageHero
        tall
        eyebrow={t.eyebrow}
        code="KCF / 002"
        lines={[t.l1, <em key="m" className="text-amber italic">{t.l2}</em>]}
        intro={t.intro}
        meta={[
          [t.open, hours.short],
          [t.onMenu, t.items(menuItemCount)],
          [t.ahead, t.app],
        ]}
        media={{ src: "/media/pour.mp4", poster: "/media/pour.jpg" }}
      />

      <section data-theme="light" className="relative z-10 bg-cream text-ink">
        <CremaWave fill="#f4ebdd" />

        {/* sticky category bar */}
        <div className="sticky top-[84px] z-20 flex justify-center px-4 pt-6">
          <nav
            aria-label={t.sections}
            className="flex gap-1 rounded-full border border-espresso/10 bg-cream/85 p-1 shadow-[0_10px_40px_-20px_rgba(42,27,20,0.5)] backdrop-blur-xl"
          >
            {t.groups.map((g) => (
              <a
                key={g.id}
                href={`#${g.id}`}
                aria-current={active === g.id ? "true" : undefined}
                className={`micro relative flex min-h-[44px] items-center rounded-full px-4 transition-colors duration-500 sm:px-5 ${
                  active === g.id ? "text-cream" : "text-espresso/70 hover:text-espresso"
                }`}
              >
                {active === g.id && (
                  <motion.span
                    layoutId="menu-pill"
                    className="absolute inset-0 rounded-full bg-espresso"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">{g.title}</span>
              </a>
            ))}
          </nav>
        </div>

        <div className="mx-auto max-w-[1440px] px-6 pb-24 md:px-10 lg:px-[6%]">
          {t.groups.map((g, gi) => (
            <div key={g.id} id={g.id} className="grid scroll-mt-40 gap-10 py-20 md:py-28 lg:grid-cols-12 lg:gap-8">
              <div className="lg:col-span-5">
                <div className="lg:sticky lg:top-44">
                  <p className="micro mb-4 text-coffee">
                    {pad(gi + 1)} / {g.title}
                  </p>
                  <RevealText className="display text-[clamp(3.4rem,7vw,7rem)] text-espresso uppercase" lines={[g.title]} />
                  <p className="mt-3 font-serif text-2xl text-espresso/70 italic">{g.line}</p>
                  <RevealImage className="mt-8 aspect-[4/3] bg-espresso max-lg:hidden">
                    <img src={g.img} alt={g.alt} loading="lazy" decoding="async" className="h-full w-full object-cover" />
                  </RevealImage>
                </div>
              </div>
              <div className="lg:col-span-6 lg:col-start-7">
                {menu
                  .filter((c) => c.group === g.id)
                  .map((c) => (
                    <Category key={c.id} cat={c} count={t.count(c.items.length)} />
                  ))}
              </div>
            </div>
          ))}

          <div className="flex flex-col items-start gap-6 border-t border-espresso/15 pt-12 md:flex-row md:items-center md:justify-between">
            <p className="max-w-[560px] text-[13.5px] leading-relaxed text-espresso/60">{t.note}</p>
            <Pill href={join} external variant="dark" ring>
              {t.order}
            </Pill>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
