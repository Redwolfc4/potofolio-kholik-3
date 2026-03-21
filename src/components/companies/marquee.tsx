"use client";

import Image from "next/image";

const companies = [
  {
    name: "PT Global Investment Institution",
    logo: "https://media.licdn.com/dms/image/v2/D560BAQHiEr3t7vVoTw/company-logo_200_200/company-logo_200_200/0/1698201934811?e=2147483647&v=beta&t=bnR39RREUkRAfBpKxURRKWJawoiAHNxcLMc-C0qvh5c",
    url: "https://www.lxinternational.com/",
  },
  {
    name: "PT. Winnicode Garuda Indonesia",
    logo: "https://media.licdn.com/dms/image/v2/D560BAQHBchDFb5AGrg/company-logo_200_200/company-logo_200_200/0/1728400424449/winnicodegarudateknologi_logo?e=2147483647&v=beta&t=DvI93tqUX1U-fhSCtFErpAhyKGeIf8JD-IpNEfsDYi4",
    url: "https://winnicode.com/",
  },
  {
    name: "Coding Camp powered by DBS Foundation",
    logo: "https://media.licdn.com/dms/image/v2/D560BAQEONBPsiZnU8w/company-logo_100_100/company-logo_100_100/0/1729482329489?e=1775692800&v=beta&t=SSej3tPbM4SQREUhW9p0kXT3p24uvTtt4BwX7LIjl6s",
    url: "https://www.dbs.com/foundation/",
  },
  {
    name: "Haltev IT Learning Center",
    logo: "https://media.licdn.com/dms/image/v2/C510BAQFe5m12fqQeqA/company-logo_200_200/company-logo_200_200/0/1630602549140/haltegh_it_learning_center_logo?e=2147483647&v=beta&t=IEtmzolkjF295_W8qNHBY5u-AyTGzltcJzTT9rK5ei8",
    url: "https://haltev.id/",
  },
  {
    name: "Lincah - Member of Ordonesia",
    logo: "https://media.licdn.com/dms/image/v2/D4D0BAQG1dfM_JU4iZA/company-logo_200_200/company-logo_200_200/0/1708671274468?e=2147483647&v=beta&t=-9_xJ6vRlFQsFzFlmc44uRtKXlgrCxBTzRSkyElMzfg",
    url: "https://lincah.id/",
  },
  {
    name: "S-TechX",
    logo: "https://media.licdn.com/dms/image/v2/D560BAQHHGlSE-EwN_w/company-logo_100_100/B56Zuod6zeGsAQ-/0/1768057976755?e=1775692800&v=beta&t=ix9BM94DAGdQGLpDW84WaV2vQGQ1MUk__3m7csWWv2E",
    url: "#",
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
                    title={company.name}
                    className="shrink-0 flex items-center justify-center h-16 md:h-20 px-4"
                  >
                    {company.logo ? (
                      <Image
                        src={company.logo}
                        alt={company.name}
                        width={200}
                        height={80}
                        className="h-25 w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500 hover:scale-110"
                      />
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
