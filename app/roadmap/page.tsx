"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useRef, useMemo } from "react"
import Link from "next/link"

const roadmapItems = [
  {
    quarter: "Q2 2023",
    title: "Genesis Launch",
    description: "Initial release with core gameplay and first warrior collection",
    details: [
      "Launch of the MemeWars platform",
      "First collection of 50 warriors",
      "Basic battle mechanics",
      "Account creation and profile system",
    ],
    completed: true,
  },
  {
    quarter: "Q3 2023",
    title: "Tournament System",
    description: "Weekly tournaments with prize pools and special rewards",
    details: [
      "Tournament infrastructure",
      "Leaderboard system",
      "Prize distribution mechanism",
      "Spectator mode for tournaments",
    ],
    completed: true,
  },
  {
    quarter: "Q4 2023",
    title: "Mobile App",
    description: "Native mobile applications for iOS and Android",
    details: [
      "iOS app development",
      "Android app development",
      "Cross-platform account synchronization",
      "Mobile-optimized UI/UX",
    ],
    completed: false,
    current: true,
  },
  {
    quarter: "Q1 2024",
    title: "Clan Wars",
    description: "Form clans with friends and battle other clans for supremacy",
    details: [
      "Clan creation and management",
      "Clan rankings and rewards",
      "Clan war matchmaking",
      "Clan-exclusive rewards and warriors",
    ],
    completed: false,
  },
  {
    quarter: "Q2 2024",
    title: "Marketplace Expansion",
    description: "Enhanced marketplace with new features and trading options",
    details: [
      "Peer-to-peer trading",
      "Auction house for rare warriors",
      "Warrior rental system",
      "Limited edition sales events",
    ],
    completed: false,
  },
  {
    quarter: "Q3 2024",
    title: "World Championship",
    description: "First annual MemeWars World Championship with major prizes",
    details: [
      "Regional qualifiers",
      "Live-streamed finals",
      "Exclusive championship rewards",
      "Partnership with major sponsors",
    ],
    completed: false,
  },
  {
    quarter: "Q4 2024",
    title: "Metaverse Integration",
    description: "Expand MemeWars into the metaverse with virtual spaces and experiences",
    details: [
      "Virtual MemeWars arena",
      "Avatar customization",
      "Social spaces for players",
      "Virtual events and gatherings",
    ],
    completed: false,
  },
]

// Create refs for each roadmap item
const refs = roadmapItems.map(() => useRef(null))

export default function Roadmap() {
  // Create inView states for each roadmap item
  const inViewStates = useMemo(() => {
    return roadmapItems.map(() => {
      return useInView({
        triggerOnce: true,
        threshold: 0.1,
      })
    })
  }, [])

  // Custom scrollbar styles for webkit browsers
  const scrollbarStyles = `
  .overflow-x-auto::-webkit-scrollbar {
    height: 6px;
  }
  .overflow-x-auto::-webkit-scrollbar-track {
    background: #2d1b69;
    border-radius: 3px;
  }
  .overflow-x-auto::-webkit-scrollbar-thumb {
    background: #a855f7;
    border-radius: 3px;
  }
  .overflow-x-auto::-webkit-scrollbar-thumb:hover {
    background: #9333ea;
  }
`

  return (
    <div className="pt-20">
      <style jsx>{scrollbarStyles}</style>
      {/* Hero section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900 to-purple-800 z-0"></div>
        <div className="absolute inset-0 retro-grid opacity-20 z-0"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h1 className="font-pixel text-4xl md:text-5xl text-white mb-6 neon-text">ROADMAP</h1>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg">
              Our journey to build the ultimate meme battle arena. See what we've accomplished and what's coming next.
            </p>
          </div>
        </div>
      </section>

      {/* Roadmap timeline - Horizontal Scrollable */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-purple-900/30 z-0"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Horizontal scrollable container */}
            <div
              className="relative overflow-x-auto pb-8"
              style={{ scrollbarWidth: "thin", scrollbarColor: "#a855f7 #2d1b69" }}
            >
              {/* Horizontal line */}
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 to-purple-500"></div>

              {/* Timeline items container */}
              <div className="flex space-x-8 py-10 px-4" style={{ minWidth: "max-content" }}>
                {roadmapItems.map((item, index) => (
                  <motion.div
                    key={index}
                    ref={inViewStates[index][0]}
                    initial={{ opacity: 0, y: 50 }}
                    animate={inViewStates[index][1] ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="arcade-card overflow-hidden flex flex-col h-full"
                  >
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="mb-4">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(item.status)}`}
                        >
                          {item.status}
                        </span>
                      </div>
                      <h3 className="text-xl font-pixel text-white mb-2">{item.title}</h3>
                      <p className="text-gray-300 mb-4 flex-grow">{item.description}</p>
                      <div className="mt-auto">
                        {item.link && (
                          <Link href={item.link} className="pink-button inline-block text-sm">
                            Learn More
                          </Link>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Scroll indicator */}
            <div className="flex justify-center mt-4">
              <div className="flex items-center space-x-2 text-gray-300 text-sm">
                <span className="animate-pulse">←</span>
                <span>Scroll to see more</span>
                <span className="animate-pulse">→</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Future vision */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900 to-purple-950 z-0"></div>
        <div className="absolute inset-0 retro-grid opacity-20 z-0"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-pixel text-3xl md:text-4xl text-white mb-6 neon-text">BEYOND THE ROADMAP</h2>
            <p className="text-gray-300 mb-8">
              Our vision for MemeWars extends far beyond this roadmap. We're committed to continuous innovation and
              community-driven development to create the most engaging meme battle experience possible.
            </p>
            <div className="arcade-card p-6 text-left">
              <p className="text-gray-300 mb-4">Some of our long-term visions include:</p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-pink-500 mr-2">•</span>
                  <span className="text-gray-300">Cross-platform tournaments and competitions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-pink-500 mr-2">•</span>
                  <span className="text-gray-300">User-generated content and custom warrior creation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-pink-500 mr-2">•</span>
                  <span className="text-gray-300">Expanded universe with lore and storylines</span>
                </li>
                <li className="flex items-start">
                  <span className="text-pink-500 mr-2">•</span>
                  <span className="text-gray-300">Real-world events and merchandise</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function getStatusColor(status: string | undefined) {
  switch (status) {
    case "Completed":
      return "bg-green-200 text-green-800"
    case "In Progress":
      return "bg-yellow-200 text-yellow-800"
    default:
      return "bg-gray-200 text-gray-800"
  }
}
