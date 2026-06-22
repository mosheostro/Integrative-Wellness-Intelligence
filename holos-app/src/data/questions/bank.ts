import type { Question } from '@/lib/types'
import { selectAssessmentQuestions } from './pools'

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
      { index: 0, text: "Difficulty falling asleep — my mind races at bedtime", weights: { sleep: -2, stress: 2 } },
      { index: 1, text: "I fall asleep but wake 2–4am and can't return to sleep", weights: { sleep: -2, stress: 1, recovery: -1 } },
      { index: 2, text: "Both — I struggle with onset and staying asleep", weights: { sleep: -3, stress: 2 } },
      { index: 3, text: "I sleep heavily but never feel rested", weights: { sleep: -2, recovery: -2 } },
    ],
    showIf: { questionId: 'q-sleep-01', optionIndex: [2, 3] },
  },
  {
    id: 'q-sleep-b02',
    section: 'Sleep — Adaptive',
    dimension: 'sleep',
    text: 'What does your pre-sleep routine look like in the 60 minutes before bed?',
    type: 'single',
    tags: ['sleep', 'wind-down', 'hygiene', 'adaptive'],
    options: [
      { index: 0, text: "Deliberate wind-down — dim light, no screens, calm activity", weights: { sleep: 2, stress: -1 } },
      { index: 1, text: "Light routine — I try to slow down but it's inconsistent", weights: { sleep: 1 } },
      { index: 2, text: "Work or scroll until I feel sleepy", weights: { sleep: -2 } },
      { index: 3, text: "No routine — I collapse whenever I can", weights: { sleep: -2, stress: 1 } },
    ],
    showIf: { questionId: 'q-sleep-01', optionIndex: [2, 3] },
  },

  // ── Nutrition Branches ───────────────────────────────────────

  {
    id: 'q-nutrition-b01',
    section: 'Nutrition — Adaptive',
    dimension: 'nutrition',
    text: 'Which best describes your relationship with food emotionally?',
    type: 'single',
    tags: ['nutrition', 'emotional-eating', 'adaptive'],
    options: [
      { index: 0, text: "Mostly neutral — I eat for fuel and enjoyment, not emotions", weights: { nutrition: 2, emotional: 1 } },
      { index: 1, text: "Sometimes emotional — stress or boredom triggers eating", weights: { nutrition: -1, emotional: -1, stress: 1 } },
      { index: 2, text: "Often — food is my primary comfort when stressed", weights: { nutrition: -2, emotional: -1, stress: 2 } },
      { index: 3, text: "I restrict food when stressed or anxious", weights: { nutrition: -2, emotional: -2 } },
    ],
    showIf: { questionId: 'q-nutrition-01', optionIndex: [2, 3] },
  },
  {
    id: 'q-nutrition-b02',
    section: 'Nutrition — Adaptive',
    dimension: 'nutrition',
    text: 'How much ultra-processed food (packaged snacks, fast food, sugary drinks) do you consume daily?',
    type: 'single',
    tags: ['nutrition', 'processed-food', 'adaptive'],
    options: [
      { index: 0, text: "Very little — I prepare most meals from whole ingredients", weights: { nutrition: 2 } },
      { index: 1, text: "Some — 1–2 processed items per day", weights: { nutrition: 0 } },
      { index: 2, text: "Several — a significant portion of my diet", weights: { nutrition: -2, energy: -1 } },
      { index: 3, text: "Most of what I eat is processed or takeout", weights: { nutrition: -3, energy: -2 } },
    ],
    showIf: { questionId: 'q-nutrition-01', optionIndex: [2, 3] },
  },
  {
    id: 'q-nutrition-b03',
    section: 'Nutrition — Adaptive',
    dimension: 'nutrition',
    text: 'Do you include adequate protein in most meals?',
    type: 'single',
    tags: ['nutrition', 'protein', 'adaptive'],
    options: [
      { index: 0, text: "Yes — protein anchors every meal intentionally", weights: { nutrition: 2, recovery: 1 } },
      { index: 1, text: "Usually — I think about it but don't track", weights: { nutrition: 1 } },
      { index: 2, text: "Inconsistently — some meals are very low", weights: { nutrition: -1, recovery: -1 } },
      { index: 3, text: "Rarely — my meals are mostly carbs or low in protein", weights: { nutrition: -2, recovery: -2, energy: -1 } },
    ],
    showIf: { questionId: 'q-nutrition-02', optionIndex: [2, 3] },
  },

  // ── Movement Branches ────────────────────────────────────────

  {
    id: 'q-movement-b01',
    section: 'Movement — Adaptive',
    dimension: 'movement',
    text: 'What most often prevents you from being more active?',
    type: 'single',
    tags: ['movement', 'barriers', 'adaptive'],
    options: [
      { index: 0, text: "Time — my schedule leaves little room", weights: { movement: -1, life_balance: -1 } },
      { index: 1, text: "Energy — I feel too depleted to exercise", weights: { movement: -1, recovery: -2 } },
      { index: 2, text: "Motivation — starting feels like the hardest part", weights: { movement: -1, emotional: -1 } },
      { index: 3, text: "Pain or injury — physical limitations hold me back", weights: { movement: -1, recovery: -1 } },
    ],
    showIf: { questionId: 'q-movement-01', optionIndex: [2, 3] },
  },
  {
    id: 'q-movement-b02',
    section: 'Movement — Adaptive',
    dimension: 'movement',
    text: 'How much time do you spend sitting continuously without breaks?',
    type: 'single',
    tags: ['movement', 'sedentary', 'sitting', 'adaptive'],
    options: [
      { index: 0, text: "Under 1 hour — I get up and move regularly", weights: { movement: 2 } },
      { index: 1, text: "1–2 hours at a stretch", weights: { movement: 0 } },
      { index: 2, text: "2–4 hours — I often forget to move", weights: { movement: -1, energy: -1 } },
      { index: 3, text: "Over 4 hours — I can go half a day without standing", weights: { movement: -2, energy: -2, recovery: -1 } },
    ],
    showIf: { questionId: 'q-movement-01', optionIndex: [2, 3] },
  },

  // ── Stress Branches ──────────────────────────────────────────

  {
    id: 'q-stress-b01',
    section: 'Stress — Adaptive',
    dimension: 'stress',
    text: 'How does chronic stress most visibly affect you?',
    type: 'single',
    tags: ['stress', 'symptoms', 'somatic', 'adaptive'],
    options: [
      { index: 0, text: "Physically — tension, headaches, gut issues", weights: { stress: 2, recovery: -1 } },
      { index: 1, text: "Cognitively — poor focus, forgetfulness, mental fog", weights: { stress: 2, energy: -1 } },
      { index: 2, text: "Emotionally — irritability, anxiety, or low mood", weights: { stress: 2, emotional: -2 } },
      { index: 3, text: "Behaviourally — disrupted sleep, overeating, withdrawal", weights: { stress: 2, sleep: -1, nutrition: -1 } },
    ],
    showIf: { questionId: 'q-stress-01', optionIndex: [1, 3] },
  },
  {
    id: 'q-stress-b02',
    section: 'Stress — Adaptive',
    dimension: 'stress',
    text: 'Do you have a regular practice that helps you decompress (meditation, breathwork, journalling, nature)?',
    type: 'single',
    tags: ['stress', 'resilience', 'practice', 'adaptive'],
    options: [
      { index: 0, text: "Yes — a daily or near-daily practice I rely on", weights: { stress: -2, emotional: 1 } },
      { index: 1, text: "Occasionally — I use it when things get bad", weights: { stress: -1 } },
      { index: 2, text: "Rarely — I want to but haven't made it stick", weights: { stress: 1 } },
      { index: 3, text: "No — I don't have any such practice", weights: { stress: 2 } },
    ],
    showIf: { questionId: 'q-stress-02', optionIndex: [2, 3] },
  },
  {
    id: 'q-stress-b03',
    section: 'Stress — Adaptive',
    dimension: 'stress',
    text: 'How well do you disconnect from work in the evenings and weekends?',
    type: 'single',
    tags: ['stress', 'work-life', 'recovery', 'adaptive'],
    options: [
      { index: 0, text: "Well — I have clear boundaries and honour them", weights: { stress: -2, life_balance: 1 } },
      { index: 1, text: "Mostly — occasional intrusion but generally protected", weights: { stress: -1 } },
      { index: 2, text: "With difficulty — work thoughts follow me home", weights: { stress: 1, life_balance: -1 } },
      { index: 3, text: "I never truly disconnect", weights: { stress: 2, life_balance: -2, sleep: -1 } },
    ],
    showIf: { questionId: 'q-stress-02', optionIndex: [2, 3] },
  },

  // ── Recovery Branches ────────────────────────────────────────

  {
    id: 'q-recovery-b01',
    section: 'Recovery — Adaptive',
    dimension: 'recovery',
    text: 'Do you include intentional recovery practices in your weekly routine?',
    type: 'single',
    tags: ['recovery', 'protocol', 'adaptive'],
    options: [
      { index: 0, text: "Yes — sauna, cold exposure, breathwork, or targeted rest", weights: { recovery: 2 } },
      { index: 1, text: "Occasionally — massage or passive rest", weights: { recovery: 1 } },
      { index: 2, text: "Rarely — recovery is unplanned rest only", weights: { recovery: -1 } },
      { index: 3, text: "No specific practices — I just wait to feel better", weights: { recovery: -2 } },
    ],
    showIf: { questionId: 'q-recovery-01', optionIndex: [2, 3] },
  },
  {
    id: 'q-recovery-b02',
    section: 'Recovery — Adaptive',
    dimension: 'recovery',
    text: 'How often do you get ill or feel run down during a typical month?',
    type: 'single',
    tags: ['recovery', 'immunity', 'adaptive'],
    options: [
      { index: 0, text: "Rarely — robust immunity, occasional minor illness", weights: { recovery: 2, nutrition: 1 } },
      { index: 1, text: "Once monthly — manageable", weights: { recovery: 0 } },
      { index: 2, text: "2–3 times monthly — frequent run-down periods", weights: { recovery: -1, stress: 1 } },
      { index: 3, text: "Almost constantly — I never feel fully well", weights: { recovery: -2, stress: 2, sleep: -1 } },
    ],
    showIf: { questionId: 'q-recovery-01', optionIndex: [2, 3] },
  },

  // ── Emotional Wellbeing Branches ─────────────────────────────

  {
    id: 'q-emotional-b01',
    section: 'Emotional — Adaptive',
    dimension: 'emotional',
    text: 'How often do you feel emotionally supported by people in your life?',
    type: 'single',
    tags: ['emotional', 'social', 'support', 'adaptive'],
    options: [
      { index: 0, text: "Consistently — I have people I can lean on", weights: { emotional: 2, life_balance: 1 } },
      { index: 1, text: "Sometimes — support exists but isn't always available", weights: { emotional: 1 } },
      { index: 2, text: "Rarely — I mostly navigate difficulties alone", weights: { emotional: -1, stress: 1 } },
      { index: 3, text: "Almost never — I feel isolated in my struggles", weights: { emotional: -2, stress: 2 } },
    ],
    showIf: { questionId: 'q-emotional-01', optionIndex: [2, 3] },
  },
  {
    id: 'q-emotional-b02',
    section: 'Emotional — Adaptive',
    dimension: 'emotional',
    text: 'How often do you experience moments of genuine joy or deep satisfaction?',
    type: 'single',
    tags: ['emotional', 'joy', 'positive-affect', 'adaptive'],
    options: [
      { index: 0, text: "Daily — small moments of joy are present and noticed", weights: { emotional: 2, purpose: 1 } },
      { index: 1, text: "A few times per week", weights: { emotional: 1 } },
      { index: 2, text: "Rarely — joy feels distant or fleeting", weights: { emotional: -1, purpose: -1 } },
      { index: 3, text: "Almost never — I feel emotionally flat or empty", weights: { emotional: -2, purpose: -2 } },
    ],
    showIf: { questionId: 'q-emotional-01', optionIndex: [2, 3] },
  },

  // ── Life Balance Branches ────────────────────────────────────

  {
    id: 'q-balance-b01',
    section: 'Life Balance — Adaptive',
    dimension: 'life_balance',
    text: 'Which life area feels most neglected right now?',
    type: 'single',
    tags: ['balance', 'priorities', 'adaptive'],
    options: [
      { index: 0, text: "Health — I don't have time or space to prioritise it", weights: { life_balance: -1, movement: -1, nutrition: -1 } },
      { index: 1, text: "Relationships — connections feel thin or underfed", weights: { life_balance: -1, emotional: -1 } },
      { index: 2, text: "Personal growth — I feel stagnant and unchallenged", weights: { life_balance: -1, purpose: -1 } },
      { index: 3, text: "Rest and play — I can't remember the last time I truly relaxed", weights: { life_balance: -1, recovery: -1, stress: 1 } },
    ],
    showIf: { questionId: 'q-balance-01', optionIndex: [1, 2, 3] },
  },
  {
    id: 'q-balance-b02',
    section: 'Life Balance — Adaptive',
    dimension: 'life_balance',
    text: 'How nourishing are your closest relationships?',
    type: 'single',
    tags: ['balance', 'relationships', 'social', 'adaptive'],
    options: [
      { index: 0, text: 'Very nourishing — I feel seen, loved, and supported', weights: { life_balance: 2, emotional: 2, purpose: 1 } },
      { index: 1, text: 'Mostly good with occasional friction', weights: { life_balance: 1, emotional: 1 } },
      { index: 2, text: 'Strained — there is tension, distance, or unresolved issues', weights: { life_balance: -1, emotional: -1, stress: 1 } },
      { index: 3, text: 'Significantly depleting or absent — I feel unsupported', weights: { life_balance: -2, emotional: -2, stress: 2 } },
    ],
    showIf: { questionId: 'q-balance-01', optionIndex: [1, 2, 3] },
  },
  {
    id: 'q-balance-b03',
    section: 'Life Balance — Adaptive',
    dimension: 'life_balance',
    text: 'What does rest and play look like in your current life?',
    type: 'single',
    tags: ['balance', 'play', 'leisure', 'rest'],
    options: [
      { index: 0, text: 'Rich — I have hobbies, interests, and genuine downtime', weights: { life_balance: 2, emotional: 1, recovery: 1 } },
      { index: 1, text: 'Limited but present — I squeeze in leisure when I can', weights: { life_balance: 1 } },
      { index: 2, text: "Minimal — I don't really have space for it anymore", weights: { life_balance: -1, stress: 1, recovery: -1 } },
      { index: 3, text: "Absent — I've forgotten what rest without guilt feels like", weights: { life_balance: -2, stress: 2, emotional: -1 } },
    ],
    showIf: { questionId: 'q-balance-01', optionIndex: [2, 3] },
  },
]

// ── Branching infrastructure ─────────────────────────────────

export const QUESTION_BRANCH_MAP: Record<string, Question[]> = {}
for (const q of QUESTION_BANK) {
  if (q.showIf) {
    const key = `${q.showIf.questionId}:${q.showIf.optionIndex.join(',')}`
    if (!QUESTION_BRANCH_MAP[key]) QUESTION_BRANCH_MAP[key] = []
    QUESTION_BRANCH_MAP[key].push(q)
  }
}

export function getNextQuestions(
  questionId: string,
  optionIndex: number,
  allAnswered: Set<string>
): Question[] {
  const candidates: Question[] = []
  for (const q of QUESTION_BANK) {
    if (!q.showIf) continue
    if (
      q.showIf.questionId === questionId &&
      q.showIf.optionIndex.includes(optionIndex) &&
      !allAnswered.has(q.id)
    ) {
      candidates.push(q)
    }
  }
  return candidates
}

/**
 * Returns the initial (non-adaptive) question set.
 *
 * When `seed` is supplied, draws 3 questions per dimension from the
 * extended pools (src/data/questions/pools.ts), giving 27 varied core
 * questions per assessment.  Without a seed the legacy bank is used as
 * fallback — this preserves backwards-compat for any test that calls
 * getInitialQuestions() without arguments.
 */
export function getInitialQuestions(seed?: number): Question[] {
  if (seed !== undefined) {
    return selectAssessmentQuestions(seed)
  }
  return QUESTION_BANK.filter(q => !q.showIf)
}
