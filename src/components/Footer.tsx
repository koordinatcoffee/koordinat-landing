import type { ReactNode } from "react";
import { useCopy, useHref, useLang } from "../lib/i18n";
import { address, branches, company, COORDS, email, FACEBOOK, hours, INSTAGRAM, legalLinks, phone, stores, telHref } from "../lib/site";
import { LangSwitch } from "./Navbar";
import { Logo } from "./ui/Logo";
import { PaymentMarks } from "./ui/PaymentMarks";

const COPY = {
  en: {
    explore: "Explore",
    menu: "Menu & Prices",
    about: "About",
    contact: "Contact",
    location: "Location",
    guide: "Samandağ guide",
    visit: "Visit",
    directions: "Directions ↗",
    follow: "Follow",
    email: "E-mail",
    app: "The app",
    legal: "Legal",
    business: "Business details",
    tax: "Tax office / No.",
    tel: "Phone",
    cards: "Accepted cards and payment infrastructure",
    home: "Koordinat Coffee Factory — home",
    note: "Orders in the Koordinat Coffee app are paid by card through PayTR with 3D Secure. All prices include VAT.",
    tagline: "Coffee / Food / Community",
  },
  tr: {
    explore: "Keşfet",
    menu: "Menü ve Fiyatlar",
    about: "Hakkımızda",
    contact: "İletişim",
    location: "Konum",
    guide: "Samandağ rehberi",
    visit: "Şubeler",
    directions: "Yol tarifi ↗",
    follow: "Takip et",
    email: "E-posta",
    app: "Uygulama",
    legal: "Yasal",
    business: "İşletme bilgileri",
    tax: "Vergi dairesi / No",
    tel: "Telefon",
    cards: "Kabul edilen kartlar ve ödeme altyapısı",
    home: "Koordinat Coffee Factory — ana sayfa",
    note: "Koordinat Coffee uygulamasındaki siparişler PayTR altyapısıyla, 3D Secure doğrulamalı olarak kartla ödenir. Tüm fiyatlara KDV dahildir.",
    tagline: "Kahve / Yemek / Topluluk",
  },
};

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;
const linkCls = "inline-flex min-h-[40px] items-center text-[14px] text-cream/75 transition-colors hover:text-amber";

function Col({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <p className="micro mb-4 text-muted">{title}</p>
      {children}
    </div>
  );
}

export function Footer() {
  const lang = useLang();
  const t = useCopy(COPY);
  const href = useHref();

  const explore = [
    { href: href("menu"), label: t.menu },
    { href: href("about"), label: t.about },
    { href: href("contact"), label: t.contact },
    { href: href("home", "location"), label: t.location },
    { href: href("guide"), label: t.guide },
  ];

  return (
    <footer
      data-theme="dark"
      className="relative bg-ink px-6 pt-24 pb-[max(32px,env(safe-area-inset-bottom))] text-cream md:px-10 lg:px-[6%]"
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <a href={href("home")} className="inline-block" aria-label={t.home}>
              <Logo decorative className="w-[170px] md:w-[210px]" />
            </a>
            <p className="micro mt-8 text-muted">
              {COORDS.lat} / {COORDS.lng}
            </p>
            <LangSwitch className="mt-6 w-fit" />
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-5 lg:col-span-9">
            <div className="col-span-2 md:order-first">
              <Col title={`${t.visit} · ${hours.days(lang)}, ${hours.short}`}>
                <ul className="grid gap-6 sm:grid-cols-2">
                  {branches.map((b) => (
                    <li key={b.id}>
                      <a href={href(b.route)} className="text-[14px] text-cream underline-offset-4 hover:underline">
                        <span className="micro mr-2 text-amber">{b.n}</span>
                        {b.name} {b.area}
                      </a>
                      <p className="mt-1.5 text-[13.5px] leading-relaxed text-cream/65">
                        {b.address}
                        <br />
                        {b.postcode} Samandağ / Hatay
                      </p>
                      <a href={b.mapsUrl} {...ext} className={`${linkCls} underline decoration-cream/25 underline-offset-4`}>
                        {t.directions}
                      </a>
                    </li>
                  ))}
                </ul>
              </Col>
            </div>
            <Col title={t.explore}>
              <ul>
                {explore.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className={linkCls}>
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </Col>
            <Col title={t.follow}>
              <ul>
                <li>
                  <a href={INSTAGRAM} {...ext} className={linkCls}>
                    Instagram
                  </a>
                </li>
                <li>
                  <a href={FACEBOOK} {...ext} className={linkCls}>
                    Facebook
                  </a>
                </li>
                <li>
                  <a href={`mailto:${email}`} className={linkCls}>
                    {t.email}
                  </a>
                </li>
              </ul>
            </Col>
            <Col title={t.app}>
              <ul>
                <li>
                  <a href={stores.appStore} {...ext} className={linkCls}>
                    App Store
                  </a>
                </li>
                <li>
                  <a href={stores.googlePlay} {...ext} className={linkCls}>
                    Google Play
                  </a>
                </li>
              </ul>
            </Col>
          </div>
        </div>

        {/* business details — required on payment-enabled sites */}
        <div className="mt-16 grid gap-10 border-t border-cream/15 pt-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="micro mb-3 text-muted">{t.business}</p>
            <div className="grid gap-1.5 text-[13px] leading-relaxed text-cream/70">
              <p className="font-medium text-cream">{company.tradeName}</p>
              <p>{address.full}</p>
              {company.taxOffice && company.taxNumber && (
                <p>
                  <span className="text-muted">{t.tax}:</span> {company.taxOffice} / {company.taxNumber}
                </p>
              )}
              {phone && telHref && (
                <p>
                  <span className="text-muted">{t.tel}:</span>{" "}
                  <a href={telHref} className="hover:text-cream">
                    {phone}
                  </a>
                </p>
              )}
              <p>
                <span className="text-muted">{t.email}:</span>{" "}
                <a href={`mailto:${email}`} className="hover:text-cream">
                  {email}
                </a>
              </p>
            </div>
          </div>
          <div className="lg:col-span-7">
            <p className="micro mb-3 text-muted">{t.legal}</p>
            <ul className="flex flex-wrap gap-x-6">
              {legalLinks(lang).map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="inline-flex min-h-[44px] items-center text-[13px] text-cream/60 hover:text-cream">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-cream/10 pt-6 md:flex-row md:items-center md:justify-between">
          <PaymentMarks label={t.cards} />
          <p className="max-w-[520px] text-[11.5px] leading-relaxed text-muted/80 md:text-right">{t.note}</p>
        </div>

        <div className="mt-8 grid gap-3 border-t border-cream/10 pt-6 text-muted md:grid-cols-3">
          <span className="micro">Samandağ / Hatay</span>
          <span className="micro md:text-center">{t.tagline}</span>
          <span className="micro md:text-right" suppressHydrationWarning>© {new Date().getFullYear()} KOORDİNAT COFFEE FACTORY</span>
        </div>
      </div>
    </footer>
  );
}
