"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ConnectButton } from "thirdweb/react"
import { thirdwebClient } from "@/lib/thirdweb-client"
import { base } from "thirdweb/chains"

export function ConnectWalletButton() {
  const [isConnected, setIsConnected] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const handleConnect = () => {
    // Simulate wallet connection
    setTimeout(() => {
      setIsConnected(true)
      setIsOpen(false)
    }, 1000)
  }

  const handleDisconnect = () => {
    setIsConnected(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-purple-500 bg-transparent text-white hover:bg-purple-950">
          {isConnected ? "Connected" : "Connect Wallet"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Connect your wallet</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
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
        </div>
      </DialogContent>
    </Dialog>
  )
}
