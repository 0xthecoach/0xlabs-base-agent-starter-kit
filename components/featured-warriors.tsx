"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ChevronLeft, ChevronRight } from "lucide-react"

const warriors = [
  {
    id: "pepe",
    name: "Battle Pepe",
    rarity: "Legendary",
    power: 95,
    image: "/images/warriors/pepe.png",
    background: "from-green-500 to-green-700",
  },
  {
    id: "doge",
    name: "Doge Warrior",
    rarity: "Epic",
    power: 88,
    image: "/images/warriors/doge.png",
    background: "from-yellow-500 to-yellow-700",
  },
  {
    id: "wojak",
    name: "Cyber Wojak",
    rarity: "Rare",
    power: 82,
    image: "/images/warriors/wojak.png",
    background: "from-blue-500 to-blue-700",
  },
  {
    id: "cheems",
    name: "Cheems Samurai",
    rarity: "Epic",
    power: 87,
    image: "/images/warriors/cheems.png",
    background: "from-orange-500 to-orange-700",
  },
  {
    id: "grumpy",
    name: "Grumpy Assassin",
    rarity: "Rare",
    power: 79,
    image: "/images/warriors/grumpy.png",
    background: "from-gray-500 to-gray-700",
  },
]

export default function FeaturedWarriors() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const visibleWarriors = () => {
    // For mobile show 1, tablet show 2, desktop show 3
    const count = typeof window !== "undefined" ? (window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 3) : 3

    const result = []
    for (let i = 0; i < count; i++) {
      const index = (currentIndex + i) % warriors.length
      result.push(warriors[index])
    }
    return result
  }

  const nextWarrior = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % warriors.length)
  }

  const prevWarrior = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? warriors.length - 1 : prevIndex - 1))
  }

  return (
    <section className="py-20 relative" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900 to-purple-800 z-0"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-pixel text-3xl md:text-4xl text-white mb-4 neon-text">FEATURED WARRIORS</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Meet some of the most powerful meme warriors in the arena. Each warrior has unique abilities and stats.
          </p>
        </div>

        <div className="relative">
          <div className="flex justify-center items-center gap-4 md:gap-8">
            <button
              onClick={prevWarrior}
              className="bg-purple-800/50 hover:bg-purple-700/50 text-white p-2 rounded-full backdrop-blur-sm"
              aria-label="Previous warrior"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <div className="flex gap-4 md:gap-8 overflow-hidden py-8">
              {visibleWarriors().map((warrior, index) => (
                <motion.div
                  key={warrior.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="w-full max-w-[280px] arcade-card overflow-hidden group"
                >
                  <div className={`h-2 bg-gradient-to-r ${warrior.background}`}></div>
                  <div className="p-4 text-center">
                    <div className="relative h-48 mb-4 transform group-hover:scale-105 transition-transform duration-300">
                      <Image
                        src={warrior.image || "/placeholder.svg"}
                        alt={warrior.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <h3 className="font-pixel text-white text-xl mb-1">{warrior.name}</h3>
                    <div className="flex justify-center items-center gap-2 mb-3">
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          warrior.rarity === "Legendary"
                            ? "bg-yellow-500"
                            : warrior.rarity === "Epic"
                              ? "bg-purple-500"
                              : "bg-blue-500"
                        }`}
                      >
                        {warrior.rarity}
                      </span>
                      <span className="text-xs px-2 py-1 rounded bg-red-500">Power: {warrior.power}</span>
                    </div>
                    <Link href={`/memewarriors/${warrior.id}`} className="arcade-btn text-white text-sm block">
                      VIEW DETAILS
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>

            <button
              onClick={nextWarrior}
              className="bg-purple-800/50 hover:bg-purple-700/50 text-white p-2 rounded-full backdrop-blur-sm"
              aria-label="Next warrior"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
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
