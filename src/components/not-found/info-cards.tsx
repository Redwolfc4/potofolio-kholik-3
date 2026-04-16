export default function NotFoundInfoCards({ 
  infoUrl, 
  infoUrlDesc, 
  infoNav, 
  infoNavDesc 
}: { 
  infoUrl: string; 
  infoUrlDesc: string; 
  infoNav: string; 
  infoNavDesc: string; 
}) {
  return (
    <div className="grid gap-3 text-left sm:grid-cols-2">
      <div className="rounded-2xl border border-border/60 bg-background/40 p-4">
        <p className="mb-1 text-sm font-bold text-foreground">{infoUrl}</p>
        <p className="text-sm text-muted-foreground">{infoUrlDesc}</p>
      </div>
      <div className="rounded-2xl border border-border/60 bg-background/40 p-4">
        <p className="mb-1 text-sm font-bold text-foreground">{infoNav}</p>
        <p className="text-sm text-muted-foreground">{infoNavDesc}</p>
      </div>
    </div>
  );
}
