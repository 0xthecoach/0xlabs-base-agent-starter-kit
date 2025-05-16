import FeaturedWarriors from "@/components/featured-warriors"
import LeaderboardPreview from "@/components/leaderboard-preview"
import QuestsPreview from "@/components/quests-preview"
import FeaturesPreview from "@/components/features-preview"
import CTA from "@/components/cta"
import LogoCloud from "@/components/logo-cloud"
import { HomeAnimatedList } from "@/components/home-animated-list"

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 px-4 relative overflow-hidden h-[80vh] flex items-end justify-end flex-col">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            className="absolute w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            style={{ opacity: 0.9 }}
          >
            <source
              src="https://xsjm-zu7p-vaky.n7.xano.io/vault/lu0MXA_0/RgaypqVreYz__yvyXo7VBq5M4hY/QUsIfA../1747129235841971.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="container mx-auto relative z-10 mb-0">
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-pixel neon-text">Start Play!</h1>
            <h2 className="text-xl md:text-2xl font-bold text-pink-400 mt-2">MEMEWARS ARENA</h2>
            <p className="text-gray-200 max-w-md mt-2">
              The ultimate battle arena where internet memes come to life. Collect warriors, battle opponents, and earn
              rewards.
            </p>
          </div>
          <div
            className="max-w-md h-[320px] overflow-hidden"
            style={{ transform: "scale(0.8)", transformOrigin: "bottom" }}
          >
            <HomeAnimatedList />
          </div>
        </div>
      </section>

      {/* Featured Warriors */}
      <FeaturedWarriors />

      {/* Features Preview */}
      <FeaturesPreview />

      {/* Leaderboard Preview */}
      <LeaderboardPreview />

      {/* Quests Preview */}
      <QuestsPreview />

      {/* Logo Cloud - Added before CTA */}
      <LogoCloud />

      {/* CTA Section */}
      <CTA />
    </div>
  )
}
