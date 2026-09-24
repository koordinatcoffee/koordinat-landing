import { useEffect, useState } from "react";

// Starts from `fallback` on the server AND on the first client render, so hydration
// of the prerendered HTML matches; the real value lands right after mount.
function useMedia(query: string, fallback = false) {
  const [matches, setMatches] = useState(fallback);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setMatches(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);
  return matches;
}

/** Desktop with a real mouse — enables parallax and the custom cursor. */
export const useFinePointer = () => useMedia("(hover: hover) and (pointer: fine) and (min-width: 1024px)");

export const useIsMobile = () => useMedia("(max-width: 767px)");

export const useReducedMotionPref = () => useMedia("(prefers-reduced-motion: reduce)");
