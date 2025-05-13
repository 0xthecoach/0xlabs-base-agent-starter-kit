import {
  AgentKit,
  cdpApiActionProvider,
  erc20ActionProvider,
  erc721ActionProvider,
  pythActionProvider,
  SmartWalletProvider,
  twitterActionProvider,
  walletActionProvider,
  type WalletProvider,
  wethActionProvider,
} from "@coinbase/agentkit"
import { secretCodeActionProvider } from "@/lib/toolsets/secret-code"
import { flaunchActionProvider } from "@/lib/toolsets/flaunch"
import * as fs from "fs"
import type { Address, Hex } from "viem"
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts"

// Configure a file to persist the agent's Smart Wallet + Private Key data
const WALLET_DATA_FILE = "wallet_data.txt"
const IS_PRODUCTION = process.env.NODE_ENV === "production"

type WalletData = {
  privateKey: Hex
  smartWalletAddress: Address
}

/**
 * Prepares the AgentKit and WalletProvider.
 *
 * @function prepareAgentkitAndWalletProvider
 * @returns {Promise<{ agentkit: AgentKit, walletProvider: WalletProvider }>} The initialized AI agent.
 *
 * @description Handles agent setup
 *
 * @throws {Error} If the agent initialization fails.
 */
export async function prepareAgentkitAndWalletProvider(): Promise<{
  agentkit: AgentKit
  walletProvider: WalletProvider
}> {
  try {
    let walletData: WalletData | null = null
    let privateKey: Hex | null = null
    let smartWalletAddress: Address | undefined = undefined

    // In production, use environment variables
    if (IS_PRODUCTION) {
      // Use the PRIVATE_KEY environment variable
      privateKey = process.env.PRIVATE_KEY as Hex

      // If we have a stored smart wallet address in an environment variable, use it
      if (process.env.SMART_WALLET_ADDRESS) {
        smartWalletAddress = process.env.SMART_WALLET_ADDRESS as Address
      }
    }
    // In development, use the file system
    else {
      // Read existing wallet data if available
      if (fs.existsSync(WALLET_DATA_FILE)) {
        try {
          walletData = JSON.parse(fs.readFileSync(WALLET_DATA_FILE, "utf8")) as WalletData
          privateKey = walletData.privateKey
          smartWalletAddress = walletData.smartWalletAddress
        } catch (error) {
          console.error("Error reading wallet data:", error)
          // Continue without wallet data
        }
      }
    }

    if (!privateKey) {
      if (walletData?.smartWalletAddress) {
        throw new Error(
          `Smart wallet found but no private key provided. Either provide the private key, or delete ${WALLET_DATA_FILE} and try again.`,
        )
      }
      privateKey = (process.env.PRIVATE_KEY || generatePrivateKey()) as Hex
    }

    const signer = privateKeyToAccount(privateKey)

    // Initialize WalletProvider: https://docs.cdp.coinbase.com/agentkit/docs/wallet-management
    const walletProvider = await SmartWalletProvider.configureWithWallet({
      networkId: process.env.NETWORK_ID || "base-sepolia",
      signer,
      smartWalletAddress,
      paymasterUrl: undefined, // Sponsor transactions: https://docs.cdp.coinbase.com/paymaster/docs/welcome
    })

    // Create action providers
    const secretCodeProvider = secretCodeActionProvider()
    const flaunchProvider = flaunchActionProvider()
    const erc721Provider = erc721ActionProvider()

    console.log("Action providers initialized (including NFT providers)")

    // Initialize AgentKit: https://docs.cdp.coinbase.com/agentkit/docs/agent-actions
    const agentkit = await AgentKit.from({
      walletProvider,
      actionProviders: [
        wethActionProvider(),
        pythActionProvider(),
        walletActionProvider(),
        erc20ActionProvider(),
        twitterActionProvider(),
        cdpApiActionProvider({
          apiKeyName: process.env.CDP_API_KEY_NAME,
          apiKeyPrivateKey: process.env.CDP_API_KEY_PRIVATE_KEY,
        }),
        secretCodeProvider, // Add the Secret Code action provider
        flaunchProvider, // Add the Flaunch action provider
        erc721Provider, // Add the ERC721 NFT action provider
      ],
    })

    // Save wallet data - only in development
    if (!IS_PRODUCTION) {
      const newSmartWalletAddress = await walletProvider.getAddress()
      fs.writeFileSync(
        WALLET_DATA_FILE,
        JSON.stringify({
          privateKey,
          smartWalletAddress: newSmartWalletAddress,
        } as WalletData),
      )

      // Log the smart wallet address in development for easy access
      console.log("Smart wallet address:", newSmartWalletAddress)
    }

    return { agentkit, walletProvider }
  } catch (error) {
    console.error("Error initializing agent:", error)
    throw new Error("Failed to initialize agent")
  }
}
