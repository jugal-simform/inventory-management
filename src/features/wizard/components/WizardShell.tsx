import type { ReactNode } from "react"

import { Button } from "@/components/ui/button"

import { StepIndicator } from "@/features/wizard/components/StepIndicator"

interface WizardShellProps {
  children: ReactNode
  currentStep: number
  totalSteps: number
  isFirstStep: boolean
  isLastStep: boolean
  onBack: () => void
  onNext: () => void
  onSubmit: () => void
  disableNext?: boolean
}

const stepLabels = ["Product Info", "Pricing", "Stock Details"]

export function WizardShell({
  children,
  currentStep,
  totalSteps,
  isFirstStep,
  isLastStep,
  onBack,
  onNext,
  onSubmit,
  disableNext,
}: WizardShellProps) {
  return (
    <section className="mx-auto w-full max-w-3xl rounded-lg border border-border bg-card p-5 shadow-sm md:p-6">
      <StepIndicator
        currentStep={currentStep}
        totalSteps={totalSteps}
        stepLabels={stepLabels}
      />
      <div className="mb-6">{children}</div>
      <div className="flex items-center justify-between gap-2">
        <Button type="button" variant="outline" onClick={onBack} disabled={isFirstStep}>
          Back
        </Button>
        {isLastStep ? (
          <Button type="button" onClick={onSubmit}>
            Add Product
          </Button>
        ) : (
          <Button type="button" onClick={onNext} disabled={disableNext}>
            Next
          </Button>
        )}
      </div>
    </section>
  )
}
