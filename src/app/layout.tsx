import "@/styles/globals.css";
import { Poppins } from "next/font/google";
import type { Metadata } from "next";
import { defaultLocale } from "@/lib/i18n";
import PWARegister from "@/components/pwa-register";
import QueryProvider from "@/components/providers/query-provider";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://salahudinkholikprasetyono.netlify.app"),
  title: "Salahudin Kholiq — Frontend Developer",
  description: "Portfolio of Salahudin Kholiq Prasetyono — A frontend developer focused on building modern, animated, and accessible web experiences using Next.js and Tailwind CSS.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/imgPortofolio/pwa-icon.png",
  },
  openGraph: {
    title: "Salahudin Kholiq — Frontend Developer",
    description: "Portfolio of Salahudin Kholiq Prasetyono — A frontend developer focused on building modern, animated, and accessible web experiences using Next.js and Tailwind CSS.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "SK Portfolio",
  },
  manifest: "/manifest.json",
  formatDetection: {
    telephone: false,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={defaultLocale} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://media.licdn.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://media.licdn.com" />
      </head>
      <body className={`${poppins.variable} antialiased`} suppressHydrationWarning>
        <QueryProvider>
          <PWARegister />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
