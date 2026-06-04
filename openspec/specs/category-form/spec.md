# category-form Specification

## Purpose

Provide a reusable CategoryForm component for adding and editing categories with validation, color picker, and parent category selection. Can be rendered as either a dialog or a full-screen form page.

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

### Requirement: Category form displays as full-screen page
The system SHALL render the category form as a full-screen page (not a modal dialog) when accessed via `/categories/new`. The form SHALL include breadcrumb navigation showing "Categories / Add Category" and SHALL be wrapped in the full-screen form layout with back and close buttons.

#### Scenario: Category form page displays at /categories/new
- **WHEN** user navigates to /categories/new
- **THEN** the category form is displayed in full-screen mode
- **AND** navigation bar is hidden
- **AND** breadcrumb shows "Categories / Add Category"

#### Scenario: Back button navigates from category form
- **WHEN** user is on the category form
- **THEN** a back button is visible in the breadcrumb area
- **AND** clicking it returns to /categories

#### Scenario: Close button closes category form
- **WHEN** user is on the category form
- **THEN** a close button (✕) is visible in the top right
- **AND** clicking it returns to /categories

#### Scenario: Form content is properly centered
- **WHEN** category form is displayed
- **THEN** form fields are centered with adequate padding
- **AND** form has reasonable maximum width for readability

### Requirement: Category form collects required category information
The system SHALL collect name, description, color, and parent category fields. Name and color SHALL be required, description and parent category are optional.

#### Scenario: Category name is required
- **WHEN** user attempts to submit without entering a name
- **THEN** the system shows validation error on the name field
- **AND** form submission is blocked

#### Scenario: Color is required
- **WHEN** user attempts to submit without selecting a color
- **THEN** the system shows validation error on the color field
- **AND** form submission is blocked

#### Scenario: Description is optional
- **WHEN** user submits form without providing description
- **THEN** the system accepts submission
- **AND** category is created with empty description

#### Scenario: Parent category is optional
- **WHEN** user submits form without selecting parent category
- **THEN** the system creates a top-level category
- **AND** no parent category is assigned

### Requirement: Color selection provides visual feedback
The form SHALL display preset color options and allow custom color input.

#### Scenario: Preset colors are displayed
- **WHEN** category form is displayed
- **THEN** preset color options are shown (approximately 10 colors)
- **AND** each color can be clicked to select it

#### Scenario: Selected color is visually highlighted
- **WHEN** user selects a color
- **THEN** the selected color has a visual indicator (outline or highlight)
- **AND** the indicator is clearly visible

#### Scenario: Custom color can be entered
- **WHEN** user enters a hex color code in the custom field
- **THEN** the system updates the selected color
- **AND** the form preview reflects the new color

### Requirement: Form submission creates or updates category
On successful submission, the system SHALL create a new category or update an existing one with the provided data.

#### Scenario: New category is created
- **WHEN** user completes all required fields and submits
- **THEN** the system creates a new category with provided data
- **AND** success message is displayed
- **AND** user is navigated to /categories

#### Scenario: Duplicate category names are allowed (different instances)
- **WHEN** user creates a category with a name that already exists
- **THEN** the system allows creation (no uniqueness constraint)
- **AND** both categories exist independently

### Requirement: Category form exposes dirty state
The form context SHALL expose an `isDirty` flag indicating whether user has made unsaved changes.

#### Scenario: Dirty flag on form entry
- **WHEN** user navigates to /categories/new
- **THEN** the form context has `isDirty = false`

#### Scenario: Dirty flag on field edit
- **WHEN** user enters or modifies any field value
- **THEN** the form context has `isDirty = true`

#### Scenario: Dirty flag after submission
- **WHEN** user successfully submits the form
- **THEN** the form context has `isDirty = false`
- **AND** navigation away does not trigger unsaved changes warning
