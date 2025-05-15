"use client"

import { ArcadeConnectButton } from "@/components/thirdweb/connect-button"
import { useActiveAccount } from "thirdweb/react"
import Link from "next/link"
import { useState } from "react"
import Image from "next/image"

export default function BattleArenaPage() {
  const account = useActiveAccount()
  const [selectedWarrior, setSelectedWarrior] = useState<number | null>(null)

  const warriors = [
    { id: 1, name: "Doge", power: 8500, level: 38, image: "/images/warriors/doge.png" },
    { id: 2, name: "Pepe", power: 9200, level: 42, image: "/images/warriors/pepe.png" },
    { id: 3, name: "Wojak", power: 7800, level: 35, image: "/images/warriors/wojak.png" },
  ]

  const opponents = [
    { id: 4, name: "Chad", power: 8800, level: 40, image: "/images/warriors/chad.png" },
    { id: 5, name: "Pikachu", power: 9000, level: 41, image: "/images/warriors/pikachu.png" },
  ]

  return (
    <div className="container mx-auto py-12 px-4">
      <Link href="/thirdweb-test" className="text-pink-500 hover:text-pink-400 mb-8 inline-block">
        ← Back to Test Pages
      </Link>

      <div className="arcade-card p-8 max-w-6xl mx-auto">
        <h1 className="text-4xl font-pixel mb-8 text-center neon-text">BATTLE ARENA</h1>

        {!account ? (
          <div className="flex flex-col items-center justify-center gap-6">
            <p className="text-center mb-4">Connect your wallet to enter the battle arena</p>
            <div className="w-full max-w-md">
              <ArcadeConnectButton />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Your Warriors */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-pixel mb-4 text-center">YOUR WARRIORS</h2>

              <div className="space-y-4">
                {warriors.map((warrior) => (
                  <div
                    key={warrior.id}
                    className={`arcade-card p-4 cursor-pointer transition-all ${selectedWarrior === warrior.id ? "ring-2 ring-pink-500 pulse-glow" : ""}`}
                    onClick={() => setSelectedWarrior(warrior.id)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 relative">
                        <Image
                          src={warrior.image || "/placeholder.svg"}
                          alt={warrior.name}
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                      <div>
                        <h3 className="font-pixel text-lg">{warrior.name}</h3>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          <div className="bg-purple-900/50 px-2 py-1 rounded text-xs">
                            <span className="text-gray-300">LVL</span> {warrior.level}
                          </div>
                          <div className="bg-purple-900/50 px-2 py-1 rounded text-xs">
                            <span className="text-gray-300">PWR</span> {warrior.power}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Middle Column - Battle Arena */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-pixel mb-4 text-center">ARENA</h2>

              <div className="arcade-card p-6 h-[300px] flex flex-col items-center justify-center">
                {selectedWarrior ? (
                  <div className="text-center">
                    <p className="font-pixel mb-4">WARRIOR SELECTED</p>
                    <button className="arcade-btn w-full">FIND OPPONENT</button>
                  </div>
                ) : (
                  <p className="text-center text-gray-400">Select your warrior to battle</p>
                )}
              </div>

              <div className="mt-6">
                <h3 className="font-pixel text-lg mb-2 text-center">BATTLE HISTORY</h3>
                <div className="arcade-card p-4 max-h-[200px] overflow-y-auto">
                  <div className="space-y-2">
                    <div className="bg-green-900/30 p-2 rounded text-sm">
                      <span className="text-green-400">WIN</span> vs Moonmoon • +25 XP
                    </div>
                    <div className="bg-red-900/30 p-2 rounded text-sm">
                      <span className="text-red-400">LOSS</span> vs Chad • +5 XP
                    </div>
                    <div className="bg-green-900/30 p-2 rounded text-sm">
                      <span className="text-green-400">WIN</span> vs Pikachu • +30 XP
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Opponents */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-pixel mb-4 text-center">OPPONENTS</h2>

              <div className="space-y-4">
                {opponents.map((opponent) => (
                  <div key={opponent.id} className="arcade-card p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 relative">
                        <Image
                          src={opponent.image || "/placeholder.svg"}
                          alt={opponent.name}
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                      <div>
                        <h3 className="font-pixel text-lg">{opponent.name}</h3>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          <div className="bg-purple-900/50 px-2 py-1 rounded text-xs">
                            <span className="text-gray-300">LVL</span> {opponent.level}
                          </div>
                          <div className="bg-purple-900/50 px-2 py-1 rounded text-xs">
                            <span className="text-gray-300">PWR</span> {opponent.power}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="arcade-card p-4 bg-purple-800/30 border border-dashed border-purple-500/50 flex items-center justify-center h-24">
                  <p className="text-purple-300 text-sm">More opponents coming soon...</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
