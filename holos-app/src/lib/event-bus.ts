// ============================================================
// HOLOS — Wellness Event Bus
// Type-safe publish/subscribe system for engine events.
// Decouples scoring, UI, and persistence layers.
// ============================================================

import type { AssessmentAnswer, DimensionScores, WellnessState, Framework } from './types'
import type { BehavioralProfile, LayeredScoreResult } from '@/engine/multi-layer-engine'

// ── Event Definitions ────────────────────────────────────────

export type WellnessEventMap = {
  ANSWER_SUBMITTED: {
    questionId: string
    dimension: string
    optionIndex: number
    answeredCount: number
    totalQuestions: number
  }
  SCORE_UPDATED: {
    partial: Partial<DimensionScores>
    composite: number
    answeredCount: number
  }
  ASSESSMENT_COMPLETE: {
    answers: AssessmentAnswer[]
    framework: Framework
    layeredResult: LayeredScoreResult
  }
  STATE_CHANGED: {
    previous: WellnessState | null
    current: WellnessState
    scores: DimensionScores
  }
  FRAMEWORK_SWITCHED: {
    from: Framework
    to: Framework
  }
  RECALCULATION_STARTED: {
    trigger: 'answer' | 'framework_change' | 'time_update'
  }
  RECALCULATION_COMPLETE: {
    result: LayeredScoreResult
    durationMs: number
  }
  RECOMMENDATION_GENERATED: {
    count: number
    topCategory: string
  }
  PROFILE_LOADED: {
    hasAssessment: boolean
    lastAssessmentDate: string | null
  }
  BEHAVIORAL_PATTERN_DETECTED: {
    pattern: string
    profile: BehavioralProfile
  }
}

export type WellnessEventName = keyof WellnessEventMap
export type WellnessEventPayload<T extends WellnessEventName> = WellnessEventMap[T]

type EventHandler<T extends WellnessEventName> = (payload: WellnessEventPayload<T>) => void
type AnyHandler = (payload: unknown) => void

// ── Event Bus Implementation ─────────────────────────────────

class WellnessEventBus {
  private handlers: Map<string, Set<AnyHandler>> = new Map()
  private eventLog: Array<{ event: string; payload: unknown; ts: number }> = []
  private maxLogSize = 100

  subscribe<T extends WellnessEventName>(
    event: T,
    handler: EventHandler<T>
  ): () => void {
    if (!this.handlers.has(event)) {
      this.handlers.set(event, new Set())
    }
    this.handlers.get(event)!.add(handler as AnyHandler)

    // Return unsubscribe function
    return () => {
      this.handlers.get(event)?.delete(handler as AnyHandler)
    }
  }

  publish<T extends WellnessEventName>(event: T, payload: WellnessEventPayload<T>): void {
    // Log event (ring buffer)
    this.eventLog.push({ event, payload, ts: Date.now() })
    if (this.eventLog.length > this.maxLogSize) {
      this.eventLog.shift()
    }

    // Dispatch to all subscribers
    const eventHandlers = this.handlers.get(event)
    if (!eventHandlers) return
    for (const handler of eventHandlers) {
      try {
        handler(payload)
      } catch (err) {
        console.error(`[EventBus] Handler error for ${event}:`, err)
      }
    }
  }

  once<T extends WellnessEventName>(
    event: T,
    handler: EventHandler<T>
  ): () => void {
    const wrapped: EventHandler<T> = (payload) => {
      handler(payload)
      unsub()
    }
    const unsub = this.subscribe(event, wrapped)
    return unsub
  }

  getLog(): Array<{ event: string; payload: unknown; ts: number }> {
    return [...this.eventLog]
  }

  clearLog(): void {
    this.eventLog = []
  }

  getSubscriberCount(event: WellnessEventName): number {
    return this.handlers.get(event)?.size ?? 0
  }
}

// ── Singleton ────────────────────────────────────────────────
// One bus for the entire app session.

export const wellnessBus = new WellnessEventBus()

// ── Convenience hooks ────────────────────────────────────────
// These are simple helper functions, not React hooks.

export function publishAnswer(
  questionId: string,
  dimension: string,
  optionIndex: number,
  answeredCount: number,
  totalQuestions: number
): void {
  wellnessBus.publish('ANSWER_SUBMITTED', {
    questionId,
    dimension,
    optionIndex,
    answeredCount,
    totalQuestions,
  })
}

export function publishScoreUpdate(
  partial: Partial<DimensionScores>,
  composite: number,
  answeredCount: number
): void {
  wellnessBus.publish('SCORE_UPDATED', { partial, composite, answeredCount })
}
