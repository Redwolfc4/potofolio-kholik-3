import type { NextConfig } from "next";

const isDevelopment = process.env.NODE_ENV === "development";

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

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "object-src 'none'",
      `script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval'${isDevelopment ? " 'unsafe-eval'" : ""}`,
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data:",
      "connect-src 'self' https:",
      "media-src 'self' data: blob: https:",
      "worker-src 'self' blob:",
      "manifest-src 'self'",
      "upgrade-insecure-requests",
    ].join("; "),
  },
  {
    key: "Cross-Origin-Opener-Policy",
    value: "same-origin",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
];

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  images: {
    remotePatterns: remoteImageHosts.map((hostname) => ({
      protocol: "https",
      hostname,
    })),
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
