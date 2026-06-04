import React, { ReactNode } from "react"
import { AlertCircle } from "lucide-react"

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error) {
    console.error("Analytics error:", error)
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="rounded-lg border border-red-200 bg-red-50 p-6">
            <div className="flex items-start gap-4">
              <AlertCircle className="mt-1 h-6 w-6 shrink-0 text-red-600" />
              <div>
                <h3 className="font-semibold text-red-900">Unable to Load Analytics</h3>
                <p className="mt-1 text-sm text-red-700">{this.state.error?.message || "An unexpected error occurred"}</p>
              </div>
            </div>
          </div>
        )
      )
    }

    return this.props.children
  }
}
