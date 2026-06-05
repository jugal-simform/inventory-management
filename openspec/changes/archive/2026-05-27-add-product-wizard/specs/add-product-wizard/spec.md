## ADDED Requirements

### Requirement: Wizard Route and Step Navigation
The system SHALL provide a product creation wizard at `/products/new` with three ordered steps: Product Information, Pricing, and Stock Details. The system SHALL render a step indicator that reflects completed, current, and upcoming states, and SHALL only allow progression to the next step when the current step is valid.

#### Scenario: User advances through valid steps
- **WHEN** the user completes all required fields on the current step and activates Next
- **THEN** the system advances to the next step and preserves previously entered data

#### Scenario: User blocked on invalid step
- **WHEN** required fields on the current step are missing or invalid and the user activates Next
- **THEN** the system remains on the current step and displays validation errors for the invalid fields

### Requirement: Product Information Capture
The system SHALL collect Step 1 fields for name, description, SKU, barcode, category, supplier, tags, and images. Name, category, and supplier SHALL be required. If no categories or no active suppliers exist, the system SHALL present actionable empty-state guidance and SHALL prevent progressing to Step 2.

#### Scenario: Required product information is missing
- **WHEN** the user attempts to continue from Step 1 without a valid name, category, or supplier
- **THEN** the system shows field-level validation messages and does not advance

#### Scenario: Missing dependency data prevents progression
- **WHEN** there are zero categories or zero active suppliers available
- **THEN** the system shows guidance to create missing dependencies and disables progression

### Requirement: Pricing Validation and Margin Display
The system SHALL collect cost price and selling price in Step 2. The system SHALL require both values to be positive numbers and SHALL reject selling price values lower than cost price. The system SHALL display profit margin as `((selling - cost) / selling) * 100` based on entered values.

#### Scenario: Invalid selling price relationship
- **WHEN** the user enters a selling price lower than cost price
- **THEN** the system shows an error on selling price and blocks progression

#### Scenario: Margin display updates from price inputs
- **WHEN** the user enters valid cost and selling prices
- **THEN** the system displays the computed profit margin from the current values

### Requirement: Stock Details Validation
The system SHALL collect Step 3 fields for initial quantity, unit, minimum stock level, optional maximum stock level, location, optional weight, and optional dimensions. Quantity and minimum stock level SHALL be non-negative, unit SHALL be one of `pieces|kg|liters|meters|boxes`, max stock SHALL be greater than min stock when provided, weight SHALL be positive when provided, and dimensions SHALL require all length/width/height values together when provided.

#### Scenario: Stock inputs violate constraints
- **WHEN** the user submits Step 3 with negative quantities or invalid optional constraints
- **THEN** the system shows field-level validation errors and blocks submission

#### Scenario: Valid stock inputs pass validation
- **WHEN** the user provides values that satisfy all stock constraints
- **THEN** the system accepts Step 3 validation and allows final submission

### Requirement: Submit Orchestration and Side Effects
The system SHALL, on successful final submission, generate a product ID, default SKU as `SKU-${Date.now()}` when SKU is blank, enforce SKU uniqueness across existing products, create a product entity with timestamps, dispatch product creation, create stock alerts based on initial quantity versus minimum stock thresholds, create an initial restock transaction, show success feedback, and navigate to `/products`.

#### Scenario: Duplicate SKU is rejected
- **WHEN** the user submits a SKU that already exists in products
- **THEN** the system rejects submission and displays a SKU duplication error on Step 1

#### Scenario: Low stock and out-of-stock alerts are derived
- **WHEN** a product is submitted with quantity less than or equal to min stock level
- **THEN** the system creates a low-stock alert, and if quantity equals zero it also creates an out-of-stock alert

#### Scenario: Successful submit creates all records
- **WHEN** all fields are valid and SKU uniqueness checks pass
- **THEN** the system creates the product, creates the initial restock transaction, shows success toast, and navigates to `/products`

### Requirement: Query Prefill and Accessibility Behavior
The system SHALL read `categoryId` from query parameters on `/products/new` and prefill Step 1 category when present. The wizard SHALL support keyboard navigation, Escape key exit to `/products`, step focus management, active step semantics via `aria-current="step"`, field labels, and accessible error associations.

#### Scenario: Category prefill from query parameter
- **WHEN** the user opens `/products/new?categoryId=<id>` and the category exists
- **THEN** the system initializes Step 1 category with the provided ID

#### Scenario: Escape key exits wizard
- **WHEN** the user presses Escape while in the wizard
- **THEN** the system navigates to `/products`
