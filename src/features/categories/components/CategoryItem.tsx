import { Accordion as AccordionPrimitive } from "radix-ui"
import { cn } from "@/lib/utils"
import { CategoryHeader } from "./CategoryHeader"
import { CategoryContent } from "./CategoryContent"
import type { CategoryTreeNode } from "../hooks/useCategoryTree"
import type { Product } from "@/types"

interface CategoryItemProps {
  category: CategoryTreeNode
  products: Product[]
  allProducts: Product[]
  depth?: number
}

export function CategoryItem({ category, products, allProducts, depth = 0 }: Readonly<CategoryItemProps>) {
  return (
    <AccordionPrimitive.Item
      value={category.id}
      className={cn("border-b last:border-0", depth > 0 && "border-dashed")}
    >
      <AccordionPrimitive.Header className="flex items-center">
        <AccordionPrimitive.Trigger className="group flex flex-1 cursor-pointer items-center gap-2 px-4 py-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1">
          <CategoryHeader
            category={category}
            products={products}
            expanded={false}
            depth={depth}
          />
        </AccordionPrimitive.Trigger>
      </AccordionPrimitive.Header>

      <AccordionPrimitive.Content className="overflow-hidden data-open:animate-accordion-down data-closed:animate-accordion-up">
        <CategoryContent
          category={category}
          products={products}
          depth={depth}
        />

        {/* Nested subcategories */}
        {category.children.length > 0 && depth === 0 && (
          <AccordionPrimitive.Root type="single" collapsible className="pl-4">
            {category.children.map((sub) => {
              const subProducts = allProducts.filter((p) => p.categoryId === sub.id)
              return (
                <CategoryItem
                  key={sub.id}
                  category={sub}
                  products={subProducts}
                  allProducts={allProducts}
                  depth={1}
                />
              )
            })}
          </AccordionPrimitive.Root>
        )}
      </AccordionPrimitive.Content>
    </AccordionPrimitive.Item>
  )
}
