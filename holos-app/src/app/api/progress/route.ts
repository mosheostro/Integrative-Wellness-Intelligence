import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(_req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const [{ data: snapshots }, { data: assessments }, { data: userProgress }] = await Promise.all([
    supabase.from('progress_snapshots').select('*').eq('user_id', user.id)
      .order('snapshot_date', { ascending: true }).limit(90),
    supabase.from('assessments').select('id,framework,wellness_state,composite_score,completed_at')
      .eq('user_id', user.id).eq('status', 'completed').order('completed_at', { ascending: false }).limit(10),
    supabase.from('user_progress').select('*').eq('user_id', user.id).single(),
  ])

  return NextResponse.json({ snapshots: snapshots ?? [], assessments: assessments ?? [], userProgress })
}
