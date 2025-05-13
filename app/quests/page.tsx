import type { Metadata } from "next"
import Image from "next/image"
import { questsData } from "@/lib/data"

export const metadata: Metadata = {
  title: "Quests | MemeWars",
  description: "Complete quests to earn rewards in MemeWars",
}

export default function QuestsPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-pixel mb-4 neon-text">QUESTS</h1>
        <p className="text-lg max-w-3xl mx-auto">
          Complete social actions and in-game challenges to earn exclusive rewards and boost your MemeWars experience!
        </p>
      </div>

      {/* Quest Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="arcade-card p-6 text-center">
          <h3 className="font-pixel text-xl mb-2 text-pink-400">ACTIVE QUESTS</h3>
          <p className="font-pixel text-3xl text-white">6</p>
        </div>
        <div className="arcade-card p-6 text-center">
          <h3 className="font-pixel text-xl mb-2 text-pink-400">COMPLETED</h3>
          <p className="font-pixel text-3xl text-white">12</p>
        </div>
        <div className="arcade-card p-6 text-center">
          <h3 className="font-pixel text-xl mb-2 text-pink-400">AVAILABLE XP</h3>
          <p className="font-pixel text-3xl text-white">2,250</p>
        </div>
        <div className="arcade-card p-6 text-center">
          <h3 className="font-pixel text-xl mb-2 text-pink-400">AVAILABLE COINS</h3>
          <p className="font-pixel text-3xl text-white">1,125</p>
        </div>
      </div>

      {/* Filters */}
      <div className="arcade-card p-4 mb-8">
        <div className="flex flex-wrap gap-4 justify-between">
          <div className="flex items-center">
            <span className="text-white mr-2 font-pixel">DIFFICULTY:</span>
            <select className="bg-black/50 text-white border border-pink-500 rounded px-3 py-2">
              <option value="all">All</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
              <option value="very-hard">Very Hard</option>
            </select>
          </div>
          <div className="flex items-center">
            <span className="text-white mr-2 font-pixel">STATUS:</span>
            <select className="bg-black/50 text-white border border-pink-500 rounded px-3 py-2">
              <option value="all">All</option>
              <option value="available">Available</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div className="flex items-center">
            <span className="text-white mr-2 font-pixel">SORT BY:</span>
            <select className="bg-black/50 text-white border border-pink-500 rounded px-3 py-2">
              <option value="newest">Newest</option>
              <option value="difficulty-asc">Difficulty: Easy to Hard</option>
              <option value="difficulty-desc">Difficulty: Hard to Easy</option>
              <option value="rewards">Rewards</option>
              <option value="popularity">Popularity</option>
            </select>
          </div>
        </div>
      </div>

      {/* Quests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {questsData.map((quest) => (
          <div key={quest.id} className="arcade-card overflow-hidden">
            <div className="flex flex-col sm:flex-row">
              {/* Quest Icon */}
              <div className="w-full sm:w-1/4 bg-gradient-to-br from-purple-900/50 to-pink-900/50 p-4 flex items-center justify-center">
                <Image
                  src={quest.icon || "/placeholder.svg?height=80&width=80&query=quest icon"}
                  alt={quest.title}
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </div>

              {/* Quest Details */}
              <div className="w-full sm:w-3/4 p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-pixel text-lg text-white">{quest.title}</h3>
                  <span
                    className={`font-pixel text-xs px-2 py-1 rounded ${
                      quest.difficulty === "Easy"
                        ? "bg-green-500/80"
                        : quest.difficulty === "Medium"
                          ? "bg-blue-500/80"
                          : quest.difficulty === "Hard"
                            ? "bg-purple-500/80"
                            : "bg-red-500/80"
                    }`}
                  >
                    {quest.difficulty}
                  </span>
                </div>
                <p className="text-gray-300 text-sm mb-3">{quest.description}</p>

                <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                  <div className="bg-black/30 p-2 rounded">
                    <span className="text-pink-300">TIME LIMIT</span>
                    <span className="text-white block">{quest.timeLimit}</span>
                  </div>
                  <div className="bg-black/30 p-2 rounded">
                    <span className="text-pink-300">COMPLETIONS</span>
                    <span className="text-white block">{quest.completions.toLocaleString()} players</span>
                  </div>
                </div>

                <div className="mb-3">
                  <h4 className="font-pixel text-sm mb-1 text-pink-300">REWARDS</h4>
                  <div className="flex flex-wrap gap-2">
                    <div className="bg-black/30 px-2 py-1 rounded text-xs flex items-center">
                      <span className="text-cyan-400 mr-1">XP</span>
                      <span className="text-white">{quest.reward.xp}</span>
                    </div>
                    <div className="bg-black/30 px-2 py-1 rounded text-xs flex items-center">
                      <span className="text-yellow-400 mr-1">Coins</span>
                      <span className="text-white">{quest.reward.coins}</span>
                    </div>
                    {quest.reward.items.map((item, index) => (
                      <div key={index} className="bg-black/30 px-2 py-1 rounded text-xs flex items-center">
                        <span className="text-purple-400 mr-1">Item</span>
                        <span className="text-white">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button className="arcade-btn text-white text-sm">START QUEST</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quest Progress */}
      <div className="mt-12">
        <h2 className="text-3xl font-pixel mb-6 text-center text-pink-400">YOUR QUEST PROGRESS</h2>
        <div className="arcade-card p-6">
          <div className="mb-6">
            <h3 className="font-pixel text-xl mb-4 text-white">Season 2 Quest Completion</h3>
            <div className="mb-2 flex justify-between text-sm">
              <span className="text-gray-400">Progress: 12/30 Quests</span>
              <span className="text-gray-400">40% Complete</span>
            </div>
            <div className="relative h-4 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-pink-600 to-purple-600"
                style={{ width: "40%" }}
              ></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-black/30 p-4 rounded">
              <h4 className="font-pixel text-lg mb-3 text-center text-pink-400">EASY QUESTS</h4>
              <div className="mb-2 flex justify-between text-sm">
                <span className="text-gray-400">Progress:</span>
                <span className="text-gray-400">6/10</span>
              </div>
              <div className="relative h-3 bg-gray-800 rounded-full overflow-hidden mb-4">
                <div className="absolute top-0 left-0 h-full bg-green-500" style={{ width: "60%" }}></div>
              </div>
              <div className="text-center">
                <span className="text-white text-sm">Reward at 10/10:</span>
                <div className="font-pixel text-green-400 mt-1">Epic Loot Box</div>
              </div>
            </div>

            <div className="bg-black/30 p-4 rounded">
              <h4 className="font-pixel text-lg mb-3 text-center text-pink-400">MEDIUM QUESTS</h4>
              <div className="mb-2 flex justify-between text-sm">
                <span className="text-gray-400">Progress:</span>
                <span className="text-gray-400">4/10</span>
              </div>
              <div className="relative h-3 bg-gray-800 rounded-full overflow-hidden mb-4">
                <div className="absolute top-0 left-0 h-full bg-blue-500" style={{ width: "40%" }}></div>
              </div>
              <div className="text-center">
                <span className="text-white text-sm">Reward at 10/10:</span>
                <div className="font-pixel text-blue-400 mt-1">Rare MemeWarrior</div>
              </div>
            </div>

            <div className="bg-black/30 p-4 rounded">
              <h4 className="font-pixel text-lg mb-3 text-center text-pink-400">HARD QUESTS</h4>
              <div className="mb-2 flex justify-between text-sm">
                <span className="text-gray-400">Progress:</span>
                <span className="text-gray-400">2/10</span>
              </div>
              <div className="relative h-3 bg-gray-800 rounded-full overflow-hidden mb-4">
                <div className="absolute top-0 left-0 h-full bg-purple-500" style={{ width: "20%" }}></div>
              </div>
              <div className="text-center">
                <span className="text-white text-sm">Reward at 10/10:</span>
                <div className="font-pixel text-purple-400 mt-1">Epic MemeWarrior</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
