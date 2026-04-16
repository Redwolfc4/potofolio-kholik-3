import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale, locales } from "@/lib/i18n";

const isDevelopment = process.env.NODE_ENV === "development";

/**
 * Build Content-Security-Policy.
 *
 * In **production** we use a per-request nonce + 'strict-dynamic' so that
 * Next.js inline bootstrap scripts are allowed without 'unsafe-inline'.
 *
 * In **development** we keep 'unsafe-inline' + 'unsafe-eval' because the
 * Next.js hot-reload / Fast-Refresh client injects scripts that cannot
 * carry nonces.
 */
function buildCsp(nonce: string): string {
  const scriptSrc = isDevelopment
    ? "script-src 'self' 'unsafe-inline' 'unsafe-eval' 'wasm-unsafe-eval'"
    : `script-src 'self' 'nonce-${nonce}' 'strict-dynamic' 'wasm-unsafe-eval'`;

  const remoteHosts = [
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
  ].join(" ");

  const directives = [
    "default-src 'self'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "object-src 'none'",
    scriptSrc,
    "style-src 'self' 'unsafe-inline'",
    `img-src 'self' data: blob: ${remoteHosts}`,
    "font-src 'self' data:",
    `connect-src 'self' ${remoteHosts} https:${isDevelopment ? " ws:" : ""}`,
    `media-src 'self' data: blob: ${remoteHosts}`,
    "worker-src 'self' blob:",
    "manifest-src 'self'",
  ];

  return directives.join("; ");
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Generate security context always
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const csp = buildCsp(nonce);

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);

  // 2. Security Block: Explicitly prevent access to sensitive files
  // and redirect them to a path that will trigger our custom 404
  const sensitivePatterns = [/\.env/, /\.git/, /\.yml/, /\.config/];
  if (sensitivePatterns.some((pattern) => pattern.test(pathname))) {
    const url = request.nextUrl.clone();
    url.pathname = "/404"; 
    const response = NextResponse.rewrite(url, {
      request: { headers: requestHeaders },
    });
    response.headers.set("Content-Security-Policy", csp);
    return response;
  }

  // 3. Determine response type (rewrite for root, or next for others)
  let response: NextResponse;

  if (pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}`;
    response = NextResponse.rewrite(url, {
      request: { headers: requestHeaders },
    });
  } else {
    // For other paths (already have locale or static files)
    response = NextResponse.next({
      request: { headers: requestHeaders },
    });
  }

  // 4. Inject CSP header into the response
  response.headers.set("Content-Security-Policy", csp);

  return response;
}

export const config = {
  matcher: [
    // Skip internal paths and specific allowed static files
    "/((?!api|_next/static|_next/image|favicon.ico|imgPortofolio|sitemap.xml|robots.txt).*)",
  ],
};
