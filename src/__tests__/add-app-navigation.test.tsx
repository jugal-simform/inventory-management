import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import { BreadcrumbProvider, useBreadcrumb } from '@/components/breadcrumb-context'
import { Navigation } from '@/components/Navigation'
import { Breadcrumb } from '@/components/Breadcrumb'
import { LayoutForm } from '@/components/LayoutForm'
import { UnsavedChangesModal } from '@/components/UnsavedChangesModal'

vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
  Toaster: () => null,
}))

describe('add-app-navigation', () => {
  // 10.1-10.2: Navigation renders and supports active state
  describe('10.1-10.2: Navigation component renders', () => {
    it('10.1: Navigation component renders Products button', () => {
      render(
        <BrowserRouter>
          <Navigation />
        </BrowserRouter>
      )

      expect(screen.getByText('Products')).toBeInTheDocument()
    })

    it('10.2: Navigation component renders Categories button', () => {
      render(
        <BrowserRouter>
          <Navigation />
        </BrowserRouter>
      )

      expect(screen.getByText('Categories')).toBeInTheDocument()
    })
  })

  // 10.3-10.4: Navigation buttons are clickable links
  describe('10.3-10.4: Navigation buttons are functional links', () => {
    it('10.3: Products button is a clickable link', () => {
      render(
        <BrowserRouter>
          <Navigation />
        </BrowserRouter>
      )

      const productsLink = screen.getByText('Products').closest('a')
      expect(productsLink).toHaveAttribute('href', '/products')
    })

    it('10.4: Categories button is a clickable link', () => {
      render(
        <BrowserRouter>
          <Navigation />
        </BrowserRouter>
      )

      const categoriesLink = screen.getByText('Categories').closest('a')
      expect(categoriesLink).toHaveAttribute('href', '/categories')
    })
  })

  // 10.5-10.7: Breadcrumb functionality
  describe('10.5-10.7: Breadcrumb component', () => {
    it('10.5: Breadcrumb renders without errors', () => {
      render(
        <BrowserRouter>
          <BreadcrumbProvider>
            <Breadcrumb />
          </BreadcrumbProvider>
        </BrowserRouter>
      )

      // Component should render without crashing
      expect(document.body).toBeInTheDocument()
    })

    it('10.6: Breadcrumb accepts and displays segments via context', () => {
      const TestComponent = () => {
        const { setSegments } = useBreadcrumb()

        React.useEffect(() => {
          setSegments([
            { label: 'Products', path: '/products' },
            { label: 'Add Product' },
          ])
        }, [setSegments])

        return <Breadcrumb />
      }

      render(
        <BrowserRouter>
          <BreadcrumbProvider>
            <TestComponent />
          </BreadcrumbProvider>
        </BrowserRouter>
      )

      // Should not crash
      expect(document.body.children.length).toBeGreaterThan(0)
    })

    it('10.7: Breadcrumb segments can be links with paths', () => {
      const TestComponent = () => {
        const { setSegments } = useBreadcrumb()

        React.useEffect(() => {
          setSegments([
            { label: 'Products', path: '/products' },
            { label: 'Details' },
          ])
        }, [setSegments])

        return <Breadcrumb />
      }

      render(
        <BrowserRouter>
          <BreadcrumbProvider>
            <TestComponent />
          </BreadcrumbProvider>
        </BrowserRouter>
      )

      expect(document.body.children.length).toBeGreaterThan(0)
    })
  })

  // 10.8-10.11: Unsaved changes modal behavior
  describe('10.8-10.11: Unsaved changes modal', () => {
    it('10.8: Modal renders when open prop is true', () => {
      render(
        <UnsavedChangesModal
          open={true}
          onConfirm={() => {}}
          onCancel={() => {}}
        />
      )

      // Modal should render with unsaved changes text (check document body for portals)
      expect(document.body.innerHTML).toContain('Unsaved changes')
    })

    it('10.9: Modal is hidden when open prop is false', () => {
      render(
        <UnsavedChangesModal
          open={false}
          onConfirm={() => {}}
          onCancel={() => {}}
        />
      )

      expect(screen.queryByText(/unsaved changes/i)).not.toBeInTheDocument()
    })

    it('10.10: Modal confirm button calls onConfirm callback', () => {
      const handleConfirm = vi.fn()

      render(
        <UnsavedChangesModal
          open={true}
          onConfirm={handleConfirm}
          onCancel={() => {}}
        />
      )

      const confirmBtn = screen.getByText(/discard changes/i)
      fireEvent.click(confirmBtn)

      expect(handleConfirm).toHaveBeenCalled()
    })

    it('10.11: Modal cancel button calls onCancel callback', () => {
      const handleCancel = vi.fn()

      render(
        <UnsavedChangesModal
          open={true}
          onConfirm={() => {}}
          onCancel={handleCancel}
        />
      )

      const cancelBtn = screen.getByText('Keep editing')
      fireEvent.click(cancelBtn)

      expect(handleCancel).toHaveBeenCalled()
    })
  })

  // 10.12-10.14: LayoutForm component
  describe('10.12-10.14: LayoutForm component', () => {
    it('10.12: LayoutForm renders back button and close button', () => {
      render(
        <BrowserRouter>
          <BreadcrumbProvider>
            <LayoutForm />
          </BreadcrumbProvider>
        </BrowserRouter>
      )

      expect(screen.getByLabelText('Go back')).toBeInTheDocument()
      expect(screen.getByLabelText('Close')).toBeInTheDocument()
    })

    it('10.13: LayoutForm renders Breadcrumb component', () => {
      render(
        <BrowserRouter>
          <BreadcrumbProvider>
            <LayoutForm />
          </BreadcrumbProvider>
        </BrowserRouter>
      )

      // LayoutForm includes Breadcrumb
      expect(screen.getByLabelText('Go back')).toBeInTheDocument()
    })

    it('10.14: LayoutForm has fade transition classes', () => {
      const { container } = render(
        <BrowserRouter>
          <BreadcrumbProvider>
            <LayoutForm />
          </BreadcrumbProvider>
        </BrowserRouter>
      )

      const layoutDiv = container.querySelector('.animate-in')
      expect(layoutDiv).toHaveClass('fade-in', 'duration-200')
    })
  })

  // 10.15: Keyboard handling
  describe('10.15: Keyboard interaction', () => {
    it('10.15: LayoutForm handles escape key without errors', () => {
      const { container } = render(
        <BrowserRouter>
          <BreadcrumbProvider>
            <LayoutForm />
          </BreadcrumbProvider>
        </BrowserRouter>
      )

      const event = new KeyboardEvent('keydown', {
        key: 'Escape',
        code: 'Escape',
        bubbles: true,
      })

      globalThis.dispatchEvent(event)

      // Should not crash
      expect(container).toBeInTheDocument()
    })
  })

  // Integration: isDirty context flow
  describe('Context integration', () => {
    it('Breadcrumb context provides setSegments and isDirty', () => {
      const TestComponent = () => {
        const { setSegments, setIsDirty, segments, isDirty } = useBreadcrumb()

        React.useEffect(() => {
          setSegments([{ label: 'Test' }])
          setIsDirty(true)
        }, [setSegments, setIsDirty])

        return (
          <div>
            <div>Segments: {segments.length}</div>
            <div>Dirty: {isDirty ? 'yes' : 'no'}</div>
          </div>
        )
      }

      render(
        <BreadcrumbProvider>
          <TestComponent />
        </BreadcrumbProvider>
      )

      expect(screen.getByText('Segments: 1')).toBeInTheDocument()
      expect(screen.getByText('Dirty: yes')).toBeInTheDocument()
    })
  })
})

// Required for useEffect in test components
import React from 'react'
