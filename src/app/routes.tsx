import { Navigate, createBrowserRouter } from "react-router-dom"

import { Layout } from "@/components/Layout"
import { LayoutForm } from "@/components/LayoutForm"
import { ProductsPage } from "@/features/products/components/ProductsPage"
import { AddProductWizard } from "@/features/wizard/AddProductWizard"
import { CategoryManagement } from "@/features/categories/pages/CategoryManagement"
import { CategoryFormPage } from "@/features/categories/pages/CategoryFormPage"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/products" replace />,
  },
  {
    element: <Layout />,
    children: [
      {
        path: "/products",
        element: <ProductsPage />,
      },
      {
        path: "/categories",
        element: <CategoryManagement />,
      },
    ],
  },
  {
    element: <LayoutForm />,
    children: [
      {
        path: "/products/new",
        element: <AddProductWizard />,
      },
      {
        path: "/categories/new",
        element: <CategoryFormPage />,
      },
    ],
  },
])
