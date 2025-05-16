"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ConnectWalletButton } from "@/components/connect-wallet-button"

export function Hero() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="relative w-full overflow-hidden bg-black">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/purple-landscape-bg.png"
          alt="Hero Background"
          fill
          priority
          className="object-cover opacity-60"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div className="flex flex-col justify-center">
            <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
              <span className="block">Meme Wars:</span>
              <span className="block bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                Battle Arena
              </span>
            </h1>
            <p className="mb-8 text-xl text-gray-300">
              Collect, battle, and earn with your favorite meme characters in the ultimate Web3 gaming experience.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/battle">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700"
                >
                  Enter Battle Arena
                </Button>
              </Link>
              <ConnectWalletButton />
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div
              className="relative h-80 w-80 transition-transform duration-500 sm:h-96 sm:w-96"
              style={{ transform: isHovered ? "scale(1.05)" : "scale(1)" }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <Image
                src="/images/banner-website-mw3.png"
                alt="Meme Wars Characters"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
