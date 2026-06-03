## ADDED Requirements

### Requirement: Navigation bar displays main sections
The system SHALL display a persistent navigation bar at the top of the page showing Products and Categories buttons. The nav bar SHALL be visible on main content pages and hidden when displaying full-screen forms.

#### Scenario: Nav bar visible on Products page
- **WHEN** user is on the Products page
- **THEN** the navigation bar shows Products and Categories buttons
- **AND** Products button is highlighted/active
- **AND** Categories button is clickable

#### Scenario: Nav bar visible on Categories page
- **WHEN** user is on the Categories page
- **THEN** the navigation bar shows Products and Categories buttons
- **AND** Categories button is highlighted/active
- **AND** Products button is clickable

#### Scenario: Nav bar hidden during product wizard
- **WHEN** user navigates to the product wizard (/products/new)
- **THEN** the navigation bar is hidden (faded out)
- **AND** breadcrumb trail replaces the nav bar position
- **AND** back button and close button are visible

#### Scenario: Nav bar hidden during category form
- **WHEN** user navigates to the category form (/categories/new)
- **THEN** the navigation bar is hidden (faded out)
- **AND** breadcrumb trail replaces the nav bar position
- **AND** back button and close button are visible

### Requirement: Navigation buttons are clickable and functional
Each navigation button SHALL function as a link to its corresponding section.

#### Scenario: Products button navigates to products list
- **WHEN** user clicks the Products button
- **THEN** the system navigates to /products
- **AND** the Products page content is displayed

#### Scenario: Categories button navigates to categories page
- **WHEN** user clicks the Categories button
- **THEN** the system navigates to /categories
- **AND** the Categories page content is displayed

### Requirement: Navigation bar styling is clean and minimal
The navigation bar SHALL have a clean, minimal design with consistent spacing and typography.

#### Scenario: Nav bar layout is horizontal
- **WHEN** the nav bar is rendered
- **THEN** buttons are arranged horizontally
- **AND** there is adequate spacing between buttons
- **AND** the bar has subtle visual separation from content below

#### Scenario: Nav bar provides visual feedback for active section
- **WHEN** user is viewing a section
- **THEN** the corresponding nav button is visually highlighted (underline, color change, or similar)
- **AND** the highlight is persistent until user navigates to a different section
