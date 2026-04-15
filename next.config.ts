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
  /*
   * CSP is now set dynamically in middleware.ts with per-request nonces.
   * This allows us to drop 'unsafe-inline' from script-src while keeping
   * Next.js inline scripts working.  The static fallback below is kept for
   * paths that middleware cannot reach (e.g. _next/static, public assets).
   */
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
      "require-trusted-types-for 'script'",
      "trusted-types nextjs nextjs#app-pages-dev nextjs#bundler dompurify default",
      ...(isDevelopment ? [] : ["upgrade-insecure-requests"]),
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
  // Cross-Origin Embedder Policy — enable cross-origin isolation
  {
    key: "Cross-Origin-Embedder-Policy",
    value: "credentialless",
  },
  // Cross-Origin Resource Policy
  {
    key: "Cross-Origin-Resource-Policy",
    value: "same-origin",
  },
];

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  productionBrowserSourceMaps: true,
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
