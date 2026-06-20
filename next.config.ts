import type { NextConfig } from "next";

const REQUIRED_ENV_VARS = ["NEXT_PUBLIC_API_URL"];

for (const name of REQUIRED_ENV_VARS) {
  if (!process.env[name]) {
    throw new Error(
      `\n\n❌ Missing required environment variable: ${name}\n` +
      `   Add it to your .env file and restart the server.\n`
    );
  }
}

const nextConfig: NextConfig = {};

export default nextConfig;
