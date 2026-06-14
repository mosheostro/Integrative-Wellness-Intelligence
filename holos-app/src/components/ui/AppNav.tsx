'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Dashboard', icon: '◈' },
  { href: '/assessment', label: 'Assess', icon: '◉' },
  { href: '/coach', label: 'Coach', icon: '◆' },
  { href: '/progress', label: 'Progress', icon: '◎' },
]

export function AppNav() {
  const pathname = usePathname()
  const router = useRouter()

  async function signOut() {
    const sb = createClient()
    await sb.auth.signOut()
    router.push('/')
  }

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: 'rgba(var(--canvas-rgb, 250,247,242), 0.85)',
      backdropFilter: 'blur(14px)',
      borderBottom: '1px solid var(--line)',
      height: 60,
      display: 'flex', alignItems: 'center', paddingInline: 'clamp(16px,4vw,40px)',
      gap: 8,
    }}>
      {/* Logo */}
      <Link href="/dashboard" style={{ display:'flex', alignItems:'center', gap:8, textDecoration:'none', marginRight:16 }}>
        <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="14.5" stroke="var(--sage)" strokeWidth="1.4"/>
          <circle cx="16" cy="16" r="8" stroke="var(--gold-deep)" strokeWidth="1.4"/>
          <circle cx="16" cy="16" r="2.6" fill="var(--ink)"/>
          <path d="M16 1.5V30.5M1.5 16H30.5" stroke="var(--line)" strokeWidth="1"/>
        </svg>
        <span style={{ fontFamily:'var(--font-serif)', fontWeight:500, fontSize:'1.05rem', color:'var(--ink)' }}>Holos</span>
      </Link>

      {/* Nav links */}
      <div style={{ display:'flex', gap:4, flex:1 }}>
        {NAV_ITEMS.map(item => {
          const active = pathname.startsWith(item.href)
          return (
            <Link key={item.href} href={item.href} style={{
              display:'flex', alignItems:'center', gap:6, padding:'6px 14px',
              borderRadius:8, textDecoration:'none', fontSize:'.875rem', fontWeight: active ? 600 : 400,
              background: active ? 'var(--surface-2)' : 'transparent',
              color: active ? 'var(--ink)' : 'var(--ink-soft)',
              transition: 'all .15s',
            }}>
              <span style={{ fontFamily:'var(--font-mono)', fontSize:12 }}>{item.icon}</span>
              {item.label}
            </Link>
          )
        })}
      </div>

      {/* Sign out */}
      <button onClick={signOut} className="btn btn-ghost btn-sm" style={{ marginLeft:'auto' }}>
        Sign out
      </button>
    </nav>
  )
}
