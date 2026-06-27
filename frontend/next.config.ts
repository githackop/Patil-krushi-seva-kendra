import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Admin uploads will store CDN URLs in the backend; the customer app renders those URLs directly.
    remotePatterns: [
      {
        protocol: "https",
        hostname:
          "pub-a1af7329c9c547d39865875bc2a0f92b.r2.dev",
      },
      {
        protocol: "https",
        hostname: "imagedelivery.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
