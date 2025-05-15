import type { Metadata } from "next"
import Image from "next/image"
import { PageHeader } from "@/components/page-header"

export const metadata: Metadata = {
  title: "Marketplace | MemeWars",
  description: "Buy, sell, and trade MemeWarriors and items in the MemeWars marketplace",
}

// Mock marketplace items data
const marketplaceItems = [
  {
    id: 1,
    type: "warrior",
    name: "Pepe Commander",
    image: "/images/warriors/pepe.png",
    rarity: "Legendary",
    price: 12500,
    seller: "CryptoKing",
    level: 42,
    power: 9001,
    listed: "2 hours ago",
  },
  {
    id: 2,
    type: "warrior",
    name: "Doge Warrior",
    image: "/images/warriors/doge.png",
    rarity: "Epic",
    price: 8750,
    seller: "MemeQueen",
    level: 38,
    power: 8500,
    listed: "5 hours ago",
  },
  {
    id: 3,
    type: "item",
    name: "Legendary Weapon",
    image: "/images/items/weapon1.png",
    rarity: "Legendary",
    price: 5000,
    seller: "ItemMaster",
    boost: "+15% Attack",
    listed: "1 day ago",
  },
  {
    id: 4,
    type: "item",
    name: "Epic Armor",
    image: "/images/items/armor1.png",
    rarity: "Epic",
    price: 3500,
    seller: "GearGuru",
    boost: "+12% Defense",
    listed: "3 hours ago",
  },
  {
    id: 5,
    type: "warrior",
    name: "Grumpy Cat",
    image: "/images/warriors/grumpy.png",
    rarity: "Epic",
    price: 7800,
    seller: "WarriorTrader",
    level: 36,
    power: 8200,
    listed: "12 hours ago",
  },
  {
    id: 6,
    type: "item",
    name: "Rare Amulet",
    image: "/images/items/amulet1.png",
    rarity: "Rare",
    price: 2200,
    seller: "MagicDealer",
    boost: "+8% Critical Hit",
    listed: "2 days ago",
  },
  {
    id: 7,
    type: "warrior",
    name: "Wojak Paladin",
    image: "/images/warriors/wojak.png",
    rarity: "Rare",
    price: 4500,
    seller: "FeelTrader",
    level: 32,
    power: 7500,
    listed: "1 day ago",
  },
  {
    id: 8,
    type: "item",
    name: "Epic Helmet",
    image: "/images/items/helmet1.png",
    rarity: "Epic",
    price: 3200,
    seller: "ArmorDealer",
    boost: "+10% HP",
    listed: "6 hours ago",
  },
]

export default function MarketplacePage() {
  return (
    <div>
      <PageHeader
        title="MARKETPLACE"
        description="Buy, sell, and trade MemeWarriors and items to build your ultimate collection and dominate the battlefield!"
        backgroundImage="/images/header-background-marketplace.png"
      />

      <div className="container mx-auto px-4 py-16">
        {/* Marketplace Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="arcade-card p-6 text-center">
            <h3 className="font-pixel text-xl mb-2 text-pink-400">ACTIVE LISTINGS</h3>
            <p className="font-pixel text-3xl text-white">1,248</p>
          </div>
          <div className="arcade-card p-6 text-center">
            <h3 className="font-pixel text-xl mb-2 text-pink-400">WARRIORS TRADED</h3>
            <p className="font-pixel text-3xl text-white">8,721</p>
          </div>
          <div className="arcade-card p-6 text-center">
            <h3 className="font-pixel text-xl mb-2 text-pink-400">ITEMS TRADED</h3>
            <p className="font-pixel text-3xl text-white">15,432</p>
          </div>
          <div className="arcade-card p-6 text-center">
            <h3 className="font-pixel text-xl mb-2 text-pink-400">YOUR BALANCE</h3>
            <p className="font-pixel text-3xl text-white">25,000</p>
          </div>
        </div>

        {/* Marketplace Actions */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button className="arcade-btn text-white">MY LISTINGS</button>
          <button className="arcade-btn text-white">SELL WARRIOR</button>
          <button className="arcade-btn text-white">SELL ITEM</button>
          <button className="arcade-btn text-white">TRANSACTION HISTORY</button>
        </div>

        {/* Filters */}
        <div className="arcade-card p-4 mb-8">
          <div className="flex flex-wrap gap-4 justify-between">
            <div className="flex items-center">
              <span className="text-white mr-2 font-pixel">TYPE:</span>
              <select className="bg-black/50 text-white border border-pink-500 rounded px-3 py-2">
                <option value="all">All</option>
                <option value="warriors">Warriors</option>
                <option value="items">Items</option>
              </select>
            </div>
            <div className="flex items-center">
              <span className="text-white mr-2 font-pixel">RARITY:</span>
              <select className="bg-black/50 text-white border border-pink-500 rounded px-3 py-2">
                <option value="all">All</option>
                <option value="legendary">Legendary</option>
                <option value="epic">Epic</option>
                <option value="rare">Rare</option>
                <option value="common">Common</option>
              </select>
            </div>
            <div className="flex items-center">
              <span className="text-white mr-2 font-pixel">SORT BY:</span>
              <select className="bg-black/50 text-white border border-pink-500 rounded px-3 py-2">
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rarity">Rarity</option>
                <option value="power">Power (Warriors)</option>
              </select>
            </div>
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Search marketplace..."
                className="bg-black/50 text-white border border-pink-500 rounded px-3 py-2 w-full"
              />
            </div>
          </div>
        </div>

        {/* Marketplace Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {marketplaceItems.map((item) => (
            <div
              key={item.id}
              className="arcade-card hover:scale-105 transition-transform duration-300 overflow-hidden"
            >
              <div className="relative h-64 bg-gradient-to-b from-purple-900/50 to-pink-900/50">
                <div className="absolute top-2 right-2 z-10">
                  <span
                    className={`font-pixel text-xs px-2 py-1 rounded ${
                      item.rarity === "Legendary"
                        ? "bg-yellow-500/80"
                        : item.rarity === "Epic"
                          ? "bg-purple-500/80"
                          : "bg-blue-500/80"
                    }`}
                  >
                    {item.rarity}
                  </span>
                </div>
                <div className="absolute top-2 left-2 z-10">
                  <span className="font-pixel text-xs px-2 py-1 rounded bg-pink-500/80">
                    {item.type === "warrior" ? "WARRIOR" : "ITEM"}
                  </span>
                </div>
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  width={300}
                  height={300}
                  className="object-contain h-full w-full p-4"
                />
              </div>
              <div className="p-4 border-t-2 border-pink-500/50">
                <h3 className="font-pixel text-xl mb-2 text-center">{item.name}</h3>

                {item.type === "warrior" ? (
                  <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                    <div className="flex flex-col items-center bg-black/30 p-2 rounded">
                      <span className="text-pink-300">LEVEL</span>
                      <span className="font-pixel text-white">{item.level}</span>
                    </div>
                    <div className="flex flex-col items-center bg-black/30 p-2 rounded">
                      <span className="text-pink-300">POWER</span>
                      <span className="font-pixel text-white">{item.power}</span>
                    </div>
                  </div>
                ) : (
                  <div className="bg-black/30 p-2 rounded mb-4 text-center">
                    <span className="text-pink-300">BOOST</span>
                    <span className="font-pixel text-white block">{item.boost}</span>
                  </div>
                )}

                <div className="flex justify-between items-center mb-4">
                  <div>
                    <span className="text-gray-400 text-xs">Seller:</span>
                    <span className="text-white text-xs ml-1">{item.seller}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 text-xs">Listed:</span>
                    <span className="text-white text-xs ml-1">{item.listed}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="font-pixel text-xl text-yellow-400">{item.price}</div>
                  <button className="arcade-btn text-white text-sm">BUY NOW</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8">
          <div className="flex space-x-2">
            <button className="w-8 h-8 flex items-center justify-center font-pixel text-white bg-pink-600 rounded">
              1
            </button>
            <button className="w-8 h-8 flex items-center justify-center font-pixel text-white bg-black/30 rounded border border-pink-500/30 hover:bg-pink-900/30">
              2
            </button>
            <button className="w-8 h-8 flex items-center justify-center font-pixel text-white bg-black/30 rounded border border-pink-500/30 hover:bg-pink-900/30">
              3
            </button>
            <span className="w-8 h-8 flex items-center justify-center font-pixel text-white">...</span>
            <button className="w-8 h-8 flex items-center justify-center font-pixel text-white bg-black/30 rounded border border-pink-500/30 hover:bg-pink-900/30">
              10
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
