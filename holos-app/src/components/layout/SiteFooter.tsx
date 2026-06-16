'use client'
import Link from 'next/link'
import { FOUNDER } from '@/lib/founder'
import { useLanguage } from '@/contexts/LanguageContext'

// Nav links: labels come from translations — only hrefs are static
const PLATFORM_LINKS = [
  { key: 'dashboard',       href: '/dashboard'       },
  { key: 'assess',          href: '/assessment'      },
  { key: 'coach',           href: '/coach'           },
  { key: 'progress',        href: '/progress'        },
  { key: 'journal',         href: '/journal'         },
  { key: 'goals',           href: '/goals'           },
  { key: 'habits',          href: '/habits'          },
  { key: 'recommendations', href: '/recommendations' },
  { key: 'reports',         href: '/reports'         },
] as const

const COMPANY_LINKS = [
  { key: 'about',          href: '/about'         },
  { key: 'methodologies',  href: '/methodologies' },
  { key: 'pricing',        href: '/pricing'       },
  { key: 'knowledge',      href: '/knowledge'     },
  { key: 'faq',            href: '/faq'           },
  { key: 'contact',        href: '/contact'       },
] as const

// Tradition names are proper nouns — not translated
const TRADITIONS = [
  { label: 'Evidence-Based', href: '/methodologies#evidence-based' },
  { label: 'Rambam',         href: '/methodologies#rambam'         },
  { label: 'Hippocrates',    href: '/methodologies#hippocrates'    },
  { label: 'Avicenna',       href: '/methodologies#avicenna'       },
  { label: 'Ayurveda',       href: '/methodologies#ayurveda'       },
  { label: 'Daoist',         href: '/methodologies#daoist'         },
  { label: 'Tibetan',        href: '/methodologies#tibetan'        },
  { label: 'Swarga',         href: '/methodologies#swarga'         },
]

export default function SiteFooter() {
  const { strings } = useLanguage()
  const nav = strings.nav
  const f = strings.footer

  // Map nav keys → translated labels
  type NavKey = keyof typeof nav
  const platformLabel = (key: string) => nav[key as NavKey] ?? key
  const companyLabel  = (key: string) => nav[key as NavKey] ?? key

  const year = new Date().getFullYear()

  return (
    <footer style={{
      background:   'var(--ink)',
      color:        'rgba(255,255,255,.55)',
      paddingTop:   72,
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>

        {/* 4-column grid */}
        <div style={{
          display:             'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap:                 48,
          paddingBottom:       64,
          borderBottom:        '1px solid rgba(255,255,255,.08)',
        }}>

          {/* Brand */}
          <div>
            <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none', marginBottom: 16 }}>
              <span style={{ color: 'var(--sage)', fontSize: '1.2rem' }}>◈</span>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: '#fff', fontWeight: 500 }}>Holos</span>
            </Link>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '.8rem', lineHeight: 1.7, maxWidth: 200, margin: '0 0 20px' }}>
              {f.tagline}
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              {[
                { label: 'LI',  href: FOUNDER.linkedin  },
                { label: 'TG',  href: FOUNDER.telegram  },
                { label: 'IG',  href: FOUNDER.instagram },
                { label: 'YT',  href: FOUNDER.youtube   },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener"
                  style={{
                    display:        'flex',
                    alignItems:     'center',
                    justifyContent: 'center',
                    width:          32,
                    height:         32,
                    borderRadius:   '50%',
                    background:     'rgba(255,255,255,.06)',
                    color:          'rgba(255,255,255,.6)',
                    fontFamily:     'var(--font-mono)',
                    fontSize:       '.62rem',
                    fontWeight:     700,
                    textDecoration: 'none',
                    transition:     'background .15s, color .15s',
                    letterSpacing:  '.05em',
                  }}>
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Platform */}
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.65rem', textTransform: 'uppercase', letterSpacing: '.12em', color: 'rgba(255,255,255,.3)', marginBottom: 16 }}>
              {f.platform}
            </div>
            {PLATFORM_LINKS.map(l => (
              <Link key={l.href} href={l.href}
                style={{
                  display:        'block',
                  fontFamily:     'var(--font-body)',
                  fontSize:       '.82rem',
                  color:          'rgba(255,255,255,.5)',
                  textDecoration: 'none',
                  padding:        '3px 0',
                  transition:     'color .15s',
                }}>
                {platformLabel(l.key)}
              </Link>
            ))}
          </div>

          {/* Company */}
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.65rem', textTransform: 'uppercase', letterSpacing: '.12em', color: 'rgba(255,255,255,.3)', marginBottom: 16 }}>
              {f.company}
            </div>
            {COMPANY_LINKS.map(l => (
              <Link key={l.href} href={l.href}
                style={{
                  display:        'block',
                  fontFamily:     'var(--font-body)',
                  fontSize:       '.82rem',
                  color:          'rgba(255,255,255,.5)',
                  textDecoration: 'none',
                  padding:        '3px 0',
                  transition:     'color .15s',
                }}>
                {companyLabel(l.key)}
              </Link>
            ))}
          </div>

          {/* Traditions */}
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.65rem', textTransform: 'uppercase', letterSpacing: '.12em', color: 'rgba(255,255,255,.3)', marginBottom: 16 }}>
              {f.traditions}
            </div>
            {TRADITIONS.map(l => (
              <Link key={l.href} href={l.href}
                style={{
                  display:        'block',
                  fontFamily:     'var(--font-body)',
                  fontSize:       '.82rem',
                  color:          'rgba(255,255,255,.5)',
                  textDecoration: 'none',
                  padding:        '3px 0',
                  transition:     'color .15s',
                }}>
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'space-between',
          flexWrap:       'wrap',
          gap:            16,
          padding:        '24px 0',
        }}>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '.75rem' }}>
            &copy; {year} Holos Integrative Wellness Intelligence. {f.allRights}
          </div>
          <div style={{ display: 'flex', gap: 24 }}>
            <Link href="/privacy"
              style={{
                fontFamily:     'var(--font-body)',
                fontSize:       '.75rem',
                color:          'rgba(255,255,255,.35)',
                textDecoration: 'none',
              }}>
              {f.privacyPolicy}
            </Link>
            <Link href="/terms"
              style={{
                fontFamily:     'var(--font-body)',
                fontSize:       '.75rem',
                color:          'rgba(255,255,255,.35)',
                textDecoration: 'none',
              }}>
              {f.termsOfUse}
            </Link>
            <a href={`mailto:${FOUNDER.email}`}
              style={{
                fontFamily:     'var(--font-body)',
                fontSize:       '.75rem',
                color:          'rgba(255,255,255,.35)',
                textDecoration: 'none',
              }}>
              {FOUNDER.email}
            </a>
          </div>
        </div>

        <div style={{ padding: '16px 0 32px', fontSize: '.72rem', fontFamily: 'var(--font-body)', lineHeight: 1.6 }}>
          {f.medical}
        </div>
      </div>
    </footer>
  )
}
