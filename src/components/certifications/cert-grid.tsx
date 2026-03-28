"use client";

import { useCallback, useSyncExternalStore, useEffect } from "react";
import { motion } from "framer-motion";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";

import { CertificationsDict } from "@/types/i18n";
import { useLongPress } from "@/hooks/use-long-press";
import { useLongPressStore } from "@/stores/use-longpress-store";
import { useHasMounted } from "@/hooks/use-has-mounted";
import ImageWithFallback from "@/components/ui/image-with-fallback";
import { useIsMobile } from "@/hooks/use-is-mobile";

interface CertItemProps {
  cert: NonNullable<CertificationsDict["items"]>[number];
  index: number;
  viewCredentialLabel: string;
}

function CertItem({ cert, index, viewCredentialLabel }: CertItemProps) {
  const isMobile = useIsMobile();
  const { isActive, handlers } = useLongPress("certifications", cert.id, "lp-cert");
  const showDetails = isActive;

  return (
    <motion.div
      key={cert.id}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true, amount: 0.2 }}
      {...handlers}
      onMouseEnter={() => {
        if (window.matchMedia("(hover: hover)").matches) {
          useLongPressStore.getState().setActive("certifications", cert.id);
        }
      }}
      onMouseLeave={() => {
        if (window.matchMedia("(hover: hover)").matches) {
          const state = useLongPressStore.getState();
          if (state.activeSection === "certifications" && state.activeId === cert.id) {
            state.clear();
          }
        }
      }}
      className="lp-cert shrink-0 md:shrink w-[85vw] md:w-auto md:min-w-64 lg:min-w-80 group relative bg-card border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="relative aspect-4/5 overflow-hidden">
        <ImageWithFallback
          src={cert.image ?? ""}
          alt={cert.title}
          fallbackSrc="/placeholders/logo-fallback.svg"
          width={800}
          height={1000}
          sizes="(max-width: 640px) 70vw, (max-width: 1024px) 288px, 320px"
          className={`w-full h-full object-cover transition-transform duration-500 ${isActive ? "scale-105" : "md:group-hover:scale-105"}`}
        />
        <div className={`absolute inset-0 bg-background/95 transition-opacity duration-300 ${showDetails ? "opacity-100" : "opacity-0 md:group-hover:opacity-100"}`}>
          <div className="p-5 h-full flex flex-col justify-between overflow-y-auto scrollbar-hide">
            <div className="space-y-3">
              <div>
                <h3 className="text-lg font-bold leading-tight mb-1">{cert.title}</h3>
                <p className="text-primary text-sm font-semibold">{cert.issuer}</p>
                <p className="text-xs text-muted-foreground">{cert.date}</p>
              </div>
              {cert.description && (
                <p className="text-start text-sm text-muted-foreground leading-relaxed">
                  {cert.description}
                </p>
              )}
            </div>
            <div className="pt-4 mt-auto border-t">
              <a
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline flex items-center gap-1.5 text-sm font-bold"
              >
                {viewCredentialLabel} <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function CertGrid({ dict }: { dict: CertificationsDict }) {
  const isMobile = useIsMobile();
  const certifications = dict.items;
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    containScroll: "trimSnaps",
  });

  const mounted = useHasMounted();

  const prevBtnDisabled = useSyncExternalStore(
    useCallback(
      (onStoreChange) => {
        if (!emblaApi) return () => { };
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
        if (!emblaApi) return () => { };
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
    <section id="certifications" className="w-full">
      <div className="mx-auto px-10 py-10 md:py-12">
        <h2 className="text-3xl font-bold text-center">{dict.title}</h2>
      </div>

      <div className="bg-muted/50">
        <div className="px-10 py-16 md:py-20">
            <div className="relative overscroll-x-none touch-pan-y">
              {mounted && (
                <button
                  type="button"
                  onClick={() => emblaApi?.scrollPrev()}
                  disabled={prevBtnDisabled}
                  aria-label="Previous certification"
                  className="absolute left-0 md:-left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full border bg-card hover:bg-accent transition-all cursor-pointer shadow-sm disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-card"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
              )}
              {mounted && (
                <button
                  type="button"
                  onClick={() => emblaApi?.scrollNext()}
                  disabled={nextBtnDisabled}
                  aria-label="Next certification"
                  className="absolute right-0 md:-right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full border bg-card hover:bg-accent transition-all cursor-pointer shadow-sm disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-card"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}

              <div
                ref={emblaRef}
                className="overflow-hidden cursor-grab active:cursor-grabbing touch-pan-y overscroll-x-none"
              >
                <div className="flex gap-6 pb-4">
                  {certifications?.map((cert, index) => (
                    <CertItem
                      key={cert.id}
                      cert={cert}
                      index={index}
                      viewCredentialLabel={dict.viewCredential}
                    />
                  ))}
                </div>
              </div>
            </div>
        </div>
      </div>
    </section>
  );
}
