// ============================================================
// HOLOS — Core TypeScript types
// ============================================================

export type WellnessDimension =
  | 'nutrition' | 'sleep' | 'recovery' | 'stress'
  | 'movement' | 'emotional' | 'life_balance' | 'purpose' | 'energy'

export type WellnessState =
  | 'BALANCED'
  | 'SLEEP_DEFICIT'
  | 'STRESS_DOMINANT'
  | 'LOW_RECOVERY'
  | 'HIGH_PERFORMANCE'
  | 'INFLAMMATORY_PATTERN'
  | 'ENERGY_IMBALANCE'
  | 'LIFESTYLE_IMPROVEMENT'
  | 'MAINTENANCE'
  | 'OPTIMIZATION'

export type Framework =
  | 'evidence-based'
  | 'rambam'
  | 'hippocrates'
  | 'avicenna'
  | 'ayurveda'
  | 'daoist'
  | 'tibetan'
  | 'swarga'

export type RecommendationCategory =
  | 'nutrition' | 'hydration' | 'sleep' | 'movement'
  | 'recovery' | 'stress' | 'mindfulness' | 'relationships'
  | 'purpose' | 'environment'

// ── Scores ────────────────────────────────────────────────────
export interface DimensionScores {
  nutrition:    number  // 0-100
  sleep:        number
  recovery:     number
  stress:       number  // 0-100, higher = MORE stressed (inverted for display)
  movement:     number
  emotional:    number
  life_balance: number
  purpose:      number
  energy:       number
  composite:    number
}

// ── Questionnaire ─────────────────────────────────────────────
export type QuestionType = 'single' | 'scale' | 'multi'

export interface QuestionOption {
  index: number
  text:  string
  // How this option contributes to each dimension (-2 to +2)
  weights: Partial<Record<WellnessDimension, number>>
}

export interface Question {
  id:          string
  section:     string
  dimension:   WellnessDimension
  text:        string
  type:        QuestionType
  options:     QuestionOption[]
  // Branching: show this question only if condition met
  showIf?:     { questionId: string; optionIndex: number[] }
  // Tags for adaptive follow-up logic
  tags?:       string[]
}

export interface AssessmentAnswer {
  questionId:  string
  optionIndex: number | number[]
  dimension:   WellnessDimension
}

// ── Rules engine ──────────────────────────────────────────────
export type ConditionOperator = '<' | '>' | '<=' | '>=' | '==' | 'between' | 'state_is'

export interface RuleCondition {
  dimension?:     WellnessDimension
  state?:         WellnessState
  operator:       ConditionOperator
  value?:         number
  range?:         [number, number]
  stateValue?:    WellnessState
}

export type ActionType =
  | 'set_state'
  | 'add_category'
  | 'boost_category'
  | 'set_priority'
  | 'add_tag'

export interface RuleAction {
  type:      ActionType
  payload:   string | number | string[] | Record<string, unknown>
}

export interface Rule {
  id:          string
  name:        string
  frameworks:  Framework[]    // '*' = all frameworks
  conditions:  RuleCondition[] // AND-joined
  actions:     RuleAction[]
  priority:    number        // higher = evaluated first
  description: string
}

// ── Recommendations ───────────────────────────────────────────
export interface Recommendation {
  id:                   string
  category:             RecommendationCategory
  title:                string
  description:          string
  impact_score:         number  // 0-100: how much it moves the needle
  difficulty_score:     number  // 0-100: how hard to implement
  time_minutes?:        number
  evidence_level?:      'strong' | 'moderate' | 'traditional'
  tags:                 string[]
  framework_weights:    Partial<Record<Framework, number>>  // relevance per framework
  contraindications?:   string[]
}

// ── Engine output ─────────────────────────────────────────────
export interface EngineResult {
  scores:           DimensionScores
  state:            WellnessState
  stateLabel:       string
  stateDescription: string
  triggeredRules:   Rule[]
  priorityCategories: RecommendationCategory[]
  recommendations:  Recommendation[]
  frameworkResult:  FrameworkResult
}

export interface FrameworkResult {
  framework:      Framework
  label:          string
  narrative:      string
  // Ayurveda / Swarga
  dosha?: {
    vata:   number
    pitta:  number
    kapha:  number
    dominant: string
  }
  // Daoist / TCM
  elements?: {
    wood:  number
    fire:  number
    earth: number
    metal: number
    water: number
  }
  // Swarga
  swarga?: {
    physicalBody:    number
    vitalEnergy:     number
    emotionalHarmony: number
    mentalClarity:   number
    relationships:   number
    purpose:         number
    lifeDirection:   number
    environment:     number
  }
  customDimensions?: Record<string, number>
}

// ── Gamification ──────────────────────────────────────────────
export interface Achievement {
  id:          string
  title:       string
  description: string
  icon:        string
  category:    string
  xp:          number
  condition:   (profile: UserGameProfile) => boolean
}

export interface UserGameProfile {
  totalXP:      number
  level:        number
  streaks:      Record<string, number>
  assessmentCount: number
  habitCompletions: number
  earnedAchievements: string[]
}

// ── DB row shapes (mirrors Supabase tables) ───────────────────
export interface DbProfile {
  id: string; email: string; full_name: string | null
  role: string; locale: string; timezone: string; onboarded: boolean
  created_at: string; updated_at: string
}

export interface DbAssessment {
  id: string; user_id: string; framework: Framework
  status: 'in_progress' | 'completed' | 'abandoned'
  wellness_state: WellnessState | null; composite_score: number | null
  started_at: string; completed_at: string | null; version: number
}

export interface DbDimensionScores extends DimensionScores {
  id: string; assessment_id: string; user_id: string
  framework: Framework; recorded_at: string
}
