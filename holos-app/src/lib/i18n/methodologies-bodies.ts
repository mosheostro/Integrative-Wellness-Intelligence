// Tradition body texts + pillar lists for the methodologies page.
// Stored separately so translations.ts stays lean.
// Paragraph separator: \n\n (matches the page's split/map render pattern).

import type { Locale } from './translations'

export type ContentKey =
  | 'evidence' | 'rambam' | 'hippocrates' | 'avicenna'
  | 'ayurveda' | 'daoist' | 'tibetan' | 'swarga'

export type TraditionContent = { body: string; pillars: string[] }
type MethodologiesContent = Record<ContentKey, TraditionContent>

// ── English ───────────────────────────────────────────────────────────────────
const en: MethodologiesContent = {
  evidence: {
    body: `Evidence-Based Medicine (EBM) integrates the best available clinical research with individual patient circumstances and values. HOLOS uses EBM as its calibration layer — every dimension score is anchored in peer-reviewed biomarker research, epidemiological data, and clinical guidelines.\n\nIn HOLOS, EBM provides the measurable targets: optimal HRV ranges, sleep architecture percentages, macro ratios, VO₂ max benchmarks. It is the language that translates traditional insights into actionable numbers.`,
    pillars: ['Randomised controlled trials', 'Systematic reviews & meta-analyses', 'Biomarker optimisation', 'Personalised risk stratification'],
  },
  rambam: {
    body: `Rabbi Moses ben Maimon — known as Rambam (or Maimonides) — was simultaneously the greatest Jewish philosopher, the court physician of Saladin, and one of the most systematic medical thinkers in history. His "Regimen of Health" synthesised Galenic medicine, Islamic medicine, and Jewish law into a preventive wellness system eight centuries before preventive medicine existed.\n\nRambam's genius was prescriptive precision: specific sleep hours, dietary sequencing, emotional regulation practices, and a proto-psychosomatic understanding of how thoughts affect physical health. HOLOS uses the Rambam framework for users seeking a Jewish-ethical or historical Mediterranean lens on their wellness data.`,
    pillars: ['Preventive regimen (Hanhagat HaBriut)', 'Dietary sequencing and seasonal eating', 'Psychosomatic health (mind-body unity)', 'Sleep and rest as medical intervention'],
  },
  hippocrates: {
    body: `The Hippocratic tradition, codified in 460 BCE, established the foundational premise of Western medicine: that disease has natural causes and that the body has innate healing capacity. The four humours — blood, phlegm, yellow bile, black bile — were its diagnostic language, mapping to temperaments, seasons, and organ systems.\n\nWhat makes Hippocrates enduringly relevant is not the humours themselves but the framework: the clinician as observer of the whole patient in their environment, and health as dynamic balance rather than the absence of symptoms. HOLOS's nine-dimension model is a direct descendant of this insight.`,
    pillars: ['Four humours and constitutional types', 'Seasonal and environmental health', 'Diet and lifestyle as primary medicine', 'Vis medicatrix naturae (healing power of nature)'],
  },
  avicenna: {
    body: `Ibn Sina (Avicenna) wrote the Canon of Medicine in 1025 CE — a 14-volume encyclopaedia that remained the standard medical textbook in Europe and the Islamic world for six centuries. He synthesised Hippocratic, Galenic, and Aristotelian medicine with original insights in pharmacology, psychiatry, and preventive health.\n\nAvicenna's contribution to HOLOS is his concept of "Mizaj" — individual temperament — which becomes a precision personalisation layer. His six essential principles of health (air, food & drink, sleep & waking, movement & rest, evacuation & retention, mental states) map almost perfectly onto the nine HOLOS dimensions.`,
    pillars: ['Mizaj — individual temperamental constitution', 'Six essential principles of health', 'Polypharmacy and botanical medicine', 'Mental health as medical discipline'],
  },
  ayurveda: {
    body: `Ayurveda — the "knowledge of life" — is the oldest continuously practised medical system on Earth. Its central insight is that every individual has a unique constitutional type (Prakriti) composed of three doshas: Vata (air + space), Pitta (fire + water), and Kapha (earth + water). Disease arises when these doshas fall out of their individual balance.\n\nWhat makes Ayurveda extraordinary for HOLOS is its precision personalisation. The same food, sleep schedule, or exercise that heals one person can harm another — because their Prakriti differs. HOLOS uses dosha analysis to transform generic recommendations into constitution-specific guidance.`,
    pillars: ['Prakriti — constitutional typing (Vata/Pitta/Kapha)', 'Dinacharya — daily routine as medicine', 'Ritucharya — seasonal adaptation', 'Agni — digestive fire and metabolism'],
  },
  daoist: {
    body: `Daoist medical philosophy — the foundation of Traditional Chinese Medicine — sees the body as a microcosm of nature, governed by the same forces that move seasons and stars. Qi (vital energy) flows through meridian channels. The five elements (wood, fire, earth, metal, water) map to organ systems, emotions, seasons, and flavours. Health is the smooth, abundant flow of Qi; disease is its stagnation, deficiency, or excess.\n\nHOLOS applies the Daoist framework to reveal the energetic dimension of health that purely biochemical models miss.`,
    pillars: ['Qi cultivation and circulation', 'Five-element constitutional analysis', 'Yin-Yang balance across seasons', 'Meridian and organ-system relationships'],
  },
  tibetan: {
    body: `Tibetan medicine (Sowa Rigpa — "the science of healing") developed in the Himalayas over 1,400 years, synthesising Ayurvedic, Chinese, and Greek medicine with Buddhist philosophy. Its three humours — Lung (wind/air), Tripa (bile/fire), and Beken (phlegm/water-earth) — closely parallel Ayurvedic doshas but with a uniquely Tibetan psychological and spiritual dimension.\n\nWhat distinguishes Tibetan medicine in HOLOS is its sophisticated model of the mind-body relationship. The "Three Poisons" — ignorance, attachment, and aversion — are understood as the root causes of all physical disease.`,
    pillars: ['Three nyépa (Lung, Tripa, Beken) constitution', 'Urine analysis and pulse diagnostics', 'Mind-body-spirit integration', 'Spiritual root causes of disease (Three Poisons)'],
  },
  swarga: {
    body: `Swarga is the HOLOS synthesis framework — named after the Sanskrit concept of the bridge between earth and the divine. When you choose Swarga, HOLOS applies all eight wisdom frameworks simultaneously to your answers, weighs them by their relevance to each dimension, and synthesises a composite portrait that no single tradition could produce alone.\n\nSwarga is the recommendation for users who want the most complete possible view of their wellness. It is also the default recommendation for users new to integrative health who don't yet have a tradition affinity.`,
    pillars: ['Multi-tradition composite scoring', 'Cross-tradition agreement detection', 'Highest-confidence recommendation surfacing', 'AI coaching across all eight frameworks'],
  },
}

// ── Russian ───────────────────────────────────────────────────────────────────
const ru: MethodologiesContent = {
  evidence: {
    body: `Доказательная медицина (ДМ) объединяет лучшие доступные клинические данные с индивидуальными обстоятельствами и ценностями пациента. HOLOS использует ДМ как калибровочный уровень — каждый показатель измерения опирается на рецензируемые исследования биомаркеров, эпидемиологические данные и клинические руководства.\n\nВ системе HOLOS ДМ обеспечивает измеримые ориентиры: оптимальные диапазоны ВСР, соотношение фаз сна, макрохимические соотношения питательных веществ, нормы VO₂ max. Это язык, который переводит традиционные знания в конкретные, применимые на практике числа.`,
    pillars: ['Рандомизированные контролируемые испытания', 'Систематические обзоры и метаанализы', 'Оптимизация биомаркеров', 'Персонализированная стратификация рисков'],
  },
  rambam: {
    body: `Рабби Моше бен Маймон — известный как Рамбам (или Маймонид) — был одновременно величайшим еврейским философом, придворным врачом Саладина и одним из самых систематичных медицинских мыслителей в истории. Его «Режим здоровья» объединил галеновскую, исламскую и еврейскую медицину в профилактическую систему оздоровления — за восемь веков до появления профилактической медицины.\n\nГений Рамбама состоял в предписывающей точности: конкретные часы сна, последовательность питания, практики эмоциональной регуляции и протопсихосоматическое понимание того, как мысли влияют на физическое здоровье. HOLOS использует систему Рамбама для пользователей, желающих применить еврейско-этический или средиземноморский исторический взгляд к своим данным о здоровье.`,
    pillars: ['Профилактический режим (Ханхагат ха-Бриют)', 'Последовательность питания и сезонная диета', 'Психосоматическое здоровье (единство разума и тела)', 'Сон и отдых как медицинское вмешательство'],
  },
  hippocrates: {
    body: `Гиппократовская традиция, кодифицированная в 460 г. до н.э., установила основополагающий принцип западной медицины: болезни имеют естественные причины, а организм обладает врождённой способностью к исцелению. Четыре гумора — кровь, флегма, жёлтая желчь и чёрная желчь — составляли его диагностический язык, связанный с темпераментами, временами года и системами органов.\n\nНепреходящая актуальность Гиппократа определяется не самими гуморами, а основным принципом: врач как наблюдатель всего пациента в его окружении, здоровье как динамическое равновесие, а не отсутствие симптомов. Девятимерная модель HOLOS является прямым потомком этого понимания.`,
    pillars: ['Четыре гумора и конституциональные типы', 'Сезонное и средовое здоровье', 'Питание и образ жизни как первичная медицина', 'Vis medicatrix naturae (целительная сила природы)'],
  },
  avicenna: {
    body: `Ибн Сина (Авиценна) написал «Канон медицины» в 1025 году — 14-томную энциклопедию, остававшуюся стандартным медицинским учебником в Европе и исламском мире на протяжении шести веков. Он объединил гиппократовскую, галеновскую и аристотелевскую медицину с оригинальными открытиями в фармакологии, психиатрии и профилактическом здоровье.\n\nВклад Авиценны в HOLOS — его концепция «Мизадж» (индивидуального темперамента), которая образует уровень точной персонализации. Его шесть основных принципов здоровья (воздух, еда и питьё, сон и бодрствование, движение и отдых, выведение и задержание, психические состояния) почти идеально соответствуют девяти измерениям HOLOS.`,
    pillars: ['Мизадж — индивидуальная темпераментная конституция', 'Шесть основных принципов здоровья', 'Полифармакология и ботаническая медицина', 'Психическое здоровье как медицинская дисциплина'],
  },
  ayurveda: {
    body: `Аюрведа — «знание жизни» — является древнейшей непрерывно практикуемой медицинской системой на Земле. Её центральная идея состоит в том, что каждый человек обладает уникальным конституциональным типом (Пракрити), состоящим из трёх дош: Вата (воздух + пространство), Питта (огонь + вода) и Капха (земля + вода). Болезнь возникает, когда эти доши выходят из своего индивидуального равновесия.\n\nЧто делает Аюрведу исключительной для HOLOS — это точная персонализация. Одни и те же пища, режим сна или физические упражнения могут исцелять одного человека и вредить другому — потому что их Пракрити различается. HOLOS использует анализ дош для превращения общих рекомендаций в руководство, соответствующее конституции.`,
    pillars: ['Пракрити — конституциональный тип (Вата/Питта/Капха)', 'Динача́рья — ежедневный распорядок как медицина', 'Ритуча́рья — сезонная адаптация', 'Агни — пищеварительный огонь и метаболизм'],
  },
  daoist: {
    body: `Даосская медицинская философия — основа Традиционной китайской медицины — рассматривает тело как микрокосм природы, управляемый теми же силами, что движут временами года и звёздами. Ци (жизненная энергия) течёт по каналам-меридианам. Пять элементов (дерево, огонь, земля, металл, вода) соответствуют системам органов, эмоциям, временам года и вкусам. Здоровье — это плавное, обильное течение Ци; болезнь — её застой, недостаток или избыток.\n\nHOLOS применяет даосскую систему для выявления энергетического измерения здоровья, которое упускают чисто биохимические модели.`,
    pillars: ['Культивирование и циркуляция Ци', 'Конституциональный анализ пяти элементов', 'Баланс Инь-Ян по временам года', 'Меридианные связи и системы органов'],
  },
  tibetan: {
    body: `Тибетская медицина (Сова Ригпа — «наука исцеления») развивалась в Гималаях на протяжении 1 400 лет, синтезируя аюрведическую, китайскую и греческую медицину с буддийской философией. Три её юмора — Лунг (ветер/воздух), Трипа (желчь/огонь) и Бекен (флегма/вода-земля) — тесно параллельны аюрведическим дошам, но с уникальным тибетским психологическим и духовным измерением.\n\nЧто отличает тибетскую медицину в HOLOS — это её изощрённая модель взаимосвязи разума и тела. «Три яда» — невежество, привязанность и отвращение — понимаются как коренные причины всех физических болезней.`,
    pillars: ['Конституция трёх ньепа (Лунг, Трипа, Бекен)', 'Анализ мочи и пульсовая диагностика', 'Интеграция разума, тела и духа', 'Духовные коренные причины болезней (Три яда)'],
  },
  swarga: {
    body: `Сварга — это синтетическая система HOLOS, названная в честь санскритской концепции моста между землёй и божественным. Когда вы выбираете Сваргу, HOLOS одновременно применяет все восемь мудрых систем к вашим ответам, взвешивает их по релевантности для каждого измерения и синтезирует комплексный портрет, который ни одна традиция не могла бы создать самостоятельно.\n\nСварга рекомендуется пользователям, желающим получить максимально полное представление о своём здоровье. Это также рекомендация по умолчанию для тех, кто только начинает изучать интегративное здоровье и ещё не имеет предпочтительной традиции.`,
    pillars: ['Составная оценка из нескольких традиций', 'Выявление согласия между традициями', 'Получение рекомендаций с наивысшей уверенностью', 'ИИ-коучинг по всем восьми системам'],
  },
}

// ── Hebrew ────────────────────────────────────────────────────────────────────
const he: MethodologiesContent = {
  evidence: {
    body: `.רפואה מבוססת ראיות (EBM) משלבת את מיטב המחקר הקליני הקיים עם הנסיבות והערכים האישיים של המטופל. HOLOS משתמשת ב-EBM כשכבת כיול — כל ציון ממד מעוגן במחקרי ביומרקרים שנסקרו על ידי עמיתים, נתונים אפידמיולוגיים והנחיות קליניות\n\n.ב-HOLOS, EBM מספקת את המטרות הניתנות למדידה: טווחי HRV אופטימליים, אחוזי ארכיטקטורת שינה, יחסי מקרוחומרים, אמות מידה VO₂ max. זוהי השפה שמתרגמת תובנות מסורתיות למספרים הניתנים לפעולה`,
    pillars: ['ניסויים מבוקרים אקראיים', 'סקירות שיטתיות ומטה-אנליזות', 'אופטימיזציה של ביומרקרים', 'סיווג סיכון מותאם אישית'],
  },
  rambam: {
    body: `.הרב משה בן מימון — הידוע כרמב"ם (או מיימונידס) — היה בו-זמנית הפילוסוף היהודי הגדול ביותר, הרופא החצר של צלאח א-דין ואחד ההוגים הרפואיים השיטתיים ביותר בהיסטוריה. ה"מנהל הבריאות" שלו סינתז את הרפואה הגאלנית, הרפואה האסלאמית והמשפט היהודי למערכת בריאות מונעת — שמונה מאות שנה לפני שרפואה מונעת בכלל קיימה\n\n.גאוניותו של הרמב"ם הייתה בדיוק המרשמי: שעות שינה ספציפיות, סדר אכילה, תרגולי ויסות רגשי והבנה פסיכוסומטית ראשונית של כיצד מחשבות משפיעות על הבריאות הגופנית. HOLOS משתמשת במסגרת הרמב"ם למשתמשים המחפשים עדשה יהודית-אתית או ים-תיכונית היסטורית על נתוני הבריאות שלהם`,
    pillars: ['משטר מניעתי (הנהגת הבריאות)', 'סדר אכילה ותזונה עונתית', 'בריאות פסיכוסומטית (אחדות גוף-נפש)', 'שינה ומנוחה כהתערבות רפואית'],
  },
  hippocrates: {
    body: `.המסורת ההיפוקרטית, שנוסחה ב-460 לפנה"ס, קבעה את הנחת היסוד של הרפואה המערבית: למחלות סיבות טבעיות וגוף האדם ניחן ביכולת ריפוי מולדת. ארבעת הלחים — דם, ריר, מרה צהובה ומרה שחורה — היו שפת האבחון שלה, הממפה טמפרמנטים, עונות ומערכות איברים\n\n.מה שהופך את היפוקרטס לרלוונטי לנצח אינו הלחים עצמם אלא המסגרת: הרופא כצופה בכל המטופל בסביבתו, והבריאות כאיזון דינמי ולא כהיעדר תסמינים. מודל תשעת הממדים של HOLOS הוא צאצא ישיר של תובנה זו`,
    pillars: ['ארבעת הלחים וסוגי החוקה', 'בריאות עונתית וסביבתית', 'תזונה ואורח חיים כרפואה ראשונית', 'Vis medicatrix naturae (כוח הריפוי הטבעי)'],
  },
  avicenna: {
    body: `.אבן סינא (אביצנה) כתב את "הקאנון ברפואה" בשנת 1025 לספירה — אנציקלופדיה ב-14 כרכים שנשארה ספר לימוד רפואי תקני באירופה ובעולם האסלאמי במשך שש מאות שנה. הוא סינתז את הרפואה ההיפוקרטית, הגאלנית והאריסטוטלית עם תובנות מקוריות בפרמקולוגיה, פסיכיאטריה ובריאות מונעת\n\n.תרומתו של אביצנה ל-HOLOS היא תפיסת "מיזאג'" שלו — מזג אישי — שהופכת לשכבת התאמה אישית מדויקת. ששת עקרונות הבריאות החיוניים שלו (אוויר, מזון ומשקה, שינה ויקיצה, תנועה ומנוחה, הפרשה ואגירה, מצבים נפשיים) ממפים כמעט בשלמות על תשעת הממדים של HOLOS`,
    pillars: ['מיזאג׳ — חוקה טמפרמנטלית אישית', 'שישה עקרונות בריאות חיוניים', 'פולי-פרמקולוגיה ורפואת צמחים', 'בריאות הנפש כדיסציפלינה רפואית'],
  },
  ayurveda: {
    body: `.האיורוודה — "ידע החיים" — היא המערכת הרפואית הפעילה והעתיקה ביותר על פני כדור הארץ. תובנת הליבה שלה היא שלכל אדם יש סוג חוקה ייחודי (פרקריטי) המורכב משלושה דושות: וואטה (אוויר + חלל), פיטה (אש + מים) וקאפה (אדמה + מים). המחלה מתעוררת כאשר הדושות יוצאות מאיזונן האישי\n\n.מה שהופך את האיורוודה לחריגה ב-HOLOS היא ההתאמה האישית המדויקת. אותה מזון, לוח שינה או פעילות גופנית שמרפאים אדם אחד עלולים להזיק לאחר — מכיוון שפרקריטי שלהם שונה. HOLOS משתמשת בניתוח דושות להפוך המלצות כלליות להנחיות ספציפיות לחוקה`,
    pillars: ['פרקריטי — סיוג חוקה (וואטה/פיטה/קאפה)', 'דינאצ׳ריה — שגרה יומית כרפואה', 'ריטוצ׳ריה — הסתגלות עונתית', 'אגני — אש העיכול והמטבוליזם'],
  },
  daoist: {
    body: `.הפילוסופיה הרפואית הדאואיסטית — בסיס הרפואה הסינית המסורתית — רואה את הגוף כמיקרוקוסמוס של הטבע, המושל על ידי אותן כוחות המניעות עונות וכוכבים. הצ׳י (אנרגיה חיונית) זורם דרך ערוצי מרידיאנים. חמשת האלמנטים (עץ, אש, אדמה, מתכת, מים) ממפים מערכות איברים, רגשות, עונות וטעמים. הבריאות היא זרימה חלקה ושפעת של צ׳י; המחלה היא קיפאונה, מחסורה או עודפה\n\n.HOLOS מיישמת את המסגרת הדאואיסטית לחשיפת הממד האנרגטי של הבריאות שמודלים ביוכימיים טהורים מחמיצים`,
    pillars: ['טיפוח וסירקולציה של צ׳י', 'ניתוח חוקתי של חמשת האלמנטים', 'איזון יין-יאנג לאורך העונות', 'קשרי מרידיאנים ומערכות איברים'],
  },
  tibetan: {
    body: `.הרפואה הטיבטית (סובה ריגפה — "מדע הריפוי") התפתחה בהימלאיה במשך 1,400 שנה, וסינתזה רפואה איורוודית, סינית ויוונית עם הפילוסופיה הבודהיסטית. שלושת הלחים שלה — לונג (רוח/אוויר), טריפה (מרה/אש) ובקן (ריר/מים-אדמה) — מקבילים מקרוב לדושות האיורוודיות אך עם ממד פסיכולוגי ורוחני ייחודי לטיבט\n\n.מה שמבדיל את הרפואה הטיבטית ב-HOLOS הוא המודל המתוחכם שלה לקשר גוף-נפש. "שלושת הרעלים" — בורות, היאחזות ודחייה — מובנים כגורמי השורש של כל מחלה גופנית`,
    pillars: ['חוקת שלושת הניאפה (לונג, טריפה, בקן)', 'ניתוח שתן ואבחון דופק', 'אינטגרציה של גוף-נפש-רוח', 'גורמי שורש רוחניים של מחלה (שלושת הרעלים)'],
  },
  swarga: {
    body: `.סוורגה היא מסגרת הסינתזה של HOLOS — שנקראה על שם מושג הסנסקריט של גשר בין הארץ לאלוהי. כאשר אתה בוחר בסוורגה, HOLOS מיישמת את כל שמונת מסגרות החכמה בו-זמנית על תשובותיך, שוקלת אותן לפי רלוונטיותן לכל ממד ומסנתזת דיוקן מורכב שאף מסורת יחידה לא יכלה לייצר לבדה\n\n.סוורגה מומלצת למשתמשים שרוצים את התמונה המלאה ביותר האפשרית של בריאותם. זוהי גם ההמלצה המוגדרת כברירת מחדל למשתמשים חדשים לבריאות אינטגרטיבית שעדיין אין להם זיקה למסורת מסוימת`,
    pillars: ['ניקוד מורכב מריבוי מסורות', 'זיהוי הסכמה בין-מסורתית', 'הצגת המלצות בביטחון הגבוה ביותר', 'אימון AI על פני כל שמונת המסגרות'],
  },
}

// ── German ────────────────────────────────────────────────────────────────────
const de: MethodologiesContent = {
  evidence: {
    body: `Evidenzbasierte Medizin (EBM) integriert die besten verfügbaren klinischen Forschungsergebnisse mit den individuellen Umständen und Werten des Patienten. HOLOS nutzt EBM als Kalibrierungsschicht — jeder Dimensionswert ist in peer-reviewter Biomarker-Forschung, epidemiologischen Daten und klinischen Leitlinien verankert.\n\nIn HOLOS liefert EBM die messbaren Ziele: optimale HRV-Bereiche, Schlafarchitektur-Prozentwerte, Makroverhältnisse, VO₂-max-Richtwerte. Es ist die Sprache, die traditionelle Erkenntnisse in umsetzbare Zahlen übersetzt.`,
    pillars: ['Randomisierte kontrollierte Studien', 'Systematische Reviews und Meta-Analysen', 'Biomarker-Optimierung', 'Personalisierte Risikostratifizierung'],
  },
  rambam: {
    body: `Rabbi Moses ben Maimon — bekannt als Rambam (oder Maimonides) — war zugleich der größte jüdische Philosoph, der Hofarzt Saladins und einer der systematischsten medizinischen Denker der Geschichte. Sein „Gesundheitsregimen" synthetisierte galenische Medizin, islamische Medizin und jüdisches Recht zu einem präventiven Wellnesssystem — acht Jahrhunderte vor der Existenz der Präventivmedizin.\n\nRambams Genie lag in der präskriptiven Präzision: spezifische Schlafzeiten, Ernährungssequenzierung, Praktiken zur Emotionsregulation und ein proto-psychosomatisches Verständnis davon, wie Gedanken die körperliche Gesundheit beeinflussen. HOLOS nutzt das Rambam-Framework für Nutzer, die eine jüdisch-ethische oder historisch-mediterrane Perspektive auf ihre Gesundheitsdaten suchen.`,
    pillars: ['Präventives Regimen (Hanhagat HaBriut)', 'Ernährungssequenzierung und saisonale Ernährung', 'Psychosomatische Gesundheit (Einheit von Geist und Körper)', 'Schlaf und Ruhe als medizinische Intervention'],
  },
  hippocrates: {
    body: `Die hippokratische Tradition, kodifiziert 460 v. Chr., etablierte die Grundprämisse der westlichen Medizin: Krankheiten haben natürliche Ursachen und der Körper hat eine angeborene Heilungsfähigkeit. Die vier Körpersäfte — Blut, Schleim, gelbe Galle, schwarze Galle — waren seine diagnostische Sprache und ordneten Temperamente, Jahreszeiten und Organsysteme zu.\n\nWas Hippokrates dauerhaft relevant macht, sind nicht die Körpersäfte selbst, sondern das Framework: der Arzt als Beobachter des ganzen Patienten in seiner Umgebung, und Gesundheit als dynamisches Gleichgewicht statt Abwesenheit von Symptomen. Das Neun-Dimensionen-Modell von HOLOS ist ein direkter Nachkomme dieser Erkenntnis.`,
    pillars: ['Vier Körpersäfte und Konstitutionstypen', 'Saisonale und umweltbedingte Gesundheit', 'Ernährung und Lebensstil als primäre Medizin', 'Vis medicatrix naturae (Heilkraft der Natur)'],
  },
  avicenna: {
    body: `Ibn Sina (Avicenna) schrieb 1025 n. Chr. den Canon of Medicine — eine 14-bändige Enzyklopädie, die sechs Jahrhunderte lang das Standardlehrbuch der Medizin in Europa und der islamischen Welt war. Er synthetisierte hippokratische, galenische und aristotelische Medizin mit originellen Erkenntnissen in Pharmakologie, Psychiatrie und Präventivmedizin.\n\nAvicennas Beitrag zu HOLOS ist sein Konzept des „Mizaj" — individuelle Konstitution — das zu einer Präzisions-Personalisierungsschicht wird. Seine sechs wesentlichen Gesundheitsprinzipien (Luft, Essen & Trinken, Schlaf & Wachen, Bewegung & Ruhe, Ausscheidung & Retention, mentale Zustände) entsprechen fast perfekt den neun HOLOS-Dimensionen.`,
    pillars: ['Mizaj — individuelle temperamentale Konstitution', 'Sechs wesentliche Gesundheitsprinzipien', 'Polypharmazie und pflanzliche Medizin', 'Psychische Gesundheit als medizinische Disziplin'],
  },
  ayurveda: {
    body: `Ayurveda — das „Wissen vom Leben" — ist das älteste kontinuierlich praktizierte Medizinsystem der Erde. Seine zentrale Erkenntnis ist, dass jeder Mensch einen einzigartigen Konstitutionstyp (Prakriti) hat, der aus drei Doshas besteht: Vata (Luft + Raum), Pitta (Feuer + Wasser) und Kapha (Erde + Wasser). Krankheit entsteht, wenn diese Doshas aus ihrem individuellen Gleichgewicht geraten.\n\nWas Ayurveda für HOLOS außergewöhnlich macht, ist die präzise Personalisierung. Dieselbe Ernährung, derselbe Schlafplan oder dieselbe körperliche Betätigung, die einen Menschen heilt, kann einem anderen schaden — weil ihre Prakriti verschieden ist. HOLOS nutzt Dosha-Analyse, um allgemeine Empfehlungen in konstitutionsspezifische Anleitungen umzuwandeln.`,
    pillars: ['Prakriti — konstitutionelle Typisierung (Vata/Pitta/Kapha)', 'Dinacharya — tägliche Routine als Medizin', 'Ritucharya — saisonale Anpassung', 'Agni — Verdauungsfeuer und Metabolismus'],
  },
  daoist: {
    body: `Daoistische Medizinphilosophie — das Fundament der Traditionellen Chinesischen Medizin — sieht den Körper als Mikrokosmos der Natur, der von denselben Kräften geleitet wird, die Jahreszeiten und Sterne bewegen. Qi (Lebensenergie) fließt durch Meridian-Kanäle. Die fünf Elemente (Holz, Feuer, Erde, Metall, Wasser) ordnen Organsysteme, Emotionen, Jahreszeiten und Geschmäcker zu. Gesundheit ist der reibungslose, reichliche Fluss von Qi; Krankheit ist sein Stau, Mangel oder Überfluss.\n\nHOLOS wendet das daoistische Framework an, um die energetische Dimension der Gesundheit aufzudecken, die rein biochemische Modelle übersehen.`,
    pillars: ['Qi-Kultivierung und -Zirkulation', 'Konstitutionelle Fünf-Elemente-Analyse', 'Yin-Yang-Gleichgewicht über die Jahreszeiten', 'Meridian- und Organsystembeziehungen'],
  },
  tibetan: {
    body: `Tibetische Medizin (Sowa Rigpa — „die Wissenschaft des Heilens") entwickelte sich über 1.400 Jahre im Himalaya und synthetisierte ayurvedische, chinesische und griechische Medizin mit buddhistischer Philosophie. Ihre drei Körpersäfte — Lung (Wind/Luft), Tripa (Galle/Feuer) und Beken (Schleim/Wasser-Erde) — entsprechen eng den ayurvedischen Doshas, haben aber eine einzigartig tibetische psychologische und spirituelle Dimension.\n\nWas die tibetische Medizin in HOLOS auszeichnet, ist ihr ausgefeiltes Modell der Geist-Körper-Beziehung. Die „Drei Gifte" — Unwissenheit, Anhaftung und Abneigung — werden als Wurzelursachen aller körperlichen Krankheiten verstanden.`,
    pillars: ['Drei Nyépa (Lung, Tripa, Beken) Konstitution', 'Urinanalyse und Pulsdiagnostik', 'Geist-Körper-Seele-Integration', 'Spirituelle Wurzelursachen von Krankheit (Drei Gifte)'],
  },
  swarga: {
    body: `Swarga ist das Synthese-Framework von HOLOS — benannt nach dem Sanskrit-Konzept der Brücke zwischen Erde und dem Göttlichen. Wenn Sie Swarga wählen, wendet HOLOS alle acht Weisheitsframeworks gleichzeitig auf Ihre Antworten an, gewichtet sie nach ihrer Relevanz für jede Dimension und synthetisiert ein zusammengesetztes Porträt, das keine einzelne Tradition allein erzeugen könnte.\n\nSwarga ist die Empfehlung für Nutzer, die die vollständigstmögliche Sicht auf ihre Gesundheit möchten. Es ist auch die Standardempfehlung für Nutzer, die neu in der integrativen Gesundheit sind und noch keine Traditions-Affinität haben.`,
    pillars: ['Traditionsübergreifende Komposite-Bewertung', 'Erkennung traditionsübergreifenden Konsenses', 'Empfehlungen mit höchster Konfidenz', 'KI-Coaching über alle acht Frameworks'],
  },
}

// ── Export ────────────────────────────────────────────────────────────────────
const ALL: Record<Locale, MethodologiesContent> = { en, ru, he, de }

export function getMethodologiesBodies(locale: Locale): MethodologiesContent {
  return ALL[locale] ?? ALL.en
}
