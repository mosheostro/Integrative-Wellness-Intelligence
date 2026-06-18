'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

export function MobileTabBar() {
  const pathname = usePathname()
  const { strings } = useLanguage()
  const n = strings.nav
  const [moreOpen, setMoreOpen] = useState(false)

  const TABS = [
    { href: '/dashboard',  label: n.dashboard, icon: '◈' },
    { href: '/assessment', label: n.assess,    icon: '◉' },
    { href: '/coach',      label: n.coach,     icon: '◆' },
    { href: '/progress',   label: n.progress,  icon: '◎' },
  ]

  const MORE_ITEMS = [
    { href: '/recommendations', label: n.actions  },
    { href: '/journal',         label: n.journal  },
    { href: '/goals',           label: n.goals    },
    { href: '/habits',          label: n.habits   },
    { href: '/reports',         label: n.reports  },
    { href: '/profile',         label: n.profile  },
    { href: '/settings',        label: n.settings },
  ]

  const isMoreActive = MORE_ITEMS.some(
    i => pathname === i.href || pathname.startsWith(i.href + '/')
  )

  return (
    <>
      {/* Backdrop */}
      {moreOpen && (
        <div
          onClick={() => setMoreOpen(false)}
          aria-hidden
          style={{
            position:   'fixed',
            inset:      0,
            zIndex:     298,
            background: 'rgba(0,0,0,.35)',
          }}
        />
      )}

      {/* More sheet */}
      <div style={{
        position:      'fixed',
        bottom:        'calc(56px + env(safe-area-inset-bottom, 0px))',
        left:          0,
        right:         0,
        zIndex:        299,
        background:    'var(--surface)',
        borderTop:     '1px solid var(--line)',
        borderRadius:  'var(--radius-lg) var(--radius-lg) 0 0',
        padding:       '8px 12px 16px',
        boxShadow:     '0 -8px 32px rgba(0,0,0,.12)',
        transform:     moreOpen ? 'translateY(0)' : 'translateY(100%)',
        transition:    'transform .28s cubic-bezier(.4,0,.2,1)',
        pointerEvents: moreOpen ? 'auto' : 'none',
      }}>
        {/* Drag handle */}
        <div style={{
          width:        36,
          height:       4,
          background:   'var(--line)',
          borderRadius: 2,
          margin:       '4px auto 16px',
        }} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 4 }}>
          {MORE_ITEMS.map(item => {
            const active = pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMoreOpen(false)}
                style={{
                  display:        'flex',
                  flexDirection:  'column',
                  alignItems:     'center',
                  justifyContent: 'center',
                  padding:        '10px 4px',
                  borderRadius:   'var(--radius)',
                  textDecoration: 'none',
                  background:     active ? 'var(--surface-2)' : 'transparent',
                  color:          active ? 'var(--ink)' : 'var(--ink-soft)',
                  fontFamily:     'var(--font-body)',
                  fontSize:       '.78rem',
                  fontWeight:     active ? 600 : 400,
                  textAlign:      'center',
                  lineHeight:     1.3,
                  transition:     'background .15s, color .15s',
                }}>
                {item.label}
              </Link>
            )
          })}
        </div>
      </div>

      {/* Bottom tab bar */}
      <nav
        className="mobile-tab-bar"
        aria-label="Primary navigation"
        style={{
          position:          'fixed',
          bottom:            0,
          left:              0,
          right:             0,
          zIndex:            300,
          height:            'calc(56px + env(safe-area-inset-bottom, 0px))',
          background:        'var(--nav-bg-scrolled)',
          backdropFilter:    'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          borderTop:         '1px solid var(--line)',
          display:           'flex',
          alignItems:        'flex-start',
          paddingTop:        4,
          paddingBottom:     'env(safe-area-inset-bottom, 0px)',
        }}>

        {TABS.map(tab => {
          const active = pathname === tab.href || pathname.startsWith(tab.href + '/')
          return (
            <Link
              key={tab.href}
              href={tab.href}
              onClick={() => setMoreOpen(false)}
              style={{
                flex:           1,
                display:        'flex',
                flexDirection:  'column',
                alignItems:     'center',
                gap:            2,
                padding:        '6px 4px',
                textDecoration: 'none',
                color:          active ? 'var(--sage)' : 'var(--ink-faint)',
                transition:     'color .15s',
              }}>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize:   '1.05rem',
                lineHeight: 1,
                marginBottom: 2,
              }}>
                {tab.icon}
              </span>
              <span style={{
                fontFamily:    'var(--font-body)',
                fontSize:      '.62rem',
                fontWeight:    active ? 600 : 400,
                letterSpacing: '-.01em',
                lineHeight:    1,
              }}>
                {tab.label}
              </span>
            </Link>
          )
        })}

        {/* More tab */}
        <button
          onClick={() => setMoreOpen(v => !v)}
          aria-expanded={moreOpen}
          aria-haspopup="true"
          style={{
            flex:           1,
            display:        'flex',
            flexDirection:  'column',
            alignItems:     'center',
            gap:            2,
            padding:        '6px 4px',
            background:     'none',
            border:         'none',
            cursor:         'pointer',
            color:          isMoreActive || moreOpen ? 'var(--sage)' : 'var(--ink-faint)',
            transition:     'color .15s',
          }}>
          {/* Three dots icon */}
          <span style={{
            fontFamily:   'var(--font-mono)',
            fontSize:     '1.05rem',
            lineHeight:   1,
            marginBottom: 2,
            display:      'flex',
            gap:          3,
            alignItems:   'center',
          }}>
            <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'currentColor', display: 'inline-block' }} />
            <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'currentColor', display: 'inline-block' }} />
            <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'currentColor', display: 'inline-block' }} />
          </span>
          <span style={{
            fontFamily:    'var(--font-body)',
            fontSize:      '.62rem',
            fontWeight:    isMoreActive || moreOpen ? 600 : 400,
            letterSpacing: '-.01em',
            lineHeight:    1,
          }}>
            More
          </span>
        </button>
      </nav>

      <style>{`
        /* Only show tab bar on mobile */
        @media (min-width: 768px) {
          .mobile-tab-bar { display: none !important; }
        }
      `}</style>
    </>
  )
}
