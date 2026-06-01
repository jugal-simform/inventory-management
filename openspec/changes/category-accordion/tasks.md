## 1. shadcn UI Components

- [x] 1.1 Add `accordion` shadcn component via `npx shadcn@latest add accordion`
- [x] 1.2 Add `dialog` shadcn component via `npx shadcn@latest add dialog`
- [x] 1.3 Add `select` shadcn component via `npx shadcn@latest add select`
- [x] 1.4 Add `dropdown-menu` shadcn component via `npx shadcn@latest add dropdown-menu`
- [x] 1.5 Add `tooltip` shadcn component via `npx shadcn@latest add tooltip`
- [x] 1.6 Add `separator` shadcn component via `npx shadcn@latest add separator`

## 2. Type Extension

- [x] 2.1 Extend `Category` interface in `src/types/index.ts` with optional fields: `description?: string`, `color?: string`, `parentId?: string | null`, `productCount?: number`

## 3. CategoryContext CRUD

- [x] 3.1 Add `CategoryAction` union types: `ADD_CATEGORY`, `UPDATE_CATEGORY`, `DELETE_CATEGORY`, `MOVE_PRODUCTS` (with payload types) in `CategoryContext.tsx`
- [x] 3.2 Implement reducer cases for all 4 new actions; `ADD_CATEGORY` sets `productCount: 0`; `UPDATE_CATEGORY` sets `updatedAt`; `DELETE_CATEGORY` removes by id; `MOVE_PRODUCTS` updates `productCount` on source and target
- [x] 3.3 Expose `dispatch` from `CategoryProvider` via context value; add typed action creator helpers: `addCategory`, `updateCategory`, `deleteCategory`
- [x] 3.4 Update `useCategories()` hook to also return `addCategory`, `updateCategory`, `deleteCategory`, `dispatch`

## 4. Category Schemas

- [x] 4.1 Create `src/features/categories/schemas/categorySchema.ts` with zod schema: `name` (min 2, max 50), `description` (max 200, optional, default ''), `parentId` (nullable, default null), `color` (hex regex, default '#3b82f6')
- [x] 4.2 Export `CategoryFormValues` type inferred from schema

## 5. Category Hooks

- [x] 5.1 Create `src/features/categories/hooks/useCategoryTree.ts` — `buildCategoryTree` fn (2-pass map), `useCategoryTree` hook returning `CategoryTreeNode[]` via `useMemo`; appends synthetic "Uncategorized" node for orphaned products
- [x] 5.2 Create `src/features/categories/hooks/useCategorySort.ts` — sort state for 5 options (`name_asc`, `name_desc`, `productCount_desc`, `productCount_asc`, `updatedAt_desc`); returns sorted tree
- [x] 5.3 Create `src/features/categories/hooks/useCategories.ts` — re-export or wrap context hook with search filter fn `filterCategories(tree, searchTerm)` that preserves parent nodes with matching children

## 6. CategoryForm Component

- [x] 6.1 Create `src/features/categories/components/CategoryForm.tsx` — dialog with react-hook-form + zod resolver; fields: name (Input), description (Textarea), parentId (Select, disabled when pre-filled), color (swatch palette + hex Input)
- [x] 6.2 Implement color swatch palette with 10 preset colors; clicking swatch calls `setValue('color', hex)`; custom hex input also updates field
- [x] 6.3 On submit: dispatch `ADD_CATEGORY` (new id via `crypto.randomUUID()`, timestamps) or `UPDATE_CATEGORY`; close dialog; call `toast.success()`
- [x] 6.4 Accept props: `defaultValues?: Partial<CategoryFormValues>`, `categoryId?: string` (edit mode), `lockedParentId?: string` (subcategory mode), `onClose: () => void`

## 7. Category UI Components

- [x] 7.1 Create `src/features/categories/components/CategoryHeader.tsx` — renders color dot, name (truncate with Tooltip for long names), product count Badge, stock health dots (green/amber/red), ChevronDown with `rotate-180` when expanded
- [x] 7.2 Create `src/features/categories/components/CategoryActions.tsx` — DropdownMenu with actions: Edit Category, Add Subcategory (hidden when `depth >= 1`), Add Product to Category, Move All Products, Delete Category
- [x] 7.3 Create `src/features/categories/components/CategoryProductList.tsx` — mini-table (desktop) / card stack (mobile): columns Product Name, SKU, Quantity + status Badge, Selling Price, Actions (Edit/Restock/View buttons opening ProductDialog or navigating)
- [x] 7.4 Create `src/features/categories/components/CategoryContent.tsx` — info bar (description + Edit + Delete buttons) + `<CategoryProductList />` + `EmptyState` when no products
- [x] 7.5 Implement delete flow in `CategoryContent` / `CategoryActions`: block if has subcategories (toast error), show reassignment dialog if has products, then dispatch `DELETE_CATEGORY`; show success toast
- [x] 7.6 Create `src/features/categories/components/CategoryItem.tsx` — wraps `AccordionItem` + `AccordionTrigger` (with `CategoryHeader`) + `AccordionContent` (with `CategoryContent` + nested `CategoryItem` children); accepts `depth` prop
- [x] 7.7 Create `src/features/categories/components/CategoryAccordion.tsx` — renders shadcn `Accordion type="single" collapsible`; maps over `categoryTree`; shows "Click a category to see its products" when all collapsed
- [x] 7.8 Create `src/features/categories/components/CategorySearch.tsx` — controlled Input with search icon; calls `onSearch(value)` on change; shows clear button when non-empty
- [x] 7.9 Create `src/features/categories/components/CategorySortDropdown.tsx` — Select with 5 sort options; calls `onSort(value)` on change

## 8. CategoryManagement Page

- [x] 8.1 Create `src/features/categories/pages/CategoryManagement.tsx` — page component with: page header ("Categories" + "Add Category" button), `CategorySearch`, `CategorySortDropdown`, `CategoryAccordion`; wires search + sort + tree state; manages `CategoryForm` dialog open/close state
- [x] 8.2 Handle "No categories match your search" empty state when filtered tree is empty

## 9. Routing

- [x] 9.1 Update `src/App.tsx` to add react-router-dom `BrowserRouter`, `Routes`, `Route` with path `/categories` → `CategoryManagement`; ensure existing app content still renders (add a default route if needed)
- [x] 9.2 Wrap app with `CategoryProvider` and `ProductProvider` in `main.tsx` or `App.tsx` if not already done

## 10. Build Verification

- [x] 10.1 Run `npm run build` and fix all TypeScript errors
- [x] 10.2 Run `npm run dev` and manually verify: `/categories` route loads, accordion expand/collapse works, add/edit/delete category works, search and sort work
