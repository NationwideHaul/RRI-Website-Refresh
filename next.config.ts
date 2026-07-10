import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // The project lives on an external drive where macOS drops AppleDouble
    // ("._*") companion files inside .next/cache/images, which poisons the
    // optimizer cache (it serves the 4KB "._" junk instead of the image).
    // Skip optimization in dev only — production builds on Vercel (Linux)
    // are unaffected and stay optimized.
    unoptimized: process.env.NODE_ENV === "development",
  },
};

export default nextConfig;
