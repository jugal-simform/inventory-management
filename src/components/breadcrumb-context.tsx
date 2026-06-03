import { createContext, useContext, useState, type ReactNode } from "react"

export interface BreadcrumbSegment {
  label: string
  path?: string
}

interface BreadcrumbContextValue {
  segments: BreadcrumbSegment[]
  setSegments: (segments: BreadcrumbSegment[]) => void
  isDirty: boolean
  setIsDirty: (dirty: boolean) => void
}

const BreadcrumbContext = createContext<BreadcrumbContextValue | null>(null)

export function BreadcrumbProvider({ children }: { children: ReactNode }) {
  const [segments, setSegments] = useState<BreadcrumbSegment[]>([])
  const [isDirty, setIsDirty] = useState(false)

  return (
    <BreadcrumbContext.Provider value={{ segments, setSegments, isDirty, setIsDirty }}>
      {children}
    </BreadcrumbContext.Provider>
  )
}

export function useBreadcrumb() {
  const ctx = useContext(BreadcrumbContext)
  if (!ctx) throw new Error("useBreadcrumb must be used within BreadcrumbProvider")
  return ctx
}
