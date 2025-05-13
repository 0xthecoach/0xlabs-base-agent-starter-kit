import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
// Remove the static data import
// import { memeWarriors } from "@/lib/data"

export const metadata: Metadata = {
  title: "MemeWarriors | MemeWars",
  description: "Browse all MemeWarriors in the MemeWars universe",
}

// Helper function to get image URL from profile_photos array
function getImageUrl(profilePhotos: any): string | null {
  if (Array.isArray(profilePhotos) && profilePhotos.length > 0 && profilePhotos[0].url) {
    return profilePhotos[0].url
  }
  return null
}

// Add async to the function
export default async function MemeWarriorsPage() {
  // Fetch warriors from Xano API
  const response = await fetch("https://xsjm-zu7p-vaky.n7.xano.io/api:ZETcPNiq/memewars_profiles", {
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store", // Disable caching to always get fresh data
  })

  if (!response.ok) {
    console.error("Failed to fetch warriors:", await response.text())
  }

  const memeWarriors = await response.json()

  // Add this after the fetch but before the return
  if (!memeWarriors || memeWarriors.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-pixel mb-4 neon-text">MEME WARRIORS</h1>
        <p className="text-lg">No warriors found. Check back later!</p>
      </div>
    )
  }

  // Sort warriors by power to find top 3
  const topWarriors = [...memeWarriors].sort((a, b) => (b.power || 0) - (a.power || 0)).slice(0, 3)

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-pixel mb-4 neon-text">MEME WARRIORS</h1>
        <p className="text-lg max-w-3xl mx-auto">
          Browse all available warriors in the MemeWars universe. Collect them, upgrade them, and battle with them!
        </p>
      </div>

      {/* Season Stats Box */}
      <div className="arcade-card p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <h3 className="font-pixel text-xl mb-2 text-pink-400">CURRENT SEASON</h3>
            <div className="font-pixel text-2xl text-white">Season 2: Meme Revolution</div>
            <div className="text-sm text-gray-400 mt-1">Ends in 24 days, 12 hours</div>
          </div>
          <div className="text-center">
            <h3 className="font-pixel text-xl mb-2 text-pink-400">YOUR COLLECTION</h3>
            <div className="font-pixel text-2xl text-white">12 Warriors</div>
            <div className="text-sm text-gray-400 mt-1">3 Legendary, 4 Epic, 5 Rare</div>
          </div>
          <div className="text-center">
            <h3 className="font-pixel text-xl mb-2 text-pink-400">BATTLE STATS</h3>
            <div className="font-pixel text-2xl text-white">Win Rate: 68%</div>
            <div className="text-sm text-gray-400 mt-1">245 Wins, 115 Losses</div>
          </div>
        </div>
      </div>

      {/* Top Warriors - King of the Hill */}
      <div className="mb-12">
        <h2 className="text-3xl font-pixel mb-6 text-center neon-text">TOP WARRIORS</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 2nd Place */}
          <div className="arcade-card p-6 text-center order-2 md:order-1">
            <div className="relative mx-auto w-24 h-24 mb-4">
              <div className="absolute inset-0 rounded-full border-2 border-gray-300 animate-pulse-slow"></div>
              <div className="w-full h-full rounded-full overflow-hidden border-2 border-white">
                <Image
                  src={
                    getImageUrl(topWarriors[1]?.profile_photos) ||
                    "/placeholder.svg?height=96&width=96&query=meme warrior"
                  }
                  alt={topWarriors[1]?.animol_name || "Warrior"}
                  width={96}
                  height={96}
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-gray-400 rounded-full w-8 h-8 flex items-center justify-center border-2 border-black">
                <span className="font-pixel text-black">2</span>
              </div>
            </div>
            <h3 className="font-pixel text-xl text-white mb-1">{topWarriors[1]?.animol_name || "Unknown"}</h3>
            <div className="text-gray-300 mb-2">Level {topWarriors[1]?.level || 0}</div>
            <div className="font-pixel text-xl text-yellow-400 mb-3">{topWarriors[1]?.power || 0} pts</div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="bg-black/30 p-2 rounded">
                <span className="text-green-300">Wins</span>
                <div className="font-pixel text-white">{topWarriors[1]?.wins || 0}</div>
              </div>
              <div className="bg-black/30 p-2 rounded">
                <span className="text-cyan-300">Win Rate</span>
                <div className="font-pixel text-white">
                  {topWarriors[1]?.wins && topWarriors[1]?.losses
                    ? Math.round((topWarriors[1].wins / (topWarriors[1].wins + topWarriors[1].losses)) * 100)
                    : 0}
                  %
                </div>
              </div>
            </div>
          </div>

          {/* 1st Place */}
          <div className="arcade-card p-6 text-center order-1 md:order-2 transform md:scale-110 z-10 border-2 border-yellow-500">
            <div className="relative mx-auto w-32 h-32 mb-4">
              <div className="absolute inset-0 rounded-full border-4 border-yellow-500 animate-pulse-slow"></div>
              <div className="absolute inset-2 rounded-full border-2 border-yellow-300 animate-pulse-slow animation-delay-500"></div>
              <div className="w-full h-full rounded-full overflow-hidden border-2 border-white">
                <Image
                  src={
                    getImageUrl(topWarriors[0]?.profile_photos) ||
                    "/placeholder.svg?height=128&width=128&query=meme warrior"
                  }
                  alt={topWarriors[0]?.animol_name || "Warrior"}
                  width={128}
                  height={128}
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-yellow-500 rounded-full w-10 h-10 flex items-center justify-center border-2 border-black">
                <span className="font-pixel text-black">1</span>
              </div>
            </div>
            <h3 className="font-pixel text-2xl text-white mb-1">{topWarriors[0]?.animol_name || "Unknown"}</h3>
            <div className="text-gray-300 mb-2">Level {topWarriors[0]?.level || 0}</div>
            <div className="font-pixel text-2xl text-yellow-400 mb-3">{topWarriors[0]?.power || 0} pts</div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="bg-black/30 p-2 rounded">
                <span className="text-green-300">Wins</span>
                <div className="font-pixel text-white">{topWarriors[0]?.wins || 0}</div>
              </div>
              <div className="bg-black/30 p-2 rounded">
                <span className="text-cyan-300">Win Rate</span>
                <div className="font-pixel text-white">
                  {topWarriors[0]?.wins && topWarriors[0]?.losses
                    ? Math.round((topWarriors[0].wins / (topWarriors[0].wins + topWarriors[0].losses)) * 100)
                    : 0}
                  %
                </div>
              </div>
            </div>
          </div>

          {/* 3rd Place */}
          <div className="arcade-card p-6 text-center order-3">
            <div className="relative mx-auto w-24 h-24 mb-4">
              <div className="absolute inset-0 rounded-full border-2 border-amber-700 animate-pulse-slow"></div>
              <div className="w-full h-full rounded-full overflow-hidden border-2 border-white">
                <Image
                  src={
                    getImageUrl(topWarriors[2]?.profile_photos) ||
                    "/placeholder.svg?height=96&width=96&query=meme warrior"
                  }
                  alt={topWarriors[2]?.animol_name || "Warrior"}
                  width={96}
                  height={96}
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-amber-700 rounded-full w-8 h-8 flex items-center justify-center border-2 border-black">
                <span className="font-pixel text-black">3</span>
              </div>
            </div>
            <h3 className="font-pixel text-xl text-white mb-1">{topWarriors[2]?.animol_name || "Unknown"}</h3>
            <div className="text-gray-300 mb-2">Level {topWarriors[2]?.level || 0}</div>
            <div className="font-pixel text-xl text-yellow-400 mb-3">{topWarriors[2]?.power || 0} pts</div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="bg-black/30 p-2 rounded">
                <span className="text-green-300">Wins</span>
                <div className="font-pixel text-white">{topWarriors[2]?.wins || 0}</div>
              </div>
              <div className="bg-black/30 p-2 rounded">
                <span className="text-cyan-300">Win Rate</span>
                <div className="font-pixel text-white">
                  {topWarriors[2]?.wins && topWarriors[2]?.losses
                    ? Math.round((topWarriors[2].wins / (topWarriors[2].wins + topWarriors[2].losses)) * 100)
                    : 0}
                  %
                </div>
              </div>
            </div>
          </div>
        </div>
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
        {memeWarriors &&
          memeWarriors.map((warrior) => {
            // Generate a placeholder image URL that doesn't reference the file system
            const placeholderImage = `/placeholder.svg?height=300&width=300&query=${encodeURIComponent(warrior.animol_name || "meme character")}`

            return (
              <Link href={`/memewarriors/${warrior.id}`} key={warrior.id}>
                <div className="arcade-card hover:scale-105 transition-transform duration-300 overflow-hidden cursor-pointer">
                  <div className="relative h-64 bg-gradient-to-b from-purple-900/50 to-pink-900/50 p-0 m-0 overflow-hidden">
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
                        {warrior.rarity || "Common"}
                      </span>
                    </div>
                    <Image
                      src={getImageUrl(warrior.profile_photos) || placeholderImage}
                      alt={warrior.animol_name || "Meme Warrior"}
                      width={300}
                      height={300}
                      className="object-cover h-full w-full"
                      style={{ margin: 0, padding: 0 }}
                    />
                  </div>
                  <div className="p-4 border-t-2 border-pink-500/50">
                    <h3 className="font-pixel text-xl mb-2 text-center">{warrior.animol_name || "Unknown Warrior"}</h3>

                    <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                      <div className="flex flex-col items-center bg-black/30 p-2 rounded">
                        <span className="text-pink-300">LEVEL</span>
                        <span className="font-pixel text-white">{warrior.level || 1}</span>
                      </div>
                      <div className="flex flex-col items-center bg-black/30 p-2 rounded">
                        <span className="text-pink-300">POWER</span>
                        <span className="font-pixel text-white">{warrior.power || 0}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex flex-col items-center bg-black/30 p-2 rounded">
                        <span className="text-green-300">WINS</span>
                        <span className="font-pixel text-white">{warrior.wins || 0}</span>
                      </div>
                      <div className="flex flex-col items-center bg-black/30 p-2 rounded">
                        <span className="text-red-300">LOSSES</span>
                        <span className="font-pixel text-white">{warrior.losses || 0}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
      </div>
    </div>
  )
}
