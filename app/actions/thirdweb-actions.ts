"use server"

import { createThirdwebClient } from "thirdweb"

// Server-side Thirdweb client that can use the secret key
const serverClient = createThirdwebClient({
  secretKey: process.env.THIRDWEB_SECRET_KEY, // No NEXT_PUBLIC_ prefix for server-side
})

// Example server action that uses the secret key
export async function verifyUserServerSide(userId: string) {
  try {
    // This is a placeholder for actual implementation
    // Use serverClient for operations requiring the secret key
    return { success: true, message: "User verified" }
  } catch (error) {
    console.error("Error in verifyUserServerSide:", error)
    return { success: false, message: "Server error" }
  }
}
