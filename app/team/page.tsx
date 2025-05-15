"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Twitter, Linkedin, Github } from "lucide-react"
import { useRef, useEffect, useState } from "react"

const teamMembers = [
  {
    name: "Alex Johnson",
    role: "Founder & CEO",
    bio: "Former game developer at Epic Games with 10+ years of experience in the gaming industry. Meme enthusiast and blockchain advocate.",
    image: "/placeholder-o6pxl.png",
    social: {
      twitter: "https://twitter.com/alexjohnson",
      linkedin: "https://linkedin.com/in/alexjohnson",
      github: "https://github.com/alexjohnson",
    },
  },
  {
    name: "Sarah Chen",
    role: "Chief Creative Officer",
    bio: "Award-winning digital artist with a background in character design. Previously worked at Pixar and Blizzard Entertainment.",
    image: "/placeholder-cjfv5.png",
    social: {
      twitter: "https://twitter.com/sarahchen",
      linkedin: "https://linkedin.com/in/sarahchen",
    },
  },
  {
    name: "Michael Rodriguez",
    role: "CTO",
    bio: "Full-stack developer with expertise in game engines and blockchain technology. Led development teams at Ubisoft and EA.",
    image: "/placeholder-z8jzv.png",
    social: {
      twitter: "https://twitter.com/michaelrodriguez",
      github: "https://github.com/michaelrodriguez",
    },
  },
  {
    name: "Emma Wilson",
    role: "Head of Marketing",
    bio: "Digital marketing specialist with experience in gaming and entertainment. Previously led marketing campaigns for major game launches.",
    image: "/placeholder-qhqdi.png",
    social: {
      twitter: "https://twitter.com/emmawilson",
      linkedin: "https://linkedin.com/in/emmawilson",
    },
  },
  {
    name: "David Kim",
    role: "Lead Game Designer",
    bio: "Game design veteran with a passion for competitive gameplay. Worked on several top-grossing mobile and PC games.",
    image: "/placeholder-k0w2i.png",
    social: {
      twitter: "https://twitter.com/davidkim",
      github: "https://github.com/davidkim",
    },
  },
  {
    name: "Olivia Martinez",
    role: "Community Manager",
    bio: "Social media expert and community builder. Specializes in creating engaging content and fostering active gaming communities.",
    image: "/placeholder-zaid9.png",
    social: {
      twitter: "https://twitter.com/oliviamartinez",
      linkedin: "https://linkedin.com/in/oliviamartinez",
    },
  },
]

const advisors = [
  {
    name: "Dr. James Wilson",
    role: "Gaming Industry Advisor",
    bio: "Former executive at Nintendo with 20+ years of experience in the gaming industry. Advisor to multiple successful gaming startups.",
    image: "/placeholder-fpycp.png",
    social: {
      linkedin: "https://linkedin.com/in/jameswilson",
    },
  },
  {
    name: "Lisa Chang",
    role: "Blockchain Strategist",
    bio: "Blockchain expert and investor. Founder of multiple successful crypto projects and advisor to Web3 gaming platforms.",
    image: "/placeholder.svg?height=128&width=128&query=female%20blockchain%20expert%20profile",
    social: {
      twitter: "https://twitter.com/lisachang",
      linkedin: "https://linkedin.com/in/lisachang",
    },
  },
]

export default function Team() {
  const teamRefs = useRef<(HTMLElement | null)[]>([...teamMembers.map(() => null)])
  const advisorRefs = useRef<(HTMLElement | null)[]>([...advisors.map(() => null)])

  const [teamInView, setTeamInView] = useState<boolean[]>(teamMembers.map(() => false))
  const [advisorInView, setAdvisorInView] = useState<boolean[]>(advisors.map(() => false))

  useEffect(() => {
    const teamObservers = teamRefs.current.map((ref, index) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setTeamInView((prev) => {
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

      if (ref) {
        observer.observe(ref)
      }
      return observer
    })

    const advisorObservers = advisorRefs.current.map((ref, index) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setAdvisorInView((prev) => {
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

      if (ref) {
        observer.observe(ref)
      }
      return observer
    })

    return () => {
      teamObservers.forEach((observer) => observer.disconnect())
      advisorObservers.forEach((observer) => observer.disconnect())
    }
  }, [])

  return (
    <div className="pt-20">
      {/* Hero section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900 to-purple-800 z-0"></div>
        <div className="absolute inset-0 retro-grid opacity-20 z-0"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h1 className="font-pixel text-4xl md:text-5xl text-white mb-6 neon-text">OUR TEAM</h1>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg">
              Meet the passionate individuals behind MemeWars who are working to create the ultimate meme battle arena.
            </p>
          </div>
        </div>
      </section>

      {/* Team members */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-purple-900/30 z-0"></div>

        <div className="container mx-auto px-4 relative z-10">
          <h2 className="font-pixel text-3xl text-white mb-12 text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-400">CORE TEAM</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => {
              return (
                <motion.div
                  key={index}
                  ref={(el) => (teamRefs.current[index] = el)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={teamInView[index] ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="arcade-card overflow-hidden"
                >
                  <div className="h-2 bg-gradient-to-r from-pink-500 to-purple-500"></div>
                  <div className="p-6">
                    <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-2 border-pink-500">
                      <Image
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        width={128}
                        height={128}
                        className="object-cover"
                      />
                    </div>

                    <h3 className="font-pixel text-white text-xl text-center mb-1">{member.name}</h3>
                    <p className="text-cyan-400 text-center text-sm mb-4">{member.role}</p>

                    <p className="text-gray-300 text-sm mb-4">{member.bio}</p>

                    <div className="flex justify-center space-x-4">
                      {member.social.twitter && (
                        <a
                          href={member.social.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-300 hover:text-pink-400 transition-colors"
                          aria-label={`${member.name}'s Twitter`}
                        >
                          <Twitter className="h-5 w-5" />
                        </a>
                      )}
                      {member.social.linkedin && (
                        <a
                          href={member.social.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-300 hover:text-pink-400 transition-colors"
                          aria-label={`${member.name}'s LinkedIn`}
                        >
                          <Linkedin className="h-5 w-5" />
                        </a>
                      )}
                      {member.social.github && (
                        <a
                          href={member.social.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-300 hover:text-pink-400 transition-colors"
                          aria-label={`${member.name}'s GitHub`}
                        >
                          <Github className="h-5 w-5" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Advisors */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-purple-800/30 z-0"></div>

        <div className="container mx-auto px-4 relative z-10">
          <h2 className="font-pixel text-3xl text-white mb-12 text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-yellow-400">ADVISORS</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {advisors.map((advisor, index) => {
              return (
                <motion.div
                  key={index}
                  ref={(el) => (advisorRefs.current[index] = el)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={advisorInView[index] ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="arcade-card overflow-hidden"
                >
                  <div className="h-2 bg-gradient-to-r from-cyan-500 to-blue-500"></div>
                  <div className="p-6">
                    <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-2 border-cyan-500">
                      <Image
                        src={advisor.image || "/placeholder.svg"}
                        alt={advisor.name}
                        width={128}
                        height={128}
                        className="object-cover"
                      />
                    </div>

                    <h3 className="font-pixel text-white text-xl text-center mb-1">{advisor.name}</h3>
                    <p className="text-cyan-400 text-center text-sm mb-4">{advisor.role}</p>

                    <p className="text-gray-300 text-sm mb-4">{advisor.bio}</p>

                    <div className="flex justify-center space-x-4">
                      {advisor.social.twitter && (
                        <a
                          href={advisor.social.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-300 hover:text-cyan-400 transition-colors"
                          aria-label={`${advisor.name}'s Twitter`}
                        >
                          <Twitter className="h-5 w-5" />
                        </a>
                      )}
                      {advisor.social.linkedin && (
                        <a
                          href={advisor.social.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-300 hover:text-cyan-400 transition-colors"
                          aria-label={`${advisor.name}'s LinkedIn`}
                        >
                          <Linkedin className="h-5 w-5" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Join the team */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900 to-purple-950 z-0"></div>
        <div className="absolute inset-0 retro-grid opacity-20 z-0"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto arcade-card p-8">
            <h2 className="font-pixel text-3xl text-white mb-6 text-center neon-text">JOIN OUR TEAM</h2>
            <p className="text-gray-300 mb-6 text-center">
              We're always looking for talented individuals who are passionate about gaming, memes, and creating amazing
              experiences.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="bg-purple-900/50 p-4 rounded">
                <h3 className="font-pixel text-white text-lg mb-2">Open Positions</h3>
                <ul className="space-y-1">
                  <li className="flex items-start">
                    <span className="text-pink-500 mr-2">•</span>
                    <span className="text-gray-300">Senior Game Developer</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-pink-500 mr-2">•</span>
                    <span className="text-gray-300">UI/UX Designer</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-pink-500 mr-2">•</span>
                    <span className="text-gray-300">Community Moderator</span>
                  </li>
                </ul>
              </div>

              <div className="bg-purple-900/50 p-4 rounded">
                <h3 className="font-pixel text-white text-lg mb-2">Benefits</h3>
                <ul className="space-y-1">
                  <li className="flex items-start">
                    <span className="text-pink-500 mr-2">•</span>
                    <span className="text-gray-300">Remote-first culture</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-pink-500 mr-2">•</span>
                    <span className="text-gray-300">Competitive salary</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-pink-500 mr-2">•</span>
                    <span className="text-gray-300">Equity options</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="text-center">
              <a href="/careers" className="arcade-btn text-white inline-block">
                VIEW ALL POSITIONS
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
