import type { UseFormReturn } from "react-hook-form"

import { Input } from "@/components/ui/input"

import type { WizardFormValues } from "@/features/wizard/validation"

interface Step3StockDetailsProps {
  form: UseFormReturn<WizardFormValues>
}

export function Step3StockDetails({ form }: Step3StockDetailsProps) {
  const errors = form.formState.errors

  return (
    <div data-step="3" className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-1">
          <label htmlFor="quantity" className="text-sm font-medium">
            Initial Quantity
          </label>
          <Input
            id="quantity"
            type="number"
            min="0"
            {...form.register("quantity")}
            aria-describedby={errors.quantity ? "quantity-error" : undefined}
          />
          {errors.quantity && (
            <p id="quantity-error" className="text-sm text-destructive">
              {errors.quantity.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <label htmlFor="unit" className="text-sm font-medium">
            Unit
          </label>
          <select
            id="unit"
            className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
            {...form.register("unit")}
          >
            <option value="pieces">pieces</option>
            <option value="kg">kg</option>
            <option value="liters">liters</option>
            <option value="meters">meters</option>
            <option value="boxes">boxes</option>
          </select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-1">
          <label htmlFor="minStockLevel" className="text-sm font-medium">
            Min Stock Level
          </label>
          <Input
            id="minStockLevel"
            type="number"
            min="0"
            {...form.register("minStockLevel")}
            aria-describedby={errors.minStockLevel ? "min-error" : undefined}
          />
          {errors.minStockLevel && (
            <p id="min-error" className="text-sm text-destructive">
              {errors.minStockLevel.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <label htmlFor="maxStockLevel" className="text-sm font-medium">
            Max Stock Level
          </label>
          <Input
            id="maxStockLevel"
            type="number"
            min="0"
            {...form.register("maxStockLevel")}
            aria-describedby={errors.maxStockLevel ? "max-error" : undefined}
          />
          {errors.maxStockLevel && (
            <p id="max-error" className="text-sm text-destructive">
              {errors.maxStockLevel.message}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-1">
        <label htmlFor="location" className="text-sm font-medium">
          Storage Location
        </label>
        <Input id="location" {...form.register("location")} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-1">
          <label htmlFor="weight" className="text-sm font-medium">
            Weight
          </label>
          <Input id="weight" type="number" min="0" step="0.01" {...form.register("weight")} />
        </div>
      </div>

      <fieldset className="space-y-2 rounded-md border border-border p-3">
        <legend className="px-1 text-sm font-medium">Dimensions (L/W/H)</legend>
        <div className="grid gap-3 md:grid-cols-3">
          <Input
            placeholder="Length"
            type="number"
            min="0"
            step="0.01"
            {...form.register("dimensionLength")}
          />
          <Input
            placeholder="Width"
            type="number"
            min="0"
            step="0.01"
            {...form.register("dimensionWidth")}
          />
          <Input
            placeholder="Height"
            type="number"
            min="0"
            step="0.01"
            {...form.register("dimensionHeight")}
          />
        </div>
        {errors.dimensionLength && (
          <p className="text-sm text-destructive">{errors.dimensionLength.message}</p>
        )}
      </fieldset>
    </div>
  )
}
