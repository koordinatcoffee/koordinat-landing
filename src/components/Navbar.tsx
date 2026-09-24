import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, type MouseEvent } from "react";
import { useCopy, useHref, useLang, useRouteKey } from "../lib/i18n";
import { EASE_CINE } from "../lib/motion";
import { COORDS, INSTAGRAM } from "../lib/site";
import { pathFor, type Lang } from "../routes";
import { Logo } from "./ui/Logo";

const COPY = {
  en: { menu: "Menu", story: "Our Story", experience: "Experience", location: "Location", contact: "Contact Us", open: "Menu", close: "Close", home: "Koordinat Coffee Factory — home", nav: "Main", lang: "Language" },
  tr: { menu: "Menü", story: "Hikayemiz", experience: "Deneyim", location: "Konum", contact: "Bize Ulaşın", open: "Menü", close: "Kapat", home: "Koordinat Coffee Factory — ana sayfa", nav: "Ana menü", lang: "Dil" },
};

export function Wordmark({ className = "w-[66px] md:w-[76px]" }: { className?: string }) {
  return <Logo className={className} />;
}

/** EN / TR switch — links to the same page in the other language. */
export function LangSwitch({ className = "" }: { className?: string }) {
  const lang = useLang();
  const key = useRouteKey();
  const t = useCopy(COPY);
  const target = (l: Lang) => pathFor(key ?? "home", l);
  return (
    <div role="group" aria-label={t.lang} className={`flex items-center rounded-full border border-cream/20 p-0.5 ${className}`}>
      {(["en", "tr"] as Lang[]).map((l) => (
        <a
          key={l}
          href={target(l)}
          hrefLang={l}
          lang={l}
          aria-current={l === lang ? "true" : undefined}
          className={`micro flex min-h-[36px] min-w-[40px] items-center justify-center rounded-full px-2.5 text-[10px] transition-colors duration-300 ${
            l === lang ? "bg-cream text-ink" : "text-cream/70 hover:text-cream"
          }`}
        >
          {l.toUpperCase()}
        </a>
      ))}
    </div>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const t = useCopy(COPY);
  const href = useHref();
  const key = useRouteKey();

  const links = [
    { href: href("menu"), label: t.menu, current: key === "menu" },
    { href: href("home", "story"), label: t.story },
    { href: href("home", "experience"), label: t.experience },
    { href: href("home", "location"), label: t.location },
  ];
  const contact = href("contact");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // mobile menu: same-page anchors must wait for the menu (and scroll lock) to close
  const onMobileLink = (e: MouseEvent<HTMLAnchorElement>, to: string) => {
    const url = new URL(to, location.href);
    setOpen(false);
    if (url.pathname === location.pathname && url.hash) {
      e.preventDefault();
      setTimeout(() => document.getElementById(url.hash.slice(1))?.scrollIntoView({ behavior: "smooth" }), 80);
      history.replaceState(null, "", url.hash);
    }
  };

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE_CINE, delay: key === "home" ? 0.7 : 0.2 }}
        className="fixed inset-x-0 top-0 z-50 px-4 pt-[max(12px,env(safe-area-inset-top))] md:px-6"
        data-theme="dark"
      >
        <nav
          aria-label={t.nav}
          className={`mx-auto flex h-14 max-w-[1320px] items-center justify-between gap-4 rounded-full border px-4 transition-[background-color,border-color,backdrop-filter] duration-[400ms] md:px-5 ${
            scrolled || open ? "border-cream/10 bg-ink/75 backdrop-blur-xl" : "border-transparent bg-transparent"
          }`}
        >
          <a href={href("home")} className="flex min-h-[44px] shrink-0 items-center" aria-label={t.home}>
            <Wordmark />
          </a>

          <ul className="hidden items-center gap-8 lg:flex xl:gap-9">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  aria-current={l.current ? "page" : undefined}
                  className="group relative inline-flex min-h-[44px] items-center text-[13px] whitespace-nowrap text-cream/80 transition-colors hover:text-cream aria-[current=page]:text-cream"
                >
                  {l.label}
                  <span className="absolute bottom-2.5 left-0 h-px w-full origin-left scale-x-0 bg-amber transition-transform duration-500 ease-soft group-hover:scale-x-100 group-aria-[current=page]:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-3 lg:flex">
            <LangSwitch />
            <a
              href={contact}
              data-cursor="go"
              className="inline-flex min-h-[40px] items-center rounded-full border border-cream/25 px-5 text-[10.5px] font-medium tracking-[0.2em] whitespace-nowrap text-cream uppercase transition-colors duration-500 hover:border-cream hover:bg-cream hover:text-ink"
            >
              {t.contact}
            </a>
          </div>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="micro flex min-h-[44px] min-w-[44px] items-center justify-end gap-2 text-cream lg:hidden"
          >
            <span className="relative block h-2 w-5" aria-hidden="true">
              <span
                className={`absolute left-0 h-px w-full bg-current transition-transform duration-500 ${open ? "top-1 rotate-45" : "top-0"}`}
              />
              <span
                className={`absolute left-0 h-px bg-current transition-all duration-500 ${open ? "top-1 w-full -rotate-45" : "top-2 w-3"}`}
              />
            </span>
            {open ? t.close : t.open}
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            data-theme="dark"
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-ink px-6 pt-[calc(96px+env(safe-area-inset-top))] pb-[max(32px,env(safe-area-inset-bottom))] lg:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: EASE_CINE }}
          >
            <ul className="flex flex-col gap-1">
              {links.map((l, i) => (
                <li key={l.href} className="overflow-hidden border-b border-cream/10">
                  <motion.a
                    href={l.href}
                    onClick={(e) => onMobileLink(e, l.href)}
                    className="flex min-h-[64px] items-baseline justify-between py-2"
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.7, ease: EASE_CINE, delay: 0.15 + i * 0.06 }}
                  >
                    <span className="display text-[clamp(2.4rem,11vw,3rem)] text-cream">{l.label}</span>
                    <span className="micro text-muted">0{i + 1}</span>
                  </motion.a>
                </li>
              ))}
            </ul>
            <a
              href={contact}
              onClick={() => setOpen(false)}
              className="mt-8 inline-flex min-h-[52px] items-center justify-center rounded-full bg-cream text-[11px] font-medium tracking-[0.2em] text-ink uppercase"
            >
              {t.contact}
            </a>
            <LangSwitch className="mt-5 self-start" />
            <div className="mt-auto flex items-end justify-between pt-10 text-muted">
              <span className="micro">
                {COORDS.lat}
                <br />
                {COORDS.lng}
              </span>
              <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className="micro min-h-[44px] content-end">
                Instagram ↗
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
