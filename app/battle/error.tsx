"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"

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
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="max-w-md text-center">
        <h2 className="text-3xl font-pixel text-pink-500 mb-4">Something went wrong!</h2>
        <p className="text-white mb-6">We encountered an error while loading the Battle Arena. Please try again.</p>
        <Button
          onClick={reset}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
        >
          Try again
        </Button>
      </div>
    </div>
  )
}
