import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 2592000,
  },
  async rewrites() {
    return [
      { source: "/index.md", destination: "/md/index" },
      { source: "/work/:slug.md", destination: "/md/work/:slug" },
      { source: "/blog/:slug.md", destination: "/md/blog/:slug" },
    ];
  },
  async headers() {
    return [
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, s-maxage=31536000, immutable",
          },
        ],
      },
      {
        source: "/3d/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, s-maxage=31536000, immutable",
          },
        ],
      },
      {
        source: "/fallbacks/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, s-maxage=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
