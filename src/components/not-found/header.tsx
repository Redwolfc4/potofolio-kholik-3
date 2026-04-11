import { SearchX } from "lucide-react";

export default function NotFoundHeader() {
  return (
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
    </div>
  );
}
