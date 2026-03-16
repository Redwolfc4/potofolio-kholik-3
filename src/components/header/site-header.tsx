"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";

import { HeaderDict } from "@/types/i18n";

export default function SiteHeader({ lang, dict }: { lang: string; dict: HeaderDict }) {
  const [open, setOpen] = useState(false);
  const NavItems = dict.nav;

  const toggleLang = lang === "en" ? "id" : "en";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/70 shadow-[0_10px_32px_rgba(95,58,34,0.08)] backdrop-blur-xl dark:shadow-[0_14px_40px_rgba(0,0,0,0.32)]">
      <div className="mx-auto flex items-center justify-between px-10 py-4">
        <Link href="#home" className="text-lg font-bold tracking-[0.22em] text-primary uppercase">
          {dict.logo}
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {NavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
          <div className="flex items-center gap-4 ml-4 border-l pl-4 border-border/50">
            <Link
              href={`/${toggleLang}`}
              className="cursor-pointer text-xs font-bold uppercase hover:text-primary transition-colors"
            >
              {toggleLang}
            </Link>
            <ThemeToggle />
          </div>
        </nav>
        <div className="md:hidden flex items-center gap-2">
          <Link
            href={`/${toggleLang}`}
            className="cursor-pointer text-xs font-bold uppercase px-2 py-1 rounded border border-border/70 hover:bg-accent/70 transition-colors"
          >
            {toggleLang}
          </Link>
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="cursor-pointer rounded-md border border-border/70 bg-card/80 p-2 shadow-sm transition-colors hover:bg-accent/70"
            aria-label="Toggle menu"
          >
            {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-border/70 bg-card/95 md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4">
            {NavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
