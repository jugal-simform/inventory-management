import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface UnsavedChangesModalProps {
  open: boolean
  onConfirm: () => void
  onCancel: () => void
}

export function UnsavedChangesModal({ open, onConfirm, onCancel }: UnsavedChangesModalProps) {
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onCancel()}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Unsaved changes</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground">
          You have unsaved changes. Leaving will discard them.
        </p>
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onCancel}>
            Keep editing
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Discard changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
