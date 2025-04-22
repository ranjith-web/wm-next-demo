import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  distDir: 'build',
  output: 'export',
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: true, // This flag is added for temporary. Ignores all TypeScript errors during `npm run build`
  },
};

export default nextConfig;
