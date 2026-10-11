import test from 'node:test';
import assert from 'node:assert/strict';
import { evaluateSymptoms, findEmergency, matchConditions } from '../src/engine.ts';
const adult={adult:true,pregnant:false,complex:false,allergy:false};
test('mild headache maps to an informational topic',()=>{
  const result=evaluateSymptoms('I have a mild headache',adult);
  assert.equal(result.kind,'topics');
  assert.equal(result.matches[0].condition.id,'headache');
  assert.equal(result.allowMedicationExamples,true);
});
test('emergency symptoms stop medication options',()=>{
  const r=evaluateSymptoms('chest pain and headache',adult);
  assert.equal(r.kind,'emergency');assert.equal(r.matches.length,0);
  assert.equal(r.allowMedicationExamples,false);
});
test('stroke indicators trigger emergency',()=>{
  assert.match(findEmergency('sudden weakness and slurred speech'),/emergency/i);
});
test('fever with stiff neck triggers emergency',()=>{
  assert.ok(findEmergency('fever and a stiff neck'));
});
test('pregnancy and regular medication suppress OTC examples',()=>{
  assert.equal(evaluateSymptoms('allergies',{...adult,pregnant:true}).allowMedicationExamples,false);
  assert.equal(evaluateSymptoms('allergies',{...adult,complex:true}).allowMedicationExamples,false);
});
test('child suppresses OTC examples',()=>{
  assert.equal(evaluateSymptoms('sore throat',{...adult,adult:false}).allowMedicationExamples,false);
});
test('unknown input gives no prescription suggestion',()=>{
  assert.equal(evaluateSymptoms('mystery unusual symptom',adult).kind,'needs-care');
});
test('UTI topic deliberately has zero medication matches',()=>{
  const m=matchConditions('burning urination');assert.equal(m[0].condition.id,'possible-uti');
  assert.deepEqual(m[0].condition.medicationIds,[]);
});
test('explicit negation does not trigger chest pain warning',()=>{
  assert.equal(findEmergency('no chest pain but I have a headache'),null);
});

test('risk context in text suppresses OTC examples despite unchecked boxes',()=>{
  assert.equal(evaluateSymptoms('pregnant with headache',adult).allowMedicationExamples,false);
  assert.equal(evaluateSymptoms('my child has a fever',adult).allowMedicationExamples,false);
});
test('later non-negated chest pain still activates warning',()=>{
  assert.equal(evaluateSymptoms('no chest pain yesterday, now chest pain today',adult).kind,'emergency');
});

test('severe headache must not show OTC examples',()=>{
  assert.equal(evaluateSymptoms('severe headache',adult).kind,'emergency');
});
