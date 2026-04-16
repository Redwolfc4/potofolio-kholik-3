import "@/styles/globals.css";
import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Poppins } from "next/font/google";
import { headers } from "next/headers";
import { ThemeProvider } from "@/components/theme-provider";
import MotionProvider from "@/components/motion-provider";
import SiteHeader from "@/components/header/site-header";
import SiteFooter from "@/components/footer/site-footer";
import ScrollToTop from "@/components/ui/scroll-to-top";
import { getDictionary, isValidLocale, locales } from "@/lib/i18n";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5ede3" },
    { media: "(prefers-color-scheme: dark)", color: "#19110d" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  
  const safeLocale = isValidLocale(lang) ? lang : defaultLocale;
  const dict = await getDictionary(safeLocale, "common");

  const title = dict.metadata.title;
  const description = dict.metadata.description || dict.hero.description;
  const baseUrl = "https://salahudinkholikprasetyono.netlify.app";

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
    icons: {
      icon: "/favicon.ico",
      apple: "/favicon.ico",
    },
    manifest: "/sitemap.xml", // fallback or specific manifest if exists
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
  const baseUrl = "https://salahudinkholikprasetyono.netlify.app";
  const nonce = (await headers()).get("x-nonce") || undefined;

  return (
    <html lang={lang} suppressHydrationWarning>
      <body className={`${poppins.variable} antialiased`} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          nonce={nonce}
        >
          <MotionProvider>
            <script
              type="application/ld+json"
              nonce={nonce}
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "Person",
                  name: "Salahudin Kholik Prasetyono",
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
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
