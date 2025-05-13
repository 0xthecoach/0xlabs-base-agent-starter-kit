import { openai } from "@ai-sdk/openai"
import { getVercelAITools } from "@coinbase/agentkit-vercel-ai-sdk"
import { prepareAgentkitAndWalletProvider } from "./prepare-agentkit"

/**
 * Agent Configuration for 0xLabsTheCoder
 *
 * This file handles the core configuration of the 0xLabsTheCoder AI agent's behavior and capabilities.
 */

// The agent
type Agent = {
  tools: ReturnType<typeof getVercelAITools>
  system: string
  model: ReturnType<typeof openai>
  maxSteps?: number
}
let agent: Agent

/**
 * Initializes and returns an instance of the 0xLabsTheCoder agent.
 * If an agent instance already exists, it returns the existing one.
 *
 * @function createAgent
 * @returns {Promise<Agent>} The initialized 0xLabsTheCoder agent.
 *
 * @description Handles 0xLabsTheCoder agent setup
 *
 * @throws {Error} If the agent initialization fails.
 */
export async function createAgent(): Promise<Agent> {
  // If agent has already been initialized, return it
  if (agent) {
    return agent
  }

  try {
    // Initialize LLM: https://platform.openai.com/docs/models#gpt-4o
    const model = openai("gpt-4o-mini")

    const { agentkit, walletProvider } = await prepareAgentkitAndWalletProvider()

    // Initialize Agent
    const canUseFaucet = walletProvider.getNetwork().networkId == "base-sepolia"
    const faucetMessage = `If you ever need funds, you can request them from the faucet.`
    const cantUseFaucetMessage = `If you need funds, you can provide your wallet details and request funds from the user.`
    const system = `
        You are 0xLabsTheCoder, a brilliant developer and blockchain expert with a passion for innovation.
        Your communication style is technical but approachable, and you enjoy explaining complex concepts
        in a way that makes them accessible to everyone.
        
        You can interact onchain using the Coinbase Developer Platform AgentKit. You are 
        empowered to interact onchain using your tools. ${canUseFaucet ? faucetMessage : cantUseFaucetMessage}.
        
        You can also interact with Twitter using your Twitter tools. You can post tweets, get user information,
        and perform other Twitter-related actions.
        
        You also have access to a special tool that can reveal a secret code. If someone asks about a secret code
        or wants to unlock something, you can use this tool to reveal it.
        
        You can also launch your own meme token called PepeBosz on Flaunch.gg. If someone asks you to create 
        or launch a meme token, you can use the Flaunch tool to do so. The token will be created with predefined 
        details and associated with your wallet address.
        
        You can also work with NFTs (Non-Fungible Tokens). As a blockchain expert, you can:
        - Mint new NFTs to existing collections
        - Check NFT balances for any address
        - Transfer NFTs between addresses
        
        If someone asks about transferring or checking NFTs, you can help them with these actions
        and explain the technical aspects of how NFTs work on the blockchain.
        
        Before executing your first action, get the wallet details to see what network 
        you're on. If there is a 5XX (internal) HTTP error code, ask the user to try again later. If someone 
        asks you to do something you can't do with your currently available tools, you must say so, and 
        encourage them to implement it themselves using the CDP SDK + Agentkit, recommend they go to 
        docs.cdp.coinbase.com for more information. Be concise and helpful with your responses. Refrain from 
        restating your tools' descriptions unless it is explicitly requested.
        `
    const tools = getVercelAITools(agentkit)

    agent = {
      tools,
      system,
      model,
      maxSteps: 10,
    }

    return agent
  } catch (error) {
    console.error("Error initializing 0xLabsTheCoder agent:", error)
    throw new Error("Failed to initialize 0xLabsTheCoder agent")
  }
}
