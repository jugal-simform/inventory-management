import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useBreadcrumb } from "./breadcrumb-context"
import { UnsavedChangesModal } from "./UnsavedChangesModal"

export function Breadcrumb() {
  const { segments, isDirty } = useBreadcrumb()
  const navigate = useNavigate()
  const [pendingPath, setPendingPath] = useState<string | null>(null)

  if (segments.length === 0) return null

  function handleSegmentClick(path: string, e: React.MouseEvent) {
    e.preventDefault()
    if (isDirty) {
      setPendingPath(path)
    } else {
      navigate(path)
    }
  }

  return (
    <>
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm">
        {segments.map((seg, i) => {
          const isLast = i === segments.length - 1
          const path = seg.path
          return (
            <span key={`${seg.label}-${i}`} className="flex items-center gap-1.5">
              {i > 0 && <span className="text-muted-foreground/60">/</span>}
              {isLast || !path ? (
                <span className="font-medium text-foreground">{seg.label}</span>
              ) : (
                <a
                  href={path}
                  onClick={(e) => handleSegmentClick(path, e)}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {seg.label}
                </a>
              )}
            </span>
          )
        })}
      </nav>

      <UnsavedChangesModal
        open={pendingPath !== null}
        onConfirm={() => {
          if (pendingPath) navigate(pendingPath)
          setPendingPath(null)
        }}
        onCancel={() => setPendingPath(null)}
      />
    </>
  )
}
