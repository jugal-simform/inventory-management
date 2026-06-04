## Purpose

Provide CategoryContext for managing category state, CRUD operations, and persistence to localStorage.

## Requirements

### Requirement: Extended Category Type
The `Category` interface SHALL include optional fields: `description?: string`, `color?: string` (hex), `parentId?: string | null`, `productCount?: number`. Existing categories without these fields SHALL remain valid.

#### Scenario: Existing category without new fields is valid
- **WHEN** a stored category has only id, name, createdAt, updatedAt
- **THEN** the app renders it without error, treating missing fields as undefined/defaults

### Requirement: CategoryContext CRUD Actions
`CategoryContext` reducer SHALL handle: `ADD_CATEGORY` (appends new category), `UPDATE_CATEGORY` (replaces by id), `DELETE_CATEGORY` (removes by id), `MOVE_PRODUCTS` (updates categoryId on listed product ids — coordinated via ProductContext). The context SHALL expose `dispatch` to consumers.

#### Scenario: Add category appends to list
- **WHEN** `ADD_CATEGORY` is dispatched with a new category object
- **THEN** the category appears in `state.categories`

#### Scenario: Update category replaces by id
- **WHEN** `UPDATE_CATEGORY` is dispatched with an updated category
- **THEN** the matching category is replaced in state and `updatedAt` reflects the change

#### Scenario: Delete category removes by id
- **WHEN** `DELETE_CATEGORY` is dispatched with a category id
- **THEN** that category is no longer in `state.categories`

### Requirement: productCount Denormalization
`ADD_CATEGORY` SHALL initialize `productCount` to 0. `DELETE_CATEGORY` with product reassignment SHALL increment target category's `productCount` by the moved products count. `CategoryAccordion` SHALL also compute live counts from `ProductContext` for accurate display (denormalized count used for sort only).

#### Scenario: New category has zero productCount
- **WHEN** `ADD_CATEGORY` is dispatched
- **THEN** the new category's `productCount` is 0

#### Scenario: Live count computed from products
- **WHEN** a category is expanded in the accordion
- **THEN** the product count shown equals `products.filter(p => p.categoryId === category.id).length`

### Requirement: Context Persistence
`CategoryContext` SHALL persist `state.categories` to localStorage on every state change, using the existing `STORAGE_KEYS.categories` key. Hydration SHALL occur from localStorage on mount.

#### Scenario: Categories persist across reload
- **WHEN** the user adds a category and reloads the page
- **THEN** the new category is still present
