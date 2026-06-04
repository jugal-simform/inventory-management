import { useCallback } from "react"
import { AnalyticsDashboard } from "@/features/analytics/components/AnalyticsDashboard"
import { ErrorBoundary } from "@/components/ErrorBoundary"
import { Button } from "@/components/ui/button"

const SAMPLE_CATEGORIES = [
  { id: "cat1", name: "Electronics", description: "Electronic devices and accessories" },
  { id: "cat2", name: "Furniture", description: "Office and home furniture" },
  { id: "cat3", name: "Office Supplies", description: "Stationery and office consumables" },
]

const SAMPLE_PRODUCTS = [
  { id: "prod1", name: "Laptop", categoryId: "cat1", quantity: 45, sku: "SKU001", price: 999, minStockLevel: 5, unit: "units", createdAt: new Date().toISOString() },
  { id: "prod2", name: "Wireless Mouse", categoryId: "cat1", quantity: 8, sku: "SKU002", price: 25, minStockLevel: 10, unit: "units", createdAt: new Date().toISOString() },
  { id: "prod3", name: "Standing Desk", categoryId: "cat2", quantity: 120, sku: "SKU003", price: 299, minStockLevel: 5, unit: "units", createdAt: new Date().toISOString() },
  { id: "prod4", name: "Office Chair", categoryId: "cat2", quantity: 3, sku: "SKU004", price: 199, minStockLevel: 10, unit: "units", createdAt: new Date().toISOString() },
  { id: "prod5", name: "Ballpoint Pens", categoryId: "cat3", quantity: 200, sku: "SKU005", price: 5, minStockLevel: 50, unit: "box", createdAt: new Date().toISOString() },
  { id: "prod6", name: "Notebooks", categoryId: "cat3", quantity: 7, sku: "SKU006", price: 8, minStockLevel: 20, unit: "pack", createdAt: new Date().toISOString() },
]

export function AnalyticsPage() {
  const handleSeedData = useCallback(() => {
    localStorage.setItem("stockbase_categories", JSON.stringify(SAMPLE_CATEGORIES))
    localStorage.setItem("stockbase_products", JSON.stringify(SAMPLE_PRODUCTS))
    window.location.reload()
  }, [])

  return (
    <ErrorBoundary>
      <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Analytics & Insights</h1>
            <p className="mt-2 text-muted-foreground">Monitor your inventory metrics and stock levels</p>
          </div>
          <Button onClick={handleSeedData} variant="outline" size="sm" className="mt-1">
            Load Sample Data
          </Button>
        </div>
        <AnalyticsDashboard />
      </div>
    </ErrorBoundary>
  )
}
