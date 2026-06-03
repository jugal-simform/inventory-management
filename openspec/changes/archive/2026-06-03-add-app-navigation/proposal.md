## Why

Current app has no global navigation. Users can't easily navigate between Products and Categories pages without typing URLs. Product wizard and category forms lack breadcrumb context and back buttons, making the flow confusing. Users need clear visual hierarchy and navigation patterns to move between sections and understand their current location.

## What Changes

- **Navigation bar** added to all pages showing Products and Categories buttons (hidden during form entry for clean UX)
- **Breadcrumb trail** displayed when in forms/wizards showing current path with clickable segments (e.g., `Products / Add Product / Step 2: Pricing`)
- **Full-screen form layout** for product wizard and category form (hides nav, shows breadcrumb + back button)
- **Back button** with unsaved changes confirmation on forms
- **Close button** (✕) on forms to return to previous page
- **Smooth transitions** between normal and form layouts

## Capabilities

### New Capabilities
- `app-navigation`: Top navigation bar with Products/Categories buttons, displayed on all pages except during form entry
- `breadcrumb-navigation`: Dynamic breadcrumb trail with clickable segments for navigation and location context, updates with wizard steps
- `full-screen-form-layout`: Full-screen modal layout for product wizard and category form with dedicated back/close controls
- `unsaved-changes-detection`: Detect form changes and warn before navigating away

### Modified Capabilities
- `add-product-wizard`: Will be wrapped in full-screen layout with breadcrumb navigation
- `category-form`: Will be wrapped in full-screen layout with breadcrumb navigation

## Impact

- **Components**: New Layout.tsx, Navigation.tsx, Breadcrumb.tsx components
- **Routes**: Restructure routes.tsx to nest layout with navigation
- **Existing pages**: ProductsPage, CategoryManagement, AddProductWizard will use new layout
- **Form context**: Product wizard and category form need to expose dirty state for unsaved changes detection
- **Styling**: New CSS for breadcrumb, nav bar transitions, full-screen form layouts
