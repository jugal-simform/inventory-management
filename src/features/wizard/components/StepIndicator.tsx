import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

interface StepIndicatorProps {
  currentStep: number
  totalSteps: number
  stepLabels: string[]
}

export function StepIndicator({
  currentStep,
  totalSteps,
  stepLabels,
}: StepIndicatorProps) {
  return (
    <ol className="mb-6 flex items-center justify-between gap-2">
      {Array.from({ length: totalSteps }).map((_, index) => {
        const step = index + 1
        const isCurrent = step === currentStep
        const isDone = step < currentStep

        return (
          <li key={step} className="flex flex-1 items-center gap-2">
            <div
              aria-current={isCurrent ? "step" : undefined}
              className={cn(
                "flex size-8 shrink-0 items-center justify-center rounded-full border text-xs font-semibold",
                isDone && "border-emerald-600 bg-emerald-600 text-white",
                isCurrent && "border-primary bg-primary text-primary-foreground",
                !isCurrent && !isDone && "border-border text-muted-foreground"
              )}
            >
              {isDone ? <Check className="size-4" /> : step}
            </div>
            <span className="hidden text-xs text-muted-foreground md:block">
              {stepLabels[index]}
            </span>
            {step < totalSteps && (
              <div className={cn("h-px flex-1 border-t", isDone ? "border-emerald-500" : "border-dashed border-border")} />
            )}
          </li>
        )
      })}
    </ol>
  )
}
