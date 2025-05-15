import { Button } from "@/components/ui/button"
import FeaturedWarriors from "@/components/featured-warriors"
import LeaderboardPreview from "@/components/leaderboard-preview"
import QuestsPreview from "@/components/quests-preview"
import FeaturesPreview from "@/components/features-preview"
import CTA from "@/components/cta"
import LogoCloud from "@/components/logo-cloud"

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-32 px-4 relative overflow-hidden min-h-[80vh]">
        <div className="absolute inset-0 z-0 min-h-[80vh] overflow-hidden">
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
        <div className="container mx-auto relative z-10">
          <h1 className="text-5xl md:text-6xl font-pixel mb-6 neon-text">MEMEWARS</h1>
          <p className="text-xl md:text-2xl max-w-3xl mb-10 text-gray-200">
            The ultimate battle arena where internet memes come to life
          </p>
          <div className="flex flex-wrap gap-4 justify-start">
            <Button size="lg" className="arcade-btn">
              PLAY NOW
            </Button>
            <Button size="lg" variant="outline" className="arcade-btn-outline">
              LEARN MORE
            </Button>
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
