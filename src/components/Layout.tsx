import { Outlet } from "react-router-dom"
import { Navigation } from "./Navigation"

export function Layout() {
  return (
    <div className="min-h-svh animate-in fade-in duration-200">
      <Navigation />
      <Outlet />
    </div>
  )
}
