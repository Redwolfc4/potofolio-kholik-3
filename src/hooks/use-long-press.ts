"use client";

import { useRef, useEffect, useCallback } from "react";
import { useLongPressStore } from "@/stores/use-longpress-store";

const LONG_PRESS_DURATION = 400; // ms

/**
 * Custom hook for long-press-to-sticky interactions.
 * - Long press (400ms) activates the item and it stays active (sticky).
 * - Clicking outside any item with the same containerClass dismisses it.
 * - On desktop, normal CSS hover still works independently.
 */
export function useLongPress(
  section: string,
  id: string | number,
  containerClass: string
) {
  const { activeSection, activeId, setActive, clear } = useLongPressStore();
  const isActive = activeSection === section && activeId === id;

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isLongPressRef = useRef(false);

  // Click-outside listener
  useEffect(() => {
    if (!isActive) return;

    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(`.${containerClass}`)) {
        clear();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [containerClass, clear, isActive]);

  const onTouchStart = useCallback(() => {
    isLongPressRef.current = false;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      isLongPressRef.current = true;
      setActive(section, id);
    }, LONG_PRESS_DURATION);
  }, [section, id, setActive]);

  const onTouchEnd = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  const onTouchMove = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  const onClick = useCallback(
    (e: React.MouseEvent) => {
      // If this was a long-press, prevent the click from firing
      if (isLongPressRef.current) {
        e.preventDefault();
        isLongPressRef.current = false;
        return;
      }
      // Short tap toggles
      if (isActive) {
        clear();
      } else {
        setActive(section, id);
      }
    },
    [isActive, section, id, setActive, clear]
  );

  return {
    isActive,
    handlers: {
      onTouchStart,
      onTouchEnd,
      onTouchCancel: onTouchEnd,
      onTouchMove,
      onClick,
    },
  };
}
