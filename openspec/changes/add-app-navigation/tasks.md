## 1. Create Navigation Components

- [x] 1.1 Create `src/components/Navigation.tsx` with Products and Categories buttons
- [x] 1.2 Create `src/components/Breadcrumb.tsx` with clickable segments separated by /
- [x] 1.3 Create breadcrumb context in `src/components/breadcrumb-context.tsx` with setBreadcrumb hook
- [x] 1.4 Create unsaved changes confirmation modal component in `src/components/UnsavedChangesModal.tsx`

## 2. Create Layout Components

- [x] 2.1 Create `src/components/Layout.tsx` - main layout with nav bar visible
- [x] 2.2 Create `src/components/LayoutForm.tsx` - form layout with breadcrumb, back button, close button (nav hidden)
- [x] 2.3 Add CSS transitions for smooth nav/breadcrumb fade (200ms opacity)
- [x] 2.4 Export both layouts from `src/components/index.ts`

## 3. Update Routes Structure

- [x] 3.1 Update `src/app/routes.tsx` to nest routes under Layout and LayoutForm
- [x] 3.2 Wrap ProductsPage route with Layout
- [x] 3.3 Wrap CategoryManagement route with Layout
- [x] 3.4 Wrap AddProductWizard route with LayoutForm
- [x] 3.5 Create `/categories/new` route for category form page with LayoutForm

## 4. Add Breadcrumb to ProductsPage

- [x] 4.1 Update `src/features/products/components/ProductsPage.tsx` to use breadcrumb context
- [x] 4.2 Set breadcrumb to ["Products"] on mount
- [x] 4.3 Clean up breadcrumb on unmount

## 5. Add Breadcrumb to AddProductWizard

- [x] 5.1 Update `src/features/wizard/AddProductWizard.tsx` to use breadcrumb context
- [x] 5.2 Set breadcrumb to ["Products", "Add Product", `Step ${step}: ${stepName}`] based on current step
- [x] 5.3 Update breadcrumb when step changes
- [x] 5.4 Expose `isDirty` flag from form context
- [x] 5.5 Pass `isDirty` to LayoutForm for unsaved changes detection
- [x] 5.6 Clean up breadcrumb on unmount

## 6. Add Breadcrumb to CategoryManagement

- [x] 6.1 Update `src/features/categories/pages/CategoryManagement.tsx` to use breadcrumb context
- [x] 6.2 Set breadcrumb to ["Categories"] on mount
- [x] 6.3 Update add category button to navigate to `/categories/new` instead of opening modal
- [x] 6.4 Remove modal state and CategoryForm component from CategoryManagement

## 7. Create Category Form Page

- [x] 7.1 Create `src/features/categories/pages/CategoryFormPage.tsx` wrapping CategoryForm
- [x] 7.2 Refactor CategoryForm to accept a callback function instead of modal `open` prop
- [x] 7.3 CategoryFormPage uses breadcrumb context to set ["Categories", "Add Category"]
- [x] 7.4 Expose `isDirty` flag from form to CategoryFormPage
- [x] 7.5 Pass `isDirty` to LayoutForm for unsaved changes detection
- [x] 7.6 On successful submission, navigate to /categories
- [x] 7.7 Export CategoryFormPage

## 8. Implement Unsaved Changes Detection

- [x] 8.1 Create hook `src/hooks/useFormDirty.ts` to detect form dirty state from React Hook Form
- [x] 8.2 Update AddProductWizard to use useFormDirty and expose flag
- [x] 8.3 Update CategoryForm to use useFormDirty and expose flag
- [x] 8.4 LayoutForm component accepts isDirty prop
- [x] 8.5 Back button in LayoutForm checks isDirty before navigating
- [x] 8.6 Close button in LayoutForm checks isDirty before navigating
- [x] 8.7 Breadcrumb clickable links check isDirty before navigating
- [x] 8.8 Show UnsavedChangesModal if isDirty and user tries to navigate

## 9. Style and Polish

- [x] 9.1 Add CSS for Navigation component (horizontal button layout, active state highlight)
- [x] 9.2 Add CSS for Breadcrumb component (flex layout, / separator, link styling)
- [x] 9.3 Add CSS for LayoutForm (back button left, close button right, breadcrumb positioning)
- [x] 9.4 Add fade transition for nav bar (opacity 0-1, 200ms)
- [x] 9.5 Add fade transition for breadcrumb (opacity 0-1, 200ms)
- [x] 9.6 Test layout transitions on navigate between pages and forms

## 10. Testing and Verification

- [ ] 10.1 Test Products page shows nav bar with active highlight
- [ ] 10.2 Test Categories page shows nav bar with active highlight
- [ ] 10.3 Test clicking Products button from Categories navigates to Products
- [ ] 10.4 Test clicking Categories button from Products navigates to Categories
- [ ] 10.5 Test entering product wizard hides nav bar, shows breadcrumb
- [ ] 10.6 Test breadcrumb updates with wizard steps (1→2→3)
- [ ] 10.7 Test clicking breadcrumb segment navigates back
- [ ] 10.8 Test back button with unsaved changes shows confirmation modal
- [ ] 10.9 Test back button without unsaved changes navigates immediately
- [ ] 10.10 Test close button with unsaved changes shows confirmation modal
- [ ] 10.11 Test close button without unsaved changes navigates immediately
- [ ] 10.12 Test entering category form shows breadcrumb "Categories / Add Category"
- [ ] 10.13 Test creating category successfully navigates to Categories page
- [ ] 10.14 Test breadcrumb and nav fade transitions are smooth (no layout shift)
- [ ] 10.15 Test Escape key still exits wizard (existing behavior preserved)
