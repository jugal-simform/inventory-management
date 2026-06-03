## ADDED Requirements

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
