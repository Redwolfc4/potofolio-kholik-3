import type { NextConfig } from "next";

const remoteImageHosts = [
  "cdn.jsdelivr.net",
  "dicoding-web-img.sgp1.cdn.digitaloceanspaces.com",
  "i.ibb.co.com",
  "images.ctfassets.net",
  "images.glints.com",
  "images.unsplash.com",
  "img-prod-cms-rt-microsoft-com.akamaized.net",
  "img.alicdn.com",
  "img2.lokercepat.id",
  "media.licdn.com",
  "mikrotik.com",
  "nusantarago.netlify.app",
  "parfume-website-6zvr2a2ldv.edgeone.dev",
  "raw.githubusercontent.com",
  "s6.imgcdn.dev",
  "static.cdnlogo.com",
  "upload.wikimedia.org",
  "www.codepolitan.com",
  "www.dicoding.com",
] as const;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: remoteImageHosts.map((hostname) => ({
      protocol: "https",
      hostname,
    })),
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
