"use client";

import { useCallback, useSyncExternalStore } from "react";
import { motion } from "framer-motion";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";

import { CertificationsDict } from "@/types/i18n";

export default function CertGrid({ dict }: { dict: CertificationsDict }) {
  const certifications = dict.items;
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
    <section id="certifications" className="w-full">
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
              aria-label="Previous certification"
              className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full border bg-card hover:bg-accent transition-all cursor-pointer shadow-sm disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-card"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => emblaApi?.scrollNext()}
              disabled={nextBtnDisabled}
              aria-label="Next certification"
              className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full border bg-card hover:bg-accent transition-all cursor-pointer shadow-sm disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-card"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            
            <div ref={emblaRef} className="overflow-hidden cursor-grab active:cursor-grabbing">
              <div className="flex gap-6">
              {certifications?.map((cert, index) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="min-w-60 sm:min-w-72 lg:min-w-80 group relative bg-card border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={cert.image ?? ""}
                      alt={cert.title}
                      width={800}
                      height={600}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="p-6 h-full flex flex-col justify-between">
                        <div>
                          <h3 className="text-xl font-bold mb-2">{cert.title}</h3>
                          <p className="text-primary font-medium mb-1">{cert.issuer}</p>
                          <p className="text-sm text-muted-foreground mb-4">{cert.date}</p>
                          {cert.description && (
                            <p className="text-sm text-muted-foreground line-clamp-3">
                              {cert.description}
                            </p>
                          )}
                        </div>
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline flex items-center gap-1 text-sm font-medium"
                        >
                          {dict.viewCredential} <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
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
