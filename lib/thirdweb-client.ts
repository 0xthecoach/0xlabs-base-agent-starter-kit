import { createThirdwebClient } from "thirdweb"

// Create the client
export const thirdwebClient = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || "366b79b4901bee5c3eae8581e870d081",
})
