// ============================================================
// HOLOS — Wellness State Machine
// States determined by dimension score patterns, not single scores.
// Transitions are data-driven — add new states here without
// changing any downstream logic.
// ============================================================

import type { DimensionScores, WellnessState } from '@/lib/types'

export interface StateDefinition {
  state:       WellnessState
  label:       string
  description: string
  color:       string  // CSS custom property name
  emoji:       string
  // Conditions (ALL must hold)
  match: (s: DimensionScores) => boolean
  priority: number  // higher = checked first
}

export const STATE_DEFINITIONS: StateDefinition[] = [
  {
    state: 'HIGH_PERFORMANCE',
    label: 'High Performance',
    description: 'All systems operating at peak. Your body and mind are in rare alignment.',
    color: '--sage',
    emoji: '⚡',
    priority: 100,
    match: s => s.composite >= 80 && s.sleep >= 75 && s.stress <= 35 && s.energy >= 75,
  },
  {
    state: 'OPTIMIZATION',
    label: 'Optimization Mode',
    description: 'Strong foundation with clear, targeted areas to refine.',
    color: '--sage',
    emoji: '🎯',
    priority: 90,
    match: s => s.composite >= 72 && s.sleep >= 65 && s.stress <= 45,
  },
  {
    state: 'BALANCED',
    label: 'Balanced',
    description: 'Your wellness ecosystem is in stable equilibrium.',
    color: '--indigo',
    emoji: '☯',
    priority: 80,
    match: s => s.composite >= 58 && s.stress <= 55 && s.sleep >= 50,
  },
  {
    state: 'MAINTENANCE',
    label: 'Maintenance Mode',
    description: 'Good baseline. Focus on consistency to lock in gains.',
    color: '--indigo',
    emoji: '🔄',
    priority: 75,
    match: s => s.composite >= 55 && s.stress <= 60,
  },
  {
    state: 'SLEEP_DEFICIT',
    label: 'Sleep Deficit',
    description: 'Sleep is the primary bottleneck. Everything else improves when sleep does.',
    color: '--clay',
    emoji: '🌙',
    priority: 70,
    match: s => s.sleep < 40,
  },
  {
    state: 'STRESS_DOMINANT',
    label: 'Stress Dominant',
    description: 'High stress is overriding your wellness capacity. Recovery is priority one.',
    color: '--clay',
    emoji: '🌊',
    priority: 68,
    match: s => s.stress >= 70 && s.recovery <= 50,
  },
  {
    state: 'LOW_RECOVERY',
    label: 'Low Recovery',
    description: 'Your system needs restoration. Effort without recovery leads to depletion.',
    color: '--gold-deep',
    emoji: '🔋',
    priority: 65,
    match: s => s.recovery < 40 && s.energy < 50,
  },
  {
    state: 'ENERGY_IMBALANCE',
    label: 'Energy Imbalance',
    description: 'Energy fluctuations point to metabolic or sleep irregularities.',
    color: '--gold-deep',
    emoji: '⚖️',
    priority: 60,
    match: s => s.energy < 45,
  },
  {
    state: 'INFLAMMATORY_PATTERN',
    label: 'Inflammatory Pattern',
    description: 'Nutritional and movement signals suggest chronic low-grade inflammation.',
    color: '--rose',
    emoji: '🔥',
    priority: 55,
    match: s => s.nutrition < 40 && s.recovery < 50 && s.movement < 45,
  },
  {
    state: 'LIFESTYLE_IMPROVEMENT',
    label: 'Lifestyle Improvement Phase',
    description: 'Multiple dimensions need attention. Small consistent steps will compound.',
    color: '--gold',
    emoji: '🌱',
    priority: 10,
    match: () => true,  // fallback
  },
]

export function determineWellnessState(scores: DimensionScores): StateDefinition {
  const sorted = [...STATE_DEFINITIONS].sort((a, b) => b.priority - a.priority)
  return sorted.find(def => def.match(scores)) ?? STATE_DEFINITIONS[STATE_DEFINITIONS.length - 1]
}

export function getStateDef(state: WellnessState): StateDefinition {
  return STATE_DEFINITIONS.find(d => d.state === state) ?? STATE_DEFINITIONS[STATE_DEFINITIONS.length - 1]
}
