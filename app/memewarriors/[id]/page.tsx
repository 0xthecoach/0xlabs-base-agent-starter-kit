import type { Metadata } from "next"
import { memeWarriors } from "@/lib/data"
import MemeWarriorDetailPageClient from "./MemeWarriorDetailPageClient"

type Props = {
  params: { id: string }
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

export default function MemeWarriorDetailPage({ params }: Props) {
  return <MemeWarriorDetailPageClient params={params} />
}
