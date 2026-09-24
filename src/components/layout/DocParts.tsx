import { motion, useScroll, useSpring } from "framer-motion";
import type { ReactNode } from "react";
import { useLang } from "../../lib/i18n";
import { address, branches, companyRows, email, hours, phone, telHref } from "../../lib/site";

/** Seller / controller details (only the fields filled in site.config.mjs). */
export function CompanyTable() {
  const lang = useLang();
  return (
    <table>
      <tbody>
        {companyRows(lang).map((r) => (
          <tr key={r.kind}>
            <th scope="row">{r.label}</th>
            <td>
              {r.kind === "E-mail" ? (
                <a href={`mailto:${r.value}`}>{r.value}</a>
              ) : r.kind === "Phone" && telHref ? (
                <a href={telHref}>{r.value}</a>
              ) : (
                r.value
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export const Email = () => <a href={`mailto:${email}`}>{email}</a>;
export const Addr = () => <>{address.full}</>;
export const Hours = () => <>{hours.label(useLang())}</>;
export const Phone = () => (phone && telHref ? <a href={telHref}>{phone}</a> : null);

/** Both pickup points, inline: "Çiğdede — address (map); Atatürk — address (map)". */
export const Branches = () => {
  const lang = useLang();
  return (
    <>
      {branches.map((b, i) => (
        <span key={b.id}>
          {i > 0 && "; "}
          <strong>{b.area}</strong> — {b.full} (
          <a href={b.mapsUrl} target="_blank" rel="noopener noreferrer">
            {lang === "tr" ? "harita" : "map"}
          </a>
          )
        </span>
      ))}
    </>
  );
};

/** Phone if configured, plus e-mail. */
export const Reach = () => {
  const lang = useLang();
  return phone && telHref ? (
    <>
      <a href={telHref}>{phone}</a> {lang === "tr" ? "veya" : "or"} <Email />
    </>
  ) : (
    <Email />
  );
};

export function Callout({ label, children }: { label?: string; children: ReactNode }) {
  const lang = useLang();
  return (
    <div className="relative border-l-2 border-amber bg-foam/60 py-5 pr-5 pl-6">
      <p className="micro mb-2 text-coffee">{label ?? (lang === "tr" ? "Kısaca" : "In short")}</p>
      <div className="font-serif text-[1.35rem] leading-snug text-espresso">{children}</div>
    </div>
  );
}

/** Thin amber reading bar pinned to the top of the viewport. */
export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30 });
  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-amber"
      style={{ scaleX }}
    />
  );
}
