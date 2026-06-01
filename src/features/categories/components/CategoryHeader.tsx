import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import type { CategoryTreeNode } from "../hooks/useCategoryTree"
import type { Product } from "@/types"

interface StockHealth {
  inStock: number
  lowStock: number
  outOfStock: number
}

function computeStockHealth(products: Product[], minStockLevel: number): StockHealth {
  let inStock = 0
  let lowStock = 0
  let outOfStock = 0
  for (const p of products) {
    if (p.quantity === 0) outOfStock++
    else if (p.quantity <= (p.minStockLevel ?? minStockLevel)) lowStock++
    else inStock++
  }
  return { inStock, lowStock, outOfStock }
}

interface CategoryHeaderProps {
  category: CategoryTreeNode
  products: Product[]
  expanded: boolean
  depth: number
}

export function CategoryHeader({ category, products, expanded, depth }: Readonly<CategoryHeaderProps>) {
  const health = computeStockHealth(products, 5)
  const count = products.length

  return (
    <div
      className="flex w-full items-center gap-3 py-1"
      style={{ paddingLeft: depth * 24 }}
    >
      <div
        className="h-3 w-3 shrink-0 rounded-full"
        style={{ backgroundColor: category.color ?? "#94a3b8" }}
      />

      <Tooltip>
        <TooltipTrigger asChild>
          <span className="flex-1 truncate text-left font-medium">{category.name}</span>
        </TooltipTrigger>
        <TooltipContent>{category.name}</TooltipContent>
      </Tooltip>

      <span className="shrink-0 rounded-md bg-secondary px-2 py-1 text-xs text-secondary-foreground">
        {count} {count === 1 ? "product" : "products"}
      </span>

      {count > 0 && (
        <div className="flex shrink-0 items-center gap-1.5 text-xs">
          {health.inStock > 0 && (
            <span className="flex items-center gap-0.5 text-green-600">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              {health.inStock}
            </span>
          )}
          {health.lowStock > 0 && (
            <span className="flex items-center gap-0.5 text-amber-600">
              <span className="h-2 w-2 rounded-full bg-amber-500" />
              {health.lowStock}
            </span>
          )}
          {health.outOfStock > 0 && (
            <span className="flex items-center gap-0.5 text-red-600">
              <span className="h-2 w-2 rounded-full bg-red-500" />
              {health.outOfStock}
            </span>
          )}
        </div>
      )}

      <ChevronDown
        className={cn(
          "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200",
          expanded && "rotate-180",
          "group-data-[state=open]:rotate-180"
        )}
      />
    </div>
  )
}
