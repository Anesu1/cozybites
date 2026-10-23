import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export, served by a Cloudflare Worker (see wrangler.jsonc).
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
