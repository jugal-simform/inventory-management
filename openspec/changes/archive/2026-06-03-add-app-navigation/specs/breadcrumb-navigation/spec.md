## ADDED Requirements

### Requirement: Breadcrumb trail displays current location path
The system SHALL display a dynamic breadcrumb trail showing the current location and path within forms. The breadcrumb SHALL update as user navigates through wizard steps.

#### Scenario: Breadcrumb shown on product wizard page
- **WHEN** user is on the product wizard page
- **THEN** breadcrumb is displayed as "Products / Add Product / Step 1: Product Info"
- **AND** all three segments are visible

#### Scenario: Breadcrumb updates with wizard steps
- **WHEN** user advances to the next step in the product wizard
- **THEN** the breadcrumb updates to reflect the new step (e.g., "Step 2: Pricing")
- **AND** the update is instantaneous

#### Scenario: Breadcrumb shown on category form
- **WHEN** user is on the category form page
- **THEN** breadcrumb is displayed as "Categories / Add Category"
- **AND** both segments are visible

#### Scenario: Breadcrumb segments are separated by forward slash
- **WHEN** breadcrumb is rendered
- **THEN** each segment is separated by a forward slash (/)
- **AND** spacing around slashes is consistent

### Requirement: Breadcrumb segments are clickable navigation
Each breadcrumb segment (except the last) SHALL be a clickable link that navigates to that section. The last segment SHALL be text (not a link).

#### Scenario: User clicks first breadcrumb segment
- **WHEN** user clicks the first segment ("Products" or "Categories")
- **THEN** the system navigates to that page (/products or /categories)
- **AND** the form is closed

#### Scenario: User clicks intermediate breadcrumb segment
- **WHEN** user clicks an intermediate segment (e.g., "Add Product" while on "Step 2")
- **THEN** the system navigates to that step/section
- **AND** the view updates accordingly

#### Scenario: Last breadcrumb segment is not clickable
- **WHEN** breadcrumb is displayed
- **THEN** the last segment (current location) is displayed as plain text
- **AND** it is not styled as a link
- **AND** cursor does not change to pointer on hover

### Requirement: Breadcrumb respects unsaved changes
When user clicks a breadcrumb segment, the system SHALL check for unsaved changes and warn before navigating away.

#### Scenario: User clicks breadcrumb with unsaved changes
- **WHEN** user has made changes in a form
- **AND** user clicks a breadcrumb segment to navigate away
- **THEN** a confirmation modal is displayed
- **AND** user can choose to continue or cancel

#### Scenario: User clicks breadcrumb with no unsaved changes
- **WHEN** form is clean (no changes)
- **AND** user clicks a breadcrumb segment
- **THEN** the system navigates immediately without confirmation

### Requirement: Breadcrumb styling is readable and accessible
The breadcrumb SHALL have clear styling that indicates linkability and hierarchy.

#### Scenario: Breadcrumb links are visually distinct
- **WHEN** breadcrumb is rendered
- **THEN** clickable segments appear as links (underlined or color-coded)
- **AND** the last segment appears as regular text
- **AND** the distinction is clear to users

#### Scenario: Breadcrumb has adequate contrast
- **WHEN** breadcrumb is displayed
- **THEN** text color has adequate contrast with background
- **AND** links are distinguishable from regular text
