import { useMemo } from "react"
import type { CategoryTreeNode } from "./useCategoryTree"

export function filterCategories(
  tree: CategoryTreeNode[],
  searchTerm: string
): CategoryTreeNode[] {
  if (!searchTerm.trim()) return tree
  const lower = searchTerm.toLowerCase()

  return tree
    .map((cat) => ({
      ...cat,
      children: cat.children.filter((sub) => sub.name.toLowerCase().includes(lower)),
    }))
    .filter((cat) => cat.name.toLowerCase().includes(lower) || cat.children.length > 0)
}

export function useFilteredCategories(tree: CategoryTreeNode[], searchTerm: string) {
  return useMemo(() => filterCategories(tree, searchTerm), [tree, searchTerm])
}
