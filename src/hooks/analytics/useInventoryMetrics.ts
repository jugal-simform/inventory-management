import { useMemo } from "react"
import { useProducts } from "@/features/products/context/ProductContext"
import { useCategories } from "@/features/categories/context/CategoryContext"
import type { Product, Category } from "@/types"

// Computes inventory analytics metrics: total stock, product distribution, category breakdown, and low-stock alerts

export interface StockByProductItem {
  productId: string
  productName: string
  stock: number
  categoryId: string
}

export interface StockByCategoryItem {
  categoryId: string
  categoryName: string
  stock: number
  percentage: number
}

export interface InventoryMetrics {
  totalStock: number
  stockByProduct: StockByProductItem[]
  stockByCategory: StockByCategoryItem[]
  lowStockProducts: StockByProductItem[]
  lowStockCount: number
}

const LOW_STOCK_THRESHOLD = 10

export function useInventoryMetrics(selectedCategoryId?: string): InventoryMetrics {
  const { products } = useProducts()
  const { categories } = useCategories()

  return useMemo(() => {
    const categoryMap = new Map<string, Category>(categories.map((c) => [c.id, c]))

    const filterByCategory = (products: Product[]) => {
      if (!selectedCategoryId) return products
      return products.filter((p) => p.categoryId === selectedCategoryId)
    }

    const filteredProducts = filterByCategory(products)

    // Total stock
    const totalStock = filteredProducts.reduce((sum, p) => sum + p.quantity, 0)

    // Stock by product
    const stockByProduct: StockByProductItem[] = filteredProducts.map((p) => ({
      productId: p.id,
      productName: p.name,
      stock: p.quantity,
      categoryId: p.categoryId,
    }))

    // Stock by category
    const categoryStockMap = new Map<string, number>()
    filteredProducts.forEach((p) => {
      const current = categoryStockMap.get(p.categoryId) || 0
      categoryStockMap.set(p.categoryId, current + p.quantity)
    })

    const stockByCategory: StockByCategoryItem[] = Array.from(categoryStockMap.entries()).map(
      ([catId, stock]) => {
        const category = categoryMap.get(catId)
        const percentage = totalStock > 0 ? (stock / totalStock) * 100 : 0
        return {
          categoryId: catId,
          categoryName: category?.name || "Unknown",
          stock,
          percentage,
        }
      }
    )

    // Low stock products
    const lowStockProducts = stockByProduct.filter((p) => p.stock < LOW_STOCK_THRESHOLD)
    const lowStockCount = lowStockProducts.length

    return {
      totalStock,
      stockByProduct,
      stockByCategory,
      lowStockProducts,
      lowStockCount,
    }
  }, [products, categories, selectedCategoryId])
}
