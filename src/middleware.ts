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

  const directives = [
    "default-src 'self'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "object-src 'none'",
    scriptSrc,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https:",
    "font-src 'self' data:",
    `connect-src 'self' https:${isDevelopment ? " ws:" : ""}`,
    "media-src 'self' data: blob: https:",
    "worker-src 'self' blob:",
    "manifest-src 'self'",
  ];

  return directives.join("; ");
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // --- Locale redirect: use rewrite instead of redirect ---
  // A redirect (307) causes the browser to perform a second navigation.
  // Combined with security headers, this triggers a browsing-context-group
  // switch that makes Lighthouse lose its performance trace (NO_NAVSTART).
  // A rewrite serves the /en content at "/" without a client-side redirect.
  if (pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}`;
    return NextResponse.rewrite(url);
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // --- CSP nonce injection ---
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const csp = buildCsp(nonce);

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);

  const response = pathnameHasLocale
    ? NextResponse.next({ request: { headers: requestHeaders } })
    : NextResponse.next({ request: { headers: requestHeaders } });

  response.headers.set("Content-Security-Policy", csp);

  return response;
}

export const config = {
  matcher: [
    // Skip all internal paths (_next), API routes, and static files
    "/((?!api|_next/static|_next/image|favicon.ico|imgPortofolio|.*\\..*).*)",
  ],
};
