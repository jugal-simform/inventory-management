import type { ReactNode } from "react"

import { AlertProvider } from "@/features/alerts/context/AlertContext"
import { CategoryProvider } from "@/features/categories/context/CategoryContext"
import { ProductProvider } from "@/features/products/context/ProductContext"
import { SupplierProvider } from "@/features/suppliers/context/SupplierContext"
import { TransactionProvider } from "@/features/transactions/context/TransactionContext"

interface AppProvidersProps {
  children: ReactNode
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <CategoryProvider>
      <SupplierProvider>
        <ProductProvider>
          <AlertProvider>
            <TransactionProvider>{children}</TransactionProvider>
          </AlertProvider>
        </ProductProvider>
      </SupplierProvider>
    </CategoryProvider>
  )
}
