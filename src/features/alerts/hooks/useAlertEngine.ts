import { useCallback } from "react"

import { useAlerts } from "@/features/alerts/context/AlertContext"
import type { Product, StockAlert } from "@/types"

export function useAlertEngine() {
  const { addAlerts } = useAlerts()

  const buildAlertsForProduct = useCallback((product: Product): StockAlert[] => {
    const alerts: StockAlert[] = []
    const now = new Date().toISOString()

    if (product.quantity <= product.minStockLevel) {
      alerts.push({
        id: crypto.randomUUID(),
        productId: product.id,
        type: "low_stock",
        severity: "warning",
        message: `${product.name} is low on stock`,
        createdAt: now,
      })
    }

    if (product.quantity === 0) {
      alerts.push({
        id: crypto.randomUUID(),
        productId: product.id,
        type: "out_of_stock",
        severity: "critical",
        message: `${product.name} is out of stock`,
        createdAt: now,
      })
    }

    return alerts
  }, [])

  const evaluateProduct = useCallback(
    (product: Product) => {
      const alerts = buildAlertsForProduct(product)
      addAlerts(alerts)
      return alerts
    },
    [addAlerts, buildAlertsForProduct]
  )

  return {
    evaluateProduct,
    buildAlertsForProduct,
  }
}
