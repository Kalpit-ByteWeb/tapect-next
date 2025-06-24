import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.tapect.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig