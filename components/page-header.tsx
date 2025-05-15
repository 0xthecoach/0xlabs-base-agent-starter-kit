import Image from "next/image"

interface PageHeaderProps {
  title: string
  description?: string
  backgroundImage?: string
}

export function PageHeader({ title, description, backgroundImage = "/images/header-background.png" }: PageHeaderProps) {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage || "/placeholder.svg"}
          alt="Background"
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/80 to-purple-950/90 z-10"></div>
        <div className="absolute inset-0 retro-grid opacity-20 z-20"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-30">
        <div className="text-center mb-4">
          <h1 className="text-4xl md:text-5xl font-pixel mb-4 neon-text">{title}</h1>
          {description && <p className="text-lg max-w-3xl mx-auto text-gray-300">{description}</p>}
        </div>
      </div>
    </section>
  )
}
