"use client"

import { ArcadeConnectButton } from "@/components/thirdweb/connect-button"
import { useActiveAccount } from "thirdweb/react"
import Link from "next/link"

export default function StyledConnectPage() {
  const account = useActiveAccount()

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/thirdweb-test" className="text-pink-500 hover:text-pink-400 transition-colors">
            ← Back to Test Pages
          </Link>
        </div>

        <div className="arcade-card p-8 mb-8">
          <h1 className="text-center neon-text mb-8">STYLED CONNECT BUTTON</h1>

          <div className="flex justify-center mb-8">
            <ArcadeConnectButton />
          </div>

          <div className="grid grid-cols-1 gap-6 mt-8">
            <div className="arcade-card p-6">
              <h3 className="text-center mb-4">WALLET STATUS</h3>
              {account ? (
                <div className="space-y-4">
                  <p className="text-center text-green-400">CONNECTED</p>
                  <div className="bg-black/30 p-4 rounded overflow-x-auto">
                    <p className="font-mono text-xs break-all">Address: {account.address}</p>
                  </div>
                </div>
              ) : (
                <p className="text-center text-red-400">NOT CONNECTED</p>
              )}
            </div>
          </div>
        </div>

        <div className="arcade-card p-8">
          <h2 className="text-center mb-6">STYLING DETAILS</h2>
          <div className="space-y-4">
            <p>The connect button has been styled to match the MemeWars arcade aesthetic with:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Pixel font styling (Press Start 2P)</li>
              <li>Neon pink gradient background</li>
              <li>White border with glow effect</li>
              <li>Hover and active state animations</li>
              <li>Custom modal styling with arcade theme</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
