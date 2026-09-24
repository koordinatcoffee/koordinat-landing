import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";
import "@fontsource-variable/inter/wght.css";
import "./index.css";

import { lazy, StrictMode, Suspense } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { App, type PageSet } from "./App";
import { findRoute } from "./routes";

const PAGES: PageSet = {
  home: lazy(() => import("./pages/HomePage")),
  menu: lazy(() => import("./pages/MenuPage")),
  about: lazy(() => import("./pages/AboutPage")),
  contact: lazy(() => import("./pages/ContactPage")),
  legal: lazy(() => import("./pages/LegalPage")),
  notFound: lazy(() => import("./pages/NotFoundPage")),
};

const app = (
  <StrictMode>
    <Suspense fallback={<div className="min-h-dvh bg-ink" />}>
      <App pathname={location.pathname} pages={PAGES} />
    </Suspense>
  </StrictMode>
);

// Built pages arrive prerendered (scripts/prerender.mjs) and are hydrated in place.
// Dev and 404.html (served for any unknown path) render from scratch.
const root = document.getElementById("root")!;
if (root.firstElementChild && findRoute(location.pathname)) {
  hydrateRoot(root, app);
} else {
  root.textContent = "";
  createRoot(root).render(app);
}
