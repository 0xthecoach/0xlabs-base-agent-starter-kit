import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

// Helper function to check if a URL is valid
function isValidImageUrl(url: any): boolean {
  return typeof url === "string" && url.trim() !== ""
}

// Helper function to get image URL from profile_photos array
function getImageUrl(profilePhotos: any): string | null {
  if (Array.isArray(profilePhotos) && profilePhotos.length > 0 && profilePhotos[0].url) {
    return profilePhotos[0].url
  }
  return null
}

// Define the type for our API response
interface WarriorData {
  id: number
  animol_name: string
  profile_photos: Array<{
    access: string
    path: string
    name: string
    type: string
    size: number
    mime: string
    meta: {
      width: number
      height: number
    }
    url: string
  }>
  description?: string
  level?: number
  power?: number
  wins?: number
  losses?: number
  rarity?: string
  abilities?: string[]
  stats?: {
    attack?: number
    defense?: number
    speed?: number
    health?: number
    special?: number
  }
  equipment?: string[]
  achievements?: string[]
  Origin_Story?: string
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  try {
    const warriorId = params.id
    const response = await fetch(
      `https://xsjm-zu7p-vaky.n7.xano.io/api:ZETcPNiq/Single_memewars_profile/${warriorId}`,
      { cache: "no-store" },
    )

    if (!response.ok) {
      return {
        title: "Warrior Not Found | MemeWars",
        description: "The requested MemeWarrior could not be found.",
      }
    }

    const warrior: WarriorData = await response.json()

    return {
      title: `${warrior.animol_name || "Unknown Warrior"} | MemeWars`,
      description: warrior.description || "MemeWarrior details",
    }
  } catch (error) {
    console.error("Error fetching warrior data for metadata:", error)
    return {
      title: "MemeWarrior | MemeWars",
      description: "MemeWarrior details",
    }
  }
}

export default async function MemeWarriorDetailPage({ params }: { params: { id: string } }) {
  try {
    const warriorId = params.id
    const response = await fetch(
      `https://xsjm-zu7p-vaky.n7.xano.io/api:ZETcPNiq/Single_memewars_profile/${warriorId}`,
      { cache: "no-store" },
    )

    if (!response.ok) {
      notFound()
    }

    const warrior: WarriorData = await response.json()

    // Calculate win rate
    const totalBattles = (warrior.wins || 0) + (warrior.losses || 0)
    const winRate = totalBattles > 0 ? (((warrior.wins || 0) / totalBattles) * 100).toFixed(1) : "0.0"

    // Default values for missing data
    const abilities = warrior.abilities || ["Special Attack", "Defense Boost", "Speed Increase"]
    const stats = warrior.stats || {
      attack: 50,
      defense: 50,
      speed: 50,
      health: 50,
      special: 50,
    }
    const equipment = warrior.equipment || ["Basic Armor", "Standard Weapon", "Utility Item"]
    const achievements = warrior.achievements || ["Rookie Warrior", "First Battle", "Training Complete"]

    // Generate a placeholder image URL that doesn't reference the file system
    const placeholderImage = `/placeholder.svg?height=400&width=400&query=${encodeURIComponent(warrior.animol_name || "meme character")}`

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
                    {warrior.rarity || "Common"}
                  </span>
                </div>
                <div className="bg-gradient-to-b from-purple-900/30 to-pink-900/30 rounded-lg p-4">
                  <Image
                    src={getImageUrl(warrior.profile_photos) || placeholderImage}
                    alt={warrior.animol_name || "MemeWarrior"}
                    width={400}
                    height={400}
                    className="object-contain mx-auto"
                  />
                </div>
              </div>
              <div className="p-6 text-center">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-black/30 p-3 rounded">
                    <h4 className="font-pixel text-sm mb-1 text-pink-300">LEVEL</h4>
                    <div className="font-pixel text-2xl text-white">{warrior.level || 1}</div>
                  </div>
                  <div className="bg-black/30 p-3 rounded">
                    <h4 className="font-pixel text-sm mb-1 text-pink-300">POWER</h4>
                    <div className="font-pixel text-2xl text-white">{warrior.power || 100}</div>
                  </div>
                </div>
                <button className="arcade-btn text-white w-full">USE THIS WARRIOR</button>
              </div>
            </div>
            <div className="arcade-card overflow-hidden mt-4">
              <div className="p-4 bg-black/30 rounded-lg border border-pink-500/30">
                <h4 className="font-pixel text-sm mb-2 text-pink-300 text-center">ORIGIN STORY</h4>
                <p className="text-white text-sm">
                  {warrior.Origin_Story ||
                    "The mysterious origins of this warrior remain shrouded in legend. Some say they emerged from the deepest memes of the internet, while others believe they were born from a viral moment that transcended time."}
                </p>
              </div>
            </div>
          </div>

          {/* Warrior Details */}
          <div className="lg:col-span-2 space-y-6">
            <div className="arcade-card p-6">
              <h1 className="text-3xl md:text-4xl font-pixel mb-2 text-white">
                {warrior.animol_name || "Unknown Warrior"}
              </h1>
              <p className="text-gray-300 mb-6">
                {warrior.description || "No description available for this warrior."}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-black/30 p-3 rounded text-center">
                  <h4 className="font-pixel text-sm mb-1 text-green-300">WINS</h4>
                  <div className="font-pixel text-xl text-white">{warrior.wins || 0}</div>
                </div>
                <div className="bg-black/30 p-3 rounded text-center">
                  <h4 className="font-pixel text-sm mb-1 text-red-300">LOSSES</h4>
                  <div className="font-pixel text-xl text-white">{warrior.losses || 0}</div>
                </div>
                <div className="bg-black/30 p-3 rounded text-center">
                  <h4 className="font-pixel text-sm mb-1 text-cyan-300">WIN RATE</h4>
                  <div className="font-pixel text-xl text-white">{winRate}%</div>
                </div>
                <div className="bg-black/30 p-3 rounded text-center">
                  <h4 className="font-pixel text-sm mb-1 text-yellow-300">RARITY</h4>
                  <div className="font-pixel text-xl text-white">{warrior.rarity || "Common"}</div>
                </div>
              </div>

              <h2 className="text-xl font-pixel mb-4 text-pink-400">ABILITIES</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {abilities.map((ability, index) => (
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
                    <span className="text-white">{stats.attack}/100</span>
                  </div>
                  <div className="relative h-3 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="absolute top-0 left-0 h-full bg-red-500"
                      style={{ width: `${stats.attack}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-white">Defense</span>
                    <span className="text-white">{stats.defense}/100</span>
                  </div>
                  <div className="relative h-3 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="absolute top-0 left-0 h-full bg-blue-500"
                      style={{ width: `${stats.defense}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-white">Speed</span>
                    <span className="text-white">{stats.speed}/100</span>
                  </div>
                  <div className="relative h-3 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="absolute top-0 left-0 h-full bg-green-500"
                      style={{ width: `${stats.speed}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-white">Health</span>
                    <span className="text-white">{stats.health}/100</span>
                  </div>
                  <div className="relative h-3 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="absolute top-0 left-0 h-full bg-pink-500"
                      style={{ width: `${stats.health}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-white">Special</span>
                    <span className="text-white">{stats.special}/100</span>
                  </div>
                  <div className="relative h-3 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="absolute top-0 left-0 h-full bg-purple-500"
                      style={{ width: `${stats.special}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="arcade-card p-6">
              <h2 className="text-xl font-pixel mb-4 text-pink-400">UPGRADE & EVOLUTION</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-pixel text-lg mb-3 text-white">Current Level: {warrior.level || 1}</h3>
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

            <div className="arcade-card p-6">
              <h2 className="text-xl font-pixel mb-4 text-pink-400">EQUIPMENT</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {equipment.map((item, index) => (
                  <div
                    key={index}
                    className="bg-black/30 p-4 rounded border border-pink-500/30 flex items-center justify-center"
                  >
                    <span className="font-pixel text-center text-white">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="arcade-card p-6">
              <h2 className="text-xl font-pixel mb-4 text-pink-400">ACHIEVEMENTS</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="bg-black/30 p-4 rounded border border-pink-500/30">
                    <span className="font-pixel text-center text-white block">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error("Error fetching warrior data:", error)
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-pixel mb-4 text-pink-400">Error Loading Warrior</h1>
        <p className="mb-8">There was an error loading this warrior's data. Please try again later.</p>
        <Link href="/memewarriors" className="arcade-btn text-white">
          Back to Warriors
        </Link>
      </div>
    )
  }
}
