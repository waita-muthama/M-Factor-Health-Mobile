# Architecture / future MySQL integration

## Currently implemented

- Expo SDK 57 / React Native / TypeScript app, locally bundled reference content
- Synchronous `evaluateSymptoms()` with keyword/topic scoring and separate high-risk signal detection
- Local bookmarks (AsyncStorage), ephemeral symptom queries in RAM
- UI state managed in React; no outgoing requests other than tapping an external evidence link
- Bundled static picture assets, no tracking SDK

## Future production flow (NOT implemented here)

```text
Android / iOS client
        │
     HTTPS + short-lived authenticated sessions
        │
   API Gateway / rate limiter
        │
 ┌──────┴───────────────────┐
 │ Consent, profiles,       │
 │ patient-facing triage API│
 └──────┬───────────────────┘
        │
   Clinical content service ─── Independent clinician review / publishing approval
        │                          │
  MySQL (private network)      Versioned guideline references
        │
  Pharmacy inventory service (separate role permissions)
        │
  Batch stock, expiry, reservations, supplier ledger
```

### Suggested data model

- `users`, `roles`, `user_roles`, `sessions`, `consents`
- `clinical_topics`, `topic_aliases`, `red_flag_rules`, `topic_medication_links`
- `medications`, `contraindications`, `drug_interactions`, `medication_images`
- `source_documents`, `content_reviews`, `approval_workflows`, `content_versions`
- `pharmacies`, `stock_batches`, `stock_movements`, `suppliers`, `low_stock_alerts`
- `audit_events`, `security_incidents`, `clinical_safety_incidents`

### Critical constraints

- No direct MySQL credentials or database connection from a phone.
- Medication options must be associated with a reviewed condition and approved version, not based solely on LLM output or keywords.
- Do not present inventory availability as medical appropriateness.
- Drug recommendations require age/weight, pregnancy, allergies, current medications, renal/hepatic conditions, local formulary and clinical assessment when relevant; unsupported questions must result in escalation instead of a recommendation.
- Administrative edits must follow least privilege, evidence citation, pharmacist/clinician approval, audit logs, and soft deletion for medically relevant records.
- Do not copy this demonstration matcher into a clinical environment without independent validation, risk management, and appropriate regulatory clearance.
