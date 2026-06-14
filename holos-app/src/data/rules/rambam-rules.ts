import type { Rule } from '@/lib/types'

export const RAMBAM_RULES: Rule[] = [
  {
    id: 'rm-regimen-hygiene',
    name: 'Six Non-Naturals Imbalance',
    frameworks: ['rambam'],
    priority: 82,
    description: 'Rambam\'s six essentials: air, food, drink, movement/rest, sleep, emotional state',
    conditions: [
      { dimension: 'life_balance', operator: '<', value: 50 },
    ],
    actions: [
      { type: 'add_category', payload: 'environment' },
      { type: 'add_category', payload: 'nutrition' },
      { type: 'add_tag', payload: 'rambam-regimen' },
    ],
  },
  {
    id: 'rm-prophylactic',
    name: 'Preventive Medicine',
    frameworks: ['rambam'],
    priority: 70,
    description: 'Rambam emphasises prevention over cure',
    conditions: [
      { dimension: 'composite', operator: 'between', range: [55, 75] },
    ],
    actions: [
      { type: 'add_category', payload: 'movement' },
      { type: 'add_tag', payload: 'preventive' },
    ],
  },
]
