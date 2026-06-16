'use client'
// ============================================================
// HOLOS — useWellnessEngine Hook
// Main reactive hook for scoring during live assessment.
// Computes partial scores as answers arrive and publishes events.
// ============================================================

import { useState, useCallback, useRef } from 'react'
import type { AssessmentAnswer, DimensionScores, Framework, WellnessDimension } from '@/lib/types'
import { layer1_rawNormalization, determineWellnessState } from '@/engine/multi-layer-engine'
import { wellnessBus } from '@/lib/event-bus'
import { getLiveAssessmentComment } from '@/engine/narrative-engine'

const DIMS: WellnessDimension[] = [
  'nutrition','sleep','recovery','stress','movement',
  'emotional','life_balance','purpose','energy'
]

interface LiveEngineState {
  partialScores: Partial<DimensionScores>
  liveComposite: number
  lastComment: string
  dimensionsCovered: Set<WellnessDimension>
  calculationCount: number
}

export function useWellnessEngine(framework: Framework) {
  const [engineState, setEngineState] = useState<LiveEngineState>({
    partialScores: {},
    liveComposite: 50,
    lastComment: '',
    dimensionsCovered: new Set(),
    calculationCount: 0,
  })

  const answersRef = useRef<AssessmentAnswer[]>([])
  const calcTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const processAnswer = useCallback((
    answer: AssessmentAnswer,
    allAnswers: AssessmentAnswer[],
    questionOptions: number
  ) => {
    answersRef.current = allAnswers

    // Clear any pending debounced calculation
    if (calcTimeoutRef.current) clearTimeout(calcTimeoutRef.current)

    // Generate live comment for this answer
    const comment = getLiveAssessmentComment(
      answer.dimension as WellnessDimension,
      Array.isArray(answer.optionIndex) ? answer.optionIndex[0] : answer.optionIndex,
      questionOptions
    )

    // Debounce the score calculation (50ms) to avoid thrashing
    calcTimeoutRef.current = setTimeout(() => {
      wellnessBus.publish('RECALCULATION_STARTED', { trigger: 'answer' })
      const start = performance.now()

      // Layer 1 only for live preview (fast, no cascade effects to avoid confusing UI)
      const raw = layer1_rawNormalization(allAnswers)

      // Compute partial composite from what we have
      const coveredDims = new Set(allAnswers.map(a => a.dimension as WellnessDimension))
      const coveredScores = DIMS.filter(d => coveredDims.has(d)).map(d => raw[d])
      const partialComposite = coveredScores.length > 0
        ? Math.round(coveredScores.reduce((a, b) => a + b, 0) / coveredScores.length)
        : 50

      setEngineState(prev => ({
        ...prev,
        partialScores: raw,
        liveComposite: partialComposite,
        lastComment: comment,
        dimensionsCovered: coveredDims,
        calculationCount: prev.calculationCount + 1,
      }))

      wellnessBus.publish('SCORE_UPDATED', {
        partial: raw,
        composite: partialComposite,
        answeredCount: allAnswers.length,
      })

      const duration = performance.now() - start
      wellnessBus.publish('RECALCULATION_COMPLETE', {
        result: {
          raw,
          behavioral: raw,
          tradition: raw,
          evidence: raw,
          temporal: raw,
          final: { ...raw, composite: partialComposite } as DimensionScores,
          behavioral_profile: {
            contradictions: [],
            consistencyScore: 80,
            extremeBias: 0,
            dominantConcern: null,
            patternLabel: 'Assessing...',
          },
          temporal_context: {
            hourOfDay: new Date().getHours(),
            season: 'summer',
            dayOfWeek: new Date().getDay(),
            isWeekend: [0,6].includes(new Date().getDay()),
            circadianPhase: 'morning',
          },
          uncertainty_seed: 42,
        },
        durationMs: duration,
      })
    }, 50)
  }, [])

  const reset = useCallback(() => {
    if (calcTimeoutRef.current) clearTimeout(calcTimeoutRef.current)
    answersRef.current = []
    setEngineState({
      partialScores: {},
      liveComposite: 50,
      lastComment: '',
      dimensionsCovered: new Set(),
      calculationCount: 0,
    })
  }, [])

  return {
    partialScores: engineState.partialScores,
    liveComposite: engineState.liveComposite,
    lastComment: engineState.lastComment,
    dimensionsCovered: engineState.dimensionsCovered,
    calculationCount: engineState.calculationCount,
    processAnswer,
    reset,
  }
}

// ── Score interpolation helper ────────────────────────────────
// Used by AnimatedScore to produce smooth transitions

export function interpolateScore(from: number, to: number, t: number): number {
  // Ease-in-out cubic
  const ease = t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2
  return Math.round(from + (to - from) * ease)
}
