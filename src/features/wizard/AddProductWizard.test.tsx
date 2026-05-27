import { fireEvent, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { MemoryRouter, Route, Routes } from "react-router-dom"

import { AppProviders } from "@/app/providers"
import { AddProductWizard } from "@/features/wizard/AddProductWizard"
import { STORAGE_KEYS } from "@/lib/storage"
import type { Category, Product, Supplier } from "@/types"

function setStorageData(
  categories: Category[],
  suppliers: Supplier[],
  products: Product[] = []
) {
  localStorage.setItem(STORAGE_KEYS.categories, JSON.stringify(categories))
  localStorage.setItem(STORAGE_KEYS.suppliers, JSON.stringify(suppliers))
  localStorage.setItem(STORAGE_KEYS.products, JSON.stringify(products))
  localStorage.setItem(STORAGE_KEYS.alerts, JSON.stringify([]))
  localStorage.setItem(STORAGE_KEYS.transactions, JSON.stringify([]))
}

function renderWizard(path = "/products/new") {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <AppProviders>
        <Routes>
          <Route path="/products" element={<div>Products Page</div>} />
          <Route path="/products/new" element={<AddProductWizard />} />
        </Routes>
      </AppProviders>
    </MemoryRouter>
  )
}

describe("AddProductWizard", () => {
  beforeEach(() => {
    localStorage.clear()

    setStorageData(
      [
        {
          id: "cat-1",
          name: "Electronics",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ],
      [
        {
          id: "sup-1",
          name: "ACME Supply",
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ]
    )
  })

  it("renders step 1 fields and shows validation errors", async () => {
    const user = userEvent.setup()
    renderWizard()

    expect(screen.getByLabelText("Product Name")).toBeInTheDocument()
    expect(screen.getByLabelText("Category")).toBeInTheDocument()
    expect(screen.getByLabelText("Supplier")).toBeInTheDocument()

    await user.click(screen.getByRole("button", { name: "Next" }))

    expect(screen.getByText("Product name is required")).toBeInTheDocument()
    expect(screen.getByText("Please select a category")).toBeInTheDocument()
    expect(screen.getByText("Please select a supplier")).toBeInTheDocument()
  })

  it("completes the flow and creates product, alerts, and transaction", async () => {
    const user = userEvent.setup()
    renderWizard()

    await user.type(screen.getByLabelText("Product Name"), "Wireless Mouse")
    await user.type(screen.getByLabelText("SKU"), "SKU-100")
    await user.selectOptions(screen.getByLabelText("Category"), "cat-1")
    await user.selectOptions(screen.getByLabelText("Supplier"), "sup-1")
    await user.click(screen.getByRole("button", { name: "Next" }))

    await user.type(screen.getByLabelText("Cost Price"), "50")
    await user.type(screen.getByLabelText("Selling Price"), "100")
    await user.click(screen.getByRole("button", { name: "Next" }))

    await user.clear(screen.getByLabelText("Initial Quantity"))
    await user.type(screen.getByLabelText("Initial Quantity"), "2")
    await user.clear(screen.getByLabelText("Min Stock Level"))
    await user.type(screen.getByLabelText("Min Stock Level"), "5")
    await user.click(screen.getByRole("button", { name: "Add Product" }))

    expect(screen.getByText("Products Page")).toBeInTheDocument()

    const products = JSON.parse(localStorage.getItem(STORAGE_KEYS.products) ?? "[]")
    const alerts = JSON.parse(localStorage.getItem(STORAGE_KEYS.alerts) ?? "[]")
    const transactions = JSON.parse(
      localStorage.getItem(STORAGE_KEYS.transactions) ?? "[]"
    )

    expect(products).toHaveLength(1)
    expect(products[0].name).toBe("Wireless Mouse")

    expect(alerts).toHaveLength(1)
    expect(alerts[0].type).toBe("low_stock")

    expect(transactions).toHaveLength(1)
    expect(transactions[0].type).toBe("restock")
    expect(transactions[0].newQuantity).toBe(2)
  })

  it("rejects duplicate SKU", async () => {
    const user = userEvent.setup()

    setStorageData(
      [
        {
          id: "cat-1",
          name: "Electronics",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ],
      [
        {
          id: "sup-1",
          name: "ACME Supply",
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ],
      [
        {
          id: "p-1",
          name: "Existing",
          description: "",
          sku: "SKU-100",
          barcode: "",
          categoryId: "cat-1",
          supplierId: "sup-1",
          tags: [],
          images: [],
          costPrice: 50,
          sellingPrice: 100,
          quantity: 10,
          unit: "pieces",
          minStockLevel: 1,
          maxStockLevel: null,
          location: "",
          weight: null,
          dimensions: null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ]
    )

    renderWizard()

    await user.type(screen.getByLabelText("Product Name"), "New Mouse")
    await user.type(screen.getByLabelText("SKU"), "SKU-100")
    await user.selectOptions(screen.getByLabelText("Category"), "cat-1")
    await user.selectOptions(screen.getByLabelText("Supplier"), "sup-1")
    await user.click(screen.getByRole("button", { name: "Next" }))

    await user.type(screen.getByLabelText("Cost Price"), "50")
    await user.type(screen.getByLabelText("Selling Price"), "100")
    await user.click(screen.getByRole("button", { name: "Next" }))

    await user.click(screen.getByRole("button", { name: "Add Product" }))

    expect(screen.getByText("A product with this SKU already exists")).toBeInTheDocument()
  })

  it("prefills category from query param and escapes to products", async () => {
    renderWizard("/products/new?categoryId=cat-1")

    const categorySelect = screen.getByLabelText("Category") as HTMLSelectElement
    expect(categorySelect.value).toBe("cat-1")

    fireEvent.keyDown(window, { key: "Escape" })

    expect(await screen.findByText("Products Page")).toBeInTheDocument()
  })
})
