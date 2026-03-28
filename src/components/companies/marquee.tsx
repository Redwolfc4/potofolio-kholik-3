"use client";

// Using native img to avoid Next.js image proxy 403 errors

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
    logo: "https://media.licdn.com/dms/image/v2/D560BAQEONBPsiZnU8w/company-logo_200_200/company-logo_200_200/0/1729482329489?e=2147483647&v=beta&t=dkMktUDkXt7130IuDwAyygkV13ZUc5gnI4JksnlUQ84",
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
  {
    name: "Dicoding Indonesia",
    logo: "https://media.licdn.com/dms/image/v2/C560BAQHOIi63tC8k8w/company-logo_200_200/company-logo_200_200/0/1660182933847/dicoding_logo?e=2147483647&v=beta&t=l_wm1BWTs5_HJgWfWCMyc5Q6H13x7p2ofF5MdjagCv0",
    url: "https://www.dicoding.com/",
  },
  {
    name: "MikroTik",
    logo: "https://media.licdn.com/dms/image/v2/D4D0BAQFHyCuFZWniRg/company-logo_200_200/company-logo_200_200/0/1716286182359/mikrotik_logo?e=2147483647&v=beta&t=IjsNIUCRV5qJF7fV69njQBUHmNDE7cwBSmXautPqxfI",
    url: "https://mikrotik.com/",
  },
  {
    name: "Alibaba Cloud",
    logo: "https://media.licdn.com/dms/image/v2/D560BAQEZecjjDTVXJA/company-logo_200_200/company-logo_200_200/0/1723709190350/alibaba_cloud_computing_company_logo?e=2147483647&v=beta&t=1FHUaY5bUljA6wOuiToEuHKzWxmwekl3QODKi-JaQM4",
    url: "https://www.alibabacloud.com/",
  },
  {
    name: "Codepolitan",
    logo: "https://media.licdn.com/dms/image/v2/C510BAQE7k2gASfZNbA/company-logo_100_100/company-logo_100_100/0/1631343789870?e=2147483647&v=beta&t=qm1pGgEovTJ11qU30EmGLzxXjRVSp_bgOQPunwRu0cU",
    url: "https://www.codepolitan.com/",
  },
  {
    name: "Microsoft",
    logo: "https://media.licdn.com/dms/image/v2/D560BAQH32RJQCl3dDQ/company-logo_100_100/B56ZYQ0mrGGoAU-/0/1744038948046/microsoft_logo?e=2147483647&v=beta&t=rr_7_bFRKp6umQxIHErPOZHtR8dMPIYeTjlKFdotJBY",
    url: "https://www.microsoft.com/",
  },
];

import { CommonDict } from "@/types/i18n";
import NativeImageWithFallback from "@/components/ui/native-image-with-fallback";
import { useIsMobile } from "@/hooks/use-is-mobile";

export default function Marquee({ dict }: { dict: CommonDict }) {
  const isMobile = useIsMobile();
  const groups = isMobile ? [0] : [0, 1];

  return (
    <section id="companies" className="py-24 w-full overflow-hidden flex flex-col items-center gap-12">
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
                      <div className="relative h-20 md:h-28 w-40">
                        <NativeImageWithFallback
                          src={company.logo}
                          alt={company.name}
                          fallbackSrc="/placeholders/logo-fallback.svg"
                          className="object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500 hover:scale-110"
                          loading="lazy"
                          decoding="async"
                          draggable="false"
                          referrerPolicy="no-referrer"
                          style={{ width: "100%", height: "100%" }}
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
