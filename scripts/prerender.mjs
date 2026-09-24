// Fills every built HTML page with its server-rendered markup.
// Runs after `vite build` and `vite build --ssr src/entry-server.tsx --outDir dist-ssr`.
import { readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

const OUT = "dist";
const SSR = "dist-ssr";
const { render, ROUTES, LANGS } = await import(pathToFileURL(join(SSR, "entry-server.js")).href);

const fill = (file, pathname) => {
  const html = readFileSync(file, "utf8");
  if (!html.includes('<div id="root"></div>')) throw new Error(`prerender: no empty #root in ${file}`);
  writeFileSync(file, html.replace('<div id="root"></div>', `<div id="root">${render(pathname)}</div>`));
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
