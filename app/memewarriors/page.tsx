"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { memeWarriors } from "@/lib/data"
import { Search, Filter, ChevronDown } from "lucide-react"

export default function MemeWarriorsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterOpen, setFilterOpen] = useState(false)
  const [filters, setFilters] = useState({
    rarity: "All",
    class: "All",
    minLevel: 0,
    maxLevel: 100,
  })

  // Filter warriors based on search and filters
  const filteredWarriors = memeWarriors.filter((warrior) => {
    // Search filter
    if (
      searchTerm &&
      !warrior.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !warrior.description.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false
    }

    // Rarity filter
    if (filters.rarity !== "All" && warrior.rarity !== filters.rarity) {
      return false
    }

    // Class filter
    if (filters.class !== "All" && warrior.class !== filters.class) {
      return false
    }

    // Level filter
    if (warrior.level < filters.minLevel || warrior.level > filters.maxLevel) {
      return false
    }

    return true
  })

  // Get unique rarities and classes for filter options
  const rarities = ["All", ...new Set(memeWarriors.map((warrior) => warrior.rarity))]
  const classes = ["All", ...new Set(memeWarriors.map((warrior) => warrior.class))]

  return (
    <div className="pt-20">
      {/* Hero section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900 to-purple-800 z-0"></div>
        <div className="absolute inset-0 retro-grid opacity-20 z-0"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h1 className="font-pixel text-4xl md:text-5xl text-white mb-6 neon-text">MEME WARRIORS</h1>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg">
              Discover and collect the most powerful meme warriors in the metaverse. Each warrior has unique abilities,
              stats, and a backstory.
            </p>
          </div>

          {/* Search and filters */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-md bg-purple-900/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Search warriors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="relative">
                <button
                  onClick={() => setFilterOpen(!filterOpen)}
                  className="flex items-center justify-center px-4 py-2 border border-gray-600 rounded-md bg-purple-900/50 text-white hover:bg-purple-800/50 transition-colors"
                >
                  <Filter className="h-5 w-5 mr-2" />
                  Filters
                  <ChevronDown className={`h-4 w-4 ml-2 transition-transform ${filterOpen ? "rotate-180" : ""}`} />
                </button>

                {filterOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-purple-900 border border-gray-700 rounded-md shadow-lg z-10 p-4">
                    <div className="mb-4">
                      <label className="block text-white text-sm font-medium mb-2">Rarity</label>
                      <select
                        className="w-full bg-purple-800 border border-gray-700 rounded px-3 py-2 text-white"
                        value={filters.rarity}
                        onChange={(e) => setFilters({ ...filters, rarity: e.target.value })}
                      >
                        {rarities.map((rarity) => (
                          <option key={rarity} value={rarity}>
                            {rarity}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-4">
                      <label className="block text-white text-sm font-medium mb-2">Class</label>
                      <select
                        className="w-full bg-purple-800 border border-gray-700 rounded px-3 py-2 text-white"
                        value={filters.class}
                        onChange={(e) => setFilters({ ...filters, class: e.target.value })}
                      >
                        {classes.map((cls) => (
                          <option key={cls} value={cls}>
                            {cls}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-4">
                      <label className="block text-white text-sm font-medium mb-2">Level Range</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          className="w-20 bg-purple-800 border border-gray-700 rounded px-3 py-2 text-white"
                          value={filters.minLevel}
                          onChange={(e) =>
                            setFilters({
                              ...filters,
                              minLevel: Math.min(Number.parseInt(e.target.value), filters.maxLevel),
                            })
                          }
                        />
                        <span className="text-white">to</span>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          className="w-20 bg-purple-800 border border-gray-700 rounded px-3 py-2 text-white"
                          value={filters.maxLevel}
                          onChange={(e) =>
                            setFilters({
                              ...filters,
                              maxLevel: Math.max(Number.parseInt(e.target.value), filters.minLevel),
                            })
                          }
                        />
                      </div>
                    </div>
                    <button
                      className="w-full bg-pink-600 hover:bg-pink-700 text-white font-medium py-2 px-4 rounded transition-colors"
                      onClick={() => setFilters({ rarity: "All", class: "All", minLevel: 0, maxLevel: 100 })}
                    >
                      Reset Filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Warriors grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredWarriors.length > 0 ? (
              filteredWarriors.map((warrior, index) => (
                <motion.div
                  key={warrior.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="arcade-card overflow-hidden h-full flex flex-col"
                >
                  <div className="h-2 bg-gradient-to-r from-pink-500 to-purple-500"></div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-2 border-pink-500">
                      <Image
                        src={`/abstract-geometric-shapes.png?height=128&width=128&query=${warrior.name} meme character`}
                        alt={warrior.name}
                        width={128}
                        height={128}
                        className="object-cover"
                      />
                    </div>

                    <h3 className="font-pixel text-white text-xl text-center mb-1">{warrior.name}</h3>
                    <p className="text-cyan-400 text-center text-sm mb-4">{warrior.class}</p>

                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div className="bg-purple-900/30 p-2 rounded">
                        <p className="text-xs text-gray-400">Power</p>
                        <p className="text-white font-bold">{warrior.power}</p>
                      </div>
                      <div className="bg-purple-900/30 p-2 rounded">
                        <p className="text-xs text-gray-400">Win Rate</p>
                        <p className="text-white font-bold">
                          {warrior.wins + warrior.losses > 0
                            ? ((warrior.wins / (warrior.wins + warrior.losses)) * 100).toFixed(1)
                            : "0.0"}
                          %
                        </p>
                      </div>
                      <div className="bg-purple-900/30 p-2 rounded">
                        <p className="text-xs text-gray-400">Rarity</p>
                        <p className="text-white font-bold">{warrior.rarity}</p>
                      </div>
                      <div className="bg-purple-900/30 p-2 rounded">
                        <p className="text-xs text-gray-400">Level</p>
                        <p className="text-white font-bold">{warrior.level}</p>
                      </div>
                    </div>

                    <p className="text-gray-300 text-sm mb-4 flex-grow line-clamp-3">{warrior.description}</p>

                    <div className="text-center mt-auto">
                      <Link href={`/memewarriors/${warrior.id}`} className="arcade-btn text-white text-sm inline-block">
                        VIEW DETAILS
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-300 text-xl mb-4">No warriors found matching your criteria</p>
                <button
                  className="arcade-btn text-white"
                  onClick={() => {
                    setSearchTerm("")
                    setFilters({ rarity: "All", class: "All", minLevel: 0, maxLevel: 100 })
                  }}
                >
                  RESET FILTERS
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
