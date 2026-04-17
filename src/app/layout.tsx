import "@/styles/globals.css";
import { Poppins } from "next/font/google";
import { headers } from "next/headers";
import type { Metadata } from "next";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Salahudin Kholiq — Frontend Developer",
  description: "Portfolio of Salahudin Kholiq Prasetyono — A frontend developer focused on building modern, animated, and accessible web experiences using Next.js and Tailwind CSS.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = (await headers()).get("x-locale") || "en";

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${poppins.variable} antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
