"use client"

import { ArcadeConnectButton } from "@/components/thirdweb/connect-button"
import { useActiveAccount, useActiveWallet } from "thirdweb/react"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

export default function ProfileDashboardPage() {
  const account = useActiveAccount()
  const wallet = useActiveWallet()
  const [activeTab, setActiveTab] = useState("inventory")

  const userStats = {
    level: 42,
    xp: 8500,
    nextLevel: 10000,
    wins: 280,
    losses: 120,
    winRate: "70.0%",
    rank: "#156",
    coins: 15750,
  }

  const inventory = {
    warriors: [
      { id: 1, name: "Doge", level: 38, power: 8500, image: "/images/warriors/doge.png" },
      { id: 2, name: "Pepe", level: 42, power: 9200, image: "/images/warriors/pepe.png" },
      { id: 3, name: "Wojak", level: 35, power: 7800, image: "/images/warriors/wojak.png" },
    ],
    items: [
      { id: 4, name: "Power Potion", quantity: 5, image: "/glowing-potion.png" },
      { id: 5, name: "Diamond Sword", quantity: 1, image: "/placeholder-sj52t.png" },
      { id: 6, name: "Shield of Glory", quantity: 2, image: "/ornate-shield.png" },
    ],
  }

  const transactions = [
    { id: 1, type: "Purchase", item: "Power Potion", price: "0.01 ETH", date: "2025-05-14", status: "Completed" },
    { id: 2, type: "Sale", item: "Ice Skin", price: "0.03 ETH", date: "2025-05-12", status: "Completed" },
    { id: 3, type: "Battle Reward", item: "10 Coins", price: "N/A", date: "2025-05-10", status: "Completed" },
    { id: 4, type: "Purchase", item: "Mega Chad", price: "0.07 ETH", date: "2025-05-08", status: "Pending" },
  ]

  return (
    <div className="container mx-auto py-12 px-4">
      <Link href="/thirdweb-test" className="text-pink-500 hover:text-pink-400 mb-8 inline-block">
        ← Back to Test Pages
      </Link>

      <div className="arcade-card p-8 max-w-6xl mx-auto">
        <h1 className="text-4xl font-pixel mb-8 text-center neon-text">PROFILE DASHBOARD</h1>

        {!account ? (
          <div className="flex flex-col items-center justify-center gap-6">
            <p className="text-center mb-4">Connect your wallet to view your profile</p>
            <div className="w-full max-w-md">
              <ArcadeConnectButton />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left Column - User Profile */}
            <div className="lg:col-span-1">
              <div className="arcade-card p-6">
                <div className="flex flex-col items-center">
                  <div className="w-32 h-32 relative mb-4">
                    <Image
                      src="/images/avatars/player1.png"
                      alt="Player Avatar"
                      fill
                      className="object-cover rounded-full border-4 border-pink-500"
                    />
                  </div>

                  <h2 className="font-pixel text-xl mb-2">CryptoWarrior</h2>
                  <p className="text-sm text-gray-300 mb-4">Joined May 2025</p>

                  <div className="w-full bg-purple-900/30 h-4 rounded-full mb-2">
                    <div
                      className="bg-gradient-to-r from-pink-500 to-purple-500 h-4 rounded-full"
                      style={{ width: `${(userStats.xp / userStats.nextLevel) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-300 mb-4">
                    Level {userStats.level} • {userStats.xp}/{userStats.nextLevel} XP
                  </p>

                  <div className="grid grid-cols-2 gap-4 w-full">
                    <div className="bg-purple-900/30 p-3 rounded text-center">
                      <p className="text-xs text-gray-300">RANK</p>
                      <p className="font-pixel">{userStats.rank}</p>
                    </div>
                    <div className="bg-purple-900/30 p-3 rounded text-center">
                      <p className="text-xs text-gray-300">COINS</p>
                      <p className="font-pixel">{userStats.coins}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="arcade-card p-6 mt-6">
                <h3 className="font-pixel text-lg mb-4">WALLET</h3>
                <div className="space-y-3">
                  <div className="bg-purple-900/30 p-3 rounded">
                    <p className="text-xs text-gray-300">ADDRESS</p>
                    <p className="font-mono text-xs break-all">{account.address}</p>
                  </div>
                  <div className="bg-purple-900/30 p-3 rounded">
                    <p className="text-xs text-gray-300">CHAIN</p>
                    <p className="font-mono text-sm">{wallet?.getChain().name || "Unknown"}</p>
                  </div>
                  <div className="bg-purple-900/30 p-3 rounded">
                    <p className="text-xs text-gray-300">TYPE</p>
                    <p className="font-mono text-sm">{wallet?.id || "Unknown"}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Content */}
            <div className="lg:col-span-3">
              <div className="flex border-b border-purple-800 mb-6">
                <button
                  className={`px-4 py-2 font-pixel ${activeTab === "inventory" ? "text-pink-400 border-b-2 border-pink-400" : "text-gray-400"}`}
                  onClick={() => setActiveTab("inventory")}
                >
                  INVENTORY
                </button>
                <button
                  className={`px-4 py-2 font-pixel ${activeTab === "stats" ? "text-pink-400 border-b-2 border-pink-400" : "text-gray-400"}`}
                  onClick={() => setActiveTab("stats")}
                >
                  STATS
                </button>
                <button
                  className={`px-4 py-2 font-pixel ${activeTab === "transactions" ? "text-pink-400 border-b-2 border-pink-400" : "text-gray-400"}`}
                  onClick={() => setActiveTab("transactions")}
                >
                  TRANSACTIONS
                </button>
              </div>

              {activeTab === "inventory" && (
                <div>
                  <h3 className="font-pixel text-xl mb-4">YOUR WARRIORS</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                    {inventory.warriors.map((warrior) => (
                      <div key={warrior.id} className="arcade-card p-4">
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
                            <h4 className="font-pixel">{warrior.name}</h4>
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

                  <h3 className="font-pixel text-xl mb-4">YOUR ITEMS</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {inventory.items.map((item) => (
                      <div key={item.id} className="arcade-card p-4">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 relative">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              fill
                              className="object-cover rounded-md"
                            />
                          </div>
                          <div>
                            <h4 className="font-pixel">{item.name}</h4>
                            <div className="bg-purple-900/50 px-2 py-1 rounded text-xs mt-2">
                              <span className="text-gray-300">QTY</span> {item.quantity}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "stats" && (
                <div>
                  <h3 className="font-pixel text-xl mb-4">BATTLE STATISTICS</h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="arcade-card p-6 text-center">
                      <p className="text-sm text-gray-300 mb-2">WINS</p>
                      <p className="font-pixel text-3xl text-green-400">{userStats.wins}</p>
                    </div>
                    <div className="arcade-card p-6 text-center">
                      <p className="text-sm text-gray-300 mb-2">LOSSES</p>
                      <p className="font-pixel text-3xl text-red-400">{userStats.losses}</p>
                    </div>
                    <div className="arcade-card p-6 text-center">
                      <p className="text-sm text-gray-300 mb-2">WIN RATE</p>
                      <p className="font-pixel text-3xl text-blue-400">{userStats.winRate}</p>
                    </div>
                  </div>

                  <h3 className="font-pixel text-xl mb-4">WARRIOR STATS</h3>

                  <div className="arcade-card p-6">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Attack</span>
                          <span className="text-sm">88/100</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2.5">
                          <div className="bg-red-600 h-2.5 rounded-full" style={{ width: "88%" }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Defense</span>
                          <span className="text-sm">90/100</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2.5">
                          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "90%" }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Speed</span>
                          <span className="text-sm">92/100</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2.5">
                          <div className="bg-green-600 h-2.5 rounded-full" style={{ width: "92%" }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Health</span>
                          <span className="text-sm">85/100</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2.5">
                          <div className="bg-pink-600 h-2.5 rounded-full" style={{ width: "85%" }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Special</span>
                          <span className="text-sm">87/100</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2.5">
                          <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: "87%" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "transactions" && (
                <div>
                  <h3 className="font-pixel text-xl mb-4">TRANSACTION HISTORY</h3>

                  <div className="arcade-card overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-purple-900/50">
                        <tr>
                          <th className="py-3 px-4 text-left text-sm font-pixel">TYPE</th>
                          <th className="py-3 px-4 text-left text-sm font-pixel">ITEM</th>
                          <th className="py-3 px-4 text-left text-sm font-pixel">PRICE</th>
                          <th className="py-3 px-4 text-left text-sm font-pixel">DATE</th>
                          <th className="py-3 px-4 text-left text-sm font-pixel">STATUS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {transactions.map((tx, index) => (
                          <tr key={tx.id} className={index % 2 === 0 ? "bg-purple-900/20" : "bg-purple-900/30"}>
                            <td className="py-3 px-4 text-sm">{tx.type}</td>
                            <td className="py-3 px-4 text-sm">{tx.item}</td>
                            <td className="py-3 px-4 text-sm">{tx.price}</td>
                            <td className="py-3 px-4 text-sm">{tx.date}</td>
                            <td className="py-3 px-4 text-sm">
                              <span
                                className={`px-2 py-1 rounded text-xs ${tx.status === "Completed" ? "bg-green-900/50 text-green-400" : "bg-yellow-900/50 text-yellow-400"}`}
                              >
                                {tx.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
