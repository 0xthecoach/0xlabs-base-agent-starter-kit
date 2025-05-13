"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Link from "next/link"
import Image from "next/image"

export default function CTA() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="py-20 relative" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900 to-purple-950 z-0"></div>
      <div className="absolute inset-0 retro-grid opacity-20 z-0"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto arcade-card overflow-hidden"
        >
          <div className="p-8 md:p-12 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <h2 className="font-pixel text-3xl md:text-4xl text-white mb-4 neon-text">JOIN THE BATTLE</h2>
              <p className="text-gray-300 mb-6">
                Ready to enter the arena? Create your account now and get a free starter pack with 5 random warriors to
                begin your journey!
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/play" className="arcade-btn text-white text-lg">
                  PLAY NOW
                </Link>
                <Link
                  href="/about"
                  className="font-pixel px-6 py-3 rounded-md border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400/20 transition-colors text-lg text-center"
                >
                  LEARN MORE
                </Link>
              </div>
            </div>

            <div className="md:w-1/2 relative">
              <div className="relative h-64 md:h-80">
                <Image src="/images/cta-image.png" alt="Join MemeWars" fill className="object-contain" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <div className="flex justify-center gap-4">
                  <div className="text-center">
                    <p className="font-pixel text-white text-sm">PLAYERS</p>
                    <p className="font-pixel text-cyan-400 text-xl">100K+</p>
                  </div>
                  <div className="text-center">
                    <p className="font-pixel text-white text-sm">WARRIORS</p>
                    <p className="font-pixel text-pink-400 text-xl">500+</p>
                  </div>
                  <div className="text-center">
                    <p className="font-pixel text-white text-sm">BATTLES</p>
                    <p className="font-pixel text-yellow-400 text-xl">2M+</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
