export const STORAGE_KEYS = {
  categories: "stockbase_categories",
  suppliers: "stockbase_suppliers",
  products: "stockbase_products",
  alerts: "stockbase_alerts",
  transactions: "stockbase_transactions",
} as const

export function getStorageItem<T>(key: string, fallback: T): T {
  const raw = localStorage.getItem(key)
  if (!raw) {
    return fallback
  }

  try {
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

export function setStorageItem<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value))
}
