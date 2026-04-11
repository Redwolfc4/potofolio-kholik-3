export default function NotFoundInfoCards() {
  return (
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
  );
}
