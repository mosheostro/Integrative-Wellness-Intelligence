import type { Rule } from '@/lib/types'

export const DAOIST_RULES: Rule[] = [
  {
    id: 'dao-wood-deficiency',
    name: 'Wood Element Deficiency (Liver Qi)',
    frameworks: ['daoist'],
    priority: 82,
    description: 'Frustration, poor planning, vision blocked',
    conditions: [
      { dimension: 'purpose', operator: '<', value: 45 },
      { dimension: 'emotional', operator: '<', value: 50 },
    ],
    actions: [
      { type: 'add_category', payload: 'purpose' },
      { type: 'add_tag', payload: 'liver-qi' },
      { type: 'add_tag', payload: 'wood-element' },
    ],
  },
  {
    id: 'dao-fire-deficiency',
    name: 'Fire Element Deficiency (Heart Shen)',
    frameworks: ['daoist'],
    priority: 80,
    description: 'Anxiety, insomnia, disconnection',
    conditions: [
      { dimension: 'sleep', operator: '<', value: 50 },
      { dimension: 'stress', operator: '>', value: 60 },
    ],
    actions: [
      { type: 'add_category', payload: 'mindfulness' },
      { type: 'add_tag', payload: 'heart-shen' },
      { type: 'add_tag', payload: 'fire-element' },
    ],
  },
  {
    id: 'dao-water-deficiency',
    name: 'Water Element Deficiency (Kidney Jing)',
    frameworks: ['daoist'],
    priority: 78,
    description: 'Fatigue, fear, exhausted reserves',
    conditions: [
      { dimension: 'energy', operator: '<', value: 40 },
      { dimension: 'recovery', operator: '<', value: 45 },
    ],
    actions: [
      { type: 'add_category', payload: 'recovery' },
      { type: 'add_tag', payload: 'kidney-jing' },
      { type: 'add_tag', payload: 'water-element' },
    ],
  },
]
