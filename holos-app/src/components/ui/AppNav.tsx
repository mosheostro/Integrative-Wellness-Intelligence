'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useLanguage } from '@/contexts/LanguageContext'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher'

export function AppNav() {
  const pathname  = usePathname()
  const { strings } = useLanguage()
  const n = strings.nav
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const NAV_ITEMS = [
    { href: '/dashboard',       label: n.dashboard, icon: '◈' },
    { href: '/assessment',      label: n.assess,    icon: '◉' },
    { href: '/coach',           label: n.coach,     icon: '◆' },
    { href: '/progress',        label: n.progress,  icon: '◎' },
    { href: '/recommendations', label: n.actions,   icon: '✦' },
  ]

  const SECONDARY_ITEMS = [
    { href: '/journal', label: n.journal },
    { href: '/goals',   label: n.goals   },
    { href: '/habits',  label: n.habits  },
    { href: '/reports', label: n.reports },
  ]

  async function signOut() {
    const sb = createClient()
    await sb.auth.signOut()
    window.location.href = '/'
  }

  return (
    <>
      <nav style={{
        position:          'fixed',
        top:               0,
        left:              0,
        right:             0,
        zIndex:            100,
        background:        scrolled ? 'var(--nav-bg-scrolled)' : 'var(--nav-bg)',
        backdropFilter:    'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        borderBottom:      '1px solid var(--line)',
        height:            60,
        display:           'flex',
        alignItems:        'center',
        paddingInline:     'clamp(16px,4vw,36px)',
        gap:               4,
        transition:        'background .25s',
      }}>

        {/* Logo — always visible */}
        <Link href="/dashboard" style={{
          display:         'flex',
          alignItems:      'center',
          gap:             8,
          textDecoration:  'none',
          marginInlineEnd: 12,
          flexShrink:      0,
        }}>
          <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="14.5" stroke="var(--sage)" strokeWidth="1.4"/>
            <circle cx="16" cy="16" r="8" stroke="var(--gold-deep,#C4A55A)" strokeWidth="1.4"/>
            <circle cx="16" cy="16" r="2.6" fill="var(--ink)"/>
            <path d="M16 1.5V30.5M1.5 16H30.5" stroke="var(--line)" strokeWidth="1"/>
          </svg>
          <span style={{ fontFamily: 'var(--font-serif)', fontWeight: 500, fontSize: '1rem', color: 'var(--ink)', letterSpacing: '-.01em' }}>Holos</span>
        </Link>

        {/* Desktop: primary + secondary nav */}
        <div className="app-nav-desktop" style={{ display: 'flex', gap: 2, flex: 1, overflowX: 'auto' }}>
          {NAV_ITEMS.map(item => {
            const active = pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <Link key={item.href} href={item.href}
                style={{
                  display:       'flex',
                  alignItems:    'center',
                  gap:           6,
                  padding:       '6px 12px',
                  borderRadius:  8,
                  textDecoration:'none',
                  fontSize:      '.82rem',
                  fontWeight:    active ? 600 : 400,
                  fontFamily:    'var(--font-body)',
                  background:    active ? 'var(--surface-2)' : 'transparent',
                  color:         active ? 'var(--ink)' : 'var(--ink-soft)',
                  whiteSpace:    'nowrap',
                  flexShrink:    0,
                }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.68rem', color: active ? 'var(--sage)' : 'var(--ink-faint)' }}>
                  {item.icon}
                </span>
                {item.label}
              </Link>
            )
          })}

          <div style={{ width: 1, height: 20, background: 'var(--line)', margin: '0 6px', alignSelf: 'center', flexShrink: 0 }} />

          {SECONDARY_ITEMS.map(item => {
            const active = pathname === item.href
            return (
              <Link key={item.href} href={item.href}
                style={{
                  display:       'flex',
                  alignItems:    'center',
                  padding:       '6px 10px',
                  borderRadius:  8,
                  textDecoration:'none',
                  fontSize:      '.8rem',
                  fontFamily:    'var(--font-body)',
                  fontWeight:    active ? 600 : 400,
                  color:         active ? 'var(--ink)' : 'var(--ink-faint)',
                  background:    active ? 'var(--surface-2)' : 'transparent',
                  whiteSpace:    'nowrap',
                  flexShrink:    0,
                }}>
                {item.label}
              </Link>
            )
          })}
        </div>

        {/* Desktop: right controls */}
        <div className="app-nav-desktop" style={{ display: 'flex', gap: 6, alignItems: 'center', marginInlineStart: 8, flexShrink: 0 }}>
          <ThemeToggle size={30} />
          <LanguageSwitcher />

          <div style={{ width: 1, height: 18, background: 'var(--line)', margin: '0 2px' }} />

          <Link href="/profile"
            style={{
              display:       'flex',
              alignItems:    'center',
              padding:       '6px 12px',
              borderRadius:  8,
              textDecoration:'none',
              fontSize:      '.8rem',
              fontFamily:    'var(--font-body)',
              color:         pathname === '/profile' ? 'var(--ink)' : 'var(--ink-soft)',
              background:    pathname === '/profile' ? 'var(--surface-2)' : 'transparent',
              whiteSpace:    'nowrap',
            }}>
            {n.profile}
          </Link>
          <Link href="/settings"
            style={{
              display:       'flex',
              alignItems:    'center',
              padding:       '6px 10px',
              borderRadius:  8,
              textDecoration:'none',
              fontSize:      '.8rem',
              fontFamily:    'var(--font-body)',
              color:         pathname === '/settings' ? 'var(--ink)' : 'var(--ink-faint)',
              background:    pathname === '/settings' ? 'var(--surface-2)' : 'transparent',
            }}>
            {n.settings}
          </Link>
          <button onClick={signOut}
            style={{
              display:     'flex',
              alignItems:  'center',
              padding:     '6px 12px',
              borderRadius: 8,
              border:      '1px solid var(--line)',
              background:  'transparent',
              color:       'var(--ink-soft)',
              fontFamily:  'var(--font-body)',
              fontSize:    '.78rem',
              cursor:      'pointer',
            }}>
            {n.signOut}
          </button>
        </div>

        {/* Mobile: minimal right cluster — tab bar handles navigation */}
        <div className="app-nav-mobile-right" style={{ marginInlineStart: 'auto', alignItems: 'center', gap: 6 }}>
          <ThemeToggle size={30} />
          <LanguageSwitcher />
        </div>
      </nav>

      <style>{`
        @media (max-width: 767px) {
          .app-nav-desktop       { display: none !important; }
          .app-nav-mobile-right  { display: flex !important; }
        }
        @media (min-width: 768px) {
          .app-nav-mobile-right  { display: none !important; }
        }
      `}</style>
    </>
  )
}
