import { cookies } from 'next/headers'
import { TRANSLATIONS, LOCALE_META, type Locale, type Translations } from './translations'

/**
 * Server-side locale helper.
 * Reads the HOLOS_LOCALE cookie (set by LanguageContext on the client)
 * and returns the matching Translations object.
 * Falls back to English if the cookie is absent or invalid.
 */
export async function getServerStrings(): Promise<{ strings: Translations; locale: Locale; dateLocale: string }> {
  const cookieStore = await cookies()
  const raw = cookieStore.get('HOLOS_LOCALE')?.value as Locale | undefined
  const locale: Locale = (raw && TRANSLATIONS[raw]) ? raw : 'en'
  return {
    strings: TRANSLATIONS[locale],
    locale,
    dateLocale: LOCALE_META[locale].dateLocale,
  }
}
