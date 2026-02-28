import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AllHacks – Discover Every Hackathon",
  description: "AllHacks aggregates live and upcoming hackathons from 8+ platforms in one place. Find your next hackathon at allhacks.xyz.",
  openGraph: {
    title: "AllHacks – Discover Every Hackathon",
    description: "Aggregating live and upcoming hackathons from Devfolio, MLH, Hack Club, Devpost, and more. Stop searching, start building.",
    url: "https://allhacks.xyz",
    siteName: "AllHacks",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AllHacks - Discover Every Hackathon",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AllHacks – Discover Every Hackathon",
    description: "Aggregating live and upcoming hackathons from Devfolio, MLH, Hack Club, Devpost, and more.",
    images: ["/og-image.png"],
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col font-sans`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
