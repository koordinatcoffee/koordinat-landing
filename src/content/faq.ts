// Frequently asked questions — shown on the contact page and emitted as FAQPage
// structured data (src/seo.ts). Plain strings only: vite.config.ts imports this too.
// Everything is built from site.config.mjs, so answers stay in sync with the site.
import type { Lang } from "../routes";
import { branches, company, hours, menuFor, pickupHoldMinutes, stampsPerCard } from "../lib/site";

export type Faq = { q: string; a: string };

const list = (items: string[], and: string) =>
  items.length > 1 ? `${items.slice(0, -1).join(", ")} ${and} ${items[items.length - 1]}` : items.join("");

export function faqFor(lang: Lang): Faq[] {
  const food = menuFor(lang).find((c) => c.group === "food")?.items.slice(0, 5).map((i) => i.name) ?? [];
  const where = branches.map((b) => `${b.area} (${b.address})`);
  const names = list(branches.map((b) => `${b.name} (${b.area})`), lang === "tr" ? "ve" : "and");

  if (lang === "tr") {
    return [
      {
        q: "Koordinat Coffee nerede?",
        a: `Samandağ, Hatay'da iki şubemiz var: ${list(where, "ve")}. Çiğdede şubemiz denize yakın. Yol tarifi için bu sayfadaki şube satırlarına dokunabilirsin.`,
      },
      {
        q: "Koordinat Coffee ile Koordinat Coffee Factory aynı yer mi?",
        a: `Evet. ${names}, aynı işletmenin Samandağ'daki iki şubesidir; menü, fiyatlar ve Koordinat Coffee uygulaması ortaktır.`,
      },
      {
        q: "Çalışma saatleriniz nedir?",
        a: `İki şubemiz de ${hours.days("tr").toLowerCase()} ${hours.open}–${hours.close} arası açık: sabahın ilk kahvesinden gece geç saatlere kadar.`,
      },
      {
        q: "Kahvaltı ve yemek var mı?",
        a: `Evet. Kahvenin yanında ${list(food, "ve")} gibi seçenekler ile tatlılar sunuyoruz. Güncel liste ve fiyatlar menü sayfasında.`,
      },
      {
        q: "Uygulamadan sipariş verebilir miyim?",
        a: "Evet. Koordinat Coffee uygulaması App Store ve Google Play'de. Siparişini ver, kartla güvenle öde (PayTR, 3D Secure) ve hazır olduğunda şubeden sıra beklemeden teslim al.",
      },
      {
        q: "Adrese teslimat yapıyor musunuz?",
        a: `Hayır. Uygulama siparişleri yalnızca şubeden teslim (gel-al) usulüyle hazırlanır. Hazır bildiriminden sonra siparişin ${pickupHoldMinutes} dakika şubede seni bekler.`,
      },
      {
        q: "Sadakat kartı var mı?",
        a: `Evet, Papağan kartı. Tezgahtaki QR'ı okut; her ${stampsPerCard} damgada bir sonraki kahve bizden.`,
      },
      {
        q: "Ders çalışmak veya çalışmak için uygun mu?",
        a: `Evet. ${company.tradeName}'de ders çalışmak, çalışmak ve arkadaşlarla buluşmak için masalar var; gece geç saatlere kadar (${hours.close}) açığız.`,
      },
    ];
  }

  return [
    {
      q: "Where is Koordinat Coffee?",
      a: `We have two branches in Samandağ, Hatay: ${list(where, "and")}. The Çiğdede branch is close to the sea. Tap a branch on this page for directions.`,
    },
    {
      q: "Are Koordinat Coffee and Koordinat Coffee Factory the same place?",
      a: `Yes. ${names} are the two Samandağ branches of the same business, sharing one menu, one price list and the Koordinat Coffee app.`,
    },
    {
      q: "What are your opening hours?",
      a: `Both branches are open ${hours.days("en").toLowerCase()}, ${hours.open}–${hours.close}: from the first coffee of the morning until late at night.`,
    },
    {
      q: "Do you serve breakfast and food?",
      a: `Yes. Alongside coffee we serve ${list(food, "and")}, plus desserts. The current list and prices are on the menu page.`,
    },
    {
      q: "Can I order in the app?",
      a: "Yes. The Koordinat Coffee app is on the App Store and Google Play. Order, pay securely by card (PayTR, 3D Secure) and collect at the counter without queuing.",
    },
    {
      q: "Do you deliver?",
      a: `No. App orders are prepared for pickup in store only. Once you are notified that it is ready, your order waits for you for ${pickupHoldMinutes} minutes.`,
    },
    {
      q: "Is there a loyalty card?",
      a: `Yes, the Papağan card. Scan the QR at the counter; every ${stampsPerCard} stamps, the next coffee is on us.`,
    },
    {
      q: "Is it a good place to study or work?",
      a: `Yes. ${company.tradeName} has tables for studying, working and meeting friends, and we are open until ${hours.close}.`,
    },
  ];
}
