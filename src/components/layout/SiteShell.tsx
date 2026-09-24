import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";
import { useLang } from "../../lib/i18n";
import { Footer } from "../Footer";
import { Navbar } from "../Navbar";
import { PageCurtain } from "../transitions/PageCurtain";
import { SheetReveal } from "../transitions/SheetReveal";

type Props = {
  children: ReactNode;
  /** Colour of the last section — the footer then arrives as an opening sheet over it. */
  footerUnder?: string;
};

export function SiteShell({ children, footerUnder }: Props) {
  const lang = useLang();
  return (
    // reducedMotion="user": Framer drops transform animations when the OS asks for less motion
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="fixed top-3 left-3 z-[60] -translate-y-24 rounded-full bg-cream px-5 py-3 text-sm text-ink focus:translate-y-0"
      >
        {lang === "tr" ? "İçeriğe geç" : "Skip to content"}
      </a>
      <PageCurtain />
      <Navbar />
      <main id="main">{children}</main>
      {footerUnder ? (
        <SheetReveal under={footerUnder}>
          <Footer />
        </SheetReveal>
      ) : (
        <Footer />
      )}
    </MotionConfig>
  );
}
