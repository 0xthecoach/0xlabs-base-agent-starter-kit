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
  X,
  Send,
} from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// Remove these imports
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Add this custom CSS for tooltips
const tooltipStyles = `
  .fixed-tooltip {
    position: absolute;
    z-index: 9999;
  }
  
  /* Ensure parent containers don't clip the tooltips */
  .arcade-card {
    overflow: visible !important;
  }
  
  /* Tooltip styling */
  .tooltip-container {
    border: 1px solid rgba(255, 0, 255, 0.4);
    box-shadow: 0 0 8px rgba(255, 0, 255, 0.3);
  }
  
  .tooltip-title {
    color: #00ffff;
    font-weight: 600;
  }
`

type Props = {
  params: { id: string }
  warriorData?: any // Optional pre-fetched data
  apiData?: any // Original API data
}

export default function MemeWarriorDetailPageClient({ params, warriorData, apiData }: Props) {
  const [isFollowing, setIsFollowing] = useState(false)
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isTryNowModalOpen, setIsTryNowModalOpen] = useState(false)
  const [isMintModalOpen, setIsMintModalOpen] = useState(false)
  const [mintingStep, setMintingStep] = useState(0)
  const [mintingComplete, setMintingComplete] = useState(false)

  // Use pre-fetched data if available, otherwise find from the local data
  const warrior = warriorData || memeWarriors.find((w) => w.id === params.id)

  // Function to simulate the minting process
  const simulateMintingProcess = () => {
    setMintingStep(0)
    setMintingComplete(false)

    // Simulate the minting process with timed steps
    const steps = [
      { step: 1, time: 1500 }, // Connecting wallet
      { step: 2, time: 2000 }, // Preparing transaction
      { step: 3, time: 2500 }, // Signing transaction
      { step: 4, time: 3000 }, // Submitting to blockchain
      { step: 5, time: 3500 }, // Confirming transaction
      { step: 6, time: 2000 }, // Minting NFT
      { step: 7, time: 1500 }, // Finalizing
    ]

    let totalDelay = 0
    steps.forEach(({ step, time }) => {
      totalDelay += time
      setTimeout(() => setMintingStep(step), totalDelay)
    })

    // Set minting complete after all steps
    setTimeout(() => setMintingComplete(true), totalDelay + 1000)
  }

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

  // Get the origin story from the API data if available
  const originStory = apiData?.Origin_Story || warrior.description

  // Get cover image from API data
  const coverImage = apiData?.Cover_image?.url || "/images/header-background.png"

  // Function to truncate text to a specific length
  const truncateText = (text: string, maxLength: number) => {
    if (!text || text.length <= maxLength) return text
    return text.slice(0, maxLength) + "..."
  }

  // Truncate the description for display
  const truncatedDescription = truncateText(warrior.description, 120)

  // Get gallery images from API data
  const galleryImages = apiData
    ? [apiData.gal_1?.url, apiData.gal_2?.url, apiData.gal_3?.url, apiData.gal_4?.url, apiData.gal_5?.url].filter(
        Boolean,
      ) // Filter out null/undefined values
    : []

  // Use profile photo as first image if available
  if (apiData?.profile_photos?.[0]?.url) {
    galleryImages.unshift(apiData.profile_photos[0].url)
  }

  // Add fallback images if needed
  if (galleryImages.length === 0) {
    galleryImages.push("/abstract-geometric-shapes.png")
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
      {
        name: "Social Released",
        completed: true,
        description:
          "Social features have been fully deployed, allowing warriors to connect, share achievements, and build communities. This includes profile pages, follower systems, and social feeds.",
      },
      {
        name: "Tokens Airdrop",
        completed: true,
        description:
          "Initial token distribution to early adopters and community members. These tokens provide governance rights and access to premium features within the ecosystem.",
      },
      {
        name: "Utility Skills",
        completed: true,
        description:
          "Special abilities and skills have been unlocked for warriors, enabling unique advantages in battles and tournaments. These include passive buffs and active abilities.",
      },
      {
        name: "Early Access",
        completed: true,
        description:
          "Limited access to the platform for founding members and early supporters. This phase included beta testing of core features and gathering community feedback.",
      },
      {
        name: "Token Launch",
        completed: false,
        description:
          "Public launch of the token on major exchanges, enabling wider participation in the ecosystem. This will unlock the full economic potential of the platform.",
      },
    ],
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Add this style tag */}
      <style jsx global>
        {tooltipStyles}
      </style>
      {/* Story Modal */}
      <Dialog open={isStoryModalOpen} onOpenChange={setIsStoryModalOpen}>
        <DialogContent className="sm:max-w-[600px] bg-gray-900 border border-purple-600">
          <DialogHeader>
            <DialogTitle className="text-2xl font-pixel text-pink-400">Origin Story</DialogTitle>
            <button
              onClick={() => setIsStoryModalOpen(false)}
              className="absolute right-4 top-4 text-gray-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </DialogHeader>
          <div className="mt-4 text-gray-300 max-h-[70vh] overflow-y-auto">
            {originStory.split("\n").map((paragraph: string, index: number) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Image Modal */}
      <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
        <DialogContent className="sm:max-w-[80vw] max-h-[90vh] bg-gray-900 border border-purple-600 p-2">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute right-2 top-2 text-gray-400 hover:text-white z-10"
          >
            <X className="h-6 w-6" />
          </button>
          {selectedImage && (
            <div className="w-full h-full flex items-center justify-center">
              <img
                src={selectedImage || "/placeholder.svg"}
                alt="Gallery image"
                className="max-w-full max-h-[80vh] object-contain"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Try Now Modal */}
      <Dialog open={isTryNowModalOpen} onOpenChange={setIsTryNowModalOpen}>
        <DialogContent className="sm:max-w-[900px] p-0 bg-gray-900 border border-purple-600 overflow-hidden">
          <button
            onClick={() => setIsTryNowModalOpen(false)}
            className="absolute right-2 top-2 text-gray-400 hover:text-white z-10"
          >
            <X className="h-6 w-6" />
          </button>
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left Column - Image with title and subtitle */}
            <div className="relative h-[400px] md:h-[500px]">
              <img
                src={apiData?.profile_photos?.[0]?.url || "/abstract-geometric-shapes.png"}
                alt="Ability demonstration"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-900/50 to-transparent opacity-50"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
                <h3 className="text-2xl font-pixel text-white mb-2">Master Your Abilities</h3>
                <p className="text-gray-300">Learn how to use your free abilities to gain an edge in battle</p>
              </div>
            </div>

            {/* Right Column - Chatbot */}
            <div className="flex flex-col h-[400px] md:h-[500px]">
              <div className="bg-gray-800 p-4 border-b border-gray-700">
                <h3 className="font-pixel text-white">Abilities Assistant</h3>
              </div>
              <div className="flex-1 p-4 overflow-y-auto bg-gray-900">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center mr-2">
                      <span className="text-white font-bold">AI</span>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-3 max-w-[80%]">
                      <p className="text-white">
                        Hello! I'm your abilities assistant. How can I help you master your free abilities today?
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start justify-end">
                    <div className="bg-purple-600 rounded-lg p-3 max-w-[80%]">
                      <p className="text-white">How do I use the Community Shield ability?</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center ml-2">
                      <span className="text-white font-bold">You</span>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center mr-2">
                      <span className="text-white font-bold">AI</span>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-3 max-w-[80%]">
                      <p className="text-white">
                        The Community Shield ability is activated during battles when your health drops below 30%. It
                        rallies community support, reducing incoming damage by 30% for 3 turns and boosting your team's
                        morale, giving a 15% attack bonus.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4 border-t border-gray-700 bg-gray-800">
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Ask about abilities..."
                    className="flex-1 bg-gray-700 border-none rounded-l-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                  <button className="bg-purple-600 text-white px-4 rounded-r-md hover:bg-purple-700 flex items-center justify-center">
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Mint NFT Modal */}
      <Dialog
        open={isMintModalOpen}
        onOpenChange={(open) => {
          setIsMintModalOpen(open)
          if (!open) {
            setMintingStep(0)
            setMintingComplete(false)
          }
        }}
      >
        <DialogContent className="sm:max-w-[650px] bg-gray-900 border border-purple-600 p-0 overflow-hidden">
          <div className="bg-gradient-to-r from-purple-900 to-pink-900 p-4">
            <DialogHeader>
              <DialogTitle className="text-2xl font-pixel text-white flex items-center">
                <div className="mr-2 bg-purple-600 p-1 rounded">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                Minting Warrior NFT
              </DialogTitle>
              <button
                onClick={() => setIsMintModalOpen(false)}
                className="absolute right-4 top-4 text-gray-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </DialogHeader>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* NFT Preview */}
              <div className="flex flex-col items-center">
                <div className="relative w-full max-w-[220px] aspect-square mx-auto mb-4 rounded-lg overflow-hidden border-2 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                  <img
                    src={apiData?.profile_photos?.[0]?.url || "/placeholder-5fxsx.png"}
                    alt={warrior.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

                  {/* Holographic overlay effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 opacity-50"></div>
                  <div className="absolute inset-0 retro-grid opacity-20"></div>

                  <div className="absolute bottom-0 left-0 right-0 p-3 text-center">
                    <div className="text-white font-pixel text-sm">{warrior.name}</div>
                    <div className="text-xs text-gray-300">Special Ability Card</div>
                  </div>

                  {!mintingComplete && mintingStep > 0 && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                      <div className="relative">
                        <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                        <div className="absolute inset-0 flex items-center justify-center text-xs text-white font-pixel">
                          {Math.round((mintingStep / 7) * 100)}%
                        </div>
                      </div>
                    </div>
                  )}

                  {mintingComplete && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                      <div className="bg-green-500 rounded-full p-3 animate-pulse shadow-[0_0_20px_rgba(34,197,94,0.7)]">
                        <CheckCircle2 className="h-10 w-10 text-white" />
                      </div>
                    </div>
                  )}
                </div>

                <div className="text-center mb-4">
                  <div className="text-sm text-gray-400 mb-1">Token ID</div>
                  <div className="font-mono text-white bg-gray-800 px-3 py-1 rounded border border-gray-700 text-sm">
                    {mintingComplete
                      ? "#" +
                        Math.floor(Math.random() * 10000)
                          .toString()
                          .padStart(4, "0")
                      : "—"}
                  </div>
                </div>

                {mintingComplete && (
                  <div className="space-y-2 w-full">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">Network</span>
                      <span className="text-white">Base Mainnet</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">Contract</span>
                      <span className="text-white font-mono">0x71C...F29b</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">Transaction</span>
                      <span className="text-cyan-400 font-mono cursor-pointer hover:underline">0x8dF...2c7A</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Minting Steps */}
              <div>
                <div className="mb-4">
                  <h3 className="text-lg font-pixel text-white mb-2">Minting Progress</h3>
                  <p className="text-sm text-gray-400">
                    {!mintingComplete && mintingStep === 0 && "Mint your warrior card to unlock special abilities"}
                    {!mintingComplete && mintingStep > 0 && "Please wait while we process your transaction..."}
                    {mintingComplete && "Your warrior card has been successfully minted!"}
                  </p>
                </div>

                {/* Modern Stepper */}
                <div className="relative mb-8">
                  {/* Progress Line */}
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-700"></div>

                  {/* Completed Progress Line */}
                  <div
                    className="absolute left-4 top-0 w-0.5 bg-gradient-to-b from-purple-500 to-pink-500 transition-all duration-500 ease-in-out"
                    style={{
                      height: mintingStep === 0 ? "0%" : mintingComplete ? "100%" : `${(mintingStep / 7) * 100}%`,
                    }}
                  ></div>

                  {/* Steps */}
                  {[
                    { step: 1, label: "Connecting Wallet", icon: <Globe className="h-4 w-4" /> },
                    { step: 2, label: "Preparing Transaction", icon: <Shield className="h-4 w-4" /> },
                    { step: 3, label: "Signing Transaction", icon: <Zap className="h-4 w-4" /> },
                    { step: 4, label: "Submitting to Blockchain", icon: <Send className="h-4 w-4" /> },
                    { step: 5, label: "Confirming Transaction", icon: <CheckCircle2 className="h-4 w-4" /> },
                    { step: 6, label: "Minting NFT", icon: <Award className="h-4 w-4" /> },
                    { step: 7, label: "Finalizing", icon: <Trophy className="h-4 w-4" /> },
                  ].map(({ step, label, icon }) => (
                    <div key={step} className="flex items-center mb-5 relative">
                      <div
                        className={`z-10 w-8 h-8 rounded-full flex items-center justify-center mr-3 transition-all duration-300 ${
                          mintingStep >= step
                            ? mintingStep === step
                              ? "bg-gradient-to-r from-purple-600 to-pink-600 animate-pulse shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                              : "bg-gradient-to-r from-green-500 to-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                            : "bg-gray-800 border border-gray-700"
                        }`}
                      >
                        {mintingStep > step && <CheckCircle2 className="h-4 w-4 text-white" />}
                        {mintingStep === step && icon}
                        {mintingStep < step && <span className="text-xs text-gray-400">{step}</span>}
                      </div>

                      <div className="flex-1">
                        <div className={`font-medium ${mintingStep >= step ? "text-white" : "text-gray-500"}`}>
                          {label}
                        </div>

                        {mintingStep === step && (
                          <div className="text-xs text-purple-400 animate-pulse mt-0.5">Processing...</div>
                        )}

                        {mintingStep > step && (
                          <div className="text-xs text-green-400 mt-0.5 flex items-center">
                            <CheckCircle2 className="h-3 w-3 mr-1" /> Completed
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 mt-6">
                  {mintingStep === 0 && !mintingComplete && (
                    <>
                      <button
                        onClick={() => setIsMintModalOpen(false)}
                        className="px-4 py-2 rounded-md border border-gray-600 text-gray-300 hover:bg-gray-800 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={simulateMintingProcess}
                        className="px-4 py-2 rounded-md bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 transition-colors shadow-[0_0_10px_rgba(168,85,247,0.3)]"
                      >
                        Start Minting
                      </button>
                    </>
                  )}

                  {mintingComplete && (
                    <button
                      onClick={() => setIsMintModalOpen(false)}
                      className="px-6 py-2 rounded-md bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 transition-colors shadow-[0_0_10px_rgba(168,85,247,0.3)]"
                    >
                      View in Collection
                    </button>
                  )}

                  {!mintingComplete && mintingStep > 0 && (
                    <div className="text-sm text-gray-400 italic">Please don't close this window...</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Back Button */}
      <div className="mb-6">
        <Link href="/memewarriors" className="text-pink-400 hover:text-pink-300 flex items-center">
          <ChevronLeft className="mr-1" /> Back to Warriors
        </Link>
      </div>

      {/* Hero Section with Cover Image */}
      <div className="relative w-full h-48 md:h-64 rounded-lg mb-16 overflow-hidden">
        {/* Cover Image */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/50 to-pink-900/50">
          <img
            src={coverImage || "/placeholder.svg"}
            alt={`${warrior.name} cover`}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          <div className="absolute inset-0 retro-grid opacity-30"></div>
        </div>
      </div>

      {/* Profile Section */}
      <div className="relative -mt-[293px] mb-8 flex flex-col md:flex-row items-center md:items-start gap-6 px-[15px]">
        {/* Avatar */}
        <div className="relative">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-purple-600 glow-effect">
            <Image
              src={apiData?.profile_photos?.[0]?.url || "/placeholder-5fxsx.png"}
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
          <div className="text-gray-300 mb-4">
            <p>{truncatedDescription}</p>
            <button
              onClick={() => setIsStoryModalOpen(true)}
              className="text-pink-400 hover:text-pink-300 text-sm mt-1 font-medium"
            >
              Read More
            </button>
          </div>

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
        <div className="flex flex-col justify-end self-stretch">
          <button
            onClick={() => setIsFollowing(!isFollowing)}
            className={`px-6 py-2 rounded-md font-pixel text-sm mb-[25px] ${
              isFollowing ? "bg-gray-700 text-white" : "pink-button"
            }`}
          >
            {isFollowing ? "Following" : "Follow"}
          </button>
        </div>
      </div>

      {/* Activation Progress */}
      <div className="arcade-card p-6 mb-8 relative overflow-visible">
        <h2 className="section-title text-lg mb-6">ACTIVATION PROGRESS</h2>
        <div className="relative overflow-visible">
          <div className="absolute top-[calc(50%-20px)] left-0 right-0 h-1 bg-gray-700 transform -translate-y-1/2"></div>
          <div className="flex justify-between relative overflow-visible">
            {profileData.activationProgress.map((step, index) => (
              <div key={index} className="flex flex-col items-center relative overflow-visible">
                <div className="group relative overflow-visible">
                  <div
                    className={`w-6 h-6 rounded-full z-10 ${
                      step.completed ? "bg-green-500" : "bg-gray-700"
                    } flex items-center justify-center cursor-pointer`}
                  >
                    {step.completed && <CheckCircle2 className="w-4 h-4 text-white" />}
                  </div>

                  {/* Tooltip that appears on hover - fixed to show above container boundaries */}
                  <div className="fixed-tooltip absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 pointer-events-none">
                    <div className="tooltip-container bg-gray-800 rounded-md p-3 shadow-lg">
                      <p className="tooltip-title text-sm mb-1">{step.name}</p>
                      <p className="text-xs text-gray-300">{step.description}</p>
                      <div className="absolute w-3 h-3 bg-gray-800 transform rotate-45 left-1/2 -translate-x-1/2 -bottom-1.5 border-r border-b border-pink-500/40"></div>
                    </div>
                  </div>
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
                {galleryImages.map((imageUrl, index) => (
                  <div
                    key={index}
                    className="arcade-card overflow-hidden cursor-pointer"
                    onClick={() => setSelectedImage(imageUrl)}
                  >
                    <div className="aspect-square bg-purple-900/30 relative group">
                      <img
                        src={imageUrl || "/placeholder.svg"}
                        alt={`${warrior.name} gallery image ${index + 1}`}
                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="text-white font-pixel text-sm">View</span>
                      </div>
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

          {/* Free Abilities */}
          <div className="arcade-card p-6 mb-8 mt-[20px]">
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
            <div className="flex justify-center mt-6">
              <button onClick={() => setIsTryNowModalOpen(true)} className="pink-button px-8 py-2 font-pixel">
                Try Now
              </button>
            </div>
          </div>

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
            <div className="flex justify-center mt-6">
              <button
                onClick={() => {
                  setIsMintModalOpen(true)
                  // Reset minting state when opening the modal
                  setMintingStep(0)
                  setMintingComplete(false)
                }}
                className="pink-button px-8 py-2 font-pixel"
              >
                Mint Warrior Card
              </button>
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
