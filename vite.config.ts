import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import config from "./site.config.mjs";
import { findRoute, LANGS, ROUTES, type Lang, type RouteDef } from "./src/routes";
import { headTags, sitemap } from "./src/seo";

/** Per-page <head>: the language attribute plus everything from src/seo.ts. */
function withMeta(html: string, lang: Lang, route: RouteDef | null) {
  return html
    .replace(/<html lang="[^"]*">/, `<html lang="${lang}">`)
    .replace(/ *<!--seo:[^>]*-->/, headTags(lang, route));
}

/**
 * Multi-page output from one React bundle:
 * dist/<route>/index.html for every route, plus 404.html, sitemap.xml and robots.txt.
 * The page markup itself is filled in afterwards by scripts/prerender.mjs.
 */
function pages(): Plugin {
  let outDir = "dist";
  let ssr = false;
  return {
    name: "koordinat-pages",
    configResolved(c) {
      outDir = c.build.outDir;
      ssr = Boolean(c.build.ssr);
    },
    buildStart() {
      if (ssr) return;
      const c = config.company as Record<string, unknown>;
      const missing = ["legalName", "taxOffice", "taxNumber", "phone"].filter((k) => c[k] == null);
      if (missing.length) {
        this.warn(
          `site.config.mjs: boş alanlar → ${missing.map((k) => `company.${k}`).join(", ")}. ` +
            `Sitede gizleniyorlar; PayTR başvurusundan önce doldurun.`,
        );
      }
    },
    // dev: correct <title>/description per route as well
    transformIndexHtml(html, ctx) {
      if (!ctx.server) return html;
      const url = ctx.originalUrl?.split("?")[0] ?? "/";
      const match = findRoute(url);
      return withMeta(html, match?.lang ?? (url.startsWith("/tr") ? "tr" : "en"), match?.route ?? null);
    },
    writeBundle() {
      if (ssr) return;
      const base = readFileSync(join(outDir, "index.html"), "utf8");
      for (const route of ROUTES) {
        for (const lang of LANGS) {
          const path = route[lang].path;
          const file = path === "/" ? join(outDir, "index.html") : join(outDir, path, "index.html");
          mkdirSync(dirname(file), { recursive: true });
          writeFileSync(file, withMeta(base, lang, route));
        }
      }
      writeFileSync(join(outDir, "404.html"), withMeta(base, "en", null));
      writeFileSync(join(outDir, "sitemap.xml"), sitemap(new Date().toISOString().slice(0, 10)));
      writeFileSync(join(outDir, "robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${config.siteUrl}/sitemap.xml\n`);
    },
  };
}

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react(), tailwindcss(), pages()],
  build: {
    outDir: "dist",
    assetsDir: "_app",
    // the server bundle (scripts/prerender.mjs) only renders HTML — no media copy
    copyPublicDir: !isSsrBuild,
  },
}));
