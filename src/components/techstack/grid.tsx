"use client";

import Image from "next/image";
import { TechStackDict } from "@/types/i18n";
import { useLongPress } from "@/hooks/use-long-press";
import { useLongPressStore } from "@/stores/use-longpress-store";
import { z } from "zod";

const TechItemSchema = z.object({
  name: z.string(),
  category: z.string(),
  logoUrl: z.string().nullable().optional(),
});

function TechItem({ tech, itemKey }: { tech: any; itemKey: string }) {
  const { isActive, handlers } = useLongPress("techstack", itemKey, "lp-techstack");
  
  // Validate data at runtime
  const result = TechItemSchema.safeParse(tech);
  if (!result.success) return null;
  const data = result.data;

  return (
    <div
      {...handlers}
      onMouseEnter={() => {
        // Sync desktop hover with store
        if (window.matchMedia("(hover: hover)").matches) {
          useLongPressStore.getState().setActive("techstack", itemKey);
        }
      }}
      onMouseLeave={() => {
        if (window.matchMedia("(hover: hover)").matches) {
          const state = useLongPressStore.getState();
          if (state.activeSection === "techstack" && state.activeId === itemKey) {
            state.clear();
          }
        }
      }}
      className={`lp-techstack group relative flex min-w-42.5 flex-col items-center gap-4 rounded-2xl border bg-card/90 px-4 py-6 shadow-[0_16px_40px_rgba(95,58,34,0.08)] transition-all duration-300 cursor-pointer
        ${isActive ? "-translate-y-1 border-primary/40 shadow-[0_22px_44px_rgba(95,58,34,0.16)] scale-105" : "border-border/80"}`}
    >
      <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-muted/70">
        <Image
          src={data.logoUrl ?? ""}
          alt={data.name}
          width={40}
          height={40}
          className="w-10 h-10 object-contain"
        />
        <div className={`absolute inset-0 rounded-2xl transition-opacity ring-2 ring-primary/35 shadow-[0_0_30px_rgba(173,117,71,0.32)] ${isActive ? "opacity-100" : "opacity-0"}`} />
      </div>
      <span 
        data-name={data.name}
        className={`text-sm font-semibold transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-0"}`}
      >
        {data.name}
      </span>
    </div>
  );
}

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
              <TechItem key={`first-${tech.name}-${index}`} tech={tech} itemKey={`first-${tech.name}-${index}`} />
            ))}
          </div>
          <div className="tech-marquee-group" aria-hidden="true">
            {items.map((tech, index) => (
              <TechItem key={`second-${tech.name}-${index}`} tech={tech} itemKey={`second-${tech.name}-${index}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
