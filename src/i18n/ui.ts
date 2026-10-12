import type { Locale } from "./locales";

/**
 * Interface strings. English is the reference: its keys define the
 * dictionary type, so a key missing or misspelled in another locale is a
 * type error and fails `npm run check`.
 */
const en = {
  "skip.toContent": "Skip to content",
  "header.home": "Noa Marchionni, home",
  "nav.label": "Main",
  "nav.work": "Work",
  "nav.method": "Method",
  "nav.experience": "Experience",
  "nav.contact": "Contact",
  "language.label": "Language",
  "footer.source": "Source code",
};

export type UiKey = keyof typeof en;
type UiDictionary = Record<UiKey, string>;

const fr: UiDictionary = {
  "skip.toContent": "Aller au contenu",
  "header.home": "Noa Marchionni, accueil",
  "nav.label": "Principale",
  "nav.work": "Projets",
  "nav.method": "Méthode",
  "nav.experience": "Expérience",
  "nav.contact": "Contact",
  "language.label": "Langue",
  "footer.source": "Code source",
};

const ui: Record<Locale, UiDictionary> = { en, fr };

export function t(locale: Locale, key: UiKey): string {
  return ui[locale][key];
}
