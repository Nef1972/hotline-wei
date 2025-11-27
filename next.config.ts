import type { NextConfig } from "next";
import env from "@/lib/utils/env";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: env.r2.publicPath,
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
