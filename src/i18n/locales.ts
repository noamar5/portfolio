export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

/** Name of each locale in its own language, not translated. */
export const localeNames: Record<Locale, string> = {
  en: "English",
  fr: "Français",
};

export function isLocale(value: string | undefined): value is Locale {
  return locales.some((locale) => locale === value);
}
