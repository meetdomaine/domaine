import { getRelativeLocaleUrl } from "astro:i18n"
import { Translations } from "./locales"

export const getTranslationString = (string, locale) => {
  // console.log(`Locale: ${locale}`)
  if (locale && string.translations?.[locale]) return string.translations[locale]
  // console.log("No translation found.")
  if (string.text) return string.text
  // console.log("No fallback translation found.")
  return string
}

export const getTranslationRichContent = (content, locale) => {
  // console.log(`Locale: ${locale}`)
  if (locale && content.translations?.[locale]) return content.translations[locale]
  // console.log("No translation found.")
  if (content.richContent) return content.richContent
  // console.log("No fallback translation found.")
  return content
}

export const getLocaleUrl = (url, locale) => {
  if (locale) return getRelativeLocaleUrl(locale, url)
  return url
}

export const getLocaleString = (string, locale) => {
  if (!Translations[string]) return string
  if (locale && Translations[string].locales[locale]) return Translations[string].locales[locale]
  return Translations[string].name
}