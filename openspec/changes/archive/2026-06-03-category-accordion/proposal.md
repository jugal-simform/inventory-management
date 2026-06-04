## Why

Products currently lack visual grouping by category, making inventory navigation inefficient. A category accordion gives users a collapsible, category-organized view with stock health at a glance and full CRUD for categories.

## What Changes

- Extend `Category` type with `description`, `color`, `parentId`, `productCount` fields
- Upgrade `CategoryContext` with full CRUD actions: ADD, UPDATE, DELETE, MOVE_PRODUCTS
- Build `CategoryAccordion` feature: accordion UI, search, sort, subcategory tree, product mini-table per category
- Add `CategoryForm` dialog for add/edit with color picker and parentId support
- Add `CategoryManagement` page at `/categories` route
- Orphaned products (unknown categoryId) surfaced in "Uncategorized" virtual group

## Capabilities

### New Capabilities
- `category-accordion`: Accordion UI, CategoryItem/Header/Content/ProductList/Actions/Search/Sort components, subcategory tree (max depth 2), single-expand mode, search with auto-expand, responsive layout
- `category-context`: Full CRUD reducer actions (ADD_CATEGORY, UPDATE_CATEGORY, DELETE_CATEGORY, MOVE_PRODUCTS), productCount denormalization
- `category-form`: Add/Edit category dialog with zod validation, preset color palette + custom hex, parentId select for subcategories

### Modified Capabilities
- `add-product-wizard`: `?categoryId=` pre-fill from CategoryAccordion "Add Product" action (no spec requirement change — implementation only)

## Impact

- `src/types/index.ts`: `Category` interface extended
- `src/features/categories/context/CategoryContext.tsx`: new reducer actions + dispatch exposed
- `src/features/categories/components/`: all new component files
- `src/features/categories/hooks/`: useCategories, useCategoryTree, useCategorySort
- `src/features/categories/pages/`: CategoryManagement page
- `src/features/categories/schemas/`: categorySchema (zod)
- `src/App.tsx`: `/categories` route added
- Build must pass (TypeScript strict + Vite)
