import type { Metadata } from "next"
import ProfilePageClient from "./ProfilePageClient"

export const metadata: Metadata = {
  title: "My Profile | MemeWars",
  description: "View and manage your MemeWars profile",
}

export default function ProfilePage() {
  return <ProfilePageClient />
}
