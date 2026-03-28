"use client";

import React, { useCallback, useSyncExternalStore, useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";

import { ProjectsDict } from "@/types/i18n";
import { useLongPress } from "@/hooks/use-long-press";
import { useLongPressStore } from "@/stores/use-longpress-store";
import { useHasMounted } from "@/hooks/use-has-mounted";
import ImageWithFallback from "@/components/ui/image-with-fallback";
import { useIsMobile } from "@/hooks/use-is-mobile";

interface ProjectItemProps {
  project: NonNullable<ProjectsDict["items"]>[number];
  index: number;
  dict: ProjectsDict;
}

function ProjectItem({ project, index, dict }: ProjectItemProps) {
  const isMobile = useIsMobile();
  const { isActive, handlers } = useLongPress("projects", project.id, "lp-project");
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const checkTruncation = () => {
      if (descriptionRef.current) {
        const { scrollHeight, clientHeight } = descriptionRef.current;
        setIsTruncated(scrollHeight > clientHeight || isExpanded);
      }
    };

    checkTruncation();
    const timer = setTimeout(checkTruncation, 300); // Wait for animations
    window.addEventListener("resize", checkTruncation);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", checkTruncation);
    };
  }, [project.description, isExpanded, isActive]);

  return (
    <motion.div
      key={project.id}
      initial={isMobile ? false : { opacity: 0, scale: 0.96 }}
      whileInView={isMobile ? undefined : { opacity: 1, scale: 1 }}
      transition={isMobile ? undefined : { delay: index * 0.1 }}
      viewport={isMobile ? undefined : { once: true, amount: 0.2 }}
      {...handlers}
      onMouseEnter={() => {
        if (window.matchMedia("(hover: hover)").matches) {
          useLongPressStore.getState().setActive("projects", project.id);
        }
      }}
      onMouseLeave={() => {
        if (window.matchMedia("(hover: hover)").matches) {
          const state = useLongPressStore.getState();
          if (state.activeSection === "projects" && state.activeId === project.id) {
            state.clear();
          }
        }
      }}
      className={`lp-project min-w-64 sm:min-w-80 lg:min-w-96 xl:min-w-md 2xl:min-w-xl group relative bg-card rounded-2xl overflow-hidden cursor-pointer transition-shadow after:absolute after:inset-0 after:rounded-2xl after:border after:border-border after:pointer-events-none ${isActive ? "shadow-lg after:border-primary/60" : "shadow-sm hover:shadow-lg hover:after:border-primary/60"}`}
    >
      <div className="aspect-video bg-muted relative overflow-hidden">
        <ImageWithFallback
          src={project.image}
          alt={project.title}
          fallbackSrc="/placeholders/project-fallback.svg"
          width={960}
          height={540}
          sizes="(max-width: 640px) 85vw, (max-width: 1024px) 320px, 420px"
          className={`w-full h-full object-cover transition-transform duration-500 ${isActive ? "scale-105" : "md:group-hover:scale-105"}`}
        />
      </div>
      <div className="p-6 xl:p-8 2xl:p-10">
        <h3 className="text-xl xl:text-2xl 2xl:text-3xl font-bold mb-2 xl:mb-4">{project.title}</h3>
        <p 
          ref={descriptionRef}
          className={`text-start text-muted-foreground text-sm xl:text-base 2xl:text-lg transition-all duration-300 ${isExpanded ? "" : "line-clamp-3"} ${isExpanded ? "mb-2" : "mb-4 xl:mb-6"}`}
        >
          {project.description}
        </p>

        {isTruncated && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            className="text-[10px] xl:text-xs font-bold text-primary/60 hover:text-primary transition-colors mb-4 focus:outline-hidden block"
          >
            {isExpanded ? dict.showLess : dict.showMore}
          </button>
        )}
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
              {dict.sourceCode} <svg className="w-4 h-4 xl:w-5 xl:h-5 2xl:w-6 2xl:h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects({ dict }: { dict: ProjectsDict }) {
  const isMobile = useIsMobile();
  const projects = dict.items;
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "center",
    containScroll: "trimSnaps",
  });

  const mounted = useHasMounted();

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
    if (isMobile) return;
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
  }, [emblaApi, isMobile]);

  return (
    <section id="projects" className="w-full">
      <div className="mx-auto px-10 py-10 md:py-12 xl:py-16 2xl:py-24">
        <h2 className="text-3xl md:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-center">{dict.title}</h2>
      </div>
      <div className="bg-muted/50">
        <div className="px-10 py-16 md:py-20 xl:py-24 2xl:py-32">
          <div className="relative overscroll-x-none touch-pan-y">
            {mounted && !isMobile && (
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
            {mounted && !isMobile && (
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
