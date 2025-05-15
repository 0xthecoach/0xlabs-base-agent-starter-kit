"use client"

import Link from "next/link"
import { useEffect } from "react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-pixel mb-4 text-pink-400">Something went wrong!</h1>
      <p className="mb-8 text-gray-300">We couldn't load this warrior's details. Please try again later.</p>
      <div className="flex justify-center gap-4">
        <button onClick={reset} className="pink-button">
          Try again
        </button>
        <Link href="/memewarriors" className="arcade-btn text-white">
          Back to Warriors
        </Link>
      </div>
    </div>
  )
}
