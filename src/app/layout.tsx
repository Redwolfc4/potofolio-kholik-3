import "@/styles/globals.css";
import { Poppins } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import MotionProvider from "@/components/motion-provider";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} antialiased`} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <MotionProvider>
            {children}
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
