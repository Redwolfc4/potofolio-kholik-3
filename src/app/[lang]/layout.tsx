import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/header/site-header";
import SiteFooter from "@/components/footer/site-footer";
import ScrollToTop from "@/components/ui/scroll-to-top";
import { getDictionary, isValidLocale, locales } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;

  if (!isValidLocale(lang)) {
    notFound();
  }

  const dict = await getDictionary(lang, "common");
  
  const title = dict.metadata.title;
  const description = dict.hero.description;
  const baseUrl = "https://salahudinkholiq.com";

  return {
    title,
    description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `/${lang}`,
      languages: {
        "en-US": "/en",
        "id-ID": "/id",
      },
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${lang}`,
      siteName: "Salahudin Kholiq Portfolio",
      images: [
        {
          url: "/imgPortofolio/og-image.png",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/imgPortofolio/og-image.png"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;

  if (!isValidLocale(lang)) {
    notFound();
  }

  const dict = await getDictionary(lang, "common");
  const baseUrl = "https://salahudinkholiq.com";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Salahudin Kholiq",
            jobTitle: "Frontend Developer",
            email: "salahudinkoliq10@gmail.com",
            url: baseUrl,
            sameAs: [
              "https://github.com/kholik-3",
              "https://www.linkedin.com/in/salahudin-kholik-prasetyono",
            ],
          }),
        }}
      />
      <SiteHeader lang={lang} dict={dict.header} />
      {children}
      <SiteFooter dict={dict.footer} />
      <ScrollToTop />
    </>
  );
}
