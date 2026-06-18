'use client'
import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import {
  type Locale,
  type Translations,
  TRANSLATIONS,
  LOCALE_META,
  RTL_LOCALES,
  getTranslation,
} from '@/lib/i18n/translations'

interface LanguageContextValue {
  locale: Locale
  t: (key: string) => string
  strings: Translations
  setLocale: (l: Locale) => void
  isRTL: boolean
  dir: 'ltr' | 'rtl'
}

const LanguageContext = createContext<LanguageContextValue>({
  locale: 'en',
  t: (key) => key,
  strings: TRANSLATIONS.en,
  setLocale: () => {},
  isRTL: false,
  dir: 'ltr',
})

const COOKIE_KEY = 'HOLOS_LOCALE'
const STORAGE_KEY = 'holos-locale'

function readLocale(): Locale {
  if (typeof document === 'undefined') return 'en'
  // Prefer localStorage for speed (no cookie parsing)
  const stored = localStorage.getItem(STORAGE_KEY) as Locale
  if (stored && TRANSLATIONS[stored]) return stored
  // Fallback to cookie
  const match = document.cookie.match(new RegExp(`${COOKIE_KEY}=([a-z]{2})`))
  if (match && TRANSLATIONS[match[1] as Locale]) return match[1] as Locale
  return 'en'
}

function writeLocale(locale: Locale) {
  localStorage.setItem(STORAGE_KEY, locale)
  document.cookie = `${COOKIE_KEY}=${locale}; path=/; max-age=31536000; SameSite=Lax`
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en')
  const router = useRouter()

  // Sync html lang + dir
  const applyLocale = useCallback((l: Locale) => {
    const meta = LOCALE_META[l]
    document.documentElement.lang = meta.lang
    document.documentElement.dir  = RTL_LOCALES.includes(l) ? 'rtl' : 'ltr'
  }, [])

  // Init
  useEffect(() => {
    const l = readLocale()
    setLocaleState(l)
    applyLocale(l)
  }, [applyLocale])

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l)
    writeLocale(l)      // writes cookie FIRST so router.refresh() sees new locale
    applyLocale(l)
    // Re-fetch all Server Components in the current route so pages using
    // getServerStrings() re-render with the new locale cookie immediately —
    // without a full page reload.
    router.refresh()
  }, [applyLocale, router])

  const isRTL = RTL_LOCALES.includes(locale)
  const strings = TRANSLATIONS[locale]
  const t = useCallback((key: string) => getTranslation(locale, key), [locale])

  return (
    <LanguageContext.Provider value={{
      locale, t, strings, setLocale, isRTL, dir: isRTL ? 'rtl' : 'ltr',
    }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}

// Re-export for convenience
export type { Locale }
export { LOCALE_META, RTL_LOCALES }
