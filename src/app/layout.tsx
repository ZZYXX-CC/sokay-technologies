import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { SupabaseProvider } from "@/lib/SupabaseProvider";
import { ThemeProvider } from "@/components/theme-provider";
import { PageTransition } from "@/components/ui/page-loader";
import "./globals.css";
// Commented out - using Zustand cart implementation instead
// import { CartProvider } from '@/context/CartContext';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sokay Technologies | Innovative Tech Solutions",
  description: "Sokay Technologies provides innovative technology products and services for businesses and individuals.",
  keywords: ["technology", "electronics", "software", "networking", "tech solutions", "Sokay"],
  authors: [{ name: "Sokay Technologies" }],
  openGraph: {
    title: "Sokay Technologies | Innovative Tech Solutions",
    description: "Sokay Technologies provides innovative technology products and services for businesses and individuals.",
    url: "https://sokaytechnologies.com",
    siteName: "Sokay Technologies",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark" enableSystem={false}>
          {/* Commented out - using Zustand cart implementation instead */}
          {/* <CartProvider> */}
            <SupabaseProvider>
              <PageTransition>
                <div>
                  {children}
                </div>
                <Toaster />
              </PageTransition>
            </SupabaseProvider>
          {/* </CartProvider> */}
        </ThemeProvider>
      </body>
    </html>
  );
}
