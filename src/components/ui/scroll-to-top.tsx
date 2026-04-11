"use client";

import React, { useState, useEffect } from "react";
import { useHasMounted } from "@/hooks/use-has-mounted";
import { m, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useMotionEnabled } from "@/hooks/use-motion-enabled";
import { whenMotionEnabled } from "@/lib/motion";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const motionEnabled = useMotionEnabled();

  const mounted = useHasMounted();

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <m.div
          {...whenMotionEnabled(motionEnabled, {
            initial: { opacity: 0, scale: 0.5 },
            animate: { opacity: 1, scale: 1 },
            exit: { opacity: 0, scale: 0.5 },
            whileHover: { scale: 1.1 },
            whileTap: { scale: 0.9 },
          })}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg backdrop-blur-sm transition-colors hover:bg-primary/90 md:h-16 md:w-16"
          title="Scroll to Top"
        >
          <ArrowUp className="h-6 w-6 md:h-8 md:w-8" />
          <m.div
            className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-accent"
            {...whenMotionEnabled(motionEnabled, {
              animate: {
                y: [0, -4, 0],
              },
              transition: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              },
            })}
          />
        </m.div>
      )}
    </AnimatePresence>
  );
}
