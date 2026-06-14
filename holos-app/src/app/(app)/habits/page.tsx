'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

type Habit = { id: string; title: string; dimension: string; frequency: string; streak: number; completed_today: boolean }

const DIMENSIONS = ['Nutrition','Sleep','Recovery','Stress','Movement','Emotional','Life Balance','Purpose','Energy']
const FREQUENCIES = ['daily', 'weekdays', 'weekly']

const DIMENSION_COLORS: Record<string, string> = {
  Nutrition:      'var(--sage)',
  Sleep:          'var(--indigo)',
  Recovery:       'var(--clay)',
  Stress:         'var(--rose)',
  Movement:       'var(--gold)',
  Emotional:      'var(--indigo)',
  'Life Balance': 'var(--sage)',
  Purpose:        'var(--gold)',
  Energy:         'var(--clay)',
}

const EMPTY_FORM = { title: '', dimension: DIMENSIONS[0], frequency: 'daily' }

export default function HabitsPage() {
  const [habits, setHabits]   = useState<Habit[]>([])
  const [loading, setLoading] = useState(true)
  const [form, setForm]       = useState(EMPTY_FORM)
  const [adding, setAdding]   = useState(false)
  const [saving, setSaving]   = useState(false)

  const sb = createClient()

  useEffect(() => {
    sb.from('habits')
      .select('id, title, dimension, frequency, streak, completed_today')
      .order('created_at', { ascending: true })
      .then(({ data }) => { setHabits((data as Habit[]) ?? []); setLoading(false) })
  }, [])

  async function addHabit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.title.trim()) return
    setSaving(true)
    const { data: { user } } = await sb.auth.getUser()
    const { data, error } = await sb.from('habits').insert({
      user_id:         user!.id,
      title:           form.title.trim(),
      dimension:       form.dimension,
      frequency:       form.frequency,
      streak:          0,
      completed_today: false,
    }).select('id, title, dimension, frequency, streak, completed_today').single()
    if (!error && data) {
      setHabits(h => [...h, data as Habit])
      setForm(EMPTY_FORM)
      setAdding(false)
    }
    setSaving(false)
  }

  async function toggleHabit(habit: Habit) {
    const newDone   = !habit.completed_today
    const newStreak = newDone ? habit.streak + 1 : Math.max(0, habit.streak - 1)
    await sb.from('habits').update({ completed_today: newDone, streak: newStreak }).eq('id', habit.id)
    setHabits(hs => hs.map(h => h.id === habit.id ? { ...h, completed_today: newDone, streak: newStreak } : h))
  }

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
  const doneCount = habits.filter(h => h.completed_today).length

  return (
    <div style={{ maxWidth: 860, margin: '0 auto', padding: '32px 24px' }}>
      {/* Header */}
      <div style={{ marginBottom: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.68rem', textTransform: 'uppercase', letterSpacing: '.14em', color: 'var(--sage)', marginBottom: 8 }}>◉ Habits</div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 500, letterSpacing: '-.02em', color: 'var(--ink)', margin: 0 }}>
            Daily Habits
          </h1>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '.82rem', color: 'var(--ink-faint)', marginTop: 6 }}>{today}</div>
        </div>
        {!adding && (
          <button onClick={() => setAdding(true)} style={{ padding: '10px 20px', borderRadius: 'var(--radius)', background: 'var(--sage)', color: '#fff', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '.85rem', border: 'none', cursor: 'pointer' }}>
            + Add habit
          </button>
        )}
      </div>

      {/* Daily progress */}
      {habits.length > 0 && (
        <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--radius-lg)', padding: '20px 24px', marginBottom: 28 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '.85rem', fontWeight: 600, color: 'var(--ink)' }}>
              Today&apos;s progress
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.82rem', color: 'var(--sage)' }}>
              {doneCount}/{habits.length}
            </span>
          </div>
          <div style={{ height: 8, background: 'var(--line)', borderRadius: 4, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: habits.length ? `${(doneCount / habits.length) * 100}%` : '0%', background: 'var(--sage)', borderRadius: 4, transition: 'width .4s' }} />
          </div>
          {doneCount === habits.length && habits.length > 0 && (
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '.82rem', color: 'var(--sage)', marginTop: 8, fontWeight: 600 }}>
              ✓ All habits completed today — outstanding!
            </div>
          )}
        </div>
      )}

      {/* Add form */}
      {adding && (
        <form onSubmit={addHabit} style={{ background: 'var(--surface)', border: '2px solid var(--sage)', borderRadius: 'var(--radius-lg)', padding: '24px', marginBottom: 24 }}>
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', color: 'var(--ink)', marginBottom: 16, fontWeight: 500 }}>New habit</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
            <label style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '.7rem', textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--ink-faint)', fontWeight: 600 }}>Habit *</span>
              <input required value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="e.g. Morning meditation — 10 min" style={{ padding: '10px 14px', borderRadius: 'var(--radius)', border: '1px solid var(--line)', background: 'var(--canvas)', fontFamily: 'var(--font-body)', fontSize: '.9rem', color: 'var(--ink)', outline: 'none' }} />
            </label>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '.7rem', textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--ink-faint)', fontWeight: 600 }}>Dimension</span>
              <select value={form.dimension} onChange={e => setForm(f => ({ ...f, dimension: e.target.value }))} style={{ padding: '10px 14px', borderRadius: 'var(--radius)', border: '1px solid var(--line)', background: 'var(--canvas)', fontFamily: 'var(--font-body)', fontSize: '.9rem', color: 'var(--ink)', outline: 'none' }}>
                {DIMENSIONS.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </label>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '.7rem', textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--ink-faint)', fontWeight: 600 }}>Frequency</span>
              <select value={form.frequency} onChange={e => setForm(f => ({ ...f, frequency: e.target.value }))} style={{ padding: '10px 14px', borderRadius: 'var(--radius)', border: '1px solid var(--line)', background: 'var(--canvas)', fontFamily: 'var(--font-body)', fontSize: '.9rem', color: 'var(--ink)', outline: 'none' }}>
                {FREQUENCIES.map(f => <option key={f} value={f}>{f.charAt(0).toUpperCase() + f.slice(1)}</option>)}
              </select>
            </label>
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
            <button type="submit" disabled={saving} style={{ padding: '10px 22px', borderRadius: 'var(--radius)', background: 'var(--sage)', color: '#fff', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '.85rem', border: 'none', cursor: 'pointer' }}>
              {saving ? 'Saving…' : 'Add habit →'}
            </button>
            <button type="button" onClick={() => setAdding(false)} style={{ padding: '10px 18px', borderRadius: 'var(--radius)', border: '1px solid var(--line)', background: 'transparent', color: 'var(--ink-soft)', fontFamily: 'var(--font-body)', fontSize: '.85rem', cursor: 'pointer' }}>
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Habits list */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: 48, color: 'var(--ink-faint)', fontFamily: 'var(--font-body)' }}>Loading…</div>
      ) : habits.length === 0 && !adding ? (
        <div style={{ textAlign: 'center', padding: 64, background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--radius-lg)' }}>
          <div style={{ fontSize: '2rem', marginBottom: 12 }}>◉</div>
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--ink)', marginBottom: 8 }}>No habits yet</div>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '.85rem', color: 'var(--ink-faint)', marginBottom: 20 }}>Small daily practices compound into lasting transformation.</div>
          <button onClick={() => setAdding(true)} style={{ padding: '10px 20px', borderRadius: 'var(--radius)', background: 'var(--sage)', color: '#fff', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '.85rem', border: 'none', cursor: 'pointer' }}>
            Add your first habit →
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {habits.map(h => {
            const color = DIMENSION_COLORS[h.dimension] ?? 'var(--sage)'
            return (
              <button key={h.id} onClick={() => toggleHabit(h)}
                style={{
                  display:       'flex',
                  alignItems:    'center',
                  gap:           16,
                  padding:       '18px 22px',
                  borderRadius:  'var(--radius-lg)',
                  border:        `1.5px solid ${h.completed_today ? 'var(--sage)' : 'var(--line)'}`,
                  background:    h.completed_today ? 'rgba(122,158,142,.06)' : 'var(--surface)',
                  cursor:        'pointer',
                  textAlign:     'left',
                  transition:    'all .2s',
                }}>
                <div style={{
                  width:          32,
                  height:         32,
                  borderRadius:   '50%',
                  border:         `2px solid ${h.completed_today ? 'var(--sage)' : 'var(--line)'}`,
                  background:     h.completed_today ? 'var(--sage)' : 'transparent',
                  display:        'flex',
                  alignItems:     'center',
                  justifyContent: 'center',
                  color:          '#fff',
                  fontSize:       '.75rem',
                  flexShrink:     0,
                  transition:     'all .2s',
                }}>
                  {h.completed_today && '✓'}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontFamily:      'var(--font-body)',
                    fontSize:        '.92rem',
                    fontWeight:      600,
                    color:           h.completed_today ? 'var(--ink-soft)' : 'var(--ink)',
                    textDecoration:  h.completed_today ? 'line-through' : 'none',
                    textDecorationColor: 'var(--line)',
                  }}>
                    {h.title}
                  </div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '.75rem', color: 'var(--ink-faint)', marginTop: 2 }}>
                    {h.dimension} · {h.frequency}
                  </div>
                </div>
                {h.streak > 0 && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'var(--font-mono)', fontSize: '.75rem', color, flexShrink: 0 }}>
                    🔥 {h.streak}
                  </div>
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
