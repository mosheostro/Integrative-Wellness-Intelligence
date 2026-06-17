import type { Question } from '@/lib/types'

export const QUESTION_BANK: Question[] = [
  // ── SECTION 1: Daily Rhythm & Energy ───────────────────────
  {
    id: 'q-rhythm-01',
    section: 'Daily Rhythm',
    dimension: 'energy',
    text: 'How would you describe your natural energy pattern across the day?',
    type: 'single',
    tags: ['circadian', 'energy'],
    options: [
      { index: 0, text: "Consistent and predictable — I know when I'm sharpest", weights: { energy: 2, sleep: 1 } },
      { index: 1, text: 'Morning-dominant, fading by afternoon', weights: { energy: 1 } },
      { index: 2, text: 'Slow to start but I build momentum through the day', weights: { energy: 0 } },
      { index: 3, text: 'Unpredictable — it shifts significantly day to day', weights: { energy: -1, stress: 1 } },
    ],
  },
  {
    id: 'q-rhythm-02',
    section: 'Daily Rhythm',
    dimension: 'life_balance',
    text: 'How often do you feel that your day reflects your priorities (not just urgent demands)?',
    type: 'single',
    tags: ['balance', 'intentional'],
    options: [
      { index: 0, text: 'Most days — I protect time for what matters', weights: { life_balance: 2, purpose: 1 } },
      { index: 1, text: 'Some days — I manage it inconsistently', weights: { life_balance: 1 } },
      { index: 2, text: 'Rarely — reactive mode is my default', weights: { life_balance: -1, stress: 1 } },
      { index: 3, text: 'Almost never — I feel carried by demands', weights: { life_balance: -2, stress: 2 } },
    ],
  },

  // ── SECTION 2: Sleep ────────────────────────────────────────
  {
    id: 'q-sleep-01',
    section: 'Sleep',
    dimension: 'sleep',
    text: 'How would you rate your sleep quality over the past two weeks?',
    type: 'single',
    tags: ['sleep', 'quality'],
    options: [
      { index: 0, text: 'Excellent — I wake refreshed and clear-minded', weights: { sleep: 2, recovery: 1, energy: 1 } },
      { index: 1, text: 'Good — mostly restorative with occasional disruptions', weights: { sleep: 1 } },
      { index: 2, text: 'Fair — I sleep but rarely feel fully rested', weights: { sleep: -1, energy: -1 } },
      { index: 3, text: 'Poor — I struggle to fall or stay asleep', weights: { sleep: -2, energy: -2, stress: 1 } },
    ],
  },
  {
    id: 'q-sleep-02',
    section: 'Sleep',
    dimension: 'sleep',
    text: 'How consistent is your sleep and wake time?',
    type: 'single',
    tags: ['sleep', 'circadian', 'consistency'],
    options: [
      { index: 0, text: 'Very consistent — within 30 minutes every day', weights: { sleep: 2 } },
      { index: 1, text: 'Mostly consistent — with some weekend variation', weights: { sleep: 1 } },
      { index: 2, text: 'Variable — shifts 1–2 hours regularly', weights: { sleep: -1 } },
      { index: 3, text: 'Very irregular — my schedule changes constantly', weights: { sleep: -2, energy: -1 } },
    ],
    showIf: { questionId: 'q-sleep-01', optionIndex: [1, 2, 3] },
  },
  {
    id: 'q-sleep-03',
    section: 'Sleep — Deep Dive',
    dimension: 'sleep',
    text: 'What most often disrupts your sleep?',
    type: 'single',
    tags: ['sleep', 'disruption'],
    options: [
      { index: 0, text: 'Racing thoughts or anxiety', weights: { sleep: -1, stress: 2 } },
      { index: 1, text: 'Physical discomfort or temperature', weights: { sleep: -1, recovery: -1 } },
      { index: 2, text: 'External noise or light', weights: { sleep: -1 } },
      { index: 3, text: "I wake between 2–4am and can't return to sleep", weights: { sleep: -2, stress: 1 } },
    ],
    showIf: { questionId: 'q-sleep-01', optionIndex: [2, 3] },
  },

  // ── SECTION 3: Nutrition ────────────────────────────────────
  {
    id: 'q-nutrition-01',
    section: 'Nutrition',
    dimension: 'nutrition',
    text: 'How do you feel in the 60 minutes after a typical meal?',
    type: 'single',
    tags: ['digestion', 'energy', 'nutrition'],
    options: [
      { index: 0, text: 'Grounded, warm, and energised', weights: { nutrition: 2, energy: 1 } },
      { index: 1, text: 'Clear at first, then a gradual dip', weights: { nutrition: 1, energy: 0 } },
      { index: 2, text: 'Heavy, bloated, or sleepy', weights: { nutrition: -1, energy: -1 } },
      { index: 3, text: 'Unpredictable — changes meal to meal', weights: { nutrition: -1 } },
    ],
  },
  {
    id: 'q-nutrition-02',
    section: 'Nutrition',
    dimension: 'nutrition',
    text: 'How many servings of vegetables and whole foods do you eat daily?',
    type: 'single',
    tags: ['vegetables', 'whole-food', 'nutrition'],
    options: [
      { index: 0, text: "5 or more servings — it's a consistent priority", weights: { nutrition: 2 } },
      { index: 1, text: '3–4 servings — I make a conscious effort', weights: { nutrition: 1 } },
      { index: 2, text: '1–2 servings — it varies with convenience', weights: { nutrition: -1 } },
      { index: 3, text: 'Rarely — processed food dominates my diet', weights: { nutrition: -2, recovery: -1 } },
    ],
  },
  {
    id: 'q-nutrition-03',
    section: 'Nutrition — Deep Dive',
    dimension: 'nutrition',
    text: 'Do you have a consistent eating window or meal schedule?',
    type: 'single',
    tags: ['fasting', 'timing', 'circadian'],
    options: [
      { index: 0, text: 'Yes — I eat within a consistent 8–10 hour window', weights: { nutrition: 2, energy: 1 } },
      { index: 1, text: 'Roughly — meals are somewhat timed', weights: { nutrition: 1 } },
      { index: 2, text: 'No — I eat whenever hunger or opportunity arises', weights: { nutrition: -1 } },
      { index: 3, text: 'I often eat late or skip meals entirely', weights: { nutrition: -2, energy: -1 } },
    ],
    showIf: { questionId: 'q-nutrition-01', optionIndex: [2, 3] },
  },

  // ── SECTION 4: Movement ─────────────────────────────────────
  {
    id: 'q-movement-01',
    section: 'Movement',
    dimension: 'movement',
    text: 'How much intentional physical movement do you get per week?',
    type: 'single',
    tags: ['exercise', 'movement'],
    options: [
      { index: 0, text: '5+ sessions — movement is non-negotiable for me', weights: { movement: 2, energy: 1, recovery: 1 } },
      { index: 1, text: '3–4 sessions — I maintain a solid baseline', weights: { movement: 1 } },
      { index: 2, text: '1–2 sessions — I move but inconsistently', weights: { movement: -1 } },
      { index: 3, text: 'Rarely — my lifestyle is mostly sedentary', weights: { movement: -2, energy: -1 } },
    ],
  },
  {
    id: 'q-movement-02',
    section: 'Movement',
    dimension: 'movement',
    text: 'How much non-exercise walking or daily movement do you get?',
    type: 'single',
    tags: ['steps', 'NEAT', 'walking'],
    options: [
      { index: 0, text: "10,000+ steps — I'm naturally active throughout the day", weights: { movement: 2 } },
      { index: 1, text: '6,000–10,000 steps — moderate activity', weights: { movement: 1 } },
      { index: 2, text: '3,000–6,000 steps — mostly desk-bound', weights: { movement: -1 } },
      { index: 3, text: 'Under 3,000 — very limited daily movement', weights: { movement: -2, energy: -1 } },
    ],
    showIf: { questionId: 'q-movement-01', optionIndex: [2, 3] },
  },

  // ── SECTION 5: Stress & Emotional Wellbeing ─────────────────
  {
    id: 'q-stress-01',
    section: 'Stress',
    dimension: 'stress',
    text: 'When the day overwhelms you, how do you most often respond?',
    type: 'single',
    tags: ['stress', 'coping', 'resilience'],
    options: [
      { index: 0, text: "I pause and breathe — I've built a reliable way back to centre", weights: { stress: -2, emotional: 2 } },
      { index: 1, text: 'I push through and deal with the residue later', weights: { stress: 1, recovery: -1 } },
      { index: 2, text: 'I reach out to someone I trust', weights: { stress: -1, emotional: 1 } },
      { index: 3, text: 'I absorb it and carry it silently', weights: { stress: 2, emotional: -1 } },
    ],
  },
  {
    id: 'q-stress-02',
    section: 'Stress — Deep Dive',
    dimension: 'stress',
    text: 'How often do you feel a sense of mental urgency or "always on"?',
    type: 'single',
    tags: ['chronic-stress', 'burnout', 'urgency'],
    options: [
      { index: 0, text: 'Rarely — I have good mental off-switches', weights: { stress: -2, recovery: 1 } },
      { index: 1, text: 'Occasionally — usually tied to specific pressures', weights: { stress: 0 } },
      { index: 2, text: "Often — it's my default operating mode", weights: { stress: 2, sleep: -1 } },
      { index: 3, text: "Almost always — I can't seem to turn it off", weights: { stress: 3, sleep: -2, recovery: -2 } },
    ],
    showIf: { questionId: 'q-stress-01', optionIndex: [1, 3] },
  },

  // ── SECTION 6: Recovery ─────────────────────────────────────
  {
    id: 'q-recovery-01',
    section: 'Recovery',
    dimension: 'recovery',
    text: 'How recovered do you feel when you wake up in the morning?',
    type: 'single',
    tags: ['recovery', 'rest', 'HRV'],
    options: [
      { index: 0, text: 'Fully restored — I wake ready and clear', weights: { recovery: 2, energy: 1 } },
      { index: 1, text: 'Mostly recovered — minor residual fatigue', weights: { recovery: 1 } },
      { index: 2, text: 'Partially — I need time before I feel functional', weights: { recovery: -1, energy: -1 } },
      { index: 3, text: 'Not at all — I wake exhausted', weights: { recovery: -2, energy: -2, sleep: -1 } },
    ],
  },

  // ── SECTION 7: Emotional Wellbeing ──────────────────────────
  {
    id: 'q-emotional-01',
    section: 'Emotional Wellbeing',
    dimension: 'emotional',
    text: 'How would you describe your baseline emotional state over the past month?',
    type: 'single',
    tags: ['mood', 'emotional', 'baseline'],
    options: [
      { index: 0, text: 'Predominantly positive — resilient and engaged', weights: { emotional: 2, purpose: 1 } },
      { index: 1, text: 'Stable with expected fluctuations', weights: { emotional: 1 } },
      { index: 2, text: 'Flat or muted — less joy than usual', weights: { emotional: -1, purpose: -1 } },
      { index: 3, text: 'Heavy or anxious — a pervasive undercurrent', weights: { emotional: -2, stress: 2 } },
    ],
  },

  // ── SECTION 8: Purpose & Meaning ────────────────────────────
  {
    id: 'q-purpose-01',
    section: 'Purpose',
    dimension: 'purpose',
    text: 'What gives your health practice a sense of deeper meaning?',
    type: 'single',
    tags: ['meaning', 'purpose', 'motivation'],
    options: [
      { index: 0, text: 'Feeling fully present and useful to people I love', weights: { purpose: 2, emotional: 1 } },
      { index: 1, text: 'A deeper spiritual or ethical commitment', weights: { purpose: 2, life_balance: 1 } },
      { index: 2, text: 'Measurable progress and performance', weights: { purpose: 1 } },
      { index: 3, text: "I'm still searching for that anchor", weights: { purpose: -1 } },
    ],
  },
  {
    id: 'q-purpose-02',
    section: 'Purpose',
    dimension: 'purpose',
    text: 'How clear is your sense of direction for the next 12 months?',
    type: 'single',
    tags: ['direction', 'goals', 'vision'],
    options: [
      { index: 0, text: "Very clear — I know what I'm building toward", weights: { purpose: 2, life_balance: 1 } },
      { index: 1, text: 'Roughly clear — a general direction without full specificity', weights: { purpose: 1 } },
      { index: 2, text: 'Somewhat uncertain — several competing directions', weights: { purpose: -1 } },
      { index: 3, text: 'Unclear — I feel adrift or between chapters', weights: { purpose: -2, emotional: -1 } },
    ],
  },

  // ── SECTION 9: Life Balance ─────────────────────────────────
  {
    id: 'q-balance-01',
    section: 'Life Balance',
    dimension: 'life_balance',
    text: 'How satisfied are you with the balance across work, relationships, health, and personal growth?',
    type: 'single',
    tags: ['balance', 'satisfaction', 'life-areas'],
    options: [
      { index: 0, text: 'Very satisfied — they feel integrated, not competing', weights: { life_balance: 2, emotional: 1 } },
      { index: 1, text: 'Generally good — minor areas need attention', weights: { life_balance: 1 } },
      { index: 2, text: 'Imbalanced — one area dominates at the expense of others', weights: { life_balance: -1, stress: 1 } },
      { index: 3, text: "Significantly out of balance — it's affecting my wellbeing", weights: { life_balance: -2, stress: 2, emotional: -1 } },
    ],
  },

  // ══════════════════════════════════════════════════════════════
  // ADAPTIVE BRANCH QUESTIONS — Task #28
  // 26 branch questions across 8 domains.
  // Each is triggered by poor scores on core questions.
  // ══════════════════════════════════════════════════════════════

  // ── Sleep Branches ───────────────────────────────────────────

  {
    id: 'q-sleep-b01',
    section: 'Sleep — Adaptive',
    dimension: 'sleep',
    text: 'Do you have difficulty falling asleep, or do you fall asleep easily but wake during the night?',
    type: 'single',
    tags: ['sleep', 'insomnia-type', 'adaptive'],
    options: [
      { index: 0, text: "I fall asleep easily 