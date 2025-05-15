import { type NextRequest, NextResponse } from "next/server"
import { createThirdwebClient } from "thirdweb"

// Server-side Thirdweb client that can use the secret key
const serverClient = createThirdwebClient({
  secretKey: process.env.THIRDWEB_SECRET_KEY, // No NEXT_PUBLIC_ prefix for server-side
})

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { action, payload } = data

    // Example of a server-side operation that might need the secret key
    if (action === "verify-user") {
      // Use serverClient for operations requiring the secret key
      // This is just a placeholder for actual implementation
      return NextResponse.json({ success: true, message: "User verified" })
    }

    return NextResponse.json({ success: false, message: "Invalid action" })
  } catch (error) {
    console.error("Error in thirdweb auth route:", error)
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 })
  }
}
