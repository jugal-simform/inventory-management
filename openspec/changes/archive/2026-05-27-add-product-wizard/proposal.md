## Why

StockBase currently lacks a guided creation flow for products, which makes product onboarding error-prone and inconsistent across required inventory fields. A dedicated wizard is needed now to improve data quality, enforce validation rules, and ensure related stock alerts and initial transaction records are created consistently.

## What Changes

- Add a new 3-step Add Product Wizard route at `/products/new` with step-specific validation and progress indication.
- Implement Step 1 (product info), Step 2 (pricing), and Step 3 (stock details) with React Hook Form + Zod schemas.
- Add navigation behavior for next/back/submit, including per-step validation and submit-time full validation.
- Implement submit orchestration to create product records, enforce SKU uniqueness, create initial stock transaction, and trigger low/out-of-stock alerts.
- Support `categoryId` URL query prefill and empty-state behavior when categories or active suppliers are missing.
- Ensure accessibility and keyboard behavior for step focus, escape navigation, labels, and error linking.

## Capabilities

### New Capabilities
- `add-product-wizard`: Multi-step product creation workflow with validated inputs, stock initialization, alert generation, and transaction creation.

### Modified Capabilities
- None.

## Impact

- Affected areas include routing, shared wizard components, and new feature module files under `src/features/wizard/`.
- Integrates with category, supplier, product, alert, and transaction contexts/hooks.
- No backend/API changes; data persistence continues through localStorage-based providers.
