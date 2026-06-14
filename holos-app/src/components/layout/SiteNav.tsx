'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

const NAV_LINKS = [
  {
    label: 'Platform',
    href:  '#',
    sub: [
      { label: 'Dashboard',        href: '/dashboard',        desc: 'Your wellness overview'       },
      { label: 'Assessment',       href: '/assessment',       desc: '9-dimension deep scan'        },
      { label: 'AI Coach',         href: '/coach',            desc: 'Personalised AI guidance'     },
      { label: 'Journal',          href: '/journal',          desc: 'Daily wellness journaling'    },
      { label: 'Goals',            href: '/goals',            desc: 'Set & track wellness goals'   },
      { label: 'Habits',           href: '/habits',           desc: 'Build lasting healthy habits' },
      { label: 'Progress',         href: '/progress',         desc: 'Longitudinal tracking'        },
      { label: 'Recommendations',  href: '/recommendations',  desc: 'Personalised action plans'    },
      { label: 'Reports',          href: '/reports',          desc: 'Detailed wellness reports'    },
    ],
  },
  { label: 'Methodologies', href: '/methodologies' },
  { label: 'Knowledge',     href: '/knowledge'     },
  { label: 'About',         href: '/about'         },
  { label: 'Pricing',       href: '/pricing'       },
]

export default function SiteNav() {
  const pathname  = usePathname()
  const [open,    setOpen]    = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mega,    setMega]    = useState<string | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false); setMega(null) }, [pathname])

  const isActive = (href: string) =>
    href !== '#' && (pathname === href || pathname.startsWith(href + '/'))

  return (
    <>
      <nav
        style={{
          position:        'fixed',
          top:             0,
          left:            0,
          right:           0,
          zIndex:          200,
          height:          68,
          display:         'flex',
          alignItems:      'center',
          padding:         '0 24px',
          transition:      'background .25s, box-shadow .25s',
          background:      scrolled
            ? 'rgba(250,247,242,.94)'
            : 'rgba(250,247,242,.70)',
          backdropFilter:  'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          boxShadow:       scrolled ? '0 1px 0 var(--line)' : 'none',
        }}
        onMouseLeave={() => setMega(null)}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            display:    'flex',
            alignItems: 'center',
            gap:        8,
            textDecoration: 'none',
            flexShrink: 0,
            marginRight: 32,
          }}
        >
          <span style={{ color: 'var(--sage)', fontSize: '1.25rem', lineHeight: 1 }}>◈</span>
          <span style={{
            fontFamily:  'var(--font-serif)',
            fontSize:    '1.15rem',
            fontWeight:  500,
            color:       'var(--ink)',
            letterSpacing: '-.01em',
          }}>
            Holos
          </span>
        </Link>

        {/* Desktop nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}
          className="site-nav-desktop">
          {NAV_LINKS.map(link => (
            <div key={link.label} style={{ position: 'relative' }}>
              {link.sub ? (
                <button
                  onMouseEnter={() => setMega(link.label)}
                  onClick={() => setMega(mega === link.label ? null : link.label)}
                  style={{
                    background:   'none',
                    border:       'none',
                    cursor:       'pointer',
                    padding:      '6px 12px',
                    borderRadius: 'var(--radius)',
                    fontFamily:   'var(--font-body)',
                    fontSize:     '.85rem',
                    fontWeight:   500,
                    color:        mega === link.label ? 'var(--sage-deep)' : 'var(--ink-soft)',
                    display:      'flex',
                    alignItems:   'center',
                    gap:          4,
                    transition:   'color .15s, background .15s',
                  }}
                  onMouseLeave={() => {}}
                >
                  {link.label}
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none"
                    style={{ transition: 'transform .2s', transform: mega === link.label ? 'rotate(180deg)' : 'none' }}>
                    <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
              ) : (
                <Link
                  href={link.href}
                  style={{
                    display:      'block',
                    padding:      '6px 12px',
                    borderRadius: 'var(--radius)',
                    fontFamily:   'var(--font-body)',
                    fontSize:     '.85rem',
                    fontWeight:   500,
                    color:        isActive(link.href) ? 'var(--sage-deep)' : 'var(--ink-soft)',
                    textDecoration: 'none',
                    transition:   'color .15s, background .15s',
                    background:   isActive(link.href) ? 'var(--canvas2)' : 'transparent',
                  }}
                >
                  {link.label}
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}
          className="site-nav-desktop">
          <Link href="/auth/login"
            style={{
              padding:      '7px 16px',
              borderRadius: 'var(--radius)',
              fontFamily:   'var(--font-body)',
              fontSize:     '.85rem',
              fontWeight:   500,
              color:        'var(--ink-soft)',
              textDecoration: 'none',
              transition:   'color .15s',
            }}>
            Sign in
          </Link>
          <Link href="/auth/signup"
            style={{
              padding:      '8px 20px',
              borderRadius: 'var(--radius)',
              background:   'var(--sage)',
              color:        '#fff',
              fontFamily:   'var(--font-body)',
              fontSize:     '.85rem',
              fontWeight:   600,
              textDecoration: 'none',
              transition:   'background .15s',
              letterSpacing: '-.01em',
            }}>
            Get started
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="site-nav-mobile"
          aria-label="Toggle menu"
          style={{
            marginLeft:   'auto',
            background:   'none',
            border:       'none',
            cursor:       'pointer',
            padding:      8,
            color:        'var(--ink)',
            display:      'flex',
            flexDirection: 'column',
            gap:          5,
          }}>
          <span style={{
            display:    'block',
            width:      22,
            height:     2,
            background: 'currentColor',
            borderRadius: 2,
            transition: 'transform .2s',
            transform:  open ? 'translateY(7px) rotate(45deg)' : 'none',
          }}/>
          <span style={{
            display:    'block',
            width:      22,
            height:     2,
            background: 'currentColor',
            borderRadius: 2,
            opacity:    open ? 0 : 1,
            transition: 'opacity .2s',
          }}/>
          <span style={{
            display:    'block',
            width:      22,
            height:     2,
            background: 'currentColor',
            borderRadius: 2,
            transition: 'transform .2s',
            transform:  open ? 'translateY(-7px) rotate(-45deg)' : 'none',
          }}/>
        </button>
      </nav>

      {/* Mega-menu dropdown */}
      {mega === 'Platform' && (
        <div
          onMouseEnter={() => setMega('Platform')}
          onMouseLeave={() => setMega(null)}
          style={{
            position:   'fixed',
            top:        68,
            left:       '50%',
            transform:  'translateX(-50%)',
            zIndex:     199,
            background: 'var(--surface)',
            border:     '1px solid var(--line)',
            borderRadius: 'var(--radius-lg)',
            boxShadow:  '0 8px 32px rgba(43,47,69,.12)',
            padding:    24,
            display:    'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap:        4,
            minWidth:   680,
          }}
          className="site-nav-desktop">
          {NAV_LINKS[0].sub!.map(item => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMega(null)}
              style={{
                display:      'block',
                padding:      '10px 14px',
                borderRadius: 'var(--radius)',
                textDecoration: 'none',
                transition:   'background .15s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--canvas2)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              <div style={{
                fontFamily:  'var(--font-body)',
                fontSize:    '.88rem',
                fontWeight:  600,
                color:       'var(--ink)',
                marginBottom: 2,
              }}>{item.label}</div>
              <div style={{
                fontFamily: 'var(--font-body)',
                fontSize:   '.78rem',
                color:      'var(--ink-faint)',
              }}>{item.desc}</div>
            </Link>
          ))}
        </div>
      )}

      {/* Mobile drawer */}
      <div style={{
        position:   'fixed',
        top:        68,
        left:       0,
        right:      0,
        bottom:     0,
        zIndex:     198,
        background: 'var(--canvas)',
        overflowY:  'auto',
        transform:  open ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform .28s cubic-bezier(.4,0,.2,1)',
        padding:    '24px 24px 48px',
      }}
        className="site-nav-mobile">
        {NAV_LINKS.map(link => (
          <div key={link.label} style={{ borderBottom: '1px solid var(--line)', paddingBottom: 16, marginBottom: 16 }}>
            {link.sub ? (
              <>
                <div style={{
                  fontSize:    '.72rem',
                  fontFamily:  'var(--font-mono)',
                  textTransform: 'uppercase',
                  letterSpacing: '.1em',
                  color:       'var(--ink-faint)',
                  marginBottom: 10,
                }}>{link.label}</div>
                {link.sub.map(sub => (
                  <Link key={sub.href} href={sub.href}
                    style={{
                      display:      'block',
                      padding:      '8px 0',
                      fontFamily:   'var(--font-body)',
                      fontSize:     '.95rem',
                      fontWeight:   500,
                      color:        'var(--ink)',
                      textDecoration: 'none',
                    }}>
                    {sub.label}
                  </Link>
                ))}
              </>
            ) : (
              <Link href={link.href}
                style={{
                  display:      'block',
                  fontFamily:   'var(--font-body)',
                  fontSize:     '1.05rem',
                  fontWeight:   600,
                  color:        'var(--ink)',
                  textDecoration: 'none',
                  padding:      '4px 0',
                }}>
                {link.label}
              </Link>
            )}
          </div>
        ))}
        <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Link href="/auth/login"
            style={{
              display:      'block',
              textAlign:    'center',
              padding:      '12px 24px',
              borderRadius: 'var(--radius)',
              border:       '1.5px solid var(--line)',
              fontFamily:   'var(--font-body)',
              fontWeight:   600,
              color:        'var(--ink)',
              textDecoration: 'none',
            }}>Sign in</Link>
          <Link href="/auth/signup"
            style={{
              display:      'block',
              textAlign:    'center',
              padding:      '12px 24px',
              borderRadius: 'var(--radius)',
              background:   'var(--sage)',
              fontFamily:   'var(--font-body)',
              fontWeight:   600,
              color:        '#fff',
              textDecoration: 'none',
            }}>Get started free</Link>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .site-nav-mobile { display: none !important; }
        }
        @media (max-width: 767px) {
          .site-nav-desktop { display: none !important; }
        }
      `}</style>
    </>
  )
}
