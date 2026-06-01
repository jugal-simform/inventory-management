import { useState } from "react"
import { Accordion as AccordionPrimitive } from "radix-ui"
import { CategoryItem } from "./CategoryItem"
import type { CategoryTreeNode } from "../hooks/useCategoryTree"
import type { Product } from "@/types"

interface CategoryAccordionProps {
  categoryTree: CategoryTreeNode[]
  allProducts: Product[]
}

export function CategoryAccordion({ categoryTree, allProducts }: Readonly<CategoryAccordionProps>) {
  const [expandedId, setExpandedId] = useState<string>("")

  if (categoryTree.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-muted-foreground">
        No categories match your search
      </p>
    )
  }

  return (
    <div className="rounded-lg border">
      <AccordionPrimitive.Root
        type="single"
        collapsible
        value={expandedId}
        onValueChange={setExpandedId}
      >
        {categoryTree.map((category) => {
          const products = allProducts.filter((p) => p.categoryId === category.id)
          return (
            <CategoryItem
              key={category.id}
              category={category}
              products={products}
              allProducts={allProducts}
            />
          )
        })}
      </AccordionPrimitive.Root>

      {!expandedId && (
        <p className="border-t py-3 text-center text-xs text-muted-foreground">
          Click a category to see its products
        </p>
      )}
    </div>
  )
}
