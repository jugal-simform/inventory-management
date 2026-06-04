import { useNavigate } from "react-router-dom"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import type { Product } from "@/types"

type StockVariant = "in-stock" | "low-stock" | "out-of-stock"

function stockStatus(product: Product): { label: string; variant: StockVariant } {
  if (product.quantity === 0) return { label: "Out of Stock", variant: "out-of-stock" }
  if (product.quantity <= product.minStockLevel) return { label: "Low Stock", variant: "low-stock" }
  return { label: "In Stock", variant: "in-stock" }
}

function stockBadgeClass(variant: StockVariant): string {
  return cn(
    "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium",
    variant === "in-stock" && "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    variant === "low-stock" && "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    variant === "out-of-stock" && "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
  )
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount)
}

interface CategoryProductListProps {
  products: Product[]
  categoryId: string
}

export function CategoryProductList({ products, categoryId }: Readonly<CategoryProductListProps>) {
  const navigate = useNavigate()

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 py-8 text-center">
        <p className="text-sm text-muted-foreground">No products in this category yet.</p>
        <Button
          size="sm"
          onClick={() => navigate(`/products/new?categoryId=${categoryId}`)}
        >
          Add Product
        </Button>
      </div>
    )
  }

  return (
    <>
      {/* Desktop table */}
      <div className="hidden lg:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left text-xs text-muted-foreground">
              <th className="py-2 font-medium">Product Name</th>
              <th className="w-24 py-2 font-medium">SKU</th>
              <th className="w-36 py-2 font-medium">Quantity</th>
              <th className="w-24 py-2 font-medium">Price</th>
              <th className="w-20 py-2 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              const status = stockStatus(product)
              return (
                <tr key={product.id} className="border-b last:border-0 hover:bg-muted/30">
                  <td className="py-2 font-medium">{product.name}</td>
                  <td className="py-2 font-mono text-xs text-muted-foreground">{product.sku}</td>
                  <td className="py-2">
                    <div className="flex items-center gap-2">
                      <span>{product.quantity}</span>
                      <span className={stockBadgeClass(status.variant)}>{status.label}</span>
                    </div>
                  </td>
                  <td className="py-2 text-muted-foreground">
                    {formatCurrency(product.sellingPrice)}
                  </td>
                  <td className="py-2">
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 px-2 text-xs"
                        onClick={() => navigate(`/products/${product.id}/edit`)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 px-2 text-xs"
                        onClick={() => navigate(`/products/${product.id}`)}
                      >
                        View
                      </Button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="space-y-2 lg:hidden">
        {products.map((product) => {
          const status = stockStatus(product)
          return (
            <div key={product.id} className="rounded-md border p-3 text-sm">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="font-mono text-xs text-muted-foreground">{product.sku}</p>
                </div>
                <span className={stockBadgeClass(status.variant)}>{status.label}</span>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-muted-foreground">
                  Qty: {product.quantity} · {formatCurrency(product.sellingPrice)}
                </span>
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-6 px-2 text-xs"
                    onClick={() => navigate(`/products/${product.id}/edit`)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-6 px-2 text-xs"
                    onClick={() => navigate(`/products/${product.id}`)}
                  >
                    View
                  </Button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
