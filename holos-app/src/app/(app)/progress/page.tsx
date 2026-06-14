import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function ProgressPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const { data: snapshots } = await supabase
    .from('progress_snapshots')
    .select('*')
    .eq('user_id', user.id)
    .order('snapshot_date', { ascending: true })
    .limit(60)

  const { data: assessments } = await supabase
    .from('assessments')
    .select('id, completed_at, composite_score, wellness_state, framework')
    .eq('user_id', user.id)
    .eq('status', 'completed')
    .order('completed_at', { ascending: false })
    .limit(20)

  const { data: userProgress } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', user.id)
    .maybeSingle()

  const hasData = (snapshots?.length ?? 0) > 0

  const DIMS = ['nutrition','sleep','recovery','movement','emotional','life_balance','purpose','energy'] as const
  const DIM_LABELS: Record<string, string> = {
    nutrition:'Nutrition', sleep:'Sleep', recovery:'Recovery',
    movement:'Movement', emotional:'Emotional', life_balance:'Balance',
    purpose:'Purpose', energy:'Energy',
  }

  const latest = snapshots?.[snapshots.length - 1]
  const prev    = snapshots?.[snapshots.length - 2]

  const trend = (dim: string) => {
    if (!latest || !prev) return 0
    return ((latest as Record<string, number>)[dim] ?? 0) - ((prev as Record<string, number>)[dim] ?? 0)
  }

  return (
    <div className="wrap" style={{ paddingTop:32, paddingBottom:80 }}>
      <div style={{ marginBottom:36 }}>
        <div className="eyebrow" style={{ marginBottom:8 }}><span style={{ color:'var(--sage)' }}>◎</span> Progress</div>
        <h1 className="h1">Your Wellness Journey</h1>
      </div>

      {!hasData ? (
        <div style={{ textAlign:'center', padding:'60px 0' }}>
          <div style={{ fontSize:64, marginBottom:20 }}>◎</div>
          <h2 className="h2" style={{ marginBottom:12 }}>No data yet</h2>
          <p className="lede" style={{ margin:'0 auto 28px' }}>Complete your first assessment to start tracking your wellness journey.</p>
          <a href="/assessment" className="btn btn-sage">Take assessment →</a>
        </div>
      ) : (
        <>
          {/* Summary cards */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(160px,1fr))', gap:16, marginBottom:32 }}>
            <div className="card" style={{ textAlign:'center', padding:'20px 16px' }}>
              <div style={{ fontSize:32, fontFamily:'var(--font-serif)', fontWeight:500, color:'var(--sage)', marginBottom:6 }}>
                {latest?.composite ?? '—'}
              </div>
              <div style={{ fontSize:11, fontFamily:'var(--font-mono)', color:'var(--ink-faint)', textTransform:'uppercase', letterSpacing:'.08em' }}>Latest Score</div>
            </div>
            <div className="card" style={{ textAlign:'center', padding:'20px 16px' }}>
              <div style={{ fontSize:32, fontFamily:'var(--font-serif)', fontWeight:500, color:'var(--gold-deep)', marginBottom:6 }}>
                {assessments?.length ?? 0}
              </div>
              <div style={{ fontSize:11, fontFamily:'var(--font-mono)', color:'var(--ink-faint)', textTransform:'uppercase', letterSpacing:'.08em' }}>Assessments</div>
            </div>
            <div className="card" style={{ textAlign:'center', padding:'20px 16px' }}>
              <div style={{ fontSize:32, fontFamily:'var(--font-serif)', fontWeight:500, color:'var(--indigo)', marginBottom:6 }}>
                {userProgress?.level ?? 1}
              </div>
              <div style={{ fontSize:11, fontFamily:'var(--font-mono)', color:'var(--ink-faint)', textTransform:'uppercase', letterSpacing:'.08em' }}>Level</div>
            </div>
            <div className="card" style={{ textAlign:'center', padding:'20px 16px' }}>
              <div style={{ fontSize:32, fontFamily:'var(--font-serif)', fontWeight:500, color:'var(--clay)', marginBottom:6 }}>
                {userProgress?.total_xp ?? 0}
              </div>
              <div style={{ fontSize:11, fontFamily:'var(--font-mono)', color:'var(--ink-faint)', textTransform:'uppercase', letterSpacing:'.08em' }}>Total XP</div>
            </div>
          </div>

          {/* Composite sparkline */}
          {snapshots && snapshots.length > 1 && (
            <div className="card" style={{ marginBottom:24 }}>
              <div className="eyebrow" style={{ marginBottom:16 }}>◆ Composite Score Over Time</div>
              <div style={{ height:80, display:'flex', alignItems:'flex-end', gap:2 }}>
                {snapshots.map((s: Record<string, unknown>, i: number) => {
                  const composite = (s.composite as number) ?? 50
                  const h = Math.max(4, (composite / 100) * 76)
                  const isLast = i === snapshots.length - 1
                  return (
                    <div key={i}
                      title={`${s.snapshot_date}: ${composite}`}
                      style={{
                        flex:1, height:h, borderRadius:'3px 3px 0 0',
                        background: isLast
                          ? 'var(--sage)'
                          : `hsl(${140 + (composite - 50) * 1.2}, 40%, 60%)`,
                        transition:'height .4s',
                        cursor:'default',
                        opacity: isLast ? 1 : 0.7,
                      }}
                    />
                  )
                })}
              </div>
              <div style={{ display:'flex', justifyContent:'space-between', marginTop:6, fontSize:11, color:'var(--ink-faint)', fontFamily:'var(--font-mono)' }}>
                <span>{snapshots[0]?.snapshot_date}</span>
                <span>{snapshots[snapshots.length-1]?.snapshot_date}</span>
              </div>
            </div>
          )}

          {/* Dimension comparison */}
          {latest && (
            <div className="card" style={{ marginBottom:24 }}>
              <div className="eyebrow" style={{ marginBottom:20 }}>◈ Dimension Breakdown</div>
              <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
                {DIMS.map(dim => {
                  const val = (latest as Record<string, number>)[dim] ?? 0
                  const delta = trend(dim)
                  return (
                    <div key={dim} style={{ display:'flex', alignItems:'center', gap:14 }}>
                      <div style={{ width:88, fontSize:'.8rem', color:'var(--ink-soft)', flexShrink:0 }}>{DIM_LABELS[dim]}</div>
                      <div className="progress-track" style={{ flex:1 }}>
                        <div className="progress-fill" style={{ width:`${val}%`, background: val >= 70 ? 'var(--sage)' : val >= 50 ? 'var(--gold)' : 'var(--rose)' }} />
                      </div>
                      <div style={{ width:32, textAlign:'right', fontFamily:'var(--font-mono)', fontSize:12, fontWeight:600 }}>{val}</div>
                      {delta !== 0 && (
                        <div style={{ width:28, textAlign:'right', fontSize:11, fontFamily:'var(--font-mono)', color: delta > 0 ? 'var(--sage)' : 'var(--rose)' }}>
                          {delta > 0 ? `+${delta}` : delta}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Assessment history */}
          {assessments && assessments.length > 0 && (
            <div className="card">
              <div className="eyebrow" style={{ marginBottom:16 }}>◎ Assessment History</div>
              <div style={{ display:'flex', flexDirection:'column', gap:0 }}>
                {assessments.map((a: Record<string, unknown>, i: number) => (
                  <a key={a.id} href={`/results/${a.id}`} style={{
                    display:'flex', alignItems:'center', gap:16, padding:'14px 0',
                    borderBottom: i < assessments.length-1 ? '1px solid var(--line)' : 'none',
                    textDecoration:'none', color:'inherit',
                  }}>
                    <div style={{
                      width:44, height:44, borderRadius:10, flexShrink:0,
                      background: (a.composite_score ?? 0) >= 70 ? 'var(--sage)' : (a.composite_score ?? 0) >= 50 ? 'var(--gold)' : 'var(--rose)',
                      display:'flex', alignItems:'center', justifyContent:'center',
                      fontFamily:'var(--font-mono)', fontWeight:700, fontSize:14, color:'#fff',
                    }}>{a.composite_score ?? '?'}</div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontWeight:500, fontSize:'.875rem', color:'var(--ink)' }}>
                        {(a.wellness_state ?? 'UNKNOWN').replace(/_/g,' ')}
                      </div>
                      <div style={{ fontSize:'.75rem', color:'var(--ink-faint)', marginTop:2 }}>
                        {a.framework} · {new Date(a.completed_at).toLocaleDateString('en-US', { month:'short', day:'numeric', year:'numeric' })}
                      </div>
                    </div>
                    <div style={{ color:'var(--sage)', fontSize:18 }}>→</div>
                  </a>
 
          )}
        </>
      )}
    </div>
  )
}
</div>
          )}
        </>
      )}
    </div>
  )
}
