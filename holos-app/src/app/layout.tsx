import type { Metadata } from 'next'
import { Spectral, Hanken_Grotesk, JetBrains_Mono } from 'next/font/google'
import { Providers } from '@/components/Providers'
import './globals.css'

const spectral = Spectral({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
})

const hanken = Hanken_Grotesk({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Holos — Integrative Wellness Intelligence',
  description:
    'Holos unites modern science with eight wisdom traditions into one adaptive wellness intelligence — so your health reflects body, energy, mind, and meaning.',
  keywords: ['wellness', 'integrative health', 'Ayurveda', 'biohacking', 'holistic'],
  other: {
    'color-scheme': 'light dark',
  },
}

// Anti-flash inline script — must run before any render to avoid FODT (flash of default theme)
const themeScript = `
(function() {
  try {
    var stored = localStorage.getItem('holos-theme');
    var theme = stored || 'system';
    var resolved;
    if (theme === 'system') {
      resolved = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } else {
      resolved = theme;
    }
    document.documentElement.setAttribute('data-theme', resolved);

    // Apply stored locale dir/lang
    var locale = localStorage.getItem('holos-locale');
    if (!locale) {
      var cm = document.cookie.match(/HOLOS_LOCALE=([a-z]{2})/);
      locale = cm ? cm[1] : 'en';
    }
    if (locale === 'he') {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'he';
    } else if (locale === 'ru') {
      document.documentElement.lang = 'ru';
    } else if (locale === 'de') {
      document.documentElement.lang = 'de';
    }
  } catch(e) {}
})();
`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={`${spectral.variable} ${hanken.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Anti-flash: set theme + locale dir before first paint */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
