import Image from "next/image"

interface BattleHeaderProps {
  title: string
  description?: string
  backgroundImage: string
}

export function BattleHeader({ title, description, backgroundImage }: BattleHeaderProps) {
  return (
    <div className="relative w-full h-[300px] overflow-hidden">
      <Image src={backgroundImage || "/placeholder.svg"} alt={title} fill className="object-cover" priority />
      <div className="absolute inset-0 bg-purple-900/30"></div>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-5xl md:text-6xl font-pixel mb-4 neon-text">{title}</h1>
        {description && <p className="text-lg max-w-3xl mx-auto text-gray-200">{description}</p>}
      </div>
    </div>
  )
}
