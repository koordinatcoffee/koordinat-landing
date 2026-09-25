import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  /** Omit when a separate <img> behind the video shows the first frame (heroes, for a fast LCP). */
  poster?: string;
  className?: string;
  /** Hero only: load immediately with preload="auto". */
  eager?: boolean;
  /** Extra play condition, e.g. the active step of a sequence. */
  active?: boolean;
};

/**
 * Decorative background video.
 * Below-the-fold videos get their src only when near the viewport,
 * and every video pauses when it is off screen (or not active).
 */
export function LazyVideo({ src, poster, className = "", eager = false, active = true }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [near, setNear] = useState(eager);
  const [visible, setVisible] = useState(eager);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // React does not reliably reflect `muted` as an attribute; iOS needs it for autoplay.
    el.muted = true;
    el.defaultMuted = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
        if (entry.isIntersecting) setNear(true);
      },
      { rootMargin: "300px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const shouldLoad = near && (active || eager);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (shouldLoad) setLoaded(true);
  }, [shouldLoad]);

  useEffect(() => {
    const el = ref.current;
    if (!el || !loaded) return;
    if (visible && active) {
      el.play().catch(() => {
        /* autoplay blocked (low-power mode) — poster stays visible */
      });
    } else {
      el.pause();
    }
  }, [visible, active, loaded]);

  return (
    <video
      ref={ref}
      className={className}
      src={loaded ? src : undefined}
      poster={poster}
      muted
      autoPlay={eager}
      playsInline
      loop
      preload={eager ? "auto" : "none"}
      aria-hidden="true"
      tabIndex={-1}
      disablePictureInPicture
    />
  );
}
