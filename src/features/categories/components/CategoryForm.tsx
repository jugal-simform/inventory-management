import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
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
import { categorySchema, type CategoryFormValues } from "../schemas/categorySchema"
import { useCategories } from "../context/CategoryContext"
import type { Category } from "@/types"

const PRESET_COLORS = [
  "#3b82f6", "#ef4444", "#22c55e", "#f59e0b",
  "#8b5cf6", "#ec4899", "#14b8a6", "#f97316",
  "#6366f1", "#84cc16",
]

interface CategoryFormProps {
  open: boolean
  onClose: () => void
  defaultValues?: Partial<CategoryFormValues>
  categoryId?: string
  lockedParentId?: string
}

export function CategoryForm({
  open,
  onClose,
  defaultValues,
  categoryId,
  lockedParentId,
}: Readonly<CategoryFormProps>) {
  const { categories, addCategory, updateCategory } = useCategories()
  const isEdit = Boolean(categoryId)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      description: "",
      color: "#3b82f6",
      parentId: lockedParentId ?? null,
      ...defaultValues,
    },
  })

  const selectedColor = watch("color") ?? "#3b82f6"
  const topLevelCategories = categories.filter((c) => !c.parentId && c.id !== categoryId)

  function onSubmit(values: CategoryFormValues) {
    const now = new Date().toISOString()
    if (isEdit && categoryId) {
      const existing = categories.find((c) => c.id === categoryId)
      if (!existing) return
      updateCategory({
        ...existing,
        ...values,
        updatedAt: now,
      })
      toast.success("Category updated")
    } else {
      const newCat: Category = {
        id: crypto.randomUUID(),
        ...values,
        productCount: 0,
        createdAt: now,
        updatedAt: now,
      }
      addCategory(newCat)
      toast.success("Category created")
    }
    reset()
    onClose()
  }

  function handleOpenChange(open: boolean) {
    if (!open) {
      reset()
      onClose()
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit Category" : lockedParentId ? "Add Subcategory" : "Add Category"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium">Name</label>
            <Input {...register("name")} placeholder="Category name" />
            {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Description</label>
            <Textarea {...register("description")} placeholder="Optional description" rows={2} />
            {errors.description && (
              <p className="text-sm text-destructive">{errors.description.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Color</label>
            <div className="flex flex-wrap gap-2">
              {PRESET_COLORS.map((hex) => (
                <button
                  key={hex}
                  type="button"
                  className="h-7 w-7 rounded-full ring-offset-2 transition-all focus:outline-none focus:ring-2 focus:ring-ring"
                  style={{
                    backgroundColor: hex,
                    outline: selectedColor === hex ? "2px solid hsl(var(--foreground))" : "none",
                    outlineOffset: "2px",
                  }}
                  onClick={() => setValue("color", hex, { shouldValidate: true })}
                />
              ))}
            </div>
            <Input
              value={selectedColor}
              onChange={(e) => setValue("color", e.target.value, { shouldValidate: true })}
              placeholder="#3b82f6"
              className="mt-2 font-mono text-sm"
            />
            {errors.color && <p className="text-sm text-destructive">{errors.color.message}</p>}
          </div>

          {!lockedParentId && (
            <div className="space-y-1">
              <label className="text-sm font-medium">Parent Category</label>
              <Select
                defaultValue={defaultValues?.parentId ?? "none"}
                onValueChange={(val) =>
                  setValue("parentId", val === "none" ? null : val, { shouldValidate: true })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="None (top-level)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None (top-level)</SelectItem>
                  {topLevelCategories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {lockedParentId && (
            <div className="space-y-1">
              <label className="text-sm font-medium">Parent Category</label>
              <Input
                value={categories.find((c) => c.id === lockedParentId)?.name ?? lockedParentId}
                disabled
                className="bg-muted"
              />
            </div>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isEdit ? "Save Changes" : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
