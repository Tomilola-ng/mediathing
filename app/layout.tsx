import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { PwaInstallPrompt } from "@/components/pwa-install-prompt";
import { Analytics } from "@vercel/analytics/next"
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-sans",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://mediathing.app");

export const metadata: Metadata = {
  title: "MediaThing — Open-source FFmpeg for everyone",
  description:
    "Convert media in your browser. No uploads, no installs, no ads. Extract audio, convert video, audio, and images.",
  openGraph: {
    title: "MediaThing — Open-source FFmpeg for everyone",
    description:
      "Convert media in your browser. No uploads, no installs, no ads. Extract audio, convert video, audio, and images.",
    url: siteUrl,
    siteName: "MediaThing",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "MediaThing — Convert media in your browser",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/favicon_io/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon_io/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/favicon_io/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={jetbrainsMono.variable}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex min-h-screen flex-col`}
      >
        <Nav />
        <div className="flex-1">{children}</div>
        <Footer />
        <PwaInstallPrompt />
        <Analytics />
      </body>
    </html>
  );
}
