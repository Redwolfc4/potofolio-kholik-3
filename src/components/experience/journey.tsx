"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

import { ExperienceDict } from "@/types/i18n";
import { useLongPress } from "@/hooks/use-long-press";
import { useLongPressStore } from "@/stores/use-longpress-store";

function ExperienceDot({ exp, isEven, dict, onSelect }: {
  exp: NonNullable<ExperienceDict["items"]>[number];
  isEven: boolean;
  dict: ExperienceDict;
  onSelect: (id: string) => void;
}) {
  const { isActive: isHovered, handlers } = useLongPress("experience", exp.id, "lp-exp");

  return (
    <div
      key={exp.id}
      className={`relative flex items-center w-full ${isEven ? "md:flex-row" : "md:flex-row-reverse"} flex-col`}
      onMouseEnter={() => {
        // Sync desktop hover with store
        if (window.matchMedia("(hover: hover)").matches) {
          useLongPressStore.getState().setActive("experience", exp.id);
        }
      }}
      onMouseLeave={() => {
        // Only clear on desktop mouse leave, not on touch
        if (window.matchMedia("(hover: hover)").matches) {
          const state = useLongPressStore.getState();
          if (state.activeSection === "experience" && state.activeId === exp.id) {
            state.clear();
          }
        }
      }}
    >
      {/* Card Section */}
      <div className="w-full md:w-1/2 flex justify-center md:px-8 2xl:px-12 order-last md:order-0 mt-4 md:mt-0">
        <motion.div
          initial={false}
          animate={{
            opacity: isHovered ? 1 : 0,
            x: isHovered ? 0 : (isEven ? -100 : 100),
            scale: isHovered ? 1 : 0.8,
            rotateY: isHovered ? 0 : (isEven ? 15 : -15)
          }}
          transition={{
            type: "spring",
            stiffness: 80,
            damping: 15,
            mass: 1,
            duration: 0.6
          }}
          className={`w-full max-w-md xl:max-w-lg 2xl:max-w-xl ${isHovered ? "pointer-events-auto" : "pointer-events-none"}`}
        >
          <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            className={`lp-exp relative backdrop-blur-xl border rounded-3xl p-6 2xl:p-8 transition-all duration-500 cursor-pointer group/card overflow-hidden ${isHovered ? "shadow-primary/10 bg-card border-primary/40 -translate-y-1 scale-[1.02]" : "bg-card/40 border-primary/20 shadow-2xl"}`}
            onMouseEnter={() => {
              useLongPressStore.getState().setActive("experience", exp.id);
            }}
            {...handlers}
            onClick={() => onSelect(exp.id)}
          >
            {/* Hover Glow Effect */}
            <div className={`absolute -inset-px bg-linear-to-br from-primary/20 via-transparent to-transparent transition-opacity duration-500 ${isHovered ? "opacity-100" : "opacity-0 md:group-hover/card:opacity-100"}`} />

            <div className="relative z-10">
              <div className="flex flex-col gap-1 mb-4 2xl:gap-2 2xl:mb-6">
                <span className="text-[10px] xl:text-xs font-black text-primary/70 uppercase tracking-[0.2em]">{exp.period}</span>
                <h3 className={`text-xl md:text-2xl xl:text-3xl font-black transition-colors leading-tight ${isHovered ? "text-primary" : "md:group-hover/card:text-primary"}`}>{exp.position}</h3>
                <div className="flex items-center gap-2 2xl:gap-3">
                  {exp.logo && (
                    <Image
                      src={exp.logo}
                      alt={exp.company}
                      width={24}
                      height={24}
                      unoptimized
                      className="h-5 w-5 xl:h-6 xl:w-6 object-contain rounded-sm"
                    />
                  )}
                  <p className={`text-sm xl:text-base font-bold transition-colors ${isHovered ? "text-foreground" : "text-muted-foreground/80 md:group-hover/card:text-foreground"}`}>{exp.company}</p>
                </div>
              </div>

              <p className="text-xs xl:text-sm text-muted-foreground/70 leading-relaxed line-clamp-2 md:line-clamp-3 mb-4 2xl:mb-6">
                {exp.description[0]}
              </p>

              <div className="flex items-center gap-2 text-[10px] xl:text-xs font-black text-primary uppercase tracking-widest">
                <span>{dict.viewDetails}</span>
                <div className={`h-px bg-primary transition-all ${isHovered ? "w-8 xl:w-12" : "w-4 xl:w-6 md:group-hover/card:w-8 xl:md:group-hover/card:w-12"}`} />
              </div>
            </div>

            <div className={`absolute top-6 right-6 transition-opacity ${isHovered ? "opacity-100" : "opacity-30 md:group-hover/card:opacity-100"}`}>
              <div className="px-2 py-0.5 text-[8px] xl:text-[10px] bg-primary/10 text-primary border border-primary/20 rounded-full font-black tracking-widest uppercase">
                {exp.location}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bullet / Dot in the Middle */}
      <div
        className="lp-exp absolute left-4 md:left-1/2 -translate-x-1/2 z-30"
        onMouseEnter={() => {
          useLongPressStore.getState().setActive("experience", exp.id);
        }}
        {...handlers}
        onClick={() => onSelect(exp.id)}
      >
        <motion.div
          animate={{
            scale: isHovered ? 1.8 : 1,
            backgroundColor: isHovered ? "var(--primary)" : "rgba(0,0,0,0)"
          }}
          className="h-6 w-6 xl:h-8 xl:w-8 rounded-full bg-background border-2 border-primary flex items-center justify-center cursor-pointer shadow-[0_0_20px_rgba(var(--primary),0.3)] transition-all group"
        >
          <motion.div
            animate={{
              scale: isHovered ? 0.5 : 1,
              backgroundColor: isHovered ? "white" : "var(--primary)"
            }}
            className="h-2 w-2 xl:h-3 xl:w-3 rounded-full bg-primary"
          />

          {/* Pulse effect when hovered */}
          {isHovered && (
            <motion.div
              initial={{ scale: 1, opacity: 0.5 }}
              animate={{ scale: 2.5, opacity: 0 }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="absolute inset-0 rounded-full bg-primary/30"
            />
          )}
        </motion.div>
      </div>

      {/* Date/Period Section */}
      <div className={`hidden md:flex w-1/2 ${isEven ? "justify-start" : "justify-end"} px-12 xl:px-20`}>
        <motion.div
          animate={{
            opacity: isHovered ? 1 : 0.3,
            x: isHovered ? (isEven ? 10 : -10) : 0,
            color: isHovered ? "var(--primary)" : "var(--muted-foreground)"
          }}
          className="text-sm xl:text-lg font-black uppercase tracking-[0.3em] transition-colors"
        >
          {exp.period}
        </motion.div>
      </div>

      {/* Mobile Date - only visible if not desktop */}
      <div className="md:hidden ml-12 mt-2 mb-4">
        <span className="text-[10px] font-black text-muted-foreground/50 tracking-widest">{exp.period}</span>
      </div>
    </div>
  );
}

export default function ExperienceJourney({ dict }: { dict: ExperienceDict }) {
  const experiences = dict.items;
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selected = experiences?.find((exp) => exp.id === selectedId) ?? null;

  return (
    <section id="experience" className="py-24 w-full px-4 sm:px-10 lg:px-20 xl:px-24 2xl:px-32 overflow-hidden">
      <div className="max-w-6xl xl:max-w-7xl 2xl:max-w-[1400px] mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl xl:text-6xl font-black mb-20 text-center bg-clip-text text-transparent bg-linear-to-r from-primary via-primary/80 to-primary/60"
        >
          {dict.title}
        </motion.h2>

        <div className="relative">
          {/* Vertical Line - Center Positioned */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-linear-to-b from-primary/50 via-primary/20 to-transparent" />

          <div className="space-y-12 md:space-y-24">
            {experiences?.map((exp, index) => (
              <ExperienceDot
                key={exp.id}
                exp={exp}
                isEven={index % 2 === 0}
                dict={dict}
                onSelect={(id) => setSelectedId(id)}
              />
            ))}
          </div>
        </div>
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedId(null);
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card border rounded-2xl shadow-xl w-full max-w-2xl xl:max-w-4xl p-6 md:p-8 xl:p-12"
          >
            <div className="flex items-start justify-between gap-4 mb-6 xl:mb-8">
              <div>
                <h3 className="text-2xl xl:text-4xl font-bold text-primary">{selected.position}</h3>
                <div className="flex items-center gap-2 xl:gap-4 mt-2">
                  {selected.logo && (
                    <Image
                      src={selected.logo}
                      alt={selected.company}
                      width={28}
                      height={28}
                      unoptimized
                      className="h-6 w-6 xl:h-8 xl:w-8 object-contain rounded-sm"
                    />
                  )}
                  <p className="text-lg xl:text-xl font-semibold">{selected.company}</p>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 xl:mt-3 text-sm xl:text-base text-muted-foreground">
                  <span>{selected.period}</span>
                  <span className="hidden sm:inline">•</span>
                  <span>{selected.location}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedId(null)}
                className="p-2 rounded-full hover:bg-muted transition-colors"
                aria-label="Close modal"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4 xl:space-y-6">
              <h4 className="font-bold text-sm xl:text-base uppercase tracking-widest text-muted-foreground">{dict.responsibilities}</h4>
              <ul className="space-y-3 xl:space-y-4">
                {selected.description.map((item, idx) => (
                  <li key={idx} className="flex gap-3 text-sm xl:text-base text-muted-foreground leading-relaxed">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>

              <h4 className="font-bold text-sm xl:text-base uppercase tracking-widest text-muted-foreground mt-8 xl:mt-10">{dict.technologies}</h4>
              <div className="flex flex-wrap gap-2 xl:gap-3">
                {selected.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 xl:px-4 xl:py-1.5 bg-primary/5 text-primary border border-primary/10 rounded-full text-xs xl:text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}
