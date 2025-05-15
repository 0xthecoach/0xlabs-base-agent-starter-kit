import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Features | MemeWars",
  description: "Explore all the features of the MemeWars game",
}

const features = [
  {
    id: "battle",
    title: "BATTLE ARENA",
    description:
      "Enter the Battle Arena and fight against other players in real-time. Use your MemeWarriors' unique abilities to outsmart and defeat your opponents. Climb the ranks and become the ultimate Meme Champion!",
    image: "/placeholder-574wk.png",
    color: "from-blue-600 to-cyan-400",
  },
  {
    id: "rewards",
    title: "EARN REWARDS",
    description:
      "Complete daily quests, win battles, and participate in events to earn tokens and rare collectibles. The more you play, the more you earn. Use your rewards to upgrade your warriors or trade them with other players.",
    image: "/placeholder-15rvz.png",
    color: "from-yellow-500 to-orange-500",
  },
  {
    id: "tournaments",
    title: "TOURNAMENTS",
    description:
      "Join weekly tournaments with massive prize pools. Compete against the best players and showcase your skills. Each tournament has unique rules and restrictions, keeping the competition fresh and exciting.",
    image: "/placeholder-virgk.png",
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "social",
    title: "SOCIAL FEATURES",
    description:
      "Join guilds, make friends, and chat with other players. Collaborate with your guild members to complete guild quests and earn exclusive rewards. The stronger your guild, the greater the rewards!",
    image: "/placeholder-a7kj9.png",
    color: "from-purple-600 to-pink-500",
  },
  {
    id: "marketplace",
    title: "MARKETPLACE",
    description:
      "Buy, sell, and trade your MemeWarriors and items in the Marketplace. Find rare warriors to complete your collection or sell your duplicates for profit. The marketplace is player-driven, with prices determined by supply and demand.",
    image: "/placeholder-jh0dj.png",
    color: "from-red-600 to-pink-500",
  },
]

export default function FeaturesPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-pixel mb-4 neon-text">GAME FEATURES</h1>
        <p className="text-lg max-w-3xl mx-auto">
          Explore all the exciting features that make MemeWars the ultimate meme gaming experience
        </p>
      </div>

      <div className="space-y-24">
        {features.map((feature, index) => (
          <div
            key={feature.id}
            className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-8 items-center`}
          >
            <div className="w-full md:w-1/2">
              <div className="arcade-card overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${feature.color}`}></div>
                <div className="p-4">
                  <Image
                    src={feature.image || "/placeholder.svg"}
                    alt={feature.title}
                    width={800}
                    height={450}
                    className="rounded-lg"
                  />
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl font-pixel mb-4 neon-text">{feature.title}</h2>
              <p className="text-gray-300 mb-6">{feature.description}</p>
              <Link href={`/${feature.id}`} className="arcade-btn inline-block text-white">
                EXPLORE {feature.title}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
