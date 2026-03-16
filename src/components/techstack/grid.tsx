"use client";

import Image from "next/image";
import { TechStackDict } from "@/types/i18n";

export default function TechStack({ dict }: { dict: TechStackDict }) {
  const items = dict.items ? [...dict.items, ...dict.items] : [];

  return (
    <section id="techstack" className="w-full py-20">
      <div className="px-4">
        <h2 className="text-3xl font-bold tracking-tight text-center mb-12">
          {dict.title}
        </h2>
      </div>
      <div className="tech-marquee w-full">
        <div className="tech-marquee-track px-10 py-1 cursor-grab active:cursor-grabbing">
          <div className="tech-marquee-group">
            {items.map((tech, index) => (
              <div
                key={`first-${tech.name}-${index}`}
                className="group relative flex min-w-42.5 flex-col items-center gap-4 rounded-2xl border border-border/80 bg-card/90 px-4 py-6 shadow-[0_16px_40px_rgba(95,58,34,0.08)] transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[0_22px_44px_rgba(95,58,34,0.16)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.24)]"
              >
                <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-muted/70">
                  <Image
                    src={tech.logoUrl ?? ""}
                    alt={tech.name}
                    width={40}
                    height={40}
                    className="w-10 h-10 object-contain"
                  />
                  <div className="absolute inset-0 rounded-2xl opacity-0 transition-opacity ring-2 ring-primary/35 shadow-[0_0_30px_rgba(173,117,71,0.32)] group-hover:opacity-100" />
                </div>
                <span className="text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
          <div className="tech-marquee-group" aria-hidden="true">
            {items.map((tech, index) => (
              <div
                key={`second-${tech.name}-${index}`}
                className="group relative flex min-w-42.5 flex-col items-center gap-4 rounded-2xl border border-border/80 bg-card/90 px-4 py-6 shadow-[0_16px_40px_rgba(95,58,34,0.08)] transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[0_22px_44px_rgba(95,58,34,0.16)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.24)]"
              >
                <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-muted/70">
                  <Image
                    src={tech.logoUrl ?? ""}
                    alt={tech.name}
                    width={40}
                    height={40}
                    className="w-10 h-10 object-contain"
                  />
                  <div className="absolute inset-0 rounded-2xl opacity-0 transition-opacity ring-2 ring-primary/35 shadow-[0_0_30px_rgba(173,117,71,0.32)] group-hover:opacity-100" />
                </div>
                <span className="text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
