import { useEffect } from "react"
import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { useBreadcrumb } from "@/components/breadcrumb-context"
import { useProducts } from "@/features/products/context/ProductContext"
import { ProductTable } from "./ProductTable"

export function ProductsPage() {
  const { products } = useProducts()
  const { setSegments, setIsDirty } = useBreadcrumb()

  useEffect(() => {
    setSegments([{ label: "Products", path: "/products" }])
    setIsDirty(false)
    return () => setSegments([])
  }, [setSegments, setIsDirty])

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
        <ProductTable products={products} />
      )}
    </main>
  )
}
