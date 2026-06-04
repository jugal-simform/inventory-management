import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import type { StockByProductItem } from "@/hooks/analytics/useInventoryMetrics"

interface StockBarChartProps {
  data: StockByProductItem[]
}

export function StockBarChart({ data }: StockBarChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="flex h-80 items-center justify-center rounded-lg border border-border bg-muted">
        <p className="text-muted-foreground">No products available</p>
      </div>
    )
  }

  const chartData = data.map((item) => ({
    name: item.productName,
    stock: item.stock,
  }))

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
          <YAxis />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "4px",
            }}
            formatter={(value) => `${value} units`}
          />
          <Legend />
          <Bar dataKey="stock" fill="#3b82f6" name="Stock Level" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
