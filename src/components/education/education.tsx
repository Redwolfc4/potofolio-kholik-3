"use client";

import { m } from "framer-motion";

import { EducationDict, EducationItem, EducationMedia } from "@/types/i18n";
import ImageWithFallback from "@/components/ui/image-with-fallback";
import { useMotionEnabled } from "@/hooks/use-motion-enabled";
import { whenMotionEnabled } from "@/lib/motion";

export default function Education({ dict }: { dict: EducationDict }) {
  const motionEnabled = useMotionEnabled();
  const education = dict.items;
  return (
    <section id="education" className="py-20 px-10 w-full relative overflow-hidden">
      {/* Floating decorative background orbs */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-8 right-12 w-52 h-52 bg-primary/6 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-8 -left-8 w-60 h-60 bg-accent/7 rounded-full blur-3xl animate-float-reverse anim-delay-800" />
      </div>
      <m.h2
        {...whenMotionEnabled(motionEnabled, {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
        })}
        className="text-3xl font-bold mb-10 text-center text-foreground"
      >
        {dict.title}
      </m.h2>
      <div className="space-y-8">
        {education?.map((edu: EducationItem, index: number) => (
          <m.div
            key={`${edu.institution}-${edu.period}`}
            {...whenMotionEnabled(motionEnabled, {
              initial: { opacity: 0, x: -20 },
              whileInView: { opacity: 1, x: 0 },
              transition: { delay: index * 0.1 },
              viewport: { once: true, amount: 0.2 },
            })}
            className="p-8 bg-card border rounded-2xl shadow-sm cursor-pointer hover:shadow-md transition-shadow  w-full"
          >
            <div className="flex flex-col md:grid md:grid-cols-[28rem_1fr] gap-6 md:gap-10 lg:gap-15 items-center px-4 md:px-6">
              <a href={edu.websiteUrl} target="_blank" rel="noopener noreferrer" className="w-full aspect-video md:h-full rounded-2xl overflow-hidden bg-muted block group shrink-0">
                <ImageWithFallback
                  src={edu.imageUrl}
                  alt={edu.institution}
                  fallbackSrc="/placeholders/education-fallback.svg"
                  width={400}
                  height={400}
                  sizes="(max-width: 768px) 100vw, 448px"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </a>
              <div>
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-1 md:gap-0 mb-3">
                  <h3 className="text-2xl font-bold text-primary">{edu.degree}</h3>
                  <p className="text-sm font-medium text-muted-foreground shrink-0">{edu.period}</p>
                </div>
                <a href={edu.websiteUrl} target="_blank" rel="noopener noreferrer" className="inline-block text-xl font-medium text-foreground hover:text-primary transition-colors mb-1">
                  {edu.institution}
                </a>
                <p className="text-sm text-muted-foreground mb-3 italic">{edu.location}</p>
                <p className="text-start text-muted-foreground mb-4">{edu.description}</p>

                {edu.activities && (
                  <p className="text-start text-sm text-muted-foreground mb-2">
                    <strong className="text-foreground">{dict.activitiesLabel || "Activities and societies"}:</strong> {edu.activities}
                  </p>
                )}

                {edu.responsibilities && (
                  <p className="text-start text-sm text-muted-foreground mb-6 leading-relaxed">
                    {edu.responsibilities}
                  </p>
                )}

                {edu.skills && (
                  <div className="mb-6">
                    <strong className="text-sm text-foreground block mb-2">{dict.skillsLabel || "Skills"}:</strong>
                    <p
                      className="text-start text-sm text-muted-foreground leading-relaxed [&>strong]:text-foreground [&>strong]:font-semibold"
                      dangerouslySetInnerHTML={{ __html: edu.skills }}
                    />
                  </div>
                )}

                {edu.media && edu.media.length > 0 && (
                  <div className="flex flex-wrap gap-4 mt-2">
                    {edu.media.map((item: EducationMedia, i: number) => (
                      <a href={item.linkUrl} target="_blank" rel="noopener noreferrer" key={i} className="block relative h-20 w-32 rounded-lg overflow-hidden border border-border hover:border-primary transition-colors group">
                        <ImageWithFallback
                          src={item.thumbnailUrl}
                          alt={`Certificate ${i + 1}`}
                          fallbackSrc="/placeholders/certificate-fallback.svg"
                          fill
                          sizes="128px"
                          className="object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </m.div>
        ))}
      </div>
    </section>
  );
}
