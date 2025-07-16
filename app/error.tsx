"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AlertTriangle, RefreshCw, Home } from "lucide-react"
import Link from "next/link"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <AlertTriangle className="mx-auto text-red-400 mb-4" size={80} />
          <h1 className="text-4xl font-bold text-white mb-4">Something went wrong!</h1>
          <p className="text-gray-400 mb-8">
            We encountered an unexpected error. Don&#39;t worry, our team has been notified and we&#39;re working to fix it.
          </p>
        </div>

        <div className="space-y-4">
          <Button onClick={reset} className="w-full bg-red-600 hover:bg-red-700">
            <RefreshCw className="mr-2" size={16} />
            Try Again
          </Button>

          <Link href="/">
            <Button
              variant="outline"
              className="w-full border-gray-500 text-gray-300 hover:bg-gray-500/20 bg-transparent"
            >
              <Home className="mr-2" size={16} />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
