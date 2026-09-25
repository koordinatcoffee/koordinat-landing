// /app-download/ — one link for QR codes, posters and bios that opens the right app store.
// iPhone/iPad → App Store and Android → Google Play are redirected by Vercel (vercel.json, "has"
// user-agent rules) before this page is ever served. This page is the fallback: desktops, iPads
// that report a Mac user agent, and local preview. It re-checks the device in JS and otherwise
// shows both store buttons. Written to dist/ by vite.config.ts (and served in dev).
import config from "../site.config.mjs";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

export function appDownloadHtml() {
  const ios = esc(config.stores.appStore);
  const android = esc(config.stores.googlePlay);
  return `<!doctype html>
<html lang="tr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
    <title>Koordinat Coffee uygulamasını indir</title>
    <meta name="description" content="Koordinat Coffee uygulaması: App Store ve Google Play." />
    <meta name="robots" content="noindex, follow" />
    <meta name="theme-color" content="#15110E" />
    <link rel="icon" href="/favicon.png" type="image/png" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    <script>
      (function () {
        var ua = navigator.userAgent;
        // iPadOS Safari identifies as a Mac; a touch screen gives it away
        var isIos = /iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
        var isAndroid = /Android/i.test(ua);
        if (isIos) location.replace("${ios}");
        else if (isAndroid) location.replace("${android}");
      })();
    </script>
    <style>
      :root { color-scheme: dark; }
      * { box-sizing: border-box; }
      body {
        margin: 0; min-height: 100dvh; display: grid; place-items: center; padding: 32px 16px;
        background: #15110e; color: #f4ebdd;
        font-family: "Inter Variable", Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
        -webkit-font-smoothing: antialiased; text-align: center;
      }
      main { width: 100%; max-width: 420px; }
      /* same "light" logo as the site (src/components/ui/Logo.tsx): parrot in colour, wordmark in cream */
      .logo { position: relative; display: block; width: 150px; aspect-ratio: 833 / 515; margin: 0 auto; }
      .logo img { position: absolute; inset: 0; width: 100%; height: 100%; clip-path: inset(0 0 45% 0); }
      .logo span {
        position: absolute; inset: 0; background: #f4ebdd; clip-path: inset(55% 0 0 0);
        -webkit-mask: url(/assets/img/logo-full.png) 0 0 / 100% 100%; mask: url(/assets/img/logo-full.png) 0 0 / 100% 100%;
      }
      h1 { margin: 28px 0 8px; font: 400 clamp(2rem, 8vw, 2.6rem)/1.05 Georgia, "Times New Roman", serif; letter-spacing: -0.01em; }
      p { margin: 0; color: #a8998a; font-size: 15px; line-height: 1.6; }
      .stores { display: grid; gap: 12px; margin-top: 32px; }
      a.store {
        display: flex; align-items: center; justify-content: center; gap: 10px; min-height: 56px; border-radius: 999px;
        background: #f4ebdd; color: #15110e; text-decoration: none; font-size: 12px; font-weight: 600;
        letter-spacing: 0.18em; text-transform: uppercase;
      }
      a.store.alt { background: transparent; color: #f4ebdd; border: 1px solid rgba(244, 235, 221, 0.3); }
      a.store:focus-visible { outline: 1.5px solid #b98a5a; outline-offset: 4px; }
      svg { width: 18px; height: 18px; fill: currentColor; }
      .back { display: inline-block; margin-top: 28px; color: #a8998a; font-size: 13px; }
      .en { margin-top: 6px; font-size: 13px; opacity: 0.75; }
    </style>
  </head>
  <body>
    <main>
      <span class="logo" role="img" aria-label="Koordinat Coffee Factory">
        <img src="/assets/img/logo-full.png" alt="" /><span></span>
      </span>
      <h1>Uygulamayı indir</h1>
      <p>Menü, önceden sipariş, kartla ödeme ve Papağan sadakat kartı.</p>
      <p class="en">Get the Koordinat Coffee app.</p>
      <div class="stores">
        <a class="store" href="${ios}" rel="noopener">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16.37 12.6c-.02-2.3 1.88-3.4 1.96-3.46-1.07-1.56-2.73-1.77-3.32-1.8-1.41-.14-2.76.83-3.47.83-.72 0-1.82-.81-2.99-.79-1.54.02-2.96.9-3.75 2.27-1.6 2.78-.41 6.89 1.15 9.14.76 1.1 1.67 2.34 2.86 2.3 1.15-.05 1.58-.74 2.97-.74 1.38 0 1.77.74 2.98.72 1.23-.02 2.01-1.12 2.76-2.23.87-1.28 1.23-2.52 1.25-2.58-.03-.01-2.39-.92-2.4-3.66zM14.1 5.86c.63-.77 1.06-1.83.94-2.89-.91.04-2.02.61-2.67 1.37-.58.67-1.09 1.76-.96 2.8 1.02.08 2.06-.52 2.69-1.28z"/></svg>
          App Store
        </a>
        <a class="store alt" href="${android}" rel="noopener">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3.6 2.2c-.2.2-.3.6-.3 1v17.6c0 .4.1.8.3 1l.1.1 9.9-9.9v-.2L3.7 2.1l-.1.1zm13.3 13.2-3.3-3.3v-.2l3.3-3.3.1.1 3.9 2.2c1.1.6 1.1 1.7 0 2.3l-3.9 2.2h-.1zm-.1.1L13.4 12 3.6 21.8c.4.4 1 .4 1.7.1l11.5-6.4M16.8 8.5 5.3 2c-.7-.4-1.3-.3-1.7.1l9.8 9.8 3.4-3.4z"/></svg>
          Google Play
        </a>
      </div>
      <a class="back" href="/tr/">koordinatcoffee.com</a>
    </main>
    <script>
      window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
    </script>
    <script defer src="/_vercel/insights/script.js"></script>
  </body>
</html>
`;
}
