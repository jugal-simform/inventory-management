import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface CategoryActionsProps {
  depth: number
  onEdit: () => void
  onAddSubcategory: () => void
  onAddProduct: () => void
  onMoveProducts: () => void
  onDelete: () => void
}

export function CategoryActions({
  depth,
  onEdit,
  onAddSubcategory,
  onAddProduct,
  onMoveProducts,
  onDelete,
}: Readonly<CategoryActionsProps>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 flex-shrink-0"
          onClick={(e) => e.stopPropagation()}
        >
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Category actions</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
        <DropdownMenuItem onClick={onEdit}>Edit Category</DropdownMenuItem>
        {depth < 1 && (
          <DropdownMenuItem onClick={onAddSubcategory}>Add Subcategory</DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={onAddProduct}>Add Product to Category</DropdownMenuItem>
        <DropdownMenuItem onClick={onMoveProducts}>Move All Products</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-destructive focus:text-destructive"
          onClick={onDelete}
        >
          Delete Category
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
