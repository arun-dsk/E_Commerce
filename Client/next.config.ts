import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  reactCompiler: true,

  turbopack: {
    root: process.cwd(),
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "last-ecommerce-images.s3.ap-south-1.amazonaws.com",
      },
    ],
  },

};

export default nextConfig;
