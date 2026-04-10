"use client";

import { Button } from "@/components/ui/button";
import { useMotionEnabled } from "@/hooks/use-motion-enabled";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { whenMotionEnabled } from "@/lib/motion";
import ImageWithFallback from "@/components/ui/image-with-fallback";
import { HeroDict } from "@/types/i18n";
import { m } from "framer-motion";
import { ChevronDown, ChevronRight, FileImage, FileText } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const cvMenuConfig = {
  image: {
    Icon: FileImage,
    items: [
      {
        key: "id",
        href: "/docs/portofolio/indonesia/salahudin-kholik-prasetyono-cvgambar_id_1.pdf",
      },
      {
        key: "en",
        href: "/docs/portofolio/inggris/salahudin-kholik-prasetyono-cvgambar_en_1.pdf",
      },
    ],
  },
  plain: {
    Icon: FileText,
    items: [
      {
        key: "id",
        href: "/docs/portofolio/indonesia/salahudin-kholik-prasetyono-cv_id_1.pdf",
      },
      {
        key: "en",
        href: "/docs/portofolio/inggris/salahudin-kholik-prasetyono-cv_en_1.pdf",
      },
    ],
  },
} as const;

export default function Hero({ dict }: { dict: HeroDict }) {
  const motionEnabled = useMotionEnabled();
  const isMobile = useIsMobile();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const closeMenuTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeSubmenuTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isCvMenuOpen, setIsCvMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const cvMenuItems = [
    {
      label: dict.buttons.cv.image.label,
      Icon: cvMenuConfig.image.Icon,
      options: cvMenuConfig.image.items.map((item) => ({
        href: item.href,
        label: dict.buttons.cv.image[item.key],
      })),
    },
    {
      label: dict.buttons.cv.plain.label,
      Icon: cvMenuConfig.plain.Icon,
      options: cvMenuConfig.plain.items.map((item) => ({
        href: item.href,
        label: dict.buttons.cv.plain[item.key],
      })),
    },
  ];

  const clearCloseMenuTimeout = () => {
    if (closeMenuTimeoutRef.current) {
      clearTimeout(closeMenuTimeoutRef.current);
      closeMenuTimeoutRef.current = null;
    }
  };

  const clearCloseSubmenuTimeout = () => {
    if (closeSubmenuTimeoutRef.current) {
      clearTimeout(closeSubmenuTimeoutRef.current);
      closeSubmenuTimeoutRef.current = null;
    }
  };

  const closeCvMenu = () => {
    clearCloseMenuTimeout();
    clearCloseSubmenuTimeout();
    setIsCvMenuOpen(false);
    setActiveSubmenu(null);
  };

  const openCvMenu = () => {
    clearCloseMenuTimeout();
    clearCloseSubmenuTimeout();
    setIsCvMenuOpen(true);
    // Don't auto-select a submenu on open, let user hover explicitly
    setActiveSubmenu(null);
  };

  const scheduleCloseCvMenu = () => {
    clearCloseMenuTimeout();
    closeMenuTimeoutRef.current = setTimeout(() => {
      closeCvMenu();
    }, 400);
  };

  const scheduleSubmenuReset = () => {
    clearCloseSubmenuTimeout();
    closeSubmenuTimeoutRef.current = setTimeout(() => {
      if (!isMobile) {
        // Reset to nothing selected instead of the first item
        setActiveSubmenu(null);
      }
    }, 350);
  };

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        closeCvMenu();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeCvMenu();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
      clearCloseMenuTimeout();
      clearCloseSubmenuTimeout();
    };
  }, []);

  return (
    <section id="home" className="relative isolate w-full overflow-hidden py-24 lg:py-28">
      <div className="absolute inset-0 -z-10">
        <m.div
          className="absolute -top-24 -left-20 h-80 w-80 rounded-full bg-primary/25 blur-3xl"
          {...whenMotionEnabled(motionEnabled, {
            animate: { y: [0, 30, 0] },
            transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
          })}
        />
        <m.div
          className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-accent/25 blur-3xl"
          {...whenMotionEnabled(motionEnabled, {
            animate: { y: [0, -40, 0] },
            transition: { duration: 8, repeat: Infinity, ease: "easeInOut" },
          })}
        />
        <div className="absolute inset-x-8 top-10 h-72 rounded-[3rem] border border-border/40 bg-card/35 blur-3xl" />
      </div>
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 md:grid-cols-[22.5rem_1fr]">
        <m.div
          {...whenMotionEnabled(motionEnabled, {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.8 },
          })}
          className="mx-auto mt-8 h-105 max-w-100 w-full overflow-hidden rounded-3xl border border-border/60 bg-muted shadow-[0_24px_60px_rgba(95,58,34,0.18)] ring-1 ring-background/60 md:mt-0 md:h-105 dark:shadow-[0_24px_60px_rgba(0,0,0,0.34)]"
        >
          <ImageWithFallback
            src={dict.image.src}
            alt={dict.image.alt}
            fallbackSrc={dict.image.fallbackSrc}
            width={900}
            height={1200}
            sizes="(max-width: 768px) 100vw, 360px"
            className="h-full w-full object-cover object-top"
            priority
            fetchPriority="high"
          />
        </m.div>
        <div className="text-center md:text-left">
          <div className="space-y-6 rounded-[2rem] border border-border/60 bg-card/70 p-8 shadow-[0_24px_60px_rgba(95,58,34,0.12)] backdrop-blur-sm dark:shadow-[0_24px_60px_rgba(0,0,0,0.28)]">
            <m.span
              {...whenMotionEnabled(motionEnabled, {
                initial: { opacity: 0, y: 16 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.7 },
              })}
              className="inline-flex items-center rounded-full border border-primary/20 bg-secondary/70 px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-primary"
            >
              {dict.tagline}
            </m.span>
            <m.h1
              {...whenMotionEnabled(motionEnabled, {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: 0.1, duration: 0.8 },
              })}
              className="[text-align:start] bg-linear-to-r from-foreground via-primary to-foreground bg-clip-text text-4xl font-bold tracking-tight text-transparent lg:text-6xl"
            >
              {dict.name}
            </m.h1>
            <m.p
              {...whenMotionEnabled(motionEnabled, {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: 0.2, duration: 0.8 },
              })}
              className="max-w-2xl text-lg text-muted-foreground"
            >
              {dict.description}
            </m.p>
            <m.div
              {...whenMotionEnabled(motionEnabled, {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: 0.3, duration: 0.8 },
              })}
              className="flex flex-col justify-center gap-4 sm:flex-row sm:items-start md:justify-start"
            >
              <div
                ref={rootRef}
                className="relative w-full sm:w-auto"
                onMouseEnter={() => {
                  if (!isMobile) {
                    openCvMenu();
                  }
                }}
                onMouseLeave={() => {
                  if (!isMobile) {
                    scheduleCloseCvMenu();
                  }
                }}
              >
                <Button
                  type="button"
                  className="w-full cursor-pointer shadow-[0_18px_40px_rgba(138,90,60,0.24)] transition-all hover:shadow-[0_22px_46px_rgba(138,90,60,0.3)] sm:w-auto"
                  aria-haspopup="menu"
                  aria-expanded={isCvMenuOpen}
                  onClick={() => {
                    if (isCvMenuOpen) {
                      closeCvMenu();
                    } else {
                      openCvMenu();
                    }
                  }}
                  onFocus={() => {
                    if (!isMobile) {
                      openCvMenu();
                    }
                  }}
                >
                  {dict.buttons.cv.label}
                  <ChevronDown
                    className={`size-4 transition-transform duration-200 ${isCvMenuOpen ? "rotate-180" : ""}`}
                  />
                </Button>
                <div
                  className={`absolute left-0 top-full z-20 mt-3 w-full min-w-60 transition-all duration-200 sm:w-64 ${isCvMenuOpen ? "pointer-events-auto translate-y-2 opacity-100 sm:translate-x-4" : "pointer-events-none opacity-0"}`}
                  onMouseEnter={() => {
                    clearCloseMenuTimeout();
                  }}
                  onMouseLeave={() => {
                    if (!isMobile) {
                      scheduleCloseCvMenu();
                    }
                  }}
                >
                  <div className="rounded-2xl border border-border/70 bg-card/95 p-2 shadow-[0_24px_80px_rgba(53,33,16,0.22)] backdrop-blur-xl">
                    {cvMenuItems.map((item) => (
                      <div
                        key={item.label}
                        className="relative"
                        onMouseEnter={() => {
                          if (!isMobile) {
                            clearCloseMenuTimeout();
                            clearCloseSubmenuTimeout();
                            setActiveSubmenu(item.label);
                          }
                        }}
                        onMouseLeave={() => {
                          if (!isMobile) {
                            scheduleSubmenuReset();
                          }
                        }}
                      >
                        <button
                          type="button"
                          className={`flex w-full cursor-pointer items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-medium text-foreground transition-colors hover:bg-secondary/70 ${activeSubmenu === item.label ? "bg-secondary/70" : ""}`}
                          onClick={() => {
                            clearCloseMenuTimeout();
                            clearCloseSubmenuTimeout();
                            setIsCvMenuOpen(true);
                            setActiveSubmenu(item.label);
                          }}
                          onFocus={() => {
                            clearCloseMenuTimeout();
                            clearCloseSubmenuTimeout();
                            setActiveSubmenu(item.label);
                          }}
                        >
                          <span className="flex items-center gap-3">
                            <item.Icon className="size-4 text-primary" />
                            {item.label}
                          </span>
                          <ChevronRight
                            className={`size-4 text-muted-foreground transition-transform duration-200 ${activeSubmenu === item.label ? "rotate-90 sm:rotate-0" : ""}`}
                          />
                        </button>
                        <div
                          className={`${activeSubmenu === item.label ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"} relative mt-2 overflow-hidden transition-all duration-200 sm:absolute sm:left-full sm:top-0 sm:mt-0 sm:ml-0 sm:w-48 ${activeSubmenu === item.label ? "sm:translate-x-3 sm:translate-y-2" : ""}`}
                          onMouseEnter={() => {
                            clearCloseMenuTimeout();
                            clearCloseSubmenuTimeout();
                            setActiveSubmenu(item.label);
                          }}
                          onMouseLeave={() => {
                            if (!isMobile) {
                              scheduleCloseCvMenu();
                              scheduleSubmenuReset();
                            }
                          }}
                        >
                          <div className="rounded-2xl border border-border/70 bg-card/95 p-2 shadow-[0_24px_80px_rgba(53,33,16,0.22)] backdrop-blur-xl sm:before:absolute sm:before:-left-4 sm:before:top-0 sm:before:h-full sm:before:w-4 sm:before:content-['']">
                            {item.options.map((option) => (
                              <a
                                key={option.href}
                                href={option.href}
                                target="_blank"
                                rel="noreferrer"
                                className="block cursor-pointer rounded-xl px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary/70 focus:bg-secondary/70 focus:outline-none"
                                onClick={() => {
                                  closeCvMenu();
                                }}
                              >
                                {option.label}
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <Button
                variant="outline"
                asChild
                className="border-primary/20 bg-card/70 hover:bg-secondary/70"
              >
                <Link href="#projects">{dict.buttons.projects}</Link>
              </Button>
            </m.div>
          </div>
        </div>
      </div>
    </section>
  );
}
