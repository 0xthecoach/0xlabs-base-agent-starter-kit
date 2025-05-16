import type { Metadata } from "next"
import BattlePageClient from "./BattlePageClient"

export const metadata: Metadata = {
  title: "Battle Arena | MemeWars",
  description: "Enter the Battle Arena and fight other MemeWarriors",
}

export default function BattlePage() {
  return <BattlePageClient />
}
