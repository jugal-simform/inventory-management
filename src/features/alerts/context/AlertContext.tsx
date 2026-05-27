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
import type { StockAlert } from "@/types"

interface AlertState {
  alerts: StockAlert[]
}

type AlertAction =
  | { type: "SET_ALERTS"; payload: StockAlert[] }
  | { type: "ADD_ALERTS"; payload: StockAlert[] }

function alertReducer(state: AlertState, action: AlertAction): AlertState {
  switch (action.type) {
    case "SET_ALERTS":
      return { ...state, alerts: action.payload }
    case "ADD_ALERTS":
      return { ...state, alerts: [...action.payload, ...state.alerts] }
    default:
      return state
  }
}

interface AlertContextValue {
  state: AlertState
  addAlerts: (alerts: StockAlert[]) => void
}

const AlertContext = createContext<AlertContextValue | undefined>(undefined)

interface AlertProviderProps {
  children: ReactNode
}

export function AlertProvider({ children }: AlertProviderProps) {
  const [state, dispatch] = useReducer(alertReducer, null, () => ({
    alerts: getStorageItem<StockAlert[]>(STORAGE_KEYS.alerts, []),
  }))

  const prevAlertsRef = useRef(state.alerts)

  useEffect(() => {
    if (prevAlertsRef.current !== state.alerts) {
      setStorageItem(STORAGE_KEYS.alerts, state.alerts)
      prevAlertsRef.current = state.alerts
    }
  }, [state.alerts])

  const value = useMemo(
    () => ({
      state,
      addAlerts: (alerts: StockAlert[]) => {
        if (alerts.length === 0) {
          return
        }
        dispatch({ type: "ADD_ALERTS", payload: alerts })
      },
    }),
    [state]
  )

  return <AlertContext.Provider value={value}>{children}</AlertContext.Provider>
}

export function useAlerts() {
  const context = useContext(AlertContext)
  if (!context) {
    throw new Error("useAlerts must be used within AlertProvider")
  }

  return {
    alerts: context.state.alerts,
    addAlerts: context.addAlerts,
  }
}
