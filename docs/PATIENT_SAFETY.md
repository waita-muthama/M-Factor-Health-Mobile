# Patient safety and medical content policy

## Status

**Demonstration only — NOT medically validated or authorized for patient-facing clinical decision-making.** It does not prescribe, dose, dispense, or diagnose. There is no automated interaction checking or personalized drug-selection algorithm. It is not a clinical product.

## Existing safeguards

- Selected emergency warning phrases take priority; match list and medication examples are removed if detected.
- Keyword matching produces "topics to explore", never asserted diagnoses or probabilities.
- No medicines for unknown or unmatched queries.
- General OTC examples on the search-results screen require adult confirmation and no risk flags for pregnancy, chronic illness/other medicines, or known medication allergy.
- Known or suspected UTI has zero self-medication selections and directs to medical assessment.
- Every medicine detail has precautions; links to public references are shown; no dose instructions are generated.
- Data is offline/local; confidential patient information must not be entered.

## Known safety gaps

- Keyword and regex red-flag screening can miss emergencies or respond inappropriately to negation, synonyms, language variation and incomplete descriptions.
- Adult and other risk flags are self-reported and incomplete. No verification, medication list, drug interaction calculations, allergies crosscheck, renal/hepatic data, lab values, or pediatric weight-based checks exist.
- Guidance lacks independent qualified medical review, localized regulatory review, language localization, and clinical quality assurance.
- Evidence links are educational references, not endorsement or independent content validation.
- User may access general medication library even if risk flags restrict search result examples; details contain prominent warnings.

## Release gates

1. Appoint licensed medical director and pharmacist reviewer with local clinical governance.
2. Validate content against local prescribing formularies, practice guidelines and contraindication sources.
3. Implement controlled editorial workflow: evidence citation, author, review date, reviewer approval, published version, rollback and audit trail.
4. Validate triage/urgency sensitivity, language handling, age-specific workflows, pregnancy and drug interaction safety with clinicians using formal test cases.
5. Undertake regulatory classification / authorization review and privacy impact assessment in every target jurisdiction.
6. Perform security review, accessibility testing, patient comprehension testing, incident response drills and external penetration testing.
7. For public use, implement clear care escalation, oversight, monitoring, content updates and adverse event reporting.

## Example sources

MedlinePlus: https://medlineplus.gov/ency/article/002208.htm
WHO diarrhea: https://www.who.int/news-room/fact-sheets/detail/diarrhoeal-disease
NHS sore throat: https://www.nhs.uk/conditions/sore-throat/
NHS headaches: https://www.nhs.uk/symptoms/headaches/
