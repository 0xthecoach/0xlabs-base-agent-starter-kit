"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Link from "next/link"
import { CheckCircle, Clock } from "lucide-react"

const roadmapItems = [
  {
    quarter: "Q2 2023",
    title: "Genesis Launch",
    description: "Initial release with core gameplay and first warrior collection",
    completed: true,
  },
  {
    quarter: "Q3 2023",
    title: "Tournament System",
    description: "Weekly tournaments with prize pools and special rewards",
    completed: true,
  },
  {
    quarter: "Q4 2023",
    title: "Mobile App",
    description: "Native mobile applications for iOS and Android",
    completed: false,
    current: true,
  },
  {
    quarter: "Q1 2024",
    title: "Clan Wars",
    description: "Form clans with friends and battle other clans for supremacy",
    completed: false,
  },
]

export default function RoadmapPreview() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="py-20 relative" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-purple-800 to-purple-900 z-0"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-pixel text-3xl md:text-4xl text-white mb-4 neon-text">ROADMAP</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Our journey to build the ultimate meme battle arena. See what we've accomplished and what's coming next.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-pink-500 to-purple-500"></div>

            {roadmapItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row items-start md:items-center gap-8 mb-12 ${
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
                  className={`ml-10 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-12 text-right" : "md:pl-12 text-left"}`}
                >
                  <div
                    className={`arcade-card p-6 ${
                      item.completed ? "border-green-500" : item.current ? "border-yellow-500" : ""
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-pixel text-cyan-400">{item.quarter}</span>
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
                    <h3 className="font-pixel text-white text-lg mb-2">{item.title}</h3>
                    <p className="text-gray-300">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <Link href="/roadmap" className="arcade-btn text-white">
            VIEW FULL ROADMAP
          </Link>
        </div>
      </div>
    </section>
  )
}
