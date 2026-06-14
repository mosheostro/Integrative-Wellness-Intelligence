import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { WellnessOrb } from '@/components/ui/WellnessOrb'
import { RadarChart } from '@/components/ui/RadarChart'
import { ScoreRing } from '@/components/ui/ScoreRing'

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
    ? await supabase.from('issued_recommendations').select('*').eq('assessment_id', latestAssessment.id).eq('status','active').order('priority_score', { ascending: false }).limit(4)
    : { data: null }

  const { data: profile } = await supabase.from('profiles').select('full_name').eq('id', user.id).single()
  const { data: userProgress } = await supabase.from('user_progress').select('*').eq('user_id', user.id).maybeSingle()
  const { data: snapshots } = await supabase.from('progress_snapshots').select('composite,snapshot_date').eq('user_id', user.id).order('snapshot_date', { ascending: true }).limit(30)

  const hasData = !!latestScores
  const score   = latestAssessment?.composite_score ?? 0
  const state   = latestAssessment?.wellness_state ?? 'LIFESTYLE_IMPROVEMENT'
  const firstName = (profile?.full_name ?? 'there').split(' ')[0]

  type DimDef = { key: string; label: string; color: string; invert?: boolean }
  const DIMS: DimDef[] = [
    { key: 'nutrition', label: 'Nutrition', color: '--gold-deep' },
    { key: 'sleep',     label: 'Sleep',     color: '--indigo' },
    { key: 'recovery',  label: 'Recovery',  color: '--sage' },
    { key: 'stress',    label: 'Calm',      color: '--rose', invert: true },
    { key: 'movement',  label: 'Movement',  color: '--clay' },
    { key: 'energy',    label: 'Energy',    color: '--sage' },
  ]

  const radarVals = latestScores
    ? [latestScores.nutrition, latestScores.sleep, latestScores.recovery, 100-latestScores.stress, latestScores.movement, latestScores.emotional, latestScores.life_balance, latestScores.purpose, latestScores.energy]
    : [60,65,60,60,55,65,60,55,60]

  return (
    <div className="wrap" style={{ paddingTop:32, paddingBottom:80 }}>

      {/* Greeting */}
      <div style={{ marginBottom:40, display:'flex', justifyContent:'space-between', alignItems:'flex-end', flexWrap:'wrap', gap:16 }}>
        <div>
          <div className="eyebrow" style={{ marginBottom:8 }}>
            <span style={{ color:'var(--sage)' }}>&#9672;</span> Holos Dashboard
          </div>
          <h1 className="h1">Hello, {firstName}.</h1>
          {!hasData && <p className="lede" style={{ marginTop:8 }}>Take your first assessment to unlock your wellness portrait.</p>}
        </div>
        <a href="/assessment" className="btn btn-sage">
          {hasData ? 'New assessment' : 'Start assessment'} <span>&#8594;</span>
        </a>
      </div>

      {hasData ? (
        <>
          {/* Hero row: Orb + Radar */}
          <div style={{ display:'grid', gridTemplateColumns:'auto 1fr', gap:32, marginBottom:32, alignItems:'center' }}>
            <div>
              <WellnessOrb score={score} state={state.replace(/_/g,' ')} size={200} />
            </div>
            <div className="card" style={{ height:'100%' }}>
              <div className="eyebrow" style={{ marginBottom:12 }}>&#9675; Wellness Radar</div>
              <RadarChart
                axes={['Nutrition','Sleep','Recovery','Calm','Movement','Emotional','Balance','Purpose','Energy']}
                values={radarVals}
                size={240}
              />
            </div>
          </div>

          {/* Score rings */}
          <div className="card" style={{ marginBottom:24 }}>
            <div className="eyebrow" style={{ marginBottom:20 }}>&#9670; Dimension Breakdown</div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(90px, 1fr))', gap:20 }}>
              {DIMS.map(({ key, label, color, invert }) => (
                <ScoreRing
                  key={key}
                  value={invert ? 100 - (latestScores?.[key as keyof typeof latestScores] as number ?? 50) : (latestScores?.[key as keyof typeof latestScores] as number ?? 50)}
                  color={color}
                  size={80}
                  label={label}
                />
              ))}
            </div>
          </div>

          {/* Trend sparkline */}
          {snapshots && snapshots.length > 1 && (
            <div className="card" style={{ marginBottom:24 }}>
              <div className="eyebrow" style={{ marginBottom:12 }}>&#9675; Composite Trend ({snapshots.length} data points)</div>
              <div style={{ height:60, display:'flex', alignItems:'flex-end', gap:3 }}>
                {snapshots.map((s: Record<string, unknown>, i: number) => {
                  const h = Math.max(6, (((s.composite as number) ?? 50) / 100) * 56)
                  const isLast = i === snapshots.length - 1
                  return (
                    <div key={i} title={String(s.snapshot_date) + ': ' + String(s.composite)} style={{
                      flex:1, height:h, borderRadius:3,
                      background: isLast ? 'var(--sage)' : 'var(--surface-2)',
                      transition:'height .3s',
                    }} />
                  )
                })}
              </div>
            </div>
          )}

          {/* Top recommendations */}
          {latestRecs && latestRecs.length > 0 && (
            <div className="card" style={{ marginBottom:24 }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
                <div className="eyebrow">&#9672; Priority Actions</div>
                <a href={'/results/' + latestAssessment?.id} style={{ color:'var(--sage)', fontSize:'.8125rem', textDecoration:'none' }}>See all &#8594;</a>
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                {(latestRecs as { id: string; impact_score: number; title: string; category: string }[]).map((rec) => (
                  <div key={rec.id} style={{
                    display:'flex', alignItems:'center', gap:14, padding:'12px 16px',
                    background:'var(--canvas2)', borderRadius:10,
                  }}>
                    <div style={{ width:36, height:36, borderRadius:8, background:'var(--sage)', color:'#fff',
                      display:'flex', alignItems:'center', justifyContent:'center',
                      fontFamily:'var(--font-mono)', fontSize:12, fontWeight:600, flexShrink:0 }}>
                      {rec.impact_score}
                    </div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontSize:'.875rem', fontWeight:500, color:'var(--ink)', marginBottom:2 }}>{rec.title}</div>
                      <div style={{ fontSize:'.78rem', color:'var(--ink-faint)' }}>{rec.category}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* XP progress */}
          {userProgress && (
            <div className="card">
              <div className="eyebrow" style={{ marginBottom:12 }}>&#9675; Wellness Journey</div>
              <div style={{ display:'flex', alignItems:'center', gap:20 }}>
                <div style={{ textAlign:'center' }}>
                  <div style={{ fontSize:28, fontFamily:'var(--font-serif)', fontWeight:500, color:'var(--gold-deep)' }}>{userProgress.level}</div>
                  <div style={{ fontSize:11, color:'var(--ink-faint)', fontFamily:'var(--font-mono)' }}>LEVEL</div>
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:5 }}>
                    <span style={{ fontSize:'.8rem', color:'var(--ink-soft)' }}>Total XP</span>
                    <span style={{ fontFamily:'var(--font-mono)', fontSize:12 }}>{userProgress.total_xp} XP</span>
                  </div>
                  <div className="progress-track" style={{ height:8 }}>
                    <div className="progress-fill" style={{ width:Math.min(100, (userProgress.total_xp % 500) / 5) + '%', background:'var(--gold)' }} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div style={{ textAlign:'center', padding:'60px 0' }}>
          <div style={{ fontSize:80, marginBottom:24 }}>&#9672;</div>
          <h2 className="h2" style={{ marginBottom:12 }}>Your wellness portrait is waiting</h2>
          <p className="lede" style={{ margin:'0 auto 32px' }}>
            Holos will analyse your responses across 9 dimensions and 8 wisdom traditions to create a living picture of your whole self.
          </p>
          <a href="/assessment" className="btn btn-primary btn-lg">Begin your assessment &#8594;</a>
        </div>
      )}
    </div>
  )
}
