"use client"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight, Trophy, Zap, Users, ShoppingCart, Sparkles, Gamepad2 } from "lucide-react"

const features = [
  {
    title: "COLLECT WARRIORS",
    description:
      "Build your collection of meme warriors, each with unique abilities and stats. Upgrade them to increase their power and unlock special abilities.",
    image: "/placeholder-ykyqg.png",
    color: "from-pink-500 to-purple-500",
    icon: <Sparkles className="w-6 h-6 text-pink-400" />,
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
    image: "/placeholder-ar88l.png",
    color: "from-cyan-500 to-blue-500",
    icon: <Gamepad2 className="w-6 h-6 text-cyan-400" />,
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
    image: "/placeholder-93sfn.png",
    color: "from-yellow-500 to-orange-500",
    icon: <Zap className="w-6 h-6 text-yellow-400" />,
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
    image: "/placeholder-6qod6.png",
    color: "from-green-500 to-emerald-500",
    icon: <Trophy className="w-6 h-6 text-green-400" />,
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
    image: "/placeholder-bf0gz.png",
    color: "from-red-500 to-pink-500",
    icon: <Users className="w-6 h-6 text-red-400" />,
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
    image: "/placeholder-rbf04.png",
    color: "from-indigo-500 to-purple-500",
    icon: <ShoppingCart className="w-6 h-6 text-indigo-400" />,
    details: [
      "Peer-to-peer trading system",
      "Auction house for rare warriors",
      "Limited edition sales events",
      "Warrior valuation system",
    ],
  },
]

export default function Features() {
  // Create an array of refs using a simpler approach
  const [inViewStates, setInViewStates] = useState(features.map(() => false))

  // Use a simpler approach without refs.forEach
  const sectionRefs = features.map(() => useRef(null))

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Find which section this entry corresponds to
          sectionRefs.forEach((ref, index) => {
            if (ref.current === entry.target && entry.isIntersecting) {
              setInViewStates((prev) => {
                const newState = [...prev]
                newState[index] = true
                return newState
              })
            }
          })
        })
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -100px 0px",
      },
    )

    // Observe all section refs
    sectionRefs.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current)
      }
    })

    return () => {
      // Cleanup: unobserve all sections
      sectionRefs.forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current)
        }
      })
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-950 to-black">
      {/* Hero section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/80 to-purple-950/80 z-0"></div>
        <div className="absolute inset-0 retro-grid opacity-20 z-0"></div>

        {/* Animated particles */}
        <div className="absolute inset-0 z-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-cyan-500 opacity-30"
              style={{
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 10 + 10}s linear infinite`,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <h1 className="font-pixel text-5xl md:text-6xl text-white mb-6 neon-text">GAME FEATURES</h1>
              <p className="text-gray-300 max-w-2xl mx-auto text-lg mb-8">
                Explore all the exciting features that make MemeWars the ultimate meme battle arena experience.
              </p>
              <div className="flex justify-center space-x-4">
                <Link href="/memewarriors" className="arcade-btn text-white px-6 py-3 inline-flex items-center">
                  VIEW WARRIORS <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
                <Link href="/battle" className="arcade-btn-secondary text-white px-6 py-3 inline-flex items-center">
                  BATTLE NOW <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features sections */}
      {features.map((feature, index) => (
        <section
          key={index}
          ref={sectionRefs[index]}
          className={`py-20 relative ${index % 2 === 0 ? "bg-purple-900/30" : "bg-purple-950/30"}`}
        >
          <div className="absolute inset-0 retro-grid opacity-10 z-0"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div
              className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-12`}
            >
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={inViewStates[index] ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="md:w-1/2"
              >
                <div className="arcade-card overflow-hidden">
                  <div className={`h-2 bg-gradient-to-r ${feature.color}`}></div>
                  <div className="p-4">
                    <Image
                      src={feature.image || "/placeholder.svg"}
                      alt={feature.title}
                      width={600}
                      height={400}
                      className="rounded-lg object-cover w-full h-auto"
                    />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                animate={inViewStates[index] ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="md:w-1/2"
              >
                <div className="flex items-center mb-4">
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${feature.color} mr-3`}>{feature.icon}</div>
                  <h2 className="font-pixel text-3xl text-white neon-text">{feature.title}</h2>
                </div>
                <div className={`h-1 w-24 bg-gradient-to-r ${feature.color} mb-6`}></div>
                <p className="text-gray-300 mb-6 text-lg">{feature.description}</p>

                <div className="arcade-card p-6 bg-purple-900/50 backdrop-blur-sm">
                  <h3 className="font-pixel text-white text-lg mb-4">Key Features</h3>
                  <ul className="space-y-3">
                    {feature.details.map((detail, i) => (
                      <motion.li
                        key={i}
                        className="flex items-start"
                        initial={{ opacity: 0, x: -10 }}
                        animate={inViewStates[index] ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                      >
                        <span className="text-pink-500 mr-2">•</span>
                        <span className="text-gray-300">{detail}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/50 to-purple-950 z-0"></div>
        <div className="absolute inset-0 retro-grid opacity-20 z-0"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto">
            <div className="arcade-card p-8 bg-purple-900/50 backdrop-blur-sm border-2 border-cyan-500/30">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <h2 className="font-pixel text-3xl md:text-4xl text-white mb-6 neon-text">
                  READY TO EXPERIENCE MEMEWARS?
                </h2>
                <p className="text-gray-300 mb-8 text-lg">
                  Join thousands of players already battling in the arena. Create your account now and get a free
                  starter pack with exclusive warriors!
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <a href="/play" className="arcade-btn text-white text-lg px-8 py-3 inline-block">
                    PLAY NOW
                  </a>
                  <a href="/marketplace" className="arcade-btn-secondary text-white text-lg px-8 py-3 inline-block">
                    VISIT MARKETPLACE
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
