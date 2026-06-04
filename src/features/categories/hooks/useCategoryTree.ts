import { useMemo } from "react"
import type { Category, Product } from "@/types"

export interface CategoryTreeNode extends Category {
  children: CategoryTreeNode[]
}

export function buildCategoryTree(
  categories: Category[],
  products: Product[]
): CategoryTreeNode[] {
  const map = new Map<string, CategoryTreeNode>()
  const roots: CategoryTreeNode[] = []

  categories.forEach((cat) => map.set(cat.id, { ...cat, children: [] }))

  categories.forEach((cat) => {
    const node = map.get(cat.id)!
    if (cat.parentId && map.has(cat.parentId)) {
      map.get(cat.parentId)!.children.push(node)
    } else {
      roots.push(node)
    }
  })

  const categoryIds = new Set(categories.map((c) => c.id))
  const orphaned = products.filter((p) => !categoryIds.has(p.categoryId))

  if (orphaned.length > 0) {
    roots.push({
      id: "__uncategorized__",
      name: "Uncategorized",
      color: "#94a3b8",
      productCount: orphaned.length,
      createdAt: "",
      updatedAt: "",
      children: [],
    })
  }

  return roots
}

export function useCategoryTree(categories: Category[], products: Product[]): CategoryTreeNode[] {
  return useMemo(() => buildCategoryTree(categories, products), [categories, products])
}
