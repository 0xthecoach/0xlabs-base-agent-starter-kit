import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { memeWarriors } from "@/lib/data"
import MemeWarriorDetailPageClient from "./MemeWarriorDetailPageClient"

type Props = {
  params: { id: string }
}

// Generate static paths for all warriors
export async function generateStaticParams() {
  return memeWarriors.map((warrior) => ({
    id: warrior.id,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const warrior = memeWarriors.find((w) => w.id === params.id)

  if (!warrior) {
    return {
      title: "Warrior Not Found | MemeWars",
    }
  }

  return {
    title: `${warrior.name} | MemeWars`,
    description: warrior.description,
  }
}

// Function to get warrior data
async function getWarriorData(id: string) {
  // In a real app, this might be an API call
  // For now, we're using the static data
  const warrior = memeWarriors.find((w) => w.id === id)

  if (!warrior) {
    return null
  }

  return warrior
}

export default async function MemeWarriorDetailPage({ params }: Props) {
  const warrior = await getWarriorData(params.id)

  // If warrior not found, show 404
  if (!warrior) {
    notFound()
  }

  return <MemeWarriorDetailPageClient params={params} warriorData={warrior} />
}
