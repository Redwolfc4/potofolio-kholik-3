export default function NotFoundBackground() {
  return (
    <div className="absolute inset-0 -z-10">
      <div className="absolute left-[8%] top-[12%] h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute bottom-[10%] right-[8%] h-48 w-48 rounded-full bg-accent/10 blur-3xl" />
    </div>
  );
}
