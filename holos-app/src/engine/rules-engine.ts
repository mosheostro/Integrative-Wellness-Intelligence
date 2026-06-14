// ============================================================
// HOLOS — Configurable Rules Engine
//
// Rules are pure data (arrays of condition/action objects).
// The engine evaluates them — no hardcoded if/else.
// Adding a new wellness framework = adding a new rule file.
// Adding a new state/recommendation = adding a new rule object.
// ============================================================

import type {
  Rule, RuleCondition, RuleAction, DimensionScores,
  WellnessState, RecommendationCategory, Framework
} from '@/lib/types'

export interface EvaluationContext {
  scores:    DimensionScores
  state:     WellnessState
  framework: Framework
  history?:  { state: WellnessState; date: string }[]
}

export interface EvaluationResult {
  triggeredRules:      Rule[]
  priorityCategories:  RecommendationCategory[]
  categoryBoosts:      Record<RecommendationCategory, number>
  activeTags:          string[]
  suggestedState?:     WellnessState
}

// ── Condition evaluator ───────────────────────────────────────
function evalCondition(cond: RuleCondition, ctx: EvaluationContext): boolean {
  if (cond.operator === 'state_is') {
    return ctx.state === cond.stateValue
  }

  const dim = cond.dimension
  if (!dim) return false
  const val = ctx.scores[dim]

  switch (cond.operator) {
    case '<':  return val < (cond.value ?? 0)
    case '>':  return val > (cond.value ?? 0)
    case '<=': return val <= (cond.value ?? 0)
    case '>=': return val >= (cond.value ?? 0)
    case '==': return val === cond.value
    case 'between': {
      const [lo, hi] = cond.range ?? [0, 100]
      return val >= lo && val <= hi
    }
    default: return false
  }
}

// ── Action executor ───────────────────────────────────────────
function execAction(
  action: RuleAction,
  result: EvaluationResult
): void {
  switch (action.type) {
    case 'set_state':
      result.suggestedState = action.payload as WellnessState
      break
    case 'add_category':
      if (!result.priorityCategories.includes(action.payload as RecommendationCategory)) {
        result.priorityCategories.push(action.payload as RecommendationCategory)
      }
      break
    case 'boost_category': {
      const { category, amount } = action.payload as { category: RecommendationCategory; amount: number }
      result.categoryBoosts[category] = (result.categoryBoosts[category] ?? 0) + amount
      break
    }
    case 'add_tag':
      if (!result.activeTags.includes(action.payload as string)) {
        result.activeTags.push(action.payload as string)
      }
      break
    case 'set_priority': {
      const cats = Array.isArray(action.payload) ? action.payload : [action.payload]
      for (const cat of cats as RecommendationCategory[]) {
        if (!result.priorityCategories.includes(cat)) {
          result.priorityCategories.unshift(cat) // highest priority
        }
      }
      break
    }
  }
}

// ── Main evaluator ────────────────────────────────────────────
export function evaluateRules(
  rules: Rule[],
  ctx: EvaluationContext
): EvaluationResult {
  const result: EvaluationResult = {
    triggeredRules: [],
    priorityCategories: [],
    categoryBoosts: {} as Record<RecommendationCategory, number>,
    activeTags: [],
  }

  // Sort rules by priority descending, evaluate each
  const sorted = [...rules].sort((a, b) => b.priority - a.priority)

  for (const rule of sorted) {
    // Framework filter: '*' means universal, otherwise must match
    const fwMatch =
      rule.frameworks.includes('*' as Framework) ||
      rule.frameworks.includes(ctx.framework)
    if (!fwMatch) continue

    // All conditions must hold (AND logic)
    const triggered = rule.conditions.every(c => evalCondition(c, ctx))
    if (!triggered) continue

    result.triggeredRules.push(rule)
    for (const action of rule.actions) {
      execAction(action, result)
    }
  }

  return result
}

// ── Recommendation selector ───────────────────────────────────
import type { Recommendation } from '@/lib/types'

export function selectRecommendations(
  catalogue: Recommendation[],
  evalResult: EvaluationResult,
  framework: Framework,
  opts: {
    maxTotal?: number
    maxPerCategory?: number
    excludeIds?: string[]
  } = {}
): Recommendation[] {
  const { maxTotal = 12, maxPerCategory = 3, excludeIds = [] } = opts
  const { priorityCategories, categoryBoosts } = evalResult

  // Filter out excluded (already issued recently)
  const available = catalogue.filter(r => !excludeIds.includes(r.id))

  // Score each recommendation
  const scored = available.map(rec => {
    const fwWeight = rec.framework_weights[framework] ?? 1.0
    const catBoost = categoryBoosts[rec.category] ?? 0
    // Priority = impact × framework weight + category boost, penalise difficulty
    const score =
      (rec.impact_score * fwWeight) +
      catBoost -
      (rec.difficulty_score * 0.2)
    return { rec, score }
  })

  // Sort by priority categories first, then by score
  scored.sort((a, b) => {
    const aCatPriority = priorityCategories.indexOf(a.rec.category)
    const bCatPriority = priorityCategories.indexOf(b.rec.category)
    const aIdx = aCatPriority === -1 ? 999 : aCatPriority
    const bIdx = bCatPriority === -1 ? 999 : bCatPriority
    if (aIdx !== bIdx) return aIdx - bIdx
    return b.score - a.score
  })

  // Cap per category, then cap total
  const countPerCat: Record<string, number> = {}
  const selected: Recommendation[] = []

  for (const { rec } of scored) {
    if (selected.length >= maxTotal) break
    countPerCat[rec.category] = (countPerCat[rec.category] ?? 0)
    if (countPerCat[rec.category] >= maxPerCategory) continue
    countPerCat[rec.category]++
    selected.push(rec)
  }

  return selected
}
