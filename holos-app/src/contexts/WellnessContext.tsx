'use client'
// ============================================================
// HOLOS — Global Wellness Context
// Provides reactive wellness state to the entire app tree.
// Assessment, dashboard, and coaching all read from here.
// ============================================================

import {
  createContext, useContext, useReducer, useEffect,
  useCallback, useRef, type ReactNode,
} from 'react'
import type { AssessmentAnswer, DimensionScores, WellnessState, Framework } from '@/lib/types'
import type { BehavioralProfile, LayeredScoreResult } from '@/engine/multi-layer-engine'
import { wellnessBus } from '@/lib/event-bus'

// ── State Shape ──────────────────────────────────────────────

export interface WellnessContextState {
  // Assessment
  framework: Framework
  answers: AssessmentAnswer[]
  isAssessing: boolean
  assessmentProgress: number   // 0-100

  // Scores (live — update as answers come in)
  liveScores: Partial<DimensionScores>
  liveComposite: number        // 0-100, updates per answer
  fullResult: LayeredScoreResult | null

  // Wellness state
  wellnessState: WellnessState | null
  behavioralProfile: BehavioralProfile | null

  // Ambient state (drives UI color/animation)
  ambientMode: 'calm' | 'active' | 'depleted' | 'stressed' | 'thriving'

  // UI flags
  isCalculating: boolean
  lastUpdated: number | null
}

// ── Actions ──────────────────────────────────────────────────

type Action =
  | { type: 'SET_FRAMEWORK'; framework: Framework }
  | { type: 'START_ASSESSMENT' }
  | { type: 'SUBMIT_ANSWER'; answer: AssessmentAnswer; progress: number }
  | { type: 'UPDATE_LIVE_SCORES'; scores: Partial<DimensionScores>; composite: number }
  | { type: 'SET_FULL_RESULT'; result: LayeredScoreResult; state: WellnessState }
  | { type: 'SET_CALCULATING'; value: boolean }
  | { type: 'RESET_ASSESSMENT' }
  | { type: 'LOAD_SAVED_STATE'; partial: Partial<WellnessContextState> }

// ── Ambient Mode Derivation ───────────────────────────────────

function deriveAmbientMode(
  state: WellnessState | null,
  composite: number
): WellnessContextState['ambientMode'] {
  if (!state) return 'calm'
  if (state === 'HIGH_PERFORMANCE' || composite >= 80) return 'thriving'
  if (state === 'STRESS_DOMINANT') return 'stressed'
  if (state === 'SLEEP_DEFICIT' || state === 'LOW_RECOVERY' || state === 'ENERGY_IMBALANCE') return 'depleted'
  if (state === 'BALANCED' || state === 'OPTIMIZATION') return 'active'
  return 'calm'
}

// ── Reducer ───────────────────────────────────────────────────

const initialState: WellnessContextState = {
  framework: 'swarga',
  answers: [],
  isAssessing: false,
  assessmentProgress: 0,
  liveScores: {},
  liveComposite: 50,
  fullResult: null,
  wellnessState: null,
  behavioralProfile: null,
  ambientMode: 'calm',
  isCalculating: false,
  lastUpdated: null,
}

function reducer(state: WellnessContextState, action: Action): WellnessContextState {
  switch (action.type) {
    case 'SET_FRAMEWORK':
      return { ...state, framework: action.framework }

    case 'START_ASSESSMENT':
      return { ...state, isAssessing: true, answers: [], liveScores: {}, liveComposite: 50, assessmentProgress: 0 }

    case 'SUBMIT_ANSWER':
      return {
        ...state,
        answers: [...state.answers, action.answer],
        assessmentProgress: action.progress,
      }

    case 'UPDATE_LIVE_SCORES':
      return {
        ...state,
        liveScores: { ...state.liveScores, ...action.scores },
        liveComposite: action.composite,
        lastUpdated: Date.now(),
      }

    case 'SET_FULL_RESULT': {
      const ambientMode = deriveAmbientMode(action.state, action.result.final.composite ?? 50)
      return {
        ...state,
        fullResult: action.result,
        liveScores: action.result.final,
        liveComposite: action.result.final.composite ?? 50,
        wellnessState: action.state,
        behavioralProfile: action.result.behavioral_profile,
        ambientMode,
        isAssessing: false,
        isCalculating: false,
        lastUpdated: Date.now(),
      }
    }

    case 'SET_CALCULATING':
      return { ...state, isCalculating: action.value }

    case 'RESET_ASSESSMENT':
      return { ...initialState, framework: state.framework }

    case 'LOAD_SAVED_STATE':
      return { ...state, ...action.partial }

    default:
      return state
  }
}

// ── Context ───────────────────────────────────────────────────

interface WellnessContextValue {
  state: WellnessContextState
  setFramework: (fw: Framework) => void
  startAssessment: () => void
  submitAnswer: (answer: AssessmentAnswer, progress: number) => void
  updateLiveScores: (scores: Partial<DimensionScores>, composite: number) => void
  setFullResult: (result: LayeredScoreResult, wellnessState: WellnessState) => void
  resetAssessment: () => void
}

const WellnessContext = createContext<WellnessContextValue | null>(null)

// ── Provider ──────────────────────────────────────────────────

export function WellnessProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const prevState = useRef<WellnessState | null>(null)

  // Wire event bus subscriptions
  useEffect(() => {
    const unsub1 = wellnessBus.subscribe('SCORE_UPDATED', ({ partial, composite }) => {
      dispatch({ type: 'UPDATE_LIVE_SCORES', scores: partial, composite })
    })

    const unsub2 = wellnessBus.subscribe('RECALCULATION_STARTED', () => {
      dispatch({ type: 'SET_CALCULATING', value: true })
    })

    const unsub3 = wellnessBus.subscribe('RECALCULATION_COMPLETE', ({ result }) => {
      dispatch({ type: 'SET_CALCULATING', value: false })
    })

    const unsub4 = wellnessBus.subscribe('STATE_CHANGED', ({ current, previous }) => {
      if (current !== previous) {
        prevState.current = previous
      }
    })

    return () => { unsub1(); unsub2(); unsub3(); unsub4() }
  }, [])

  const setFramework = useCallback((fw: Framework) => {
    dispatch({ type: 'SET_FRAMEWORK', framework: fw })
    wellnessBus.publish('FRAMEWORK_SWITCHED', { from: state.framework, to: fw })
  }, [state.framework])

  const startAssessment = useCallback(() => {
    dispatch({ type: 'START_ASSESSMENT' })
  }, [])

  const submitAnswer = useCallback((answer: AssessmentAnswer, progress: number) => {
    dispatch({ type: 'SUBMIT_ANSWER', answer, progress })
    wellnessBus.publish('ANSWER_SUBMITTED', {
      questionId: answer.questionId,
      dimension: answer.dimension,
      optionIndex: Array.isArray(answer.optionIndex) ? answer.optionIndex[0] : answer.optionIndex,
      answeredCount: state.answers.length + 1,
      totalQuestions: Math.round(100 / Math.max(1, progress)),
    })
  }, [state.answers.length])

  const updateLiveScores = useCallback((scores: Partial<DimensionScores>, composite: number) => {
    dispatch({ type: 'UPDATE_LIVE_SCORES', scores, composite })
  }, [])

  const setFullResult = useCallback((result: LayeredScoreResult, wellnessState: WellnessState) => {
    dispatch({ type: 'SET_FULL_RESULT', result, state: wellnessState })
    wellnessBus.publish('STATE_CHANGED', {
      previous: prevState.current,
      current: wellnessState,
      scores: result.final,
    })
    wellnessBus.publish('ASSESSMENT_COMPLETE', {
      answers: state.answers,
      framework: state.framework,
      layeredResult: result,
    })
  }, [state.answers, state.framework])

  const resetAssessment = useCallback(() => {
    dispatch({ type: 'RESET_ASSESSMENT' })
  }, [])

  return (
    <WellnessContext.Provider value={{
      state,
      setFramework,
      startAssessment,
      submitAnswer,
      updateLiveScores,
      setFullResult,
      resetAssessment,
    }}>
      {children}
    </WellnessContext.Provider>
  )
}

// ── Hook ──────────────────────────────────────────────────────

export function useWellness(): WellnessContextValue {
  const ctx = useContext(WellnessContext)
  if (!ctx) throw new Error('useWellness must be used within WellnessProvider')
  return ctx
}

// ── Ambient CSS Variables Injector ───────────────────────────
// Component that keeps CSS variables in sync with ambient mode.

const AMBIENT_VARS: Record<WellnessContextState['ambientMode'], Record<string, string>> = {
  calm:      { '--ambient-hue': '155', '--ambient-sat': '20%', '--ambient-speed': '1.2s' },
  active:    { '--ambient-hue': '200', '--ambient-sat': '30%', '--ambient-speed': '0.9s' },
  thriving:  { '--ambient-hue': '140', '--ambient-sat': '35%', '--ambient-speed': '0.7s' },
  stressed:  { '--ambient-hue': '15',  '--ambient-sat': '40%', '--ambient-speed': '0.5s' },
  depleted:  { '--ambient-hue': '240', '--ambient-sat': '15%', '--ambient-speed': '1.8s' },
}

export function AmbientModeInjector() {
  const { state } = useWellness()
  useEffect(() => {
    const vars = AMBIENT_VARS[state.ambientMode]
    for (const [key, val] of Object.entries(vars)) {
      document.documentElement.style.setProperty(key, val)
    }
  }, [state.ambientMode])
  return null
}
