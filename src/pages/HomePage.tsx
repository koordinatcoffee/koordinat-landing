import { AtmosphereSection } from "../components/AtmosphereSection";
import { CoffeeExperienceSection } from "../components/CoffeeExperienceSection";
import { CoffeeStorySection } from "../components/CoffeeStorySection";
import { CommunitySection } from "../components/CommunitySection";
import { FinalCTA } from "../components/FinalCTA";
import { HeroSection } from "../components/HeroSection";
import { SiteShell } from "../components/layout/SiteShell";
import { LocationSection } from "../components/LocationSection";
import { LoyaltySection } from "../components/LoyaltySection";
import { SignatureMenuSection } from "../components/SignatureMenuSection";
import { SheetReveal } from "../components/transitions/SheetReveal";

const CREAM = "#f4ebdd";
const FOAM = "#e8d8c3";
const INK = "#15110e";

/**
 * Light ↔ dark rhythm. Light sections rise into the dark ones with a crema
 * wave (inside the section); dark sections arrive as an opening sheet.
 */
export default function HomePage() {
  return (
    <SiteShell>
      <HeroSection />
      <CoffeeExperienceSection />
      <SheetReveal under={CREAM}>
        <CoffeeStorySection />
      </SheetReveal>
      <SignatureMenuSection />
      <SheetReveal under={CREAM}>
        <AtmosphereSection />
      </SheetReveal>
      <CommunitySection />
      <SheetReveal under={FOAM}>
        <LoyaltySection />
      </SheetReveal>
      <LocationSection />
      <SheetReveal under={INK}>
        <FinalCTA />
      </SheetReveal>
    </SiteShell>
  );
}
