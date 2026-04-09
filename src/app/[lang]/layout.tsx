import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import QueryProvider from "@/components/query-provider";
import SiteHeader from "@/components/header/site-header";
import SiteFooter from "@/components/footer/site-footer";
import ScrollToTop from "@/components/ui/scroll-to-top";
import { Locale } from "@/types/i18n";
import { getDictionary } from "@/lib/i18n";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = (await params) as { lang: Locale };
  const dict = await getDictionary(lang, "common");
  
  const title = lang === "en" 
    ? "Salahudin Kholiq — Frontend Developer" 
    : "Salahudin Kholiq — Pengembang Frontend";
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
          url: "/imgPortofolio/og-image.png", // Recommended to add this file
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
  const { lang } = (await params) as { lang: Locale };
  const dict = await getDictionary(lang, "common");

  return (
    <html lang={lang} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Salahudin Kholiq",
              jobTitle: "Frontend Developer",
              email: "salahudinkoliq10@gmail.com",
              url: "https://example.com",
              sameAs: ["https://github.com/kholik-3"],
            }),
          }}
        />
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SiteHeader lang={lang} dict={dict.header} />
            {children}
            <SiteFooter dict={dict.footer} />
            <ScrollToTop />
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
