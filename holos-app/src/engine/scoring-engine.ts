// ============================================================
// HOLOS — Multi-dimensional Scoring Engine
// Each dimension scored independently 0-100.
// Framework-specific weights reshape the raw answer signal.
// ============================================================

import type {
  AssessmentAnswer, DimensionScores, WellnessDimension, Framework
} from '@/lib/types'
import { FRAMEWORK_REGISTRY } from '@/frameworks'

// Raw score per dimension: accumulate weighted votes from answers
export function computeRawScores(answers: AssessmentAnswer[]): Record<WellnessDimension, number[]> {
  const buckets: Record<WellnessDimension, number[]> = {
    nutrition: [], sleep: [], recovery: [], stress: [],
    movement: [], emotional: [], life_balance: [], purpose: [], energy: [],
  }
  for (const answer of answers) {
    const dim = answer.dimension
    if (!(dim in buckets)) continue
    const idx = Array.isArray(answer.optionIndex) ? answer.optionIndex[0] : answer.optionIndex
    // Option index 0 = best, 3 = worst (for most questions)
    // Normalise to 0–100 (4-option scale: 0→100, 1→67, 2→33, 3→0)
    const raw = Math.max(0, Math.min(100, 100 - idx * 33.33))
    buckets[dim].push(raw)
  }
  return buckets
}

export function averageBuckets(
  buckets: Record<WellnessDimension, number[]>
): Record<WellnessDimension, number> {
  const out = {} as Record<WellnessDimension, number>
  for (const [dim, vals] of Object.entries(buckets)) {
    out[dim as WellnessDimension] = vals.length
      ? Math.round(vals.reduce((a, b) => a + b, 0) / vals.length)
      : 50 // default to midpoint if no data
  }
  return out
}

// Apply framework-specific dimensional weights
// Each framework can amplify or dampen certain dimensions
export function applyFrameworkWeights(
  base: Record<WellnessDimension, number>,
  framework: Framework
): DimensionScores {
  const fw = FRAMEWORK_REGISTRY[framework]
  const weights = fw.dimensionWeights

  const dims: WellnessDimension[] = [
    'nutrition','sleep','recovery','stress','movement',
    'emotional','life_balance','purpose','energy'
  ]

  const weighted = {} as Record<WellnessDimension, number>
  for (const dim of dims) {
    const w = weights[dim] ?? 1.0
    // Clamp to 0-100 after applying weight
    weighted[dim] = Math.round(Math.max(0, Math.min(100, base[dim] * w)))
  }

  // Composite: weighted average (stress inverted: high stress = lower composite)
  const stressInverted = 100 - weighted.stress
  const composite = Math.round((
    weighted.nutrition * 1.0 +
    weighted.sleep * 1.2 +
    weighted.recovery * 1.0 +
    stressInverted * 1.1 +
    weighted.movement * 1.0 +
    weighted.emotional * 1.0 +
    weighted.life_balance * 0.9 +
    weighted.purpose * 0.8 +
    weighted.energy * 1.0
  ) / 9.0)

  return { ...weighted, composite }
}

export function computeDimensionScores(
  answers: AssessmentAnswer[],
  framework: Framework
): DimensionScores {
  const buckets = computeRawScores(answers)
  const base = averageBuckets(buckets)
  return applyFrameworkWeights(base, framework)
}
