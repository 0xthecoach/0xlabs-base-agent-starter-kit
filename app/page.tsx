"use client"

import { useState } from "react"
import FeaturedWarriors from "@/components/featured-warriors"
import LeaderboardPreview from "@/components/leaderboard-preview"
import QuestsPreview from "@/components/quests-preview"
import FeaturesPreview from "@/components/features-preview"
import CTA from "@/components/cta"
import LogoCloud from "@/components/logo-cloud"
import { HomeAnimatedList } from "@/components/home-animated-list"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { X } from "lucide-react"

export default function Home() {
  const [videoModalOpen, setVideoModalOpen] = useState(false)

  return (
    <div className="min-h-screen">
      {/* Video Modal */}
      <Dialog open={videoModalOpen} onOpenChange={setVideoModalOpen}>
        <DialogContent className="sm:max-w-[80vw] max-h-[90vh] p-0 bg-black border border-pink-500/40 overflow-hidden">
          <div className="relative w-full aspect-video">
            <button
              onClick={() => setVideoModalOpen(false)}
              className="absolute top-2 right-2 z-50 rounded-full bg-black/70 p-2 text-white hover:bg-black/90 transition-all"
            >
              <X className="h-6 w-6" />
            </button>
            <video
              className="w-full h-full object-contain"
              controls
              autoPlay
              src="https://xsjm-zu7p-vaky.n7.xano.io/vault/lu0MXA_0/Seox85nnagvrhIm2pTVZvXq9eb8/HUZErg../MWTeaser+1.mp4"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </DialogContent>
      </Dialog>

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
          <div className="mb-6 mt-5 pl-[50px]">
            <h1 className="text-2xl md:text-3xl font-pixel neon-text">Start Play!</h1>
            <h2 className="text-sm md:text-lg font-bold mt-2" style={{ color: "#FF69B4" }}>
              Join The Battle!
            </h2>
            <p className="text-gray-900 max-w-md mt-2">
              The ultimate battle arena where internet memes come to life. Collect warriors, battle opponents, and earn
              rewards.
            </p>
            <button
              onClick={() => setVideoModalOpen(true)}
              className="mt-4 px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-medium rounded-lg hover:from-purple-700 hover:to-pink-600 transition-all shadow-lg hover:shadow-pink-500/25 flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <polygon points="10 8 16 12 10 16 10 8" />
              </svg>
              See how it works!
            </button>
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

      {/* Leaderboard Preview - Moved above Features Preview */}
      <LeaderboardPreview />

      {/* Features Preview */}
      <FeaturesPreview />

      {/* Quests Preview */}
      <QuestsPreview />

      {/* Logo Cloud - Added before CTA */}
      <LogoCloud />

      {/* CTA Section */}
      <CTA />
    </div>
  )
}
