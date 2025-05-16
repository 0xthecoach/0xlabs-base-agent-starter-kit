import type { Metadata } from "next"
import { notFound } from "next/navigation"
import MemeWarriorDetailPageClient from "./MemeWarriorDetailPageClient"

type Props = {
  params: { id: string }
}

// Define the API response type based on the actual response
interface ApiWarrior {
  id: number
  animol_name: string
  created_at: number
  linked_accounts_id: number
  ai_autonomous_agents_id: number
  Origin_Story: string
  project_id: number
  popup_widget: string
  profile_photos: Array<{
    access: string
    path: string
    name: string
    type: string
    size: number
    mime: string
    meta: {
      width: number
      height: number
    }
    url: string
  }>
  HUMe_voice_profile: any
  topics: any[]
  Animol_Voices: any
  free_expertise: any[]
  premium_expertise: any[]
  gal_1: {
    access: string
    path: string
    name: string
    type: string
    size: number
    mime: string
    meta: {
      width: number
      height: number
    }
    url: string
  } | null
  gal_2: {
    access: string
    path: string
    name: string
    type: string
    size: number
    mime: string
    meta: {
      width: number
      height: number
    }
    url: string
  } | null
  gal_3: {
    access: string
    path: string
    name: string
    type: string
    size: number
    mime: string
    meta: {
      width: number
      height: number
    }
    url: string
  } | null
  gal_4: {
    access: string
    path: string
    name: string
    type: string
    size: number
    mime: string
    meta: {
      width: number
      height: number
    }
    url: string
  } | null
  gal_5: {
    access: string
    path: string
    name: string
    type: string
    size: number
    mime: string
    meta: {
      width: number
      height: number
    }
    url: string
  } | null
  USPS: any[]
}

// Function to get warrior data from API
async function getWarriorData(id: string) {
  try {
    console.log(`Fetching warrior data for ID: ${id}`)
    const response = await fetch(
      `https://xsjm-zu7p-vaky.n7.xano.io/api:ZETcPNiq/Single_memewars_profile/${id}`,
      { next: { revalidate: 3600 } }, // Cache for 1 hour
    )

    if (!response.ok) {
      console.error(`Error fetching warrior data: ${response.status}`)
      return null
    }

    const data = await response.json()
    console.log("API response:", data)
    return data as ApiWarrior
  } catch (error) {
    console.error("Failed to fetch warrior data:", error)
    return null
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const warrior = await getWarriorData(params.id)

  if (!warrior) {
    return {
      title: "Warrior Not Found | MemeWars",
    }
  }

  return {
    title: `${warrior.animol_name || "Warrior"} | MemeWars`,
    description: warrior.Origin_Story ? warrior.Origin_Story.substring(0, 160) + "..." : "MemeWars warrior profile",
  }
}

export default async function MemeWarriorDetailPage({ params }: Props) {
  const apiData = await getWarriorData(params.id)

  // If warrior not found, show 404
  if (!apiData) {
    notFound()
  }

  // Get the profile image URL
  const profileImageUrl =
    apiData.profile_photos && apiData.profile_photos.length > 0
      ? apiData.profile_photos[0].url
      : "/abstract-profile.png"

  // Get cover image (using first gallery image as cover)
  const coverImageUrl = apiData.gal_1?.url || "/images/header-background.png"

  // Extract character type from name (e.g., "DOGE" from "0xBASEDOGEMAX")
  const characterType = extractCharacterType(apiData.animol_name)

  // Map API data to the format expected by the client component
  const warriorData = {
    id: params.id,
    name: apiData.animol_name,
    description: apiData.Origin_Story,
    image: profileImageUrl,
    coverImage: coverImageUrl,
    class: characterType,
    rarity: "Legendary",
    level: Math.floor(Math.random() * 50) + 50, // Random level between 50-100
    power: Math.floor(Math.random() * 5000) + 5000, // Random power
    wins: Math.floor(Math.random() * 100) + 50,
    losses: Math.floor(Math.random() * 50),
    specialAbilities: [
      {
        name: "AI Integration",
        description: "Harnesses advanced AI capabilities to enhance strategic decisions.",
        cooldown: "24h",
        damage: "High",
      },
      {
        name: "Meme Creation",
        description: "Creates viral content that spreads across platforms.",
        cooldown: "12h",
        damage: "Variable",
      },
    ],
    freeAbilities: [
      {
        name: characterType + " Mastery",
        description: `Expert in ${characterType} communication and trends.`,
        cooldown: "1h",
        damage: "Low",
      },
      {
        name: "Community Building",
        description: "Builds loyal communities around shared interests.",
        cooldown: "48h",
        damage: "Passive",
      },
    ],
    stats: {
      strength: Math.floor(Math.random() * 30) + 70, // Random 70-100
      agility: Math.floor(Math.random() * 30) + 70,
      intelligence: Math.floor(Math.random() * 30) + 70,
      charisma: Math.floor(Math.random() * 30) + 70,
    },
    equipment: [
      {
        name: "Profile Picture",
        type: "Avatar",
        rarity: "Rare",
        stats: {
          charisma: "+15",
          intelligence: "+10",
        },
      },
      {
        name: "Origin Story",
        type: "Lore",
        rarity: "Epic",
        stats: {
          charisma: "+20",
          intelligence: "+15",
        },
      },
    ],
    battleHistory: [
      {
        opponent: "Random Memer",
        result: "Win",
        date: new Date(apiData.created_at).toLocaleDateString(),
        reward: "50 XP",
      },
      {
        opponent: "Meme Lord",
        result: "Win",
        date: new Date(Date.now() - 86400000).toLocaleDateString(), // Yesterday
        reward: "100 XP",
      },
    ],
    // Add gallery images
    galleryImages: [
      apiData.gal_1?.url,
      apiData.gal_2?.url,
      apiData.gal_3?.url,
      apiData.gal_4?.url,
      apiData.gal_5?.url,
    ].filter(Boolean), // Filter out null/undefined values
  }

  return <MemeWarriorDetailPageClient params={params} warriorData={warriorData} apiData={apiData} />
}

// Helper function to extract character type from name
function extractCharacterType(name: string): string {
  if (!name) return "Memer"

  const nameLower = name.toLowerCase()

  if (nameLower.includes("doge") || nameLower.includes("shib")) return "Doge"
  if (nameLower.includes("pepe") || nameLower.includes("frog")) return "Pepe"
  if (nameLower.includes("cat")) return "Cat"
  if (nameLower.includes("pingu")) return "Penguin"
  if (nameLower.includes("wojak")) return "Wojak"

  // Default
  return "Memer"
}
