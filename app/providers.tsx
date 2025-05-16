"use client"

import { ThemeProvider } from "@/components/theme-provider"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useState, type ReactNode } from "react"
import { ThirdwebProvider } from "thirdweb/react"
import { thirdwebClient } from "@/lib/thirdweb-client"

export function Providers({ children }: { children: ReactNode }) {
  // Create a new QueryClient instance for each session
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <ThirdwebProvider client={thirdwebClient}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </ThirdwebProvider>
    </QueryClientProvider>
  )
}
