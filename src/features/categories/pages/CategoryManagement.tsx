import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useBreadcrumb } from "@/components/breadcrumb-context"
import { CategoryAccordion } from "../components/CategoryAccordion"
import { CategorySearch } from "../components/CategorySearch"
import { CategorySortDropdown } from "../components/CategorySortDropdown"
import { useCategories } from "../context/CategoryContext"
import { useCategoryTree } from "../hooks/useCategoryTree"
import { useCategorySort } from "../hooks/useCategorySort"
import { useFilteredCategories } from "../hooks/useCategories"
import { useProducts } from "@/features/products/context/ProductContext"

export function CategoryManagement() {
  const { categories } = useCategories()
  const { products } = useProducts()
  const [search, setSearch] = useState("")
  const { setSegments, setIsDirty } = useBreadcrumb()

  useEffect(() => {
    setSegments([{ label: "Categories", path: "/categories" }])
    setIsDirty(false)
    return () => setSegments([])
  }, [setSegments, setIsDirty])

  const tree = useCategoryTree(categories, products)
  const { sort, setSort, sortedTree } = useCategorySort(tree)
  const filteredTree = useFilteredCategories(sortedTree, search)

  return (
    <div className="mx-auto max-w-4xl space-y-4 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Categories</h1>
        <Button asChild>
          <Link to="/categories/new">Add Category</Link>
        </Button>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex-1">
          <CategorySearch value={search} onSearch={setSearch} />
        </div>
        <CategorySortDropdown value={sort} onSort={setSort} />
      </div>

      <CategoryAccordion categoryTree={filteredTree} allProducts={products} />
    </div>
  )
}
