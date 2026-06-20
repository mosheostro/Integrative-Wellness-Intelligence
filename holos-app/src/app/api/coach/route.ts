import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export const maxDuration = 30

const SYSTEM_PROMPT = `You are Holos, an integrative wellness AI coach. You speak with warmth, intelligence, and depth.
You have deep knowledge of: evidence-based nutrition, sleep science, stress physiology, Ayurveda, Rambam medicine, Hippocratic medicine, Avicenna/Ibn Sina, Daoist wellness (TCM), Tibetan medicine (Sowa Rigpa), and the Swarga Integral Wellness System.
You help users understand their wellness assessment scores, explain wisdom traditions in accessible terms, create personalised action plans, and track progress over time.
Speak with the authority of a practitioner and the warmth of a trusted friend. Never be generic. Personalise every response to the user's specific scores and context.
Keep responses focused and practical. Use the user's wellness data when available.`

const LANG_INSTRUCTIONS: Record<string, string> = {
  ru: 'IMPORTANT: Always reply in Russian (русский язык). The user speaks Russian. Never switch to English.',
  he: 'IMPORTANT: Always reply in Hebrew (עברית). The user speaks Hebrew. Write right-to-left as appropriate.',
  de: 'IMPORTANT: Always reply in German (Deutsch). The user speaks German. Never switch to English.',
  en: '',
}

const FALLBACK: Record<string, (score: number) => string> = {
  ru: (score) => score < 50
    ? 'Я вижу, что сейчас вы переживаете непростой период. Судя по вашему профилю, самое важное — это сон: он основа для всех остальных сфер здоровья. Что больше всего мешает вам сейчас высыпаться?'
    : score < 72
    ? 'Ваша база крепкая. Есть несколько измерений, где точечная работа даст ощутимый результат. За какое из них вы хотели бы взяться сегодня?'
    : 'Вы показываете отличные результаты по большинству показателей. Сейчас время сосредоточиться на оптимизации и устойчивости. Какой аспект вашей практики ощущается наиболее живым прямо сейчас?',
  he: (score) => score < 50
    ? 'אני רואה שאתה עובר תקופה מאתגרת. לפי הנתונים שלך, המקום הכי חשוב להתחיל בו הוא השינה — היא הבסיס לכל שאר המדדים. מה הקושי הגדול ביותר בדפוס השינה שלך כרגע?'
    : score < 72
    ? 'הבסיס שלך יציב. יש כמה מדדים שבהם שיפור ממוקד יכול ליצור שינוי משמעותי. באיזה מדד היית רוצה להתמקד היום?'
    : 'אתה מציג ביצועים מצוינים ברוב המדדים. עכשיו הזמן להתמקד באופטימיזציה וקיימות. איזה היבט מהפרקטיקה שלך מרגיש הכי חי עבורך כרגע?',
  de: (score) => score < 50
    ? 'Ich sehe, dass Sie gerade eine schwierige Phase durchmachen. Basierend auf Ihrem Profil ist der wirkungsvollste Einstiegspunkt der Schlaf — er ist das Fundament für alle anderen Bereiche. Was ist der schwierigste Teil Ihres aktuellen Schlafmusters?'
    : score < 72
    ? 'Ihre Basis ist solide. Es gibt einige Dimensionen, in denen gezielte Verbesserungen spürbare Veränderungen bewirken können. An welcher Dimension möchten Sie heute arbeiten?'
    : 'Sie erzielen in den meisten Dimensionen gute Ergebnisse. Jetzt ist der richtige Zeitpunkt, sich auf Optimierung und Nachhaltigkeit zu konzentrieren. Welcher Aspekt Ihrer Wellness-Praxis fühlt sich gerade am lebendigsten an?',
  en: (score) => score < 50
    ? `I can see you're navigating some challenges right now. Based on your profile, the most impactful place to start is with sleep — it's the foundation that every other dimension rests on. What's the most difficult part of your current sleep pattern?`
    : score < 72
    ? `Your foundation is solid. You're in a position where targeted improvements in your lower-scoring dimensions can create meaningful shifts. What dimension would you most like to explore today?`
    : `You're performing well across most dimensions. This is the right time to focus on optimisation and sustainability. What aspect of your wellness practice feels most alive for you right now?`,
}

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { message, sessionId, context, locale } = await req.json()
    if (!message) return NextResponse.json({ error: 'Message required' }, { status: 400 })

    const lang = (locale as string) in LANG_INSTRUCTIONS ? (locale as string) : 'en'
    const langInstruction = LANG_INSTRUCTIONS[lang]

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

    const systemPrompt = [
      SYSTEM_PROMPT,
      contextStr || '',
      langInstruction,
    ].filter(Boolean).join('\n\n')

    const apiKey = process.env.ANTHROPIC_API_KEY
    let reply = ''

    if (apiKey) {
      const { default: Anthropic } = await import('@anthropic-ai/sdk')
      const client = new Anthropic({ apiKey })
      const response = await client.messages.create({
        model: 'claude-sonnet-4-6',
        max_tokens: 800,
        system: systemPrompt,
        messages: messages.slice(-10).map((m: { role: string; content: string }) => ({
          role: m.role as 'user' | 'assistant',
          content: m.content,
        })),
      })
      reply = response.content[0].type === 'text' ? response.content[0].text : ''
    } else {
      // Graceful fallback when no API key — localized
      const userScore = context?.composite ?? 65
      reply = (FALLBACK[lang] ?? FALLBACK.en)(userScore)
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
