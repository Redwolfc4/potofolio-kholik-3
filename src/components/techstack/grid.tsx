"use client";

import Image from "next/image";
import { TechStackDict, TechItem } from "@/types/i18n";
import { useLongPress } from "@/hooks/use-long-press";
import { useLongPressStore } from "@/stores/use-longpress-store";
interface TechStackItemProps {
  tech: TechItem;
  itemKey: string;
}

function TechStackItem({ tech, itemKey }: TechStackItemProps) {
  const { isActive, handlers } = useLongPress("techstack", itemKey, "lp-techstack");

  return (
    <div
      {...handlers}
      onMouseEnter={() => {
        // Sync desktop hover with store
        if (typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches) {
          useLongPressStore.getState().setActive("techstack", itemKey);
        }
      }}
      onMouseLeave={() => {
        if (typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches) {
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
          src={tech.logoUrl ?? ""}
          alt={tech.name || "Tech Item"}
          width={40}
          height={40}
          className="w-10 h-10 object-contain"
          unoptimized
        />
        <div
          className="absolute inset-0 rounded-2xl transition-opacity ring-2 ring-primary/35 shadow-[0_0_30px_rgba(173,117,71,0.32)]"
          style={{
            opacity: isActive ? 1 : 0,
            pointerEvents: "none"
          }}
        />
      </div>
      <span
        data-tech-name={tech.name}
        className="text-sm font-semibold transition-opacity duration-300 pointer-events-none"
        style={{
          color: "var(--foreground)",
          opacity: isActive ? 1 : 0,
          visibility: isActive ? "visible" : "hidden"
        }}
      >
        {tech.name || "N/A"}
      </span>
    </div>
  );
}

export default function TechStack({ dict }: { dict: TechStackDict }) {
  const rawItems = dict.items || [];
  // Duplicate for smooth marquee
  const items = [...rawItems, ...rawItems];

  return (
    <section id="techstack" className="w-full py-20">
      <div className="px-4">
        <h2 className="text-3xl font-bold tracking-tight text-center mb-12">
          {dict?.title || "Technological Arsenal"}
        </h2>
      </div>
      <div className="tech-marquee w-full overflow-hidden">
        <div className="tech-marquee-track px-10 py-10 cursor-grab active:cursor-grabbing">
          <div className="tech-marquee-group">
            {items.map((tech, index) => (
              <TechStackItem
                key={`first-${tech.name}-${index}`}
                tech={tech}
                itemKey={`first-${tech.name}-${index}`}
              />
            ))}
          </div>
          <div className="tech-marquee-group" aria-hidden="true">
            {items.map((tech, index) => (
              <TechStackItem
                key={`second-${tech.name}-${index}`}
                tech={tech}
                itemKey={`second-${tech.name}-${index}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
