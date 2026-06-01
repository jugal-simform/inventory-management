import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CategoryProductList } from "./CategoryProductList"
import { CategoryActions } from "./CategoryActions"
import { CategoryForm } from "./CategoryForm"
import { useCategories } from "../context/CategoryContext"
import type { CategoryTreeNode } from "../hooks/useCategoryTree"
import type { Product } from "@/types"

interface CategoryContentProps {
  category: CategoryTreeNode
  products: Product[]
  depth: number
}

export function CategoryContent({ category, products, depth }: Readonly<CategoryContentProps>) {
  const navigate = useNavigate()
  const { categories, deleteCategory, dispatch } = useCategories()

  const [editOpen, setEditOpen] = useState(false)
  const [subOpen, setSubOpen] = useState(false)
  const [moveOpen, setMoveOpen] = useState(false)
  const [moveTarget, setMoveTarget] = useState<string>("")
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)

  const isUncategorized = category.id === "__uncategorized__"

  function handleDelete() {
    if (category.children.length > 0) {
      toast.error("Remove or reassign subcategories first")
      return
    }
    if (products.length > 0) {
      setDeleteConfirmOpen(true)
      return
    }
    deleteCategory(category.id)
    toast.success("Category deleted")
  }

  function handleConfirmDelete() {
    if (!moveTarget) {
      toast.error("Please select a target category")
      return
    }
    dispatch({
      type: "MOVE_PRODUCTS",
      payload: { fromId: category.id, toId: moveTarget, count: products.length },
    })
    deleteCategory(category.id)
    toast.success("Category deleted")
    setDeleteConfirmOpen(false)
  }

  const otherCategories = categories.filter((c) => c.id !== category.id && !c.parentId)

  return (
    <div className="border-t bg-background">
      {/* Info bar */}
      {!isUncategorized && (
        <div className="flex items-center justify-between border-b px-4 py-3">
          <p className="text-sm text-muted-foreground">
            {category.description ?? "No description"}
          </p>
          <div className="flex items-center gap-2">
            <CategoryActions
              depth={depth}
              onEdit={() => setEditOpen(true)}
              onAddSubcategory={() => setSubOpen(true)}
              onAddProduct={() => navigate(`/products/new?categoryId=${category.id}`)}
              onMoveProducts={() => setMoveOpen(true)}
              onDelete={handleDelete}
            />
            <Button size="sm" variant="outline" onClick={() => setEditOpen(true)}>
              Edit
            </Button>
            <Button size="sm" variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </div>
      )}

      {/* Product list */}
      <div className="p-4">
        <CategoryProductList products={products} categoryId={category.id} />
      </div>

      {/* Edit dialog */}
      <CategoryForm
        open={editOpen}
        onClose={() => setEditOpen(false)}
        categoryId={category.id}
        defaultValues={{
          name: category.name,
          description: category.description ?? "",
          color: category.color ?? "#3b82f6",
          parentId: category.parentId ?? null,
        }}
      />

      {/* Add subcategory dialog */}
      <CategoryForm
        open={subOpen}
        onClose={() => setSubOpen(false)}
        lockedParentId={category.id}
      />

      {/* Move all products dialog */}
      <Dialog open={moveOpen} onOpenChange={setMoveOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Move All Products</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Move {products.length} product(s) to:
          </p>
          <Select onValueChange={setMoveTarget}>
            <SelectTrigger>
              <SelectValue placeholder="Select target category" />
            </SelectTrigger>
            <SelectContent>
              {otherCategories.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <DialogFooter>
            <Button variant="outline" onClick={() => setMoveOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (!moveTarget) { toast.error("Select a target category"); return }
                dispatch({ type: "MOVE_PRODUCTS", payload: { fromId: category.id, toId: moveTarget, count: products.length } })
                toast.success("Products moved")
                setMoveOpen(false)
              }}
            >
              Move
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete with reassignment dialog */}
      <Dialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete Category</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Move {products.length} product(s) to another category before deleting:
          </p>
          <Select onValueChange={setMoveTarget}>
            <SelectTrigger>
              <SelectValue placeholder="Select target category" />
            </SelectTrigger>
            <SelectContent>
              {otherCategories.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteConfirmOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
