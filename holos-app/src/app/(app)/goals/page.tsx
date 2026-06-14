'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

type Goal = { id: string; title: string; description: string; dimension: string; target_date: string | null; status: string; progress: number }

const DIMENSIONS = ['Nutrition','Sleep','Recovery','Stress','Movement','Emotional','Life Balance','Purpose','Energy']
const STATUSES = ['active', 'completed', 'paused']

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = { active: 'var(--sage)', completed: 'var(--indigo)', paused: 'var(--clay)' }
  return (
    <span style={{
      padding:    '2px 10px',
      borderRadius: 100,
      background: (colors[status] ?? 'var(--ink)') + '18',
      color:      colors[status] ?? 'var(--ink)',
      fontFamily: 'var(--font-body)',
      fontSize:   '.72rem',
      fontWeight: 600,
      textTransform: 'capitalize',
    }}>{status}</span>
  )
}

const EMPTY_FORM = { title: '', description: '', dimension: DIMENSIONS[0], target_date: '', status: 'active', progress: 0 }

export default function GoalsPage() {
  const [goals, setGoals]     = useState<Goal[]>([])
  const [loading, setLoading] = useState(true)
  const [form, setForm]       = useState(EMPTY_FORM)
  const [adding, setAdding]   = useState(false)
  const [saving, setSaving]   = useState(false)

  const sb = createClient()

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
    const { data: { user } } = await sb.auth.getUser()
    const { data, error } = await sb.from('goals').insert({
      user_id:     user!.id,
      title:       form.title.trim(),
      description: form.description.trim(),
      dimension:   form.dimension,
      target_date: form.target_date || null,
      status:      form.status,
      progress:    form.progress,
    }).select('id, title, description, dimension, target_date, status, progress').single()
    if (!error && data) {
      setGoals(g => [data as Goal, ...g])
      setForm(EMPTY_FORM)
      setAdding(false)
    }
    setSaving(false)
  }

  async function updateProgress(id: string, progress: number) {
    await sb.from('goals').update({ progress, status: progress >= 100 ? 'completed' : 'active' }).eq('id', id)
    setGoals(gs => gs.map(g => g.id === id ? { ...g, progress, status: progress >= 100 ? 'completed' : 'active' } : g))
  }

  const activeGoals    = goals.filter(g => g.status === 'active')
  const completedGoals = goals.filter(g => g.status === 'completed')

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 24px' }}>
      {/* Header */}
      <div style={{ marginBottom: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.68rem', textTransform: 'uppercase', letterSpacing: '.14em', color: 'var(--sage)', marginBottom: 8 }}>◆ Goals</div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 500, letterSpacing: '-.02em', color: 'var(--ink)', margin: 0 }}>
            Wellness Goals
          </h1>
        </div>
        {!adding && (
          <button onClick={() => setAdding(true)}
            style={{
              padding:    '10px 20px',
              borderRadius: 'var(--radius)',
              background: 'var(--sage)',
              color:      '#fff',
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              fontSize:   '.85rem',
              border:     'none',
              cursor:     'pointer',
            }}>
            + Add goal
          </button>
        )}
      </div>

      {/* Add form */}
      {adding && (
        <form onSubmit={addGoal} style={{ background: 'var(--surface)', border: '2px solid var(--sage)', borderRadius: 'var(--radius-lg)', padding: '28px', marginBottom: 32 }}>
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', color: 'var(--ink)', marginBottom: 20, fontWeight: 500 }}>New goal</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <label style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '.72rem', textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--ink-faint)', fontWeight: 600 }}>Goal title *</span>
              <input required value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="e.g. Sleep 8 hours every night" style={{ padding: '10px 14px', borderRadius: 'var(--radius)', border: '1px solid var(--line)', background: 'var(--canvas)', fontFamily: 'var(--font-body)', fontSize: '.9rem', color: 'var(--ink)', outline: 'none' }} />
            </label>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '.72rem', textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--ink-faint)', fontWeight: 600 }}>Dimension</span>
              <select value={form.dimension} onChange={e => setForm(f => ({ ...f, dimension: e.target.value }))} style={{ padding: '10px 14px', borderRadius: 'var(--radius)', border: '1px solid var(--line)', background: 'var(--canvas)', fontFamily: 'var(--font-body)', fontSize: '.9rem', color: 'var(--ink)', outline: 'none' }}>
                {DIMENSIONS.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </label>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '.72rem', textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--ink-faint)', fontWeight: 600 }}>Target date</span>
              <input type="date" value={form.target_date} onChange={e => setForm(f => ({ ...f, target_date: e.target.value }))} style={{ padding: '10px 14px', borderRadius: 'var(--radius)', border: '1px solid var(--line)', background: 'var(--canvas)', fontFamily: 'var(--font-body)', fontSize: '.9rem', color: 'var(--ink)', outline: 'none' }} />
            </label>
            <label style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '.72rem', textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--ink-faint)', fontWeight: 600 }}>Description</span>
              <textarea rows={2} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Why does this goal matter?" style={{ padding: '10px 14px', borderRadius: 'var(--radius)', border: '1px solid var(--line)', background: 'var(--canvas)', fontFamily: 'var(--font-body)', fontSize: '.9rem', color: 'var(--ink)', outline: 'none', resize: 'vertical' }} />
            </label>
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
            <button type="submit" disabled={saving} style={{ padding: '10px 22px', borderRadius: 'var(--radius)', background: 'var(--sage)', color: '#fff', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '.88rem', border: 'none', cursor: 'pointer' }}>
              {saving ? 'Saving…' : 'Add goal →'}
            </button>
            <button type="button" onClick={() => setAdding(false)} style={{ padding: '10px 18px', borderRadius: 'var(--radius)', border: '1px solid var(--line)', background: 'transparent', color: 'var(--ink-soft)', fontFamily: 'var(--font-body)', fontSize: '.88rem', cursor: 'pointer' }}>
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Goals list */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: 48, color: 'var(--ink-faint)', fontFamily: 'var(--font-body)' }}>Loading…</div>
      ) : goals.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 64, background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--radius-lg)' }}>
          <div style={{ fontSize: '2rem', marginBottom: 12 }}>◆</div>
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--ink)', marginBottom: 8 }}>No goals yet</div>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '.85rem', color: 'var(--ink-faint)' }}>Set your first wellness goal to track what matters most.</div>
        </div>
      ) : (
        <div>
          {activeGoals.length > 0 && (
            <div style={{ marginBottom: 40 }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.65rem', textTransform: 'uppercase', letterSpacing: '.12em', color: 'var(--ink-faint)', marginBottom: 16 }}>Active ({activeGoals.length})</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {activeGoals.map(g => (
                  <GoalCard key={g.id} goal={g} onProgress={updateProgress} />
                ))}
              </div>
            </div>
          )}
          {completedGoals.length > 0 && (
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.65rem', textTransform: 'uppercase', letterSpacing: '.12em', color: 'var(--ink-faint)', marginBottom: 16 }}>Completed ({completedGoals.length})</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {completedGoals.map(g => (
                  <GoalCard key={g.id} goal={g} onProgress={updateProgress} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function GoalCard({ goal, onProgress }: { goal: Goal; onProgress: (id: string, p: number) => void }) {
  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--radius-lg)', padding: '20px 24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 12 }}>
        <div>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '.95rem', fontWeight: 600, color: 'var(--ink)', marginBottom: 4 }}>{goal.title}</div>
          {goal.description && <div style={{ fontFamily: 'var(--font-body)', fontSize: '.82rem', color: 'var(--ink-faint)' }}>{goal.description}</div>}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6, flexShrink: 0 }}>
          <StatusBadge status={goal.status} />
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '.72rem', color: 'var(--sage)', background: 'rgba(122,158,142,.1)', padding: '2px 8px', borderRadius: 100 }}>{goal.dimension}</span>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ flex: 1, height: 6, background: 'var(--line)', borderRadius: 3, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${goal.progress}%`, background: 'var(--sage)', borderRadius: 3, transition: 'width .3s' }} />
        </div>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.75rem', color: 'var(--ink-soft)', minWidth: 32, textAlign: 'right' }}>{goal.progress}%</span>
        {goal.status !== 'completed' && (
          <div style={{ display: 'flex', gap: 4 }}>
            {[25, 50, 75, 100].map(p => (
              <button key={p} onClick={() => onProgress(goal.id, p)}
                style={{ padding: '3px 8px', borderRadius: 4, border: '1px solid var(--line)', background: goal.progress >= p ? 'var(--sage)' : 'transparent', color: goal.progress >= p ? '#fff' : 'var(--ink-faint)', fontFamily: 'var(--font-mono)', fontSize: '.65rem', cursor: 'pointer' }}>
                {p}
              </button>
            ))}
          </div>
        )}
      </div>
      {goal.target_date && (
        <div style={{ marginTop: 8, fontFamily: 'var(--font-body)', fontSize: '.75rem', color: 'var(--ink-faint)' }}>
          Target: {new Date(goal.target_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </div>
      )}
    </div>
  )
}
