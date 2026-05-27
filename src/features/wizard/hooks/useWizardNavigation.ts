import { useCallback, useState } from "react"
import type { UseFormReturn } from "react-hook-form"

import { stepFieldNames, type WizardFormValues } from "@/features/wizard/validation"

const LAST_STEP = 3

export function useWizardNavigation(form: UseFormReturn<WizardFormValues>) {
  const [step, setStep] = useState(1)

  const goNext = useCallback(async () => {
    const fields = stepFieldNames[step - 1]
    const isValid = await form.trigger(fields)
    if (!isValid) {
      return false
    }

    setStep((current) => Math.min(current + 1, LAST_STEP))
    return true
  }, [form, step])

  const goBack = useCallback(() => {
    setStep((current) => Math.max(current - 1, 1))
  }, [])

  const goToStep = useCallback((value: number) => {
    setStep(Math.min(Math.max(value, 1), LAST_STEP))
  }, [])

  return {
    step,
    goNext,
    goBack,
    goToStep,
    isFirstStep: step === 1,
    isLastStep: step === LAST_STEP,
    totalSteps: LAST_STEP,
  }
}
