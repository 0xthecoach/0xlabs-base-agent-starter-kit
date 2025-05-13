"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Image from "next/image"
import Link from "next/link"
import { Trophy } from "lucide-react"

const topPlayers = [
  {
    rank: 1,
    name: "MemeKing420",
    score: 12450,
    avatar: "/images/avatars/player1.png",
    warriors: 42,
  },
  {
    rank: 2,
    name: "DankMaster69",
    score: 11280,
    avatar: "/images/avatars/player2.png",
    warriors: 38,
  },
  {
    rank: 3,
    name: "PepeCollector",
    score: 10950,
    avatar: "/images/avatars/player3.png",
    warriors: 35,
  },
  {
    rank: 4,
    name: "DogeToTheMoon",
    score: 9870,
    avatar: "/images/avatars/player4.png",
    warriors: 31,
  },
  {
    rank: 5,
    name: "WojackWarrior",
    score: 8740,
    avatar: "/images/avatars/player5.png",
    warriors: 29,
  },
]

export default function LeaderboardPreview() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="py-20 relative" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-purple-800 to-purple-900 z-0"></div>
      <div className="absolute inset-0 retro-grid opacity-20 z-0"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-pixel text-3xl md:text-4xl text-white mb-4 neon-text">TOP WARRIORS</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            The most skilled players in the MemeWars arena. Do you have what it takes to join them?
          </p>
        </div>

        <div className="max-w-4xl mx-auto arcade-card overflow-hidden">
          <div className="bg-gradient-to-r from-pink-500 to-purple-500 p-4 font-pixel text-white flex justify-between items-center">
            <div className="flex items-center">
              <Trophy className="h-5 w-5 mr-2" />
              <span>LEADERBOARD</span>
            </div>
            <span>SEASON 3</span>
          </div>

          <div className="divide-y divide-pink-500/20">
            {topPlayers.map((player, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center justify-between p-4 hover:bg-purple-800/30 transition-colors"
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 flex items-center justify-center font-pixel text-lg mr-4">
                    {player.rank === 1 ? (
                      <span className="text-yellow-400">1</span>
                    ) : player.rank === 2 ? (
                      <span className="text-gray-300">2</span>
                    ) : player.rank === 3 ? (
                      <span className="text-orange-400">3</span>
                    ) : (
                      <span className="text-gray-400">{player.rank}</span>
                    )}
                  </div>

                  <div className="relative w-10 h-10 mr-4">
                    <Image
                      src={player.avatar || "/placeholder.svg"}
                      alt={player.name}
                      fill
                      className="object-cover rounded-full"
                    />
                    {player.rank <= 3 && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-purple-500">
                        <Trophy className="h-3 w-3 text-white" />
                      </div>
                    )}
                  </div>

                  <div>
                    <p className="font-pixel text-white">{player.name}</p>
                    <p className="text-xs text-gray-300">{player.warriors} Warriors</p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-pixel text-cyan-400">{player.score.toLocaleString()}</p>
                  <p className="text-xs text-gray-300">points</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="p-4 text-center">
            <Link href="/leaderboard" className="arcade-btn text-white text-sm">
              VIEW FULL LEADERBOARD
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
