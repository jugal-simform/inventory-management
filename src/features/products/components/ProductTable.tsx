import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"
import type { Product } from "@/types"

interface ProductTableProps {
  products: Product[]
}

export function ProductTable({ products }: ProductTableProps) {
  const getStockStatus = (quantity: number, minLevel: number) => {
    if (quantity === 0) return { label: "Out of Stock", color: "bg-red-50 text-red-700" }
    if (quantity <= minLevel) return { label: "Low Stock", color: "bg-amber-50 text-amber-700" }
    return { label: "In Stock", color: "bg-emerald-50 text-emerald-700" }
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-gradient-to-r from-slate-50 to-slate-100/50">
            <th className="px-6 py-4 text-left font-semibold text-foreground">Name</th>
            <th className="px-6 py-4 text-left font-semibold text-foreground">SKU</th>
            <th className="px-6 py-4 text-left font-semibold text-foreground">Stock Level</th>
            <th className="px-6 py-4 text-left font-semibold text-foreground">Status</th>
            <th className="px-6 py-4 text-center font-semibold text-foreground">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {products.map((product) => {
            const status = getStockStatus(product.quantity, product.minStockLevel)
            return (
              <tr
                key={product.id}
                className="transition-colors duration-150 hover:bg-muted/40"
              >
                <td className="px-6 py-4">
                  <div className="space-y-1">
                    <p className="font-medium leading-tight text-foreground">
                      {product.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {product.description?.substring(0, 40)}
                      {product.description && product.description.length > 40 ? "..." : ""}
                    </p>
                  </div>
                </td>
                <td className="px-6 py-4 font-mono text-xs text-muted-foreground">
                  {product.sku}
                </td>
                <td className="px-6 py-4">
                  <div className="space-y-1">
                    <p className="font-semibold text-foreground">
                      {product.quantity} {product.unit}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Min: {product.minStockLevel} {product.unit}
                    </p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${status.color}`}
                  >
                    {status.label}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <Button asChild variant="ghost" size="sm">
                    <Link to={`/products/${product.id}`}>View</Link>
                  </Button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
