// ============================================================
// HOLOS — Recommendation i18n translations
// Maps rec_id → { title, description } per locale (EN is in the source data)
// ============================================================

export type RecLocale = 'ru' | 'he' | 'de'

export interface RecTranslation {
  title: string
  description: string
}

export const REC_I18N: Record<RecLocale, Record<string, RecTranslation>> = {

  // ── RUSSIAN ─────────────────────────────────────────────────────────────
  ru: {
    // SLEEP
    'slp-001': { title: 'Температура в спальне 18°C', description: 'Охладите спальню до 18–19°C. Для начала глубокого сна температура тела должна снизиться на 1–2°C. Более прохладная обстановка значительно ускоряет этот процесс.' },
    'slp-002': { title: 'Постоянное время подъёма', description: 'Вставайте в одно и то же время каждый день — включая выходные. Фиксированное время пробуждения стабилизирует циркадный ритм быстрее, чем любое другое вмешательство.' },
    'slp-003': { title: 'Протокол расслабления перед сном (90 мин)', description: 'Начните приглушать свет за 90 минут до сна. Яркий свет подавляет мелатонин на 2–3 часа. После заката используйте освещение в красном спектре.' },
    'slp-004': { title: 'Утренний солнечный свет', description: 'Выходите на 5–10 минут на естественный свет в течение 30 минут после пробуждения. Солнечный свет перезапускает супрахиазматическое ядро и устанавливает правильный пик кортизола.' },
    'slp-005': { title: 'Без кофеина после 13:00', description: 'Период полувыведения кофеина — 5–7 часов. Кофе в 15:00 означает, что 50% действует в 21:00, а 25% — в 1:00 ночи. Уберите кофеин после 13:00 на 14 дней и оцените качество сна.' },
    'slp-006': { title: 'Дыхание 4-7-8 перед сном', description: 'Вдох 4 счёта, задержка 7, выдох 8. Активирует парасимпатическую нервную систему, снижает сердечный ритм и уровень кортизола. Выполняйте 4 цикла лёжа.' },
    'slp-007': { title: 'Глицинат магния перед сном', description: 'Глицинат магния (300–400 мг) за 30–60 минут до сна поддерживает активность ГАМК и расслабление мышц. Форма глицината обладает высокой биодоступностью и мягко переносится.' },
    'slp-008': { title: 'Полный отказ от алкоголя', description: 'Даже умеренный алкоголь нарушает архитектуру сна, подавляет фазу БДГ и увеличивает число ночных пробуждений. Откажитесь на 2 недели и оцените базовое качество сна.' },
    'slp-009': { title: 'Поза «ноги на стену» перед сном', description: 'Поза Випарита Карани: лягте с ногами вертикально у стены на 10 минут. Активирует тонус блуждающего нерва, улучшает лимфоток и создаёт чёткий сигнал перехода ко сну.' },
    'slp-010': { title: 'Телефон — в другой комнате', description: 'Близость телефона — даже экраном вниз — повышает когнитивное возбуждение и затрудняет засыпание. Перенесите его в другую комнату и используйте обычный будильник.' },
    // NUTRITION
    'nut-001': { title: 'Белок в каждом приёме пищи', description: 'Стремитесь к 30–40 г белка за один приём для максимального синтеза мышечного белка, стабилизации глюкозы крови и длительного насыщения. Особенно эффективны источники, богатые лейцином.' },
    'nut-002': { title: 'Интервальное питание (16:8)', description: 'Ограничьте приём пищи 8-часовым окном, согласованным с естественным освещением. Улучшает инсулинорезистентность, снижает воспаление и повышает митохондриальную эффективность.' },
    'nut-003': { title: 'Противовоспалительные специи', description: 'Куркума (1 г) + чёрный перец (0,1 г) + имбирь ежедневно. Пиперин в чёрном перце повышает биодоступность куркумина на 2000%. Имбирь оказывает самостоятельное противовоспалительное действие.' },
    'nut-004': { title: 'Горькая зелень перед едой', description: 'Съешьте 1–2 листа рукколы, цикория или радиккио за 10 минут до основного блюда. Горькие соединения стимулируют выработку пищеварительных ферментов и улучшают желчеотделение.' },
    'nut-005': { title: 'Меньше ультрапереработанных продуктов', description: 'Заменяйте один ультрапереработанный продукт в день его цельным аналогом. УПП нарушают микробиом кишечника, повышают маркеры воспаления и подавляют сигналы насыщения.' },
    'nut-006': { title: 'Ферментированные продукты каждый день', description: '1–2 порции ферментированных продуктов в день (кефир, кимчи, квашеная капуста, мисо) увеличивают разнообразие микробиома в течение 4 недель — эффект превосходит диету с высоким содержанием клетчатки.' },
    'nut-007': { title: 'Радуга цветов каждую неделю', description: 'Отслеживайте цветовое разнообразие за 7 дней: красный, оранжевый, жёлтый, зелёный, синий/фиолетовый, белый. Каждый цвет — уникальный класс фитонутриентов, который не заменит ни одна добавка.' },
    'nut-008': { title: 'Омега-3 прежде всего из пищи', description: '2–3 порции жирной рыбы в неделю (сардины, скумбрия, дикий лосось) обеспечивают ЭПК/ДГК для когнитивной функции, контроля воспаления и здоровья сердца.' },
    'nut-009': { title: 'Сезонное и местное питание', description: 'Согласуйте рацион с сезонными продуктами. Это естественным образом обеспечивает смену нутриентных профилей в течение года — принцип, признанный всеми оздоровительными традициями.' },
    'nut-010': { title: 'Осознанный приём пищи', description: 'Садитесь, выключайте экраны, делайте 3 медленных вдоха перед первым кусочком. Жуйте каждый кусочек 20 раз. Активирует цефалическую фазу пищеварения и значительно улучшает насыщение.' },
    // STRESS
    'str-001': { title: 'Физиологический вздох', description: 'Двойной вдох через нос (первый — полный, второй — добирающий воздух), затем медленный выдох через рот. Мгновенно снижает стресс, сдувая спавшиеся альвеолы и ускоряя выведение CO₂.' },
    'str-002': { title: 'Холодный душ', description: '30–90 секунд холодной воды утром или после тренировки. Повышает норэпинефрин на 200–300%, улучшает настроение, повышает устойчивость к стрессу и ускоряет восстановление мышц.' },
    'str-003': { title: 'Дневник стресса', description: 'Пишите 5 минут о самом стрессовом, что у вас на уме — без структуры. Экспрессивное письмо снижает кортизол, уменьшает руминацию и улучшает рабочую память в течение 2 недель.' },
    'str-004': { title: 'Прогулка на природе (20 минут)', description: '20 минут в любом природном пространстве снижают кортизол, кровяное давление и нервное возбуждение. «Зелёный шум» подавляет миндалевидное тело эффективнее городских звуков.' },
    'str-005': { title: 'НСГП (глубокий отдых без сна)', description: '10–20-минутный протокол Йога-нидры или НСГП средь дня. Восстанавливает дофаминовые резервы, снижает кортизол и улучшает мозговую деятельность — не заменяя сон, но существенно дополняя его.' },
    'str-006': { title: 'Тайм-блокинг с запасом времени', description: 'Планируйте день, оставляя 20% буферного времени. Хроническая нехватка времени — один из главных факторов повышения кортизола. Запас превращает реактивные дни в осознанные.' },
    'str-007': { title: 'Ашваганда (KSM-66)', description: '300–600 мг KSM-66 ежедневно в течение 8 недель снижают кортизол на 27–30% (данные клинических исследований). Адаптоген, модулирующий реактивность оси ГГН. Проконсультируйтесь с врачом при приёме медикаментов.' },
    // MOVEMENT
    'mov-001': { title: 'Кардио Зона 2 (3 раза в неделю)', description: 'Три 30–45-минутные сессии в неделю в зоне 2 (можно говорить, но с усилием). Строит митохондриальную базу, улучшает жировой обмен и снижает маркеры метаболического синдрома.' },
    'mov-002': { title: 'Прогулка 10 минут после еды', description: 'Даже лёгкая ходьба через 30 минут после еды снижает постпрандиальную глюкозу на 30–50% и уменьшает инсулиновый ответ. Простейший инструмент метаболического здоровья.' },
    'mov-003': { title: 'Силовые тренировки (2 раза в неделю)', description: 'Две силовые тренировки в неделю сохраняют мышечную массу, улучшают инсулиночувствительность и повышают базальный метаболизм. Многосуставные упражнения дают максимальный результат за минимальное время.' },
    'mov-004': { title: 'Цель: 7000+ шагов в день', description: 'Ходьба — самая изученная форма двигательной активности с измеримыми преимуществами для здоровья начиная с 7000 шагов в день. Мониторинг количества шагов значительно повышает соблюдение нормы.' },
    'mov-005': { title: 'Упражнения на подвижность (10 мин утром)', description: '10 минут круговых движений суставами, раскрытия бёдер и скручиваний позвоночника после пробуждения. Улучшает синовиальное смазывание, снижает риск травм и улучшает настроение на несколько часов.' },
    // MINDFULNESS
    'mnd-001': { title: 'Медитация сфокусированного внимания', description: '10–20 минут ежедневно с вниманием на дыхании. При отвлечении — мягко возвращайтесь. Это повторяющееся действие укрепляет кортекс передней поясной извилины и улучшает контроль внимания.' },
    'mnd-002': { title: 'Практика открытого наблюдения', description: '10–15 минут без фиксации внимания — позвольте мыслям и ощущениям проходить, не цепляясь за них. Уменьшает нейронную активность сети пассивного режима мозга и снижает тревожность.' },
    'mnd-003': { title: 'Практика любящей доброты (Метта)', description: '5 минут направляйте тёплые пожелания себе, затем близким, затем незнакомым людям. Клинические исследования показывают рост положительных эмоций и тонуса блуждающего нерва уже через 7 дней практики.' },
    'mnd-004': { title: 'Цифровой шаббат (еженедельно)', description: 'Один день в неделю без социальных сетей, новостей и необязательных уведомлений. Систематическое отключение от цифровой среды уменьшает тревожность, восстанавливает концентрацию и улучшает сон.' },
    'mnd-005': { title: 'Мини-практика благодарности', description: 'Три конкретные вещи, за которые вы благодарны, записанные от руки каждое утро. Конкретность важнее длины: «свет в окне в 7 утра» лучше, чем «семья».' },
    // RECOVERY
    'rec-001': { title: 'Протокол сауны (3 раза в неделю)', description: '15–20 минут при 80–90°C три раза в неделю. Снижает риск сердечно-сосудистых заболеваний, повышает гормон роста, улучшает состояние митохондрий и ускоряет восстановление мышц.' },
    'rec-002': { title: 'День активного восстановления', description: 'Один день в неделю: лёгкая ходьба, растяжка, плавание или йога при ЧСС 40–60% от максимального. Ускоряет выведение лактата, уменьшает болезненность мышц и снижает системное воспаление.' },
    'rec-003': { title: 'Ванна с английской солью (2 раза в неделю)', description: '2 стакана английской соли (сульфат магния) в тёплой ванне на 20 минут. Трансдермальное поглощение магния + тепло + активация парасимпатической нервной системы = отличное мышечное восстановление.' },
    'rec-004': { title: 'Утренний контроль ВСР', description: 'Измеряйте вариабельность сердечного ритма каждое утро лёжа. Низкий ВСР сигнализирует о перенапряжении: следует снизить нагрузку. Высокий ВСР означает, что организм готов к интенсивной работе.' },
    'rec-005': { title: 'Отдых без сна (горизонтальный отдых)', description: '15 минут полной неподвижности лёжа после наиболее напряжённого периода дня. Даже без сна горизонтальный отдых снижает активность симпатической нервной системы и поддерживает восстановление тканей.' },
    // HYDRATION
    'hyd-001': { title: 'Утренний ритуал гидратации', description: '500 мл воды в течение 30 минут после пробуждения. Добавьте щепотку морской соли и немного лимонного сока. Восстанавливает осмотический баланс, утраченный во время сна, и запускает перистальтику кишечника.' },
    'hyd-002': { title: 'Оптимизация электролитов', description: 'Натрий, калий и магний поддерживают гидратацию клеток, работу мышц и нервную проводимость. Пот содержит ~1 г натрия на литр — восполняйте его с помощью питания или добавок при интенсивных нагрузках.' },
    'hyd-003': { title: 'Травяной чай по вашим целям', description: 'Замените послеполуденный кофе функциональным травяным чаем: ромашка/пассифлора для сна, туласи/ашваганда для стресса, имбирь/фенхель для пищеварения, мята перечная для энергии.' },
    // PURPOSE
    'pup-001': { title: 'Карта Икигай (ежеквартально)', description: 'Раз в квартал исследуйте четыре круга Икигай: что вы любите, что умеете, что нужно миру и за что могут платить. Зоны пересечения — ваши зоны осмысленности.' },
    'pup-002': { title: 'Прояснение трёх ценностей', description: 'Назовите три ценности, которые определяют вас, не как цели или роли. Затем оцените, в какой мере ваши действия прошлой недели отражали каждую из них. Несоответствие — источник хронического стресса.' },
    'pup-003': { title: 'Акт служения (еженедельно)', description: 'Один осознанный акт служения или помощи каждую неделю: волонтёрство, наставничество, искреннее письмо тому, кто в нём нуждается. Просоциальное поведение — один из самых надёжных факторов удовлетворённости жизнью.' },
    // RELATIONSHIPS
    'rel-001': { title: 'Разговор с полным присутствием (ежедневно)', description: 'Один разговор в день без телефона, отвлечений и мысленного приготовления ответа. Просто слушайте. Качество присутствия важнее продолжительности: 10 минут искреннего внимания меняют отношения.' },
    'rel-002': { title: 'Аудит вложений в отношения', description: 'Разбейте свои отношения на уровни. Определите, кто вас наполняет, а кто истощает. Сделайте одно осознанное вложение в отношения первого уровня на этой неделе: совместная еда, письмо, звонок.' },
    // ENVIRONMENT
    'env-001': { title: 'Навести порядок в одном месте', description: 'Выберите одну захламлённую поверхность или ящик и разберите полностью. Беспорядок постоянно активирует реакцию на угрозу в коре головного мозга. Одно чистое пространство снижает фоновую тревожность.' },
    'env-002': { title: 'Комнатные растения (воздух и настроение)', description: 'Два или более растений в жилом пространстве улучшают качество воздуха и психологическое самочувствие. Полисциас, потос и хлорофитум особенно эффективны для фильтрации воздуха.' },
    'env-003': { title: 'Ароматическая привязка', description: 'Свяжите определённый запах с желаемым состоянием. Лаванда — для сна, розмарин — для концентрации, цитрус — для бодрости. Используйте только в этом контексте. Обонятельная система имеет прямой путь к лимбической системе.' },
  },

  // ── HEBREW ──────────────────────────────────────────────────────────────
  he: {
    // SLEEP
    'slp-001': { title: 'חדר שינה בטמפרטורת 18°C', description: 'צנן את חדר השינה ל-18–19°C. טמפרטורת הגוף חייבת לרדת ב-1–2°C כדי להתחיל שנת עמק. הורדת הטמפרטורה הסביבתית מאיצה משמעותית את התהליך הזה.' },
    'slp-002': { title: 'זמן השכמה קבוע', description: 'קבעו שעת השכמה זהה כל יום – כולל סופי שבוע. עוגן קבוע מייצב את הקצב הצירקדי מהר יותר מכל התערבות אחרת.' },
    'slp-003': { title: 'פרוטוקול הרגעה של 90 דקות לפני שינה', description: 'התחילו לעמעם אורות 90 דקות לפני השינה. אור בהיר מדכא מלטונין ל-2–3 שעות. השתמשו בתאורה בספקטרום אדום לאחר השקיעה.' },
    'slp-004': { title: 'עוגן אור בוקר', description: 'צאו ל-5–10 דקות של אור טבעי תוך 30 דקות מההשכמה. אור השמש מאפס את הגרעין הסופרכיאסמטי – השעון הביולוגי שלכם – ומכוון את שיא הקורטיזול לזמן הנכון.' },
    'slp-005': { title: 'ללא קפאין לאחר 13:00', description: 'זמן מחצית החיים של קפאין הוא 5–7 שעות. קפה ב-15:00 אומר שעדיין יש 50% פעיל ב-21:00 ו-25% ב-01:00. הסירו קפאין לאחר 13:00 למשך 14 ימים ומדדו שינוי באיכות השינה.' },
    'slp-006': { title: 'נשימה 4-7-8 לפני שינה', description: 'שאפו 4 ספירות, החזיקו 7, נשפו 8. מפעיל את מערכת העצבים הפאראסימפתטית, מוריד קצב לב ורמות קורטיזול. בצעו 4 מחזורים בשכיבה.' },
    'slp-007': { title: 'מגנזיום גליצינאט לפני שינה', description: 'מגנזיום גליצינאט (300–400 מ"ג) 30–60 דקות לפני שינה תומך בפעילות GABA והרפיית שרירים. לצורת הגליצינאט זמינות ביולוגית מעולה ותופעות לוואי מינימליות.' },
    'slp-008': { title: 'הימנעות מוחלטת מאלכוהול', description: 'אפילו אלכוהול מתון מפרגמנט את ארכיטקטורת השינה, מדכא שנת REM ומגביר יקיצות. הימנעו למשך שבועיים כדי להעריך את איכות השינה הבסיסית.' },
    'slp-009': { title: 'תנוחת רגליים על הקיר לפני שינה', description: 'תנוחת יוגה Viparita Karani: שכבו עם רגליים אנכיות על קיר למשך 10 דקות. מפעיל טונוס ועגאלי, מנקז נוזל לימפטי ויוצר מעבר נוירולוגי ברור לשינה.' },
    'slp-010': { title: 'הטלפון בחדר אחר', description: 'קרבת הטלפון – אפילו כשהוא הפוך – מגבירה עוררות קוגניטיבית ומקשה על ההירדמות. העבירו אותו לחדר אחר והשתמשו בשעון מעורר רגיל.' },
    // NUTRITION
    'nut-001': { title: 'חלבון בכל ארוחה', description: 'שאפו ל-30–40 גרם חלבון בארוחה כדי למקסם סינתזת חלבון שרירי, לייצב גלוקוז בדם ולהאריך תחושת שובע. מקורות עשירים בלאוצין (ביצים, דגים, קטניות) יעילים במיוחד.' },
    'nut-002': { title: 'אכילה בחלון זמן (16:8)', description: 'צמצמו את חלון האכילה ל-8 שעות, בהתאמה לאור הטבעי. שיפור רגישות לאינסולין, הפחתת סמני דלקת ותמיכה ביעילות מיטוכונדריאלית ללא הגבלה קלורית.' },
    'nut-003': { title: 'תבלינים אנטי-דלקתיים', description: 'כורכום (1 ג) + פלפל שחור (0.1 ג) + ג\'ינג\'ר יומי. הפיפרין בפלפל שחור מגביר את הזמינות הביולוגית של כורכומין ב-2000%. ג\'ינג\'ר מוסיף תמיכה אנטי-דלקתית ועיכולית עצמאית.' },
    'nut-004': { title: 'ירוקים מרירים לפני ארוחות', description: 'אכלו 1–2 עלים של רוקט, אנדיב או רדיקיו 10 דקות לפני הארוחה הראשית. תרכובות מרירות מפעילות הפרשת אנזימי עיכול ומשפרות זרימת מרה.' },
    'nut-005': { title: 'הפחתת מזון מעובד מאוד', description: 'החליפו פריט מעובד אחד ביום במקביל שלו מהטבע. מזון מעובד מאוד פוגע במגוון המיקרוביום, מעלה סמני דלקת ופוגע באותות שובע.' },
    'nut-006': { title: 'מזונות מותססים יומיים', description: '1–2 מנות מזון מותסס יומי (קפיר, קימצ\'י, כרוב כבוש, מיסו) מגבירות את מגוון המיקרוביום תוך 4 שבועות – יעיל יותר מדיאטה עשירה בסיבים לבדה.' },
    'nut-007': { title: 'לאכול את קשת הצבעים שבועית', description: 'עקבו אחר מגוון הצבעים ב-7 ימים: אדום, כתום, צהוב, ירוק, כחול/סגול, לבן. כל צבע מייצג מחלקות פיטוניוטריאנטים ייחודיות שאף תוסף לא יכול לשכפל.' },
    'nut-008': { title: 'אומגה-3 ממזון בראש ובראשונה', description: '2–3 מנות דגים שמנים שבועיות (סרדינים, מקרל, סלמון בר) מספקות EPA/DHA לתפקוד קוגניטיבי, פתרון דלקת והגנה קרדיווסקולרית.' },
    'nut-009': { title: 'אכילה עונתית ומקומית', description: 'התאימו את התזונה לזמינות העונתית. זה מחלף אתכם דרך פרופילי נוטריאנטים משלימים לאורך השנה – עיקרון משותף לאיורוודה, רמב"ם ורפואה סינית מסורתית.' },
    'nut-010': { title: 'אכילה מודעת', description: 'שבו, כבו מסכים, קחו 3 נשימות איטיות לפני הנגיסה הראשונה. לעסו כל לגימה 20 פעם. מפעיל את שלב ה-cephalic בעיכול ומשפר משמעותית ספיגת נוטריאנטים ותחושת שובע.' },
    // STRESS
    'str-001': { title: 'אנחה פיזיולוגית', description: 'שאיפה כפולה דרך האף (ראשונה מלאה, שנייה קצרה למילוי ריאות), ואז נשיפה איטית ומלאה דרך הפה. מוריד סטרס באופן מיידי על ידי פתיחת שלפוחיות ריאה קרוסות ופליטת CO₂.' },
    'str-002': { title: 'חשיפה לקור (מקלחת קרה)', description: '30–90 שניות מים קרים בבוקר או לאחר אימון. מעלה נוראפינפרין ב-200–300%, משפר מצב רוח, בונה עמידות לסטרס ומאיץ התאוששות שרירים.' },
    'str-003': { title: 'יומן סטרס', description: 'כתבו 5 דקות על הדבר המלחיץ ביותר שבראשכם – ללא מבנה. כתיבה אקספרסיבית מורידה קורטיזול, מפחיתה רומינציה ומשפרת זיכרון עבודה תוך שבועיים.' },
    'str-004': { title: 'הליכה בטבע (20 דקות)', description: '20 דקות בכל מרחב טבעי מורידות קורטיזול, לחץ דם ועוררות עצבית. "הרעש הירוק" מדכא את האמיגדלה ביעילות רבה יותר מצלילים עירוניים.' },
    'str-005': { title: 'NSDR (מנוחה עמוקה ללא שינה)', description: 'פרוטוקול Yoga Nidra או NSDR של 10–20 דקות באמצע היום. משחזר רזרבות דופמין, מוריד קורטיזול ומשפר ביצועים קוגניטיביים – תוספת חיונית לשינה, לא תחליף.' },
    'str-006': { title: 'חסימת זמן עם שוליים', description: 'תכננו את היום עם 20% זמן חיץ. לחץ זמן כרוני הוא מניע מרכזי של קורטיזול. שוליים הופכים ימים ריאקטיביים לימים מכוונים.' },
    'str-007': { title: 'אשווגנדה (KSM-66)', description: '300–600 מ"ג KSM-66 יומי למשך 8 שבועות מפחית קורטיזול ב-27–30% במחקרים מבוקרים. פועל כאדפטוגן שמווסת את ציר HPA. התייעצו עם רופא בנטילת תרופות.' },
    // MOVEMENT
    'mov-001': { title: 'קרדיו אזור 2 (3 פעמים בשבוע)', description: 'שלוש סשנים של 30–45 דקות בשבוע באזור 2 (אפשר לדבר בקושי). בונה בסיס מיטוכונדריאלי, משפר חילוף חומרים של שומן ומוריד סמני תסמונת מטבולית.' },
    'mov-002': { title: 'הליכה 10 דקות אחרי ארוחה', description: 'אפילו הליכה קלה 30 דקות אחרי אכילה מורידה גלוקוז פוסטפרנדיאלי ב-30–50% ומפחיתה את תגובת האינסולין. הכלי הפשוט ביותר לבריאות מטבולית.' },
    'mov-003': { title: 'אימוני כוח (2 פעמים בשבוע)', description: 'שני אימוני כוח בשבוע שומרים על מסת שריר, משפרים רגישות לאינסולין ומעלים חילוף חומרים במנוחה. תרגילים מרובי מפרקים נותנים את המקסימום לכל שעת אימון.' },
    'mov-004': { title: 'יעד 7,000+ צעדים ביום', description: 'הליכה היא צורת הפעילות הנחקרת ביותר עם יתרונות בריאותיים מדידים החל מ-7,000 צעדים ביום. מעקב אחר מספר הצעדים משפר משמעותית עמידה ביעדים.' },
    'mov-005': { title: 'תרגול ניידות (10 דקות בבוקר)', description: '10 דקות של מעגלי מפרקים, פתיחת ירכיים וסיבובי עמוד שדרה בהשכמה. מגביר חלוקת נוזל סינוביאלי, מפחית סיכון פציעה ומשפר מצב רוח לשעות.' },
    // MINDFULNESS
    'mnd-001': { title: 'מדיטציית קשב ממוקד', description: '10–20 דקות יומיות עם קשב על הנשימה. כשמוסחים – חזרו בעדינות. פעולה חוזרת זו מחזקת את קליפת ה-ACC ומשפרת שליטת קשב.' },
    'mnd-002': { title: 'תרגול ניטור פתוח', description: '10–15 דקות ללא עיגון קשב – הניחו לרעיונות ולתחושות לעבור מבלי להיאחז בהם. מפחית פעילות רשת ה-DMN ומוריד חרדה.' },
    'mnd-003': { title: 'תרגול אהבה וחסד (מטא)', description: '5 דקות של כוונת חמימות לעצמכם, לאהובים ואחר כך לזרים. מחקרים מראים עלייה ברגשות חיוביים ובטונוס הועגאלי תוך 7 ימי תרגול.' },
    'mnd-004': { title: 'שבת דיגיטלית (שבועית)', description: 'יום אחד בשבוע ללא רשתות חברתיות, חדשות והתראות לא הכרחיות. ניתוק דיגיטלי שיטתי מפחית חרדה, מחזיר ריכוז ומשפר שינה.' },
    'mnd-005': { title: 'מיקרו-תרגול הכרת תודה', description: 'שלושה דברים ספציפיים שאתם אסירי תודה עליהם, כתובים ביד (לא מוקלדים) בכל בוקר. ספציפיות חשובה יותר מאורך: "האור דרך החלון ב-7:00 בבוקר" עדיף על "משפחתי".' },
    // RECOVERY
    'rec-001': { title: 'פרוטוקול סאונה (3 פעמים בשבוע)', description: '15–20 דקות ב-80–90°C שלוש פעמים בשבוע. מפחית סיכון קרדיווסקולרי, מעלה הורמון גדילה, משפר פעילות מיטוכונדריאלית ומאיץ התאוששות שרירים.' },
    'rec-002': { title: 'פרוטוקול יום התאוששות פעיל', description: 'יום אחד בשבוע: הליכה קלה, מתיחות, שחייה או יוגה ב-40–60% מדופק מקסימלי. מאיץ פינוי לקטט, מפחית כאב שרירים ומוריד דלקת מערכתית.' },
    'rec-003': { title: 'אמבטיית מלח אפסום (2 פעמים בשבוע)', description: '2 כוסות מלח אפסום (מגנזיום סולפט) באמבטיה חמה למשך 20 דקות. ספיגת מגנזיום טרנסדרמלית + חום + הפעלה פאראסימפתטית = התאוששות שרירית ושינה מעולים.' },
    'rec-004': { title: 'מדידת HRV בבוקר', description: 'מדדו את הוריאביליות בקצב הלב בכל בוקר בשכיבה. HRV נמוך מאותת על מתח יתר – הפחיתו עומס. HRV גבוה מסמן שהגוף מוכן לעבודה אינטנסיבית.' },
    'rec-005': { title: 'מנוחה ללא שינה (מנוחה אופקית)', description: '15 דקות של שקט מוחלט בשכיבה לאחר תקופת הדרישה הגבוהה ביותר. גם ללא שינה, מנוחה אופקית מפחיתה פעילות מערכת עצבים סימפתטית ותומכת בתיקון רקמות.' },
    // HYDRATION
    'hyd-001': { title: 'טקס לחות בוקר', description: '500 מ"ל מים תוך 30 דקות מההשכמה. הוסיפו קורט מלח ים וקצת מיץ לימון. משחזר את האיזון האוסמוטי שאבד בשינה ומפעיל ניעות מעי.' },
    'hyd-002': { title: 'אופטימיזציה של אלקטרוליטים', description: 'נתרן, אשלגן ומגנזיום תומכים בהידרציה תאית, תפקוד שרירים והולכה עצבית. זיעה מכילה כ-1 ג\'ר נתרן לליטר – השלימו דרך תזונה או תוספים בפעילות אינטנסיבית.' },
    'hyd-003': { title: 'תה צמחים ליעדים ספציפיים', description: 'החליפו קפה אחר הצהריים בתה צמחים פונקציונלי: קמומיל/פסיפלורה לשינה, טולסי/אשווגנדה לסטרס, ג\'ינג\'ר/שומר לעיכול, נענע לאנרגיה.' },
    // PURPOSE
    'pup-001': { title: 'מיפוי איקיגאי (רבעוני)', description: 'חקרו את ארבעת המעגלים של איקיגאי: מה אתם אוהבים, מה אתם טובים בו, מה העולם צריך ועל מה אפשר לקבל תשלום. אזורי החפיפה הם אזורי המשמעות שלכם.' },
    'pup-002': { title: 'הבהרת שלוש ערכים', description: 'זהו שלושה ערכים שמגדירים אתכם – לא מטרות או תפקידים. הוסיפו הערכה עד כמה פעולות השבוע שעבר שיקפו כל אחד מהם. פערים הם מקור ללחץ כרוני.' },
    'pup-003': { title: 'מעשה שירות (שבועי)', description: 'מעשה תרומה אחד מכוון בשבוע – להתנדב, לחנות, לכתוב מסר כן למי שזקוק לו. התנהגות פרוסוציאלית היא אחד המחוללים האמינים ביותר של סיפוק בחיים.' },
    // RELATIONSHIPS
    'rel-001': { title: 'שיחה עם נוכחות מלאה (יומית)', description: 'שיחה אחת ביום ללא טלפון, הסחות דעת או הכנת תשובות מנטלית. פשוט הקשיבו. איכות הנוכחות חשובה יותר מהמשך: 10 דקות של קשב אמיתי משנות יחסים.' },
    'rel-002': { title: 'ביקורת השקעה ביחסים', description: 'מפו את היחסים שלכם לרמות. זהו מי ממריץ אתכם ומי מרוקן אתכם. בצעו השקעה מכוונת אחת ביחסים של הרמה הראשונה השבוע: ארוחה משותפת, מכתב, שיחה.' },
    // ENVIRONMENT
    'env-001': { title: 'פינוי עומס ממקום אחד', description: 'בחרו משטח אחד עמוס או מגירה אחת ופנו אותה לחלוטין. עומס מפעיל כל הזמן תגובת איום בקורטקס המוחי. מרחב נקי אחד מפחית חרדה רקע.' },
    'env-002': { title: 'צמחי בית (אוויר ומצב רוח)', description: 'שניים או יותר צמחים במרחב המחיה משפרים איכות אוויר ורווחה פסיכולוגית. פוליסיאס, פוטוס ואספרגוס יעילים במיוחד לסינון אוויר.' },
    'env-003': { title: 'עיגון ריח', description: 'שייכו ריח ספציפי למצב רצוי. לבנדר לשינה, רוזמרין לריכוז, הדרים לאנרגיה. השתמשו בו בהקשר זה בלבד. מערכת הריח היא הנתיב הישיר ביותר ללמבדה.' },
  },

  // ── GERMAN ──────────────────────────────────────────────────────────────
  de: {
    // SLEEP
    'slp-001': { title: 'Schlafumgebung 18°C', description: 'Kühlen Sie Ihr Schlafzimmer auf 18–19°C. Die Körpertemperatur muss um 1–2°C sinken, um Tiefschlaf einzuleiten. Eine niedrigere Umgebungstemperatur beschleunigt diesen Prozess erheblich.' },
    'slp-002': { title: 'Feste Aufwachzeit', description: 'Stehen Sie jeden Tag zur gleichen Zeit auf – auch am Wochenende. Eine feste Aufwachzeit stabilisiert den Schlaf-Wach-Rhythmus schneller als jede andere Maßnahme.' },
    'slp-003': { title: '90-Minuten-Entspannungsprotokoll vor dem Schlafen', description: 'Beginnen Sie 90 Minuten vor dem Schlafen, das Licht zu dimmen. Helles Licht unterdrückt Melatonin für 2–3 Stunden. Nutzen Sie nach Sonnenuntergang Rotlicht-Beleuchtung.' },
    'slp-004': { title: 'Morgendlicher Sonnenlichter-Anker', description: 'Verbringen Sie 5–10 Minuten im natürlichen Licht innerhalb von 30 Minuten nach dem Aufwachen. Sonnenlicht setzt den suprachiasmatischen Kern zurück – Ihre innere Uhr.' },
    'slp-005': { title: 'Kein Koffein nach 13 Uhr', description: 'Die Halbwertszeit von Koffein beträgt 5–7 Stunden. Ein Kaffee um 15 Uhr bedeutet, dass um 21 Uhr noch 50% aktiv sind. Eliminieren Sie Koffein nach 13 Uhr für 14 Tage.' },
    'slp-006': { title: '4-7-8-Atemübung vor dem Schlafen', description: '4 Sekunden einatmen, 7 halten, 8 ausatmen. Aktiviert das parasympathische Nervensystem, senkt Herzfrequenz und Cortisol. Führen Sie 4 Zyklen im Liegen durch.' },
    'slp-007': { title: 'Magnesiumglycinat vor dem Schlafen', description: 'Magnesiumglycinat (300–400 mg) 30–60 Minuten vor dem Schlafen unterstützt die GABA-Aktivität und Muskelentspannung. Glycinat-Form hat überlegene Bioverfügbarkeit und minimale Nebenwirkungen.' },
    'slp-008': { title: 'Alkohol vollständig meiden', description: 'Selbst moderater Alkohol fragmentiert die Schlafarchitektur, unterdrückt REM-Schlaf und erhöht nächtliche Wachphasen. Verzichten Sie 2 Wochen, um die Basis-Schlafqualität zu messen.' },
    'slp-009': { title: 'Beine-an-die-Wand-Übung vor dem Schlafen', description: 'Yoga-Pose Viparita Karani: 10 Minuten mit senkrechten Beinen an der Wand liegen. Aktiviert den Vagustonus, fördert Lymphdrainage und schafft ein neurologisches Übergangs-Signal für den Schlaf.' },
    'slp-010': { title: 'Handy in einem anderen Zimmer', description: 'Die Nähe des Handys – selbst nach unten gelegt – erhöht kognitive Erregung und verlängert die Einschlafzeit. Legen Sie es in ein anderes Zimmer und nutzen Sie einen normalen Wecker.' },
    // NUTRITION
    'nut-001': { title: 'Protein bei jeder Mahlzeit', description: 'Streben Sie 30–40 g Protein pro Mahlzeit an, um die Muskeleiweiß-Synthese zu maximieren, den Blutzucker zu stabilisieren und die Sättigungsdauer zu verlängern.' },
    'nut-002': { title: 'Zeitbeschränktes Essen (16:8)', description: 'Komprimieren Sie Ihr Essfenster auf 8 Stunden, abgestimmt auf das natürliche Licht. Verbessert die Insulinsensitivität, reduziert Entzündungsmarker und steigert die Mitochondrien-Effizienz.' },
    'nut-003': { title: 'Anti-entzündlicher Gewürzmix', description: 'Kurkuma (1 g) + schwarzer Pfeffer (0,1 g) + Ingwer täglich. Piperin im schwarzen Pfeffer erhöht die Bioverfügbarkeit von Kurkumin um 2000%. Ingwer bietet zusätzliche entzündungshemmende Wirkung.' },
    'nut-004': { title: 'Bitterpflanzen vor den Mahlzeiten', description: 'Essen Sie 1–2 Blätter Rucola, Endivie oder Radicchio 10 Minuten vor der Hauptmahlzeit. Bittere Verbindungen aktivieren Verdauungsenzyme und verbessern den Gallefluss.' },
    'nut-005': { title: 'Weniger hochverarbeitete Lebensmittel', description: 'Ersetzen Sie täglich ein hochverarbeitetes Produkt durch sein Vollwert-Äquivalent. HPL stören das Mikrobiom, erhöhen Entzündungsmarker und beeinträchtigen Sättigungssignale.' },
    'nut-006': { title: 'Fermentierte Lebensmittel täglich', description: '1–2 Portionen fermentierter Lebensmittel täglich (Kefir, Kimchi, Sauerkraut, Miso) erhöhen die Mikrobiom-Vielfalt innerhalb von 4 Wochen – wirksamer als eine ballaststoffreiche Ernährung allein.' },
    'nut-007': { title: 'Wöchentlich die Regenbogenfarben essen', description: 'Verfolgen Sie die Farbvielfalt über 7 Tage: rot, orange, gelb, grün, blau/lila, weiß. Jede Farbe repräsentiert einzigartige Phytonährstoffklassen, die kein Supplement ersetzen kann.' },
    'nut-008': { title: 'Omega-3 zuerst aus der Nahrung', description: '2–3 Portionen fettreicher Fische pro Woche (Sardinen, Makrele, Wildlachs) liefern EPA/DHA für kognitive Funktion, Entzündungsauflösung und Herzschutz.' },
    'nut-009': { title: 'Saisonal und lokal essen', description: 'Richten Sie Ihre Ernährung an saisonaler Verfügbarkeit aus. Dies führt Sie natürlich durch ergänzende Nährstoffprofile im Jahresverlauf – ein Prinzip aller Weisheitstraditionen.' },
    'nut-010': { title: 'Achtsames Essen', description: 'Sitzen, kein Bildschirm, 3 langsame Atemzüge vor dem ersten Bissen. Jeden Bissen 20-mal kauen. Aktiviert die cephale Phase der Verdauung und verbessert Nährstoffaufnahme und Sättigung.' },
    // STRESS
    'str-001': { title: 'Physiologisches Seufzen', description: 'Doppelter Einatem durch die Nase (erst voll, dann kurz nachfüllen), dann langsames vollständiges Ausatmen durch den Mund. Senkt Stress sofort, indem kollabierte Lungenbläschen geöffnet und CO₂ abgebaut werden.' },
    'str-002': { title: 'Kälteexposition (Kalte Dusche)', description: '30–90 Sekunden kaltes Wasser morgens oder nach dem Training. Erhöht Noradrenalin um 200–300%, verbessert Stimmung, baut Stressresistenz auf und beschleunigt Muskelregeneration.' },
    'str-003': { title: 'Stress-Tagebuch', description: 'Schreiben Sie 5 Minuten über das Stressigste in Ihrem Kopf – ohne Struktur. Expressives Schreiben senkt Cortisol, reduziert Grübeln und verbessert das Arbeitsgedächtnis innerhalb von 2 Wochen.' },
    'str-004': { title: 'Naturspaziergang (20 Minuten)', description: '20 Minuten in jeder natürlichen Umgebung senken Cortisol, Blutdruck und Nervenaktivierung. "Grünes Rauschen" dämpft die Amygdala wirksamer als Stadtgeräusche.' },
    'str-005': { title: 'NSDR (Nicht-Schlaf-Tiefenruhe)', description: 'Ein 10–20-minütiges Yoga-Nidra- oder NSDR-Protokoll mitten am Tag. Stellt Dopamin-Reserven wieder her, senkt Cortisol und verbessert kognitive Leistung – als Ergänzung zum Schlaf, nicht als Ersatz.' },
    'str-006': { title: 'Zeitblockierung mit Puffer', description: 'Planen Sie den Tag, aber bauen Sie 20% Pufferzeit ein. Chronischer Zeitdruck ist ein starker Cortisol-Treiber. Puffer verwandelt reaktive Tage in bewusste.' },
    'str-007': { title: 'Ashwagandha (KSM-66)', description: '300–600 mg KSM-66 täglich über 8 Wochen reduzieren Cortisol um 27–30% in kontrollierten Studien. Wirkt als Adaptogen und moduliert die Reaktivität der HPA-Achse. Konsultieren Sie Ihren Arzt bei Medikamenteneinnahme.' },
    // MOVEMENT
    'mov-001': { title: 'Zone-2-Cardio (3× wöchentlich)', description: 'Drei 30–45-minütige Einheiten pro Woche in Zone 2 (sprechen möglich, aber anstrengend). Aufbau der mitochondrialen Basis, Verbesserung des Fettstoffwechsels und Senkung metabolischer Risikomarker.' },
    'mov-002': { title: '10-Minuten-Spaziergang nach dem Essen', description: 'Schon leichtes Gehen 30 Minuten nach dem Essen senkt postprandialen Blutzucker um 30–50% und reduziert die Insulinantwort. Das einfachste Werkzeug für metabolische Gesundheit.' },
    'mov-003': { title: 'Krafttraining (2× wöchentlich)', description: 'Zwei Krafttrainingssitzungen pro Woche erhalten Muskelmasse, verbessern Insulinsensitivität und steigern den Ruhestoffwechsel. Verbundübungen (Kniebeuge, Drücken, Ziehen) geben den höchsten Ertrag pro Stunde.' },
    'mov-004': { title: 'Tägliches Schrittziel (7.000+)', description: 'Gehen ist die am meisten erforschte Bewegungsform mit messbaren Gesundheitsvorteilen ab 7.000 Schritten täglich. Schrittüberwachung verbessert die Zielerreichung signifikant.' },
    'mov-005': { title: 'Mobilitätstraining (10 min morgens)', description: '10 Minuten Gelenkkreise, Hüftöffner und Wirbeldrehen beim Aufwachen. Fördert die Synovialflüssigkeitsverteilung, reduziert Verletzungsrisiko und verbessert die Stimmung für Stunden.' },
    // MINDFULNESS
    'mnd-001': { title: 'Fokussierte Aufmerksamkeitsmeditation', description: '10–20 Minuten täglich mit Fokus auf dem Atem. Bei Ablenkung – sanft zurückkehren. Diese wiederholte Handlung stärkt den anterioren cingulären Kortex und verbessert die Aufmerksamkeitssteuerung.' },
    'mnd-002': { title: 'Offene Beobachtungspraxis', description: '10–15 Minuten ohne Aufmerksamkeitsanker – lassen Sie Gedanken und Empfindungen vorbeiziehen, ohne sich daran festzuhalten. Reduziert DMN-Aktivität und Angst.' },
    'mnd-003': { title: 'Liebende-Güte-Praxis (Metta)', description: '5 Minuten, in denen Sie warme Wünsche an sich selbst, Geliebte und Fremde senden. Studien zeigen Zunahme positiver Emotionen und Vagustonus bereits nach 7 Tagen Praxis.' },
    'mnd-004': { title: 'Digitaler Sabbat (wöchentlich)', description: 'Ein Tag pro Woche ohne soziale Medien, Nachrichten und unnötige Benachrichtigungen. Systematische digitale Auszeit reduziert Angst, stellt Konzentration wieder her und verbessert den Schlaf.' },
    'mnd-005': { title: 'Dankbarkeits-Mikropraxis', description: 'Drei spezifische Dinge, für die Sie dankbar sind, handschriftlich (nicht getippt) jeden Morgen. Spezifität ist wichtiger als Länge: "Das Licht durch mein Fenster um 7 Uhr" schlägt "meine Familie".' },
    // RECOVERY
    'rec-001': { title: 'Saunaprotokoll (3× wöchentlich)', description: '15–20 Minuten bei 80–90°C dreimal wöchentlich. Reduziert kardiovaskuläres Risiko, erhöht Wachstumshormon, verbessert Mitochondrienfunktion und beschleunigt Muskelregeneration.' },
    'rec-002': { title: 'Aktiver Erholungstag', description: 'Ein Tag pro Woche: leichtes Gehen, Stretching, Schwimmen oder Yoga bei 40–60% maximaler Herzfrequenz. Beschleunigt Laktatabbau, reduziert Muskelkater und senkt systemische Entzündung.' },
    'rec-003': { title: 'Epsom-Salz-Bad (2× wöchentlich)', description: '2 Tassen Epsom-Salz (Magnesiumsulfat) in einem warmen Bad für 20 Minuten. Transdermale Magnesiumaufnahme + Wärme + Parasympathikus-Aktivierung = optimale Muskelregeneration.' },
    'rec-004': { title: 'HRV-Morgencheck', description: 'Messen Sie die Herzfrequenzvariabilität jeden Morgen im Liegen. Niedriges HRV signalisiert Überlastung – reduzieren Sie die Belastung. Hohes HRV zeigt, dass der Körper für intensive Arbeit bereit ist.' },
    'rec-005': { title: 'Nicht-Schlaf-Ruhe (Horizontale Ruhe)', description: '15 Minuten völliger Stille im Liegen nach der anspruchsvollsten Phase des Tages. Auch ohne Schlaf reduziert horizontale Ruhe die Sympathikus-Aktivierung und unterstützt die Gewebereparatur.' },
    // HYDRATION
    'hyd-001': { title: 'Morgendliches Hydrationsritual', description: '500 ml Wasser innerhalb von 30 Minuten nach dem Aufwachen. Fügen Sie eine Prise Meersalz und etwas Zitronensaft hinzu. Stellt das osmotische Gleichgewicht wieder her und aktiviert die Darmmotilität.' },
    'hyd-002': { title: 'Elektrolyt-Optimierung', description: 'Natrium, Kalium und Magnesium unterstützen zelluläre Hydration, Muskelfunktion und Nervenleitung. Schweiß enthält ~1 g Natrium pro Liter – bei intensiver Belastung durch Ernährung oder Ergänzung ausgleichen.' },
    'hyd-003': { title: 'Kräutertee für Ihre Ziele', description: 'Ersetzen Sie Nachmittagskaffee durch funktionellen Kräutertee: Kamille/Passionsblume für Schlaf, Tulsi/Ashwagandha für Stress, Ingwer/Fenchel für Verdauung, Pfefferminze für Energie.' },
    // PURPOSE
    'pup-001': { title: 'Ikigai-Mapping (vierteljährlich)', description: 'Erkunden Sie vierteljährlich die vier Ikigai-Kreise: was Sie lieben, was Sie gut können, was die Welt braucht und wofür man zahlen würde. Überschneidungsbereiche sind Ihre Sinnzonen.' },
    'pup-002': { title: 'Drei-Werte-Klärung', description: 'Nennen Sie drei Werte, die Sie definieren – keine Ziele oder Rollen. Bewerten Sie dann, inwieweit Ihre Handlungen der letzten Woche jeden davon widerspiegelten. Diskrepanzen sind Quellen chronischen Stresses.' },
    'pup-003': { title: 'Dienstleistungsakt (wöchentlich)', description: 'Ein bewusster Dienst- oder Beitragsakt pro Woche – ehrenamtlich tätig sein, jemanden betreuen, eine aufrichtige Nachricht an jemanden schreiben, der sie braucht. Prosoziales Verhalten ist einer der zuverlässigsten Treiber von Lebenszufriedenheit.' },
    // RELATIONSHIPS
    'rel-001': { title: 'Gespräch mit voller Präsenz (täglich)', description: 'Ein Gespräch pro Tag ohne Handy, Ablenkungen oder mentale Antwort-Vorbereitung. Einfach zuhören. Qualität der Präsenz schlägt Dauer: 10 Minuten echte Aufmerksamkeit verändern Beziehungen.' },
    'rel-002': { title: 'Beziehungsinvestitions-Audit', description: 'Kartieren Sie Ihre Beziehungen in Ebenen. Identifizieren Sie, wer Sie energetisiert und wer Sie erschöpft. Tätigen Sie diese Woche eine bewusste Investition in eine Tier-1-Beziehung: gemeinsames Essen, Brief, Anruf.' },
    // ENVIRONMENT
    'env-001': { title: 'Einen Bereich entrümpeln', description: 'Wählen Sie eine unordentliche Oberfläche oder Schublade und räumen Sie sie vollständig auf. Unordnung aktiviert ständig die Bedrohungsreaktion im Gehirn. Ein aufgeräumter Bereich reduziert Hintergrundangst.' },
    'env-002': { title: 'Zimmerpflanzen (Luft und Stimmung)', description: 'Zwei oder mehr Pflanzen im Wohnraum verbessern Luftqualität und psychisches Wohlbefinden. Polyscias, Pothos und Chlorophytum sind besonders wirksam zur Luftfilterung.' },
    'env-003': { title: 'Duftverankerung', description: 'Verknüpfen Sie einen bestimmten Duft mit einem gewünschten Zustand. Lavendel für Schlaf, Rosmarin für Fokus, Zitrus für Energie. Verwenden Sie ihn ausschließlich in diesem Kontext. Das Geruchssystem hat den direktesten Weg zum limbischen System.' },
  },
}

/**
 * Get localized title/description for a recommendation.
 * Falls back to the original English values if no translation found.
 */
export function getRecTranslation(
  recId: string,
  locale: string,
  fallback: { title: string; description: string }
): { title: string; description: string } {
  if (locale === 'en' || !recId) return fallback
  const map = REC_I18N[locale as RecLocale]
  if (!map) return fallback
  return map[recId] ?? fallback
}
