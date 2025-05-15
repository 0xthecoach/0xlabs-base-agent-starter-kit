"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Link from "next/link"

export default function CTA() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="py-20 relative" ref={ref}>
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/80 to-purple-800/80 z-10"></div>
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: "url('/images/cta-background.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="font-pixel text-3xl md:text-4xl text-white mb-6 neon-text">JOIN THE BATTLE</h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Ready to enter the arena? Join thousands of players in the ultimate meme battle experience!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/play" className="arcade-btn text-white">
              PLAY NOW
            </Link>
            <Link
              href="/memewarriors"
              className="font-pixel px-6 py-3 rounded-md border-2 border-white text-white hover:bg-white/10 transition-colors"
            >
              EXPLORE WARRIORS
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
