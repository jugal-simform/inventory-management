import { useState } from "react"
import { TrendingUp, AlertCircle, Package } from "lucide-react"
import { useInventoryMetrics } from "@/hooks/analytics/useInventoryMetrics"
import { useCategories } from "@/features/categories/context/CategoryContext"
import { MetricCard } from "@/components/analytics/MetricCard"
import { StockBarChart } from "@/components/analytics/StockBarChart"
import { CategoryPieChart } from "@/components/analytics/CategoryPieChart"
import { LowStockAlert } from "@/components/analytics/LowStockAlert"
import { LowStockList } from "@/components/analytics/LowStockList"

export function AnalyticsDashboard() {
  const { categories } = useCategories()
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>()
  const [showLowStockDetail, setShowLowStockDetail] = useState(false)

  // Metrics update automatically when category filter changes or when products/categories are modified

  const metrics = useInventoryMetrics(selectedCategoryId)

  const categoryOptions = [
    { id: undefined, name: "All Categories" },
    ...categories.map((c) => ({ id: c.id, name: c.name })),
  ]

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="rounded-lg border border-border bg-card p-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="category-filter" className="block text-sm font-medium text-foreground">Filter by Category</label>
            <select
              id="category-filter"
              value={selectedCategoryId || ""}
              onChange={(e) => setSelectedCategoryId(e.target.value || undefined)}
              className="mt-2 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
            >
              {categoryOptions.map((cat) => (
                <option key={cat.id || "all"} value={cat.id || ""}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={() => {
              setSelectedCategoryId(undefined)
              setShowLowStockDetail(false)
            }}
            className="inline-flex items-center rounded border border-input bg-background px-3 py-2 text-sm font-medium text-foreground hover:bg-muted"
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <MetricCard
          title="Total Inventory"
          value={metrics.totalStock}
          icon={<Package className="h-8 w-8 text-blue-500" />}
          description="Units in stock"
        />
        <MetricCard
          title="Products"
          value={metrics.stockByProduct.length}
          icon={<TrendingUp className="h-8 w-8 text-green-500" />}
          description="Total products"
        />
        <MetricCard
          title="Low Stock"
          value={metrics.lowStockCount}
          icon={<AlertCircle className="h-8 w-8 text-destructive" />}
          description="Products below threshold"
          variant={metrics.lowStockCount > 0 ? "warning" : "success"}
        />
      </div>

      {/* Low Stock Alert */}
      <LowStockAlert
        count={metrics.lowStockCount}
        onViewDetails={() => setShowLowStockDetail(!showLowStockDetail)}
      />

      {/* Low Stock List */}
      {showLowStockDetail && (
        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="mb-4 text-lg font-semibold text-foreground">Low Stock Products</h3>
          <LowStockList products={metrics.lowStockProducts} />
        </div>
      )}

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="mb-4 text-lg font-semibold text-foreground">Stock by Product</h3>
          <StockBarChart data={metrics.stockByProduct} />
        </div>
        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="mb-4 text-lg font-semibold text-foreground">Stock Distribution by Category</h3>
          <CategoryPieChart data={metrics.stockByCategory} />
        </div>
      </div>
    </div>
  )
}
