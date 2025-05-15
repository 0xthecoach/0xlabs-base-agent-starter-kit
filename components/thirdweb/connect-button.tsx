"use client"

import { ConnectButton } from "thirdweb/react"
import { thirdwebClient } from "@/lib/thirdweb-client"
import { base } from "thirdweb/chains"

export function ArcadeConnectButton() {
  return (
    <ConnectButton
      client={thirdwebClient}
      accountAbstraction={{
        chain: base,
        sponsorGas: true,
      }}
      className="arcade-btn pulse-glow"
      connectButton={{
        label: "CONNECT WALLET",
      }}
      connectedButton={{
        label: "CONNECTED",
      }}
      modalTitle="CONNECT YOUR WALLET"
      modalTitleIconUrl="/images/logo.png"
    />
  )
}
