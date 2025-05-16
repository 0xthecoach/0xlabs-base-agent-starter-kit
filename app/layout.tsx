import type React from "react"
import type { Metadata } from "next"
import { Press_Start_2P, Poppins } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Analytics } from "@/components/analytics"
import { Suspense } from "react"
import { Providers } from "./providers"
import { ScrollToTop } from "@/components/scroll-to-top"

const pressStart = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press-start",
})

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "MemeWars - The Ultimate Meme Battle Arena",
  description:
    "Join the battle in MemeWars, where meme warriors compete for glory and rewards in the ultimate meme battle arena.",
  keywords: "memewars, meme, battle, arena, nft, game, crypto, blockchain",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth" style={{ scrollBehavior: "smooth" }}>
      <body className={`${pressStart.variable} ${poppins.variable} font-sans antialiased`}>
        <Providers>
          <ScrollToTop />
          <div className="min-h-screen flex flex-col bg-purple-900">
            <Navbar />
            <Suspense>
              <main className="flex-grow">{children}</main>
            </Suspense>
            <Footer />
          </div>
          <Analytics />
        </Providers>
      </body>
    </html>
  )
}
