// ============================================================
// HOLOS — Intelligence Authenticity Engine
// Persona detection, confidence model, trajectory engine,
// and Personalization Depth Score.
//
// These layers ensure no two users receive identical output
// and every recommendation knows WHY it was chosen.
// ============================================================

import type { DimensionScores, WellnessDimension } from '@/lib/types'
import type { BehavioralProfile } from './multi-layer-engine'

// ── Types ────────────────────────────────────────────────────

export type WellnessPersona =
  | 'Optimizer'   // High performer seeking peak — all dims > 65, wants fine-tuning
  | 'Seeker'      // Purpose/meaning driven — purpose + emotional focus
  | 'Builder'     // Systematically addressing gaps — high variance between dims
  | 'Recoverer'   // Coming back from depletion — improving from low baseline
  | 'Explorer'    // Curious, multi-framework — enjoys discovery
  | 'Stabilizer'  // Wants consistency — mid-range, low variance

export interface PersonaResult {
  persona: WellnessPersona
  confidence: number        // 0-100: how certain the detection is
  primaryDrive: string      // Short label of what drives this persona
  coachingStyle: string     // How the AI coach should adapt
  focusAreas: WellnessDimension[]
}

export type ConfidenceLevel = 'high' | 'medium' | 'low'

export interface ConfidenceResult {
  level: ConfidenceLevel
  score: number         // 0-100
  reasoning: string     // Why this confidence level was assigned
  dataPoints: number    // How many answers contributed to this finding
}

export type TrajectoryDirection =
  | 'improving'    // Composite trending up ≥ 5 pts
  | 'plateauing'   // Stable within ±5 pts
  | 'declining'    // Composite trending down ≥ 5 pts
  | 'recovering'   // Was low, now improving
  | 'unstable'     // Oscillating — high variance across sessions
  | 'first_session' // No history to compare

export interface TrajectoryResult {
  direction: TrajectoryDirection
  delta: number           // Change in composite vs previous session
  momentum: number        // -100 to 100 (negative = declining momentum)
  label: string           // Human-readable trajectory description
  emoji: string
}

export interface PersonalizationDepthScore {
  score: number           // 0-100 uniqueness measure
  drivers: string[]       // What made this result unique
  uniformityRisk: boolean // True if output risks being too generic
}

export interface IntelligenceProfile {
  persona: PersonaResult
  trajectory: TrajectoryResult
  overallConfidence: ConfidenceResult
  personalizationDepth: PersonalizationDepthScore
  explainability: ExplainabilityChain
}

export interface ExplainabilityChain {
  primaryInsight: string
  keyFindings: Array<{ finding: string; confidence: ConfidenceLevel; reason: string }>
  alternativesConsidered: string[]
  whyNotAlternatives: string
}

// ── Wellness Persona Detection ───────────────────────────────

const DIMS: WellnessDimension[] = [
  'nutrition','sleep','recovery','stress','movement',
  'emotional','life_balance','purpose','energy'
]

function dimensionVariance(scores: DimensionScores): number {
  const vals = DIMS.map(d => d === 'stress' ? 100 - scores[d] : scores[d])
  const mean = vals.reduce((a, b) => a + b, 0) / vals.length
  return vals.reduce((a, b) => a + (b - mean) ** 2, 0) / vals.length
}

function dimensionMean(scores: DimensionScores): number {
  const vals = DIMS.map(d => d === 'stress' ? 100 - scores[d] : scores[d])
  return vals.reduce((a, b) => a + b, 0) / vals.length
}

function lowestDims(scores: DimensionScores, count: number): WellnessDimension[] {
  return DIMS
    .map(d => ({ d, v: d === 'stress' ? 100 - scores[d] : scores[d] }))
    .sort((a, b) => a.v - b.v)
    .slice(0, count)
    .map(x => x.d)
}

function highestDims(scores: DimensionScores, count: number): WellnessDimension[] {
  return DIMS
    .map(d => ({ d, v: d === 'stress' ? 100 - scores[d] : scores[d] }))
    .sort((a, b) => b.v - a.v)
    .slice(0, count)
    .map(x => x.d)
}

export function detectPersona(
  scores: DimensionScores,
  behavioralProfile: BehavioralProfile,
  isFirstAssessment: boolean,
  previousComposite?: number
): PersonaResult {
  const composite = scores.composite
  const variance = dimensionVariance(scores)
  const mean = dimensionMean(scores)
  const stressAdj = 100 - scores.stress // inverted: high = calm

  // Determine persona using decision logic
  // Priority: most specific match wins

  // OPTIMIZER: High performer across the board
  if (composite >= 75 && variance < 200 && mean >= 68) {
    const conf = Math.min(95, 60 + (composite - 75) * 1.5 + (mean - 68) * 0.5)
    return {
      persona: 'Optimizer',
      confidence: Math.round(conf),
      primaryDrive: 'Performance excellence',
      coachingStyle: 'Challenge and precision — focus on marginal gains, advanced protocols, periodization',
      focusAreas: lowestDims(scores, 2),
    }
  }

  // RECOVERER: Was low, now improving (or still low with improving trend)
  if (
    (composite < 60 && !isFirstAssessment && previousComposite !== undefined && previousComposite < 50) ||
    (composite >= 45 && composite < 65 && !isFirstAssessment && previousComposite !== undefined && composite > previousComposite + 5)
  ) {
    return {
      persona: 'Recoverer',
      confidence: 78,
      primaryDrive: 'Rebuilding foundations',
      coachingStyle: 'Compassionate pacing — celebrate incremental wins, avoid overwhelm, prioritize stability',
      focusAreas: lowestDims(scores, 3),
    }
  }

  // SEEKER: Purpose and meaning oriented
  if (scores.purpose >= 65 && scores.emotional < 62 && scores.life_balance < 62) {
    const conf = 65 + (scores.purpose - 65) * 0.8
    return {
      persona: 'Seeker',
      confidence: Math.round(Math.min(90, conf)),
      primaryDrive: 'Meaning and depth',
      coachingStyle: 'Philosophical and values-based — connect recommendations to life meaning, explore identity and contribution',
      focusAreas: ['emotional', 'life_balance', 'purpose'],
    }
  }

  // BUILDER: High variance — systematically working on gaps
  if (variance >= 450 && composite >= 40) {
    const conf = 60 + Math.min(25, (variance - 450) / 30)
    return {
      persona: 'Builder',
      confidence: Math.round(conf),
      primaryDrive: 'Structured gap-closing',
      coachingStyle: 'Systematic and methodical — create step-by-step protocols, track metrics, address root causes',
      focusAreas: lowestDims(scores, 3),
    }
  }

  // STABILIZER: Mid-range composite, low variance — wants steady state
  if (composite >= 52 && composite <= 74 && variance < 350) {
    const conf = 65 - Math.abs(composite - 63) * 0.5
    return {
      persona: 'Stabilizer',
      confidence: Math.round(Math.max(55, conf)),
      primaryDrive: 'Consistent wellbeing',
      coachingStyle: 'Maintenance and habit-building — focus on routines, sustainability over optimization',
      focusAreas: lowestDims(scores, 2),
    }
  }

  // EXPLORER: Default for first assessment with high curiosity signal
  // (contradiction patterns suggest willingness to explore)
  if (isFirstAssessment || behavioralProfile.contradictions.length >= 2) {
    return {
      persona: 'Explorer',
      confidence: 58,
      primaryDrive: 'Discovery and learning',
      coachingStyle: 'Diverse and curious — offer multiple frameworks, experiment with protocols, embrace iteration',
      focusAreas: highestDims(scores, 2), // explore strengths first
    }
  }

  // Fallback to Stabilizer
  return {
    persona: 'Stabilizer',
    confidence: 50,
    primaryDrive: 'Wellbeing maintenance',
    coachingStyle: 'Consistent support — reinforce positive patterns, gently address weaknesses',
    focusAreas: lowestDims(scores, 2),
  }
}

// ── Confidence Model ─────────────────────────────────────────
// Per-dimension confidence: based on answer density + behavioral consistency

export function computeConfidence(
  dimensionAnswerCounts: Record<WellnessDimension, number>,
  behavioralProfile: BehavioralProfile,
  targetDimension: WellnessDimension
): ConfidenceResult {
  const answerCount = dimensionAnswerCounts[targetDimension] ?? 0
  const consistency = behavioralProfile.consistencyScore

  // Data density score (0-40 pts)
  const densityScore = answerCount >= 5 ? 40 : answerCount >= 3 ? 28 : answerCount >= 2 ? 18 : 8

  // Behavioral consistency score (0-40 pts)
  const consistencyContrib = Math.round(consistency * 0.4)

  // Contradiction penalty (-15 pts if this dim involved in contradiction)
  const contractionPenalty = behavioralProfile.contradictions.some(
    c => c.includes(targetDimension)
  ) ? -15 : 0

  const raw = densityScore + consistencyContrib + contractionPenalty
  const score = Math.max(0, Math.min(100, raw + 10)) // +10 base

  const level: ConfidenceLevel = score >= 70 ? 'high' : score >= 45 ? 'medium' : 'low'

  const reasoning =
    level === 'high'
      ? `Strong data: ${answerCount} answers with high behavioral consistency (${consistency}/100)`
      : level === 'medium'
      ? `Moderate data: ${answerCount} answers — consider follow-up questions for sharper insight`
      : `Limited data: ${answerCount} answer${answerCount === 1 ? '' : 's'} — this finding is preliminary`

  return { level, score, reasoning, dataPoints: answerCount }
}

export function computeOverallConfidence(
  behavioralProfile: BehavioralProfile,
  totalAnswers: number
): ConfidenceResult {
  const density = Math.min(40, totalAnswers * 2)
  const consistency = Math.round(behavioralProfile.consistencyScore * 0.5)
  const contradictionPenalty = behavioralProfile.contradictions.length * 8
  const raw = density + consistency - contradictionPenalty
  const score = Math.max(15, Math.min(95, raw + 10))

  const level: ConfidenceLevel = score >= 70 ? 'high' : score >= 45 ? 'medium' : 'low'

  return {
    level,
    score,
    reasoning:
      level === 'high'
        ? 'Assessment data is rich and internally consistent'
        : level === 'medium'
        ? 'Good assessment coverage — some areas could benefit from deeper exploration'
        : 'Assessment is a starting point — more data will sharpen these insights',
    dataPoints: totalAnswers,
  }
}

// ── Trajectory Engine ────────────────────────────────────────
// Requires historical composite scores (from progress_snapshots)

export function computeTrajectory(
  currentComposite: number,
  snapshotHistory: Array<{ composite: number; snapshot_date: string }>
): TrajectoryResult {
  if (!snapshotHistory || snapshotHistory.length < 2) {
    return {
      direction: 'first_session',
      delta: 0,
      momentum: 0,
      label: 'First assessment — your baseline is set',
      emoji: '◎',
    }
  }

  // Sort by date ascending, take last 5
  const sorted = [...snapshotHistory]
    .sort((a, b) => new Date(a.snapshot_date).getTime() - new Date(b.snapshot_date).getTime())
    .slice(-5)

  const previous = sorted[sorted.length - 2]?.composite ?? currentComposite
  const delta = currentComposite - previous

  // Momentum: weighted average of recent deltas
  const deltas: number[] = []
  for (let i = 1; i < sorted.length; i++) {
    deltas.push(sorted[i].composite - sorted[i - 1].composite)
  }
  const momentum = deltas.length
    ? Math.round(deltas.reduce((a, b) => a + b, 0) / deltas.length * 5) // scale to -100/100
    : 0

  // Variance across recent history — unstable if high
  const histVals = sorted.map(s => s.composite)
  const histMean = histVals.reduce((a, b) => a + b, 0) / histVals.length
  const histVariance = histVals.reduce((a, b) => a + (b - histMean) ** 2, 0) / histVals.length

  // Classify trajectory
  let direction: TrajectoryDirection
  let label: string
  let emoji: string

  if (histVariance > 100 && deltas.length >= 3) {
    direction = 'unstable'
    label = 'Oscillating — building consistency will amplify your gains'
    emoji = '⇅'
  } else if (previous < 50 && delta >= 5) {
    direction = 'recovering'
    label = `Recovering — up ${delta} pts from your baseline`
    emoji = '↑'
  } else if (delta >= 5) {
    direction = 'improving'
    label = `Improving — up ${delta} pts since last assessment`
    emoji = '↑'
  } else if (delta <= -5) {
    direction = 'declining'
    label = `Declining — down ${Math.abs(delta)} pts — let's look at what shifted`
    emoji = '↓'
  } else {
    direction = 'plateauing'
    label = 'Stable — consistent foundation, ready to level up'
    emoji = '→'
  }

  return { direction, delta, momentum: Math.max(-100, Math.min(100, momentum)), label, emoji }
}

// ── Personalization Depth Score ──────────────────────────────
// Measures how unique / personalized this output is (0=generic, 100=maximally unique)

export function computePersonalizationDepth(
  scores: DimensionScores,
  behavioralProfile: BehavioralProfile,
  persona: WellnessPersona,
  trajectoryDirection: TrajectoryDirection,
  framework: string
): PersonalizationDepthScore {
  const drivers: string[] = []
  let score = 30 // base: always some personalization

  // Behavioral contradictions detected → unique pattern
  if (behavioralProfile.contradictions.length > 0) {
    score += 15
    drivers.push(`${behavioralProfile.contradictions.length} behavioral pattern${behavioralProfile.contradictions.length > 1 ? 's' : ''} detected`)
  }

  // Dominant concern (lowest dim) is unique
  if (behavioralProfile.dominantConcern) {
    score += 12
    drivers.push(`Dominant concern: ${behavioralProfile.dominantConcern}`)
  }

  // Non-default pattern label
  if (behavioralProfile.patternLabel !== 'Balanced') {
    score += 10
    drivers.push(`Pattern: ${behavioralProfile.patternLabel}`)
  }

  // Persona detection confidence
  score += Math.min(15, Math.round(0.15))

  // Trajectory adds temporal uniqueness
  if (trajectoryDirection !== 'first_session' && trajectoryDirection !== 'plateauing') {
    score += 8
    drivers.push(`Trajectory: ${trajectoryDirection}`)
  }

  // Framework choice
  if (framework !== 'evidence-based') {
    score += 5
    drivers.push(`Tradition: ${framework}`)
  }

  // Score spread: high variance = highly individual
  const vals = DIMS.map(d => d === 'stress' ? 100 - scores[d] : scores[d])
  const mean = vals.reduce((a, b) => a + b, 0) / vals.length
  const variance = vals.reduce((a, b) => a + (b - mean) ** 2, 0) / vals.length
  if (variance > 400) {
    score += 10
    drivers.push('Highly asymmetric dimension profile')
  } else if (variance > 200) {
    score += 5
    drivers.push('Variable dimension profile')
  }

  const finalScore = Math.min(98, score)
  const uniformityRisk = finalScore < 40

  return { score: finalScore, drivers, uniformityRisk }
}

// ── Explainability Chain ─────────────────────────────────────

export function buildExplainabilityChain(
  scores: DimensionScores,
  persona: PersonaResult,
  trajectory: TrajectoryResult,
  behavioralProfile: BehavioralProfile,
  framework: string
): ExplainabilityChain {
  const lowestDim = DIMS.reduce((a, b) =>
    (a === 'stress' ? 100 - scores[a] : scores[a]) <
    (b === 'stress' ? 100 - scores[b] : scores[b]) ? a : b
  )
  const lowestVal = lowestDim === 'stress' ? 100 - scores[lowestDim] : scores[lowestDim]
  const highestDim = DIMS.reduce((a, b) =>
    (a === 'stress' ? 100 - scores[a] : scores[a]) >
    (b === 'stress' ? 100 - scores[b] : scores[b]) ? a : b
  )

  const keyFindings: ExplainabilityChain['keyFindings'] = [
    {
      finding: `${lowestDim.replace('_', ' ')} is your primary opportunity area (score: ${lowestVal})`,
      confidence: lowestVal < 35 ? 'high' : lowestVal < 55 ? 'medium' : 'low',
      reason: `Lowest dimension — highest leverage for composite improvement`,
    },
    {
      finding: `You match the ${persona.persona} wellness archetype`,
      confidence: persona.confidence >= 75 ? 'high' : persona.confidence >= 50 ? 'medium' : 'low',
      reason: persona.primaryDrive,
    },
    {
      finding: `Trajectory: ${trajectory.label}`,
      confidence: trajectory.direction === 'first_session' ? 'low' : 'medium',
      reason: trajectory.direction === 'first_session'
        ? 'No prior data — this is your baseline'
        : `Based on ${trajectory.delta > 0 ? '+' : ''}${trajectory.delta} point change`,
    },
  ]

  if (behavioralProfile.patternLabel !== 'Balanced') {
    keyFindings.push({
      finding: `Detected pattern: ${behavioralProfile.patternLabel}`,
      confidence: behavioralProfile.consistencyScore >= 70 ? 'high' : 'medium',
      reason: `Behavioral consistency score: ${behavioralProfile.consistencyScore}/100`,
    })
  }

  const alternativesConsidered = [
    persona.persona === 'Optimizer' ? 'Stabilizer (ruled out: composite too high for maintenance mode)' : 'Optimizer (ruled out: composite below peak threshold)',
    `${highestDim.replace('_', ' ')} as primary focus (deprioritized: already strong at ${scores[highestDim as WellnessDimension]}+)`,
  ].filter(Boolean)

  return {
    primaryInsight: `Your ${lowestDim.replace('_', ' ')} score of ${lowestVal} is the highest-leverage intervention point within your ${persona.persona} archetype.`,
    keyFindings,
    alternativesConsidered,
    whyNotAlternatives: `Recommendations focused on ${lowestDim.replace('_', ' ')} because it scores ${lowestVal} — addressing this single dimension has the highest cascade effect on your composite.`,
  }
}

// ── Full Intelligence Profile Orchestrator ───────────────────

export function buildIntelligenceProfile(
  scores: DimensionScores,
  behavioralProfile: BehavioralProfile,
  framework: string,
  totalAnswers: number,
  dimensionAnswerCounts: Record<WellnessDimension, number>,
  snapshotHistory: Array<{ composite: number; snapshot_date: string }>,
  isFirstAssessment: boolean,
  previousComposite?: number
): IntelligenceProfile {
  const persona = detectPersona(scores, behavioralProfile, isFirstAssessment, previousComposite)
  const trajectory = computeTrajectory(scores.composite, snapshotHistory)
  const overallConfidence = computeOverallConfidence(behavioralProfile, totalAnswers)
  const personalizationDepth = computePersonalizationDepth(scores, behavioralProfile, persona.persona, trajectory.direction, framework)
  const explainability = buildExplainabilityChain(scores, persona, trajectory, behavioralProfile, framework)

  return { persona, trajectory, overallConfidence, personalizationDepth, explainability }
}

// ── Persona display helpers ──────────────────────────────────

export const PERSONA_META: Record<WellnessPersona, { emoji: string; color: string; tagline: string }> = {
  Optimizer:   { emoji: '◈', color: 'var(--sage-deep)',  tagline: 'Peak performance seeker' },
  Seeker:      { emoji: '◉', color: 'var(--indigo)',     tagline: 'Meaning and depth explorer' },
  Builder:     { emoji: '◆', color: 'var(--clay)',       tagline: 'Systematic gap-closer' },
  Recoverer:   { emoji: '◎', color: 'var(--gold-deep)',  tagline: 'Rebuilding with intention' },
  Explorer:    { emoji: '◇', color: 'var(--rose)',       tagline: 'Curious wellness pioneer' },
  Stabilizer:  { emoji: '◫', color: 'var(--ink-soft)',   tagline: 'Consistency champion' },
}

export const TRAJECTORY_COLORS: Record<TrajectoryDirection, string> = {
  improving:    'var(--sage-deep)',
  recovering:   'var(--sage)',
  plateauing:   'var(--ink-soft)',
  declining:    'var(--rose)',
  unstable:     'var(--gold-deep)',
  first_session: 'var(--indigo)',
}
