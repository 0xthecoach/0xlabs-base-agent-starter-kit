"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Search, Filter, ChevronDown, Twitter, Globe } from "lucide-react"
import { BattleHeader } from "@/components/battle-header"
import { Badge } from "@/components/ui/badge"

// Define the type for the actual API response
interface TwitterAccount {
  id: number
  created_at: number
  project_id: number
  memewars_profile_id: number // Added this field
  Type_Account: string
  Username: string
  Account_Name: string
  Bio: string
  Platform: string
  Profile_Link: string
  Followers: number // Added this field
  Following: number // Added this field
  location_link: string
  website: string
  Joined: string
  Last_Sync: number
  avatar_url_: string
  cover_image_url: string
}

export default function MemeWarriorsPage() {
  const [accounts, setAccounts] = useState<TwitterAccount[]>([])
  const [filteredAccounts, setFilteredAccounts] = useState<TwitterAccount[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterOpen, setFilterOpen] = useState(false)
  const [filters, setFilters] = useState({
    platform: "All",
    minFollowers: 0,
    maxFollowers: 1000000,
  })

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const response = await fetch("https://xsjm-zu7p-vaky.n7.xano.io/api:ZETcPNiq/mwars_linked_accounts")

        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`)
        }

        const data = await response.json()
        console.log("API response:", data)
        setAccounts(data)
        setFilteredAccounts(data)
        setIsLoading(false)
      } catch (err) {
        console.error("Error fetching data:", err)
        setError(err instanceof Error ? err.message : "An unknown error occurred")
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  // Filter accounts based on search and filters
  useEffect(() => {
    if (accounts.length === 0) return

    const filtered = accounts.filter((account) => {
      // Search filter
      if (
        searchTerm &&
        !account.Account_Name?.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !account.Username?.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !account.Bio?.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false
      }

      // Platform filter
      if (filters.platform !== "All" && account.Platform !== filters.platform) {
        return false
      }

      // For followers filter, use actual Followers if available, otherwise use generated value
      const followerCount = account.Followers || getRandomFollowers(account.id)
      if (followerCount < filters.minFollowers || followerCount > filters.maxFollowers) {
        return false
      }

      return true
    })

    setFilteredAccounts(filtered)
  }, [searchTerm, filters, accounts])

  // Generate consistent random numbers for followers based on id
  const getRandomFollowers = (id: number): number => {
    // Use the id as a seed to get consistent random numbers
    const seed = id * 1000
    return seed + Math.floor((Math.sin(id) + 1) * 5000)
  }

  // Generate random numbers for engagement metrics
  const getRandomMetrics = (account: TwitterAccount) => {
    const followers = account.Followers || getRandomFollowers(account.id)
    const following = account.Following || Math.floor(followers * 0.3 + account.id * 10)

    return {
      followers,
      following,
      tweets: Math.floor(followers * 0.2 + account.id * 5),
      replies: Math.floor(followers * 0.05 + account.id),
      retweets: Math.floor(followers * 0.1 + account.id * 2),
      likes: Math.floor(followers * 0.15 + account.id * 3),
      views: followers * 5 + account.id * 100,
    }
  }

  // Format number with k, M suffix
  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M"
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K"
    }
    return num.toString()
  }

  // Format date to relative time
  const formatDate = (timestamp: number): string => {
    try {
      const date = new Date(timestamp)
      if (isNaN(date.getTime())) {
        return "Invalid date"
      }

      const now = new Date()
      const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

      if (diffInSeconds < 60) {
        return `${diffInSeconds}s`
      }

      const diffInMinutes = Math.floor(diffInSeconds / 60)
      if (diffInMinutes < 60) {
        return `${diffInMinutes}m`
      }

      const diffInHours = Math.floor(diffInMinutes / 60)
      if (diffInHours < 24) {
        return `${diffInHours}h`
      }

      const diffInDays = Math.floor(diffInHours / 24)
      if (diffInDays < 30) {
        return `${diffInDays}d`
      }

      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
      return `${months[date.getMonth()]} ${date.getDate()}`
    } catch (error) {
      console.error("Error formatting date:", error)
      return "Unknown"
    }
  }

  // Get unique platforms for filter options
  const platforms = ["All", ...new Set(accounts.map((account) => account.Platform).filter(Boolean))]

  return (
    <div>
      <BattleHeader
        title="MEME WARRIORS"
        description="Discover and connect with the most powerful meme warriors in the metaverse. Each warrior has a unique social presence and influence."
        backgroundImage="/images/memewarriors-bg.png"
      />

      <div className="container mx-auto px-4 py-16">
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
                placeholder="Search accounts..."
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
                    <label className="block text-white text-sm font-medium mb-2">Platform</label>
                    <select
                      className="w-full bg-purple-800 border border-gray-700 rounded px-3 py-2 text-white"
                      value={filters.platform}
                      onChange={(e) => setFilters({ ...filters, platform: e.target.value })}
                    >
                      {platforms.map((platform) => (
                        <option key={platform} value={platform}>
                          {platform || "Unknown"}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-white text-sm font-medium mb-2">Followers Range</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="0"
                        max="1000000"
                        className="w-24 bg-purple-800 border border-gray-700 rounded px-3 py-2 text-white"
                        value={filters.minFollowers}
                        onChange={(e) =>
                          setFilters({
                            ...filters,
                            minFollowers: Math.min(Number.parseInt(e.target.value) || 0, filters.maxFollowers),
                          })
                        }
                      />
                      <span className="text-white">to</span>
                      <input
                        type="number"
                        min="0"
                        max="1000000"
                        className="w-24 bg-purple-800 border border-gray-700 rounded px-3 py-2 text-white"
                        value={filters.maxFollowers}
                        onChange={(e) =>
                          setFilters({
                            ...filters,
                            maxFollowers: Math.max(Number.parseInt(e.target.value) || 0, filters.minFollowers),
                          })
                        }
                      />
                    </div>
                  </div>
                  <button
                    className="w-full bg-pink-600 hover:bg-pink-700 text-white font-medium py-2 px-4 rounded transition-colors"
                    onClick={() => setFilters({ platform: "All", minFollowers: 0, maxFollowers: 1000000 })}
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="text-center py-12">
            <p className="text-red-400 text-xl mb-4">Error loading data: {error}</p>
            <button className="arcade-btn text-white" onClick={() => window.location.reload()}>
              RETRY
            </button>
          </div>
        )}

        {/* Warrior cards grid - THREE COLUMNS */}
        {!isLoading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAccounts.length > 0 ? (
              filteredAccounts.map((account, index) => {
                // Generate metrics for this account
                const metrics = getRandomMetrics(account)
                // Check if account is verified (for demo, we'll consider accounts with "GOD" in the name as verified)
                const isVerified = account.Account_Name?.includes("GOD") || account.Username?.includes("GOD")

                // Generate a random rarity for demo purposes
                const rarities = ["Legendary", "Epic", "Rare", "Common"]
                const randomRarity = rarities[account.id % rarities.length]

                return (
                  <motion.div
                    key={account.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="arcade-card overflow-hidden h-full flex flex-col"
                  >
                    {/* Card header with cover image */}
                    <div className="relative h-32 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/50 to-pink-900/50">
                        <img
                          src={account.cover_image_url || "/images/header-background.png"}
                          alt="Cover"
                          className="w-full h-full object-cover opacity-80"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                        <div className="absolute inset-0 retro-grid opacity-30"></div>
                      </div>
                    </div>

                    {/* Profile section */}
                    <div className="relative -mt-10 px-6 pt-0 pb-6 flex flex-col flex-1">
                      {/* Avatar */}
                      <div className="relative mx-auto">
                        <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-purple-600 glow-effect">
                          <img
                            src={account.avatar_url_ || "/abstract-profile.png"}
                            alt={account.Account_Name || "User"}
                            width={80}
                            height={80}
                            className="w-full h-full object-cover"
                            style={{ imageRendering: "crisp-edges" }}
                            onError={(e) => {
                              e.currentTarget.src = "/abstract-profile.png"
                            }}
                          />
                        </div>
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-xs font-pixel px-2 py-1 rounded">
                          {randomRarity}
                        </div>
                      </div>

                      {/* Profile info */}
                      <div className="text-center mt-3">
                        <div className="flex items-center justify-center gap-2 mb-1">
                          <h3 className="font-pixel text-white text-xl">{account.Account_Name || "Unknown User"}</h3>
                          {isVerified && <Badge className="bg-blue-600 hover:bg-blue-700">Verified</Badge>}
                        </div>
                        <p className="text-cyan-400 text-sm mb-3">
                          <a
                            href={`https://x.com/${account.Username || ""}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline transition-all"
                            onClick={(e) => !account.Username && e.preventDefault()}
                          >
                            @{account.Username || "username"}
                          </a>
                        </p>

                        {/* Bio */}
                        <p className="text-gray-300 text-sm mb-4 line-clamp-2">{account.Bio || "No bio available."}</p>
                      </div>

                      {/* Stats */}
                      <div className="flex justify-center gap-6 mb-4">
                        <div className="text-center">
                          <div className="text-lg font-bold text-white">{formatNumber(metrics.followers)}</div>
                          <div className="text-xs text-gray-400">Followers</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-white">{formatNumber(metrics.following)}</div>
                          <div className="text-xs text-gray-400">Following</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-white">
                            {formatNumber(metrics.likes || metrics.tweets * 5)}
                          </div>
                          <div className="text-xs text-gray-400">Likes</div>
                        </div>
                      </div>

                      {/* Social Links */}
                      <div className="flex justify-center gap-4 mb-4">
                        <div className="flex items-center text-cyan-400">
                          <Twitter className="w-4 h-4 mr-1" />
                          <span className="text-sm">@{account.Username || "username"}</span>
                        </div>
                        {account.website && (
                          <div className="flex items-center text-cyan-400">
                            <Globe className="w-4 h-4 mr-1" />
                            <span className="text-sm">{account.website.replace(/^https?:\/\//, "")}</span>
                          </div>
                        )}
                      </div>

                      {/* View details button */}
                      <div className="text-center mt-auto">
                        <Link
                          href={`/memewarriors/${account.memewars_profile_id}`}
                          className="arcade-btn text-white text-sm inline-block"
                          prefetch={true}
                          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                        >
                          VIEW DETAILS
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )
              })
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-300 text-xl mb-4">No accounts found matching your criteria</p>
                <button
                  className="arcade-btn text-white"
                  onClick={() => {
                    setSearchTerm("")
                    setFilters({ platform: "All", minFollowers: 0, maxFollowers: 1000000 })
                  }}
                >
                  RESET FILTERS
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
