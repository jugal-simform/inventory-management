import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

import { useBreadcrumb } from "@/components/breadcrumb-context"
import { useAlertEngine } from "@/features/alerts/hooks/useAlertEngine"
import { useCategories } from "@/features/categories/context/CategoryContext"
import { useProducts } from "@/features/products/context/ProductContext"
import { useSuppliers } from "@/features/suppliers/context/SupplierContext"
import { useTransactions } from "@/features/transactions/context/TransactionContext"
import { Step1ProductInfo } from "@/features/wizard/components/Step1ProductInfo"
import { Step2Pricing } from "@/features/wizard/components/Step2Pricing"
import { Step3StockDetails } from "@/features/wizard/components/Step3StockDetails"
import { WizardShell } from "@/features/wizard/components/WizardShell"
import { useWizardForm } from "@/features/wizard/hooks/useWizardForm"
import { useWizardNavigation } from "@/features/wizard/hooks/useWizardNavigation"
import type { Product } from "@/types"

const STEP_NAMES = ["Product Info", "Pricing", "Stock Details"]

const generateSku = (sku: string) => {
  const trimmedSku = sku.trim()
  return trimmedSku || `SKU-${Date.now()}`
}

export function AddProductWizard() {
  const navigate = useNavigate()
  const form = useWizardForm()
  const {
    step,
    totalSteps,
    isFirstStep,
    isLastStep,
    goBack,
    goNext,
    goToStep,
  } = useWizardNavigation(form)

  const { setSegments, setIsDirty } = useBreadcrumb()

  const { categories } = useCategories()
  const { activeSuppliers } = useSuppliers()
  const { products, addProduct } = useProducts()
  const { addTransaction } = useTransactions()
  const { evaluateProduct } = useAlertEngine()

  const disableNext =
    step === 1 && (categories.length === 0 || activeSuppliers.length === 0)

  useEffect(() => {
    setSegments([
      { label: "Products", path: "/products" },
      { label: "Add Product" },
      { label: `Step ${step}: ${STEP_NAMES[step - 1]}` },
    ])
  }, [step, setSegments])

  useEffect(() => {
    setIsDirty(form.formState.isDirty)
  }, [form.formState.isDirty, setIsDirty])

  useEffect(() => {
    return () => {
      setSegments([])
      setIsDirty(false)
    }
  }, [setSegments, setIsDirty])

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        navigate("/products")
      }
    }

    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [navigate])

  useEffect(() => {
    const focusFirstField = () => {
      const currentStep = document.querySelector(`[data-step=\\"${step}\\"]`)
      if (!currentStep) {
        return
      }

      const firstField = currentStep.querySelector<HTMLElement>(
        "input,select,textarea,button"
      )
      firstField?.focus()
    }

    const timer = requestAnimationFrame(focusFirstField)
    return () => cancelAnimationFrame(timer)
  }, [step])

  const onSubmit = form.handleSubmit((values) => {
    const generatedSku = generateSku(values.sku)

    const isDuplicateSku = products.some(
      (product) => product.sku.toLowerCase() === generatedSku.toLowerCase()
    )

    if (isDuplicateSku) {
      form.setError("sku", {
        type: "manual",
        message: "A product with this SKU already exists",
      })
      goToStep(1)
      return
    }

    const now = new Date().toISOString()

    const hasDimensions =
      values.dimensionLength !== undefined &&
      values.dimensionWidth !== undefined &&
      values.dimensionHeight !== undefined

    const product: Product = {
      id: crypto.randomUUID(),
      name: values.name,
      description: values.description,
      sku: generatedSku,
      barcode: values.barcode,
      categoryId: values.categoryId,
      supplierId: values.supplierId,
      tags: values.tags,
      images: values.images,
      costPrice: values.costPrice,
      sellingPrice: values.sellingPrice,
      quantity: values.quantity,
      unit: values.unit,
      minStockLevel: values.minStockLevel,
      maxStockLevel: values.maxStockLevel ?? null,
      location: values.location,
      weight: values.weight ?? null,
      dimensions: hasDimensions
        ? {
            length: values.dimensionLength!,
            width: values.dimensionWidth!,
            height: values.dimensionHeight!,
          }
        : null,
      createdAt: now,
      updatedAt: now,
    }

    addProduct(product)
    evaluateProduct(product)

    addTransaction({
      id: crypto.randomUUID(),
      productId: product.id,
      type: "restock",
      quantity: values.quantity,
      previousQuantity: 0,
      newQuantity: values.quantity,
      createdAt: now,
    })

    toast.success("Product added successfully")
    navigate("/products")
  })

  return (
    <main className="mx-auto w-full max-w-4xl p-4 md:p-6">
      <h1 className="mb-1 text-2xl font-semibold">Add Product</h1>
      <p className="mb-5 text-sm text-muted-foreground">
        Complete all three steps to create a product.
      </p>

      <WizardShell
        currentStep={step}
        totalSteps={totalSteps}
        isFirstStep={isFirstStep}
        isLastStep={isLastStep}
        onBack={goBack}
        onNext={() => {
          void goNext()
        }}
        onSubmit={onSubmit}
        disableNext={disableNext}
      >
        {step === 1 && (
          <Step1ProductInfo
            form={form}
            categories={categories}
            suppliers={activeSuppliers}
          />
        )}
        {step === 2 && <Step2Pricing form={form} />}
        {step === 3 && <Step3StockDetails form={form} />}
      </WizardShell>
    </main>
  )
}
