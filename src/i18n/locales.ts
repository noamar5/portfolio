export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function isLocale(value: string | undefined): value is Locale {
  return locales.some((locale) => locale === value);
}

/**
 * Removes the locale prefix from a pathname, so the same page can be
 * addressed in any locale: "/fr/" -> "", "/fr/example/" -> "example/".
 */
export function stripLocale(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  if (isLocale(segments[0]) && segments[0] !== defaultLocale) {
    segments.shift();
  }
  return segments.length > 0 ? `${segments.join("/")}/` : "";
}
