"use client"

import { ArcadeConnectButton } from "@/components/thirdweb/connect-button"
import { useActiveAccount } from "thirdweb/react"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

export default function MarketplacePage() {
  const account = useActiveAccount()
  const [activeTab, setActiveTab] = useState("warriors")

  const items = {
    warriors: [
      { id: 1, name: "Ultra Doge", price: "0.05 ETH", rarity: "EPIC", image: "/images/warriors/doge.png" },
      { id: 2, name: "Golden Pepe", price: "0.08 ETH", rarity: "LEGENDARY", image: "/images/warriors/pepe.png" },
      { id: 3, name: "Sad Wojak", price: "0.03 ETH", rarity: "RARE", image: "/images/warriors/wojak.png" },
      { id: 4, name: "Mega Chad", price: "0.07 ETH", rarity: "EPIC", image: "/images/warriors/chad.png" },
    ],
    items: [
      { id: 5, name: "Power Potion", price: "0.01 ETH", rarity: "COMMON", image: "/glowing-potion.png" },
      { id: 6, name: "Diamond Sword", price: "0.04 ETH", rarity: "RARE", image: "/placeholder-sj52t.png" },
      { id: 7, name: "Shield of Glory", price: "0.03 ETH", rarity: "RARE", image: "/ornate-shield.png" },
      { id: 8, name: "Magic Amulet", price: "0.06 ETH", rarity: "EPIC", image: "/ornate-gold-amulet.png" },
    ],
    skins: [
      { id: 9, name: "Rainbow Skin", price: "0.02 ETH", rarity: "UNCOMMON", image: "/rainbow-pattern.png" },
      { id: 10, name: "Galaxy Skin", price: "0.05 ETH", rarity: "EPIC", image: "/placeholder-uxfdt.png" },
      { id: 11, name: "Fire Skin", price: "0.03 ETH", rarity: "RARE", image: "/placeholder-rn0bi.png" },
      { id: 12, name: "Ice Skin", price: "0.03 ETH", rarity: "RARE", image: "/placeholder-fe2fb.png" },
    ],
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "COMMON":
        return "text-gray-300"
      case "UNCOMMON":
        return "text-green-400"
      case "RARE":
        return "text-blue-400"
      case "EPIC":
        return "text-purple-400"
      case "LEGENDARY":
        return "text-yellow-400"
      default:
        return "text-white"
    }
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <Link href="/thirdweb-test" className="text-pink-500 hover:text-pink-400 mb-8 inline-block">
        ← Back to Test Pages
      </Link>

      <div className="arcade-card p-8 max-w-6xl mx-auto">
        <h1 className="text-4xl font-pixel mb-8 text-center neon-text">NFT MARKETPLACE</h1>

        <div className="flex justify-between items-center mb-8">
          <div className="flex gap-4">
            <button
              className={`px-4 py-2 font-pixel ${activeTab === "warriors" ? "text-pink-400 border-b-2 border-pink-400" : "text-gray-400"}`}
              onClick={() => setActiveTab("warriors")}
            >
              WARRIORS
            </button>
            <button
              className={`px-4 py-2 font-pixel ${activeTab === "items" ? "text-pink-400 border-b-2 border-pink-400" : "text-gray-400"}`}
              onClick={() => setActiveTab("items")}
            >
              ITEMS
            </button>
            <button
              className={`px-4 py-2 font-pixel ${activeTab === "skins" ? "text-pink-400 border-b-2 border-pink-400" : "text-gray-400"}`}
              onClick={() => setActiveTab("skins")}
            >
              SKINS
            </button>
          </div>

          <div className="w-48">
            <ArcadeConnectButton />
          </div>
        </div>

        {!account ? (
          <div className="arcade-card bg-purple-900/30 p-8 text-center">
            <p className="mb-4">Connect your wallet to view and purchase items</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {items[activeTab as keyof typeof items].map((item) => (
                <div key={item.id} className="arcade-card overflow-hidden">
                  <div className="aspect-square relative">
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    <div
                      className={`absolute top-2 right-2 px-2 py-1 rounded font-pixel text-xs ${getRarityColor(item.rarity)}`}
                    >
                      {item.rarity}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-pixel text-lg mb-2">{item.name}</h3>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-300">{item.price}</p>
                      <button className="arcade-btn text-xs px-3 py-1">BUY</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-between items-center">
              <div className="bg-purple-900/30 px-4 py-2 rounded">
                <span className="text-gray-300 text-sm">Balance:</span> <span className="font-mono">0.25 ETH</span>
              </div>

              <div className="flex gap-2">
                <button className="arcade-btn text-sm px-3 py-1">PREVIOUS</button>
                <button className="arcade-btn text-sm px-3 py-1">NEXT</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
