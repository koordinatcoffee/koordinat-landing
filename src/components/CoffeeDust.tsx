import { useMemo, type CSSProperties } from "react";
import { useIsMobile } from "../lib/hooks";

/** ~20 warm dust/steam motes drifting on CSS loops — no JS animation frame. */
export function CoffeeDust({ count = 20 }: { count?: number }) {
  const mobile = useIsMobile();
  const n = mobile ? Math.round(count * 0.6) : count;

  const motes = useMemo(
    () =>
      Array.from({ length: n }, (_, i) => {
        // deterministic pseudo-random so the layout is stable across renders
        const r = (k: number) => {
          const v = Math.sin(i * 12.9898 + k * 78.233) * 43758.5453;
          return v - Math.floor(v);
        };
        const size = 1.5 + r(1) * 3;
        return {
          left: `${r(2) * 100}%`,
          top: `${r(3) * 100}%`,
          size,
          opacity: 0.05 + r(4) * 0.13,
          blur: size > 3.5 ? 1.5 : 0,
          duration: 18 + r(5) * 22,
          delay: -r(6) * 30,
          dx: `${(r(7) - 0.5) * 60}px`,
          dy: `${-40 - r(8) * 90}px`,
        };
      }),
    [n],
  );

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {motes.map((m, i) => (
        <span
          key={i}
          className="dust"
          style={
            {
              left: m.left,
              top: m.top,
              width: m.size,
              height: m.size,
              opacity: m.opacity,
              filter: m.blur ? `blur(${m.blur}px)` : undefined,
              animationDuration: `${m.duration}s`,
              animationDelay: `${m.delay}s`,
              "--dx": m.dx,
              "--dy": m.dy,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
