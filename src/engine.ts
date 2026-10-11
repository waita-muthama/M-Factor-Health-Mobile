import { CONDITIONS, type Condition } from './catalog.ts';

/** No diagnostic claims: informational topic matcher, not a clinical model. */
export type Guard = { adult: boolean; pregnant: boolean; complex: boolean; allergy: boolean };
export type Match = { condition: Condition; score: number; matched: string[] };
export type Result = {
  kind: 'empty' | 'emergency' | 'needs-care' | 'topics';
  alert?: string; matches: Match[]; allowMedicationExamples: boolean;
  reason?: string;
};
const severePatterns: { pattern: RegExp; label: string }[] = [
  {pattern:/\b(chest pain|pain in my chest|pain in the chest|tight chest|chest pressure|heart attack|crushing chest|chest tightness)\b/i,label:'Chest discomfort may require emergency assessment.'},
  {pattern:/\b(shortness of breath|cannot breathe|can't breathe|difficulty breathing|trouble breathing|struggling to breathe|breathless at rest|can't catch my breath|stopped breathing|blue lips)\b/i,label:'Breathing difficulty or signs of low oxygen require emergency assessment.'},
  {pattern:/\b(face droop|facial droop|slurred speech|sudden weakness|one-sided weakness|weak on one side|numb on one side|stroke symptoms|cannot speak|can't speak|unable to speak)\b/i,label:'Possible stroke signs require emergency assessment.'},
  {pattern:/\b(swollen tongue|tongue swelling|swollen lips|lip swelling|throat closing|throat swelling|anaphylaxis|severe allergic reaction)\b/i,label:'Possible severe allergic reaction requires emergency assessment.'},
  {pattern:/\b(fainting|unconscious|seizure|convulsion|vomiting blood|blood in vomit)\b/i,label:'Potentially serious symptoms require emergency assessment.'},
  {pattern:/\b(sudden severe headache|severe headache|worst headache of my life|thunderclap headache)\b/i,label:'A sudden severe headache requires emergency assessment.'},
  {pattern:/\b(suicidal|suicide|kill myself|self harm|self-harm)\b/i,label:'Please seek immediate emergency and trusted-person support.'},
  {pattern:/\b(severe dehydration|bloody diarrhea|bloody diarrhoea|blood in stool|severe abdominal pain)\b/i,label:'These symptoms require urgent medical assessment.'},
];
const normalize = (s:string) => s.toLowerCase().replace(/[^a-z0-9\s'-]/g, ' ').replace(/\s+/g,' ').trim();
function isNegated(text:string,start:number) {
  // Conservative: clear negation like "no chest pain" not mistaken for positive.
  const prefix=text.substring(Math.max(0,start-16), start);
  return /\b(no|not|without|deny|denies)\s+(?:any\s+)?$/i.test(prefix);
}
export function findEmergency(text: string): string | null {
  const q = normalize(text);
  for (const item of severePatterns) {
    const occurrences = q.matchAll(new RegExp(item.pattern.source, 'gi'));
    for (const match of occurrences) {
      if (match.index !== undefined && !isNegated(q, match.index)) return item.label;
    }
  }
  if(/\b(stiff neck)\b/i.test(q) && /\b(fever|temperature)\b/i.test(q)) return 'Fever with a stiff neck needs emergency assessment.';
  return null;
}
export function matchConditions(raw: string): Match[] {
  const q=normalize(raw);
  if(q.length < 3) return [];
  const terms=q.split(' ').filter(w=>w.length>=4);
  return CONDITIONS.map(condition=>{
    const matched=condition.keywords.filter(kw=> {
      const k=normalize(kw);
      return q.includes(k) && !isNegated(q,q.indexOf(k));
    });
    const keywordScore=matched.reduce((sum,kw)=>sum+Math.max(3,kw.split(' ').length*3),0);
    const nameBoost=q.includes(normalize(condition.name))?5:0;
    const termScore=terms.filter(t=>condition.keywords.some(kw=>normalize(kw).split(' ').includes(t))).length;
    return {condition,matched,score:keywordScore+nameBoost+termScore};
  }).filter(m=>m.score>0).sort((a,b)=>b.score-a.score).slice(0,4);
}
export function evaluateSymptoms(text: string, guard:Guard): Result {
  const cleaned=normalize(text);
  if(cleaned.length<3) return {kind:'empty',matches:[],allowMedicationExamples:false,reason:'Enter a symptom or condition to explore.'};
  const emergency=findEmergency(cleaned);
  if(emergency) return {kind:'emergency',alert:emergency,matches:[],allowMedicationExamples:false,reason:'Do not delay care or self-medicate based on this app.'};
  const matches=matchConditions(cleaned);
  if(matches.length===0) return {kind:'needs-care',matches:[],allowMedicationExamples:false,reason:'No reliable match in the demonstration library. Ask a qualified clinician or pharmacist.'};
  // Textual references to high-risk contexts also block general OTC examples.
  // This is not a substitute for a complete medical history.
  const contextRisk=/\b(pregnant|pregnancy|breastfeeding|breast feeding|infant|newborn|toddler|my child|my baby|kidney disease|liver disease|blood thinner|warfarin|medicine allergy|medication allergy)\b/i.test(cleaned);
  const safeToShow=guard.adult && !guard.pregnant && !guard.complex && !guard.allergy && !contextRisk;
  return {kind:'topics',matches,allowMedicationExamples:safeToShow,reason:!safeToShow?'Medication examples are hidden because your safety answers or symptom description require individualized advice.':undefined};
}
