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
  'swarga-tradition': {
    author: 'Moshe Ostrovsky',
    body: [
      'Svarga is Sanskrit for the realm beyond the ordinary — the elevation that comes from genuinely integrating what is best in each tradition rather than merely cataloguing it. The HOLOS Svarga framework is not a ninth tradition added to the eight; it is the meta-framework that makes the eight traditions legible to each other.',
      'Each of the eight traditions in the HOLOS system — Ayurveda, Daoist medicine, Hippocratic medicine, Maimonides\'s Regimen, Avicenna\'s Canon, Tibetan medicine, modern evidence-based science, and the HOLOS integrative system — is complete within its own logic. Each has a theory of cause, a system of diagnosis, a set of interventions, and a body of accumulated observation stretching across centuries. None is merely a collection of tips.',
      'The challenge is that each tradition uses a different vocabulary, different measurement categories, and a different theory of what constitutes health. An Ayurvedic practitioner reads Pitta; a Tibetan physician reads Tripa; a Western cardiologist reads CRP and LDL. They may be looking at the same physiological reality and describing it in completely different terms — and missing each other\'s findings as a result.',
      'The Svarga layer translates across these vocabularies. It identifies the structural correspondences — the places where traditions independently converge on the same observation — and uses those convergences to increase diagnostic confidence. When Ayurveda, Tibetan medicine, and modern psychoneuroimmunology all point to the same pattern in your profile, that convergence is not coincidence. It is signal.',
      'The practical output is what HOLOS calls the Svarga Synthesis Report: a personalised cross-traditional analysis that identifies your constitutional profile, the traditions whose frameworks most precisely fit that profile, and the specific interventions each tradition recommends — ranked by cross-traditional endorsement and adjusted for practical implementation in modern life. Svarga is not the goal. It is the view from high enough to see the whole terrain.',
    ]
  },
}

// ── Russian translations for article bodies ─────────────────────────────────
const ARTICLES_RU: Record<string, { author: string; body: string[] }> = {
  'what-is-integrative-wellness': {
    author: 'Моше Островский',
    body: [
      'Интегративное здоровье — это не альтернатива традиционной медицине, а её естественное продолжение. На протяжении большей части человеческой истории медицина означала понимание целостного человека: его конституции, привычек, окружающей среды и внутренней жизни. Современное сведение здоровья к набору биомаркеров исторически аномально, и свидетельства недостаточности такого подхода всё множатся.',
      'Каждая великая цивилизация разработала полноценную медицинскую философию, потому что практики, проведшие жизнь в наблюдении за здоровьем людей, замечали одно и то же: люди — не набор независимых органов. Тело, разум и окружающая среда образуют динамическую систему, и лечение любой части в отрыве от других даёт фрагментарные результаты.',
      'HOLOS синтезирует восемь таких философий — аюрведу, даосскую медицину, гиппократовскую медицину, режим Рамбама, Канон Авиценны, тибетскую медицину, современную доказательную науку и интегративную систему HOLOS — не потому что они сходятся в механизмах, а потому что сходятся в наблюдениях: человеческий организм реагирует на пищу, движение, сон, эмоции, смысл и отношения предсказуемыми и измеримыми способами.',
      'Платформа HOLOS не требует верить ни в одну традицию. Она оценивает вас по девяти измерениям, а затем использует систему, наиболее совместимую с вашим конституциональным профилем, для приоритизации вмешательств. Мета-анализ 2023 года в Annals of Internal Medicine показал, что мультимодальные подходы к оздоровлению превзошли монодисциплинарное лечение на 34% по первичным результатам — не потому что отдельные компоненты были мощнее, а потому что их взаимодействие давало синергетический эффект.',
      'Эта база знаний исследует каждую традицию в глубину: её истоки, диагностическую систему и то, что современная наука подтвердила в её предписаниях. Цель — практический синтез: понять, где древние и современные карты совпадают, и использовать это совпадение для действия.',
    ]
  },
  'nine-dimensions': {
    author: 'Моше Островский',
    body: [
      'Большинство платформ здоровья измеряют одно-два измерения — как правило, продолжительность сна и количество шагов. Оценка HOLOS охватывает девять: питание, сон, восстановление, стресс, движение, эмоциональное здоровье, баланс жизни, цель и энергию. Это не всесторонность ради всесторонности — а потому что эти измерения взаимодействуют, и в их взаимодействиях живёт настоящий диагностический сигнал.',
      'Рассмотрим распространённый паттерн: человек спит семь часов, но просыпается неотдохнувшим. Взгляд через призму одного измерения укажет на качество сна и назначит его гигиену. Модель HOLOS задаёт дополнительные вопросы: каков балл стресса? Повышенный кортизол подавляет медленноволновой сон, не уменьшая общее его время. Низок ли балл цели? Люди без чёткого смысла испытывают более сильную ночную руминацию. Плохо ли питание? Дисбактериоз кишечника теперь связан с нарушением архитектуры сна через ось кишечник-мозг.',
      'Та же взаимозависимость работает в обратном направлении. Высокий балл цели коррелирует с лучшим сном, лучшим питанием, более высокой последовательностью физических упражнений и более быстрым восстановлением от болезней — не потому что цель напрямую вызывает всё это, а потому что она организует поведение по всем измерениям. Именно поэтому HOLOS взвешивает рекомендации по межмерному воздействию, а не по одномерному дефициту.',
      'Девять измерений были выбраны не произвольно. Они отображают то, что каждая великая традиция мудрости определила как переменные, определяющие здоровье, — сверенные с областями, наиболее устойчиво встречающимися в исследованиях долголетия: качество питания, архитектура сна, физиология стресса, доза движения, эмоциональная регуляция, социальные связи и ориентация на цель. У каждого измерения есть свой модуль оценки, а баллы питают шестиуровневый механизм, производящий ранжированный набор рекомендаций.',
      'Оценка всех девяти измерений позволяет HOLOS выявлять паттерны, которые одноиндикаторные трекеры упускают: человека, чьи часы сна достаточны, но чьи баллы стресса и цели указывают на скрытую аллостатическую нагрузку; человека, чьи баллы питания и движения отличны, но чьи баллы восстановления и эмоционального здоровья говорят об истощении резервов. Эти составные паттерны прогнозируют траектории здоровья точнее, чем любой отдельный показатель.',
    ]
  },
  'doshas-explained': {
    author: 'Моше Островский',
    body: [
      'Доши — Вата, Питта и Капха — являются основным организующим принципом аюрведической медицины. Это не группы крови, категории личности или диетические ярлыки. Это динамические соотношения элементарных качеств внутри человеческого организма, и их понимание требует отказаться от западного инстинкта к классификации и научиться наблюдать паттерны со временем.',
      'Вата — принцип движения и пространства, воздух и эфир в движении. В сбалансированном состоянии она управляет творчеством, гибкостью, быстрым мышлением и энтузиазмом. При возбуждении она порождает тревогу, бессонницу, сухость кожи, запоры, нерегулярный аппетит и рассеянное, перегруженное состояние ума. Вата усиливается холодными, сухими, лёгкими и нерегулярными качествами — зимой, путешествиями, нестабильным расписанием, избыточным временем у экрана и стимуляторами.',
      'Питта — принцип трансформации, огонь и вода. Сбалансированная Питта движет острым интеллектом, амбициями, лидерством и метаболической эффективностью. Возбуждённая Питта порождает воспаление, кожные высыпания, кислотный рефлюкс, раздражительность, перфекционизм и выгорание. Питта усиливается жарой, интенсивностью и соперничеством — переработкой, алкоголем, острой пищей, прямым солнцем и высокострессовой средой.',
      'Капха — принцип структуры и сцепления, земля и вода. Сбалансированная Капха обеспечивает стабильность, выносливость, сострадание и глубокий иммунитет. Возбуждённая Капха проявляется в виде вялости, увеличения веса, застойных явлений, низкого настроения и трудностей с инициативой. Капха усиливается холодными, тяжёлыми и малоподвижными условиями — пересыпанием, сладкой и жирной пищей и поведением, ориентированным на комфорт.',
      'У каждого человека есть конституциональное соотношение трёх дош — его пракрити, установленное при зачатии, — и текущее соотношение, называемое викрити, формируемое образом жизни, сезоном и жизненными событиями. Аюрведическая оценка определяет разрыв между пракрити и викрити и назначает вмешательства для восстановления конституционального баланса: конкретные диетические рекомендации, травяные составы, типы движения, режим сна и распорядок дня. Аюрведический модуль HOLOS использует вашу девятимерную оценку для определения вероятного профиля доши и формирования индивидуальных рекомендаций.',
    ]
  },
  'rambam-preventive': {
    author: 'Моше Островский',
    body: [
      'Рабби Моше бен Маймон (1138–1204) — Рамбам в еврейской традиции, Маймонид на Западе — был придворным врачом египетского султана, философом, синтезировавшим Аристотеля с Торой, и автором медицинских текстов, которые предвосхитили современную превентивную медицину с точностью, до сих пор удивляющей знакомящихся с ними клиницистов.',
      'Его «Режим здоровья», написанный для больного сына Султана, определяет шесть детерминантов здоровья, которые он назвал «неестественными»: воздух и окружающая среда; пища и питьё; сон и бодрствование; движение и покой; выведение отходов; и эмоциональные состояния души. Это не мистицизм — это эмпирическая система, построенная из десятилетий клинических наблюдений тысяч пациентов.',
      'В отношении диеты Рамбам был точен: ешьте до 75% насыщения — «человек всегда должен быть немного голоден». Начинайте трапезу с лёгкой, легкоусвояемой пищи; завершайте более плотной. Отдавайте предпочтение сезонным продуктам. Эти предписания соответствуют современным исследованиям ограничения калорий, последовательности пищеварения и снижения риска хронических заболеваний через пищевые паттерны, а не отдельные нутриенты.',
      'О движении: «Человек должен упражняться каждое утро, пока тело не разогреется». Он указал, что недостаточное движение является причиной большинства хронических заболеваний — «тело становится тяжёлым и неповоротливым, и его силы слабеют». Современная кривая дозо-ответной реакции для физической активности и смертности от всех причин подтверждает это в количественных деталях.',
      'Что касается эмоционального здоровья, Рамбам был категоричен: «Врач, не лечащий душу, не может лечить тело». Он определил скорбь, гнев и хроническую тревогу как физиологически вредоносные — утверждение, ныне подкреплённое десятилетиями психонейроиммунологических исследований, связывающих эмоциональные состояния с кортизолом, профилями цитокинов и иммунной функцией. Его предписания для эмоционального благополучия — значимая работа, умеренная дружба, интеллектуальная вовлечённость и культивирование невозмутимости — остаются одними из наиболее доказательных вмешательств в своём классе.',
    ]
  },
  'qi-cultivation': {
    author: 'Моше Островский',
    body: [
      'Возражение скептика против даосской медицины обычно звучит так: «Ци не существует. Её нельзя измерить. Следовательно, система донаучна». Это возражение заслуживает серьёзного рассмотрения — а затем внимательного изучения, потому что оно неверно определяет, что на самом деле утверждает даосская медицина.',
      'Ци — это не вещество, обнаруживаемое под микроскопом. Это функциональная концепция — саморегулирующаяся активность живых систем. Когда даосский врач говорит, что ваша ци застоялась, он описывает функциональное состояние: кровообращение вялое, пищеварение медленное, лимфодренаж застойный, тонус нервной системы подавлен. Это измеримые явления. Язык отличается от биомедицинского; наблюдение — нет.',
      'Доказательная база практик, производных от даосизма, теперь существенна. Мета-анализ 2017 года 35 рандомизированных контролируемых испытаний показал, что цигун значительно снижает тревогу, депрессию и воспалительные биомаркеры — эффекты, сравнимые с аэробными упражнениями при меньшей интенсивности. Многочисленные систематические обзоры подтверждают превосходство тай-чи над обычными тренировками баланса для предотвращения падений у пожилых людей. Акупунктура демонстрирует устойчивую эффективность при хронической боли, профилактике мигрени и тошноте, вызванной химиотерапией.',
      'Система пяти элементов — Дерево, Огонь, Земля, Металл, Вода — отображает системы органов, эмоциональные состояния, сезоны и пищевые тенденции на цикличную модель взаимного порождения и контроля. Печень (Дерево) питает Сердце (Огонь); Сердце питает Селезёнку (Земля); Селезёнка питает Лёгкие (Металл); Лёгкие питают Почки (Вода); Почки питают Печень. Нарушение в любом элементе распространяется по всему циклу — системная карта физиологической взаимозависимости.',
      'Для практика HOLOS культивирование ци означает внимание к течению жизненной энергии через постоянную ежедневную практику: утренний цигун, сезонная корректировка питания, эмоциональная регуляция и культивирование шэнь — духа и целенаправленного осознания. Эти практики поддерживают условия, в которых организм исцеляет себя сам. Цель — не экзотическое состояние, а базовая интегрированная саморегуляция.',
    ]
  },
  'sleep-traditions': {
    author: 'Моше Островский',
    body: [
      'Каждая крупная медицинская традиция разработала сложную теорию сна, и когда вы сравниваете их в разных культурах и веках, совпадения поражают больше, чем различия. Без трекеров сна, ЭЭГ или хронобиологии врачи на четырёх континентах пришли к почти идентичным выводам о том, когда спать, сколько и в каких условиях.',
      'Аюрведа предписывает спать в ночное время Капхи — примерно с 22:00 до 2:00, — когда земно-водный элемент поддерживает глубочайшее анаболическое восстановление. Подъём до 6 утра в период Ваты согласует состояние бодрствования с ясностью ума и лёгкостью. Хронобиологические исследования подтверждают, что циркадное выравнивание — сон в период пика мелатонина, пробуждение с ранним утренним светом — улучшает продолжительность медленноволнового сна на 20–30% независимо от общего времени сна.',
      'Рамбам был однозначен: «Среди вещей, вредящих телу и сокращающих жизнь: бодрствование ночью и сокращение сна». Он предписывал сначала спать на правом боку, затем поворачиваться на левый — рекомендация, которую современные гастроэнтерологические исследования частично подтверждают. Сон на правом боку уменьшает кислотный рефлюкс; сон на левом боку улучшает лимфодренаж грудного протока.',
      'Тибетская медицина описывает сон как время, когда Лунг — вэтровый хумор, управляющий умственной деятельностью, — успокаивается, и тонкие каналы тела подвергаются восстановлению. Это соответствует глимфатической гипотезе, подтверждённой в 2013 году: во время глубокого сна спинномозговая жидкость вымывает метаболические отходы из мозга с объёмом на 60% большим, чем во время бодрствования. Низкое качество сна — самый последовательно модифицируемый фактор риска болезни Альцгеймера.',
      'Межтрадиционный консенсус: спите в одно и то же время в согласии с естественными световыми циклами; держите среду сна прохладной, тёмной и тихой; избегайте стимуляции в последний час перед сном; относитесь ко сну как к активному биологическому восстановлению, а не пассивному бессознательному состоянию. Измерение сна в HOLOS оценивает циркадное выравнивание, накопленный дефицит сна, субъективное качество и дневные функциональные последствия.',
    ]
  },
  'stress-dimension': {
    author: 'Моше Островский',
    body: [
      'Аллостатическая нагрузка — это накопленные физиологические издержки хронической адаптации: то, что происходит с телом, когда стрессовая реакция, созданная для острых угроз, активируется непрерывно в течение месяцев и лет. Термин введён Брюсом МакИвеном в 1993 году, но наблюдение, которое он называет, древнее: каждая традиция мудрости определила устойчивое эмоциональное возбуждение как первичный драйвер хронических заболеваний.',
      'Первичные медиаторы — кортизол, адреналин и провоспалительные цитокины. Краткие всплески кортизола обостряют познание, мобилизуют энергию и подавляют боль. Хроническое повышение кортизола действует противоположно: подавляет нейрогенез гиппокампа, нарушая память и обучение; дисрегулирует метаболизм глюкозы, способствуя инсулинорезистентности; нарушает циркадный ритм, ухудшая архитектуру сна; и ускоряет клеточное старение через укорочение теломер.',
      'Большинство мер по борьбе со стрессом терпят неудачу, потому что направлены на субъективное ощущение стресса, а не на биологический долг, накапливающийся под ним. Дыхательные упражнения и осознанность снижают острое возбуждение, но не устраняют аллостатическую нагрузку, накопленную за месяцы хронической активации. Только устойчивое снижение аллостатических нагрузок в сочетании с систематическими практиками восстановления может это сделать.',
      'Аюрведа идентифицирует вызванную стрессом болезнь как возбуждение Ваты и предписывает заземление: тёплую, маслянистую пищу; медленное ритмичное движение; регулярный распорядок дня; и адаптогенные травы, включая ашваганду, которая в недавнем РКИ снижает сывороточный кортизол на 27,9% после 60 дней. Даосский цигун и тай-чи восстанавливают плавное течение ци и успокаивают шэнь. Рамбам предписывал отдых, дружбу, значимую работу и умеренность как структурные условия психологического здоровья. Тибетская практика работает непосредственно с паттернами избегания и усиления, превращающими стресс в страдание.',
      'Измерение стресса HOLOS не просто спрашивает, насколько вы ощущаете стресс. Оно оценивает качество сна, скорость восстановления, способность к эмоциональной регуляции, наличие смысла и социальной поддержки. Рекомендации черпаются из традиции, чей инструментарий наиболее непосредственно устраняет корневые причины, ранжированные по вероятному влиянию с учётом вашего общего девятимерного профиля.',
    ]
  },
  'avicenna-canon': {
    author: 'Моше Островский',
    body: [
      'Ибн Сина (980–1037) — известный на Западе как Авиценна — был самым влиятельным врачом в истории медицины. Его «Канон медицины» (аль-Канун фи ат-Тибб) был стандартным медицинским учебником в европейских университетах с XII по XVII век — период, которого не достигал ни один другой медицинский текст. Он синтезировал греческую, персидскую и исламскую медицину в систему, пережившую все составляющие её традиции.',
      'Канон выделяет шесть категорий факторов, определяющих здоровье — «шесть необходимых вещей»: воздух и окружающая среда; пища и питьё; телесное движение и покой; психическое движение и покой (эмоциональные состояния); сон и бодрствование; удержание и выведение. Это не шесть отдельных предписаний, а шесть измерений единой интегрированной системы — и нарушение в любом из них распространяется на другие. Это системный взгляд, который биомедицина только сейчас формализует.',
      'Относительно качества воздуха наблюдения Авиценны были провидческими: он описал, как застоявшийся воздух и замкнутые пространства вызывают болезни, рекомендовал вентиляцию больниц и разработал процедуры карантина для инфекционных заболеваний — за тысячелетие до того, как теория микробов предоставила механизм. Современная экологическая эпидемиология последовательно определяет качество воздуха как один из сильнейших экологических детерминантов хронического бремени болезней.',
      'О пище Канон разграничивает продукты по их воздействию на темперамент тела — их нагревающим, охлаждающим, увлажняющим или иссушающим свойствам — и предписывает диетические корректировки для восстановления конституционального баланса. Структурный вывод — диетические рекомендации должны быть индивидуализированы для конституции и текущего состояния здоровья, а не универсализированы — это именно то, что точное питательное исследование сейчас заново открывает через нутригеномику и науку о микробиоме.',
      'Об эмоциональных состояниях Авиценна был прям: «Радость расширяет жизненный дух; горе сужает его; гнев нагревает кровь; страх охлаждает её». Предписания Канона для психологического благополучия — значимая работа, красивая среда, близкая дружба, умеренность страстей и интеллектуальная вовлечённость — предвосхищают современные доказательные вмешательства при хронических заболеваниях почти на тысячу лет. HOLOS использует систему Авиценны как одну из восьми линз для интерпретации данных оценки.',
    ]
  },
  'tibetan-three-humours': {
    author: 'Моше Островский',
    body: [
      'Тибетская медицина (Сова Ригпа, «знание исцеления») — одна из древнейших полноценных медицинских систем мира, развивавшаяся на протяжении двух тысячелетий на пересечении индийской аюрведы, китайской медицины и коренной традиции целительства Бон. Её фундаментальная модель выделяет три хумора — Лунг, Трипа и Бекен — как первичные силы, определяющие здоровье, а болезнь — как нарушение их динамического баланса.',
      'Лунг (произносится «лунг») — принцип ветра: он управляет всем движением, как физическим — дыханием, нервным импульсом, кровообращением, — так и умственным — мыслью, намерением и эмоцией. Сбалансированный Лунг порождает жизненность, ясность, энтузиазм и творческий интеллект. Нарушенный Лунг проявляется тревогой, бессонницей, дрожью, сухостью кожи, шумом в ушах и рассеянным, перегруженным состоянием ума — тесно соответствуя тревожным расстройствам в западной психиатрии и тому, что аюрведа называет возбуждением Ваты.',
      'Трипа — желчь — принцип огня: трансформация, пищеварение пищи и опыта, острое восприятие и способность к различению и принятию решений. Сбалансированная Трипа порождает интеллект, смелость и метаболическую эффективность. Нарушенная Трипа порождает воспаление, кожные заболевания, лихорадку, раздражительность, перфекционизм и хроническое неудовлетворение ненасытности. Это коррелирует с дисбалансом Питты в аюрведе и, в биомедицинских терминах, с хроническим вялотекущим воспалительным состоянием.',
      'Бекен — слизь — принцип воды и земли: структура, влажность, сцепление и стабильность. Сбалансированный Бекен обеспечивает выносливость, сострадание, терпение и глубокий иммунитет. Нарушенный Бекен проявляется ожирением, вялостью, избыточным сном, застоем и депрессивным состоянием низкого возбуждения. Это соответствует дисбалансу Капхи в аюрведе и, в современных терминах, кластеру метаболического синдрома.',
      'Отличие тибетской медицины — изощрённость её психофизической интеграции. Три ньепа — это не сугубо физические или психологические категории: это психофизические принципы. Расстройство Лунга — это одновременно расстройство нервной системы и экзистенциальное расстройство. Протокол соответственно обращается к обоим уровням: диетические модификации, специальные травяные составы, внешние терапии и созерцательные практики — особенно те, что работают с качеством самого умственного движения. Эта двойная интеграция соматического и психологического вмешательства — именно туда сейчас движется доказательная медицина.',
    ]
  },
  'integrative-wellness-science': {
    author: 'Моше Островский',
    body: [
      'Интегративное здоровье — это не альтернатива доказательной медицине, а её логическое продолжение. Системная биология, психонейроиммунология и хронобиология — все они указывают на один вывод: тело функционирует как единый интеллект, и лечение его в изоляции даёт фрагментарные результаты.',
      'Знаковый мета-анализ 2023 года в Annals of Internal Medicine рассмотрел 187 исследований вмешательств разума-тела и обнаружил, что мультимодальные подходы превзошли монодисциплинарное лечение на 34% по первичным результатам — не потому что отдельные компоненты были мощнее, а потому что их взаимодействие давало синергетический эффект.',
      'Оценка HOLOS фиксирует эту сложность, картируя девять взаимозависимых измерений: питание, сон, восстановление, стресс, движение, эмоциональное здоровье, баланс жизни, цель и энергию. Это не отдельные изолированные области. Депривация сна повышает кортизол, который нарушает метаболизм глюкозы, что нарушает циркадный ритм, что ухудшает сон. Механизм HOLOS картирует эти петли обратной связи — чтобы рекомендации устраняли корневые причины, а не поверхностные симптомы.',
      'Из традиций мудрости этот системный взгляд не нов. Аюрведа описывает пракрити как динамическое равновесие трёх дош. Даосская медицина говорит о непрерывном взаимодействии ци, крови и цзин. Рамбам настаивал на том, что диета, воздух, движение, сон, эмоции и цель влияют друг на друга.',
      'Вклад HOLOS — способность количественно определить, где ваша личная система находится в состоянии дисбаланса, и назначить вмешательства, ранжированные по вероятному влиянию и практической сложности.',
    ]
  },
  'sleep-recovery-ancient': {
    author: 'Моше Островский',
    body: [
      'Тибетская медицинская система описывает сон как время, когда ветровой хумор (лунг) успокаивается и тонкие каналы тела восстанавливаются. Это с поразительной точностью соответствует глимфатической гипотезе: во время глубокого сна спинномозговая жидкость вымывает метаболические отходы из мозга с объёмом на 60% большим, чем во время бодрствования.',
      'Аюрведа предписывает ложиться спать до 22:00 и вставать до 6:00 — ночное время Капхи, когда земно-водный элемент поддерживает глубокое анаболическое восстановление. Хронобиологические исследования подтверждают, что циркадное выравнивание улучшает продолжительность медленноволнового сна на 20–30% независимо от общего времени сна.',
      'Рамбам был однозначен: «Среди вещей, вредящих телу и сокращающих жизнь: бодрствование ночью и сокращение сна». Он предписывал сначала спать на правом боку, затем поворачиваться на левый. Сон на левом боку улучшает лимфодренаж и уменьшает кислотный рефлюкс — физиология отличается от его концепции XII века, но рекомендация действует.',
      'Даосская традиция подчёркивает у-вэй — усилие без усилий — как предварительное условие восстановления. Сон — это не пассивное состояние; это наиболее активное состояние исцеления тела. Современное понимание архитектуры сна (цикличность N1/N2/N3/REM каждые ~90 минут) подтверждает это: каждая стадия выполняет отдельные функции.',
      'В измерении сна HOLOS ваш балл отражает не только часы, но и циркадное выравнивание, дефицит сна, субъективное качество и дневные функциональные последствия.',
    ]
  },
  'nutrition-frameworks': {
    author: 'Моше Островский',
    body: [
      'Вопрос «что мне есть?» имеет разный ответ в зависимости от того, какую традицию вы спросите — но ответы имеют больше общей структуры, чем кажется на первый взгляд. Все восемь систем определяют пищу не просто как макронутриентное топливо, а как средство конституционального баланса, сезонной адаптации и метаболической индивидуальности.',
      'Доказательная медицина: Наиболее устойчивый консенсус поддерживает преимущественно цельнопищевую, богатую растениями диету с достаточным количеством белка (1,2–2 г/кг постной массы), жиров омега-3 и разнообразием полифенолов. Вытеснение обработанных продуктов объясняет большую часть снижения риска хронических заболеваний в крупных когортных исследованиях.',
      'Рамбам: предписывает есть в порядке усвояемости — сначала лёгкую пищу, в конце — плотную. Ограничивать количество до 75% насыщения. Отдавать приоритет сезонным, местным продуктам. «Человек не должен есть, пока не проголодается, и не должен пить, пока не почувствует жажды».',
      'Аюрведа: сопоставляет гуны пищи с дисбалансом доши. Конституции Ваты нужна тёплая, маслянистая, заземляющая пища; конституции Питты — охлаждающая; конституции Капхи — лёгкая, острая, сухая пища. Агни (пищеварительный огонь) — центральная переменная, которой подчинены все диетические рекомендации.',
      'Система HOLOS Сварга взвешивает диетические рекомендации по вашим измеренным дисбалансам во всех традициях, создавая персонализированный диетический архетип — не единую диету, а систему принятия решений для каждого приёма пищи.',
    ]
  },
  'stress-resilience-traditions': {
    author: 'Моше Островский',
    body: [
      'Ось ГГН вырабатывает кортизол в ответ на воспринимаемую угрозу — реакция, настроенная на острую опасность, а не на хронические слабые стрессоры. Длительная активация ГГН подавляет иммунную функцию, нарушает память, нарушает циркадный ритм и ускоряет клеточное старение через укорочение теломер.',
      'Аюрведа называет это возбуждением Ваты: элемент ветра-воздуха становится избыточным, дестабилизируя нервную систему. Средство — заземление: масляный массаж абхьянга, тёплая тяжёлая пища, медленное движение, ашваганда. Современные исследования показывают, что корень ашваганды снижает кортизол на 27,9% в РКИ.',
      'Даосская традиция разработала цигун и тай-чи как инструменты для регулирования шэнь (духа) и успокоения ци. Мета-анализ 2017 года 35 РКИ показал, что практика цигун значительно снижает тревогу, депрессию и биомаркеры воспаления — эффекты, сравнимые с аэробными упражнениями при меньшей интенсивности.',
      'Тибетский буддизм внёс тонглен и признание того, что страдание поддаётся работе. Это не токсичный позитивизм — это эмпирическое наблюдение о том, что избегание усиливает стресс, тогда как вовлечённость метаболизирует его. Современные экспозиционные терапии механистически идентичны.',
      'В измерении стресса HOLOS рекомендации черпаются из традиции, наиболее совместимой с вашим текущим состоянием — дыхательные практики, адаптогенные травы, цигун или практики структурированной рефлексии.',
    ]
  },
  'movement-medicine': {
    author: 'Моше Островский',
    body: [
      'Мета-анализ 2022 года показал, что физическая активность снижает риск смерти от всех причин на 30–35%, сердечно-сосудистых событий — на 40%, частоты депрессии — на 33%, а когнитивного снижения — на 38%. Эти эффекты сохраняются во всех возрастных группах и не требуют оборудования или спортивного зала.',
      'Но движение не монолитно. Аюрведа различает брмхана (укрепляющие) и лангхана (облегчающие) виды движения — назначаемые в зависимости от доши, сезона и энергетического состояния. Человеку с доминирующей Ватой полезно медленное, ритмичное, заземляющее движение — не высокоинтенсивная интервальная тренировка, которая дополнительно истощает нервную систему.',
      'Гиппократ написал: «Ходьба — лучшее лекарство человека» — и современная эпидемиология полностью подтверждает это. Кривая дозо-ответной реакции для ходьбы резкая между 0 и 7500 шагами в день и выравнивается после этого. Польза для смертности от 7500 ежедневных шагов почти идентична пользе от 12000.',
      'Даосская традиция разграничила усилие без усилий. Тай-чи и цигун — это прецизионные нейромоторные тренировки. Исследования показывают, что они улучшают баланс, проприоцепцию и предотвращение падений у пожилых людей так же эффективно, как обычные тренировки баланса.',
      'Измерение движения HOLOS оценивает частоту, распределение интенсивности, маркеры функциональной силы и качество движения — сопоставленные с вашим конституциональным профилем и текущим энергетическим состоянием.',
    ]
  },
  'emotional-intelligence-holos': {
    author: 'Моше Островский',
    body: [
      'Теория поливагуса обеспечивает физиологическую основу для того, что традиции давно наблюдали: состояние нервной системы — конкретно тонус блуждающего нерва — определяет нашу способность к социальному взаимодействию, обучению, творчеству и физическому исцелению.',
      'Аюрведа определяет саттву (умственную ясность и невозмутимость) как цель всех практик оздоровления — достигаемую не подавлением эмоций, а очищением ума от раджаса (возбуждения) и тамаса (инерции) через йогу, медитацию, полезную пищу и пребывание на природе.',
      'Тибетская медицинская традиция разработала наиболее детальную карту умственно-эмоциональных состояний. «Пять ядов» понимаются как первичные генераторы болезней — хронические паттерны активации, дисрегулирующие физиологию. Их противоядия культивируются через специфические медитативные практики, подобранные по конституциональному типу.',
      'Гиппократ понимал, что присутствие врача и эмоциональный контакт сами по себе обладают терапевтическим эффектом. Тёплые, доверительные отношения снижают кортизол, повышают окситоцин и улучшают приверженность лечению.',
      'В эмоциональном измерении HOLOS AI-коуч служит рефлексивным партнёром, обученным в интегративных подходах к оздоровлению. Когда клиническая поддержка уместна, коуч говорит об этом прямо.',
    ]
  },
  'purpose-longevity': {
    author: 'Моше Островский',
    body: [
      'Проект «Память и старение Раша» наблюдал за 1500 пожилыми людьми на протяжении семи лет и обнаружил, что у тех, кто обладал высоким чувством цели, риск смерти от всех причин был в 2,5 раза ниже — независимо от физического здоровья, депрессии или социально-экономических факторов. Цель предсказывала выживаемость сильнее, чем отказ от курения.',
      'Механизм: цель организует внимание, подавляет руминацию и активирует систему поведенческого приближения. Люди с ясной целью лучше спят, более последовательно занимаются физическими упражнениями, проактивно обращаются за медицинской помощью и быстрее восстанавливаются от болезней. Цель — не результат оздоровления, а его движущая сила.',
      'Японская культура закодировала это в икигай — пересечении того, что вы любите, в чём вы хороши, что нужно миру и за что вам могут платить. На Окинаве, родине одного из самых долгоживущих населений мира, не существует концепции выхода на пенсию.',
      'Измерение цели HOLOS оценивает ясность ценностей, ощущение вклада, вовлечённость в повседневные дела и временную ориентацию. Это наиболее тонкое из всех измерений и самое действенное для изменения.',
    ]
  },
  'rambam-modern-wellness': {
    author: 'Моше Островский',
    body: [
      'Маймонид написал «Режим здоровья» для сына Султана, страдавшего от депрессии и запоров. Предписания поразительно современны: умеренные ежедневные упражнения, регулярный режим сна, управление эмоциями, нормализация стула и избегание переедания.',
      'Его «Восемь глав» о психическом здоровье предвосхищают когнитивно-поведенческую терапию: у души есть желания, и разум должен их регулировать; характер формируется привычкой; негативные эмоциональные состояния изменяются практикой их противоположностей.',
      'В питании Рамбам был точен: ешьте до 75% насыщения. Начинайте с лёгкой пищи, заканчивайте плотной. Исследования микробиома кишечника XXI века предоставляют механизмы для каждого из этих предписаний.',
      'Рамбам настаивал на том, что врачи должны лечить человека ещё до его болезни. «Мудрый человек должен уделять больше внимания сохранению здоровья, чем исцелению болезней». Это современная превентивная медицина — закодированная в еврейском праве XII века.',
    ]
  },
  'swarga-tradition': {
    author: 'Моше Островский',
    body: [
      'Сварга — санскритское слово, обозначающее область за пределами обычного: возвышение, которое приходит от подлинной интеграции лучшего в каждой традиции, а не просто от их каталогизации. Система HOLOS Сварга — не девятая традиция, добавленная к восьми; это мета-система, которая делает восемь традиций понятными друг для друга.',
      'Каждая из восьми традиций в системе HOLOS — аюрведа, даосская медицина, гиппократовская медицина, режим Рамбама, Канон Авиценны, тибетская медицина, современная доказательная наука и интегративная система HOLOS — завершена в своей собственной логике. Каждая имеет теорию причины, систему диагностики, набор вмешательств и корпус наблюдений, накопленных за века. Ни одна из них не является простым набором советов.',
      'Проблема в том, что каждая традиция использует разный словарный запас, разные категории измерений и разную теорию того, что представляет собой здоровье. Аюрведический практик читает Питту; тибетский врач читает Трипу; западный кардиолог читает СРБ и ЛПНП. Они могут смотреть на одну и ту же физиологическую реальность и описывать её совершенно разными терминами — и в результате упускать выводы друг друга.',
      'Уровень Сварги переводит между этими словарями. Он выявляет структурные соответствия — точки, где традиции независимо сходятся на одном и том же наблюдении, — и использует эти совпадения для повышения диагностической уверенности. Когда аюрведа, тибетская медицина и современная психонейроиммунология все указывают на один и тот же паттерн в вашем профиле, это совпадение — не случайность. Это сигнал.',
      'Практическим результатом является то, что HOLOS называет Синтезирующим отчётом Сварги: персонализированный межтрадиционный анализ, который определяет ваш конституциональный профиль, традиции, чьи системы наиболее точно соответствуют этому профилю, и конкретные вмешательства, которые рекомендует каждая традиция, — ранжированные по межтрадиционному подтверждению и адаптированные для практического применения в современной жизни. Сварга — не цель. Это вид с достаточной высоты, чтобы видеть весь ландшафт.',
    ]
  },
}

// ── Hebrew translations for article bodies ──────────────────────────────────
const ARTICLES_HE: Record<string, { author: string; body: string[] }> = {
  'what-is-integrative-wellness': {
    author: 'משה אוסטרובסקי',
    body: [
      'בריאות אינטגרטיבית אינה חלופה לרפואה מודרנית — היא הרחבתה הטבעית. לאורך רוב ההיסטוריה האנושית, רפואה פירושה הבנת האדם השלם: את מבנהו הגופני, הרגליו, סביבתו וחייו הפנימיים. הצמצום המודרני של הבריאות לסט של ביומרקרים הוא אנומליה היסטורית, והראיות לכך שהוא בלתי מספיק הולכות ומצטברות.',
      'כל ציביליזציה גדולה פיתחה פילוסופיה רפואית מלאה מפני שהרופאים שבילו את חייהם בהתבוננות בבריאות האנושית הבחינו בדבר אחד: אנשים אינם אוסף של איברים עצמאיים. הגוף, הנפש והסביבה מהווים מערכת דינמית, וטיפול בכל חלק בנפרד מהאחרים מניב תוצאות חסרות.',
      'HOLOS מסנתז שמונה פילוסופיות כאלה — איורוודה, רפואה טאואיסטית, רפואה היפוקרטית, משטר הרמב"ם, הקאנון של אבן סינא, רפואה טיבטית, מדע מבוסס-ראיות מודרני ומסגרת HOLOS האינטגרטיבית — לא מפני שהן מסכימות על המנגנונים, אלא מפני שהן מסכימות על ההתבוננות: האורגניזם האנושי מגיב למזון, תנועה, שינה, רגשות, משמעות ויחסים בדרכים מדידות, צפויות וניתנות לפעולה.',
      'פלטפורמת HOLOS אינה מבקשת ממך להאמין באף מסורת. היא מעריכה אותך לפי תשעה מימדים, ואז משתמשת במסגרת התואמת ביותר לפרופיל הקונסטיטוציוני שלך כדי לתעדף את ההתערבויות. מטה-אנליזה משנת 2023 ב-Annals of Internal Medicine גילתה שגישות רב-מודאליות לבריאות עלו על טיפולים חד-מודאליים ב-34% בתוצאות ראשוניות — לא מפני שהמרכיב הבודד היה חזק יותר, אלא מפני שהאינטראקציה ביניהם הצטברה.',
      'בסיס הידע הזה חוקר כל מסורת לעומק: מקורותיה, מסגרת האבחנה שלה ומה שהמדע המודרני אישר לגבי מרשמיה. המטרה היא סינתזה מעשית — הבנת המקומות שבהם המפות העתיקות והמודרניות מסכימות, ושימוש בהסכמה זו לצורך פעולה.',
    ]
  },
  'nine-dimensions': {
    author: 'משה אוסטרובסקי',
    body: [
      'רוב פלטפורמות הבריאות מודדות מימד אחד או שניים — בדרך כלל שעות שינה וספירת צעדים. הערכת HOLOS מתייחסת לתשעה: תזונה, שינה, התאוששות, לחץ, תנועה, בריאות רגשית, איזון חיים, מטרה ואנרגיה. זה אינו מקיף לשם המקיפות — אלא משום שמימדים אלה מתקשרים זה לזה, ובאינטראקציות ביניהם שוכן האות האבחנתי האמיתי.',
      'שקול דפוס נפוץ: מישהו ישן שבע שעות אך מתעורר לא נח. מבט חד-מימדי יאשים את איכות השינה ויורה על היגיינת שינה טובה יותר. מודל HOLOS שואל נוספות: מהו ציון הלחץ? קורטיזול מוגבה מדכא שינה גלית-איטית מבלי להפחית את משך השינה הכולל. האם ציון המטרה נמוך? מחקרים מראים שאנשים ללא תחושת משמעות ברורה חווים עיסוק ליליין גבוה יותר ויקיצה מוקדמת יותר. האם התזונה לקויה? דיסביוזיס מעי קשור כעת לשיבוש ארכיטקטורת השינה דרך ציר המעי-מוח.',
      'אותה תלות הדדית עובדת בכיוון הפוך. ציונות מטרה גבוהים מתאמים עם שינה טובה יותר, בחירות תזונתיות טובות יותר, עקביות גופנית גבוהה יותר והחלמה מהירה יותר ממחלות — לא מפני שהמטרה גורמת לאלה ישירות, אלא מפני שהיא מארגנת התנהגות לאורך כל המימדים. זו הסיבה שבה HOLOS משקל את המלצותיו לפי השפעה בין-מימדית ולא לפי גירעון חד-מימדי.',
      'תשעת המימדים לא נבחרו באקראי. הם ממפים את מה שכל מסורת חוכמה גדולה זיהתה כמשתנים הקובעים בריאות, בצלב-הפניה עם התחומים המופיעים בצורה חזקה ביותר במחקר האריכות: איכות תזונה, ארכיטקטורת שינה, פיזיולוגיית לחץ, מינון תנועה, ויסות רגשי, קשר חברתי וכיוון מטרה. לכל מימד יש מודול הערכה מתאים, והציונות מזינות מנגנון ניקוד בן שש שכבות המייצר סט ממודרג של המלצות.',
      'ניקוד כל תשעת המימדים מאפשר ל-HOLOS לאתר את הדפוסים שגשושי מדד-יחיד מפספסים: האדם שלו שעות שינה מספקות אך שציוני הלחץ והמטרה שלו מצביעים על נטל אלוסטטי נסתר; האדם שלו ציוני תזונה ותנועה מצוינים אך שציוני ההתאוששות והבריאות הרגשית שלו מרמזים שהוא מוציא את הרזרבות שלו. דפוסים מורכבים אלה מנבאים מסלולי בריאות עתידיים בדיוק רב יותר מכל מדד בודד.',
    ]
  },
  'doshas-explained': {
    author: 'משה אוסטרובסקי',
    body: [
      'הדושות — ואטה, פיטה וקאפה — הן העיקרון המארגן הבסיסי של הרפואה האיורוודית. הן אינן סוגי דם, קטגוריות אישיות או תוויות תזונתיות. הן יחסים דינמיים של איכויות יסודיות בתוך האורגניזם האנושי, והבנתן דורשת לוותר על האינסטינקט המערבי לסיווג וללמוד במקומו להתבונן בדפוסים לאורך זמן.',
      'ואטה היא עקרון התנועה והמרחב — אוויר ואתר בתנועה. כשהיא מאוזנת, היא שולטת ביצירתיות, גמישות, חשיבה מהירה והתלהבות. כשהיא מוגברת, היא מייצרת חרדה, נדודי שינה, עור יבש, עצירות, תיאבון לא סדיר ומצב נפשי מפוזר ומוצף. ואטה מוגברת על ידי איכויות קרות, יבשות, קלות ולא סדירות — חורף, נסיעות, לוחות זמנים משתנים, זמן מסך מוגזם וממריצים.',
      'פיטה היא עקרון הטרנספורמציה — אש ומים. פיטה מאוזנת מניעה אינטלקט חד, שאפתנות, מנהיגות ויעילות מטבולית. פיטה מוגברת מייצרת דלקת, פריחות עור, ריפלוקס, עצבנות, פרפקציוניזם ושחיקה. פיטה מוגברת על ידי חום, עצימות ותחרותיות — עבודת יתר, אלכוהול, אוכל חריף, שמש ישירה וסביבות בלחץ גבוה.',
      'קאפה היא עקרון המבנה והלכידות — אדמה ומים. קאפה מאוזנת מספקת יציבות, סיבולת, חמלה וחסינות עמוקה. קאפה מוגברת מתבטאת כעייפות, עלייה במשקל, גודש, מצב רוח נמוך וקושי ביוזמה. קאפה מוגברת על ידי תנאים קרים, כבדים ויושבניים — שינה יתרה, אוכל מתוק ושמן והתנהגויות ממוקדות-נוחות.',
      'לכל אדם יש יחס קונסטיטוציוני של שלוש הדושות — הפרקריטי שלו, שנקבע בלידה — ויחס נוכחי הנקרא ויקריטי, שעוצב על ידי אורח חיים, עונה ואירועי חיים. הערכה איורוודית מזהה את הפער בין הפרקריטי לויקריטי ומורה על התערבויות לשחזור האיזון הקונסטיטוציוני: הנחיות תזונתיות ספציפיות, צמחים רפואיים, סוגי תנועה, לוחות שינה ושגרות יומיות. מודול האיורוודה של HOLOS משתמש בהערכת התשעה מימדים שלך כדי לזהות את פרופיל הדושה הסביר ולייצר המלצות מותאמות אישית.',
    ]
  },
  'rambam-preventive': {
    author: 'משה אוסטרובסקי',
    body: [
      'רבי משה בן מימון (1138–1204) — הרמב"ם למסורת היהודית, מיימונידס למערב — היה רופא החצר של סולטן מצרים, פילוסוף שסינתז את אריסטו עם התורה, ומחבר טקסטים רפואיים שחזו את הרפואה המניעתית המודרנית בדיוק שעדיין מפתיע קלינאים הנתקלים בהם.',
      'משטר הבריאות שלו, שנכתב עבור בנו החולה של הסולטן, מזהה שישה גורמים קובעי בריאות שקרא להם "הלא-טבעיים": אוויר וסביבה; מזון ושתייה; שינה וערות; תנועה ומנוחה; הפרשת פסולת; והמצבים הרגשיים של הנשמה. זה אינו מיסטיקה — זוהי מסגרת אמפירית שנבנתה מעשרות שנות התבוננות קלינית אצל אלפי מטופלים.',
      'בנוגע לתזונה, הרמב"ם היה מדויק: אכול עד 75% שביעות — "האדם תמיד צריך להיות מעט רעב." התחל את הארוחה במזון קל, שניתן לעיכול בקלות; סיים במאכלים כבדים יותר. תעדף יבול עונתי. מרשמים אלה ממפים על מחקרים עכשוויים על הגבלה קלורית, רצף עיכולי והפחתת סיכון מחלות כרוניות דרך דפוס תזונה ולא נוטריינטים בודדים.',
      'בנוגע לתנועה: "האדם צריך להתאמן כל בוקר עד שהגוף יתחמם." הוא ציין כי תנועה בלתי מספקת היא הגורם לרוב המחלות הכרוניות — "הגוף נהיה כבד ומסורבל וכוחותיו נחלשים." עקומת המינון-תגובה המודרנית לפעילות גופנית ותמותה מכל סיבה מאשרת זאת בפרטים כמותיים.',
      'בנוגע לבריאות הרגשית, הרמב"ם היה נחרץ: "רופא שאינו מטפל בנשמה אינו יכול לטפל בגוף." הוא זיהה אבל, זעם וחרדה כרונית כמזיקים פיזיולוגית — טענה הנתמכת כעת על ידי עשרות שנים של מחקר פסיכונוירואימונולוגי המקשר מצבים רגשיים לקורטיזול, פרופילי ציטוקינים ותפקוד חיסוני. מרשמיו לרווחה רגשית — עבודה משמעותית, ידידות מתונה, עיסוק אינטלקטואלי וטיפוח שיווי-נפש — נותרים בין ההתערבויות הנתמכות ביותר בבסיס הראיות.',
    ]
  },
  'qi-cultivation': {
    author: 'משה אוסטרובסקי',
    body: [
      'ההתנגדות הספקנית לרפואה הטאואיסטית בדרך כלל נשמעת כך: "צ\'י לא קיים. לא ניתן למדוד אותו. לכן המערכת היא טרום-מדעית." התנגדות זו ראויה להתייחסות רצינית — ואז לבחינה מדוקדקת, כי היא מזהה בצורה שגויה מה הרפואה הטאואיסטית טוענת בפועל.',
      'צ\'י אינו חומר ניתן לגילוי תחת מיקרוסקופ. הוא מושג פונקציונלי — הפעילות הרגולטורית העצמית של מערכות חיות. כאשר רופא טאואיסטי אומר שהצ\'י שלך קפוא, הוא מתאר מצב פונקציונלי: מחזור הדם עצלני, העיכול איטי, ניקוז הלימפה גדוש, טונוס מערכת העצבים מדוכא. אלה תופעות מדידות. השפה שונה מהשפה הביורפואית; ההתבוננות אינה.',
      'בסיס הראיות לתרגולים שמקורם בטאואיזם הוא כעת מהותי. מטה-אנליזה משנת 2017 של 35 ניסויים אקראיים מבוקרים מצאה שצ\'יגונג הפחית משמעותית חרדה, דיכאון וסמנים ביולוגיים של דלקת — אפקטים דומים לאלה של פעילות אירובית בעצימות נמוכה יותר. סקירות שיטתיות מרובות מאשרות את עליונות הטאי-צ\'י על פני אימוני שיווי-משקל קונבנציונליים למניעת נפילות בקרב מבוגרים. דיקור מראה יעילות עקבית לכאב כרוני, מניעת מיגרנה ובחילות הנגרמות מכימותרפיה.',
      'מסגרת חמשת היסודות — עץ, אש, אדמה, מתכת, מים — ממפה מערכות איברים, מצבים רגשיים, עונות ונטיות תזונתיות על מודל מחזורי של ייצור ושליטה הדדית. כבד (עץ) מזין לב (אש); לב מזין טחול (אדמה); טחול מזין ריאות (מתכת); ריאות מזינות כליות (מים); כליות מזינות כבד. שיבוש בכל יסוד מתפשט דרך המחזור — מפה מערכתית של תלות פיזיולוגית הדדית.',
      'עבור מתרגל HOLOS, טיפוח הצ\'י פירושו תשומת לב לזרימת אנרגיית החיים דרך תרגול יומי עקבי: צ\'יגונג בוקר, התאמה תזונתית עונתית, ויסות רגשי וטיפוח שֶׁן — רוח ומודעות מכוונת-מטרה. תרגולים אלה שומרים על התנאים שבהם האורגניזם מרפא את עצמו. המטרה אינה מצב אקזוטי אלא קו בסיס של ויסות עצמי משולב.',
    ]
  },
  'sleep-traditions': {
    author: 'משה אוסטרובסקי',
    body: [
      'כל מסורת רפואית גדולה פיתחה תיאוריה מתוחכמת של שינה, וכאשר משווים אותן בין תרבויות ומאות שנים, הקונוורגנציות מרשימות יותר מהשונויות. ללא גשושי שינה, EEG או כרונוביולוגיה, רופאים בארבע יבשות הגיעו למסקנות כמעט זהות לגבי מתי לישון, למשך כמה זמן ובאילו תנאים.',
      'האיורוודה מורה לישון בזמן הקאפה של הלילה — בערך מ-10 בלילה עד 2 לפנות בוקר — כאשר יסוד האדמה-מים תומך בהתאוששות האנבולית העמוקה ביותר. קימה לפני 6 בבוקר בתקופת הואטה מיישרת את מצב הערות עם בהירות מחשבתית וקלות. מחקר כרונוביולוגי מאשר כי יישור צירקדי — שינה כשהמלטונין בשיאו, קימה עם האור המוקדם — משפר את משך שינת הגלים-האיטיים ב-20-30% ללא קשר לשעות השינה הכוללות.',
      'הרמב"ם היה מפורש: "מבין הדברים המזיקים לגוף ומקצרים את החיים: ערות בלילה וקיצור השינה." הוא הורה לישון תחילה על הצד הימני, ואז לפנות לשמאל — המלצה שמחקר גסטרואינטסטינלי מודרני מאשר חלקית. שינה על הצד הימין מפחיתה ריפלוקס; שינה על הצד השמאלי משפרת את ניקוז הלימפה של הצינור החזי ועשויה לשפר את תפוקת הלב.',
      'הרפואה הטיבטית מתארת שינה כזמן שבו לונג — הומור הרוח המנהל את הפעילות הנפשית — שוקע, והערוצים העדינים של הגוף עוברים תיקון. זה ממפה על השערת הגלימפה שאושרה ב-2013: במהלך שינה עמוקה, נוזל עמוד השדרה שוטף פסולת מטבולית מהמוח בנפח גדול ב-60% מאשר בזמן ערות. איכות שינה לקויה היא כיום גורם הסיכון הניתן לשינוי הנוכחי ביותר למחלת אלצהיימר.',
      'הקונצנזוס הרב-מסורתי: ישן בזמנים עקביים המיושרים עם מחזורי האור הטבעיים; שמור על סביבת שינה קרירה, חשוכה ושקטה; הימנע מגירוי בשעה האחרונה לפני השינה; וראה שינה כשיקום ביולוגי פעיל ולא כחוסר הכרה פאסיבי. מימד השינה של HOLOS מנקד יישור צירקדי, הצטברות חוב שינה, איכות סובייקטיבית ותוצאות תפקודיות של יום — ומספק תמונה מלאה ולא מדד בודד.',
    ]
  },
  'stress-dimension': {
    author: 'משה אוסטרובסקי',
    body: [
      'עומס אלוסטטי הוא העלות הפיזיולוגית המצטברת של הסתגלות כרונית — מה שקורה לגוף כאשר תגובת הלחץ, שנועדה לאיומים חריפים, מופעלת באופן רציף על פני חודשים ושנים. המונח הוצג על ידי ברוס מקיוון ב-1993, אך ההתבוננות שהוא מכנה עתיקה: כל מסורת חוכמה זיהתה הפרעה רגשית מתמשכת כגורם עיקרי למחלות כרוניות.',
      'המתווכים העיקריים הם קורטיזול, אדרנלין וציטוקינים פרו-דלקתיים. פרצי קורטיזול קצרים מחדדים קוגניציה, מגייסים אנרגיה ומדכאים כאב. עלייה כרונית בקורטיזול עושה את ההפך: היא מדכאת נוירוגנזה היפוקמפלית, פוגעת בזיכרון ובלמידה; מסדירה לא נכון את חילוף החומרים של גלוקוז, מניעה עמידות לאינסולין; משבשת את הקצב הצירקדי, פוגעת בארכיטקטורת השינה; ומאיצה הזדקנות תאית דרך קיצור טלומרים. זו הסיבה שלחץ פסיכולוגי כרוני מנבא מחלות לב-וכלי-דם, הפרעות אוטואימוניות, תסמונת מטבולית ודיכאון.',
      'רוב התערבויות הלחץ נכשלות מפני שהן מתייחסות לתחושה הסובייקטיבית של לחץ ולא לחוב הביולוגי המצטבר מתחתיה. תרגילי נשימה ומיינדפולנס מפחיתים עוררות חריפה. הם אינם מנקים את העומס האלוסטטי שנבנה על פני חודשים של הפעלה כרונית. רק הפחתה מתמשכת בגורמי העומס האלוסטטיים — שינה משופרת, דלקת מופחתת, עומס עבודה ניתן לניהול, בטיחות יחסית, שחזור תחושת משמעות — בשילוב עם תרגולי התאוששות שיטתיים יכולה לעשות זאת.',
      'האיורוודה מזהה מחלה הנגרמת מלחץ כהחמרת ואטה ומורה על עיגון: מזון חם ושמני; תנועה ריתמית איטית; שגרה יומית קבועה; וצמחי אדפטוגן כולל אשוואגנדהה, שניסוי אקראי מבוקר עדכני מצא שהיא מפחיתה קורטיזול בסרום ב-27.9% לאחר 60 יום. צ\'יגונג וטאי-צ\'י טאואיסטיים משחזרים זרימת צ\'י חלקה ומרגיעים את השֶׁן. הרמב"ם הורה מנוחה, ידידות, עבודה משמעותית ומתינות כתנאים מבניים לבריאות פסיכולוגית. התרגול הטיבטי עובד ישירות עם דפוסי ההימנעות וההגברה שהופכים לחץ לסבל.',
      'מימד הלחץ של HOLOS אינו שואל רק עד כמה אתה מרגיש לחץ. הוא מעריך איכות שינה, מהירות התאוששות, יכולת ויסות רגשי, נוכחות משמעות ותמיכה חברתית — ומספק הערכה כוללת של נטל אלוסטטי. המלצות נשאבות מהמסורת שערכת הכלים שלה מתייחסת לגורמי השורש בצורה הישירה ביותר, מדורגות לפי השפעה סבירה בהינתן פרופיל תשעת המימדים הכולל שלך.',
    ]
  },
  'avicenna-canon': {
    author: 'משה אוסטרובסקי',
    body: [
      'אבן סינא (980–1037) — הידוע במערב כאביצ\'נה — היה הרופא המשפיע ביותר בהיסטוריה של הרפואה. הקאנון שלו (אל-קאנון פי ל-טיבּ) היה ספר הלימוד הרפואי הסטנדרטי באוניברסיטאות האירופיות מהמאה ה-12 עד ה-17 — קדנציה שאף טקסט רפואי אחר לא התקרב אליה. הוא סינתז את הרפואה היוונית, הפרסית והאיסלאמית למסגרת שהשרידה את כל מסורת מרכיביה.',
      'הקאנון מזהה שש קטגוריות של גורמים הקובעים בריאות — "שישת הדברים הכרחיים": אוויר וסביבה; מזון ושתייה; תנועה גופנית ומנוחה; תנועה פסיכית ומנוחה (מצבים רגשיים); שינה וערות; ושימור והפרשה. אלה אינם שישה מרשמים נפרדים. הם שישה מימדים של מערכת משולבת אחת, ושיבוש בכל אחד מהם מתפשט לאחרים — תובנה ברמת מערכות שהרפואה הביורפואית רק עכשיו מפרמלת.',
      'בנוגע לאיכות האוויר, ההתבוננויות של אבן סינא היו נבואיות: הוא תיאר כיצד אוויר עומד וחללים סגורים גרמו למחלות, המליץ על אוורור בבתי חולים ועיצב נהלי הסגר למחלות מדבקות — אלף שנה לפני שתיאורית הנבט סיפקה את המנגנון. האפידמיולוגיה הסביבתית המודרנית מזהה באופן עקבי את איכות האוויר כאחד מגורמי הסיכון הסביבתיים החזקים ביותר לנטל מחלות כרוניות.',
      'בנוגע למזון, הקאנון מבחין בין מזונות לפי השפעתם על המזג הגופני — התכונות המחממות, המקררות, המרטיבות או המייבשות שלהם — ומורה על התאמות תזונתיות לשחזור האיזון הקונסטיטוציוני. התובנה המבנית — שמרשמים תזונתיים צריכים להיות מותאמים אישית לקונסטיטוציה ולמצב הבריאות הנוכחי, לא להיות מוכללים — היא בדיוק מה שמחקר התזונה המדויקת מגלה מחדש כיום דרך גנומיקה תזונתית ומדע המיקרוביום.',
      'בנוגע למצבים רגשיים, אבן סינא היה ישיר: "שמחה מרחיבה את הרוח החיונית; אבל מכווצת אותה; כעס מחמם את הדם; פחד מקרר אותו." מרשמי הקאנון לרווחה פסיכולוגית — עבודה משמעותית, סביבות יפות, ידידות קרובה, מתינות תשוקה ועיסוק אינטלקטואלי — חוזים את ההתערבויות המבוססות-ראיות המודרניות למחלות כרוניות בכמעט אלף שנה. HOLOS משתמש במסגרת אבן סינא כאחד משמונת העדשות שלו לפרשנות נתוני ההערכה.',
    ]
  },
  'tibetan-three-humours': {
    author: 'משה אוסטרובסקי',
    body: [
      'הרפואה הטיבטית (סוֹוָה ריגפָּה, "ידע הריפוי") היא אחת ממערכות הרפואה המלאות העתיקות ביותר בעולם, שפותחה על פני שני אלפי שנים בצומת האיורוודה ההודית, הרפואה הסינית ומסורת הריפוי הילידית הבּוֹן. המודל הבסיסי שלה מזהה שלושה הומורים — לונג, טריפה ובֶּקֶן — ככוחות הראשוניים הקובעים בריאות, ומחלה כשיבוש האיזון הדינמי ביניהם.',
      'לונג (מבוטא "לונג") הוא עקרון הרוח: הוא שולט בכל תנועה, הן גופנית — נשימה, דחפים עצביים, מחזור דם — והן נפשית — מחשבה, כוונה ורגש. לונג מאוזן מייצר חיוניות, בהירות, התלהבות ואינטלקט יצירתי. לונג מופרע מתבטא כחרדה, נדודי שינה, רעד, עור יבש, טינטון ומצב נפשי מפוזר ומוצף — ממפה בקלות על הפרעות טווח החרדה שהפסיכיאטריה המערבית מתארת ועל מה שהאיורוודה קוראת להחמרת ואטה.',
      'טריפה — מרה — הוא עקרון האש: טרנספורמציה, עיכול מזון וחוויה, תפיסה חדה ויכולת הבחנה וקבלת החלטות. טריפה מאוזנת מייצרת אינטלקט, אומץ ויעילות מטבולית. טריפה מופרעת מייצרת דלקת, מחלת עור, חום, עצבנות, פרפקציוניזם ואי-שביעות רצון כרונית של בלתי-שבעות. זה מתאם עם חוסר איזון פיטה באיורוודה ו, במינוח ביורפואי, עם המצב הדלקתי כרוני-חמור הנמוך-ברמה המוכר כיום כגורם עיקרי למחלות לב-וכלי-דם, סוכרת ודיכאון.',
      'בקן — ליחה — הוא עקרון המים-האדמה: מבנה, לחות, לכידות ויציבות. בקן מאוזן מספק סיבולת, חמלה, סבלנות וחסינות עמוקה. בקן מופרע מתבטא כהשמנה, עייפות, שינה יתרה, גודש ומצב דכאוני של עוררות נמוכה. זה מתאים לחוסר איזון קאפה באיורוודה ו, במינוח מודרני, לאשכול תסמונת המטבולי.',
      'מה שמייחד את הרפואה הטיבטית הוא מורכבות האינטגרציה הפסיכופיזית שלה. שלוש הנייפה אינן קטגוריות גופניות בלבד ולא פסיכולוגיות בלבד — הן עקרונות פסיכופיזיים. הפרעת לונג היא בו-זמנית הפרעה של מערכת העצבים ואקזיסטנציאלית: הנפש הנסערת והגוף הנרגש מובנים כתופעה אחת עם קשת טיפול אחת. הפרוטוקול מתייחס בהתאם לשני הרמות: שינויים תזונתיים, תכשירי צמחים ספציפיים, טיפולים חיצוניים ותרגולים קונטמפלטיביים — בפרט אלה העובדים עם איכות התנועה הנפשית עצמה. אינטגרציה כפולה זו של התערבות סומטית ופסיכולוגית היא בדיוק לאן הרפואה המבוססת-ראיות נעה כעת.',
    ]
  },
  'integrative-wellness-science': {
    author: 'משה אוסטרובסקי',
    body: [
      'בריאות אינטגרטיבית אינה חלופה לרפואה מבוססת-ראיות — היא הרחבתה הלוגית. ביולוגיה מערכתית, פסיכונוירואימונולוגיה וכרונוביולוגיה כולן מצביעות על אותה מסקנה: הגוף פועל כאינטלקט אחד, וטיפול בו בבידוד מניב תוצאות מקוטעות.',
      'מטה-אנליזה מכוננת משנת 2023 ב-Annals of Internal Medicine סקרה 187 מחקרים על התערבויות גוף-נפש ומצאה כי גישות רב-מודאליות עלו על טיפולים חד-מודאליים ב-34% בתוצאות ראשוניות — לא מפני שמרכיב כלשהו היה חזק יותר, אלא מפני שהאינטראקציות ביניהם הצטברו.',
      'הערכת HOLOS לוכדת מורכבות זו על ידי מיפוי תשעה מימדים תלויים זה בזה: תזונה, שינה, התאוששות, לחץ, תנועה, בריאות רגשית, איזון חיים, מטרה ואנרגיה. אלה אינם ממגורות נפרדות. חסך שינה מעלה קורטיזול, שפוגע בחילוף החומרים של גלוקוז, שמשבש את הקצב הצירקדי, שמחמיר שינה. המנגנון ממפה לולאות משוב אלה — כדי שהמלצותיך יתייחסו לגורמי שורש, לא לסימפטומים שטחיים.',
      'ממסורות החוכמה, השקפה מערכתית זו אינה חדשה. האיורוודה מתארת פרקריטי כשיווי-משקל דינמי בין שלוש דושות. הרפואה הטאואיסטית מדברת על האינטרפליי המתמשך של צ\'י, דם וג\'ינג. הרמב"ם התעקש שתזונה, אוויר, תנועה, שינה, רגשות ומטרה משפיעים זה על זה.',
      'מה ש-HOLOS תורם הוא היכולת לכמת היכן המערכת האישית שלך נמצאת מחוץ לשיווי-משקל — ולהורות על התערבויות מדורגות לפי השפעה סבירה וקושי מעשי.',
    ]
  },
  'sleep-recovery-ancient': {
    author: 'משה אוסטרובסקי',
    body: [
      'מערכת הרפואה הטיבטית מתארת שינה כזמן שבו הומור הרוח (לונג) שוקע והערוצים העדינים של הגוף עוברים תיקון. זה ממפה בדיוק מרשים על השערת הגלימפה: במהלך שינה עמוקה, נוזל עמוד השדרה שוטף פסולת מטבולית מהמוח בנפח גדול ב-60% מאשר בזמן ערות.',
      'האיורוודה מורה לישון לפני 22:00 ולקום לפני 6:00 — זמן הקאפה של הלילה, כאשר יסוד האדמה-מים תומך בהתאוששות האנבולית העמוקה. מחקר כרונוביולוגי מאשר שיישור צירקדי משפר את משך שינת הגלים-האיטיים ב-20-30%, ללא קשר לזמן השינה הכולל.',
      'הרמב"ם היה מפורש: "מבין הדברים המזיקים לגוף ומקצרים את החיים: ערות בלילה וקיצור השינה." הוא הורה לישון תחילה על הצד הימני, ואז לפנות לשמאלי. שינה על הצד השמאלי משפרת ניקוז לימפה ומפחיתה ריפלוקס חומצה — הפיזיולוגיה שונה מהתפיסה שלו מהמאה ה-12, אך ההמלצה עומדת.',
      'המסורת הטאואיסטית מדגישה וּ-וֵיי — אי-עשייה מאמצת — כתנאי מוקדם לשיקום. שינה אינה פאסיבית; היא מצב הריפוי הפעיל ביותר של הגוף. הבנה מודרנית של ארכיטקטורת השינה (מחזוריות N1/N2/N3/REM כל ~90 דקות) מצדיקה זאת: כל שלב מבצע פונקציות ייחודיות.',
      'במימד השינה של HOLOS, הציון שלך משקף לא רק שעות אלא יישור צירקדי, חוב שינה, איכות סובייקטיבית ותוצאות תפקודיות של יום.',
    ]
  },
  'nutrition-frameworks': {
    author: 'משה אוסטרובסקי',
    body: [
      'לשאלה "מה לאכול?" יש תשובה שונה בהתאם למסורת שאתה שואל — אך התשובות חולקות יותר מבנה ממה שנראה בתחילה. כל שמונת המסגרות מזהות מזון לא רק כדלק מקרו-נוטריינטים, אלא כמכשיר לאיזון קונסטיטוציוני, הסתגלות עונתית ואינדיבידואליות מטבולית.',
      'מבוסס-ראיות: הקונצנזוס החזק ביותר תומך בתזונה עשירה בצמחים שלמים עם חלבון מספיק (1.2-2 גרם/ק"ג מסת גוף רזה), שומני אומגה-3 ומגוון פוליפנולים. עקירת מזון מעובד מסבירה את רוב הפחתת סיכון המחלות הכרוניות במחקרי עוקבה גדולים.',
      'הרמב"ם: מורה לאכול לפי סדר עיכולי — מזון קל תחילה; צפוף בסוף. הגבל כמות ל-75% שביעות. תעדף תוצרת עונתית, מקומית. "האדם לא יאכל אלא אם כן הוא רעב, ולא ישתה אלא אם כן הוא צמא."',
      'איורוודה: מתאימה גוּנות מזון לחוסר איזון הדושה. סוגי ואטה זקוקים למזון חם, שמני, מעגן; סוגי פיטה זקוקים למזון מקרר; סוגי קאפה זקוקים למזון קל, חריף, יבש. אגני (אש עיכולית) הוא המשתנה המרכזי — כל המלצות המזון כפופות למצבו הנוכחי.',
      'מסגרת HOLOS סוורגה שוקלת המלצות תזונתיות לפי חוסרי האיזון המדודים שלך בכל המסורות, ומייצרת ארכיטיפ תזונתי מותאם אישית — לא דיאטה אחת, אלא מסגרת החלטה לכל ארוחה.',
    ]
  },
  'stress-resilience-traditions': {
    author: 'משה אוסטרובסקי',
    body: [
      'ציר ה-HPA מייצר קורטיזול בתגובה לאיום נתפס — תגובה מותאמת לסכנה חריפה, לא ללחצים כרוניים-קלים. הפעלה מורחבת של ה-HPA מדכאת תפקוד חיסוני, פוגעת בזיכרון, משבשת את הקצב הצירקדי ומאיצה הזדקנות תאית דרך קיצור טלומרים.',
      'האיורוודה מכנה זאת החמרת ואטה: יסוד הרוח-האוויר הופך מוגזם, מסדיר לא נכון את מערכת העצבים. התרופה היא עיגון: עיסוי שמן אביינגה, מזון חם כבד, תנועה איטית, אשוואגנדהה. מחקרים מודרניים מראים שאשוואגנדהה מפחיתה קורטיזול ב-27.9% בניסויים אקראיים מבוקרים.',
      'המסורת הטאואיסטית פיתחה צ\'יגונג וטאי-צ\'י ככלים לוויסות שן (רוח) ושקיעת צ\'י. מטה-אנליזה משנת 2017 של 35 ניסויים אקראיים מבוקרים מצאה כי תרגול צ\'יגונג הפחית משמעותית חרדה, דיכאון וסמנים ביולוגיים של דלקת — אפקטים דומים לפעילות אירובית בעצימות נמוכה יותר.',
      'הבודהיזם הטיבטי תרם את טונגלן ואת ההכרה בסבל כניתן לעבודה. זה אינו אופטימיות רעילה — זוהי התבוננות אמפירית שהימנעות מגבירה לחץ בעוד שמעורבות מעכלת אותו. טיפולים מבוססי-חשיפה מודרניים זהים מבחינה מכניסטית.',
      'במימד הלחץ של HOLOS, המלצות נשאבות מהמסורת התואמת ביותר למצבך הנוכחי — עבודת נשימה, צמחי אדפטוגן, צ\'יגונג או תרגולי הרהור מובנים.',
    ]
  },
  'movement-medicine': {
    author: 'משה אוסטרובסקי',
    body: [
      'מטה-אנליזה משנת 2022 מצאה כי פעילות גופנית מפחיתה סיכון תמותה מכל סיבה ב-30-35%, אירועים קרדיווסקולריים ב-40%, שכיחות דיכאון ב-33% ודעיכה קוגניטיבית ב-38%. אפקטים אלה תקפים בכל קבוצות הגיל ואינם דורשים ציוד או מתקן.',
      'אך תנועה אינה מונוליתית. האיורוודה מבחינה בין תנועת ברמהנה (מחזקת) לבין לנגהנה (מקילה) — מוּרות לפי דושה, עונה ומצב אנרגיה. אדם עם ואטה דומיננטי נהנה מתנועה איטית, ריתמית, מעגנת — לא אינטרוולים בעצימות גבוהה, שמרוקנים עוד יותר את מערכת העצבים.',
      'היפוקרטס כתב: "ההליכה היא הרפואה הטובה ביותר של האדם" — והאפידמיולוגיה המודרנית מאשרת זאת לחלוטין. עקומת המינון-תגובה להליכה תלולה בין 0 ל-7,500 צעדים ליום ומתיישרת לאחר מכן. יתרונות התמותה של 7,500 צעדים יומיים כמעט זהים ל-12,000.',
      'המסורת הטאואיסטית הבחינה בין אי-מאמץ מאמץ. טאי-צ\'י וצ\'יגונג הם אימון נוירומוטורי מדויק. מחקרים מראים שהם משפרים שיווי-משקל, פרופריוספציה ומניעת נפילות בקרב מבוגרים בצורה יעילה כמו אימוני שיווי-משקל קונבנציונליים.',
      'מימד התנועה של HOLOS מנקד תדירות, התפלגות עצימות, סמני כוח תפקודי ואיכות תנועה — מותאמים לפרופיל הקונסטיטוציוני שלך ולמצב האנרגיה הנוכחי שלך.',
    ]
  },
  'emotional-intelligence-holos': {
    author: 'משה אוסטרובסקי',
    body: [
      'תיאורית הפוליוואגל מספקת בסיס פיזיולוגי למה שמסורות התבוננו זה מכבר: מצב מערכת העצבים — ספציפית טונוס הוואגוס — קובע את יכולתנו למעורבות חברתית, למידה, יצירתיות וריפוי גופני.',
      'האיורוודה מזהה סאטווה (בהירות נפשית ושיווי-נפש) כמטרת כל תרגולי הבריאות — שמושגת לא על ידי דיכוי רגשות, אלא על ידי טיהור הנפש מראג\'אס (התסיסה) ותמאס (האינרציה) דרך יוגה, מדיטציה, מזון בריא וחשיפה לטבע.',
      'המסורת הרפואית הטיבטית פיתחה את המפה הגרנולארית ביותר של מצבים נפשיים-רגשיים. "חמשת הרעלים" מובנים כגורמים ראשוניים של מחלה — דפוסי הפעלה כרוניים שמסדירים לא נכון את הפיזיולוגיה. ניגודי-הרעל שלהם מטופחים דרך תרגולי מדיטציה ספציפיים המותאמים לסוג קונסטיטוציונלי.',
      'היפוקרטס הבין שנוכחות הרופא וקשר רגשי היו טיפוליים בפני עצמם. יחסים חמים ואמינים מפחיתים קורטיזול, מגדילים אוקסיטוצין ומשפרים את הדבקות בטיפול.',
      'במימד הרגשי של HOLOS, המאמן האינטגרטיבי משמש כשותף רפלקטיבי המאומן בפרספקטיבות בריאות אינטגרטיביות. כאשר תמיכה קלינית מתאימה, המאמן אומר זאת ישירות.',
    ]
  },
  'purpose-longevity': {
    author: 'משה אוסטרובסקי',
    body: [
      'פרויקט זיכרון והזדקנות של Rush עקב אחרי 1,500 מבוגרים מבוגרים במשך שבע שנים ומצא שלאלה שהייתה להם תחושת מטרה גבוהה היה סיכון תמותה נמוך פי 2.5 מכל סיבה — ללא קשר למצב בריאות גופנית, מצב דיכאון או גורמים סוציואקונומיים. מטרה חזתה שרידה ביעילות רבה יותר מהפסקת עישון.',
      'המנגנון: מטרה מארגנת תשומת לב, מעכבת רומינציה ומפעילה את מערכת הגישה ההתנהגותית. אנשים עם מטרה ברורה ישנים טוב יותר, מתעמלים בצורה עקבית יותר, מחפשים טיפול רפואי באופן פרואקטיבי ומחלימים מהר יותר ממחלות. מטרה אינה התוצאה של בריאות — היא מניע שלה.',
      'התרבות היפנית קידדה זאת באיקיגאי — הצומת של מה שאתה אוהב, מה שאתה טוב בו, מה העולם צריך ומה ניתן לשלם לך עליו. אוקינאווה, ביתם של חלק מאוכלוסיות ארוכות החיים בעולם, אין לה מושג של פרישה.',
      'מימד המטרה של HOLOS מעריך בהירות ערכים, תחושת תרומה, מעורבות מול ניכור מפעילויות יומיות וכיוון זמני. הוא המימד הניואנסי ביותר לניקוד והמשפיע ביותר לשינוי.',
    ]
  },
  'rambam-modern-wellness': {
    author: 'משה אוסטרובסקי',
    body: [
      'הרמב"ם כתב את "משטר הבריאות" לבנו של הסולטן — שסבל מדיכאון ועצירות. המרשמים מודרניים באופן מרשים: פעילות גופנית מתונה יומית, לוח שינה קבוע, ניהול רגשי, סדירות מעיים והימנעות מאכילת יתר.',
      '"שמונת הפרקים" שלו על בריאות הנפש מקדימים טיפול קוגניטיבי-התנהגותי: לנשמה יש תיאבונות והשכל חייב לווסת אותם; אופי נוצר על ידי הרגל; מצבים רגשיים שליליים משתנים על ידי תרגול ניגודיהם.',
      'בתזונה, הרמב"ם היה מדויק: אכול עד 75% שביעות. התחל עם מזון קל, סיים עם צפוף. מחקר המיקרוביום של המעי של המאה ה-21 מספק מנגנונים לכל אחד ממרשמים אלה.',
      'הרמב"ם התעקש שרופאים צריכים לטפל באדם לפני שהוא חולה. "האדם החכם צריך לתת תשומת לב רבה יותר לשמירה על בריאותו מלריפוי מחלות." זוהי רפואה מניעתית מודרנית — מקודדת בחוק היהודי של המאה ה-12.',
    ]
  },
  'swarga-tradition': {
    author: 'משה אוסטרובסקי',
    body: [
      'סוורגה היא מילה סנסקריטית למרחב שמעבר לרגיל — הרוממות הבאה מאינטגרציה אמיתית של הטוב ביותר בכל מסורת ולא רק מקיטלוגו. מסגרת HOLOS סוורגה אינה מסורת תשיעית שנוספת לשמונה; היא המטא-מסגרת שהופכת את שמונת המסורות קריאות זו לזו.',
      'כל אחת מהשמונה מסורות במערכת HOLOS — איורוודה, רפואה טאואיסטית, רפואה היפוקרטית, משטר הרמב"ם, הקאנון של אבן סינא, רפואה טיבטית, מדע מבוסס-ראיות מודרני ומערכת HOLOS האינטגרטיבית — שלמה בלוגיקה הפנימית שלה. לכל אחת יש תיאוריה של סיבה, מערכת אבחנה, סט התערבויות וגוף של התבוננות מצטברת על פני מאות שנים. אף אחת אינה רק אוסף של טיפים.',
      'האתגר הוא שכל מסורת משתמשת באוצר מילים שונה, קטגוריות מדידה שונות ותיאוריה שונה של מהי בריאות. רופא איורוודי קורא פיטה; רופא טיבטי קורא טריפה; קרדיולוג מערבי קורא CRP ו-LDL. הם עשויים להסתכל על אותה מציאות פיזיולוגית ולתאר אותה במונחים שונים לחלוטין — ולהחמיץ בכך את ממצאי זה.',
      'שכבת הסוורגה מתרגמת בין אוצרות מילים אלה. היא מזהה את ההתאמות המבניות — המקומות שבהם מסורות מתכנסות באופן עצמאי על אותה התבוננות — ומשתמשת בהתכנסויות אלה כדי להגביר ביטחון אבחנתי. כאשר איורוודה, רפואה טיבטית ופסיכונוירואימונולוגיה מודרנית כולן מצביעות על אותו דפוס בפרופיל שלך, התכנסות זו אינה מקרית. היא אות.',
      'התפוקה המעשית היא מה ש-HOLOS מכנה דוח סינתזת הסוורגה: ניתוח בין-מסורתי מותאם אישית המזהה את הפרופיל הקונסטיטוציוני שלך, את המסורות שהמסגרות שלהן מתאימות במדויק ביותר לפרופיל זה, ואת ההתערבויות הספציפיות שכל מסורת ממליצה עליהן — מדורגות לפי אישוש בין-מסורתי ומותאמות ליישום מעשי בחיים מודרניים. סוורגה אינה המטרה. זה הנוף מגבוה מספיק כדי לראות את הטרריין כולו.',
    ]
  },
}

// ── German translations for article bodies ──────────────────────────────────
const ARTICLES_DE: Record<string, { author: string; body: string[] }> = {
  'what-is-integrative-wellness': {
    author: 'Moshe Ostrovsky',
    body: [
      'Integrative Wellness ist keine Alternative zur konventionellen Medizin — sie ist ihre natürliche Erweiterung. Für den größten Teil der Menschheitsgeschichte bedeutete Medizin das Verstehen des ganzen Menschen: seiner Konstitution, seiner Gewohnheiten, seiner Umgebung und seines inneren Lebens. Die moderne Reduktion von Gesundheit auf einen Satz von Biomarkern ist historisch anomal, und die Belege dafür, dass sie unzureichend ist, häufen sich.',
      'Jede große Zivilisation entwickelte eine vollständige medizinische Philosophie, weil die Praktiker, die ihr Leben damit verbrachten, die menschliche Gesundheit zu beobachten, dasselbe bemerkten: Menschen sind keine Sammlungen unabhängiger Organe. Körper, Geist und Umwelt bilden ein dynamisches System, und die Behandlung eines Teils isoliert von den anderen produziert fragmentierte Ergebnisse.',
      'HOLOS synthetisiert acht solcher Philosophien — Ayurveda, daoistische Medizin, hippokratische Medizin, das Regimen des Rambam, Avicennas Canon, tibetische Medizin, moderne evidenzbasierte Wissenschaft und das HOLOS-Integrationsrahmenwerk — nicht weil sie über Mechanismen übereinstimmen, sondern weil sie über Beobachtungen übereinstimmen: Der menschliche Organismus reagiert auf Ernährung, Bewegung, Schlaf, Emotionen, Bedeutung und Beziehungen in messbarer, vorhersehbarer und handlungsrelevanter Weise.',
      'Die HOLOS-Plattform verlangt nicht, dass Sie an eine Tradition glauben. Sie bewertet Sie über neun Dimensionen und verwendet dann das mit Ihrem konstitutionellen Profil kompatibleste Framework, um Ihre Interventionen zu priorisieren. Eine Metaanalyse aus dem Jahr 2023 in den Annals of Internal Medicine ergab, dass multimodale Wellness-Ansätze einmodale Behandlungen bei Primärergebnissen um 34% übertrafen — nicht weil eine einzelne Komponente stärker war, sondern weil ihre Interaktionen sich verstärkten.',
      'Diese Wissensdatenbank erkundet jede Tradition in der Tiefe: ihre Ursprünge, ihr Diagnosesystem und was die moderne Forschung über ihre Empfehlungen bestätigt hat. Das Ziel ist praktische Synthese — zu verstehen, wo alte und moderne Karten übereinstimmen, und diese Übereinstimmung zur Handlung zu nutzen.',
    ]
  },
  'nine-dimensions': {
    author: 'Moshe Ostrovsky',
    body: [
      'Die meisten Wellness-Plattformen messen eine oder zwei Dimensionen — in der Regel Schlafstunden und Schrittzahl. Die HOLOS-Bewertung erfasst neun: Ernährung, Schlaf, Erholung, Stress, Bewegung, Emotionale Gesundheit, Lebensbalance, Zweck und Energie. Das ist nicht Vollständigkeit um ihrer selbst willen — es liegt daran, dass diese Dimensionen interagieren und in diesen Interaktionen das eigentliche diagnostische Signal liegt.',
      'Betrachten Sie ein häufiges Muster: Jemand schläft sieben Stunden, wacht aber unausgeruht auf. Eine eindimensionale Sichtweise beschuldigt die Schlafqualität und verschreibt bessere Schlafhygiene. Das HOLOS-Modell fragt weiter: Wie ist der Stress-Score? Erhöhtes Kortisol unterdrückt den Tiefschlaf, ohne die Gesamtschlafdauer zu reduzieren. Ist der Zweck-Score niedrig? Forschungen zeigen, dass Menschen ohne klaren Sinn ein stärkeres nächtliches Grübeln und früheres Erwachen erleben. Ist die Ernährung schlecht? Darmdysbiose ist jetzt über die Darm-Hirn-Achse mit Störungen der Schlafarchitektur verbunden.',
      'Die gleiche gegenseitige Abhängigkeit verläuft umgekehrt. Hohe Zweck-Scores korrelieren mit besserem Schlaf, besseren Ernährungsgewohnheiten, höherer Sport-Konsistenz und schnellerer Erholung von Krankheiten — nicht weil der Zweck dies direkt verursacht, sondern weil er das Verhalten über alle Dimensionen hinweg organisiert. Deshalb gewichtet HOLOS seine Empfehlungen nach dimensionsübergreifender Wirkung statt nach eindimensionalem Defizit.',
      'Die neun Dimensionen wurden nicht willkürlich gewählt. Sie bilden ab, was jede große Weisheitstradition als gesundheitsbestimmende Variablen identifiziert hat, gegengeprüft mit den Bereichen, die in der Langlebigkeitsforschung am robustesten erscheinen: Ernährungsqualität, Schlafarchitektur, Stressphysiologie, Bewegungsdosis, emotionale Regulation, sozialer Zusammenhalt und Zweckorientierung.',
      'Die Bewertung aller neun Dimensionen ermöglicht HOLOS, die Muster zu erkennen, die Einzelkennzahl-Tracker verpassen: die Person, deren Schlafstunden ausreichend sind, aber deren Stress- und Zweck-Scores eine verborgene allostatische Belastung anzeigen; die Person, deren Ernährungs- und Bewegungs-Scores hervorragend sind, aber deren Erholungs- und Emotionale-Gesundheits-Scores darauf hindeuten, dass sie ihre Reserven überziehen.',
    ]
  },
  'doshas-explained': {
    author: 'Moshe Ostrovsky',
    body: [
      'Die Doshas — Vata, Pitta und Kapha — sind das grundlegende Organisationsprinzip der ayurvedischen Medizin. Sie sind keine Blutgruppen, Persönlichkeitskategorien oder Ernährungsetiketten. Sie sind dynamische Verhältnisse elementarer Qualitäten innerhalb des menschlichen Organismus, und ihr Verständnis erfordert es, den westlichen Instinkt zur Klassifizierung loszulassen und stattdessen zu lernen, Muster im Laufe der Zeit zu beobachten.',
      'Vata ist das Prinzip der Bewegung und des Raums — Luft und Äther in Bewegung. Im Gleichgewicht regiert es Kreativität, Flexibilität, schnelles Denken und Enthusiasmus. Wenn erregt, produziert es Angst, Schlaflosigkeit, trockene Haut, Verstopfung, unregelmäßigen Appetit und einen zerstreuten, überwältigten Geisteszustand. Vata wird durch kalte, trockene, leichte und unregelmäßige Qualitäten erhöht — Winter, Reisen, wechselnde Zeitpläne, übermäßige Bildschirmzeit und Stimulanzien.',
      'Pitta ist das Prinzip der Transformation — Feuer und Wasser. Ausgeglichenes Pitta treibt scharfe Intelligenz, Ehrgeiz, Führung und metabolische Effizienz an. Erregtes Pitta produziert Entzündungen, Hautausschläge, Sodbrennen, Reizbarkeit, Perfektionismus und Burnout. Pitta wird durch Hitze, Intensität und Wettbewerbsdenken erhöht — Überarbeitung, Alkohol, scharfes Essen, direkte Sonne und stressige Umgebungen.',
      'Kapha ist das Prinzip der Struktur und Kohäsion — Erde und Wasser. Ausgeglichenes Kapha bietet Stabilität, Ausdauer, Mitgefühl und tiefe Immunität. Erregtes Kapha manifestiert sich als Trägheit, Gewichtszunahme, Verstopfung, schlechte Stimmung und Schwierigkeiten beim Beginnen. Kapha wird durch kalte, schwere und sitzende Bedingungen erhöht — Überschlafen, süße und fettige Speisen und komfortsuchende Verhaltensweisen.',
      'Jeder Mensch hat ein konstitutionelles Verhältnis der drei Doshas — seine Prakriti, die bei der Empfängnis festgelegt wird — und ein aktuelles Verhältnis namens Vikriti, das durch Lebensstil, Jahreszeit und Lebensereignisse geformt wird. Die ayurvedische Bewertung identifiziert die Lücke zwischen Prakriti und Vikriti und verschreibt Interventionen zur Wiederherstellung des konstitutionellen Gleichgewichts: spezifische Ernährungsrichtlinien, pflanzliche Rezepturen, Bewegungsarten, Schlafpläne und Tagesroutinen.',
    ]
  },
  'rambam-preventive': {
    author: 'Moshe Ostrovsky',
    body: [
      'Rabbi Moses ben Maimon (1138–1204) — der Rambam in der jüdischen Tradition, Maimonides im Westen — war Hofarzt des Sultans von Ägypten, ein Philosoph, der Aristoteles mit der Torah synthetisierte, und der Autor medizinischer Texte, die die moderne Präventivmedizin mit einer Genauigkeit vorwegnahmen, die Kliniker, die ihnen begegnen, noch heute überrascht.',
      'Sein Regimen of Health, geschrieben für den kranken Sohn des Sultans, identifiziert sechs Determinanten der Gesundheit, die er die "Nicht-Naturalen" nannte: Luft und Umwelt; Essen und Trinken; Schlaf und Wachen; Bewegung und Ruhe; Ausscheidung von Abfallstoffen; und die emotionalen Zustände der Seele. Das ist keine Mystik — es ist ein empirisches Rahmenwerk, das aus jahrzehntelanger klinischer Beobachtung tausender Patienten aufgebaut wurde.',
      'Zur Ernährung war der Rambam präzise: Essen Sie bis zu 75% Sättigung — "Ein Mensch sollte immer leicht hungrig sein." Beginnen Sie eine Mahlzeit mit leichten, leicht verdaulichen Speisen; enden Sie mit dichteren. Bevorzugen Sie saisonale Produkte. Diese Vorschriften stimmen mit zeitgenössischer Forschung zu Kalorienrestriktion, Verdauungssequenzierung und Reduktion des Risikos chronischer Erkrankungen durch Ernährungsmuster überein.',
      'Zur Bewegung: "Ein Mensch soll jeden Morgen trainieren, bis der Körper warm wird." Er spezifizierte, dass unzureichende Bewegung die Ursache der meisten chronischen Krankheiten ist — "der Körper wird schwer und plump und seine Kräfte schwächen sich." Die moderne Dosis-Wirkungs-Kurve für körperliche Aktivität und Gesamtmortalität bestätigt dies in quantitativen Details.',
      'Zur emotionalen Gesundheit war der Rambam nachdrücklich: "Ein Arzt, der die Seele nicht behandelt, kann den Körper nicht behandeln." Er identifizierte Trauer, Wut und chronische Angst als physiologisch schädlich — eine Behauptung, die nun durch Jahrzehnte psychoneuroimmunologischer Forschung gestützt wird, die emotionale Zustände mit Kortisol, Zytokinprofilen und Immunfunktion verknüpft. Seine Vorschriften für emotionales Wohlbefinden — sinnvolle Arbeit, maßvolle Freundschaft, intellektuelles Engagement und die Kultivierung von Gleichmut — gehören zu den am stärksten evidenzgestützten Interventionen.',
    ]
  },
  'qi-cultivation': {
    author: 'Moshe Ostrovsky',
    body: [
      'Der skeptische Einwand gegen die daoistische Medizin lautet üblicherweise: "Qi existiert nicht. Man kann es nicht messen. Also ist das System vorwissenschaftlich." Dieser Einwand ist ernst zu nehmen — und dann sorgfältig zu untersuchen, weil er falsch identifiziert, was die daoistische Medizin tatsächlich behauptet.',
      'Qi ist keine unter einem Mikroskop nachweisbare Substanz. Es ist ein funktionelles Konzept — die selbstregulatorische Aktivität lebender Systeme. Wenn ein daoistischer Arzt sagt, Ihr Qi ist gestaut, beschreibt er einen funktionellen Zustand: die Zirkulation ist träge, die Verdauung langsam, die Lymphdrainage gestaut, der Nervensystemtonus gedrückt. Das sind messbare Phänomene. Die Sprache unterscheidet sich von der biomedizinischen Sprache; die Beobachtung nicht.',
      'Die Evidenzbasis für daoistisch abgeleitete Praktiken ist nun erheblich. Eine Metaanalyse von 2017, die 35 randomisierte kontrollierte Studien umfasste, fand, dass Qigong Angst, Depression und Entzündungsbiomarker signifikant reduzierte — Effekte, die bei niedrigerer Intensität mit aerober Übung vergleichbar sind. Multiple systematische Übersichten bestätigen die Überlegenheit von Tai Chi gegenüber konventionellem Gleichgewichtstraining zur Sturzprävention bei älteren Erwachsenen.',
      'Das Fünf-Elemente-Framework — Holz, Feuer, Erde, Metall, Wasser — bildet Organsysteme, emotionale Zustände, Jahreszeiten und Ernährungstendenzen auf ein zyklisches Modell gegenseitiger Erzeugung und Kontrolle ab. Leber (Holz) nährt Herz (Feuer); Herz nährt Milz (Erde); Milz nährt Lunge (Metall); Lunge nährt Niere (Wasser); Niere nährt Leber. Eine Störung in einem Element breitet sich durch den Zyklus aus.',
      'Für den HOLOS-Praktiker bedeutet Qi-Kultivierung, durch konsistente tägliche Praxis auf den Fluss vitaler Energie zu achten: Morgen-Qigong, saisonale Ernährungsanpassung, emotionale Regulation und die Kultivierung von Shen — Geist und zweckorientiertes Bewusstsein. Diese Praktiken erhalten die Bedingungen, unter denen sich der Organismus selbst heilt.',
    ]
  },
  'sleep-traditions': {
    author: 'Moshe Ostrovsky',
    body: [
      'Jede große medizinische Tradition entwickelte eine ausgefeilte Theorie des Schlafs, und wenn man sie über Kulturen und Jahrhunderte vergleicht, sind die Konvergenzen bemerkenswerter als die Unterschiede. Ohne Schlaf-Tracker, EEG oder Chronobiologie gelangten Ärzte auf vier Kontinenten zu nahezu identischen Schlussfolgerungen darüber, wann, wie lange und unter welchen Bedingungen man schlafen sollte.',
      'Das Ayurveda schreibt vor, während der Kapha-Zeit der Nacht zu schlafen — ungefähr von 22:00 bis 2:00 Uhr —, wenn das Erd-Wasser-Element die tiefste anabole Wiederherstellung unterstützt. Das Aufstehen vor 6:00 Uhr während der Vata-Periode richtet den Wachzustand auf geistige Klarheit und Leichtheit aus. Chronobiologische Forschungen bestätigen, dass zirkadiane Ausrichtung die Tiefschlafdauer um 20–30% verbessert, unabhängig von der Gesamtschlafdauer.',
      'Der Rambam war explizit: "Zu den Dingen, die dem Körper schaden und das Leben verkürzen: nachts wach zu bleiben und den Schlaf zu kürzen." Er verschrieb, zuerst auf der rechten Seite zu schlafen, dann auf die linke zu wechseln — eine Empfehlung, die moderne gastrointestinale Forschung teilweise bestätigt.',
      'Die tibetische Medizin beschreibt Schlaf als die Zeit, in der Lung — der Windhumor, der die geistige Aktivität regiert — sich setzt und die feinen Kanäle des Körpers repariert werden. Dies korrespondiert mit der Glymphatischen Hypothese: Während des Tiefschlafs spült Zerebrospinalflüssigkeit metabolischen Abfall — einschließlich Amyloid-beta — aus dem Gehirn in einem um 60% größeren Volumen als im Wachzustand.',
      'Der traditionenübergreifende Konsens: Schlafen Sie zu konsistenten Zeiten, die an natürliche Lichtzyklen ausgerichtet sind; halten Sie die Schlafumgebung kühl, dunkel und ruhig; vermeiden Sie Stimulation in der letzten Stunde vor dem Schlaf; und behandeln Sie Schlaf als aktive biologische Wiederherstellung statt als passive Bewusstlosigkeit.',
    ]
  },
  'stress-dimension': {
    author: 'Moshe Ostrovsky',
    body: [
      'Allostatische Last ist die kumulative physiologische Kosten chronischer Anpassung — was mit dem Körper passiert, wenn die Stressreaktion, die für akute Bedrohungen konzipiert wurde, über Monate und Jahre hinweg kontinuierlich aktiviert wird. Der Begriff wurde 1993 von Bruce McEwen eingeführt, aber die Beobachtung, die er benennt, ist uralt: Jede Weisheitstradition identifizierte anhaltende emotionale Störung als primären Treiber chronischer Erkrankungen.',
      'Die primären Mediatoren sind Kortisol, Adrenalin und proinflammatorische Zytokine. Kurze Kortisol-Schübe schärfen die Kognition, mobilisieren Energie und unterdrücken Schmerzen. Chronisch erhöhtes Kortisol tut das Gegenteil: Es unterdrückt hippokampale Neurogenese und beeinträchtigt Gedächtnis und Lernen; dysreguliert den Glukosestoffwechsel und treibt die Insulinresistenz voran; stört den zirkadianen Rhythmus und verschlechtert die Schlafarchitektur; und beschleunigt die zelluläre Alterung durch Telomerverkürzung.',
      'Die meisten Stress-Interventionen scheitern, weil sie das subjektive Gefühl von Stress ansprechen und nicht die biologische Schuld, die darunter aufgebaut wird. Atemübungen und Achtsamkeit reduzieren akute Erregung. Sie räumen nicht die allostatische Last auf, die über Monate chronischer Aktivierung aufgebaut wurde. Nur eine nachhaltige Reduzierung der allostatischen Inputs — verbesserter Schlaf, reduzierte Entzündung, handhabbare Arbeitsbelastung, relationale Sicherheit, wiederhergestelltes Sinngefühl — kombiniert mit systematischen Erholungspraktiken kann das.',
      'Das Ayurveda identifiziert stressbedingte Krankheit als Vata-Aggravation und verschreibt Erdung: warme, ölige Speisen; langsame rhythmische Bewegung; regelmäßige Tagesroutine; und adaptogene Kräuter einschließlich Ashwagandha, die eine aktuelle randomisierte kontrollierte Studie um 27,9% serumkortisolreduzierend nach 60 Tagen fand. Daoistisches Qigong und Tai Chi stellen einen reibungslosen Qi-Fluss wieder her und beruhigen das Shen.',
      'Die HOLOS-Stress-Dimension fragt nicht nur, wie gestresst Sie sich fühlen. Sie bewertet Schlafqualität, Erholungsgeschwindigkeit, emotionale Regulationskapazität, das Vorhandensein von Bedeutung und sozialer Unterstützung. Empfehlungen werden aus der Tradition gezogen, deren Werkzeugkoffer die Ursachen am direktesten anspricht, eingestuft nach wahrscheinlicher Wirkung angesichts Ihres Neun-Dimensionen-Gesamtprofils.',
    ]
  },
  'avicenna-canon': {
    author: 'Moshe Ostrovsky',
    body: [
      'Ibn Sina (980–1037) — im Westen bekannt als Avicenna — war der einflussreichste Arzt in der Geschichte der Medizin. Sein Canon of Medicine (Al-Qanun fi al-Tibb) war das standardmäßige medizinische Lehrbuch an europäischen Universitäten vom 12. bis 17. Jahrhundert — eine Amtszeit, die kein anderer medizinischer Text erreicht hat. Er synthetisierte griechische, persische und islamische Medizin in ein Rahmenwerk, das alle Komponententraditionen überdauerte.',
      'Der Canon identifiziert sechs Kategorien von gesundheitsbestimmenden Faktoren — die "sechs notwendigen Dinge": Luft und Umwelt; Essen und Trinken; körperliche Bewegung und Ruhe; psychische Bewegung und Ruhe (emotionale Zustände); Schlaf und Wachen; und Rückhaltung und Ausscheidung. Das sind nicht sechs separate Verschreibungen. Sie sind sechs Dimensionen eines einzigen integrierten Systems, und eine Störung in einem breitet sich auf die anderen aus.',
      'Zur Luftqualität waren Avicennas Beobachtungen visionär: Er beschrieb, wie stagnierende Luft und geschlossene Räume Krankheiten verursachten, empfahl Belüftung für Krankenhäuser und entwarf Quarantäneverfahren für Infektionskrankheiten — ein Jahrtausend bevor die Keimtheorie den Mechanismus lieferte. Moderne Umweltepidemiologie identifiziert Luftqualität konsequent als einen der stärksten Umweltdeterminanten der chronischen Krankheitslast.',
      'Bei Speisen unterscheidet der Canon Lebensmittel nach ihrer Wirkung auf das Körpertemperament — ihre erwärmenden, kühlenden, befeuchtenden oder austrocknenden Eigenschaften — und verschreibt Ernährungsanpassungen zur Wiederherstellung des konstitutionellen Gleichgewichts. Die strukturelle Einsicht — dass Ernährungsempfehlungen individuell auf Konstitution und aktuellen Gesundheitszustand zugeschnitten und nicht verallgemeinert werden sollten — ist genau das, was die Präzisionsernährungsforschung nun durch Nutrigenomik und Mikrobiomwissenschaft wiederentdeckt.',
      'Zu emotionalen Zuständen war Avicenna direkt: "Freude erweitert den Lebensgeist; Trauer verengt ihn; Zorn erhitzt das Blut; Angst kühlt es." Die Verschreibungen des Canon für psychologisches Wohlbefinden — sinnvolle Arbeit, schöne Umgebungen, enge Freundschaft, Mäßigung der Leidenschaft und intellektuelles Engagement — antizipieren moderne evidenzbasierte Interventionen für chronische Erkrankungen um fast tausend Jahre.',
    ]
  },
  'tibetan-three-humours': {
    author: 'Moshe Ostrovsky',
    body: [
      'Die tibetische Medizin (Sowa Rigpa, "das Wissen der Heilung") ist eines der ältesten vollständigen Medizinsysteme der Welt, das sich über zwei Jahrtausende an der Kreuzung von indischem Ayurveda, chinesischer Medizin und der indigenen Bön-Heilungstradition entwickelte. Ihr grundlegendes Modell identifiziert drei Humoren — Lung, Tripa und Beken — als die primären Kräfte, die Gesundheit bestimmen, und Krankheit als die Störung ihres dynamischen Gleichgewichts.',
      'Lung (ausgesprochen "loong") ist das Windprinzip: Es regiert alle Bewegung, sowohl physisch — Atem, Nervenimpuls, Zirkulation — als auch mental — Gedanke, Absicht und Emotion. Ausgeglichenes Lung produziert Vitalität, Klarheit, Enthusiasmus und kreative Intelligenz. Gestörtes Lung manifestiert sich als Angst, Schlaflosigkeit, Zittern, trockene Haut, Tinnitus und ein zerstreuter, überwältigter Geisteszustand — eng auf das abbildend, was die westliche Psychiatrie als Angstspektrum-Störungen beschreibt.',
      'Tripa — Galle — ist das Feuerprinzip: Transformation, Verdauung von Nahrung und Erfahrung, scharfe Wahrnehmung und die Fähigkeit zur Unterscheidung und Entscheidung. Ausgeglichenes Tripa produziert Intelligenz, Mut und metabolische Effizienz. Gestörtes Tripa produziert Entzündungen, Hauterkrankungen, Fieber, Reizbarkeit, Perfektionismus und chronische Unzufriedenheit. Dies korreliert mit Ayurvedischem Pitta-Ungleichgewicht.',
      'Beken — Schleim — ist das Wasser-Erde-Prinzip: Struktur, Feuchtigkeit, Kohäsion und Stabilität. Ausgeglichenes Beken bietet Ausdauer, Mitgefühl, Geduld und tiefe Immunität. Gestörtes Beken manifestiert sich als Adipositas, Trägheit, übermäßiger Schlaf, Verstopfung und ein hypoton-depressiver Zustand. Dies entspricht Ayurvedischem Kapha-Ungleichgewicht und, in modernen Begriffen, dem metabolischen Syndrom-Cluster.',
      'Was die tibetische Medizin auszeichnet, ist die Raffinesse ihrer psychophysischen Integration. Die drei Nyépa sind nicht rein physische oder rein psychologische Kategorien — sie sind psychophysische Prinzipien. Lung-Störung ist gleichzeitig eine Nervensystem-Störung und eine existenzielle: Der unruhige Geist und der aufgeregte Körper werden als ein Phänomen mit einem Behandlungsbogen verstanden. Das Protokoll adressiert entsprechend beide Ebenen: Ernährungsmodifikationen, spezifische pflanzliche Rezepturen, externe Therapien und kontemplative Praktiken.',
    ]
  },
  'integrative-wellness-science': {
    author: 'Moshe Ostrovsky',
    body: [
      'Integrative Wellness ist keine Alternative zur evidenzbasierten Medizin — sie ist ihre logische Erweiterung. Systembiologie, Psychoneuroimmunologie und Chronobiologie deuten alle auf dieselbe Schlussfolgerung hin: Der Körper operiert als vereinte Intelligenz, und seine isolierte Behandlung produziert fragmentierte Ergebnisse.',
      'Eine wegweisende Metaanalyse aus dem Jahr 2023 in den Annals of Internal Medicine überprüfte 187 Studien zu Geist-Körper-Interventionen und fand heraus, dass multimodale Ansätze einmodale Behandlungen bei Primärergebnissen um 34% übertrafen — nicht weil eine einzelne Komponente stärker war, sondern weil ihre Interaktionen sich verstärkten.',
      'Die HOLOS-Bewertung erfasst diese Komplexität, indem sie neun voneinander abhängige Dimensionen kartiert: Ernährung, Schlaf, Erholung, Stress, Bewegung, Emotionale Gesundheit, Lebensbalance, Zweck und Energie. Das sind keine separaten Silos. Schlafentzug erhöht Kortisol, das den Glukosestoffwechsel beeinträchtigt, das den zirkadianen Rhythmus stört, das den Schlaf verschlechtert. Der Motor kartiert diese Rückkopplungsschleifen — damit Ihre Empfehlungen Ursachen ansprechen, nicht oberflächliche Symptome.',
      'Aus den Weisheitstraditionen ist diese Systemsicht nicht neu. Ayurveda beschreibt Prakriti als dynamisches Gleichgewicht unter drei Doshas. Daoistische Medizin spricht vom kontinuierlichen Zusammenspiel von Qi, Blut und Jing. Der Rambam bestand darauf, dass Ernährung, Luft, Bewegung, Schlaf, Emotionen und Zweck sich gegenseitig beeinflussen.',
      'Was HOLOS beiträgt, ist die Fähigkeit zu quantifizieren, wo Ihr persönliches System aus dem Gleichgewicht geraten ist — und Interventionen zu verschreiben, die nach wahrscheinlicher Wirkung und praktischer Schwierigkeit eingestuft sind.',
    ]
  },
  'sleep-recovery-ancient': {
    author: 'Moshe Ostrovsky',
    body: [
      'Das tibetische Medizinsystem beschreibt Schlaf als eine Zeit, in der der Windhumor (Lung) sich setzt und die feinen Kanäle des Körpers repariert werden. Dies korrespondiert mit bemerkenswerter Genauigkeit mit der Glymphatischen Hypothese: Während des Tiefschlafs spült Zerebrospinalflüssigkeit metabolischen Abfall aus dem Gehirn in einem um 60% größeren Volumen als im Wachzustand.',
      'Das Ayurveda schreibt vor, vor 22:00 Uhr zu schlafen und vor 6:00 Uhr aufzuwachen — die Kapha-Zeit der Nacht, wenn das Erd-Wasser-Element die tiefe anabole Wiederherstellung unterstützt. Chronobiologische Forschungen bestätigen, dass zirkadiane Ausrichtung die Tiefschlafdauer um 20–30% verbessert, unabhängig von der Gesamtschlafzeit.',
      'Der Rambam war explizit: "Zu den Dingen, die dem Körper schaden und das Leben verkürzen: nachts wach zu bleiben und den Schlaf zu kürzen." Er verschrieb, zuerst auf der rechten Seite zu schlafen, dann auf die linke zu wechseln. Linksseitiger Schlaf verbessert die Lymphdrainage und reduziert Sodbrennen — die Physiologie unterscheidet sich von seiner Konzeption aus dem 12. Jahrhundert, aber die Empfehlung gilt.',
      'Die daoistische Tradition betont Wu Wei — müheloses Nicht-Tun — als Voraussetzung für Wiederherstellung. Schlaf ist nicht passiv; er ist der aktivste Heilzustand des Körpers. Das moderne Verständnis der Schlafarchitektur (N1/N2/N3/REM-Zyklus alle ~90 Minuten) bestätigt dies: Jede Phase erfüllt unterschiedliche Funktionen.',
      'Im HOLOS-Schlaf-Dimension spiegelt Ihr Score nicht nur Stunden wider, sondern auch zirkadiane Ausrichtung, Schlafschulden, subjektive Qualität und funktionale Tageskonsequenzen.',
    ]
  },
  'nutrition-frameworks': {
    author: 'Moshe Ostrovsky',
    body: [
      'Die Frage "Was soll ich essen?" hat eine unterschiedliche Antwort je nachdem, welche Tradition man fragt — aber die Antworten teilen mehr Struktur, als sie zunächst erscheinen. Alle acht Frameworks identifizieren Nahrung nicht nur als Makronährstoff-Treibstoff, sondern als Vehikel für konstitutionelles Gleichgewicht, saisonale Anpassung und metabolische Individualität.',
      'Evidenzbasiert: Der stärkste Konsens unterstützt eine überwiegend vollwertige, pflanzenreiche Ernährung mit ausreichend Protein (1,2–2 g/kg Magermasse), Omega-3-Fetten und Polyphenol-Vielfalt. Die Verdrängung von verarbeiteten Lebensmitteln erklärt den größten Teil der Risikoreduktion chronischer Erkrankungen in großen Kohortenstudien.',
      'Rambam: Schreibt vor, in der Reihenfolge der Verdaulichkeit zu essen — zuerst leichte Speisen, zuletzt dichte. Menge auf 75% Sättigung beschränken. Saisonale, lokale Produkte priorisieren. "Ein Mensch soll nicht essen, solange er nicht hungrig ist, und nicht trinken, solange er nicht durstig ist."',
      'Ayurveda: Stimmt Speise-Gunas auf das Dosha-Ungleichgewicht ab. Vata-Typen brauchen warme, ölige, erdende Speisen; Pitta-Typen brauchen kühlende Speisen; Kapha-Typen brauchen leichte, würzige, trockene Speisen. Agni (Verdauungsfeuer) ist die zentrale Variable — alle Ernährungsempfehlungen unterordnen sich seinem aktuellen Zustand.',
      'Das HOLOS-Swarga-Framework gewichtet Ernährungsempfehlungen nach Ihren bewerteten Dimensionsungleichgewichten in allen Traditionen und produziert einen personalisierten Ernährungs-Archetypen — keine einzelne Diät, sondern ein Entscheidungsrahmen für jede Mahlzeit.',
    ]
  },
  'stress-resilience-traditions': {
    author: 'Moshe Ostrovsky',
    body: [
      'Die HPA-Achse produziert Kortisol als Reaktion auf wahrgenommene Bedrohung — eine Reaktion, die für akute Gefahr abgestimmt ist, nicht für chronische niedriggradige Stressoren. Verlängerte HPA-Aktivierung unterdrückt die Immunfunktion, beeinträchtigt das Gedächtnis, stört den zirkadianen Rhythmus und beschleunigt zelluläres Altern durch Telomerverkürzung.',
      'Das Ayurveda nennt es Vata-Aggravation: Das Wind-Luft-Element wird übermäßig und destabilisiert das Nervensystem. Das Mittel ist Erdung: Abhyanga-Ölmassage, warme schwere Speisen, langsame Bewegung, Ashwagandha. Moderne Forschung zeigt, dass Ashwagandha-Wurzel Kortisol um 27,9% in randomisierten kontrollierten Studien reduziert.',
      'Die daoistische Tradition entwickelte Qigong und Tai Chi als Werkzeuge zur Regulierung von Shen (Geist) und zur Beruhigung von Qi. Eine Metaanalyse von 2017 über 35 randomisierte kontrollierte Studien fand, dass Qigong-Praxis Angst, Depression und Entzündungsbiomarker signifikant reduzierte — Effekte, die aerober Übung bei niedrigerer Intensität vergleichbar sind.',
      'Der tibetische Buddhismus trug Tonglen und die Erkenntnis bei, dass Leiden bearbeitbar ist. Das ist kein toxischer Positivismus — es ist die empirische Beobachtung, dass Vermeidung Stress verstärkt, während Engagement ihn metabolisiert. Moderne expositionsbasierte Therapien sind mechanistisch identisch.',
      'Im HOLOS-Stress-Dimension werden Empfehlungen aus der Tradition gezogen, die am besten zu Ihrem aktuellen Zustand passt — Atemarbeit, adaptogene Kräuter, Qigong oder strukturierte Reflexionspraktiken.',
    ]
  },
  'movement-medicine': {
    author: 'Moshe Ostrovsky',
    body: [
      'Eine Metaanalyse aus dem Jahr 2022 ergab, dass körperliche Aktivität das Risiko der Gesamtmortalität um 30–35%, kardiovaskuläre Ereignisse um 40%, die Depressionshäufigkeit um 33% und den kognitiven Rückgang um 38% reduziert. Diese Effekte gelten für alle Altersgruppen und erfordern weder Ausrüstung noch Einrichtungen.',
      'Aber Bewegung ist nicht monolithisch. Das Ayurveda unterscheidet Brmhana (stärkende) von Langhana (erleichternde) Bewegungsmodalitäten — verschrieben auf Basis von Dosha, Jahreszeit und Energiezustand. Eine Vata-dominante Person profitiert von langsamer, rhythmischer, erdender Bewegung — nicht von Hochintensitätsintervalltraining, das das Nervensystem weiter erschöpft.',
      'Hippokrates schrieb: "Gehen ist die beste Medizin des Menschen" — und die moderne Epidemiologie bestätigt dies vollständig. Die Dosis-Wirkungs-Kurve für Gehen ist zwischen 0 und 7.500 Schritten/Tag steil und flacht danach ab. Die Sterblichkeitsvorteile von 7.500 täglichen Schritten sind nahezu identisch mit denen von 12.000.',
      'Die daoistische Tradition unterschied müheloses Nicht-Anstrengung. Tai Chi und Qigong sind präzises neuromotorisches Training. Forschungen zeigen, dass sie Gleichgewicht, Propriozeption und Sturzprävention bei älteren Erwachsenen genauso effektiv verbessern wie konventionelles Gleichgewichtstraining.',
      'Die HOLOS-Bewegungs-Dimension bewertet Häufigkeit, Intensitätsverteilung, funktionelle Stärkemarker und Bewegungsqualität — abgestimmt auf Ihr konstitutionelles Profil und Ihren aktuellen Energiezustand.',
    ]
  },
  'emotional-intelligence-holos': {
    author: 'Moshe Ostrovsky',
    body: [
      'Die Polyvagal-Theorie bietet eine physiologische Basis für das, was Traditionen seit langem beobachten: Der Zustand des Nervensystems — insbesondere der Vagustonus — bestimmt unsere Kapazität für soziales Engagement, Lernen, Kreativität und körperliche Heilung.',
      'Das Ayurveda identifiziert Sattva (geistige Klarheit und Gleichmut) als das Ziel aller Wellness-Praktiken — erreicht nicht durch Unterdrückung von Emotionen, sondern durch Reinigung des Geistes von Rajas (Erregung) und Tamas (Trägheit) durch Yoga, Meditation, gesunde Ernährung und Naturexposition.',
      'Die tibetische Medizintradition entwickelte die granularste Karte mentaler-emotionaler Zustände. Die "fünf Gifte" werden als primäre Erzeuger von Krankheit verstanden — chronische Aktivierungsmuster, die die Physiologie dysregulieren. Ihre Gegengifte werden durch spezifische Meditationspraktiken kultiviert, die auf den konstitutionellen Typ abgestimmt sind.',
      'Hippokrates verstand, dass Arztpräsenz und emotionaler Kontakt therapeutisch waren. Eine warme, vertrauensvolle Beziehung reduziert Kortisol, erhöht Oxytocin und verbessert die Behandlungstreue.',
      'Im HOLOS-Emotionalen-Dimension dient der integrative Coach als reflektierender Partner, der in integrativen Wellness-Perspektiven ausgebildet ist. Wenn klinische Unterstützung angemessen ist, sagt der Coach es direkt.',
    ]
  },
  'purpose-longevity': {
    author: 'Moshe Ostrovsky',
    body: [
      'Das Rush Memory and Aging Project verfolgte 1.500 ältere Erwachsene über sieben Jahre und fand, dass diejenigen mit einem hohen Sinnempfinden ein 2,5-fach niedrigeres Gesamtmortalitätsrisiko hatten — unabhängig von körperlicher Gesundheit, Depressionsstatus oder sozioökonomischen Faktoren. Zweck sagte Überleben stärker voraus als die Rauchentwöhnung.',
      'Der Mechanismus: Zweck organisiert Aufmerksamkeit, hemmt Grübeln und aktiviert das Verhaltens-Annäherungs-System. Menschen mit klarem Zweck schlafen besser, treiben konsequenter Sport, suchen proaktiv medizinische Versorgung und erholen sich schneller von Krankheiten. Zweck ist nicht das Ergebnis von Gesundheit — er ist ein Treiber davon.',
      'Die japanische Kultur kodierte dies in Ikigai — dem Schnittpunkt von dem, was man liebt, was man gut kann, was die Welt braucht und wofür man bezahlt werden kann. Okinawa, Heimat einiger der langlebigsten Bevölkerungen der Welt, hat kein Konzept von Ruhestand.',
      'Die HOLOS-Zweck-Dimension bewertet Werteklarheit, Beitragsgefühl, Engagement versus Entfremdung von täglichen Aktivitäten und Zeitorientierung. Es ist die nuancierteste Dimension zu bewerten und die wirkungsvollste zu verändern.',
    ]
  },
  'rambam-modern-wellness': {
    author: 'Moshe Ostrovsky',
    body: [
      'Maimonides schrieb das Regimen of Health für den Sohn des Sultans — der an Depression und Verstopfung litt. Die Verschreibungen sind bemerkenswert zeitgemäß: moderate tägliche Bewegung, regelmäßiger Schlafplan, emotionales Management, Darmregularität und die Vermeidung von Überessen.',
      'Seine "acht Kapitel" über psychische Gesundheit antizipieren die kognitive Verhaltenstherapie: Die Seele hat Appetiten und die Vernunft muss sie regulieren; Charakter wird durch Gewohnheit geformt; negative emotionale Zustände werden durch das Üben ihrer Gegenteile verändert.',
      'Zur Ernährung war der Rambam präzise: Essen Sie bis zu 75% Sättigung. Beginnen Sie mit leichten Speisen, enden Sie mit dichten. Die Darmmikrobiom-Forschung des 21. Jahrhunderts liefert Mechanismen für jede dieser Verschreibungen.',
      'Der Rambam bestand darauf, dass Ärzte Menschen behandeln sollten, bevor sie krank sind. "Ein weiser Mensch sollte mehr Aufmerksamkeit der Erhaltung seiner Gesundheit widmen als der Heilung von Krankheiten." Das ist moderne Präventivmedizin — kodiert im jüdischen Recht des 12. Jahrhunderts.',
    ]
  },
  'swarga-tradition': {
    author: 'Moshe Ostrovsky',
    body: [
      'Svarga ist Sanskrit für den Bereich jenseits des Gewöhnlichen — die Erhebung, die aus der echten Integration des Besten jeder Tradition kommt, statt sie nur zu katalogisieren. Das HOLOS-Svarga-Framework ist nicht eine neunte Tradition, die den acht hinzugefügt wird; es ist das Meta-Framework, das die acht Traditionen füreinander lesbar macht.',
      'Jede der acht Traditionen im HOLOS-System — Ayurveda, daoistische Medizin, hippokratische Medizin, das Maimonides-Regimen, Avicennas Canon, tibetische Medizin, moderne evidenzbasierte Wissenschaft und das HOLOS-Integrationssystem — ist innerhalb ihrer eigenen Logik vollständig. Jede hat eine Kausaltheorie, ein Diagnosesystem, eine Reihe von Interventionen und einen Bestand akkumulierter Beobachtung über Jahrhunderte. Keine ist bloß eine Sammlung von Tipps.',
      'Die Herausforderung ist, dass jede Tradition einen anderen Wortschatz, andere Messkategorien und eine andere Theorie davon verwendet, was Gesundheit ausmacht. Ein Ayurveda-Praktiker liest Pitta; ein tibetischer Arzt liest Tripa; ein westlicher Kardiologe liest CRP und LDL. Sie schauen möglicherweise auf dieselbe physiologische Realität und beschreiben sie in völlig unterschiedlichen Begriffen — und verpassen dabei gegenseitig die Erkenntnisse des anderen.',
      'Die Svarga-Schicht übersetzt zwischen diesen Wortschätzen. Sie identifiziert die strukturellen Korrespondenzen — die Orte, an denen Traditionen unabhängig voneinander auf dieselbe Beobachtung konvergieren — und nutzt diese Konvergenzen, um das diagnostische Vertrauen zu stärken. Wenn Ayurveda, tibetische Medizin und moderne Psychoneuroimmunologie alle auf dasselbe Muster in Ihrem Profil hinweisen, ist diese Konvergenz kein Zufall. Es ist Signal.',
      'Das praktische Ergebnis ist, was HOLOS den Svarga-Synthesebericht nennt: eine personalisierte traditionenübergreifende Analyse, die Ihr konstitutionelles Profil identifiziert, die Traditionen, deren Frameworks am genauesten zu diesem Profil passen, und die spezifischen Interventionen, die jede Tradition empfiehlt — eingestuft nach traditionenübergreifender Bestätigung und angepasst für die praktische Umsetzung im modernen Leben. Svarga ist nicht das Ziel. Es ist die Aussicht aus einer Höhe, die ausreicht, um das gesamte Gelände zu sehen.',
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
  const bodyData = locale === 'ru'
    ? (ARTICLES_RU[slug] ?? ARTICLES[slug])
    : locale === 'he'
      ? (ARTICLES_HE[slug] ?? ARTICLES[slug])
      : locale === 'de'
        ? (ARTICLES_DE[slug] ?? ARTICLES[slug])
        : ARTICLES[slug]

  const article = meta && bodyData ? {
    title:    meta.title,
    category: meta.category,
    intro:    meta.intro,
    date:     meta.date,
    readTime: meta.readTime,
    author:   bodyData.author,
    body:     bodyData.body,
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
