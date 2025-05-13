import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { memeWarriors } from "@/lib/data"

export const metadata: Metadata = {
  title: "MemeWarriors | MemeWars",
  description: "Browse all MemeWarriors in the MemeWars universe",
}

export default function MemeWarriorsPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-pixel mb-4 neon-text">MEME WARRIORS</h1>
        <p className="text-lg max-w-3xl mx-auto">
          Browse all available warriors in the MemeWars universe. Collect them, upgrade them, and battle with them!
        </p>
      </div>

      {/* Filters */}
      <div className="arcade-card p-4 mb-8">
        <div className="flex flex-wrap gap-4 justify-between">
          <div className="flex items-center">
            <span className="text-white mr-2 font-pixel">RARITY:</span>
            <select className="bg-black/50 text-white border border-pink-500 rounded px-3 py-2">
              <option value="all">All</option>
              <option value="legendary">Legendary</option>
              <option value="epic">Epic</option>
              <option value="rare">Rare</option>
              <option value="common">Common</option>
            </select>
          </div>
          <div className="flex items-center">
            <span className="text-white mr-2 font-pixel">SORT BY:</span>
            <select className="bg-black/50 text-white border border-pink-500 rounded px-3 py-2">
              <option value="power-high">Power: High to Low</option>
              <option value="power-low">Power: Low to High</option>
              <option value="level-high">Level: High to Low</option>
              <option value="level-low">Level: Low to High</option>
              <option value="wins">Wins</option>
              <option value="name">Name</option>
            </select>
          </div>
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search warriors..."
              className="bg-black/50 text-white border border-pink-500 rounded px-3 py-2 w-full"
            />
          </div>
        </div>
      </div>

      {/* Warriors Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {memeWarriors.map((warrior) => (
          <Link href={`/memewarriors/${warrior.id}`} key={warrior.id}>
            <div className="arcade-card hover:scale-105 transition-transform duration-300 overflow-hidden cursor-pointer">
              <div className="relative h-64 bg-gradient-to-b from-purple-900/50 to-pink-900/50">
                <div className="absolute top-2 right-2 z-10">
                  <span
                    className={`font-pixel text-xs px-2 py-1 rounded ${
                      warrior.rarity === "Legendary"
                        ? "bg-yellow-500/80"
                        : warrior.rarity === "Epic"
                          ? "bg-purple-500/80"
                          : warrior.rarity === "Rare"
                            ? "bg-blue-500/80"
                            : "bg-gray-500/80"
                    }`}
                  >
                    {warrior.rarity}
                  </span>
                </div>
                <Image
                  src={warrior.image || "/placeholder.svg?height=300&width=300&query=meme character"}
                  alt={warrior.name}
                  width={300}
                  height={300}
                  className="object-contain h-full w-full p-4"
                />
              </div>
              <div className="p-4 border-t-2 border-pink-500/50">
                <h3 className="font-pixel text-xl mb-2 text-center">{warrior.name}</h3>

                <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                  <div className="flex flex-col items-center bg-black/30 p-2 rounded">
                    <span className="text-pink-300">LEVEL</span>
                    <span className="font-pixel text-white">{warrior.level}</span>
                  </div>
                  <div className="flex flex-col items-center bg-black/30 p-2 rounded">
                    <span className="text-pink-300">POWER</span>
                    <span className="font-pixel text-white">{warrior.power}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex flex-col items-center bg-black/30 p-2 rounded">
                    <span className="text-green-300">WINS</span>
                    <span className="font-pixel text-white">{warrior.wins}</span>
                  </div>
                  <div className="flex flex-col items-center bg-black/30 p-2 rounded">
                    <span className="text-red-300">LOSSES</span>
                    <span className="font-pixel text-white">{warrior.losses}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
