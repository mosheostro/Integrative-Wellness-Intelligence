'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useLanguage } from '@/contexts/LanguageContext'
import { LOCALE_META } from '@/lib/i18n/translations'
import { BackButton } from '@/components/ui/BackButton'

type Entry = { id: string; created_at: string; content: string; mood: number | null; dimension_tags: string[] }

// Internal keys stored in DB — always English strings
const DIMENSION_TAG_KEYS = ['Nutrition','Sleep','Recovery','Stress','Movement','Emotional','Life Balance','Purpose','Energy'] as const

export default function JournalPage() {
  const { strings, locale } = useLanguage()
  const s = strings.journal
  const dims = strings.dimensions

  // Mood objects built from translations
  const MOODS = [
    { v: 1, label: s.moodStruggling, color: 'var(--rose)' },
    { v: 2, label: s.moodLow,        color: 'var(--clay)' },
    { v: 3, label: s.moodOkay,       color: 'var(--gold)' },
    { v: 4, label: s.moodGood,       color: 'var(--sage-deep)' },
    { v: 5, label: s.moodThriving,   color: 'var(--indigo)' },
  ]

  // Map English key → translated label (display only; storage uses English keys)
  const dimLabel = (key: string): string => {
    const map: Record<string, string> = {
      'Nutrition':   dims.nutrition,
      'Sleep':       dims.sleep,
      'Recovery':    dims.recovery,
      'Stress':      dims.calm,
      'Movement':    dims.movement,
      'Emotional':   dims.emotional,
      'Life Balance':dims.balance,
      'Purpose':     dims.purpose,
      'Energy':      dims.energy,
    }
    return map[key] ?? key
  }

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
    return d.toLocaleDateString(LOCALE_META[locale].dateLocale, { weekday: 'long', month: 'long', day: 'numeric' })
  }

  return (
    <div style={{ maxWidth: 820, margin: '0 auto', padding: '32px 24px' }}>
      <BackButton href="/dashboard" style={{ marginBottom: 24 }} />
      {/* Header */}
      <div style={{ marginBottom: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.68rem', textTransform: 'uppercase', letterSpacing: '.14em', color: 'var(--sage-deep)', marginBottom: 8 }}>◈ {strings.nav.journal}</div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 500, letterSpacing: '-.02em', color: 'var(--ink)', margin: 0 }}>
            {s.title}
          </h1>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => setView('write')}
            style={{
              padding: '8px 18px', borderRadius: 'var(--radius)', border: '1px solid var(--line)',
              background: view === 'write' ? 'var(--ink-stable)' : 'var(--surface)',
              color: view === 'write' ? '#fff' : 'var(--ink-soft)',
              fontFamily: 'var(--font-body)', fontSize: '.82rem', fontWeight: view === 'write' ? 600 : 400, cursor: 'pointer',
            }}>
            {s.write}
          </button>
          <button onClick={() => setView('history')}
            style={{
              padding: '8px 18px', borderRadius: 'var(--radius)', border: '1px solid var(--line)',
              background: view === 'history' ? 'var(--ink-stable)' : 'var(--surface)',
              color: view === 'history' ? '#fff' : 'var(--ink-soft)',
              fontFamily: 'var(--font-body)', fontSize: '.82rem', fontWeight: view === 'history' ? 600 : 400, cursor: 'pointer',
            }}>
            {s.history}
          </button>
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
            placeholder={s.placeholder}
            rows={8}
            style={{
              width: '100%', padding: '20px', borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--line)', background: 'var(--surface)',
              fontFamily: 'var(--font-body)', fontSize: '1rem', lineHeight: 1.75,
              color: 'var(--ink)', resize: 'vertical', outline: 'none', boxSizing: 'border-box',
            }}
          />

          {/* Mood */}
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.65rem', textTransform: 'uppercase', letterSpacing: '.12em', color: 'var(--ink-faint)', marginBottom: 10 }}>
              {s.howFeeling}
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {MOODS.map(m => (
                <button key={m.v} onClick={() => setMood(m.v)}
                  style={{
                    padding: '8px 16px', borderRadius: 100,
                    border: `1.5px solid ${mood === m.v ? m.color : 'var(--line)'}`,
                    background: mood === m.v ? m.color + '20' : 'transparent',
                    color: mood === m.v ? m.color : 'var(--ink-soft)',
                    fontFamily: 'var(--font-body)', fontSize: '.82rem', fontWeight: mood === m.v ? 600 : 400, cursor: 'pointer',
                  }}>
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Dimension tags */}
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.65rem', textTransform: 'uppercase', letterSpacing: '.12em', color: 'var(--ink-faint)', marginBottom: 10 }}>
              {s.tagDimensions}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {DIMENSION_TAG_KEYS.map(key => {
                const on = tags.includes(key)
                return (
                  <button key={key} onClick={() => setTags(ts => on ? ts.filter(x => x !== key) : [...ts, key])}
                    style={{
                      padding: '6px 14px', borderRadius: 100,
                      border: `1px solid ${on ? 'var(--sage)' : 'var(--line)'}`,
                      background: on ? 'rgba(122,158,142,.12)' : 'transparent',
                      color: on ? 'var(--sage)' : 'var(--ink-faint)',
                      fontFamily: 'var(--font-body)', fontSize: '.78rem', cursor: 'pointer',
                    }}>
                    {dimLabel(key)}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Save */}
          <button onClick={save} disabled={!draft.trim() || saving}
            style={{
              alignSelf: 'flex-start', padding: '12px 28px', borderRadius: 'var(--radius)',
              background: !draft.trim() || saving ? 'var(--line)' : 'var(--sage-deep)',
              color: '#fff', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '.9rem',
              border: 'none', cursor: !draft.trim() || saving ? 'not-allowed' : 'pointer',
            }}>
            {saving ? s.saving : s.saveEntry}
          </button>
        </div>
      ) : (
        /* History */
        <div>
          {loading && (
            <div style={{ textAlign: 'center', padding: 48, color: 'var(--ink-faint)', fontFamily: 'var(--font-body)' }}>{s.loading}</div>
          )}
          {!loading && entries.length === 0 && (
            <div style={{ textAlign: 'center', padding: 64, background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--radius-lg)' }}>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--ink)', marginBottom: 8 }}>{s.noEntries}</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '.85rem', color: 'var(--ink-faint)', marginBottom: 20 }}>{s.noEntriesDesc}</div>
              <button onClick={() => setView('write')} style={{ padding: '10px 20px', borderRadius: 'var(--radius)', background: 'var(--sage-deep)', color: '#fff', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '.85rem', border: 'none', cursor: 'pointer' }}>
                {s.writeFirst}
              </button>
            </div>
          )}
          {entries.map(entry => {
            const m = MOODS.find(x => x.v === entry.mood)
            return (
              <div key={entry.id} style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--radius-lg)', padding: '24px 28px', marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 8 }}>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '.82rem', color: 'var(--ink-faint)' }}>{dateLabel(entry.created_at)}</div>
                  {m && (
                    <span style={{ padding: '3px 10px', borderRadius: 100, background: m.color + '20', color: m.color, fontFamily: 'var(--font-body)', fontSize: '.75rem', fontWeight: 600 }}>
                      {m.label}
                    </span>
                  )}
                </div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '.92rem', lineHeight: 1.75, color: 'var(--ink-soft)', margin: 0, whiteSpace: 'pre-wrap' }}>{entry.content}</p>
                {entry.dimension_tags.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 12 }}>
                    {entry.dimension_tags.map(tag => (
                      <span key={tag} style={{
                        padding:     '3px 10px',
                        borderRadius: 100,
                        background:  'rgba(122,158,142,.12)',
                        color:       'var(--sage)',
                        fontFamily:  'var(--font-body)',
                        fontSize:    '.73rem',
                      }}>
                        {dimLabel(tag)}
                      </span>
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
