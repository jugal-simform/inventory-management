import { Navigate, createBrowserRouter } from "react-router-dom"

import { ProductsPage } from "@/features/products/components/ProductsPage"
import { AddProductWizard } from "@/features/wizard/AddProductWizard"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/products" replace />,
  },
  {
    path: "/products",
    element: <ProductsPage />,
  },
  {
    path: "/products/new",
    element: <AddProductWizard />,
  },
])
