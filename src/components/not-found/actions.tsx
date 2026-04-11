import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFoundActions() {
  return (
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
  );
}
