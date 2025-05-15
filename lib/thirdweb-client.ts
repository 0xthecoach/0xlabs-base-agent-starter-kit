import { createThirdwebClient } from "thirdweb"

// Create the client with your clientId
export const thirdwebClient = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID,
})
