import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
  type ReactNode,
} from "react"

import { getStorageItem, setStorageItem, STORAGE_KEYS } from "@/lib/storage"
import type { Category } from "@/types"

interface CategoryState {
  categories: Category[]
}

type CategoryAction = { type: "SET_CATEGORIES"; payload: Category[] }

const defaultCategories = [
  {
    id: "cat-default",
    name: "General",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
] satisfies Category[]

function categoryReducer(state: CategoryState, action: CategoryAction): CategoryState {
  switch (action.type) {
    case "SET_CATEGORIES":
      return { ...state, categories: action.payload }
    default:
      return state
  }
}

interface CategoryContextValue {
  state: CategoryState
}

const CategoryContext = createContext<CategoryContextValue | undefined>(undefined)

interface CategoryProviderProps {
  children: ReactNode
}

export function CategoryProvider({ children }: CategoryProviderProps) {
  const [state] = useReducer(categoryReducer, null, () => ({
    categories: getStorageItem(STORAGE_KEYS.categories, defaultCategories),
  }))

  const prevCategoriesRef = useRef(state.categories)

  useEffect(() => {
    if (prevCategoriesRef.current !== state.categories) {
      setStorageItem(STORAGE_KEYS.categories, state.categories)
      prevCategoriesRef.current = state.categories
    }
  }, [state.categories])

  return <CategoryContext.Provider value={{ state }}>{children}</CategoryContext.Provider>
}

export function useCategories() {
  const context = useContext(CategoryContext)
  if (!context) {
    throw new Error("useCategories must be used within CategoryProvider")
  }

  return {
    categories: context.state.categories,
  }
}
