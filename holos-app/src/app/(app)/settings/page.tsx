'use client'
import { useState, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useLanguage, LOCALE_META, type Locale } from '@/contexts/LanguageContext'
import { useTheme, type Theme } from '@/contexts/ThemeContext'
import { BackButton } from '@/components/ui/BackButton'

type Section = 'appearance' | 'account' | 'notifications' | 'privacy' | 'data' | 'danger'

export default function SettingsPage() {
  const { strings, locale, setLocale } = useLanguage()
  const { theme, setTheme } = useTheme()
  const s = strings.settings
  const c = strings.common

  const SECTIONS: { id: Section; label: string; icon: string }[] = [
    { id: 'appearance',     label: s.appearance,   icon: '◐' },
    { id: 'account',        label: s.account,      icon: '◈' },
    { id: 'notifications',  label: s.notifications, icon: '◉' },
    { id: 'privacy',        label: s.privacy,       icon: '◆' },
    { id: 'data',           label: s.data,          icon: '◎' },
    { id: 'danger',         label: s.dangerZone,    icon: '✕' },
  ]

  const [section, setSection] = useState<Section>('appearance')
  const [prefs, setPrefs] = useState({
    emailAssessmentReminder: true,
    emailWeeklyDigest:       true,
    emailProductUpdates:     false,
    shareAnonymousData:      true,
    allowCoachHistory:       true,
    publicProfile:           false,
  })
  const [newPw, setNewPw]       = useState({ current: '', next: '', confirm: '' })
  const [pwStatus, setPwStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')
  const sbRef = useRef(createClient())
  const sb    = sbRef.current

  async function changePassword(e: React.FormEvent) {
    e.preventDefault()
    if (newPw.next !== newPw.confirm) return
    setPwStatus('saving')
    const { error } = await sb.auth.updateUser({ password: newPw.next })
    if (!error) {
      setPwStatus('saved')
      setNewPw({ current: '', next: '', confirm: '' })
      setTimeout(() => setPwStatus('idle'), 2500)
    } else {
      setPwStatus('error')
    }
  }

  async function signOut() {
    await sb.auth.signOut()
    window.location.href = '/'
  }

  async function deleteAccount() {
    const ok = confirm(s.deleteAccountDesc)
    if (!ok) return
    // Account deletion requires contacting support (proper delete flow TBD)
    window.location.href = '/contact'
  }

  const THEME_OPTIONS: { value: Theme; label: string }[] = [
    { value: 'light',  label: s.themeLight  },
    { value: 'dark',   label: s.themeDark   },
    { value: 'system', label: s.themeSystem },
  ]

  const LOCALES = Object.keys(LOCALE_META) as Locale[]

  return (
    <div style={{ maxWidth: 860, margin: '0 auto', padding: '32px 24px', display: 'grid', gridTemplateColumns: '200px 1fr', gap: 32, alignItems: 'start' }}>
      <div style={{ gridColumn: '1 / -1', marginBottom: 8 }}><BackButton href="/dashboard" /></div>
      {/* Sidebar nav */}
      <nav style={{ position: 'sticky', top: 80 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.73rem', textTransform: 'uppercase', letterSpacing: '.12em', color: 'var(--ink-faint)', marginBottom: 12 }}>{s.title}</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {SECTIONS.map(sv => (
            <button key={sv.id} onClick={() => setSection(sv.id)}
              style={{
                display:     'flex',
                alignItems:  'center',
                gap:         10,
                padding:     '10px 14px',
                borderRadius:'var(--radius)',
                border:      'none',
                background:  section === sv.id ? 'var(--surface)' : 'transparent',
                color:       section === sv.id ? (sv.id === 'danger' ? 'var(--rose)' : 'var(--ink)') : 'var(--ink-soft)',
                fontFamily:  'var(--font-body)',
                fontSize:    '.85rem',
                fontWeight:  section === sv.id ? 600 : 400,
                cursor:      'pointer',
                textAlign:   'left',
                borderLeft:  section === sv.id ? '2px solid var(--sage)' : '2px solid transparent',
              }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.7rem', color: sv.id === 'danger' ? 'var(--rose)' : 'var(--sage)' }}>{sv.icon}</span>
              {sv.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Content */}
      <div>

        {/* ── Appearance ───────────────────────────────────────────── */}
        {section === 'appearance' && (
          <div>
            <STitle>{s.appearance}</STitle>
            <Card>
              {/* Theme */}
              <div style={{ marginBottom: 28 }}>
                <FieldLabel>{s.theme}</FieldLabel>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
                  {THEME_OPTIONS.map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => setTheme(opt.value)}
                      style={{
                        padding:      '9px 18px',
                        borderRadius: 'var(--radius)',
                        border:       theme === opt.value ? '2px solid var(--sage)' : '1.5px solid var(--line)',
                        background:   theme === opt.value ? 'var(--surface-2)' : 'var(--canvas)',
                        color:        theme === opt.value ? 'var(--ink)' : 'var(--ink-soft)',
                        fontFamily:   'var(--font-body)',
                        fontSize:     '.85rem',
                        fontWeight:   theme === opt.value ? 600 : 400,
                        cursor:       'pointer',
                        transition:   'all .15s',
                      }}
                    >
                      {opt.value === 'light' ? '☀ ' : opt.value === 'dark' ? '🌙 ' : '⚙ '}
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Language */}
              <div>
                <FieldLabel>{s.language}</FieldLabel>
                <div style={{ fontSize: '.78rem', color: 'var(--ink-faint)', fontFamily: 'var(--font-body)', marginTop: 2, marginBottom: 10 }}>{s.languageDesc}</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8, maxWidth: 360 }}>
                  {LOCALES.map(l => {
                    const meta = LOCALE_META[l]
                    return (
                      <button
                        key={l}
                        onClick={() => setLocale(l)}
                        style={{
                          display:      'flex',
                          alignItems:   'center',
                          gap:          10,
                          padding:      '10px 14px',
                          borderRadius: 'var(--radius)',
                          border:       locale === l ? '2px solid var(--sage)' : '1.5px solid var(--line)',
                          background:   locale === l ? 'var(--surface-2)' : 'var(--canvas)',
                          color:        locale === l ? 'var(--ink)' : 'var(--ink-soft)',
                          fontFamily:   'var(--font-body)',
                          fontSize:     '.88rem',
                          fontWeight:   locale === l ? 600 : 400,
                          cursor:       'pointer',
                          textAlign:    'left',
                          transition:   'all .15s',
                        }}
                      >
                        <span style={{ fontSize: '1.15rem', lineHeight: 1 }}>{meta.flag}</span>
                        <span>{meta.label}</span>
                        {locale === l && <span style={{ marginLeft: 'auto', color: 'var(--sage-deep)', fontSize: '.75rem' }}>✓</span>}
                      </button>
                    )
                  })}
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* ── Account ──────────────────────────────────────────────── */}
        {section === 'account' && (
          <div>
            <STitle>{s.account}</STitle>
            <Card>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '.88rem', color: 'var(--ink-soft)', marginBottom: 20 }}>
                {s.accountDesc}
              </div>
              <form onSubmit={changePassword} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {(['current', 'next', 'confirm'] as const).map(f => (
                  <label key={f} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '.78rem', textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--ink-faint)', fontWeight: 600 }}>
                      {f === 'current' ? s.currentPw : f === 'next' ? s.newPw : s.confirmPw}
                    </span>
                    <input type="password" value={newPw[f]} onChange={e => setNewPw(p => ({ ...p, [f]: e.target.value }))}
                      style={{ padding: '10px 14px', borderRadius: 'var(--radius)', border: '1px solid var(--line)', background: 'var(--canvas)', fontFamily: 'var(--font-body)', fontSize: '.9rem', color: 'var(--ink)', outline: 'none' }} />
                  </label>
                ))}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 4 }}>
                  <button type="submit" disabled={pwStatus === 'saving'}
                    style={{ padding: '10px 22px', borderRadius: 'var(--radius)', background: 'var(--sage-deep)', color: '#fff', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '.88rem', border: 'none', cursor: 'pointer' }}>
                    {pwStatus === 'saving' ? s.updating : s.updatePw}
                  </button>
                  {pwStatus === 'saved' && <span style={{ fontFamily: 'var(--font-body)', fontSize: '.85rem', color: 'var(--sage-deep)', fontWeight: 600 }}>{s.updated}</span>}
                  {pwStatus === 'error' && <span style={{ fontFamily: 'var(--font-body)', fontSize: '.85rem', color: 'var(--rose)' }}>{c.error}</span>}
                </div>
              </form>
            </Card>
          </div>
        )}

        {/* ── Notifications ─────────────────────────────────────────── */}
        {section === 'notifications' && (
          <div>
            <STitle>{s.notifications}</STitle>
            <Card>
              <Toggle label={s.assessmentReminders} desc={s.assessmentRemindersDesc} value={prefs.emailAssessmentReminder} onChange={v => setPrefs(p => ({ ...p, emailAssessmentReminder: v }))} />
              <Toggle label={s.weeklyDigest} desc={s.weeklyDigestDesc} value={prefs.emailWeeklyDigest} onChange={v => setPrefs(p => ({ ...p, emailWeeklyDigest: v }))} />
              <Toggle label={s.productUpdates} desc={s.productUpdatesDesc} value={prefs.emailProductUpdates} onChange={v => setPrefs(p => ({ ...p, emailProductUpdates: v }))} />
            </Card>
          </div>
        )}

        {/* ── Privacy ───────────────────────────────────────────────── */}
        {section === 'privacy' && (
          <div>
            <STitle>{s.privacy}</STitle>
            <Card>
              <Toggle label={s.shareAnonymous} desc={s.shareAnonymousDesc} value={prefs.shareAnonymousData} onChange={v => setPrefs(p => ({ ...p, shareAnonymousData: v }))} />
              <Toggle label={s.coachHistory} desc={s.coachHistoryDesc} value={prefs.allowCoachHistory} onChange={v => setPrefs(p => ({ ...p, allowCoachHistory: v }))} />
              <Toggle label={s.publicProfile} desc={s.publicProfileDesc} value={prefs.publicProfile} onChange={v => setPrefs(p => ({ ...p, publicProfile: v }))} />
            </Card>
          </div>
        )}

        {/* ── Data & Export ─────────────────────────────────────────── */}
        {section === 'data' && (
          <div>
            <STitle>{s.data}</STitle>
            <Card>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '.88rem', color: 'var(--ink-soft)', marginBottom: 20, lineHeight: 1.65 }}>
                {s.exportDesc}
              </div>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <button style={{ padding: '10px 20px', borderRadius: 'var(--radius)', border: '1.5px solid var(--line)', background: 'transparent', color: 'var(--ink)', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '.85rem', cursor: 'pointer' }}>
                  {s.exportJSON}
                </button>
                <button style={{ padding: '10px 20px', borderRadius: 'var(--radius)', border: '1.5px solid var(--line)', background: 'transparent', color: 'var(--ink)', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '.85rem', cursor: 'pointer' }}>
                  {s.exportCSV}
                </button>
              </div>
            </Card>
          </div>
        )}

        {/* ── Danger Zone ── */}
        {section === 'danger' && (
          <div>
            <STitle>{s.dangerZone}</STitle>
            <Card>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-body)', fontWeight: 600, color: 'var(--ink)', marginBottom: 6 }}>{s.signOut}</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '.85rem', color: 'var(--ink-soft)', marginBottom: 12 }}>{s.signOutDesc}</div>
                  <button onClick={signOut} style={{ padding: '10px 22px', borderRadius: 'var(--radius)', border: '1.5px solid var(--line)', background: 'transparent', color: 'var(--ink)', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '.88rem', cursor: 'pointer' }}>
                    {s.signOutBtn}
                  </button>
                </div>
                <div style={{ borderTop: '1px solid var(--line)', paddingTop: 20 }}>
                  <div style={{ fontFamily: 'var(--font-body)', fontWeight: 600, color: 'var(--rose)', marginBottom: 6 }}>{s.deleteAccount}</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '.85rem', color: 'var(--ink-soft)', marginBottom: 12 }}>{s.deleteAccountDesc}</div>
                  <button onClick={deleteAccount} style={{ padding: '10px 22px', borderRadius: 'var(--radius)', border: '1.5px solid var(--rose)', background: 'transparent', color: 'var(--rose)', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '.88rem', cursor: 'pointer' }}>
                    {s.deleteAccountBtn}
                  </button>
                </div>
              </div>
            </Card>
          </div>
        )}

      </div>
    </div>
  )
}

function STitle({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.73rem', textTransform: 'uppercase', letterSpacing: '.12em', color: 'var(--ink-faint)', marginBottom: 16 }}>
      {children}
    </div>
  )
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--radius-lg)', padding: '24px', marginBottom: 24 }}>
      {children}
    </div>
  )
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontFamily: 'var(--font-body)', fontSize: '.82rem', fontWeight: 600, color: 'var(--ink)', marginBottom: 4 }}>
      {children}
    </div>
  )
}

function Toggle({ label, desc, value, onChange }: {
  label: string; desc: string; value: boolean; onChange: (v: boolean) => void
}) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, paddingBottom: 16, marginBottom: 16, borderBottom: '1px solid var(--line)' }}>
      <div>
        <div style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '.88rem', color: 'var(--ink)', marginBottom: 3 }}>{label}</div>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: '.8rem', color: 'var(--ink-soft)' }}>{desc}</div>
      </div>
      <button
        onClick={() => onChange(!value)}
        style={{
          width: 44, height: 24, borderRadius: 12, border: 'none',
          background: value ? 'var(--sage-deep)' : 'var(--line)',
          cursor: 'pointer', flexShrink: 0, position: 'relative',
          transition: 'background .2s',
        }}
      >
        <div style={{
          position: 'absolute', top: 3, left: value ? 23 : 3,
          width: 18, height: 18, borderRadius: '50%',
          background: '#fff', transition: 'left .2s',
        }} />
      </button>
    </div>
  )
}