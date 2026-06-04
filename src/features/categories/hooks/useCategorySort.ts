import { useMemo, useState } from "react"
import type { CategoryTreeNode } from "./useCategoryTree"

export type CategorySortOption =
  | "name_asc"
  | "name_desc"
  | "productCount_desc"
  | "productCount_asc"
  | "updatedAt_desc"

export const SORT_LABELS: Record<CategorySortOption, string> = {
  name_asc: "Name (A-Z)",
  name_desc: "Name (Z-A)",
  productCount_desc: "Most Products",
  productCount_asc: "Fewest Products",
  updatedAt_desc: "Recently Updated",
}

function sortNodes(nodes: CategoryTreeNode[], sort: CategorySortOption): CategoryTreeNode[] {
  return [...nodes].sort((a, b) => {
    switch (sort) {
      case "name_asc":
        return a.name.localeCompare(b.name)
      case "name_desc":
        return b.name.localeCompare(a.name)
      case "productCount_desc":
        return (b.productCount ?? 0) - (a.productCount ?? 0)
      case "productCount_asc":
        return (a.productCount ?? 0) - (b.productCount ?? 0)
      case "updatedAt_desc":
        return b.updatedAt.localeCompare(a.updatedAt)
      default:
        return 0
    }
  })
}

export function useCategorySort(tree: CategoryTreeNode[]) {
  const [sort, setSort] = useState<CategorySortOption>("name_asc")

  const sorted = useMemo(() => sortNodes(tree, sort), [tree, sort])

  return { sort, setSort, sortedTree: sorted }
}
