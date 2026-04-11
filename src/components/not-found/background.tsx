export default function NotFoundBackground() {
  return (
    <div className="absolute inset-0 -z-10">
      <div className="absolute left-[8%] top-[12%] h-40 w-40 rounded-full bg-primary/16 blur-3xl sm:h-56 sm:w-56" />
      <div className="absolute bottom-[10%] right-[8%] h-48 w-48 rounded-full bg-accent/18 blur-3xl sm:h-64 sm:w-64" />
      <div className="absolute inset-x-[12%] top-[18%] h-28 rounded-full border border-border/40 bg-card/35 blur-3xl" />
    </div>
  );
}
