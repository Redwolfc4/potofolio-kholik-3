"use client";

import { useReducedMotion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-is-mobile";

export function useMotionEnabled() {
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();

  return !isMobile && !prefersReducedMotion;
}
