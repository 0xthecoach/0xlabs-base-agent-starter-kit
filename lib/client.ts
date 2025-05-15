import { createThirdwebClient } from "thirdweb"
import { base } from "thirdweb/chains"

// Create the client with the clientId from environment variables
// Only use NEXT_PUBLIC_ variables on the client side
export const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || "366b79b4901bee5c3eae8581e870d081",
})

// Define the primary chain for the application
export const primaryChain = base
