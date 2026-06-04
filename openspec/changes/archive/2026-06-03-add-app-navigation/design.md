## Context

App currently uses flat routing with no layout nesting. Three main pages (ProductsPage, CategoryManagement, AddProductWizard) have no shared navigation. Users must navigate via URL or ad-hoc links. Wizard steps have internal step indicator but no global breadcrumb context. Category form is opened in modal but needs full-screen treatment matching product wizard UX.

## Goals / Non-Goals

**Goals:**
- Establish clean global navigation bar visible on main pages
- Show dynamic breadcrumb trail during form entry with clickable segments
- Full-screen forms with consistent UX (back button, close button, breadcrumb)
- Warn users before losing unsaved form changes
- Smooth layout transitions (nav fade out/in) when entering/exiting forms
- Route-based state management (URL reflects current location including form state)

**Non-Goals:**
- Mobile-responsive hamburger menu (nav bar stays visible on small screens for now)
- Breadcrumb history tracking beyond current session
- Animation library dependency (use CSS transitions only)
- Nested routes beyond current Products/Categories structure

## Decisions

**1. Route-based layout nesting**
- Create Layout component wrapping main routes, containing nav bar + outlet
- Form routes (products/new, categories/new) use separate LayoutForm component
- Routes structure:
  ```
  / → redirects to /products
  /products → Layout + ProductsPage
  /products/new → LayoutForm + AddProductWizard
  /categories → Layout + CategoryManagement
  /categories/new → LayoutForm + CategoryForm
  ```
- **Why**: URL is source of truth. Layout changes are route-driven. Back button can use `navigate(-1)` safely.
- **Alternative considered**: Conditional rendering based on pathname in single Layout. Rejected: harder to manage, route nesting clearer.

**2. Breadcrumb data from route params + component state**
- Breadcrumb reads from route + internal component state (e.g., wizard step number)
- Example: ProductsPage sets breadcrumb to ["Products"], AddProductWizard sets ["Products", "Add Product", `Step ${step}: ${stepName}`]
- Breadcrumb context/hook provides `setBreadcrumb()` for components to push their path
- **Why**: Decoupled from routes themselves, components own their breadcrumb label. Wizard steps can update dynamically.
- **Alternative considered**: Define breadcrumb paths in routes.meta. Rejected: wizard step names need runtime state.

**3. Dirty state detection via FormContext**
- Product wizard and category form expose `isDirty` flag in their context
- LayoutForm checks dirty state on back/close button click, shows confirmation modal if dirty
- **Why**: Minimal refactor, uses existing form hooks. Confirmation is modal, not toast (safer UX for destructive action).
- **Alternative considered**: Global form state hook. Rejected: too much boilerplate, context scoped to feature is cleaner.

**4. Nav visibility toggle via route matching**
- Check if pathname matches form routes (`/products/new`, `/categories/new`)
- CSS class toggle on Layout: `hidden` on form routes, visible on main routes
- Fade transition: `transition: opacity 200ms ease-in-out`
- **Why**: Simple, no new state. CSS handles animation, no JS state management needed.

**5. Breadcrumb segments are clickable, jump to segment**
- Breadcrumb renders as: `<Link>Segment</Link> / <Link>Segment</Link> / Current`
- Each segment has `href` to its route root. Last segment is text (not link).
- Example: `<a href="/products">Products</a> / <a href="/products/new">Add Product</a> / Step 2: Pricing`
- Clicking earlier segments asks for confirmation if form is dirty
- **Why**: Familiar pattern (breadcrumbs are navigation aids). Avoids clicking current segment.
- **Alternative considered**: Only first segment clickable. Rejected: intermediate jumps useful.

**6. Close button (✕) and Back button (←)**
- Both shown on LayoutForm
- Both check dirty state before navigating
- Close button: `navigate(-1)` (return to referring page)
- Back button: Also `navigate(-1)` but positioned differently
- **Why**: Single back button sufficient. ✕ is standard close gesture. Both trigger same warning.
- **Alternative considered**: Separate behaviors (back to previous page vs. back to root). Rejected: `-1` is predictable, simple.

## Risks / Trade-offs

**Risk: Dirty state detection might miss some form changes**
- Mitigation: Form libraries (React Hook Form) track dirty state reliably. Test edge cases (field cleared = dirty, undo = clean).

**Risk: Breadcrumb context pollution if nested components all call setBreadcrumb**
- Mitigation: Only top-level page component (ProductsPage, AddProductWizard) sets breadcrumb. Children don't override.

**Risk: Breadcrumb updates lag behind wizard step UI**
- Mitigation: SetBreadcrumb called in wizard step effect, same as step state change. No lag expected.

**Trade-off: No mobile hamburger menu**
- Nav bar stays fixed width on mobile, may crowd screen. Accept for MVP. Add responsive menu later if needed.

**Trade-off: CSS transition opacity rather than slide animation**
- Simpler, no layout shift. Nav fades in/out but doesn't move. Fast enough (200ms).

## Open Questions

1. Should breadcrumb show step numbers or just step names? E.g., "Step 2: Pricing" vs "Pricing"?
   - Decision: Show "Step X: Name" for clarity on wizard progress.

2. Category form: Is it a modal or full page? Current code uses modal, proposal says full-screen.
   - Decision: Route to `/categories/new` as full page, matching product wizard pattern. No modal.

3. Should category form have step indicator like product wizard, or single-page form?
   - Decision: Check existing category form. If complex enough, add steps. Otherwise single page with breadcrumb.
