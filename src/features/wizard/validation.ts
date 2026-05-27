import { z } from "zod"

const units = ["pieces", "kg", "liters", "meters", "boxes"] as const

function toNumber(value: unknown) {
  if (value === "" || value === null || value === undefined) {
    return undefined
  }
  return Number(value)
}

export const step1Schema = z.object({
  name: z
    .string()
    .min(1, "Product name is required")
    .min(3, "Product name must be at least 3 characters")
    .max(100),
  description: z.string().max(500).default(""),
  sku: z.string().default(""),
  barcode: z.string().default(""),
  categoryId: z.string().min(1, "Please select a category"),
  supplierId: z.string().min(1, "Please select a supplier"),
  tags: z.array(z.string()).default([]),
  images: z.array(z.string()).default([]),
})

export const step2Schema = z
  .object({
    costPrice: z.preprocess(
      toNumber,
      z.number().positive("Cost price is required")
    ),
    sellingPrice: z.preprocess(
      toNumber,
      z.number().positive("Selling price is required")
    ),
  })
  .refine((data) => data.sellingPrice >= data.costPrice, {
    message: "Selling price cannot be less than cost price",
    path: ["sellingPrice"],
  })

export const step3Schema = z
  .object({
    quantity: z.preprocess(
      toNumber,
      z.number().min(0, "Quantity cannot be negative")
    ),
    unit: z.enum(units),
    minStockLevel: z.preprocess(
      toNumber,
      z.number().min(0, "Minimum stock level is required")
    ),
    maxStockLevel: z.preprocess(toNumber, z.number().optional()),
    location: z.string().default(""),
    weight: z.preprocess(toNumber, z.number().positive().optional()),
    dimensionLength: z.preprocess(toNumber, z.number().positive().optional()),
    dimensionWidth: z.preprocess(toNumber, z.number().positive().optional()),
    dimensionHeight: z.preprocess(toNumber, z.number().positive().optional()),
  })
  .superRefine((data, context) => {
    if (
      data.maxStockLevel !== undefined &&
      data.maxStockLevel <= data.minStockLevel
    ) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Maximum stock level must be greater than minimum stock level",
        path: ["maxStockLevel"],
      })
    }

    const hasAnyDimension =
      data.dimensionLength !== undefined ||
      data.dimensionWidth !== undefined ||
      data.dimensionHeight !== undefined

    const hasAllDimensions =
      data.dimensionLength !== undefined &&
      data.dimensionWidth !== undefined &&
      data.dimensionHeight !== undefined

    if (hasAnyDimension && !hasAllDimensions) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please provide all dimensions or leave all blank",
        path: ["dimensionLength"],
      })
    }
  })

export const wizardFormSchema = step1Schema.merge(step2Schema).merge(step3Schema)

export type WizardFormValues = z.infer<typeof wizardFormSchema>

export const stepFieldNames: Array<Array<keyof WizardFormValues>> = [
  [
    "name",
    "description",
    "sku",
    "barcode",
    "categoryId",
    "supplierId",
    "tags",
    "images",
  ],
  ["costPrice", "sellingPrice"],
  [
    "quantity",
    "unit",
    "minStockLevel",
    "maxStockLevel",
    "location",
    "weight",
    "dimensionLength",
    "dimensionWidth",
    "dimensionHeight",
  ],
]
