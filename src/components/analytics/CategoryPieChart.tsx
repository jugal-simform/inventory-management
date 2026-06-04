import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts"
import type { StockByCategoryItem } from "@/hooks/analytics/useInventoryMetrics"

interface CategoryPieChartProps {
  data: StockByCategoryItem[]
}

const COLORS = ["#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899", "#14b8a6", "#f97316"]

export function CategoryPieChart({ data }: CategoryPieChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="flex h-80 items-center justify-center rounded-lg border border-border bg-muted">
        <p className="text-muted-foreground">No category data available</p>
      </div>
    )
  }

  const chartData = data.map((item) => ({
    name: item.categoryName,
    value: item.stock,
    percentage: item.percentage,
  }))

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percentage }) => `${name} (${percentage.toFixed(1)}%)`}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value} units`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
