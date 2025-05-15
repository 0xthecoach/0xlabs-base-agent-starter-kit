"use client"

import { ThirdwebProvider } from "thirdweb/react"
import { thirdwebClient } from "@/lib/thirdweb-client"
import type { ReactNode } from "react"

export function ThirdwebProviders({ children }: { children: ReactNode }) {
  return <ThirdwebProvider client={thirdwebClient}>{children}</ThirdwebProvider>
}
