# unsaved-changes-detection Specification

## Purpose
Define the canonical requirements for detecting and handling unsaved form changes, with confirmation prompts before navigation and state tracking across form steps.

## Requirements

### Requirement: System detects unsaved form changes
The system SHALL track whether the user has made any changes to form fields that have not been saved.

#### Scenario: Form is initially clean
- **WHEN** user navigates to a form page
- **THEN** the form is marked as clean (no unsaved changes)
- **AND** back/close buttons do not trigger warnings

#### Scenario: Form becomes dirty when user types
- **WHEN** user enters text in any form field
- **THEN** the form is immediately marked as dirty
- **AND** the system knows there are unsaved changes

#### Scenario: Form becomes dirty when user selects dropdown option
- **WHEN** user selects a value from a dropdown/select field
- **THEN** the form is immediately marked as dirty
- **AND** the system knows there are unsaved changes

#### Scenario: Form becomes dirty when user uploads file
- **WHEN** user uploads an image or file
- **THEN** the form is immediately marked as dirty
- **AND** the system knows there are unsaved changes

#### Scenario: Form is clean after successful submission
- **WHEN** user submits a form successfully
- **THEN** the form is marked as clean
- **AND** no unsaved changes warning appears on subsequent navigation

### Requirement: Confirmation modal appears when navigating with unsaved changes
When user attempts to leave a form with unsaved changes, the system SHALL display a confirmation modal.

#### Scenario: Confirmation appears on back button click with unsaved changes
- **WHEN** form has unsaved changes
- **AND** user clicks the back button
- **THEN** a confirmation modal appears
- **AND** modal asks user to confirm they want to discard changes
- **AND** modal provides "Discard" and "Cancel" options

#### Scenario: Confirmation appears on close button click with unsaved changes
- **WHEN** form has unsaved changes
- **AND** user clicks the close button
- **THEN** a confirmation modal appears
- **AND** modal asks user to confirm they want to discard changes
- **AND** modal provides "Discard" and "Cancel" options

#### Scenario: Confirmation appears on breadcrumb navigation with unsaved changes
- **WHEN** form has unsaved changes
- **AND** user clicks a breadcrumb segment to navigate away
- **THEN** a confirmation modal appears
- **AND** modal asks user to confirm they want to discard changes
- **AND** modal provides "Discard" and "Cancel" options

#### Scenario: No confirmation appears on navigation without unsaved changes
- **WHEN** form is clean (no unsaved changes)
- **AND** user clicks back button, close button, or breadcrumb segment
- **THEN** no confirmation modal appears
- **AND** user navigates immediately

### Requirement: Confirmation modal provides clear choices
The confirmation modal SHALL clearly present the consequences of each choice.

#### Scenario: Discard option confirms and navigates away
- **WHEN** confirmation modal is displayed
- **AND** user clicks "Discard" button
- **THEN** form changes are discarded
- **AND** system navigates to the target page
- **AND** no error appears

#### Scenario: Cancel option keeps form open
- **WHEN** confirmation modal is displayed
- **AND** user clicks "Cancel" button
- **THEN** modal closes
- **AND** form remains open
- **AND** unsaved changes are preserved

### Requirement: Unsaved changes detection works across wizard steps
Product wizard SHALL track unsaved changes across all steps.

#### Scenario: Moving between wizard steps with changes
- **WHEN** user fills in Step 1 fields
- **AND** user clicks "Next" to go to Step 2
- **THEN** data is preserved and form remains dirty
- **AND** no warning appears (moving within form is expected)

#### Scenario: Exiting wizard with unsaved changes
- **WHEN** user has filled some wizard steps
- **AND** user clicks back button to exit the wizard entirely
- **THEN** confirmation modal appears
- **AND** user is warned that changes will be lost
