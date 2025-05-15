"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useRef } from "react"
import { useEffect, useState } from "react"

const features = [
  {
    title: "COLLECT WARRIORS",
    description:
      "Build your collection of meme warriors, each with unique abilities and stats. Upgrade them to increase their power and unlock special abilities.",
    image: "/placeholder-g2in6.png",
    color: "from-pink-500 to-purple-500",
    details: [
      "Over 100 unique warriors to collect",
      "Rarity system with Common, Rare, Epic, and Legendary warriors",
      "Fusion system to combine warriors for upgrades",
      "Limited edition seasonal warriors",
    ],
  },
  {
    title: "BATTLE ARENA",
    description:
      "Enter the arena and battle against other players in real-time. Use strategy and your warriors' abilities to defeat your opponents and climb the ranks.",
    image: "/placeholder-2d096.png",
    color: "from-cyan-500 to-blue-500",
    details: [
      "Real-time PvP battles",
      "Strategic turn-based combat",
      "Special abilities and combo attacks",
      "Different arena environments with unique effects",
    ],
  },
  {
    title: "EARN REWARDS",
    description:
      "Complete quests, win battles, and participate in events to earn rewards. Use your earnings to expand your collection and upgrade your warriors.",
    image: "/placeholder-0t4sa.png",
    color: "from-yellow-500 to-orange-500",
    details: [
      "Daily and weekly quests with escalating rewards",
      "Battle pass with premium rewards",
      "Achievement system with milestone bonuses",
      "Special event rewards and limited-time offers",
    ],
  },
  {
    title: "JOIN TOURNAMENTS",
    description:
      "Compete in weekly tournaments with players from around the world. Prove your skills and win exclusive rewards and recognition.",
    image: "/placeholder-jqbnv.png",
    color: "from-green-500 to-emerald-500",
    details: [
      "Weekly tournaments with different formats",
      "Monthly championship with major prizes",
      "Clan tournaments for team competition",
      "Spectator mode to watch top players compete",
    ],
  },
  {
    title: "SOCIAL INTEGRATION",
    description:
      "Connect with friends, join clans, and share your achievements on social media. Build a community and collaborate with other players.",
    image: "/placeholder-r2v9w.png",
    color: "from-red-500 to-pink-500",
    details: [
      "Friend system with battle invitations",
      "Clan creation and management",
      "In-game chat and messaging",
      "Social media sharing for achievements",
    ],
  },
  {
    title: "MARKETPLACE",
    description:
      "Trade warriors with other players in the marketplace. Find rare warriors to complete your collection or sell your extras for profit.",
    image: "/placeholder-yron1.png",
    color: "from-indigo-500 to-purple-500",
    details: [
      "Peer-to-peer trading system",
      "Auction house for rare warriors",
      "Limited edition sales events",
      "Warrior valuation system",
    ],
  },
]

export default function Features() {
  const refs = features.map(() => useRef(null))
  const [inViewStates, setInViewStates] = useState(features.map(() => false))

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setInViewStates((prev) => {
              const newState = [...prev]
              newState[index] = true
              return newState
            })
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.1,
      },
    )

    refs.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current)
      }
    })

    return () => {
      observer.disconnect()
    }
  }, [refs])

  return (
    <div className="pt-20">
      {/* Hero section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900 to-purple-800 z-0"></div>
        <div className="absolute inset-0 retro-grid opacity-20 z-0"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h1 className="font-pixel text-4xl md:text-5xl text-white mb-6 neon-text">GAME FEATURES</h1>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg">
              Explore all the exciting features that make MemeWars the ultimate meme battle arena experience.
            </p>
          </div>
        </div>
      </section>

      {/* Features sections */}
      {features.map((feature, index) => {
        const ref = refs[index].current

        return (
          <section
            key={index}
            ref={ref}
            className={`py-20 relative ${index % 2 === 0 ? "bg-purple-900/50" : "bg-purple-800/50"}`}
          >
            <div className="container mx-auto px-4 relative z-10">
              <div
                className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-12`}
              >
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={inViewStates[index] ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5 }}
                  className="md:w-1/2"
                >
                  <div className="relative h-64 md:h-96 w-full">
                    <Image
                      src={feature.image || "/placeholder.svg"}
                      alt={feature.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                  animate={inViewStates[index] ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5 }}
                  className="md:w-1/2"
                >
                  <div className={`h-2 w-32 bg-gradient-to-r ${feature.color} mb-6`}></div>
                  <h2 className="font-pixel text-3xl text-white mb-4">{feature.title}</h2>
                  <p className="text-gray-300 mb-6">{feature.description}</p>

                  <div className="arcade-card p-6">
                    <h3 className="font-pixel text-white text-lg mb-4">Key Features</h3>
                    <ul className="space-y-2">
                      {feature.details.map((detail, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-pink-500 mr-2">•</span>
                          <span className="text-gray-300">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        )
      })}

      {/* CTA section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900 to-purple-950 z-0"></div>
        <div className="absolute inset-0 retro-grid opacity-20 z-0"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-pixel text-3xl md:text-4xl text-white mb-6 neon-text">READY TO EXPERIENCE MEMEWARS?</h2>
            <p className="text-gray-300 mb-8">
              Join thousands of players already battling in the arena. Create your account now and get a free starter
              pack!
            </p>
            <a href="/play" className="arcade-btn text-white text-lg inline-block">
              PLAY NOW
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
