import type { Lang } from "../../routes";
import * as enPrivacy from "./en-privacy";
import * as enSales from "./en-sales";
import * as trPrivacy from "./tr-privacy";
import * as trSales from "./tr-sales";
import type { LegalDoc } from "./types";

const order = (m: Record<string, LegalDoc>): LegalDoc[] => [
  m.preInformation,
  m.distanceSales,
  m.cancellation,
  m.pickup,
  m.payment,
  m.privacy,
  m.kvkk,
  m.cookies,
  m.terms,
];

/** Order = order in navigation and in the footer. */
export const LEGAL_DOCS: Record<Lang, LegalDoc[]> = {
  en: order({ ...enSales, ...enPrivacy }),
  tr: order({ ...trSales, ...trPrivacy }),
};

export type { LegalDoc };
