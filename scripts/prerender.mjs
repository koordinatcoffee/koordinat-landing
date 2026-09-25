// Fills every built HTML page with its server-rendered markup.
// Runs after `vite build` and `vite build --ssr src/entry-server.tsx --outDir dist-ssr`.
import { readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

const OUT = "dist";
const SSR = "dist-ssr";
const { render, ROUTES, LANGS } = await import(pathToFileURL(join(SSR, "entry-server.js")).href);

// The stylesheet is small (~14 KB gzipped): inlining it removes one render-blocking request.
const CSS_LINK = /<link rel="stylesheet" crossorigin href="(\/_app\/[^"]+\.css)">/;
// Headline font files (the display serif, upright + italic): preloaded so hero headlines —
// the LCP on the home page — do not wait for the stylesheet to discover them.
const PRELOAD_FONTS = [/instrument-serif-latin-400-normal-[^)"]+\.woff2/, /instrument-serif-latin-400-italic-[^)"]+\.woff2/, /instrument-serif-latin-ext-400-italic-[^)"]+\.woff2/];

const inlineCss = (html) => {
  const m = html.match(CSS_LINK);
  if (!m) return html;
  const css = readFileSync(join(OUT, m[1]), "utf8").replace(/<\/style/gi, "<\\/style");
  const fonts = PRELOAD_FONTS.map((re) => css.match(re)?.[0]).filter(Boolean);
  const preloads = fonts.map((f) => `<link rel="preload" as="font" type="font/woff2" href="/_app/${f.split("/").pop()}" crossorigin />`);
  return html.replace(m[0], () => `${preloads.join("\n    ")}\n    <style>${css}</style>`);
};

const fill = (file, pathname) => {
  const html = readFileSync(file, "utf8");
  if (!html.includes('<div id="root"></div>')) throw new Error(`prerender: no empty #root in ${file}`);
  writeFileSync(file, inlineCss(html.replace('<div id="root"></div>', () => `<div id="root">${render(pathname)}</div>`)));
};

let n = 0;
for (const route of ROUTES) {
  for (const lang of LANGS) {
    const path = route[lang].path;
    fill(path === "/" ? join(OUT, "index.html") : join(OUT, path, "index.html"), path);
    n++;
  }
}
fill(join(OUT, "404.html"), "/404/");
rmSync(SSR, { recursive: true, force: true });
console.log(`prerender: ${n} pages + 404.html`);
