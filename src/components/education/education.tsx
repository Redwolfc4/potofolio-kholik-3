"use client";

import { motion } from "framer-motion";

import { EducationDict } from "@/types/i18n";
import ImageWithFallback from "@/components/ui/image-with-fallback";

export default function Education({ dict }: { dict: EducationDict }) {
  const education = dict.items;
  return (
    <section id="education" className="py-20 px-10 w-full">
      <h2 className="text-3xl font-bold mb-10 text-center text-foreground">{dict.title}</h2>
      <div className="space-y-8">
        {education?.map((edu, index) => (
          <motion.div
            key={`${edu.institution}-${edu.period}`}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-8 bg-card border rounded-2xl shadow-sm cursor-pointer hover:shadow-md transition-shadow  w-full"
          >
            <div className="grid grid-cols-1 md:grid-cols-[28rem_1fr] gap-10 lg:gap-15 items-center px-4 md:px-6">
              <a href={edu.websiteUrl} target="_blank" rel="noopener noreferrer" className="w-full h-48 md:h-full rounded-2xl overflow-hidden bg-muted block group">
                <ImageWithFallback
                  src={edu.imageUrl}
                  alt={edu.institution}
                  fallbackSrc="/placeholders/education-fallback.svg"
                  width={400}
                  height={400}
                  unoptimized
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </a>
              <div>
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                  <h3 className="text-2xl font-bold text-primary">{edu.degree}</h3>
                  <p className="text-sm font-medium text-muted-foreground shrink-0">{edu.period}</p>
                </div>
                <a href={edu.websiteUrl} target="_blank" rel="noopener noreferrer" className="inline-block text-xl font-medium text-foreground hover:text-primary transition-colors mb-1">
                  {edu.institution}
                </a>
                <p className="text-sm text-muted-foreground mb-3 italic">{edu.location}</p>
                <p className="text-muted-foreground mb-4">{edu.description}</p>

                {edu.activities && (
                  <p className="text-sm text-muted-foreground mb-2">
                    <strong className="text-foreground">{dict.activitiesLabel || "Activities and societies"}:</strong> {edu.activities}
                  </p>
                )}

                {edu.responsibilities && (
                  <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                    {edu.responsibilities}
                  </p>
                )}

                {edu.skills && (
                  <div className="mb-6">
                    <strong className="text-sm text-foreground block mb-2">{dict.skillsLabel || "Skills"}:</strong>
                    <p
                      className="text-sm text-muted-foreground leading-relaxed [&>strong]:text-foreground [&>strong]:font-semibold"
                      dangerouslySetInnerHTML={{ __html: edu.skills }}
                    />
                  </div>
                )}

                {edu.media && edu.media.length > 0 && (
                  <div className="flex flex-wrap gap-4 mt-2">
                    {edu.media.map((item, i) => (
                      <a href={item.linkUrl} target="_blank" rel="noopener noreferrer" key={i} className="block relative h-20 w-32 rounded-lg overflow-hidden border border-border hover:border-primary transition-colors group">
                        <ImageWithFallback
                          src={item.thumbnailUrl}
                          alt={`Certificate ${i + 1}`}
                          fallbackSrc="/placeholders/certificate-fallback.svg"
                          fill
                          unoptimized
                          className="object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
