## Purpose

Provide a reusable CategoryForm dialog for adding and editing categories with validation, color picker, and parent category selection.

## Requirements

### Requirement: Category Form Schema
`CategoryForm` SHALL validate with zod: `name` (string, min 2, max 50, required), `description` (string, max 200, optional, default ''), `parentId` (string nullable, default null), `color` (string matching `/^#[0-9a-fA-F]{6}$/`, default '#3b82f6').

#### Scenario: Name too short shows error
- **WHEN** the user submits with a name shorter than 2 characters
- **THEN** the system shows "Category name is required" field error

#### Scenario: Invalid hex color rejected
- **WHEN** the user enters a malformed color string
- **THEN** the system shows "Invalid color" field error

### Requirement: Color Picker
`CategoryForm` SHALL provide a preset palette of 8-10 colors rendered as clickable swatches. Clicking a swatch SHALL set the `color` field. A text input for custom hex SHALL also be available.

#### Scenario: Swatch click sets color
- **WHEN** the user clicks a color swatch
- **THEN** the `color` field updates to that swatch's hex value

#### Scenario: Custom hex input accepted
- **WHEN** the user types a valid 6-digit hex in the custom input
- **THEN** the form accepts the value and shows a preview

### Requirement: Parent Category Select
When used for "Add Subcategory", `CategoryForm` SHALL pre-fill `parentId` with the parent category's id and disable the field. When used for top-level add or edit, `parentId` SHALL be selectable from existing top-level categories (or null for "None").

#### Scenario: Subcategory form locks parentId
- **WHEN** `CategoryForm` opens via "Add Subcategory" on category X
- **THEN** `parentId` is pre-filled with X's id and the field is disabled

#### Scenario: Edit form allows parentId change
- **WHEN** `CategoryForm` opens for editing an existing subcategory
- **THEN** the user can change `parentId` to promote to top-level (null) or re-parent

### Requirement: Form Submit Dispatches Action
On valid submit, `CategoryForm` SHALL dispatch `ADD_CATEGORY` (new) or `UPDATE_CATEGORY` (edit) with a generated id (new) or existing id (edit), current timestamps, and form values. The dialog SHALL close on success and show a toast.

#### Scenario: Add dispatches ADD_CATEGORY
- **WHEN** the user fills valid fields and submits the add form
- **THEN** `ADD_CATEGORY` is dispatched, the dialog closes, and a success toast appears

#### Scenario: Edit dispatches UPDATE_CATEGORY
- **WHEN** the user edits and submits an existing category
- **THEN** `UPDATE_CATEGORY` is dispatched with the existing id and updated fields
