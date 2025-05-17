"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { ArcadeConnectButton } from "./thirdweb/connect-button"

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const battleLinkRef = useRef<HTMLDivElement>(null)

  // Function to clear any existing timeout
  const clearDropdownTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }

  // Function to handle mouse enter on Battle item or dropdown
  const handleMouseEnter = () => {
    clearDropdownTimeout()
    setIsDropdownOpen(true)
  }

  // Function to handle mouse leave with delay
  const handleMouseLeave = () => {
    clearDropdownTimeout()
    timeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false)
    }, 1000) // 1-second delay
  }

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      clearDropdownTimeout()
    }
  }, [])

  return (
    <header className="bg-black/50 backdrop-blur-sm py-4 px-6 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-pixel text-white neon-text">MEMEWARS</span>
        </Link>

        <nav className="hidden md:flex space-x-6">
          <Link href="/" className="text-white hover:text-pink-400 transition-colors font-medium">
            Base
          </Link>
          <Link href="/memewarriors" className="text-white hover:text-pink-400 transition-colors font-medium">
            Warriors
          </Link>

          {/* Battle dropdown */}
          <div ref={battleLinkRef} className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <Link
              href="/battle"
              className="text-white hover:text-pink-400 transition-colors font-medium flex items-center gap-1 group"
            >
              Battle
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
              />
            </Link>

            {/* Dropdown menu */}
            <div
              ref={dropdownRef}
              className={`absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-black/80 backdrop-blur-sm border border-pink-500/20 transition-all duration-300 ${
                isDropdownOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
              }`}
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="battle-menu"
            >
              <div className="py-1">
                <Link
                  href="/tournaments"
                  className="block px-4 py-2 text-sm text-white hover:text-pink-400 hover:bg-pink-500/10 transition-colors"
                  role="menuitem"
                >
                  Tournaments
                </Link>
                <Link
                  href="/leaderboard"
                  className="block px-4 py-2 text-sm text-white hover:text-pink-400 hover:bg-pink-500/10 transition-colors"
                  role="menuitem"
                >
                  Leaderboard
                </Link>
              </div>
            </div>
          </div>

          <Link href="/quests" className="text-white hover:text-pink-400 transition-colors font-medium">
            Quests
          </Link>
          <Link href="/profile" className="text-white hover:text-pink-400 transition-colors font-medium">
            Profile
          </Link>
        </nav>

        {/* Mobile menu button - would need to be expanded for full mobile menu */}
        <div className="md:hidden">
          <button className="text-white hover:text-pink-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <ArcadeConnectButton />
        </div>
      </div>
    </header>
  )
}
