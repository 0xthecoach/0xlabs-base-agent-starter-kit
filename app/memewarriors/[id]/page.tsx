import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { memeWarriors } from "@/lib/data"

type Props = {
  params: { id: string }
}

export function generateMetadata({ params }: Props): Metadata {
  const warrior = memeWarriors.find((w) => w.id === params.id)
  return {
    title: warrior ? `${warrior.name} | MemeWars` : "MemeWarrior | MemeWars",
    description: warrior ? warrior.description : "MemeWarrior details",
  }
}

export default function MemeWarriorDetailPage({ params }: Props) {
  const warrior = memeWarriors.find((w) => w.id === params.id)

  if (!warrior) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-pixel mb-4 text-pink-400">Warrior Not Found</h1>
        <p className="mb-8">The warrior you're looking for doesn't exist or has been removed.</p>
        <Link href="/memewarriors" className="arcade-btn text-white">
          Back to Warriors
        </Link>
      </div>
    )
  }

  const winRate =
    warrior.wins + warrior.losses > 0 ? ((warrior.wins / (warrior.wins + warrior.losses)) * 100).toFixed(1) : "0.0"

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mb-8">
        <Link href="/memewarriors" className="text-pink-400 hover:text-pink-300 flex items-center">
          ← Back to Warriors
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Warrior Image */}
        <div className="lg:col-span-1">
          <div className="arcade-card overflow-hidden">
            <div className="relative pt-4 px-4 pb-0">
              <div className="absolute top-6 right-6 z-10">
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
              <div className="bg-gradient-to-b from-purple-900/30 to-pink-900/30 rounded-lg p-4">
                <Image
                  src={warrior.image || "/placeholder.svg?height=400&width=400&query=meme character"}
                  alt={warrior.name}
                  width={400}
                  height={400}
                  className="object-contain mx-auto"
                  unoptimized
                />
              </div>
            </div>
            <div className="p-6 text-center">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-black/30 p-3 rounded">
                  <h4 className="font-pixel text-sm mb-1 text-pink-300">LEVEL</h4>
                  <div className="font-pixel text-2xl text-white">{warrior.level}</div>
                </div>
                <div className="bg-black/30 p-3 rounded">
                  <h4 className="font-pixel text-sm mb-1 text-pink-300">POWER</h4>
                  <div className="font-pixel text-2xl text-white">{warrior.power}</div>
                </div>
              </div>
              <button className="arcade-btn text-white w-full">USE THIS WARRIOR</button>
            </div>
          </div>
        </div>

        {/* Warrior Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="arcade-card p-6">
            <h1 className="text-3xl md:text-4xl font-pixel mb-2 text-white">{warrior.name}</h1>
            <p className="text-gray-300 mb-6">{warrior.description}</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-black/30 p-3 rounded text-center">
                <h4 className="font-pixel text-sm mb-1 text-green-300">WINS</h4>
                <div className="font-pixel text-xl text-white">{warrior.wins}</div>
              </div>
              <div className="bg-black/30 p-3 rounded text-center">
                <h4 className="font-pixel text-sm mb-1 text-red-300">LOSSES</h4>
                <div className="font-pixel text-xl text-white">{warrior.losses}</div>
              </div>
              <div className="bg-black/30 p-3 rounded text-center">
                <h4 className="font-pixel text-sm mb-1 text-cyan-300">WIN RATE</h4>
                <div className="font-pixel text-xl text-white">{winRate}%</div>
              </div>
              <div className="bg-black/30 p-3 rounded text-center">
                <h4 className="font-pixel text-sm mb-1 text-yellow-300">RARITY</h4>
                <div className="font-pixel text-xl text-white">{warrior.rarity}</div>
              </div>
            </div>

            <h2 className="text-xl font-pixel mb-4 text-pink-400">ABILITIES</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {warrior.abilities.map((ability, index) => (
                <div key={index} className="bg-black/30 p-3 rounded">
                  <h4 className="font-pixel text-sm mb-1 text-center text-white">{ability}</h4>
                </div>
              ))}
            </div>

            <h2 className="text-xl font-pixel mb-4 text-pink-400">STATS</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-white">Attack</span>
                  <span className="text-white">{warrior.stats.attack}/100</span>
                </div>
                <div className="relative h-3 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full bg-red-500"
                    style={{ width: `${warrior.stats.attack}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-white">Defense</span>
                  <span className="text-white">{warrior.stats.defense}/100</span>
                </div>
                <div className="relative h-3 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full bg-blue-500"
                    style={{ width: `${warrior.stats.defense}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-white">Speed</span>
                  <span className="text-white">{warrior.stats.speed}/100</span>
                </div>
                <div className="relative h-3 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full bg-green-500"
                    style={{ width: `${warrior.stats.speed}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-white">Health</span>
                  <span className="text-white">{warrior.stats.health}/100</span>
                </div>
                <div className="relative h-3 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full bg-pink-500"
                    style={{ width: `${warrior.stats.health}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-white">Special</span>
                  <span className="text-white">{warrior.stats.special}/100</span>
                </div>
                <div className="relative h-3 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full bg-purple-500"
                    style={{ width: `${warrior.stats.special}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div className="arcade-card p-6">
            <h2 className="text-xl font-pixel mb-4 text-pink-400">UPGRADE & EVOLUTION</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-pixel text-lg mb-3 text-white">Current Level: {warrior.level}</h3>
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">XP Progress</span>
                    <span className="text-gray-400">8,500 / 10,000</span>
                  </div>
                  <div className="relative h-3 bg-gray-800 rounded-full overflow-hidden">
                    <div className="absolute top-0 left-0 h-full bg-cyan-500" style={{ width: "85%" }}></div>
                  </div>
                </div>
                <button className="arcade-btn text-white w-full">UPGRADE (2,500 COINS)</button>
              </div>
              <div>
                <h3 className="font-pixel text-lg mb-3 text-white">Evolution Requirements</h3>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-center text-sm">
                    <span className="text-green-400 mr-2">✓</span>
                    <span className="text-white">Reach Level 40</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <span className="text-green-400 mr-2">✓</span>
                    <span className="text-white">Win 250+ Battles</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <span className="text-red-400 mr-2">✗</span>
                    <span className="text-white">Collect 3 Evolution Stones</span>
                  </li>
                </ul>
                <button className="arcade-btn text-white w-full opacity-50 cursor-not-allowed" disabled>
                  EVOLVE (REQUIREMENTS NOT MET)
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
