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

/*
 * Security headers applied to ALL responses (including static assets).
 *
 * CSP is intentionally NOT set here — it is handled dynamically in
 * middleware.ts with per-request nonces for document requests.
 * Having two competing CSP headers (one from config, one from middleware)
 * causes the browser to enforce the intersection of both policies,
 * which blocks Lighthouse's profiling scripts and causes NO_NAVSTART.
 *
 * Cross-Origin-Opener-Policy is also omitted because it triggers a
 * browsing-context-group switch during the "/" → "/en" redirect, which
 * makes Lighthouse lose its performance trace.
 */
const securityHeaders = [
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
  // Strong HSTS policy: 2 years, include subdomains, allow preload submission
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // Permissions-Policy — disable unused browser features
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  // Cross-Origin Resource Policy
  {
    key: "Cross-Origin-Resource-Policy",
    value: "same-origin",
  },
  // CROSS-ORIGIN-OPENER-POLICY — Helps Lighthouse maintain trace on redirects/navs
  {
    key: "Cross-Origin-Opener-Policy",
    value: "same-origin-allow-popups",
  },
];

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
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
