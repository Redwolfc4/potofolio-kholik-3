import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setMounted(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const currentTheme = resolvedTheme ?? theme ?? "light";

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="border border-border/70 bg-card/70 shadow-sm transition-colors hover:bg-accent/60"
        disabled
      >
        <div className="h-5 w-5 animate-pulse rounded-full bg-muted" />
        <span className="sr-only">Loading theme</span>
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
      className="cursor-pointer border border-border/70 bg-card/70 shadow-sm transition-colors hover:bg-accent/60"
    >
      {currentTheme === "dark" ? (
        <motion.span
          className="relative flex items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        >
          <Sun className="h-5 w-5 text-amber-300 drop-shadow-[0_0_12px_rgba(212,161,115,0.8)]" />
        </motion.span>
      ) : (
        <span className="relative flex items-center justify-center">
          <Moon className="h-5 w-5 text-primary" />
          <motion.span
            className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-accent"
            animate={{ opacity: [0.2, 1, 0.2], scale: [0.6, 1.1, 0.6] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
