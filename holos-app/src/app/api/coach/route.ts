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

type TopicKey = 'sleep' | 'stress' | 'nutrition' | 'movement' | 'energy' | 'emotional' | 'purpose' | 'general_low' | 'general_mid' | 'general_high'

const TOPIC_PATTERNS: Record<string, { keywords: string[]; topic: TopicKey }[]> = {
  ru: [
    { keywords: ['сон', 'спать', 'засыпа', 'просыпа', 'усталост', 'ночь', 'бессоннц'], topic: 'sleep' },
    { keywords: ['стресс', 'тревог', 'волнен', 'паник', 'нервн', 'напряж', 'давлен'], topic: 'stress' },
    { keywords: ['питан', 'еда', 'диет', 'вес', 'калор', 'овощ', 'фрукт', 'сахар'], topic: 'nutrition' },
    { keywords: ['движен', 'трениров', 'спорт', 'упражн', 'физич', 'бегать', 'йога'], topic: 'movement' },
    { keywords: ['энерги', 'усталост', 'бодрост', 'сил', 'вялост', 'жизненн'], topic: 'energy' },
    { keywords: ['эмоц', 'настро', 'чувств', 'отношен', 'счасть', 'депресс', 'радост'], topic: 'emotional' },
    { keywords: ['цель', 'смысл', 'мотиваци', 'предназнач', 'призван', 'будущ'], topic: 'purpose' },
  ],
  he: [
    { keywords: ['שינה', 'לישון', 'עייפ', 'ערנות', 'לילה', 'להירדם'], topic: 'sleep' },
    { keywords: ['לחץ', 'חרדה', 'דאגה', 'עצבים', 'פחד', 'מתח'], topic: 'stress' },
    { keywords: ['תזונה', 'אוכל', 'דיאטה', 'משקל', 'קלוריות', 'סוכר'], topic: 'nutrition' },
    { keywords: ['תנועה', 'אימון', 'ספורט', 'פעילות', 'יוגה', 'ריצה'], topic: 'movement' },
    { keywords: ['אנרגיה', 'עייפות', 'עוצמה', 'כוח', 'חיוניות'], topic: 'energy' },
    { keywords: ['רגשות', 'מ気分', 'תחושה', 'קשרים', 'שמחה', 'דיכאון'], topic: 'emotional' },
    { keywords: ['מטרה', 'משמעות', 'מוטיבציה', 'ייעוד', 'עתיד'], topic: 'purpose' },
  ],
  de: [
    { keywords: ['schlaf', 'schlafen', 'müd', 'einschlaf', 'nacht', 'erschöpf'], topic: 'sleep' },
    { keywords: ['stress', 'angst', 'sorge', 'nerv', 'anspann', 'druck'], topic: 'stress' },
    { keywords: ['ernähr', 'essen', 'diät', 'gewicht', 'kalori', 'zucker'], topic: 'nutrition' },
    { keywords: ['bewegung', 'training', 'sport', 'übung', 'yoga', 'laufen'], topic: 'movement' },
    { keywords: ['energie', 'müdig', 'vitalität', 'kraft', 'erschöpf'], topic: 'energy' },
    { keywords: ['emotion', 'stimmung', 'gefühl', 'beziehung', 'freude', 'depression'], topic: 'emotional' },
    { keywords: ['ziel', 'sinn', 'motivation', 'zweck', 'zukunft'], topic: 'purpose' },
  ],
  en: [
    { keywords: ['sleep', 'tired', 'rest', 'insomnia', 'night', 'fatigue', 'wake'], topic: 'sleep' },
    { keywords: ['stress', 'anxiety', 'worry', 'nervous', 'overwhelm', 'panic'], topic: 'stress' },
    { keywords: ['nutrition', 'food', 'diet', 'weight', 'eat', 'calories', 'sugar'], topic: 'nutrition' },
    { keywords: ['movement', 'exercise', 'workout', 'sport', 'yoga', 'run', 'gym'], topic: 'movement' },
    { keywords: ['energy', 'tired', 'vitality', 'strength', 'fatigue', 'sluggish'], topic: 'energy' },
    { keywords: ['emotion', 'mood', 'feeling', 'relationship', 'happy', 'depress'], topic: 'emotional' },
    { keywords: ['purpose', 'meaning', 'motivation', 'goal', 'mission', 'future'], topic: 'purpose' },
  ],
}

const TOPIC_REPLIES: Record<string, Partial<Record<TopicKey, string>>> = {
  ru: {
    sleep: 'Сон — это фундамент всего. Давайте разберёмся: вам сложнее засыпать, просыпаетесь ночью или встаёте уже уставшим? Каждый из этих паттернов имеет своё решение.',
    stress: 'Хронический стресс незаметно истощает ресурсы организма. Расскажите — это больше внешнее давление (работа, отношения) или внутреннее ощущение тревоги? Понимание источника определяет инструменты.',
    nutrition: 'Питание влияет на энергию, сон и настроение сильнее, чем большинство думает. Что сейчас вызывает больше всего трудностей — время приёмов пищи, качество продуктов или что-то другое?',
    movement: 'Движение — это сигнал телу о жизнеспособности. Что для вас сейчас мешает двигаться больше — время, мотивация, физическое состояние или что-то ещё?',
    energy: 'Стабильная энергия — это не про кофе, это про систему. Когда именно вы чувствуете спад — утром, после обеда или к вечеру? Это важно для точной работы.',
    emotional: 'Эмоциональное состояние — это ресурс, который нуждается в поддержке так же, как физическое тело. Что сейчас ощущается наиболее тяжёлым?',
    purpose: 'Чувство смысла — это не роскошь, это физиологическая потребность. Есть ли что-то, что раньше приносило смысл и сейчас ощущается менее живым?',
    general_low: 'Я вижу, что вы сейчас в непростом периоде. Лучший первый шаг — сон: это основа, на которой строится всё остальное. Что сейчас мешает вам высыпаться?',
    general_mid: 'У вас хорошая основа для роста. Скажите мне — что вас привело сюда сегодня? Что именно хотите улучшить или понять?',
    general_high: 'Вы уже на сильном уровне. Теперь вопрос в тонкой настройке и устойчивости. Что из вашей практики ощущается сейчас наиболее живым?',
  },
  he: {
    sleep: 'שינה היא הבסיס לכל. בואו נבין — קשה לך להירדם, אתה מתעורר בלילה, או קם עייף? לכל דפוס יש פתרון משלו.',
    stress: 'לחץ כרוני מרוקן את משאבי הגוף בשקט. ספר לי — האם זה לחץ חיצוני (עבודה, מערכות יחסים) או תחושה פנימית של חרדה? ההבנה קובעת את הכלים.',
    nutrition: 'תזונה משפיעה על אנרגיה, שינה ומצב רוח יותר ממה שרוב האנשים חושבים. מה הכי קשה עכשיו — עיתוי הארוחות, איכות המזון או משהו אחר?',
    movement: 'תנועה היא אות לגוף על חיוניות. מה מונע ממך לזוז יותר כרגע — זמן, מוטיבציה, מצב פיזי?',
    energy: 'אנרגיה יציבה היא לא קפאין, זה מערכת שלמה. מתי בדיוק אתה מרגיש ירידה — בבוקר, אחרי הצהריים, או בערב?',
    emotional: 'מצב רגשי הוא משאב שצריך תמיכה כמו הגוף הפיזי. מה מרגיש הכי כבד כרגע?',
    purpose: 'תחושת משמעות היא לא מותרות, היא צורך פיזיולוגי. יש משהו שפעם נתן משמעות ועכשיו מרגיש פחות חי?',
    general_low: 'אני רואה שאתה בתקופה מאתגרת. הצעד הראשון הכי טוב הוא שינה — היא הבסיס לכל השאר. מה מונע ממך לישון טוב כרגע?',
    general_mid: 'יש לך בסיס טוב לצמיחה. ספר לי — מה הביא אותך לכאן היום? מה בדיוק רוצה לשפר?',
    general_high: 'אתה כבר ברמה חזקה. עכשיו השאלה היא כוונון עדין וקיימות. מה מהפרקטיקה שלך מרגיש הכי חי עכשיו?',
  },
  de: {
    sleep: 'Schlaf ist das Fundament von allem. Lassen Sie uns herausfinden: Haben Sie Schwierigkeiten einzuschlafen, wachen Sie nachts auf, oder wachen Sie schon erschöpft auf? Jedes Muster hat seine eigene Lösung.',
    stress: 'Chronischer Stress erschöpft die Ressourcen des Körpers unmerklich. Erzählen Sie mir — ist es mehr äußerer Druck (Arbeit, Beziehungen) oder ein inneres Gefühl der Angst?',
    nutrition: 'Ernährung beeinflusst Energie, Schlaf und Stimmung stärker, als die meisten denken. Was bereitet Ihnen gerade die größten Schwierigkeiten?',
    movement: 'Bewegung ist ein Signal des Körpers für Vitalität. Was hindert Sie gerade daran, sich mehr zu bewegen — Zeit, Motivation, körperlicher Zustand?',
    energy: 'Stabile Energie dreht sich nicht um Koffein, sondern um das System. Wann genau spüren Sie einen Einbruch — morgens, nach dem Mittagessen oder abends?',
    emotional: 'Der emotionale Zustand ist eine Ressource, die genauso Unterstützung braucht wie der physische Körper. Was fühlt sich gerade am schwersten an?',
    purpose: 'Sinn ist kein Luxus, es ist ein physiologisches Bedürfnis. Gibt es etwas, das früher Sinn gegeben hat und sich jetzt weniger lebendig anfühlt?',
    general_low: 'Ich sehe, dass Sie gerade in einer schwierigen Phase sind. Der beste erste Schritt ist Schlaf. Was hindert Sie daran, gut zu schlafen?',
    general_mid: 'Sie haben eine gute Grundlage zum Wachsen. Was hat Sie heute hierher gebracht? Was möchten Sie verbessern?',
    general_high: 'Sie sind bereits auf einem starken Niveau. Jetzt geht es um Feinabstimmung. Was fühlt sich in Ihrer Praxis gerade am lebendigsten an?',
  },
  en: {
    sleep: 'Sleep is the foundation of everything else. Let\'s get specific — is it hard to fall asleep, do you wake during the night, or do you wake already tired? Each pattern points to a different solution.',
    stress: 'Chronic stress quietly drains your body\'s reserves. Tell me — is this more external pressure (work, relationships) or an internal sense of anxiety? Understanding the source defines the tools.',
    nutrition: 'Food affects energy, sleep and mood more than most people realise. What\'s causing the most difficulty right now — meal timing, food quality, or something else?',
    movement: 'Movement is a signal to the body about vitality. What\'s getting in the way of moving more right now — time, motivation, physical state?',
    energy: 'Stable energy isn\'t about caffeine, it\'s about systems. When exactly do you feel the dip — morning, after lunch, or in the evening? That timing matters.',
    emotional: 'Emotional state is a resource that needs support just like the physical body. What feels heaviest right now?',
    purpose: 'Meaning is not a luxury — it\'s a physiological need. Is there something that used to give you a sense of purpose that now feels less alive?',
    general_low: 'I can see you\'re in a difficult period right now. The best first step is sleep — it\'s the foundation everything else rests on. What\'s getting in the way of good sleep?',
    general_mid: 'You have a good foundation to build from. Tell me — what brought you here today? What specifically do you want to improve or understand?',
    general_high: 'You\'re already at a strong level. The question now is fine-tuning and sustainability. What aspect of your practice feels most alive for you right now?',
  },
}

function getSmartFallback(message: string, score: number, lang: string): string {
  const lang2 = (lang in TOPIC_PATTERNS) ? lang : 'en'
  const m = message.toLowerCase()
  const patterns = TOPIC_PATTERNS[lang2] ?? []

  for (const { keywords, topic } of patterns) {
    if (keywords.some(kw => m.includes(kw))) {
      const reply = TOPIC_REPLIES[lang2]?.[topic]
      if (reply) return reply
    }
  }

  // No keyword match — fall back to score-based
  const generalKey: TopicKey = score < 50 ? 'general_low' : score < 72 ? 'general_mid' : 'general_high'
  return TOPIC_REPLIES[lang2]?.[generalKey] ?? TOPIC_REPLIES.en[generalKey]!
}

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { message, sessionId, context, locale, history } = await req.json()
    if (!message) return NextResponse.json({ error: 'Message required' }, { status: 400 })

    const lang = (locale as string) in LANG_INSTRUCTIONS ? (locale as string) : 'en'
    const langInstruction = LANG_INSTRUCTIONS[lang]

    // Load or create session — prefer DB session by id, fall back to client-side history
    let session = null
    if (sessionId) {
      const { data } = await supabase.from('coaching_sessions').select('*').eq('id', sessionId).eq('user_id', user.id).single()
      session = data
    }

    // Use DB history if we have a session, otherwise use the history sent by the client
    const messages: Array<{ role: string; content: string; timestamp: string }> =
      session?.messages ?? (Array.isArray(history) ? history.map((m: { role: string; content: string }) => ({
        role: m.role,
        content: m.content,
        timestamp: new Date().toISOString(),
      })) : [])

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
      // Graceful fallback when no API key — keyword-aware, localized
      const userScore = context?.composite ?? 65
      reply = getSmartFallback(message, userScore, lang)
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
