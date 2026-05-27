import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  type ReactNode,
} from "react"

import { getStorageItem, setStorageItem, STORAGE_KEYS } from "@/lib/storage"
import type { Product } from "@/types"

interface ProductState {
  products: Product[]
}

type ProductAction =
  | { type: "SET_PRODUCTS"; payload: Product[] }
  | { type: "ADD_PRODUCT"; payload: Product }

function productReducer(state: ProductState, action: ProductAction): ProductState {
  switch (action.type) {
    case "SET_PRODUCTS":
      return { ...state, products: action.payload }
    case "ADD_PRODUCT":
      return { ...state, products: [action.payload, ...state.products] }
    default:
      return state
  }
}

interface ProductContextValue {
  state: ProductState
  addProduct: (product: Product) => void
}

const ProductContext = createContext<ProductContextValue | undefined>(undefined)

interface ProductProviderProps {
  children: ReactNode
}

export function ProductProvider({ children }: ProductProviderProps) {
  const [state, dispatch] = useReducer(productReducer, null, () => ({
    products: getStorageItem<Product[]>(STORAGE_KEYS.products, []),
  }))

  const prevProductsRef = useRef(state.products)

  useEffect(() => {
    if (prevProductsRef.current !== state.products) {
      setStorageItem(STORAGE_KEYS.products, state.products)
      prevProductsRef.current = state.products
    }
  }, [state.products])

  const value = useMemo(
    () => ({
      state,
      addProduct: (product: Product) => dispatch({ type: "ADD_PRODUCT", payload: product }),
    }),
    [state]
  )

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
}

export function useProducts() {
  const context = useContext(ProductContext)
  if (!context) {
    throw new Error("useProducts must be used within ProductProvider")
  }

  return {
    products: context.state.products,
    addProduct: context.addProduct,
  }
}
