import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Callout, ReadingProgress } from "../components/layout/DocParts";
import { PageHero } from "../components/layout/PageHero";
import { SiteShell } from "../components/layout/SiteShell";
import { CremaWave } from "../components/transitions/CremaWave";
import { LEGAL_DOCS, type LegalDoc } from "../content/legal";
import { EASE_CINE } from "../lib/motion";
import { useCopy, useLang } from "../lib/i18n";
import { company, legalDate } from "../lib/site";
import { pathFor, type RouteKey } from "../routes";

const COPY = {
  en: {
    legal: "Legal",
    of: "of",
    effective: "Effective",
    issued: "Issued by",
    sections: "Sections",
    onPage: "On this page",
    next: "Next document",
  },
  tr: {
    legal: "Yasal",
    of: "/",
    effective: "Yürürlük",
    issued: "Düzenleyen",
    sections: "Bölüm",
    onPage: "Bu sayfada",
    next: "Sonraki belge",
  },
};

const pad = (n: number) => String(n).padStart(2, "0");

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-25% 0px -65% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [ids]);
  return active;
}

function Toc({ doc, active }: { doc: LegalDoc; active: string }) {
  return (
    <ol className="border-l border-espresso/12">
      {doc.sections.map((s, i) => {
        const on = s.id === active;
        return (
          <li key={s.id} className="relative">
            <span
              aria-hidden="true"
              className={`absolute top-0 -left-px h-full w-px origin-top bg-coffee transition-transform duration-500 ease-soft ${on ? "scale-y-100" : "scale-y-0"}`}
            />
            <a
              href={`#${s.id}`}
              aria-current={on ? "true" : undefined}
              className={`flex min-h-[40px] items-baseline gap-3 py-1.5 pl-5 text-[13.5px] leading-snug transition-colors ${on ? "text-espresso" : "text-espresso/50 hover:text-espresso/80"}`}
            >
              <span className="micro text-[9.5px] text-coffee/70">{pad(i + 1)}</span>
              {s.title}
            </a>
          </li>
        );
      })}
    </ol>
  );
}

export default function LegalPage({ routeKey }: { routeKey: RouteKey }) {
  const lang = useLang();
  const t = useCopy(COPY);
  const docs = LEGAL_DOCS[lang];
  const doc = docs.find((d) => d.key === routeKey) ?? docs[0];
  const index = docs.indexOf(doc);
  const next = docs[(index + 1) % docs.length];
  const ids = doc.sections.map((s) => s.id);
  const active = useActiveSection(ids);

  return (
    <SiteShell footerUnder="#f4ebdd">
      <ReadingProgress />
      <PageHero
        eyebrow={`${t.legal} / ${pad(index + 1)} ${t.of} ${pad(docs.length)}`}
        code={`KCF / L-${pad(index + 1)}`}
        lines={doc.lines}
        intro={doc.intro}
        meta={[
          [t.effective, legalDate(lang)],
          [t.issued, company.tradeName],
          [t.sections, pad(doc.sections.length)],
        ]}
      />

      <section data-theme="light" className="relative z-10 bg-cream text-ink">
        <CremaWave fill="#f4ebdd" />
        <div className="mx-auto grid max-w-[1440px] gap-12 px-6 pt-20 pb-28 md:px-10 md:pt-28 lg:grid-cols-12 lg:gap-8 lg:px-[6%]">
          {/* table of contents — sticky rail on desktop, collapsible on mobile */}
          <aside className="lg:col-span-3">
            <nav aria-label={t.onPage} className="hidden lg:sticky lg:top-28 lg:block">
              <p className="micro mb-5 text-coffee">{t.onPage}</p>
              <Toc doc={doc} active={active} />
            </nav>
            <details className="group border-y border-espresso/15 lg:hidden">
              <summary className="micro flex min-h-[52px] cursor-pointer list-none items-center justify-between text-coffee">
                {t.onPage} · {pad(doc.sections.length)}
                <span aria-hidden="true" className="text-lg transition-transform group-open:rotate-45">+</span>
              </summary>
              <div className="pb-4">
                <Toc doc={doc} active={active} />
              </div>
            </details>
          </aside>

          {/* document */}
          <article className="lg:col-span-8 lg:col-start-5">
            {doc.summary && (
              <motion.div
                className="mb-16"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: EASE_CINE }}
              >
                <Callout>{doc.summary}</Callout>
              </motion.div>
            )}
            {doc.sections.map((s, i) => (
              <motion.section
                key={s.id}
                id={s.id}
                className="scroll-mt-28 border-t border-espresso/12 pt-8 pb-12"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, ease: EASE_CINE }}
              >
                <div className="grid gap-4 md:grid-cols-[88px_1fr]">
                  <span className="micro pt-2 text-coffee">{pad(i + 1)}</span>
                  <div>
                    <h2 className="display mb-6 text-[clamp(1.9rem,3vw,2.6rem)] leading-[1.05] text-espresso">{s.title}</h2>
                    <div className="prose-k">{s.body}</div>
                  </div>
                </div>
              </motion.section>
            ))}
            <p className="micro mt-6 text-espresso/45">
              {t.effective} {legalDate(lang)} · {company.legalName ?? company.tradeName}
            </p>
          </article>
        </div>

        {/* next document + index */}
        <div className="mx-auto max-w-[1440px] px-6 pb-32 md:px-10 lg:px-[6%]">
          <a
            href={pathFor(next.key, lang)}
            data-cursor="go"
            className="group flex flex-col gap-6 border-y border-espresso/15 py-10 md:flex-row md:items-end md:justify-between"
          >
            <div>
              <p className="micro mb-4 text-coffee">{t.next}</p>
              <p className="display text-[clamp(2.6rem,6vw,5.6rem)] text-espresso transition-transform duration-700 ease-soft group-hover:translate-x-3">
                {next.name}
              </p>
            </div>
            <span className="flex size-16 shrink-0 items-center justify-center rounded-full border border-espresso/25 transition-[transform,background-color,color] duration-700 ease-soft group-hover:rotate-45 group-hover:bg-espresso group-hover:text-cream">
              <ArrowUpRight className="size-5" strokeWidth={1.5} />
            </span>
          </a>
          <ul className="mt-10 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
            {docs.map((d, i) => (
              <li key={d.key} className="border-b border-espresso/10">
                <a
                  href={pathFor(d.key, lang)}
                  aria-current={d === doc ? "page" : undefined}
                  className="flex min-h-[52px] items-center gap-4 text-[14px] text-espresso/70 transition-colors hover:text-espresso aria-[current=page]:text-coffee"
                >
                  <span className="micro text-coffee/60">{pad(i + 1)}</span>
                  {d.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </SiteShell>
  );
}
