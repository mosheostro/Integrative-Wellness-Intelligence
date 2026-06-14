import type { Recommendation } from '@/lib/types'

export const RELATIONSHIP_RECOMMENDATIONS: Recommendation[] = [
  { id:'rel-001', category:'relationships', title:'Full-Presence Conversation (Daily)', description:'One conversation daily with no phone, no multitasking. Make eye contact. Ask a follow-up question. Deep listening activates the ventral vagal system, the neurobiological state of safety and connection.', impact_score:82, difficulty_score:20, time_minutes:20, evidence_level:'strong', tags:['connection','listening','vagal','presence'], framework_weights:{'evidence-based':1.0,'rambam':0.9,'tibetan':0.95,'swarga':0.95} },
  { id:'rel-002', category:'relationships', title:'Relationship Investment Audit', description:'Map your relationships into tiers. Identify who energises you and who depletes you. Make one deliberate investment in a tier-one relationship this week (shared meal, letter, call).', impact_score:75, difficulty_score:30, time_minutes:60, evidence_level:'moderate', tags:['relationships','energy','audit','investment'], framework_weights:{'evidence-based':0.85,'rambam':0.9,'swarga':0.9} },
]
