"use client";

import React, { useCallback, useSyncExternalStore } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";

import { ProjectsDict } from "@/types/i18n";

export default function Projects({ dict }: { dict: ProjectsDict }) {
  const projects = dict.items;
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "center",
    containScroll: "trimSnaps",
  });

  const prevBtnDisabled = useSyncExternalStore(
    useCallback(
      (onStoreChange) => {
        if (!emblaApi) return () => {};
        emblaApi.on("select", onStoreChange);
        emblaApi.on("reInit", onStoreChange);
        return () => {
          emblaApi.off("select", onStoreChange);
          emblaApi.off("reInit", onStoreChange);
        };
      },
      [emblaApi]
    ),
    () => (emblaApi ? !emblaApi.canScrollPrev() : true),
    () => true
  );

  const nextBtnDisabled = useSyncExternalStore(
    useCallback(
      (onStoreChange) => {
        if (!emblaApi) return () => {};
        emblaApi.on("select", onStoreChange);
        emblaApi.on("reInit", onStoreChange);
        return () => {
          emblaApi.off("select", onStoreChange);
          emblaApi.off("reInit", onStoreChange);
        };
      },
      [emblaApi]
    ),
    () => (emblaApi ? !emblaApi.canScrollNext() : true),
    () => true
  );

  return (
    <section id="projects" className="w-full">
      <div className="mx-auto px-10 py-10 md:py-12">
        <h2 className="text-3xl font-bold text-center">{dict.title}</h2>
      </div>
      <div className="bg-muted/50">
        <div className="px-10 py-16 md:py-20">
          <div className="relative">
            <button
              type="button"
              onClick={() => emblaApi?.scrollPrev()}
              disabled={prevBtnDisabled}
              aria-label="Previous project"
              className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full border bg-card hover:bg-accent transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-card"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => emblaApi?.scrollNext()}
              disabled={nextBtnDisabled}
              aria-label="Next project"
              className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full border bg-card hover:bg-accent transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-card"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <div ref={emblaRef} className="overflow-hidden cursor-grab active:cursor-grabbing">
              <div className="flex gap-6">
                {projects?.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, scale: 0.96 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="min-w-64 sm:min-w-80 lg:min-w-96 group relative bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow after:absolute after:inset-0 after:rounded-2xl after:border after:border-border after:pointer-events-none hover:after:border-primary/60"
                  >
                    <div className="aspect-video bg-muted relative overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        width={960}
                        height={540}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-[10px] uppercase font-bold tracking-wider"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-4">
                        {project.projectUrl && (
                          <a
                            href={project.projectUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline flex items-center gap-1 text-sm font-medium"
                          >
                            {dict.liveDemo} <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-foreground flex items-center gap-1 text-sm font-medium transition-colors"
                          >
                            {dict.sourceCode} <Github className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
