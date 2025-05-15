import type React from "react"
import { ThirdwebProviders } from "./providers"

export default function ThirdwebTestLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ThirdwebProviders>{children}</ThirdwebProviders>
}
