import { motion } from "framer-motion";
import { ArrowUpRight, Plus } from "lucide-react";
import type { ReactNode } from "react";
import { CompanyTable, Email } from "../components/layout/DocParts";
import { PageHero } from "../components/layout/PageHero";
import { SiteShell } from "../components/layout/SiteShell";
import { CremaWave } from "../components/transitions/CremaWave";
import { SheetReveal } from "../components/transitions/SheetReveal";
import { RevealText } from "../components/ui/RevealText";
import { faqFor } from "../content/faq";
import { useCopy, useHref, useLang } from "../lib/i18n";
import { EASE_CINE, reveal } from "../lib/motion";
import { branches, COORDS, email, FACEBOOK, hours, INSTAGRAM, phone, telHref } from "../lib/site";

type Row = { n: string; label: string; value: ReactNode; href: string; cta: string; external?: boolean };

const COPY = {
  en: {
    eyebrow: "Contact",
    l1: "Find us,",
    l2: "write to us.",
    intro: "For orders, payments, refunds or your personal data — reach us here. We answer e-mails within 2 business days.",
    branches: "Branches",
    coords: "Coordinates",
    open: "Open daily",
    visit: (area: string) => `Visit ${area}`,
    directions: "Get directions",
    hoursLabel: "Opening hours",
    seeBoth: "See both branches",
    call: "Call",
    callUs: "Call us",
    write: "Write",
    sendMail: "Send an e-mail",
    follow: "Follow",
    alsoOn: "Also on",
    orderNote: ". Writing about an order? Please include your order number.",
    complaints: "Complaints",
    notRight: "Something not right?",
    complaintsBody: (
      <>
        Tell us first — through the channels above. As a consumer you may also apply to the{" "}
        <strong className="text-cream">Consumer Arbitration Committee</strong> at your place of residence or where the
        transaction took place, within the monetary limits announced each year by the Ministry of Trade, and to the{" "}
        <strong className="text-cream">Consumer Court</strong> above those limits. Applications can also be made online
        via e-Devlet through <strong className="text-cream">TÜBİS</strong>.
      </>
    ),
    data: "Personal data",
    dataTitle: "Your data, your call.",
    dataBefore: "Requests under KVKK (Law No. 6698) can be sent to",
    dataAfter: "or to our postal address. Details are in the",
    kvkk: "KVKK Privacy Notice",
    faq: "FAQ",
    q1: "Good to",
    q2: "know.",
    seller: "Seller details",
    b1: "Business",
    b2: "information.",
  },
  tr: {
    eyebrow: "İletişim",
    l1: "Bizi bul,",
    l2: "bize yaz.",
    intro: "Sipariş, ödeme, iade veya kişisel verilerinle ilgili tüm talepler için bize buradan ulaş. E-postaları en geç 2 iş günü içinde yanıtlıyoruz.",
    branches: "Şubeler",
    coords: "Koordinatlar",
    open: "Her gün açık",
    visit: (area: string) => `${area} şubesi`,
    directions: "Yol tarifi al",
    hoursLabel: "Çalışma saatleri",
    seeBoth: "İki şubeyi gör",
    call: "Ara",
    callUs: "Bizi ara",
    write: "Yaz",
    sendMail: "E-posta gönder",
    follow: "Takip et",
    alsoOn: "Ayrıca",
    orderNote: "'ta da buradayız. Siparişinle ilgili yazıyorsan lütfen sipariş numaranı ekle.",
    complaints: "Şikâyet ve başvuru",
    notRight: "Bir sorun mu var?",
    complaintsBody: (
      <>
        Önce bize yukarıdaki kanallardan ulaş. Tüketici olarak, Ticaret Bakanlığınca her yıl ilan edilen parasal sınırlar
        dâhilinde yerleşim yerindeki veya işlemi yaptığın yerdeki <strong className="text-cream">Tüketici Hakem Heyeti</strong>
        'ne, bu sınırları aşan uyuşmazlıklarda <strong className="text-cream">Tüketici Mahkemesi</strong>'ne
        başvurabilirsin. Başvurular e-Devlet üzerinden <strong className="text-cream">TÜBİS</strong> ile de yapılabilir.
      </>
    ),
    data: "Kişisel veriler",
    dataTitle: "Verin, senin kararın.",
    dataBefore: "6698 sayılı KVKK kapsamındaki taleplerini",
    dataAfter: "adresine veya posta adresimize iletebilirsin. Ayrıntılar:",
    kvkk: "KVKK Aydınlatma Metni",
    faq: "Sık sorulan sorular",
    q1: "Merak",
    q2: "edilenler.",
    seller: "Satıcı bilgileri",
    b1: "İşletme",
    b2: "bilgileri.",
  },
};

export default function ContactPage() {
  const lang = useLang();
  const t = useCopy(COPY);
  const href = useHref();

  const rows: Row[] = [
    ...branches.map((br) => ({
      n: br.n,
      label: t.visit(br.area),
      value: (
        <>
          {br.address}
          <br />
          {br.postcode} Samandağ / Hatay
          <span className="micro mt-2 block text-[9.5px] text-coffee/70">
            {br.dms.lat} / {br.dms.lng}
          </span>
        </>
      ),
      href: br.mapsUrl,
      cta: t.directions,
      external: true,
    })),
    {
      n: "03",
      label: t.hoursLabel,
      value: (
        <>
          {hours.days(lang)}
          <br />
          <span className="text-coffee">{hours.short}</span>
        </>
      ),
      href: href("home", "location"),
      cta: t.seeBoth,
    },
    ...(phone && telHref ? [{ n: "04", label: t.call, value: phone, href: telHref, cta: t.callUs } as Row] : []),
    { n: phone ? "05" : "04", label: t.write, value: email, href: `mailto:${email}`, cta: t.sendMail },
    {
      n: phone ? "06" : "05",
      label: t.follow,
      value: "@koordinatcoffeetr",
      href: INSTAGRAM,
      cta: "Instagram",
      external: true,
    },
  ];

  return (
    <SiteShell footerUnder="#e8d8c3">
      <PageHero
        tall
        eyebrow={t.eyebrow}
        code="KCF / 004"
        lines={[t.l1, <em key="w" className="text-amber italic">{t.l2}</em>]}
        intro={t.intro}
        meta={[
          [t.branches, "Çiğdede · Atatürk"],
          [t.coords, `${COORDS.lat} / ${COORDS.lng}`],
          [t.open, hours.short],
        ]}
        media={{ src: "/media/final.mp4", poster: "/media/final.jpg" }}
      />

      <section data-theme="light" className="relative z-10 bg-cream text-ink">
        <CremaWave fill="#f4ebdd" />
        <div className="mx-auto max-w-[1440px] px-6 pt-20 pb-32 md:px-10 md:pt-28 lg:px-[6%]">
          <ul className="border-t border-espresso/20">
            {rows.map((r, i) => (
              <motion.li
                key={r.n}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.8, ease: EASE_CINE, delay: i * 0.06 }}
              >
                <a
                  href={r.href}
                  data-cursor="go"
                  {...(r.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group relative grid items-center gap-4 overflow-hidden border-b border-espresso/20 py-8 md:grid-cols-12 md:py-10"
                >
                  {/* hover wash rising from the bottom */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 origin-bottom scale-y-0 bg-foam transition-transform duration-700 ease-soft group-hover:scale-y-100"
                  />
                  <span className="micro relative text-coffee md:col-span-1">{r.n}</span>
                  <span className="display relative text-[clamp(2.2rem,4.2vw,4rem)] text-espresso md:col-span-4">{r.label}</span>
                  <span className="relative text-[16px] leading-relaxed break-words text-espresso/75 md:col-span-4">
                    {r.value}
                  </span>
                  <span className="relative flex items-center justify-between gap-4 md:col-span-3 md:justify-end">
                    <span className="micro text-espresso/70">{r.cta}</span>
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-espresso/25 transition-[transform,background-color,color] duration-700 ease-soft group-hover:rotate-45 group-hover:bg-espresso group-hover:text-cream">
                      <ArrowUpRight className="size-4" strokeWidth={1.5} />
                    </span>
                  </span>
                </a>
              </motion.li>
            ))}
          </ul>
          <p className="mt-6 text-[13px] text-espresso/55">
            {t.alsoOn}{" "}
            <a href={FACEBOOK} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
              Facebook
            </a>
            {t.orderNote}
          </p>
        </div>

        {/* FAQ — the same answers feed the FAQPage structured data (src/seo.ts) */}
        <div id="faq" className="mx-auto grid max-w-[1440px] gap-10 px-6 pb-32 md:px-10 lg:grid-cols-12 lg:px-[6%]">
          <div className="lg:col-span-4">
            <motion.p className="micro mb-4 text-coffee" {...reveal}>
              {t.faq}
            </motion.p>
            <RevealText
              className="display text-[clamp(2.4rem,4vw,3.8rem)] text-espresso"
              lines={[t.q1, <em key="k" className="text-coffee italic">{t.q2}</em>]}
            />
          </div>
          <motion.div className="border-t border-espresso/20 lg:col-span-7 lg:col-start-6" {...reveal}>
            {faqFor(lang).map((f) => (
              <details key={f.q} className="group border-b border-espresso/20">
                <summary
                  data-cursor="go"
                  className="flex min-h-[64px] cursor-pointer list-none items-center justify-between gap-6 py-5 text-[17px] font-medium text-espresso [&::-webkit-details-marker]:hidden"
                >
                  <h3>{f.q}</h3>
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-espresso/25 transition-transform duration-500 ease-soft group-open:rotate-45">
                    <Plus className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
                  </span>
                </summary>
                <p className="max-w-[620px] pb-6 text-[15px] leading-[1.8] text-espresso/70">{f.a}</p>
              </details>
            ))}
          </motion.div>
        </div>
      </section>

      <SheetReveal under="#f4ebdd">
        <section data-theme="dark" className="bg-espresso text-cream">
          <div className="mx-auto grid max-w-[1440px] gap-14 px-6 py-28 md:px-10 md:py-36 lg:grid-cols-2 lg:gap-20 lg:px-[6%]">
            <div>
              <motion.p className="micro mb-6 text-amber" {...reveal}>
                {t.complaints}
              </motion.p>
              <RevealText className="display text-[clamp(2.4rem,4.4vw,4.2rem)]" lines={[t.notRight]} />
              <motion.p className="mt-6 max-w-[520px] text-[15px] leading-[1.8] text-foam/70" {...reveal}>
                {t.complaintsBody}
              </motion.p>
            </div>
            <div>
              <motion.p className="micro mb-6 text-amber" {...reveal}>
                {t.data}
              </motion.p>
              <RevealText className="display text-[clamp(2.4rem,4.4vw,4.2rem)]" lines={[t.dataTitle]} />
              <motion.p className="mt-6 max-w-[520px] text-[15px] leading-[1.8] text-foam/70" {...reveal}>
                {t.dataBefore}{" "}
                <span className="text-cream underline decoration-amber/60 underline-offset-4 [&_a]:text-cream">
                  <Email />
                </span>{" "}
                {t.dataAfter}{" "}
                <a href={href("kvkk")} className="text-cream underline decoration-amber/60 underline-offset-4">
                  {t.kvkk}
                </a>
                .
              </motion.p>
            </div>
          </div>
        </section>
      </SheetReveal>

      <section data-theme="light" className="relative z-10 bg-foam text-ink">
        <CremaWave fill="#e8d8c3" />
        <div className="mx-auto grid max-w-[1440px] gap-10 px-6 pt-20 pb-32 md:px-10 md:pt-28 lg:grid-cols-12 lg:px-[6%]">
          <div className="lg:col-span-4">
            <p className="micro mb-4 text-coffee">{t.seller}</p>
            <RevealText className="display text-[clamp(2.4rem,4vw,3.8rem)] text-espresso" lines={[t.b1, t.b2]} />
          </div>
          <motion.div className="prose-k lg:col-span-7 lg:col-start-6" {...reveal}>
            <CompanyTable />
          </motion.div>
        </div>
      </section>
    </SiteShell>
  );
}
