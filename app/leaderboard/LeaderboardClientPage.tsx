"use client"

import { BattleHeader } from "@/components/battle-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"

// Mock leaderboard data for season rankings
const seasonLeaderboardData = [
  {
    rank: 1,
    avatar: "/images/avatars/player1.png",
    name: "MemeKing420",
    level: 42,
    wins: 158,
    losses: 23,
    points: 12845,
    streak: 12,
    warriorCount: 8,
    title: "Meme God",
  },
  {
    rank: 2,
    avatar: "/images/avatars/player2.png",
    name: "DogeWarrior",
    level: 39,
    wins: 143,
    losses: 31,
    points: 11560,
    streak: 5,
    warriorCount: 7,
    title: "Doge Master",
  },
  {
    rank: 3,
    avatar: "/images/avatars/player3.png",
    name: "PepeHands",
    level: 37,
    wins: 129,
    losses: 38,
    points: 10280,
    streak: 8,
    warriorCount: 6,
    title: "Frog Whisperer",
  },
  {
    rank: 4,
    avatar: "/images/avatars/player4.png",
    name: "StonksOnly",
    level: 36,
    wins: 124,
    losses: 42,
    points: 9840,
    streak: 3,
    warriorCount: 6,
    title: "Market Maven",
  },
  {
    rank: 5,
    avatar: "/images/avatars/player5.png",
    name: "GigaChad69",
    level: 35,
    wins: 121,
    losses: 39,
    points: 9520,
    streak: 7,
    warriorCount: 5,
    title: "Alpha Legend",
  },
  {
    rank: 6,
    avatar: "/images/avatars/player6.png",
    name: "MoonBoi",
    level: 33,
    wins: 112,
    losses: 45,
    points: 8760,
    streak: 0,
    warriorCount: 5,
    title: "Lunar Lunatic",
  },
  {
    rank: 7,
    avatar: "/images/avatars/player7.png",
    name: "WojakFeels",
    level: 32,
    wins: 108,
    losses: 47,
    points: 8480,
    streak: 4,
    warriorCount: 4,
    title: "Emotion Lord",
  },
  {
    rank: 8,
    avatar: "/images/avatars/player8.png",
    name: "CheemsBonk",
    level: 31,
    wins: 106,
    losses: 51,
    points: 8230,
    streak: 2,
    warriorCount: 4,
    title: "Doge Knight",
  },
  {
    rank: 9,
    avatar: "/images/avatars/player9.png",
    name: "DiamondHands",
    level: 30,
    wins: 101,
    losses: 49,
    points: 7980,
    streak: 0,
    warriorCount: 4,
    title: "Hodl Master",
  },
  {
    rank: 10,
    avatar: "/images/avatars/player10.png",
    name: "SurprisedMemer",
    level: 28,
    wins: 94,
    losses: 53,
    points: 7420,
    streak: 1,
    warriorCount: 3,
    title: "Shock Trooper",
  },
]

// Mock data for user's current rank
const currentUserRank = {
  rank: 42,
  points: 3250,
  nextRank: {
    rank: 41,
    name: "CryptoKing",
    points: 3400,
    pointsNeeded: 150,
  },
}

export default function LeaderboardClientPage() {
  return (
    <div>
      <BattleHeader
        title="LEADERBOARD"
        description="The top MemeWars players ranked by season points. Compete to climb the ranks and earn exclusive rewards!"
        backgroundImage="/images/leaderboard-bg.png"
      />

      <div className="container mx-auto px-4 py-16">
        {/* User's current rank card */}
        <div className="arcade-card p-6 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <div className="text-center md:text-left">
              <h3 className="font-pixel text-xl mb-2 text-pink-400">CURRENT SEASON</h3>
              <p className="text-gray-300">Season 3: Rise of the Memes</p>
              <p className="text-gray-400 text-sm">Ends in 18 days</p>
            </div>

            <div className="text-center">
              <h3 className="font-pixel text-xl mb-2 text-pink-400">YOUR RANK</h3>
              <div className="inline-flex items-center">
                <span className="font-pixel text-4xl text-white">{currentUserRank.rank}</span>
                <span className="ml-2 px-2 py-1 bg-pink-500/30 rounded text-xs">
                  {currentUserRank.nextRank.pointsNeeded} points to rank {currentUserRank.nextRank.rank}
                </span>
              </div>
            </div>

            <div className="text-center md:text-right">
              <h3 className="font-pixel text-xl mb-2 text-pink-400">YOUR POINTS</h3>
              <p className="font-pixel text-4xl text-yellow-400">{currentUserRank.points}</p>
            </div>
          </div>
        </div>

        {/* Leaderboard tabs */}
        <Tabs defaultValue="season" className="mb-8">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="season" className="text-lg font-pixel">
              SEASON
            </TabsTrigger>
            <TabsTrigger value="weekly" className="text-lg font-pixel">
              WEEKLY
            </TabsTrigger>
            <TabsTrigger value="all-time" className="text-lg font-pixel">
              ALL TIME
            </TabsTrigger>
          </TabsList>

          {/* Season leaderboard content */}
          <TabsContent value="season" className="pt-4">
            <div className="arcade-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-purple-900/50 border-b border-pink-500/50">
                      <th className="font-pixel text-center p-4">RANK</th>
                      <th className="font-pixel text-left p-4">PLAYER</th>
                      <th className="font-pixel text-center p-4">LEVEL</th>
                      <th className="font-pixel text-center p-4">W/L</th>
                      <th className="font-pixel text-center p-4">STREAK</th>
                      <th className="font-pixel text-center p-4">WARRIORS</th>
                      <th className="font-pixel text-center p-4">POINTS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {seasonLeaderboardData.map((player, index) => (
                      <motion.tr
                        key={player.rank}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className={`border-b border-pink-500/20 hover:bg-purple-900/30 transition-colors ${
                          player.rank <= 3 ? "bg-purple-900/40" : ""
                        }`}
                      >
                        <td className="p-4 text-center">
                          <div
                            className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-pixel 
                            ${player.rank === 1 ? "bg-yellow-500 text-black" : ""}
                            ${player.rank === 2 ? "bg-gray-300 text-black" : ""}
                            ${player.rank === 3 ? "bg-amber-700 text-white" : ""}
                            ${player.rank > 3 ? "bg-purple-900/50 text-white" : ""}
                            `}
                          >
                            {player.rank}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full overflow-hidden mr-3 border border-pink-500/50">
                              <img
                                src={player.avatar || "/placeholder.svg"}
                                alt={player.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <div className="text-white font-medium">{player.name}</div>
                              <div className="text-xs text-gray-400">{player.title}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-center">
                          <div className="text-cyan-400 font-pixel">{player.level}</div>
                        </td>
                        <td className="p-4 text-center">
                          <div>
                            <span className="text-green-400">{player.wins}</span>
                            <span className="text-gray-400">/</span>
                            <span className="text-red-400">{player.losses}</span>
                          </div>
                          <div className="text-xs text-gray-400">
                            {Math.round((player.wins / (player.wins + player.losses)) * 100)}% win rate
                          </div>
                        </td>
                        <td className="p-4 text-center">
                          <div
                            className={`font-pixel ${
                              player.streak > 0
                                ? "text-green-400"
                                : player.streak < 0
                                  ? "text-red-400"
                                  : "text-gray-400"
                            }`}
                          >
                            {player.streak > 0 ? `+${player.streak}` : player.streak}
                          </div>
                        </td>
                        <td className="p-4 text-center">
                          <div className="text-white">{player.warriorCount}</div>
                        </td>
                        <td className="p-4 text-center">
                          <div className="font-pixel text-yellow-400">{player.points.toLocaleString()}</div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex justify-center mt-8">
              <div className="inline-flex rounded-md">
                <button className="arcade-btn-small bg-purple-900/30">PREVIOUS</button>
                <div className="flex items-center px-4 bg-purple-900/50 border-t border-b border-pink-500/30">
                  <span className="text-white font-pixel">PAGE 1 OF 12</span>
                </div>
                <button className="arcade-btn-small bg-purple-900/30">NEXT</button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="weekly" className="pt-4">
            <div className="arcade-card p-10 text-center">
              <h3 className="text-2xl font-pixel text-white mb-4">Weekly Leaderboard</h3>
              <p className="text-gray-300 mb-4">The weekly leaderboard resets every Monday at 00:00 UTC.</p>
              <p className="text-gray-400">Next reset in: 2 days, 14 hours</p>
            </div>
          </TabsContent>

          <TabsContent value="all-time" className="pt-4">
            <div className="arcade-card p-10 text-center">
              <h3 className="text-2xl font-pixel text-white mb-4">All-Time Leaderboard</h3>
              <p className="text-gray-300 mb-4">
                The all-time leaderboard shows the best players since the game began.
              </p>
              <p className="text-gray-400">Compete to earn your place in MemeWars history!</p>
            </div>
          </TabsContent>
        </Tabs>

        {/* Season rewards */}
        <div className="mt-16">
          <h2 className="text-3xl font-pixel mb-6 text-center text-pink-400">SEASON REWARDS</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="arcade-card overflow-hidden">
              <div className="bg-yellow-500/30 py-2 text-center">
                <h3 className="font-pixel text-yellow-400">TOP 3 PLAYERS</h3>
              </div>
              <div className="p-6 text-center">
                <h4 className="font-pixel text-white text-lg mb-2">Legendary Meme Warrior</h4>
                <p className="text-gray-300 mb-4">Exclusive legendary warrior with unique abilities</p>
                <ul className="text-sm text-gray-400 space-y-2">
                  <li>10,000 Meme Coins</li>
                  <li>Exclusive "Meme Legend" Title</li>
                  <li>Unique Profile Banner</li>
                  <li>Special Arena Animation</li>
                </ul>
              </div>
            </div>

            <div className="arcade-card overflow-hidden">
              <div className="bg-purple-600/30 py-2 text-center">
                <h3 className="font-pixel text-purple-400">TOP 4-10 PLAYERS</h3>
              </div>
              <div className="p-6 text-center">
                <h4 className="font-pixel text-white text-lg mb-2">Epic Meme Warrior</h4>
                <p className="text-gray-300 mb-4">Powerful warrior with rare abilities</p>
                <ul className="text-sm text-gray-400 space-y-2">
                  <li>5,000 Meme Coins</li>
                  <li>"Meme Elite" Title</li>
                  <li>Epic Profile Frame</li>
                  <li>Battle Emotes Pack</li>
                </ul>
              </div>
            </div>

            <div className="arcade-card overflow-hidden">
              <div className="bg-blue-600/30 py-2 text-center">
                <h3 className="font-pixel text-blue-400">TOP 11-50 PLAYERS</h3>
              </div>
              <div className="p-6 text-center">
                <h4 className="font-pixel text-white text-lg mb-2">Rare Meme Warrior</h4>
                <p className="text-gray-300 mb-4">Unique warrior with special perks</p>
                <ul className="text-sm text-gray-400 space-y-2">
                  <li>2,500 Meme Coins</li>
                  <li>"Meme Contender" Title</li>
                  <li>Special Profile Avatar</li>
                  <li>Season 3 Loot Box</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
