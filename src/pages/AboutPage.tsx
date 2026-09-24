import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { CompanyTable } from "../components/layout/DocParts";
import { PageHero } from "../components/layout/PageHero";
import { SiteShell } from "../components/layout/SiteShell";
import { CremaWave } from "../components/transitions/CremaWave";
import { SheetReveal } from "../components/transitions/SheetReveal";
import { Pill, TextLink } from "../components/ui/Pill";
import { RevealImage } from "../components/ui/RevealImage";
import { RevealText } from "../components/ui/RevealText";
import { useCopy, useHref, useLang } from "../lib/i18n";
import { EASE_CINE, reveal } from "../lib/motion";
import { address, appStoreUrl, company, hours, stampsPerCard, stores } from "../lib/site";

type Item = { n: string; t: string; d: string };

const COPY = {
  en: {
    eyebrow: "About / Koordinat",
    l1: "Somewhere you",
    l2: "spend time.",
    intro: `${company.tradeName} is a coffee house in Samandağ, Hatay — coffee, food and community under one roof.`,
    where: "Where",
    whereValue: `2 branches · ${address.district}, ${address.city}`,
    open: "Open",
    story: "Our story",
    s1: "A coffee house",
    s2: "at the coordinates",
    s3: "of Samandağ.",
    p1: `${company.tradeName} has two branches in Samandağ, Hatay — one in Çiğdede by the sea, one in Atatürk. From espresso-based coffees to filter, from Turkish coffee to cold brew, every drink is prepared fresh, to order.`,
    p2: "Alongside the stores we built the Koordinat Coffee app: see the menu and current prices, order ahead and pay securely by card, collect without queuing, and earn free coffee with the Papağan loyalty card.",
    photoAlt: "Two friends talking over coffee at a café counter",
    pillars: [
      { n: "01", t: "Coffee", d: "Espresso drinks, filter, Turkish coffee and cold brew — every cup prepared to order." },
      { n: "02", t: "Food", d: "Breakfast, sandwiches, burgers and pasta, for when a coffee turns into lunch." },
      { n: "03", t: "Community", d: "Tables for studying, working, meeting friends and staying longer than planned." },
    ] as Item[],
    appEyebrow: "The Koordinat Coffee app",
    a1: "Order ahead,",
    a2: "skip the queue.",
    getApp: "Get the app",
    steps: [
      { n: "01", t: "Order in the app", d: "Browse the menu and current prices in the Koordinat Coffee app and build your order." },
      { n: "02", t: "Pay by card", d: "Pay by credit or debit card on PayTR’s secure page, verified with 3D Secure." },
      { n: "03", t: "Pick up at the counter", d: "Get a notification when it is ready and skip the queue with your order number." },
      { n: "04", t: "Collect stamps", d: `Scan the QR at the counter; every ${stampsPerCard} stamps on your Papağan card, the next coffee is on us.` },
    ] as Item[],
    sell: "How we sell",
    h1: "Pickup only.",
    h2: "Paid securely.",
    sellBody: "Orders placed in the app are prepared for collection in store (pickup); we do not ship or deliver to addresses. Payments are taken through the licensed payment institution PayTR with 3D Secure. We never see or store your card details.",
    see: "See",
    and: "and",
    pickup: "Pickup Terms",
    payment: "Payment & Security",
    business: "Business details",
  },
  tr: {
    eyebrow: "Hakkımızda / Koordinat",
    l1: "Vakit",
    l2: "geçirilecek yer.",
    intro: `${company.tradeName}, Samandağ'da bir kahve evi — kahve, yemek ve insanlar aynı çatı altında.`,
    where: "Nerede",
    whereValue: `2 şube · ${address.district}, ${address.city}`,
    open: "Açık",
    story: "Hikayemiz",
    s1: "Samandağ'ın",
    s2: "koordinatlarında",
    s3: "bir kahve evi.",
    p1: `${company.tradeName}'nin Samandağ'da iki şubesi var — biri denize yakın Çiğdede'de, diğeri Atatürk'te. Espresso bazlı kahvelerden filtre kahveye, Türk kahvesinden soğuk demlemeye kadar tüm içecekler siparişe özel ve taze hazırlanır.`,
    p2: "Şubelerimizin yanında Koordinat Coffee uygulamasını geliştirdik: menüyü ve güncel fiyatları gör, önceden sipariş verip kartla güvenle öde, sıra beklemeden teslim al ve Papağan sadakat kartıyla bedava kahve kazan.",
    photoAlt: "Kafe tezgahında kahve eşliğinde sohbet eden iki arkadaş",
    pillars: [
      { n: "01", t: "Kahve", d: "Espresso bazlı içecekler, filtre, Türk kahvesi ve cold brew — her fincan siparişe özel." },
      { n: "02", t: "Yemek", d: "Kahvaltı, sandviç, burger ve makarna; kahve öğle yemeğine dönüştüğünde." },
      { n: "03", t: "Topluluk", d: "Ders çalışmak, çalışmak, arkadaşlarla buluşmak ve planlanandan uzun kalmak için masalar." },
    ] as Item[],
    appEyebrow: "Koordinat Coffee uygulaması",
    a1: "Önceden sipariş ver,",
    a2: "sıra bekleme.",
    getApp: "Uygulamayı indir",
    steps: [
      { n: "01", t: "Uygulamadan sipariş ver", d: "Koordinat Coffee uygulamasında menüye ve güncel fiyatlara göz at, siparişini oluştur." },
      { n: "02", t: "Kartla öde", d: "Kredi veya banka kartınla PayTR'ın güvenli sayfasında, 3D Secure doğrulamasıyla öde." },
      { n: "03", t: "Tezgahtan teslim al", d: "Hazır olunca bildirim al, sipariş numaranla sıra beklemeden teslim al." },
      { n: "04", t: "Damga topla", d: `Tezgahtaki QR'ı okut; Papağan kartında her ${stampsPerCard} damgada bir sonraki kahve bizden.` },
    ] as Item[],
    sell: "Satış modelimiz",
    h1: "Sadece gel-al.",
    h2: "Güvenle ödenir.",
    sellBody: "Uygulamadan verilen siparişler şubeden teslim (gel-al) esasıyla hazırlanır; kargo veya adrese teslimat yapılmaz. Ödemeler lisanslı ödeme kuruluşu PayTR altyapısıyla, 3D Secure doğrulamalı olarak alınır. Kart bilgilerin tarafımızca görülmez ve saklanmaz.",
    see: "Ayrıntılar:",
    and: "ve",
    pickup: "Teslimat (Gel-Al) Koşulları",
    payment: "Ödeme ve Güvenlik",
    business: "İşletme bilgileri",
  },
};

export default function AboutPage() {
  const lang = useLang();
  const t = useCopy(COPY);
  const href = useHref();
  const [join, setJoin] = useState<string>(stores.appStore);
  useEffect(() => setJoin(appStoreUrl()), []);

  return (
    <SiteShell footerUnder="#e8d8c3">
      <PageHero
        tall
        eyebrow={t.eyebrow}
        code="KCF / 003"
        lines={[t.l1, <em key="s" className="text-amber italic">{t.l2}</em>]}
        intro={t.intro}
        meta={[
          [t.where, t.whereValue],
          [t.open, hours.label(lang)],
        ]}
        media={{ src: "/media/ritual.mp4", poster: "/media/ritual.jpg" }}
      />

      {/* story */}
      <section data-theme="light" className="relative z-10 bg-cream text-ink">
        <CremaWave fill="#f4ebdd" />
        <div className="mx-auto grid max-w-[1440px] gap-14 px-6 pt-20 pb-32 md:px-10 md:pt-28 lg:grid-cols-12 lg:gap-8 lg:px-[6%]">
          <div className="lg:col-span-6">
            <motion.p className="micro mb-6 text-coffee" {...reveal}>
              {t.story}
            </motion.p>
            <RevealText
              className="display text-[clamp(2.8rem,5.6vw,5.6rem)] text-espresso"
              lines={[t.s1, <em key="c" className="text-coffee italic">{t.s2}</em>, t.s3]}
            />
            <motion.div className="mt-10 max-w-[520px] space-y-5 text-[15.5px] leading-[1.8] text-espresso/75" {...reveal}>
              <p>{t.p1}</p>
              <p>{t.p2}</p>
            </motion.div>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <RevealImage className="aspect-[4/5] bg-espresso" delay={0.1}>
              <img
                src="/media/afternoon.jpg"
                alt={t.photoAlt}
                loading="lazy"
                className="h-full w-full object-cover object-[35%_center]"
              />
            </RevealImage>
          </div>
        </div>

        <div className="mx-auto max-w-[1440px] px-6 pb-32 md:px-10 lg:px-[6%]">
          <ul className="grid border-t border-espresso/15 md:grid-cols-3">
            {t.pillars.map((p, i) => (
              <motion.li
                key={p.n}
                className="border-b border-espresso/15 py-10 md:border-r md:border-b-0 md:px-8 md:first:pl-0 md:last:border-r-0"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: EASE_CINE, delay: i * 0.1 }}
              >
                <span className="micro text-coffee">{p.n}</span>
                <h3 className="display mt-6 text-5xl text-espresso">{p.t}</h3>
                <p className="mt-4 max-w-[320px] text-[14.5px] leading-relaxed text-espresso/65">{p.d}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* how ordering works */}
      <SheetReveal under="#f4ebdd">
        <section data-theme="dark" className="relative bg-espresso text-cream">
          <div className="mx-auto max-w-[1440px] px-6 py-28 md:px-10 md:py-36 lg:px-[6%]">
            <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <div>
                <motion.p className="micro mb-6 text-amber" {...reveal}>
                  {t.appEyebrow}
                </motion.p>
                <RevealText
                  className="display text-[clamp(2.8rem,6vw,6rem)]"
                  lines={[t.a1, <em key="o" className="text-amber italic">{t.a2}</em>]}
                />
              </div>
              <div className="flex flex-wrap items-center gap-6">
                <Pill href={join} external ring>
                  {t.getApp}
                </Pill>
                <TextLink href={stores.googlePlay} external className="text-foam/80">
                  Google Play
                </TextLink>
              </div>
            </div>
            <ol className="mt-20 grid gap-px bg-cream/10 sm:grid-cols-2 lg:grid-cols-4">
              {t.steps.map((s, i) => (
                <motion.li
                  key={s.n}
                  className="bg-espresso p-8 md:p-10"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: EASE_CINE, delay: i * 0.08 }}
                >
                  <span className="display text-6xl text-amber/80">{s.n}</span>
                  <h3 className="mt-8 text-[17px] font-medium">{s.t}</h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-muted">{s.d}</p>
                </motion.li>
              ))}
            </ol>
          </div>
        </section>
      </SheetReveal>

      {/* sales model + business details */}
      <section data-theme="light" className="relative z-10 bg-foam text-ink">
        <CremaWave fill="#e8d8c3" />
        <div className="mx-auto grid max-w-[1440px] gap-14 px-6 pt-20 pb-32 md:px-10 md:pt-28 lg:grid-cols-12 lg:gap-8 lg:px-[6%]">
          <div className="lg:col-span-5">
            <motion.p className="micro mb-6 text-coffee" {...reveal}>
              {t.sell}
            </motion.p>
            <RevealText
              className="display text-[clamp(2.6rem,4.8vw,4.6rem)] text-espresso"
              lines={[t.h1, <em key="p" className="text-coffee italic">{t.h2}</em>]}
            />
            <motion.div className="prose-k mt-8 max-w-[480px]" {...reveal}>
              <p>{t.sellBody}</p>
              <p>
                {t.see} <a href={href("pickup")}>{t.pickup}</a> {t.and} <a href={href("payment")}>{t.payment}</a>.
              </p>
            </motion.div>
          </div>
          <motion.div className="lg:col-span-6 lg:col-start-7" {...reveal}>
            <p className="micro mb-4 text-coffee">{t.business}</p>
            <div className="prose-k">
              <CompanyTable />
            </div>
          </motion.div>
        </div>
      </section>
    </SiteShell>
  );
}
