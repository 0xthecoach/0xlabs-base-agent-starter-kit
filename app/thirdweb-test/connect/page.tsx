"use client"

import { ArcadeConnectButton } from "@/components/thirdweb/connect-button"
import { useActiveAccount, useActiveWallet } from "thirdweb/react"
import Link from "next/link"

export default function ConnectPage() {
  const account = useActiveAccount()
  const wallet = useActiveWallet()

  return (
    <div className="container mx-auto py-12 px-4">
      <Link href="/thirdweb-test" className="text-pink-500 hover:text-pink-400 mb-8 inline-block">
        ← Back to Test Pages
      </Link>

      <div className="arcade-card p-8 max-w-4xl mx-auto">
        <h1 className="text-4xl font-pixel mb-8 text-center neon-text">CONNECT YOUR WALLET</h1>

        <div className="flex flex-col items-center justify-center gap-8">
          <div className="w-full max-w-md">
            <ArcadeConnectButton />
          </div>

          {account && (
            <div className="arcade-card p-6 w-full">
              <h2 className="text-2xl font-pixel mb-4 text-center">WALLET INFO</h2>

              <div className="grid grid-cols-1 gap-4">
                <div className="bg-purple-900/50 p-4 rounded-lg">
                  <p className="text-sm text-gray-300 mb-1">Address</p>
                  <p className="font-mono text-xs break-all">{account.address}</p>
                </div>

                <div className="bg-purple-900/50 p-4 rounded-lg">
                  <p className="text-sm text-gray-300 mb-1">Chain</p>
                  <p className="font-mono">{wallet?.getChain().name || "Unknown"}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-purple-900/50 p-4 rounded-lg">
                    <p className="text-sm text-gray-300 mb-1">Type</p>
                    <p className="font-mono">{wallet?.id || "Unknown"}</p>
                  </div>

                  <div className="bg-purple-900/50 p-4 rounded-lg">
                    <p className="text-sm text-gray-300 mb-1">Status</p>
                    <p className="font-mono text-green-400">Connected</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
