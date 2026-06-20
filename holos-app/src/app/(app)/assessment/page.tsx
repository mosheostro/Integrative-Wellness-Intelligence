'use client'
import { useState, useCallback, useEffect } from 'react'
import { getInitialQuestions, getNextQuestions } from '@/data/questions/bank'
import { getLocalizedQuestion } from '@/data/questions/bank.i18n'
import type { AssessmentAnswer, Framework, Question, WellnessDimension } from '@/lib/types'
import { FRAMEWORKS_LIST } from '@/frameworks'
import { getLocalizedFramework } from '@/frameworks/frameworks.i18n'
import { useWellnessEngine } from '@/hooks/useWellnessEngine'
import { AnimatedScore, LiveScoreBar } from '@/components/ui/AnimatedScore'
import { useLanguage } from '@/contexts/LanguageContext'

type Phase = 'framework' | 'questions' | 'submitting' | 'done'

const ALL_DIMS: WellnessDimension[] = [
  'nutrition','sleep','recovery','stress','movement',
  'emotional','life_balance','purpose','energy'
]

const DIM_COLORS: Record<WellnessDimension, string> = {
  nutrition:    'oklch(0.65 0.12 80)',
  sleep:        'oklch(0.55 0.15 270)',
  recovery:     'oklch(0.55 0.12 155)',
  stress:       'oklch(0.60 0.12 15)',
  movement:     'oklch(0.60 0.10 30)',
  emotional:    'oklch(0.60 0.12 310)',
  life_balance: 'oklch(0.55 0.10 200)',
  purpose:      'oklch(0.60 0.12 45)',
  energy:       'oklch(0.55 0.12 155)',
}

const DIM_INVERTS: Partial<Record<WellnessDimension, boolean>> = { stress: true }

function getAmbientGradient(composite: number): string {
  if (composite >= 75) return 'linear-gradient(160deg, oklch(0.97 0.03 155 / 0.4) 0%, var(--canvas) 50%, oklch(0.97 0.02 200 / 0.2) 100%)'
  if (composite >= 55) return 'linear-gradient(160deg, var(--canvas) 0%, oklch(0.97 0.02 200 / 0.15) 100%)'
  if (composite < 35)  return 'linear-gradient(160deg, oklch(0.97 0.02 240 / 0.2) 0%, var(--canvas) 100%)'
  return 'var(--canvas)'
}

export default function AssessmentPage() {
  const { strings, locale } = useLanguage()
  const s = strings.assessment
  const dims = strings.dimensions

  const [phase, setPhase]             = useState<Phase>('framework')
  const [framework, setFramework]     = useState<Framework>('swarga')
  const [questions, setQuestions]     = useState<Question[]>(getInitialQuestions())
  const [qIndex, setQIndex]           = useState(0)
  const [answers, setAnswers]         = useState<AssessmentAnswer[]>([])
  const [selected, setSelected]       = useState<number | null>(null)
  const [answeredIds, setAnsweredIds] = useState<Set<string>>(new Set())
  const [error, setError]             = useState('')
  const [showLivePanel, setShowLivePanel] = useState(false)

  const engine = useWellnessEngine(framework, locale)

  const currentQ = questions[qIndex]
  // progress: 0% at question 1, 100% at final question — uses (n-1) denominator so last Q always hits 100%
  const progress = questions.length > 1
    ? Math.round((qIndex / (questions.length - 1)) * 100)
    : 100

  // Dimension labels built from translated strings
  const dimLabels: Record<WellnessDimension, string> = {
    nutrition:    dims.nutrition,
    sleep:        dims.sleep,
    recovery:     dims.recovery,
    stress:       dims.calm,
    movement:     dims.movement,
    emotional:    dims.emotional,
    life_balance: dims.balance,
    purpose:      dims.purpose,
    energy:       dims.energy,
  }

  useEffect(() => {
    if (answers.length >= 1) setShowLivePanel(true)
  }, [answers.length])

  const handleNext = useCallback(() => {
    if (selected === null || !currentQ) return
    const answer: AssessmentAnswer = {
      questionId: currentQ.id,
      optionIndex: selected,
      dimension: currentQ.dimension,
    }
    const newAnswers = [...answers, answer]
    const newAnsweredIds = new Set(answeredIds); newAnsweredIds.add(currentQ.id)

    engine.processAnswer(answer, newAnswers, currentQ.options.length)

    const followUps = getNextQuestions(currentQ.id, selected, newAnsweredIds)
    const nextQuestions = [...questions]
    if (followUps.length > 0) {
      nextQuestions.splice(qIndex + 1, 0, ...followUps)
    }

    setAnswers(newAnswers)
    setAnsweredIds(newAnsweredIds)
    setQuestions(nextQuestions)
    setSelected(null)

    if (qIndex < nextQuestions.length - 1) {
      setQIndex(qIndex + 1)
    } else {
      submitAssessment(newAnswers)
    }
  }, [selected, currentQ, answers, answeredIds, questions, qIndex, engine])

  async function submitAssessment(finalAnswers: AssessmentAnswer[]) {
    setPhase('submitting')
    try {
      const res = await fetch('/api/assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ framework, answers: finalAnswers }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(s.saveFailed)
      window.location.href = `/results/${data.assessmentId}`
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : s.saveFailed)
      setPhase('questions')
    }
  }

  // ── Framework Selection ──────────────────────────────────────
  if (phase === 'framework') {
    return (
      <div className="wrap section-pad" style={{ maxWidth: 860, paddingBottom: 'calc(80px + env(safe-area-inset-bottom, 0px))' }}>
        <div className="section-head">
          <div className="eyebrow"><span style={{ color: 'var(--sage-deep)' }}>◉</span> {s.step1}</div>
          <h1 className="h1" style={{ marginTop: 12 }}>{s.step1Title}</h1>
          <p className="lede" style={{ marginTop: 12 }}>{s.step1Desc}</p>
        </div>

        <div className="grid-2" style={{ gap: 16, marginBottom: 40 }}>
          {FRAMEWORKS_LIST.map(fw => {
            const loc = getLocalizedFramework(fw.id, { label: fw.label, origin: fw.origin, description: fw.description }, locale)
            return (
              <button
                key={fw.id}
                onClick={() => setFramework(fw.id)}
                style={{
                  display: 'flex', alignItems: 'flex-start', gap: 16, padding: 20,
                  border: `2px solid ${framework === fw.id ? 'var(--sage)' : 'var(--line)'}`,
                  borderRadius: 16, background: framework === fw.id ? 'oklch(0.96 0.03 155 / 0.4)' : 'var(--surface)',
                  cursor: 'pointer', textAlign: 'left', transition: 'all .15s',
                }}
              >
                <span style={{ fontSize: 28, lineHeight: 1 }}>{fw.icon}</span>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '.9375rem', color: 'var(--ink)', marginBottom: 4 }}>{loc.label}</div>
                  <div style={{ fontSize: '.8rem', color: 'var(--ink-soft)', lineHeight: 1.5 }}>{loc.origin}</div>
                </div>
                {framework === fw.id && (
                  <span style={{ marginLeft: 'auto', color: 'var(--sage-deep)', fontSize: 18, flexShrink: 0 }}>✓</span>
                )}
              </button>
            )
          })}
        </div>

        <button className="btn btn-primary btn-lg" onClick={() => { engine.reset(); setPhase('questions') }}>
          {s.begin} <span>→</span>
        </button>
      </div>
    )
  }

  // ── Submitting ───────────────────────────────────────────────
  if (phase === 'submitting') {
    return (
      <div style={{
        minHeight: '80dvh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: 32,
        background: getAmbientGradient(engine.liveComposite),
        transition: 'background 1s ease',
      }}>
        <AnimatedScore
          value={engine.liveComposite}
          size="xl"
          color="var(--sage)"
          label={s.calculating}
          duration={1200}
        />
        <div className="spinner" style={{ width: 28, height: 28, borderWidth: 2 }} />
        <p style={{ color: 'var(--ink-soft)', fontSize: '.9rem' }}>
          {s.analysing} {(() => { const fw = FRAMEWORKS_LIST.find(f => f.id === framework); return fw ? getLocalizedFramework(fw.id, { label: fw.label, origin: fw.origin, description: fw.description }, locale).label : framework })()}…
        </p>
      </div>
    )
  }

  // ── Questions ────────────────────────────────────────────────
  if (!currentQ) return null

  return (
    <div style={{
      minHeight: '100dvh',
      background: getAmbientGradient(engine.liveComposite),
      transition: 'background 0.8s ease',
    }}>
      <div style={{
        display: 'flex', gap: 24,
        padding: '80px 24px 40px', maxWidth: 1100,
        margin: '0 auto', alignItems: 'flex-start',
      }}>

        {/* ── Main question column ── */}
        <div style={{ flex: 1, minWidth: 0 }}>

          {/* Progress bar */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: '.68rem',
                textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--ink-faint)',
              }}>
                {s.question} {qIndex + 1}
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.68rem', color: 'var(--ink-faint)' }}>
                {progress}%
              </span>
            </div>
            <div style={{ height: 4, background: 'var(--line)', borderRadius: 2, overflow: 'hidden' }}>
              <div style={{
                height: '100%',
                width: `${progress}%`,
                background: DIM_COLORS[currentQ.dimension] ?? 'var(--sage-deep)',
                borderRadius: 2,
                transition: 'width .4s ease',
              }} />
            </div>
          </div>

          {/* Dimension badge */}
          <div style={{ marginBottom: 20 }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '4px 12px', borderRadius: 100,
              background: (DIM_COLORS[currentQ.dimension] ?? 'var(--sage)') + '22',
              color: DIM_COLORS[currentQ.dimension] ?? 'var(--sage-deep)',
              fontFamily: 'var(--font-mono)', fontSize: '.68rem',
              textTransform: 'uppercase', letterSpacing: '.1em',
            }}>
              ◉ {dimLabels[currentQ.dimension]}
            </span>
          </div>

          {/* Question text — localized */}
          {(() => {
            const locQ = getLocalizedQuestion(
              currentQ.id,
              currentQ.options.map(o => o.text),
              currentQ.text,
              locale,
            )
            return (
              <>
                <h2 style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.25rem, 2.5vw, 1.6rem)',
                  fontWeight: 500, letterSpacing: '-.02em',
                  color: 'var(--ink)', lineHeight: 1.35, marginBottom: 32,
                }}>
                  {locQ.text}
                </h2>

                {/* Options */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
                  {currentQ.options.map((opt, i) => {
                    const isSelected = selected === i
                    const key = ['A', 'B', 'C', 'D', 'E'][i]
                    const optLabel = locQ.options[i] ?? opt.text
                    return (
                      <button
                        key={i}
                        onClick={() => setSelected(i)}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 14,
                          padding: '14px 18px', borderRadius: 'var(--radius-lg)',
                          border: `1.5px solid ${isSelected ? 'var(--sage-deep)' : 'var(--line)'}`,
                          background: isSelected ? 'oklch(0.96 0.03 155 / 0.35)' : 'var(--surface)',
                          cursor: 'pointer', textAlign: 'left',
                          transition: 'all .15s', width: '100%',
                        }}
                      >
                        <span style={{
                          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                          width: 28, height: 28, borderRadius: 6, flexShrink: 0,
                          fontFamily: 'var(--font-mono)', fontSize: '.72rem', fontWeight: 600,
                          background: isSelected ? 'var(--sage-deep)' : 'var(--line)',
                          color: isSelected ? '#fff' : 'var(--ink-soft)',
                          transition: 'all .15s',
                        }}>
                          {key}
                        </span>
                        <span style={{
                          fontFamily: 'var(--font-body)', fontSize: '.92rem',
                          color: isSelected ? 'var(--ink)' : 'var(--ink-soft)',
                          fontWeight: isSelected ? 500 : 400, lineHeight: 1.4,
                        }}>
                          {optLabel}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </>
            )
          })()}

          {/* Error */}
          {error && (
            <div style={{
              marginBottom: 16, padding: '12px 16px', borderRadius: 'var(--radius)',
              background: 'oklch(0.97 0.03 15 / 0.5)',
              border: '1px solid oklch(0.70 0.10 15)',
              color: 'oklch(0.40 0.10 15)',
              fontFamily: 'var(--font-body)', fontSize: '.88rem',
            }}>
              {error}
            </div>
          )}

          {/* Continue / Submit */}
          <button
            onClick={handleNext}
            disabled={selected === null}
            style={{
              padding: '12px 28px', borderRadius: 'var(--radius)',
              background: selected !== null ? 'var(--sage-deep)' : 'var(--line)',
              color: '#fff', fontFamily: 'var(--font-body)',
              fontWeight: 600, fontSize: '.92rem',
              border: 'none',
              cursor: selected !== null ? 'pointer' : 'default',
              transition: 'background .15s',
              display: 'inline-flex', alignItems: 'center', gap: 8,
            }}
          >
            {qIndex < questions.length - 1 ? s.continue : s.complete}
            <span aria-hidden>→</span>
          </button>
        </div>

        {/* ── Live score panel (appears after first answer) ── */}
        {showLivePanel && (
          <div
            className="site-nav-desktop"
            style={{
              width: 240, flexShrink: 0,
              background: 'var(--surface)', border: '1px solid var(--line)',
              borderRadius: 'var(--radius-lg)', padding: '24px 20px',
              position: 'sticky', top: 88,
            }}
          >
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
              <AnimatedScore
                value={engine.liveComposite}
                size="lg"
                color="var(--sage-deep)"
                label={s.liveEstimate}
                duration={600}
              />
            </div>

            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: '.62rem',
              textTransform: 'uppercase', letterSpacing: '.1em',
              color: 'var(--ink-faint)', marginBottom: 14, textAlign: 'center',
            }}>
              {s.livePreview}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {ALL_DIMS.map(dim => {
                const rawScore = engine.partialScores[dim]
                if (rawScore === undefined) return null
                return (
                  <LiveScoreBar
                    key={dim}
                    label={dimLabels[dim]}
                    value={Math.round(rawScore)}
                    color={DIM_COLORS[dim]}
                    invert={DIM_INVERTS[dim] ?? false}
                  />
                )
              })}
            </div>

            {engine.lastComment && (
              <div style={{
                marginTop: 16, padding: '10px 12px',
                background: 'var(--canvas2)', borderRadius: 'var(--radius)',
                fontFamily: 'var(--font-body)', fontSize: '.78rem',
                color: 'var(--ink-soft)', lineHeight: 1.5,
                fontStyle: 'italic',
              }}>
                {engine.lastComment}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
