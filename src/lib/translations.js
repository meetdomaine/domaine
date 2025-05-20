import { getRelativeLocaleUrl } from "astro:i18n"

export const getTranslationString = (string, locale) => {
  if (locale && string.translations?.[locale]) return string.translations[locale]
  if (string.text) return string.text
  return string
}

export const getLocaleUrl = (url, locale) => {
  if (locale) return getRelativeLocaleUrl(locale, url)
  return url
}