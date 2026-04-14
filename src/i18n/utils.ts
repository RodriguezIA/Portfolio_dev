import { ui, defaultLang, type Lang, type UIKeys } from "./ui";

export function getLangFromUrl(url: URL): Lang {
  const [, first] = url.pathname.split("/");
  if (first in ui) return first as Lang;
  return defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: UIKeys): string {
    const langUi = ui[lang] as Record<string, string>;
    const defaultUi = ui[defaultLang] as Record<string, string>;
    return langUi[key] ?? defaultUi[key] ?? key;
  };
}
