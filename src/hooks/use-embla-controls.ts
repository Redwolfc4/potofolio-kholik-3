"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";
import type { EmblaCarouselType } from "embla-carousel";

import { useHasMounted } from "@/hooks/use-has-mounted";

export function useEmblaControls(
  emblaApi: EmblaCarouselType | undefined,
  isMobile: boolean,
) {
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
      [emblaApi],
    ),
    () => (emblaApi ? !emblaApi.canScrollPrev() : true),
    () => true,
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
      [emblaApi],
    ),
    () => (emblaApi ? !emblaApi.canScrollNext() : true),
    () => true,
  );

  useEffect(() => {
    if (isMobile || !emblaApi) return;

    const viewport = emblaApi.rootNode();
    const container = viewport.parentElement;
    if (!container) return;

    let isScrolling = false;

    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaX) <= Math.abs(event.deltaY) || Math.abs(event.deltaX) <= 10) {
        return;
      }

      if (isScrolling) return;
      isScrolling = true;

      if (event.deltaX > 0) {
        if (emblaApi.canScrollNext()) emblaApi.scrollNext();
      } else if (emblaApi.canScrollPrev()) {
        emblaApi.scrollPrev();
      }

      setTimeout(() => {
        isScrolling = false;
      }, 500);

      event.preventDefault();
      event.stopPropagation();
    };

    container.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      container.removeEventListener("wheel", onWheel);
    };
  }, [emblaApi, isMobile]);

  return {
    mounted,
    prevBtnDisabled,
    nextBtnDisabled,
  };
}
