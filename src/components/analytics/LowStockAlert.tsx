import { AlertCircle } from "lucide-react"

interface LowStockAlertProps {
  count: number
  onViewDetails?: () => void
}

export function LowStockAlert({ count, onViewDetails }: LowStockAlertProps) {
  return (
    <div className="rounded-lg border border-destructive bg-card p-6">
      <div className="flex items-start gap-4">
        <AlertCircle className="mt-1 h-6 w-6 flex-shrink-0 text-destructive" />
        <div className="flex-1">
          <h3 className="font-semibold text-destructive">Low Stock Alert</h3>
          <p className="mt-1 text-sm text-foreground">
            {count === 0
              ? "All products have healthy stock levels"
              : `${count} product${count === 1 ? "" : "s"} below stock threshold`}
          </p>
          {count > 0 && onViewDetails && (
            <button
              onClick={onViewDetails}
              className="mt-3 inline-flex items-center gap-2 rounded bg-destructive px-3 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              View Low Stock Products
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
