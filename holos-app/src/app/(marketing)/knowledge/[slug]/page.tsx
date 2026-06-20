import type { Metadata } from 'next'
import Link from 'next/link'
import { getServerStrings } from '@/lib/i18n/server'
import { SLUG_META } from '@/lib/i18n/knowledge-articles'
import type { Locale } from '@/lib/i18n/knowledge-articles'

// Article body text remains in English (long-form professional translation pending).
// Title, category, intro, date, and readTime are fully localised via SLUG_META.
const ARTICLES: Record<string, {
  author: string; body: string[]
}> = {
  // ── Listing article bodies ───────────────────────────────────────────────────
  'what-is-integrative-wellness': {
    author: 'Moshe Ostrovsky',
    body: [
      'Integrative wellness is not an alternative to conventional medicine — it is its natural extension. For most of human history, medicine meant understanding the whole person: their constitution, their habits, their environment, their inner life. The modern reduction of health to a set of biomarkers is historically anomalous, and the evidence is mounting that it is insufficient.',
      'Every major civilisation developed a complete medical philosophy because the practitioners who spent their lives observing human health noticed the same thing: people are not collections of independent organs. The body, mind, and environment form a dynamic system, and treating any part in isolation from the others produces fragmented results.',
      'HOLOS synthesises eight such philosophies — Ayurveda, Daoist medicine, Hippocratic medicine, the Rambam\'s regimen, Avicenna\'s Canon, Tibetan medicine, modern evidence-based science, and the HOLOS integrative framework — not because they agree on mechanism, but because they agree on observation: the human organism responds to food, movement, sleep, emotion, meaning, and relationship in ways that are measurable, predictable, and actionable.',
      'The HOLOS platform does not ask you to believe in any tradition. It assesses you across nine dimensions, then uses the framework most compatible with your constitutional profile to prioritise your interventions. A 2023 meta-analysis in the Annals of Internal Medicine found that multi-modal wellness approaches outperformed single-modality treatments by 34% on primary outcomes — not because any individual component was stronger, but because their interactions compounded.',
      'This knowledge base explores each tradition in depth: its origins, its diagnostic framework, and what modern research has confirmed about its prescriptions. The goal is practical synthesis — understanding where ancient and modern maps agree, and using that agreement to act.',
    ]
  },
  'nine-dimensions': {
    author: 'Moshe Ostrovsky',
    body: [
      'Most wellness platforms measure one or two dimensions — usually sleep hours and step count. The HOLOS assessment scores nine: Nutrition, Sleep, Recovery, Stress, Movement, Emotional Health, Life Balance, Purpose, and Energy. This is not comprehensiveness for its own sake — it is because these dimensions interact, and those interactions are where the real diagnostic signal lives.',
      'Consider a common pattern: someone sleeps seven hours but wakes unrefreshed. A single-dimension view blames sleep quality and prescribes better sleep hygiene. The HOLOS model asks further: what is the Stress score? Elevated cortisol suppresses slow-wave sleep without reducing total sleep time. Is the Purpose score low? Research shows that people without a clear sense of meaning experience higher nighttime rumination and earlier waking. Is Nutrition poor? Gut dysbiosis is now linked to sleep architecture disruption via the gut-brain axis.',
      'The same interdependence runs in reverse. High Purpose scores correlate with better sleep adherence, better nutritional choices, higher exercise consistency, and faster recovery from illness — not because purpose causes these directly, but because it organises behaviour across all dimensions. This is why HOLOS weights its recommendations by cross-dimensional impact rather than single-dimension deficit.',
      'The nine dimensions were not chosen arbitrarily. They map onto what every major wisdom tradition identified as the variables that determine health, cross-referenced with the domains that appear most robustly in longevity research: dietary quality, sleep architecture, stress physiology, movement dose, emotional regulation, social connection, and purpose orientation. Every dimension has a corresponding assessment module, and the scores feed a six-layer scoring engine that produces a ranked set of recommendations.',
      'Scoring all nine dimensions allows HOLOS to detect the patterns that single-metric trackers miss: the person whose sleep hours are adequate but whose Stress and Purpose scores indicate a hidden allostatic burden; the person whose Nutrition and Movement scores are excellent but whose Recovery and Emotional Health scores suggest they are overdrawing their reserves. These composite patterns predict future health trajectories more accurately than any individual metric.',
    ]
  },
  'doshas-explained': {
    author: 'Moshe Ostrovsky',
    body: [
      'The doshas — Vata, Pitta, and Kapha — are the foundational organising principle of Ayurvedic medicine. They are not blood types, personality categories, or dietary labels. They are dynamic ratios of elemental qualities within the human organism, and understanding them requires setting aside the Western instinct to classify and instead learning to observe patterns over time.',
      'Vata is the principle of movement and space — air and ether in motion. When balanced, it governs creativity, flexibility, quick thinking, and enthusiasm. When aggravated, it produces anxiety, insomnia, dry skin, constipation, irregular appetite, and a scattered, overwhelmed mental state. Vata is increased by cold, dry, light, and irregular qualities — winter, travel, variable schedules, excessive screen time, and stimulants.',
      'Pitta is the principle of transformation — fire and water. Balanced Pitta drives sharp intelligence, ambition, leadership, and metabolic efficiency. Aggravated Pitta produces inflammation, skin eruptions, acid reflux, irritability, perfectionism, and burnout. Pitta is aggravated by heat, intensity, and competitiveness — overwork, alcohol, spicy food, direct sun, and high-stakes environments.',
      'Kapha is the principle of structure and cohesion — earth and water. Balanced Kapha provides stability, endurance, compassion, and deep immunity. Aggravated Kapha manifests as lethargy, weight gain, congestion, low mood, and difficulty initiating. Kapha is increased by cold, heavy, and sedentary conditions — oversleeping, sweet and oily foods, and comfort-seeking behaviours.',
      'Every person has a constitutional ratio of the three doshas — their prakriti, established at conception — and a current ratio called vikriti, shaped by lifestyle, season, and life events. Ayurvedic assessment identifies the gap between prakriti and vikriti and prescribes interventions to restore constitutional balance: specific dietary guidelines, herbal formulations, movement types, sleep schedules, and daily routines. The HOLOS Ayurveda module uses your nine-dimension assessment to identify your probable dosha profile and generate tailored recommendations.',
    ]
  },
  'rambam-preventive': {
    author: 'Moshe Ostrovsky',
    body: [
      'Rabbi Moses ben Maimon (1138–1204) — the Rambam to Jewish tradition, Maimonides to the West — was court physician to the Sultan of Egypt, a philosopher who synthesised Aristotle with Torah, and the author of medical texts that anticipated modern preventive medicine with a precision that still surprises clinicians who encounter them.',
      'His Regimen of Health, written for the Sultan\'s ailing son, identifies six determinants of health he called the "non-naturals": air and environment; food and drink; sleep and wakefulness; movement and rest; evacuation of waste; and the emotional states of the soul. This is not mysticism — it is an empirical framework built from decades of clinical observation across thousands of patients.',
      'On diet, the Rambam was precise: eat to 75% fullness — "a person should always be slightly hungry." Begin a meal with light, easily digestible foods; end with denser ones. Prioritise seasonal produce. These prescriptions map onto contemporary research on caloric restriction, digestive sequencing, and the reduction of chronic disease risk through dietary pattern rather than individual nutrients.',
      'On movement: "A person should exercise every morning until the body becomes warm." He specified that insufficient movement is the cause of most chronic illness — "the body becomes heavy and clumsy and its powers weaken." The modern dose-response curve for physical activity and all-cause mortality confirms this in quantitative detail.',
      'On emotional health, the Rambam was emphatic: "A physician who does not treat the soul cannot treat the body." He identified grief, rage, and chronic anxiety as physiologically damaging — a claim now supported by decades of psychoneuroimmunology research linking emotional states to cortisol, cytokine profiles, and immune function. His prescriptions for emotional wellbeing — meaningful work, moderate friendship, intellectual engagement, and the cultivation of equanimity — remain among the best-supported interventions in the evidence base.',
    ]
  },
  'qi-cultivation': {
    author: 'Moshe Ostrovsky',
    body: [
      'The sceptic\'s objection to Daoist medicine usually runs: "Qi doesn\'t exist. You can\'t measure it. Therefore the system is prescientific." This objection is worth taking seriously — and then examining carefully, because it misidentifies what Daoist medicine actually claims.',
      'Qi is not a substance detectable under a microscope. It is a functional concept — the self-regulatory activity of living systems. When a Daoist physician says your Qi is stagnant, they describe a functional state: circulation is sluggish, digestion is slow, lymphatic drainage is congested, nervous system tone is depressed. These are measurable phenomena. The language differs from biomedical language; the observation does not.',
      'The evidence base for Daoist-derived practices is now substantial. A 2017 meta-analysis of 35 randomised controlled trials found Qigong significantly reduced anxiety, depression, and inflammatory biomarkers — effects comparable to aerobic exercise at lower intensity. Multiple systematic reviews confirm Tai Chi\'s superiority over conventional balance training for fall prevention in older adults. Acupuncture shows consistent efficacy for chronic pain, migraine prophylaxis, and chemotherapy-induced nausea across Cochrane-level reviews.',
      'The Five Elements framework — Wood, Fire, Earth, Metal, Water — maps organ systems, emotional states, seasons, and dietary tendencies onto a cyclical model of mutual generation and control. Liver (Wood) feeds Heart (Fire); Heart feeds Spleen (Earth); Spleen feeds Lung (Metal); Lung feeds Kidney (Water); Kidney feeds Liver. Disruption in any element propagates through the cycle. This is a systems map of physiological interdependence — mechanistically different from biomedical accounts, but structurally identical to the insight systems biology is re-deriving from first principles.',
      'For the HOLOS practitioner, Qi cultivation means attending to the flow of vital energy through consistent daily practice: morning Qigong, seasonal dietary adjustment, emotional regulation, and the cultivation of Shen — spirit and purposeful awareness. These practices maintain the conditions under which the organism heals itself. The goal is not an exotic state but a baseline of integrated self-regulation.',
    ]
  },
  'sleep-traditions': {
    author: 'Moshe Ostrovsky',
    body: [
      'Every major medical tradition developed a sophisticated theory of sleep, and when you compare them across cultures and centuries, the convergences are more remarkable than the differences. Without sleep trackers, EEG, or chronobiology, physicians across four continents arrived at near-identical conclusions about when to sleep, for how long, and under what conditions.',
      'Ayurveda prescribes sleeping during the Kapha time of night — approximately 10pm to 2am — when the earth-water element supports the deepest anabolic restoration. Rising before 6am during the Vata period aligns the waking state with mental clarity and lightness. Chronobiological research confirms that circadian alignment — sleeping when melatonin peaks, rising with early morning light — improves slow-wave sleep duration by 20–30% independent of total sleep hours.',
      'The Rambam was explicit: "Among the things that harm the body and shorten life: staying awake at night and shortening sleep." He prescribed sleeping on the right side first, then turning to the left — a recommendation modern gastrointestinal research partially confirms. Right-side sleeping reduces acid reflux; left-side sleeping enhances lymphatic drainage of the thoracic duct and may improve cardiac output.',
      'Tibetan medicine describes sleep as the time when Lung — the wind-humour governing mental activity — settles, and the subtle channels of the body undergo repair. This maps onto the glymphatic hypothesis confirmed in 2013 by Maiken Nedergaard: during deep sleep, cerebrospinal fluid flushes metabolic waste — including amyloid-beta — from the brain at 60% greater volume than during waking. Poor sleep quality is now the single most consistently modifiable risk factor for Alzheimer\'s disease.',
      'The cross-tradition consensus: sleep at consistent times aligned with natural light cycles; keep the sleep environment cool, dark, and quiet; avoid stimulation in the final hour before sleep; and treat sleep as active biological restoration rather than passive unconsciousness. The HOLOS Sleep dimension scores circadian alignment, sleep debt accumulation, subjective quality, and daytime functional consequences — providing a complete picture rather than a single metric.',
    ]
  },
  'stress-dimension': {
    author: 'Moshe Ostrovsky',
    body: [
      'Allostatic load is the cumulative physiological cost of chronic adaptation — what happens to the body when the stress response, designed for acute threats, is activated continuously over months and years. The term was introduced by Bruce McEwen in 1993, but the observation it names is ancient: every wisdom tradition identified sustained emotional disturbance as a primary driver of chronic disease.',
      'The primary mediators are cortisol, adrenaline, and pro-inflammatory cytokines. Brief cortisol surges sharpen cognition, mobilise energy, and suppress pain. Chronic cortisol elevation does the opposite: it suppresses hippocampal neurogenesis, impairing memory and learning; dysregulates glucose metabolism, driving insulin resistance; disrupts circadian rhythm, degrading sleep architecture; and accelerates cellular ageing via telomere shortening. This is why chronic psychological stress predicts cardiovascular disease, autoimmune disorders, metabolic syndrome, and depression — not as a risk factor alongside others but as an upstream driver of all of them.',
      'Most stress interventions fail because they address the subjective feeling of stress rather than the biological debt that accumulates beneath it. Breathing exercises and mindfulness reduce acute arousal. They do not clear the allostatic burden built up over months of chronic activation. Only a sustained reduction in allostatic inputs — improved sleep, reduced inflammation, manageable workload, relational safety, restored sense of meaning — combined with systematic recovery practices can do that.',
      'Ayurveda identifies stress-driven illness as Vata aggravation and prescribes grounding: warm, oily foods; slow rhythmic movement; regular daily routine; and adaptogenic herbs including ashwagandha, which a recent RCT found reduces serum cortisol by 27.9% after 60 days. Daoist Qigong and Tai Chi restore smooth Qi flow and settle the Shen. The Rambam prescribed rest, friendship, meaningful work, and moderation as the structural conditions for psychological health. Tibetan practice works directly with the avoidance and elaboration patterns that amplify stress into suffering.',
      'The HOLOS Stress dimension does not merely ask how stressed you feel. It assesses sleep quality, recovery speed, emotional regulation capacity, presence of meaning and social support, and — where self-reported data permits — estimates of inflammatory burden. Recommendations are drawn from whichever tradition\'s toolkit addresses the root drivers most directly, ranked by likely impact given your overall nine-dimension profile.',
    ]
  },
  'avicenna-canon': {
    author: 'Moshe Ostrovsky',
    body: [
      'Ibn Sina (980–1037) — known in the West as Avicenna — was the most influential physician in the history of medicine. His Canon of Medicine (Al-Qanun fi al-Tibb) was the standard medical textbook in European universities from the 12th to the 17th century, a tenure no other medical text has approached. It synthesised Greek, Persian, and Islamic medicine into a framework that outlasted every component tradition.',
      'The Canon identifies six categories of factors that determine health — the "six necessary things": air and environment; food and drink; bodily movement and rest; psychic movement and rest (emotional states); sleep and wakefulness; and retention and evacuation. These are not six separate prescriptions. They are six dimensions of a single integrated system, and disruption in any one propagates through the others — a systems-level insight that biomedicine is only now formalising.',
      'On air quality, Avicenna\'s observations were prescient: he described how stagnant air and confined spaces caused disease, recommended ventilation for hospitals, and designed quarantine procedures for infectious illness — a millennium before germ theory provided the mechanism. Modern environmental epidemiology consistently identifies air quality as among the strongest environmental determinants of chronic disease burden.',
      'On food, the Canon distinguishes foods by their effect on the body\'s temperament — their heating, cooling, moistening, or drying properties — and prescribes dietary adjustments to restore constitutional balance. The structural insight — that dietary prescription should be individualised to constitution and current health state, not universalised — is exactly what precision nutrition research is now rediscovering through nutritional genomics and microbiome science.',
      'On emotional states, Avicenna was direct: "Joy expands the vital spirit; grief constricts it; anger heats the blood; fear chills it." The Canon\'s prescriptions for psychological wellbeing — meaningful work, beautiful environments, close friendship, moderation of passion, and intellectual engagement — anticipate modern evidence-based interventions for chronic disease by nearly a thousand years. HOLOS uses the Avicenna framework as one of its eight lenses for interpreting assessment data and prioritising the interventions most likely to restore equilibrium.',
    ]
  },
  'tibetan-three-humours': {
    author: 'Moshe Ostrovsky',
    body: [
      'Tibetan medicine (Sowa Rigpa, "the knowledge of healing") is one of the world\'s oldest complete medical systems, developed over two millennia at the intersection of Indian Ayurveda, Chinese medicine, and the indigenous Bön healing tradition. Its foundational model identifies three humours — Lung, Tripa, and Beken — as the primary forces that determine health, and disease as the disruption of their dynamic balance.',
      'Lung (pronounced "loong") is the wind principle: it governs all movement, both physical — breath, nerve impulse, circulation — and mental — thought, intention, and emotion. Balanced Lung produces vitality, clarity, enthusiasm, and creative intelligence. Disturbed Lung manifests as anxiety, insomnia, trembling, dry skin, tinnitus, and a scattered, overwhelmed mental state — mapping closely onto what Western psychiatry describes as anxiety spectrum disorders and what Ayurveda calls Vata aggravation.',
      'Tripa — bile — is the fire principle: transformation, digestion of food and experience, sharp perception, and the capacity for discrimination and decision. Balanced Tripa produces intelligence, courage, and metabolic efficiency. Disturbed Tripa produces inflammation, skin disease, fever, irritability, perfectionism, and the chronic dissatisfaction of insatiability. This correlates with Ayurvedic Pitta imbalance and, in biomedical terms, with the chronic low-grade inflammatory state now recognised as a primary driver of cardiovascular disease, diabetes, and depression.',
      'Beken — phlegm — is the water-earth principle: structure, moisture, cohesion, and stability. Balanced Beken provides endurance, compassion, patience, and deep immunity. Disturbed Beken manifests as obesity, lethargy, excessive sleep, congestion, and a low-arousal depressive state. This corresponds to Ayurvedic Kapha imbalance and, in modern terms, to the metabolic syndrome cluster and the hypotonic presentations of depression.',
      'What distinguishes Tibetan medicine is the sophistication of its psychophysical integration. The three nyépa are not purely physical or purely psychological categories — they are psychophysical principles. Lung disorder is simultaneously a nervous system disturbance and an existential one: the unsettled mind and the agitated body are understood as one phenomenon with one treatment arc. The protocol accordingly addresses both levels: dietary modifications, specific herbal formulations, external therapies, and contemplative practices — particularly those that work with the quality of mental movement itself. This dual-track integration of somatic and psychological intervention is precisely where evidence-based medicine is now moving.',
    ]
  },
  // ── Deep article bodies ──────────────────────────────────────────────────────
  'integrative-wellness-science': {
    author: 'Moshe Ostrovsky',
    body: [
      'Integrative wellness is not an alternative to evidence-based medicine — it is its logical extension. Systems biology, psychoneuroimmunology, and chronobiology all point toward the same conclusion: the body operates as a unified intelligence, and treating it in isolation produces fragmented results.',
      'A landmark 2023 meta-analysis in the Annals of Internal Medicine reviewed 187 studies on mind-body interventions and found that multi-modal approaches outperformed single-modality treatments by 34% on primary outcomes — not because any individual component was stronger, but because their interactions compounded.',
      'The HOLOS assessment captures this complexity by mapping nine interdependent dimensions: Nutrition, Sleep, Recovery, Stress, Movement, Emotional Health, Life Balance, Purpose, and Energy. These are not separate silos. Sleep deprivation elevates cortisol, which impairs glucose metabolism, which disrupts circadian rhythm, which worsens sleep. The engine maps these feedback loops — so your recommendations address root causes, not surface symptoms.',
      'From the wisdom traditions, this systems view is not new. Ayurveda describes prakriti as a dynamic equilibrium among three doshas. Daoist medicine speaks of the continuous interplay of qi, blood, and jing. The Rambam insisted that diet, air, movement, sleep, emotion, and purpose each influence the others.',
      'What HOLOS contributes is the ability to quantify where your personal system is out of equilibrium — and to prescribe interventions ranked by likely impact and practical difficulty.',
    ]
  },
  'sleep-recovery-ancient': {
    author: 'Moshe Ostrovsky',
    body: [
      'The Tibetan medical system describes sleep as a time when the wind-humour (lung) settles and the subtle channels of the body undergo repair. This maps with striking precision onto the glymphatic hypothesis: during deep sleep, cerebrospinal fluid flushes metabolic waste from the brain at 60% greater volume than during waking.',
      'Ayurveda prescribes sleeping before 10pm and rising before 6am — the Kapha time of night, when the earth-water element supports deep anabolic restoration. Chronobiological research confirms that circadian alignment improves slow-wave sleep duration by 20–30%, regardless of total sleep time.',
      'The Rambam was explicit: "Among the things that harm the body and shorten life: staying awake at night and shortening sleep." He prescribed sleeping on the right side first, then turning to the left. Left-side sleeping improves lymphatic drainage and reduces acid reflux — the physiology differs from his 12th-century conception, but the recommendation holds.',
      'The Daoist tradition emphasizes wu wei — effortless non-doing — as the precondition for restoration. Sleep is not passive; it is the body\'s most active healing state. Modern understanding of sleep architecture (N1/N2/N3/REM cycling every ~90 minutes) vindicates this: each stage performs distinct functions.',
      'In the HOLOS Sleep dimension, your score reflects not just hours but circadian alignment, sleep debt, subjective quality, and daytime consequences.',
    ]
  },
  'nutrition-frameworks': {
    author: 'Moshe Ostrovsky',
    body: [
      'The question "what should I eat?" has a different answer depending on which tradition you ask — but the answers share more structure than they first appear. All eight frameworks identify food not merely as macronutrient fuel, but as a vehicle for constitutional balance, seasonal adaptation, and metabolic individuality.',
      'Evidence-Based: The strongest consensus supports a predominantly whole-food, plant-rich diet with adequate protein (1.2–2g/kg lean mass), omega-3 fats, and polyphenol diversity. Processed food displacement accounts for most chronic disease risk reduction in large cohort studies.',
      'Rambam: Prescribes eating in order of digestibility — light foods first; dense foods last. Restrict quantity to 75% fullness. Prioritize seasonal, local produce. "A person should not eat unless he is hungry, and should not drink unless he is thirsty."',
      'Ayurveda: Matches food gunas to dosha imbalance. Vata types need warm, oily, grounding foods; Pitta types need cooling foods; Kapha types need light, spicy, dry foods. Agni (digestive fire) is the central variable — all food recommendations subordinate to its current state.',
      'The HOLOS Swarga framework weights nutritional recommendations by your scored dimension imbalances across all traditions, producing a personalised dietary archetype — not a single diet, but a decision framework for each meal.',
    ]
  },
  'stress-resilience-traditions': {
    author: 'Moshe Ostrovsky',
    body: [
      'The HPA axis produces cortisol in response to perceived threat — a response tuned for acute danger, not chronic low-grade stressors. Extended HPA activation suppresses immune function, impairs memory, disrupts circadian rhythm, and accelerates cellular aging via telomere shortening.',
      'Ayurveda calls it Vata aggravation: the wind-air element becomes excessive, destabilizing the nervous system. The remedy is grounding: abhyanga oil massage, warm heavy foods, slow movement, ashwagandha. Modern research shows ashwagandha root reduces cortisol by 27.9% in RCTs.',
      'The Daoist tradition developed Qigong and Tai Chi as tools for regulating shen (spirit) and settling qi. A 2017 meta-analysis of 35 RCTs found Qigong practice significantly reduced anxiety, depression, and biomarkers of inflammation — effects comparable to aerobic exercise at lower intensity.',
      'Tibetan Buddhism contributed tonglen and the recognition of suffering as workable. This is not toxic positivity — it is the empirical observation that avoidance amplifies stress while engagement metabolizes it. Modern exposure-based therapies are mechanistically identical.',
      'In the HOLOS Stress dimension, recommendations draw from the tradition most compatible with your current state — breathwork, adaptogenic herbs, Qigong, or structured reflection practices.',
    ]
  },
  'movement-medicine': {
    author: 'Moshe Ostrovsky',
    body: [
      'A 2022 meta-analysis found that physical activity reduces all-cause mortality risk by 30–35%, cardiovascular events by 40%, depression incidence by 33%, and cognitive decline by 38%. These effects hold across age groups and require no equipment or facility.',
      'But movement is not monolithic. Ayurveda distinguishes brmhana (strengthening) from langhana (lightening) movement modalities — prescribed based on dosha, season, and energy state. A Vata-dominant person benefits from slow, rhythmic, grounding movement — not high-intensity interval training, which further depletes the nervous system.',
      'Hippocrates wrote: "Walking is man\'s best medicine" — and modern epidemiology vindicates this completely. The dose-response curve for walking is steep between 0 and 7,500 steps/day and flattens thereafter. Mortality benefits of 7,500 daily steps are nearly identical to 12,000.',
      'The Daoist tradition distinguished effortful non-effort. Tai Chi and Qigong are precision neuromotor training. Research shows they improve balance, proprioception, and fall prevention as effectively as conventional balance training in older adults.',
      'The HOLOS Movement dimension scores frequency, intensity distribution, functional strength markers, and movement quality — matched to your constitutional profile and current energy state.',
    ]
  },
  'emotional-intelligence-holos': {
    author: 'Moshe Ostrovsky',
    body: [
      'The polyvagal theory provides a physiological basis for what traditions have long observed: the state of the nervous system — specifically vagal tone — determines our capacity for social engagement, learning, creativity, and physical healing.',
      'Ayurveda identifies sattva (mental clarity and equanimity) as the goal of all wellness practices — achieved not by suppressing emotion, but by purifying the mind of rajas (agitation) and tamas (inertia) through yoga, meditation, wholesome food, and nature exposure.',
      'The Tibetan medical tradition developed the most granular map of mental-emotional states. The "five poisons" are understood as primary generators of disease — as chronic activation patterns that dysregulate physiology. Their antidotes are cultivated through specific meditation practices matched to constitutional type.',
      'Hippocrates understood that physician presence and emotional rapport were therapeutic in themselves. A warm, trusting relationship reduces cortisol, increases oxytocin, and improves treatment adherence.',
      'In the HOLOS Emotional dimension, the AI Coach serves as a reflective partner trained in integrative wellness perspectives. Where clinical support is appropriate, the Coach says so directly.',
    ]
  },
  'purpose-longevity': {
    author: 'Moshe Ostrovsky',
    body: [
      'The Rush Memory and Aging Project followed 1,500 older adults for seven years and found that those with a high sense of purpose had 2.5× lower all-cause mortality risk — independent of physical health, depression status, or socioeconomic factors. Purpose predicted survival more strongly than smoking cessation.',
      'The mechanism: purpose organizes attention, inhibits rumination, and activates the behavioural approach system. People with clear purpose sleep better, exercise more consistently, seek medical care proactively, and recover faster from illness. Purpose is not the outcome of wellness — it is a driver of it.',
      'Japanese culture encoded this in ikigai — the intersection of what you love, what you are good at, what the world needs, and what you can be paid for. Okinawa, home to some of the world\'s longest-lived populations, has no concept of retirement.',
      'The HOLOS Purpose dimension assesses clarity of values, sense of contribution, engagement vs. alienation from daily activities, and temporal orientation. It is the most nuanced dimension to score and the most impactful to shift.',
    ]
  },
  'rambam-modern-wellness': {
    author: 'Moshe Ostrovsky',
    body: [
      'Maimonides wrote the Regimen of Health for the Sultan\'s son — who suffered from depression and constipation. The prescriptions are remarkably contemporary: moderate daily exercise, regular sleep schedule, emotional management, bowel regularity, and the avoidance of overeating.',
      'His "eight chapters" on mental health anticipate cognitive-behavioural therapy: the soul has appetites and reason must regulate them; character is formed by habit; negative emotional states are modified by practising their opposites.',
      'On nutrition, the Rambam was exacting: eat to 75% fullness. Begin with light foods, end with dense ones. The gut microbiome research of the 21st century is providing mechanisms for every one of these prescriptions.',
      'The Rambam was emphatic that physicians should treat the person before they are ill. "A wise man should give more attention to preserving his health than to the healing of illness." This is modern preventive medicine — encoded in 12th-century Jewish law.',
    ]
  },
}

const CAT_COLORS: Record<string, string> = {
  'Foundation':           '#6B6FA8',
  'Основы':               '#6B6FA8',
  'יסודות':              '#6B6FA8',
  'Grundlagen':           '#6B6FA8',
  'Assessment':           '#7A9E8E',
  'Оценка':               '#7A9E8E',
  'הערכה':               '#7A9E8E',
  'Bewertung':            '#7A9E8E',
  'Ayurveda':             '#B07A60',
  'Аюрведа':              '#B07A60',
  'איורוודה':            '#B07A60',
  'Rambam':               '#C4A55A',
  'Рамбам':               '#C4A55A',
  'רמב"ם':               '#C4A55A',
  'Daoist Medicine':      '#6B6FA8',
  'Даосская медицина':    '#6B6FA8',
  'רפואה טאואיסטית':    '#6B6FA8',
  'Daoistische Medizin':  '#6B6FA8',
  'Avicenna':             '#C4A55A',
  'Авиценна':             '#C4A55A',
  'אבן סינא':            '#C4A55A',
  'Tibetan Medicine':     '#9B7BB0',
  'Тибетская медицина':   '#9B7BB0',
  'רפואה טיבטית':       '#9B7BB0',
  'Tibetische Medizin':   '#9B7BB0',
  'Research':             '#6B6FA8',
  'Исследования':         '#6B6FA8',
  'מחקר':                '#6B6FA8',
  'Forschung':            '#6B6FA8',
  'Sleep':                '#7A9E8E',
  'Сон':                  '#7A9E8E',
  'שינה':                '#7A9E8E',
  'Schlaf':               '#7A9E8E',
  'Nutrition':            '#B07A60',
  'Питание':              '#B07A60',
  'תזונה':               '#B07A60',
  'Ernährung':            '#B07A60',
  'Stress':               '#B06070',
  'Стресс':               '#B06070',
  'לחץ':                 '#B06070',
  'Movement':             '#C4A55A',
  'Движение':             '#C4A55A',
  'תנועה':               '#C4A55A',
  'Bewegung':             '#C4A55A',
  'Emotional Health':     '#9B7BB0',
  'Эмоциональное здоровье': '#9B7BB0',
  'בריאות רגשית':       '#9B7BB0',
  'Emotionale Gesundheit': '#9B7BB0',
  'Purpose':              '#7A9E8E',
  'Цель':                 '#7A9E8E',
  'מטרה':                '#7A9E8E',
  'Zweck':                '#7A9E8E',
  'Traditions':           '#C4A55A',
  'Традиции':             '#C4A55A',
  'מסורות':              '#C4A55A',
  'Traditionen':          '#C4A55A',
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const { locale } = await getServerStrings()
  const meta = (SLUG_META[locale as Locale] ?? SLUG_META.en)[slug] ?? SLUG_META.en[slug]
  if (!meta) return { title: 'Article Not Found — Holos' }
  return {
    title: `${meta.title} — Holos Knowledge Center`,
    description: meta.intro,
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const [{ slug }, { strings, locale }] = await Promise.all([params, getServerStrings()])
  const k = strings.knowledge

  const localeKey = locale as Locale
  const localeMeta = SLUG_META[localeKey] ?? SLUG_META.en
  const meta = localeMeta[slug] ?? SLUG_META.en[slug]
  const body = ARTICLES[slug]

  const article = meta && body ? {
    title:    meta.title,
    category: meta.category,
    intro:    meta.intro,
    date:     meta.date,
    readTime: meta.readTime,
    author:   body.author,
    body:     body.body,
  } : {
    title:    k.articleNotFound,
    category: 'Knowledge',
    readTime: '—',
    date:     '—',
    author:   'HOLOS',
    intro:    k.articleNotFoundBody,
    body:     [k.articleNotFoundMore],
  }

  const catColor = CAT_COLORS[article.category] ?? '#7A9E8E'

  // Other articles — show localized titles from SLUG_META
  const otherArticles = Object.keys(ARTICLES)
    .filter(s => s !== slug)
    .slice(0, 3)
    .map(s => ({
      slug: s,
      ...(localeMeta[s] ?? SLUG_META.en[s]),
    }))

  return (
    <div style={{ minHeight: '100vh', background: 'var(--canvas, #FAF7F2)' }}>

      {/* Hero — uses ink-stable so it stays dark in both light and dark mode */}
      <section style={{
        background: 'var(--ink-stable, #2B2F45)', color: '#EDE9E0',
        padding: 'clamp(60px,10vw,100px) clamp(20px,6vw,80px) clamp(40px,6vw,60px)',
      }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
            <Link href="/knowledge" style={{
              color: 'rgba(237,233,224,.6)', fontSize: '0.85rem',
              fontFamily: 'var(--font-body)', textDecoration: 'none',
            }}>
              {k.articleBack}
            </Link>
            <span style={{ color: 'rgba(237,233,224,.3)' }}>·</span>
            <span style={{
              background: catColor, color: '#FAF7F2',
              fontSize: '0.75rem', fontWeight: 600, fontFamily: 'var(--font-body)',
              padding: '3px 10px', borderRadius: 20, letterSpacing: '0.04em',
            }}>{article.category}</span>
          </div>

          <h1 style={{
            fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem,4vw,2.8rem)',
            fontWeight: 500, lineHeight: 1.2, marginBottom: 20, letterSpacing: '-0.02em',
          }}>{article.title}</h1>

          <p style={{
            fontSize: 'clamp(1rem,1.5vw,1.15rem)', lineHeight: 1.6, opacity: 0.8,
            fontFamily: 'var(--font-body)', marginBottom: 28,
          }}>{article.intro}</p>

          <div style={{
            display: 'flex', gap: 20, flexWrap: 'wrap',
            fontSize: '0.85rem', opacity: 0.6, fontFamily: 'var(--font-mono)',
          }}>
            <span>{article.author}</span>
            <span>·</span>
            <span>{article.date}</span>
            <span>·</span>
            <span>{article.readTime}</span>
          </div>
        </div>
      </section>

      {/* Article body */}
      <article style={{
        maxWidth: 760, margin: '0 auto',
        padding: 'clamp(40px,6vw,80px) clamp(20px,6vw,80px)',
      }}>
        {article.body.map((paragraph, i) => (
          <p key={i} style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(1rem,1.2vw,1.05rem)',
            lineHeight: 1.75,
            color: 'var(--ink, #2B2F45)',
            marginBottom: 24,
          }}>{paragraph}</p>
        ))}

        {/* Medical disclaimer */}
        <div style={{
          background: 'rgba(122,158,142,.08)',
          border: '1px solid rgba(122,158,142,.25)',
          borderRadius: 12, padding: '20px 24px', marginTop: 48,
        }}>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: '0.85rem',
            color: 'var(--ink-soft, #5A5F78)', lineHeight: 1.6, margin: 0,
          }}>
            <strong style={{ color: 'var(--sage, #7A9E8E)' }}>{k.articleDisclaimer}</strong>{' '}
            {k.articleDisclaimerBody}
          </p>
        </div>
      </article>

      {/* More articles — localized titles */}
      {otherArticles.length > 0 && (
        <section style={{
          borderTop: '1px solid var(--line, #DDD8CC)',
          padding: 'clamp(40px,6vw,80px) clamp(20px,6vw,80px)',
          maxWidth: 1100, margin: '0 auto',
        }}>
          <h2 style={{
            fontFamily: 'var(--font-serif)', fontSize: '1.5rem',
            fontWeight: 500, color: 'var(--ink, #2B2F45)',
            marginBottom: 32, letterSpacing: '-0.02em',
          }}>{k.articleMore}</h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 24,
          }}>
            {otherArticles.map(a => (
              <Link key={a.slug} href={`/knowledge/${a.slug}`} style={{ textDecoration: 'none' }}>
                <div style={{
                  background: 'var(--surface, #FFFFFF)',
                  border: '1px solid var(--line, #DDD8CC)',
                  borderRadius: 16, padding: 24,
                }}>
                  <span style={{
                    background: CAT_COLORS[a.category] ?? '#7A9E8E',
                    color: '#FAF7F2', fontSize: '0.7rem', fontWeight: 600,
                    fontFamily: 'var(--font-body)', padding: '2px 8px',
                    borderRadius: 20, letterSpacing: '0.04em',
                  }}>{a.category}</span>
                  <h3 style={{
                    fontFamily: 'var(--font-serif)', fontSize: '1.05rem',
                    fontWeight: 500, color: 'var(--ink, #2B2F45)',
                    marginTop: 12, marginBottom: 8, lineHeight: 1.3,
                  }}>{a.title}</h3>
                  <p style={{
                    fontFamily: 'var(--font-body)', fontSize: '0.85rem',
                    color: 'var(--ink-soft, #5A5F78)', lineHeight: 1.5, margin: 0,
                  }}>{a.intro.slice(0, 100)}…</p>
                </div>
              </Link>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link href="/knowledge" style={{
              fontFamily: 'var(--font-body)', fontSize: '0.95rem',
              color: 'var(--sage, #7A9E8E)', textDecoration: 'none', fontWeight: 500,
            }}>
              {k.articleViewAll}
            </Link>
          </div>
        </section>
      )}

      {/* CTA — uses ink-stable so it stays dark in both light and dark mode */}
      <section style={{
        background: 'var(--ink-stable, #2B2F45)',
        padding: 'clamp(40px,6vw,80px) clamp(20px,6vw,80px)',
        textAlign: 'center',
      }}>
        <h2 style={{
          fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.5rem,3vw,2.2rem)',
          color: '#EDE9E0', fontWeight: 500, marginBottom: 16,
        }}>{k.articleCtaTitle}</h2>
        <p style={{
          fontFamily: 'var(--font-body)', color: 'rgba(237,233,224,.7)',
          fontSize: '1.05rem', marginBottom: 32, maxWidth: 500, margin: '0 auto 32px',
        }}>
          {k.articleCtaBody}
        </p>
        <Link href="/auth/signup" style={{
          display: 'inline-block',
          background: 'var(--sage, #7A9E8E)', color: '#FAF7F2',
          padding: '14px 32px', borderRadius: 50, fontFamily: 'var(--font-body)',
          fontSize: '1rem', fontWeight: 600, textDecoration: 'none', letterSpacing: '0.01em',
        }}>
          {k.articleCtaCta}
        </Link>
      </section>
    </div>
  )
}
