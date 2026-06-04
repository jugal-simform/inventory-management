import { useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { ArrowLeft, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Breadcrumb } from "./Breadcrumb"
import { UnsavedChangesModal } from "./UnsavedChangesModal"
import { useBreadcrumb } from "./breadcrumb-context"

export function LayoutForm() {
  const navigate = useNavigate()
  const { isDirty, segments } = useBreadcrumb()
  const [showModal, setShowModal] = useState(false)
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null)

  function guardedNavigate(action: () => void) {
    if (isDirty) {
      setPendingAction(() => action)
      setShowModal(true)
    } else {
      action()
    }
  }

  function handleBack() {
    guardedNavigate(() => navigate(-1))
  }

  function handleClose() {
    const rootPath = segments[0]?.path
    guardedNavigate(() => (rootPath ? navigate(rootPath) : navigate(-1)))
  }

  return (
    <div className="min-h-svh animate-in fade-in duration-200">
      <div className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-3 md:px-6">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 shrink-0"
            onClick={handleBack}
            aria-label="Go back"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex-1 overflow-hidden">
            <Breadcrumb />
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 shrink-0"
            onClick={handleClose}
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Outlet />

      <UnsavedChangesModal
        open={showModal}
        onConfirm={() => {
          setShowModal(false)
          pendingAction?.()
          setPendingAction(null)
        }}
        onCancel={() => {
          setShowModal(false)
          setPendingAction(null)
        }}
      />
    </div>
  )
}
