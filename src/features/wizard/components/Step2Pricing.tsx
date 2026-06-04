import type { UseFormReturn } from "react-hook-form"

import { Input } from "@/components/ui/input"

import type { WizardFormValues } from "@/features/wizard/validation"

interface Step2PricingProps {
  form: UseFormReturn<WizardFormValues>
}

export function Step2Pricing({ form }: Step2PricingProps) {
  const errors = form.formState.errors
  const costPrice = Number(form.watch("costPrice") ?? 0)
  const sellingPrice = Number(form.watch("sellingPrice") ?? 0)

  const margin = sellingPrice > 0 ? ((sellingPrice - costPrice) / sellingPrice) * 100 : 0

  return (
    <div data-step="2" className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-1">
          <label htmlFor="costPrice" className="text-sm font-medium">
            Cost Price
          </label>
          <Input
            id="costPrice"
            type="number"
            step="0.01"
            min="0"
            {...form.register("costPrice")}
            aria-describedby={errors.costPrice ? "cost-error" : undefined}
          />
          {errors.costPrice && (
            <p id="cost-error" className="text-sm text-destructive">
              {errors.costPrice.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <label htmlFor="sellingPrice" className="text-sm font-medium">
            Selling Price
          </label>
          <Input
            id="sellingPrice"
            type="number"
            step="0.01"
            min="0"
            {...form.register("sellingPrice")}
            aria-describedby={errors.sellingPrice ? "sell-error" : undefined}
          />
          {errors.sellingPrice && (
            <p id="sell-error" className="text-sm text-destructive">
              {errors.sellingPrice.message}
            </p>
          )}
        </div>
      </div>

      <p className="rounded-md border border-border bg-muted/40 p-3 text-sm">
        Profit Margin: <span className="font-semibold">{margin.toFixed(2)}%</span>
      </p>
    </div>
  )
}
