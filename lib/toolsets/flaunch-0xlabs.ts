import { ActionProvider, type WalletProvider, type Network, type Action } from "@coinbase/agentkit"
import { z } from "zod"
import * as fs from "fs"

/**
 * Flaunch Action Provider for 0xLabsTheCoder
 *
 * An action provider that allows launching meme tokens on Flaunch.gg
 * with 0xLabsTheCoder-specific token details
 */
class FlaunchActionProvider extends ActionProvider<WalletProvider> {
  constructor() {
    super("flaunch-0xlabs", [])
  }

  // Define if the action provider supports the given network
  supportsNetwork = (network: Network) => true

  /**
   * Converts an image URL to base64
   */
  private async imageUrlToBase64(imageUrl: string): Promise<string> {
    try {
      console.log(`[Flaunch 0xLabs] Fetching image from URL: ${imageUrl}`)

      // Fetch the image from the URL
      const response = await fetch(imageUrl)

      if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.status} ${response.statusText}`)
      }

      // Get the image as an ArrayBuffer
      const arrayBuffer = await response.arrayBuffer()

      // Convert ArrayBuffer to Buffer
      const buffer = Buffer.from(arrayBuffer)

      // Encode the image content to base64
      const base64Image = buffer.toString("base64")

      // Add the prefix for a JPEG image
      const base64ImageWithPrefix = `data:image/jpeg;base64,${base64Image}`

      console.log(`[Flaunch 0xLabs] Successfully converted image to base64`)

      return base64ImageWithPrefix
    } catch (error: any) {
      console.error(`[Flaunch 0xLabs] Error converting image to base64:`, error)
      throw new Error(`Failed to convert image to base64: ${error.message}`)
    }
  }

  /**
   * Uploads an image to Flaunch and gets the IPFS hash
   */
  private async uploadImageToFlaunch(base64Image: string): Promise<string> {
    try {
      console.log(`[Flaunch 0xLabs] Uploading image to Flaunch`)

      const response = await fetch("https://web2-api.flaunch.gg/api/v1/upload-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          base64Image: base64Image,
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Failed to upload image: ${response.status} ${response.statusText}. ${errorText}`)
      }

      const data = await response.json()

      if (!data.success || !data.ipfsHash) {
        throw new Error(`Failed to get IPFS hash: ${JSON.stringify(data)}`)
      }

      console.log(`[Flaunch 0xLabs] Successfully uploaded image to IPFS: ${data.ipfsHash}`)

      return data.ipfsHash
    } catch (error: any) {
      console.error(`[Flaunch 0xLabs] Error uploading image:`, error)
      throw new Error(`Failed to upload image: ${error.message}`)
    }
  }

  /**
   * Launches a meme token on Flaunch
   */
  private async launchToken(
    ipfsHash: string,
    tokenName: string,
    tokenSymbol: string,
    tokenDescription: string,
    websiteUrl: string,
    creatorAddress: string,
    discordUrl = "",
    twitterUrl = "",
    telegramUrl = "",
  ): Promise<any> {
    try {
      console.log(`[Flaunch 0xLabs] Launching token: ${tokenName} (${tokenSymbol})`)
      console.log(`[Flaunch 0xLabs] Creator address: ${creatorAddress}`)

      const response = await fetch("https://web2-api.flaunch.gg/api/v1/base/launch-memecoin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: tokenName,
          symbol: tokenSymbol,
          description: tokenDescription,
          imageIpfs: ipfsHash,
          websiteUrl: websiteUrl,
          discordUrl: discordUrl,
          twitterUrl: twitterUrl,
          telegramUrl: telegramUrl,
          creatorAddress: creatorAddress,
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Failed to launch token: ${response.status} ${response.statusText}. ${errorText}`)
      }

      const data = await response.json()
      console.log(`[Flaunch 0xLabs] Token launch response:`, JSON.stringify(data, null, 2))

      return data
    } catch (error: any) {
      console.error(`[Flaunch 0xLabs] Error launching token:`, error)
      throw new Error(`Failed to launch token: ${error.message}`)
    }
  }

  /**
   * Launches a meme token on Flaunch with 0xLabsTheCoder-specific token details
   */
  async launchMemeToken(walletProvider: WalletProvider): Promise<string> {
    try {
      // 0xLabsTheCoder-specific token details
      const tokenDetails = {
        imageUrl: "https://airdropalert.com/wp-content/uploads/2024/05/PEPE-meme-coin-ATH2.png",
        tokenName: "PepeBosz",
        tokenSymbol: "PEPEBZ",
        tokenDescription: "The official token of PepeBosz, the Boss of all Pepes",
        websiteUrl: "https://pepebosz.io",
        discordUrl: "",
        twitterUrl: "https://twitter.com/0xPepeBosz",
        telegramUrl: "",
      }

      // Get the wallet address dynamically
      let creatorAddress: string
      try {
        creatorAddress = await walletProvider.getAddress()
        console.log(`[Flaunch 0xLabs] Using wallet address from provider: ${creatorAddress}`)
      } catch (error) {
        console.error(`[Flaunch 0xLabs] Error getting wallet address from provider:`, error)
        console.log(`[Flaunch 0xLabs] Falling back to reading from wallet_data_0xlabs.txt`)

        // Fallback to reading from wallet_data_0xlabs.txt
        const walletData = JSON.parse(fs.readFileSync("wallet_data_0xlabs.txt", "utf8"))
        creatorAddress = walletData.smartWalletAddress
        console.log(`[Flaunch 0xLabs] Using wallet address from file: ${creatorAddress}`)
      }

      // Step 1: Convert image URL to base64
      const base64Image = await this.imageUrlToBase64(tokenDetails.imageUrl)

      // Step 2: Upload image to Flaunch
      const ipfsHash = await this.uploadImageToFlaunch(base64Image)

      // Step 3: Launch the token
      const launchResult = await this.launchToken(
        ipfsHash,
        tokenDetails.tokenName,
        tokenDetails.tokenSymbol,
        tokenDetails.tokenDescription,
        tokenDetails.websiteUrl,
        creatorAddress,
        tokenDetails.discordUrl,
        tokenDetails.twitterUrl,
        tokenDetails.telegramUrl,
      )

      // Step 4: Format and return the result
      const jobId = launchResult.jobId || "Unknown"
      const explorerUrl = launchResult.explorerUrl || "Unknown"

      return `
Successfully launched PepeBosz on Flaunch!

Token Name: ${tokenDetails.tokenName}
Token Symbol: ${tokenDetails.tokenSymbol}
Creator Address: ${creatorAddress}
IPFS Hash: ${ipfsHash}
Job ID: ${jobId}
Explorer URL: ${explorerUrl}

Your token is now being processed by Flaunch. You can check its status using the Job ID.
      `
    } catch (error: any) {
      console.error(`[Flaunch 0xLabs] Error in launchMemeToken:`, error)
      return `Error launching PepeBosz: ${error.message}`
    }
  }

  // Register the actions with their schemas
  getActions(walletProvider: WalletProvider): Action<any>[] {
    return [
      {
        name: "launch_meme_token",
        description: "Launches a PepeBosz meme token on Flaunch.gg",
        schema: z.object({}), // No parameters needed
        invoke: async () => {
          return this.launchMemeToken(walletProvider)
        },
      },
    ]
  }
}

/**
 * Creates a Flaunch action provider for 0xLabsTheCoder
 *
 * @returns A Flaunch action provider for 0xLabsTheCoder
 */
export const flaunchActionProvider = () => {
  return new FlaunchActionProvider()
}
