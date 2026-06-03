## MODIFIED Requirements

### Requirement: Wizard Route and Step Navigation
The system SHALL provide a product creation wizard at `/products/new` with three ordered steps: Product Information, Pricing, and Stock Details. The system SHALL render a step indicator that reflects completed, current, and upcoming states, and SHALL only allow progression to the next step when the current step is valid. The wizard SHALL be wrapped in a full-screen form layout with breadcrumb navigation showing "Products / Add Product / Step X: <StepName>".

#### Scenario: Breadcrumb shows current step
- **WHEN** the user is on Step 2 of the wizard
- **THEN** the breadcrumb displays "Products / Add Product / Step 2: Pricing"
- **AND** all three segments are visible and clickable (except the last)

#### Scenario: Breadcrumb updates when advancing steps
- **WHEN** the user clicks Next to advance from Step 1 to Step 2
- **THEN** the breadcrumb updates to show "Step 2: Pricing"
- **AND** update is instantaneous

#### Scenario: User can navigate back via breadcrumb
- **WHEN** the user is on Step 3
- **AND** the user clicks "Add Product" segment in breadcrumb
- **THEN** the system navigates back to Step 1 (or exits if not dirty)
- **AND** step data is preserved if form is dirty

#### Scenario: Back button available on wizard
- **WHEN** user is viewing the wizard
- **THEN** a back button is visible in the breadcrumb area
- **AND** clicking it navigates to the previous page with unsaved changes warning

#### Scenario: Close button available on wizard
- **WHEN** user is viewing the wizard
- **THEN** a close button (✕) is visible in the top right
- **AND** clicking it navigates away with unsaved changes warning

### Requirement: Wizard exposes dirty state for form validation
The wizard form context SHALL expose an `isDirty` flag indicating whether user has made unsaved changes.

#### Scenario: Dirty flag is false on initial load
- **WHEN** user navigates to /products/new
- **THEN** the wizard form context has `isDirty = false`

#### Scenario: Dirty flag becomes true when field is edited
- **WHEN** user enters or modifies any field value
- **THEN** the wizard form context has `isDirty = true`
- **AND** remains true until form is submitted

#### Scenario: Dirty flag is false after successful submission
- **WHEN** user successfully submits the wizard
- **THEN** the wizard form context has `isDirty = false`
- **AND** no warning appears when navigating away after submission

## REMOVED Requirements

None - all existing wizard requirements remain in effect.
