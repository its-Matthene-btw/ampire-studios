import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ThemeProvider } from "next-themes";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "AMpire Studio | Web Design, Development & Digital Marketing Agency",
  description:
    "We craft stunning websites, powerful brands, and effective digital strategies to help your business thrive online.",
  keywords: [
    "web design",
    "web development",
    "digital marketing",
    "branding",
    "e-commerce",
    "SEO",
  ],
  authors: [{ name: "AMpire Studio" }],
  openGraph: {
    title: "AMpire Studio | Web Design, Development & Digital Marketing Agency",
    description:
      "We craft stunning websites, powerful brands, and effective digital strategies to help your business thrive online.",
    type: "website",
  },
  // --- GOOGLE VERIFICATION ADDED HERE ---
  verification: {
    google: "MRK0haNBJ8cZp4ZKluzA3-kBNWEcwn8o7L9txbVe-kA",
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
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          GeistSans.variable,
          GeistMono.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}