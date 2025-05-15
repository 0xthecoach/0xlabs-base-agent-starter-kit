import Link from "next/link"

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-pixel mb-4 text-pink-400">Warrior Not Found</h1>
      <p className="mb-8 text-gray-300">The warrior you're looking for doesn't exist or has been removed.</p>
      <Link href="/memewarriors" className="pink-button">
        Back to Warriors
      </Link>
    </div>
  )
}
