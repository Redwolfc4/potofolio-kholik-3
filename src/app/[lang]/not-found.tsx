import Link from "next/link";
import { ArrowLeft, Compass, Home, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative flex min-h-[calc(100vh-8rem)] w-full items-center justify-center overflow-hidden px-4 py-16 sm:px-6">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-[8%] top-[12%] h-40 w-40 rounded-full bg-primary/16 blur-3xl sm:h-56 sm:w-56" />
        <div className="absolute bottom-[10%] right-[8%] h-48 w-48 rounded-full bg-accent/18 blur-3xl sm:h-64 sm:w-64" />
        <div className="absolute inset-x-[12%] top-[18%] h-28 rounded-full border border-border/40 bg-card/35 blur-3xl" />
      </div>

      <section className="relative w-full max-w-5xl overflow-hidden rounded-[2rem] border border-border/60 bg-card/70 p-6 shadow-[0_28px_100px_rgba(95,58,34,0.16)] backdrop-blur-xl sm:p-8 lg:p-12 dark:shadow-[0_28px_100px_rgba(0,0,0,0.34)]">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-secondary/70 px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-primary">
              <SearchX className="size-4" />
              404 Not Found
            </div>

            <div className="space-y-4">
              <h1 className="max-w-2xl text-left text-4xl font-black tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Halaman yang kamu cari tidak ditemukan.
              </h1>
              <p className="max-w-xl text-left text-base text-muted-foreground sm:text-lg">
                URL ini tidak tervalidasi untuk portfolio ini, atau halaman yang dituju memang tidak tersedia lagi.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/en"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[0_18px_40px_rgba(138,90,60,0.24)] transition-transform hover:-translate-y-0.5"
              >
                <Home className="size-4" />
                Back To Portfolio
              </Link>
              <Link
                href="/id"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background/70 px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary/70"
              >
                <ArrowLeft className="size-4" />
                Versi Indonesia
              </Link>
            </div>

            <div className="grid gap-3 text-left sm:grid-cols-2">
              <div className="rounded-2xl border border-border/60 bg-background/40 p-4">
                <p className="mb-1 text-sm font-bold text-foreground">URL tervalidasi</p>
                <p className="text-sm text-muted-foreground">Gunakan `/en` atau `/id` sebagai entry utama portfolio.</p>
              </div>
              <div className="rounded-2xl border border-border/60 bg-background/40 p-4">
                <p className="mb-1 text-sm font-bold text-foreground">Butuh arah cepat</p>
                <p className="text-sm text-muted-foreground">Navigasi kembali ke halaman utama untuk melihat proyek, pengalaman, dan CV.</p>
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute inset-0 rounded-[2rem] bg-linear-to-br from-primary/14 via-transparent to-accent/18 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-border/60 bg-background/70 p-6 shadow-[0_24px_80px_rgba(53,33,16,0.18)]">
              <svg
                viewBox="0 0 420 320"
                className="h-auto w-full"
                role="img"
                aria-label="404 illustration"
              >
                <defs>
                  <linearGradient id="not-found-gradient" x1="0%" x2="100%" y1="0%" y2="100%">
                    <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0.85" />
                  </linearGradient>
                </defs>
                <rect x="22" y="42" width="376" height="236" rx="28" fill="color-mix(in srgb, var(--color-card) 86%, transparent)" stroke="color-mix(in srgb, var(--color-border) 80%, transparent)" />
                <circle cx="84" cy="90" r="10" fill="var(--color-primary)" opacity="0.85" />
                <circle cx="116" cy="90" r="10" fill="var(--color-accent)" opacity="0.75" />
                <circle cx="148" cy="90" r="10" fill="var(--color-secondary)" opacity="0.95" />
                <path d="M92 212c16-54 48-82 96-82 43 0 76 26 98 78" fill="none" stroke="url(#not-found-gradient)" strokeWidth="18" strokeLinecap="round" />
                <path d="M112 212c10-30 28-46 54-46 24 0 42 14 55 42" fill="none" stroke="var(--color-foreground)" strokeOpacity="0.16" strokeWidth="8" strokeLinecap="round" />
                <text x="210" y="178" textAnchor="middle" fontSize="92" fontWeight="800" fill="var(--color-foreground)" opacity="0.92">404</text>
                <path d="M84 240h252" stroke="var(--color-border)" strokeWidth="6" strokeLinecap="round" />
                <path d="M126 112l24 24m0-24-24 24" stroke="var(--color-destructive)" strokeWidth="8" strokeLinecap="round" />
                <g transform="translate(286 104)">
                  <circle cx="28" cy="28" r="26" fill="none" stroke="var(--color-primary)" strokeWidth="8" />
                  <path d="M46 46l18 18" stroke="var(--color-primary)" strokeWidth="8" strokeLinecap="round" />
                </g>
              </svg>

              <div className="mt-5 flex items-center gap-3 rounded-2xl border border-border/60 bg-card/70 p-4 text-left">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/12 text-primary">
                  <Compass className="size-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">Route guard aktif</p>
                  <p className="text-sm text-muted-foreground">Hanya route portfolio yang tervalidasi akan dirender.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
