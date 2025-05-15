"use client"

import { ConnectButton } from "thirdweb/react"
import { createThirdwebClient } from "thirdweb"
import { defineChain } from "thirdweb"
import { useEffect, useState } from "react"
import styles from "./connect-wallet-button.module.css"

// Define Base Sepolia chain manually to avoid import errors
const baseSepolia = defineChain({
  id: 84532,
  name: "Base Sepolia",
  rpc: ["https://sepolia.base.org"],
  nativeCurrency: {
    name: "Ethereum",
    symbol: "ETH",
    decimals: 18,
  },
  blockExplorers: {
    default: {
      name: "BaseScan",
      url: "https://sepolia.basescan.org",
    },
  },
  testnet: true,
})

// Create Thirdweb client
const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || "your-client-id",
})

export function ConnectWalletButton() {
  const [mounted, setMounted] = useState(false)

  // Prevent hydration errors
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <button className="arcade-btn text-white text-sm">Play Now</button>

  return (
    <div className={styles.connectButtonWrapper}>
      <ConnectButton
        client={client}
        accountAbstraction={{ chain: baseSepolia, sponsorGas: true }}
        connectButton={{
          label: "Play Now",
        }}
        modalTitle="Connect Your Wallet"
        modalTitleIconUrl="/images/logo.png"
        className={styles.connectButton}
      />
    </div>
  )
}
