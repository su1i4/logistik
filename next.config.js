/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    middleware: true,
    optimizePackageImports: ["@nextui-org/react"],
  },
};

module.exports = nextConfig;
