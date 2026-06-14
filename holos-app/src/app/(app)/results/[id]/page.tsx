'use client'
import { useEffect, useState } from 'react'
import { use } from 'react'
import { RadarChart } from '@/components/ui/RadarChart'
import { ScoreRing } from '@/components/ui/ScoreRing'
import { WellnessOrb } from '@/components/ui/WellnessOrb'
import type { DimensionScores, WellnessState, Recommendation } from '@/lib/types'
import { getStateDef } from '@/engine/state-machine'
import { FRAMEWORK_REGISTRY } from '@/frameworks'

interface ResultData {
  assessment: { framework: string; wellness_state: WellnessState; composite_score: number }
  scores: DimensionScores
  fwResult: {
    narrative: string
    dosha_vata?: number; dosha_pitta?: number; dosha_kapha?: number; dominant_dosha?: string
    element_wood?: number; element_fire?: number; element_earth?: number; element_metal?: number; element_water?: number
  }
  recommendations: (Recommendation & { id: string; status: string })[]
}

const DIMENSION_LABELS: Record<string, string> = {
  nutrition:'Nutrition', sleep:'Sleep', recovery:'Recovery', stress:'Stress',
  movement:'Movement', emotional:'Emotional', life_balance:'Life Balance', purpose:'Purpose', energy:'Energy',
}
const DIM_COLORS: Record<string, string> = {
  nutrition:'--gold-deep', sleep:'--indigo', recovery:'--sage', stress:'--rose',
  movement:'--clay', emotional:'--sage', life_balance:'--gold', purpose:'--indigo', energy:'--sage',
}

export default function ResultsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [data, setData] = useState<ResultData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState<'overview'|'framework'|'recommendations'>('overview')

  useEffect(() => {
    fetch(`/api/results/${id}`)
      .then(r => r.json())
      .then(setData)
      .catch(() => setError('Failed to load results'))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return (
    <div style={{ minHeight:'80dvh', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div className="spinner" style={{ width:40, height:40, borderWidth:3 }} />
    </div>
  )
  if (error || !data) return <div className="wrap section-pad"><p style={{ color:'var(--rose)' }}>{error || 'Results not found'}</p></div>

  const { assessment, scores, fwResult, recommendations } = data
  const stateDef = getStateDef(assessment.wellness_state)
  const fw = FRAMEWORK_REGISTRY[assessment.framework as keyof typeof FRAMEWORK_REGISTRY]

  const dims = ['nutrition','sleep','recovery','stress','movement','emotional','life_balance','purpose','energy'] as const
  const radarAxes  = ['Body','Sleep','Recovery','Stress','Movement','Emotional','Balance','Purpose','Energy']
  const radarVals  = dims.map(d => d === 'stress' ? 100 - scores[d] : scores[d])

  return (
    <div className="wrap" style={{ paddingTop:40, paddingBottom:80 }}>
      {/* Hero */}
      <div style={{ display:'grid', gridTemplateColumns:'auto 1fr', gap:40, alignItems:'center', marginBottom:48 }}>
        <WellnessOrb score={assessment.composite_score} state={stateDef.label} size={220} />
        <div>
          <div className="eyebrow" style={{ marginBottom:12 }}>
            <span style={{ fontSize:16 }}>{fw?.icon ?? '◆'}</span>
            {fw?.label ?? assessment.framework}
          </div>
          <h1 className="h1" style={{ marginBottom:12 }}>
            Your wellness ecosystem<br/>
            <span className="serif-it">{stateDef.label === 'BALANCED' ? 'is in balance.' : `needs attention.`}</span>
          </h1>
          <p className="lede" style={{ marginBottom:20 }}>{stateDef.description}</p>
          <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
            <span className="state-pill" style={{ background:`rgba(var(--sage-rgb,122,158,142),.15)`, color:`var(${stateDef.color})` }}>
              {stateDef.emoji} {stateDef.label}
            </span>
            <span className="badge">Score: {assessment.composite_score}/100</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display:'flex', gap:4, borderBottom:'1px solid var(--line)', marginBottom:40 }}>
        {(['overview','framework','recommendations'] as const).map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{
            padding:'10px 20px', fontWeight: activeTab===tab ? 600 : 400,
            color: activeTab===tab ? 'var(--ink)' : 'var(--ink-soft)',
            borderBottom: activeTab===tab ? '2px solid var(--sage)' : '2px solid transparent',
            background:'transparent', cursor:'pointer', fontSize:'.9rem', textTransform:'capitalize',
          }}>{tab}</button>
        ))}
      </div>

      {/* Tab: Overview */}
      {activeTab === 'overview' && (
        <div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:32, marginBottom:40 }}>
            {/* Radar */}
            <div className="card">
              <div className="eyebrow" style={{ marginBottom:16 }}>◎ Wellness Radar</div>
              <RadarChart axes={radarAxes} values={radarVals} size={280} />
            </div>

            {/* Dimension scores */}
            <div className="card">
              <div className="eyebrow" style={{ marginBottom:20 }}>◈ Dimension Scores</div>
              <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
                {dims.map(dim => {
                  const val = dim === 'stress' ? 100 - scores[dim] : scores[dim]
                  const label = dim === 'stress' ? 'Calm' : DIMENSION_LABELS[dim]
                  return (
                    <div key={dim}>
                      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:5 }}>
                        <span style={{ fontSize:'.8125rem', color:'var(--ink-soft)' }}>{label}</span>
                        <span style={{ fontFamily:'var(--font-mono)', fontSize:12, color:'var(--ink)', fontWeight:600 }}>{val}</span>
                      </div>
                      <div className="progress-track" style={{ height:6 }}>
                        <div className="progress-fill" style={{ width:`${val}%`, background:`var(${DIM_COLORS[dim]})` }} />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Score rings grid */}
          <div className="card">
            <div className="eyebrow" style={{ marginBottom:24 }}>◆ Dimension Rings</div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(100px, 1fr))', gap:24 }}>
              {dims.slice(0,6).map(dim => (
                <ScoreRing
                  key={dim}
                  value={dim === 'stress' ? 100 - scores[dim] : scores[dim]}
                  color={DIM_COLORS[dim]}
                  size={80}
                  label={dim === 'stress' ? 'Calm' : DIMENSION_LABELS[dim]}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab: Framework */}
      {activeTab === 'framework' && (
        <div>
          <div className="card" style={{ marginBottom:24 }}>
            <div className="eyebrow" style={{ marginBottom:16 }}>{fw?.icon} {fw?.label} Interpretation</div>
            <p style={{ lineHeight:1.8, color:'var(--ink-soft)' }}>{fwResult.narrative}</p>
          </div>

          {/* Dosha if available */}
          {fwResult.dosha_vata != null && (
            <div className="card" style={{ marginBottom:24 }}>
              <div className="eyebrow" style={{ marginBottom:16 }}>◎ Dosha Balance</div>
              <div style={{ marginBottom:8 }}>
                <strong style={{ fontFamily:'var(--font-serif)' }}>Dominant: {fwResult.dominant_dosha}</strong>
              </div>
              {[
                { label:'Vata', val:fwResult.dosha_vata, color:'--indigo' },
                { label:'Pitta', val:fwResult.dosha_pitta, color:'--clay' },
                { label:'Kapha', val:fwResult.dosha_kapha, color:'--sage' },
              ].map(d => (
                <div key={d.label} style={{ marginBottom:14 }}>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:5 }}>
                    <span style={{ fontSize:'.875rem', color:'var(--ink-soft)' }}>{d.label}</span>
                    <span style={{ fontFamily:'var(--font-mono)', fontSize:12 }}>{d.val ?? 0}%</span>
                  </div>
                  <div className="progress-track" style={{ height:8 }}>
                    <div className="progress-fill" style={{ width:`${d.val ?? 0}%`, background:`var(${d.color})` }} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Elements if available */}
          {fwResult.element_wood != null && (
            <div className="card">
              <div className="eyebrow" style={{ marginBottom:16 }}>◎ Five Elements</div>
              {[
                { label:'Wood', val:fwResult.element_wood, color:'--sage' },
                { label:'Fire', val:fwResult.element_fire, color:'--clay' },
                { label:'Earth', val:fwResult.element_earth, color:'--gold-deep' },
                { label:'Metal', val:fwResult.element_metal, color:'--ink-soft' },
                { label:'Water', val:fwResult.element_water, color:'--indigo' },
              ].map(e => (
                <div key={e.label} style={{ marginBottom:14 }}>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:5 }}>
                    <span style={{ fontSize:'.875rem', color:'var(--ink-soft)' }}>{e.label}</span>
                    <span style={{ fontFamily:'var(--font-mono)', fontSize:12 }}>{e.val ?? 0}%</span>
                  </div>
                  <div className="progress-track" style={{ height:8 }}>
                    <div className="progress-fill" style={{ width:`${e.val ?? 0}%`, background:`var(${e.color})` }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab: Recommendations */}
      {activeTab === 'recommendations' && (
        <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
          {recommendations.length === 0 && (
            <p className="muted">No recommendations available. Retake your assessment to generate a fresh plan.</p>
          )}
          {recommendations.map((rec, i) => (
            <div key={rec.id} className="card card-hover" style={{ borderLeft:`3px solid var(--sage)` }}>
              <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:16, marginBottom:10 }}>
                <div>
                  <span className="badge badge-sage" style={{ marginBottom:8 }}>{rec.category}</span>
                  <h3 style={{ fontFamily:'var(--font-serif)', fontSize:'1.05rem', color:'var(--ink)' }}>
                    {i + 1}. {rec.title}
                  </h3>
                </div>
                <div style={{ textAlign:'right', flexShrink:0 }}>
                  <div style={{ fontFamily:'var(--font-mono)', fontSize:11, color:'var(--ink-faint)' }}>Impact</div>
                  <div style={{ fontFamily:'var(--font-mono)', fontSize:16, fontWeight:600, color:'var(--sage)' }}>{rec.impact_score}</div>
                </div>
              </div>
              <p style={{ color:'var(--ink-soft)', fontSize:'.9rem', lineHeight:1.7 }}>{rec.description}</p>
              {rec.evidence_level && (
                <div style={{ marginTop:12 }}>
                  <span className="badge">{rec.evidence_level} evidence</span>
                  {rec.time_minutes && <span className="badge" style={{ marginLeft:6 }}>{rec.time_minutes} min</span>}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* CTA */}
      <div style={{ marginTop:48, display:'flex', gap:12 }}>
        <a href="/coach" className="btn btn-primary">Talk to your AI coach →</a>
        <a href="/assessment" className="btn btn-ghost">Reassess under a different framework</a>
      </div>
    </div>
  )
}
