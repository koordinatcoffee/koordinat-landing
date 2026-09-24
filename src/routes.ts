// Route metadata only (no React) — imported by the app AND by vite.config.ts,
// which writes one HTML file per route and language with the right <title>/description.
import config from "../site.config.mjs";

export type Lang = "en" | "tr";
export const LANGS: Lang[] = ["en", "tr"];

export type RouteKey =
  | "home"
  | "menu"
  | "about"
  | "contact"
  | "preInformation"
  | "distanceSales"
  | "cancellation"
  | "pickup"
  | "payment"
  | "privacy"
  | "kvkk"
  | "cookies"
  | "terms";

type Meta = { path: string; title: string; description: string };
export type RouteDef = { key: RouteKey; legal?: boolean } & Record<Lang, Meta>;

// Every title starts or ends with the brand so "koordinat…" searches match on every page;
// the home, menu and contact titles also carry the local terms (Samandağ / Hatay / kafe).
const S = " | Koordinat Coffee";
const OPEN = `${config.hours.open}–${config.hours.close}`;

export const ROUTES: RouteDef[] = [
  {
    key: "home",
    en: {
      path: "/",
      title: "Koordinat Coffee | Coffee House in Samandağ, Hatay",
      description: `Koordinat Coffee Factory — two coffee houses in Samandağ, Hatay: Çiğdede by the sea and Atatürk. Open daily ${OPEN} for coffee, breakfast and desserts. Order ahead in the app.`,
    },
    tr: {
      path: "/tr/",
      title: "Koordinat Coffee | Samandağ Kafe, Kahve ve Kahvaltı · Hatay",
      description: `Koordinat Coffee Factory, Samandağ'da iki şube: denize yakın Çiğdede ve Atatürk. Her gün ${OPEN} kahve, kahvaltı ve tatlı. Uygulamadan sipariş ver, sıra bekleme.`,
    },
  },
  {
    key: "menu",
    en: {
      path: "/menu/",
      title: `Menu & Prices${S} Samandağ`,
      description: "Koordinat Coffee menu: espresso, Turkish coffee, cold brew, breakfast, burgers, pasta and desserts in Samandağ, Hatay. Prices in Turkish lira, VAT included.",
    },
    tr: {
      path: "/tr/menu/",
      title: `Menü ve Fiyatlar${S} Samandağ`,
      description: "Koordinat Coffee menüsü: espresso, Türk kahvesi, cold brew, kahvaltı, burger, makarna ve tatlılar. Samandağ'da güncel kafe fiyatları, TL ve KDV dahil.",
    },
  },
  {
    key: "about",
    en: {
      path: "/about/",
      title: "About | Koordinat Coffee Factory, Samandağ",
      description: "Koordinat Coffee Factory: two coffee houses in Samandağ, Hatay, with in-app ordering, card payment, pickup and the Papağan loyalty card.",
    },
    tr: {
      path: "/tr/hakkimizda/",
      title: "Hakkımızda | Koordinat Coffee Factory, Samandağ",
      description: "Koordinat Coffee Factory: Samandağ, Hatay'da Çiğdede ve Atatürk'te iki kahve evi. Uygulamadan sipariş, kartla ödeme, gel-al ve Papağan sadakat kartı.",
    },
  },
  {
    key: "contact",
    en: {
      path: "/contact/",
      title: `Contact & Directions${S} Samandağ`,
      description: `Addresses, directions, opening hours (daily ${OPEN}), phone and e-mail for both Koordinat Coffee branches in Samandağ, Hatay: Çiğdede and Atatürk.`,
    },
    tr: {
      path: "/tr/iletisim/",
      title: `İletişim ve Yol Tarifi${S} Samandağ`,
      description: `Koordinat Coffee Samandağ şubeleri: Çiğdede ve Atatürk adresleri, yol tarifi, çalışma saatleri (her gün ${OPEN}), telefon, e-posta ve sık sorulan sorular.`,
    },
  },
  {
    key: "preInformation",
    legal: true,
    en: { path: "/pre-information-form/", title: `Pre-Information Form${S}`, description: "Pre-information form for orders placed through the Koordinat Coffee mobile app." },
    tr: { path: "/tr/on-bilgilendirme-formu/", title: `Ön Bilgilendirme Formu${S}`, description: "Koordinat Coffee mobil uygulaması üzerinden verilen siparişlere ilişkin ön bilgilendirme formu." },
  },
  {
    key: "distanceSales",
    legal: true,
    en: { path: "/distance-sales-agreement/", title: `Distance Sales Agreement${S}`, description: "Distance sales agreement for purchases made through the Koordinat Coffee mobile app." },
    tr: { path: "/tr/mesafeli-satis-sozlesmesi/", title: `Mesafeli Satış Sözleşmesi${S}`, description: "Koordinat Coffee mobil uygulaması üzerinden yapılan satışlara ilişkin mesafeli satış sözleşmesi." },
  },
  {
    key: "cancellation",
    legal: true,
    en: { path: "/cancellation-and-refunds/", title: `Cancellation & Refunds${S}`, description: "Cancellation, refund and right-of-withdrawal terms for Koordinat Coffee app orders." },
    tr: { path: "/tr/iptal-ve-iade/", title: `İptal, İade ve Cayma${S}`, description: "Koordinat Coffee uygulama siparişlerinde iptal, iade ve cayma hakkı koşulları." },
  },
  {
    key: "pickup",
    legal: true,
    en: { path: "/pickup/", title: `Pickup Terms${S}`, description: "Koordinat Coffee app orders are collected in store (pickup). Terms and timings." },
    tr: { path: "/tr/teslimat/", title: `Teslimat (Gel-Al) Koşulları${S}`, description: "Koordinat Coffee uygulama siparişleri şubeden teslim (gel-al) usulüyle teslim edilir." },
  },
  {
    key: "payment",
    legal: true,
    en: { path: "/payment-and-security/", title: `Payment & Security${S}`, description: "Payments are taken through PayTR with 3D Secure. Card details are never seen or stored by us." },
    tr: { path: "/tr/odeme-ve-guvenlik/", title: `Ödeme ve Güvenlik${S}`, description: "Ödemeler PayTR altyapısıyla, 3D Secure doğrulamalı ve kart bilgisi saklanmadan alınır." },
  },
  {
    key: "privacy",
    legal: true,
    en: { path: "/privacy/", title: `Privacy Policy${S}`, description: "How personal data is processed and protected on the Koordinat Coffee website and mobile app." },
    tr: { path: "/tr/gizlilik/", title: `Gizlilik Politikası${S}`, description: "Koordinat Coffee web sitesi ve mobil uygulamasında kişisel verilerin nasıl işlendiği ve korunduğu." },
  },
  {
    key: "kvkk",
    legal: true,
    en: { path: "/kvkk/", title: `KVKK Privacy Notice${S}`, description: "Personal data privacy notice under the Turkish Personal Data Protection Law No. 6698 (KVKK)." },
    tr: { path: "/tr/kvkk/", title: `KVKK Aydınlatma Metni${S}`, description: "6698 sayılı KVKK kapsamında Koordinat Coffee Factory kişisel veri aydınlatma metni." },
  },
  {
    key: "cookies",
    legal: true,
    en: { path: "/cookies/", title: `Cookie Policy${S}`, description: "koordinatcoffee.com does not use cookies, analytics or advertising trackers." },
    tr: { path: "/tr/cerez-politikasi/", title: `Çerez Politikası${S}`, description: "koordinatcoffee.com çerez, analitik veya reklam takibi kullanmaz." },
  },
  {
    key: "terms",
    legal: true,
    en: { path: "/terms/", title: `Terms of Use${S}`, description: "Terms of use for the Koordinat Coffee mobile app and website." },
    tr: { path: "/tr/kullanim-kosullari/", title: `Kullanım Koşulları${S}`, description: "Koordinat Coffee mobil uygulaması ve web sitesi kullanım koşulları." },
  },
];

export const NOT_FOUND: Record<Lang, Meta> = {
  en: { path: "/404", title: `Page not found${S}`, description: "This page could not be found." },
  tr: { path: "/404", title: `Sayfa bulunamadı${S}`, description: "Aradığınız sayfa bulunamadı." },
};

export function normalizePath(pathname: string) {
  const p = pathname.toLowerCase().replace(/\/index\.html$/, "/");
  return p.endsWith("/") ? p : `${p}/`;
}

export const langOfPath = (pathname: string): Lang =>
  normalizePath(pathname).startsWith("/tr/") ? "tr" : "en";

export function findRoute(pathname: string): { route: RouteDef; lang: Lang } | null {
  const p = normalizePath(pathname);
  for (const route of ROUTES) {
    for (const lang of LANGS) if (route[lang].path === p) return { route, lang };
  }
  return null;
}

export const pathFor = (key: RouteKey, lang: Lang) => ROUTES.find((r) => r.key === key)![lang].path;
