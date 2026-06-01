import { z } from "zod"

export const categorySchema = z.object({
  name: z.string().min(2, "Category name must be at least 2 characters").max(50, "Category name must be at most 50 characters"),
  description: z.string().max(200, "Description must be at most 200 characters").optional(),
  parentId: z.string().nullable().optional(),
  color: z.string().regex(/^#[0-9a-fA-F]{6}$/, "Invalid color"),
})

export type CategoryFormValues = z.infer<typeof categorySchema>
