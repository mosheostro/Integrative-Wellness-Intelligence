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
    const onScroll = () => setScrolled(window.scrollY > 8)
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
      <nav className={`app-nav-bar${scrolled ? ' app-nav-scrolled' : ''}`}>

        {/* Logo */}
        <Link href="/dashboard" className="app-nav-logo">
          <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
            {/* Outer ring with gradient */}
            <circle cx="16" cy="16" r="14.5" stroke="url(#logoGrad)" strokeWidth="1.6"/>
            <circle cx="16" cy="16" r="8" stroke="var(--gold-deep,#C4A55A)" strokeWidth="1.2" opacity="0.75"/>
            <circle cx="16" cy="16" r="2.8" fill="var(--ink)"/>
            <path d="M16 2V30M2 16H30" stroke="var(--line)" strokeWidth="0.8" opacity="0.6"/>
            <defs>
              <linearGradient id="logoGrad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                <stop stopColor="var(--sage)"/>
                <stop offset="1" stopColor="var(--indigo)"/>
              </linearGradient>
            </defs>
          </svg>
          <span className="app-nav-brand">Holos</span>
        </Link>

        {/* Desktop nav items */}
        <div className="app-nav-desktop app-nav-items">
          {NAV_ITEMS.map(item => {
            const active = pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <Link key={item.href} href={item.href} className={`app-nav-link${active ? ' app-nav-link-active' : ''}`}>
                <span className="app-nav-icon">{item.icon}</span>
                {item.label}
                {active && <span className="app-nav-active-dot" />}
              </Link>
            )
          })}

          <div className="app-nav-divider" />

          {SECONDARY_ITEMS.map(item => {
            const active = pathname === item.href
            return (
              <Link key={item.href} href={item.href} className={`app-nav-link app-nav-link-secondary${active ? ' app-nav-link-active' : ''}`}>
                {item.label}
              </Link>
            )
          })}
        </div>

        {/* Desktop right controls */}
        <div className="app-nav-desktop app-nav-right">
          <ThemeToggle size={30} />
          <LanguageSwitcher />
          <div className="app-nav-divider" />
          <Link href="/profile" className={`app-nav-link app-nav-link-secondary${pathname === '/profile' ? ' app-nav-link-active' : ''}`}>
            {n.profile}
          </Link>
          <Link href="/settings" className={`app-nav-link app-nav-link-secondary${pathname === '/settings' ? ' app-nav-link-active' : ''}`}>
            {n.settings}
          </Link>
          <button onClick={signOut} className="app-nav-signout">
            {n.signOut}
          </button>
        </div>

        {/* Mobile right cluster */}
        <div className="app-nav-mobile-right">
          <ThemeToggle size={30} />
          <LanguageSwitcher />
        </div>
      </nav>

      <style>{`
        /* ── Nav shell ───────────────────────────────────────── */
        .app-nav-bar {
          position: fixed; top: 0; left: 0; right: 0; z-index: 200;
          height: 60px;
          display: flex; align-items: center;
          padding-inline: clamp(14px, 3.5vw, 32px);
          gap: 4px;
          background: var(--nav-bg);
          backdrop-filter: blur(20px) saturate(160%);
          -webkit-backdrop-filter: blur(20px) saturate(160%);
          border-bottom: 1px solid var(--line);
          transition: background .25s, box-shadow .25s, border-color .25s;
        }
        .app-nav-scrolled {
          background: var(--nav-bg-scrolled);
          box-shadow: 0 4px 24px rgba(0,0,0,.08);
        }
        [data-theme="dark"] .app-nav-bar,
        html:not([data-theme="light"]) .app-nav-bar {
          border-bottom-color: rgba(255,255,255,.07);
        }
        [data-theme="dark"] .app-nav-scrolled,
        html:not([data-theme="light"]) .app-nav-scrolled {
          box-shadow: 0 4px 32px rgba(0,0,0,.35);
        }

        /* Subtle gradient bottom border in dark */
        .app-nav-bar::after {
          content: '';
          position: absolute; bottom: -1px; left: 0; right: 0; height: 1px;
          opacity: 0;
          background: linear-gradient(90deg, transparent 0%, var(--sage) 30%, var(--indigo) 70%, transparent 100%);
          transition: opacity .4s;
        }
        [data-theme="dark"] .app-nav-scrolled::after,
        html:not([data-theme="light"]) .app-nav-scrolled::after { opacity: 0.35; }

        /* ── Logo ───────────────────────────────────────────── */
        .app-nav-logo {
          display