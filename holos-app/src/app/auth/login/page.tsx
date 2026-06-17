'use client'
import { Suspense, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
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
    router.push(next)
  }

  return (
    <div style={{ minHeight:'100dvh', display:'flex', alignItems:'center', justifyContent:'center', background:'var(--canvas)', padding:24 }}>
      <div className="mesh-bg" />
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
          <Link href="/auth/signup" style={{ color:'var(--sage)', textDecoration:'none', fo