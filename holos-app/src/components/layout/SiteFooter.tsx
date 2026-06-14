import Link from 'next/link'
import { FOUNDER } from '@/lib/founder'

const PLATFORM = [
  { label: 'Dashboard',       href: '/dashboard'       },
  { label: 'Assessment',      href: '/assessment'      },
  { label: 'AI Coach',        href: '/coach'           },
  { label: 'Progress',        href: '/progress'        },
  { label: 'Journal',         href: '/journal'         },
  { label: 'Goals',           href: '/goals'           },
  { label: 'Habits',          href: '/habits'          },
  { label: 'Recommendations', href: '/recommendations' },
  { label: 'Reports',         href: '/reports'         },
]

const COMPANY = [
  { label: 'About',         href: '/about'         },
  { label: 'Methodologies', href: '/methodologies' },
  { label: 'Pricing',       href: '/pricing'       },
  { label: 'Knowledge',     href: '/knowledge'     },
  { label: 'FAQ',           href: '/faq'           },
  { label: 'Contact',       href: '/contact'       },
]

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

const LEGAL = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Use',   href: '/terms'   },
]

export default function SiteFooter() {
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
              Integrative Wellness Intelligence. Nine dimensions. Eight traditions. One complete portrait of you.
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
                    display:      'flex',
                    alignItems:   'center',
                    justifyContent: 'center',
                    width:        32,
                    height:       32,
                    borderRadius: '50%',
                    background:   'rgba(255,255,255,.06)',
                    color:        'rgba(255,255,255,.6)',
                    fontFamily:   'var(--font-mono)',
                    fontSize:     '.62rem',
                    fontWeight:   700,
                    textDecoration: 'none',
                    transition:   'background .15s, color .15s',
                    letterSpacing: '.05em',
                  }}>
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Platform */}
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.65rem', textTransform: 'uppercase', letterSpacing: '.12em', color: 'rgba(255,255,255,.3)', marginBottom: 16 }}>Platform</div>
            {PLATFORM.map(l => (
              <Link key={l.href} href={l.href}
                style={{
                  display:      'block',
                  fontFamily:   'var(--font-body)',
                  fontSize:     '.82rem',
                  color:        'rgba(255,255,255,.5)',
                  textDecoration: 'none',
                  padding:      '3px 0',
                  transition:   'color .15s',
                }}>
                {l.label}
              </Link>
            ))}
          </div>

          {/* Company */}
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.65rem', textTransform: 'uppercase', letterSpacing: '.12em', color: 'rgba(255,255,255,.3)', marginBottom: 16 }}>Company</div>
            {COMPANY.map(l => (
              <Link key={l.href} href={l.href}
                style={{
                  display:      'block',
                  fontFamily:   'var(--font-body)',
                  fontSize:     '.82rem',
                  color:        'rgba(255,255,255,.5)',
                  textDecoration: 'none',
                  padding:      '3px 0',
                  transition:   'color .15s',
                }}>
                {l.label}
              </Link>
            ))}
          </div>

          {/* Traditions */}
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.65rem', textTransform: 'uppercase', letterSpacing: '.12em', color: 'rgba(255,255,255,.3)', marginBottom: 16 }}>Traditions</div>
            {TRADITIONS.map(l => (
              <Link key={l.href} href={l.href}
                style={{
                  display:      'block',
                  fontFamily:   'var(--font-body)',
                  fontSize:     '.82rem',
                  color:        'rgba(255,255,255,.5)',
                  textDecoration: 'none',
                  padding:      '3px 0',
                  transition:   'color .15s',
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
            &copy; {new Date().getFullYear()} Holos Integrative Wellness Intelligence. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: 24 }}>
            {LEGAL.map(l => (
              <Link key={l.href} href={l.href}
                style={{
                  fontFamily:   'var(--font-body)',
                  fontSize:     '.75rem',
                  color:        'rgba(255,255,255,.35)',
                  textDecoration: 'none',
                }}>
                {l.label}
              </Link>
            ))}
            <a href={`mailto:${FOUNDER.email}`}
              style={{
                fontFamily:   'var(--font-body)',
                fontSize:     '.75rem',
                color:        'rgba(255,255,255,.35)',
                textDecoration: 'none',
              }}>
              {FOUNDER.email}
            </a>
          </div>
        </div>

        <div style={{ padding: '16px 0 32px', fontSize: '.72rem', fontFamily: 'var(--font-body)', lineHeight: 1.6 }}>
          Not medical advice. Holos is an educational wellness intelligence tool. Always consult a qualified healthcare professional before making health decisions.
        </div>
      </div>
    </footer>
  )
}
