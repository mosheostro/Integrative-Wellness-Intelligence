'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

type Entry = { id: string; created_at: string; content: string; mood: number | null; dimension_tags: string[] }

const MOODS = [
  { v: 1, label: 'Struggling', color: 'var(--rose)' },
  { v: 2, label: 'Low',        color: 'var(--clay)' },
  { v: 3, label: 'Okay',       color: 'var(--gold)' },
  { v: 4, label: 'Good',       color: 'var(--sage)' },
  { v: 5, label: 'Thriving',   color: 'var(--indigo)' },
]

const DIMENSION_TAGS = ['Nutrition','Sleep','Recovery','Stress','Movement','Emotional','Life Balance','Purpose','Energy']

export default function JournalPage() {
  const [entries, setEntries]     = useState<Entry[]>([])
  const [draft, setDraft]         = useState('')
  const [mood, setMood]           = useState<number>(3)
  const [tags, setTags]           = useState<string[]>([])
  const [saving, setSaving]       = useState(false)
  const [loading, setLoading]     = useState(true)
  const [view, setView]           = useState<'write' | 'history'>('write')

  const sb = createClient()

  useEffect(() => {
    sb.from('journal_entries')
      .select('id, created_at, content, mood, dimension_tags')
      .order('created_at', { ascending: false })
      .limit(30)
      .then(({ data }) => {
        setEntries((data as Entry[]) ?? [])
        setLoading(false)
      })
  }, [])

  async function save() {
    if (!draft.trim()) return
    setSaving(true)
    const { data: { user } } = await sb.auth.getUser()
    const { data, error } = await sb.from('journal_entries').insert({
      user_id:        user!.id,
      content:        draft.trim(),
      mood,
      dimension_tags: tags,
    }).select('id, created_at, content, mood, dimension_tags').single()
    if (!error && data) {
      setEntries(e => [data as Entry, ...e])
      setDraft('')
      setMood(3)
      setTags([])
      setView('history')
    }
    setSaving(false)
  }

  const dateLabel = (iso: string) => {
    const d = new Date(iso)
    return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
  }

  return (
    <div style={{ maxWidth: 820, margin: '0 auto', padding: '32px 24px' }}>
      {/* Header */}
      <div style={{ marginBottom: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.68rem', textTransform: 'uppercase', letterSpacing: '.14em', color: 'var(--sage)', marginBottom: 8 }}>◈ Journal</div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 500, letterSpacing: '-.02em', color: 'var(--ink)', margin: 0 }}>
            Wellness Journal
          </h1>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {(['write', 'history'] as const).map(v => (
            <button key={v} onClick={() => setView(v)}
              style={{
                padding:      '8px 18px',
                borderRadius: 'var(--radius)',
                border:       '1px solid var(--line)',
                background:   view === v ? 'var(--ink)' : 'var(--surface)',
                color:        view === v ? '#fff' : 'var(--ink-soft)',
                fontFamily:   'var(--font-body)',
                fontSize:     '.82rem',
                fontWeight:   view === v ? 600 : 400,
                cursor:       'pointer',
                textTransform:'capitalize',
              }}>
              {v === 'write' ? '✎ Write' : '◎ History'}
            </button>
          ))}
        </div>
      </div>

      {view === 'write' ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Date */}
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '.82rem', color: 'var(--ink-faint)' }}>
            {dateLabel(new Date().toISOString())}
          </div>

          {/* Text area */}
          <textarea
            value={draft}
            onChange={e => setDraft(e.target.value)}
            placeholder="What are you noticing about your wellness today? Any patterns, sensations, wins, or struggles..."
            rows={8}
            style={{
              width:        '100%',
              padding:      '20px',
              borderRadius: 'var(--radius-lg)',
              border:       '1px solid var(--line)',
              background:   'var(--surface)',
              fontFamily:   'var(--font-body)',
              fontSize:     '1rem',
              lineHeight:   1.75,
              color:        'var(--ink)',
              resize:       'vertical',
              outline:      'none',
              boxSizing:    'border-box',
            }}
          />

          {/* Mood */}
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.65rem', textTransform: 'uppercase', letterSpacing: '.12em', color: 'var(--ink-faint)', marginBottom: 10 }}>How are you feeling?</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {MOODS.map(m => (
                <button key={m.v} onClick={() => setMood(m.v)}
                  style={{
                    padding:      '8px 16px',
                    borderRadius: 100,
                    border:       `1.5px solid ${mood === m.v ? m.color : 'var(--line)'}`,
                    background:   mood === m.v ? m.color + '20' : 'transparent',
                    color:        mood === m.v ? m.color : 'var(--ink-soft)',
                    fontFamily:   'var(--font-body)',
                    fontSize:     '.82rem',
                    fontWeight:   mood === m.v ? 600 : 400,
                    cursor:       'pointer',
                  }}>
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Dimension tags */}
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.65rem', textTransform: 'uppercase', letterSpacing: '.12em', color: 'var(--ink-faint)', marginBottom: 10 }}>Tag dimensions (optional)</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {DIMENSION_TAGS.map(t => {
                const on = tags.includes(t)
                return (
                  <button key={t} onClick={() => setTags(ts => on ? ts.filter(x => x !== t) : [...ts, t])}
                    style={{
                      padding:      '6px 14px',
                      borderRadius: 100,
                      border:       `1px solid ${on ? 'var(--sage)' : 'var(--line)'}`,
                      background:   on ? 'rgba(122,158,142,.12)' : 'transparent',
                      color:        on ? 'var(--sage)' : 'var(--ink-faint)',
                      fontFamily:   'var(--font-body)',
                      fontSize:     '.78rem',
                      cursor:       'pointer',
                    }}>
                    {t}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Save */}
          <button onClick={save} disabled={!draft.trim() || saving}
            style={{
              alignSelf:    'flex-start',
              padding:      '12px 28px',
              borderRadius: 'var(--radius)',
              background:   !draft.trim() || saving ? 'var(--line)' : 'var(--sage)',
              color:        '#fff',
              fontFamily:   'var(--font-body)',
              fontWeight:   600,
              fontSize:     '.9rem',
              border:       'none',
              cursor:       !draft.trim() || saving ? 'not-allowed' : 'pointer',
            }}>
            {saving ? 'Saving...' : 'Save entry →'}
          </button>
        </div>
      ) : (
        /* History */
        <div>
          {loading && (
            <div style={{ textAlign: 'center', padding: 48, color: 'var(--ink-faint)', fontFamily: 'var(--font-body)' }}>Loading entries…</div>
          )}
          {!loading && entries.length === 0 && (
            <div style={{ textAlign: 'center', padding: 64, background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--radius-lg)' }}>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--ink)', marginBottom: 8 }}>No entries yet</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '.85rem', color: 'var(--ink-faint)', marginBottom: 20 }}>Start writing to build your wellness history.</div>
              <button onClick={() => setView('write')} style={{ padding: '10px 20px', borderRadius: 'var(--radius)', background: 'var(--sage)', color: '#fff', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '.85rem', border: 'none', cursor: 'pointer' }}>
                Write first entry →
              </button>
            </div>
          )}
          {entries.map(e => {
            const m = MOODS.find(x => x.v === e.mood)
            return (
              <div key={e.id} style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--radius-lg)', padding: '24px 28px', marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 8 }}>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '.82rem', color: 'var(--ink-faint)' }}>{dateLabel(e.created_at)}</div>
                  {m && (
                    <span style={{ padding: '3px 10px', borderRadius: 100, background: m.color + '20', color: m.color, fontFamily: 'var(--font-body)', fontSize: '.75rem', fontWeight: 600 }}>
                      {m.label}
                    </span>
                  )}
                </div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '.92rem', lineHeight: 1.75, color: 'var(--ink-soft)', margin: 0, whiteSpace: 'pre-wrap' }}>
                  {e.content}
                </p>
                {e.dimension_tags?.length > 0 && (
                  <div style={{ marginTop: 12, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {e.dimension_tags.map(t => (
                      <span key={t} style={{ padding: '2px 10px', borderRadius: 100, background: 'rgba(122,158,142,.1)', color: 'var(--sage)', fontFamily: 'var(--font-body)', fontSize: '.72rem' }}>{t}</span>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
