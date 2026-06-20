// ── Assessment Question Translations ──────────────────────────────────────────
// Maps question ID → locale → { text, options[] }
// Falls back to English (from bank.ts) if locale not found.
// Add new locales here without touching bank.ts or types.ts.

export interface QuestionLocale {
  text: string
  options: string[]
}

export const QUESTION_I18N: Record<string, Record<string, QuestionLocale>> = {

  // ── Section 1: Daily Rhythm & Energy ──────────────────────────
  'q-rhythm-01': {
    ru: {
      text: 'Как бы вы описали свой естественный ритм энергии в течение дня?',
      options: [
        'Стабильный и предсказуемый — я знаю, когда нахожусь в пике',
        'Преобладает утром, угасает к послеполудню',
        'Медленный старт, но набираю темп к концу дня',
        'Непредсказуемый — значительно меняется день ото дня',
      ],
    },
    he: {
      text: 'כיצד תתאר את דפוס האנרגיה הטבעי שלך לאורך היום?',
      options: [
        'עקבי וצפוי — אני יודע מתי אני בשיא הכוחות',
        'דומיננטי בבוקר, דועך לאחר הצהריים',
        'איטי בהתחלה אבל צובר תאוצה לאורך היום',
        'בלתי צפוי — משתנה משמעותית מיום ליום',
      ],
    },
    de: {
      text: 'Wie würden Sie Ihr natürliches Energiemuster im Laufe des Tages beschreiben?',
      options: [
        'Gleichmäßig und vorhersehbar — ich weiß, wann ich am schärfsten bin',
        'Morgenorientiert, nachmittags nachlassend',
        'Langsamer Start, aber ich baue im Laufe des Tages Schwung auf',
        'Unvorhersehbar — schwankt stark von Tag zu Tag',
      ],
    },
  },

  'q-rhythm-02': {
    ru: {
      text: 'Как часто вы чувствуете, что ваш день отражает ваши приоритеты (а не только срочные задачи)?',
      options: [
        'Большинство дней — я защищаю время для важного',
        'Иногда — мне удаётся, но непоследовательно',
        'Редко — реактивный режим стал моей нормой',
        'Почти никогда — я несусь в потоке требований',
      ],
    },
    he: {
      text: 'עד כמה אתה מרגיש שהיום שלך משקף את סדרי העדיפויות שלך (ולא רק דרישות דחופות)?',
      options: [
        'רוב הימים — אני שומר זמן למה שחשוב',
        'לפעמים — מצליח לפעמים, לא באופן עקבי',
        'לעיתים נדירות — מצב תגובתי הוא ברירת המחדל שלי',
        'כמעט אף פעם — אני נסחף על ידי הדרישות',
      ],
    },
    de: {
      text: 'Wie oft haben Sie das Gefühl, dass Ihr Tag Ihre Prioritäten widerspiegelt (und nicht nur dringende Aufgaben)?',
      options: [
        'Die meisten Tage — ich schütze Zeit für das Wichtige',
        'Manchmal — es gelingt mir, aber unbeständig',
        'Selten — der reaktive Modus ist mein Standard',
        'Fast nie — ich werde von Anforderungen mitgetragen',
      ],
    },
  },

  // ── Section 2: Sleep ──────────────────────────────────────────
  'q-sleep-01': {
    ru: {
      text: 'Как бы вы оценили качество своего сна за последние две недели?',
      options: [
        'Отличное — просыпаюсь отдохнувшим и с ясной головой',
        'Хорошее — в основном восстанавливающее, с редкими нарушениями',
        'Удовлетворительное — сплю, но редко чувствую себя по-настоящему отдохнувшим',
        'Плохое — с трудом засыпаю или просыпаюсь ночью',
      ],
    },
    he: {
      text: 'כיצד תדרג את איכות השינה שלך בשבועיים האחרונים?',
      options: [
        'מצוינת — אני מתעורר רענן וצלול',
        'טובה — בעיקר משקמת עם הפרעות נדירות',
        'סבירה — ישן אך לעיתים נדירות מרגיש נח לגמרי',
        'גרועה — מתקשה להירדם או להישאר ישן',
      ],
    },
    de: {
      text: 'Wie würden Sie Ihre Schlafqualität in den letzten zwei Wochen bewerten?',
      options: [
        'Ausgezeichnet — ich wache erfrischt und klar auf',
        'Gut — meist erholsam mit gelegentlichen Störungen',
        'Befriedigend — ich schlafe, fühle mich aber selten wirklich ausgeruht',
        'Schlecht — ich habe Schwierigkeiten ein- oder durchzuschlafen',
      ],
    },
  },

  'q-sleep-02': {
    ru: {
      text: 'Насколько постоянны ваши время засыпания и пробуждения?',
      options: [
        'Очень постоянные — в пределах 30 минут каждый день',
        'В основном постоянные — с некоторыми отклонениями по выходным',
        'Изменчивые — регулярно сдвигаются на 1–2 часа',
        'Очень непостоянные — мой режим постоянно меняется',
      ],
    },
    he: {
      text: 'עד כמה עקבי זמן ההירדמות וההתעוררות שלך?',
      options: [
        'עקבי מאוד — בטווח של 30 דקות כל יום',
        'עקבי ברובו — עם שינויים מסוימים בסוף השבוע',
        'משתנה — משתנה ב-1-2 שעות באופן קבוע',
        'לא סדיר מאוד — הלוח זמנים שלי משתנה כל הזמן',
      ],
    },
    de: {
      text: 'Wie konsistent sind Ihre Einschlaf- und Aufwachzeiten?',
      options: [
        'Sehr konsistent — innerhalb von 30 Minuten täglich',
        'Meist konsistent — mit einigen Abweichungen am Wochenende',
        'Variabel — verschiebt sich regelmäßig um 1–2 Stunden',
        'Sehr unregelmäßig — mein Rhythmus ändert sich ständig',
      ],
    },
  },

  'q-sleep-03': {
    ru: {
      text: 'Что чаще всего нарушает ваш сон?',
      options: [
        'Навязчивые мысли или тревога',
        'Физический дискомфорт или температура',
        'Посторонний шум или свет',
        'Просыпаюсь в 2–4 ночи и не могу снова заснуть',
      ],
    },
    he: {
      text: 'מה לרוב מפריע לשינה שלך?',
      options: [
        'מחשבות טורדניות או חרדה',
        'אי-נוחות פיזית או טמפרטורה',
        'רעש חיצוני או אור',
        'מתעורר בין 2-4 לפנות בוקר ולא יכול לחזור לישון',
      ],
    },
    de: {
      text: 'Was stört Ihren Schlaf am häufigsten?',
      options: [
        'Gedankenkarussell oder Angst',
        'Körperliches Unbehagen oder Temperatur',
        'Außenlärm oder Licht',
        'Ich wache zwischen 2–4 Uhr auf und kann nicht wieder einschlafen',
      ],
    },
  },

  // ── Section 3: Nutrition ──────────────────────────────────────
  'q-nutrition-01': {
    ru: {
      text: 'Как вы себя чувствуете в течение 60 минут после типичного приёма пищи?',
      options: [
        'Спокойно, тепло и с энергией',
        'Сначала ясно, затем постепенный спад',
        'Тяжесть, вздутие или сонливость',
        'Непредсказуемо — меняется от приёма к приёму',
      ],
    },
    he: {
      text: 'כיצד אתה מרגיש ב-60 הדקות שלאחר ארוחה טיפוסית?',
      options: [
        'מיושב, חמים ואנרגטי',
        'צלול בהתחלה, ואז ירידה הדרגתית',
        'כבד, נפוח או מנומנם',
        'בלתי צפוי — משתנה מארוחה לארוחה',
      ],
    },
    de: {
      text: 'Wie fühlen Sie sich in den 60 Minuten nach einer typischen Mahlzeit?',
      options: [
        'Geerdet, warm und energiegeladen',
        'Zunächst klar, dann allmählicher Abfall',
        'Schwer, aufgebläht oder schläfrig',
        'Unvorhersehbar — wechselt von Mahlzeit zu Mahlzeit',
      ],
    },
  },

  'q-nutrition-02': {
    ru: {
      text: 'Сколько порций овощей и цельных продуктов вы едите ежедневно?',
      options: [
        '5 и более — это стабильный приоритет',
        '3–4 порции — я сознательно стараюсь',
        '1–2 порции — зависит от удобства',
        'Редко — переработанные продукты преобладают в моём рационе',
      ],
    },
    he: {
      text: 'כמה מנות ירקות ומזון מלא אתה אוכל מדי יום?',
      options: [
        '5 מנות או יותר — זו עדיפות עקבית',
        '3-4 מנות — אני עושה מאמץ מודע',
        '1-2 מנות — תלוי בנוחות',
        'לעיתים נדירות — מזון מעובד שולט בתפריט שלי',
      ],
    },
    de: {
      text: 'Wie viele Portionen Gemüse und Vollwertkost essen Sie täglich?',
      options: [
        '5 oder mehr Portionen — es ist eine beständige Priorität',
        '3–4 Portionen — ich bemühe mich bewusst',
        '1–2 Portionen — variiert je nach Bequemlichkeit',
        'Selten — Fertigprodukte dominieren meine Ernährung',
      ],
    },
  },

  'q-nutrition-03': {
    ru: {
      text: 'Есть ли у вас постоянное пищевое окно или режим питания?',
      options: [
        'Да — я ем в стабильном 8–10-часовом окне',
        'Примерно — приёмы пищи в целом регулярны',
        'Нет — ем, когда приходит голод или возможность',
        'Часто ем поздно или пропускаю приёмы пищи',
      ],
    },
    he: {
      text: 'האם יש לך חלון אכילה עקבי או לוח זמנים לארוחות?',
      options: [
        'כן — אני אוכל בחלון עקבי של 8-10 שעות',
        'בערך — הארוחות מתוזמנות במידה מסוימת',
        'לא — אני אוכל כשהרעב או ההזדמנות מגיעים',
        'לעיתים קרובות אני אוכל מאוחר או מדלג על ארוחות',
      ],
    },
    de: {
      text: 'Haben Sie ein konsistentes Essensfenster oder einen Mahlzeitenplan?',
      options: [
        'Ja — ich esse in einem konsistenten 8–10-Stunden-Fenster',
        'Ungefähr — Mahlzeiten sind einigermaßen geplant',
        'Nein — ich esse wenn Hunger oder Gelegenheit kommt',
        'Ich esse oft spät oder lasse Mahlzeiten aus',
      ],
    },
  },

  // ── Section 4: Movement ──────────────────────────────────────
  'q-movement-01': {
    ru: {
      text: 'Сколько целенаправленной физической активности вы получаете в неделю?',
      options: [
        '5+ тренировок — движение для меня обязательно',
        '3–4 тренировки — поддерживаю стабильную базу',
        '1–2 тренировки — двигаюсь, но непоследовательно',
        'Редко — мой образ жизни преимущественно сидячий',
      ],
    },
    he: {
      text: 'כמה פעילות גופנית מכוונת אתה מקבל בשבוע?',
      options: [
        '5+ אימונים — תנועה היא חובה עבורי',
        '3-4 אימונים — אני שומר על בסיס יציב',
        '1-2 אימונים — אני זז אבל לא באופן עקבי',
        'לעיתים נדירות — אורח חיי בעיקרו יושבני',
      ],
    },
    de: {
      text: 'Wie viel gezielte körperliche Bewegung bekommen Sie pro Woche?',
      options: [
        '5+ Einheiten — Bewegung ist für mich unverzichtbar',
        '3–4 Einheiten — ich halte eine solide Basis aufrecht',
        '1–2 Einheiten — ich bewege mich, aber unbeständig',
        'Selten — mein Lebensstil ist überwiegend sitzend',
      ],
    },
  },

  'q-movement-02': {
    ru: {
      text: 'Сколько ходьбы или ежедневного движения (без тренировок) вы получаете?',
      options: [
        '10 000+ шагов — я активен в течение дня от природы',
        '6 000–10 000 шагов — умеренная активность',
        '3 000–6 000 шагов — в основном за столом',
        'Менее 3 000 шагов — очень мало ежедневного движения',
      ],
    },
    he: {
      text: 'כמה הליכה או תנועה יומית (שאינה אימון) אתה מקבל?',
      options: [
        '10,000+ צעדים — אני פעיל באופן טבעי לאורך היום',
        '6,000-10,000 צעדים — פעילות מתונה',
        '3,000-6,000 צעדים — בעיקר ליד שולחן',
        'פחות מ-3,000 — תנועה יומית מוגבלת מאוד',
      ],
    },
    de: {
      text: 'Wie viel Alltagsbewegung (kein Sport) bekommen Sie täglich?',
      options: [
        '10.000+ Schritte — ich bin von Natur aus den ganzen Tag aktiv',
        '6.000–10.000 Schritte — moderate Aktivität',
        '3.000–6.000 Schritte — überwiegend am Schreibtisch',
        'Unter 3.000 — sehr geringe tägliche Bewegung',
      ],
    },
  },

  // ── Section 5: Stress ─────────────────────────────────────────
  'q-stress-01': {
    ru: {
      text: 'Когда день вас захлёстывает, как вы чаще всего реагируете?',
      options: [
        'Останавливаюсь и дышу — у меня есть надёжный способ вернуться в центр',
        'Продолжаю и разбираюсь с остатками потом',
        'Обращаюсь к кому-то, кому доверяю',
        'Поглощаю это молча и несу в себе',
      ],
    },
    he: {
      text: 'כשהיום מציף אותך, כיצד אתה בדרך כלל מגיב?',
      options: [
        'אני עוצר ונושם — יש לי דרך אמינה לחזור למרכז',
        'אני ממשיך ומתמודד עם השאריות מאוחר יותר',
        'אני פונה למישהו שאני סומך עליו',
        'אני סופג את זה בשקט ונושא אותו בפנים',
      ],
    },
    de: {
      text: 'Wenn der Tag Sie überwältigt, wie reagieren Sie meistens?',
      options: [
        'Ich halte inne und atme — ich habe einen zuverlässigen Weg zurück zur Mitte',
        'Ich mache weiter und verarbeite den Rest später',
        'Ich wende mich an jemanden, dem ich vertraue',
        'Ich nehme es in mich auf und trage es still',
      ],
    },
  },

  'q-stress-02': {
    ru: {
      text: 'Как часто вы чувствуете мысленную срочность или ощущение «всегда включён»?',
      options: [
        'Редко — у меня хорошие ментальные «выключатели»',
        'Иногда — обычно связано с конкретными ситуациями',
        'Часто — это мой стандартный режим работы',
        'Почти всегда — не могу, кажется, выключиться',
      ],
    },
    he: {
      text: 'עד כמה לעיתים קרובות אתה מרגיש דחיפות מנטלית או תחושה של "תמיד פעיל"?',
      options: [
        'לעיתים נדירות — יש לי מפסקים מנטליים טובים',
        'לפעמים — בדרך כלל קשור ללחצים ספציפיים',
        'לעיתים קרובות — זה מצב הפעולה הרגיל שלי',
        'כמעט תמיד — לא נראה שאני יכול לכבות את זה',
      ],
    },
    de: {
      text: 'Wie oft spüren Sie einen mentalen Drang oder das Gefühl, „ständig eingeschaltet" zu sein?',
      options: [
        'Selten — ich habe gute mentale Abschalter',
        'Gelegentlich — meist an spezifische Drücke gebunden',
        'Oft — das ist mein Standard-Betriebsmodus',
        'Fast immer — ich kann es scheinbar nicht ausschalten',
      ],
    },
  },

  // ── Section 6: Recovery ───────────────────────────────────────
  'q-recovery-01': {
    ru: {
      text: 'Насколько восстановленным вы чувствуете себя, когда просыпаетесь утром?',
      options: [
        'Полностью восстановленным — просыпаюсь готовым и ясным',
        'В основном восстановленным — незначительная остаточная усталость',
        'Частично — нужно время, чтобы почувствовать себя функциональным',
        'Совсем нет — просыпаюсь истощённым',
      ],
    },
    he: {
      text: 'כמה שחזרת אתה מרגיש כשאתה מתעורר בבוקר?',
      options: [
        'שוחזרתי לגמרי — מתעורר מוכן וצלול',
        'שוחזרתי ברובי — עייפות שיורית מינורית',
        'חלקית — אני צריך זמן לפני שאני מרגיש תפקותי',
        'בכלל לא — מתעורר מותש',
      ],
    },
    de: {
      text: 'Wie erholt fühlen Sie sich, wenn Sie morgens aufwachen?',
      options: [
        'Vollständig erholt — ich wache bereit und klar auf',
        'Größtenteils erholt — leichte Restmüdigkeit',
        'Teilweise — ich brauche Zeit, bis ich mich funktionsfähig fühle',
        'Gar nicht — ich wache erschöpft auf',
      ],
    },
  },

  // ── Section 7: Emotional Wellbeing ───────────────────────────
  'q-emotional-01': {
    ru: {
      text: 'Как бы вы описали своё базовое эмоциональное состояние за последний месяц?',
      options: [
        'Преимущественно позитивное — устойчивое и включённое',
        'Стабильное с ожидаемыми колебаниями',
        'Притупленное или приглушённое — меньше радости, чем обычно',
        'Тяжёлое или тревожное — как постоянный фоновый шум',
      ],
    },
    he: {
      text: 'כיצד תתאר את המצב הרגשי הבסיסי שלך בחודש האחרון?',
      options: [
        'חיובי בעיקרו — עמיד ומעורב',
        'יציב עם תנודות צפויות',
        'מעומעם או מרוסן — פחות שמחה מהרגיל',
        'כבד או חרד — כמו זרם תת-קרקעי מתמיד',
      ],
    },
    de: {
      text: 'Wie würden Sie Ihren emotionalen Grundzustand im vergangenen Monat beschreiben?',
      options: [
        'Überwiegend positiv — belastbar und engagiert',
        'Stabil mit erwarteten Schwankungen',
        'Flach oder gedämpft — weniger Freude als sonst',
        'Schwer oder ängstlich — ein durchgehender Unterton',
      ],
    },
  },

  // ── Section 8: Purpose & Meaning ─────────────────────────────
  'q-purpose-01': {
    ru: {
      text: 'Что придаёт вашей практике здоровья ощущение более глубокого смысла?',
      options: [
        'Ощущение полного присутствия и пользы для людей, которых люблю',
        'Более глубокая духовная или этическая приверженность',
        'Измеримый прогресс и результаты',
        'Я всё ещё ищу этот якорь',
      ],
    },
    he: {
      text: 'מה נותן לפרקטיקת הבריאות שלך תחושת משמעות עמוקה יותר?',
      options: [
        'תחושה של נוכחות מלאה ותרומה לאנשים שאני אוהב',
        'מחויבות רוחנית או אתית עמוקה יותר',
        'התקדמות מדידה וביצועים',
        'אני עדיין מחפש את העוגן הזה',
      ],
    },
    de: {
      text: 'Was gibt Ihrer Gesundheitspraxis ein Gefühl tieferer Bedeutung?',
      options: [
        'Das Gefühl, für Menschen, die ich liebe, vollständig präsent und nützlich zu sein',
        'Eine tiefere spirituelle oder ethische Verpflichtung',
        'Messbarer Fortschritt und Leistung',
        'Ich suche noch nach diesem Anker',
      ],
    },
  },

  'q-purpose-02': {
    ru: {
      text: 'Насколько чётко вы понимаете своё направление на следующие 12 месяцев?',
      options: [
        'Очень чётко — я знаю, к чему иду',
        'Примерно чётко — общее направление без полной конкретики',
        'Некоторая неопределённость — несколько конкурирующих направлений',
        'Неясно — чувствую себя потерянным или между главами',
      ],
    },
    he: {
      text: 'עד כמה ברורה לך תחושת הכיוון לשנים עשר החודשים הבאים?',
      options: [
        'ברורה מאוד — אני יודע לאן אני בונה',
        'ברורה בערך — כיוון כללי ללא ספציפיות מלאה',
        'מעט לא ודאי — כמה כיוונים מתחרים',
        'לא ברורה — אני מרגיש נסחף או בין פרקים',
      ],
    },
    de: {
      text: 'Wie klar ist Ihr Sinn für Richtung in den nächsten 12 Monaten?',
      options: [
        'Sehr klar — ich weiß, wohin ich mich entwickle',
        'Ungefähr klar — eine allgemeine Richtung ohne volle Spezifität',
        'Etwas unsicher — mehrere konkurrierende Richtungen',
        'Unklar — ich fühle mich orientierungslos oder zwischen Kapiteln',
      ],
    },
  },

  // ── Section 9: Life Balance ───────────────────────────────────
  'q-balance-01': {
    ru: {
      text: 'Насколько вы довольны балансом работы, отношений, здоровья и личного роста?',
      options: [
        'Очень доволен — они интегрированы, а не конкурируют',
        'В целом хорошо — есть незначительные области, требующие внимания',
        'Несбалансированно — одна область доминирует в ущерб другим',
        'Значительный дисбаланс — это влияет на моё благополучие',
      ],
    },
    he: {
      text: 'כמה אתה מרוצה מהאיזון בין עבודה, מערכות יחסים, בריאות וצמיחה אישית?',
      options: [
        'מרוצה מאוד — הם משולבים, לא מתחרים',
        'טוב בדרך כלל — תחומים קטנים צריכים תשומת לב',
        'לא מאוזן — תחום אחד שולט על חשבון אחרים',
        'חוסר איזון משמעותי — זה משפיע על הרווחה שלי',
      ],
    },
    de: {
      text: 'Wie zufrieden sind Sie mit der Balance aus Arbeit, Beziehungen, Gesundheit und persönlichem Wachstum?',
      options: [
        'Sehr zufrieden — sie sind integriert, nicht konkurrierend',
        'Im Allgemeinen gut — kleinere Bereiche brauchen Aufmerksamkeit',
        'Unausgewogen — ein Bereich dominiert auf Kosten anderer',
        'Erheblich unausgewogen — es beeinträchtigt mein Wohlbefinden',
      ],
    },
  },

  // ══════════════════════════════════════════════════════════════
  // ADAPTIVE / BRANCH QUESTIONS
  // ══════════════════════════════════════════════════════════════

  'q-sleep-b01': {
    ru: {
      text: 'Вам трудно заснуть или вы засыпаете легко, но просыпаетесь ночью?',
      options: [
        'Засыпаю легко, но просыпаюсь в 2–4 ночи и не могу вернуться ко сну',
        'Лежу без сна 30–60+ минут, прежде чем засыпаю',
        'Оба варианта — трудно и с засыпанием, и со сном',
        'Сплю достаточно часов, но просыпаюсь неотдохнувшим',
      ],
    },
    he: {
      text: 'האם אתה מתקשה להירדם, או שאתה נרדם בקלות אך מתעורר בלילה?',
      options: [
        'נרדם בקלות אך מתעורר בין 2-4 לפנות בוקר ולא יכול לחזור לישון',
        'שוכב ער 30-60+ דקות לפני שהשינה באה',
        'שניהם — גם ההירדמות וגם שמירת השינה קשות',
        'ישן מספיק שעות אך מתעורר לא מרוענן ללא קשר',
      ],
    },
    de: {
      text: 'Haben Sie Schwierigkeiten einzuschlafen, oder schlafen Sie leicht ein, wachen aber nachts auf?',
      options: [
        'Ich schlafe leicht ein, wache aber zwischen 2–4 Uhr auf und kann nicht wieder einschlafen',
        'Ich liege 30–60+ Minuten wach, bevor Schlaf kommt',
        'Beides — Einschlafen und Durchschlafen sind schwierig',
        'Ich schlafe genug Stunden, wache aber trotzdem unerholt auf',
      ],
    },
  },

  'q-sleep-b02': {
    ru: {
      text: 'Какой у вас режим использования экранов и освещения за 90 минут до сна?',
      options: [
        'Экраны выключены — использую приглушённый свет и ритуалы расслабления',
        'Немного экранов, стараюсь ограничивать яркость',
        'Телефон или ТВ почти до времени сна',
        'Яркие экраны до самого закрытия глаз',
      ],
    },
    he: {
      text: 'מה החשיפה שלך למסכים ואור ב-90 הדקות שלפני השינה?',
      options: [
        'מסכים כבויים — אני משתמש באור עמום וטקסי הרגעה',
        'כמה מסכים אבל מנסה להגביל עוצמה',
        'טלפון או טלוויזיה עד קרוב לשעת השינה',
        'מסכים בהירים עד שאני עוצם עיניים',
      ],
    },
    de: {
      text: 'Wie ist Ihre Bildschirm- und Lichtexposition in den 90 Minuten vor dem Schlafen?',
      options: [
        'Bildschirme aus — ich nutze gedämpftes Licht und Einschlafroutinen',
        'Etwas Bildschirmzeit, aber ich versuche die Intensität zu begrenzen',
        'Telefon oder TV bis kurz vor der Schlafenszeit',
        'Helle Bildschirme bis ich die Augen schließe',
      ],
    },
  },

  'q-sleep-b03': {
    ru: {
      text: 'В какое время вы обычно употребляете последний кофеин?',
      options: [
        'До полудня — я понимаю период полувыведения кофеина',
        '13:00–15:00 — мой порог после обеда',
        '16:00–18:00 — нужен, чтобы пережить вторую половину дня',
        'После 18:00 или не употребляю кофеин вообще',
      ],
    },
    he: {
      text: 'באיזו שעה בדרך כלל שותה את הקפאין האחרון שלך?',
      options: [
        'לפני הצהריים — אני מבין את זמן מחצית החיים של קפאין',
        '13:00-15:00 — הסף שלי הוא אחרי הצהריים',
        '16:00-18:00 — אני צריך אותו כדי לעבור את אחר הצהריים',
        'אחרי 18:00 או שאינני שותה קפאין כלל',
      ],
    },
    de: {
      text: 'Wann trinken Sie normalerweise Ihr letztes Koffein?',
      options: [
        'Vor Mittag — ich kenne die Halbwertszeit von Koffein',
        '13–15 Uhr — meine Grenze liegt nach dem Mittagessen',
        '16–18 Uhr — ich brauche es, um den Nachmittag zu überstehen',
        'Nach 18 Uhr oder ich trinke gar kein Koffein',
      ],
    },
  },

  'q-stress-b01': {
    ru: {
      text: 'Где стресс обычно проявляется в вашем теле?',
      options: [
        'Челюсть, шея или плечи — хроническое напряжение',
        'Желудок или пищеварение — симптомы усиливаются под давлением',
        'Грудь или дыхание — стеснение или поверхностное дыхание',
        'Не замечаю этого в теле — остаётся в голове',
      ],
    },
    he: {
      text: 'היכן הלחץ נוטה להתגורר בגוף שלך?',
      options: [
        'לסת, צוואר או כתפיים — מתח כרוני',
        'בטן או עיכול — תסמינים מחמירים תחת לחץ',
        'חזה או נשימה — חנק או נשימה רדודה',
        'לא מבחין בזה בגוף — נשאר בראש',
      ],
    },
    de: {
      text: 'Wo manifestiert sich Stress in Ihrem Körper?',
      options: [
        'Kiefer, Nacken oder Schultern — chronische Anspannung',
        'Bauch oder Verdauung — Symptome verschlimmern sich unter Druck',
        'Brust oder Atmung — Enge oder flaches Atmen',
        'Ich bemerke es nicht im Körper — es bleibt im Kopf',
      ],
    },
  },

  'q-stress-b02': {
    ru: {
      text: 'Каков ваш основной источник стресса прямо сейчас?',
      options: [
        'Рабочие требования — объём, дедлайны или сложная динамика',
        'Финансовое давление или неопределённость',
        'Отношения — семья, партнёр или социальное напряжение',
        'Внутреннее — перфекционизм, страхи или нерешённые паттерны',
      ],
    },
    he: {
      text: 'מהו מקור הלחץ העיקרי שלך כרגע?',
      options: [
        'דרישות עבודה — נפח, דדליינים או דינמיקות קשות',
        'לחץ כלכלי או אי-ודאות',
        'מערכות יחסים — משפחה, בן/בת זוג או מתח חברתי',
        'פנימי — פרפקציוניזם, פחד או דפוסים בלתי פתורים',
      ],
    },
    de: {
      text: 'Was ist Ihre primäre Stressquelle gerade?',
      options: [
        'Arbeitsanforderungen — Volumen, Deadlines oder schwierige Dynamiken',
        'Finanzieller Druck oder Unsicherheit',
        'Beziehungen — Familie, Partner oder soziale Spannungen',
        'Intern — Perfektionismus, Angst oder ungelöste Muster',
      ],
    },
  },

  'q-stress-b03': {
    ru: {
      text: 'После сильного стрессового события, сколько времени нужно вашей нервной системе, чтобы успокоиться?',
      options: [
        'В течение 30 минут — я умею сознательно саморегулироваться',
        '1–3 часа — нужно время, но это происходит естественно',
        'Большую часть дня — активация сохраняется долго',
        'Несколько дней — накапливается и усугубляется',
      ],
    },
    he: {
      text: 'לאחר אירוע לחץ גבוה, כמה זמן לוקח למערכת העצבים שלך להירגע?',
      options: [
        'תוך 30 דקות — אני יכול לווסת את עצמי במודע',
        '1-3 שעות — אני צריך זמן אבל זה קורה באופן טבעי',
        'רוב היום — ההפעלה נמשכת',
        'אני נושא את זה ימים — זה מצטבר ומחריף',
      ],
    },
    de: {
      text: 'Nach einem hochstressigen Ereignis — wie lange braucht Ihr Nervensystem zum Beruhigen?',
      options: [
        'Innerhalb von 30 Minuten — ich kann mich bewusst selbst regulieren',
        '1–3 Stunden — ich brauche Zeit, aber es passiert natürlich',
        'Den größten Teil des Tages — die Aktivierung hält an',
        'Ich trage es tagelang — es akkumuliert sich und verschlimmert sich',
      ],
    },
  },

  'q-energy-b01': {
    ru: {
      text: 'Когда ваша энергия падает, что лучше всего это описывает?',
      options: [
        'После еды — мне трудно оставаться бодрым после приёма пищи',
        'После полудня (14:00–16:00) — почти ежедневно без исключений',
        'Непредсказуемо — никогда не знаю, когда это произойдёт',
        'После любой значительной нагрузки — нужно долгое восстановление',
      ],
    },
    he: {
      text: 'כשהאנרגיה שלך יורדת, מה המתאר הנכון ביותר?',
      options: [
        'אחרי אכילה — אני מתקשה להישאר ערני לאחר ארוחה',
        'אחר הצהריים (14:00-16:00) — כמעט יומיומי ללא יוצא מן הכלל',
        'בצורה בלתי צפויה — לעולם לא יודע מתי זה יגיע',
        'לאחר כל תפוקה משמעותית — אני זקוק להתאוששות ארוכה',
      ],
    },
    de: {
      text: 'Wenn Ihre Energie einbricht, was beschreibt es am treffendsten?',
      options: [
        'Nach dem Essen — ich habe Mühe, nach einer Mahlzeit wach zu bleiben',
        'Nachmittags (14–16 Uhr) — fast täglich ohne Ausnahme',
        'Unvorhersehbar — ich weiß nie, wann es kommt',
        'Nach jeder bedeutenden Leistung — ich brauche lange Erholung',
      ],
    },
  },

  'q-energy-b02': {
    ru: {
      text: 'Как вы обычно справляетесь с низкой энергией в течение дня?',
      options: [
        'Кофеин — в определённые моменты полагаюсь на него для функционирования',
        'Еда — часто перекусываю для поддержания энергии',
        'Продолжаю без подпорок — чистая сила воли',
        'Отдыхаю, когда могу — прислушиваюсь к сигналам своего тела',
      ],
    },
    he: {
      text: 'כיצד אתה בדרך כלל מנהל אנרגיה נמוכה לאורך היום?',
      options: [
        'קפאין — אני מסתמך עליו בנקודות מסוימות לתפקוד',
        'אוכל — אני מנשנש לעיתים קרובות לשמירת האנרגיה',
        'אני מתמיד ללא תמיכה — כוח רצון גרידא',
        'אני נח כשאני יכול — אני מקשיב לאותות האנרגיה שלי',
      ],
    },
    de: {
      text: 'Wie managen Sie typischerweise niedrige Energie im Laufe des Tages?',
      options: [
        'Koffein — ich verlasse mich an bestimmten Punkten darauf',
        'Essen — ich snacke häufig, um die Energie aufrechtzuerhalten',
        'Ich mache weiter ohne Hilfsmittel — reine Willenskraft',
        'Ich ruhe mich aus, wenn ich kann — ich höre auf meine Energiesignale',
      ],
    },
  },

  'q-nutrition-b01': {
    ru: {
      text: 'Когда ваше питание сбивается, что чаще всего служит триггером?',
      options: [
        'Стресс или эмоциональные трудности — еда становится утешением',
        'Усталость или низкая энергия — тянусь к тому, что быстро',
        'Социальные ситуации — трудно держать границы',
        'Я почти не отклоняюсь — мой рацион довольно стабилен',
      ],
    },
    he: {
      text: 'כשהאכילה שלך יוצאת מהמסלול, מה הגורם לרוב?',
      options: [
        'לחץ או קושי רגשי — אוכל הופך לנחמה',
        'עייפות או אנרגיה נמוכה — אני מגיע למה שמהיר',
        'מצבים חברתיים — קשה לשמור על גבולות',
        'אני בקושי סוטה — האכילה שלי יציבה למדי',
      ],
    },
    de: {
      text: 'Wenn Ihre Ernährung aus dem Gleichgewicht gerät, was ist meistens der Auslöser?',
      options: [
        'Stress oder emotionale Schwierigkeiten — Essen wird zum Trost',
        'Müdigkeit oder wenig Energie — ich greife nach dem Schnellsten',
        'Soziale Situationen — es fällt schwer, Grenzen zu halten',
        'Ich weiche kaum ab — mein Essen ist ziemlich konsistent',
      ],
    },
  },

  'q-nutrition-b02': {
    ru: {
      text: 'Сколько воды вы пьёте в обычный день?',
      options: [
        '2+ литра — гидрация — стабильный приоритет',
        '1–2 литра — разумно, но непоследовательно',
        'Менее 1 литра — часто забываю пить',
        'В основном кофе, сок или другие напитки',
      ],
    },
    he: {
      text: 'כמה מים אתה שותה ביום רגיל?',
      options: [
        '2+ ליטר — הידרציה היא עדיפות עקבית',
        '1-2 ליטר — סביר אך לא עקבי',
        'פחות מ-1 ליטר — לעיתים קרובות שוכח לשתות',
        'בעיקר קפה, מיץ או משקאות אחרים במקום',
      ],
    },
    de: {
      text: 'Wie viel Wasser trinken Sie an einem typischen Tag?',
      options: [
        '2+ Liter — Hydration ist eine beständige Priorität',
        '1–2 Liter — vernünftig, aber unbeständig',
        'Unter 1 Liter — ich vergesse oft zu trinken',
        'Ich trinke hauptsächlich Kaffee, Saft oder andere Getränke',
      ],
    },
  },

  'q-nutrition-b03': {
    ru: {
      text: 'Как бы вы описали состояние своего пищеварения?',
      options: [
        'Отличное — редко вздутие, дискомфорт или нарушения',
        'Хорошее — незначительные периодические проблемы',
        'Непоследовательное — частое вздутие или изменения регулярности',
        'Проблематичное — диагностированные или текущие проблемы с ЖКТ',
      ],
    },
    he: {
      text: 'כיצד תתאר את בריאות העיכול שלך?',
      options: [
        'מצוינת — כמעט ולא נפיחות, אי-נוחות או חוסר סדירות',
        'טובה — בעיות קלות מדי פעם',
        'לא עקבית — נפיחות תכופה או שינויים בסדירות',
        'בעייתית — בעיות מאובחנות או מתמשכות במעיים',
      ],
    },
    de: {
      text: 'Wie würden Sie Ihre Verdauungsgesundheit beschreiben?',
      options: [
        'Ausgezeichnet — selten Blähungen, Beschwerden oder Unregelmäßigkeiten',
        'Gut — kleine gelegentliche Probleme',
        'Inkonsistent — häufige Blähungen oder Veränderungen der Regelmäßigkeit',
        'Problematisch — diagnostizierte oder anhaltende Darmprobleme',
      ],
    },
  },

  'q-movement-b01': {
    ru: {
      text: 'Что является основным препятствием для большей физической активности?',
      options: [
        'Время — работа и обязанности оставляют мало пространства',
        'Энергия — к тому времени, когда мог бы заниматься, сил уже нет',
        'Боль или физические ограничения — движение вызывает дискомфорт',
        'Мотивация — знаю, что надо, но не могу сделать это привычкой',
      ],
    },
    he: {
      text: 'מהו המכשול העיקרי למניעת יותר פעילות גופנית?',
      options: [
        'זמן — עבודה ואחריות משאירים מעט מקום',
        'אנרגיה — עד שאני יכול להתאמן, לא נשאר לי כלום',
        'כאב או מגבלה פיזית — תנועה לא נוחה',
        'מוטיבציה — אני יודע שצריך אבל לא מצליח להדביק',
      ],
    },
    de: {
      text: 'Was ist das Haupthindernis für mehr körperliche Aktivität?',
      options: [
        'Zeit — Arbeit und Verpflichtungen lassen wenig Raum',
        'Energie — bis ich trainieren könnte, habe ich nichts mehr übrig',
        'Schmerzen oder körperliche Einschränkungen — Bewegung ist unangenehm',
        'Motivation — ich weiß, dass ich sollte, kann es aber nicht beibehalten',
      ],
    },
  },

  'q-movement-b02': {
    ru: {
      text: 'Когда вы двигаетесь, как это обычно выглядит?',
      options: [
        'Структурированные силовые тренировки — веса или упражнения с весом тела',
        'Кардио или выносливость — бег, велосипед, плавание',
        'Практики разум-тело — йога, пилатес, тай-чи, прогулки на природе',
        'Только попутное движение — в рамках повседневной жизни',
      ],
    },
    he: {
      text: 'כשאתה זז, כיצד זה בדרך כלל נראה?',
      options: [
        'אימוני כוח מובנים — משקולות או משקל גוף',
        'קרדיו או סיבולת — ריצה, רכיבה, שחייה',
        'גוף-נפש — יוגה, פילאטיס, טאי-צ\'י, טיולים בטבע',
        'תנועה אגבית בלבד — במסגרת חיי היומיום',
      ],
    },
    de: {
      text: 'Wenn Sie sich bewegen, wie sieht das typischerweise aus?',
      options: [
        'Strukturiertes Krafttraining — Gewichte oder Körpergewichtsübungen',
        'Cardio oder Ausdauer — Laufen, Radfahren, Schwimmen',
        'Geist-Körper — Yoga, Pilates, Tai Chi, Naturwanderungen',
        'Nur beiläufige Bewegung — durch das tägliche Leben',
      ],
    },
  },

  'q-recovery-b01': {
    ru: {
      text: 'Какие практики восстановления вы используете регулярно?',
      options: [
        'Дыхательные техники, медитация или сканирование тела — отдых нервной системы',
        'Холодное воздействие, сауна или контрастная терапия',
        'Массаж, растяжка или мануальная терапия',
        'Полагаюсь только на сон — нет активных практик восстановления',
      ],
    },
    he: {
      text: 'אילו שיטות התאוששות אתה משתמש בהן באופן עקבי?',
      options: [
        'נשימה, מדיטציה או סריקת גוף — מנוחת מערכת עצבים',
        'חשיפה לקור, סאונה או טיפול ניגוד',
        'עיסוי, מתיחות או עיסוי רקמות',
        'אני מסתמך רק על שינה — אין שיטות התאוששות פעילות',
      ],
    },
    de: {
      text: 'Welche Erholungspraktiken nutzen Sie konsistent?',
      options: [
        'Atemarbeit, Meditation oder Body Scan — Nervensystemruhe',
        'Kältetherapie, Sauna oder Kontrasttherapie',
        'Massage, Dehnung oder manuelle Therapie',
        'Ich verlasse mich nur auf Schlaf — keine aktiven Erholungspraktiken',
      ],
    },
  },

  'q-recovery-b02': {
    ru: {
      text: 'В день отдыха, как он реально ощущается?',
      options: [
        'По-настоящему восстанавливающим — после чувствую себя заряженным',
        'Нейтральным — отдыхаю, но не чувствую заметного улучшения',
        'Беспокойным — чувствую вину или тревогу от остановки',
        'Я не беру дни отдыха — продолжаю без остановок',
      ],
    },
    he: {
      text: 'ביום מנוחה, כיצד החוויה באמת מרגישה?',
      options: [
        'משקמת באמת — מרגיש טעון לאחר מכן',
        'ניטרלית — נח אבל לא מרגיש טוב בצורה בולטת',
        'חסרת מנוחה — מרגיש אשמה או חרדה מהעצירה',
        'אני לא לוקח ימי מנוחה — ממשיך ללא הפסקה',
      ],
    },
    de: {
      text: 'An einem Ruhetag, wie fühlt sich das wirklich an?',
      options: [
        'Wirklich erholsam — ich fühle mich danach aufgeladen',
        'Neutral — ich ruhe mich aus, fühle mich aber nicht merklich besser',
        'Rastlos — ich fühle mich schuldig oder ängstlich beim Aufhören',
        'Ich nehme keine Ruhetage — ich mache kontinuierlich weiter',
      ],
    },
  },

  'q-emotional-b01': {
    ru: {
      text: 'Когда ваше эмоциональное состояние тяжёлое, оно больше похоже на...',
      options: [
        'Тревогу — беспокойство, навязчивые мысли или сверхбдительность',
        'Сниженное настроение — притупленность, отстранённость, низкую мотивацию',
        'Раздражительность — короткий запал, реактивность, лёгкие триггеры',
        'Онемение — трудно чувствовать что-либо — ни вверх, ни вниз',
      ],
    },
    he: {
      text: 'כשהמצב הרגשי שלך קשה, זה נוטה להיראות יותר כמו...',
      options: [
        'חרדה — דאגה, מחשבות טורדניות, או ערנות יתר',
        'מצב רוח נמוך — שטחיות, ניתוק, או מוטיבציה נמוכה',
        'עצבנות — גשם קצר, תגובתיות, מתחיל בקלות',
        'קהות — קושי להרגיש עלייה או ירידה',
      ],
    },
    de: {
      text: 'Wenn Ihr emotionaler Zustand schwierig ist, sieht es eher aus wie...',
      options: [
        'Angst — Sorge, Gedankenkarussell oder Hypervigilanz',
        'Niedergeschlagenheit — Flachheit, Distanziertheit oder geringe Motivation',
        'Reizbarkeit — kurze Zündschnur, Reaktivität, leicht ausgelöst',
        'Taubheit — Schwierigkeit, überhaupt etwas zu fühlen',
      ],
    },
  },

  'q-emotional-b02': {
    ru: {
      text: 'Когда вы эмоционально борётесь, что вам доступно?',
      options: [
        'Хотя бы один человек, которому полностью доверяю и могу говорить открыто',
        'Некоторая поддержка — люди, с кем могу поговорить, с ограничениями',
        'Минимальная — в основном справляюсь сам',
        'Чувствую себя по-настоящему одиноким с этим',
      ],
    },
    he: {
      text: 'כשאתה נאבק רגשית, מה זמין לך?',
      options: [
        'לפחות אדם אחד שאני סומך עליו לחלוטין ויכול לדבר איתו בפתיחות',
        'תמיכה מסוימת — אנשים שיכולני לדבר איתם, עם מגבלות',
        'מינימלית — בעיקר מנהל לבד',
        'אני מרגיש לבד עם זה באמת',
      ],
    },
    de: {
      text: 'Wenn Sie emotional kämpfen, was steht Ihnen zur Verfügung?',
      options: [
        'Mindestens eine Person, der ich vollständig vertraue und offen reden kann',
        'Etwas Unterstützung — Menschen, mit denen ich reden kann, mit Einschränkungen',
        'Minimal — ich komme meist alleine zurecht',
        'Ich fühle mich damit wirklich allein',
      ],
    },
  },

  'q-emotional-b03': {
    ru: {
      text: 'Как вы чаще всего перерабатываете сложные эмоции?',
      options: [
        'Ведение дневника, терапия или структурированная рефлексия',
        'Физическое движение — бег, зал, прогулки',
        'Отвлечение — соцсети, ТВ, еда, алкоголь',
        'Подавляю или игнорирую, пока само не пройдёт',
      ],
    },
    he: {
      text: 'כיצד אתה לרוב מעבד רגשות קשים?',
      options: [
        'יומן, טיפול, או רפלקציה מובנית',
        'תנועה פיזית — ריצה, חדר כושר, הליכה',
        'הסחת דעת — רשתות חברתיות, טלוויזיה, אוכל, אלכוהול',
        'אני מדכא או מתעלם עד שהם עוברים',
      ],
    },
    de: {
      text: 'Wie verarbeiten Sie schwierige Emotionen am häufigsten?',
      options: [
        'Tagebuch, Therapie oder strukturierte Reflexion',
        'Körperliche Bewegung — Laufen, Gym, Spazierengehen',
        'Ablenkung — soziale Medien, TV, Essen, Alkohol',
        'Ich unterdrücke oder ignoriere sie, bis sie vergehen',
      ],
    },
  },

  'q-purpose-b01': {
    ru: {
      text: 'Что мешает вам чувствовать чёткий смысл прямо сейчас?',
      options: [
        'Знаю свои ценности, но с трудом выражаю их в повседневной жизни',
        'Нахожусь в серьёзном жизненном переходе — роль, отношения или идентичность',
        'Становлюсь ясным, когда останавливаюсь — занятость заглушает сигнал',
        'Искренне не знаю, что для меня сейчас важнее всего',
      ],
    },
    he: {
      text: 'מה קשה לך להרגיש תחושת מטרה ברורה כרגע?',
      options: [
        'אני מכיר את הערכים שלי אך מתקשה לבטא אותם בחיי היומיום',
        'אני בתהליך מעבר חיים גדול — תפקיד, מערכת יחסים, או זהות',
        'אני מתבהר כשאני עוצר — עסקנות מטביעה את האות',
        'אני באמת לא יודע מה חשוב לי ביותר כרגע',
      ],
    },
    de: {
      text: 'Was macht es schwer, gerade ein klares Sinnempfinden zu fühlen?',
      options: [
        'Ich kenne meine Werte, kämpfe aber damit, sie im Alltag auszudrücken',
        'Ich befinde mich in einem großen Lebensübergang — Rolle, Beziehung oder Identität',
        'Ich werde klar, wenn ich pausiere — Beschäftigung übertönt das Signal',
        'Ich weiß ehrlich nicht, was mir gerade am wichtigsten ist',
      ],
    },
  },

  'q-purpose-b02': {
    ru: {
      text: 'Насколько ваша повседневная работа согласована с тем, что вам важнее всего?',
      options: [
        'Очень согласована — моя работа выражает мои ценности',
        'Частично согласована — что-то значимо, что-то нет',
        'В основном не согласована — работаю по другим причинам, не из-за смысла',
        'Глубоко не согласована — ощущение, что живу чужой жизнью',
      ],
    },
    he: {
      text: 'עד כמה העבודה היומיומית שלך מתואמת עם מה שחשוב לך ביותר?',
      options: [
        'מתואמת מאוד — העבודה שלי היא ביטוי של הערכים שלי',
        'מתואמת חלקית — חלק משמעותי, חלק לא',
        'בעיקרה לא מתואמת — אני עובד מסיבות אחרות מלבד משמעות',
        'עמוק לא מתואמת — מרגיש שאני חי חיים של מישהו אחר',
      ],
    },
    de: {
      text: 'Wie ausgerichtet ist Ihre tägliche Arbeit auf das, was Ihnen am wichtigsten ist?',
      options: [
        'Hochgradig ausgerichtet — meine Arbeit ist Ausdruck meiner Werte',
        'Teilweise ausgerichtet — manches bedeutsam, manches nicht',
        'Größtenteils nicht ausgerichtet — ich arbeite aus anderen Gründen als Sinn',
        'Tief fehlausgerichtet — ich fühle, als würde ich das Leben jemand anderen leben',
      ],
    },
  },

  'q-balance-b01': {
    ru: {
      text: 'Какая жизненная сфера поглощает непропорционально много времени и энергии?',
      options: [
        'Работа — профессиональные требования занимают большую часть внимания',
        'Уход за семьёй — ставлю других вперёд в ущерб себе',
        'Кризис здоровья или восстановление — обстоятельства вынудили к дисбалансу',
        'Собственная внутренняя борьба — ментальные требования вытесняют всё остальное',
      ],
    },
    he: {
      text: 'איזה תחום חיים צורך זמן ואנרגיה בלתי פרופורציונליים?',
      options: [
        'עבודה — דרישות מקצועיות לוקחות את רוב תשומת הלב שלי',
        'טיפול במשפחה — אני שם אחרים לפני על חשבון עצמי',
        'משבר בריאות או התאוששות — הנסיבות כפו חוסר איזון',
        'המאבק הפנימי שלי — דרישות מנטליות דוחקות הכל אחר',
      ],
    },
    de: {
      text: 'Welcher Lebensbereich verbraucht unverhältnismäßig viel Zeit und Energie?',
      options: [
        'Arbeit — berufliche Anforderungen nehmen den größten Teil meiner Aufmerksamkeit',
        'Familienpflege — ich stelle andere zuerst, zu meinem eigenen Nachteil',
        'Gesundheitskrise oder Erholung — Umstände haben Ungleichgewicht erzwungen',
        'Mein eigener innerer Kampf — mentale Anforderungen drängen alles andere raus',
      ],
    },
  },

  'q-balance-b02': {
    ru: {
      text: 'Насколько питающими являются ваши ближайшие отношения прямо сейчас?',
      options: [
        'Очень питающими — чувствую себя увиденным, любимым и поддержанным',
        'В основном хорошими, с редкими трениями',
        'Напряжёнными — есть конфликт, дистанция или нерешённые проблемы',
        'Значительно истощающими или отсутствующими — чувствую себя без поддержки',
      ],
    },
    he: {
      text: 'כמה מזינות הם מערכות היחסים הקרובות שלך כרגע?',
      options: [
        'מזינות מאוד — מרגיש נראה, אהוב ונתמך',
        'טובות ברובן עם חיכוך מדי פעם',
        'מתוחות — יש מתח, ריחוק, או בעיות לא פתורות',
        'מדלדלות משמעותית או נעדרות — מרגיש לא נתמך',
      ],
    },
    de: {
      text: 'Wie nährend sind Ihre nächsten Beziehungen gerade?',
      options: [
        'Sehr nährend — ich fühle mich gesehen, geliebt und unterstützt',
        'Größtenteils gut mit gelegentlicher Reibung',
        'Angespannt — es gibt Spannungen, Distanz oder ungelöste Probleme',
        'Erheblich erschöpfend oder fehlend — ich fühle mich nicht unterstützt',
      ],
    },
  },

  'q-balance-b03': {
    ru: {
      text: 'Как выглядят отдых и игра в вашей нынешней жизни?',
      options: [
        'Богато — у меня есть хобби, интересы и настоящее свободное время',
        'Ограниченно, но присутствует — вписываю досуг, когда получается',
        'Минимально — у меня больше нет для этого пространства',
        'Отсутствует — забыл, каково это — отдыхать без чувства вины',
      ],
    },
    he: {
      text: 'כיצד נראים מנוחה ומשחק בחייך הנוכחיים?',
      options: [
        'עשיר — יש לי תחביבים, תחומי עניין וזמן פנאי אמיתי',
        'מוגבל אבל קיים — אני מכניס פנאי כשאני יכול',
        'מינימלי — כבר אין לי מקום לזה',
        'נעדר — שכחתי איך מרגיש מנוחה בלי אשמה',
      ],
    },
    de: {
      text: 'Wie sehen Ruhe und Spiel in Ihrem aktuellen Leben aus?',
      options: [
        'Reich — ich habe Hobbys, Interessen und echte Freizeit',
        'Begrenzt aber vorhanden — ich quetsche Freizeit ein, wenn ich kann',
        'Minimal — ich habe keinen Raum mehr dafür',
        'Fehlend — ich habe vergessen, wie sich Ruhe ohne Schuld anfühlt',
      ],
    },
  },
}

// ── Helper: get localized question text + option labels ───────────────────────
// Returns English as fallback if locale not found.
export function getLocalizedQuestion(
  questionId: string,
  optionTextsEN: string[],
  textEN: string,
  locale: string,
): { text: string; options: string[] } {
  if (locale === 'en') return { text: textEN, options: optionTextsEN }
  const t = QUESTION_I18N[questionId]?.[locale]
  if (t) return t
  return { text: textEN, options: optionTextsEN }
}
