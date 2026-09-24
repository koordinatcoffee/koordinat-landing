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
  | "terms"
  | "guide"
  | `branch:${string}`;

type Meta = { path: string; title: string; description: string };
/** `branch` = id of the branch in site.config.mjs (branch pages only). */
export type RouteDef = { key: RouteKey; legal?: boolean; branch?: string } & Record<Lang, Meta>;

// Keyword map (Google autocomplete TR + Google Trends, Sep 2026):
//  brand   → "koordinat cafe" (most typed), "koordinat coffee factory", "koordinat cafe samandağ"
//  menu    → "koordinat coffee menü", "koordinat cafe menü", "koordinat coffee samandağ menüsü"
//  local   → "samandağ cafe" (> "samandağ kafe"), "samandağ kafeler", "samandağ kahve mekanları",
//            "samandağ kahvaltı yerleri", "samandağ açık kafeler", "samandağ mekan önerileri"
//  region  → "samandağda gezilecek yerler", "samandağda ne yenir", "samandağ çevlik"
// Every title carries the brand; "Cafe" is the spelling people search, not "Kafe".
const S = " | Koordinat Coffee";
const OPEN = `${config.hours.open}–${config.hours.close}`;

type BranchCfg = { id: string; slug: string; name: string; area: string; address: string; note: string; noteTr: string };
const BRANCH_ROUTES: RouteDef[] = (config.branches as BranchCfg[]).map((b) => ({
  key: `branch:${b.id}`,
  branch: b.id,
  en: {
    path: `/branches/${b.slug}/`,
    title: `${b.name} ${b.area} | Café in Samandağ, Hatay`,
    description: `${b.name}, ${b.area} branch: ${b.address}, Samandağ. ${b.note}. Open daily ${OPEN} for coffee, breakfast and desserts — directions, menu and contact.`,
  },
  tr: {
    path: `/tr/subeler/${b.slug}/`,
    title: `${b.name} ${b.area} Şubesi | Samandağ Cafe, Hatay`,
    description: `${b.name} ${b.area} şubesi: ${b.address}, Samandağ. ${b.noteTr}. Her gün ${OPEN} kahve, kahvaltı ve tatlı; yol tarifi, menü ve iletişim.`,
  },
}));

export const ROUTES: RouteDef[] = [
  {
    key: "home",
    en: {
      path: "/",
      title: "Koordinat Coffee Samandağ | Café, Coffee & Breakfast · Hatay",
      description: `Koordinat Coffee (Koordinat Cafe) — two coffee houses in Samandağ, Hatay: Koordinat Coffee Factory in Çiğdede by the sea and Atatürk. Open daily ${OPEN}.`,
    },
    tr: {
      path: "/tr/",
      title: "Koordinat Coffee Samandağ | Cafe, Kahve ve Kahvaltı · Hatay",
      description: `Koordinat Coffee (Koordinat Cafe) Samandağ'da iki şube: denize yakın Çiğdede'de Koordinat Coffee Factory ve Atatürk. Her gün ${OPEN} kahve, kahvaltı, tatlı.`,
    },
  },
  {
    key: "menu",
    en: {
      path: "/menu/",
      title: "Koordinat Coffee Menu & Prices | Café Menu in Samandağ",
      description: "Koordinat Coffee menu: espresso, Turkish coffee, cold brew, breakfast, burgers, pasta and desserts in Samandağ, Hatay. Prices in Turkish lira, VAT included.",
    },
    tr: {
      path: "/tr/menu/",
      title: "Koordinat Coffee Menü ve Fiyatlar | Samandağ Cafe Menüsü",
      description: "Koordinat Coffee (Koordinat Cafe) Samandağ menüsü: espresso, Türk kahvesi, cold brew, kahvaltı, burger, makarna, waffle ve tatlılar. Güncel fiyatlar, KDV dahil.",
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
      title: "Koordinat Coffee Contact & Directions | Samandağ Branches",
      description: `Addresses, directions, opening hours (daily ${OPEN}), phone and e-mail for both Koordinat Coffee branches in Samandağ, Hatay: Çiğdede and Atatürk.`,
    },
    tr: {
      path: "/tr/iletisim/",
      title: "Koordinat Coffee İletişim ve Yol Tarifi | Samandağ Şubeleri",
      description: `Koordinat Coffee Samandağ şubeleri: Çiğdede ve Atatürk adresleri, yol tarifi, çalışma saatleri (her gün ${OPEN}), telefon, e-posta ve sık sorulan sorular.`,
    },
  },
  ...BRANCH_ROUTES,
  {
    key: "guide",
    en: {
      path: "/samandag-guide/",
      title: "Samandağ Travel Guide: Places to Visit & What to Eat | Koordinat Coffee",
      description: "Things to do in Samandağ, Hatay: Titus Tunnel, Beşikli Cave, Çevlik, Vakıflı, the Moses Tree, Hızır Shrine and the turtle beach — plus what to eat and where to stop for coffee.",
    },
    tr: {
      path: "/tr/samandag-rehberi/",
      title: "Samandağ Gezilecek Yerler ve Ne Yenir? Rehber | Koordinat Coffee",
      description: "Samandağ'da gezilecek yerler: Titus Tüneli, Beşikli Mağara, Çevlik, Vakıflı Köyü, Musa Ağacı, Hızır Makamı ve kaplumbağa sahili. Ne yenir, nerede kahve molası verilir?",
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
