declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_THIRDWEB_CLIENT_ID: string
    // No secret keys here - they should only be used server-side
  }
}
