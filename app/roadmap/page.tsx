"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { CheckCircle, Clock, Calendar } from "lucide-react"
import { useRef } from "react"

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

export default function Roadmap() {
  const refs = roadmapItems.map(() => useRef(null))
  const inViewStates = roadmapItems.map(() =>
    useInView({
      triggerOnce: true,
      threshold: 0.1,
    }),
  )

  return (
    <div className="pt-20">
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

      {/* Roadmap timeline */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-purple-900/30 z-0"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-pink-500 to-purple-500"></div>

              {roadmapItems.map((item, index) => {
                const inView = inViewStates[index][0]
                const ref = refs[index]

                return (
                  <motion.div
                    key={index}
                    ref={ref.current}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className={`relative flex flex-col md:flex-row items-start md:items-center gap-8 mb-16 ${
                      index % 2 === 0 ? "md:flex-row-reverse" : ""
                    }`}
                  >
                    {/* Circle on timeline */}
                    <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-6 h-6 rounded-full border-2 border-pink-500 z-10">
                      <div
                        className={`w-full h-full rounded-full ${
                          item.completed ? "bg-green-500" : item.current ? "bg-yellow-500" : "bg-purple-700"
                        }`}
                      ></div>
                    </div>

                    {/* Content */}
                    <div
                      className={`ml-10 md:ml-0 md:w-1/2 ${
                        index % 2 === 0 ? "md:pr-12 text-right" : "md:pl-12 text-left"
                      }`}
                    >
                      <div
                        className={`arcade-card p-6 ${
                          item.completed ? "border-green-500" : item.current ? "border-yellow-500" : ""
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-cyan-400" />
                            <span className="font-pixel text-cyan-400">{item.quarter}</span>
                          </div>
                          {item.completed ? (
                            <span className="flex items-center text-xs text-green-500">
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Completed
                            </span>
                          ) : item.current ? (
                            <span className="flex items-center text-xs text-yellow-500">
                              <Clock className="h-4 w-4 mr-1" />
                              In Progress
                            </span>
                          ) : (
                            <span className="flex items-center text-xs text-gray-400">
                              <Clock className="h-4 w-4 mr-1" />
                              Upcoming
                            </span>
                          )}
                        </div>
                        <h3 className="font-pixel text-white text-xl mb-3">{item.title}</h3>
                        <p className="text-gray-300 mb-4">{item.description}</p>

                        <div className="bg-purple-900/50 p-4 rounded">
                          <h4 className="font-pixel text-white text-sm mb-2">Key Deliverables:</h4>
                          <ul className="space-y-1">
                            {item.details.map((detail, i) => (
                              <li key={i} className="flex items-start">
                                <span className="text-pink-500 mr-2">•</span>
                                <span className="text-gray-300 text-sm">{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
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
