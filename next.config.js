/** @type {import('next').NextConfig} */
const repo = "Harshit-Vavaiya.github.io";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.pexels.com", // doesn't support full wildcard
      },
    ],
  },
};
module.exports = nextConfig;
