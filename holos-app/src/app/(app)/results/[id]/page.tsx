'use client'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { use } from 'react'
import { RadarChart } from '@/components/ui/RadarChart'
import { ScoreRing } from '@/components/ui/ScoreRing'
import { HeroReveal, RevealSection, TabReveal } from '@/components/ui/ResultsRevealWrapper'
import type { DimensionScores, WellnessState, Recommendation } from '@/lib/types'
import { getStateDef } from '@/engine/state-machine'
import { FRAMEWORK_REGISTRY } from '@/frameworks'
import { useLanguage } from '@/contexts/LanguageContext'
import { detectPersona, computeTrajectory, PERSONA_META, TRAJECTORY_COLORS } from '@/engine/intelligence-engine'
import type { PersonaResult, TrajectoryResult, ConfidenceLevel } from '@/engine/intelligence-engine'

// 3D Orb — loaded client-side only (WebGL)
const WellnessOrbR3F = dynamic(
  () => import('@/components/ui/WellnessOrbR3F').then(m => m.WellnessOrbR3F),
  { ssr: false, loading: () => <OrbPlaceholder /> }
)

function OrbPlaceholder() {
  return (
    <div style={{
      width: 240, height: 240, borderRadius: '50%',
      background: 'radial-gradient(ellipse at 35% 30%, rgba(122,158,142,0.25) 0%, rgba(122,158,142,0.06) 60%, transparent 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: 'var(--sage-deep)', fontSize: 48,
    }}>◈</div>
  )
}

// Confidence badge
function ConfidenceBadge({ level }: { level: ConfidenceLevel }) {
  const meta: Record<ConfidenceLevel, { label: string; bg: string; color: string }> = {
    high:   { label: 'High confidence', bg: 'rgba(78,122,106,.12)', color: 'var(--sage-deep)' },
    medium: { label: 'Medium confidence', bg: 'rgba(196,165,90,.12)', color: 'var(--gold-deep)' },
    low:    { label: 'Preliminary', bg: 'rgba(180,80,80,.10)', color: 'var(--rose)' },
  }
  const m = meta[level]
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      padding: '2px 8px', borderRadius: 100,
      background: m.bg, color: m.color,
      fontFamily: 'var(--font-mono)', fontSize: '.62rem',
      textTransform: 'uppercase', letterSpacing: '.08em',
      fontWeight: 600,
    }}>
      ● {m.label}
    </span>
  )
}

interface ResultData {
  assessment: { framework: string; wellness_state: WellnessState; composite_score: number }
  scores: DimensionScores
  fwResult: {
    narrative: string
    dosha_vata?: number; dosha_pitta?: number; dosha_kapha?: number; dominant_dosha?: string
    element_wood?: number; element_fire?: number; element_earth?: number; element_metal?: number; element_water?: number
  }
  recommendations: (Recommendation & { id: string; status: string })[]
  snapshots?: Array<{ composite: number; snapshot_date: string }>
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

  const [data, setData]           = useState<ResultData | null>(null)
  const [loading, setLoading]     = useState(true)
  const [error, setError]         = useState('')
  const [activeTab, setActiveTab] = useState<'overview'|'framework'|'recommendations'|'intelligence'>('overview')

  useEffect(() => {
    fetch(`/api/results/${id}`)
      .then(r => {
        if (!r.ok) throw new Error('not_found')
        return r.json()
      })
      .then(d => {
        if (!d?.scores) throw new Error('incomplete')
        setData(d)
      })
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
  const dimLabels: Record<string, string> = {
    nutrition: dims.nutrition, sleep: dims.sleep, recovery: dims.recovery,
    stress: dims.calm, movement: dims.movement, emotional: dims.emotional,
    life_balance: dims.balance, purpose: dims.purpose, energy: dims.energy,
  }

  const radarAxes = [dims.nutrition, dims.sleep, dims.recovery, dims.calm, dims.movement, dims.emotional, dims.balance, dims.purpose, dims.energy]
  const radarVals = dimKeys.map(d => d === 'stress' ? 100 - scores[d] : scores[d])

  // 3D orb dimension values array
  const dimValues = [
    scores.nutrition, scores.sleep, scores.recovery,
    100 - scores.stress, scores.movement, scores.energy,
    scores.emotional, scores.life_balance, scores.purpose,
  ]

  // Intelligence layer: persona + trajectory
  const behavioralProfile = {
    contradictions: [],
    consistencyScore: 75,
    extremeBias: 0,
    dominantConcern: null,
    patternLabel: 'Balanced',
  }
  const persona: PersonaResult = detectPersona(scores, behavioralProfile, !data.snapshots || data.snapshots.length === 0)
  const trajectory: TrajectoryResult = computeTrajectory(scores.composite, data.snapshots ?? [])
  const personaMeta = PERSONA_META[persona.persona]
  const trajectoryColor = TRAJECTORY_COLORS[trajectory.direction]

  const tabLabels: Record<'overview' | 'framework' | 'recommendations' | 'intelligence', string> = {
    overview:        s.overview,
    framework:       s.framework,
    recommendations: s.recommendations,
    intelligence:    'Intelligence',
  }

  // Confidence by score density proxy
  const getRecConfidence = (impactScore: number): ConfidenceLevel => {
    return impactScore >= 8 ? 'high' : impactScore >= 5 ? 'medium' : 'low'
  }

  return (
    <div className="wrap cinematic-bg" style={{ paddingTop:36, paddingBottom:80, position: 'relative' }}>

      {/* ── Hero ─────────────────────────────────────────── */}
      <HeroReveal score={assessment.composite_score}>
        <div className="hero-premium" style={{ marginBottom:40, padding:0 }}>
          <div style={{ display:'grid', gridTemplateColumns:'auto 1fr', gap:32, alignItems:'center', padding:'32px 36px' }}>

            {/* 3D Orb */}
            <div className="orb-glow-wrap">
              <WellnessOrbR3F
                score={assessment.composite_score}
                state={assessment.wellness_state}
                size={240}
                values={dimValues}
              />
            </div>

            <div>
              {/* Framework label */}
              <div className="eyebrow" style={{ marginBottom:12 }}>
                <span style={{ fontSize:16 }}>{fw?.icon ?? '◆'}</span>
                {fw?.label ?? assessment.framework}
              </div>

              {/* Persona badge */}
              <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:14 }}>
                <span style={{
                  display:'inline-flex', alignItems:'center', gap:6,
                  padding:'4px 12px', borderRadius:100,
                  background:`${personaMeta.color}15`,
                  color: personaMeta.color,
                  fontFamily:'var(--font-mono)', fontSize:'.68rem',
                  textTransform:'uppercase', letterSpacing:'.08em', fontWeight:600,
                }}>
                  {personaMeta.emoji} {persona.persona}
                </span>
                <span style={{ fontSize:'.78rem', color:'var(--ink-faint)', fontFamily:'var(--font-body)' }}>
                  {personaMeta.tagline}
                </span>
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

                {/* Trajectory */}
                {trajectory.direction !== 'first_session' && (
                  <span style={{
                    display:'inline-flex', alignItems:'center', gap:5,
                    padding:'4px 10px', borderRadius:100,
                    background:`${trajectoryColor}15`,
                    color: trajectoryColor,
                    fontFamily:'var(--font-mono)', fontSize:'.68rem', fontWeight:600,
                  }}>
                    {trajectory.emoji} {trajectory.direction}
                  </span>
                )}
              </div>

              {/* Trajectory label */}
              {trajectory.direction !== 'first_session' && (
                <p style={{ marginTop:10, fontSize:'.8rem', color:'var(--ink-soft)', fontFamily:'var(--font-body)' }}>
                  {trajectory.label}
                </p>
              )}
            </div>
          </div>
        </div>
      </HeroReveal>

      {/* ── Tabs ─────────────────────────────────────────── */}
      <RevealSection delay={0.15}>
        <div style={{ display:'flex', gap:4, borderBottom:'1px solid var(--line)', marginBottom:36, overflowX:'auto' }}>
          {(['overview','framework','recommendations','intelligence'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              padding:'10px 20px', fontWeight: activeTab===tab ? 600 : 400,
              color: activeTab===tab ? 'var(--ink)' : 'var(--ink-soft)',
              borderBottom: activeTab===tab ? '2px solid var(--sage)' : '2px solid transparent',
              background:'transparent', cursor:'pointer', fontSize:'.9rem',
              transition:'color .15s', whiteSpace:'nowrap', flexShrink:0,
            }}>{tabLabels[tab]}</button>
          ))}
        </div>
      </RevealSection>

      {/* ── Tab: Overview ────────────────────────────────── */}
      {activeTab === 'overview' && (
        <TabReveal tabKey="overview">
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:24, marginBottom:24 }}>
            <RevealSection delay={0.05}>
              <div className="card-depth" style={{ padding:24 }}>
                <div className="eyebrow" style={{ marginBottom:16 }}>◎ {s.wellnessRadar}</div>
                <RadarChart axes={radarAxes} values={radarVals} size={280} />
              </div>
            </RevealSection>

            <RevealSection delay={0.1}>
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
            </RevealSection>
          </div>

          <RevealSection delay={0.18}>
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
          </RevealSection>
        </TabReveal>
      )}

      {/* ── Tab: Framework ───────────────────────────────── */}
      {activeTab === 'framework' && (
        <TabReveal tabKey="framework">
          <RevealSection>
            <div className="card-depth" style={{ padding:28, marginBottom:20 }}>
              <div className="eyebrow" style={{ marginBottom:16 }}>{fw?.icon} {fw?.label} {s.interpretation}</div>
              <p style={{ lineHeight:1.8, color:'var(--ink-soft)' }}>{fwResult?.narrative ?? '—'}</p>
            </div>
          </RevealSection>

          {fwResult?.dosha_vata != null && (
            <RevealSection delay={0.1}>
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
            </RevealSection>
          )}

          {fwResult?.element_wood != null && (
            <RevealSection delay={0.15}>
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
            </RevealSection>
          )}
        </TabReveal>
      )}

      {/* ── Tab: Recommendations ─────────────────────────── */}
      {activeTab === 'recommendations' && (
        <TabReveal tabKey="recommendations">
          <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
            {recommendations.length === 0 && (
              <p className="muted">{s.noRecs}</p>
            )}
            {recommendations.map((rec, i) => {
              const confLevel = getRecConfidence(rec.impact_score)
              return (
                <RevealSection key={rec.id} delay={i * 0.06}>
                  <div className="glass-card" style={{ padding:'20px 24px', borderLeft:`3px solid var(--sage)` }}>
                    <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:16, marginBottom:10 }}>
                      <div>
                        <div style={{ display:'flex', gap:8, alignItems:'center', marginBottom:8, flexWrap:'wrap' }}>
                          <span className="badge badge-sage">{rec.category}</span>
                          <ConfidenceBadge level={confLevel} />
                        </div>
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
                </RevealSection>
              )
            })}
          </div>
        </TabReveal>
      )}

      {/* ── Tab: Intelligence ─────────────────────────────── */}
      {activeTab === 'intelligence' && (
        <TabReveal tabKey="intelligence">
          <div style={{ display:'flex', flexDirection:'column', gap:20 }}>

            {/* Persona card */}
            <RevealSection>
              <div className="card-depth" style={{ padding:28 }}>
                <div className="eyebrow" style={{ marginBottom:16 }}>◈ Wellness Archetype</div>
                <div style={{ display:'flex', alignItems:'flex-start', gap:20 }}>
                  <div style={{
                    width:56, height:56, borderRadius:16, flexShrink:0,
                    background:`${personaMeta.color}18`,
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize:24, color: personaMeta.color,
                  }}>{personaMeta.emoji}</div>
                  <div>
                    <h3 style={{ fontFamily:'var(--font-serif)', fontSize:'1.3rem', color:'var(--ink)', marginBottom:6 }}>
                      {persona.persona}
                    </h3>
                    <p style={{ color:'var(--ink-soft)', fontSize:'.9rem', lineHeight:1.7, marginBottom:10 }}>
                      {personaMeta.tagline}
                    </p>
                    <p style={{ color:'var(--ink-soft)', fontSize:'.875rem', lineHeight:1.7 }}>
                      <strong style={{ color:'var(--ink)' }}>Primary drive:</strong> {persona.primaryDrive}
                    </p>
                    <p style={{ color:'var(--ink-soft)', fontSize:'.875rem', lineHeight:1.7, marginTop:6 }}>
                      <strong style={{ color:'var(--ink)' }}>Coaching approach:</strong> {persona.coachingStyle}
                    </p>
                    <div style={{ marginTop:12, display:'flex', alignItems:'center', gap:8 }}>
                      <span style={{ fontFamily:'var(--font-mono)', fontSize:'.68rem', color:'var(--ink-faint)', textTransform:'uppercase', letterSpacing:'.08em' }}>
                        Detection confidence
                      </span>
                      <div style={{ flex:1, height:4, background:'var(--line)', borderRadius:2, maxWidth:120 }}>
                        <div style={{ width:`${persona.confidence}%`, height:'100%', background: personaMeta.color, borderRadius:2 }} />
                      </div>
                      <span style={{ fontFamily:'var(--font-mono)', fontSize:11, color: personaMeta.color, fontWeight:600 }}>
                        {persona.confidence}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </RevealSection>

            {/* Trajectory card */}
            <RevealSection delay={0.08}>
              <div className="card-depth" style={{ padding:28 }}>
                <div className="eyebrow" style={{ marginBottom:16 }}>◎ Wellness Trajectory</div>
                <div style={{ display:'flex', alignItems:'center', gap:16 }}>
                  <div style={{
                    width:52, height:52, borderRadius:'50%', flexShrink:0,
                    background:`${trajectoryColor}15`,
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize:22, color: trajectoryColor,
                    fontFamily:'var(--font-mono)',
                  }}>{trajectory.emoji}</div>
                  <div>
                    <div style={{ fontFamily:'var(--font-serif)', fontSize:'1.1rem', color:'var(--ink)', marginBottom:4, textTransform:'capitalize' }}>
                      {trajectory.direction.replace('_', ' ')}
                    </div>
                    <p style={{ color:'var(--ink-soft)', fontSize:'.875rem', lineHeight:1.6 }}>
                      {trajectory.label}
                    </p>
                    {trajectory.delta !== 0 && (
                      <div style={{
                        marginTop:8, display:'inline-flex', alignItems:'center', gap:4,
                        fontFamily:'var(--font-mono)', fontSize:11, fontWeight:700,
                        color: trajectory.delta > 0 ? 'var(--sage-deep)' : 'var(--rose)',
                      }}>
                        {trajectory.delta > 0 ? '+' : ''}{trajectory.delta} pts vs previous
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </RevealSection>

            {/* Focus areas */}
            <RevealSection delay={0.16}>
              <div className="card-depth" style={{ padding:28 }}>
                <div className="eyebrow" style={{ marginBottom:16 }}>◆ Highest-Leverage Focus Areas</div>
                <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                  {persona.focusAreas.map((dim, i) => {
                    const val = dim === 'stress' ? 100 - scores[dim] : scores[dim]
                    return (
                      <div key={dim} style={{ display:'flex', alignItems:'center', gap:14 }}>
                        <div style={{
                          width:28, height:28, borderRadius:8, flexShrink:0,
                          background:'var(--line)',
                          display:'flex', alignItems:'center', justifyContent:'center',
                          fontFamily:'var(--font-mono)', fontSize:11, fontWeight:700,
                          color:'var(--ink-faint)',
                        }}>{i + 1}</div>
                        <div style={{ flex:1 }}>
                          <div style={{ display:'flex', justifyContent:'space-between', marginBottom:5 }}>
                            <span style={{ fontSize:'.875rem', color:'var(--ink)', fontWeight:500 }}>
                              {dimLabels[dim]}
                            </span>
                            <span style={{ fontFamily:'var(--font-mono)', fontSize:11, color:'var(--ink)', fontWeight:700 }}>{val}</span>
                          </div>
                          <div className="progress-premium">
                            <div className="progress-premium-fill" style={{ width:`${val}%`, background:`var(${DIM_COLORS[dim] ?? '--sage'})` }} />
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </RevealSection>

            {/* Why this matters */}
            <RevealSection delay={0.22}>
              <div className="glass-card" style={{ padding:24 }}>
                <div className="eyebrow" style={{ marginBottom:12 }}>◉ Why These Recommendations</div>
                <p style={{ color:'var(--ink-soft)', fontSize:'.9rem', lineHeight:1.75 }}>
                  As a <strong style={{ color:'var(--ink)' }}>{persona.persona}</strong>, your coaching is optimized for{' '}
                  <em>{persona.primaryDrive.toLowerCase()}</em>. The recommendations above were selected because they
                  address your lowest-scoring dimensions, where a small improvement yields the largest composite gain.
                  Alternatives (like focusing on your strongest dimensions) were deprioritized — your strengths are
                  already sustaining you; leverage them to support weaker areas.
                </p>
              </div>
            </RevealSection>
          </div>
        </TabReveal>
      )}

      {/* ── CTA ──────────────────────────────────────────── */}
      <RevealSection delay={0.2} style={{ marginTop:48 }}>
        <div style={{ display:'flex', gap:12 }}>
          <a href="/coach" className="btn btn-primary">{s.talkCoach}</a>
          <a href="/assessment" className="btn btn-ghost">{s.reassess}</a>
        </div>
      </RevealSection>
    </div>
  )
}
