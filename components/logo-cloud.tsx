import Image from "next/image"
import { Zap } from "lucide-react"

export default function LogoCloud() {
  // Sample partner logos - replace with actual partner logos later
  const partners = [
    { name: "Base", logo: "/images/partners/base-logo.png" },
    { name: "0xLabs", logo: "/images/partners/0xlabs-logo.png" },
    { name: "Thirdweb", logo: "/images/partners/thirdweb-logo.png" },
    { name: "Optimism", logo: "/images/partners/optimism-logo.png" },
    { name: "Arbitrum", logo: "/images/partners/arbitrum-logo.png" },
    { name: "Polygon", logo: "/images/partners/polygon-logo.png" },
  ]

  return (
    <section className="py-12 bg-black/50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <h3 className="text-xl text-center font-pixel mb-8 text-gray-300 flex items-center justify-center gap-2">
          <Zap className="text-yellow-400 w-5 h-5" />
          POWERED BY
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {partners.map((partner) => (
            <div key={partner.name} className="flex justify-center hover:scale-110 transition-transform duration-300">
              <div className="relative h-12 w-32">
                <Image
                  src={partner.logo || "/placeholder.svg"}
                  alt={`${partner.name} logo`}
                  fill
                  className="object-contain filter brightness-0 invert opacity-75 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
