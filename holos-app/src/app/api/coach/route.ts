import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export const maxDuration = 30

// ─── System prompt ──────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are Holos, an integrative wellness AI coach.

CRITICAL RULES — read before every response:
1. READ the user's message carefully. Respond SPECIFICALLY to what they said — never give a generic answer.
2. NEVER ask "What brought you here today?" if there is conversation history. That was the greeting. You are now in an active conversation.
3. ALWAYS use the user's wellness scores (provided below) to give PERSONALISED advice. Reference their actual numbers.
4. Be DIRECT and CONCRETE. No vague wellness platitudes. Give 1-3 specific, actionable steps.
5. Keep responses SHORT (3-6 sentences max). The user wants clarity, not an essay.
6. Match the user's language and energy — if they're brief, be brief. If they're detailed, go deeper.

Your knowledge base: evidence-based sleep science, stress physiology, nutrition biochemistry, Ayurveda (doshas), Rambam medicine (6 pillars), Hippocrates, Avicenna/Ibn Sina, Daoist/TCM (Qi, meridians), Tibetan medicine (Sowa Rigpa/3 nyepa), Swarga Integral System.

After your response, on a new line add exactly:
SUGGESTIONS: [option1] | [option2] | [option3] | [option4]
Each option is a SHORT (4-7 words) reply the user might realistically say next, in the SAME language as your response, DIRECTLY relevant to what you just discussed.`

const LANG_INSTRUCTIONS: Record<string, string> = {
  ru: 'Отвечай ТОЛЬКО на русском языке. Никогда не переходи на английский.',
  he: 'ענה רק בעברית. אל תעבור לאנגלית.',
  de: 'Antworte NUR auf Deutsch. Wechsle nie ins Englische.',
  en: '',
}

// ─── Topic patterns for fallback ────────────────────────────────────────────
type TopicKey = 'sleep' | 'stress' | 'nutrition' | 'movement' | 'energy' | 'emotional' | 'purpose' | 'recovery' | 'assessment' | 'action' | 'tradition'

const TOPIC_PATTERNS: Record<string, { keywords: string[]; topic: TopicKey }[]> = {
  ru: [
    { keywords: ['оценк', 'результат', 'тест', 'показател', 'балл', 'анализ', 'скор'], topic: 'assessment' },
    { keywords: ['что делать', 'с чего начать', 'как улучш', 'порекоменд', 'совет', 'план', 'шаг', 'приоритет', 'помог'], topic: 'action' },
    { keywords: ['аюрвед', 'рамбам', 'тибет', 'даос', 'кит', 'tcm', 'сварга', 'гиппократ', 'авиценн', 'традиц', 'медицин'], topic: 'tradition' },
    { keywords: ['сон', 'спать', 'засыпа', 'просыпа', 'ночь', 'бессонн', 'дремот', 'выспат', 'отдохнут'], topic: 'sleep' },
    { keywords: ['стресс', 'тревог', 'волнен', 'паник', 'нервн', 'напряж', 'давлен', 'беспоко', 'страх'], topic: 'stress' },
    { keywords: ['питан', 'еда', 'диет', 'вес', 'калор', 'овощ', 'фрукт', 'сахар', 'белок', 'кушать', 'аппетит'], topic: 'nutrition' },
    { keywords: ['движен', 'трениров', 'спорт', 'упражн', 'физич', 'бегать', 'йога', 'зарядк', 'ходьб'], topic: 'movement' },
    { keywords: ['энерги', 'бодрост', 'сил', 'вялост', 'жизненн', 'усталост', 'бодр', 'утомл'], topic: 'energy' },
    { keywords: ['эмоц', 'настро', 'чувств', 'отношен', 'счасть', 'депресс', 'радост', 'злост', 'одиноч'], topic: 'emotional' },
    { keywords: ['цель', 'смысл', 'мотиваци', 'предназнач', 'призван', 'будущ', 'мисси'], topic: 'purpose' },
    { keywords: ['восстановл', 'сауна', 'массаж', 'дыхан', 'медитац', 'релакс', 'отдых'], topic: 'recovery' },
  ],
  he: [
    { keywords: ['הערכה', 'תוצאות', 'ציון', 'בדיקה', 'ניתוח', 'ציונים'], topic: 'assessment' },
    { keywords: ['מה לעשות', 'איך להתחיל', 'המלצה', 'עצה', 'תוכנית', 'שלבים', 'לעזור'], topic: 'action' },
    { keywords: ['איורוודה', 'רמב"ם', 'טיבטי', 'טאואיזם', 'סיני', 'tcm', 'מסורת'], topic: 'tradition' },
    { keywords: ['שינה', 'לישון', 'עייפ', 'ערנות', 'לילה', 'להירדם', 'להתעורר'], topic: 'sleep' },
    { keywords: ['לחץ', 'חרדה', 'דאגה', 'עצבים', 'פחד', 'מתח', 'בהלה'], topic: 'stress' },
    { keywords: ['תזונה', 'אוכל', 'דיאטה', 'משקל', 'קלוריות', 'סוכר', 'אכילה'], topic: 'nutrition' },
    { keywords: ['תנועה', 'אימון', 'ספורט', 'פעילות', 'יוגה', 'ריצה', 'הליכה'], topic: 'movement' },
    { keywords: ['אנרגיה', 'עייפות', 'עוצמה', 'כוח', 'חיוניות', 'תשישות'], topic: 'energy' },
    { keywords: ['רגשות', 'תחושה', 'קשרים', 'שמחה', 'דיכאון', 'בדידות'], topic: 'emotional' },
    { keywords: ['מטרה', 'משמעות', 'מוטיבציה', 'ייעוד', 'עתיד', 'שליחות'], topic: 'purpose' },
    { keywords: ['התאוששות', 'מנוחה', 'נשימה', 'מדיטציה', 'הרפיה'], topic: 'recovery' },
  ],
  de: [
    { keywords: ['bewertung', 'ergebnis', 'analyse', 'punktzahl', 'auswertung'], topic: 'assessment' },
    { keywords: ['was tun', 'wie verbessern', 'empfehlung', 'ratschlag', 'plan', 'schritte', 'helfen'], topic: 'action' },
    { keywords: ['ayurveda', 'rambam', 'tibetisch', 'daoist', 'tcm', 'tradition'], topic: 'tradition' },
    { keywords: ['schlaf', 'schlafen', 'müd', 'einschlaf', 'nacht', 'erschöpf', 'ausruhen'], topic: 'sleep' },
    { keywords: ['stress', 'angst', 'sorge', 'nerv', 'anspann', 'druck', 'panik'], topic: 'stress' },
    { keywords: ['ernähr', 'essen', 'diät', 'gewicht', 'kalori', 'zucker', 'hunger'], topic: 'nutrition' },
    { keywords: ['bewegung', 'training', 'sport', 'übung', 'yoga', 'laufen', 'spazier'], topic: 'movement' },
    { keywords: ['energie', 'müdig', 'vitalität', 'kraft', 'erschöpf', 'antriebslos'], topic: 'energy' },
    { keywords: ['emotion', 'stimmung', 'gefühl', 'beziehung', 'freude', 'depression'], topic: 'emotional' },
    { keywords: ['ziel', 'sinn', 'motivation', 'zweck', 'zukunft', 'mission'], topic: 'purpose' },
    { keywords: ['erholung', 'sauna', 'atemübung', 'meditation', 'entspannung'], topic: 'recovery' },
  ],
  en: [
    { keywords: ['assessment', 'result', 'score', 'analysis', 'show me', 'findings', 'data'], topic: 'assessment' },
    { keywords: ['what should', 'how do i', 'where to start', 'recommend', 'advice', 'plan', 'steps', 'help me', 'next step'], topic: 'action' },
    { keywords: ['ayurveda', 'rambam', 'tibetan', 'daoist', 'tcm', 'tradition', 'dosha', 'hippocrates', 'avicenna'], topic: 'tradition' },
    { keywords: ['sleep', 'tired', 'rest', 'insomnia', 'night', 'wake', 'drowsy', 'fatigue'], topic: 'sleep' },
    { keywords: ['stress', 'anxiety', 'worry', 'nervous', 'overwhelm', 'panic', 'fear', 'tense'], topic: 'stress' },
    { keywords: ['nutrition', 'food', 'diet', 'weight', 'eat', 'calories', 'sugar', 'appetite'], topic: 'nutrition' },
    { keywords: ['movement', 'exercise', 'workout', 'sport', 'yoga', 'run', 'gym', 'walk'], topic: 'movement' },
    { keywords: ['energy', 'vitality', 'strength', 'sluggish', 'lethargic', 'exhausted', 'drained'], topic: 'energy' },
    { keywords: ['emotion', 'mood', 'feeling', 'relationship', 'happy', 'depress', 'lonely', 'angry'], topic: 'emotional' },
    { keywords: ['purpose', 'meaning', 'motivation', 'goal', 'mission', 'future', 'direction'], topic: 'purpose' },
    { keywords: ['recovery', 'sauna', 'breathing', 'meditation', 'relax', 'restore'], topic: 'recovery' },
  ],
}

// ─── Smart fallback replies (varied, context-aware) ─────────────────────────
const FALLBACK_REPLIES: Record<string, Partial<Record<TopicKey | 'generic', string[]>>> = {
  ru: {
    sleep: [
      'Сон — фундамент всего. Три самых эффективных шага: фиксированное время подъёма (даже в выходные), температура спальни 18–19°C, никакого экрана за 30 минут до сна. Что из этого уже делаете?',
      'При проблемах со сном важно понять тип: сложно заснуть — это нервная система (попробуйте дыхание 4-7-8), просыпаетесь ночью — часто вопрос кортизола или сахара, встаёте уставшим — недостаток глубоких фаз. Что у вас?',
      'Магний глицинат за 30 минут до сна + прогулка 10 минут после ужина — это даёт результат у большинства людей уже за неделю. Какой аспект сна беспокоит больше всего?',
    ],
    stress: [
      'Хронический стресс — это не психология, это физиология. Физиологический вздох (двойной вдох через нос, долгий выдох) активирует парасимпатику за 30 секунд. Где источник стресса сейчас — внешний или внутренний?',
      'При стрессе тело застревает в режиме "угрозы". Три быстрых выхода: движение (10 минут ходьбы сбрасывает кортизол), холодная вода на лицо, или дыхание box breathing 4-4-4-4. Что доступно прямо сейчас?',
    ],
    nutrition: [
      'Белок в каждый приём пищи — это не диета, это управление энергией. 25–30г белка снижает тягу к сахару и держит уровень глюкозы стабильным. Как сейчас выглядит ваш типичный завтрак?',
      'Самое недооценённое в питании — время. Еда за 2-3 часа до сна и перерыв 12+ часов между ужином и завтраком делают больше, чем большинство диет. Сложно ли сейчас придерживаться такого режима?',
    ],
    movement: [
      'Не нужен спортзал. Кардио зоны 2 — это 30 минут быстрой ходьбы, где вы можете говорить, но дышите глубже. Три раза в неделю — и митохондрии начнут восстанавливаться. Что мешает начать именно с этого?',
      '10 минут ходьбы после каждого приёма пищи снижают уровень глюкозы на 30% и дают больше энергии. Это проще, чем кажется. Когда можно попробовать это сегодня?',
    ],
    energy: [
      'Энергетический провал после обеда — почти всегда скачок глюкозы. Решение: добавить клетчатку или белок в обед, и 10 минут ходьбы после. Когда именно чувствуете спад?',
      'Если усталость с утра — проблема в фазах сна или кортизоле. Если к вечеру — митохондрии или железо. Когда именно падает энергия — утром, после обеда или вечером?',
    ],
    emotional: [
      'Эмоциональное состояние напрямую связано с физиологией: дефицит сна снижает эмоциональную устойчивость на 60%. Что сейчас ощущается наиболее тяжёлым — с чем это связываете?',
      'Три минуты записи ощущений без цензуры (не для чтения, просто выброс) — один из лучших инструментов при эмоциональной перегрузке. Что сейчас давит больше всего?',
    ],
    purpose: [
      'Потеря смысла — это сигнал, не слабость. Часто это просто несоответствие между тем, что вы делаете, и тем, что важно. Было ли что-то, что раньше давало настоящий смысл, но ушло?',
    ],
    recovery: [
      'Восстановление — это не пассивность, это активный процесс. NSDR (йога-нидра, 20 минут) восстанавливает нейромедиаторы так же, как 2 часа сна. Как выглядит ваш день с точки зрения восстановления?',
    ],
    assessment: [
      'Смотрите на самые низкие показатели — именно там 5 единиц роста дают максимальный эффект на общий балл. Что в ваших результатах вызывает наибольшее любопытство или беспокойство?',
    ],
    action: [
      'Первое правило: начинать всегда с самого слабого измерения. Там наименьшее усилие даёт наибольший результат. Исходя из ваших данных — что ощущается наиболее срочным: сон, стресс или что-то другое?',
    ],
    tradition: [
      'Все традиции — от Аюрведы до Рамбама — сходятся в одном: дисбаланс в одной системе тянет за собой остальные. Какая традиция вас интересует больше всего и почему?',
    ],
    generic: [
      'Расскажите подробнее — что именно происходит? Чем конкретнее запрос, тем точнее смогу помочь.',
      'Чтобы дать конкретный совет, мне нужно понять: это острая ситуация (сейчас плохо) или хочется системно улучшить что-то?',
      'Интересный вопрос. Давайте разберём его конкретно — что именно вас беспокоит или интересует больше всего?',
    ],
  },
  he: {
    sleep: ['שינה היא הבסיס לכל. שלושה צעדים: שעת קימה קבועה (גם בסופ"ש), טמפרטורת חדר 18–19°C, אין מסך 30 דקות לפני שינה. מה מהם כבר עושה?'],
    stress: ['לחץ כרוני הוא פיזיולוגיה, לא רק פסיכולוגיה. נשימת תיבה (4-4-4-4) מפעילה את מערכת העצבים הפאראסימפתטית תוך 2 דקות. מה מרגיש הכבד כרגע?'],
    nutrition: ['חלבון בכל ארוחה — זה לא דיאטה, זה ניהול אנרגיה. 25–30 גרם חלבון שומר על גלוקוז יציב. איך נראה הארוחת הבוקר הרגילה שלך?'],
    movement: ['לא צריך חדר כושר. 10 דקות הליכה אחרי כל ארוחה מפחיתה גלוקוז ב-30% ונותנת יותר אנרגיה. מתי אפשר לנסות את זה היום?'],
    energy: ['ירידת אנרגיה אחרי הצהריים — כמעט תמיד קשורה לגלוקוז. פתרון: להוסיף חלבון לארוחת הצהריים + 10 דקות הליכה. מתי בדיוק מרגיש ירידה?'],
    emotional: ['מצב רגשי קשור ישירות לפיזיולוגיה — חוסר שינה מפחית חוסן רגשי ב-60%. מה מרגיש הכבד ביותר עכשיו?'],
    purpose: ['אובדן משמעות הוא אות, לא חולשה. לרוב זה פשוט אי-התאמה בין מה שאתה עושה למה שחשוב לך. היה משהו שנתן משמעות אמיתית ונעלם?'],
    assessment: ['תסתכל על הציונים הנמוכים ביותר — שם 5 נקודות של שיפור נותנות את האפקט הגדול ביותר על הציון הכולל. מה בתוצאות מעלה סקרנות או דאגה?'],
    action: ['הכלל הראשון: להתחיל תמיד מהממד החלש ביותר. מה מרגיש הדחוף ביותר — שינה, לחץ או משהו אחר?'],
    tradition: ['כל המסורות — מאיורוודה ועד הרמב"ם — מסכימות: חוסר איזון במערכת אחת גורר את השאר. איזה מסורת מעניינת אותך ביותר?'],
    generic: ['ספר יותר — מה בדיוק קורה? ככל שהשאלה ספציפית יותר, כך אוכל לעזור בצורה מדויקת יותר.'],
  },
  de: {
    sleep: ['Schlaf ist das Fundament von allem. Drei wirksame Schritte: feste Aufwachzeit (auch am Wochenende), Schlafzimmertemperatur 18–19°C, kein Bildschirm 30 Minuten vor dem Schlafen. Was davon machen Sie bereits?'],
    stress: ['Chronischer Stress ist Physiologie, nicht nur Psychologie. Box-Breathing (4-4-4-4) aktiviert das parasympathische Nervensystem in 2 Minuten. Was fühlt sich gerade am schwersten an?'],
    nutrition: ['Protein bei jeder Mahlzeit — das ist keine Diät, das ist Energiemanagement. 25–30g Protein halten den Blutzucker stabil. Wie sieht Ihr typisches Frühstück aus?'],
    movement: ['Kein Fitnessstudio nötig. 10 Minuten Gehen nach jeder Mahlzeit senkt den Glukosespiegel um 30% und gibt mehr Energie. Wann können Sie das heute probieren?'],
    energy: ['Energieeinbruch nach dem Mittagessen — fast immer ein Glukoseproblem. Lösung: mehr Protein zum Mittagessen + 10 Minuten Gehen. Wann genau spüren Sie den Einbruch?'],
    emotional: ['Emotionaler Zustand hängt direkt mit Physiologie zusammen. Was fühlt sich gerade am schwersten an?'],
    purpose: ['Sinnverlust ist ein Signal, keine Schwäche. Gibt es etwas, das früher echten Sinn gab und verschwunden ist?'],
    assessment: ['Schauen Sie auf die niedrigsten Werte — dort bringen 5 Punkte Verbesserung den größten Gesamteffekt. Was in Ihren Ergebnissen weckt Neugier oder Sorge?'],
    action: ['Erste Regel: immer bei der schwächsten Dimension anfangen. Was fühlt sich am dringendsten an — Schlaf, Stress oder etwas anderes?'],
    tradition: ['Alle Traditionen — von Ayurveda bis Rambam — sind sich einig: Ungleichgewicht in einem System zieht die anderen mit. Welche Tradition interessiert Sie am meisten?'],
    generic: ['Erzählen Sie mehr — was genau passiert? Je spezifischer die Frage, desto genauer kann ich helfen.'],
  },
  en: {
    sleep: [
      "Sleep is the foundation of everything else. Three high-leverage steps: fixed wake time (even weekends), bedroom temp 18–19°C, no screens 30 minutes before bed. Which of these feels hardest for you right now?",
      "There are three distinct sleep problems with different solutions: trouble falling asleep (nervous system — try 4-7-8 breathing), waking at night (often cortisol or blood sugar), waking unrefreshed (deep sleep quality). Which pattern fits you?",
    ],
    stress: [
      "Chronic stress is physiology, not just mindset. The physiological sigh (double inhale through nose, slow exhale) activates your parasympathetic system in under 30 seconds. What's the main source of stress right now — external or internal?",
      "Your nervous system can't tell real danger from mental pressure. Three fast resets: a 10-minute walk (drops cortisol measurably), cold water on your face, or box breathing 4-4-4-4. Which is most accessible right now?",
    ],
    nutrition: [
      "Protein at every meal isn't a diet — it's blood sugar management. 25–30g of protein at breakfast reduces afternoon cravings by up to 60%. What does your typical breakfast look like?",
      "The most underrated nutrition lever is timing. Finishing eating 2-3 hours before sleep and keeping a 12+ hour overnight fast does more than most diets. How feasible is that for you?",
    ],
    movement: [
      "You don't need a gym. Zone 2 cardio is 30 minutes of brisk walking where you can still talk but breathe deeper. Three times a week starts rebuilding mitochondrial capacity. What's the main barrier right now?",
      "A 10-minute walk after each meal reduces blood glucose by 30% and provides more sustained energy. That's measurable and immediate. When could you try this today?",
    ],
    energy: [
      "Afternoon energy crash is almost always a glucose spike from lunch. Fix: add protein or fiber to your midday meal and take a 10-minute walk after. When exactly does your energy dip?",
      "If you're tired in the morning, it's sleep quality or cortisol. If tired by evening, it's usually mitochondria or iron. When does your energy drop — morning, afternoon, or evening?",
    ],
    emotional: [
      "Emotional state is directly tied to physiology — sleep deprivation reduces emotional resilience by 60%. What feels heaviest right now, and is there a pattern to when it gets worse?",
    ],
    purpose: [
      "Loss of meaning is a signal, not a character flaw. It often simply means a gap between what you're doing and what actually matters to you. Was there something that used to give you genuine purpose that's faded?",
    ],
    recovery: [
      "Recovery isn't passivity — it's an active process. NSDR (yoga nidra, 20 minutes) restores neurotransmitters equivalent to 2 hours of sleep. What does your recovery look like on a typical day?",
    ],
    assessment: [
      "Focus on your lowest-scoring dimensions — that's where 5 points of improvement creates the biggest compound effect on your overall score. What in your results feels most surprising or concerning?",
    ],
    action: [
      "Rule one: always start with your lowest-scoring dimension. That's where the least effort creates the most impact. Based on your data, what feels most urgent — sleep, stress, or something else?",
    ],
    tradition: [
      "All traditions — from Ayurveda to Rambam — agree on one thing: imbalance in one system pulls down the others. Which tradition are you most curious about, and why?",
    ],
    generic: [
      "Tell me more — what specifically is happening? The more concrete you are, the more precise I can be.",
      "To give you something actually useful, I need to understand: is this an acute situation (feeling bad now) or do you want to systematically improve something long-term?",
    ],
  },
}

const FALLBACK_SUGGESTIONS: Record<string, Partial<Record<TopicKey | 'generic', string[]>>> = {
  ru: {
    sleep: ['Сложно заснуть', 'Просыпаюсь ночью', 'Встаю уставшим', 'Как улучшить сон?'],
    stress: ['Давит работа', 'Тревога внутри', 'Что поможет быстро?', 'Хронический стресс'],
    nutrition: ['Что есть на завтрак?', 'Как убрать тягу к сладкому', 'Режим питания', 'Белок в рационе'],
    movement: ['Нет времени на спорт', 'С чего начать?', 'Кардио зона 2', 'Упражнения дома'],
    energy: ['Устал с утра', 'Спад после обеда', 'К вечеру нет сил', 'Как поднять энергию?'],
    emotional: ['Тревога и стресс', 'Трудно в отношениях', 'Ощущение выгорания', 'Как стабилизировать?'],
    purpose: ['Нет мотивации', 'Работа кажется бессмысленной', 'Хочу найти направление', 'Как найти смысл?'],
    recovery: ['Что такое NSDR?', 'Дыхательные практики', 'Как восстановиться быстро?', 'Сауна и здоровье'],
    assessment: ['Сон', 'Стресс', 'Питание', 'Что улучшить первым?'],
    action: ['Начать со сна', 'Разобраться со стрессом', 'Улучшить питание', 'Первые шаги'],
    tradition: ['Аюрведа и дош', 'Рамбам — 6 основ', 'Тибетская медицина', 'TCM и ци'],
    generic: ['Проблемы со сном', 'Много стресса', 'Нет энергии', 'Что улучшить первым?'],
  },
  he: {
    sleep: ['קשה להירדם', 'מתעורר בלילה', 'קם עייף', 'איך לשפר שינה?'],
    stress: ['לחץ בעבודה', 'חרדה פנימית', 'מה עוזר מהר?', 'לחץ כרוני'],
    nutrition: ['מה לאכול לארוחת בוקר?', 'איך להפחית חשק למתוק', 'זמן ארוחות', 'חלבון בתפריט'],
    movement: ['אין זמן לספורט', 'מאיפה להתחיל?', 'קרדיו אזור 2', 'תרגילים בבית'],
    energy: ['עייף בבוקר', 'ירידה אחרי הצהריים', 'אין כוח בערב', 'איך להעלות אנרגיה?'],
    emotional: ['חרדה ולחץ', 'קשה ביחסים', 'תחושת שחיקה', 'איך להתייצב?'],
    purpose: ['אין מוטיבציה', 'העבודה חסרת משמעות', 'רוצה כיוון', 'איך למצוא משמעות?'],
    assessment: ['שינה', 'לחץ', 'תזונה', 'מה לשפר ראשון?'],
    action: ['להתחיל עם שינה', 'לטפל בלחץ', 'לשפר תזונה', 'צעדים ראשונים'],
    tradition: ['איורוודה', 'רמב"ם 6 עקרונות', 'רפואה טיבטית', 'TCM וצ׳י'],
    generic: ['בעיות שינה', 'הרבה לחץ', 'אין אנרגיה', 'מה לשפר ראשון?'],
  },
  de: {
    sleep: ['Schwer einzuschlafen', 'Wache nachts auf', 'Stehe erschöpft auf', 'Wie Schlaf verbessern?'],
    stress: ['Arbeitsdruck', 'Innere Angst', 'Was hilft schnell?', 'Chronischer Stress'],
    nutrition: ['Was zum Frühstück?', 'Heißhunger reduzieren', 'Essenszeiten', 'Protein im Alltag'],
    movement: ['Keine Zeit für Sport', 'Wo anfangen?', 'Zone-2-Cardio', 'Übungen zu Hause'],
    energy: ['Morgens müde', 'Nachmittags-Einbruch', 'Abends keine Kraft', 'Energie steigern?'],
    emotional: ['Angst und Stress', 'Beziehungsprobleme', 'Burnout-Gefühl', 'Wie stabilisieren?'],
    purpose: ['Keine Motivation', 'Arbeit fühlt sich sinnlos an', 'Richtung finden', 'Sinn finden?'],
    assessment: ['Schlaf', 'Stress', 'Ernährung', 'Was zuerst verbessern?'],
    action: ['Mit Schlaf anfangen', 'Stress angehen', 'Ernährung verbessern', 'Erste Schritte'],
    tradition: ['Ayurveda', 'Rambam 6 Grundlagen', 'Tibetische Medizin', 'TCM und Qi'],
    generic: ['Schlafprobleme', 'Viel Stress', 'Keine Energie', 'Was zuerst verbessern?'],
  },
  en: {
    sleep: ['Hard to fall asleep', 'Wake during the night', 'Wake up exhausted', 'How to improve sleep?'],
    stress: ['Work pressure', 'Inner anxiety', 'What helps fast?', 'Chronic stress'],
    nutrition: ['What to eat for breakfast?', 'Reduce sugar cravings', 'Meal timing', 'Protein intake'],
    movement: ['No time for exercise', 'Where to start?', 'Zone 2 cardio', 'Home workouts'],
    energy: ['Tired in the morning', 'Afternoon slump', 'No energy by evening', 'How to boost energy?'],
    emotional: ['Anxiety and stress', 'Relationship difficulties', 'Feeling burned out', 'How to stabilize?'],
    purpose: ['No motivation', 'Work feels meaningless', 'Want to find direction', 'How to find meaning?'],
    recovery: ['What is NSDR?', 'Breathing practices', 'How to recover faster?', 'Sauna benefits'],
    assessment: ['Sleep', 'Stress', 'Nutrition', 'What to improve first?'],
    action: ['Start with sleep', 'Address stress', 'Improve nutrition', 'First steps'],
    tradition: ['Ayurveda doshas', 'Rambam 6 pillars', 'Tibetan medicine', 'TCM and Qi'],
    generic: ['Sleep issues', 'Too much stress', 'Low energy', 'What to improve first?'],
  },
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function extractSuggestions(raw: string): { reply: string; suggestions: string[] } {
  const marker = 'SUGGESTIONS:'
  const idx = raw.lastIndexOf(marker)
  if (idx === -1) return { reply: raw.trim(), suggestions: [] }
  const reply = raw.slice(0, idx).trim()
  const suggLine = raw.slice(idx + marker.length).trim()
  const suggestions = suggLine
    .split('|')
    .map(s => s.replace(/^\[|\]$/g, '').trim())
    .filter(Boolean)
    .slice(0, 4)
  return { reply, suggestions }
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function getSmartFallback(
  message: string,
  history: Array<{ role: string; content: string }>,
  score: number,
  lang: string
): { reply: string; suggestions: string[] } {
  const lang2 = (lang in TOPIC_PATTERNS) ? lang : 'en'
  const m = message.toLowerCase()
  const patterns = TOPIC_PATTERNS[lang2] ?? []
  const isFirstReply = history.filter(h => h.role === 'assistant').length === 0

  for (const { keywords, topic } of patterns) {
    if (keywords.some(kw => m.includes(kw))) {
      const replies = FALLBACK_REPLIES[lang2]?.[topic]
      const suggestions = FALLBACK_SUGGESTIONS[lang2]?.[topic] ?? FALLBACK_SUGGESTIONS[lang2]?.generic ?? []
      if (replies && replies.length > 0) {
        return { reply: pick(replies), suggestions }
      }
    }
  }

  // No keyword match
  if (isFirstReply) {
    // First turn: score-based opening
    const key = score < 50 ? 'general_low' : score < 72 ? 'general_mid' : 'general_high'
    const scoreReplies: Record<string, Record<string, string>> = {
      ru: {
        general_low: `Вижу, что есть над чем поработать. При балле ${score}/100 самое важное — начать со сна: это фундамент. Что сейчас мешает высыпаться?`,
        general_mid: `У вас хорошая база (${score}/100), но есть конкретные точки роста. Расскажите, что сейчас ощущается наиболее разбалансированным — и мы начнём именно с этого.`,
        general_high: `Впечатляющий уровень (${score}/100). Теперь вопрос тонкой настройки. Что именно хотите улучшить или поддержать?`,
      },
      he: {
        general_low: `רואה שיש מה לעבוד עליו. עם ציון ${score}/100 הכי חשוב להתחיל עם שינה — היא הבסיס. מה מונע ממך לישון טוב?`,
        general_mid: `יש לך בסיס טוב (${score}/100), אבל יש נקודות צמיחה ספציפיות. מה מרגיש הכי לא מאוזן — ונתחיל משם.`,
        general_high: `רמה מרשימה (${score}/100). עכשיו שאלת הכוונון העדין. מה בדיוק רוצה לשפר?`,
      },
      de: {
        general_low: `Ich sehe, dass es einiges zu verbessern gibt. Bei einem Wert von ${score}/100 ist Schlaf am wichtigsten — er ist das Fundament. Was hindert Sie am guten Schlafen?`,
        general_mid: `Sie haben eine gute Basis (${score}/100), aber konkrete Wachstumspunkte. Was fühlt sich am unausgewogensten an?`,
        general_high: `Beeindruckendes Niveau (${score}/100). Was genau möchten Sie verbessern oder aufrechterhalten?`,
      },
      en: {
        general_low: `I can see there's meaningful room to improve (${score}/100). The single highest-leverage starting point is sleep — it's the foundation everything rests on. What's getting in the way of good sleep for you?`,
        general_mid: `You have a solid base (${score}/100) with specific growth points. Tell me what feels most off-balance right now, and that's where we'll start.`,
        general_high: `You're at a strong level (${score}/100). Now it's about fine-tuning. What specifically do you want to improve or maintain?`,
      },
    }
    const reply = scoreReplies[lang2]?.[key] ?? scoreReplies.en[key]
    const sugg = FALLBACK_SUGGESTIONS[lang2]?.generic ?? []
    return { reply, suggestions: sugg }
  }

  // Mid-conversation, no keyword match — generic but not a greeting
  const genericReplies = FALLBACK_REPLIES[lang2]?.generic ?? FALLBACK_REPLIES.en.generic ?? []
  const sugg = FALLBACK_SUGGESTIONS[lang2]?.generic ?? []
  return { reply: pick(genericReplies), suggestions: sugg }
}

// ─── Route ───────────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { message, sessionId, context, locale, history } = await req.json()
    if (!message) return NextResponse.json({ error: 'Message required' }, { status: 400 })

    const lang = (locale as string) in LANG_INSTRUCTIONS ? (locale as string) : 'en'
    const langInstruction = LANG_INSTRUCTIONS[lang]

    // Load or create session
    let session = null
    if (sessionId) {
      const { data } = await supabase.from('coaching_sessions').select('*').eq('id', sessionId).eq('user_id', user.id).single()
      session = data
    }

    const messages: Array<{ role: string; content: string; timestamp: string }> =
      session?.messages ?? (Array.isArray(history) ? history.map((m: { role: string; content: string }) => ({
        role: m.role, content: m.content, timestamp: new Date().toISOString(),
      })) : [])

    messages.push({ role: 'user', content: message, timestamp: new Date().toISOString() })

    // Build rich context string — highlight weakest dimensions
    let contextStr = ''
    if (context) {
      const scores = context.scores ?? {}
      const sorted = Object.entries(scores)
        .filter(([, v]) => typeof v === 'number')
        .sort(([, a], [, b]) => (a as number) - (b as number))
      const weakest = sorted.slice(0, 3).map(([k, v]) => `${k}: ${v}/100`).join(', ')
      const strongest = sorted.slice(-2).map(([k, v]) => `${k}: ${v}/100`).join(', ')
      contextStr = `USER WELLNESS DATA (use this to personalise every response):
- Overall score: ${context.composite ?? '?'}/100 — ${context.state ?? 'unknown'}
- Framework: ${context.framework ?? 'unknown'}
- WEAKEST dimensions (focus here): ${weakest || 'not available'}
- Strongest dimensions: ${strongest || 'not available'}
- Full scores: ${JSON.stringify(scores)}`
    }

    const systemPrompt = [SYSTEM_PROMPT, contextStr, langInstruction].filter(Boolean).join('\n\n')

    const apiKey = process.env.ANTHROPIC_API_KEY
    let reply = ''
    let suggestions: string[] = []

    if (apiKey) {
      try {
        const { default: Anthropic } = await import('@anthropic-ai/sdk')
        const client = new Anthropic({ apiKey })
        const response = await client.messages.create({
          model: 'claude-haiku-4-5-20251001',  // faster + cheaper for chat
          max_tokens: 600,
          system: systemPrompt,
          messages: messages.slice(-8).map((m: { role: string; content: string }) => ({
            role: m.role as 'user' | 'assistant',
            content: m.content,
          })),
        })
        const raw = response.content[0].type === 'text' ? response.content[0].text : ''
        const extracted = extractSuggestions(raw)
        reply = extracted.reply
        suggestions = extracted.suggestions
      } catch (apiErr) {
        console.error('Anthropic API error:', apiErr)
        // Fall through to smart fallback
        const userScore = context?.composite ?? 65
        const historyMsgs = messages.slice(0, -1)
        const fallback = getSmartFallback(message, historyMsgs, userScore, lang)
        reply = fallback.reply
        suggestions = fallback.suggestions
      }
    } else {
      const userScore = context?.composite ?? 65
      const historyMsgs = messages.slice(0, -1)
      const fallback = getSmartFallback(message, historyMsgs, userScore, lang)
      reply = fallback.reply
      suggestions = fallback.suggestions
    }

    messages.push({ role: 'assistant', content: reply, timestamp: new Date().toISOString() })

    // Upsert session
    if (session) {
      await supabase.from('coaching_sessions').update({ messages, updated_at: new Date().toISOString() }).eq('id', session.id)
    } else {
      const { data: newSession } = await supabase.from('coaching_sessions').insert({
        user_id: user.id, messages, framework: context?.framework,
      }).select('id').single()
      session = newSession
    }

    return NextResponse.json({ reply, suggestions, sessionId: session?.id })
  } catch (err) {
    console.error('Coach API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
