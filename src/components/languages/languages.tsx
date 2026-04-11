"use client";

import { m } from "framer-motion";
import { Languages, Globe, JapaneseYen, LucideIcon } from "lucide-react";
import { LanguagesDict } from "@/types/i18n";
import { useMotionEnabled } from "@/hooks/use-motion-enabled";
import { whenMotionEnabled } from "@/lib/motion";

const iconMap: Record<string, LucideIcon> = {
  Languages,
  Globe,
  JapaneseYen,
};

export default function LanguageSection({ dict }: { dict: LanguagesDict }) {
  const motionEnabled = useMotionEnabled();
  const getLevelWidth = (level: string) => {
    if (level === "Native") return "100%";
    if (level.includes("Working")) return "75%";
    return "30%";
  };

  return (
    <section className="py-20 w-full flex flex-col items-center justify-center bg-background/50 backdrop-blur-sm border-y border-border/50 relative overflow-hidden">
      {/* Floating orbs */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-10 left-1/4 w-48 h-48 bg-primary/6 rounded-full blur-3xl animate-float anim-delay-200" />
        <div className="absolute bottom-0 right-1/4 w-56 h-56 bg-accent/7 rounded-full blur-3xl animate-float-reverse anim-delay-600" />
      </div>
      <div className="container px-4 md:px-6">
        <m.div
          {...whenMotionEnabled(motionEnabled, {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
          })}
          className="flex flex-col items-center text-center space-y-4 mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-linear-to-r from-foreground to-foreground/60">
            {dict.title}
          </h2>
          <div className="w-20 h-1.5 bg-primary rounded-full" />
        </m.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {dict.items.map((item, index) => {
            const Icon = iconMap[item.icon as string] || Globe;
            const levelWidth = getLevelWidth(item.level);

            return (
              <m.div
                key={item.name}
                {...whenMotionEnabled(motionEnabled, {
                  initial: { opacity: 0, y: 20 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  transition: { delay: index * 0.1 },
                  whileHover: { y: -5 },
                })}
                className="group relative flex min-h-[clamp(16rem,14rem+4vw,19rem)] flex-col overflow-hidden rounded-2xl border border-border/50 bg-card p-[clamp(1.25rem,1rem+0.9vw,2rem)] transition-all duration-300 hover:border-primary/50"
              >
                <div className="absolute right-[clamp(0.75rem,0.5rem+0.8vw,1.5rem)] top-[clamp(0.75rem,0.5rem+0.8vw,1.5rem)] opacity-5 transition-opacity group-hover:opacity-10">
                  <div className="size-[clamp(3.75rem,3rem+2vw,5.5rem)]">
                    <Icon className="size-full" />
                  </div>
                </div>

                <div className="mb-[clamp(1rem,0.75rem+0.8vw,1.5rem)] grid min-w-0 grid-cols-[auto_minmax(0,1fr)] items-center gap-[clamp(0.875rem,0.6rem+0.8vw,1.25rem)]">
                  <div className="flex size-[clamp(3rem,2.6rem+1.4vw,4.25rem)] shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="size-[clamp(1.25rem,1rem+0.8vw,1.75rem)]" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-[clamp(1.125rem,1rem+0.5vw,1.375rem)] font-bold leading-tight">
                      {item.name}
                    </h3>
                    <p className="text-[clamp(0.875rem,0.8rem+0.3vw,1rem)] font-medium leading-tight text-primary">
                      {item.level}
                    </p>
                  </div>
                </div>

                <div className="mt-auto space-y-[clamp(0.75rem,0.6rem+0.4vw,1rem)]">
                  <p className="text-[clamp(0.925rem,0.85rem+0.2vw,1rem)] leading-relaxed text-muted-foreground">
                    {item.proficiency}
                  </p>

                  <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                    <m.div
                      {...whenMotionEnabled(motionEnabled, {
                        initial: { width: 0 },
                        whileInView: { width: levelWidth },
                        transition: { duration: 1, delay: 0.5 },
                      })}
                      style={!motionEnabled ? { width: levelWidth } : undefined}
                      className="h-full bg-primary"
                    />
                  </div>
                </div>
              </m.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
