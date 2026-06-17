'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'
import { BackButton } from '@/components/ui/BackButton'

type Profile = {
  id: string
  email: string
  full_name: string
  avatar_url: string
  bio: string
  location: string
  date_of_birth: string
  preferred_framework: string
  timezone: string
  onboarding_completed: boolean
  xp: number
  level: number
}

const FRAMEWORKS = ['evidence-based','rambam','hippocrates','avicenna','ayurveda','daoist','tibetan','swarga']
const TIMEZONES = ['UTC','America/New_York','America/Los_Angeles','America/Chicago','Europe/London','Europe/Paris','Asia/Jerusalem','Asia/Kolkata','Asia/Tokyo','Australia/Sydney']

export default function ProfilePage() {
  const [profile, setProfile]   = useState<Partial<Profile>>({})
  const [loading, setLoading]   = useState(true)
  const [saving, setSaving]     = useState(false)
  const [saved, setSaved]       = useState(false)
  const router                  = useRouter()
  const sb                      = createClient()
  const { strings } = useLanguage()
  const s = strings.profile

  useEffect(() => {
    sb.auth.getUser().then(({ data: { user } }) => {
      if (!user) { router.push('/auth/login'); return }
      sb.from('profiles').select('*').eq('id', user.id).single().then(({ data }) => {
        setProfile({ ...(data ?? {}), email: user.email ?? '', id: user.id })
        setLoading(false)
      })
    })
  }, [])

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    const { error } = await sb.from('profiles').upsert({
      id:                   profile.id,
      full_name:            profile.full_name ?? '',
      bio:                  profile.bio ?? '',
      location:             profile.location ?? '',
      date_of_birth:        profile.date_of_birth || null,
      preferred_framework:  profile.preferred_framework ?? 'swarga',
      timezone:             profile.timezone ?? 'UTC',
      updated_at:           new Date().toISOString(),
    })
    setSaving(false)
    if (!error) {
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    }
  }

  const F = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <span style={{ fontFamily: 'var(--font-body)', fontSize: '.72rem', textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--ink-faint)', fontWeight: 600 }}>{label}</span>
      {children}
    </label>
  )

  const inputStyle = {
    padding: '10px 14px',
    borderRadius: 'var(--radius)',
    border: '1px solid var(--line)',
    background: 'var(--canvas)',
    fontFamily: 'var(--font-body)',
    fontSize: '.9rem',
    color: 'var(--ink)',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box' as const,
  }

  if (loading) return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '32px 24px', textAlign: 'center', color: 'var(--ink-faint)', fontFamily: 'var(--font-body)' }}>{s.loading}</div>
  )

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '32px 24px' }}>
      <BackButton href="/dashboard" style={{ marginBottom: 24 }} />
      <div style={{ marginBottom: 36 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.68rem', textTransform: 'uppercase', letterSpacing: '.14em', color: 'var(--sage-deep)', marginBottom: 8 }}>◈ {strings.nav.profile}</div>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 500, letterSpacing: '-.02em', color: 'var(--ink)', margin: 0 }}>
          {s.title}
        </h1>
      </div>

      {/* Avatar + XP */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--radius-lg)', padding: '24px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 20 }}>
        <div style={{
          width: 64, height: 64, borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--sage) 0%, var(--indigo) 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.6rem', color: '#fff', flexShrink: 0,
        }}>
          {(profile.full_name ?? profile.email ?? 'U')[0].toUpperCase()}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', fontWeight: 500, color: 'var(--ink)', marginBottom: 2 }}>
            {profile.full_name || s.wellnessSeeker}
          </div>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '.8rem', color: 'var(--ink-faint)', marginBottom: 8 }}>
            {profile.email}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.72rem', color: 'var(--gold)', background: 'rgba(196,165,90,.12)', padding: '2px 10px', borderRadius: 100 }}>
              {s.level} {profile.level ?? 1}
            </span>
            <div style={{ flex: 1, height: 4, background: 'var(--line)', borderRadius: 2, maxWidth: 120 }}>
              <div style={{ height: '100%', width: `${((profile.xp ?? 0) % 100)}%`, background: 'var(--gold)', borderRadius: 2 }} />
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.7rem', color: 'var(--ink-faint)' }}>{profile.xp ?? 0} XP</span>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSave} style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--radius-lg)', padding: '28px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <F label={s.fullName}>
            <input value={profile.full_name ?? ''} onChange={e => setProfile(p => ({ ...p, full_name: e.target.value }))} placeholder={s.namePlaceholder} style={inputStyle} />
          </F>
          <F label={s.email}>
            <input value={profile.email ?? ''} disabled style={{ ...inputStyle, opacity: 0.5, cursor: 'not-allowed' }} />
          </F>
          <F label={s.location}>
            <input value={profile.location ?? ''} onChange={e => setProfile(p => ({ ...p, location: e.target.value }))} placeholder={s.locationPlaceholder} style={inputStyle} />
          </F>
          <F label={s.dob}>
            <input type="date" value={profile.date_of_birth ?? ''} onChange={e => setProfile(p => ({ ...p, date_of_birth: e.target.value }))} style={inputStyle} />
          </F>
          <F label={s.tradition}>
            <select value={profile.preferred_framework ?? 'swarga'} onChange={e => setProfile(p => ({ ...p, preferred_framework: e.target.value }))} style={inputStyle}>
              {FRAMEWORKS.map(f => <option key={f} value={f}>{f.charAt(0).toUpperCase() + f.slice(1).replace('-', ' ')}</option>)}
            </select>
          </F>
          <F label={s.timezone}>
            <select value={profile.timezone ?? 'UTC'} onChange={e => setProfile(p => ({ ...p, timezone: e.target.value }))} style={inputStyle}>
              {TIMEZONES.map(tz => <option key={tz} value={tz}>{tz}</option>)}
            </select>
          </F>
          <label style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '.72rem', textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--ink-faint)', fontWeight: 600 }}>{s.bio}</span>
            <textarea rows={3} value={profile.bio ?? ''} onChange={e => setProfile(p => ({ ...p, bio: e.target.value }))} placeholder={s.bioPlaceholder} style={{ ...inputStyle, resize: 'vertical' }} />
          </label>
        </div>

        <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
          <button type="submit" disabled={saving}
            style={{ padding: '11px 24px', borderRadius: 'var(--radius)', background: saving ? 'var(--line)' : 'var(--sage-deep)', color: '#fff', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '.9rem', border: 'none', cursor: saving ? 'wait' : 'pointer' }}>
            {saving ? s.saving : s.saveProfile}
          </button>
          {saved && (
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '.85rem', color: 'var(--sage-deep)', fontWeight: 600 }}>{s.saved}</span>
          )}
        </div>
      </form>
    </div>
  )
}