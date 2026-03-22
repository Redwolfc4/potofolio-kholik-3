"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { HeroDict } from "@/types/i18n";

export default function Hero({ dict }: { dict: HeroDict }) {
  return (
    <section id="home" className="relative isolate w-full overflow-hidden py-24 lg:py-28">
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute -top-24 -left-20 h-80 w-80 rounded-full bg-primary/25 blur-3xl"
          animate={{ y: [0, 30, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-accent/25 blur-3xl"
          animate={{ y: [0, -40, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-x-8 top-10 h-72 rounded-[3rem] border border-border/40 bg-card/35 blur-3xl" />
      </div>
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-[22.5rem_1fr] gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-[25rem] mx-auto mt-8 h-105 w-full overflow-hidden rounded-3xl border border-border/60 bg-muted shadow-[0_24px_60px_rgba(95,58,34,0.18)] ring-1 ring-background/60 md:mt-0 md:h-105 dark:shadow-[0_24px_60px_rgba(0,0,0,0.34)]"
        >
          <Image
            src="https://s6.imgcdn.dev/Yvva8q.webp"
            alt={dict.name}
            width={900}
            height={1200}
            className="w-full h-full object-cover object-top"
            priority
          />
        </motion.div>
        <div className="text-center md:text-left">
          <div className="space-y-6 rounded-[2rem] border border-border/60 bg-card/70 p-8 shadow-[0_24px_60px_rgba(95,58,34,0.12)] backdrop-blur-sm dark:shadow-[0_24px_60px_rgba(0,0,0,0.28)]">
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="inline-flex items-center rounded-full border border-primary/20 bg-secondary/70 px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-primary"
            >
              {dict.tagline}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="bg-linear-to-r from-foreground via-primary to-foreground bg-clip-text text-4xl font-bold tracking-tight text-transparent lg:text-6xl"
            >
              {dict.name}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="max-w-2xl text-lg text-muted-foreground"
            >
              {dict.description}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="flex flex-col gap-4 justify-center sm:flex-row md:justify-start"
            >
              <Button
                asChild
                className="shadow-[0_18px_40px_rgba(138,90,60,0.24)] transition-all hover:shadow-[0_22px_46px_rgba(138,90,60,0.3)]"
              >
                <Link href="#contact">{dict.buttons.contact}</Link>
              </Button>
              <Button
                variant="outline"
                asChild
                className="border-primary/20 bg-card/70 hover:bg-secondary/70"
              >
                <Link href="#projects">{dict.buttons.projects}</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
