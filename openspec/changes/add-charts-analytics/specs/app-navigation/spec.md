## MODIFIED Requirements

### Requirement: Navigation bar displays main sections
The system SHALL display a persistent navigation bar at the top of the page showing Products, Categories, and Analytics buttons. The nav bar SHALL be visible on main content pages and hidden when displaying full-screen forms.

#### Scenario: Nav bar visible on Products page
- **WHEN** user is on the Products page
- **THEN** the navigation bar shows Products, Categories, and Analytics buttons
- **AND** Products button is highlighted/active
- **AND** Categories and Analytics buttons are clickable

#### Scenario: Nav bar visible on Categories page
- **WHEN** user is on the Categories page
- **THEN** the navigation bar shows Products, Categories, and Analytics buttons
- **AND** Categories button is highlighted/active
- **AND** Products and Analytics buttons are clickable

#### Scenario: Nav bar visible on Analytics page
- **WHEN** user is on the Analytics page
- **THEN** the navigation bar shows Products, Categories, and Analytics buttons
- **AND** Analytics button is highlighted/active
- **AND** Products and Categories buttons are clickable

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

## ADDED Requirements

### Requirement: Analytics button in navigation
The system SHALL include an Analytics button in the navigation bar that links to the analytics dashboard.

#### Scenario: Analytics button navigates to dashboard
- **WHEN** user clicks the Analytics button
- **THEN** the system navigates to /analytics
- **AND** the Analytics dashboard page is displayed

#### Scenario: Analytics button shows correct icon
- **WHEN** the navigation bar is rendered
- **THEN** the Analytics button displays with an appropriate chart/analytics icon
