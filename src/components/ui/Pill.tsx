import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef, useState, type ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "cream" | "ghost" | "dark";
  /** Warm ring that expands on hover/click — keep for key coffee CTAs only. */
  ring?: boolean;
  external?: boolean;
  className?: string;
  onClick?: () => void;
};

const styles = {
  cream: "bg-cream text-ink hover:bg-[#fbf5ec] hover:shadow-[0_10px_40px_-12px_rgba(185,138,90,0.55)]",
  dark: "bg-ink text-cream hover:bg-espresso hover:shadow-[0_10px_40px_-12px_rgba(21,17,14,0.6)]",
  ghost: "border border-cream/30 text-cream hover:border-cream/70 hover:bg-cream/5",
};

export function Pill({ href, children, variant = "cream", ring = false, external, className = "", onClick }: Props) {
  const [rings, setRings] = useState<number[]>([]);
  const last = useRef(0);

  const spawn = () => {
    if (!ring) return;
    const now = Date.now();
    if (now - last.current < 500) return;
    last.current = now;
    setRings((r) => [...r, now]);
  };

  return (
    <a
      href={href}
      onClick={() => {
        spawn();
        onClick?.();
      }}
      onPointerEnter={spawn}
      data-cursor="go"
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group relative inline-flex min-h-[48px] items-center gap-3 rounded-full px-7 text-[11.5px] font-medium tracking-[0.2em] uppercase transition-[transform,background-color,box-shadow,border-color] duration-500 ease-soft hover:scale-[1.03] active:scale-[0.99] ${styles[variant]} ${className}`}
    >
      <AnimatePresence>
        {rings.map((id) => (
          <motion.span
            key={id}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-full border-2 border-amber/70 bg-amber/10"
            initial={{ opacity: 0.25, scale: 0.6 }}
            animate={{ opacity: 0, scale: 1.5 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            onAnimationComplete={() => setRings((r) => r.filter((x) => x !== id))}
          />
        ))}
      </AnimatePresence>
      <span className="relative">{children}</span>
      <ArrowRight
        aria-hidden="true"
        className="relative size-4 transition-transform duration-500 ease-soft group-hover:translate-x-1"
        strokeWidth={1.5}
      />
    </a>
  );
}

/** Underlined text CTA. */
export function TextLink({
  href,
  children,
  external,
  className = "",
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
}) {
  return (
    <a
      href={href}
      data-cursor="open"
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group relative inline-flex min-h-[44px] items-center gap-2 text-[11.5px] font-medium tracking-[0.2em] uppercase ${className}`}
    >
      <span className="relative">
        {children}
        <span className="absolute -bottom-1 left-0 h-px w-full origin-left bg-current opacity-40 transition-transform duration-500 ease-soft group-hover:scale-x-[0.4]" />
      </span>
    </a>
  );
}
