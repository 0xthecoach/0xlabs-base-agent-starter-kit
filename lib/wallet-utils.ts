/**
 * Truncates a wallet address for display purposes
 * @param address The full wallet address
 * @returns Truncated address in format "0x1234...5678"
 */
export function truncateAddress(address: string): string {
  if (!address) return ""
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
}

/**
 * Copies text to clipboard
 * @param text The text to copy
 * @returns Promise that resolves when copying is complete
 */
export async function copyToClipboard(text: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text)
    return Promise.resolve()
  } catch (error) {
    console.error("Failed to copy text: ", error)
    return Promise.reject(error)
  }
}
