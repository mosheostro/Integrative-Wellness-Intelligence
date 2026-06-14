'use client'
import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { getInitialQuestions, getNextQuestions } from '@/data/questions/bank'
import type { AssessmentAnswer, Framework, Question } from '@/lib/types'
import { FRAMEWORKS_LIST } from '@/frameworks'

type Phase = 'framework' | 'questions' | 'submitting' | 'done'

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

  const currentQ = questions[qIndex]
  const progress = questions.length > 0 ? Math.round(((qIndex) / questions.length) * 100) : 0

  const handleNext = useCallback(() => {
    if (selected === null || !currentQ) return
    const answer: AssessmentAnswer = {
      questionId: currentQ.id,
      optionIndex: selected,
      dimension: currentQ.dimension,
    }
    const newAnswers = [...answers, answer]
    const newAnsweredIds = new Set(answeredIds); newAnsweredIds.add(currentQ.id)

    // Inject adaptive follow-up questions
    const followUps = getNextQuestions(currentQ.id, selected, newAnsweredIds)
    const nextQuestions = [...questions]
    // Insert follow-ups right after current position
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
  }, [selected, currentQ, answers, answeredIds, questions, qIndex])

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

  // ── Framework Selection ─────────────────────────────────────
  if (phase === 'framework') {
    return (
      <div className="wrap section-pad" style={{ maxWidth: 860 }}>
        <div className="section-head">
          <div className="eyebrow"><span style={{color:'var(--sage)'}}>◉</span> Step 1 of 2 — Choose your lens</div>
          <h1 className="h1" style={{ marginTop:12 }}>Which wisdom tradition<br/>should interpret your results?</h1>
          <p className="lede" style={{ marginTop:12 }}>Each framework analyses the same answers differently. You can re-assess under a different tradition at any time.</p>
        </div>

        <div className="grid-2" style={{ gap:16, marginBottom:40 }}>
          {FRAMEWORKS_LIST.map(fw => (
            <button
              key={fw.id}
              onClick={() => setFramework(fw.id)}
              style={{
                display:'flex', alignItems:'flex-start', gap:16, padding:20,
                border:`2px solid ${framework === fw.id ? 'var(--sage)' : 'var(--line)'}`,
                borderRadius:16, background: framework === fw.id ? 'rgba(122,158,142,.08)' : 'var(--surface)',
                cursor:'pointer', textAlign:'left', transition:'all .15s',
              }}
            >
              <span style={{ fontSize:28, lineHeight:1 }}>{fw.icon}</span>
              <div>
                <div style={{ fontWeight:600, fontSize:'.9375rem', color:'var(--ink)', marginBottom:4 }}>{fw.label}</div>
                <div style={{ fontSize:'.8rem', color:'var(--ink-soft)', lineHeight:1.5 }}>{fw.origin}</div>
              </div>
              {framework === fw.id && (
                <span style={{ marginLeft:'auto', color:'var(--sage)', fontSize:18, flexShrink:0 }}>✓</span>
              )}
            </button>
          ))}
        </div>

        <button className="btn btn-primary btn-lg" onClick={() => setPhase('questions')}>
          Begin assessment <span>→</span>
        </button>
      </div>
    )
  }

  // ── Submitting ──────────────────────────────────────────────
  if (phase === 'submitting') {
    return (
      <div style={{ minHeight:'80dvh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:20 }}>
        <div className="spinner" style={{ width:40, height:40, borderWidth:3 }} />
        <p style={{ color:'var(--ink-soft)' }}>Analysing your responses across {FRAMEWORKS_LIST.find(f=>f.id===framework)?.label}…</p>
      </div>
    )
  }

  // ── Questions ───────────────────────────────────────────────
  if (!currentQ) return null

  return (
    <div style={{ minHeight:'100dvh', display:'flex', alignItems:'center', justifyContent:'center', padding:'80px 24px 40px' }}>
      <div style={{ width:'100%', maxWidth:620 }}>
        {/* Progress */}
        <div style={{ marginBottom:32 }}>
          <div className="eyebrow" style={{ marginBottom:10 }}>
            <span style={{ color:'var(--sage)' }}>◉</span>
            {currentQ.section} · {qIndex + 1} of {questions.length}
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:14 }}>
            <div className="progress-track" style={{ flex:1, height:3 }}>
              <div className="progress-fill" style={{ width:`${progress}%`, background:'var(--sage)' }} />
            </div>
            <span style={{ fontFamily:'var(--font-mono)', fontSize:11, color:'var(--ink-faint)', minWidth:30 }}>{progress}%</span>
          </div>
        </div>

        {/* Question card */}
        <div className="card" style={{ padding:'32px', marginBottom:24 }}>
          <h2 style={{ fontFamily:'var(--font-serif)', fontSize:'1.3rem', lineHeight:1.35, marginBottom:28, color:'var(--ink)' }}>
            {currentQ.text}
          </h2>

          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
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

        {/* Controls */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <div className="badge badge-sage">
            <span>◆</span> Adaptive · your answers shape what follows
          </div>
          <div style={{ display:'flex', gap:10 }}>
            <button
              className="btn btn-ghost btn-sm"
              disabled={qIndex === 0}
              onClick={() => { setQIndex(Math.max(0, qIndex - 1)); setSelected(null) }}
            >Back</button>
            <button
              className="btn btn-sage btn-sm"
              disabled={selected === null}
              onClick={handleNext}
            >
              {qIndex === questions.length - 1 ? 'Complete' : 'Continue'} <span>→</span>
            </button>
          </div>
        </div>

        {error && <p style={{ color:'var(--rose)', marginTop:16, textAlign:'center' }}>{error}</p>}
      </div>
      </div>
  )
}
