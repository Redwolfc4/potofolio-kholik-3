"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-is-mobile";

export function useMotionEnabled() {
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return hasMounted && !isMobile && !prefersReducedMotion;
}
