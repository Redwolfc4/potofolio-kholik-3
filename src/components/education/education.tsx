"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { EducationDict } from "@/types/i18n";

export default function Education({ dict }: { dict: EducationDict }) {
  const education = dict.items;
  return (
    <section id="education" className="py-20 w-full">
      <h2 className="text-3xl font-bold mb-10 text-center text-foreground">{dict.title}</h2>
      <div className="space-y-8">
        {education?.map((edu, index) => (
          <motion.div
            key={`${edu.institution}-${edu.period}`}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-8 bg-card border rounded-2xl shadow-sm cursor-pointer hover:shadow-md transition-shadow"
          >
            <a
              href={edu.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="grid grid-cols-1 md:grid-cols-[400px_1fr] gap-15 items-center px-4 md:px-6"
            >
              <div className="w-full h-48 md:h-full rounded-2xl overflow-hidden bg-muted">
                <Image
                  src={edu.imageUrl}
                  alt={edu.institution}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div>
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                  <h3 className="text-2xl font-bold text-primary">{edu.degree}</h3>
                  <p className="text-sm font-medium text-muted-foreground">{edu.period}</p>
                </div>
                <p className="text-xl font-medium text-foreground mb-1">{edu.institution}</p>
                <p className="text-sm text-muted-foreground mb-4 italic">{edu.location}</p>
                <p className="text-muted-foreground">{edu.description}</p>
              </div>
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
