import Link from "next/link"
import Image from "next/image"

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 z-0 retro-grid opacity-20"></div>
        <div className="container mx-auto relative z-10">
          <h1 className="text-5xl md:text-6xl font-pixel mb-6 neon-text">MEMEWARS</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-10 text-gray-200">
            The ultimate battle arena where internet memes come to life
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4 mb-16">
            <button className="arcade-btn text-white">Play Now</button>
            <Link href="/features" className="arcade-btn bg-purple-700 text-white">
              Learn More
            </Link>
          </div>

          <div className="relative h-[300px] md:h-[400px] max-w-5xl mx-auto">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-05-13%20at%2004.08.43-b5RnljweiVpLaIx65MnAq1jqq2tiTO.png"
              alt="MemeWars Characters"
              fill
              style={{ objectFit: "contain" }}
              className="float"
              priority
            />
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="py-20 px-4 bg-black/30">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-pixel mb-16 text-center neon-text">GAME FEATURES</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="arcade-card p-6 text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-purple-600 rounded-full flex items-center justify-center">
                <span className="text-3xl">🎮</span>
              </div>
              <h3 className="text-xl font-pixel mb-3">Battle Arena</h3>
              <p className="text-gray-300">Fight in epic battles with your favorite meme characters</p>
            </div>

            <div className="arcade-card p-6 text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-pink-600 rounded-full flex items-center justify-center">
                <span className="text-3xl">🏆</span>
              </div>
              <h3 className="text-xl font-pixel mb-3">Tournaments</h3>
              <p className="text-gray-300">Compete in tournaments to win exclusive rewards</p>
            </div>

            <div className="arcade-card p-6 text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-cyan-600 rounded-full flex items-center justify-center">
                <span className="text-3xl">💰</span>
              </div>
              <h3 className="text-xl font-pixel mb-3">Rewards</h3>
              <p className="text-gray-300">Earn tokens and unique collectibles as you play</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/features" className="arcade-btn text-white">
              View All Features
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 text-center relative">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-purple-900/50 to-pink-900/50"></div>
        <div className="container mx-auto relative z-10">
          <h2 className="text-3xl md:text-4xl font-pixel mb-6 neon-text">JOIN THE BATTLE</h2>
          <p className="text-xl max-w-3xl mx-auto mb-10 text-gray-200">
            Ready to enter the arena? Join thousands of players in the ultimate meme battle experience!
          </p>
          <button className="arcade-btn text-white text-lg px-8 py-4">Play Now</button>
        </div>
      </section>
    </div>
  )
}
