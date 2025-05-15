"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Image from "next/image"
import Link from "next/link"
import { memeWarriors } from "@/lib/data"

export default function FeaturedWarriors() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // Take only the first 6 warriors
  const featuredWarriors = memeWarriors.slice(0, 6)

  return (
    <section className="py-20 relative" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900 to-purple-800 z-0"></div>
      <div className="absolute inset-0 retro-grid opacity-20 z-0"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="font-pixel text-4xl text-white mb-6 neon-text">FEATURED WARRIORS</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Meet some of the most powerful meme warriors in the arena. Each warrior has unique abilities and stats.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredWarriors.map((warrior, index) => (
            <motion.div
              key={warrior.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="arcade-card overflow-hidden"
            >
              <div className="h-2 bg-gradient-to-r from-pink-500 to-purple-500"></div>
              <div className="p-6">
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

                <div className="text-center">
                  <Link
                    href={`/memewarriors/${warrior.id}`}
                    className="inline-block font-pixel text-sm text-pink-400 hover:text-pink-300 transition-colors"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/memewarriors" className="arcade-btn text-white">
            VIEW ALL WARRIORS
          </Link>
        </div>
      </div>
    </section>
  )
}
