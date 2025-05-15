import { createThirdwebClient } from "thirdweb"

// Create the client
export const thirdwebClient = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || "",
})
