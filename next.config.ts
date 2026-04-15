import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Redirect old /blog routes to /work
      { source: '/blog', destination: '/work', permanent: true },
      { source: '/blog/:slug', destination: '/work/:slug', permanent: true },
      // Clean /schedule shortcut
      { source: '/schedule', destination: process.env.NEXT_PUBLIC_CALENDLY_URL ?? '/contact', permanent: false },
    ];
  },
};

export default nextConfig;
