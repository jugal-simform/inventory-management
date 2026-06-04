## 1. Wizard Foundation and Routing

- [x] 1.1 Create `src/features/wizard/` module structure with `components/`, `hooks/`, and `validation.ts`
- [x] 1.2 Add Add Product Wizard route at `/products/new` and wire route component export
- [x] 1.3 Implement `WizardShell` and `StepIndicator` with three-step state rendering and active-step semantics

## 2. Form Model and Validation

- [x] 2.1 Implement `useWizardForm` with React Hook Form default values including `categoryId` query prefill
- [x] 2.2 Implement Step 1, Step 2, and Step 3 Zod schemas in `validation.ts` with documented constraints
- [x] 2.3 Implement `useWizardNavigation` with step-scoped `trigger` validation and bounded next/back controls

## 3. Step UI Implementation

- [x] 3.1 Build `Step1ProductInfo` fields for name/description/SKU/barcode/category/supplier/tags/images
- [x] 3.2 Add Step 1 dependency-empty states for no categories or no active suppliers and block progression
- [x] 3.3 Build `Step2Pricing` fields and profit margin display from current form values
- [x] 3.4 Build `Step3StockDetails` fields including optional max/location/weight/dimensions inputs

## 4. Submission Orchestration and Side Effects

- [x] 4.1 Implement final submit handler for full validation, ID generation, timestamping, and SKU auto-generation
- [x] 4.2 Enforce SKU uniqueness on submit and surface duplicate errors on the SKU field
- [x] 4.3 Dispatch product creation and create initial restock transaction with previous/new quantity values
- [x] 4.4 Invoke alert logic to create low-stock and out-of-stock alerts from initial quantity thresholds
- [x] 4.5 Show success toast and navigate to `/products` after successful creation

## 5. Accessibility and Keyboard Behavior

- [x] 5.1 Add explicit labels and `aria-describedby` links for all wizard inputs and error messages
- [x] 5.2 Move focus to the first field on step transitions and preserve keyboard tab flow
- [x] 5.3 Add Escape key handler to exit wizard to `/products`

## 6. Tests and Verification

- [x] 6.1 Add component tests for step rendering, required validation errors, and guarded navigation
- [x] 6.2 Add integration tests for submit side effects: product creation, duplicate SKU rejection, alert generation, transaction creation
- [x] 6.3 Add test coverage for query-parameter category prefill and Escape-key navigation behavior
