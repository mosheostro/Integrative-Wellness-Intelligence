'use client'
import { useState, useEffect, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useLanguage } from '@/contexts/LanguageContext'
import { LOCALE_META } from '@/lib/i18n/translations'
import { BackButton } from '@/components/ui/BackButton'

type Goal = { id: string; title: string; description: string; dimension: string; target_date: string | null; status: string; progress: number }

// Internal keys stored in DB (always English)
const DIMENSION_KEYS = ['Nutrition','Sleep','Recovery','Stress','Movement','Emotional','Life Balance','Purpose','Energy']

function StatusBadge({ status, label }: { status: string; label: string }) {
  const colors: Record<string, string> = { active: 'var(--sage)', completed: 'var(--indigo)', paused: 'var(--clay)' }
  return (
    <span style={{
      padding: '2px 10px', borderRadius: 100,
      background: (colors[status] ?? 'var(--ink)') + '18',
      color: colors[status] ?? 'var(--ink)',
      fontFamily: 'var(--font-body)', fontSize: '.78rem', fontWeight: 600,
    }}>{label}</span>
  )
}

const EMPTY_FORM = { title: '', description: '', dimension: DIMENSION_KEYS[0], target_date: '', status: 'active', progress: 0 }

export default function GoalsPage() {
  const { strings, locale } = useLanguage()
  const s = strings.goals
  const dims = strings.dimensions

  const dimLabel = (key: string): string => {
    const map: Record<string, string> = {
      'Nutrition': dims.nutrition, 'Sleep': dims.sleep, 'Recovery': dims.recovery,
      'Stress': dims.calm, 'Movement': dims.movement, 'Emotional': dims.emotional,
      'Life Balance': dims.balance, 'Purpose': dims.purpose, 'Energy': dims.energy,
    }
    return map[key] ?? key
  }

  const [goals, setGoals]       = useState<Goal[]>([])
  const [loading, setLoading]   = useState(true)
  const [form, setForm]         = useState(EMPTY_FORM)
  const [adding, setAdding]     = useState(false)
  const [saving, setSaving]     = useState(false)
  const [saveError, setSaveError] = useState('')

  const sbRef = useRef(createClient())
  const sb = sbRef.current

  useEffect(() => {
    sb.from('goals')
      .select('id, title, description, dimension, target_date, status, progress')
      .order('created_at', { ascending: false })
      .then(({ data }) => { setGoals((data as Goal[]) ?? []); setLoading(false) })
  }, [])

  async function addGoal(e: React.FormEvent) {
    e.preventDefault()
    if (!form.title.trim()) return
    setSaving(true)
    setSaveError('')
    try {
      const { data: { user } } = await sb.auth.getUser()
      if (!user) { setSaveError('Not signed in. Please refresh.'); return }
      const { data, error } = await sb.from('goals').insert({
        user_id: user.id, title: form.title.trim(), description: form.description.trim(),
        dimension: form.dimension, target_date: form.target_date || null,
        status: form.status, progress: form.progress,
      }).select('id, title, description, dimension, target_date, status, progress').single()
      if (error) { setSaveError(error.message); return }
      if (data) { setGoals(g => [data as Goal, ...g]); setForm(EMPTY_FORM); setAdding(false) }
    } catch (e: unknown) {
      setSaveError(e instanceof Error ? e.message : 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  async function updateProgress(id: string, progress: number) {
    await sb.from('goals').update({ progress, status: progress >= 100 ? 'completed' : 'active' }).eq('id', id)
    setGoals(gs => gs.map(g => g.id === id ? { ...g, progress, status: progress >= 100 ? 'completed' : 'active' } : g))
  }

  const activeGoals    = goals.filter(g => g.status === 'active')
  const completedGoals = goals.filter(g => g.status === 'completed')

  const dateLocale = LOCALE_META[locale].dateLocale

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 24px' }}>
      <BackButton href="/dashboard" style={{ marginBottom: 24 }} />
      {/* Header */}
      <div style={{ marginBottom: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.73rem', textTransform: 'uppercase', letterSpacing: '.14em', color: 'var(--sage-deep)', marginBottom: 8 }}>◆ {strings.nav.goals}</div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 500, letterSpacing: '-.02em', color: 'var(--ink)', margin: 0 }}>
            {s.title}
          </h1>
        </div>
        {!adding && (
          <button onClick={() => setAdding(true)}
            style={{ padding: '10px 20px', borderRadius: 'var(--radius)', background: 'var(--sage-deep)', color: '#fff', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '.85rem', border: 'none', cursor: 'pointer' }}>
            {s.addGoal}
          </button>
        )}
      </div>

      {/* Add form */}
      {adding && (
        <form onSubmit={addGoal} style={{ background: 'var(--surface)', border: '2px solid var(--sage)', borderRadius: 'var(--radius-lg)', padding: '28px', marginBottom: 32 }}>
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', color: 'var(--ink)', marginBottom: 20, fontWeight: 500 }}>{s.newGoal}</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <label style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '.78rem', textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--ink-faint)', fontWeight: 600 }}>{s.goalTitle}</span>
              <input required value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder={s.titlePlaceholder} style={{ padding: '10px 14px', borderRadius: 'var(--radius)', border: '1px solid var(--line)', background: 'var(--canvas)', fontFamily: 'var(--font-body)', fontSize: '.9rem', color: 'var(--ink)', outline: 'none' }} />
            </label>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '.78rem', textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--ink-faint)', fontWeight: 600 }}>{s.dimension}</span>
              <select value={form.dimension} onChange={e => setForm(f => ({ ...f, dimension: e.target.value }))} style={{ padding: '10px 14px', borderRadius: 'var(--radius)', border: '1px solid var(--line)', background: 'var(--canvas)', fontFamily: 'var(--font-body)', fontSize: '.9rem', color: 'var(--ink)', outline: 'none' }}>
                {DIMENSION_KEYS.map(d => <option key={d} value={d}>{dimLabel(d)}</option>)}
              </select>
            </label>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '.78rem', textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--ink-faint)', fontWeight: 600 }}>{s.targetDate}</span>
              <input type="date" value={form.target_date} onChange={e => setForm(f => ({ ...f, target_date: e.target.value }))} style={{ padding: '10px 14px', borderRadius: 'var(--radius)', border: '1px solid var(--line)', background: 'var(--canvas)', fontFamily: 'var(--font-body)', fontSize: '.9rem', color: 'var(--ink)', outline: 'none' }} />
            </label>
            <label style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '.78rem', textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--ink-faint)', fontWeight: 600 }}>{s.description}</span>
              <textarea rows={2} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder={s.descPlaceholder} style={{ padding: '10px 14px', borderRadius: 'var(--radius)', border: '1px solid var(--line)', background: 'var(--canvas)', fontFamily: 'var(--font-body)', fontSize: '.9rem', color: 'var(--ink)', outline: 'none', resize: 'vertical' }} />
            </label>
          </div>
          {saveError && (
            <div style={{ marginTop: 12, padding: '10px 14px', borderRadius: 'var(--radius)', background: 'oklch(0.97 0.03 15 / 0.5)', border: '1px solid oklch(0.70 0.10 15)', color: 'oklch(0.40 0.10 15)', fontFamily: 'var(--font-body)', fontSize: '.85rem' }}>
              {saveError}
            </div>
          )}
          <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
            <button type="submit" disabled={saving} style={{ padding: '10px 22px', borderRadius: 'var(--radius)', background: 'var(--sage-deep)', color: '#fff', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '.88rem', border: 'none', cursor: 'pointer' }}>
              {saving ? s.saving : s.addBtn}
            </button>
            <button type="button" onClick={() => setAdding(false)} style={{ padding: '10px 18px', borderRadius: 'var(--radius)', border: '1px solid var(--line)', background: 'transparent', color: 'var(--ink-soft)', fontFamily: 'var(--font-body)', fontSize: '.88rem', cursor: 'pointer' }}>
              {strings.common.cancel}
            </button>
          </div>
        </form>
      )}

      {/* Goals list */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: 48, color: 'var(--ink-faint)', fontFamily: 'var(--font-body)' }}>{s.loading}</div>
      ) : goals.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 64, background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--radius-lg)' }}>
          <div style={{ fontSize: '2rem', marginBottom: 12 }}>◆</div>
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--ink)', marginBottom: 8 }}>{s.noGoals}</div>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '.85rem', color: 'var(--ink-faint)' }}>{s.noGoalsDesc}</div>
        </div>
      ) : (
        <div>
          {activeGoals.length > 0 && (
            <div style={{ marginBottom: 40 }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.73rem', textTransform: 'uppercase', letterSpacing: '.12em', color: 'var(--ink-faint)', marginBottom: 16 }}>{s.active} ({activeGoals.length})</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {activeGoals.map(g => <GoalCard key={g.id} goal={g} onProgress={updateProgress} target={s.target} dateLocale={dateLocale} dimLabel={dimLabel} statusLabels={{ active: s.active, completed: s.completed, paused: s.paused }} />)}
              </div>
            </div>
          )}
          {completedGoals.length > 0 && (
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.73rem', textTransform: 'uppercase', letterSpacing: '.12em', color: 'var(--ink-faint)', marginBottom: 16 }}>{s.completed} ({completedGoals.length})</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {completedGoals.map(g => <GoalCard key={g.id} goal={g} onProgress={updateProgress} target={s.target} dateLocale={dateLocale} dimLabel={dimLabel} statusLabels={{ active: s.active, completed: s.completed, paused: s.paused }} />)}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function GoalCard({ goal, onProgress, target, dateLocale, dimLabel, statusLabels }: {
  goal: Goal; onProgress: (id: string, p: number) => void
  target: string; dateLocale: string; dimLabel: (k: string) => string
  statusLabels: Record<string, string>
}) {
  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--radius-lg)', padding: '20px 24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 12 }}>
        <div>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '.95rem', fontWeight: 600, color: 'var(--ink)', marginBottom: 4 }}>{goal.title}</div>
          {goal.description && <div style={{ fontFamily: 'var(--font-body)', fontSize: '.82rem', color: 'var(--ink-faint)' }}>{goal.description}</div>}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6, flexShrink: 0 }}>
          <StatusBadge status={goal.status} label={statusLabels[goal.status] ?? goal.status} />
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '.78rem', color: 'var(--sage-deep)', background: 'rgba(12