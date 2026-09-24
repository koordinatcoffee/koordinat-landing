import config from "../../site.config.mjs";
import { ROUTES, type Lang } from "../routes";

// Fields that may be left as `null` in the config; widen their inferred types.
type Company = Omit<typeof config.company, "legalName" | "taxOffice" | "taxNumber" | "phone"> & {
  legalName: string | null;
  taxOffice: string | null;
  taxNumber: string | null;
  phone: string | null;
};
const c = config.company as Company;

export const INSTAGRAM = config.instagram;
export const FACEBOOK = config.facebook;

// ---------------------------------------------------------------- branches
export type Branch = {
  id: string;
  name: string;
  area: string;
  address: string;
  postcode: string;
  lat: number;
  lng: number;
  mapsUrl: string;
};

/** 36.0812993 → 36° 04' 53" */
function dms(v: number) {
  const d = Math.trunc(v);
  const mFloat = (v - d) * 60;
  let m = Math.trunc(mFloat);
  let s = Math.round((mFloat - m) * 60);
  if (s === 60) {
    s = 0;
    m += 1;
  }
  return `${d}° ${String(m).padStart(2, "0")}' ${String(s).padStart(2, "0")}"`;
}

export const branches = (config.branches as Branch[]).map((b, i) => ({
  ...b,
  n: String(i + 1).padStart(2, "0"),
  full: `${b.address}, ${b.postcode} ${c.district} / ${c.city}`,
  dms: { lat: `${dms(b.lat)} N`, lng: `${dms(b.lng)} E` },
}));

/** The seaside branch (first in the config) is the site's reference coordinate. */
export const primary = branches[0];
export const COORDS = {
  ...primary.dms,
  decimal: { lat: primary.lat.toFixed(4), lng: primary.lng.toFixed(4) },
};
export const mapsUrl = primary.mapsUrl;

// ---------------------------------------------------------------- company
export const company = c;
export const email = c.email;
export const phone = c.phone;
/** "0536 616 6166" → "tel:+905366166166" */
export const telHref = phone ? `tel:${phone.replace(/[^\d+]/g, "").replace(/^0/, "+90")}` : null;

/** Registered (legal) address — used in contracts and data requests. */
export const address = {
  street: c.address,
  district: c.district,
  city: c.city,
  full: `${c.address}, ${c.postcode} ${c.district} / ${c.city}`,
};

export const hours = {
  open: config.hours.open,
  close: config.hours.close,
  short: `${config.hours.open} – ${config.hours.close}`,
  days: (lang: Lang) => (lang === "tr" ? config.hours.daysTr : config.hours.days),
  label: (lang: Lang) =>
    `${lang === "tr" ? config.hours.daysTr : config.hours.days}, ${config.hours.open} – ${config.hours.close}`,
};

export const stores = config.stores;
export const pickupHoldMinutes = config.pickupHoldMinutes;
export const stampsPerCard = config.stampsPerCard;
export const legalDate = (lang: Lang) => (lang === "tr" ? config.legalDateTr : config.legalDate);

/** Android users go to Google Play, everyone else to the App Store. */
export function appStoreUrl() {
  if (typeof navigator !== "undefined" && /android/i.test(navigator.userAgent)) return stores.googlePlay;
  return stores.appStore;
}

const ROW_LABELS: Record<Lang, string[]> = {
  en: ["Registered name", "Trading name", "Address", "Tax office", "Tax number", "MERSİS number", "Phone", "E-mail", "KEP address"],
  tr: ["Ticari ünvan", "İşletme adı", "Adres", "Vergi dairesi", "Vergi numarası", "MERSİS no", "Telefon", "E-posta", "KEP adresi"],
};

/** Seller rows for legal documents — empty fields are left out. `kind` is the English label. */
export const companyRows = (lang: Lang) => {
  const values = [
    c.legalName,
    c.tradeName,
    `${address.full}, ${c.country}`,
    c.taxOffice,
    c.taxNumber,
    c.mersis || null,
    c.phone,
    c.email,
    c.kep || null,
  ];
  return values
    .map((v, i) => ({ kind: ROW_LABELS.en[i], label: ROW_LABELS[lang][i], value: v }))
    .filter((r): r is { kind: string; label: string; value: string } => Boolean(r.value));
};

/** Controller name used in legal prose. */
export const controllerName: string = c.legalName ?? c.tradeName;
/** "Legal Name (“Trade Name”, “we”)" */
export const controllerIntro = (lang: Lang) => {
  const we = lang === "tr" ? "“İşletme”, “biz”" : "“we”";
  return c.legalName ? `${c.legalName} (“${c.tradeName}”, ${we})` : `${c.tradeName} (${we})`;
};

// ---------------------------------------------------------------- menu
type RawItem = { name: string; nameTr?: string; desc: string; descTr?: string; price: number };
type RawCategory = { id: string; group: "coffee" | "food" | "sweet"; title: string; titleTr?: string; items: RawItem[] };

export type MenuItem = { name: string; desc: string; price: number };
export type MenuCategory = { id: string; group: RawCategory["group"]; title: string; items: MenuItem[] };

const rawMenu = config.menu as RawCategory[];

export const menuFor = (lang: Lang): MenuCategory[] =>
  rawMenu.map((cat) => ({
    id: cat.id,
    group: cat.group,
    title: lang === "tr" ? (cat.titleTr ?? cat.title) : cat.title,
    items: cat.items.map((it) => ({
      name: lang === "tr" ? (it.nameTr ?? it.name) : it.name,
      desc: lang === "tr" ? (it.descTr ?? it.desc) : it.desc,
      price: it.price,
    })),
  }));

export const menuItemCount = rawMenu.reduce((n, cat) => n + cat.items.length, 0);

const tl = new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", maximumFractionDigits: 0 });
export const price = (n: number) => tl.format(n);

/** Lowest price in the group's lead category (so "Coffee from" is a coffee, not a tea). */
export const fromPrice = (group: MenuCategory["group"]) =>
  Math.min(...(rawMenu.find((m) => m.group === group)?.items.map((i) => i.price) ?? [0]));

// ---------------------------------------------------------------- links
export const legalLinks = (lang: Lang) =>
  ROUTES.filter((r) => r.legal).map((r) => ({
    key: r.key,
    href: r[lang].path,
    label: r[lang].title.split(" | ")[0],
  }));
