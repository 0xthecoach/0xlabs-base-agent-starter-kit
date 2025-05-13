import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { memeWarriors } from "@/lib/data"

export const metadata: Metadata = {
  title: "My Profile | MemeWars",
  description: "View and manage your MemeWars profile",
}

// Mock user data
const userData = {
  username: "MemeKing420",
  avatar: "/images/avatars/player1.png",
  level: 50,
  xp: {
    current: 25000,
    nextLevel: 30000,
  },
  joinDate: "2024-01-15",
  rank: 1,
  stats: {
    wins: 520,
    losses: 180,
    winRate: 74.3,
    tournamentsWon: 5,
    questsCompleted: 42,
    totalBattles: 700,
  },
  wallet: {
    coins: 25000,
    premium: 500,
  },
  collection: {
    warriors: 18,
    items: 36,
    totalValue: 125000,
  },
  achievements: [
    {
      id: 1,
      name: "Season Champion",
      description: "Win a seasonal championship tournament",
      image: "/images/quest-icon-1.png",
      date: "2024-03-31",
    },
    {
      id: 2,
      name: "1000 Battles",
      description: "Participate in 1000 battles",
      image: "/images/quest-icon-2.png",
      date: "2024-04-15",
    },
    {
      id: 3,
      name: "Legendary Collection",
      description: "Collect all legendary warriors",
      image: "/images/quest-icon-3.png",
      date: "2024-02-28",
    },
    {
      id: 4,
      name: "Meme Master",
      description: "Complete all quests in a season",
      image: "/images/quest-icon-4.png",
      date: "2024-03-15",
    },
  ],
  recentActivity: [
    {
      id: 1,
      type: "battle",
      description: "Won a battle against DogeWarrior",
      time: "5 mins ago",
      rewards: "+250 XP, +125 Coins",
    },
    {
      id: 2,
      type: "purchase",
      description: "Purchased Epic Helmet from Marketplace",
      time: "2 hours ago",
      cost: "-3200 Coins",
    },
    {
      id: 3,
      type: "quest",
      description: "Completed 'Social Media Warrior' quest",
      time: "5 hours ago",
      rewards: "+100 XP, +50 Coins, Common Loot Box",
    },
    {
      id: 4,
      type: "tournament",
      description: "Registered for 'Weekly Meme Showdown'",
      time: "1 day ago",
      cost: "-100 Coins",
    },
    {
      id: 5,
      type: "level",
      description: "Reached Level 50",
      time: "2 days ago",
      rewards: "+500 Coins, Legendary Loot Box",
    },
  ],
  ownedWarriors: memeWarriors ? memeWarriors.slice(0, 6) : [], // First 6 warriors from the mock data
}

export default function ProfilePage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-pixel mb-4 neon-text">MY PROFILE</h1>
        <p className="text-lg max-w-3xl mx-auto">
          View your stats, collection, achievements, and manage your MemeWars account.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Profile Card */}
          <div className="arcade-card p-6 text-center">
            <div className="relative mx-auto w-32 h-32 mb-4">
              <div className="absolute inset-0 rounded-full border-4 border-pink-500 animate-pulse-slow"></div>
              <div className="absolute inset-2 rounded-full border-2 border-cyan-400 animate-pulse-slow animation-delay-500"></div>
              <div className="w-full h-full rounded-full overflow-hidden border-2 border-white">
                <Image
                  src={userData.avatar || "/placeholder.svg?height=128&width=128&query=pixel art avatar"}
                  alt={userData.username}
                  width={128}
                  height={128}
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-pink-600 rounded-full w-10 h-10 flex items-center justify-center border-2 border-black">
                <span className="font-pixel text-white">{userData.level}</span>
              </div>
            </div>

            <h2 className="font-pixel text-2xl text-white mb-2">{userData.username}</h2>
            <div className="inline-block px-3 py-1 rounded bg-gradient-to-r from-yellow-500 to-amber-600 text-black font-pixel text-sm mb-4">
              Rank #{userData.rank}
            </div>

            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-400">Level {userData.level}</span>
                <span className="text-gray-400">
                  {userData.xp.current}/{userData.xp.nextLevel} XP
                </span>
              </div>
              <div className="relative h-3 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-pink-600 to-purple-600"
                  style={{ width: `${(userData.xp.current / userData.xp.nextLevel) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="text-sm text-gray-400">Member since {new Date(userData.joinDate).toLocaleDateString()}</div>
          </div>

          {/* Wallet */}
          <div className="arcade-card p-6">
            <h3 className="font-pixel text-xl mb-4 text-center text-pink-400">WALLET</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-black/30 p-3 rounded text-center">
                <span className="text-gray-400 text-sm">COINS</span>
                <div className="font-pixel text-yellow-400 text-xl">{userData.wallet.coins.toLocaleString()}</div>
              </div>
              <div className="bg-black/30 p-3 rounded text-center">
                <span className="text-gray-400 text-sm">PREMIUM</span>
                <div className="font-pixel text-purple-400 text-xl">{userData.wallet.premium.toLocaleString()}</div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <button className="arcade-btn text-white text-sm">BUY COINS</button>
              <button className="arcade-btn text-white text-sm">SHOP</button>
            </div>
          </div>

          {/* Collection Summary */}
          <div className="arcade-card p-6">
            <h3 className="font-pixel text-xl mb-4 text-center text-pink-400">COLLECTION</h3>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="bg-black/30 p-3 rounded text-center">
                <span className="text-gray-400 text-sm">WARRIORS</span>
                <div className="font-pixel text-white text-xl">{userData.collection.warriors}</div>
              </div>
              <div className="bg-black/30 p-3 rounded text-center">
                <span className="text-gray-400 text-sm">ITEMS</span>
                <div className="font-pixel text-white text-xl">{userData.collection.items}</div>
              </div>
              <div className="bg-black/30 p-3 rounded text-center">
                <span className="text-gray-400 text-sm">VALUE</span>
                <div className="font-pixel text-yellow-400 text-xl">
                  {(userData.collection.totalValue / 1000).toFixed(1)}K
                </div>
              </div>
            </div>
            <Link href="/collection" className="arcade-btn text-white text-sm w-full">
              VIEW COLLECTION
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats */}
          <div className="arcade-card p-6">
            <h3 className="font-pixel text-xl mb-4 text-center text-pink-400">BATTLE STATS</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-black/30 p-3 rounded text-center">
                <span className="text-gray-400 text-sm">WINS</span>
                <div className="font-pixel text-green-400 text-xl">{userData.stats.wins}</div>
              </div>
              <div className="bg-black/30 p-3 rounded text-center">
                <span className="text-gray-400 text-sm">LOSSES</span>
                <div className="font-pixel text-red-400 text-xl">{userData.stats.losses}</div>
              </div>
              <div className="bg-black/30 p-3 rounded text-center">
                <span className="text-gray-400 text-sm">WIN RATE</span>
                <div className="font-pixel text-white text-xl">{userData.stats.winRate}%</div>
              </div>
              <div className="bg-black/30 p-3 rounded text-center">
                <span className="text-gray-400 text-sm">TOTAL BATTLES</span>
                <div className="font-pixel text-white text-xl">{userData.stats.totalBattles}</div>
              </div>
              <div className="bg-black/30 p-3 rounded text-center">
                <span className="text-gray-400 text-sm">TOURNAMENTS WON</span>
                <div className="font-pixel text-yellow-400 text-xl">{userData.stats.tournamentsWon}</div>
              </div>
              <div className="bg-black/30 p-3 rounded text-center">
                <span className="text-gray-400 text-sm">QUESTS COMPLETED</span>
                <div className="font-pixel text-cyan-400 text-xl">{userData.stats.questsCompleted}</div>
              </div>
            </div>
          </div>

          {/* Owned Warriors */}
          <div className="arcade-card p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-pixel text-xl text-pink-400">MY WARRIORS</h3>
              <Link href="/collection" className="text-sm text-pink-400 hover:text-pink-300">
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {userData.ownedWarriors.map((warrior) => (
                <div
                  key={warrior.id}
                  className="bg-black/30 p-3 rounded border border-pink-500/30 hover:border-pink-500 hover:bg-black/50 transition-all"
                >
                  <div className="relative">
                    <div className="absolute top-0 right-0">
                      <span
                        className={`font-pixel text-xs px-2 py-1 rounded ${
                          warrior.rarity === "Legendary"
                            ? "bg-yellow-500/80"
                            : warrior.rarity === "Epic"
                              ? "bg-purple-500/80"
                              : "bg-blue-500/80"
                        }`}
                      >
                        {warrior.rarity}
                      </span>
                    </div>
                    <div className="h-24 flex items-center justify-center mb-2">
                      <Image
                        src={warrior.image || "/placeholder.svg?height=80&width=80&query=pixel art meme character"}
                        alt={warrior.name}
                        width={80}
                        height={80}
                        className="object-cover"
                      />
                    </div>
                    <h4 className="font-pixel text-center text-white">{warrior.name}</h4>
                    <div className="text-center text-xs text-gray-400">Level {warrior.level}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="arcade-card p-6">
            <h3 className="font-pixel text-xl mb-4 text-center text-pink-400">ACHIEVEMENTS</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {userData.achievements.map((achievement) => (
                <div key={achievement.id} className="flex bg-black/30 p-3 rounded">
                  <div className="flex-shrink-0 mr-3">
                    <Image
                      src={achievement.image || "/placeholder.svg?height=50&width=50&query=achievement badge"}
                      alt={achievement.name}
                      width={50}
                      height={50}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-pixel text-white">{achievement.name}</h4>
                    <p className="text-xs text-gray-400">{achievement.description}</p>
                    <div className="text-xs text-pink-400 mt-1">
                      Unlocked: {new Date(achievement.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="arcade-card p-6">
            <h3 className="font-pixel text-xl mb-4 text-center text-pink-400">RECENT ACTIVITY</h3>
            <div className="space-y-3">
              {userData.recentActivity.map((activity) => (
                <div key={activity.id} className="bg-black/30 p-3 rounded">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-pixel text-white">{activity.description}</h4>
                      <div className="text-xs text-gray-400">{activity.time}</div>
                    </div>
                    <div className={`text-sm ${activity.rewards ? "text-green-400" : "text-red-400"}`}>
                      {activity.rewards || activity.cost}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
