import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

export default function ThirdwebTestPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-pixel mb-8 text-center neon-text">Thirdweb Integration Test Pages</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Original Connect Page */}
        <Link href="/thirdweb-test/connect">
          <Card className="arcade-card h-full cursor-pointer transform transition-transform hover:scale-105">
            <CardContent className="p-6">
              <h2 className="text-2xl font-pixel mb-4 text-center">Basic Connect</h2>
              <div className="aspect-video bg-purple-900/50 rounded-lg flex items-center justify-center mb-4">
                <span className="text-5xl">🔌</span>
              </div>
              <p className="text-sm">Simple wallet connection with Thirdweb's account abstraction</p>
            </CardContent>
          </Card>
        </Link>

        {/* Battle Arena Page */}
        <Link href="/thirdweb-test/battle-arena">
          <Card className="arcade-card h-full cursor-pointer transform transition-transform hover:scale-105">
            <CardContent className="p-6">
              <h2 className="text-2xl font-pixel mb-4 text-center">Battle Arena</h2>
              <div className="aspect-video bg-purple-900/50 rounded-lg flex items-center justify-center mb-4">
                <span className="text-5xl">⚔️</span>
              </div>
              <p className="text-sm">Battle arena with wallet connection and NFT integration</p>
            </CardContent>
          </Card>
        </Link>

        {/* Marketplace Page */}
        <Link href="/thirdweb-test/marketplace">
          <Card className="arcade-card h-full cursor-pointer transform transition-transform hover:scale-105">
            <CardContent className="p-6">
              <h2 className="text-2xl font-pixel mb-4 text-center">Marketplace</h2>
              <div className="aspect-video bg-purple-900/50 rounded-lg flex items-center justify-center mb-4">
                <span className="text-5xl">🛒</span>
              </div>
              <p className="text-sm">NFT marketplace with wallet connection</p>
            </CardContent>
          </Card>
        </Link>

        {/* Profile Dashboard Page */}
        <Link href="/thirdweb-test/profile-dashboard">
          <Card className="arcade-card h-full cursor-pointer transform transition-transform hover:scale-105">
            <CardContent className="p-6">
              <h2 className="text-2xl font-pixel mb-4 text-center">Profile Dashboard</h2>
              <div className="aspect-video bg-purple-900/50 rounded-lg flex items-center justify-center mb-4">
                <span className="text-5xl">👤</span>
              </div>
              <p className="text-sm">User profile dashboard with wallet details</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}
