/**
 * HOLOS Extended Question Pools — v2
 *
 * Each dimension has a pool of 10+ questions.
 * selectAssessmentQuestions(seed) draws 3 per dimension → 27 core questions
 * plus any adaptive follow-ups that trigger.
 *
 * New assessments use Date.now() as seed → different questions each time.
 */

import type { Question } from '@/lib/types'

// ── Seeded RNG (Mulberry32) ────────────────────────────────────────────────
function mulberry32(seed: number) {
  return function () {
    seed |= 0; seed = seed + 0x6D2B79F5 | 0
    let t = Math.imul(seed ^ seed >>> 15, 1 | seed)
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t
    return ((t ^ t >>> 14) >>> 0) / 4294967296
  }
}

function seededSample<T>(arr: T[], n: number, seed: number): T[] {
  const rng = mulberry32(seed)
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy.slice(0, Math.min(n, copy.length))
}

// ══════════════════════════════════════════════════════════════════════════
// SLEEP — 12 questions
// ══════════════════════════════════════════════════════════════════════════
export const SLEEP_POOL: Question[] = [
  {
    id: 'slp-p01', section: 'Sleep', dimension: 'sleep', type: 'single',
    tags: ['sleep', 'quality'],
    text: 'How would you rate your sleep quality over the past two weeks?',
    options: [
      { index: 0, text: 'Excellent — I wake refreshed and clear-minded', weights: { sleep: 2, recovery: 1, energy: 1 } },
      { index: 1, text: 'Good — mostly restorative with occasional disruptions', weights: { sleep: 1 } },
      { index: 2, text: 'Fair — I sleep but rarely feel fully rested', weights: { sleep: -1, energy: -1 } },
      { index: 3, text: 'Poor — I struggle to fall or stay asleep', weights: { sleep: -2, energy: -2, stress: 1 } },
    ],
  },
  {
    id: 'slp-p02', section: 'Sleep', dimension: 'sleep', type: 'single',
    tags: ['sleep', 'duration'],
    text: 'How many hours of sleep do you typically get on weeknights?',
    options: [
      { index: 0, text: '8 hours or more', weights: { sleep: 2, energy: 1 } },
      { index: 1, text: '7–8 hours', weights: { sleep: 1 } },
      { index: 2, text: '6–7 hours', weights: { sleep: -1, energy: -1 } },
      { index: 3, text: 'Under 6 hours', weights: { sleep: -2, energy: -2, stress: 1 } },
    ],
  },
  {
    id: 'slp-p03', section: 'Sleep', dimension: 'sleep', type: 'single',
    tags: ['sleep', 'consistency'],
    text: 'How consistent is your sleep schedule (same bedtime and wake time)?',
    options: [
      { index: 0, text: 'Very consistent — within 30 minutes every day', weights: { sleep: 2, energy: 1 } },
      { index: 1, text: 'Mostly consistent — minor variation on weekends', weights: { sleep: 1 } },
      { index: 2, text: 'Variable — 1–2 hour swings between days', weights: { sleep: -1 } },
      { index: 3, text: 'Highly inconsistent — my schedule shifts significantly', weights: { sleep: -2, stress: 1 } },
    ],
  },
  {
    id: 'slp-p04', section: 'Sleep', dimension: 'sleep', type: 'single',
    tags: ['sleep', 'onset'],
    text: 'How long does it typically take you to fall asleep after getting into bed?',
    options: [
      { index: 0, text: 'Under 10 minutes — I drift off easily', weights: { sleep: 2, stress: -1 } },
      { index: 1, text: '10–20 minutes — normal, no concerns', weights: { sleep: 1 } },
      { index: 2, text: '20–45 minutes — it takes some time', weights: { sleep: -1, stress: 1 } },
      { index: 3, text: 'Over 45 minutes, or I use sleep aids regularly', weights: { sleep: -2, stress: 2 } },
    ],
  },
  {
    id: 'slp-p05', section: 'Sleep', dimension: 'sleep', type: 'single',
    tags: ['sleep', 'morning'],
    text: 'How do you typically feel in the first hour after waking?',
    options: [
      { index: 0, text: 'Refreshed and alert — ready to start', weights: { sleep: 2, energy: 2 } },
      { index: 1, text: 'Okay — takes me 20–30 minutes to feel awake', weights: { sleep: 1, energy: 0 } },
      { index: 2, text: 'Groggy — significant morning fatigue most days', weights: { sleep: -1, energy: -1 } },
      { index: 3, text: 'Exhausted — mornings feel like a battle', weights: { sleep: -2, energy: -2 } },
    ],
  },
  {
    id: 'slp-p06', section: 'Sleep', dimension: 'sleep', type: 'single',
    tags: ['sleep', 'interruptions'],
    text: 'How often do you wake up during the night and have trouble returning to sleep?',
    options: [
      { index: 0, text: 'Rarely or never', weights: { sleep: 2 } },
      { index: 1, text: 'Occasionally — 1–2 nights per week', weights: { sleep: 0 } },
      { index: 2, text: 'Frequently — 3–4 nights per week', weights: { sleep: -1, stress: 1 } },
      { index: 3, text: 'Almost nightly', weights: { sleep: -2, stress: 2 } },
    ],
  },
  {
    id: 'slp-p07', section: 'Sleep', dimension: 'sleep', type: 'single',
    tags: ['sleep', 'wind-down'],
    text: 'What best describes your pre-sleep routine in the 60 minutes before bed?',
    options: [
      { index: 0, text: 'Deliberate wind-down — dim light, no screens, calm activity', weights: { sleep: 2, stress: -1 } },
      { index: 1, text: 'Light routine — some effort to wind down', weights: { sleep: 1 } },
      { index: 2, text: 'Minimal — I work or watch content until close to sleep', weights: { sleep: -1 } },
      { index: 3, text: 'None — I use my phone until I fall asleep', weights: { sleep: -2, energy: -1 } },
    ],
  },
  {
    id: 'slp-p08', section: 'Sleep', dimension: 'sleep', type: 'single',
    tags: ['sleep', 'environment'],
    text: 'How would you rate your sleep environment (darkness, temperature, noise)?',
    options: [
      { index: 0, text: 'Optimised — dark, cool, and quiet', weights: { sleep: 2 } },
      { index: 1, text: 'Good — mostly conducive to sleep', weights: { sleep: 1 } },
      { index: 2, text: 'Fair — some disruptive factors I haven\'t addressed', weights: { sleep: -1 } },
      { index: 3, text: 'Poor — significant light, heat, or noise issues', weights: { sleep: -2 } },
    ],
  },
  {
    id: 'slp-p09', section: 'Sleep', dimension: 'sleep', type: 'single',
    tags: ['sleep', 'napping'],
    text: 'How do you feel about your daytime energy — do you need naps to function?',
    options: [
      { index: 0, text: 'No naps needed — I sustain energy throughout', weights: { sleep: 2, energy: 2 } },
      { index: 1, text: 'Occasional nap by choice, not necessity', weights: { sleep: 1, energy: 1 } },
      { index: 2, text: 'I often need a nap to get through the afternoon', weights: { sleep: -1, energy: -1 } },
      { index: 3, text: 'I feel exhausted without napping and still tired after', weights: { sleep: -2, energy: -2 } },
    ],
  },
  {
    id: 'slp-p10', section: 'Sleep', dimension: 'sleep', type: 'single',
    tags: ['sleep', 'alcohol'],
    text: 'How often do you consume alcohol within 3 hours of bedtime?',
    options: [
      { index: 0, text: 'Never or almost never', weights: { sleep: 2 } },
      { index: 1, text: 'Rarely — once or twice a month', weights: { sleep: 1 } },
      { index: 2, text: 'Sometimes — a few times a week', weights: { sleep: -1, recovery: -1 } },
      { index: 3, text: 'Often — most evenings', weights: { sleep: -2, recovery: -2 } },
    ],
  },
  {
    id: 'slp-p11', section: 'Sleep', dimension: 'sleep', type: 'single',
    tags: ['sleep', 'weekend'],
    text: 'How much does your sleep schedule shift between weekdays and weekends?',
    options: [
      { index: 0, text: 'Less than 30 minutes — very stable', weights: { sleep: 2, energy: 1 } },
      { index: 1, text: '30–60 minutes — minor social jet lag', weights: { sleep: 1 } },
      { index: 2, text: '1–2 hours — noticeable Monday fatigue', weights: { sleep: -1 } },
      { index: 3, text: 'Over 2 hours — significant social jet lag', weights: { sleep: -2, energy: -1 } },
    ],
  },
  {
    id: 'slp-p12', section: 'Sleep', dimension: 'sleep', type: 'single',
    tags: ['sleep', 'dreaming'],
    text: 'How would you describe your dream activity and sleep depth?',
    options: [
      { index: 0, text: 'Vivid and restful — I feel genuinely restored', weights: { sleep: 2, recovery: 1 } },
      { index: 1, text: 'Normal — some dreams, feel reasonably rested', weights: { sleep: 1 } },
      { index: 2, text: 'Restless dreams or very light sleep most nights', weights: { sleep: -1, stress: 1 } },
      { index: 3, text: 'Nightmares, hypervigilant sleep, or no dream recall at all', weights: { sleep: -2, stress: 2 } },
    ],
  },
]

// ══════════════════════════════════════════════════════════════════════════
// NUTRITION — 12 questions
// ══════════════════════════════════════════════════════════════════════════
export const NUTRITION_POOL: Question[] = [
  {
    id: 'nut-p01', section: 'Nutrition', dimension: 'nutrition', type: 'single',
    tags: ['nutrition', 'diet-quality'],
    text: 'How would you describe your overall diet quality?',
    options: [
      { index: 0, text: 'Excellent — whole foods, varied, intentional', weights: { nutrition: 2, energy: 1 } },
      { index: 1, text: 'Good — mostly whole foods with occasional exceptions', weights: { nutrition: 1 } },
      { index: 2, text: 'Fair — mix of healthy and processed with room to improve', weights: { nutrition: -1 } },
      { index: 3, text: 'Poor — heavily processed or highly restrictive', weights: { nutrition: -2, energy: -1 } },
    ],
  },
  {
    id: 'nut-p02', section: 'Nutrition', dimension: 'nutrition', type: 'single',
    tags: ['nutrition', 'vegetables'],
    text: 'How many servings of vegetables do you eat on a typical day?',
    options: [
      { index: 0, text: '5 or more servings — vegetables anchor every meal', weights: { nutrition: 2 } },
      { index: 1, text: '3–4 servings', weights: { nutrition: 1 } },
      { index: 2, text: '1–2 servings', weights: { nutrition: -1 } },
      { index: 3, text: 'Rarely — vegetables are an afterthought', weights: { nutrition: -2, energy: -1 } },
    ],
  },
  {
    id: 'nut-p03', section: 'Nutrition', dimension: 'nutrition', type: 'single',
    tags: ['nutrition', 'protein'],
    text: 'How adequately do you meet your protein needs daily?',
    options: [
      { index: 0, text: 'Very well — I track or estimate and hit my target', weights: { nutrition: 2, recovery: 1 } },
      { index: 1, text: 'Reasonably — I eat protein but don\'t optimise', weights: { nutrition: 1 } },
      { index: 2, text: 'Inconsistently — some days are much better than others', weights: { nutrition: -1 } },
      { index: 3, text: 'Poorly — protein is low in most of my meals', weights: { nutrition: -2, recovery: -1, energy: -1 } },
    ],
  },
  {
    id: 'nut-p04', section: 'Nutrition', dimension: 'nutrition', type: 'single',
    tags: ['nutrition', 'processed'],
    text: 'How often do you consume ultra-processed foods (packaged snacks, fast food, sugary drinks)?',
    options: [
      { index: 0, text: 'Rarely — once a week or less', weights: { nutrition: 2 } },
      { index: 1, text: 'Occasionally — a few times per week', weights: { nutrition: 0 } },
      { index: 2, text: 'Regularly — daily', weights: { nutrition: -1, energy: -1 } },
      { index: 3, text: 'Often — they dominate my diet', weights: { nutrition: -2, energy: -2, recovery: -1 } },
    ],
  },
  {
    id: 'nut-p05', section: 'Nutrition', dimension: 'nutrition', type: 'single',
    tags: ['nutrition', 'meal-timing'],
    text: 'How would you describe your meal timing patterns?',
    options: [
      { index: 0, text: 'Regular and intentional — meals at consistent times', weights: { nutrition: 2, energy: 1 } },
      { index: 1, text: 'Mostly regular with occasional variation', weights: { nutrition: 1 } },
      { index: 2, text: 'Irregular — I eat when I can, no real pattern', weights: { nutrition: -1 } },
      { index: 3, text: 'Chaotic — I often skip meals or eat late at night', weights: { nutrition: -2, sleep: -1 } },
    ],
  },
  {
    id: 'nut-p06', section: 'Nutrition', dimension: 'nutrition', type: 'single',
    tags: ['nutrition', 'mindful-eating'],
    text: 'How present are you during meals — eating slowly and without distraction?',
    options: [
      { index: 0, text: 'Fully present — I eat without screens and chew slowly', weights: { nutrition: 2, stress: -1 } },
      { index: 1, text: 'Mostly — I try to focus on meals', weights: { nutrition: 1 } },
      { index: 2, text: 'Often distracted — I eat while working or scrolling', weights: { nutrition: -1 } },
      { index: 3, text: 'Almost always distracted or eating on the go', weights: { nutrition: -2 } },
    ],
  },
  {
    id: 'nut-p07', section: 'Nutrition', dimension: 'nutrition', type: 'single',
    tags: ['nutrition', 'sugar'],
    text: 'How much refined sugar and sweetened products do you consume?',
    options: [
      { index: 0, text: 'Very little — I avoid added sugars intentionally', weights: { nutrition: 2, energy: 1 } },
      { index: 1, text: 'Modest — occasional treats, aware of intake', weights: { nutrition: 1 } },
      { index: 2, text: 'Regular — sweet foods most days', weights: { nutrition: -1, energy: -1 } },
      { index: 3, text: 'High — sugary foods or drinks are a daily habit', weights: { nutrition: -2, energy: -2 } },
    ],
  },
  {
    id: 'nut-p08', section: 'Nutrition', dimension: 'nutrition', type: 'single',
    tags: ['nutrition', 'cooking'],
    text: 'How often do you prepare home-cooked meals from whole ingredients?',
    options: [
      { index: 0, text: 'Most days — cooking is a regular practice', weights: { nutrition: 2 } },
      { index: 1, text: '3–4 times per week', weights: { nutrition: 1 } },
      { index: 2, text: '1–2 times per week', weights: { nutrition: -1 } },
      { index: 3, text: 'Rarely — I rely primarily on takeout or ready meals', weights: { nutrition: -2 } },
    ],
  },
  {
    id: 'nut-p09', section: 'Nutrition', dimension: 'nutrition', type: 'single',
    tags: ['nutrition', 'gut-health'],
    text: 'How would you describe your gut health and digestion?',
    options: [
      { index: 0, text: 'Excellent — comfortable, regular, no issues', weights: { nutrition: 2, recovery: 1 } },
      { index: 1, text: 'Good — occasional minor discomfort', weights: { nutrition: 1 } },
      { index: 2, text: 'Fair — regular bloating, irregularity, or discomfort', weights: { nutrition: -1, energy: -1 } },
      { index: 3, text: 'Poor — significant digestive issues most days', weights: { nutrition: -2, energy: -1, recovery: -1 } },
    ],
  },
  {
    id: 'nut-p10', section: 'Nutrition', dimension: 'nutrition', type: 'single',
    tags: ['nutrition', 'variety'],
    text: 'How varied is your diet across food groups and food types?',
    options: [
      { index: 0, text: 'Very varied — I eat a wide rainbow of foods weekly', weights: { nutrition: 2 } },
      { index: 1, text: 'Moderately varied — solid rotation but some repetition', weights: { nutrition: 1 } },
      { index: 2, text: 'Limited variety — I eat mostly the same things', weights: { nutrition: -1 } },
      { index: 3, text: 'Very monotonous — same few foods almost every day', weights: { nutrition: -2 } },
    ],
  },
  {
    id: 'nut-p11', section: 'Nutrition', dimension: 'nutrition', type: 'single',
    tags: ['nutrition', 'alcohol'],
    text: 'How much alcohol do you consume weekly?',
    options: [
      { index: 0, text: 'None or very rarely', weights: { nutrition: 1, sleep: 1 } },
      { index: 1, text: '1–7 standard drinks', weights: { nutrition: 0 } },
      { index: 2, text: '8–14 standard drinks', weights: { nutrition: -1, sleep: -1, recovery: -1 } },
      { index: 3, text: 'Over 14 standard drinks', weights: { nutrition: -2, sleep: -2, recovery: -2 } },
    ],
  },
  {
    id: 'nut-p12', section: 'Nutrition', dimension: 'nutrition', type: 'single',
    tags: ['nutrition', 'energy-relationship'],
    text: 'How does your eating affect your energy levels throughout the day?',
    options: [
      { index: 0, text: 'Very positively — stable energy, no crashes', weights: { nutrition: 2, energy: 2 } },
      { index: 1, text: 'Mostly good — minor afternoon dip', weights: { nutrition: 1, energy: 1 } },
      { index: 2, text: 'Mixed — energy crashes after meals', weights: { nutrition: -1, energy: -1 } },
      { index: 3, text: 'Negatively — eating often leaves me sluggish or anxious', weights: { nutrition: -2, energy: -2 } },
    ],
  },
]

// ══════════════════════════════════════════════════════════════════════════
// MOVEMENT — 10 questions
// ══════════════════════════════════════════════════════════════════════════
export const MOVEMENT_POOL: Question[] = [
  {
    id: 'mov-p01', section: 'Movement', dimension: 'movement', type: 'single',
    tags: ['movement', 'frequency'],
    text: 'How many days per week do you engage in intentional physical activity?',
    options: [
      { index: 0, text: '5 or more days', weights: { movement: 2, energy: 1, recovery: 1 } },
      { index: 1, text: '3–4 days', weights: { movement: 1 } },
      { index: 2, text: '1–2 days', weights: { movement: -1, energy: -1 } },
      { index: 3, text: 'Rarely or never', weights: { movement: -2, energy: -2 } },
    ],
  },
  {
    id: 'mov-p02', section: 'Movement', dimension: 'movement', type: 'single',
    tags: ['movement', 'daily-steps'],
    text: 'Approximately how many steps do you take on a typical day?',
    options: [
      { index: 0, text: '10,000 or more', weights: { movement: 2, energy: 1 } },
      { index: 1, text: '7,000–10,000', weights: { movement: 1 } },
      { index: 2, text: '4,000–7,000', weights: { movement: -1 } },
      { index: 3, text: 'Under 4,000 — mostly sedentary', weights: { movement: -2, energy: -1 } },
    ],
  },
  {
    id: 'mov-p03', section: 'Movement', dimension: 'movement', type: 'single',
    tags: ['movement', 'strength'],
    text: 'How often do you engage in strength or resistance training?',
    options: [
      { index: 0, text: '2–3 times per week or more', weights: { movement: 2, recovery: 1, energy: 1 } },
      { index: 1, text: 'Once a week', weights: { movement: 1 } },
      { index: 2, text: 'Occasionally — less than once a week', weights: { movement: -1 } },
      { index: 3, text: 'Never or not at all', weights: { movement: -1 } },
    ],
  },
  {
    id: 'mov-p04', section: 'Movement', dimension: 'movement', type: 'single',
    tags: ['movement', 'sedentary'],
    text: 'How many consecutive hours do you typically sit without a break?',
    options: [
      { index: 0, text: 'Under 1 hour — I move regularly throughout the day', weights: { movement: 2, energy: 1 } },
      { index: 1, text: '1–2 hours', weights: { movement: 1 } },
      { index: 2, text: '2–4 hours', weights: { movement: -1, energy: -1 } },
      { index: 3, text: 'Over 4 hours without meaningful breaks', weights: { movement: -2, energy: -2 } },
    ],
  },
  {
    id: 'mov-p05', section: 'Movement', dimension: 'movement', type: 'single',
    tags: ['movement', 'flexibility'],
    text: 'How much flexibility and mobility work do you do (stretching, yoga, etc.)?',
    options: [
      { index: 0, text: 'Regular practice — 3+ times per week', weights: { movement: 2, recovery: 1 } },
      { index: 1, text: 'Some — once or twice weekly', weights: { movement: 1 } },
      { index: 2, text: 'Minimal — occasional stretching only', weights: { movement: 0 } },
      { index: 3, text: 'None', weights: { movement: -1 } },
    ],
  },
  {
    id: 'mov-p06', section: 'Movement', dimension: 'movement', type: 'single',
    tags: ['movement', 'enjoyment'],
    text: 'How much do you enjoy your current physical activity?',
    options: [
      { index: 0, text: 'Deeply — I genuinely look forward to moving', weights: { movement: 2, emotional: 1 } },
      { index: 1, text: 'Mostly — I feel good after, even if starting is hard', weights: { movement: 1 } },
      { index: 2, text: 'Neutral — it feels like obligation', weights: { movement: 0 } },
      { index: 3, text: 'I avoid it — physical activity feels burdensome', weights: { movement: -1, emotional: -1 } },
    ],
  },
  {
    id: 'mov-p07', section: 'Movement', dimension: 'movement', type: 'single',
    tags: ['movement', 'cardio'],
    text: 'How often do you do cardiovascular exercise (brisk walking, running, cycling, swimming)?',
    options: [
      { index: 0, text: '4 or more times per week', weights: { movement: 2, energy: 1, recovery: 1 } },
      { index: 1, text: '2–3 times per week', weights: { movement: 1 } },
      { index: 2, text: 'Once a week', weights: { movement: -1 } },
      { index: 3, text: 'Rarely or never', weights: { movement: -2, energy: -1 } },
    ],
  },
  {
    id: 'mov-p08', section: 'Movement', dimension: 'movement', type: 'single',
    tags: ['movement', 'outdoor'],
    text: 'How much of your movement happens outdoors in natural settings?',
    options: [
      { index: 0, text: 'Most — I prioritise outdoor movement', weights: { movement: 2, stress: -1, emotional: 1 } },
      { index: 1, text: 'Some — a few outdoor sessions per week', weights: { movement: 1 } },
      { index: 2, text: 'Little — mostly indoor exercise', weights: { movement: 0 } },
      { index: 3, text: 'None — all movement is indoors', weights: { movement: 0 } },
    ],
  },
  {
    id: 'mov-p09', section: 'Movement', dimension: 'movement', type: 'single',
    tags: ['movement', 'body-pain'],
    text: 'Do physical pain or discomfort limit your movement capacity?',
    options: [
      { index: 0, text: 'Not at all — I move freely without pain', weights: { movement: 2, recovery: 1 } },
      { index: 1, text: 'Minor — occasional soreness, doesn\'t restrict me', weights: { movement: 1 } },
      { index: 2, text: 'Moderate — pain regularly limits what I can do', weights: { movement: -1, recovery: -1 } },
      { index: 3, text: 'Significantly — chronic pain restricts most activity', weights: { movement: -2, recovery: -2, emotional: -1 } },
    ],
  },
  {
    id: 'mov-p10', section: 'Movement', dimension: 'movement', type: 'single',
    tags: ['movement', 'post-meal'],
    text: 'Do you include any movement after meals (walking, light activity)?',
    options: [
      { index: 0, text: 'Yes — it\'s a regular habit after most meals', weights: { movement: 2, nutrition: 1 } },
      { index: 1, text: 'Sometimes — maybe a few times per week', weights: { movement: 1 } },
      { index: 2, text: 'Rarely', weights: { movement: 0 } },
      { index: 3, text: 'Never — I sit after meals', weights: { movement: -1 } },
    ],
  },
]

// ══════════════════════════════════════════════════════════════════════════
// STRESS — 10 questions
// ══════════════════════════════════════════════════════════════════════════
export const STRESS_POOL: Question[] = [
  {
    id: 'str-p01', section: 'Stress & Calm', dimension: 'stress', type: 'single',
    tags: ['stress', 'level'],
    text: 'How would you rate your overall stress level over the past two weeks?',
    options: [
      { index: 0, text: 'Low — I feel calm and in control most of the time', weights: { stress: -2 } },
      { index: 1, text: 'Moderate — manageable with some tense moments', weights: { stress: 0 } },
      { index: 2, text: 'High — I feel stressed most days', weights: { stress: 2, recovery: -1 } },
      { index: 3, text: 'Overwhelming — stress is significantly impairing me', weights: { stress: 3, recovery: -2, sleep: -1 } },
    ],
  },
  {
    id: 'str-p02', section: 'Stress & Calm', dimension: 'stress', type: 'single',
    tags: ['stress', 'recovery-ability'],
    text: 'After a stressful event, how quickly do you return to baseline calm?',
    options: [
      { index: 0, text: 'Quickly — within hours, I can reset', weights: { stress: -2, recovery: 1 } },
      { index: 1, text: 'Within a day — I process it and move on', weights: { stress: -1 } },
      { index: 2, text: 'Several days — stress lingers and affects sleep', weights: { stress: 1, sleep: -1 } },
      { index: 3, text: 'I carry stress for weeks or rarely feel recovered', weights: { stress: 2, sleep: -2, recovery: -2 } },
    ],
  },
  {
    id: 'str-p03', section: 'Stress & Calm', dimension: 'stress', type: 'single',
    tags: ['stress', 'tools'],
    text: 'What stress management tools do you use consistently?',
    options: [
      { index: 0, text: 'Multiple effective tools (meditation, breathwork, therapy, nature)', weights: { stress: -2, emotional: 1 } },
      { index: 1, text: 'One reliable practice I return to regularly', weights: { stress: -1 } },
      { index: 2, text: 'Nothing consistent — I manage reactively', weights: { stress: 1 } },
      { index: 3, text: 'I cope through avoidance, substances, or distraction', weights: { stress: 2, nutrition: -1 } },
    ],
  },
  {
    id: 'str-p04', section: 'Stress & Calm', dimension: 'stress', type: 'single',
    tags: ['stress', 'work'],
    text: 'How much does work or professional pressure affect your wellbeing outside work hours?',
    options: [
      { index: 0, text: 'Minimally — I leave work at work', weights: { stress: -1, life_balance: 1 } },
      { index: 1, text: 'Somewhat — I decompress within an hour or two', weights: { stress: 0 } },
      { index: 2, text: 'Significantly — work thoughts intrude into evenings', weights: { stress: 1, sleep: -1, life_balance: -1 } },
      { index: 3, text: 'Pervasively — I never feel truly "off"', weights: { stress: 2, sleep: -2, life_balance: -2 } },
    ],
  },
  {
    id: 'str-p05', section: 'Stress & Calm', dimension: 'stress', type: 'single',
    tags: ['stress', 'physical'],
    text: 'Do you notice physical symptoms of stress (tension, headaches, jaw clenching, gut issues)?',
    options: [
      { index: 0, text: 'Rarely — minimal physical stress manifestations', weights: { stress: -1 } },
      { index: 1, text: 'Occasionally — minor tension in neck or shoulders', weights: { stress: 0 } },
      { index: 2, text: 'Regularly — weekly physical stress symptoms', weights: { stress: 1, recovery: -1 } },
      { index: 3, text: 'Daily — my body constantly carries my stress', weights: { stress: 2, recovery: -2, sleep: -1 } },
    ],
  },
  {
    id: 'str-p06', section: 'Stress & Calm', dimension: 'stress', type: 'single',
    tags: ['stress', 'breathing'],
    text: 'How aware are you of your breath during stressful moments, and do you use breathing to calm down?',
    options: [
      { index: 0, text: 'Very aware — breath is my first tool for regulation', weights: { stress: -2 } },
      { index: 1, text: 'Somewhat — I remember to breathe deliberately sometimes', weights: { stress: -1 } },
      { index: 2, text: 'Rarely — I don\'t think about breathing under stress', weights: { stress: 1 } },
      { index: 3, text: 'Never — stress hijacks me and I don\'t recover well', weights: { stress: 2 } },
    ],
  },
  {
    id: 'str-p07', section: 'Stress & Calm', dimension: 'stress', type: 'single',
    tags: ['stress', 'boundaries'],
    text: 'How clearly do you set and maintain personal boundaries (time, energy, relationships)?',
    options: [
      { index: 0, text: 'Clearly — I protect my time and energy without guilt', weights: { stress: -2, life_balance: 1 } },
      { index: 1, text: 'Mostly — I set limits but struggle occasionally', weights: { stress: -1 } },
      { index: 2, text: 'With difficulty — saying no triggers anxiety', weights: { stress: 1, emotional: -1 } },
      { index: 3, text: 'Poorly — I chronically over-commit and under-prioritise myself', weights: { stress: 2, emotional: -2, recovery: -1 } },
    ],
  },
  {
    id: 'str-p08', section: 'Stress & Calm', dimension: 'stress', type: 'single',
    tags: ['stress', 'mindfulness'],
    text: 'How often do you practise mindfulness, meditation, or intentional present-moment awareness?',
    options: [
      { index: 0, text: 'Daily — it\'s part of my routine', weights: { stress: -2, emotional: 1 } },
      { index: 1, text: 'A few times per week', weights: { stress: -1 } },
      { index: 2, text: 'Occasionally — when I remember or feel desperate', weights: { stress: 0 } },
      { index: 3, text: 'Never — I\'ve never tried or can\'t make it work', weights: { stress: 1 } },
    ],
  },
  {
    id: 'str-p09', section: 'Stress & Calm', dimension: 'stress', type: 'single',
    tags: ['stress', 'rumination'],
    text: 'How often do you find yourself replaying worries or negative thoughts involuntarily?',
    options: [
      { index: 0, text: 'Rarely — I can redirect my thoughts relatively easily', weights: { stress: -1, emotional: 1 } },
      { index: 1, text: 'Occasionally — I notice it and can usually let go', weights: { stress: 0 } },
      { index: 2, text: 'Often — rumination takes significant mental energy', weights: { stress: 1, emotional: -1, sleep: -1 } },
      { index: 3, text: 'Almost constantly — my mind won\'t quiet down', weights: { stress: 2, emotional: -2, sleep: -2 } },
    ],
  },
  {
    id: 'str-p10', section: 'Stress & Calm', dimension: 'stress', type: 'single',
    tags: ['stress', 'nature'],
    text: 'How much time do you spend in natural environments (parks, forests, water)?',
    options: [
      { index: 0, text: 'Daily — nature is woven into my routine', weights: { stress: -2, emotional: 1 } },
      { index: 1, text: 'A few times per week', weights: { stress: -1 } },
      { index: 2, text: 'Rarely — mostly urban environments', weights: { stress: 0 } },
      { index: 3, text: 'Almost never', weights: { stress: 1 } },
    ],
  },
]

// ══════════════════════════════════════════════════════════════════════════
// RECOVERY — 10 questions
// ══════════════════════════════════════════════════════════════════════════
export const RECOVERY_POOL: Question[] = [
  {
    id: 'rec-p01', section: 'Recovery', dimension: 'recovery', type: 'single',
    tags: ['recovery', 'overall'],
    text: 'How recovered do you feel on a typical morning?',
    options: [
      { index: 0, text: 'Fully restored — ready to take on a demanding day', weights: { recovery: 2, sleep: 1, energy: 1 } },
      { index: 1, text: 'Adequately rested — minor residual fatigue', weights: { recovery: 1 } },
      { index: 2, text: 'Partially recovered — fatigue is present', weights: { recovery: -1, energy: -1 } },
      { index: 3, text: 'Unrecovered — I never feel truly rested', weights: { recovery: -2, energy: -2 } },
    ],
  },
  {
    id: 'rec-p02', section: 'Recovery', dimension: 'recovery', type: 'single',
    tags: ['recovery', 'active'],
    text: 'Do you include deliberate active recovery days (light walks, stretching, mobility work)?',
    options: [
      { index: 0, text: 'Yes — recovery is planned and intentional', weights: { recovery: 2, movement: 1 } },
      { index: 1, text: 'Sometimes — I rest but don\'t actively recover', weights: { recovery: 1 } },
      { index: 2, text: 'Rarely — I either train hard or don\'t move', weights: { recovery: -1 } },
      { index: 3, text: 'No — I push until I crash, then do nothing', weights: { recovery: -2, stress: 1 } },
    ],
  },
  {
    id: 'rec-p03', section: 'Recovery', dimension: 'recovery', type: 'single',
    tags: ['recovery', 'muscle'],
    text: 'How well does your body recover between physical training sessions?',
    options: [
      { index: 0, text: 'Very well — minimal soreness, ready quickly', weights: { recovery: 2, movement: 1 } },
      { index: 1, text: 'Well enough — mild soreness that resolves in 48 hours', weights: { recovery: 1 } },
      { index: 2, text: 'Slowly — persistent soreness often limits next sessions', weights: { recovery: -1, movement: -1 } },
      { index: 3, text: 'Poorly — I frequently feel over-trained or injured', weights: { recovery: -2, movement: -1 } },
    ],
  },
  {
    id: 'rec-p04', section: 'Recovery', dimension: 'recovery', type: 'single',
    tags: ['recovery', 'parasympathetic'],
    text: 'How easily can you shift into a relaxed, rest-and-digest state during downtime?',
    options: [
      { index: 0, text: 'Easily — I can fully relax without difficulty', weights: { recovery: 2, stress: -1 } },
      { index: 1, text: 'Mostly — some residual alertness but I can unwind', weights: { recovery: 1 } },
      { index: 2, text: 'With difficulty — I stay "on" even during leisure', weights: { recovery: -1, stress: 1 } },
      { index: 3, text: 'I can\'t — I\'m always in activated mode', weights: { recovery: -2, stress: 2 } },
    ],
  },
  {
    id: 'rec-p05', section: 'Recovery', dimension: 'recovery', type: 'single',
    tags: ['recovery', 'heat-cold'],
    text: 'Do you use any deliberate thermal recovery practices (sauna, cold water, contrast)?',
    options: [
      { index: 0, text: 'Yes — regular practice (2+ times per week)', weights: { recovery: 2 } },
      { index: 1, text: 'Occasionally — when available', weights: { recovery: 1 } },
      { index: 2, text: 'Rarely', weights: { recovery: 0 } },
      { index: 3, text: 'Never', weights: { recovery: 0 } },
    ],
  },
  {
    id: 'rec-p06', section: 'Recovery', dimension: 'recovery', type: 'single',
    tags: ['recovery', 'illness'],
    text: 'How often do you get sick (colds, infections) over a typical year?',
    options: [
      { index: 0, text: 'Rarely — 0–1 times per year', weights: { recovery: 2, nutrition: 1 } },
      { index: 1, text: 'Occasionally — 2–3 times per year', weights: { recovery: 1 } },
      { index: 2, text: 'Frequently — monthly or more', weights: { recovery: -1, stress: 1 } },
      { index: 3, text: 'Very often — I seem to catch everything', weights: { recovery: -2, stress: 1, sleep: -1 } },
    ],
  },
  {
    id: 'rec-p07', section: 'Recovery', dimension: 'recovery', type: 'single',
    tags: ['recovery', 'hrv'],
    text: 'Do you track or pay attention to heart rate variability (HRV) or other recovery metrics?',
    options: [
      { index: 0, text: 'Yes — I use it to guide training and rest decisions', weights: { recovery: 2 } },
      { index: 1, text: 'Somewhat — I check it but don\'t systematically act on it', weights: { recovery: 1 } },
      { index: 2, text: 'No — but I\'m aware of the concept', weights: { recovery: 0 } },
      { index: 3, text: 'No — not familiar with it', weights: { recovery: 0 } },
    ],
  },
  {
    id: 'rec-p08', section: 'Recovery', dimension: 'recovery', type: 'single',
    tags: ['recovery', 'mental'],
    text: 'How well do you recover mentally from cognitively demanding days?',
    options: [
      { index: 0, text: 'Very well — I can fully switch off in the evening', weights: { recovery: 2, sleep: 1 } },
      { index: 1, text: 'Reasonably — I unwind within 1–2 hours', weights: { recovery: 1 } },
      { index: 2, text: 'With difficulty — my mind keeps running through the evening', weights: { recovery: -1, stress: 1, sleep: -1 } },
      { index: 3, text: 'Poorly — I carry mental exhaustion into the next day', weights: { recovery: -2, stress: 2, sleep: -1 } },
    ],
  },
  {
    id: 'rec-p09', section: 'Recovery', dimension: 'recovery', type: 'single',
    tags: ['recovery', 'supplements'],
    text: 'Do you use targeted recovery support (magnesium, adaptogens, cold exposure, massage)?',
    options: [
      { index: 0, text: 'Yes — multiple intentional practices', weights: { recovery: 2 } },
      { index: 1, text: 'Some — one or two consistent supports', weights: { recovery: 1 } },
      { index: 2, text: 'Rarely — ad hoc when I feel bad', weights: { recovery: 0 } },
      { index: 3, text: 'Nothing — I rely on time alone', weights: { recovery: 0 } },
    ],
  },
  {
    id: 'rec-p10', section: 'Recovery', dimension: 'recovery', type: 'single',
    tags: ['recovery', 'overtraining'],
    text: 'How often do you push through exhaustion without respecting your body\'s signals?',
    options: [
      { index: 0, text: 'Rarely — I honour rest when my body needs it', weights: { recovery: 2 } },
      { index: 1, text: 'Sometimes — I push but know my limits', weights: { recovery: 1 } },
      { index: 2, text: 'Often — I treat rest as laziness', weights: { recovery: -1, stress: 1 } },
      { index: 3, text: 'Almost always — I ignore fatigue until I crash', weights: { recovery: -2, stress: 2 } },
    ],
  },
]

// ══════════════════════════════════════════════════════════════════════════
// EMOTIONAL — 10 questions
// ══════════════════════════════════════════════════════════════════════════
export const EMOTIONAL_POOL: Question[] = [
  {
    id: 'emo-p01', section: 'Emotional Wellbeing', dimension: 'emotional', type: 'single',
    tags: ['emotional', 'baseline'],
    text: 'How would you describe your emotional baseline over the past two weeks?',
    options: [
      { index: 0, text: 'Predominantly positive — hopeful, engaged, content', weights: { emotional: 2 } },
      { index: 1, text: 'Mixed but generally stable — ups and downs within normal range', weights: { emotional: 1 } },
      { index: 2, text: 'Frequently negative — persistent low mood, irritability, or anxiety', weights: { emotional: -1, stress: 1 } },
      { index: 3, text: 'Significantly distressed — difficult emotions dominate most days', weights: { emotional: -2, stress: 2 } },
    ],
  },
  {
    id: 'emo-p02', section: 'Emotional Wellbeing', dimension: 'emotional', type: 'single',
    tags: ['emotional', 'regulation'],
    text: 'How well can you regulate your emotions when something upsetting happens?',
    options: [
      { index: 0, text: 'Well — I can acknowledge feelings and respond, not react', weights: { emotional: 2, stress: -1 } },
      { index: 1, text: 'Mostly — I regulate but sometimes lose it under pressure', weights: { emotional: 1 } },
      { index: 2, text: 'With difficulty — my reactions often escalate the situation', weights: { emotional: -1, stress: 1 } },
      { index: 3, text: 'Poorly — I\'m frequently overwhelmed by my emotions', weights: { emotional: -2, stress: 2 } },
    ],
  },
  {
    id: 'emo-p03', section: 'Emotional Wellbeing', dimension: 'emotional', type: 'single',
    tags: ['emotional', 'joy'],
    text: 'How often do you experience genuine moments of joy, delight, or deep satisfaction?',
    options: [
      { index: 0, text: 'Daily — small moments of joy are part of my day', weights: { emotional: 2, purpose: 1 } },
      { index: 1, text: 'A few times per week', weights: { emotional: 1 } },
      { index: 2, text: 'Occasionally — joy feels rare or fleeting', weights: { emotional: -1 } },
      { index: 3, text: 'Almost never — I feel emotionally flat or joyless', weights: { emotional: -2, purpose: -1 } },
    ],
  },
  {
    id: 'emo-p04', section: 'Emotional Wellbeing', dimension: 'emotional', type: 'single',
    tags: ['emotional', 'self-compassion'],
    text: 'How would you rate your self-compassion — do you treat yourself with kindness when you fail?',
    options: [
      { index: 0, text: 'High — I can acknowledge mistakes without harsh self-judgement', weights: { emotional: 2, stress: -1 } },
      { index: 1, text: 'Moderate — I\'m somewhat kind to myself most of the time', weights: { emotional: 1 } },
      { index: 2, text: 'Low — I\'m much harder on myself than I\'d be on a friend', weights: { emotional: -1, stress: 1 } },
      { index: 3, text: 'Very low — self-criticism is a significant pattern for me', weights: { emotional: -2, stress: 2 } },
    ],
  },
  {
    id: 'emo-p05', section: 'Emotional Wellbeing', dimension: 'emotional', type: 'single',
    tags: ['emotional', 'connection'],
    text: 'How emotionally connected do you feel to the people closest to you?',
    options: [
      { index: 0, text: 'Deeply connected — I feel seen, understood, and loved', weights: { emotional: 2, purpose: 1 } },
      { index: 1, text: 'Reasonably connected — solid relationships with room to deepen', weights: { emotional: 1 } },
      { index: 2, text: 'Somewhat disconnected — surface-level in most relationships', weights: { emotional: -1, life_balance: -1 } },
      { index: 3, text: 'Isolated — I feel alone even with others present', weights: { emotional: -2, stress: 2, purpose: -1 } },
    ],
  },
  {
    id: 'emo-p06', section: 'Emotional Wellbeing', dimension: 'emotional', type: 'single',
    tags: ['emotional', 'anxiety'],
    text: 'How often does anxiety or worry interfere with your daily functioning?',
    options: [
      { index: 0, text: 'Rarely — I experience worry but it doesn\'t limit me', weights: { emotional: 2 } },
      { index: 1, text: 'Occasionally — manageable anxiety a few times weekly', weights: { emotional: 1, stress: 0 } },
      { index: 2, text: 'Often — anxiety regularly disrupts focus, sleep, or decisions', weights: { emotional: -1, stress: 1, sleep: -1 } },
      { index: 3, text: 'Most of the time — anxiety is a primary struggle', weights: { emotional: -2, stress: 2, sleep: -2 } },
    ],
  },
  {
    id: 'emo-p07', section: 'Emotional Wellbeing', dimension: 'emotional', type: 'single',
    tags: ['emotional', 'expression'],
    text: 'How openly can you express your emotions with people you trust?',
    options: [
      { index: 0, text: 'Very openly — I share authentically without fear', weights: { emotional: 2, life_balance: 1 } },
      { index: 1, text: 'Mostly — I share some feelings but hold back others', weights: { emotional: 1 } },
      { index: 2, text: 'With difficulty — expressing emotions feels uncomfortable', weights: { emotional: -1 } },
      { index: 3, text: 'I don\'t — I suppress or hide how I feel almost always', weights: { emotional: -2, stress: 2 } },
    ],
  },
  {
    id: 'emo-p08', section: 'Emotional Wellbeing', dimension: 'emotional', type: 'single',
    tags: ['emotional', 'gratitude'],
    text: 'How often do you consciously acknowledge what you\'re grateful for?',
    options: [
      { index: 0, text: 'Daily — gratitude is part of my practice', weights: { emotional: 2, purpose: 1 } },
      { index: 1, text: 'A few times per week', weights: { emotional: 1 } },
      { index: 2, text: 'Rarely', weights: { emotional: 0 } },
      { index: 3, text: 'Never — I don\'t have a gratitude practice', weights: { emotional: 0 } },
    ],
  },
  {
    id: 'emo-p09', section: 'Emotional Wellbeing', dimension: 'emotional', type: 'single',
    tags: ['emotional', 'professional-support'],
    text: 'Do you have professional support (therapist, counsellor) for your emotional health?',
    options: [
      { index: 0, text: 'Yes — active and helpful relationship', weights: { emotional: 2 } },
      { index: 1, text: 'Previously — I\'ve had therapy and use those skills', weights: { emotional: 1 } },
      { index: 2, text: 'No, but I\'d benefit from it', weights: { emotional: 0 } },
      { index: 3, text: 'No — I manage alone or feel it wouldn\'t help', weights: { emotional: 0 } },
    ],
  },
  {
    id: 'emo-p10', section: 'Emotional Wellbeing', dimension: 'emotional', type: 'single',
    tags: ['emotional', 'resilience'],
    text: 'How would you rate your resilience when life becomes difficult?',
    options: [
      { index: 0, text: 'High — I adapt, learn, and bounce back relatively well', weights: { emotional: 2, stress: -1 } },
      { index: 1, text: 'Moderate — I manage but it takes significant effort', weights: { emotional: 1 } },
      { index: 2, text: 'Low — difficult periods knock me down for a long time', weights: { emotional: -1, stress: 1 } },
      { index: 3, text: 'Very low — I feel I can\'t cope with adversity well', weights: { emotional: -2, stress: 2 } },
    ],
  },
]

// ══════════════════════════════════════════════════════════════════════════
// PURPOSE — 10 questions
// ══════════════════════════════════════════════════════════════════════════
export const PURPOSE_POOL: Question[] = [
  {
    id: 'pur-p01', section: 'Purpose & Meaning', dimension: 'purpose', type: 'single',
    tags: ['purpose', 'clarity'],
    text: 'How clear is your sense of purpose — why you do what you do?',
    options: [
      { index: 0, text: 'Very clear — I have a strong sense of direction and meaning', weights: { purpose: 2, emotional: 1 } },
      { index: 1, text: 'Somewhat clear — I sense it but it\'s not fully articulated', weights: { purpose: 1 } },
      { index: 2, text: 'Unclear — I go through the motions without deep meaning', weights: { purpose: -1, emotional: -1 } },
      { index: 3, text: 'Missing — I feel adrift or question why I\'m doing what I do', weights: { purpose: -2, emotional: -2 } },
    ],
  },
  {
    id: 'pur-p02', section: 'Purpose & Meaning', dimension: 'purpose', type: 'single',
    tags: ['purpose', 'contribution'],
    text: 'How much does your daily work or activity feel like a meaningful contribution?',
    options: [
      { index: 0, text: 'Significantly — my work feels genuinely important', weights: { purpose: 2, emotional: 1 } },
      { index: 1, text: 'Somewhat — it has value even if not always felt', weights: { purpose: 1 } },
      { index: 2, text: 'Minimally — my work feels mostly transactional', weights: { purpose: -1 } },
      { index: 3, text: 'Not at all — I feel disconnected from any sense of contribution', weights: { purpose: -2, emotional: -1 } },
    ],
  },
  {
    id: 'pur-p03', section: 'Purpose & Meaning', dimension: 'purpose', type: 'single',
    tags: ['purpose', 'goals'],
    text: 'How aligned are your daily actions with your longer-term goals and values?',
    options: [
      { index: 0, text: 'Highly aligned — my days reflect my priorities', weights: { purpose: 2, life_balance: 1 } },
      { index: 1, text: 'Mostly aligned — good on most dimensions', weights: { purpose: 1 } },
      { index: 2, text: 'Partially — significant misalignment in key areas', weights: { purpose: -1, stress: 1 } },
      { index: 3, text: 'Significantly misaligned — I\'m living someone else\'s life', weights: { purpose: -2, stress: 2, emotional: -1 } },
    ],
  },
  {
    id: 'pur-p04', section: 'Purpose & Meaning', dimension: 'purpose', type: 'single',
    tags: ['purpose', 'vitality'],
    text: 'When you wake up in the morning, how often do you feel eager and excited about the day?',
    options: [
      { index: 0, text: 'Most days — genuine morning anticipation is common', weights: { purpose: 2, energy: 1 } },
      { index: 1, text: 'Sometimes — certain days or projects energise me', weights: { purpose: 1 } },
      { index: 2, text: 'Rarely — mornings feel like a chore', weights: { purpose: -1, energy: -1 } },
      { index: 3, text: 'Never — I dread most of what\'s coming', weights: { purpose: -2, energy: -2, emotional: -1 } },
    ],
  },
  {
    id: 'pur-p05', section: 'Purpose & Meaning', dimension: 'purpose', type: 'single',
    tags: ['purpose', 'values'],
    text: 'How well do you know your core personal values?',
    options: [
      { index: 0, text: 'Very clearly — I can name them and they guide my decisions', weights: { purpose: 2 } },
      { index: 1, text: 'Generally — I sense them but haven\'t made them explicit', weights: { purpose: 1 } },
      { index: 2, text: 'Vaguely — my values feel unclear or shifting', weights: { purpose: -1 } },
      { index: 3, text: 'I\'ve never really thought about what matters most to me', weights: { purpose: -2 } },
    ],
  },
  {
    id: 'pur-p06', section: 'Purpose & Meaning', dimension: 'purpose', type: 'single',
    tags: ['purpose', 'growth'],
    text: 'How much personal growth and learning are you experiencing?',
    options: [
      { index: 0, text: 'A great deal — I\'m expanding regularly in meaningful ways', weights: { purpose: 2, emotional: 1 } },
      { index: 1, text: 'Some — steady but not dramatic growth', weights: { purpose: 1 } },
      { index: 2, text: 'Little — I feel stagnant in my development', weights: { purpose: -1 } },
      { index: 3, text: 'None — I feel like I\'m regressing or just surviving', weights: { purpose: -2, emotional: -1 } },
    ],
  },
  {
    id: 'pur-p07', section: 'Purpose & Meaning', dimension: 'purpose', type: 'single',
    tags: ['purpose', 'legacy'],
    text: 'How much do you think about the impact you want to have or the legacy you want to leave?',
    options: [
      { index: 0, text: 'Often — it actively shapes my choices', weights: { purpose: 2 } },
      { index: 1, text: 'Sometimes — it surfaces in reflection', weights: { purpose: 1 } },
      { index: 2, text: 'Rarely — I\'m too focused on the immediate', weights: { purpose: 0 } },
      { index: 3, text: 'Never — these questions feel abstract or irrelevant to me', weights: { purpose: -1 } },
    ],
  },
  {
    id: 'pur-p08', section: 'Purpose & Meaning', dimension: 'purpose', type: 'single',
    tags: ['purpose', 'service'],
    text: 'How much of your time is spent helping others or contributing to something beyond yourself?',
    options: [
      { index: 0, text: 'Significantly — service to others is central to my life', weights: { purpose: 2, emotional: 1, life_balance: 1 } },
      { index: 1, text: 'Meaningfully — I contribute regularly to others', weights: { purpose: 1 } },
      { index: 2, text: 'Occasionally — I help when convenient', weights: { purpose: 0 } },
      { index: 3, text: 'Minimally — I\'m mostly focused on myself by necessity', weights: { purpose: -1 } },
    ],
  },
  {
    id: 'pur-p09', section: 'Purpose & Meaning', dimension: 'purpose', type: 'single',
    tags: ['purpose', 'flow'],
    text: 'How often do you enter a state of deep focus or "flow" in your work or creative activities?',
    options: [
      { index: 0, text: 'Often — hours pass and I feel energised, not depleted', weights: { purpose: 2, energy: 1 } },
      { index: 1, text: 'Sometimes — maybe once or twice a week', weights: { purpose: 1 } },
      { index: 2, text: 'Rarely — I struggle to get into deep focus', weights: { purpose: -1, stress: 1 } },
      { index: 3, text: 'Almost never — distraction and low engagement are constant', weights: { purpose: -2, stress: 1 } },
    ],
  },
  {
    id: 'pur-p10', section: 'Purpose & Meaning', dimension: 'purpose', type: 'single',
    tags: ['purpose', 'creative'],
    text: 'Do you have creative outlets or projects that feel personally meaningful?',
    options: [
      { index: 0, text: 'Yes — they\'re central to my sense of self', weights: { purpose: 2, emotional: 1 } },
      { index: 1, text: 'Some — a hobby or side project I\'m connected to', weights: { purpose: 1 } },
      { index: 2, text: 'Minimal — I haven\'t found what energises me creatively', weights: { purpose: -1 } },
      { index: 3, text: 'None — creativity feels inaccessible in my life right now', weights: { purpose: -2, life_balance: -1 } },
    ],
  },
]

// ══════════════════════════════════════════════════════════════════════════
// LIFE BALANCE — 10 questions
// ══════════════════════════════════════════════════════════════════════════
export const LIFE_BALANCE_POOL: Question[] = [
  {
    id: 'bal-p01', section: 'Life Balance', dimension: 'life_balance', type: 'single',
    tags: ['balance', 'satisfaction'],
    text: 'How satisfied are you with the balance across work, relationships, health, and personal growth?',
    options: [
      { index: 0, text: 'Very satisfied — they feel integrated, not competing', weights: { life_balance: 2, emotional: 1 } },
      { index: 1, text: 'Generally good — minor areas need attention', weights: { life_balance: 1 } },
      { index: 2, text: 'Imbalanced — one area dominates at the expense of others', weights: { life_balance: -1, stress: 1 } },
      { index: 3, text: "Significantly out of balance — it's affecting my wellbeing", weights: { life_balance: -2, stress: 2, emotional: -1 } },
    ],
  },
  {
    id: 'bal-p02', section: 'Life Balance', dimension: 'life_balance', type: 'single',
    tags: ['balance', 'work-hours'],
    text: 'How many hours per week do you typically work (including evenings and weekends)?',
    options: [
      { index: 0, text: 'Under 45 — sustainable and productive', weights: { life_balance: 2, stress: -1 } },
      { index: 1, text: '45–55 hours', weights: { life_balance: 1 } },
      { index: 2, text: '55–65 hours', weights: { life_balance: -1, stress: 1, recovery: -1 } },
      { index: 3, text: 'Over 65 — work consumes most of my waking time', weights: { life_balance: -2, stress: 2, recovery: -2 } },
    ],
  },
  {
    id: 'bal-p03', section: 'Life Balance', dimension: 'life_balance', type: 'single',
    tags: ['balance', 'leisure'],
    text: 'How much genuine leisure and play do you have in your week?',
    options: [
      { index: 0, text: 'Plenty — I have hobbies, rest, and fun regularly', weights: { life_balance: 2, emotional: 1, recovery: 1 } },
      { index: 1, text: 'Some — I squeeze in leisure when I can', weights: { life_balance: 1 } },
      { index: 2, text: 'Little — free time is mostly consumed by obligations', weights: { life_balance: -1, stress: 1 } },
      { index: 3, text: 'None — I\'ve forgotten what rest without guilt feels like', weights: { life_balance: -2, stress: 2, emotional: -1 } },
    ],
  },
  {
    id: 'bal-p04', section: 'Life Balance', dimension: 'life_balance', type: 'single',
    tags: ['balance', 'social'],
    text: 'How satisfied are you with the quantity and quality of your social connections?',
    options: [
      { index: 0, text: 'Very satisfied — rich and diverse connections', weights: { life_balance: 2, emotional: 2 } },
      { index: 1, text: 'Mostly — good connections but could be deeper', weights: { life_balance: 1, emotional: 1 } },
      { index: 2, text: 'Thin — I have few meaningful connections', weights: { life_balance: -1, emotional: -1 } },
      { index: 3, text: 'Deeply lacking — I feel significantly socially isolated', weights: { life_balance: -2, emotional: -2, stress: 1 } },
    ],
  },
  {
    id: 'bal-p05', section: 'Life Balance', dimension: 'life_balance', type: 'single',
    tags: ['balance', 'screen-time'],
    text: 'How much of your leisure time is spent on screens vs. embodied activities?',
    options: [
      { index: 0, text: 'Mostly off-screen — nature, movement, crafts, socialising', weights: { life_balance: 2, emotional: 1 } },
      { index: 1, text: 'Mixed — roughly balanced', weights: { life_balance: 1 } },
      { index: 2, text: 'Mostly screens — I notice it but haven\'t changed', weights: { life_balance: -1 } },
      { index: 3, text: 'Entirely screens — scrolling, gaming, or streaming dominates', weights: { life_balance: -2, stress: 1, emotional: -1 } },
    ],
  },
  {
    id: 'bal-p06', section: 'Life Balance', dimension: 'life_balance', type: 'single',
    tags: ['balance', 'priorities'],
    text: 'How often do you feel that your most important priorities actually receive your time and energy?',
    options: [
      { index: 0, text: 'Most of the time — I protect what matters', weights: { life_balance: 2, purpose: 1 } },
      { index: 1, text: 'Sometimes — I manage some priorities but not all', weights: { life_balance: 1 } },
      { index: 2, text: 'Rarely — urgency crowds out importance', weights: { life_balance: -1, stress: 1 } },
      { index: 3, text: 'Almost never — I\'m always in reactive mode', weights: { life_balance: -2, stress: 2, purpose: -1 } },
    ],
  },
  {
    id: 'bal-p07', section: 'Life Balance', dimension: 'life_balance', type: 'single',
    tags: ['balance', 'financial-stress'],
    text: 'How much does financial stress affect your overall sense of balance?',
    options: [
      { index: 0, text: 'Minimal — finances are stable and not a primary concern', weights: { life_balance: 1, stress: -1 } },
      { index: 1, text: 'Some — manageable with occasional worry', weights: { life_balance: 0 } },
      { index: 2, text: 'Significant — financial uncertainty colours my daily experience', weights: { life_balance: -1, stress: 1 } },
      { index: 3, text: 'Severe — financial stress is a major source of suffering', weights: { life_balance: -2, stress: 2, emotional: -1 } },
    ],
  },
  {
    id: 'bal-p08', section: 'Life Balance', dimension: 'life_balance', type: 'single',
    tags: ['balance', 'digital-off'],
    text: 'How often do you take complete breaks from digital devices and connectivity?',
    options: [
      { index: 0, text: 'Daily windows and weekly longer breaks', weights: { life_balance: 2, stress: -1 } },
      { index: 1, text: 'Occasional breaks — a few times per week', weights: { life_balance: 1 } },
      { index: 2, text: 'Rarely — I\'m almost always reachable', weights: { life_balance: -1, stress: 1 } },
      { index: 3, text: 'Never — I feel anxious without connectivity', weights: { life_balance: -2, stress: 2 } },
    ],
  },
  {
    id: 'bal-p09', section: 'Life Balance', dimension: 'life_balance', type: 'single',
    tags: ['balance', 'self-care'],
    text: 'How consistently do you make time for personal self-care?',
    options: [
      { index: 0, text: 'Consistently — it\'s non-negotiable in my schedule', weights: { life_balance: 2, recovery: 1 } },
      { index: 1, text: 'Usually — I manage self-care most weeks', weights: { life_balance: 1 } },
      { index: 2, text: 'Inconsistently — self-care is the first thing to drop', weights: { life_balance: -1 } },
      { index: 3, text: 'Almost never — everyone else comes first', weights: { life_balance: -2, stress: 1, recovery: -1 } },
    ],
  },
  {
    id: 'bal-p10', section: 'Life Balance', dimension: 'life_balance', type: 'single',
    tags: ['balance', 'fulfilment'],
    text: 'At the end of a typical week, how fulfilled and satisfied do you feel overall?',
    options: [
      { index: 0, text: 'Very — I feel like I\'ve lived my week well', weights: { life_balance: 2, purpose: 1, emotional: 1 } },
      { index: 1, text: 'Mostly — a few regrets but generally satisfied', weights: { life_balance: 1 } },
      { index: 2, text: 'Often unsatisfied — weeks feel incomplete or wasted', weights: { life_balance: -1, purpose: -1 } },
      { index: 3, text: 'Depleted and empty — another week I merely survived', weights: { life_balance: -2, purpose: -2, emotional: -1 } },
    ],
  },
]

// ══════════════════════════════════════════════════════════════════════════
// ENERGY — 10 questions
// ══════════════════════════════════════════════════════════════════════════
export const ENERGY_POOL: Question[] = [
  {
    id: 'enr-p01', section: 'Daily Rhythm & Energy', dimension: 'energy', type: 'single',
    tags: ['energy', 'daily-pattern'],
    text: 'How would you describe your natural energy pattern across the day?',
    options: [
      { index: 0, text: 'Consistent and predictable — I know when I\'m sharpest', weights: { energy: 2, sleep: 1 } },
      { index: 1, text: 'Morning-dominant, fading by afternoon', weights: { energy: 1 } },
      { index: 2, text: 'Slow to start but I build momentum through the day', weights: { energy: 0 } },
      { index: 3, text: 'Unpredictable — it shifts significantly day to day', weights: { energy: -1, stress: 1 } },
    ],
  },
  {
    id: 'enr-p02', section: 'Daily Rhythm & Energy', dimension: 'energy', type: 'single',
    tags: ['energy', 'afternoon'],
    text: 'How significant is your post-lunch energy dip?',
    options: [
      { index: 0, text: 'Minimal or none — I stay focused all afternoon', weights: { energy: 2, nutrition: 1 } },
      { index: 1, text: 'Mild — 20–30 minutes of lower energy, then I recover', weights: { energy: 1 } },
      { index: 2, text: 'Significant — I\'m markedly less productive 1–3pm', weights: { energy: -1, nutrition: -1 } },
      { index: 3, text: 'Severe — I struggle to function in the afternoon', weights: { energy: -2, nutrition: -1, sleep: -1 } },
    ],
  },
  {
    id: 'enr-p03', section: 'Daily Rhythm & Energy', dimension: 'energy', type: 'single',
    tags: ['energy', 'evening'],
    text: 'How much energy do you have in the evenings for non-work activities?',
    options: [
      { index: 0, text: 'Good energy for hobbies, socialising, and growth', weights: { energy: 2, life_balance: 1 } },
      { index: 1, text: 'Enough for light activities but not demanding ones', weights: { energy: 1 } },
      { index: 2, text: 'Low — evenings are mostly passive recovery', weights: { energy: -1 } },
      { index: 3, text: 'Exhausted by evening — I just want to be done', weights: { energy: -2, life_balance: -1 } },
    ],
  },
  {
    id: 'enr-p04', section: 'Daily Rhythm & Energy', dimension: 'energy', type: 'single',
    tags: ['energy', 'caffeine'],
    text: 'How dependent are you on caffeine to function or feel energised?',
    options: [
      { index: 0, text: 'Not at all — I could go without caffeine easily', weights: { energy: 2, sleep: 1 } },
      { index: 1, text: 'Mildly — I enjoy coffee but don\'t need it', weights: { energy: 1 } },
      { index: 2, text: 'Moderately — I feel noticeably worse without caffeine', weights: { energy: -1 } },
      { index: 3, text: 'Highly dependent — I need caffeine to feel baseline functional', weights: { energy: -2, sleep: -1 } },
    ],
  },
  {
    id: 'enr-p05', section: 'Daily Rhythm & Energy', dimension: 'energy', type: 'single',
    tags: ['energy', 'peaks'],
    text: 'Do you schedule your most demanding tasks during your peak energy window?',
    options: [
      { index: 0, text: 'Yes — I protect my peak hours for deep work', weights: { energy: 2, purpose: 1 } },
      { index: 1, text: 'Usually — I try to align tasks with energy', weights: { energy: 1 } },
      { index: 2, text: 'Rarely — meetings and interruptions control my day', weights: { energy: -1, stress: 1 } },
      { index: 3, text: 'Never — my schedule is entirely reactive', weights: { energy: -2, stress: 2 } },
    ],
  },
  {
    id: 'enr-p06', section: 'Daily Rhythm & Energy', dimension: 'energy', type: 'single',
    tags: ['energy', 'hydration-energy'],
    text: 'Do you drink enough water throughout the day to support your energy levels?',
    options: [
      { index: 0, text: 'Yes — consistent hydration throughout the day', weights: { energy: 2 } },
      { index: 1, text: 'Mostly — I could drink more but manage', weights: { energy: 1 } },
      { index: 2, text: 'Inconsistently — some days I barely drink water', weights: { energy: -1 } },
      { index: 3, text: 'Poorly — I rarely notice hydration until I feel bad', weights: { energy: -2 } },
    ],
  },
  {
    id: 'enr-p07', section: 'Daily Rhythm & Energy', dimension: 'energy', type: 'single',
    tags: ['energy', 'fatigue-type'],
    text: 'How would you characterise any fatigue you experience?',
    options: [
      { index: 0, text: 'Healthy tiredness at end of a full day', weights: { energy: 2 } },
      { index: 1, text: 'Occasional fatigue after demanding weeks', weights: { energy: 1 } },
      { index: 2, text: 'Persistent low-grade fatigue most days', weights: { energy: -1, sleep: -1 } },
      { index: 3, text: 'Chronic fatigue that significantly limits functioning', weights: { energy: -2, sleep: -1, recovery: -2 } },
    ],
  },
  {
    id: 'enr-p08', section: 'Daily Rhythm & Energy', dimension: 'energy', type: 'single',
    tags: ['energy', 'sunlight'],
    text: 'How much natural light do you get during daylight hours?',
    options: [
      { index: 0, text: 'Plenty — I spend significant time outdoors in daylight', weights: { energy: 2, sleep: 1 } },
      { index: 1, text: 'Some — brief outdoor time most days', weights: { energy: 1 } },
      { index: 2, text: 'Little — I\'m mostly indoors under artificial light', weights: { energy: -1, sleep: -1 } },
      { index: 3, text: 'Almost none — I rarely see natural light on work days', weights: { energy: -2, sleep: -1 } },
    ],
  },
  {
    id: 'enr-p09', section: 'Daily Rhythm & Energy', dimension: 'energy', type: 'single',
    tags: ['energy', 'blood-sugar'],
    text: 'How stable is your blood sugar and energy between meals?',
    options: [
      { index: 0, text: 'Very stable — no crashes or sudden hunger', weights: { energy: 2, nutrition: 1 } },
      { index: 1, text: 'Mostly stable — minor dips occasionally', weights: { energy: 1 } },
      { index: 2, text: 'Unstable — I get hangry or crash between meals', weights: { energy: -1, nutrition: -1 } },
      { index: 3, text: 'Very unstable — significant energy swings tied to eating', weights: { energy: -2, nutrition: -2 } },
    ],
  },
  {
    id: 'enr-p10', section: 'Daily Rhythm & Energy', dimension: 'energy', type: 'single',
    tags: ['energy', 'motivation'],
    text: 'How motivated and energised do you feel about your life right now?',
    options: [
      { index: 0, text: 'Highly motivated — a compelling sense of direction energises me', weights: { energy: 2, purpose: 2 } },
      { index: 1, text: 'Generally motivated — I have engagement most days', weights: { energy: 1, purpose: 1 } },
      { index: 2, text: 'Flat — limited motivation; going through the motions', weights: { energy: -1, purpose: -1 } },
      { index: 3, text: 'Depleted — I struggle to find motivation for anything', weights: { energy: -2, purpose: -2, emotional: -1 } },
    ],
  },
]

// ══════════════════════════════════════════════════════════════════════════
// SELECTION ENGINE
// ══════════════════════════════════════════════════════════════════════════

const ALL_POOLS = {
  sleep:        { pool: SLEEP_POOL,        sample: 3 },
  nutrition:    { pool: NUTRITION_POOL,    sample: 3 },
  movement:     { pool: MOVEMENT_POOL,     sample: 3 },
  stress:       { pool: STRESS_POOL,       sample: 3 },
  recovery:     { pool: RECOVERY_POOL,     sample: 3 },
  emotional:    { pool: EMOTIONAL_POOL,    sample: 3 },
  purpose:      { pool: PURPOSE_POOL,      sample: 3 },
  life_balance: { pool: LIFE_BALANCE_POOL, sample: 3 },
  energy:       { pool: ENERGY_POOL,       sample: 3 },
}

/**
 * Select a fresh set of assessment questions each run.
 * Pass Date.now() for a new random set, or a fixed seed for determinism.
 * Returns ~27 core questions (3 per dimension × 9 dimensions).
 */
export function selectAssessmentQuestions(seed: number = Date.now()): Question[] {
  const selected: Question[] = []
  let dimSeed = seed
  for (const [, { pool, sample }] of Object.entries(ALL_POOLS)) {
    const picked = seededSample(pool, sample, dimSeed)
    selected.push(...picked)
    dimSeed = (dimSeed * 1664525 + 1013904223) & 0xffffffff // LCG advance
  }
  // Shuffle the final list so dimensions don't always appear in the same order
  return seededSample(selected, selected.length, seed ^ 0xdeadbeef)
}
