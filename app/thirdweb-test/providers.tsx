"use client"

import { ThirdwebProvider } from "thirdweb/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useState, type ReactNode } from "react"
import { thirdwebClient } from "@/lib/thirdweb-client"

export function ThirdwebProviders({ children }: { children: ReactNode }) {
  // Create a new QueryClient instance for each session
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <ThirdwebProvider client={thirdwebClient}>{children}</ThirdwebProvider>
    </QueryClientProvider>
  )
}
