import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useLayoutEffect, useState } from "react";
import { EASE_CINE } from "../../lib/motion";
import { COORDS } from "../../lib/site";
import { Wordmark } from "../Navbar";

const FLAG = "kcf-curtain";

const prefersReduced = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Page-to-page transition: an espresso curtain with a curved edge closes over
 * the page before an internal navigation, and lifts off the next page.
 */
export function PageCurtain() {
  // Read after mount (not in the initial state) so the prerendered HTML hydrates cleanly.
  // Until then, the inline script in index.html keeps the screen covered (html[data-curtain]).
  const [arriving, setArriving] = useState(false);
  const [leaving, setLeaving] = useState<string | null>(null);

  useLayoutEffect(() => {
    try {
      if (sessionStorage.getItem(FLAG) === "1") setArriving(true);
      sessionStorage.removeItem(FLAG);
    } catch {
      /* storage blocked */
    }
  }, []);

  useEffect(() => {
    document.documentElement.removeAttribute("data-curtain");
    if (arriving) {
      const t = setTimeout(() => setArriving(false), 50);
      return () => clearTimeout(t);
    }
  }, [arriving]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element).closest?.("a");
      if (!a || a.target || a.hasAttribute("download")) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin) return;
      if (url.pathname === location.pathname) return; // in-page anchors scroll natively
      if (prefersReduced()) return;
      e.preventDefault();
      setLeaving(url.href);
    };
    // back/forward cache: never restore a closed curtain
    const onShow = (e: PageTransitionEvent) => e.persisted && setLeaving(null);
    document.addEventListener("click", onClick);
    window.addEventListener("pageshow", onShow);
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("pageshow", onShow);
    };
  }, []);

  const go = () => {
    if (!leaving) return;
    try {
      sessionStorage.setItem(FLAG, "1");
    } catch {
      /* storage blocked */
    }
    location.href = leaving;
  };

  return (
    <AnimatePresence>
      {(arriving || leaving) && (
        <motion.div
          key={leaving ? "leave" : "arrive"}
          aria-hidden="true"
          className="fixed inset-x-0 -top-[12vh] z-[95] flex h-[124vh] items-center justify-center bg-ink text-cream"
          style={{
            borderRadius: leaving ? "50% 50% 0 0 / 12vh 12vh 0 0" : "0 0 50% 50% / 0 0 12vh 12vh",
          }}
          initial={leaving ? { y: "100%" } : { y: "0%" }}
          animate={{ y: "0%" }}
          exit={{ y: "-100%" }}
          transition={{ duration: leaving ? 0.6 : 0.85, ease: EASE_CINE }}
          onAnimationComplete={() => leaving && go()}
        >
          <div className="flex flex-col items-center gap-3">
            <Wordmark className="w-[132px]" />
            <span className="micro text-muted">
              {COORDS.lat} / {COORDS.lng}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
