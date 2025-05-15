declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_THIRDWEB_CLIENT_ID: string
    // Server-side variables don't need to be declared here for client TypeScript
  }
}
