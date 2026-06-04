import { ReactNode } from "react"

interface MetricCardProps {
  title: string
  value: number | string
  icon?: ReactNode
  description?: string
  variant?: "default" | "warning" | "success"
}

export function MetricCard({
  title,
  value,
  icon,
  description,
  variant = "default",
}: MetricCardProps) {
  const variantStyles = {
    default: "border-border bg-card",
    warning: "border-destructive bg-card",
    success: "border-border bg-card",
  }

  const variantTextStyles = {
    default: "text-foreground",
    warning: "text-destructive",
    success: "text-foreground",
  }

  return (
    <div className={`rounded-lg border p-6 ${variantStyles[variant]}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className={`mt-2 text-3xl font-bold ${variantTextStyles[variant]}`}>{value}</p>
          {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
        </div>
        {icon && <div className="ml-4 flex-shrink-0">{icon}</div>}
      </div>
    </div>
  )
}
