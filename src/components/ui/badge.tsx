import type { ComponentProps } from "react"

import { cn } from "@/lib/utils"

export function Badge({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md bg-secondary px-2 py-1 text-xs text-secondary-foreground",
        className
      )}
      {...props}
    />
  )
}
