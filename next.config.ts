import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "s6.imgcdn.dev",
      },
      {
        protocol: "https",
        hostname: "media.licdn.com",
      },
      {
        protocol: "https",
        hostname: "images.ctfassets.net",
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "img2.lokercepat.id",
      },
      {
        protocol: "https",
        hostname: "images.glints.com",
      },
      {
        protocol: "https",
        hostname: "static.cdnlogo.com",
      },
      {
        protocol: "https",
        hostname: "parfume-website-6zvr2a2ldv.edgeone.dev",
      },
      {
        protocol: "https",
        hostname: "nusantarago.netlify.app",
      },
      {
        protocol: "https",
        hostname: "www.dicoding.com",
      },
      {
        protocol: "https",
        hostname: "dicoding-web-img.sgp1.cdn.digitaloceanspaces.com",
      },
      {
        protocol: "https",
        hostname: "mikrotik.com",
      },
      {
        protocol: "https",
        hostname: "img.alicdn.com",
      },
      {
        protocol: "https",
        hostname: "www.codepolitan.com",
      },
      {
        protocol: "https",
        hostname: "img-prod-cms-rt-microsoft-com.akamaized.net",
      },
    ],
  },
};

export default nextConfig;
