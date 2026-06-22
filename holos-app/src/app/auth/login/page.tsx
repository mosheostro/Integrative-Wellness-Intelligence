'use client'
import { Suspense, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const params = useSearchParams()
  const next = params.get('next') || '/dashboard'
  const { strings } = useLanguage()
  const s = strings.auth

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true); setError('')
    const sb = createClient()
    const { error: err } = await sb.auth.signInWithPassword({ email, password })
    if (err) { setError(err.message); setLoading(false); return }
    // Hard navigation ensures fresh session cookies reach the server before
    // the middleware runs — prevents the redirect loop (login → dashboard →
    // login → …) that client-side router.push() can trigger with SSR auth.
    window.location.href = next
  }

  return (
    <div style={{ minHeight:'100dvh', display:'flex', alignItems:'center', justifyContent:'center', background:'var(--canvas)', padding:24 }}>
      <div className="mesh-bg" />
      {/* Back to home */}
      <Link href="/" style={{
        position:       'fixed',
        top:            20,
        left:           20,
        display:        'inline-flex',
        alignItems:     'center',
        gap:            6,
        fontFamily:     'var(--font-body)',
        fontSize:       '.82rem',
        color:          'var(--ink-soft)',
        textDecoration: 'none',
        padding:        '6px 12px',
        borderRadius:   8,
        background:     'rgba(0,0,0,.04)',
        transition:     'background .15s, color .15s',
        zIndex:         10,
      }}>
        {s.backHome}
      </Link>
      <div style={{ width:'100%', maxWidth:400 }}>
        {/* Logo */}
        <div style={{ textAlign:'center', marginBottom:40 }}>
          <svg width="40" height="40" viewBox="0 0 32 32" fill="none" style={{ margin:'0 auto 12px' }}>
            <circle cx="16" cy="16" r="14.5" stroke="var(--sage)" strokeWidth="1.4"/>
            <circle cx="16" cy="16" r="8" stroke="var(--gold-deep)" strokeWidth="1.4"/>
            <circle cx="16" cy="16" r="2.6" fill="var(--ink)"/>
          </svg>
          <h1 className="h2" style={{ marginBottom:6 }}>{s.welcomeBack}</h1>
          <p className="muted">{s.signInDesc}</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:16 }}>
          <div>
            <label className="label">{s.email}</label>
            <input className="input" type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="you@example.com"/>
          </div>
          <div>
            <label className="label">{s.password}</label>
            <input className="input" type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••"/>
          </div>
          {error && <p style={{ color:'var(--rose)', fontSize:'.875rem' }}>{error}</p>}
          <button className="btn btn-primary" type="submit" disabled={loading} style={{ marginTop:4 }}>
            {loading ? s.signingIn : s.signIn}
          </button>
        </form>

        <p style={{ textAlign:'center', marginTop:24, color:'var(--ink-soft)', fontSize:'.875rem' }}>
          {s.noAccount}{' '}
          <Link href="/auth/signup" style={{ color:'var(--sage)', textDecoration:'none', fontWeight:500 }}>
            {s.createFree}
          </Link>
        </p>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  )
}
