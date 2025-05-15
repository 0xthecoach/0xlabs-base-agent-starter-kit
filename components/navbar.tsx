import Link from "next/link"
import { ConnectWalletButton } from "./connect-wallet-button"

export default function Navbar() {
  return (
    <header className="bg-black/50 backdrop-blur-sm py-4 px-6 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-pixel text-white neon-text">MEMEWARS</span>
        </Link>

        <nav className="hidden md:flex space-x-6">
          <Link href="/" className="text-white hover:text-pink-400 transition-colors font-medium">
            Home
          </Link>
          <Link href="/memewarriors" className="text-white hover:text-pink-400 transition-colors font-medium">
            MemeWarriors
          </Link>
          <Link href="/leaderboard" className="text-white hover:text-pink-400 transition-colors font-medium">
            Leaderboard
          </Link>
          <Link href="/quests" className="text-white hover:text-pink-400 transition-colors font-medium">
            Quests
          </Link>
          <Link href="/profile" className="text-white hover:text-pink-400 transition-colors font-medium">
            Profile
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <ConnectWalletButton />
        </div>
      </div>
    </header>
  )
}
