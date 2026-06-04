import { useCategories } from "@/features/categories/context/CategoryContext"
import type { StockByProductItem } from "@/hooks/analytics/useInventoryMetrics"

interface LowStockListProps {
  products: StockByProductItem[]
}

export function LowStockList({ products }: LowStockListProps) {
  const { categories } = useCategories()
  const categoryMap = new Map(categories.map((c) => [c.id, c.name]))

  if (products.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-muted p-8 text-center">
        <p className="text-muted-foreground">No low-stock products</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="border-b border-border bg-muted">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Product Name</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Category</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Stock Level</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {products.map((product) => (
            <tr key={product.productId} className="hover:bg-muted/50">
              <td className="px-6 py-4 text-sm text-foreground">{product.productName}</td>
              <td className="px-6 py-4 text-sm text-muted-foreground">
                {categoryMap.get(product.categoryId) || "Unknown"}
              </td>
              <td className="px-6 py-4">
                <span className="inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-800">
                  {product.stock} units
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
