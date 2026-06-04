# StockBase - Quick Reference for AI Agents

## Before You Code
1. Read **ARCHITECTURE.md** for folder structure & state management
2. Read **CONVENTIONS.md** for naming, components, styling
3. Read relevant **feature doc** in `docs/features/`

## Tech Stack
- React 19 (no React import), Vite 6, TypeScript 5 (strict)
- React Router v7, React Context + useReducer
- localStorage only (no backend/API)
- shadcn/ui + Tailwind v4, Zod + React Hook Form
- Recharts, Lucide icons, Sonner (toasts), date-fns

## Folder Structure
```
src/
├── app/              # Routes, providers, App.tsx
├── components/ui/    # shadcn/ui primitives only
├── components/shared/# Reusable composed components
├── features/         # Domain modules (products, categories, alerts, etc.)
│   └── {feature}/
│       ├── components/, hooks/, context/, utils/, types.ts
├── hooks/            # App-wide: useLocalStorage, useDebounce, useMediaQuery
├── lib/              # storage.ts, id.ts, format.ts, constants.ts
└── types/            # Shared: Product, Category, Supplier, StockAlert, etc.
```

## Core Rules
- **Feature isolation**: No cross-feature component imports (types & hooks ok)
- **Context per domain**: Each feature has Context + Provider
- **@/ alias**: All imports use `@/` (maps to `src/`)
- **Lazy init**: useReducer 3rd arg loads from localStorage
- **Sync pattern**: Entity arrays sync to localStorage via useEffect
- **Cross-feature bridge**: `useAlertEngine` connects products ↔ alerts

## Provider Composition Order (matters!)
```
ThemeProvider > SettingsProvider > CategoryProvider > SupplierProvider 
  > ProductProvider > AlertProvider > children
```

## State Management Pattern
```typescript
interface EntityState {
  items: Entity[];
  loading: boolean;  // always false for localStorage
  filters: Filters;
}

type EntityAction =
  | { type: 'SET_ITEMS'; payload: Entity[] }
  | { type: 'ADD_ITEM'; payload: Entity };
  // ... more actions

function entityReducer(state: EntityState, action: EntityAction): EntityState {
  // reducer logic
}

// In provider: lazy init + useEffect sync
const [state, dispatch] = useReducer(entityReducer, null, () => ({
  items: getStorageItem(STORAGE_KEY, []),
  loading: false,
  filters: defaultFilters,
}));

useEffect(() => {
  if (prevItemsRef.current !== state.items) {
    setStorageItem(STORAGE_KEY, state.items);
    prevItemsRef.current = state.items;
  }
}, [state.items]);
```

## Data Flow
```
User Action → Component → hook.mutate() → dispatch(action) → reducer 
  → new state → useEffect syncs to localStorage
```

## Component Patterns
- **Functions only** (no classes), use `export function` (not arrows)
- **No React import** (automatic JSX, React 19)
- **Props**: Named interface for complex, inline for simple
- **Composition over config**: Use shadcn layout components

## Hook Patterns
- One hook per file in `features/<feature>/hooks/`
- Return objects (not arrays), use `useCallback` for actions
- Read from context, never call localStorage directly

## Form Validation
- Multi-field: **React Hook Form + Zod** with shadcn Form components
- Simple forms: useState + basic validation
- Zod schemas in `features/<feature>/validation.ts`

## Styling
- **Tailwind v4 only** (no CSS modules, styled-components)
- **`cn()` utility** for conditional classes
- Mobile-first: default for mobile, `md:` for tablet, `lg:` for desktop
- Theme vars in `src/styles/globals.css`

## Routing
- react-router-dom v7 with `createBrowserRouter`
- Query params for filters: `/products?status=low_stock`
- Read with `useSearchParams()`

## TypeScript
- Strict mode enabled (no implicit any, strict null)
- All shared types in `src/types/index.ts`
- Feature types in `features/<feature>/types.ts`
- Use `Omit<>`, `Partial<>` for derived types

## Error Handling
- User-facing: `toast.error()` (Sonner)
- Validation: shadcn Form + React Hook Form
- localStorage: silently fallback to defaults
- Rendering: ErrorBoundary from react-error-boundary

## IDs & Dates
- IDs: `crypto.randomUUID()` (defined in `src/lib/id.ts`)
- Dates: ISO 8601 strings (`new Date().toISOString()`)
- Format with date-fns functions

## localStorage Keys
```
stockbase_products, stockbase_categories, stockbase_suppliers,
stockbase_alerts, stockbase_transactions, stockbase_settings
```

## Common Tasks

**Add field to Product?**
1. Update `Product` in `src/types/index.ts`
2. Add to wizard schema in `features/wizard/validation.ts`
3. Add form field to wizard
4. Update ProductTable if needed

**Add alert type?**
1. Update `StockAlert` in `src/types/index.ts`
2. Add evaluation logic in `useAlertEngine.ts`
3. Add settings toggle in SettingsContext

**Create feature?**
1. Create `src/features/<feature>/` with components/, hooks/, context/
2. Create `<Feature>Context.tsx` with reducer + provider
3. Add provider to `src/app/providers.tsx`
4. Add route to `src/app/routes.tsx`

## Testing
- Unit: Reducers, utils, validators, calculations
- Component: User interactions, conditional rendering, validation
- E2E: Critical flows (add, restock, delete, filter, alerts)
- Factories in `test/factories.ts`, co-locate tests

## Performance
- `useMemo` for expensive calculations (charts, filters)
- `useCallback` for mutation actions
- `react-window` for 1000+ lists
- `useDebounce(term, 300)` for search
- localStorage read once on mount (lazy init)

## Common Gotchas
- ❌ Don't import React (auto JSX transform)
- ❌ Don't modify state directly (always dispatch)
- ❌ Don't call localStorage outside providers
- ❌ Don't create new objects in render (use useMemo)
- ❌ Don't cross-import components between features
- ✅ Sync to localStorage in useEffect on entity array
- ✅ Call `alertEngine.evaluateProduct()` after stock mutations
- ✅ Use `@/` path alias for imports