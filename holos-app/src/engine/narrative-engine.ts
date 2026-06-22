// ============================================================
// HOLOS — Narrative Engine
// Generates dynamic, score-sensitive, framework-specific text.
// No two assessments produce the same narrative.
// ============================================================

import type { DimensionScores, WellnessState, Framework, WellnessDimension } from '@/lib/types'
import type { BehavioralProfile } from './multi-layer-engine'

// ── Score Level Classification ───────────────────────────────

type ScoreLevel = 'HIGH' | 'MID_HIGH' | 'MID' | 'LOW_MID' | 'LOW'

function scoreLevel(s: number): ScoreLevel {
  if (s >= 82) return 'HIGH'
  if (s >= 68) return 'MID_HIGH'
  if (s >= 52) return 'MID'
  if (s >= 35) return 'LOW_MID'
  return 'LOW'
}

// ── State Labels per Framework ───────────────────────────────

const STATE_LABELS: Record<Framework, Record<WellnessState, string>> = {
  'ayurveda': {
    HIGH_PERFORMANCE: 'Sattva dominant — clarity and vitality are aligned',
    BALANCED: 'Tridosha equilibrium — your constitution is in harmony',
    SLEEP_DEFICIT: 'Vata imbalance — the nervous system needs grounding',
    STRESS_DOMINANT: 'Pitta excess — inner fire requires cooling',
    LOW_RECOVERY: 'Kapha accumulation — renewal energy is sluggish',
    ENERGY_IMBALANCE: 'Prana depletion — vital energy requires restoration',
    INFLAMMATORY_PATTERN: 'Ama accumulation — digestive fire is dampened',
    LIFESTYLE_IMPROVEMENT: 'Dosha disharmony — multiple systems seek balance',
    OPTIMIZATION: 'Near-balance — minor dosha refinements will complete the picture',
    MAINTENANCE: 'Prakriti stability — your natural constitution is well-maintained',
  },
  'rambam': {
    HIGH_PERFORMANCE: 'Regimen of virtue — the six non-naturals are well-governed',
    BALANCED: 'Moderate temperament — Maimonides\' ideal middle path',
    SLEEP_DEFICIT: 'Rest deficit — the waking-sleeping balance is disrupted',
    STRESS_DOMINANT: 'Emotional non-natural requires attention — soul agitation affects body',
    LOW_RECOVERY: 'Movement and rest imbalance — the body lacks restorative stillness',
    ENERGY_IMBALANCE: 'Air and food non-naturals need attention',
    INFLAMMATORY_PATTERN: 'Dietary non-natural imbalance — food as medicine is key',
    LIFESTYLE_IMPROVEMENT: 'Multiple non-naturals require regimen adjustment',
    OPTIMIZATION: 'Good health through moderation — refine your existing regimen',
    MAINTENANCE: 'Stable regimen — continue your established health practices',
  },
  'evidence-based': {
    HIGH_PERFORMANCE: 'Optimal biomarker convergence — systems are functioning at peak',
    BALANCED: 'Metabolic homeostasis — key systems show good regulation',
    SLEEP_DEFICIT: 'Sleep debt accumulation — HPA axis and cognition are affected',
    STRESS_DOMINANT: 'Cortisol dysregulation pattern detected — allostatic load elevated',
    LOW_RECOVERY: 'Recovery debt — cellular repair and HRV are suboptimal',
    ENERGY_IMBALANCE: 'Metabolic efficiency is reduced — mitochondrial support indicated',
    INFLAMMATORY_PATTERN: 'Low-grade inflammatory state — gut-brain axis may be implicated',
    LIFESTYLE_IMPROVEMENT: 'Multiple lifestyle factors require evidence-based intervention',
    OPTIMIZATION: 'Good baseline with clear optimisation opportunities',
    MAINTENANCE: 'Stable health foundation — maintain current protocols',
  },
  'daoist': {
    HIGH_PERFORMANCE: 'Wu wei in action — effortless flow across all five elements',
    BALANCED: 'Qi harmonised — yin and yang are in dynamic equilibrium',
    SLEEP_DEFICIT: 'Water element depletion — Kidney Qi requires restoration',
    STRESS_DOMINANT: 'Fire excess — Heart Shen requires cooling and grounding',
    LOW_RECOVERY: 'Metal element weakness — Lung and Large Intestine need support',
    ENERGY_IMBALANCE: 'Qi stagnation — the vital force is not circulating freely',
    INFLAMMATORY_PATTERN: 'Earth element imbalance — Spleen Qi is struggling with dampness',
    LIFESTYLE_IMPROVEMENT: 'Five element disharmony — multiple organ systems need attention',
    OPTIMIZATION: 'Qi is flowing with minor blockages — targeted cultivation will open the channels',
    MAINTENANCE: 'Stable Qi flow — your cultivation practice is maintaining good balance',
  },
  'hippocrates': {
    HIGH_PERFORMANCE: 'Eukrasia — the humours are in perfect proportion',
    BALANCED: 'Good temperament — nature is healing freely',
    SLEEP_DEFICIT: 'Melancholic excess — cold and dry must be warmed',
    STRESS_DOMINANT: 'Choleric imbalance — yellow bile requires cooling',
    LOW_RECOVERY: 'Phlegmatic excess — vital warmth needs kindling',
    ENERGY_IMBALANCE: 'Sanguine depletion — vital heat is diminished',
    INFLAMMATORY_PATTERN: 'Dyskrasia — humoral disharmony in the digestive system',
    LIFESTYLE_IMPROVEMENT: 'Humoral imbalance — nature needs assistance to restore',
    OPTIMIZATION: 'Near-eukrasia — small adjustments to diet and regimen will complete the balance',
    MAINTENANCE: 'Good humoral balance — continue your natural health practices',
  },
  'avicenna': {
    HIGH_PERFORMANCE: 'Ideal mizaj — your temperament is perfectly calibrated',
    BALANCED: 'Balanced temperament — body and soul are in accord',
    SLEEP_DEFICIT: 'Pneuma deficiency — the vital spirit needs replenishment through rest',
    STRESS_DOMINANT: 'Psychical pneuma agitation — emotional faculties require regulation',
    LOW_RECOVERY: 'Natural spirit depletion — the liver\'s vital functions need support',
    ENERGY_IMBALANCE: 'Vital spirit imbalance — the heart center needs strengthening',
    INFLAMMATORY_PATTERN: 'Humoural excess with inflammatory tendency',
    LIFESTYLE_IMPROVEMENT: 'Mizaj deviation — multiple lifestyle factors require Ibn Sina\'s regimen',
    OPTIMIZATION: 'Good mizaj with refinement opportunities',
    MAINTENANCE: 'Stable temperament — continue your established regimen',
  },
  'tibetan': {
    HIGH_PERFORMANCE: 'Three humours in perfect union — body, speech, and mind harmonised',
    BALANCED: 'Lung, Tripa, and Pekan balanced — constitutional equilibrium maintained',
    SLEEP_DEFICIT: 'Lung agitation — the wind humour is disturbing the nervous system',
    STRESS_DOMINANT: 'Tripa elevation — fire humour requires cooling through practice',
    LOW_RECOVERY: 'Pekan accumulation — the earth-water humour creates heaviness',
    ENERGY_IMBALANCE: 'Lung depletion — vital wind energy needs restoration',
    INFLAMMATORY_PATTERN: 'Tripa-Pekan disturbance — digestive fire and dampness conflict',
    LIFESTYLE_IMPROVEMENT: 'Three humour disharmony — body and mind practices both needed',
    OPTIMIZATION: 'Near-balanced humours — subtle refinements will complete your profile',
    MAINTENANCE: 'Humoral stability — maintain your current practices and lifestyle',
  },
  'swarga': {
    HIGH_PERFORMANCE: 'Swarga alignment — all eight dimensions are expressing their highest potential',
    BALANCED: 'Integral harmony — science, tradition, and lived experience are unified',
    SLEEP_DEFICIT: 'Vital energy depletion — the foundation dimension of sleep needs restoration',
    STRESS_DOMINANT: 'Sympathetic dominance — the system is locked in activation mode',
    LOW_RECOVERY: 'Recovery axis compromised — the renewal cycle is not completing fully',
    ENERGY_IMBALANCE: 'Prana-ATP deficit — both ancient and modern frameworks agree: energy is the priority',
    INFLAMMATORY_PATTERN: 'Multi-system inflammation — ancestral and modern wisdom both point to the gut',
    LIFESTYLE_IMPROVEMENT: 'Holistic recalibration needed — multiple life domains are asking for attention',
    OPTIMIZATION: 'Strong foundation with refinement potential — you are close to full Swarga expression',
    MAINTENANCE: 'Integral stability — your whole-person practice is well-established',
  },
}

// ── Opening Lines per Composite Score Level ──────────────────

const OPENING_BY_LEVEL: Record<ScoreLevel, string[]> = {
  HIGH: [
    'Your wellness profile reflects a sustained commitment to whole-person health.',
    'The data reveals a coherent, high-functioning wellness system.',
    'Across all measured dimensions, your scores reflect genuine vitality.',
  ],
  MID_HIGH: [
    'Your wellness foundation is solid, with clear strengths to build from.',
    'The assessment reveals a well-maintained health system with specific refinement opportunities.',
    'Your profile shows genuine vitality in most dimensions, with focused growth areas.',
  ],
  MID: [
    'Your wellness profile reflects a common modern pattern — real strengths alongside clear pressure points.',
    'The assessment reveals a balanced picture: genuine assets and areas that want attention.',
    'You show resilience in key areas, with several dimensions signalling that they want more support.',
  ],
  LOW_MID: [
    'Your body and mind are asking for more support than they\'ve been receiving.',
    'The assessment reveals a system under some pressure — and a clear roadmap for relief.',
    'Several of your dimensions are showing the signs of accumulated depletion.',
  ],
  LOW: [
    'Your wellness system is signalling that it needs significant attention across multiple areas.',
    'The assessment reveals a body-mind system that has been running on reserves.',
    'You are in depletion territory — but the path back to vitality is clear.',
  ],
}

// ── Dimension-Specific Commentary ────────────────────────────

const DIM_COMMENTARY: Record<WellnessDimension, Record<ScoreLevel, string>> = {
  sleep: {
    HIGH:     'Your sleep is a genuine asset — you are getting the restoration your system needs.',
    MID_HIGH: 'Sleep is mostly supportive, with occasional disruptions that are worth addressing.',
    MID:      'Sleep quality is inconsistent — some nights are restorative, others are not.',
    LOW_MID:  'Sleep is a significant bottleneck: your body is not getting the repair cycles it needs.',
    LOW:      'Sleep debt is accumulating — this is the single most impactful area to address first.',
  },
  stress: {
    HIGH:     'Your stress regulation is a genuine strength — you recover from pressure effectively.',
    MID_HIGH: 'Stress is generally well-managed, with some situations requiring more tools.',
    MID:      'Stress levels are elevated — your system is spending significant energy on activation.',
    LOW_MID:  'Chronic stress is creating wear across multiple systems. Intervention is overdue.',
    LOW:      'Stress load is very high — the nervous system is in persistent activation.',
  },
  nutrition: {
    HIGH:     'Nutritional foundation is strong — your dietary choices are supporting your biology.',
    MID_HIGH: 'Nutrition is generally supportive with some areas for refinement.',
    MID:      'Nutritional patterns are mixed — some meals nourish, others deplete.',
    LOW_MID:  'Dietary patterns are undermining your energy and recovery capacity.',
    LOW:      'Nutritional foundation needs significant attention — this affects every other dimension.',
  },
  movement: {
    HIGH:     'Physical movement is a clear strength — your body is well-exercised and adaptable.',
    MID_HIGH: 'Movement is mostly consistent, with some variability in intensity or recovery.',
    MID:      'Activity levels are moderate — more consistency would compound benefits significantly.',
    LOW_MID:  'Physical movement is insufficient — the body is not getting the signals it needs.',
    LOW:      'Sedentary patterns are creating downstream effects on energy, mood, and metabolic health.',
  },
  recovery: {
    HIGH:     'Your recovery capacity is excellent — the body is rebuilding effectively between demands.',
    MID_HIGH: 'Recovery is mostly adequate, with occasional gaps in the renewal cycle.',
    MID:      'Recovery is partial — you are getting through days but not fully rebuilding.',
    LOW_MID:  'Recovery deficit is accumulating — the body needs more deliberate restoration.',
    LOW:      'Severe recovery debt — your system is running without adequate repair time.',
  },
  energy: {
    HIGH:     'Energy levels are consistently strong — vitality is supporting everything else.',
    MID_HIGH: 'Energy is generally good with some fluctuation through the day.',
    MID:      'Energy is variable — peaks and crashes suggest an unstable metabolic pattern.',
    LOW_MID:  'Energy is notably low — this is affecting capacity and quality of life.',
    LOW:      'Energy depletion is significant — foundational restoration is the priority.',
  },
  emotional: {
    HIGH:     'Emotional wellbeing is a genuine asset — inner resources are resilient and available.',
    MID_HIGH: 'Emotional regulation is mostly stable with some reactive patterns to refine.',
    MID:      'Emotional state is mixed — some days feel balanced, others do not.',
    LOW_MID:  'Emotional challenges are present and deserve direct attention and support.',
    LOW:      'Emotional wellbeing requires significant support — this dimension touches all others.',
  },
  life_balance: {
    HIGH:     'Life balance reflects genuine integration across your key domains.',
    MID_HIGH: 'Balance is mostly maintained, with some areas needing rebalancing.',
    MID:      'Life balance is uneven — some domains are thriving, others are neglected.',
    LOW_MID:  'Life domains are significantly out of alignment — burnout patterns are emerging.',
    LOW:      'Life imbalance is severe — fundamental restructuring of priorities may be needed.',
  },
  purpose: {
    HIGH:     'Sense of purpose is a powerful driver — your life has clear meaning and direction.',
    MID_HIGH: 'Purpose is mostly clear with some areas of uncertainty to explore.',
    MID:      'Purpose feels intermittent — moments of clarity alternate with aimlessness.',
    LOW_MID:  'Lack of clear purpose is affecting motivation and resilience across other dimensions.',
    LOW:      'Purpose deficit is significant — reconnection with meaning is a foundational need.',
  },
}

// ── Behavioral Pattern Annotations ───────────────────────────

const PATTERN_INSIGHTS: Record<string, string> = {
  overtraining_pattern: 'Your responses reveal an active depletion pattern — you are exercising hard but not recovering enough. The body needs as much restoration as it does challenge.',
  high_energy_poor_sleep: 'An interesting pattern emerges: high perceived energy alongside poor sleep. This cortisol-driven energy is borrowed — it will collect its debt in recovery and mood.',
  stress_emotional_disconnect: 'You report high stress alongside strong emotional wellbeing. This resilience is real, but the system still carries the physiological cost of sustained activation.',
  balance_without_meaning: 'Life appears balanced on the surface, but purpose scores suggest the balance may feel empty. Outer order without inner direction eventually creates restlessness.',
}

// ── Main Narrative Generator ─────────────────────────────────

export interface NarrativeResult {
  stateNarrative: string   // 1-2 sentences on current wellness state
  openingLine: string      // personalised opening
  keyInsight: string       // 2-3 sentences on most important finding
  dimensionHighlights: { dim: WellnessDimension; text: string }[]  // top 3 notable dims
  patternInsight: string | null  // behavioral pattern observation
  closingGuidance: string  // forward-looking sentence
}

export function generateNarrative(
  scores: DimensionScores,
  state: WellnessState,
  framework: Framework,
  profile: BehavioralProfile
): NarrativeResult {
  const composite = scores.composite ?? 60
  const level = scoreLevel(composite)

  // State narrative
  const stateLabel = STATE_LABELS[framework]?.[state] ?? STATE_LABELS['swarga'][state]
  const stateNarrative = stateLabel

  // Opening line (pick deterministically from score seed)
  const openingOptions = OPENING_BY_LEVEL[level]
  const openingIdx = Math.floor((composite % openingOptions.length))
  const openingLine = openingOptions[openingIdx]

  // Key insight: focus on the lowest scoring dimension and the highest
  const sortedDims = Object.entries(scores)
    .filter(([k]) => k !== 'composite')
    .map(([k, v]) => ({ dim: k as WellnessDimension, val: v as number }))
    .sort((a, b) => a.val - b.val)

  const lowest = sortedDims[0]
  const highest = sortedDims[sortedDims.length - 1]

  // Invert stress for display (high stress score = bad)
  const lowestLabel = lowest.dim === 'stress' ? 'stress management' : lowest.dim.replace('_', ' ')
  const highestLabel = highest.dim === 'stress' ? 'stress resilience' : highest.dim.replace('_', ' ')
  const lowestVal = lowest.dim === 'stress' ? 100 - lowest.val : lowest.val
  const highestVal = highest.dim === 'stress' ? 100 - highest.val : highest.val

  const keyInsight = `Your strongest dimension is ${highestLabel} (${highestVal}/100), which is providing genuine support to the system. ${lowestLabel.charAt(0).toUpperCase() + lowestLabel.slice(1)} (${lowestVal}/100) is where the most meaningful recovery potential lives — addressing this dimension will have the broadest positive cascade.`

  // Dimension highlights: top 3 most notable (extreme highs and lows)
  const notable = [sortedDims[0], sortedDims[1], sortedDims[sortedDims.length - 1]]
    .filter((d, i, arr) => arr.findIndex(x => x.dim === d.dim) === i) // dedup
    .slice(0, 3)

  const dimensionHighlights = notable.map(d => ({
    dim: d.dim,
    text: DIM_COMMENTARY[d.dim]?.[scoreLevel(d.dim === 'stress' ? 100 - d.val : d.val)] ?? '',
  }))

  // Pattern insight
  const patternInsight = profile.contradictions.length > 0
    ? (PATTERN_INSIGHTS[profile.contradictions[0]] ?? null)
    : null

  // Closing guidance
  const closingOptions: Record<ScoreLevel, string[]> = {
    HIGH: ['The opportunity now is refinement — small optimisations compound into lasting excellence.', 'Focus shifts from building to maintaining and deepening what is already working.'],
    MID_HIGH: ['Small, consistent changes in your priority areas will compound into significant gains.', 'Your foundation supports more — targeted attention to weak links will unlock the next level.'],
    MID: ['Your starting point is good. Your first 30 days of targeted action will be the most impactful.', 'Choose one dimension to focus on first — cascade effects will do the rest.'],
    LOW_MID: ['The body responds faster than you might expect when given the right conditions. Start with sleep.', 'Recovery comes in layers — address the most fundamental needs first, and build from there.'],
    LOW: ['Foundational restoration is the sole priority right now. Everything else builds on this.', 'Begin with the basics: sleep, hydration, and reduction of the highest stressors.'],
  }

  const closingIdx = composite % closingOptions[level].length
  const closingGuidance = closingOptions[level][closingIdx]

  return {
    stateNarrative,
    openingLine,
    keyInsight,
    dimensionHighlights,
    patternInsight,
    closingGuidance,
  }
}

// ── Real-Time Assessment Commentary ─────────────────────────
// Generated live during assessment as answers are submitted

const LIVE_COMMENTS_EN: Record<WellnessDimension, Record<ScoreLevel, string>> = {
  sleep: {
    HIGH: 'Strong sleep foundation. This will amplify every other dimension.',
    MID_HIGH: 'Decent sleep with room to improve. Quality matters more than quantity.',
    MID: 'Sleep is mixed. This dimension affects everything downstream.',
    LOW_MID: 'Sleep needs attention. This is often the highest-leverage intervention.',
    LOW: 'Sleep debt is accumulating. This becomes the top priority.',
  },
  stress: {
    HIGH: 'Excellent stress resilience. Your nervous system is well-regulated.',
    MID_HIGH: 'Stress is manageable. Good tools will keep this stable.',
    MID: 'Stress is elevated. The nervous system is working harder than it should.',
    LOW_MID: 'Chronic stress is taking a toll. Intervention is needed.',
    LOW: 'Very high stress load. This requires immediate attention.',
  },
  nutrition: {
    HIGH: 'Strong nutritional foundation. Food is working for you.',
    MID_HIGH: 'Mostly good. Small refinements will compound over time.',
    MID: 'Mixed nutritional patterns. More consistency will help.',
    LOW_MID: 'Diet needs attention — this affects energy, mood, and recovery.',
    LOW: 'Nutritional foundation needs significant work.',
  },
  movement: {
    HIGH: 'Excellent physical activity. The body is getting the signals it needs.',
    MID_HIGH: 'Good movement base. Recovery quality matters here too.',
    MID: 'Movement is moderate. Consistency will change the trajectory.',
    LOW_MID: 'More movement will have a significant positive effect.',
    LOW: 'Physical activity is a key priority for your profile.',
  },
  recovery: {
    HIGH: 'Recovery is excellent. You\'re rebuilding effectively between efforts.',
    MID_HIGH: 'Good recovery with some gaps. Deliberate rest practices will help.',
    MID: 'Recovery is partial. Active recovery protocols could shift this.',
    LOW_MID: 'Recovery deficit is building. The body needs more restoration.',
    LOW: 'Significant recovery debt. Rebuilding capacity is the priority.',
  },
  energy: {
    HIGH: 'Energy is a genuine asset. Vitality is supporting everything else.',
    MID_HIGH: 'Good energy base with some variability.',
    MID: 'Variable energy suggests an unstable metabolic pattern.',
    LOW_MID: 'Low energy is limiting capacity. Multiple dimensions may be involved.',
    LOW: 'Energy depletion is significant. Multiple systems are affected.',
  },
  emotional: {
    HIGH: 'Emotional wellbeing is strong. Inner resources are resilient.',
    MID_HIGH: 'Emotional regulation is mostly good. Some reactive patterns to refine.',
    MID: 'Emotional state is variable. More support tools would help.',
    LOW_MID: 'Emotional challenges deserve direct attention.',
    LOW: 'Emotional wellbeing needs significant support and attention.',
  },
  life_balance: {
    HIGH: 'Life balance reflects genuine integration across key domains.',
    MID_HIGH: 'Good balance overall. Some areas need rebalancing.',
    MID: 'Life domains are uneven. Some areas thrive while others struggle.',
    LOW_MID: 'Significant imbalance is emerging. Recalibration needed.',
    LOW: 'Life balance is severely off. Structural changes may be needed.',
  },
  purpose: {
    HIGH: 'Purpose is a powerful driver. Life has clear meaning and direction.',
    MID_HIGH: 'Mostly clear purpose with some uncertainty to explore.',
    MID: 'Purpose feels intermittent. Clarifying work would strengthen the other dimensions.',
    LOW_MID: 'Lack of clear purpose is affecting resilience across the profile.',
    LOW: 'Purpose deficit is significant. Reconnection with meaning is foundational.',
  },
}

const LIVE_COMMENTS_RU: Record<WellnessDimension, Record<ScoreLevel, string>> = {
  sleep: {
    HIGH: 'Крепкий сон. Это усилит каждое другое измерение.',
    MID_HIGH: 'Сон нормальный, но есть куда расти. Качество важнее количества.',
    MID: 'Сон неровный. Это измерение влияет на в�