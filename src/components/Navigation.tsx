import { NavLink } from "react-router-dom"
import { cn } from "@/lib/utils"

export function Navigation() {
  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-5xl items-center gap-1 px-4 py-3 md:px-6">
        <span className="mr-4 text-sm font-semibold tracking-tight">Inventory</span>
        <NavLink
          to="/products"
          className={({ isActive }) =>
            cn(
              "rounded-md px-3 py-1.5 text-sm transition-colors",
              isActive
                ? "bg-primary/10 font-medium text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )
          }
        >
          Products
        </NavLink>
        <NavLink
          to="/categories"
          className={({ isActive }) =>
            cn(
              "rounded-md px-3 py-1.5 text-sm transition-colors",
              isActive
                ? "bg-primary/10 font-medium text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )
          }
        >
          Categories
        </NavLink>
      </nav>
    </header>
  )
}
