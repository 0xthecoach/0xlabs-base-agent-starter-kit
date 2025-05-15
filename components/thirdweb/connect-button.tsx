"use client"

import { ConnectButton } from "thirdweb/react"
import { thirdwebClient } from "@/lib/thirdweb-client"
import { base } from "thirdweb/chains"

export function ArcadeConnectButton() {
  // Define our arcade theme colors
  const PRIMARY_COLOR = "#ff00ff" // Neon pink
  const SECONDARY_COLOR = "#00ffff" // Cyan
  const BACKGROUND_COLOR = "#2a0e56" // Dark purple
  const TEXT_COLOR = "#ffffff" // White

  return (
    <ConnectButton
      client={thirdwebClient}
      accountAbstraction={{
        chain: base,
        sponsorGas: true,
      }}
      theme={{
        colors: {
          accentText: PRIMARY_COLOR,
          accentButtonBg: PRIMARY_COLOR,
          accentButtonText: TEXT_COLOR,
          primaryText: TEXT_COLOR,
          secondaryText: SECONDARY_COLOR,
          primaryButtonBg: PRIMARY_COLOR,
          primaryButtonText: TEXT_COLOR,
          secondaryButtonBg: BACKGROUND_COLOR,
          secondaryButtonText: PRIMARY_COLOR,
          secondaryButtonHoverBg: "#3a1466",
          connectedButtonBg: PRIMARY_COLOR,
          connectedButtonBgHover: "#cc00cc",
          borderColor: PRIMARY_COLOR,
          overlayBg: "rgba(42, 14, 86, 0.9)",
          modalBg: "#1a0836",
        },
        radii: {
          // Square corners for pixel style
          md: "4px",
          lg: "4px",
          xl: "4px",
        },
        shadows: {
          // Neon glow effect
          md: `0 0 10px ${PRIMARY_COLOR}, 0 0 20px rgba(255, 0, 255, 0.5)`,
          lg: `0 0 15px ${PRIMARY_COLOR}, 0 0 30px rgba(255, 0, 255, 0.5)`,
        },
      }}
      modalTitle="MEMEWARS LOGIN"
      modalTitleIconUrl="/images/logo.png"
      connectButton={{
        label: "PLAY NOW",
      }}
      connectedButton={{
        label: "CONNECTED",
      }}
      style={{
        // Additional inline styles for the button
        fontFamily: "'Press Start 2P', cursive",
        textTransform: "uppercase",
        letterSpacing: "1px",
        border: "2px solid #fff",
        padding: "0.5rem 1.5rem",
        background: "linear-gradient(to bottom, #ff4d4d, #ff0080)",
        boxShadow: "0 0 10px rgba(255, 0, 128, 0.7), 0 0 20px rgba(255, 0, 128, 0.5), 0 0 30px rgba(255, 0, 128, 0.3)",
        transition: "all 0.2s ease",
      }}
    />
  )
}
