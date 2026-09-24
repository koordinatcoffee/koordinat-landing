import type { CSSProperties } from "react";

const SRC = "/assets/img/logo-full.png";
const RATIO = "833 / 515";
// the wordmark starts at ~55% of the image height; above it is the parrot
const SPLIT = 55;

type Props = {
  /** "light" = for dark backgrounds: parrot in colour, wordmark in cream. */
  tone?: "color" | "light";
  className?: string;
  /** Decorative when a text label sits next to it. */
  decorative?: boolean;
};

/** The Koordinat Coffee Factory logo (parrot + wordmark). Size it with a width or height class. */
export function Logo({ tone = "light", className = "", decorative = false }: Props) {
  const label = decorative ? {} : { role: "img", "aria-label": "Koordinat Coffee Factory" };

  if (tone === "color") {
    return (
      <img
        src={SRC}
        alt={decorative ? "" : "Koordinat Coffee Factory"}
        width={833}
        height={515}
        className={`block h-auto ${className}`}
        draggable={false}
      />
    );
  }

  const mask: CSSProperties = {
    WebkitMaskImage: `url(${SRC})`,
    maskImage: `url(${SRC})`,
    WebkitMaskSize: "100% 100%",
    maskSize: "100% 100%",
    clipPath: `inset(${SPLIT}% 0 0 0)`,
  };

  return (
    <span className={`relative block ${className}`} style={{ aspectRatio: RATIO }} {...label}>
      <img
        src={SRC}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
        style={{ clipPath: `inset(0 0 ${100 - SPLIT}% 0)` }}
        draggable={false}
      />
      <span aria-hidden="true" className="absolute inset-0 bg-cream" style={mask} />
    </span>
  );
}
