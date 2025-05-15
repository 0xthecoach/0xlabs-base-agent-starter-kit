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

  // Take only the first 3 warriors
  const featuredWarriors = memeWarriors.slice(0, 3)

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
            Meet the most powerful meme warriors in the arena. Each warrior has unique abilities and stats.
          </p>
        </motion.div>

        {/* Top 3 Warriors - Exactly like leaderboard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* 2nd Place */}
          <div className="arcade-card p-6 text-center order-2 md:order-1">
            <div className="relative mx-auto w-24 h-24 mb-4">
              <div className="absolute inset-0 rounded-full border-2 border-gray-300 animate-pulse-slow"></div>
              <div className="w-full h-full rounded-full overflow-hidden border-2 border-white">
                <Image
                  src={`/abstract-geometric-shapes.png?height=96&width=96&query=${featuredWarriors[1].name} meme character`}
                  alt={featuredWarriors[1].name}
                  width={96}
                  height={96}
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-gray-400 rounded-full w-8 h-8 flex items-center justify-center border-2 border-black">
                <span className="font-pixel text-black">2</span>
              </div>
            </div>
            <h3 className="font-pixel text-xl text-white mb-1">{featuredWarriors[1].name}</h3>
            <div className="text-gray-300 mb-2">{featuredWarriors[1].class}</div>
            <div className="font-pixel text-xl text-yellow-400 mb-3">Power: {featuredWarriors[1].power}</div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="bg-black/30 p-2 rounded">
                <span className="text-green-300">Wins</span>
                <div className="font-pixel text-white">{featuredWarriors[1].wins}</div>
              </div>
              <div className="bg-black/30 p-2 rounded">
                <span className="text-cyan-300">Win Rate</span>
                <div className="font-pixel text-white">
                  {featuredWarriors[1].wins + featuredWarriors[1].losses > 0
                    ? (
                        (featuredWarriors[1].wins / (featuredWarriors[1].wins + featuredWarriors[1].losses)) *
                        100
                      ).toFixed(1)
                    : "0.0"}
                  %
                </div>
              </div>
            </div>
            <div className="mt-4">
              <Link
                href={`/memewarriors/${featuredWarriors[1].id}`}
                className="inline-block font-pixel text-sm text-pink-400 hover:text-pink-300 transition-colors"
              >
                View Details →
              </Link>
            </div>
          </div>

          {/* 1st Place */}
          <div className="arcade-card p-6 text-center order-1 md:order-2 transform md:scale-110 z-10 border-2 border-yellow-500">
            <div className="relative mx-auto w-32 h-32 mb-4">
              <div className="absolute inset-0 rounded-full border-4 border-yellow-500 animate-pulse-slow"></div>
              <div className="absolute inset-2 rounded-full border-2 border-yellow-300 animate-pulse-slow animation-delay-500"></div>
              <div className="w-full h-full rounded-full overflow-hidden border-2 border-white">
                <Image
                  src={`/abstract-geometric-shapes.png?height=128&width=128&query=${featuredWarriors[0].name} meme character`}
                  alt={featuredWarriors[0].name}
                  width={128}
                  height={128}
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-yellow-500 rounded-full w-10 h-10 flex items-center justify-center border-2 border-black">
                <span className="font-pixel text-black">1</span>
              </div>
            </div>
            <h3 className="font-pixel text-2xl text-white mb-1">{featuredWarriors[0].name}</h3>
            <div className="text-gray-300 mb-2">{featuredWarriors[0].class}</div>
            <div className="font-pixel text-2xl text-yellow-400 mb-3">Power: {featuredWarriors[0].power}</div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="bg-black/30 p-2 rounded">
                <span className="text-green-300">Wins</span>
                <div className="font-pixel text-white">{featuredWarriors[0].wins}</div>
              </div>
              <div className="bg-black/30 p-2 rounded">
                <span className="text-cyan-300">Win Rate</span>
                <div className="font-pixel text-white">
                  {featuredWarriors[0].wins + featuredWarriors[0].losses > 0
                    ? (
                        (featuredWarriors[0].wins / (featuredWarriors[0].wins + featuredWarriors[0].losses)) *
                        100
                      ).toFixed(1)
                    : "0.0"}
                  %
                </div>
              </div>
            </div>
            <div className="mt-4">
              <Link
                href={`/memewarriors/${featuredWarriors[0].id}`}
                className="inline-block font-pixel text-sm text-pink-400 hover:text-pink-300 transition-colors"
              >
                View Details →
              </Link>
            </div>
          </div>

          {/* 3rd Place */}
          <div className="arcade-card p-6 text-center order-3">
            <div className="relative mx-auto w-24 h-24 mb-4">
              <div className="absolute inset-0 rounded-full border-2 border-amber-700 animate-pulse-slow"></div>
              <div className="w-full h-full rounded-full overflow-hidden border-2 border-white">
                <Image
                  src={`/abstract-geometric-shapes.png?height=96&width=96&query=${featuredWarriors[2].name} meme character`}
                  alt={featuredWarriors[2].name}
                  width={96}
                  height={96}
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-amber-700 rounded-full w-8 h-8 flex items-center justify-center border-2 border-black">
                <span className="font-pixel text-black">3</span>
              </div>
            </div>
            <h3 className="font-pixel text-xl text-white mb-1">{featuredWarriors[2].name}</h3>
            <div className="text-gray-300 mb-2">{featuredWarriors[2].class}</div>
            <div className="font-pixel text-xl text-yellow-400 mb-3">Power: {featuredWarriors[2].power}</div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="bg-black/30 p-2 rounded">
                <span className="text-green-300">Wins</span>
                <div className="font-pixel text-white">{featuredWarriors[2].wins}</div>
              </div>
              <div className="bg-black/30 p-2 rounded">
                <span className="text-cyan-300">Win Rate</span>
                <div className="font-pixel text-white">
                  {featuredWarriors[2].wins + featuredWarriors[2].losses > 0
                    ? (
                        (featuredWarriors[2].wins / (featuredWarriors[2].wins + featuredWarriors[2].losses)) *
                        100
                      ).toFixed(1)
                    : "0.0"}
                  %
                </div>
              </div>
            </div>
            <div className="mt-4">
              <Link
                href={`/memewarriors/${featuredWarriors[2].id}`}
                className="inline-block font-pixel text-sm text-pink-400 hover:text-pink-300 transition-colors"
              >
                View Details →
              </Link>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <Link href="/memewarriors" className="arcade-btn text-white">
            VIEW ALL WARRIORS
          </Link>
        </div>
      </div>
    </section>
  )
}
