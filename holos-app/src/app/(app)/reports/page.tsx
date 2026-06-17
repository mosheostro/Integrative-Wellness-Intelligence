export const dynamic = 'force-dynamic'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { getServerStrings } from '@/lib/i18n/server'
import { BackButton } from '@/components/ui/BackButton'

const DIMENSION_KEYS = ['nutrition','sleep','recovery','stress','movement','emotional','life_balance','purpose','energy']

const COLORS: Record<string, string> = {
  nutrition: '#7A9E8E', sleep: '#6B6FA8', recovery: '#B07A60',
  stress: '#B06070', movement: '#C4A55A', emotional: '#6B6FA8',
  life_balance: '#7A9E8E', purpose: '#C4A55A', energy: '#B07A60',
}

function ScoreBar({ dim, score, label, thriving, stable, needsAttention, critical }: {
  dim: string; score: number; label: string
  thriving: string; stable: string; needsAttention: string; critical: string
}) {
  const color = COLORS[dim] ?? '#7A9E8E'
  const state = score >= 75 ? thriving : score >= 50 ? stable : score >= 25 ? needsAttention : critical
  const stateColor = score >= 75 ? '#7A9E8E' : score >= 50 ? '#C4A55A' : score >= 25 ? '#B07A60' : '#B06070'
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '130px 1fr 48px 100px', alignItems: 'center', gap: 12 }}>
      <div style={{ fontFamily: 'var(--font-body)', fontSize: '.85rem', color: 'var(--ink-soft)' }}>{label}</div>
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

  const { strings, dateLocale } = await getServerStrings()
  const s = strings.reports
  const dims = strings.dimensions
  const nav = strings.nav

  const DIM_LABELS: Record<string, string> = {
    nutrition:    dims.nutrition,
    sleep:        dims.sleep,
    recovery:     dims.recovery,
    stress:       dims.calm,
    movement:     dims.movement,
    emotional:    dims.emotional,
    life_balance: dims.balance,
    purpose:      dims.purpose,
    energy:       dims.energy,
  }

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
      <BackButton href="/dashboard" style={{ marginBottom: 24 }} />
      {/* Header */
      <div style={{ marginBottom: 40 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.68rem', textTransform: 'uppercase', letterSpacing: '.14em', color: 'var(--sage-deep)', marginBottom: 8 }}>◎ {nav.reports}</div>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 500, letterSpacing: '-.02em', color: 'var(--ink)', margin: 0 }}>
          {s.title}
        </h1>
      </div>

      {!latest ? (
        <div style={{ textAlign: 'center', padding: 80, background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--radius-lg)' }}>
          <div style={{ fontSize: '2.4rem', marginBottom: 16 }}>◎</div>
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: 'var(--ink)', marginBottom: 10 }}>{s.noData}</div>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '.88rem', color: 'var(--ink-soft)', marginBottom: 28, maxWidth: 380, margin: '0 auto 28px' }}>
            {s.noDataDesc}
          </div>
          <Link href="/assessment" style={{ padding: '12px 28px', borderRadius: 'var(--radius)', background: 'var(--sage-deep)', color: '#fff', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '.9rem', textDecoration: 'none' }}>
            {s.takeFirst}
          </Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

          {/* Composite score card */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
            <div style={{ background: 'var(--ink)', borderRadius: 'var(--radius-lg)', padding: '28px 24px', gridColumn: '1 / 2' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.65rem', textTransform: 'uppercase', letterSpacing: '.12em', color: 'rgba(255,255,255,.4)', marginBottom: 12 }}>
                {s.compositeScore}
              </div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '3.2rem', fontWeight: 500, color: '#fff', letterSpacing: '-.03em', lineHeight: 1 }}>
                {latest.composite ?? '—'}
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '.8rem', color: 'rgba(255,255,255,.45)', marginTop: 8 }}>
                {latest.wellness_state ?? ''}
              </div>
              {compositeChange !== null && (
                <div style={{ marginTop: 12, fontFamily: 'var(--font-body)', fontSize: '.8rem', color: compositeChange >= 0 ? '#7A9E8E' : '#B06070', fontWeight: 600 }}>
                  {compositeChange >= 0 ? '▲' : '▼'} {Math.abs(compositeChange)} {s.fromLast}
                </div>
              )}
            </div>
            {DIMENSION_KEYS.slice(0, 3).map(k => (
              <div key={k} style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--radius-lg)', padding: '20px 18px' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.65rem', textTransform: 'uppercase', letterSpacing: '.1em', color: COLORS[k], marginBottom: 8 }}>
                  {DIM_LABELS[k]}
                </div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', fontWeight: 500, color: 'var(--ink)', letterSpacing: '-.02em' }}>
                  {(latest as Record<string, number>)[k] ?? '—'}
                </div>
              </div>
            ))}
          </div>

          {/* Full dimension breakdown */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--radius-lg)', padding: '28px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.65rem', textTransform: 'uppercase', letterSpacing: '.12em', color: 'var(--ink-faint)', marginBottom: 20 }}>
              {s.allNineDims}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {DIMENSION_KEYS.map(k => (
                <ScoreBar
                  key={k}
                  dim={k}
                  score={(latest as Record<string, number>)[k] ?? 0}
                  label={DIM_LABELS[k]}
                  thriving={s.thriving}
                  stable={s.stable}
                  needsAttention={s.needsAttention}
                  critical={s.critical}
                />
              ))}
            </div>
          </div>

          {/* Assessment history */}
          {assessments && assessments.length > 0 && (
            <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--radius-lg)', padding: '24px 28px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.65rem', textTransform: 'uppercase', letterSpacing: '.12em', color: 'var(--ink-faint)', marginBottom: 16 }}>
                {s.assessmentHistory}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {assessments.map((a, i) => (
                  <Link key={a.id} href={`/results/${a.id}`}
                    style={{
                      display: 'grid', gridTemplateColumns: '1fr auto auto auto', alignItems: 'center',
                      gap: 16, padding: '12px 0',
                      borderBottom: i < assessments.length - 1 ? '1px solid var(--line)' : 'none',
                      textDecoration: 'none',
                    }}>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '.85rem', color: 'var(--ink)' }}>
                      {new Date(a.completed_at).toLocaleDateString(dateLocale, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '.78rem', color: 'var(--sage-deep)', background: 'rgba(122,158,142,.1)', padding: '2px 10px', borderRadius: 100 }}>{a.framework}</span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '.78rem', color: 'var(--ink-soft)' }}>{a.wellness_state}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.85rem', fontWeight: 600, color: 'var(--ink)' }}>{a.composite_score}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div style={{ display: 'flex', gap: 12 }}>
            <Link href="/assessment" style={{ padding: '11px 24px', borderRadius: 'var(--radius)', background: 'var(--sa