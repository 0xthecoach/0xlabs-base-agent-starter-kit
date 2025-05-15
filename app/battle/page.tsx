import type { Metadata } from "next"
import Image from "next/image"
import { memeWarriors } from "@/lib/data"
import { PageHeader } from "@/components/page-header"

export const metadata: Metadata = {
  title: "Battle Arena | MemeWars",
  description: "Enter the Battle Arena and fight other MemeWarriors",
}

export default function BattlePage() {
  // Select some warriors for the battle selection
  const availableWarriors = memeWarriors.slice(0, 8)

  return (
    <div>
      <PageHeader
        title="BATTLE ARENA"
        description="Choose your warriors, select your battle mode, and fight for glory in the MemeWars arena!"
        backgroundImage="/images/header-background-battle.png"
      />

      <div className="container mx-auto px-4 py-16">
        {/* Battle Modes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="arcade-card p-6 text-center hover:scale-105 transition-transform duration-300 cursor-pointer border-2 border-pink-500">
            <h3 className="font-pixel text-2xl mb-4 text-pink-400">1v1 DUEL</h3>
            <div className="bg-gradient-to-b from-purple-900/50 to-pink-900/50 p-4 rounded-lg mb-4">
              <video
                src="https://xsjm-zu7p-vaky.n7.xano.io/vault/lu0MXA_0/Bg5ON3lIUbzQXOpj_z8YpVY6lhE/mY-6KQ../FLORA-MP4+%28h264%29-fd0effd2.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto max-h-[200px] object-cover rounded"
              />
            </div>
            <p className="text-white mb-4">Face off against another player in a one-on-one battle to the finish!</p>
            <div className="bg-black/30 p-2 rounded mb-4">
              <span className="text-pink-300">REWARDS</span>
              <span className="font-pixel text-white block">100-300 XP + 50-150 Coins</span>
            </div>
          </div>

          <div className="arcade-card p-6 text-center hover:scale-105 transition-transform duration-300 cursor-pointer">
            <h3 className="font-pixel text-2xl mb-4 text-pink-400">BATTLE ROYALE</h3>
            <div className="bg-gradient-to-b from-purple-900/50 to-pink-900/50 p-4 rounded-lg mb-4">
              <video
                src="https://xsjm-zu7p-vaky.n7.xano.io/vault/lu0MXA_0/_gnSuv1DaY7YCoLvbXbXAEsn8KQ/t6dnUg../FLORA-MP4+%28h264%29-a58f5c04.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto max-h-[200px] object-cover rounded"
              />
            </div>
            <p className="text-white mb-4">
              Enter a chaotic free-for-all battle where multiple warriors fight until only one remains!
            </p>
            <div className="bg-black/30 p-2 rounded mb-4">
              <span className="text-pink-300">REWARDS</span>
              <span className="font-pixel text-white block">250-750 XP + 125-375 Coins</span>
            </div>
          </div>

          <div className="arcade-card p-6 text-center hover:scale-105 transition-transform duration-300 cursor-pointer">
            <h3 className="font-pixel text-2xl mb-4 text-pink-400">TOURNAMENT</h3>
            <div className="bg-gradient-to-b from-purple-900/50 to-pink-900/50 p-4 rounded-lg mb-4">
              <video
                src="https://xsjm-zu7p-vaky.n7.xano.io/vault/lu0MXA_0/_0s97C_k2F12NRiEkZhpJRwX1Gs/y_szIw../FLORA-MP4+%28h264%29-6e50202e.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto max-h-[200px] object-cover rounded"
              />
            </div>
            <p className="text-white mb-4">Enter a tournament with multiple rounds and compete for massive rewards!</p>
            <div className="bg-black/30 p-2 rounded mb-4">
              <span className="text-pink-300">REWARDS</span>
              <span className="font-pixel text-white block">1000-5000 XP + 500-2500 Coins</span>
            </div>
          </div>
        </div>

        {/* Warrior Selection */}
        <div className="arcade-card p-6 mb-12">
          <h2 className="font-pixel text-2xl mb-6 text-center text-pink-400">SELECT YOUR WARRIOR</h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {availableWarriors.map((warrior) => (
              <div
                key={warrior.id}
                className="relative bg-black/30 p-3 rounded border border-pink-500/30 hover:border-pink-500 hover:bg-black/50 transition-all cursor-pointer"
              >
                <div className="absolute top-2 right-2">
                  <span
                    className={`font-pixel text-xs px-2 py-1 rounded ${
                      warrior.rarity === "Legendary"
                        ? "bg-yellow-500/80"
                        : warrior.rarity === "Epic"
                          ? "bg-purple-500/80"
                          : "bg-blue-500/80"
                    }`}
                  >
                    {warrior.rarity}
                  </span>
                </div>
                <div className="h-32 flex items-center justify-center mb-2">
                  <Image
                    src={warrior.image || "/placeholder.svg"}
                    alt={warrior.name}
                    width={100}
                    height={100}
                    className="object-contain"
                  />
                </div>
                <h3 className="font-pixel text-sm text-center text-white mb-2">{warrior.name}</h3>
                <div className="grid grid-cols-2 gap-1 text-xs">
                  <div className="flex flex-col items-center bg-black/30 p-1 rounded">
                    <span className="text-pink-300">LVL</span>
                    <span className="font-pixel text-white">{warrior.level}</span>
                  </div>
                  <div className="flex flex-col items-center bg-black/30 p-1 rounded">
                    <span className="text-pink-300">PWR</span>
                    <span className="font-pixel text-white">{warrior.power}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Battle Setup */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Your Team */}
          <div className="arcade-card p-6">
            <h2 className="font-pixel text-2xl mb-6 text-center text-pink-400">YOUR TEAM</h2>

            <div className="bg-black/30 p-4 rounded mb-6 min-h-40 flex items-center justify-center">
              <div className="text-center">
                <p className="text-white mb-4">No warriors selected</p>
                <p className="text-gray-400 text-sm">Select warriors from the list above to add them to your team.</p>
              </div>
            </div>

            <div className="bg-black/30 p-4 rounded mb-6">
              <h3 className="font-pixel text-lg mb-2 text-center text-pink-400">TEAM POWER</h3>
              <div className="font-pixel text-3xl text-center text-white">0</div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-black/30 p-3 rounded">
                <h4 className="font-pixel text-sm mb-1 text-center text-pink-300">AVERAGE LEVEL</h4>
                <div className="font-pixel text-xl text-center text-white">0</div>
              </div>
              <div className="bg-black/30 p-3 rounded">
                <h4 className="font-pixel text-sm mb-1 text-center text-pink-300">WIN CHANCE</h4>
                <div className="font-pixel text-xl text-center text-white">0%</div>
              </div>
            </div>
          </div>

          {/* Battle Options */}
          <div className="arcade-card p-6">
            <h2 className="font-pixel text-2xl mb-6 text-center text-pink-400">BATTLE OPTIONS</h2>

            <div className="space-y-4 mb-6">
              <div>
                <label className="font-pixel text-white block mb-2">OPPONENT TYPE</label>
                <select className="w-full bg-black/50 text-white border border-pink-500 rounded px-3 py-2">
                  <option value="random">Random Opponent</option>
                  <option value="friend">Friend</option>
                  <option value="ai">AI Opponent</option>
                  <option value="ranked">Ranked Match</option>
                </select>
              </div>

              <div>
                <label className="font-pixel text-white block mb-2">BATTLE ARENA</label>
                <select className="w-full bg-black/50 text-white border border-pink-500 rounded px-3 py-2">
                  <option value="classic">Classic Arena</option>
                  <option value="cyber">Cyber Realm</option>
                  <option value="space">Space Station</option>
                  <option value="temple">Ancient Temple</option>
                  <option value="random">Random</option>
                </select>
              </div>

              <div>
                <label className="font-pixel text-white block mb-2">WAGER (OPTIONAL)</label>
                <input
                  type="number"
                  placeholder="0"
                  min="0"
                  className="w-full bg-black/50 text-white border border-pink-500 rounded px-3 py-2"
                />
                <p className="text-gray-400 text-xs mt-1">Wager coins for a chance to win double the amount.</p>
              </div>
            </div>

            <button className="arcade-btn w-full text-white" disabled>
              ENTER BATTLE
            </button>
            <p className="text-gray-400 text-xs text-center mt-2">Select at least one warrior to enter battle.</p>
          </div>
        </div>

        {/* Recent Battles */}
        <div>
          <h2 className="text-3xl font-pixel mb-6 text-center text-pink-400">RECENT BATTLES</h2>

          <div className="arcade-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-purple-900/50 border-b border-pink-500/50">
                    <th className="font-pixel text-left p-4">TIME</th>
                    <th className="font-pixel text-left p-4">PLAYERS</th>
                    <th className="font-pixel text-center p-4">MODE</th>
                    <th className="font-pixel text-center p-4">WINNER</th>
                    <th className="font-pixel text-center p-4">REWARDS</th>
                    <th className="font-pixel text-center p-4">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-pink-500/20 hover:bg-purple-900/30 transition-colors">
                    <td className="p-4">
                      <span className="text-white">5 mins ago</span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center">
                        <span className="text-white">MemeKing420 vs DogeWarrior</span>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <span className="font-pixel text-white">1v1</span>
                    </td>
                    <td className="p-4 text-center">
                      <span className="font-pixel text-green-400">MemeKing420</span>
                    </td>
                    <td className="p-4 text-center">
                      <span className="text-yellow-400">250 XP, 125 Coins</span>
                    </td>
                    <td className="p-4 text-center">
                      <button className="px-3 py-1 text-xs font-pixel text-white bg-black/30 rounded border border-pink-500/30 hover:bg-pink-900/30">
                        REPLAY
                      </button>
                    </td>
                  </tr>
                  <tr className="border-b border-pink-500/20 hover:bg-purple-900/30 transition-colors">
                    <td className="p-4">
                      <span className="text-white">12 mins ago</span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center">
                        <span className="text-white">PepeHands vs StonksOnly</span>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <span className="font-pixel text-white">1v1</span>
                    </td>
                    <td className="p-4 text-center">
                      <span className="font-pixel text-green-400">PepeHands</span>
                    </td>
                    <td className="p-4 text-center">
                      <span className="text-yellow-400">220 XP, 110 Coins</span>
                    </td>
                    <td className="p-4 text-center">
                      <button className="px-3 py-1 text-xs font-pixel text-white bg-black/30 rounded border border-pink-500/30 hover:bg-pink-900/30">
                        REPLAY
                      </button>
                    </td>
                  </tr>
                  <tr className="border-b border-pink-500/20 hover:bg-purple-900/30 transition-colors">
                    <td className="p-4">
                      <span className="text-white">25 mins ago</span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center">
                        <span className="text-white">NyanMaster vs GrumpyKitty</span>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <span className="font-pixel text-white">3v3</span>
                    </td>
                    <td className="p-4 text-center">
                      <span className="font-pixel text-green-400">NyanMaster</span>
                    </td>
                    <td className="p-4 text-center">
                      <span className="text-yellow-400">580 XP, 290 Coins</span>
                    </td>
                    <td className="p-4 text-center">
                      <button className="px-3 py-1 text-xs font-pixel text-white bg-black/30 rounded border border-pink-500/30 hover:bg-pink-900/30">
                        REPLAY
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
