import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
  type ReactNode,
} from "react"

import { getStorageItem, setStorageItem, STORAGE_KEYS } from "@/lib/storage"
import type { Supplier } from "@/types"

interface SupplierState {
  suppliers: Supplier[]
}

type SupplierAction = { type: "SET_SUPPLIERS"; payload: Supplier[] }

const defaultSuppliers = [
  {
    id: "sup-default",
    name: "Default Supplier",
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
] satisfies Supplier[]

function supplierReducer(state: SupplierState, action: SupplierAction): SupplierState {
  switch (action.type) {
    case "SET_SUPPLIERS":
      return { ...state, suppliers: action.payload }
    default:
      return state
  }
}

interface SupplierContextValue {
  state: SupplierState
}

const SupplierContext = createContext<SupplierContextValue | undefined>(undefined)

interface SupplierProviderProps {
  children: ReactNode
}

export function SupplierProvider({ children }: SupplierProviderProps) {
  const [state] = useReducer(supplierReducer, null, () => ({
    suppliers: getStorageItem(STORAGE_KEYS.suppliers, defaultSuppliers),
  }))

  const prevSuppliersRef = useRef(state.suppliers)

  useEffect(() => {
    if (prevSuppliersRef.current !== state.suppliers) {
      setStorageItem(STORAGE_KEYS.suppliers, state.suppliers)
      prevSuppliersRef.current = state.suppliers
    }
  }, [state.suppliers])

  return <SupplierContext.Provider value={{ state }}>{children}</SupplierContext.Provider>
}

export function useSuppliers() {
  const context = useContext(SupplierContext)
  if (!context) {
    throw new Error("useSuppliers must be used within SupplierProvider")
  }

  return {
    suppliers: context.state.suppliers,
    activeSuppliers: context.state.suppliers.filter((supplier) => supplier.isActive),
  }
}
