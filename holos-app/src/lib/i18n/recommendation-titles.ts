/**
 * Localized recommendation titles keyed by rec_id.
 * English titles are stored in the DB; use this map for RU / HE / DE.
 * Fallback: rec.title (English) if rec_id not found.
 */
export const REC_TITLES: Record<string, { ru: string; he: string; de: string }> = {
  // ── Sleep ────────────────────────────────────────────────────────────────
  'slp-001': { ru: 'Температура в спальне 18°C',                   he: 'טמפרטורת שינה 18°C',                    de: '18°C Schlafumgebung' },
  'slp-002': { ru: 'Стабильное время пробуждения',                 he: 'זמן השכמה עקבי',                        de: 'Konstante Aufwachzeit' },
  'slp-003': { ru: '90-минутный ритуал перед сном',                he: 'פרוטוקול הרגעה של 90 דקות',             de: '90-Minuten-Entspannungsprotokoll' },
  'slp-004': { ru: 'Утренний солнечный якорь',                     he: 'עוגן אור בוקר',                         de: 'Morgendliches Sonnenlicht' },
  'slp-005': { ru: 'Без кофеина после 13:00',                      he: 'ללא קפאין אחרי 13:00',                  de: 'Kein Koffein nach 13 Uhr' },
  'slp-006': { ru: 'Дыхание 4-7-8 перед сном',                    he: 'נשימה 4-7-8 לפני השינה',                de: '4-7-8-Atemübung vor dem Schlafen' },
  'slp-007': { ru: 'Магний глицинат перед сном',                   he: 'מגנזיום גליצינט לפני השינה',            de: 'Magnesiumglycinat vor dem Schlafen' },
  'slp-008': { ru: 'Полный отказ от алкоголя',                     he: 'הגבלת אלכוהול לחלוטין',                de: 'Alkohol vollständig einschränken' },
  'slp-009': { ru: 'Ноги на стену перед сном',                     he: 'רגליים על הקיר לפני השינה',             de: 'Beine-an-der-Wand vor dem Schlafen' },
  'slp-010': { ru: 'Телефон в другой комнате',                     he: 'טלפון בחדר אחר',                        de: 'Handy in einem anderen Zimmer' },

  // ── Movement ─────────────────────────────────────────────────────────────
  'mov-001': { ru: 'Кардио зона 2 (3 раза в неделю)',              he: 'קרדיו אזור 2 (3× בשבוע)',              de: 'Zone-2-Cardio (3× wöchentlich)' },
  'mov-002': { ru: 'Прогулка 10 минут после еды',                  he: 'הליכה 10 דקות אחרי ארוחה',             de: '10-Minuten-Spaziergang nach dem Essen' },
  'mov-003': { ru: 'Силовые тренировки (2 раза в неделю)',         he: 'אימוני כוח (2× בשבוע)',                de: 'Krafttraining (2× wöchentlich)' },
  'mov-004': { ru: 'Дневная цель шагов (7 000+)',                  he: 'יעד צעדים יומי (7,000+)',               de: 'Tägliches Schrittziel (7.000+)' },
  'mov-005': { ru: 'Упражнения на подвижность (10 мин утром)',     he: 'אימון גמישות (10 דקות בבוקר)',          de: 'Mobilitätstraining (10 Min. morgens)' },

  // ── Nutrition ─────────────────────────────────────────────────────────────
  'nut-001': { ru: 'Белок в каждом приёме пищи',                   he: 'חלבון בכל ארוחה',                      de: 'Protein bei jeder Mahlzeit' },
  'nut-002': { ru: 'Интервальное питание (16:8)',                   he: 'אכילה מוגבלת בזמן (16:8)',             de: 'Zeitlich begrenztes Essen (16:8)' },
  'nut-003': { ru: 'Противовоспалительные специи',                  he: 'תבלינים אנטי-דלקתיים',                de: 'Entzündungshemmende Gewürze' },
  'nut-004': { ru: 'Горькая зелень перед едой',                    he: 'ירקות מרים לפני הארוחה',               de: 'Bitteres Grün vor den Mahlzeiten' },
  'nut-005': { ru: 'Сократить ультраобработанные продукты',         he: 'הפחתת מזון מעובד במידה רבה',           de: 'Stark verarbeitete Lebensmittel reduzieren' },
  'nut-006': { ru: 'Ферментированные продукты ежедневно',           he: 'מזונות מותססים יומיים',                de: 'Fermentierte Lebensmittel täglich' },
  'nut-007': { ru: 'Радуга продуктов каждую неделю',               he: 'לאכול את הקשת שבוע',                   de: 'Wöchentlich alle Farben essen' },
  'nut-008': { ru: 'Омега-3 прежде всего из еды',                  he: 'אומגה-3 ממזון תחילה',                  de: 'Omega-3 zuerst aus der Nahrung' },
  'nut-009': { ru: 'Сезонное и местное питание',                   he: 'אכילה עונתית ומקומית',                 de: 'Saisonal & lokal essen' },
  'nut-010': { ru: 'Осознанный ритуал приёма пищи',                he: 'טקס אכילה מודעת',                      de: 'Achtsames Essritual' },

  // ── Stress ────────────────────────────────────────────────────────────────
  'str-001': { ru: 'Физиологический вздох',                        he: 'אנחה פיזיולוגית',                      de: 'Physiologisches Seufzen' },
  'str-002': { ru: 'Холодовое воздействие (холодный душ)',         he: 'חשיפה לקור (מקלחת קרה)',               de: 'Kälteexposition (Kalte Dusche)' },
  'str-003': { ru: 'Дневник стресса',                              he: 'כתיבה על לחץ תחילה',                   de: 'Stress-Journaling' },
  'str-004': { ru: 'Прогулка на природе (20 минут)',               he: 'הליכה בטבע (20 דקות)',                 de: 'Naturspaziergang (20 Minuten)' },
  'str-005': { ru: 'NSDR (глубокий отдых без сна)',                he: 'NSDR (מנוחה עמוקה ללא שינה)',          de: 'NSDR (Nicht-Schlaf-Tiefenruhe)' },
  'str-006': { ru: 'Тайм-блокинг с запасом времени',              he: 'חסימת זמן עם מרווח',                   de: 'Zeitblockierung mit Puffer' },
  'str-007': { ru: 'Ашваганда (KSM-66)',                           he: 'אשוואגנדה (KSM-66)',                   de: 'Ashwagandha (KSM-66)' },

  // ── Recovery ──────────────────────────────────────────────────────────────
  'rec-001': { ru: 'Протокол сауны (3 раза в неделю)',             he: 'פרוטוקול סאונה (3× בשבוע)',            de: 'Sauna-Protokoll (3× wöchentlich)' },
  'rec-002': { ru: 'Протокол активного восстановления',            he: 'פרוטוקול ימי התאוששות פעילה',          de: 'Aktives Erholungstag-Protokoll' },
  'rec-003': { ru: 'Ванна с солью Эпсома (2 раза в неделю)',      he: 'אמבטיית מלח אפסום (2× בשבוע)',         de: 'Epsom-Salz-Bad (2× wöchentlich)' },
  'rec-004': { ru: 'Утренняя проверка ВСР',                        he: 'בדיקת HRV בבוקר',                     de: 'HRV-Morgen-Check-in' },
  'rec-005': { ru: 'Горизонтальный отдых (без сна)',               he: 'מנוחה ללא שינה (מנוחה אופקית)',        de: 'Horizontale Ruhe (ohne Schlaf)' },

  // ── Mindfulness ───────────────────────────────────────────────────────────
  'mnd-001': { ru: 'Медитация сфокусированного внимания',          he: 'מדיטציית קשב ממוקד',                   de: 'Fokussierte Aufmerksamkeitsmeditation' },
  'mnd-002': { ru: 'Практика открытого наблюдения',                he: 'תרגול מעקב פתוח',                      de: 'Offene Beobachtungspraxis' },
  'mnd-003': { ru: 'Практика любящей доброты (Метта)',             he: 'תרגול חמלה (מטא)',                     de: 'Liebende-Güte-Praxis (Metta)' },
  'mnd-004': { ru: 'Цифровая суббота (раз в неделю)',              he: 'שבת דיגיטלית (שבועית)',                de: 'Digitaler Sabbat (wöchentlich)' },
  'mnd-005': { ru: 'Микропрактика благодарности',                  he: 'מיקרו-תרגול הכרת תודה',                de: 'Dankbarkeits-Mikropraxis' },

  // ── Environment ───────────────────────────────────────────────────────────
  'env-001': { ru: 'Разобрать одно пространство',                  he: 'פינוי מקום אחד',                       de: 'Einen Bereich aufräumen' },
  'env-002': { ru: 'Комнатные растения (воздух и настроение)',     he: 'צמחים בבית (אוויר ומצב רוח)',          de: 'Zimmerpflanzen (Luft & Stimmung)' },
  'env-003': { ru: 'Ароматический якорь',                          he: 'עיגון ריחות',                          de: 'Duft-Verankerung' },

  // ── Hydration ─────────────────────────────────────────────────────────────
  'hyd-001': { ru: 'Утренний ритуал гидратации',                   he: 'טקס הידרציה בבוקר',                    de: 'Morgendliches Hydratationsritual' },
  'hyd-002': { ru: 'Оптимизация электролитов',                     he: 'אופטימיזציית אלקטרוליטים',             de: 'Elektrolyt-Optimierung' },
  'hyd-003': { ru: 'Травяной чай для целевых результатов',         he: 'תה צמחים לתוצאות יעד',                 de: 'Kräutertee für Zielwirkungen' },

  // ── Purpose ───────────────────────────────────────────────────────────────
  'pup-001': { ru: 'Картирование икигай (раз в квартал)',          he: 'מיפוי איקיגאי (רבעוני)',                de: 'Ikigai-Mapping (quartalsweise)' },
  'pup-002': { ru: 'Прояснение трёх ценностей',                   he: 'הבהרת שלוש ערכים',                     de: 'Drei-Werte-Klärung' },
  'pup-003': { ru: 'Акт служения (раз в неделю)',                  he: 'מעשה שירות (שבועי)',                    de: 'Dienstleistungsakt (wöchentlich)' },

  // ── Relationships ─────────────────────────────────────────────────────────
  'rel-001': { ru: 'Разговор с полным присутствием (ежедневно)',   he: 'שיחה עם נוכחות מלאה (יומית)',          de: 'Vollpräsenz-Gespräch (täglich)' },
  'rel-002': { ru: 'Аудит вложений в отношения',                   he: 'ביקורת השקעה ביחסים',                  de: 'Beziehungsinvestitions-Audit' },
}

/**
 * Get the localized title for a recommendation.
 * Falls back to the English title from the DB if no translation found.
 */
export function getRecTitle(
  recId: string | null | undefined,
  englishTitle: string,
  locale: string
): string {
  if (!recId || locale === 'en') return englishTitle
  const t = REC_TITLES[recId]
  if (!t) return englishTitle
  return (t as Record<string, string>)[locale] ?? englishTitle
}
