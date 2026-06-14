import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

type Stat = { label: string; value: string | number; icon: string; color: string }

export default async function AdminPage() {
  const sb = await createClient()
  const { data: { user } } = await sb.auth.getUser()

  // Check admin status via profile
  const { data: profile } = await sb.from('profiles').select('role').eq('id', user?.id ?? '').single()
  if (!profile || (profile as { role: string }).role !== 'admin') {
    redirect('/dashboard')
  }

  // Aggregate stats
  const [
    { count: userCount },
    { count: assessmentCount },
    { count: todayCount },
  ] = await Promise.all([
    sb.from('profiles').select('*', { count: 'exact', head: true }),
    sb.from('assessments').select('*', { count: 'exact', head: true }),
    sb.from('assessments').select('*', { count: 'exact', head: true })
      .gte('completed_at', new Date(Date.now() - 86400000).toISOString()),
  ])

  const { data: recentUsers } = await sb.from('profiles')
    .select('id, full_name, email, created_at, level, xp, preferred_framework')
    .order('created_at', { ascending: false })
    .limit(20)

  const { data: recentAssessments } = await sb.from('assessments')
    .select('id, user_id, framework, composite_score, wellness_state, completed_at')
    .order('completed_at', { ascending: false })
    .limit(20)

  const STATS: Stat[] = [
    { label: 'Total Users',         value: userCount ?? 0,      icon: '◈', color: 'var(--sage)'   },
    { label: 'Total Assessments',   value: assessmentCount ?? 0, icon: '◉', color: 'var(--indigo)' },
    { label: 'Assessments (24h)',   value: todayCount ?? 0,     icon: '◆', color: 'var(--gold)'   },
  ]

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px' }}>
      <div style={{ marginBottom: 36 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.68rem', textTransform: 'uppercase', letterSpacing: '.14em', color: 'var(--rose)', marginBottom: 8 }}>✕ Admin</div>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 500, letterSpacing: '-.02em', color: 'var(--ink)', margin: 0 }}>
          Admin Panel
        </h1>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 32 }}>
        {STATS.map(s => (
          <div key={s.label} style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--radius-lg)', padding: '24px', borderTop: `3px solid ${s.color}` }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.65rem', textTransform: 'uppercase', letterSpacing: '.12em', color: 'var(--ink-faint)', marginBottom: 10 }}>{s.icon} {s.label}</div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem', fontWeight: 500, color: 'var(--ink)', letterSpacing: '-.02em', lineHeight: 1 }}>{s.value}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* Recent Users */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
          <div style={{ padding: '18px 24px', borderBottom: '1px solid var(--line)', fontFamily: 'var(--font-mono)', fontSize: '.65rem', textTransform: 'uppercase', letterSpacing: '.12em', color: 'var(--ink-faint)' }}>
            Recent Users
          </div>
          <div style={{ maxHeight: 400, overflowY: 'auto' }}>
            {(recentUsers ?? []).map((u, i) => (
              <div key={u.id} style={{ padding: '12px 24px', borderBottom: i < (recentUsers?.length ?? 0) - 1 ? '1px solid var(--line)' : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '.85rem', fontWeight: 600, color: 'var(--ink)' }}>{(u as {full_name?: string}).full_name || 'Unnamed'}</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '.72rem', color: 'var(--ink-faint)' }}>{(u as {email?: string}).email}</div>
                </div>
                <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexShrink: 0 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.7rem', color: 'var(--gold)', background: 'rgba(196,165,90,.1)', padding: '2px 8px', borderRadius: 100 }}>
                    Lv {(u as {level?: number}).level ?? 1}
                  </span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '.7rem', color: 'var(--ink-faint)' }}>
                    {new Date((u as {created_at: string}).created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Assessments */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
          <div style={{ padding: '18px 24px', borderBottom: '1px solid var(--line)', fontFamily: 'var(--font-mono)', fontSize: '.65rem', textTransform: 'uppercase', letterSpacing: '.12em', color: 'var(--ink-faint)' }}>
            Recent Assessments
          </div>
          <div style={{ maxHeight: 400, overflowY: 'auto' }}>
            {(recentAssessments ?? []).map((a, i) => (
              <div key={a.id} style={{ padding: '12px 24px', borderBottom: i < (recentAssessments?.length ?? 0) - 1 ? '1px solid var(--line)' : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '.82rem', color: 'var(--ink)', fontWeight: 600 }}>{(a as {framework: string}).framework}</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '.72rem', color: 'var(--ink-faint)' }}>{(a as {wellness_state?: string}).wellness_state}</div>
                </div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexShrink: 0 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.82rem', fontWeight: 600, color: 'var(--ink)' }}>{(a as {composite_score?: number}).composite_score}</span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '.7rem', color: 'var(--ink-faint)' }}>
                    {new Date((a as {completed_at: string}).completed_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
