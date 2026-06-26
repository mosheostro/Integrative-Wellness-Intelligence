import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { data, error } = await supabase
      .from('issued_recommendations')
      .select('id, rec_id, title, description, category, impact_score, difficulty_score, priority_score, framework, status, issued_at')
      .eq('user_id', user.id)
      .in('status', ['active', 'completed', 'snoozed'])
      .order('priority_score', { ascending: false })
      .limit(50)

    if (error) {
      console.error('Recs fetch error:', JSON.stringify(error))
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Normalise column name for frontend (issued_at → created_at)
    const normalised = (data ?? []).map(r => ({ ...r, created_at: r.issued_at }))
    return NextResponse.json({ recommendations: normalised })
  } catch (err) {
    console.error('Recommendations API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PATCH(req: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { id, status } = await req.json() as { id: string; status: string }
    if (!id || !status) return NextResponse.json({ error: 'Missing id or status' }, { status: 400 })

    const allowed = ['active', 'completed', 'dismissed', 'snoozed']
    if (!allowed.includes(status)) return NextResponse.json({ error: 'Invalid status' }, { status: 400 })

    const { error } = await supabase
      .from('issued_recommendations')
      .update({ status })
      .eq('id', id)
      .eq('user_id', user.id)   // belt-and-suspenders: don't let users patch others' recs

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Recommendations PATCH error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
