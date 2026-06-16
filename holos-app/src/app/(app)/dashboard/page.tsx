export const dynamic = 'force-dynamic'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { WellnessOrb } from '@/components/ui/WellnessOrb'
import { RadarChart } from '@/components/ui/RadarChart'
import { ScoreRing } from '@/components/ui/ScoreRing'
import { DashboardLiveLayer } from '@/components/ui/DashboardLiveLayer'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const { data: latestAssessment } = await supabase
    .from('assessments')
    .select('*')
    .eq('user_id', user.id)
    .eq('status', 'completed')
    .order('completed_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  const { data: latestScores } = latestAssessment
    ? await supabase.from('dimension_scores').select('*').eq('assessment_id', latestAssessment.id).maybeSingle()
    : { data: null }

  const { data: latestRecs } = latestAssessment
    ? await supabase.from('issued_recommendations').select('*')
        .eq('assessment_id', latestAssessment.id)
        .eq('status', 'active')
        .order('priority_score', { ascending: false })
        .limit(4)
    : { data: null }

  const { data: profile } = await supabase.from('profiles').select('full_name').eq('id', user.id).single()
  const { data: userProgress } = await supabase.from('user_progress').select('*').eq('user_id', user.id).maybeSingle()
  const { data: snapshots } = await supabase.from('progress_snapshots')
    .select('composite,snapshot_date')
    .eq('user_id', user.id)
    .order('snapshot_date', { ascending: true })
    .limit(30)

  const hasData = !!latestScores
  const score   = latestAssessment?.composite_score ?? 0
  const state   = latestAssessment?.wellness_state ?? 'LIFESTYLE_IMPROVEMENT'
  const firstName = (profile?.full_name ?? 'there').split(' ')[0]

  type DimDef = { key: string; label: string; color: string; invert?: boolean }
  const DIMS: DimDef[] = [
    { key: 'nutrition',    label: 'Nutrition',  color: '--gold-deep'  },
    { key: 'sleep',        label: 'Sleep',      color: '--indigo'     },
    { key: 'recovery',     label: 'Recovery',   color: '--sage'       },
    { key: 'stress',       label: 'Calm',       color: '--rose',      invert: true },
    { key: 'movement',     label: 'Movement',   color: '--clay'       },
    { key: 'energy',       label: 'Energy',     color: '--sage'       },
    { key: 'emotional',    label: 'Emotional',  color: '--indigo'     },
    { key: 'life_balance', label: 'Balance',    color: '--sage'       },
    { key: 'purpose',      label: 'Purpose',    color: '--gold-deep'  },
  ]

  const radarVals = latestScores
    ? [
        latestScores.nutrition, latestScores.sleep, latestScores.recovery,
        100 - latestScores.stress, latestScores.movement,
        latestScores.emotional, latestScores.life_balance,
        latestScores.purpose, latestScores.energy,
      ]
    : [60, 65, 60, 60, 55, 65, 60, 55, 60]

  // Ambient gradient based on wellness state
  const stateGradients: Record<string, string> = {
    HIGH_PERFORMANCE: 'linear-gradient(160deg, oklch(0.96 0.04 155 / 0.35) 0%, var(--canvas) 50%, oklch(0.96 0.03 200 / 0.2) 100%)',
    BALANCED:         'linear-gradient(160deg, var(--canvas) 0%, oklch(0.97 0.02 155 / 0.15) 100%)',
    STRESS_DOMINANT:  'linear-gradient(160deg, oklch(0.97 0.03 15 / 0.2) 0%, var(--canvas) 100%)',
    SLEEP_DEFICIT:    'linear-gradient(160deg, oklch(0.97 0.03 270 / 0.2) 0%, var(--canvas) 100%)',
    LOW_RECOVERY:     'linear-gradient(160deg, oklch(0.97 0.03 200 / 0.2) 0%, var(--canvas) 100%)',
    ENERGY_IMBALANCE: 'linear-gradient(160deg, oklch(0.97 0.03 240 / 0.15) 0%, var(--canvas) 100%)',
  }
  const ambientBg = stateGradients[state] ?? 'var(--canvas)'

  return (
    <div
      className="wrap"
      style={{
        paddingTop: 32,
        paddingBottom: 80,
        background: ambientBg,
        transition: 'background 1.2s ease',
        minHeight: 'calc(100dvh - 60px)',
      }}
    >

      {/* Greeting */}
      <div style={{ marginBottom: 40, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <div className="eyebrow" style={{ marginBottom: 8 }}>
            <span style={{ color: 'var(--sage)' }}>&#9672;</span> Holos Dashboard
          </div>
          <h1 className="h1">Hello, {firstName}.</h1>
          {!hasData && (
            <p className="lede" style={{ marginTop: 8 }}>
              Take your first assessment to unlock your wellness portrait.
            </p>
          )}
        </div>
        <a href="/assessment" className="btn btn-sage">
          {hasData ? 'New assessment' : 'Start assessment'} <span>&#8594;</span>
        </a>
      </div>

      {hasData ? (
        <>
          {/* Hero row: Orb + Radar */}
          <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 32, marginBottom: 32, alignItems: 'center' }}>
            <div style={{ position: 'relative' }}>
              <WellnessOrb score={score} state={state.replace(/_/g, ' ')} size={200} />
              {/* Animated score overlay — client component */}
              <DashboardLiveLayer initialScore={score} />
            </div>
            <div className="card" style={{ height: '100%' }}>
              <div className="eyebrow" style={{ marginBottom: 12 }}>&#9675; Wellness Radar</div>
              <RadarChart
                axes={['Nutrition', 'Sleep', 'Recovery', 'Calm', 'Movement', 'Emotional', 'Balance', 'Purpose', 'Energy']}
                values={radarVals}
                size={240}
              />
            </div>
          </div>

          {/* Score rings */}
          <div className="card" style={{ marginBottom: 24 }}>
            <div className="eyebrow" style={{ marginBottom: 20 }}>&#9670; Dimension Breakdown</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))', gap: 20 }}>
              {DIMS.map(({ key, label, color, invert }) => (
                <ScoreRing
                  key={key}
                  value={invert
                    ? 100 - (latestScores?.[key as keyof typeof latestScores] as number ?? 50)
                    : (latestScores?.[key as keyof typeof latestScores] as number ?? 50)}
                  color={color}
                  size={80}
                  label={label}
                />
              ))}
            </div>
          </div>

          {/* Wellness state context card */}
          <div className="card" style={{
            marginBottom: 24,
            background: 'linear-gradient(120deg, var(--ink) 0%, oklch(0.25 0.05 200) 100%)',
            color: 'var(--canvas)',
          }}>
            <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
              <div style={{
                width: 56, height: 56, borderRadius: 12, flexShrink: 0,
                background: 'oklch(0.55 0.12 155)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-serif)', fontSize: '1.3rem', fontWeight: 500,
                color: '#fff',
              }}>
                {score}
              </div>
              <div>
                <div style={{ fontSize: '.7rem', fontFamily: 'var(--font-mono)', letterSpacing: '.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,.5)', marginBottom: 6 }}>
                  Current State
                </div>
                <div style={{ fontSize: '1.05rem', fontWeight: 500, color: '#fff', marginBottom: 6 }}>
                  {state.replace(/_/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase())}
                </div>
                <p style={{ fontSize: '.85rem', color: 'rgba(255,255,255,.65)', lineHeight: 1.6, margin: 0 }}>
                  Your profile was last analysed on{' '}
                  {latestAssessment?.completed_at
                    ? new Date(latestAssessment.completed_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
                    : 'recently'}.
                  Take a new assessment to track your progress.
                </p>
              </div>
            </div>
          </div>

          {/* Trend sparkline */}
          {snapshots && snapshots.length > 1 && (
            <div className="card" style={{ marginBottom: 24 }}>
              <div className="eyebrow" style={{ marginBottom: 12 }}>&#9675; Composite Trend ({snapshots.length} data points)</div>
              <div style={{ height: 60, display: 'flex', alignItems: 'flex-end', gap: 3 }}>
                {snapshots.map((s: Record<string, unknown>, i: number) => {
                  const h = Math.max(6, (((s.composite as number) ?? 50) / 100) * 56)
                  const isLast = i === snapshots.length - 1
                  return (
                    <div
                      key={i}
                      title={String(s.snapshot_date) + ': ' + String(s.composite)}
                      style={{
                        flex: 1, height: h, borderRadius: 3,
                        background: isLast ? 'var(--sage)' : 'var(--surface-2)',
                        transition: 'height .3s',
                      }}
                    />
                  )
                })}
              </div>
            </div>
          )}

          {/* Top recommendations */}
          {latestRecs && latestRecs