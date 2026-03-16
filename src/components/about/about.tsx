import { AboutDict } from "@/types/i18n";

export default function About({ dict }: { dict: AboutDict }) {
  return (
    <section id="about" className="w-full py-20">
      <div className="mx-auto px-4">
        <h2 className="text-3xl font-bold tracking-tight text-center mb-12">{dict.title}</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-card border rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-3">{dict.summary.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {dict.summary.content}
            </p>
          </div>
          <div className="bg-card border rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-3">{dict.focus.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {dict.focus.content}
            </p>
          </div>
          <div className="bg-card border rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-3">{dict.highlights.title}</h3>
            <ul className="text-muted-foreground text-sm leading-relaxed space-y-2">
              {dict.highlights.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
