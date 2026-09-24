import { motion } from "framer-motion";
import { useCopy, useHref, useLang } from "../lib/i18n";
import { useState } from "react";
import { useIsMobile } from "../lib/hooks";
import { EASE_CINE, reveal } from "../lib/motion";
import { branches, hours, INSTAGRAM } from "../lib/site";
import { CremaWave } from "./transitions/CremaWave";
import { Pill, TextLink } from "./ui/Pill";
import { RevealText } from "./ui/RevealText";

/*
 * Stylised, map-inspired composition — not a real map. The two points keep
 * their true relative position (≈3.0 km apart, the Atatürk branch slightly
 * north-east), with the sea to the west of the seaside Çiğdede branch.
 */
const W = 1440;
const H = 800;
const POINTS = [
  { x: 620, y: 430 },
  { x: 1040, y: 393 },
];
// desktop shows the whole board; mobile crops to the area around the points
const VIEW_DESKTOP = { x: 0, y: 0, w: W, h: H };
const VIEW_MOBILE = { x: 380, y: 150, w: 840, h: 560 };
const DISTANCE_KM = "3.0 km";

function MapArt({ view }: { view: typeof VIEW_DESKTOP }) {
  const contours = [0, 1, 2, 3, 4, 5, 6, 7];
  const [a, b] = POINTS;
  return (
    <svg
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
      viewBox={`${view.x} ${view.y} ${view.w} ${view.h}`}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern id="sea" width="14" height="14" patternUnits="userSpaceOnUse">
          <path d="M0 7h14" stroke="#f4ebdd" strokeOpacity="0.06" strokeWidth="1" />
        </pattern>
        <radialGradient id="glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#b98a5a" stopOpacity="0.28" />
          <stop offset="1" stopColor="#b98a5a" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* sea to the west */}
      <path d="M0 0H520C490 110 560 200 530 300C505 390 555 470 520 560C495 640 545 720 505 800H0Z" fill="url(#sea)" />
      <motion.path
        d="M520 0C490 110 560 200 530 300C505 390 555 470 520 560C495 640 545 720 505 800"
        fill="none"
        stroke="#b98a5a"
        strokeOpacity="0.55"
        strokeWidth="1.2"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2.4, ease: EASE_CINE }}
      />
      <text x="150" y="560" fill="#f4ebdd" fillOpacity="0.16" fontFamily="Inter Variable, Inter" fontSize="12" letterSpacing="7">
        MEDITERRANEAN
      </text>

      {/* inland contours */}
      {contours.map((i) => (
        <path
          key={i}
          d={`M${600 + i * 90} 800C${580 + i * 95} ${640 - i * 18} ${660 + i * 100} ${500 - i * 12} ${630 + i * 105} ${
            380 - i * 8
          }S${720 + i * 115} ${130 + i * 10} ${690 + i * 120} 0`}
          fill="none"
          stroke="#f4ebdd"
          strokeOpacity={0.045 + (i % 2) * 0.03}
          strokeWidth="1"
        />
      ))}
      {/* grid */}
      {Array.from({ length: 9 }, (_, i) => (
        <path key={`v${i}`} d={`M${i * 180} 0V${H}`} stroke="#f4ebdd" strokeOpacity="0.045" />
      ))}
      {Array.from({ length: 5 }, (_, i) => (
        <path key={`h${i}`} d={`M0 ${i * 200}H${W}`} stroke="#f4ebdd" strokeOpacity="0.045" />
      ))}

      {/* glow + crosshairs through both points */}
      {POINTS.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="200" fill="url(#glow)" />
          <line x1="0" y1={p.y} x2={W} y2={p.y} stroke="#b98a5a" strokeOpacity="0.16" />
          <line x1={p.x} y1="0" x2={p.x} y2={H} stroke="#b98a5a" strokeOpacity="0.16" />
        </g>
      ))}

      {/* route between the branches */}
      <motion.path
        d={`M${a.x} ${a.y} C ${a.x + 140} ${a.y + 70}, ${b.x - 160} ${b.y + 60}, ${b.x} ${b.y}`}
        fill="none"
        stroke="#e8d8c3"
        strokeOpacity="0.45"
        strokeWidth="1.2"
        strokeDasharray="3 7"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.8, ease: EASE_CINE, delay: 0.6 }}
      />
      <text x="1370" y="70" fill="#f4ebdd" fillOpacity="0.3" fontFamily="Inter Variable, Inter" fontSize="12" letterSpacing="3">
        N ↑
      </text>
    </svg>
  );
}

const COPY = {
  en: {
    aria: "Locations",
    eyebrow: "Locations / KCF 006",
    l1: "Find your",
    l2: "coordinates.",
    open: "Open daily · both branches",
    week: "7 days a week",
    apart: "branches apart",
    maps: "open in Google Maps",
    branch: "Branch",
    sea: "By the sea",
    directions: "Get directions",
    page: "Branch page",
    follow: "Follow on Instagram",
    // plain local copy — what people search for in Samandağ, written for people first
    body: `Koordinat Coffee — some call it Koordinat Cafe — is a coffee house with two branches in Samandağ, Hatay: Koordinat Coffee Factory in Çiğdede, close to the sea, and Koordinat Coffee in Atatürk. Every day from ${hours.open} to ${hours.close}: espresso, filter and Turkish coffee, breakfast, burgers, pasta, waffles and desserts. Looking for a café in Samandağ for breakfast, a long study session or a late-night coffee? Both coordinates are open.`,
  },
  tr: {
    aria: "Şubeler",
    eyebrow: "Şubeler / KCF 006",
    l1: "Koordinatını",
    l2: "bul.",
    open: "Her gün açık · iki şube",
    week: "haftanın 7 günü",
    apart: "şube arası",
    maps: "Google Haritalar'da aç",
    branch: "Şube",
    sea: "Deniz tarafı",
    directions: "Yol tarifi al",
    page: "Şube sayfası",
    follow: "Instagram'da takip et",
    body: `Koordinat Coffee — ya da çoğu kişinin dediği gibi Koordinat Cafe — Samandağ'da iki şubeli bir kahve evi: denize yakın Çiğdede'de Koordinat Coffee Factory, Atatürk Mahallesi'nde Koordinat Coffee. Her gün ${hours.open}'den ${hours.close}'ye kadar espresso, filtre ve Türk kahvesi, kahvaltı, burger, makarna, waffle ve tatlılar. Samandağ'da kahvaltı, ders çalışmak ya da gece geç saatte oturmak için bir cafe arıyorsan, iki koordinat da açık.`,
  },
};

export function LocationSection() {
  const t = useCopy(COPY);
  const lang = useLang();
  const href = useHref();
  const mobile = useIsMobile();
  const view = mobile ? VIEW_MOBILE : VIEW_DESKTOP;
  const [active, setActive] = useState<number | null>(null);

  // point position in % of the visible board
  const pos = (p: { x: number; y: number }) => ({
    left: `${((p.x - view.x) / view.w) * 100}%`,
    top: `${((p.y - view.y) / view.h) * 100}%`,
  });
  const mid = pos({ x: (POINTS[0].x + POINTS[1].x) / 2, y: (POINTS[0].y + POINTS[1].y) / 2 + 52 });

  return (
    <section id="location" data-theme="dark" className="relative z-10 bg-ink text-cream" aria-label={t.aria}>
      <CremaWave fill="#15110e" />
      <div className="relative mx-auto max-w-[1440px] px-6 pt-20 pb-24 md:px-10 md:pt-28 md:pb-32 lg:px-[6%]">
        {/* header */}
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <motion.p className="micro mb-6 text-amber" {...reveal}>
              {t.eyebrow}
            </motion.p>
            <RevealText
              className="display text-[clamp(2.8rem,6vw,6rem)]"
              lines={[t.l1, <em key="c" className="text-amber italic">{t.l2}</em>]}
            />
          </div>
          <motion.div className="md:col-span-4 md:text-right" {...reveal}>
            <p className="micro text-amber">{t.open}</p>
            <p className="display mt-2 text-[clamp(2.2rem,3.6vw,3.2rem)]">{hours.short}</p>
            <p className="micro mt-2 text-muted">{hours.days(lang)} · {t.week}</p>
          </motion.div>
          <motion.p className="max-w-[760px] text-[15px] leading-[1.8] text-foam/70 md:col-span-8" {...reveal}>
            {t.body}
          </motion.p>
        </div>

        {/* map board */}
        <motion.div
          className="relative mt-12 aspect-[3/2] overflow-hidden border border-cream/10 bg-[#120f0c] md:mt-16 md:aspect-[9/5]"
          initial={{ opacity: 0, clipPath: "inset(6% 6% 6% 6%)" }}
          whileInView={{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.1, ease: EASE_CINE }}
        >
          <MapArt view={view} />

          <span className="micro pointer-events-none absolute top-4 left-4 text-cream/40">Samandağ / Hatay</span>
          <span className="micro pointer-events-none absolute right-4 bottom-4 text-cream/40 max-md:hidden">
            2 {t.apart} · {DISTANCE_KM}
          </span>
          <span
            className="micro pointer-events-none absolute -translate-x-1/2 rounded-full border border-cream/15 bg-ink/80 px-3 py-1 text-[9px] text-foam/80"
            style={mid}
          >
            {DISTANCE_KM}
          </span>

          {branches.map((b, i) => {
            const on = active === i;
            return (
              <a
                key={b.id}
                href={b.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="open"
                onPointerEnter={() => setActive(i)}
                onPointerLeave={() => setActive(null)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                aria-label={`${b.name}, ${b.area} — ${t.maps}`}
                className="absolute flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
                style={pos(POINTS[i])}
              >
                <span className={`relative block size-3 transition-transform duration-500 ease-soft ${on ? "scale-150" : ""}`}>
                  <span className="pulse-ring" />
                  <span className="pulse-ring late" />
                  <span className="absolute inset-0 rounded-full bg-amber shadow-[0_0_22px_6px_rgba(185,138,90,0.55)]" />
                </span>
                <span
                  className={`pointer-events-none absolute top-1/2 -translate-y-1/2 whitespace-nowrap ${
                    i === 1 ? "right-full mr-1 text-right md:right-auto md:left-full md:ml-1 md:mr-0 md:text-left" : "left-full ml-1"
                  }`}
                >
                  <span className="micro block text-cream">
                    {b.n} <span className="max-md:hidden">· {b.area}</span>
                  </span>
                  <span className="micro mt-1 block text-[9px] text-muted max-md:hidden">
                    {b.dms.lat} / {b.dms.lng}
                  </span>
                </span>
              </a>
            );
          })}
        </motion.div>

        {/* branches */}
        <ul className="mt-6 grid gap-px bg-cream/10 md:grid-cols-2">
          {branches.map((b, i) => (
            <motion.li
              key={b.id}
              className={`p-6 transition-colors duration-500 md:p-8 ${active === i ? "bg-ink-2" : "bg-ink"}`}
              onPointerEnter={() => setActive(i)}
              onPointerLeave={() => setActive(null)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.8, ease: EASE_CINE, delay: i * 0.1 }}
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                <div>
                  <p className="micro text-amber">
                    {t.branch} {b.n}
                    {i === 0 && <span className="ml-2 text-muted">· {t.sea}</span>}
                  </p>
                  <h3 className="display mt-3 text-[clamp(2.2rem,3.6vw,3.2rem)]">{b.area}</h3>
                  <p className="mt-1 text-[13px] text-muted">{b.name}</p>
                </div>
                <span className="micro shrink-0 text-[9.5px] leading-relaxed text-cream/55 sm:text-right">
                  {b.dms.lat}
                  <br className="max-sm:hidden" />
                  <span className="sm:hidden"> / </span>
                  {b.dms.lng}
                </span>
              </div>
              <address className="mt-5 text-[14.5px] leading-relaxed text-foam/80 not-italic">
                {b.address}
                <br />
                {b.postcode} Samandağ / Hatay
              </address>
              <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-4">
                <Pill href={b.mapsUrl} external>
                  {t.directions}
                </Pill>
                <TextLink href={href(b.route)} className="text-cream">
                  {t.page}
                </TextLink>
              </div>
            </motion.li>
          ))}
        </ul>

        {/* sign-off line */}
        <div className="mt-16 flex flex-col gap-6 border-t border-cream/10 pt-10 md:mt-20 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="micro mb-2 text-muted">HATAY / TÜRKİYE</p>
            <motion.p
              className="display text-[clamp(3rem,9vw,8.5rem)] leading-[0.85] tracking-[-0.04em]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 1.1, ease: EASE_CINE }}
            >
              SAMANDAĞ
            </motion.p>
          </div>
          <TextLink href={INSTAGRAM} external className="text-cream md:pb-3">
            {t.follow}
          </TextLink>
        </div>
      </div>
    </section>
  );
}
