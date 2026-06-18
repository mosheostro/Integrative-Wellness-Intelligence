// Universal rules — apply to ALL frameworks
import type { Rule } from '@/lib/types'

export const UNIVERSAL_RULES: Rule[] = [
  // ── Sleep rules ─────────────────────────────────────────────
  {
    id: 'sleep-critical',
    name: 'Critical Sleep Deficit',
    frameworks: ['*' as never],
    priority: 100,
    description: 'Sleep below 30 — immediate intervention needed',
    conditions: [{ dimension: 'sleep', operator: '<', value: 30 }],
    actions: [
      { type: 'set_priority', payload: ['sleep', 'recovery'] },
      { type: 'add_tag', payload: 'sleep-critical' },
    ],
  },
  {
    id: 'sleep-poor',
    name: 'Poor Sleep',
    frameworks: ['*' as never],
    priority: 90,
    description: 'Sleep below 50',
    conditions: [{ dimension: 'sleep', operator: '<', value: 50 }],
    actions: [
      { type: 'add_category', payload: 'sleep' },
      { type: 'boost_category', payload: { category: 'sleep', amount: 30 } },
    ],
  },
  // ── Stress rules ─────────────────────────────────────────────
  {
    id: 'stress-high-sleep-low',
    name: 'High Stress + Sleep Deficit',
    frameworks: ['*' as never],
    priority: 95,
    description: 'Most impactful combination: high stress AND poor sleep',
    conditions: [
      { dimension: 'sleep', operator: '<', value: 40 },
      { dimension: 'stress', operator: '>', value: 70 },
    ],
    actions: [
      { type: 'set_priority', payload: ['sleep', 'stress', 'mindfulness'] },
      { type: 'add_tag', payload: 'crisis-recovery' },
      { type: 'boost_category', payload: { category: 'sleep', amount: 50 } },
      { type: 'boost_category', payload: { category: 'mindfulness', amount: 40 } },
    ],
  },
  {
    id: 'stress-elevated',
    name: 'Elevated Stress',
    frameworks: ['*' as never],
    priority: 80,
    description: 'Stress above 60',
    conditions: [{ dimension: 'stress', operator: '>', value: 60 }],
    actions: [
      { type: 'add_category', payload: 'stress' },
      { type: 'add_category', payload: 'mindfulness' },
      { type: 'boost_category', payload: { category: 'stress', amount: 20 } },
    ],
  },
  // ── Nutrition rules ──────────────────────────────────────────
  {
    id: 'nutrition-poor',
    name: 'Poor Nutrition',
    frameworks: ['*' as never],
    priority: 75,
    description: 'Nutrition below 40',
    conditions: [{ dimension: 'nutrition', operator: '<', value: 40 }],
    actions: [
      { type: 'add_category', payload: 'nutrition' },
      { type: 'add_category', payload: 'hydration' },
      { type: 'boost_category', payload: { category: 'nutrition', amount: 35 } },
    ],
  },
  // ── Movement rules ───────────────────────────────────────────
  {
    id: 'movement-sedentary',
    name: 'Sedentary Pattern',
    frameworks: ['*' as never],
    priority: 70,
    description: 'Movement below 35',
    conditions: [{ dimension: 'movement', operator: '<', value: 35 }],
    actions: [
      { type: 'set_priority', payload: ['movement'] },
      { type: 'add_tag', payload: 'sedentary' },
    ],
  },
  // ── Recovery rules ───────────────────────────────────────────
  {
    id: 'recovery-depleted',
    name: 'Depleted Recovery',
    frameworks: ['*' as never],
    priority: 72,
    description: 'Recovery below 40',
    conditions: [{ dimension: 'recovery', operator: '<', value: 40 }],
    actions: [
      { type: 'add_category', payload: 'recovery' },
      { type: 'boost_category', payload: { category: 'recovery', amount: 25 } },
    ],
  },
  // ── Purpose / meaning ────────────────────────────────────────
  {
    id: 'purpose-low',
    name: 'Low Sense of Purpose',
    frameworks: ['*' as never],
    priority: 55,
    description: 'Purpose below 40',
    conditions: [{ dimension: 'purpose', operator: '<', value: 40 }],
    actions: [
      { type: 'add_category', payload: 'purpose' },
      { type: 'add_category', payload: 'relationships' },
    ],
  },
  // ── Optimal states ───────────────────────────────────────────
  {
    id: 'high-performance-unlock',
    name: 'High Performance State',
    frameworks: ['*' as never],
    priority: 60,
    description: 'All core dimensions strong — shift to optimisation',
    conditions: [
      { dimension: 'energy', operator: '>=', value: 78 },
      { dimension: 'sleep', operator: '>=', value: 70 },
      { dimension: 'stress', operator: '<=', value: 40 },
    ],
    actions: [
      { type: 'add_category', payload: 'purpose' },
      { type: 'add_category', payload: 'environment' },
      { type: 'add_tag', payload: 'optimization' },
    ],
  },
  // ── Inflammatory pattern ─────────────────────────────────────
  {
    id: 'inflammatory-pattern',
    name: 'Inflammatory Pattern',
    frameworks: ['*' as never],
    priority: 68,
    description: 'Low nutrition + low movement + low recovery',
    conditions: [
      { dimension: 'nutrition', operator: '<', value: 45 },
      { dimension: 'movement', operator: '<', value: 45 },
      { dimension: 'recovery', operator: '<', value: 50 },
    ],
    actions: [
      { type: 'add_category', payload: 'nutrition' },
      { type: 'add_category', payload: 'movement' },
      { type: 'add_category', payload: 'recovery' },
      { type: 'add_tag', payload: 'anti-inflammatory' },
      { type: 'boost_category', payload: { category: 'nutrition', amount: 20 } },
    ],
  },
]
