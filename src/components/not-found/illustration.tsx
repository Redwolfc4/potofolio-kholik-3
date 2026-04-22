import { Compass } from "lucide-react";

export default function NotFoundIllustration() {
  return (
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
          <rect
            x="22"
            y="42"
            width="376"
            height="236"
            rx="28"
            fill="color-mix(in srgb, var(--color-card) 86%, transparent)"
            stroke="color-mix(in srgb, var(--color-border) 80%, transparent)"
          />
          <circle cx="84" cy="90" r="10" fill="var(--color-primary)" opacity="0.85" />
          <circle cx="116" cy="90" r="10" fill="var(--color-accent)" opacity="0.75" />
          <circle cx="148" cy="90" r="10" fill="var(--color-secondary)" opacity="0.95" />
          <path
            d="M92 212c16-54 48-82 96-82 43 0 76 26 98 78"
            fill="none"
            stroke="url(#not-found-gradient)"
            strokeWidth="18"
            strokeLinecap="round"
          />
          <path
            d="M112 212c10-30 28-46 54-46 24 0 42 14 55 42"
            fill="none"
            stroke="var(--color-foreground)"
            strokeOpacity="0.16"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <text
            x="210"
            y="178"
            textAnchor="middle"
            fontSize="92"
            fontWeight="800"
            fill="var(--color-foreground)"
            opacity="0.92"
          >
            404
          </text>
          <path
            d="M84 240h252"
            stroke="var(--color-border)"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <path
            d="M126 112l24 24m0-24-24 24"
            stroke="var(--color-destructive)"
            strokeWidth="8"
            strokeLinecap="round"
          />
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
            <p className="text-sm text-muted-foreground">Hanya route portofolio yang tervalidasi akan dirender.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
