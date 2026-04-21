"use client";

import { useQuery } from "@tanstack/react-query";

export default function PWARegister() {
  useQuery({
    queryKey: ["pwa-registration"],
    queryFn: async () => {
      if (typeof window !== "undefined" && "serviceWorker" in navigator) {
        // Wait for page load
        if (document.readyState === "complete") {
          return registerSW();
        } else {
          return new Promise((resolve) => {
            window.addEventListener("load", () => {
              resolve(registerSW());
            });
          });
        }
      }
      return null;
    },
    staleTime: Infinity, // Only run once
  });

  return null;
}

async function registerSW() {
  try {
    const registration = await navigator.serviceWorker.register("/sw.js");
    console.log("PWA Service Worker registered with scope:", registration.scope);
    return registration.scope;
  } catch (error) {
    console.error("PWA Service Worker registration failed:", error);
    throw error;
  }
}
