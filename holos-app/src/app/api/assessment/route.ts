import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createServiceClient } from '@/lib/supabase/service'
import { runEngine } from '@/engine'
import { z } from 'zod'
import type { Framework } from '@/lib/types'

function clamp(v: number) { return Math.max(0, Math.min(100, Math.round(v))) }

const AnswerSchema = z.object({
  questionId:  z.string(),
  optionIndex: z.union([z.number(), z.array(z.number())]),
  dimension:   z.string(),
})

const SubmitSchema = z.object({
  framework: z.enum(['evidence-based','rambam','hippocrates','avicenna','ayurveda','daoist','tibetan','swarga']),
  answers:   z.array(AnswerSchema),
})

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await req.json()
    const parsed = SubmitSchema.safeParse(body)
    if (!parsed.success) return NextResponse.json({ error: 'Invalid payload', details: parsed.error.flatten() }, { status: 400 })

    const { framework, answers } = parsed.data

    // Run the engine
    const result = runEngine(answers as Parameters<typeof runEngine>[0], framework as Framework)

    // Use service-role client for writes (bypasses RLS; falls back to user client if key not set)
    const db = createServiceClient() ?? supabase

    // Persist assessment
    const { data: assessment, error: aErr } = await db
      .from('assessments')
      .insert({
        user_id: user.id,
        framework,
        status: 'completed',
        wellness_state: result.state,
        composite_score: clamp(result.scores.composite),
        completed_at: new Date().toISOString(),
      })
      .select('id')
      .single()

    if (aErr || !assessment) {
      console.error('Assessment insert error:', JSON.stringify(aErr))
      return NextResponse.json({
        error: 'Failed to save assessment',
        details: aErr?.message,
        code: aErr?.code,
      }, { status: 500 })
    }

    const assessmentId = assessment.id

    // Persist answers
    await db.from('answers').insert(
      answers.map((a: { questionId: string; optionIndex: number | number[]; dimension: string }) => ({
        assessment_id: assessmentId,
        question_id:   a.questionId,
        question_text: '',
        option_index:  Array.isArray(a.optionIndex) ? a.optionIndex[0] : a.optionIndex,
        option_text:   '',
        dimension:     a.dimension,
      }))
    )

    // Persist dimension scores
    await db.from('dimension_scores').insert({
      assessment_id: assessmentId,
      user_id: user.id,
      framework,
      ...result.scores,
    })

    // Persist framework result
    const fr = result.frameworkResult
    await db.from('framework_results').insert({
      assessment_id: assessmentId,
      framework,
      dosha_vata:   fr.dosha?.vata,
      dosha_pitta:  fr.dosha?.pitta,
      dosha_kapha:  fr.dosha?.kapha,
      dominant_dosha: fr.dosha?.dominant,
      element_wood:  fr.elements?.wood,
      element_fire:  fr.elements?.fire,
      element_earth: fr.elements?.earth,
      element_metal: fr.elements?.metal,
      element_water: fr.elements?.water,
      narrative: fr.narrative,
      raw_data: { swarga: fr.swarga, customDimensions: fr.customDimensions },
    })

    // Issue top recommendations — dismiss previous active ones first so the
    // Действия page always reflects the latest assessment, not all history.
    await db
      .from('issued_recommendations')
      .update({ status: 'dismissed' })
      .eq('user_id', user.id)
      .eq('status', 'active')

    const recs = result.recommendations.slice(0, 8)
    if (recs.length) {
      const { error: recErr } = await db.from('issued_recommendations').insert(
        recs.map(r => ({
          user_id: user.id,
          assessment_id: assessmentId,
          rec_id: r.id,
          category: r.category,
          title: r.title,
          description: r.description,
          impact_score: r.impact_score,
          difficulty_score: r.difficulty_score,
          priority_score: Math.round(r.impact_score - r.difficulty_score * 0.2),
          framework,
          status: 'active',   // matches CHECK constraint: active|completed|dismissed|snoozed
        }))
      )
      if (recErr) console.error('Recommendations insert error:', JSON.stringify(recErr))
    }

    // Progress snapshot
    await db.from('progress_snapshots').upsert({
      user_id: user.id,
      snapshot_date: new Date().toISOString().split('T')[0],
      composite: result.scores.composite,
      nutrition: result.scores.nutrition,
      sleep: result.scores.sleep,
      recovery: result.scores.recovery,
      stress: result.scores.stress,
      movement: result.scores.movement,
      emotional: result.scores.emotional,
      life_balance: result.scores.life_balance,
      purpose: result.scores.purpose,
      energy: result.scores.energy,
      wellness_state: result.state,
    }, { onConflict: 'user_id,snapshot_date' })

    // XP reward
    try { await db.rpc('add_xp', { p_user_id: user.id, p_xp: 50 }) } catch { /* non-critical */ }

    return NextResponse.json({ assessmentId, result }, { status: 201 })
  } catch (err) {
    console.error('Assessment API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
