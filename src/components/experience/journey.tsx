"use client";

import { motion } from "framer-motion";
import { useState } from "react";

import { ExperienceDict } from "@/types/i18n";

export default function ExperienceJourney({ dict }: { dict: ExperienceDict }) {
  const experiences = dict.items;
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selected = experiences?.find((exp) => exp.id === selectedId) ?? null;

  return (
    <section id="experience" className="py-24 w-full px-4 sm:px-10 lg:px-20 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-black mb-20 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary/60"
        >
          {dict.title}
        </motion.h2>
        
        <div className="relative">
          {/* Vertical Line - Positioned for desktop journey style */}
          <div className="absolute left-4 md:left-[25%] top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary/50 via-primary/20 to-transparent" />

          <div className="space-y-16">
            {experiences?.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex items-start group"
              >
                {/* Date/Period on the Left */}
                <div className="hidden md:flex w-[25%] pr-12 justify-end pt-5">
                  <span className="text-sm font-bold text-muted-foreground/60 group-hover:text-primary transition-colors duration-300">
                    {exp.period}
                  </span>
                </div>

                {/* Dot / Bullet on the Line */}
                <div className="absolute left-4 md:left-[25%] -translate-x-1/2 mt-5 z-10">
                  <motion.div 
                    whileHover={{ scale: 1.5 }}
                    className="h-4 w-4 rounded-full bg-background border-2 border-primary flex items-center justify-center shadow-[0_0_10px_rgba(var(--primary),0.3)] transition-all group-hover:bg-primary"
                  >
                    <div className="h-1.5 w-1.5 rounded-full bg-primary group-hover:bg-background transition-colors" />
                  </motion.div>
                </div>

                {/* Experience Card on the Right */}
                <div className="ml-12 md:ml-0 md:w-[75%] md:pl-12">
                  <motion.div
                    whileHover={{ y: -5, scale: 1.01 }}
                    className="relative bg-card/40 backdrop-blur-md border border-primary/10 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:bg-card hover:border-primary/30 transition-all duration-500 cursor-pointer group/card overflow-hidden"
                    onClick={() => setSelectedId(exp.id)}
                  >
                    {/* Hover Glow Effect */}
                    <div className="absolute -inset-px bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
                    
                    <div className="relative z-10">
                      <div className="flex flex-col gap-1 mb-3">
                        <span className="md:hidden text-xs font-bold text-primary/70 uppercase tracking-widest">{exp.period}</span>
                        <h3 className="text-xl md:text-2xl font-bold group-hover/card:text-primary transition-colors">{exp.position}</h3>
                        <p className="text-base font-semibold text-muted-foreground group-hover/card:text-foreground transition-colors">{exp.company}</p>
                      </div>
                      
                      {/* Revealed Content Container */}
                      <div className="grid grid-rows-[0fr] group-hover/card:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-in-out">
                        <div className="overflow-hidden">
                          <p className="text-sm text-muted-foreground leading-relaxed mb-6 pt-2">
                            {exp.description[0]}
                          </p>
                          
                          <div className="flex items-center gap-3 text-sm font-bold text-primary group-hover/card:gap-5 transition-all">
                            <span>{dict.viewDetails}</span>
                            <div className="h-px w-6 bg-primary transition-all group-hover:w-12" />
                          </div>

                          <div className="mt-6 flex flex-wrap gap-2">
                            {exp.techStack.slice(0, 4).map((tech) => (
                              <span key={tech} className="text-[10px] px-2 py-0.5 bg-primary/5 border border-primary/10 rounded-md text-primary/80">
                                {tech}
                              </span>
                            ))}
                            {exp.techStack.length > 4 && <span className="text-[10px] text-muted-foreground/50">+{exp.techStack.length - 4} more</span>}
                          </div>
                        </div>
                      </div>

                      {/* Default "Closed" indicator if needed, but the layout is clean */}
                    </div>

                    <div className="absolute top-6 right-6 opacity-40 group-hover/card:opacity-100 transition-opacity">
                      <div className="px-3 py-1 text-[10px] bg-primary/5 text-primary border border-primary/10 rounded-full font-bold tracking-tighter uppercase">
                        {exp.location}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card border rounded-2xl shadow-xl w-full max-w-2xl p-6 md:p-8"
          >
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <h3 className="text-2xl font-bold text-primary">{selected.position}</h3>
                <p className="text-lg font-semibold">{selected.company}</p>
                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-muted-foreground">
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
            
            <div className="space-y-4">
              <h4 className="font-bold text-sm uppercase tracking-widest text-muted-foreground">{dict.responsibilities}</h4>
              <ul className="space-y-3">
                {selected.description.map((item, idx) => (
                  <li key={idx} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>

              <h4 className="font-bold text-sm uppercase tracking-widest text-muted-foreground mt-8">{dict.technologies}</h4>
              <div className="flex flex-wrap gap-2">
                {selected.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-primary/5 text-primary border border-primary/10 rounded-full text-xs font-medium"
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
