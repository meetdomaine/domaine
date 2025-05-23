import { getRelativeLocaleUrl } from "astro:i18n"
import { Translations } from "./locales"

export const getTranslationString = (string, locale) => {
  if (locale && string.translations?.[locale]) return string.translations[locale]
  if (string.text) return string.text
  return string
}

export const getLocaleUrl = (url, locale) => {
  if (locale) return getRelativeLocaleUrl(locale, url)
  return url
}

export const getLocaleString = (string, locale) => {
  if (!Translations[string]) return string
  if (locale) return Translations[string].locales[locale]
  return Translations[string].name
}