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
import type { StockTransaction } from "@/types"

interface TransactionState {
  transactions: StockTransaction[]
}

type TransactionAction =
  | { type: "SET_TRANSACTIONS"; payload: StockTransaction[] }
  | { type: "ADD_TRANSACTION"; payload: StockTransaction }

function transactionReducer(state: TransactionState, action: TransactionAction): TransactionState {
  switch (action.type) {
    case "SET_TRANSACTIONS":
      return { ...state, transactions: action.payload }
    case "ADD_TRANSACTION":
      return { ...state, transactions: [action.payload, ...state.transactions] }
    default:
      return state
  }
}

interface TransactionContextValue {
  state: TransactionState
  addTransaction: (transaction: StockTransaction) => void
}

const TransactionContext = createContext<TransactionContextValue | undefined>(undefined)

interface TransactionProviderProps {
  children: ReactNode
}

export function TransactionProvider({ children }: TransactionProviderProps) {
  const [state, dispatch] = useReducer(transactionReducer, null, () => ({
    transactions: getStorageItem<StockTransaction[]>(STORAGE_KEYS.transactions, []),
  }))

  const prevTransactionsRef = useRef(state.transactions)

  useEffect(() => {
    if (prevTransactionsRef.current !== state.transactions) {
      setStorageItem(STORAGE_KEYS.transactions, state.transactions)
      prevTransactionsRef.current = state.transactions
    }
  }, [state.transactions])

  const value = useMemo(
    () => ({
      state,
      addTransaction: (transaction: StockTransaction) =>
        dispatch({ type: "ADD_TRANSACTION", payload: transaction }),
    }),
    [state]
  )

  return <TransactionContext.Provider value={value}>{children}</TransactionContext.Provider>
}

export function useTransactions() {
  const context = useContext(TransactionContext)
  if (!context) {
    throw new Error("useTransactions must be used within TransactionProvider")
  }

  return {
    transactions: context.state.transactions,
    addTransaction: context.addTransaction,
  }
}
