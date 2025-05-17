import type { Metadata } from "next"
import LeaderboardClientPage from "./LeaderboardClientPage"

export const metadata: Metadata = {
  title: "Leaderboard | MemeWars",
  description: "View the top MemeWars players and their rankings",
}

export default function LeaderboardPage() {
  return <LeaderboardClientPage />
}
