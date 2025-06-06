import type { Metadata } from "next"
import Image from "next/image"
import { BattleHeader } from "@/components/battle-header"
import { BracketModalButton } from "@/components/bracket-modal-button"

export const metadata: Metadata = {
  title: "Tournaments | MemeWars",
  description: "Compete in MemeWars tournaments for glory and rewards",
}

// Mock tournaments data
const tournamentsData = [
  {
    id: 1,
    name: "Season 2 Championship",
    status: "upcoming",
    startDate: "2024-06-15T18:00:00Z",
    endDate: "2024-06-17T23:59:59Z",
    entryFee: 500,
    prizePool: 100000,
    participants: {
      registered: 128,
      max: 256,
    },
    format: "Single Elimination",
    description:
      "The official Season 2 championship tournament. Top 16 players qualify for the Meme Masters Invitational.",
    image: "/images/tournaments/season-championship.png",
  },
  {
    id: 2,
    name: "Weekly Meme Showdown",
    status: "active",
    startDate: "2024-05-12T15:00:00Z",
    endDate: "2024-05-12T22:00:00Z",
    entryFee: 100,
    prizePool: 10000,
    participants: {
      registered: 64,
      max: 64,
    },
    format: "Double Elimination",
    description: "Weekly tournament open to all players. Earn points towards seasonal rankings.",
    image: "/images/tournaments/weekly-showdown.png",
  },
  {
    id: 3,
    name: "Legendary Warriors Cup",
    status: "upcoming",
    startDate: "2024-05-20T19:00:00Z",
    endDate: "2024-05-21T23:59:59Z",
    entryFee: 250,
    prizePool: 25000,
    participants: {
      registered: 42,
      max: 128,
    },
    format: "Single Elimination",
    description:
      "Special tournament where only Legendary rarity warriors are allowed. Exclusive rewards for participants.",
    image: "/images/tournaments/legendary-cup.png",
  },
  {
    id: 4,
    name: "Community Challenge",
    status: "upcoming",
    startDate: "2024-05-25T16:00:00Z",
    endDate: "2024-05-25T23:00:00Z",
    entryFee: 0,
    prizePool: 5000,
    participants: {
      registered: 96,
      max: 128,
    },
    format: "Swiss",
    description: "Free-to-enter tournament sponsored by the MemeWars community. Special rules and restrictions apply.",
    image: "/images/tournaments/community-challenge.png",
  },
  {
    id: 5,
    name: "Pro Players Invitational",
    status: "completed",
    startDate: "2024-05-05T17:00:00Z",
    endDate: "2024-05-07T23:59:59Z",
    entryFee: 1000,
    prizePool: 50000,
    participants: {
      registered: 32,
      max: 32,
    },
    format: "Double Elimination",
    description: "Invitation-only tournament featuring the top 32 ranked players. High stakes, high rewards.",
    image: "/images/tournaments/pro-invitational.png",
    winner: "MemeKing420",
    runnerUp: "DogeWarrior",
  },
]

// Mock active tournament brackets data
const activeTournamentBrackets = [
  {
    round: "Quarter Finals",
    matches: [
      {
        id: 1,
        player1: {
          name: "MemeKing420",
          avatar: "/images/avatars/player1.png",
          score: 2,
        },
        player2: {
          name: "WojakFeels",
          avatar: "/images/avatars/player7.png",
          score: 0,
        },
        completed: true,
        winner: "player1",
      },
      {
        id: 2,
        player1: {
          name: "DogeWarrior",
          avatar: "/images/avatars/player2.png",
          score: 2,
        },
        player2: {
          name: "CheemsBonk",
          avatar: "/images/avatars/player8.png",
          score: 1,
        },
        completed: true,
        winner: "player1",
      },
      {
        id: 3,
        player1: {
          name: "PepeHands",
          avatar: "/images/avatars/player3.png",
          score: 1,
        },
        player2: {
          name: "GigaChad69",
          avatar: "/images/avatars/player9.png",
          score: 2,
        },
        completed: true,
        winner: "player2",
      },
      {
        id: 4,
        player1: {
          name: "StonksOnly",
          avatar: "/images/avatars/player4.png",
          score: 2,
        },
        player2: {
          name: "SurprisedMemer",
          avatar: "/images/avatars/player10.png",
          score: 0,
        },
        completed: true,
        winner: "player1",
      },
    ],
  },
  {
    round: "Semi Finals",
    matches: [
      {
        id: 5,
        player1: {
          name: "MemeKing420",
          avatar: "/images/avatars/player1.png",
          score: 2,
        },
        player2: {
          name: "DogeWarrior",
          avatar: "/images/avatars/player2.png",
          score: 1,
        },
        completed: true,
        winner: "player1",
      },
      {
        id: 6,
        player1: {
          name: "GigaChad69",
          avatar: "/images/avatars/player9.png",
          score: 0,
        },
        player2: {
          name: "StonksOnly",
          avatar: "/images/avatars/player4.png",
          score: 2,
        },
        completed: true,
        winner: "player2",
      },
    ],
  },
  {
    round: "Finals",
    matches: [
      {
        id: 7,
        player1: {
          name: "MemeKing420",
          avatar: "/images/avatars/player1.png",
          score: 0,
        },
        player2: {
          name: "StonksOnly",
          avatar: "/images/avatars/player4.png",
          score: 0,
        },
        completed: false,
        winner: null,
        scheduledTime: "Today, 8:00 PM",
      },
    ],
  },
]

// Custom tournament images
const customImages = {
  "Season 2 Championship":
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Frame%202147227007-UdQbyYIXNpxT4N3ICIx3xkr6WA9YdK.png",
  "Legendary Warriors Cup":
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Frame%202147227008-yTYmQ00CffkNizvuudpyYf2mS1buqU.png",
  "Community Challenge":
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Frame%202147227006-ViNP2SG0jW85mHGpJEVe6R8dnTeeqE.png",
}

export default function TournamentsPage() {
  // Find the active tournament
  const activeTournament = tournamentsData.find((tournament) => tournament.status === "active")

  return (
    <div>
      <BattleHeader
        title="TOURNAMENTS"
        description="Compete against the best MemeWars players in organized tournaments. Win exclusive rewards and climb the ranks!"
        backgroundImage="/images/tournaments-arena-bg.png"
      />

      <div className="container mx-auto px-4 py-16">
        {/* Active Tournament */}
        {activeTournament && (
          <div className="mb-16">
            <h2 className="text-3xl font-pixel mb-6 text-center text-pink-400">ACTIVE TOURNAMENT</h2>

            <div className="arcade-card overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3">
                {/* Tournament Image */}
                <div className="md:col-span-1 bg-gradient-to-br from-purple-900/50 to-pink-900/50 flex items-center justify-center overflow-hidden">
                  <Image
                    src="https://xsjm-zu7p-vaky.n7.xano.io/vault/lu0MXA_0/FCp_0sTmGzBU6jAJq0sNMazp8Us/mbSFRg../FLORA-GIF-0dc84a35.gif"
                    alt="Tournament Banner"
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                    unoptimized={true}
                    priority={true}
                  />
                </div>

                {/* Tournament Details */}
                <div className="md:col-span-2 p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-pixel text-2xl text-white">{activeTournament.name}</h3>
                    <span className="font-pixel text-sm px-3 py-1 rounded bg-green-500/80">LIVE NOW</span>
                  </div>

                  <p className="text-gray-300 mb-6">{activeTournament.description}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-black/30 p-3 rounded">
                      <h4 className="font-pixel text-sm mb-1 text-pink-300">FORMAT</h4>
                      <div className="text-white">{activeTournament.format}</div>
                    </div>
                    <div className="bg-black/30 p-3 rounded">
                      <h4 className="font-pixel text-sm mb-1 text-pink-300">PRIZE POOL</h4>
                      <div className="text-yellow-400 font-pixel">{activeTournament.prizePool.toLocaleString()}</div>
                    </div>
                    <div className="bg-black/30 p-3 rounded">
                      <h4 className="font-pixel text-sm mb-1 text-pink-300">PARTICIPANTS</h4>
                      <div className="text-white">
                        {activeTournament.participants.registered}/{activeTournament.participants.max}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <BracketModalButton tournamentName={activeTournament.name} brackets={activeTournamentBrackets} />
                    <button className="arcade-btn text-white">WATCH LIVE MATCHES</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Upcoming Tournaments */}
        <div className="mb-16">
          <h2 className="text-3xl font-pixel mb-6 text-center text-pink-400">UPCOMING TOURNAMENTS</h2>

          <div className="flex flex-col gap-6">
            {tournamentsData
              .filter((tournament) => tournament.status === "upcoming")
              .map((tournament) => (
                <div key={tournament.id} className="arcade-card overflow-hidden">
                  <div className="grid grid-cols-1 md:grid-cols-3">
                    {/* Tournament Image */}
                    <div className="md:col-span-1 h-48 md:h-full bg-gradient-to-br from-purple-900/50 to-pink-900/50 flex items-center justify-center overflow-hidden">
                      <Image
                        src={customImages[tournament.name] || "/placeholder.svg"}
                        alt={tournament.name}
                        width={400}
                        height={300}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Tournament Details */}
                    <div className="md:col-span-2 p-4">
                      <h3 className="font-pixel text-lg mb-1 text-white">{tournament.name}</h3>
                      <p className="text-gray-300 text-sm mb-3">{tournament.description}</p>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
                        <div className="bg-black/30 p-2 rounded">
                          <span className="text-pink-300 text-xs block">START</span>
                          <span className="text-white text-sm block">
                            {new Date(tournament.startDate).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="bg-black/30 p-2 rounded">
                          <span className="text-pink-300 text-xs block">FORMAT</span>
                          <span className="text-white text-sm block">{tournament.format}</span>
                        </div>
                        <div className="bg-black/30 p-2 rounded">
                          <span className="text-pink-300 text-xs block">ENTRY FEE</span>
                          <span className="text-white text-sm block">
                            {tournament.entryFee > 0 ? tournament.entryFee : "FREE"}
                          </span>
                        </div>
                        <div className="bg-black/30 p-2 rounded">
                          <span className="text-pink-300 text-xs block">PRIZE</span>
                          <span className="text-yellow-400 text-sm block">{tournament.prizePool.toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-400">
                          {tournament.participants.registered}/{tournament.participants.max} registered
                        </div>
                        <button className="arcade-btn text-white text-sm px-4 py-2">REGISTER</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Past Tournaments */}
        <div>
          <h2 className="text-3xl font-pixel mb-6 text-center text-pink-400">PAST TOURNAMENTS</h2>

          <div className="arcade-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-purple-900/50 border-b border-pink-500/50">
                    <th className="font-pixel text-left p-4">NAME</th>
                    <th className="font-pixel text-center p-4">DATE</th>
                    <th className="font-pixel text-center p-4">FORMAT</th>
                    <th className="font-pixel text-center p-4">PARTICIPANTS</th>
                    <th className="font-pixel text-center p-4">WINNER</th>
                    <th className="font-pixel text-center p-4">PRIZE POOL</th>
                    <th className="font-pixel text-center p-4">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {tournamentsData
                    .filter((tournament) => tournament.status === "completed")
                    .map((tournament) => (
                      <tr
                        key={tournament.id}
                        className="border-b border-pink-500/20 hover:bg-purple-900/30 transition-colors"
                      >
                        <td className="p-4">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded overflow-hidden mr-3 border border-pink-500/50">
                              <Image
                                src={tournament.image || "/placeholder.svg"}
                                alt={tournament.name}
                                width={40}
                                height={40}
                                className="object-cover"
                              />
                            </div>
                            <span className="text-white">{tournament.name}</span>
                          </div>
                        </td>
                        <td className="p-4 text-center">
                          <span className="text-white">{new Date(tournament.endDate).toLocaleDateString()}</span>
                        </td>
                        <td className="p-4 text-center">
                          <span className="text-white">{tournament.format}</span>
                        </td>
                        <td className="p-4 text-center">
                          <span className="text-white">
                            {tournament.participants.registered}/{tournament.participants.max}
                          </span>
                        </td>
                        <td className="p-4 text-center">
                          <span className="font-pixel text-green-400">{tournament.winner}</span>
                        </td>
                        <td className="p-4 text-center">
                          <span className="text-yellow-400">{tournament.prizePool.toLocaleString()}</span>
                        </td>
                        <td className="p-4 text-center">
                          <button className="px-3 py-1 text-xs font-pixel text-white bg-black/30 rounded border border-pink-500/30 hover:bg-pink-900/30">
                            DETAILS
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
