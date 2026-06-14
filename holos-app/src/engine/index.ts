// ============================================================
// HOLOS — Engine Orchestrator
// Combines: scoring → state → rules → recommendations
// ============================================================

import type { AssessmentAnswer, Framework, EngineResult } from '@/lib/types'
import { computeDimensionScores } from './scoring-engine'
import { determineWellnessState, getStateDef } from './state-machine'
import { evaluateRules, selectRecommendations } from './rules-engine'
import { FRAMEWORK_REGISTRY } from '@/frameworks'
import { ALL_RECOMMENDATIONS } from '@/data/recommendations'
import { UNIVERSAL_RULES } from '@/data/rules/universal-rules'
import { AYURVEDA_RULES } from '@/data/rules/ayurveda-rules'
import { RAMBAM_RULES } from '@/data/rules/rambam-rules'
import { DAOIST_RULES } from '@/data/rules/daoist-rules'

const FRAMEWORK_RULES = {
  'evidence-based': [...UNIVERSAL_RULES],
  'ayurveda': [...UNIVERSAL_RULES, ...AYURVEDA_RULES],
  'rambam': [...UNIVERSAL_RULES, ...RAMBAM_RULES],
  'hippocrates': [...UNIVERSAL_RULES],
  'avicenna': [...UNIVERSAL_RULES],
  'daoist': [...UNIVERSAL_RULES, ...DAOIST_RULES],
  'tibetan': [...UNIVERSAL_RULES],
  'swarga': [...UNIVERSAL_RULES, ...AYURVEDA_RULES, ...RAMBAM_RULES, ...DAOIST_RULES],
}

export function runEngine(
  answers: AssessmentAnswer[],
  framework: Framework,
  opts: { excludeRecommendationIds?: string[] } = {}
): EngineResult {
  // 1. Score
  const scores = computeDimensionScores(answers, framework)

  // 2. State
  const stateDef = determineWellnessState(scores)
  const state = stateDef.state

  // 3. Rules
  const rules = FRAMEWORK_RULES[framework] ?? UNIVERSAL_RULES
  const evalResult = evaluateRules(rules, { scores, state, framework })

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
    state,
    stateLabel: stateDef.label,
    stateDescription: stateDef.description,
    triggeredRules: evalResult.triggeredRules,
    priorityCategories: evalResult.priorityCategories,
    recommendations,
    frameworkResult,
  }
}
