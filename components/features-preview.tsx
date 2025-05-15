"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const features = [
  {
    title: "COLLECT WARRIORS",
    description: "Collect and upgrade your favorite meme characters",
    icon: "/placeholder-dwcha.png",
    color: "from-pink-500 to-purple-500",
  },
  {
    title: "BATTLE ARENA",
    description: "Compete in real-time battles against other players",
    icon: "/placeholder-pdh3p.png",
    color: "from-cyan-500 to-blue-500",
  },
  {
    title: "EARN REWARDS",
    description: "Complete quests and climb the leaderboard for prizes",
    icon: "/placeholder.svg?height=64&width=64&query=rewards icon",
    color: "from-yellow-500 to-orange-500",
  },
  {
    title: "JOIN TOURNAMENTS",
    description: "Participate in weekly tournaments with massive prizes",
    icon: "/placeholder.svg?height=64&width=64&query=tournament icon",
    color: "from-green-500 to-emerald-500",
  },
]

export default function FeaturesPreview() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="py-20 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-purple-900/50 retro-grid opacity-20 z-0"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-pixel text-3xl md:text-4xl text-white mb-4 neon-text">GAME FEATURES</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            MemeWars combines the best elements of collectible card games, battle arenas, and meme culture into one epic
            gaming experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="arcade-card overflow-hidden group"
            >
              <div className={`h-2 bg-gradient-to-r ${feature.color}`}></div>
              <div className="p-6">
                <div className="w-16 h-16 mb-4 relative">
                  <Image
                    src={feature.icon || "/placeholder.svg"}
                    alt={feature.title}
                    width={64}
                    height={64}
                    className="object-contain"
                  />
                </div>
                <h3 className="font-pixel text-white text-xl mb-2">{feature.title}</h3>
                <p className="text-gray-300 mb-4">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/features"
            className="inline-flex items-center font-pixel text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <span>EXPLORE ALL FEATURES</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
