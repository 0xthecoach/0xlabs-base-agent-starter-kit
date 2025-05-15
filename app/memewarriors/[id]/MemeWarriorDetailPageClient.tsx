"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { memeWarriors } from "@/lib/data"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Trophy,
  Zap,
  Shield,
  Brain,
  Twitter,
  Globe,
  MessageSquare,
  ChevronLeft,
  CheckCircle2,
  BarChart3,
  Users,
  Award,
} from "lucide-react"

type Props = {
  params: { id: string }
}

export default function MemeWarriorDetailPageClient({ params }: Props) {
  const [isFollowing, setIsFollowing] = useState(false)
  const warrior = memeWarriors.find((w) => w.id === params.id)

  if (!warrior) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-pixel mb-4 text-pink-400">Warrior Not Found</h1>
        <p className="mb-8">The warrior you're looking for doesn't exist or has been removed.</p>
        <Link href="/memewarriors" className="pink-button">
          Back to Warriors
        </Link>
      </div>
    )
  }

  const winRate =
    warrior.wins + warrior.losses > 0 ? ((warrior.wins / (warrior.wins + warrior.losses)) * 100).toFixed(1) : "0.0"

  // Mock data for the expanded profile
  const profileData = {
    followers: "24.5K",
    following: "158",
    likes: "1.2M",
    handle: `@${warrior.id}warrior`,
    website: `${warrior.id}.memewars.io`,
    powerLevel: "9,850",
    battlesWon: "124",
    winRate: "92%",
    rank: "#3",
    tokenPrice: "$42.69",
    priceChange: "+15.4%",
    volume: "$8.5M",
    marketCap: "$128M",
    totalSupply: "10,000,000",
    circulatingSupply: "3,500,000",
    supplyRatio: "35%",
    quote: `"I don't just predict the market, I am the market."`,
    specialAbilities: [
      {
        name: "Alpha Entry",
        description:
          "Identifies undervalued assets with 90% accuracy, providing a 3x damage multiplier on first attack",
        icon: <Zap className="w-6 h-6 text-cyan-400" />,
      },
      {
        name: "Diamond Hands",
        description: "Immune to FUD attacks and market manipulation, reduces damage taken by 50%",
        icon: <Shield className="w-6 h-6 text-cyan-400" />,
      },
      {
        name: "Chad Effect",
        description: "Presence boosts ally morale by 30% and intimidates opponents, reducing their accuracy",
        icon: <Users className="w-6 h-6 text-cyan-400" />,
      },
      {
        name: "Market Mastery",
        description: "Can predict market trends with 85% accuracy, increasing critical hit chance by 25%",
        icon: <BarChart3 className="w-6 h-6 text-cyan-400" />,
      },
    ],
    freeAbilities: [
      {
        name: "Market Insight",
        description: "Provides daily market analysis with 75% accuracy, giving a strategic advantage in trading",
        icon: <BarChart3 className="w-6 h-6 text-green-400" />,
      },
      {
        name: "Community Shield",
        description: "Rallies community support during attacks, reducing damage by 30% and boosting morale",
        icon: <Shield className="w-6 h-6 text-green-400" />,
      },
      {
        name: "Viral Spread",
        description: "Content has a 25% chance to go viral, increasing visibility and attracting new allies",
        icon: <Globe className="w-6 h-6 text-green-400" />,
      },
      {
        name: "Meme Magic",
        description: "Creates powerful memes that confuse opponents, reducing their accuracy by 20%",
        icon: <Zap className="w-6 h-6 text-green-400" />,
      },
    ],
    battleStats: {
      strength: 93,
      defense: 85,
      speed: 80,
      intelligence: 90,
    },
    achievements: [
      {
        name: "Market Dominator",
        description: "Top 1% of traders by volume",
        icon: <Award className="w-6 h-6 text-yellow-400" />,
      },
      {
        name: "Battle Champion",
        description: "Won 100+ consecutive battles",
        icon: <Trophy className="w-6 h-6 text-gray-400" />,
      },
      {
        name: "Sigma Academy",
        description: "Trained 1000+ warriors",
        icon: <Brain className="w-6 h-6 text-orange-400" />,
      },
    ],
    activationProgress: [
      { name: "Social Released", completed: true },
      { name: "Tokens Airdrop", completed: true },
      { name: "Utility Skills", completed: true },
      { name: "Early Access", completed: true },
      { name: "Token Launch", completed: false },
    ],
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <div className="mb-6">
        <Link href="/memewarriors" className="text-pink-400 hover:text-pink-300 flex items-center">
          <ChevronLeft className="mr-1" /> Back to Warriors
        </Link>
      </div>

      {/* Hero Section */}
      <div className="relative w-full h-48 md:h-64 bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-lg mb-16 overflow-hidden">
        <div className="absolute inset-0 retro-grid opacity-30"></div>
      </div>

      {/* Profile Section */}
      <div className="relative -mt-20 mb-8 flex flex-col md:flex-row items-center md:items-start gap-6">
        {/* Avatar */}
        <div className="relative">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-purple-600 glow-effect">
            <Image
              src="/placeholder-5fxsx.png"
              alt={warrior.name}
              width={160}
              height={160}
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute bottom-0 right-0 bg-yellow-500 text-xs font-pixel px-2 py-1 rounded">
            {warrior.rarity}
          </div>
        </div>

        {/* Profile Info */}
        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-2 mb-2">
            <h1 className="text-3xl md:text-4xl font-pixel text-white neon-text">{warrior.name}</h1>
            <Badge className="bg-blue-600 hover:bg-blue-700">Verified</Badge>
          </div>
          <p className="text-gray-300 mb-4">{warrior.description}</p>

          {/* Stats */}
          <div className="flex justify-center md:justify-start gap-6 mb-4">
            <div className="text-center">
              <div className="text-xl font-bold text-white">{profileData.followers}</div>
              <div className="text-xs text-gray-400">Followers</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-white">{profileData.following}</div>
              <div className="text-xs text-gray-400">Following</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-white">{profileData.likes}</div>
              <div className="text-xs text-gray-400">Likes</div>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex justify-center md:justify-start gap-4 mb-4">
            <div className="flex items-center text-cyan-400">
              <Twitter className="w-4 h-4 mr-1" />
              <span className="text-sm">{profileData.handle}</span>
            </div>
            <div className="flex items-center text-cyan-400">
              <Globe className="w-4 h-4 mr-1" />
              <span className="text-sm">{profileData.website}</span>
            </div>
          </div>
        </div>

        {/* Follow Button */}
        <div>
          <button
            onClick={() => setIsFollowing(!isFollowing)}
            className={`px-6 py-2 rounded-md font-pixel text-sm ${
              isFollowing ? "bg-gray-700 text-white" : "pink-button"
            }`}
          >
            {isFollowing ? "Following" : "Follow"}
          </button>
        </div>
      </div>

      {/* Activation Progress */}
      <div className="arcade-card p-6 mb-8">
        <h2 className="section-title text-lg mb-6">ACTIVATION PROGRESS</h2>
        <div className="relative">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-700 transform -translate-y-1/2"></div>
          <div className="flex justify-between relative">
            {profileData.activationProgress.map((step, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className={`w-6 h-6 rounded-full z-10 ${
                    step.completed ? "bg-green-500" : "bg-gray-700"
                  } flex items-center justify-center`}
                >
                  {step.completed && <CheckCircle2 className="w-4 h-4 text-white" />}
                </div>
                <div className="text-xs text-center mt-2 max-w-[80px] text-white">{step.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="arcade-card p-4 text-center">
          <div className="text-sm font-pixel text-cyan-400 mb-1">POWER LEVEL</div>
          <div className="text-2xl font-bold text-white">{profileData.powerLevel}</div>
        </div>
        <div className="arcade-card p-4 text-center">
          <div className="text-sm font-pixel text-cyan-400 mb-1">BATTLES WON</div>
          <div className="text-2xl font-bold text-white">{profileData.battlesWon}</div>
        </div>
        <div className="arcade-card p-4 text-center">
          <div className="text-sm font-pixel text-cyan-400 mb-1">WIN RATE</div>
          <div className="text-2xl font-bold text-white">{profileData.winRate}</div>
        </div>
        <div className="arcade-card p-4 text-center">
          <div className="text-sm font-pixel text-cyan-400 mb-1">RANK</div>
          <div className="text-2xl font-bold text-white">{profileData.rank}</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Tabs defaultValue="about">
            <TabsList className="mb-6">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="gallery">Gallery</TabsTrigger>
              <TabsTrigger value="stats">Stats</TabsTrigger>
              <TabsTrigger value="community">Community</TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="arcade-card p-6 mb-8">
              <blockquote className="border-l-4 border-purple-500 pl-4 italic text-gray-300 mb-6">
                {profileData.quote}
              </blockquote>
              <p className="text-gray-300 mb-6">
                In the volatile realm of the digital frontier, where fortunes are made and lost in the blink of an eye,
                one figure stands as the embodiment of unwavering confidence and strategic mastery: {warrior.name}.
                Unlike the emotional traders who panic at the first sign of a dip, or the overly cautious who miss
                opportunities,
                {warrior.name} has perfected the art of timing and precision.
              </p>
            </TabsContent>

            <TabsContent value="gallery">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div key={item} className="arcade-card overflow-hidden">
                    <div className="aspect-square bg-purple-900/30">
                      <Image
                        src={`/abstract-geometric-shapes.png?height=300&width=300&query=${warrior.name} meme ${item}`}
                        alt={`${warrior.name} gallery image ${item}`}
                        width={300}
                        height={300}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="stats">
              <div className="arcade-card p-6">
                <h3 className="text-xl font-pixel mb-4 text-white">Battle History</h3>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <div key={item} className="flex justify-between items-center border-b border-gray-700 pb-2">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-purple-900/50 rounded-full mr-3"></div>
                        <div>
                          <div className="text-white">Battle #{Math.floor(Math.random() * 1000)}</div>
                          <div className="text-xs text-gray-400">{new Date().toLocaleDateString()}</div>
                        </div>
                      </div>
                      <Badge className={item % 2 === 0 ? "bg-red-600" : "bg-green-600"}>
                        {item % 2 === 0 ? "LOSS" : "WIN"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="community">
              <div className="arcade-card p-6">
                <h3 className="text-xl font-pixel mb-4 text-white">Community Posts</h3>
                <div className="space-y-6">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="border-b border-gray-700 pb-4">
                      <div className="flex items-center mb-3">
                        <div className="w-10 h-10 bg-purple-900/50 rounded-full mr-3"></div>
                        <div>
                          <div className="text-white">User#{Math.floor(Math.random() * 1000)}</div>
                          <div className="text-xs text-gray-400">{new Date().toLocaleDateString()}</div>
                        </div>
                      </div>
                      <p className="text-gray-300 mb-3">
                        {warrior.name} just pulled off an amazing move in the latest tournament! Can't believe that
                        comeback! 🔥🚀
                      </p>
                      <div className="flex gap-4 text-gray-400 text-sm">
                        <button className="flex items-center">
                          <MessageSquare className="w-4 h-4 mr-1" /> 12
                        </button>
                        <button className="flex items-center">
                          <Award className="w-4 h-4 mr-1" /> 48
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Special Abilities */}
          <div className="arcade-card p-6 mb-8">
            <h2 className="section-title text-lg mb-6">SPECIAL ABILITIES</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {profileData.specialAbilities.map((ability, index) => (
                <div key={index} className="bg-black/30 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <div className="mr-2 bg-cyan-900/30 p-2 rounded-full">{ability.icon}</div>
                    <h3 className="font-pixel text-cyan-400 text-sm">{ability.name}</h3>
                  </div>
                  <p className="text-sm text-gray-300">{ability.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Free Abilities */}
          <div className="arcade-card p-6 mb-8">
            <h2 className="section-title text-lg mb-6">FREE ABILITIES</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {profileData.freeAbilities.map((ability, index) => (
                <div key={index} className="bg-black/30 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <div className="mr-2 bg-green-900/30 p-2 rounded-full">{ability.icon}</div>
                    <h3 className="font-pixel text-green-400 text-sm">{ability.name}</h3>
                  </div>
                  <p className="text-sm text-gray-300">{ability.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 space-y-8">
          {/* Token Economics */}
          <div className="arcade-card p-6">
            <h2 className="section-title text-lg mb-4">Token Economics</h2>

            <div className="flex justify-between items-center mb-4">
              <div>
                <div className="text-sm text-gray-400">Current Price</div>
                <div className="flex items-center">
                  <div className="text-2xl font-bold text-white">{profileData.tokenPrice}</div>
                  <div className="ml-2 text-sm text-green-500">{profileData.priceChange}</div>
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-400">24h Volume</div>
                <div className="text-lg font-bold text-white">{profileData.volume}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="text-sm text-gray-400">Market Cap</div>
                <div className="text-lg font-bold text-white">{profileData.marketCap}</div>
              </div>
              <div>
                <div className="text-sm text-gray-400">Total Supply</div>
                <div className="text-lg font-bold text-white">{profileData.totalSupply}</div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <div className="text-sm text-gray-400">Circulating Supply</div>
                <div className="text-sm text-gray-400">Supply Ratio</div>
              </div>
              <div className="flex justify-between mb-2">
                <div className="text-lg font-bold text-white">{profileData.circulatingSupply}</div>
                <div className="text-lg font-bold text-white">{profileData.supplyRatio}</div>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full"
                  style={{ width: profileData.supplyRatio }}
                ></div>
              </div>
              <div className="text-xs text-gray-400 mt-1 text-right">{profileData.supplyRatio} in circulation</div>
            </div>
          </div>

          {/* Battle Stats */}
          <div className="arcade-card p-6">
            <h2 className="section-title text-lg mb-4">BATTLE STATS</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <div className="text-sm font-pixel text-white">STRENGTH</div>
                  <div className="text-sm font-pixel text-cyan-400">{profileData.battleStats.strength}/100</div>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full"
                    style={{ width: `${profileData.battleStats.strength}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <div className="text-sm font-pixel text-white">DEFENSE</div>
                  <div className="text-sm font-pixel text-cyan-400">{profileData.battleStats.defense}/100</div>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full"
                    style={{ width: `${profileData.battleStats.defense}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <div className="text-sm font-pixel text-white">SPEED</div>
                  <div className="text-sm font-pixel text-cyan-400">{profileData.battleStats.speed}/100</div>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                    style={{ width: `${profileData.battleStats.speed}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <div className="text-sm font-pixel text-white">INTELLIGENCE</div>
                  <div className="text-sm font-pixel text-cyan-400">{profileData.battleStats.intelligence}/100</div>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                    style={{ width: `${profileData.battleStats.intelligence}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="arcade-card p-6">
            <h2 className="section-title text-lg mb-4">ACHIEVEMENTS</h2>
            <div className="space-y-4">
              {profileData.achievements.map((achievement, index) => (
                <div key={index} className="flex items-center p-3 bg-black/30 rounded-lg">
                  <div className="mr-3 bg-gray-800 p-2 rounded-full">{achievement.icon}</div>
                  <div>
                    <div className="font-pixel text-white">{achievement.name}</div>
                    <div className="text-xs text-gray-400">{achievement.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div className="arcade-card p-6">
            <h2 className="section-title text-lg mb-4">CONNECT</h2>
            <div className="flex justify-center gap-4">
              <button className="w-12 h-12 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center">
                <Twitter className="w-6 h-6 text-white" />
              </button>
              <button className="w-12 h-12 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center">
                <Globe className="w-6 h-6 text-white" />
              </button>
              <button className="w-12 h-12 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-16 mb-8 text-center">
        <h2 className="section-title text-lg mb-4">JOIN THE BATTLE</h2>
        <p className="text-gray-300 max-w-2xl mx-auto mb-8">
          Ready to enter the arena? Join thousands of players in the ultimate meme battle experience!
        </p>
        <button className="pink-button text-lg">PLAY NOW</button>
      </div>
    </div>
  )
}
