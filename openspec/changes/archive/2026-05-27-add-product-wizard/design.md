## Context

StockBase uses a feature-isolated React architecture with context + reducer state and localStorage synchronization. Product creation currently lacks a structured flow, causing inconsistent entry of required fields and weak coordination with alert and transaction side effects. The Add Product Wizard introduces a guided route and centralized submit orchestration while remaining aligned with existing provider contracts and no-backend constraints.

## Goals / Non-Goals

**Goals:**
- Provide a 3-step wizard at `/products/new` with clear progress state and step-level validation.
- Collect complete product data (identity, pricing, stock) using React Hook Form + Zod.
- Enforce core validation rules, including SKU uniqueness and cross-field pricing/stock constraints.
- Create product, initial stock transaction, and derived stock alerts in a single submit flow.
- Support category prefill via query parameter and empty-state handling when required dependencies are missing.
- Preserve accessibility expectations for labels, keyboard flow, focus, and step semantics.

**Non-Goals:**
- Draft persistence across refresh/navigation.
- Server-side persistence or API integration.
- Unsaved-changes blocking dialogs.
- Reworking existing product list, analytics, or category/supplier management flows.

## Decisions

1. Wizard architecture in dedicated feature module
- Decision: Implement under `src/features/wizard/` with step components, navigation hook, form hook, and validation schema.
- Rationale: Preserves feature isolation and keeps form orchestration separate from product listing logic.
- Alternative considered: Embedding fields directly in a single route component.
- Why not: Harder to maintain, validate per-step, and test navigation behavior.

2. React Hook Form + Zod for multi-step validation
- Decision: Use one form model with step-specific trigger validation and full-form validation on submit.
- Rationale: Matches project conventions and reduces duplicate state handling.
- Alternative considered: Per-step local state with ad hoc validators.
- Why not: Increases drift risk and complicates cross-field checks.

3. Submit orchestration centralized in wizard submit handler
- Decision: Perform SKU generation/check, product creation, alert evaluation, and transaction creation in one orchestrated handler.
- Rationale: Guarantees consistent side effects and predictable error handling.
- Alternative considered: Scatter side effects across contexts/hooks.
- Why not: Harder to reason about ordering and test integration behavior.

4. Context dependency gating on Step 1
- Decision: Disable progression when no categories or active suppliers exist and show actionable messaging.
- Rationale: Prevents incomplete records and matches documented edge-case expectations.
- Alternative considered: Allowing temporary empty selection.
- Why not: Violates required-field constraints and creates invalid entities.

5. Accessibility-first navigation behavior
- Decision: Move focus to first field on step change, support Escape to leave wizard, and mark active step with `aria-current="step"`.
- Rationale: Ensures keyboard and assistive-technology usability in a multi-step experience.
- Alternative considered: Passive visual-only step updates.
- Why not: Creates accessibility regressions and poor keyboard UX.

## Risks / Trade-offs

- [Risk] Submission flow touches multiple contexts and may fail partially if not ordered defensively.
  - Mitigation: Validate all data before side effects and apply deterministic action ordering (product -> alerts -> transaction).
- [Risk] Base64 image handling can increase localStorage size.
  - Mitigation: Cap image count, resize/compress before storing, and enforce per-image size thresholds.
- [Risk] Step-scoped validation can mask downstream issues until final submit.
  - Mitigation: Perform full schema validation on submit and surface field-specific errors.
- [Trade-off] No draft persistence avoids complexity but loses form data on refresh.
  - Mitigation: Keep wizard friction low and provide clear progress cues.

## Migration Plan

- Add wizard route and wire feature components/hooks.
- Integrate with existing providers without changing storage formats.
- Verify behavior with component/integration tests for critical scenarios.
- Rollback is low risk: remove route and feature files, leaving existing product flows intact.

## Open Questions

- Should image upload storage limits be configurable in settings or remain fixed defaults?
- Should SKU uniqueness become case-insensitive (recommended) or remain strict string match?
