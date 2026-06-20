'use client'
import { useEffect, useState } from 'react'
import { use } from 'react'
import { RadarChart } from '@/components/ui/RadarChart'
import { ScoreRing } from '@/components/ui/ScoreRing'
import { WellnessOrb } from '@/components/ui/WellnessOrb'
import type { DimensionScores, WellnessState, Recommendation } from '@/lib/types'
import { getStateDef } from '@/engine/state-machine'
import { FRAMEWORK_REGISTRY } from '@/frameworks'
import { useLanguage } from '@/contexts/LanguageContext'

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

const DIM_COLORS: Record<string, string> = {
  nutrition:'--gold-deep', sleep:'--indigo', recovery:'--sage', stress:'--rose',
  movement:'--clay', emotional:'--sage', life_balance:'--gold', purpose:'--indigo', energy:'--sage',
}

export default function ResultsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { strings } = useLanguage()
  const s = strings.results
  const dims = strings.dimensions

  const [data, setData]         = useState<ResultData | null>(null)
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState('')
  const [activeTab, setActiveTab] = useState<'overview'|'framework'|'recommendations'>('overview')

  useEffect(() => {
    fetch(`/api/results/${id}`)
      .then(r => r.json())
      .then(setData)
      .catch(() => setError(strings.common.error))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return (
    <div style={{ minHeight:'80dvh', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div className="spinner" style={{ width:40, height:40, borderWidth:3 }} />
    </div>
  )
  if (error || !data) return (
    <div className="wrap section-pad">
      <p style={{ color:'var(--rose)' }}>{error || strings.common.error}</p>
    </div>
  )

  const { assessment, scores, fwResult, recommendations } = data
  const stateDef = getStateDef(assessment.wellness_state)
  const fw = FRAMEWORK_REGISTRY[assessment.framework as keyof typeof FRAMEWORK_REGISTRY]

  const dimKeys = ['nutrition','sleep','recovery','stress','movement','emotional','life_balance','purpose','energy'] as const

  // Translated dimension labels (stress → calm)
  const dimLabels: Record<string, string> = {
    nutrition: dims.nutrition, sleep: dims.sleep, recovery: dims.recovery,
    stress: dims.calm, movement: dims.movement, emotional: dims.emotional,
    life_balance: dims.balance, purpose: dims.purpose, energy: dims.energy,
  }

  const radarAxes = [dims.nutrition, dims.sleep, dims.recovery, dims.calm, dims.movement, dims.emotional, dims.balance, dims.purpose, dims.energy]
  const radarVals = dimKeys.map(d => d === 'stress' ? 100 - scores[d] : scores[d])

  const tabLabels: Record<'overview' | 'framework' | 'recommendations', string> = {
    overview:        s.overview,
    framework:       s.framework,
    recommendations: s.recommendations,
  }

  // Build dimension values array for WellnessOrb nodes [nutrition, sleep, recovery, stress-inv, movement, energy, emotional, balance, purpose]
  const dimValues = [
    scores.nutrition, scores.sleep, scores.recovery,
    100 - scores.stress, scores.movement, scores.energy,
    scores.emotional, scores.life_balance, scores.purpose,
  ]

  return (
    <div className="wrap cinematic-bg" style={{ paddingTop:36, paddingBottom:80 }}>
      {/* Hero */}
      <div className="hero-premium" style={{ marginBottom:40, padding:0 }}>
        <div style={{ display:'grid', gridTemplateColumns:'auto 1fr', gap:32, alignItems:'center', padding:'32px 36px' }}>
          <WellnessOrb score={assessment.composite_score} state={stateDef.label} size={240} values={dimValues} />
          <div>
            <div className="eyebrow" style={{ marginBottom:12 }}>
              <span style={{ fontSize:16 }}>{fw?.icon ?? '◆'}</span>
              {fw?.label ?? assessment.framework}
            </div>
            <h1 className="h1" style={{ marginBottom:12 }}>
              Your wellness ecosystem<br/>
              <span className="serif-it">{stateDef.label === 'BALANCED' ? s.inBalance : s.needsAttention}</span>
            </h1>
            <p className="lede" style={{ marginBottom:20 }}>{stateDef.description}</p>
            <div style={{ display:'flex', gap:10, flexWrap:'wrap', alignItems:'center' }}>
              <span className="state-pill" style={{ background:`rgba(var(--sage-rgb,122,158,142),.15)`, color:`var(${stateDef.color})` }}>
                {stateDef.emoji} {stateDef.label}
              </span>
              <div className="score-badge">
                <span className="score-num" style={{ fontSize:'2rem' }}>{assessment.composite_score}</span>
                <span className="score-denom">/100</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display:'flex', gap:4, borderBottom:'1px solid var(--line)', marginBottom:36 }}>
        {(['overview','framework','recommendations'] as const).map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{
            padding:'10px 20px', fontWeight: activeTab===tab ? 600 : 400,
            color: activeTab===tab ? 'var(--ink)' : 'var(--ink-soft)',
            borderBottom: activeTab===tab ? '2px solid var(--sage)' : '2px solid transparent',
            background:'transparent', cursor:'pointer', fontSize:'.9rem',
            transition:'color .15s',
          }}>{tabLabels[tab]}</button>
        ))}
      </div>

      {/* Tab: Overview */}
      {activeTab === 'overview' && (
        <div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:24, marginBottom:24 }}>
            <div className="card-depth" style={{ padding:24 }}>
              <div className="eyebrow" style={{ marginBottom:16 }}>◎ {s.wellnessRadar}</div>
              <RadarChart axes={radarAxes} values={radarVals} size={280} />
            </div>

            <div className="card-depth" style={{ padding:24 }}>
              <div className="eyebrow" style={{ marginBottom:20 }}>◈ {s.dimensionScores}</div>
              <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
                {dimKeys.map(dim => {
                  const val = dim === 'stress' ? 100 - scores[dim] : scores[dim]
                  return (
                    <div key={dim}>
                      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
                        <span style={{ fontSize:'.8125rem', color:'var(--ink-soft)' }}>{dimLabels[dim]}</span>
                        <span style={{ fontFamily:'var(--font-mono)', fontSize:12, color:'var(--ink)', fontWeight:600 }}>{val}</span>
                      </div>
                      <div className="progress-premium">
                        <div className="progress-premium-fill" style={{ width:`${val}%`, background:`var(${DIM_COLORS[dim]})` }} />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="card-depth" style={{ padding:24 }}>
            <div className="eyebrow" style={{ marginBottom:24 }}>◆ {s.dimensionRings}</div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(90px, 1fr))', gap:16 }}>
              {dimKeys.map(dim => (
                <div className="dim-card" key={dim}>
                  <ScoreRing
                    value={dim === 'stress' ? 100 - scores[dim] : scores[dim]}
                    color={DIM_COLORS[dim]}
                    size={76}
                    label={dimLabels[dim]}
                    glow={true}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab: Framework */}
      {activeTab === 'framework' && (
        <div>
          <div className="card-depth" style={{ padding:28, marginBottom:20 }}>
            <div className="eyebrow" style={{ marginBottom:16 }}>{fw?.icon} {fw?.label} {s.interpretation}</div>
            <p style={{ lineHeight:1.8, color:'var(--ink-soft)' }}>{fwResult.narrative}</p>
          </div>

          {fwResult.dosha_vata != null && (
            <div className="card-depth" style={{ padding:24, marginBottom:20 }}>
              <div className="eyebrow" style={{ marginBottom:16 }}>◎ {s.doshaBalance}</div>
              <div style={{ marginBottom:8 }}>
                <strong style={{ fontFamily:'var(--font-serif)' }}>{s.dominant} {fwResult.dominant_dosha}</strong>
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
                  <div className="progress-premium">
                    <div className="progress-premium-fill" style={{ width:`${d.val ?? 0}%`, background:`var(${d.color})` }} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {fwResult.element_wood != null && (
            <div className="card-depth" style={{ padding:24 }}>
              <div className="eyebrow" style={{ marginBottom:16 }}>◎ {s.fiveElements}</div>
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
                  <div className="progress-premium">
                    <div className="progress-premium-fill" style={{ width:`${e.val ?? 0}%`, background:`var(${e.color})` }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab: Recommendations */}
      {activeTab === 'recommendations' && (
        <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
          {recommendations.length === 0 && (
            <p className="muted">{s.noRecs}</p>
          )}
          {recommendations.map((rec, i) => (
            <div key={rec.id} className="glass-card" style={{ padding:'20px 24px', borderLeft:`3px solid var(--sage)` }}>
              <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:16, marginBottom:10 }}>
                <div>
                  <span className="badge badge-sage" style={{ marginBottom:8 }}>{rec.category}</span>
                  <h3 style={{ fontFamily:'var(--font-serif)', fontSize:'1.05rem', color:'var(--ink)' }}>
                    {i + 1}. {rec.title}
                  </h3>
                </div>
                <div style={{ textAlign:'right', flexShrink:0 }}>
                  <div style={{ fontFamily:'var(--font-mono)', fontSize:11, color:'var(--ink-faint)' }}>{s.impact}</div>
                  <div style={{ fontFamily:'var(--font-mono)', fontSize:18, fontWeight:700, color:'var(--sage-deep)' }}>+{rec.impact_score}</div>
                </div>
              </div>
              <p style={{ color:'var(--ink-soft)', fontSize:'.9rem', lineHeight:1.7 }}>{rec.description}</p>
              {rec.evidence_level && (
                <div style={{ marginTop:12 }}>
                  <span className="badge">{rec.evidence_level} {s.evidence}</span>
                  {rec.time_minutes && <span className="badge" style={{ marginLeft:6 }}>{rec.time_minutes} {s.min}</span>}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* CTA */}
      <div style={{ marginTop:48, display:'flex', gap:12 }}>
        <a href="/coach" className="btn btn-primary">{s.talkCoach}</a>
        <a href="/assessment" className="btn btn-ghost">{s.reassess}</a>
      </div>
    </div>
  )
}
