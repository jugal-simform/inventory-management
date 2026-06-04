import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, type UseFormReturn } from "react-hook-form"
import { useSearchParams } from "react-router-dom"

import { wizardFormSchema, type WizardFormValues } from "@/features/wizard/validation"

export function useWizardForm(): UseFormReturn<WizardFormValues> {
  const [searchParams] = useSearchParams()
  const prefilledCategoryId = searchParams.get("categoryId") ?? ""

  return useForm<WizardFormValues, unknown, WizardFormValues>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(wizardFormSchema) as any,
    defaultValues: {
      name: "",
      description: "",
      sku: "",
      barcode: "",
      categoryId: prefilledCategoryId,
      supplierId: "",
      tags: [],
      images: [],
      costPrice: undefined,
      sellingPrice: undefined,
      quantity: 0,
      unit: "pieces",
      minStockLevel: 0,
      maxStockLevel: undefined,
      location: "",
      weight: undefined,
      dimensionLength: undefined,
      dimensionWidth: undefined,
      dimensionHeight: undefined,
    },
    mode: "onTouched",
  }) as UseFormReturn<WizardFormValues>
}
