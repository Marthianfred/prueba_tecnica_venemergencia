import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
      remotePatterns: [
          {
              protocol: 'https',
              hostname: 'image.tmdb.org',
              port: '',
              pathname: '**',
          },
          {
              protocol: 'https',
              hostname: 'via.placeholder.com',
              port: '',
              pathname: '**',
          },
      ],
  },
};

export default nextConfig;
