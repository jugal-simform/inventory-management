import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CategoryAccordion } from "../components/CategoryAccordion"
import { CategorySearch } from "../components/CategorySearch"
import { CategorySortDropdown } from "../components/CategorySortDropdown"
import { CategoryForm } from "../components/CategoryForm"
import { useCategories } from "../context/CategoryContext"
import { useCategoryTree } from "../hooks/useCategoryTree"
import { useCategorySort } from "../hooks/useCategorySort"
import { useFilteredCategories } from "../hooks/useCategories"
import { useProducts } from "@/features/products/context/ProductContext"

export function CategoryManagement() {
  const { categories } = useCategories()
  const { products } = useProducts()
  const [addOpen, setAddOpen] = useState(false)
  const [search, setSearch] = useState("")

  const tree = useCategoryTree(categories, products)
  const { sort, setSort, sortedTree } = useCategorySort(tree)
  const filteredTree = useFilteredCategories(sortedTree, search)

  return (
    <div className="mx-auto max-w-4xl space-y-4 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Categories</h1>
        <Button onClick={() => setAddOpen(true)}>Add Category</Button>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex-1">
          <CategorySearch value={search} onSearch={setSearch} />
        </div>
        <CategorySortDropdown value={sort} onSort={setSort} />
      </div>

      <CategoryAccordion categoryTree={filteredTree} allProducts={products} />

      <CategoryForm open={addOpen} onClose={() => setAddOpen(false)} />
    </div>
  )
}
