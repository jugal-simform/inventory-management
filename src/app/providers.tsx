import type { ReactNode } from "react"

import { AlertProvider } from "@/features/alerts/context/AlertContext"
import { CategoryProvider } from "@/features/categories/context/CategoryContext"
import { ProductProvider } from "@/features/products/context/ProductContext"
import { SupplierProvider } from "@/features/suppliers/context/SupplierContext"
import { TransactionProvider } from "@/features/transactions/context/TransactionContext"
import { TooltipProvider } from "@/components/ui/tooltip"

interface AppProvidersProps {
  children: ReactNode
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <TooltipProvider>
      <CategoryProvider>
        <SupplierProvider>
          <ProductProvider>
            <AlertProvider>
              <TransactionProvider>{children}</TransactionProvider>
            </AlertProvider>
          </ProductProvider>
        </SupplierProvider>
      </CategoryProvider>
    </TooltipProvider>
  )
}
