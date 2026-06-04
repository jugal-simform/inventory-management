## ADDED Requirements

### Requirement: Low-stock alert indicator
System SHALL display an alert indicator showing count of products below stock threshold.

#### Scenario: Alert displays low-stock count
- **WHEN** analytics dashboard loads
- **THEN** system shows alert card displaying number of products with stock below 10 units

#### Scenario: Alert displays zero low-stock products
- **WHEN** all products have stock >= 10 units
- **THEN** system displays alert card showing "0 products" or positive status message

#### Scenario: Alert updates when product stock changes
- **WHEN** product stock is updated to fall below or above threshold
- **THEN** system updates alert count in real-time

### Requirement: Low-stock product visibility
System SHALL provide ability to identify which specific products are low-stock.

#### Scenario: User can view low-stock product list
- **WHEN** user clicks on low-stock alert card
- **THEN** system displays a list or table of products with stock < 10 units, showing product name and current stock

#### Scenario: Low-stock list shows sufficient detail
- **WHEN** low-stock product list is displayed
- **THEN** system shows product name, current stock level, and category for each low-stock product

#### Scenario: Empty low-stock list
- **WHEN** no products exist with low stock
- **THEN** system displays low-stock list with "No low-stock products" message

### Requirement: Low-stock threshold
System SHALL use a consistent threshold for identifying low-stock products.

#### Scenario: Products at threshold boundary
- **WHEN** product stock equals 10 units
- **THEN** system treats product as normal stock (not low-stock)

#### Scenario: Products below threshold
- **WHEN** product stock is 9 units or less
- **THEN** system identifies product as low-stock
