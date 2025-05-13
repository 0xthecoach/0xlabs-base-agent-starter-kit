import type { AgentRequest, AgentResponse } from "@/app/types/api"
import { NextResponse } from "next/server"
import { createAgent } from "./create-agent"
import { type Message, generateId, generateText } from "ai"

// Separate message history for 0xLabsTheCoder agent
const messages: Message[] = []

/**
 * Handles incoming POST requests to interact with the 0xLabsTheCoder agent.
 * This function processes user messages and streams responses from the agent.
 *
 * @function POST
 * @param {Request & { json: () => Promise<AgentRequest> }} req - The incoming request object containing the user message.
 * @returns {Promise<NextResponse<AgentResponse>>} JSON response containing the AI-generated reply or an error message.
 *
 * @description Sends a single message to the 0xLabsTheCoder agent and returns the agent's final response.
 *
 * @example
 * const response = await fetch("/api/0xlabs", {
 *     method: "POST",
 *     headers: { "Content-Type": "application/json" },
 *     body: JSON.stringify({ userMessage: input }),
 * });
 */
export async function POST(req: Request & { json: () => Promise<AgentRequest> }): Promise<NextResponse<AgentResponse>> {
  try {
    // 1️. Extract user message from the request body
    const { userMessage } = await req.json()

    // 2. Get the 0xLabsTheCoder agent
    const agent = await createAgent()

    // 3.Start streaming the agent's response
    messages.push({ id: generateId(), role: "user", content: userMessage })
    const { text } = await generateText({
      ...agent,
      messages,
    })

    // 4. Add the agent's response to the messages
    messages.push({ id: generateId(), role: "assistant", content: text })

    // 5️. Return the final response
    return NextResponse.json({ response: text })
  } catch (error) {
    console.error("Error processing request for 0xLabsTheCoder agent:", error)
    return NextResponse.json({ error: "Failed to process message for 0xLabsTheCoder agent" })
  }
}
