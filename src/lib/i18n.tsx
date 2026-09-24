import { createContext, useContext, type ReactNode } from "react";
import { pathFor, type Lang, type RouteKey } from "../routes";

type Ctx = { lang: Lang; routeKey: RouteKey | null };
const LangContext = createContext<Ctx>({ lang: "en", routeKey: null });

export function LangProvider({ lang, routeKey, children }: Ctx & { children: ReactNode }) {
  return <LangContext.Provider value={{ lang, routeKey }}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext).lang;
export const useRouteKey = () => useContext(LangContext).routeKey;

/** Localised path for a route, with an optional in-page #hash. */
export function useHref() {
  const lang = useLang();
  return (key: RouteKey, hash?: string) => `${pathFor(key, lang)}${hash ? `#${hash}` : ""}`;
}

/** Pick the copy block for the current language: `const t = useCopy(COPY)`. */
export function useCopy<T>(copy: Record<Lang, T>): T {
  return copy[useLang()];
}
