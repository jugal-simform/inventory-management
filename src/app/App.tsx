import { RouterProvider } from "react-router-dom"
import { Toaster } from "sonner"

import { AppProviders } from "@/app/providers"
import { router } from "@/app/routes"

export default function App() {
  return (
    <AppProviders>
      <RouterProvider router={router} />
      <Toaster />
    </AppProviders>
  )
}
