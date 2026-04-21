"use client";

import { CommonDict } from "@/types/i18n";
import ImageWithFallback from "@/components/ui/image-with-fallback";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { companies } from "@/lib/companies";

export default function Marquee({ dict }: { dict: CommonDict }) {
  const isMobile = useIsMobile();
  const groups = isMobile ? [0] : [0, 1];

  return (
    <section id="companies" className="py-24 w-full overflow-hidden flex flex-col items-center gap-12 relative">
      <div className="mx-auto px-8 w-full">
        <h2 className="text-3xl font-bold text-center tracking-tight">
          {dict.titles.marquee}
        </h2>
      </div>

      <div className="w-full border-y bg-muted/30 py-12">
        <div className={`w-full relative ${isMobile ? "marquee px-4" : "marquee"}`}>
          <div className="marquee-track py-3">
            {groups.map((groupIndex) => (
              <div key={`group-${groupIndex}`} className="marquee-group">
                {companies.map((company) => (
                  <a
                    key={`${groupIndex}-${company.name}`}
                    href={company.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={company.name}
                    className="shrink-0 flex items-center justify-center h-24 md:h-32 px-4"
                  >
                    {company.logo ? (
                      <div className="relative h-20 w-40 md:h-28 md:w-48">
                        <ImageWithFallback
                          src={company.logo}
                          alt={company.name}
                          fallbackSrc="/placeholders/logo-fallback.svg"
                          className="object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500 hover:scale-110"
                          fill
                          unoptimized
                          draggable="false"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    ) : (
                      <span className="text-xl font-bold tracking-tight text-foreground/50 hover:text-foreground transition-colors duration-500 hover:scale-110">
                        {company.name}
                      </span>
                    )}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
