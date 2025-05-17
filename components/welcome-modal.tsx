"use client"

import { useEffect, useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { X } from "lucide-react"
import Image from "next/image"

export default function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Check if this is the first visit
    const hasVisited = localStorage.getItem("hasVisitedBefore")

    if (!hasVisited) {
      // If first visit, show modal and set flag
      setIsOpen(true)
      localStorage.setItem("hasVisitedBefore", "true")
    }
  }, [])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[900px] p-0 bg-gradient-to-br from-purple-900 to-purple-800 border border-pink-500/40 overflow-hidden rounded-lg">
        <div className="flex flex-col md:flex-row">
          {/* Left column - Text (2/3 width) */}
          <div className="w-full md:w-2/3 p-4 flex flex-col justify-center">
            <h2 className="font-pixel text-lg text-white mb-2 neon-text">⚠️ Heads Up, MemeWarrior! ⚠️</h2>
            <p className="text-gray-200 mb-2 text-xs">
              Before you dive into the madness, just a quick and honest heads-up: MemeWars is super early and not even
              in beta yet! This is a BASE Buildathon project, created in just 5 days of part-time development. We're
              being fully transparent – there's a lot more to come, and we're still building out the battlefield! 🎮
            </p>

            <p className="text-gray-200 mb-1 text-xs font-bold">Here's what you need to know:</p>

            <ul className="space-y-1 text-gray-200 text-xs mb-2">
              <li className="flex">
                <span className="mr-1">🚀</span>
                <span>
                  <strong>Hackathon Origins:</strong> Built during the BASE Buildathon – a wild 5-day coding sprint
                  that's just the beginning of the MemeWars journey.
                </span>
              </li>
              <li className="flex">
                <span className="mr-1">🛠️</span>
                <span>
                  <strong>Still in Development:</strong> This is not a beta yet, just a very early version. Some
                  features might be MIA or buggy – we're in the trenches working hard to improve things.
                </span>
              </li>
              <li className="flex">
                <span className="mr-1">📜</span>
                <span>
                  <strong>Roadmap Coming Soon:</strong> We've got a clear battle plan – check out our roadmap for
                  exciting milestones that are coming very soon.
                </span>
              </li>
              <li className="flex">
                <span className="mr-1">🤝</span>
                <span>
                  <strong>Join the Army:</strong> If you're vibing with us so far, follow us on Twitter (X) to stay
                  updated, give feedback, and help us grow the MemeWars community.
                </span>
              </li>
            </ul>

            <p className="text-gray-200 mb-2 text-xs">
              We're all about being transparent – and your feedback is key to making MemeWars epic for everyone. Thanks
              for being part of this adventure from the very start! Let's build something awesome, together! 💥
            </p>

            <div className="mt-1">
              <button
                onClick={() => setIsOpen(false)}
                className="arcade-btn text-white text-xs px-3 py-0.5 text-center"
              >
                I UNDERSTAND
              </button>
            </div>
          </div>

          {/* Right column - Image (1/3 width) */}
          <div className="w-full md:w-1/3 relative">
            <Image
              src="/images/arcade-cabinet.png"
              alt="MemeWars Arcade Cabinet"
              width={500}
              height={600}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute right-3 top-3 z-50 rounded-full bg-black/70 p-1.5 text-white hover:bg-black/90 transition-all"
        >
          <X className="h-3 w-3" />
        </button>
      </DialogContent>
    </Dialog>
  )
}
