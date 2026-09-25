// <head> for every page: title, description, canonical/hreflang, Open Graph and
// schema.org JSON-LD. Imported by vite.config.ts (build + dev), never by the app.
import config from "../site.config.mjs";
import { faqFor } from "./content/faq";
import { guideFor } from "./content/guide";
import { branches, company, menuFor, stores, telHref } from "./lib/site";
import { LANGS, NOT_FOUND, pathFor, ROUTES, type Lang, type RouteDef, type RouteKey } from "./routes";

const SITE = config.siteUrl;
const BRAND = "Koordinat Coffee";

/**
 * Every way people write the name. Google uses these to tie partial and variant
 * searches to one entity. Order follows Google autocomplete (TR, Sep 2026):
 * "koordinat cafe" and "koordinat cafe samandağ" are typed most, then "koordinat coffee factory".
 */
const ALT_NAMES = [
  "Koordinat Cafe",
  "Koordinat Cafe Samandağ",
  "Koordinat Coffee Factory",
  "Koordinat Coffee Samandağ",
  "Koordinat",
  "Koordinat Kafe",
  "Koordinat Kahve",
  "Koordinat Samandağ",
  "Koordinat Cafe Hatay",
];

const ID = {
  org: `${SITE}/#organization`,
  site: `${SITE}/#website`,
  app: `${SITE}/#app`,
  logo: `${SITE}/#logo`,
  branch: (id: string) => `${SITE}/#branch-${id}`,
};

const LOCALE: Record<Lang, string> = { en: "en_US", tr: "tr_TR" };
const IN_LANGUAGE: Record<Lang, string> = { en: "en", tr: "tr-TR" };

/** Share image per page (all 1280×720). */
const IMAGE: Partial<Record<RouteKey, string>> = {
  menu: "/media/menu-coffee.jpg",
  about: "/media/ritual.jpg",
  contact: "/media/final.jpg",
  guide: "/media/place.jpg",
  ...Object.fromEntries(branches.map((b) => [b.route, `/media/${b.video}.jpg`])),
};
/** Still frame of each page's hero video (PageHero) — preloaded as the LCP image. Keep in sync with the pages. */
const HERO_STILL: Partial<Record<RouteKey, string>> = {
  menu: "/media/pour.jpg",
  about: "/media/ritual.jpg",
  contact: "/media/final.jpg",
  guide: "/media/place.jpg",
  ...Object.fromEntries(branches.map((b) => [b.route, `/media/${b.video}.jpg`])),
};

const IMAGE_ALT: Record<Lang, string> = {
  en: "Koordinat Coffee — coffee house in Samandağ, Hatay",
  tr: "Koordinat Coffee — Samandağ, Hatay'da kahve evi",
};

const PAGE_TYPE: Partial<Record<RouteKey, string>> = { about: "AboutPage", contact: "ContactPage" };

const url = (path: string) => `${SITE}${path}`;
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const phoneIntl = telHref?.replace(/^tel:/, "");

const WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(
  (d) => `https://schema.org/${d}`,
);

const samandag = {
  "@type": "City",
  name: "Samandağ",
  containedInPlace: {
    "@type": "AdministrativeArea",
    name: "Hatay",
    containedInPlace: { "@type": "Country", name: "Türkiye", identifier: "TR" },
  },
};

// ---------------------------------------------------------------- nodes

function organization(lang: Lang) {
  return {
    "@type": "Organization",
    "@id": ID.org,
    name: company.tradeName,
    alternateName: [BRAND, ...ALT_NAMES.filter((n) => n !== company.tradeName)],
    ...(company.legalName ? { legalName: company.legalName } : {}),
    url: url("/"),
    logo: { "@type": "ImageObject", "@id": ID.logo, url: url("/assets/img/logo-full.png"), width: 833, height: 515 },
    image: { "@id": ID.logo },
    description:
      lang === "tr"
        ? `${company.tradeName}, Samandağ, Hatay'da iki şubesi olan bir kahve evi: kahve, yemek ve topluluk.`
        : `${company.tradeName} is a coffee house with two branches in Samandağ, Hatay: coffee, food and community.`,
    email: company.email,
    ...(phoneIntl ? { telephone: phoneIntl } : {}),
    ...(company.taxNumber ? { taxID: company.taxNumber } : {}),
    address: {
      "@type": "PostalAddress",
      streetAddress: company.address,
      postalCode: company.postcode,
      addressLocality: company.district,
      addressRegion: company.city,
      addressCountry: "TR",
    },
    foundingLocation: samandag,
    areaServed: samandag,
    knowsLanguage: ["tr", "en"],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: company.email,
      ...(phoneIntl ? { telephone: phoneIntl } : {}),
      availableLanguage: ["Turkish", "English"],
      areaServed: "TR",
    },
    sameAs: [config.instagram.split("?")[0], config.facebook, stores.appStore, stores.googlePlay],
    subOrganization: branches.map((b) => ({ "@id": ID.branch(b.id) })),
  };
}

function website(lang: Lang) {
  return {
    "@type": "WebSite",
    "@id": ID.site,
    url: url("/"),
    name: BRAND,
    alternateName: ["Koordinat Cafe", "Koordinat Coffee Factory", "Koordinat", "koordinatcoffee.com"],
    inLanguage: LANGS.map((l) => IN_LANGUAGE[l]),
    publisher: { "@id": ID.org },
    description:
      lang === "tr"
        ? "Koordinat Coffee'nin resmi web sitesi — Samandağ şubeleri, menü, fiyatlar ve uygulama."
        : "The official website of Koordinat Coffee — Samandağ branches, menu, prices and app.",
  };
}

function branchNodes(lang: Lang) {
  const cuisine = lang === "tr" ? ["Kahve", "Kahvaltı", "Tatlı", "Sandviç", "Burger", "Makarna"] : ["Coffee", "Breakfast", "Desserts", "Sandwiches", "Burgers", "Pasta"];
  const prices = config.menu.flatMap((c) => c.items.map((i) => i.price));
  return branches.map((b) => ({
    "@type": "CafeOrCoffeeShop",
    "@id": ID.branch(b.id),
    name: b.name,
    alternateName: [`Koordinat Coffee ${b.area}`, `Koordinat Cafe ${b.area}`, `Koordinat ${b.area}`, `Koordinat Cafe Samandağ ${b.area}`],
    description:
      lang === "tr"
        ? `${b.name}, Samandağ ${b.area} şubesi. Espresso, filtre kahve, Türk kahvesi, cold brew, kahvaltı ve tatlılar; her gün ${config.hours.open}–${config.hours.close}.`
        : `${b.name}, ${b.area} branch in Samandağ. Espresso, filter coffee, Turkish coffee, cold brew, breakfast and desserts; open daily ${config.hours.open}–${config.hours.close}.`,
    url: url(pathFor(b.route, lang)),
    image: [`/media/${b.video}.jpg`, "/media/hero.jpg", "/media/place.jpg"].map(url),
    logo: { "@id": ID.logo },
    ...(phoneIntl ? { telephone: phoneIntl } : {}),
    email: company.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: b.address,
      postalCode: b.postcode,
      addressLocality: company.district,
      addressRegion: company.city,
      addressCountry: "TR",
    },
    geo: { "@type": "GeoCoordinates", latitude: b.lat, longitude: b.lng },
    hasMap: b.mapsUrl,
    openingHoursSpecification: [
      // closes after midnight: Google reads closes < opens as the next day
      { "@type": "OpeningHoursSpecification", dayOfWeek: WEEK, opens: config.hours.open, closes: config.hours.close },
    ],
    hasMenu: url(pathFor("menu", lang)),
    servesCuisine: cuisine,
    priceRange: `₺${Math.min(...prices)}–₺${Math.max(...prices)}`,
    currenciesAccepted: "TRY",
    areaServed: samandag,
    parentOrganization: { "@id": ID.org },
    brand: { "@type": "Brand", name: BRAND },
  }));
}

function app(lang: Lang) {
  return {
    "@type": "MobileApplication",
    "@id": ID.app,
    name: BRAND,
    operatingSystem: "iOS, Android",
    applicationCategory: "LifestyleApplication",
    description:
      lang === "tr"
        ? "Koordinat Coffee uygulaması: menü ve fiyatlar, önceden sipariş, kartla ödeme, şubeden gel-al ve Papağan sadakat kartı."
        : "The Koordinat Coffee app: menu and prices, order ahead, pay by card, pick up in store and collect Papağan loyalty stamps.",
    installUrl: [stores.appStore, stores.googlePlay],
    offers: { "@type": "Offer", price: 0, priceCurrency: "TRY" },
    publisher: { "@id": ID.org },
  };
}

function menu(lang: Lang, pageUrl: string) {
  return {
    "@type": "Menu",
    "@id": `${pageUrl}#menu`,
    name: lang === "tr" ? "Koordinat Coffee Menü" : "Koordinat Coffee Menu",
    inLanguage: IN_LANGUAGE[lang],
    url: pageUrl,
    hasMenuSection: menuFor(lang).map((cat) => ({
      "@type": "MenuSection",
      name: cat.title,
      hasMenuItem: cat.items.map((it) => ({
        "@type": "MenuItem",
        name: it.name,
        description: it.desc,
        offers: { "@type": "Offer", price: it.price, priceCurrency: "TRY" },
      })),
    })),
  };
}

function guide(lang: Lang, pageUrl: string) {
  return {
    "@type": "TouristDestination",
    "@id": `${pageUrl}#destination`,
    name: "Samandağ",
    containedInPlace: samandag.containedInPlace,
    geo: { "@type": "GeoCoordinates", latitude: 36.08, longitude: 35.97 },
    includesAttraction: guideFor(lang).places.map((p) => ({
      "@type": "TouristAttraction",
      name: p.name,
      description: p.text,
      url: `${pageUrl}#${p.id}`,
    })),
  };
}

function faq(lang: Lang, pageUrl: string) {
  return {
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    inLanguage: IN_LANGUAGE[lang],
    mainEntity: faqFor(lang).map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

function graph(lang: Lang, route: RouteDef) {
  const meta = route[lang];
  const pageUrl = url(meta.path);
  const home = route.key === "home";
  const local = ["home", "menu", "about", "contact", "guide"].includes(route.key) || Boolean(route.branch);

  const page = {
    "@type": PAGE_TYPE[route.key] ?? "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: meta.title,
    description: meta.description,
    inLanguage: IN_LANGUAGE[lang],
    isPartOf: { "@id": ID.site },
    about: { "@id": ID.org },
    primaryImageOfPage: { "@type": "ImageObject", url: url(IMAGE[route.key] ?? "/media/hero.jpg"), width: 1280, height: 720 },
    ...(home ? {} : { breadcrumb: { "@id": `${pageUrl}#breadcrumb` } }),
    ...(route.key === "menu" ? { mainEntity: { "@id": `${pageUrl}#menu` } } : {}),
    ...(route.branch ? { mainEntity: { "@id": ID.branch(route.branch) } } : {}),
    ...(route.key === "guide" ? { mainEntity: { "@id": `${pageUrl}#destination` } } : {}),
  };

  const nodes: object[] = [organization(lang), website(lang), page];
  if (!home) {
    nodes.push({
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: BRAND, item: url(pathFor("home", lang)) },
        { "@type": "ListItem", position: 2, name: meta.title.split(" | ")[0], item: pageUrl },
      ],
    });
  }
  if (local) nodes.push(...branchNodes(lang));
  if (home || route.key === "about") nodes.push(app(lang));
  if (route.key === "menu") nodes.push(menu(lang, pageUrl));
  if (route.key === "contact") nodes.push(faq(lang, pageUrl));
  if (route.key === "guide") nodes.push(guide(lang, pageUrl));

  // "<" escaped so no string can close the script tag
  return JSON.stringify({ "@context": "https://schema.org", "@graph": nodes }).replace(/</g, "\\u003c");
}

// ---------------------------------------------------------------- head

/** All per-page <head> tags; `route` is null for the 404 page. */
export function headTags(lang: Lang, route: RouteDef | null) {
  const meta = route ? route[lang] : NOT_FOUND[lang];
  const pageUrl = url(route ? meta.path : pathFor("home", lang));
  const image = url((route && IMAGE[route.key]) ?? "/media/hero.jpg");
  const [lat, lng] = [branches[0].lat.toFixed(4), branches[0].lng.toFixed(4)];

  const tags = [
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}" />`,
    route
      ? `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />`
      : `<meta name="robots" content="noindex" />`,
  ];

  if (route) {
    tags.push(
      `<link rel="canonical" href="${pageUrl}" />`,
      ...LANGS.map((l) => `<link rel="alternate" hreflang="${l}" href="${url(route[l].path)}" />`),
      `<link rel="alternate" hreflang="x-default" href="${url(route.en.path)}" />`,
    );
  }

  tags.push(
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${BRAND}" />`,
    `<meta property="og:locale" content="${LOCALE[lang]}" />`,
    ...LANGS.filter((l) => l !== lang).map((l) => `<meta property="og:locale:alternate" content="${LOCALE[l]}" />`),
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    `<meta property="og:url" content="${pageUrl}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:width" content="1280" />`,
    `<meta property="og:image:height" content="720" />`,
    `<meta property="og:image:alt" content="${esc(IMAGE_ALT[lang])}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(meta.title)}" />`,
    `<meta name="twitter:description" content="${esc(meta.description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    // regional hints (read by Bing / Yandex; harmless elsewhere)
    `<meta name="geo.region" content="TR-31" />`,
    `<meta name="geo.placename" content="${company.district}, ${company.city}" />`,
    `<meta name="geo.position" content="${lat};${lng}" />`,
    `<meta name="ICBM" content="${lat}, ${lng}" />`,
  );

  // LCP image: preload the hero still so it starts downloading before the stylesheet/JS
  if (route?.key === "home") {
    tags.push(
      `<link rel="preload" as="image" href="/media/hero-mobile.jpg" media="(max-width: 767px)" fetchpriority="high" />`,
      `<link rel="preload" as="image" href="/media/hero.jpg" media="(min-width: 768px)" fetchpriority="high" />`,
    );
  } else if (route && HERO_STILL[route.key]) {
    tags.push(`<link rel="preload" as="image" href="${HERO_STILL[route.key]}" fetchpriority="high" />`);
  }

  if (route) tags.push(`<script type="application/ld+json">${graph(lang, route)}</script>`);
  return tags.map((t) => `    ${t}`).join("\n");
}

/** sitemap.xml with hreflang alternates for every page. */
export function sitemap(lastmod: string) {
  const entries = ROUTES.flatMap((r) =>
    LANGS.map((l) => {
      const alts = LANGS.map((a) => `    <xhtml:link rel="alternate" hreflang="${a}" href="${url(r[a].path)}" />`)
        .concat(`    <xhtml:link rel="alternate" hreflang="x-default" href="${url(r.en.path)}" />`)
        .join("\n");
      return `  <url>\n    <loc>${url(r[l].path)}</loc>\n    <lastmod>${lastmod}</lastmod>\n${alts}\n  </url>`;
    }),
  );
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${entries.join("\n")}\n</urlset>\n`;
}
