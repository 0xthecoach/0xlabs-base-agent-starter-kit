import { openai } from "@ai-sdk/openai"
import { getVercelAITools } from "@coinbase/agentkit-vercel-ai-sdk"
import { prepareAgentkitAndWalletProvider } from "./prepare-agentkit"

/**
 * Agent Configuration Guide
 *
 * This file handles the core configuration of your AI agent's behavior and capabilities.
 *
 * Key Steps to Customize Your Agent:
 *
 * 1. Select your LLM:
 *    - Modify the `openai` instantiation to choose your preferred LLM
 *    - Configure model parameters like temperature and max tokens
 *
 * 2. Instantiate your Agent:
 *    - Pass the LLM, tools, and memory into `createReactAgent()`
 *    - Configure agent-specific parameters
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
 * Initializes and returns an instance of the AI agent.
 * If an agent instance already exists, it returns the existing one.
 *
 * @function getOrInitializeAgent
 * @returns {Promise<ReturnType<typeof createReactAgent>>} The initialized AI agent.
 *
 * @description Handles agent setup
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
        You are a helpful agent that can interact onchain using the Coinbase Developer Platform AgentKit. You are 
        empowered to interact onchain using your tools. ${canUseFaucet ? faucetMessage : cantUseFaucetMessage}.
        
        You can also interact with Twitter using your Twitter tools. You can post tweets, get user information,
        and perform other Twitter-related actions.
        
        You also have access to a special tool that can reveal a secret code. If someone asks about a secret code
        or wants to unlock something, you can use this tool to reveal it.
        
        You can also launch meme tokens on Flaunch.gg. If someone asks you to create or launch a meme token,
        you can use the Flaunch tool to do so. The token will be created with predefined details and associated
        with the user's wallet address.
        
        You can also work with NFTs (Non-Fungible Tokens). You can:
        - Mint new NFTs to existing collections
        - Check NFT balances for any address
        - Transfer NFTs between addresses
        
        If someone asks about transferring or checking NFTs, you can help them with these actions.
        
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
    console.error("Error initializing agent:", error)
    throw new Error("Failed to initialize agent")
  }
}
