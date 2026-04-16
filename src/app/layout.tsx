import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Salahudin Kholiq — Frontend Developer",
  description: "Portfolio of Salahudin Kholiq Prasetyono — A frontend developer focused on building modern, animated, and accessible web experiences using Next.js and Tailwind CSS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
