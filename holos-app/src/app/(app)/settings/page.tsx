'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

type Section = 'account' | 'notifications' | 'privacy' | 'data' | 'danger'

const SECTIONS: { id: Section; label: string; icon: string }[] = [
  { id: 'account',       label: 'Account',       icon: '◈' },
  { id: 'notifications', label: 'Notifications',  icon: '◉' },
  { id: 'privacy',       label: 'Privacy',        icon: '◆' },
  { id: 'data',          label: 'Data & Export',  icon: '◎' },
  { id: 'danger',        label: 'Danger Zone',    icon: '✕' },
]

function Toggle({ label, desc, value, onChange }: { label: string; desc?: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, padding: '14px 0', borderBottom: '1px solid var(--line)' }}>
      <div>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: '.88rem', fontWeight: 600, color: 'var(--ink)' }}>{label}</div>
        {desc && <div style={{ fontFamily: 'var(--font-body)', fontSize: '.78rem', color: 'var(--ink-faint)', marginTop: 2 }}>{desc}</div>}
      </div>
      <button onClick={() => onChange(!value)} aria-checked={value} role="switch"
        style={{
          width:        44,
          height:       24,
          borderRadius: 12,
          border:       'none',
          background:   value ? 'var(--sage)' : 'var(--line)',
          cursor:       'pointer',
          position:     'relative',
          flexShrink:   0,
          transition:   'background .2s',
        }}>
        <div style={{
          width:      18,
          height:     18,
          borderRadius: '50%',
          background: '#fff',
          position:   'absolute',
          top:        3,
          left:       value ? 23 : 3,
          transition: 'left .2s',
          boxShadow:  '0 1px 3px rgba(0,0,0,.2)',
        }} />
      </button>
    </div>
  )
}

export default function SettingsPage() {
  const [section, setSection] = useState<Section>('account')
  const [prefs, setPrefs]     = useState({
    emailAssessmentReminder: true,
    emailWeeklyDigest:       true,
    emailProductUpdates:     false,
    shareAnonymousData:      true,
    allowCoachHistory:       true,
    publicProfile:           false,
  })
  const [newPw, setNewPw]       = useState({ current: '', next: '', confirm: '' })
  const [pwStatus, setPwStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')
  const router = useRouter()
  const sb     = createClient()

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
    router.push('/')
  }

  async function deleteAccount() {
    const ok = confirm('Are you sure? This will permanently delete your account and all data. This cannot be undone.')
    if (!ok) return
    alert('Please contact support at Moshe.Svarga@gmail.com to complete account deletion.')
  }

  return (
    <div style={{ maxWidth: 860, margin: '0 auto', padding: '32px 24px', display: 'grid', gridTemplateColumns: '200px 1fr', gap: 32, alignItems: 'start' }}>
      {/* Sidebar nav */}
      <nav style={{ position: 'sticky', top: 80 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.65rem', textTransform: 'uppercase', letterSpacing: '.12em', color: 'var(--ink-faint)', marginBottom: 12 }}>Settings</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {SECTIONS.map(s => (
            <button key={s.id} onClick={() => setSection(s.id)}
              style={{
                display:     'flex',
                alignItems:  'center',
                gap:         10,
                padding:     '10px 14px',
                borderRadius:'var(--radius)',
                border:      'none',
                background:  section === s.id ? 'var(--surface)' : 'transparent',
                color:       section === s.id ? (s.id === 'danger' ? 'var(--rose)' : 'var(--ink)') : 'var(--ink-soft)',
                fontFamily:  'var(--font-body)',
                fontSize:    '.85rem',
                fontWeight:  section === s.id ? 600 : 400,
                cursor:      'pointer',
                textAlign:   'left',
                borderLeft:  section === s.id ? '2px solid var(--sage)' : '2px solid transparent',
              }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.7rem', color: s.id === 'danger' ? 'var(--rose)' : 'var(--sage)' }}>{s.icon}</span>
              {s.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Content */}
      <div>
        {section === 'account' && (
          <div>
            <STitle>Account Settings</STitle>
            <Card>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '.88rem', color: 'var(--ink-soft)', marginBottom: 20 }}>
                Manage your password. For email or name changes, go to <strong>Profile</strong>.
              </div>
              <form onSubmit={changePassword} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {(['current', 'next', 'confirm'] as const).map(f => (
                  <label key={f} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '.72rem', textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--ink-faint)', fontWeight: 600 }}>
                      {f === 'current' ? 'Current password' : f === 'next' ? 'New password' : 'Confirm new password'}
                    </span>
                    <input type="password" value={newPw[f]} onChange={e => setNewPw(p => ({ ...p, [f]: e.target.value }))}
                      style={{ padding: '10px 14px', borderRadius: 'var(--radius)', border: '1px solid var(--line)', background: 'var(--canvas)', fontFamily: 'var(--font-body)', fontSize: '.9rem', color: 'var(--ink)', outline: 'none' }} />
                  </label>
                ))}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 4 }}>
                  <button type="submit" disabled={pwStatus === 'saving'}
                    style={{ padding: '10px 22px', borderRadius: 'var(--radius)', background: 'var(--sage)', color: '#fff', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '.88rem', border: 'none', cursor: 'pointer' }}>
                    {pwStatus === 'saving' ? 'Updating…' : 'Update password →'}
                  </button>
                  {pwStatus === 'saved' && <span style={{ fontFamily: 'var(--font-body)', fontSize: '.85rem', color: 'var(--sage)', fontWeight: 600 }}>✓ Updated</span>}
                  {pwStatus === 'error' && <span style={{ fontFamily: 'var(--font-body)', fontSize: '.85rem', color: 'var(--rose)' }}>Error — try again</span>}
                </div>
              </form>
            </Card>
          </div>
        )}

        {section === 'notifications' && (
          <div>
            <STitle>Notifications</STitle>
            <Card>
              <Toggle label="Assessment reminders" desc="Weekly reminders to take a new assessment" value={prefs.emailAssessmentReminder} onChange={v => setPrefs(p => ({ ...p, emailAssessmentReminder: v }))} />
              <Toggle label="Weekly wellness digest" desc="Summary of your progress every Sunday" value={prefs.emailWeeklyDigest} onChange={v => setPrefs(p => ({ ...p, emailWeeklyDigest: v }))} />
              <Toggle label="Product updates" desc="New features and tradition additions" value={prefs.emailProductUpdates} onChange={v => setPrefs(p => ({ ...p, emailProductUpdates: v }))} />
            </Card>
          </div>
        )}

        {section === 'privacy' && (
          <div>
            <STitle>Privacy</STitle>
            <Card>
              <Toggle label="Share anonymous usage data" desc="Help us improve HOLOS with anonymised usage statistics. No personal health data is shared." value={prefs.shareAnonymousData} onChange={v => setPrefs(p => ({ ...p, shareAnonymousData: v }))} />
              <Toggle label="AI Coach conversation history" desc="Allow the AI Coach to reference your previous conversations for continuity" value={prefs.allowCoachHistory} onChange={v => setPrefs(p => ({ ...p, allowCoachHistory: v }))} />
              <Toggle label="Public profile" desc="Allow others to see your wellness level and tradition preference" value={prefs.publicProfile} onChange={v => setPrefs(p => ({ ...p, publicProfile: v }))} />
            </Card>
          </div>
        )}

        {section === 'data' && (
          <div>
            <STitle>Data & Export</STitle>
            <Card>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '.88rem', color: 'var(--ink-soft)', marginBottom: 20, lineHeight: 1.65 }}>
                Export all your wellness data — assessments, scores, journal entries, goals, and habits — in standard formats.
              </div>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <button style={{ padding: '10px 20px', borderRadius: 'var(--radius)', border: '1.5px solid var(--line)', background: 'transparent', color: 'var(--ink)', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '.85rem', cursor: 'pointer' }}>
                  ↓ Export as JSON
                </button>
                <button style={{ padding: '10px 20px', borderRadius: 'var(--radius)', border: '1.5px solid var(--line)', background: 'transparent', color: 'var(--ink)', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '.85rem', cursor: 'pointer' }}>
                  ↓ Export as CSV
                </button>
              </div>
              <div style={{ marginTop: 20, fontFamily: 'var(--font-body)', fontSize: '.78rem', color: 'var(--ink-faint)' }}>
                Export generation takes a few seconds. A download link will appear when ready.
              </div>
            </Card>
          </div>
        )}

        {section === 'danger' && (
          <div>
            <STitle>Danger Zone</STitle>
            <Card>
              <div style={{ border: '1.5px solid rgba(176,96,112,.3)', borderRadius: 'var(--radius-lg)', padding: '20px' }}>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '.92rem', fontWeight: 600, color: 'var(--rose)', marginBottom: 8 }}>Sign out of all devices</div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '.82rem', color: 'var(--ink-soft)', marginBottom: 16 }}>Revoke all sessions. You will need to sign in again.</div>
                <button onClick={signOut} style={{ padding: '9px 18px', borderRadius: 'var(--radius)', background: 'transparent', border: '1.5px solid var(--rose)', color: 'var(--rose)', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '.85rem', cursor: 'pointer' }}>
                  Sign out →
                </button>
              </div>
              <div style={{ border: '1.5px solid rgba(176,96,112,.3)', borderRadius: 'var(--radius-lg)', padding: '20px', marginTop: 12 }}>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '.92rem', fontWeight: 600, color: 'var(--rose)', marginBottom: 8 }}>Delete my account</div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '.82rem', color: 'var(--ink-soft)', marginBottom: 16 }}>
                  Permanently delete your account and all associated data. This cannot be undone.
                </div>
                <button onClick={deleteAccount} style={{ padding: '9px 18px', borderRadius: 'var(--radius)', background: 'var(--rose)', border: 'none', color: '#fff', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '.85rem', cursor: 'pointer' }}>
                  Delete account
                </button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

function STitle({ children }: { children: React.ReactNode }) {
  return <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 500, color: 'var(--ink)', margin: '0 0 20px', letterSpacing: '-.02em' }}>{children}</h2>
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--radius-lg)', padding: '24px 28px' }}>
      {children}
    </div>
  )
}
