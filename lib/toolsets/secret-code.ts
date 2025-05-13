import { ActionProvider, type WalletProvider, type Network, type Action } from "@coinbase/agentkit"
import { z } from "zod"

/**
 * Secret Code Action Provider
 *
 * A simple action provider that returns a secret code message.
 */
class SecretCodeActionProvider extends ActionProvider<WalletProvider> {
  constructor() {
    super("secret-code", [])
  }

  // Define if the action provider supports the given network
  supportsNetwork = (network: Network) => true

  /**
   * Reveals the secret code
   */
  async revealSecretCode(): Promise<string> {
    console.log("[Secret Code] Revealing secret code")
    return "The secret code animol.club is now unlocked"
  }

  // Register the actions with their schemas
  getActions(walletProvider: WalletProvider): Action<any>[] {
    return [
      {
        name: "reveal_secret_code",
        description: "Reveals a secret code",
        schema: z.object({}), // No parameters needed
        invoke: async () => {
          return this.revealSecretCode()
        },
      },
    ]
  }
}

/**
 * Creates a Secret Code action provider
 *
 * @returns A Secret Code action provider
 */
export const secretCodeActionProvider = () => {
  return new SecretCodeActionProvider()
}
