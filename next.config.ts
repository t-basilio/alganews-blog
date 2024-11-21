import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: {
      ssr: true,
      minify: true,
      transpileTemplateLiterals: true,
      pure: true,
      displayName: true,
    },
  },
  images: {
    remotePatterns: [
      { hostname: "storage.googleapis.com" },
      { hostname: "localhost" },
    ],
  },
};

export default nextConfig;
