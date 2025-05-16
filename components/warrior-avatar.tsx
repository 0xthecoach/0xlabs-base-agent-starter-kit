"use client"

import { useState } from "react"
import Image from "next/image"

interface WarriorAvatarProps {
  src: string
  alt: string
  size?: number
  fallbackSrc?: string
}

export default function WarriorAvatar({
  src,
  alt,
  size = 64,
  fallbackSrc = "/abstract-profile.png",
}: WarriorAvatarProps) {
  const [imgSrc, setImgSrc] = useState(src)

  return (
    <div className="w-full h-full bg-gray-800">
      <Image
        src={imgSrc || "/placeholder.svg"}
        alt={alt}
        width={size}
        height={size}
        className="w-full h-full object-cover"
        style={{ imageRendering: "crisp-edges" }}
        onError={() => setImgSrc(fallbackSrc)}
        unoptimized
      />
    </div>
  )
}
