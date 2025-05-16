"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Image from "next/image"
import Link from "next/link"
import { CheckCircle, Clock, Award } from "lucide-react"

const quests = [
  {
    id: "daily-battle",
    title: "Daily Battle",
    description: "Win 3 battles in the arena",
    reward: "250 Meme Coins",
    icon: "/images/quest-icon-1.png",
    progress: 100,
    completed: true,
  },
  {
    id: "social-share",
    title: "Social Sharer",
    description: "Share your warrior on Twitter",
    reward: "500 Meme Coins + 1 Rare Card",
    icon: "/images/quest-icon-2.png",
    progress: 0,
    completed: false,
  },
  {
    id: "collection",
    title: "Collector",
    description: "Collect 5 new warriors this week",
    reward: "1000 Meme Coins",
    icon: "/images/quest-icon-3.png",
    progress: 60,
    completed: false,
  },
]

export default function QuestsPreview() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="py-20 relative" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900 to-purple-800 z-0"></div>
      <div className="absolute inset-0 retro-grid opacity-20 z-0"></div>

      {/* Purple landscape background - USING THE CORRECT IMAGE */}
      <div
        className="absolute inset-x-0 bottom-0 z-0"
        style={{
          backgroundImage: 'url("/images/purple-landscape-wide.png")',
          backgroundPosition: "bottom center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% auto",
          height: "180px",
          opacity: 0.95,
        }}
      ></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-pixel text-3xl md:text-4xl text-white mb-4 neon-text">DAILY QUESTS</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Complete quests to earn rewards and boost your progress. New quests are available daily!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {quests.map((quest, index) => (
            <motion.div
              key={quest.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`arcade-card overflow-hidden ${quest.completed ? "border-green-500" : ""}`}
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="relative w-12 h-12 mr-4">
                    <Image
                      src={quest.icon || "/placeholder.svg"}
                      alt={quest.title}
                      width={48}
                      height={48}
                      className="object-contain"
                    />
                  </div>
                  <h3 className="font-pixel text-white text-lg">{quest.title}</h3>
                </div>

                <p className="text-gray-300 mb-4">{quest.description}</p>

                <div className="mb-4">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-300">Progress</span>
                    <span className="text-gray-300">{quest.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-purple-900 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${
                        quest.completed ? "bg-green-500" : "bg-gradient-to-r from-pink-500 to-purple-500"
                      }`}
                      style={{ width: `${quest.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-xs">
                    <Award className="h-4 w-4 mr-1 text-yellow-400" />
                    <span className="text-yellow-400">{quest.reward}</span>
                  </div>

                  {quest.completed ? (
                    <span className="flex items-center text-xs text-green-500">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Completed
                    </span>
                  ) : (
                    <span className="flex items-center text-xs text-gray-300">
                      <Clock className="h-4 w-4 mr-1" />
                      In Progress
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/quests" className="arcade-btn text-white">
            VIEW ALL QUESTS
          </Link>
        </div>
      </div>
    </section>
  )
}
