import { defaultLocale, isLocale, type Locale } from "./locales";

/**
 * The 404 pages do not follow the "/{locale}/{page}/" convention: static
 * hosts expect the default one at /404.html.
 */
const notFoundPaths: Record<Locale, string> = {
  en: "/404.html",
  fr: "/fr/404/",
};
const notFoundPage = /^404(\.html)?\/$/;

/**
 * Removes the locale prefix from a pathname, so the same page can be
 * addressed in any locale: "/fr/" -> "", "/fr/example/" -> "example/".
 */
function stripLocale(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  if (isLocale(segments[0]) && segments[0] !== defaultLocale) {
    segments.shift();
  }
  return segments.length > 0 ? `${segments.join("/")}/` : "";
}

/**
 * Returns the path of the same page in another locale:
 * localizePath("/fr/", "en") -> "/", localizePath("/", "fr") -> "/fr/".
 *
 * Single entry point for the language switch, the canonical URL and the
 * hreflang links. Translated slugs (/work/... <-> /fr/projets/...) will be
 * resolved here, on the locale-free page path.
 */
export function localizePath(pathname: string, locale: Locale): string {
  const page = stripLocale(pathname);
  if (notFoundPage.test(page)) {
    return notFoundPaths[locale];
  }
  return locale === defaultLocale ? `/${page}` : `/${locale}/${page}`;
}
