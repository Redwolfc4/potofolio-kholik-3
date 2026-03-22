"use client";

import React, { useCallback, useSyncExternalStore, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";

import { ProjectsDict } from "@/types/i18n";
import { useLongPress } from "@/hooks/use-long-press";

interface ProjectItemProps {
  project: NonNullable<ProjectsDict["items"]>[number];
  index: number;
  dict: ProjectsDict;
}

function ProjectItem({ project, index, dict }: ProjectItemProps) {
  const { isActive, handlers } = useLongPress("projects", project.id, "lp-project");

  return (
    <motion.div
      key={project.id}
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      {...handlers}
      className={`lp-project min-w-64 sm:min-w-80 lg:min-w-96 xl:min-w-md 2xl:min-w-xl group relative bg-card rounded-2xl overflow-hidden cursor-pointer transition-shadow after:absolute after:inset-0 after:rounded-2xl after:border after:border-border after:pointer-events-none ${isActive ? "shadow-lg after:border-primary/60" : "shadow-sm hover:shadow-lg hover:after:border-primary/60"}`}
    >
      <div className="aspect-video bg-muted relative overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          width={960}
          height={540}
          className={`w-full h-full object-cover transition-transform duration-500 ${isActive ? "scale-105" : "md:group-hover:scale-105"}`}
        />
      </div>
      <div className="p-6 xl:p-8 2xl:p-10">
        <h3 className="text-xl xl:text-2xl 2xl:text-3xl font-bold mb-2 xl:mb-4">{project.title}</h3>
        <p className="text-muted-foreground text-sm xl:text-base 2xl:text-lg mb-4 xl:mb-6 line-clamp-3">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 xl:gap-3 mb-6 xl:mb-8">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 xl:px-3 xl:py-1.5 2xl:px-4 2xl:py-2 bg-secondary text-secondary-foreground rounded-md text-[10px] xl:text-xs 2xl:text-sm uppercase font-bold tracking-wider"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-4 xl:gap-6">
          {project.projectUrl && (
            <a
              href={project.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline flex items-center gap-1 xl:gap-2 text-sm xl:text-base 2xl:text-lg font-medium"
            >
              {dict.liveDemo} <ExternalLink className="w-4 h-4 xl:w-5 xl:h-5 2xl:w-6 2xl:h-6" />
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground flex items-center gap-1 xl:gap-2 text-sm xl:text-base 2xl:text-lg font-medium transition-colors"
            >
              {dict.sourceCode} <Github className="w-4 h-4 xl:w-5 xl:h-5 2xl:w-6 2xl:h-6" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects({ dict }: { dict: ProjectsDict }) {
  const projects = dict.items;
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "center",
    containScroll: "trimSnaps",
  });

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

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

  useEffect(() => {
    if (!emblaApi) return;
    const viewport = emblaApi.rootNode();
    const container = viewport.parentElement;
    if (!container) return;

    let isScrolling = false;

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 10) {
        if (isScrolling) return;
        isScrolling = true;

        if (e.deltaX > 0) {
          if (emblaApi.canScrollNext()) emblaApi.scrollNext();
        } else {
          if (emblaApi.canScrollPrev()) emblaApi.scrollPrev();
        }

        setTimeout(() => {
          isScrolling = false;
        }, 500);

        e.preventDefault();
        e.stopPropagation();
      }
    };

    container.addEventListener("wheel", onWheel, { passive: false });
    return () => container.removeEventListener("wheel", onWheel);
  }, [emblaApi]);

  return (
    <section id="projects" className="w-full">
      <div className="mx-auto px-10 py-10 md:py-12 xl:py-16 2xl:py-24">
        <h2 className="text-3xl md:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-center">{dict.title}</h2>
      </div>
      <div className="bg-muted/50">
        <div className="px-10 py-16 md:py-20 xl:py-24 2xl:py-32">
          <div className="relative overscroll-x-none touch-pan-y">
            {mounted && (
              <button
                type="button"
                onClick={() => emblaApi?.scrollPrev()}
                disabled={prevBtnDisabled}
                aria-label="Previous project"
                className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 p-2 xl:p-3 2xl:p-4 rounded-full border bg-card hover:bg-accent transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-card"
              >
                <ChevronLeft className="w-4 h-4 xl:w-6 xl:h-6 2xl:w-8 2xl:h-8" />
              </button>
            )}
            {mounted && (
              <button
                type="button"
                onClick={() => emblaApi?.scrollNext()}
                disabled={nextBtnDisabled}
                aria-label="Next project"
                className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 p-2 xl:p-3 2xl:p-4 rounded-full border bg-card hover:bg-accent transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-card"
              >
                <ChevronRight className="w-4 h-4 xl:w-6 xl:h-6 2xl:w-8 2xl:h-8" />
              </button>
            )}
            <div 
              ref={emblaRef} 
              className="overflow-hidden cursor-grab active:cursor-grabbing touch-pan-y overscroll-x-none"
            >
              <div className="flex gap-6">
                {projects?.map((project, index) => (
                  <ProjectItem key={project.id} project={project} index={index} dict={dict} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
