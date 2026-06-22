import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const [{ data: assessment }, { data: scores }, { data: fwResult }, { data: recs }] = await Promise.all([
    supabase.from('assessments').select('*').eq('id', id).eq('user_id', user.id).single(),
    supabase.from('dimension_scores').select('*').eq('assessment_id', id).single(),
    supabase.from('framework_results').select('*').eq('assessment_id', id).single(),
    supabase.from('issued_recommendations').select('*').eq('assessment_id', id).order('priority_score', { ascending: false }),
  ])

  if (!assessment || !scores) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  return NextResponse.json({ assessment, scores, fwResult: fwResult ?? null, recommendations: recs ?? [] })
}
