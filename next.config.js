/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["placeholder.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placeholder.com",
      },
    ],
    unoptimized: true,
  },
  // Add this to ensure proper handling of dynamic routes
  trailingSlash: false,
  // Ensure we're using the correct output mode
  output: "standalone",
}

module.exports = nextConfig
