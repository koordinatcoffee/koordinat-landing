// Server entry for scripts/prerender.mjs: renders each page to HTML at build time,
// so search engines and link previews get the full content without running JavaScript.
import { StrictMode, Suspense } from "react";
import { renderToString } from "react-dom/server";
import { App, type PageSet } from "./App";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import HomePage from "./pages/HomePage";
import LegalPage from "./pages/LegalPage";
import MenuPage from "./pages/MenuPage";
import NotFoundPage from "./pages/NotFoundPage";

export { LANGS, ROUTES } from "./routes";

const PAGES: PageSet = {
  home: HomePage,
  menu: MenuPage,
  about: AboutPage,
  contact: ContactPage,
  legal: LegalPage,
  notFound: NotFoundPage,
};

/** Same tree as main.tsx (the Suspense boundary included) so hydration matches. */
export const render = (pathname: string) =>
  renderToString(
    <StrictMode>
      <Suspense fallback={<div className="min-h-dvh bg-ink" />}>
        <App pathname={pathname} pages={PAGES} />
      </Suspense>
    </StrictMode>,
  );
