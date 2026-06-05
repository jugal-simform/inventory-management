import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { useProducts } from "@/features/products/context/ProductContext"

export function ProductsPage() {
  const { products } = useProducts()

  return (
    <main className="mx-auto w-full max-w-5xl p-4 md:p-6">
      <div className="mb-6 flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Products</h1>
          <p className="text-sm text-muted-foreground">
            Manage your inventory and add new products.
          </p>
        </div>
        <Button asChild>
          <Link to="/products/new">Add Product</Link>
        </Button>
      </div>

      {products.length === 0 ? (
        <div className="rounded-lg border border-border bg-card p-6 text-sm text-muted-foreground">
          No products yet. Use Add Product to create your first inventory item.
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-border">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-3 py-2 font-medium">Name</th>
                <th className="px-3 py-2 font-medium">SKU</th>
                <th className="px-3 py-2 font-medium">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-t border-border">
                  <td className="px-3 py-2">
                    <span className="block max-w-xs truncate" title={product.name}>
                      {product.name}
                    </span>
                  </td>
                  <td className="px-3 py-2">{product.sku}</td>
                  <td className="px-3 py-2">
                    {product.quantity} {product.unit}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  )
}
