import type { ReactNode } from "react";
import type { RouteKey } from "../../routes";

export type LegalSection = { id: string; title: string; body: ReactNode };

export type LegalDoc = {
  key: RouteKey;
  /** Short name used in navigation, e.g. "Privacy Policy". */
  name: string;
  /** Headline lines for the hero (serif, masked reveal). */
  lines: ReactNode[];
  intro: ReactNode;
  summary?: ReactNode;
  sections: LegalSection[];
};
