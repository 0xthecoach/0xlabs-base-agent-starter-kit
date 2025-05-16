"use client"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

type Match = {
  id: number
  player1: {
    name: string
    avatar: string
    score: number
  }
  player2: {
    name: string
    avatar: string
    score: number
  }
  completed: boolean
  winner: string | null
  scheduledTime?: string
}

type Round = {
  round: string
  matches: Match[]
}

type BracketModalButtonProps = {
  tournamentName: string
  brackets: Round[]
}

export default function BracketModalButton({ tournamentName, brackets }: BracketModalButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button className="arcade-btn text-white" onClick={() => setIsOpen(true)}>
        VIEW BRACKETS
      </button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[900px] bg-gradient-to-b from-purple-950 to-purple-900 border border-pink-500/50">
          <DialogHeader>
            <DialogTitle className="text-2xl font-pixel text-center text-pink-400">
              {tournamentName} - Tournament Brackets
            </DialogTitle>
          </DialogHeader>

          <div>
            <h3 className="text-2xl font-pixel mb-6 text-center text-pink-400">TOURNAMENT BRACKETS</h3>
            <div className="arcade-card p-6 overflow-x-auto">
              <div className="flex space-x-8 min-w-max">
                {brackets.map((round, roundIndex) => (
                  <div key={roundIndex} className="min-w-[300px]">
                    <h4 className="font-pixel text-lg mb-4 text-center text-white">{round.round}</h4>
                    <div className="space-y-6">
                      {round.matches.map((match) => (
                        <div
                          key={match.id}
                          className={`bg-black/30 p-4 rounded border ${
                            match.completed ? "border-pink-500/50" : "border-yellow-500/50 border-dashed"
                          }`}
                        >
                          {/* Player 1 */}
                          <div
                            className={`flex items-center justify-between p-2 rounded ${
                              match.winner === "player1" ? "bg-green-900/30" : ""
                            }`}
                          >
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-full overflow-hidden mr-2 border border-pink-500/50">
                                <Image
                                  src={match.player1.avatar || "/placeholder.svg"}
                                  alt={match.player1.name}
                                  width={32}
                                  height={32}
                                  className="object-cover"
                                />
                              </div>
                              <span className="text-white text-sm">{match.player1.name}</span>
                            </div>
                            <span className="font-pixel text-white">{match.player1.score}</span>
                          </div>

                          {/* VS */}
                          <div className="flex justify-center items-center my-1">
                            <span className="text-pink-400 text-xs">VS</span>
                          </div>

                          {/* Player 2 */}
                          <div
                            className={`flex items-center justify-between p-2 rounded ${
                              match.winner === "player2" ? "bg-green-900/30" : ""
                            }`}
                          >
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-full overflow-hidden mr-2 border border-pink-500/50">
                                <Image
                                  src={match.player2.avatar || "/placeholder.svg"}
                                  alt={match.player2.name}
                                  width={32}
                                  height={32}
                                  className="object-cover"
                                />
                              </div>
                              <span className="text-white text-sm">{match.player2.name}</span>
                            </div>
                            <span className="font-pixel text-white">{match.player2.score}</span>
                          </div>

                          {/* Match Status */}
                          {!match.completed && (
                            <div className="mt-2 text-center">
                              <span className="text-yellow-400 text-xs">{match.scheduledTime}</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
