import { useEffect, type ComponentType } from "react";
import { LangProvider } from "./lib/i18n";
import { findRoute, langOfPath, NOT_FOUND, type RouteKey } from "./routes";

/** The page components — lazy in the browser (main.tsx), eager when prerendering (entry-server.tsx). */
export type PageSet = {
  home: ComponentType;
  menu: ComponentType;
  about: ComponentType;
  contact: ComponentType;
  guide: ComponentType;
  branch: ComponentType<{ branchId: string }>;
  legal: ComponentType<{ routeKey: RouteKey }>;
  notFound: ComponentType;
};

export function App({ pathname, pages }: { pathname: string; pages: PageSet }) {
  const match = findRoute(pathname);
  const lang = match?.lang ?? langOfPath(pathname);
  const key = match?.route.key ?? null;

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = match ? match.route[lang].title : NOT_FOUND[lang].title;
    // content renders after load, so jump to #hash ourselves
    if (location.hash) {
      const t = setTimeout(() => {
        document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView({ behavior: "smooth" });
      }, 350);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, lang]);

  const Component =
    key === "home" || key === "menu" || key === "about" || key === "contact" || key === "guide" ? pages[key] : undefined;
  const { legal: LegalPage, branch: BranchPage, notFound: NotFoundPage } = pages;
  const page = !match ? (
    <NotFoundPage />
  ) : match.route.legal ? (
    <LegalPage routeKey={match.route.key} />
  ) : match.route.branch ? (
    <BranchPage branchId={match.route.branch} />
  ) : Component ? (
    <Component />
  ) : (
    <NotFoundPage />
  );
  return (
    <LangProvider lang={lang} routeKey={key}>
      {page}
    </LangProvider>
  );
}
