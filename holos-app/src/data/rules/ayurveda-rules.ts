import type { Rule } from '@/lib/types'

export const AYURVEDA_RULES: Rule[] = [
  {
    id: 'ay-vata-imbalance',
    name: 'Vata Imbalance',
    frameworks: ['ayurveda', 'swarga'],
    priority: 85,
    description: 'Anxiety-type stress + poor sleep = Vata excess',
    conditions: [
      { dimension: 'stress', operator: '>', value: 60 },
      { dimension: 'sleep', operator: '<', value: 55 },
    ],
    actions: [
      { type: 'add_category', payload: 'nutrition' },
      { type: 'add_tag', payload: 'vata-pacifying' },
      { type: 'add_tag', payload: 'grounding' },
      { type: 'boost_category', payload: { category: 'nutrition', amount: 15 } },
    ],
  },
  {
    id: 'ay-pitta-excess',
    name: 'Pitta Excess',
    frameworks: ['ayurveda', 'swarga'],
    priority: 80,
    description: 'High drive + high stress + digestive issues = Pitta excess',
    conditions: [
      { dimension: 'stress', operator: '>', value: 65 },
      { dimension: 'emotional', operator: '<', value: 50 },
    ],
    actions: [
      { type: 'add_category', payload: 'mindfulness' },
      { type: 'add_tag', payload: 'pitta-cooling' },
      { type: 'boost_category', payload: { category: 'mindfulness', amount: 20 } },
    ],
  },
  {
    id: 'ay-kapha-stagnation',
    name: 'Kapha Stagnation',
    frameworks: ['ayurveda', 'swarga'],
    priority: 75,
    description: 'Low energy + low movement = Kapha accumulation',
    conditions: [
      { dimension: 'energy', operator: '<', value: 45 },
      { dimension: 'movement', operator: '<', value: 45 },
    ],
    actions: [
      { type: 'add_category', payload: 'movement' },
      { type: 'add_tag', payload: 'kapha-reducing' },
      { type: 'boost_category', payload: { category: 'movement', amount: 25 } },
    ],
  },
]
