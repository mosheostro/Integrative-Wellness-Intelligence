'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

export default function SignupPage() {
  const [name, setName]         = useState('')
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')
  const { strings } = useLanguage()
  const s = strings.auth

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true); setError('')
    const sb = createClient()
    const { error: err } = await sb.auth.signUp({
      email, password,
      options: { data: { full_name: name } },
    })
    if (err) { setError(err.message); setLoading(false); return }
    window.location.href = '/dashboard'
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
        <div style={{ textAlign:'center', marginBottom:40 }}>
          <svg width="40" height="40" viewBox="0 0 32 32" fill="none" style={{ margin:'0 auto 12px' }}>
            <circle cx="16" cy="16" r="14.5" stroke="var(--sage)" strokeWidth="1.4"/>
            <circle cx="16" cy="16" r="8" stroke="var(--gold-deep)" strokeWidth="1.4"/>
            <circle cx="16" cy="16" r="2.6" fill="var(--ink)"/>
          </svg>
          <h1 className="h2" style={{ marginBottom:6 }}>{s.createAccount}</h1>
          <p className="muted">{s.createDesc}</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:16 }}>
          <div>
            <label className="label">{s.fullName}</label>
            <input className="input" type="text" value={name} onChange={e => setName(e.target.value)} required placeholder="Your name"/>
          </div>
          <div>
            <label className="label">{s.email}</label>
            <input className="input" type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="you@example.com"/>
          </div>
          <div>
            <label className="label">{s.password}</label>
            <input className="input" type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="8+ characters" minLength={8}/>
          </div>
          {error && <p style={{ color:'var(--rose)', fontSize:'.875rem' }}>{error}</p>}
          <button className="btn btn-primary" type="submit" disabled={loading} style={{ marginTop:4 }}>
            {loading ? s.creatingAccount : s.createBtn}
          </button>
        </form>

        <p style={{ textAlign:'center', marginTop:24, color:'var(--ink-soft)', fontSize:'.875rem' }}>
          {s.haveAccount}{' '}
          <Link href="/auth/login" style={{ color:'var(--sage)', textDecoration:'none', fontWeight:500 }}>{s.signInLink}</Link>
        </p>
      </div>
    </div>
  )
}
