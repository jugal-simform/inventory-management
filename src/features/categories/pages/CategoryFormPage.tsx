import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useBreadcrumb } from "@/components/breadcrumb-context"
import { categorySchema, type CategoryFormValues } from "../schemas/categorySchema"
import { useCategories } from "../context/CategoryContext"
import type { Category } from "@/types"

const PRESET_COLORS = [
  "#3b82f6", "#ef4444", "#22c55e", "#f59e0b",
  "#8b5cf6", "#ec4899", "#14b8a6", "#f97316",
  "#6366f1", "#84cc16",
]

export function CategoryFormPage() {
  const navigate = useNavigate()
  const { categories, addCategory } = useCategories()
  const { setSegments, setIsDirty } = useBreadcrumb()
  const topLevelCategories = categories.filter((c) => !c.parentId)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      description: "",
      color: "#3b82f6",
      parentId: null,
    },
  })

  const selectedColor = watch("color") ?? "#3b82f6"

  useEffect(() => {
    setSegments([
      { label: "Categories", path: "/categories" },
      { label: "Add Category" },
    ])
    return () => {
      setSegments([])
      setIsDirty(false)
    }
  }, [setSegments, setIsDirty])

  useEffect(() => {
    setIsDirty(isDirty)
  }, [isDirty, setIsDirty])

  function onSubmit(values: CategoryFormValues) {
    const now = new Date().toISOString()
    const newCat: Category = {
      id: crypto.randomUUID(),
      ...values,
      productCount: 0,
      createdAt: now,
      updatedAt: now,
    }
    addCategory(newCat)
    toast.success("Category created")
    navigate("/categories")
  }

  return (
    <main className="mx-auto w-full max-w-2xl p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Add Category</h1>
        <p className="text-sm text-muted-foreground">
          Create a new category to organize your products.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-1">
          <label className="text-sm font-medium">Name</label>
          <Input {...register("name")} placeholder="Category name" />
          {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Description</label>
          <Textarea {...register("description")} placeholder="Optional description" rows={3} />
          {errors.description && (
            <p className="text-sm text-destructive">{errors.description.message}</p>
          )}
        </div>

        <div className="space-y-2">
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
                onClick={() => setValue("color", hex, { shouldValidate: true, shouldDirty: true })}
              />
            ))}
          </div>
          <Input
            value={selectedColor}
            onChange={(e) => setValue("color", e.target.value, { shouldValidate: true, shouldDirty: true })}
            placeholder="#3b82f6"
            className="font-mono text-sm"
          />
          {errors.color && <p className="text-sm text-destructive">{errors.color.message}</p>}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Parent Category</label>
          <Select
            defaultValue="none"
            onValueChange={(val) =>
              setValue("parentId", val === "none" ? null : val, { shouldValidate: true, shouldDirty: true })
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

        <div className="flex justify-end gap-2 pt-2">
          <Button type="submit" disabled={isSubmitting}>
            Create Category
          </Button>
        </div>
      </form>
    </main>
  )
}
