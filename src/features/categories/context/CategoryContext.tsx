import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  type Dispatch,
  type ReactNode,
} from "react"

import { getStorageItem, setStorageItem, STORAGE_KEYS } from "@/lib/storage"
import type { Category } from "@/types"

interface CategoryState {
  categories: Category[]
}

export type CategoryAction =
  | { type: "SET_CATEGORIES"; payload: Category[] }
  | { type: "ADD_CATEGORY"; payload: Category }
  | { type: "UPDATE_CATEGORY"; payload: Category }
  | { type: "DELETE_CATEGORY"; payload: { id: string } }
  | { type: "MOVE_PRODUCTS"; payload: { fromId: string; toId: string; count: number } }

const defaultCategories: Category[] = [
  {
    id: "cat-default",
    name: "General",
    color: "#3b82f6",
    productCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

function categoryReducer(state: CategoryState, action: CategoryAction): CategoryState {
  switch (action.type) {
    case "SET_CATEGORIES":
      return { ...state, categories: action.payload }

    case "ADD_CATEGORY":
      return { ...state, categories: [action.payload, ...state.categories] }

    case "UPDATE_CATEGORY":
      return {
        ...state,
        categories: state.categories.map((c) =>
          c.id === action.payload.id ? action.payload : c
        ),
      }

    case "DELETE_CATEGORY":
      return {
        ...state,
        categories: state.categories.filter((c) => c.id !== action.payload.id),
      }

    case "MOVE_PRODUCTS": {
      const { fromId, toId, count } = action.payload
      return {
        ...state,
        categories: state.categories.map((c) => {
          if (c.id === fromId) return { ...c, productCount: Math.max(0, (c.productCount ?? 0) - count) }
          if (c.id === toId) return { ...c, productCount: (c.productCount ?? 0) + count }
          return c
        }),
      }
    }

    default:
      return state
  }
}

interface CategoryContextValue {
  state: CategoryState
  dispatch: Dispatch<CategoryAction>
  addCategory: (category: Category) => void
  updateCategory: (category: Category) => void
  deleteCategory: (id: string) => void
}

const CategoryContext = createContext<CategoryContextValue | undefined>(undefined)

export function CategoryProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [state, dispatch] = useReducer(categoryReducer, null, () => ({
    categories: getStorageItem(STORAGE_KEYS.categories, defaultCategories),
  }))

  const prevCategoriesRef = useRef(state.categories)

  useEffect(() => {
    if (prevCategoriesRef.current !== state.categories) {
      setStorageItem(STORAGE_KEYS.categories, state.categories)
      prevCategoriesRef.current = state.categories
    }
  }, [state.categories])

  const addCategory = useCallback(
    (category: Category) => dispatch({ type: "ADD_CATEGORY", payload: category }),
    []
  )
  const updateCategory = useCallback(
    (category: Category) => dispatch({ type: "UPDATE_CATEGORY", payload: category }),
    []
  )
  const deleteCategory = useCallback(
    (id: string) => dispatch({ type: "DELETE_CATEGORY", payload: { id } }),
    []
  )

  const value = useMemo(
    () => ({ state, dispatch, addCategory, updateCategory, deleteCategory }),
    [state, addCategory, updateCategory, deleteCategory]
  )

  return <CategoryContext.Provider value={value}>{children}</CategoryContext.Provider>
}

export function useCategories() {
  const context = useContext(CategoryContext)
  if (!context) throw new Error("useCategories must be used within CategoryProvider")

  return {
    categories: context.state.categories,
    dispatch: context.dispatch,
    addCategory: context.addCategory,
    updateCategory: context.updateCategory,
    deleteCategory: context.deleteCategory,
  }
}
