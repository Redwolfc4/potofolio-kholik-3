"use client";

import { m } from "framer-motion";
import { GraduationCap, Code2, ShieldCheck, Trophy, Terminal } from "lucide-react";
import { AboutDict } from "@/types/i18n";
import { useMotionEnabled } from "@/hooks/use-motion-enabled";
import { whenMotionEnabled } from "@/lib/motion";

export default function About({ dict }: { dict: AboutDict }) {
  const motionEnabled = useMotionEnabled();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="about" className="w-full py-24 relative overflow-hidden">
      {/* Background Decorative Elements – floating orbs */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/4 -left-12 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 max-w-6xl">
        <m.div
          {...whenMotionEnabled(motionEnabled, {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
          })}
          className="flex flex-col items-center mb-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-4">
            <Terminal className="w-3 h-3" />
            {dict.title}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-linear-to-r from-foreground to-foreground/60 max-w-4xl leading-tight">
            &quot;First, solve the problem. Then, write the code.&quot;
          </h2>
          <div className="h-1.5 w-20 bg-primary rounded-full mb-8" />
        </m.div>

        <m.div
          {...whenMotionEnabled(motionEnabled, {
            variants: containerVariants,
            initial: "hidden",
            whileInView: "visible",
            viewport: { once: true },
          } as never)}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
        >
          <m.div {...whenMotionEnabled(motionEnabled, { variants: itemVariants } as never)} className="lg:col-span-7 flex flex-col gap-6">
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-3xl p-8 md:p-10 shadow-xl shadow-primary/5 flex-1 transition-all hover:bg-card/80 group">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-2xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                  <Terminal className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold tracking-tight">{dict.summary.title}</h3>
              </div>
              <p className="text-start text-muted-foreground text-lg leading-relaxed font-medium group-hover:text-foreground/90 transition-colors">
                {dict.summary.content}
              </p>
            </div>

            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-3xl p-8 md:p-10 shadow-xl shadow-primary/5 flex-1 transition-all hover:bg-card/80 group">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-primary/10 text-primary mt-1 group-hover:bg-primary/20 transition-colors">
                  <Code2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3 tracking-tight">{dict.focus.title}</h3>
                  <p className="text-start text-muted-foreground leading-relaxed italic group-hover:text-foreground/80 transition-colors">
                    {dict.focus.content}
                  </p>
                </div>
              </div>
            </div>
          </m.div>

          <m.div {...whenMotionEnabled(motionEnabled, { variants: itemVariants } as never)} className="lg:col-span-5 space-y-6 flex flex-col">
            {/* Education Highlight Card */}
            <div className="bg-primary text-primary-foreground rounded-3xl p-8 relative overflow-hidden flex-1 group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/15 -mr-8 -mt-8 rounded-full blur-2xl group-hover:bg-white/25 transition-colors duration-500" />
              <div className="relative z-10">
                <div className="inline-flex py-1.5 px-3 rounded-lg bg-white/20 backdrop-blur-md mb-6 items-center gap-2">
                  <GraduationCap className="w-4 h-4" />
                  <span className="text-sm font-bold tracking-wide uppercase">Education</span>
                </div>
                <h4 className="text-2xl font-extrabold mb-1">Universitas Bina Sarana Informatika</h4>
                <p className="text-primary-foreground/80 mb-6 font-medium">Bach. of Informatics</p>

                <div className="flex items-center gap-4 bg-white/20 backdrop-blur p-4 rounded-2xl border border-white/30">
                  <Trophy className="w-10 h-10 text-yellow-300" />
                  <div>
                    <div className="text-3xl font-black tabular-nums tracking-tighter">4.00</div>
                    <div className="text-xs font-bold uppercase tracking-widest text-primary-foreground/90">Cumulative GPA</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Core Strengths Card */}
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-3xl p-8 shadow-lg">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-3 tracking-tight">
                <ShieldCheck className="w-5 h-5 text-primary" />
                {dict.highlights.title}
              </h3>
              <ul className="space-y-4">
                {dict.highlights.items.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 group">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary ring-4 ring-primary/10 group-hover:scale-125 transition-transform" />
                    <span className="text-start text-muted-foreground font-medium group-hover:text-foreground transition-colors">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </m.div>
        </m.div>
      </div>
    </section>
  );
}
