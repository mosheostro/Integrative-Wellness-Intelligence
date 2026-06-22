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

type ExtendedTopicKey = TopicKey | 'assessment' | 'action' | 'tradition' | 'ayurveda' | 'rambam' | 'tibetan' | 'daoist' | 'swarga' | 'hippocrates' | 'avicenna'

const TOPIC_PATTERNS: Record<string, { keywords: string[]; topic: ExtendedTopicKey }[]> = {
  ru: [
    { keywords: ['оценк', 'результат', 'тест', 'показател', 'балл', 'счёт', 'анализ', 'последн', 'скор', 'показыва', 'раскрыва'], topic: 'assessment' },
    { keywords: ['что делать', 'с чего начать', 'как улучш', 'порекоменд', 'совет', 'план', 'шаг', 'приоритет'], topic: 'action' },
    { keywords: ['аюрвед'], topic: 'ayurveda' },
    { keywords: ['рамбам', 'rambam', 'маймонид'], topic: 'rambam' },
    { keywords: ['тибет'], topic: 'tibetan' },
    { keywords: ['даос', 'кит', 'tcm', 'ицзин'], topic: 'daoist' },
    { keywords: ['сварга', 'swarga'], topic: 'swarga' },
    { keywords: ['гиппократ'], topic: 'hippocrates' },
    { keywords: ['авиценн', 'ибн сина'], topic: 'avicenna' },
    { keywords: ['сон', 'спать', 'засыпа', 'просыпа', 'ночь', 'бессонн', 'дремот'], topic: 'sleep' },
    { keywords: ['стресс', 'тревог', 'волнен', 'паник', 'нервн', 'напряж', 'давлен'], topic: 'stress' },
    { keywords: ['питан', 'еда', 'диет', 'вес', 'калор', 'овощ', 'фрукт', 'сахар'], topic: 'nutrition' },
    { keywords: ['движен', 'трениров', 'спорт', 'упражн', 'физич', 'бегать', 'йога'], topic: 'movement' },
    { keywords: ['энерги', 'бодрост', 'сил', 'вялост', 'жизненн'], topic: 'energy' },
    { keywords: ['эмоц', 'настро', 'чувств', 'отношен', 'счасть', 'депресс', 'радост'], topic: 'emotional' },
    { keywords: ['цель', 'смысл', 'мотиваци', 'предназнач', 'призван', 'будущ'], topic: 'purpose' },
    { keywords: ['усталост'], topic: 'energy' },
  ],
  he: [
    { keywords: ['הערכה', 'תוצאות', 'ציון', 'בדיקה', 'ניתוח', 'האחרונה', 'מגלה'], topic: 'assessment' },
    { keywords: ['מה לעשות', 'איך להתחיל', 'המלצה', 'עצה', 'תוכנית', 'שלבים', 'עדיפות'], topic: 'action' },
    { keywords: ['איורוודה', 'איורוודי'], topic: 'ayurveda' },
    { keywords: ['רמב"ם', 'רמבם', 'maimonides'], topic: 'rambam' },
    { keywords: ['טיבטי', 'טיבט'], topic: 'tibetan' },
    { keywords: ['טאואיזם', 'סיני', 'tcm'], topic: 'daoist' },
    { keywords: ['שינה', 'לישון', 'עייפ', 'ערנות', 'לילה', 'להירדם'], topic: 'sleep' },
    { keywords: ['לחץ', 'חרדה', 'דאגה', 'עצבים', 'פחד', 'מתח'], topic: 'stress' },
    { keywords: ['תזונה', 'אוכל', 'דיאטה', 'משקל', 'קלוריות', 'סוכר'], topic: 'nutrition' },
    { keywords: ['תנועה', 'אימון', 'ספורט', 'פעילות', 'יוגה', 'ריצה'], topic: 'movement' },
    { keywords: ['אנרגיה', 'עייפות', 'עוצמה', 'כוח', 'חיוניות'], topic: 'energy' },
    { keywords: ['רגשות', 'תחושה', 'קשרים', 'שמחה', 'דיכאון'], topic: 'emotional' },
    { keywords: ['מטרה', 'משמעות', 'מוטיבציה', 'ייעוד', 'עתיד'], topic: 'purpose' },
  ],
  de: [
    { keywords: ['bewertung', 'ergebnis', 'test', 'analyse', 'letzte', 'zeigt', 'punktzahl'], topic: 'assessment' },
    { keywords: ['was tun', 'wie verbessern', 'empfehlung', 'ratschlag', 'plan', 'schritte', 'priorität'], topic: 'action' },
    { keywords: ['ayurveda', 'ayurvedisch'], topic: 'ayurveda' },
    { keywords: ['rambam', 'maimonides'], topic: 'rambam' },
    { keywords: ['tibetisch', 'tibet'], topic: 'tibetan' },
    { keywords: ['daoist', 'chinesisch', 'tcm'], topic: 'daoist' },
    { keywords: ['schlaf', 'schlafen', 'müd', 'einschlaf', 'nacht', 'erschöpf'], topic: 'sleep' },
    { keywords: ['stress', 'angst', 'sorge', 'nerv', 'anspann', 'druck'], topic: 'stress' },
    { keywords: ['ernähr', 'essen', 'diät', 'gewicht', 'kalori', 'zucker'], topic: 'nutrition' },
    { keywords: ['bewegung', 'training', 'sport', 'übung', 'yoga', 'laufen'], topic: 'movement' },
    { keywords: ['energie', 'müdig', 'vitalität', 'kraft'], topic: 'energy' },
    { keywords: ['emotion', 'stimmung', 'gefühl', 'beziehung', 'freude', 'depression'], topic: 'emotional' },
    { keywords: ['ziel', 'sinn', 'motivation', 'zweck', 'zukunft'], topic: 'purpose' },
  ],
  en: [
    { keywords: ['assessment', 'result', 'score', 'test', 'analysis', 'reveal', 'show', 'latest', 'findings'], topic: 'assessment' },
    { keywords: ['what should', 'what do i', 'how do i', 'where to start', 'recommend', 'advice', 'plan', 'steps', 'priorit', 'next'], topic: 'action' },
    { keywords: ['ayurveda', 'ayurvedic', 'dosha', 'vata', 'pitta', 'kapha'], topic: 'ayurveda' },
    { keywords: ['rambam', 'maimonides', 'jewish medicine'], topic: 'rambam' },
    { keywords: ['tibetan', 'tibet', 'sowa rigpa', 'men-tsee'], topic: 'tibetan' },
    { keywords: ['daoist', 'daoism', 'taoism', 'tcm', 'chinese medicine', 'qi', 'yin', 'yang'], topic: 'daoist' },
    { keywords: ['swarga', 'integral', 'holos system'], topic: 'swarga' },
    { keywords: ['hippocrates', 'hippocratic', 'greek medicine'], topic: 'hippocrates' },
    { keywords: ['avicenna', 'ibn sina', 'islamic medicine', 'unani'], topic: 'avicenna' },
    { keywords: ['sleep', 'tired', 'rest', 'insomnia', 'night', 'fatigue', 'wake'], topic: 'sleep' },
    { keywords: ['stress', 'anxiety', 'worry', 'nervous', 'overwhelm', 'panic'], topic: 'stress' },
    { keywords: ['nutrition', 'food', 'diet', 'weight', 'eat', 'calories', 'sugar'], topic: 'nutrition' },
    { keywords: ['movement', 'exercise', 'workout', 'sport', 'yoga', 'run', 'gym'], topic: 'movement' },
    { keywords: ['energy', 'vitality', 'strength', 'sluggish', 'lethargic'], topic: 'energy' },
    { keywords: ['emotion', 'mood', 'feeling', 'relationship', 'happy', 'depress'], topic: 'emotional' },
    { keywords: ['purpose', 'meaning', 'motivation', 'goal', 'mission', 'future'], topic: 'purpose' },
    { keywords: ['tired', 'fatigue', 'exhausted'], topic: 'energy' },
  ],
}

const TOPIC_REPLIES: Record<string, Partial<Record<ExtendedTopicKey, string>>> = {
  ru: {
    assessment: 'Ваши результаты показывают многомерную картину. Ключевые инсайты: наибольшее влияние на ваш общий балл сейчас оказывают измерения с наименьшими значениями — именно они дают наибольший потенциал роста. С каким из них вы хотите разобраться в первую очередь?',
    action: 'Самый эффективный первый шаг — всегда работать с самым слабым измерением: именно там 5 единиц роста дадут максимальный суммарный эффект. Расскажите, какое направление кажется вам наиболее срочным прямо сейчас — сон, стресс или что-то другое?',
    ayurveda: 'Аюрведа смотрит на ваши результаты через призму трёх дош — Вата, Питта, Капха. Дисбаланс в каждой проявляется по-разному: Вата — тревога и нарушения сна, Питта — воспаления и раздражительность, Капха — вялость и набор веса. Какой из этих паттернов вам ближе всего?',
    rambam: 'Рамбам (Маймонид) учил, что здоровье держится на шести основах: воздух, еда и питьё, движение и покой, сон и бодрствование, выделение и наполнение, душевные движения. Нарушение любой из них истощает остальные. Что из этих шести сейчас вызывает наибольшее беспокойство?',
    tibetan: 'Тибетская медицина (Сова Ригпа) рассматривает здоровье через баланс трёх «нёпа»: Лунг (ветер), Трипа (жёлчь) и Пэйкэн (слизь). Тибетские врачи особенно акцентируют роль ума в физическом здоровье — психический и телесный дисбаланс неразделимы. Что доминирует в ваших симптомах — нервозность, жар или тяжесть?',
    daoist: 'Даосская медицина (ТКМ) видит здоровье как свободный поток Ци по меридианам. Когда поток блокируется — проявляются симптомы. Ваши показатели указывают на области, где этот поток ослаблен. Что вы чувствуете — больше застой и тяжесть, или наоборот — рассеянность и нехватку концентрации?',
    swarga: 'Система Сварга — интегральный подход, объединяющий древние традиции с современной нейронаукой. Она рассматривает вас как целостную систему из девяти взаимосвязанных измерений. Какое из них, по вашему ощущению, сейчас наиболее разбалансировано?',
    hippocrates: 'Гиппократ учил, что «пусть еда будет твоим лекарством». Он рассматривал здоровье как баланс четырёх жидкостей тела и подчёркивал роль диеты, движения и природной среды. Что из этого — питание, движение или окружение — сейчас наиболее разбалансировано?',
    avicenna: 'Авиценна (Ибн Сина) в «Каноне врачебной науки» описал девять факторов здоровья — от темперамента до образа жизни. Он особо выделял связь между душой и телом: душевные расстройства всегда проявляются физически. Что сейчас ощущается более нарушенным — тело или состояние духа?',
    sleep: 'Сон — это фундамент всего. Давайте разберёмся: вам сложнее засыпать, просыпаетесь ночью или встаёте уже уставшим? Каждый из этих паттернов имеет своё решение.',
    stress: 'Хронический стресс незаметно истощает ресурсы организма. Расскажите — это больше внешнее давление (работа, отношения) или внутреннее ощущение тревоги? Понимание источника определяет инструменты.',
    nutrition: 'Питание влияет на энергию, сон и настроение сильнее, чем большинство думает. Что сейчас вызывает больше всего трудностей — время приёмов пищи, качество продуктов или что-то другое?',
    movement: 'Движение — это сигнал телу о жизнеспособности. Что для вас сейчас мешает двигаться больше — время, мотивация, физическое состояние или что-то ещё?',
    energy: 'Стабильная энергия — это не про кофе, это про систему. Когда именно вы чувствуете спад — утром, после обеда или к вечеру? Это важно для точной работы.',
    emotional: 'Эмоциональное состояние — это ресурс, который нуждается в поддержке так же, как физическое тело. Что сейчас ощущается наиболее тяжёлым?',
    purpose: 'Чувство смысла — это не роскошь, это физиологическая потребность. Есть ли что-то, что раньше приносило смысл и сейчас ощущается менее живым?',
    general_low: 'Я вижу, что вы сейчас в непростом периоде. Лучший первый шаг — сон: это основа, на которой строится всё остальное. Что сейчас мешает вам высыпаться?',
    general_mid: 'Что именно привело вас сюда сегодня? Расскажите о своём главном запросе — и мы составим конкретный план.',
    general_high: 'Вы уже на сильном уровне. Теперь вопрос в тонкой настройке и устойчивости. Что из вашей практики ощущается сейчас наиболее живым?',
  },
  he: {
    assessment: 'התוצאות שלך מראות תמונה רב-ממדית. הממדים עם הציונים הנמוכים ביותר הם אלה שמציעים את פוטנציאל הצמיחה הגדול ביותר. עם איזה מהם תרצה להתחיל?',
    action: 'הצעד הראשון היעיל ביותר הוא לעבוד על הממד החלש ביותר שלך — שם 5 נקודות של שיפור ייתנו את האפקט הכולל הגדול ביותר. מה נראה לך הדחוף ביותר עכשיו?',
    ayurveda: 'האיורוודה רואה את התוצאות שלך דרך שלוש הדושות — ואטה, פיטה, קאפה. אי-איזון בכל אחת מתבטא אחרת. איזה דפוס הכי מוכר לך — חרדה וחוסר שינה, דלקת ועצבנות, או עייפות ועלייה במשקל?',
    rambam: 'הרמב"ם לימד שהבריאות נשענת על שישה יסודות: אוויר, מזון ומשקה, תנועה ומנוחה, שינה וערות, הפרשה ומילוי, ותנועות הנפש. מה מהם מטריד אותך יותר?',
    tibetan: 'הרפואה הטיבטית רואה את הגוף דרך שלוש עקרונות — לונג (רוח), טריפה (מרה) ופקאן (ליחה). מה דומיננטי יותר — עצבנות, חום פנימי, או כבדות?',
    daoist: 'הרפואה הסינית מסתכלת על בריאות כזרימה חופשית של צ\'י. כשהזרימה נחסמת מופיעים תסמינים. מה אתה מרגיש יותר — תחושת תקיעות וכבדות, או חוסר ריכוז ופיזור?',
    sleep: 'שינה היא הבסיס לכל. בואו נבין — קשה לך להירדם, אתה מתעורר בלילה, או קם עייף? לכל דפוס יש פתרון משלו.',
    stress: 'לחץ כרוני מרוקן את משאבי הגוף בשקט. ספר לי — האם זה לחץ חיצוני (עבודה, מערכות יחסים) או תחושה פנימית של חרדה?',
    nutrition: 'תזונה משפיעה על אנרגיה, שינה ומצב רוח יותר ממה שרוב האנשים חושבים. מה הכי קשה עכשיו?',
    movement: 'תנועה היא אות לגוף על חיוניות. מה מונע ממך לזוז יותר כרגע — זמן, מוטיבציה, מצב פיזי?',
    energy: 'אנרגיה יציבה היא לא קפאין, זה מערכת שלמה. מתי בדיוק אתה מרגיש ירידה — בבוקר, אחרי הצהריים, או בערב?',
    emotional: 'מצב רגשי הוא משאב שצריך תמיכה כמו הגוף הפיזי. מה מרגיש הכי כבד כרגע?',
    purpose: 'תחושת משמעות היא לא מותרות, היא צורך פיזיולוגי. יש משהו שפעם נתן משמעות ועכשיו מרגיש פחות חי?',
    general_low: 'אני רואה שאתה בתקופה מאתגרת. הצעד הראשון הכי טוב הוא שינה — היא הבסיס לכל השאר. מה מונע ממך לישון טוב כרגע?',
    general_mid: 'מה הביא אותך לכאן היום? ספר לי על הבקשה העיקרית שלך ונבנה תוכנית ספציפית.',
    general_high: 'אתה כבר ברמה חזקה. עכשיו השאלה היא כוונון עדין וקיימות. מה מהפרקטיקה שלך מרגיש הכי חי עכשיו?',
  },
  de: {
    assessment: 'Ihre Ergebnisse zeigen ein mehrdimensionales Bild. Die Dimensionen mit den niedrigsten Werten bieten das größte Wachstumspotenzial. Mit welcher möchten Sie zuerst arbeiten?',
    action: 'Der effektivste erste Schritt ist, an Ihrer schwächsten Dimension zu arbeiten — dort bringen 5 Punkte Verbesserung den größten Gesamteffekt. Was erscheint Ihnen gerade am dringendsten?',
    ayurveda: 'Das Ayurveda betrachtet Ihre Ergebnisse durch drei Doshas — Vata, Pitta, Kapha. Welches Muster kommt Ihnen bekannt vor — Angst und Schlafstörungen, Entzündungen und Reizbarkeit, oder Trägheit und Gewichtszunahme?',
    rambam: 'Rambam lehrte sechs Grundlagen der Gesundheit: Luft, Essen und Trinken, Bewegung und Ruhe, Schlaf und Wachen, Ausscheidung und Auffüllung, und Seelenbewegungen. Welche bereitet Ihnen gerade die größten Schwierigkeiten?',
    tibetan: 'Die tibetische Medizin betrachtet Gesundheit durch drei Prinzipien — Lung (Wind), Tripa (Galle) und Peyken (Schleim). Was dominiert bei Ihnen — Nervosität, innere Hitze oder Schwere?',
    daoist: 'Die traditionelle chinesische Medizin sieht Gesundheit als freien Fluss von Qi durch Meridiane. Wenn dieser blockiert ist, entstehen Symptome. Fühlen Sie eher Stagnation und Schwere, oder Unkonzentriertheit und Zerstreutheit?',
    sleep: 'Schlaf ist das Fundament von allem. Haben Sie Schwierigkeiten einzuschlafen, wachen Sie nachts auf, oder wachen Sie schon erschöpft auf?',
    stress: 'Chronischer Stress erschöpft die Ressourcen des Körpers unmerklich. Ist es mehr äußerer Druck oder ein inneres Gefühl der Angst?',
    nutrition: 'Ernährung beeinflusst Energie, Schlaf und Stimmung stärker, als die meisten denken. Was bereitet Ihnen gerade die größten Schwierigkeiten?',
    movement: 'Bewegung ist ein Signal des Körpers für Vitalität. Was hindert Sie daran, sich mehr zu bewegen?',
    energy: 'Stabile Energie dreht sich nicht um Koffein, sondern um das System. Wann spüren Sie einen Einbruch — morgens, nach dem Mittagessen oder abends?',
    emotional: 'Der emotionale Zustand ist eine Ressource, die genauso Unterstützung braucht wie der physische Körper. Was fühlt sich gerade am schwersten an?',
    purpose: 'Sinn ist kein Luxus, es ist ein physiologisches Bedürfnis. Gibt es etwas, das früher Sinn gegeben hat und sich jetzt weniger lebendig anfühlt?',
    general_low: 'Ich sehe, dass Sie gerade in einer schwierigen Phase sind. Der beste erste Schritt ist Schlaf. Was hindert Sie daran, gut zu schlafen?',
    general_mid: 'Was hat Sie heute hierher gebracht? Erzählen Sie mir von Ihrem Hauptanliegen, und wir erstellen einen konkreten Plan.',
    general_high: 'Sie sind bereits auf einem starken Niveau. Jetzt geht es um Feinabstimmung. Was fühlt sich in Ihrer Praxis gerade am lebendigsten an?',
  },
  en: {
    assessment: 'Your assessment reveals a multi-dimensional picture of your current wellness. The dimensions with the lowest scores are where small improvements create the biggest compound effect on your overall score. Which area would you like to explore first — or shall I walk you through the key findings?',
    action: 'The highest-leverage first step is always your lowest-scoring dimension — that\'s where improving 5 points gives you the biggest overall gain. Based on typical patterns, that usually means starting with either sleep or stress regulation. Which of those feels most pressing for you right now?',
    ayurveda: 'Ayurveda maps your results through three doshas — Vata (movement/air), Pitta (transformation/fire), Kapha (stability/earth). Each imbalance shows differently: Vata as anxiety and sleep issues, Pitta as inflammation and irritability, Kapha as sluggishness and weight gain. Which pattern resonates most with you?',
    rambam: 'Rambam (Maimonides) identified six pillars of health: air quality, food and drink, movement and rest, sleep and wakefulness, excretion and retention, and emotional state. He taught that neglecting any one depletes the others. Which of these six feels most out of balance for you right now?',
    tibetan: 'Tibetan medicine (Sowa Rigpa) reads health through three Nyepa — Lung (wind/nervous system), Tripa (bile/metabolism), Peyken (phlegm/structure). It places particular emphasis on the mind\'s role in physical health. What dominates your symptoms — restlessness and anxiety, internal heat, or heaviness and sluggishness?',
    daoist: 'Daoist medicine (TCM) sees health as the free flow of Qi through meridians. When flow is blocked, symptoms arise. Your scores point to areas where this flow is weakened. Do you feel more stagnation and heaviness, or scattered energy and difficulty focusing?',
    swarga: 'The Swarga Integral System brings together ancient traditions and modern neuroscience, viewing you as a nine-dimensional interconnected system. Every dimension affects the others — so the goal isn\'t perfection in one area, but dynamic harmony across all nine. Which dimension feels most out of sync for you right now?',
    hippocrates: 'Hippocrates taught "let food be thy medicine." He viewed health as balance of the four humors, and emphasized diet, movement, and natural environment above all. Which of these three — nutrition, movement, or your environment — feels most disrupted right now?',
    avicenna: 'Avicenna\'s Canon of Medicine described nine factors of health — from temperament to lifestyle — and especially highlighted the soul-body connection: emotional disturbances always manifest physically. What feels more disrupted right now — your physical body or your inner state?',
    sleep: 'Sleep is the foundation of everything else. Let\'s get specific — is it hard to fall asleep, do you wake during the night, or do you wake already tired? Each pattern points to a different solution.',
    stress: 'Chronic stress quietly drains your body\'s reserves. Tell me — is this more external pressure (work, relationships) or an internal sense of anxiety? Understanding the source defines the tools.',
    nutrition: 'Food affects energy, sleep and mood more than most people realise. What\'s causing the most difficulty right now — meal timing, food quality, or something else?',
    movement: 'Movement is a signal to the body about vitality. What\'s getting in the way of moving more right now — time, motivation, physical state?',
    energy: 'Stable energy isn\'t about caffeine, it\'s about systems. When exactly do you feel the dip — morning, after lunch, or in the evening? That timing matters.',
    emotional: 'Emotional state is a resource that needs support just like the physical body. What feels heaviest right now?',
    purpose: 'Meaning is not a luxury — it\'s a physiological need. Is there something that used to give you a sense of purpose that now feels less alive?',
    general_low: 'I can see you\'re in a difficult period right now. The best first step is sleep — it\'s the foundation everything else rests on. What\'s getting in the way of good sleep?',
    general_mid: 'What brought you here today? Tell me your main concern and we\'ll build a specific plan around it.',
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
