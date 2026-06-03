## Purpose

Render categories as an expandable accordion with nested subcategories, search, sort, CRUD operations, and responsive product listing.

## Requirements

### Requirement: Category Accordion Page
The system SHALL provide a `/categories` route rendering a `CategoryManagement` page. The page SHALL display a page header with an "Add Category" button, a `CategorySearch` bar, a `CategorySortDropdown`, and a `CategoryAccordion` listing all top-level categories with nested subcategories.

#### Scenario: Page renders category list
- **WHEN** the user navigates to `/categories`
- **THEN** the system displays all top-level categories as accordion items, each showing color dot, name, product count badge, and stock health indicators

#### Scenario: All categories collapsed initial state
- **WHEN** the page first loads with no expanded category
- **THEN** the system shows helper text "Click a category to see its products" below the accordion

### Requirement: Single-Expand Accordion Behavior
The system SHALL use shadcn `Accordion` with `type="single"` and `collapsible`. Opening one category SHALL collapse any previously open category. Toggling an already-open category SHALL collapse it.

#### Scenario: Opening one category closes another
- **WHEN** category A is expanded and the user clicks category B header
- **THEN** category A collapses and category B expands

#### Scenario: Toggling open category collapses it
- **WHEN** category A is expanded and the user clicks category A header
- **THEN** category A collapses

### Requirement: Category Header Display
Each `CategoryHeader` SHALL render: a color dot (`h-3 w-3 rounded-full` with `backgroundColor: category.color`), category name (`font-medium`), product count badge (`Badge variant="secondary"`), stock health indicators (green/amber/red dots with counts), and a `ChevronDown` icon that rotates 180° when expanded.

#### Scenario: Color dot reflects category color
- **WHEN** a category has `color: "#ef4444"`
- **THEN** the header shows a red circular dot

#### Scenario: Expand arrow rotates when open
- **WHEN** the accordion item is expanded
- **THEN** the `ChevronDown` icon has `rotate-180` applied

### Requirement: Category Content Expanded View
The expanded `CategoryContent` SHALL show an info bar with category description and Edit/Delete buttons, followed by a `CategoryProductList` mini-table.

#### Scenario: Info bar shows description and actions
- **WHEN** a category is expanded
- **THEN** description text, an "Edit" outline button, and a "Delete" destructive button are visible

#### Scenario: Mini-table columns
- **WHEN** a category with products is expanded
- **THEN** the product list shows columns: Product Name, SKU (monospace), Quantity + Status Badge, Selling Price, and Actions (Edit/Restock/View)

### Requirement: Empty Category State
When a category has no products, the expanded content SHALL render an `EmptyState` with message "No products in this category yet." and an "Add Product" button that navigates to `/products/new?categoryId={id}`.

#### Scenario: Empty category shows empty state
- **WHEN** a category with 0 products is expanded
- **THEN** the system shows the empty state message and "Add Product" button

### Requirement: Subcategory Nesting
`CategoryItem` SHALL render child `CategoryItem` components (depth=1) nested inside the parent's expanded content when `category.children` is non-empty. Subcategories SHALL be indented by `paddingLeft: depth * 24` px. "Add Subcategory" action SHALL be hidden on depth-1 items.

#### Scenario: Subcategories render nested
- **WHEN** a top-level category with subcategories is expanded
- **THEN** subcategory items appear indented inside the parent content

#### Scenario: No "Add Subcategory" on depth-1
- **WHEN** a subcategory (depth=1) actions menu is opened
- **THEN** "Add Subcategory" action is absent

### Requirement: Category Search
`CategorySearch` SHALL filter categories by name (case-insensitive). Matching categories SHALL auto-expand. If no categories match, the system SHALL show "No categories match your search" empty state.

#### Scenario: Search filters by name
- **WHEN** the user types "elect" in the search bar
- **THEN** only categories whose name contains "elect" (or that have matching subcategories) are shown

#### Scenario: No search matches
- **WHEN** the user types a string matching no category names
- **THEN** the system shows "No categories match your search"

### Requirement: Category Sort
`CategorySortDropdown` SHALL support options: Name (A-Z), Name (Z-A), Most Products, Fewest Products, Recently Updated. Selecting a sort option SHALL re-order the displayed category list.

#### Scenario: Sort by name A-Z
- **WHEN** the user selects "Name (A-Z)"
- **THEN** categories render in ascending alphabetical order

#### Scenario: Sort by most products
- **WHEN** the user selects "Most Products"
- **THEN** categories with higher productCount render first

### Requirement: Category Actions Context Menu
Each `CategoryItem` SHALL expose a three-dot menu (`CategoryActions`) with actions: Edit Category, Add Subcategory (depth-0 only), Add Product to Category, Move All Products, Delete Category.

#### Scenario: Edit action opens prefilled form
- **WHEN** the user selects "Edit Category" from the context menu
- **THEN** `CategoryForm` dialog opens with current category values pre-filled

#### Scenario: Add Product navigates with categoryId
- **WHEN** the user selects "Add Product to Category"
- **THEN** the app navigates to `/products/new?categoryId={category.id}`

### Requirement: Delete Category Flow
Delete SHALL: block if subcategories exist (show error "Remove or reassign subcategories first"); if products exist, show a reassignment dialog where the user selects a target category before deletion; then dispatch `DELETE_CATEGORY` and show a success toast.

#### Scenario: Delete blocked when subcategories exist
- **WHEN** the user attempts to delete a category that has subcategories
- **THEN** the system shows "Remove or reassign subcategories first" and does not delete

#### Scenario: Delete with product reassignment
- **WHEN** the user attempts to delete a category with products and selects a target category
- **THEN** all products move to the target category, then the category is deleted and a success toast appears

### Requirement: Orphaned Products Virtual Group
When products exist whose `categoryId` does not match any category, the system SHALL render an "Uncategorized" virtual accordion group at the bottom listing those products.

#### Scenario: Orphaned products shown in Uncategorized
- **WHEN** a product's categoryId references a deleted category
- **THEN** that product appears in an "Uncategorized" group at the bottom of the accordion

### Requirement: Responsive Layout
On mobile (default), `CategoryProductList` SHALL stack product entries as cards vertically. On desktop (`lg:`), it SHALL render as a mini-table.

#### Scenario: Mobile layout uses cards
- **WHEN** viewport is mobile width
- **THEN** products within an expanded category display as stacked cards, not table rows

### Requirement: Accessibility
Accordion sections SHALL be openable/closable with Enter or Space. Arrow keys SHALL navigate between category headers. Screen readers SHALL announce expanded/collapsed state. Focus SHALL move into expanded content when a section opens.

#### Scenario: Keyboard expand/collapse
- **WHEN** a category header is focused and the user presses Enter
- **THEN** the accordion toggles open or closed
