import type { Metadata } from "next"
import Image from "next/image"
import { leaderboardData } from "@/lib/data"
import { PageHeader } from "@/components/page-header"
import FeaturedWarriors from "@/components/featured-warriors"

export const metadata: Metadata = {
  title: "Leaderboard | MemeWars",
  description: "View the top players in MemeWars",
}

export default function LeaderboardPage() {
  // Ensure leaderboardData exists and has items
  const safeLeaderboardData = leaderboardData || []

  return (
    <div>
      <PageHeader
        title="LEADERBOARD"
        description="The top MemeWars players ranked by season points. Compete to climb the ranks and earn exclusive rewards!"
      />

      <div className="container mx-auto px-4 py-16">
        {/* Season Info */}
        <div className="arcade-card p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <h3 className="font-pixel text-xl mb-2 text-pink-400">CURRENT SEASON</h3>
              <div className="font-pixel text-2xl text-white">Season 2: Meme Revolution</div>
              <div className="text-sm text-gray-400 mt-1">Ends in 24 days, 12 hours</div>
            </div>
            <div className="text-center">
              <h3 className="font-pixel text-xl mb-2 text-pink-400">YOUR RANK</h3>
              <div className="font-pixel text-2xl text-white">#42</div>
              <div className="text-sm text-gray-400 mt-1">Top 5% of players</div>
            </div>
            <div className="text-center">
              <h3 className="font-pixel text-xl mb-2 text-pink-400">YOUR POINTS</h3>
              <div className="font-pixel text-2xl text-white">7,850</div>
              <div className="text-sm text-gray-400 mt-1">+1,250 from last week</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="arcade-card p-4 mb-8">
          <div className="flex flex-wrap gap-4 justify-between">
            <div className="flex items-center">
              <span className="text-white mr-2 font-pixel">SEASON:</span>
              <select className="bg-black/50 text-white border border-pink-500 rounded px-3 py-2">
                <option value="current">Season 2: Meme Revolution</option>
                <option value="previous">Season 1: Genesis</option>
                <option value="all-time">All Time</option>
              </select>
            </div>
            <div className="flex items-center">
              <span className="text-white mr-2 font-pixel">FILTER:</span>
              <select className="bg-black/50 text-white border border-pink-500 rounded px-3 py-2">
                <option value="all">All Players</option>
                <option value="friends">Friends Only</option>
                <option value="guild">Guild Members</option>
              </select>
            </div>
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Search players..."
                className="bg-black/50 text-white border border-pink-500 rounded px-3 py-2 w-full"
              />
            </div>
          </div>
        </div>

        {/* Top Players - Using the same FeaturedWarriors component as home page */}
        <FeaturedWarriors />

        {/* Leaderboard Table */}
        <div className="arcade-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-purple-900/50 border-b border-pink-500/50">
                  <th className="font-pixel text-white text-left p-4">RANK</th>
                  <th className="font-pixel text-white text-left p-4">PLAYER</th>
                  <th className="font-pixel text-white text-center p-4">LEVEL</th>
                  <th className="font-pixel text-white text-center p-4">WINS</th>
                  <th className="font-pixel text-white text-center p-4">WIN RATE</th>
                  <th className="font-pixel text-white text-center p-4">POINTS</th>
                </tr>
              </thead>
              <tbody>
                {safeLeaderboardData.map((player) => (
                  <tr
                    key={player.rank}
                    className={`border-b border-pink-500/20 hover:bg-purple-900/30 transition-colors ${
                      player.rank <= 3 ? "bg-black/40" : ""
                    }`}
                  >
                    <td className="p-4">
                      <span
                        className={`font-pixel ${
                          player.rank === 1
                            ? "text-yellow-400"
                            : player.rank === 2
                              ? "text-gray-300"
                              : player.rank === 3
                                ? "text-amber-700"
                                : "text-white"
                        }`}
                      >
                        #{player.rank}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full overflow-hidden mr-3 border border-pink-500/50">
                          <Image
                            src={player.avatar || "/placeholder.svg?height=40&width=40&query=avatar"}
                            alt={player.username}
                            width={40}
                            height={40}
                            className="object-cover"
                          />
                        </div>
                        <span className="text-white">{player.username}</span>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <span className="text-white">{player.level}</span>
                    </td>
                    <td className="p-4 text-center">
                      <span className="text-green-400">{player.wins}</span>
                    </td>
                    <td className="p-4 text-center">
                      <span className="text-cyan-400">{player.winRate}%</span>
                    </td>
                    <td className="p-4 text-center">
                      <span className="font-pixel text-yellow-400">{player.seasonPoints?.toLocaleString() || "0"}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8">
          <div className="flex space-x-2">
            <button className="w-8 h-8 flex items-center justify-center font-pixel text-white bg-pink-600 rounded">
              1
            </button>
            <button className="w-8 h-8 flex items-center justify-center font-pixel text-white bg-black/30 rounded border border-pink-500/30 hover:bg-pink-900/30">
              2
            </button>
            <button className="w-8 h-8 flex items-center justify-center font-pixel text-white bg-black/30 rounded border border-pink-500/30 hover:bg-pink-900/30">
              3
            </button>
            <span className="w-8 h-8 flex items-center justify-center font-pixel text-white">...</span>
            <button className="w-8 h-8 flex items-center justify-center font-pixel text-white bg-black/30 rounded border border-pink-500/30 hover:bg-pink-900/30">
              10
            </button>
          </div>
        </div>

        {/* Season Rewards */}
        <div className="mt-12">
          <h2 className="text-3xl font-pixel mb-6 text-center text-pink-400">SEASON REWARDS</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="arcade-card p-6 text-center">
              <h3 className="font-pixel text-xl mb-4 text-yellow-400">TOP 10</h3>
              <div className="bg-gradient-to-b from-yellow-900/30 to-yellow-600/30 p-4 rounded-lg mb-4">
                <Image
                  src="/placeholder-orm50.png"
                  alt="Legendary Reward"
                  width={100}
                  height={100}
                  className="object-contain mx-auto"
                />
              </div>
              <ul className="text-sm space-y-2 text-left">
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">•</span>
                  <span className="text-white">Exclusive Legendary MemeWarrior</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">•</span>
                  <span className="text-white">10,000 Coins</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">•</span>
                  <span className="text-white">Season 2 Champion Title</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">•</span>
                  <span className="text-white">Legendary Profile Frame</span>
                </li>
              </ul>
            </div>
            <div className="arcade-card p-6 text-center">
              <h3 className="font-pixel text-xl mb-4 text-purple-400">TOP 100</h3>
              <div className="bg-gradient-to-b from-purple-900/30 to-purple-600/30 p-4 rounded-lg mb-4">
                <Image
                  src="/placeholder-sy0i3.png"
                  alt="Epic Reward"
                  width={100}
                  height={100}
                  className="object-contain mx-auto"
                />
              </div>
              <ul className="text-sm space-y-2 text-left">
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">•</span>
                  <span className="text-white">Epic MemeWarrior</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">•</span>
                  <span className="text-white">5,000 Coins</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">•</span>
                  <span className="text-white">Season 2 Elite Title</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">•</span>
                  <span className="text-white">Epic Profile Frame</span>
                </li>
              </ul>
            </div>
            <div className="arcade-card p-6 text-center">
              <h3 className="font-pixel text-xl mb-4 text-blue-400">TOP 1000</h3>
              <div className="bg-gradient-to-b from-blue-900/30 to-blue-600/30 p-4 rounded-lg mb-4">
                <Image
                  src="/placeholder-dnxgt.png"
                  alt="Rare Reward"
                  width={100}
                  height={100}
                  className="object-contain mx-auto"
                />
              </div>
              <ul className="text-sm space-y-2 text-left">
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span className="text-white">Rare MemeWarrior</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span className="text-white">2,500 Coins</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span className="text-white">Season 2 Veteran Title</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span className="text-white">Rare Profile Frame</span>
                </li>
              </ul>
            </div>
            <div className="arcade-card p-6 text-center">
              <h3 className="font-pixel text-xl mb-4 text-gray-400">ALL PARTICIPANTS</h3>
              <div className="bg-gradient-to-b from-gray-900/30 to-gray-600/30 p-4 rounded-lg mb-4">
                <Image
                  src="/placeholder-vinf8.png"
                  alt="Common Reward"
                  width={100}
                  height={100}
                  className="object-contain mx-auto"
                />
              </div>
              <ul className="text-sm space-y-2 text-left">
                <li className="flex items-start">
                  <span className="text-gray-400 mr-2">•</span>
                  <span className="text-white">Common MemeWarrior</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-400 mr-2">•</span>
                  <span className="text-white">1,000 Coins</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-400 mr-2">•</span>
                  <span className="text-white">Season 2 Participant Title</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-400 mr-2">•</span>
                  <span className="text-white">Common Profile Frame</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
