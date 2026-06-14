import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

const SYSTEM_PROMPT = `You are Holos, an integrative wellness AI coach. You speak with warmth, intelligence, and depth.
You have deep knowledge of: evidence-based nutrition, sleep science, stress physiology, Ayurveda, Rambam medicine, Hippocratic medicine, Avicenna/Ibn Sina, Daoist wellness (TCM), Tibetan medicine (Sowa Rigpa), and the Swarga Integral Wellness System.
You help users understand their wellness assessment scores, explain wisdom traditions in accessible terms, create personalised action plans, and track progress over time.
Speak with the authority of a practitioner and the warmth of a trusted friend. Never be generic. Personalise every response to the user's specific scores and context.
Keep responses focused and practical. Use the user's wellness data when available.`

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { message, sessionId, context } = await req.json()
    if (!message) return NextResponse.json({ error: 'Message required' }, { status: 400 })

    // Load or create session
    let session = null
    if (sessionId) {
      const { data } = await supabase.from('coaching_sessions').select('*').eq('id', sessionId).eq('user_id', user.id).single()
      session = data
    }

    const messages = session?.messages ?? []
    messages.push({ role: 'user', content: message, timestamp: new Date().toISOString() })

    // Build context string from wellness data
    const contextStr = context ? `
User wellness context:
- Composite score: ${context.composite ?? 'unknown'}/100
- Wellness state: ${context.state ?? 'unknown'}
- Framework: ${context.framework ?? 'unknown'}
- Key dimensions: ${JSON.stringify(context.scores ?? {})}
` : ''

    const apiKey = process.env.ANTHROPIC_API_KEY
    let reply = ''

    if (apiKey) {
      const { default: Anthropic } = await import('@anthropic-ai/sdk')
      const client = new Anthropic({ apiKey })
      const response = await client.messages.create({
        model: 'claude-sonnet-4-6',
        max_tokens: 800,
        system: SYSTEM_PROMPT + (contextStr ? '\n\n' + contextStr : ''),
        messages: messages.slice(-10).map((m: { role: string; content: string }) => ({
          role: m.role as 'user' | 'assistant',
          content: m.content,
        })),
      })
      reply = response.content[0].type === 'text' ? response.content[0].text : ''
    } else {
      // Graceful fallback when no API key
      const userScore = context?.composite ?? 65
      reply = userScore < 50
        ? `I can see you're navigating some challenges right now. Based on your profile, the most impactful place to start is with sleep — it's the foundation that every other dimension rests on. What's the most difficult part of your current sleep pattern?`
        : userScore < 72
        ? `Your foundation is solid. You're in a position where targeted improvements in your lower-scoring dimensions can create meaningful shifts. What dimension would you most like to explore today?`
        : `You're performing well across most dimensions. This is the right time to focus on optimisation and sustainability. What aspect of your wellness practice feels most alive for you right now?`
    }

    messages.push({ role: 'assistant', content: reply, timestamp: new Date().toISOString() })

    // Upsert session
    if (session) {
      await supabase.from('coaching_sessions').update({ messages, updated_at: new Date().toISOString() }).eq('id', session.id)
    } else {
      const { data: newSession } = await supabase.from('coaching_sessions').insert({
        user_id: user.id,
        messages,
        framework: context?.framework,
      }).select('id').single()
      session = newSession
    }

    return NextResponse.json({ reply, sessionId: session?.id })
  } catch (err) {
    console.error('Coach API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
