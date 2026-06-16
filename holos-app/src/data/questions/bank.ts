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
      { index: 0, text: "I fall asleep easily but wake at 2–4am and can't return", weights: { sleep: -2, stress: 2 } },
      { index: 1, text: 'I lie awake 30–60+ minutes before sleep comes', weights: { sleep: -1, stress: 1 } },
      { index: 2, text: 'Both — onset and maintenance are both difficult', weights: { sleep: -2, stress: 1 } },
      { index: 3, text: 'I sleep enough hours but wake unrefreshed regardless', weights: { sleep: -2, recovery: -2 } },
    ],
    showIf: { questionId: 'q-sleep-01', optionIndex: [2, 3] },
  },
  {
    id: 'q-sleep-b02',
    section: 'Sleep — Adaptive',
    dimension: 'sleep',
    text: 'What is your typical screen and light exposure in the 90 minutes before bed?',
    type: 'single',
    tags: ['sleep', 'blue-light', 'sleep-hygiene'],
    options: [
      { index: 0, text: 'Screens off — I use dim light and wind-down rituals', weights: { sleep: 2 } },
      { index: 1, text: 'Some screens but I try to limit intensity', weights: { sleep: 0 } },
      { index: 2, text: 'Phone or TV until close to sleep time', weights: { sleep: -1, energy: -1 } },
      { index: 3, text: 'Bright screens right until I close my eyes', weights: { sleep: -2 } },
    ],
    showIf: { questionId: 'q-sleep-01', optionIndex: [2, 3] },
  },
  {
    id: 'q-sleep-b03',
    section: 'Sleep — Adaptive',
    dimension: 'sleep',
    text: 'What time do you typically have your last caffeine?',
    type: 'single',
    tags: ['sleep', 'caffeine', 'adenosine'],
    options: [
      { index: 0, text: "Before noon — I understand caffeine's half-life", weights: { sleep: 1 } },
      { index: 1, text: '1–3pm — my cut-off is after lunch', weights: { sleep: 0 } },
      { index: 2, text: '4–6pm — I need it to get through the afternoon', weights: { sleep: -1 } },
      { index: 3, text: "After 6pm or I don't drink caffeine (gave up or never started)", weights: { sleep: 0 } },
    ],
    showIf: { questionId: 'q-sleep-01', optionIndex: [2, 3] },
  },

  // ── Stress Branches ──────────────────────────────────────────

  {
    id: 'q-stress-b01',
    section: 'Stress — Adaptive',
    dimension: 'stress',
    text: 'Where does stress tend to live in your body?',
    type: 'single',
    tags: ['stress', 'somatic', 'body-awareness'],
    options: [
      { index: 0, text: 'Jaw, neck, or shoulders — chronic tension', weights: { stress: 2, recovery: -1 } },
      { index: 1, text: 'Gut or digestion — symptoms worsen under pressure', weights: { stress: 2, nutrition: -1 } },
      { index: 2, text: 'Chest or breathing — tightness or shallow breath', weights: { stress: 2, energy: -1 } },
      { index: 3, text: "I don't notice it in my body — it stays in my head", weights: { stress: 1, emotional: -1 } },
    ],
    showIf: { questionId: 'q-stress-01', optionIndex: [1, 3] },
  },
  {
    id: 'q-stress-b02',
    section: 'Stress — Adaptive',
    dimension: 'stress',
    text: 'What is your primary stress source right now?',
    type: 'single',
    tags: ['stress', 'stressor', 'context'],
    options: [
      { index: 0, text: 'Work demands — volume, deadlines, or difficult dynamics', weights: { stress: 2, life_balance: -1 } },
      { index: 1, text: 'Financial pressure or uncertainty', weights: { stress: 2, emotional: -1 } },
      { index: 2, text: 'Relationships — family, partner, or social tension', weights: { stress: 1, emotional: -1, life_balance: -1 } },
      { index: 3, text: 'Internal — perfectionism, fear, or unresolved patterns', weights: { stress: 2, emotional: -1, purpose: -1 } },
    ],
    showIf: { questionId: 'q-stress-02', optionIndex: [2, 3] },
  },
  {
    id: 'q-stress-b03',
    section: 'Stress — Adaptive',
    dimension: 'recovery',
    text: 'After a high-stress event, how long does it take your nervous system to settle?',
    type: 'single',
    tags: ['stress', 'vagal-tone', 'HRV', 'recovery'],
    options: [
      { index: 0, text: 'Within 30 minutes — I can consciously self-regulate', weights: { recovery: 2, stress: -1 } },
      { index: 1, text: '1–3 hours — I need time but it happens naturally', weights: { recovery: 1 } },
      { index: 2, text: 'Most of the day — the activation lingers', weights: { recovery: -1, stress: 2 } },
      { index: 3, text: 'I carry it for days — it compounds and builds', weights: { recovery: -2, stress: 3, sleep: -1 } },
    ],
    showIf: { questionId: 'q-stress-02', optionIndex: [2, 3] },
  },

  // ── Energy Branches ──────────────────────────────────────────

  {
    id: 'q-energy-b01',
    section: 'Energy — Adaptive',
    dimension: 'energy',
    text: 'When your energy crashes, what is the most accurate description?',
    type: 'single',
    tags: ['energy', 'crash', 'metabolic', 'adaptive'],
    options: [
      { index: 0, text: 'After eating — I struggle to stay alert post-meal', weights: { energy: -1, nutrition: -2 } },
      { index: 1, text: 'Mid-afternoon (2–4pm) — almost daily without exception', weights: { energy: -1, sleep: -1 } },
      { index: 2, text: 'Unpredictably — I never know when it will hit', weights: { energy: -2, stress: 1 } },
      { index: 3, text: 'After any significant output — I need a long recovery', weights: { energy: -2, recovery: -2 } },
    ],
    showIf: { questionId: 'q-rhythm-01', optionIndex: [2, 3] },
  },
  {
    id: 'q-energy-b02',
    section: 'Energy — Adaptive',
    dimension: 'energy',
    text: 'How do you typically manage low energy through the day?',
    type: 'single',
    tags: ['energy', 'stimulants', 'coping'],
    options: [
      { index: 0, text: 'Caffeine — I rely on it to function at certain points', weights: { energy: -1, sleep: -1 } },
      { index: 1, text: 'Food — I snack frequently to maintain energy', weights: { energy: -1, nutrition: -1 } },
      { index: 2, text: 'I push through without props — sheer willpower', weights: { energy: -1, stress: 1, recovery: -1 } },
      { index: 3, text: 'I rest when I can — I listen to my energy signals', weights: { energy: 1, recovery: 1 } },
    ],
    showIf: { questionId: 'q-rhythm-01', optionIndex: [2, 3] },
  },

  // ── Nutrition Branches ───────────────────────────────────────

  {
    id: 'q-nutrition-b01',
    section: 'Nutrition — Adaptive',
    dimension: 'nutrition',
    text: 'When your eating goes off-track, what is most often the trigger?',
    type: 'single',
    tags: ['nutrition', 'emotional-eating', 'triggers'],
    options: [
      { index: 0, text: 'Stress or emotional difficulty — food becomes comfort', weights: { nutrition: -1, emotional: -1, stress: 1 } },
      { index: 1, text: 'Fatigue or low energy — I reach for whatever is fast', weights: { nutrition: -1, energy: -1 } },
      { index: 2, text: "Social situations — it's hard to hold boundaries", weights: { nutrition: -1, life_balance: -1 } },
      { index: 3, text: "I don't deviate much — my eating is fairly consistent", weights: { nutrition: 1 } },
    ],
    showIf: { questionId: 'q-nutrition-01', optionIndex: [2, 3] },
  },
  {
    id: 'q-nutrition-b02',
    section: 'Nutrition — Adaptive',
    dimension: 'nutrition',
    text: 'How much water do you drink on a typical day?',
    type: 'single',
    tags: ['nutrition', 'hydration', 'inflammation'],
    options: [
      { index: 0, text: '2+ litres — hydration is a consistent priority', weights: { nutrition: 1, energy: 1 } },
      { index: 1, text: '1–2 litres — reasonable but inconsistent', weights: { nutrition: 0 } },
      { index: 2, text: 'Under 1 litre — I often forget to drink', weights: { nutrition: -1, energy: -1 } },
      { index: 3, text: 'I mainly drink coffee, juice, or other beverages instead', weights: { nutrition: -2, energy: -1 } },
    ],
    showIf: { questionId: 'q-nutrition-01', optionIndex: [1, 2, 3] },
  },
  {
    id: 'q-nutrition-b03',
    section: 'Nutrition — Adaptive',
    dimension: 'nutrition',
    text: 'How would you describe your digestive health?',
    type: 'single',
    tags: ['nutrition', 'gut-health', 'microbiome'],
    options: [
      { index: 0, text: 'Excellent — rarely any bloating, discomfort, or irregularity', weights: { nutrition: 2, recovery: 1 } },
      { index: 1, text: 'Good — minor occasional issues', weights: { nutrition: 1 } },
      { index: 2, text: 'Inconsistent — frequent bloating or changes in regularity', weights: { nutrition: -1, energy: -1 } },
      { index: 3, text: 'Problematic — I have diagnosed or ongoing gut issues', weights: { nutrition: -2, energy: -1, stress: 1 } },
    ],
    showIf: { questionId: 'q-nutrition-01', optionIndex: [2, 3] },
  },

  // ── Movement Branches ────────────────────────────────────────

  {
    id: 'q-movement-b01',
    section: 'Movement — Adaptive',
    dimension: 'movement',
    text: 'What is the main barrier preventing more physical activity?',
    type: 'single',
    tags: ['movement', 'barriers', 'sedentary'],
    options: [
      { index: 0, text: 'Time — work and responsibilities leave little space', weights: { movement: -1, life_balance: -1 } },
      { index: 1, text: 'Energy — by the time I could exercise, I have nothing left', weights: { movement: -1, energy: -2 } },
      { index: 2, text: 'Pain or physical limitation — movement is uncomfortable', weights: { movement: -2, recovery: -1 } },
      { index: 3, text: "Motivation — I know I should but I can't make it stick", weights: { movement: -2, purpose: -1 } },
    ],
    showIf: { questionId: 'q-movement-01', optionIndex: [2, 3] },
  },
  {
    id: 'q-movement-b02',
    section: 'Movement — Adaptive',
    dimension: 'movement',
    text: 'When you do move, what does it typically look like?',
    type: 'single',
    tags: ['movement', 'type', 'quality'],
    options: [
      { index: 0, text: 'Structured resistance training — weights or bodyweight', weights: { movement: 2, recovery: 1 } },
      { index: 1, text: 'Cardio or endurance — running, cycling, swimming', weights: { movement: 2, energy: 1 } },
      { index: 2, text: 'Mind-body — yoga, pilates, Tai Chi, nature walks', weights: { movement: 1, emotional: 1, stress: -1 } },
      { index: 3, text: 'Incidental only — through daily life, not structured sessions', weights: { movement: 0 } },
    ],
    showIf: { questionId: 'q-movement-01', optionIndex: [1, 2, 3] },
  },

  // ── Recovery Branches ────────────────────────────────────────

  {
    id: 'q-recovery-b01',
    section: 'Recovery — Adaptive',
    dimension: 'recovery',
    text: 'Which recovery practices do you use consistently?',
    type: 'single',
    tags: ['recovery', 'tools', 'active-recovery'],
    options: [
      { index: 0, text: 'Breathwork, meditation, or body scan — nervous system rest', weights: { recovery: 2, stress: -1 } },
      { index: 1, text: 'Cold exposure, sauna, or contrast therapy', weights: { recovery: 2, energy: 1 } },
      { index: 2, text: 'Massage, stretching, or bodywork', weights: { recovery: 1 } },
      { index: 3, text: 'I rely only on sleep — no active recovery practices', weights: { recovery: -1 } },
    ],
    showIf: { questionId: 'q-recovery-01', optionIndex: [2, 3] },
  },
  {
    id: 'q-recovery-b02',
    section: 'Recovery — Adaptive',
    dimension: 'recovery',
    text: 'On a rest day, what does the experience actually feel like?',
    type: 'single',
    tags: ['recovery', 'rest-day', 'guilt'],
    options: [
      { index: 0, text: 'Genuinely restorative — I feel recharged afterward', weights: { recovery: 2, emotional: 1 } },
      { index: 1, text: "Neutral — I rest but don't feel notably better", weights: { recovery: 0 } },
      { index: 2, text: "Restless — I feel guilty or anxious about stopping", weights: { recovery: -1, stress: 2, emotional: -1 } },
      { index: 3, text: "I don't take rest days — I push through continuously", weights: { recovery: -2, stress: 2 } },
    ],
    showIf: { questionId: 'q-recovery-01', optionIndex: [1, 2, 3] },
  },

  // ── Emotional Branches ───────────────────────────────────────

  {
    id: 'q-emotional-b01',
    section: 'Emotional Wellbeing — Adaptive',
    dimension: 'emotional',
    text: 'When your emotional state is difficult, it tends to look more like...',
    type: 'single',
    tags: ['emotional', 'anxiety', 'depression', 'mood-type'],
    options: [
      { index: 0, text: 'Anxiety — worry, racing thoughts, or hypervigilance', weights: { emotional: -1, stress: 2, sleep: -1 } },
      { index: 1, text: 'Low mood — flatness, disengagement, or low motivation', weights: { emotional: -2, purpose: -1, energy: -1 } },
      { index: 2, text: 'Irritability — short fuse, reactive, easily triggered', weights: { emotional: -1, stress: 2, life_balance: -1 } },
      { index: 3, text: 'Numbness — difficulty feeling either up or down', weights: { emotional: -2, purpose: -2 } },
    ],
    showIf: { questionId: 'q-emotional-01', optionIndex: [2, 3] },
  },
  {
    id: 'q-emotional-b02',
    section: 'Emotional Wellbeing — Adaptive',
    dimension: 'emotional',
    text: 'When you are struggling emotionally, what is available to you?',
    type: 'single',
    tags: ['emotional', 'support', 'connection', 'resilience'],
    options: [
      { index: 0, text: 'At least one person I trust completely and can speak openly with', weights: { emotional: 2, life_balance: 1 } },
      { index: 1, text: 'Some support — people I can talk to, with some limitations', weights: { emotional: 1 } },
      { index: 2, text: 'Minimal — I mostly manage alone', weights: { emotional: -1, stress: 1 } },
      { index: 3, text: 'I feel genuinely alone with it', weights: { emotional: -2, stress: 2, purpose: -1 } },
    ],
    showIf: { questionId: 'q-emotional-01', optionIndex: [2, 3] },
  },
  {
    id: 'q-emotional-b03',
    section: 'Emotional Wellbeing — Adaptive',
    dimension: 'emotional',
    text: 'How do you most commonly process difficult emotions?',
    type: 'single',
    tags: ['emotional', 'processing', 'regulation'],
    options: [
      { index: 0, text: 'Journaling, therapy, or structured reflection', weights: { emotional: 2, stress: -1 } },
      { index: 1, text: 'Physical movement — running, gym, walking', weights: { emotional: 1, movement: 1 } },
      { index: 2, text: 'Distraction — social media, TV, food, alcohol', weights: { emotional: -1, nutrition: -1 } },
      { index: 3, text: 'I suppress or ignore them until they pass', weights: { emotional: -2, stress: 2, recovery: -1 } },
    ],
    showIf: { questionId: 'q-emotional-01', optionIndex: [1, 2, 3] },
  },

  // ── Purpose Branches ─────────────────────────────────────────

  {
    id: 'q-purpose-b01',
    section: 'Purpose — Adaptive',
    dimension: 'purpose',
    text: 'What makes it hard to feel a clear sense of purpose right now?',
    type: 'single',
    tags: ['purpose', 'meaning', 'values', 'transition'],
    options: [
      { index: 0, text: 'I know my values but struggle to express them in daily life', weights: { purpose: -1, life_balance: -1 } },
      { index: 1, text: "I'm in a major life transition — role, relationship, or identity", weights: { purpose: -1, emotional: -1 } },
      { index: 2, text: 'I feel clear once I pause — busyness drowns the signal', weights: { purpose: -1, stress: 1 } },
      { index: 3, text: "I genuinely don't know what matters most to me right now", weights: { purpose: -2, emotional: -1, life_balance: -1 } },
    ],
    showIf: { questionId: 'q-purpose-02', optionIndex: [2, 3] },
  },
  {
    id: 'q-purpose-b02',
    section: 'Purpose — Adaptive',
    dimension: 'purpose',
    text: 'How aligned is your daily work with what you care about most?',
    type: 'single',
    tags: ['purpose', 'work', 'meaning', 'vocation'],
    options: [
      { index: 0, text: 'Highly aligned — my work is an expression of my values', weights: { purpose: 2, energy: 1, life_balance: 1 } },
      { index: 1, text: 'Partially aligned — some meaningful, some not', weights: { purpose: 1 } },
      { index: 2, text: "Mostly misaligned — I work for other reasons than meaning", weights: { purpose: -1, stress: 1, life_balance: -1 } },
      { index: 3, text: "Deeply misaligned — I feel I'm living someone else's life", weights: { purpose: -2, emotional: -1, stress: 2 } },
    ],
    showIf: { questionId: 'q-purpose-01', optionIndex: [2, 3] },
  },

  // ── Life Balance Branches ────────────────────────────────────

  {
    id: 'q-balance-b01',
    section: 'Life Balance — Adaptive',
    dimension: 'life_balance',
    text: 'Which life area is consuming disproportionate time and energy?',
    type: 'single',
    tags: ['balance', 'domains', 'priorities'],
    options: [
      { index: 0, text: 'Work — professional demands take most of my attention', weights: { life_balance: -1, stress: 1, purpose: -1 } },
      { index: 1, text: 'Family caregiving — I put others first to my own detriment', weights: { life_balance: -1, emotional: -1, recovery: -1 } },
      { index: 2, text: 'Health crisis or recovery — circumstance has forced imbalance', weights: { life_balance: -1, emotional: -1 } },
      { index: 3, text: 'My own inner struggle — mental demands crowd everything out', weights: { life_balance: -1, emotional: -2, stress: 2 } },
    ],
    showIf: { questionId: 'q-balance-01', optionIndex: [2, 3] },
  },
  {
    id: 'q-balance-b02',
    section: 'Life Balance — Adaptive',
    dimension: 'life_balance',
    text: 'How nourishing are your closest relationships right now?',
    type: 'single',
    tags: ['relationships', 'connection', 'support'],
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

export function getInitialQuestions(): Question[] {
  return QUESTION_BANK.filter(q => !q.showIf)
}
