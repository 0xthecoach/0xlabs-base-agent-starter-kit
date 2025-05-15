"use client"

import dynamic from "next/dynamic"
import { Suspense } from "react"

// Loading component
function RoadmapLoading() {
  return (
    <div className="pt-20">
      {/* Hero section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900 to-purple-800 z-0"></div>
        <div className="absolute inset-0 retro-grid opacity-20 z-0"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h1 className="font-pixel text-4xl md:text-5xl text-white mb-6 neon-text">ROADMAP</h1>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg">
              Our journey to build the ultimate meme battle arena. See what we've accomplished and what's coming next.
            </p>
          </div>
        </div>
      </section>

      {/* Loading state */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-purple-900/30 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-8 bg-purple-700 rounded w-48 mb-8"></div>
              <div className="h-4 bg-purple-600 rounded w-64 mb-4"></div>
              <div className="h-4 bg-purple-600 rounded w-56 mb-12"></div>

              <div className="flex space-x-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-64 h-80 bg-purple-800/50 rounded-lg p-4">
                    <div className="h-4 bg-purple-600 rounded w-24 mb-4"></div>
                    <div className="h-6 bg-purple-700 rounded w-40 mb-4"></div>
                    <div className="h-3 bg-purple-600 rounded w-full mb-2"></div>
                    <div className="h-3 bg-purple-600 rounded w-5/6 mb-6"></div>
                    <div className="h-24 bg-purple-700/50 rounded w-full"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// Use dynamic import with ssr: false to only load the component on the client side
const RoadmapContent = dynamic(() => import("./roadmap-content"), {
  ssr: false,
  loading: () => <RoadmapLoading />,
})

export default function RoadmapClientWrapper() {
  return (
    <Suspense fallback={<RoadmapLoading />}>
      <RoadmapContent />
    </Suspense>
  )
}
