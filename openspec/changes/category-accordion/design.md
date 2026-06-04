## Context

`Category` type is minimal (id, name, createdAt, updatedAt). `CategoryContext` exposes only `SET_CATEGORIES`. `categories/components`, `categories/hooks`, and `categories/pages` are empty. `App.tsx` has no routing yet. Products already have `categoryId` but no UI groups them visually.

Current theme: shadcn/ui + Tailwind. Existing feature: add-product-wizard uses `?categoryId=` query param (already navigates to `/products/new?categoryId=`).

## Goals / Non-Goals

**Goals:**
- Extend `Category` type without breaking existing usages (additive fields, all optional-safe)
- Full CRUD on `CategoryContext` exposed as typed dispatch
- `CategoryManagement` page at `/categories` with accordion, search, sort
- Subcategory tree (max depth 2), single-expand accordion, product mini-table per category
- `CategoryForm` dialog reused for add/edit/subcategory flows
- Build passes (TypeScript strict + Vite)
- No theme changes

**Non-Goals:**
- Drag-and-drop reordering
- Multi-expand mode
- Infinite subcategory nesting
- Backend/API integration (localStorage only)
- Unit test authoring (test scenarios defined in specs, not implemented here)

## Decisions

**Decision: Extend `Category` type additively**
Add `description?`, `color?`, `parentId?`, `productCount?` as optional fields. Existing data (e.g., the default "General" category) remains valid without migration. Context hydrates defaults on first use.
- Alternative: new `CategoryV2` type — rejected, unnecessary complexity

**Decision: Use shadcn `Accordion` (Radix) for collapse/expand**
Gives built-in accessibility (keyboard nav, aria-expanded) and CSS animations for free. Type `"single"` + `collapsible` enforces one-open-at-a-time.
- Alternative: manual div toggle — rejected, loses a11y and animation

**Decision: CategoryContext reducer handles CRUD + productCount**
`ADD_CATEGORY`, `UPDATE_CATEGORY`, `DELETE_CATEGORY`, `MOVE_PRODUCTS` actions. `productCount` is denormalized: incremented/decremented on product moves and adds.
- Alternative: derive productCount from ProductContext on every render — rejected, causes O(n) filter on every accordion render; denormalized counter is cheaper

**Decision: useCategoryTree builds tree in hook, not reducer**
Tree structure is derived state. Hook runs `buildCategoryTree` via `useMemo`. Reducer stores flat array (simpler persistence to localStorage).
- Alternative: store tree in reducer — rejected, nested structure is hard to update immutably

**Decision: CategoryForm reused across 3 flows**
Single `CategoryForm` component accepts `defaultValues` (pre-fills edit) and `parentId` prop (pre-fills subcategory). Keeps form logic DRY.

**Decision: Delete flow blocks if subcategories exist; prompts reassignment if products exist**
Matches doc spec. Simpler than auto-cascading deletes which risk data loss.

**Decision: Orphaned products shown in "Uncategorized" virtual group**
`useCategoryTree` appends a synthetic node when `products.some(p => !categoryMap.has(p.categoryId))`. Not persisted.

## Risks / Trade-offs

- `productCount` denormalization can drift if `ProductContext` updates happen outside `CategoryContext` → Mitigation: CategoryAccordion derives counts live from `products.filter()` as secondary display, denormalized count used only for sorting
- Max depth 2 enforced only in UI (hide "Add Subcategory" on depth-1 nodes) — not enforced in data layer → acceptable, the form doesn't surface parentId for already-nested cats
- `App.tsx` currently has no router — need to add `react-router-dom` and wrap routes → check if already installed before adding

## Migration Plan

1. Update `src/types/index.ts` — additive, no breaking changes
2. Update `CategoryContext.tsx` — new actions, expose `dispatch`
3. Create hooks, components, pages, schemas in `src/features/categories/`
4. Wire route in `App.tsx` (add react-router if missing)
5. No data migration needed — optional fields default gracefully
