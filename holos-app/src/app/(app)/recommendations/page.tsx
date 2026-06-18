'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { BackButton } from '@/components/ui/BackButton'

type Rec = {
  id: string
  title: string
  description: string
  category: string
  impact_score: number
  difficulty_score: number
  priority_score: number
  framework: string
  status: string
  created_at: string
}

const CATEGORY_COLORS: Record<string, string> = {
  nutrition: 'var(--sage)', sleep: 'var(--indigo)', recovery: 'var(--clay)',
  stress: 'var(--rose)', movement: 'var(--gold)', emotional: 'var(--indigo)',
  life_balance: 'var(--sage)', purpose: 'var(--gold)', energy: 'var(--clay)',
}

function ScoreBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <span style={{ fontFamily: 'var(--font-body)', fontSize: '.72rem', color: 'var(--ink-faint)', width: 70, flexShrink: 0 }}>{label}</span>
      <div style={{ flex: 1, height: 4, background: 'var(--line)', borderRadius: 2, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${value}%`, background: color, borderRadius: 2 }} />
      </div>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.7rem', color: 'var(--ink-soft)', width: 24, textAlign: 'right' }}>{value}</span>
    </div>
  )
}

export default function RecommendationsPage() {
  const { strings } = useLanguage()
  const s = strings.recommendations

  const [recs, setRecs]       = useState<Rec[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter]   = useState<'all' | 'pending' | 'completed'>('pending')

  const sb = createClient()

  useEffect(() => {
    sb.from('issued_recommendations')
      .select('id, title, description, category, impact_score, difficulty_score, priority_score, framework, status, created_at')
      .order('priority_score', { ascending: false })
      .limit(50)
      .then(({ data }) => { setRecs((data as Rec[]) ?? []); setLoading(false) })
  }, [])

  async function markDone(id: string) {
    await sb.from('issued_recommendations').update({ status: 'completed' }).eq('id', id)
    setRecs(rs => rs.map(r => r.id === id ? { ...r, status: 'completed' } : r))
  }

  async function dismiss(id: string) {
    await sb.from('issued_recommendations').update({ status: 'dismissed' }).eq('id', id)
    setRecs(rs => rs.map(r => r.id === id ? { ...r, status: 'dismissed' } : r))
  }

  const visible = recs.filter(r =>
    filter === 'all'       ? r.status !== 'dismissed' :
    filter === 'pending'   ? r.status === 'pending' || r.status === 'active' :
    filter === 'completed' ? r.status === 'completed' : true
  )

  const filterMap: Record<'pending' | 'completed' | 'all', string> = {
    pending:   s.filterPending,
    completed: s.filterCompleted,
    all:       s.filterAll,
  }

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 24px' }}>
      <BackButton href="/dashboard" style={{ marginBottom: 24 }} />
      <div style={{ marginBottom: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.68rem', textTransform: 'uppercase', letterSpacing: '.14em', color: 'var(--sage-deep)', marginBottom: 8 }}>◈ {strings.nav.actions}</div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 500, letterSpacing: '-.02em', color: 'var(--ink)', margin: 0 }}>
            {s.title}
          </h1>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {(['pending', 'completed', 'all'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              style={{
                padding: '8px 16px', borderRadius: 'var(--radius)', border: '1px solid var(--line)',
                background: filter === f ? 'var(--ink)' : 'var(--surface)',
                color: filter === f ? '#fff' : 'var(--ink-soft)',
                fontFamily: 'var(--font-body)', fontSize: '.8rem',
                fontWeight: filter === f ? 600 : 400, cursor: 'pointer',
              }}>
              {filterMap[f]}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: 48, color: 'var(--ink-faint)', fontFamily: 'var(--font-body)' }}>{s.loading}</div>
      ) : visible.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 64, background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--radius-lg)' }}>
          <div style={{ fontSize: '2rem', marginBottom: 12 }}>◈</div>
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--ink)', marginBottom: 10 }}>
            {recs.length === 0 ? s.noRecs : s.nothing}
          </div>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '.85rem', color: 'var(--ink-faint)', marginBottom: 24 }}>
            {recs.length === 0 ? s.noRecsDesc : s.nothingDesc}
          </div>
          {recs.length === 0 && (
            <Link href="/assessment" style={{ padding: '10px 24px', borderRadius: 'var(--radius)', background: 'var(--sage-deep)', color: '#fff', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '.88rem', textDecoration: 'none' }}>
              {s.takeAssessment}
            </Link>
          )}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {visible.map(r => {
            const catColor = CATEGORY_COLORS[r.category] ?? 'var(--sage)'
            const done = r.status === 'completed'
            return (
              <div key={r.id} style={{
                background: 'var(--surface)',
                border: `1px solid ${done ? 'rgba(122,158,142,.3)' : 'var(--line)'}`,
                borderRadius: 'var(--radius-lg)', padding: '24px 28px', opacity: done ? 0.7 : 1,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 14 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.65rem', textTransform: 'uppercase', letterSpacing: '.1em', color: catColor }}>
                        {r.category.replace('_', ' ')}
                      </span>
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '.72rem', color: 'var(--ink-faint)', background: 'var(--canvas2)', padding: '1px 8px', borderRadius: 100 }}>
                        {r.framework}
                      </span>
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '.95rem', fontWeight: 600, color: 'var(--ink)', margin: '0 0 6px', textDecoration: done ? 'line-through' : 'none' }}>
                      {r.title}
                    </h3>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '.84rem', color: 'var(--ink-soft)', lineHeight: 1.65, margin: 0 }}>
                      {r.description}
                    </p>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'flex-end', flexShrink: 0 }}>
                    <div style={{
                      fontFamily: 'var(--font-mono)', fontSize: '.75rem', fontWeight: 600,
                      color: r.priority_score >= 70 ? 'var(--rose)' : r.priority_score >= 40 ? 'var(--gold)' : 'var(--sage)',
                      background: r.priority_score >= 70 ? 'rgba(176,96,112,.1)' : r.priority_score >= 40 ? 'rgba(196,165,90,.1)' : 'rgba(122,158,142,.1)',
                      padding: '4px 10px', borderRadius: 100,
                    }}>
                      P{Math.round(r.priority_score)}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
                  <ScoreBar label={s.impact}     value={Math.round(r.impact_score)}     color="var(--sage)" />
                  <ScoreBar label={s.difficulty} value={Math.round(r.difficulty_score)} color="var(--rose)" />
                </div>

                {!done && (
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button onClick={() => markDone(r.id)}
                      style={{ padding: '8px 16px', borderRadius: 'var(--radius)', background: 'var(--sage-deep)', color: '#fff', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '.8rem', border: 'none', cursor: 'pointer' }}>
                      {s.markDone}
                    </button>
                    <button onClick={() => dismiss(r.id)}
                      style={{ padding: '8px 14px', borderRadius: 'var(--radius)', border: '1px solid var(--line)', background: 'transparent', color: 'var(--ink-faint)', fontFamily: 'var(--font-body)', fontSize: '.8rem', cursor: 'pointer' }}>
                      {s.dismiss}
                    </button>
                  </div>
                )}
                {done && (
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '.8rem', color: 'var(--sage-deep)', fontWeight: 600 }}>
                    {s.completedLabel}
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
