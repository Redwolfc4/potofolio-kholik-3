"use client";

import { motion } from "framer-motion";
import { useState } from "react";

import { ExperienceDict } from "@/types/i18n";

export default function ExperienceJourney({ dict }: { dict: ExperienceDict }) {
  const experiences = dict.items;
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selected = experiences?.find((exp) => exp.id === selectedId) ?? null;

  return (
    <section id="experience" className="py-20 w-full px-4 sm:px-10 lg:px-20">
      <h2 className="text-3xl font-bold mb-16 text-center">{dict.title}</h2>
      
      <div className="relative max-w-4xl mx-auto">
        {/* Vertical Line */}
        <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-border md:left-1/2 md:-translate-x-px" />

        <div className="space-y-12">
          {experiences?.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`group/item relative flex flex-col md:flex-row items-start md:items-center ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Dot / Bullet */}
              <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-background border-2 border-primary z-10">
                <div className="h-2 w-2 rounded-full bg-primary" />
              </div>

              {/* Content Card */}
              <div className={`ml-16 md:ml-0 md:w-1/2 md:opacity-0 md:-translate-y-4 md:group-hover/item:opacity-100 md:group-hover/item:translate-y-0 transition-all duration-300 ease-out ${
                index % 2 === 0 ? "md:pr-12" : "md:pl-12"
              }`}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="group relative bg-card border rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all cursor-pointer"
                  onClick={() => setSelectedId(exp.id)}
                >
                  <div className="flex flex-col gap-1 mb-4">
                    <span className="md:hidden text-xs font-medium text-primary uppercase tracking-wider">{exp.period}</span>
                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{exp.position}</h3>
                    <p className="text-sm font-medium text-muted-foreground">{exp.company}</p>
                  </div>
                  
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{exp.description[0]}</p>
                  
                  <div className="flex items-center gap-2 text-xs font-semibold text-primary">
                    <span>{dict.viewDetails}</span>
                    <div className="h-px w-4 bg-primary transition-all group-hover:w-8" />
                  </div>

                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="px-2 py-1 text-[10px] bg-primary/10 text-primary border border-primary/20 rounded-full">
                      {exp.location}
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Year for MD layout */}
              <div className={`hidden md:flex md:w-1/2 items-center ${
                index % 2 === 0 ? "justify-end pr-12 text-right" : "justify-start pl-12 text-left"
              }`}>
                <span className="text-2xl font-bold text-primary/80 transition-opacity duration-300 md:opacity-50 md:group-hover/item:opacity-100">
                  {exp.period}
                </span>
              </div>
            </motion.div>
          ))}
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
