export const dynamic = 'force-dynamic'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

const DIMENSION_KEYS = ['nutrition','sleep','recovery','stress','movement','emotional','life_balance','purpose','energy']
const DIMENSION_LABELS: Record<string, string> = {
  nutrition: 'Nutrition', sleep: 'Sleep', recovery: 'Recovery', stress: 'Stress',
  movement: 'Movement', emotional: 'Emotional', life_balance: 'Life Balance',
  purpose: 'Purpose', energy: 'Energy',
}
const COLORS: Record<string, string> = {
  nutrition: '#7A9E8E', sleep: '#6B6FA8', recovery: '#B07A60',
  stress: '#B06070', movement: '#C4A55A', emotional: '#6B6FA8',
  life_balance: '#7A9E8E', purpose: '#C4A55A', energy: '#B07A60',
}

function ScoreBar({ dim, score }: { dim: string; score: number }) {
  const color = COLORS[dim] ?? '#7A9E8E'
  const state = score >= 75 ? 'Thriving' : score >= 50 ? 'Stable' : score >= 25 ? 'Needs Attention' : 'Critical'
  const stateColor = score >= 75 ? '#7A9E8E' : score >= 50 ? '#C4A55A' : score >= 25 ? '#B07A60' : '#B06070'
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '130px 1fr 48px 80px', alignItems: 'center', gap: 12 }}>
      <div style={{ fontFamily: 'var(--font-body)', fontSize: '.85rem', color: 'var(--ink-soft)' }}>{DIMENSION_LABELS[dim]}</div>
      <div style={{ height: 8, background: 'var(--line)', borderRadius: 4, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${score ?? 0}%`, background: color, borderRadius: 4 }} />
      </div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.82rem', fontWeight: 600, color: 'var(--ink)', textAlign: 'right' }}>{score ?? '—'}</div>
      <div style={{ fontFamily: 'var(--font-body)', fontSize: '.72rem', color: stateColor }}>{state}</div>
    </div>
  )
}

export default async function ReportsPage() {
  const sb = await createClient()
  const { data: { user } } = await sb.auth.getUser()

  const { data: snapshots } = await sb.from('progress_snapshots')
    .select('*')
    .eq('user_id', user?.id ?? '')
    .order('snapshot_date', { ascending: false })
    .limit(12)

  const { data: assessments } = await sb.from('assessments')
    .select('id, framework, composite_score, wellness_state, completed_at')
    .eq('user_id', user?.id ?? '')
    .order('completed_at', { ascending: false })
    .limit(10)

  const latest = snapshots?.[0]
  const previous = snapshots?.[1]
  const compositeChange = latest && previous
    ? Math.round((latest.composite ?? 0) - (previous.composite ?? 0))
    : null

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '32px 24px' }}>
      {/* Header */}
      <div style={{ marginBottom: 40 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.68rem', textTransform: 'uppercase', letterSpacing: '.14em', color: 'var(--sage)', marginBottom: 8 }}>◎ Reports</div>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 500, letterSpacing: '-.02em', color: 'var(--ink)', margin: 0 }}>
          Wellness Reports
        </h1>
      </div>

      {!latest ? (
        <div style={{ textAlign: 'center', padding: 80, background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--radius-lg)' }}>
          <div style={{ fontSize: '2.4rem', marginBottom: 16 }}>◎</div>
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: 'var(--ink)', marginBottom: 10 }}>No report data yet</div>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '.88rem', color: 'var(--ink-soft)', marginBottom: 28, maxWidth: 380, margin: '0 auto 28px' }}>
            Complete your first assessment to generate a comprehensive wellness report with dimension scores and trend analysis.
          </div>
          <Link href="/assessment" style={{ padding: '12px 28px', borderRadius: 'var(--radius)', background: 'var(--sage)', color: '#fff', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '.9rem', textDecoration: 'none' }}>
            Take your first assessment →
          </Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

          {/* Composite score card */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
            <div style={{ background: 'var(--ink)', borderRadius: 'var(--radius-lg)', padding: '28px 24px', gridColumn: '1 / 2' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.65rem', textTransform: 'uppercase', letterSpacing: '.12em', color: 'rgba(255,255,255,.4)', marginBottom: 12 }}>Composite Score</div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '3.2rem', fontWeight: 500, color: '#fff', letterSpacing: '-.03em', lineHeight: 1 }}>
                {latest.composite ?? '—'}
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '.8rem', color: 'rgba(255,255,255,.45)', marginTop: 8 }}>
                {latest.wellness_state ?? 'Unknown state'}
              </div>
              {compositeChange !== null && (
                <div style={{ marginTop: 12, fontFamily: 'var(--font-body)', fontSize: '.8rem', color: compositeChange >= 0 ? '#7A9E8E' : '#B06070', fontWeight: 600 }}>
                  {compositeChange >= 0 ? '▲' : '▼'} {Math.abs(compositeChange)} from last assessment
                </div>
              )}
            </div>
            {DIMENSION_KEYS.slice(0, 3).map(k => (
              <div key={k} style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--radius-lg)', padding: '20px 18px' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.65rem', textTransform: 'uppercase', letterSpacing: '.1em', color: COLORS[k], marginBottom: 8 }}>
                  {DIMENSION_LABELS[k]}
                </div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', fontWeight: 500, color: 'var(--ink)', letterSpacing: '-.02em' }}>
                  {(latest as Record<string, number>)[k] ?? '—'}
                </div>
              </div>
            ))}
          </div>

          {/* Full dimension breakdown */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--radius-lg)', padding: '28px 28px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.65rem', textTransform: 'uppercase', letterSpacing: '.12em', color: 'var(--ink-faint)', marginBottom: 20 }}>All Nine Dimensions</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {DIMENSION_KEYS.map(k => (
                <ScoreBar key={k} dim={k} score={(latest as Record<string, number>)[k] ?? 0} />
              ))}
            </div>
          </div>

          {/* Assessment history */}
          {assessments && assessments.length > 0 && (
            <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--radius-lg)', padding: '24px 28px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.65rem', textTransform: 'uppercase', letterSpacing: '.12em', color: 'var(--ink-faint)', marginBottom: 16 }}>Assessment History</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {assessments.map((a, i) => (
                  <Link key={a.id} href={`/results/${a.id}`}
                    style={{
                      display:       'grid',
                      gridTemplateColumns: '1fr auto auto auto',
                      alignItems:    'center',
                      gap:           16,
                      padding:       '12px 0',
                      borderBottom:  i < assessments.length - 1 ? '1px solid var(--line)' : 'none',
                      textDecoration:'none',
                    }}>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '.85rem', color: 'var(--ink)' }}>
                      {new Date(a.completed_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '.78rem', color: 'var(--sage)', background: 'rgba(122,158,142,.1)', padding: '2px 10px', borderRadius: 100 }}>{a.framework}</span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '.78rem', color: 'var(--ink-soft)' }}>{a.wellness_state}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.85rem', fontWeight: 600, color: 'var(--ink)' }}>{a.composite_score}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Action */}
          <div style={{ display: 'flex', gap: 12 }}>
            <Link href="/assessment" style={{ padding: '11px 24px', borderRadius: 'var(--radius)', background: 'var(--sage)', color: '#fff', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '.88rem', textDecoration: 'none' }}>
              New assessment →
            </Link>
            <Link href="/recommendations" style={{ padding: '11px 24px', borderRadius: 'var(--radius)', border: '1.5px solid var(--line)', color: 'var(--ink)', fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '.88rem', textDecoration: 'none' }}>
              View action plan
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
