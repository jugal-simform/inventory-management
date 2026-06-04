import type { UseFormReturn } from "react-hook-form"
import { Link } from "react-router-dom"

import { ImageUpload } from "@/components/shared/ImageUpload"
import { TagInput } from "@/components/shared/TagInput"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import type { Category, Supplier } from "@/types"

import type { WizardFormValues } from "@/features/wizard/validation"

interface Step1ProductInfoProps {
  form: UseFormReturn<WizardFormValues>
  categories: Category[]
  suppliers: Supplier[]
}

export function Step1ProductInfo({ form, categories, suppliers }: Step1ProductInfoProps) {
  const errors = form.formState.errors
  const tags = form.watch("tags")
  const images = form.watch("images")

  return (
    <div data-step="1" className="space-y-4">
      {categories.length === 0 && (
        <p className="rounded-md border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
          Create a category first. <Link to="/products" className="underline">Go to products</Link>
        </p>
      )}
      {suppliers.length === 0 && (
        <p className="rounded-md border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
          Add a supplier first. <Link to="/products" className="underline">Go to products</Link>
        </p>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-1">
          <label htmlFor="name" className="text-sm font-medium">
            Product Name
          </label>
          <Input
            id="name"
            {...form.register("name")}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && (
            <p id="name-error" className="text-sm text-destructive">
              {errors.name.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <label htmlFor="sku" className="text-sm font-medium">
            SKU
          </label>
          <Input
            id="sku"
            {...form.register("sku")}
            aria-describedby={errors.sku ? "sku-error" : undefined}
          />
          {errors.sku && (
            <p id="sku-error" className="text-sm text-destructive">
              {errors.sku.message}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-1">
        <label htmlFor="description" className="text-sm font-medium">
          Description
        </label>
        <Textarea id="description" {...form.register("description")} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-1">
          <label htmlFor="barcode" className="text-sm font-medium">
            Barcode
          </label>
          <Input id="barcode" {...form.register("barcode")} />
        </div>

        <div className="space-y-1">
          <label htmlFor="categoryId" className="text-sm font-medium">
            Category
          </label>
          <select
            id="categoryId"
            className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
            {...form.register("categoryId")}
            aria-describedby={errors.categoryId ? "category-error" : undefined}
          >
            <option value="">Select category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.categoryId && (
            <p id="category-error" className="text-sm text-destructive">
              {errors.categoryId.message}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-1">
        <label htmlFor="supplierId" className="text-sm font-medium">
          Supplier
        </label>
        <select
          id="supplierId"
          className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
          {...form.register("supplierId")}
          aria-describedby={errors.supplierId ? "supplier-error" : undefined}
        >
          <option value="">Select supplier</option>
          {suppliers.map((supplier) => (
            <option key={supplier.id} value={supplier.id}>
              {supplier.name}
            </option>
          ))}
        </select>
        {errors.supplierId && (
          <p id="supplier-error" className="text-sm text-destructive">
            {errors.supplierId.message}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium">Tags</label>
        <TagInput
          tags={tags}
          onChange={(nextTags) => form.setValue("tags", nextTags, { shouldValidate: true })}
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium">Product Images</label>
        <ImageUpload
          images={images}
          onChange={(nextImages) =>
            form.setValue("images", nextImages, { shouldValidate: true })
          }
        />
      </div>
    </div>
  )
}
