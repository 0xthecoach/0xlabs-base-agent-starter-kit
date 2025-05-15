"use client"

import { ConnectButton } from "thirdweb/react"
import { client, primaryChain } from "@/lib/client"
import { inAppWallet, createWallet } from "thirdweb/wallets"

// Create a styled ConnectButton that maintains the arcade style of the original button
export function ConnectWalletButton() {
  // Configure wallets to support - include in-app wallet for better onboarding
  const wallets = [
    inAppWallet({
      smartAccount: {
        chain: primaryChain,
        sponsorGas: true,
      },
    }),
    createWallet("io.metamask"),
    createWallet("com.coinbase.wallet"),
    createWallet("me.rainbow"),
  ]

  return (
    <ConnectButton
      client={client}
      accountAbstraction={{
        chain: primaryChain,
        sponsorGas: true,
      }}
      className="arcade-btn text-white text-sm"
      connectButton={{
        label: "Play Now",
      }}
      modalTitle="Connect to MemeWars"
      modalTitleIconUrl="/images/logo.png"
      welcomeScreen={{
        title: "Welcome to MemeWars",
        subtitle: "Connect your wallet to join the battle!",
      }}
      wallets={wallets}
    />
  )
}
