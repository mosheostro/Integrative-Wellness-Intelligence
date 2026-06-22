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
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
  other: {
    'color-scheme': 'light dark',
  },
}

// Anti-flash inline script — must run before any render to avoid FODT (flash of default t