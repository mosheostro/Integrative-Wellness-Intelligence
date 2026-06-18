// ============================================================
// HOLOS — Engine Orchestrator v2
// Multi-layer scoring → state → rules → recommendations
// ============================================================

import type { AssessmentAnswer, Framework, EngineResult } from '@/lib/types'
import { computeMultiLayerScores, determineWellnessState } from './multi-layer-engine'
import { getStateDef } from './state-machine'
import { evaluateRules, selectRecommendations } from './rules-engine'
import { FRAMEWORK_REGISTRY } from '@/frameworks'
import { ALL_RECOMMENDATIONS } from '@/data/recommendations'
import { UNIVERSAL_RULES } from '@/data/rules/universal-rules'
import { AYURVEDA_RULES } from '@/data/rules/ayurveda-rules'
import { RAMBAM_RULES } from '@/data/rules/rambam-rules'
import { DAOIST_RULES } from '@/data/rules/daoist-rules'

const FRAMEWORK_RULES = {
  'evidence-based': [...UNIVERSAL_RULES],
  'ayurveda':       [...UNIVERSAL_RULES, ...AYURVEDA_RULES],
  'rambam':         [...UNIVERSAL_RULES, ...RAMBAM_RULES],
  'hippocrates':    [...UNIVERSAL_RULES],
  'avicenna':       [...UNIVERSAL_RULES],
  'daoist':         [...UNIVERSAL_RULES, ...DAOIST_RULES],
  'tibetan':        [...UNIVERSAL_RULES],
  'swarga':         [...UNIVERSAL_RULES, ...AYURVEDA_RULES, ...RAMBAM_RULES, ...DAOIST_RULES],
}

export function runEngine(
  answers: AssessmentAnswer[],
  framework: Framework,
  opts: { excludeRecommendationIds?: string[] } = {}
): EngineResult {
  // 1. Multi-layer score computation (replaces flat scoring-engine)
  const layeredResult = computeMultiLayerScores(answers, framework)
  const scores = layeredResult.final

  // 2. State — use upgraded determiner from multi-layer engine
  const wellnessState = determineWellnessState(scores)
  const stateDef = getStateDef(wellnessState)

  // 3. Rules
  const rules = FRAMEWORK_RULES[framework] ?? UNIVERSAL_RULES
  const evalResult = evaluateRules(rules, { scores, state: wellnessState, framework })

  // 4. Framework-specific result
  const fwDef = FRAMEWORK_REGISTRY[framework]
  const fwPartial = fwDef.computeResult(answers)
  const frameworkResult = {
    framework,
    label: fwDef.label,
    narrative: fwPartial.narrative ?? '',
    dosha: fwPartial.dosha,
    elements: fwPartial.elements,
    swarga: fwPartial.swarga,
    customDimensions: fwPartial.customDimensions,
  }

  // 5. Recommendations
  const recommendations = selectRecommendations(
    ALL_RECOMMENDATIONS,
    evalResult,
    framework,
    { maxTotal: 12, maxPerCategory: 3, excludeIds: opts.excludeRecommendationIds }
  )

  return {
    scores,
    state: wellnessState,
    stateLabel: stateDef.label,
    stateDescription: stateDef.description,
    triggeredRules: evalResult.triggeredRules,
    priorityCategories: evalResult.priorityCategories,
    recommendations,
    frameworkResult,
  }
}

// Re-export layered result for callers that want the full detail
export { computeMultiLayerScores } from './multi-layer-engine'
export type { LayeredScoreResult, BehavioralProfile } from './multi-layer-engine'
