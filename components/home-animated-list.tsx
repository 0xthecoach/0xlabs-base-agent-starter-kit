"use client"

import { cn } from "@/lib/utils"
import { AnimatedList } from "@/components/magicui/animated-list"

interface MemeFeature {
  name: string
  description: string
  icon: string
  color: string
  status: string
}

const memeFeatures: MemeFeature[] = [
  {
    name: "Battle Arena",
    description: "Fight with your meme warriors in epic battles",
    status: "Live Now",
    icon: "🔥",
    color: "#FF3D71",
  },
  {
    name: "Collect Warriors",
    description: "Build your collection of rare meme characters",
    status: "Trending",
    icon: "👑",
    color: "#FFB800",
  },
  {
    name: "Win Tournaments",
    description: "Compete in weekly tournaments for glory",
    status: "Popular",
    icon: "🏆",
    color: "#00C9A7",
  },
  {
    name: "Earn Rewards",
    description: "Get exclusive rewards and tokens",
    status: "New",
    icon: "💰",
    color: "#1E86FF",
  },
  {
    name: "Social Features",
    description: "Connect with fellow meme enthusiasts",
    status: "Hot",
    icon: "👋",
    color: "#9747FF",
  },
  {
    name: "Daily Challenges",
    description: "Complete quests for special rewards",
    status: "Daily",
    icon: "🎯",
    color: "#F24822",
  },
  {
    name: "Marketplace",
    description: "Trade and sell your rare meme collectibles",
    status: "Open",
    icon: "🛒",
    color: "#38B000",
  },
  {
    name: "Custom Team Building",
    description: "Create your ultimate meme squad",
    status: "Strategy",
    icon: "🧠",
    color: "#3A86FF",
  },
]

const FeatureItem = ({ name, description, icon, color, status }: MemeFeature) => {
  return (
    <figure
      className={cn(
        "relative mx-auto min-h-fit w-full max-w-[320px] cursor-pointer overflow-hidden rounded-xl p-3",
        // animation styles
        "transition-all duration-200 ease-in-out hover:scale-[103%]",
        // dark styles for MemeWars theme
        "transform-gpu bg-black/40 backdrop-blur-md [border:1px_solid_rgba(255,255,255,.1)] [box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <div
          className="flex size-8 items-center justify-center rounded-xl"
          style={{
            backgroundColor: color,
          }}
        >
          <span className="text-base">{icon}</span>
        </div>
        <div className="flex flex-col overflow-hidden">
          <figcaption className="flex flex-row items-center whitespace-pre text-base font-medium text-white">
            <span className="text-xs sm:text-base">{name}</span>
            <span className="mx-1">·</span>
            <span className="text-xs text-pink-400">{status}</span>
          </figcaption>
          <p className="text-xs font-normal text-white/60 truncate">{description}</p>
        </div>
      </div>
    </figure>
  )
}

export function HomeAnimatedList({
  className,
}: {
  className?: string
}) {
  return (
    <div className={cn("relative flex w-full flex-col overflow-hidden", className)}>
      <AnimatedList delay={2000} maxVisibleItems={4}>
        {memeFeatures.map((item, idx) => (
          <FeatureItem {...item} key={idx} />
        ))}
      </AnimatedList>
    </div>
  )
}
