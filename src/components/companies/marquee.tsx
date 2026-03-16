"use client";

import Image from "next/image";

const companies = [
  {
    name: "Google",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    url: "https://about.google/",
  },
  {
    name: "Microsoft",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    url: "https://www.microsoft.com/",
  },
  {
    name: "Apple",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    url: "https://www.apple.com/",
  },
  {
    name: "Amazon",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    url: "https://www.amazon.com/",
  },
  {
    name: "Meta",
    logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg",
    url: "https://about.meta.com/",
  },
  {
    name: "Netflix",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
    url: "https://www.netflix.com/",
  },
];

import { CommonDict } from "@/types/i18n";

export default function Marquee({ dict }: { dict: CommonDict }) {
  return (
    <section id="companies" className="py-24 w-full overflow-hidden flex flex-col items-center gap-12">
      <div className="mx-auto px-8 w-full">
        <h2 className="text-3xl font-bold text-center tracking-tight">
          {dict.titles.marquee}
        </h2>
      </div>

      <div className="w-full border-y bg-muted/30 py-12">
        <div className="marquee w-full relative">
          <div className="marquee-track py-3">
            {[...Array(4)].map((_, groupIndex) => (
              <div key={`group-${groupIndex}`} className="marquee-group">
                {companies.map((company) => (
                  <a
                    key={`${groupIndex}-${company.name}`}
                    href={company.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0"
                  >
                    <Image
                      src={company.logo}
                      alt={company.name}
                      width={160}
                      height={64}
                      className="h-8 md:h-10 w-auto grayscale invert brightness-0 opacity-50 hover:grayscale-0 hover:invert-0 hover:brightness-100 hover:opacity-100 transition-all duration-500 hover:scale-110"
                    />
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
