"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/0 via-purple-900/50 to-purple-900 z-10"></div>
        <div className="absolute inset-0 retro-grid opacity-30"></div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-purple-900 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 z-10 pt-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:w-1/2 text-center lg:text-left"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-pixel text-white mb-6 neon-text">
              ENTER THE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-400">
                MEME WARS
              </span>
            </h1>
            <p className="text-xl text-gray-200 mb-8 max-w-xl">
              Battle with your favorite meme characters in the ultimate digital arena. Collect, train, and dominate the
              memeverse!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/play" className="arcade-btn text-white text-lg">
                PLAY NOW
              </Link>
              <Link
                href="/memewarriors"
                className="font-pixel px-6 py-3 rounded-md border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400/20 transition-colors text-lg"
              >
                MEET THE WARRIORS
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:w-1/2 relative"
          >
            <div className="relative w-full h-[400px] md:h-[500px]">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-05-13%20at%2004.08.43-b5RnljweiVpLaIx65MnAq1jqq2tiTO.png"
                alt="MemeWars Characters"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-full max-w-md">
              <div className="arcade-card p-4 text-center">
                <p className="font-pixel text-pink-400 text-sm mb-2">ONLINE PLAYERS</p>
                <p className="font-pixel text-white text-2xl">
                  <span className="text-cyan-400">13,587</span> WARRIORS
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
          className="flex flex-col items-center"
        >
          <span className="font-pixel text-white text-sm mb-2">SCROLL</span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-white"
          >
            <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
          </svg>
        </motion.div>
      </div>
    </div>
  )
}
