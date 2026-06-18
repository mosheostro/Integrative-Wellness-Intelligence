import type { Framework, WellnessDimension, AssessmentAnswer, FrameworkResult } from '@/lib/types'

export interface FrameworkDefinition {
  id:          Framework
  label:       string
  origin:      string
  description: string
  color:       string
  accentColor: string
  icon:        string
  // How this framework weights each dimension (multiplier on base score)
  dimensionWeights: Record<WellnessDimension, number>
  // Compute framework-specific result (dosha, elements, etc.)
  computeResult: (answers: AssessmentAnswer[]) => Partial<FrameworkResult>
}

// ── Evidence-Based ────────────────────────────────────────────
const evidenceBased: FrameworkDefinition = {
  id: 'evidence-based',
  label: 'Evidence-Based Science',
  origin: 'Modern Research',
  description: 'Peer-reviewed metabolic, neuroscience, and longevity research from Stanford, NIH, and Nature publications.',
  color: '#4B7BE5',
  accentColor: '#6B6FA8',
  icon: '🔬',
  dimensionWeights: { nutrition:1.0, sleep:1.2, recovery:1.0, stress:1.1, movement:1.1, emotional:0.9, life_balance:0.8, purpose:0.7, energy:1.0 },
  computeResult: (answers) => ({
    framework: 'evidence-based',
    label: 'Evidence-Based Science',
    narrative: 'Your assessment is analysed through peer-reviewed metabolic and neuroscience research. Priority is given to sleep architecture, HRV patterns, and inflammatory markers.',
  }),
}

// ── Ayurveda ──────────────────────────────────────────────────
const ayurveda: FrameworkDefinition = {
  id: 'ayurveda',
  label: 'Ayurveda',
  origin: 'Ancient India',
  description: 'The 5,000-year science of life — balancing Vata, Pitta, and Kapha doshas through individualised diet, routine, and seasonal living.',
  color: '#E8832A',
  accentColor: '#C4713A',
  icon: '🌿',
  dimensionWeights: { nutrition:1.2, sleep:1.1, recovery:1.0, stress:1.0, movement:0.9, emotional:1.1, life_balance:1.1, purpose:1.0, energy:1.1 },
  computeResult: (answers) => {
    // Compute dosha profile from answers
    let vata = 50, pitta = 50, kapha = 50
    for (const ans of answers) {
      const idx = Array.isArray(ans.optionIndex) ? ans.optionIndex[0] : ans.optionIndex
      if (ans.dimension === 'stress') {
        vata += (idx === 0 ? -5 : idx === 3 ? 10 : 0)
        pitta += (idx === 1 ? 5 : 0)
      }
      if (ans.dimension === 'energy') {
        kapha += (idx >= 2 ? 8 : -4)
        vata += (idx === 0 ? -5 : 5)
      }
      if (ans.dimension === 'nutrition') {
        pitta += (idx === 0 ? -5 : idx === 3 ? 8 : 0)
      }
      if (ans.dimension === 'movement') {
        kapha += (idx >= 2 ? 10 : -5)
      }
    }
    const total = vata + pitta + kapha
    const vataP = Math.round((vata / total) * 100)
    const pittaP = Math.round((pitta / total) * 100)
    const kaphaP = 100 - vataP - pittaP
    const dominant = vataP >= pittaP && vataP >= kaphaP ? 'Vata'
      : pittaP >= kaphaP ? 'Pitta' : 'Kapha'
    return {
      framework: 'ayurveda',
      label: 'Ayurveda',
      narrative: `Your dominant dosha is ${dominant}. Your recommendations are tailored to balance ${dominant} excess while honoring your constitution.`,
      dosha: { vata: vataP, pitta: pittaP, kapha: kaphaP, dominant },
    }
  },
}

// ── Rambam ────────────────────────────────────────────────────
const rambam: FrameworkDefinition = {
  id: 'rambam',
  label: 'Rambam Medicine',
  origin: 'Medieval Jewish Medicine',
  description: "Maimonides' medical philosophy: prevention through regimen, balance of the six non-naturals — air, food & drink, movement & rest, sleep & waking, emotional states, and excretions.",
  color: '#8B6914',
  accentColor: '#B08D4A',
  icon: '✡️',
  dimensionWeights: { nutrition:1.1, sleep:1.1, recovery:1.0, stress:1.0, movement:1.1, emotional:1.0, life_balance:1.2, purpose:1.1, energy:0.9 },
  computeResult: () => ({
    framework: 'rambam',
    label: 'Rambam Medicine',
    narrative: "Following Maimonides' approach, your regimen is evaluated across the six non-naturals. Moderation and consistency form the foundation of lasting health.",
    customDimensions: { 'Air Quality': 70, 'Dietary Regimen': 65, 'Movement & Rest': 60, 'Sleep & Waking': 72, 'Emotional State': 68, 'Elimination': 75 },
  }),
}

// ── Hippocrates ───────────────────────────────────────────────
const hippocrates: FrameworkDefinition = {
  id: 'hippocrates',
  label: 'Hippocratic Medicine',
  origin: 'Ancient Greece',
  description: "The original integrative medicine: food as medicine, nature as healer, the four humours (blood, phlegm, yellow bile, black bile) as a map of constitutional type.",
  color: '#2E7D68',
  accentColor: '#4E7A6A',
  icon: '⚕️',
  dimensionWeights: { nutrition:1.2, sleep:1.0, recovery:1.0, stress:0.9, movement:1.1, emotional:0.9, life_balance:1.0, purpose:0.8, energy:1.1 },
  computeResult: () => ({
    framework: 'hippocrates',
    label: 'Hippocratic Medicine',
    narrative: 'Nature possesses its own healing power. Your protocol focuses on removing obstacles — poor food, sedentary patterns, disrupted sleep — and trusting the body to restore itself.',
  }),
}

// ── Avicenna ──────────────────────────────────────────────────
const avicenna: FrameworkDefinition = {
  id: 'avicenna',
  label: "Ibn Sina (Avicenna)",
  origin: 'Islamic Golden Age',
  description: "Ibn Sina's Canon of Medicine synthesised Greek and Islamic knowledge — emphasising temperament (mizaj), lifestyle medicine, and the body-soul-environment triad.",
  color: '#6B4C9A',
  accentColor: '#8B6AB8',
  icon: '📜',
  dimensionWeights: { nutrition:1.1, sleep:1.1, recovery:1.0, stress:1.0, movement:1.0, emotional:1.1, life_balance:1.0, purpose:1.1, energy:1.0 },
  computeResult: () => ({
    framework: 'avicenna',
    label: 'Ibn Sina (Avicenna)',
    narrative: "Ibn Sina held that temperament is the foundation of health. Your mizaj (constitutional type) shapes how you respond to foods, seasons, and emotional experiences. Your protocol is calibrated accordingly.",
  }),
}

// ── Daoist ────────────────────────────────────────────────────
const daoist: FrameworkDefinition = {
  id: 'daoist',
  label: 'Daoist Wellness',
  origin: 'Ancient China',
  description: "Traditional Chinese Medicine's framework: balance of Qi, Yin and Yang, and the Five Elements (Wood, Fire, Earth, Metal, Water) flowing through organ meridian systems.",
  color: '#2D6E4E',
  accentColor: '#3D8E6E',
  icon: '☯️',
  dimensionWeights: { nutrition:1.0, sleep:1.1, recovery:1.1, stress:1.0, movement:1.0, emotional:1.2, life_balance:1.1, purpose:1.1, energy:1.2 },
  computeResult: (answers) => {
    const elements = { wood: 60, fire: 55, earth: 60, metal: 55, water: 55 }
    for (const ans of answers) {
      const idx = Array.isArray(ans.optionIndex) ? ans.optionIndex[0] : ans.optionIndex
      if (ans.dimension === 'purpose') elements.wood += (idx === 0 ? 8 : -4)
      if (ans.dimension === 'stress') { elements.fire += (idx >= 2 ? -8 : 4); elements.water += (idx >= 2 ? 8 : -3) }
      if (ans.dimension === 'nutrition') elements.earth += (idx === 0 ? 6 : -3)
      if (ans.dimension === 'recovery') elements.metal += (idx === 0 ? 6 : -3)
      if (ans.dimension === 'energy') elements.water += (idx === 0 ? 6 : -3)
    }
    const total = Object.values(elements).reduce((a, b) => a + b, 0)
    const normalised = Object.fromEntries(
      Object.entries(elements).map(([k, v]) => [k, Math.round((v / total) * 100)])
    )
    return {
      framework: 'daoist',
      label: 'Daoist Wellness',
      narrative: `Your Five Element profile reveals the current state of your Qi flow across organ systems. Recommendations target element imbalances to restore harmonious circulation.`,
      elements: normalised as FrameworkResult['elements'],
    }
  },
}

// ── Tibetan ───────────────────────────────────────────────────
const tibetan: FrameworkDefinition = {
  id: 'tibetan',
  label: 'Tibetan Medicine',
  origin: 'Tibet & Himalayan tradition',
  description: "Sowa Rigpa — the science of healing: three humours (Lung, Tripa, Pekan), five elements, mind-body interconnection, and spiritual dimension of wellness.",
  color: '#8B2E2E',
  accentColor: '#AA4444',
  icon: '🕉️',
  dimensionWeights: { nutrition:1.0, sleep:1.1, recovery:1.0, stress:1.1, movement:0.9, emotional:1.2, life_balance:1.1, purpose:1.2, energy:1.0 },
  computeResult: () => ({
    framework: 'tibetan',
    label: 'Tibetan Medicine',
    narrative: "Sowa Rigpa views the body as a microcosm of the universe. Your Lung, Tripa, and Pekan balance shapes your susceptibility and resilience. Your protocol integrates physical, energetic, and contemplative practices.",
  }),
}

// ── Swarga (Proprietary) ──────────────────────────────────────
const swarga: FrameworkDefinition = {
  id: 'swarga',
  label: 'Swarga Integral Wellness',
  origin: 'Holos Proprietary System',
  description: 'A modern synthesis of all traditions — eight dimensions of the whole person, three dosha layers, five elemental resonances, and a life balance wheel. The most comprehensive view available.',
  color: '#7A9E8E',
  accentColor: '#4E7A6A',
  icon: '◆',
  dimensionWeights: { nutrition:1.0, sleep:1.1, recovery:1.0, stress:1.0, movement:1.0, emotional:1.1, life_balance:1.1, purpose:1.1, energy:1.0 },
  computeResult: (answers) => {
    // Compute both dosha and elements + Swarga-specific 8 dimensions
    const doshaResult = ayurveda.computeResult(answers)
    const elementResult = daoist.computeResult(answers)
    const swargaDims = {
      physicalBody: 70, vitalEnergy: 65, emotionalHarmony: 68,
      mentalClarity: 72, relationships: 65, purpose: 60,
      lifeDirection: 63, environment: 70,
    }
    for (const ans of answers) {
      const idx = Array.isArray(ans.optionIndex) ? ans.optionIndex[0] : ans.optionIndex
      const delta = (3 - idx) * 5
      if (ans.dimension === 'energy') { swargaDims.physicalBody += delta; swargaDims.vitalEnergy += delta }
      if (ans.dimension === 'emotional') swargaDims.emotionalHarmony += delta
      if (ans.dimension === 'stress') swargaDims.mentalClarity += delta
      if (ans.dimension === 'life_balance') { swargaDims.relationships += delta; swargaDims.lifeDirection += delta }
      if (ans.dimension === 'purpose') swargaDims.purpose += delta
    }
    const clamp = (v: number) => Math.max(0, Math.min(100, v))
    return {
      framework: 'swarga',
      label: 'Swarga Integral Wellness',
      narrative: 'Your Swarga profile synthesises modern science with the world\'s wisdom traditions into one coherent picture of your whole self — body, energy, mind, relationships, and meaning.',
      dosha: doshaResult.dosha,
      elements: elementResult.elements,
      swarga: Object.fromEntries(Object.entries(swargaDims).map(([k, v]) => [k, clamp(v)])) as FrameworkResult['swarga'],
    }
  },
}

// ── Registry ──────────────────────────────────────────────────
export const FRAMEWORK_REGISTRY: Record<Framework, FrameworkDefinition> = {
  'evidence-based': evidenceBased,
  'ayurveda': ayurveda,
  'rambam': rambam,
  'hippocrates': hippocrates,
  'avicenna': avicenna,
  'daoist': daoist,
  'tibetan': tibetan,
  'swarga': swarga,
}

export const FRAMEWORKS_LIST = Object.values(FRAMEWORK_REGISTRY)
