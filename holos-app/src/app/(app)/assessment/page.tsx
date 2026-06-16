'use client'
import { useState, useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getInitialQuestions, getNextQuestions } from '@/data/questions/bank'
import type { AssessmentAnswer, Framework, Question, WellnessDimension } from '@/lib/types'
import { FRAMEWORKS_LIST } from '@/frameworks'
import { useWellnessEngine } from '@/hooks/useWellnessEngine'
import { AnimatedScore, LiveScoreBar } from '@/components/ui/AnimatedScore'

type Phase = 'framework' | 'questions' | 'submitting' | 'done'

// ── Dimension display config ─────────────────────────────────
const DIM_CONFIG: Record<WellnessDimension, { label: string; color: string; invert?: boolean }> = {
  nutrition:    { label: 'Nutrition',  color: 'oklch(0.65 0.12 80)'  },
  sleep:        { label: 'Sleep',      color: 'oklch(0.55 0.15 270)' },
  recovery:     { label: 'Recovery',   color: 'oklch(0.55 0.12 155)' },
  stress:       { label: 'Calm',       color: 'oklch(0.60 0.12 15)',  invert: true },
  movement:     { label: 'Movement',   color: 'oklch(0.60 0.10 30)'  },
  emotional:    { label: 'Emotional',  color: 'oklch(0.60 0.12 310)' },
  life_balance: { label: 'Balance',    color: 'oklch(0.55 0.10 200)' },
  purpose:      { label: 'Purpose',    color: 'oklch(0.60 0.12 45)'  },
  energy:       { label: 'Energy',     color: 'oklch(0.55 0.12 155)' },
}

const ALL_DIMS: WellnessDimension[] = [
  'nutrition','sleep','recovery','stress','movement',
  'emotional','life_balance','purpose','energy'
]

// ── Ambient background per composite score ───────────────────
function getAmbientGradient(composite: number): string {
  if (composite >= 75) return 'linear-gradient(160deg, oklch(0.97 0.03 155 / 0.4) 0%, var(--canvas) 50%, oklch(0.97 0.02 200 / 0.2) 100%)'
  if (composite >= 55) return 'linear-gradient(160deg, var(--canvas) 0%, oklch(0.97 0.02 200 / 0.15) 100%)'
  if (composite < 35)  return 'linear-gradient(160deg, oklch(0.97 0.02 240 / 0.2) 0%, var(--canvas) 100%)'
  return 'var(--canvas)'
}

export default function AssessmentPage() {
  const router = useRouter()
  const [phase, setPhase] = useState<Phase>('framework')
  const [framework, setFramework] = useState<Framework>('swarga')
  const [questions, setQuestions] = useState<Question[]>(getInitialQuestions())
  const [qIndex, setQIndex] = useState(0)
  const [answers, setAnswers] = useState<AssessmentAnswer[]>([])
  const [selected, setSelected] = useState<number | null>(null)
  const [answeredIds, setAnsweredIds] = useState<Set<string>>(new Set())
  const [error, setError] = useState('')
  const [showLivePanel, setShowLivePanel] = useState(false)

  // Live scoring engine
  const engine = useWellnessEngine(framework)

  const currentQ = questions[qIndex]
  const progress = questions.length > 0 ? Math.round(((qIndex) / questions.length) * 100) : 0

  // Show live panel after first answer
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

    // Process answer through live engine (non-blocking)
    engine.processAnswer(answer, newAnswers, currentQ.options.length)

    // Adaptive branching
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
      if (!res.ok) throw new Error(data.error)
      router.push(`/results/${data.assessmentId}`)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Something went wrong')
      setPhase('questions')
    }
  }

  // ── Framework Selection ──────────────────────────────────────
  if (phase === 'framework') {
    return (
      <div className="wrap section-pad" style={{ maxWidth: 860 }}>
        <div className="section-head">
          <div className="eyebrow"><span style={{ color: 'var(--sage)' }}>◉</span> Step 1 of 2 — Choose your lens</div>
          <h1 className="h1" style={{ marginTop: 12 }}>Which wisdom tradition<br />should interpret your results?</h1>
          <p className="lede" style={{ marginTop: 12 }}>Each framework analyses the same answers differently. You can re-assess under a different tradition at any time.</p>
        </div>

        <div className="grid-2" style={{ gap: 16, marginBottom: 40 }}>
          {FRAMEWORKS_LIST.map(fw => (
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
                <div style={{ fontWeight: 600, fontSize: '.9375rem', color: 'var(--ink)', marginBottom: 4 }}>{fw.label}</div>
                <div style={{ fontSize: '.8rem', color: 'var(--ink-soft)', lineHeight: 1.5 }}>{fw.origin}</div>
              </div>
              {framework === fw.id && (
                <span style={{ marginLeft: 'auto', color: 'var(--sage)', fontSize: 18, flexShrink: 0 }}>✓</span>
              )}
            </button>
          ))}
        </div>

        <button className="btn btn-primary btn-lg" onClick={() => { engine.reset(); setPhase('questions') }}>
          Begin assessment <span>→</span>
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
        {/* Large animated composite */}
        <AnimatedScore
          value={engine.liveComposite}
          size="xl"
          color="var(--sage)"
          label="Calculating your score"
          duration={1200}
        />
        <div className="spinner" style={{ width: 28, height: 28, borderWidth: 2 }} />
        <p style={{ color: 'var(--ink-soft)', fontSize: '.9rem' }}>
          Analysing your responses across {FRAMEWORKS_LIST.find(f => f.id === framework)?.label}…
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
        display: 'flex',
        gap: 24,
        padding: '80px 24px 40px',
        maxWidth: 1100,
        margin: '0 auto',
        alignItems: 'flex-start',
      }}>

        {/* ── Main question column ── */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Progress */}
          <div style={{ marginBottom: 32 }}>
            <div className="eyebrow" style={{ marginBottom: 10 }}>
              <span style={{ color: 'var(--sage)' }}>◉</span>
              {currentQ.section} · {qIndex + 1} of {questions.length}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div className="progress-track" style={{ flex: 1, height: 3 }}>
                <div className="progress-fill" style={{ width: `${progress}%`, background: 'var(--sage)', transition: 'width 0.3s ease' }} />
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-faint)', minWidth: 30 }}>
                {progress}%
              </span>
            </div>
          </div>

          {/* Question card */}
          <div className="card" style={{ padding: '32px', marginBottom: 24 }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', lineHeight: 1.35, marginBottom: 28, color: 'var(--ink)' }}>
              {currentQ.text}
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {currentQ.options.map((opt) => (
                <button
                  key={opt.index}
                  className={`opt-btn${selected === opt.index ? ' selected' : ''}`}
                  onClick={() => setSelected(opt.index)}
                >
                  <span className="opt-key">{String.fromCharCode(65 + opt.index)}</span>
                  <span>{opt.text}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Live comment from engine */}
          {engine.lastComment && selected !== null && (
            <div style={{
              padding: '12px 16px',
              background: 'oklch(0.96 0.03 155 / 0.35)',
              borderLeft: '3px solid var(--sage)',
              borderRadius: '0 8px 8px 0',
              marginBottom: 20,
              animation: 'fadeIn 0.3s ease',
            }}>
              <p style={{ fontSize: '.83rem', color: 'var(--ink-soft)', lineHeight: 1.6, margin: 0 }}>
                {engine.lastComment}
              </p>
            </div>
          )}

          {/* Controls */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="badge badge-sage">
              <span>◆</span> Adaptive · your answers shape what follows
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button
                className="btn btn-ghost btn-sm"
                disabled={qIndex === 0}
                onClick={() => { setQIndex(Math.max(0, qIndex - 1)); setSelected(null) }}
              >
                Back
              </button>
              <button
                className="btn btn-sage btn-sm"
                disabled={selected === null}
                onClick={handleNext}
              >
                {qIndex === questions.length - 1 ? 'Complete' : 'Continue'} <span>→</span>
              </button>
            </div>
          </div>

          {error && <p style={{ color: 'var(--rose)', marginTop: 16, textAlign: 'center' }}>{error}</p>}
        </div>

        {/* ── Live score panel (right column, appears after first answer) ── */}
        {showLivePanel && (
          <div style={{
            width: 220,
            flexShrink: 0,
            position: 'sticky',
            top: 88,
            display: 'flex',
            flexDirection: 'column',
            gap: 0,
          }}>
            <div className="card" style={{ padding: '20px 18px' }}>
              {/* Composite */}
              <div style={{ textAlign: 'center', marginBottom: 20, paddingBottom: 16, borderBottom: '1px solid var(--line)' }}>
                <div style={{ fontSize: '.65rem', fontFamily: 'var(--font-mono)', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--ink-faint)', marginBottom: 8 }}>
                  Live estimate
                </div>
                <AnimatedScore
                  value={engine.liveComposite}
                  size="lg"
                  color="var(--sage)"
                  suffix="/100"
                  duration={400}
                />
              </div>

              {/* Dimension bars */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {ALL_DIMS.map(dim => {
                  const cfg = DIM_CONFIG[dim]
                  const val = engine.partialScores[dim]
                  return (
                    <LiveScoreBar
                      key={dim}
                      label={cfg.label}
                      value={val}
                      color={cfg.color}
                      invert={cfg.invert}
                    />
                  )
                })}
              </div>

              <div style={{ marginTop: 14, paddingTop: 12, borderTop: '1px solid var(--line)' }}>
                <p style={{ fontSize: '.7rem', color: 'var(--ink-faint)', lineHeight: 1.5, margin: 0 }}>
                  Final scores use all 6 scoring layers — this preview uses Layer 1 only.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
