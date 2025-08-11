import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // The 'optimizeFonts: false,' line has been removed as it's deprecated.
  typescript: {
    ignoreBuildErrors: true,
  },
  
  reactStrictMode: false,
  
  eslint: {
    
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;