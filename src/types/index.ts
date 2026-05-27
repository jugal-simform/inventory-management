export type Unit = "pieces" | "kg" | "liters" | "meters" | "boxes"
export type AlertType = "low_stock" | "out_of_stock"
export type AlertSeverity = "warning" | "critical"
export type TransactionType = "restock"

export interface Dimensions {
  length: number
  width: number
  height: number
}

export interface Category {
  id: string
  name: string
  createdAt: string
  updatedAt: string
}

export interface Supplier {
  id: string
  name: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface Product {
  id: string
  name: string
  description: string
  sku: string
  barcode: string
  categoryId: string
  supplierId: string
  tags: string[]
  images: string[]
  costPrice: number
  sellingPrice: number
  quantity: number
  unit: Unit
  minStockLevel: number
  maxStockLevel: number | null
  location: string
  weight: number | null
  dimensions: Dimensions | null
  createdAt: string
  updatedAt: string
}

export interface StockAlert {
  id: string
  productId: string
  type: AlertType
  severity: AlertSeverity
  message: string
  createdAt: string
}

export interface StockTransaction {
  id: string
  productId: string
  type: TransactionType
  quantity: number
  previousQuantity: number
  newQuantity: number
  createdAt: string
}
