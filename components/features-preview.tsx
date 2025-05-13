"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const features = [
  {
    title: "Battle Arena",
    description: "Fight in epic battles with your favorite meme characters",
    icon: "/images/features/battle.png",
    color: "from-purple-500 to-purple-700",
    bgColor: "bg-purple-600",
  },
  {
    title: "Tournaments",
    description: "Compete in tournaments to win exclusive rewards",
    icon: "/images/features/tournament.png",
    color: "from-pink-500 to-pink-700",
    bgColor: "bg-pink-600",
  },
  {
    title: "Rewards",
    description: "Earn tokens and unique collectibles as you play",
    icon: "/images/features/rewards.png",
    color: "from-cyan-500 to-cyan-700",
    bgColor: "bg-cyan-600",
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="arcade-card overflow-hidden group"
            >
              <div className="p-6 flex flex-col items-center text-center">
                <div className="w-20 h-20 mb-6 relative">
                  <Image
                    src={feature.icon || "/placeholder.svg"}
                    alt={feature.title}
                    width={80}
                    height={80}
                    className="object-contain"
                  />
                </div>
                <h3 className="font-pixel text-2xl mb-3 text-white">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/features"
            className="inline-flex items-center font-pixel text-pink-400 hover:text-pink-300 transition-colors bg-purple-900/50 px-6 py-3 rounded-lg border border-pink-500/30"
          >
            <span>View All Features</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
