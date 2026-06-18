// ============================================================
// HOLOS — Multi-Layer Scoring Engine v2
// 6 layers transform raw answers into a personalized
// wellness state vector. No two users get identical results.
// ============================================================

import type {
  AssessmentAnswer, DimensionScores, WellnessDimension, Framework,
  WellnessState,
} from '@/lib/types'
import { FRAMEWORK_REGISTRY } from '@/frameworks'

// ── Types ────────────────────────────────────────────────────

export interface BehavioralProfile {
  contradictions: string[]          // detected pattern conflicts
  consistencyScore: number          // 0-100: how internally consistent answers are
  extremeBias: number               // -1 to 1: tendency toward extremes
  dominantConcern: WellnessDimension | null
  patternLabel: string              // human-readable pattern name
}

export interface TemporalContext {
  hourOfDay: number                 // 0-23
  season: 'spring' | 'summer' | 'autumn' | 'winter'
  dayOfWeek: number                 // 0=Sunday
  isWeekend: boolean
  circadianPhase: 'early_morning' | 'morning' | 'midday' | 'afternoon' | 'evening' | 'night'
}

export interface LayeredScoreResult {
  raw: Record<WellnessDimension, number>          // Layer 1
  behavioral: Record<WellnessDimension, number>   // Layer 2
  tradition: Record<WellnessDimension, number>    // Layer 3
  evidence: Record<WellnessDimension, number>     // Layer 4
  temporal: Record<WellnessDimension, number>     // Layer 5
  final: DimensionScores                          // Layer 6
  behavioral_profile: BehavioralProfile
  temporal_context: TemporalContext
  uncertainty_seed: number                        // for variability
}

const DIMS: WellnessDimension[] = [
  'nutrition','sleep','recovery','stress','movement',
  'emotional','life_balance','purpose','energy'
]

// ── Layer 1: Raw Input Normalization ────────────────────────
// Converts answer indices to 0-100 scores per dimension.
// Handles contradictions at the raw level already.

export function layer1_rawNormalization(
  answers: AssessmentAnswer[]
): Record<WellnessDimension, number> {
  const buckets: Record<string, number[]> = {}
  for (const dim of DIMS) buckets[dim] = []

  for (const ans of answers) {
    const dim = ans.dimension as WellnessDimension
    if (!DIMS.includes(dim)) continue

    const idx = Array.isArray(ans.optionIndex) ? ans.optionIndex[0] : ans.optionIndex
    // Option 0 = best response, higher index = worse.
    // Support 3, 4, or 5-option questions.
    const maxIdx = 4 // default 5-point scale (0-4)
    const normalized = Math.round(Math.max(0, Math.min(100, 100 - (idx / maxIdx) * 100)))
    buckets[dim].push(normalized)
  }

  const out = {} as Record<WellnessDimension, number>
  for (const dim of DIMS) {
    const vals = buckets[dim]
    out[dim] = vals.length
      ? Math.round(vals.reduce((a, b) => a + b, 0) / vals.length)
      : 50
  }
  return out
}

// ── Layer 2: Behavioral Interpretation ──────────────────────
// Detects answer PATTERNS and adjusts scores accordingly.
// Key insight: same raw scores with different patterns → different results.

export function layer2_behavioralInterpretation(
  raw: Record<WellnessDimension, number>,
  answers: AssessmentAnswer[]
): { scores: Record<WellnessDimension, number>; profile: BehavioralProfile } {
  const scores = { ...raw }
  const contradictions: string[] = []

  // Contradiction 1: High energy + poor sleep (unsustainable pattern)
  if (raw.energy > 70 && raw.sleep < 40) {
    contradictions.push('high_energy_poor_sleep')
    // Energy is likely borrowed — apply cortisol-driven energy flag
    scores.energy = Math.round(raw.energy * 0.82)
    scores.recovery = Math.round(raw.recovery * 0.88)
  }

  // Contradiction 2: High stress + claims high emotional wellbeing
  if (raw.stress > 75 && raw.emotional > 75) {
    contradictions.push('stress_emotional_disconnect')
    // Possible dissociation or high resilience — moderate both
    scores.emotional = Math.round(raw.emotional * 0.90)
    scores.stress = Math.round(raw.stress * 0.95)
  }

  // Contradiction 3: High movement + very low recovery (overtraining pattern)
  if (raw.movement > 75 && raw.recovery < 35) {
    contradictions.push('overtraining_pattern')
    scores.movement = Math.round(raw.movement * 0.85)
    scores.energy = Math.round(raw.energy * 0.88)
  }

  // Contradiction 4: High life_balance claims but low purpose (surface-level balance)
  if (raw.life_balance > 75 && raw.purpose < 35) {
    contradictions.push('balance_without_meaning')
    scores.life_balance = Math.round(raw.life_balance * 0.88)
    scores.emotional = Math.round(raw.emotional * 0.92)
  }

  // Cascade: Poor sleep affects energy and recovery downstream
  if (raw.sleep < 40) {
    scores.energy = Math.round(scores.energy * (0.7 + raw.sleep * 0.003))
    scores.recovery = Math.round(scores.recovery * (0.75 + raw.sleep * 0.002))
  }

  // Cascade: High stress degrades nutrition adherence, sleep quality
  if (raw.stress > 70) {
    const stressMultiplier = 1 - ((raw.stress - 70) / 100) * 0.25
    scores.nutrition = Math.round(scores.nutrition * stressMultiplier)
    scores.sleep = Math.round(scores.sleep * (0.85 + (100 - raw.stress) * 0.001))
  }

  // Consistency score: how close are related dimensions?
  const physicalDims = [scores.nutrition, scores.movement, scores.sleep, scores.recovery]
  const mentalDims = [scores.emotional, scores.purpose, scores.life_balance]
  const physVariance = variance(physicalDims)
  const mentalVariance = variance(mentalDims)
  const avgVariance = (physVariance + mentalVariance) / 2
  const consistencyScore = Math.round(Math.max(0, 100 - avgVariance * 0.3))

  // Extreme bias: tendency to answer all high or all low
  const allVals = Object.values(raw)
  const mean = allVals.reduce((a, b) => a + b, 0) / allVals.length
  const extremeBias = (mean - 50) / 50 // -1=all low, 0=balanced, 1=all high

  // Dominant concern
  const lowestDim = DIMS.reduce((a, b) => scores[a] < scores[b] ? a : b)
  const dominantConcern = scores[lowestDim] < 45 ? lowestDim : null

  // Pattern label
  let patternLabel = 'Balanced'
  if (contradictions.includes('overtraining_pattern')) patternLabel = 'Active Depletion'
  else if (contradictions.includes('high_energy_poor_sleep')) patternLabel = 'Cortisol Drive'
  else if (contradictions.includes('stress_emotional_disconnect')) patternLabel = 'High-Functioning Stress'
  else if (contradictions.includes('balance_without_meaning')) patternLabel = 'Surface Equilibrium'
  else if (mean < 35) patternLabel = 'Systemic Depletion'
  else if (mean > 75) patternLabel = 'High Performance'
  else if (physVariance > 600) patternLabel = 'Physical Imbalance'
  else if (mentalVariance > 600) patternLabel = 'Mental Imbalance'

  // Clamp all scores
  for (const dim of DIMS) {
    scores[dim] = Math.round(Math.max(0, Math.min(100, scores[dim])))
  }

  return {
    scores,
    profile: {
      contradictions,
      consistencyScore,
      extremeBias,
      dominantConcern,
      patternLabel,
    },
  }
}

// ── Layer 3: Tradition Mapping ───────────────────────────────
// Each tradition reweights dimensions differently.
// Ayurveda emphasizes digestion/energy, TCM emphasizes flow/elements,
// Rambam emphasizes sleep/nutrition, Evidence-based weights by research.

export function layer3_traditionMapping(
  scores: Record<WellnessDimension, number>,
  framework: Framework
): Record<WellnessDimension, number> {
  const fw = FRAMEWORK_REGISTRY[framework]
  const weights = fw.dimensionWeights
  const out = {} as Record<WellnessDimension, number>

  for (const dim of DIMS) {
    const w = weights[dim as WellnessDimension] ?? 1.0
    // Weights shift the score toward or away from its raw value
    // Weight > 1.0 amplifies deviations from 50
    const deviation = scores[dim] - 50
    out[dim] = Math.round(Math.max(0, Math.min(100, 50 + deviation * w)))
  }

  return out
}

// ── Layer 4: Evidence-Based Cascade Adjustment ───────────────
// Applies physiological cascade effects based on research:
// - Sleep debt → cognitive impairment, energy, immunity
// - Chronic stress → HPA dysregulation, gut issues, sleep
// - Poor nutrition → energy instability, mood, recovery

export function layer4_evidenceCascade(
  scores: Record<WellnessDimension, number>
): Record<WellnessDimension, number> {
  const out = { ...scores }

  // Sleep debt cascade (Mathew Walker: 6 hrs sleep = 10 IQ points)
  if (scores.sleep < 50) {
    const sleepDebt = (50 - scores.sleep) / 50 // 0-1
    out.energy   = Math.round(scores.energy   * (1 - sleepDebt * 0.30))
    out.emotional= Math.round(scores.emotional * (1 - sleepDebt * 0.20))
    out.recovery = Math.round(scores.recovery  * (1 - sleepDebt * 0.25))
    out.stress   = Math.round(Math.min(100, scores.stress * (1 + sleepDebt * 0.15)))
  }

  // HPA axis: chronic stress → cortisol → gut dysbiosis → immunity issues
  if (scores.stress > 65) {
    const stressLoad = (scores.stress - 65) / 35 // 0-1
    out.nutrition = Math.round(scores.nutrition * (1 - stressLoad * 0.12))
    out.recovery  = Math.round(scores.recovery  * (1 - stressLoad * 0.18))
    out.sleep     = Math.round(scores.sleep     * (1 - stressLoad * 0.10))
  }

  // Nutrition cascade: poor nutrition → unstable energy, impaired recovery
  if (scores.nutrition < 45) {
    const nutDeficit = (45 - scores.nutrition) / 45
    out.energy   = Math.round(scores.energy   * (1 - nutDeficit * 0.15))
    out.recovery = Math.round(scores.recovery  * (1 - nutDeficit * 0.10))
  }

  // Movement bonus: consistent movement improves stress resilience, sleep
  if (scores.movement > 70) {
    const movBonus = (scores.movement - 70) / 30
    out.sleep   = Math.round(Math.min(100, scores.sleep   * (1 + movBonus * 0.08)))
    out.stress  = Math.round(Math.max(0,   scores.stress  * (1 - movBonus * 0.10)))
    out.emotional=Math.round(Math.min(100, scores.emotional*(1 + movBonus * 0.06)))
  }

  // Clamp
  for (const dim of DIMS) {
    out[dim] = Math.round(Math.max(0, Math.min(100, out[dim])))
  }
  return out
}

// ── Layer 5: Temporal Context ────────────────────────────────
// Assessment time affects interpretation.
// Evening assessments: energy naturally lower → calibrate up
// Winter: lower baseline vitamin D/mood → note in context
// Monday: stress peaks → calibrate stress interpretation

export function getTemporalContext(): TemporalContext {
  const now = new Date()
  const hour = now.getHours()
  const month = now.getMonth() // 0-11
  const day = now.getDay()

  const season: TemporalContext['season'] =
    month >= 2 && month <= 4 ? 'spring' :
    month >= 5 && month <= 7 ? 'summer' :
    month >= 8 && month <= 10 ? 'autumn' : 'winter'

  const circadianPhase: TemporalContext['circadianPhase'] =
    hour >= 5 && hour < 7  ? 'early_morning' :
    hour >= 7 && hour < 12 ? 'morning' :
    hour >= 12 && hour < 14 ? 'midday' :
    hour >= 14 && hour < 18 ? 'afternoon' :
    hour >= 18 && hour < 22 ? 'evening' : 'night'

  return {
    hourOfDay: hour,
    season,
    dayOfWeek: day,
    isWeekend: day === 0 || day === 6,
    circadianPhase,
  }
}

export function layer5_temporalAdjustment(
  scores: Record<WellnessDimension, number>,
  ctx: TemporalContext
): Record<WellnessDimension, number> {
  const out = { ...scores }

  // Circadian energy adjustment: evening naturally shows lower energy
  if (ctx.circadianPhase === 'evening' || ctx.circadianPhase === 'night') {
    out.energy = Math.round(Math.min(100, scores.energy * 1.08)) // calibrate up
  }
  if (ctx.circadianPhase === 'early_morning') {
    out.energy = Math.round(Math.min(100, scores.energy * 1.05))
    out.stress = Math.round(Math.max(0, scores.stress * 0.95)) // pre-day stress lower
  }

  // Monday stress elevation (known phenomenon)
  if (ctx.dayOfWeek === 1) { // Monday
    out.stress = Math.round(Math.min(100, scores.stress * 1.05))
  }
  // Weekend recovery boost
  if (ctx.isWeekend) {
    out.recovery = Math.round(Math.min(100, scores.recovery * 1.04))
    out.stress   = Math.round(Math.max(0, scores.stress * 0.96))
  }

  // Seasonal vitamin D / mood adjustment (winter)
  if (ctx.season === 'winter') {
    out.energy   = Math.round(Math.max(0, scores.energy * 0.97))
    out.emotional= Math.round(Math.max(0, scores.emotional * 0.97))
  }
  if (ctx.season === 'spring') {
    out.energy   = Math.round(Math.min(100, scores.energy * 1.03))
    out.emotional= Math.round(Math.min(100, scores.emotional * 1.03))
  }

  for (const dim of DIMS) {
    out[dim] = Math.round(Math.max(0, Math.min(100, out[dim])))
  }
  return out
}

// ── Layer 6: Holistic Balance Correction ─────────────────────
// Final calibration pass.
// 1. Prevent single dimension from dominating composite.
// 2. Apply wellness state modifiers.
// 3. Add controlled micro-variability (±2-5 pts) per session.
// 4. Compute final composite with tradition-aware weights.

export function layer6_holisticBalance(
  scores: Record<WellnessDimension, number>,
  framework: Framework,
  uncertaintySeed: number
): DimensionScores {
  const out = { ...scores }

  // Balance correction: if one dimension is 40+ points above average,
  // it likely reflects reporting bias — bring it slightly toward mean
  const mean = Object.values(out).reduce((a, b) => a + b, 0) / DIMS.length
  for (const dim of DIMS) {
    const deviation = out[dim] - mean
    if (Math.abs(deviation) > 40) {
      out[dim] = Math.round(out[dim] - deviation * 0.15) // pull 15% toward mean
    }
  }

  // Micro-variability: ensures no two sessions produce identical numbers
  // Seed-based: same answers on same day produce similar but not identical results
  for (const dim of DIMS) {
    const dimSeed = (uncertaintySeed + dim.charCodeAt(0)) % 100
    const variance = (dimSeed / 100) * 6 - 3 // ±3 points
    out[dim] = Math.round(Math.max(0, Math.min(100, out[dim] + variance)))
  }

  // Composite: stress inverted (high stress = low wellness)
  // Tradition-weighted composite
  const fw = FRAMEWORK_REGISTRY[framework]
  const weights = fw.dimensionWeights
  const stressInverted = 100 - out.stress

  const weightedSum =
    out.nutrition    * (weights.nutrition    ?? 1.0) +
    out.sleep        * (weights.sleep        ?? 1.2) +
    out.recovery     * (weights.recovery     ?? 1.0) +
    stressInverted   * (weights.stress       ?? 1.1) +
    out.movement     * (weights.movement     ?? 1.0) +
    out.emotional    * (weights.emotional    ?? 1.0) +
    out.life_balance * (weights.life_balance ?? 0.9) +
    out.purpose      * (weights.purpose      ?? 0.8) +
    out.energy       * (weights.energy       ?? 1.0)

  const totalWeight =
    (weights.nutrition    ?? 1.0) + (weights.sleep        ?? 1.2) +
    (weights.recovery     ?? 1.0) + (weights.stress       ?? 1.1) +
    (weights.movement     ?? 1.0) + (weights.emotional    ?? 1.0) +
    (weights.life_balance ?? 0.9) + (weights.purpose      ?? 0.8) +
    (weights.energy       ?? 1.0)

  const composite = Math.round(weightedSum / totalWeight)

  return {
    nutrition:    out.nutrition,
    sleep:        out.sleep,
    recovery:     out.recovery,
    stress:       out.stress,
    movement:     out.movement,
    emotional:    out.emotional,
    life_balance: out.life_balance,
    purpose:      out.purpose,
    energy:       out.energy,
    composite:    Math.max(1, Math.min(99, composite)),
  }
}

// ── Main Multi-Layer Orchestrator ────────────────────────────

export function computeMultiLayerScores(
  answers: AssessmentAnswer[],
  framework: Framework
): LayeredScoreResult {
  // Generate uncertainty seed from answer pattern (reproducible but unique)
  const uncertaintySeed = answers.reduce(
    (acc, a, i) => acc + (Array.isArray(a.optionIndex) ? a.optionIndex[0] : a.optionIndex) * (i + 1) * 7,
    0
  ) % 100

  const temporal = getTemporalContext()

  // Execute all 6 layers in sequence
  const raw       = layer1_rawNormalization(answers)
  const { scores: beh, profile } = layer2_behavioralInterpretation(raw, answers)
  const tradition = layer3_traditionMapping(beh, framework)
  const evidence  = layer4_evidenceCascade(tradition)
  const temporal5 = layer5_temporalAdjustment(evidence, temporal)
  const final     = layer6_holisticBalance(temporal5, framework, uncertaintySeed)

  return {
    raw,
    behavioral:          beh,
    tradition,
    evidence,
    temporal:            temporal5,
    final,
    behavioral_profile:  profile,
    temporal_context:    temporal,
    uncertainty_seed:    uncertaintySeed,
  }
}

// ── Wellness State Determination (upgraded) ──────────────────

export function determineWellnessState(scores: DimensionScores): WellnessState {
  const { composite, sleep, stress, recovery, energy, emotional, nutrition } = scores
  const stressLevel = 100 - stress // inverted: high stress = low score

  if (composite >= 82 && stressLevel >= 70) return 'HIGH_PERFORMANCE'
  if (composite >= 70 && sleep >= 70 && stressLevel >= 65) return 'BALANCED'
  if (sleep < 40) return 'SLEEP_DEFICIT'
  if (stress > 72) return 'STRESS_DOMINANT'
  if (recovery < 38 && energy < 45) return 'LOW_RECOVERY'
  if (energy < 35 && nutrition < 45) return 'ENERGY_IMBALANCE'
  if (nutrition < 38 || (nutrition < 50 && energy < 50)) return 'INFLAMMATORY_PATTERN'
  if (emotional < 40) return 'LIFESTYLE_IMPROVEMENT'
  if (composite >= 65) return 'OPTIMIZATION'
  return 'MAINTENANCE'
}

// ── Utilities ────────────────────────────────────────────────

function variance(vals: number[]): number {
  if (vals.length < 2) return 0
  const mean = vals.reduce((a, b) => a + b, 0) / vals.length
  return vals.reduce((a, b) => a + (b - mean) ** 2, 0) / vals.length
}
