"use client";

import { motion } from "framer-motion";
import { Languages, Globe, JapaneseYen, LucideIcon } from "lucide-react";
import { LanguagesDict } from "@/types/i18n";

const iconMap: Record<string, LucideIcon> = {
  Languages,
  Globe,
  JapaneseYen,
};

export default function LanguageSection({ dict }: { dict: LanguagesDict }) {
  return (
    <section className="py-20 w-full flex flex-col items-center justify-center bg-background/50 backdrop-blur-sm border-y border-border/50">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center space-y-4 mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-linear-to-r from-foreground to-foreground/60">
            {dict.title}
          </h2>
          <div className="w-20 h-1.5 bg-primary rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {dict.items.map((item, index) => {
            const Icon = iconMap[item.icon as string] || Globe;
            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group relative p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Icon size={80} />
                </div>
                
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <Icon size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{item.name}</h3>
                    <p className="text-sm font-medium text-primary">{item.level}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.proficiency}
                  </p>
                  
                  {/* Visual proficiency bar */}
                  <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: item.level === "Native" ? "100%" : item.level.includes("Working") ? "75%" : "30%" }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full bg-primary"
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
