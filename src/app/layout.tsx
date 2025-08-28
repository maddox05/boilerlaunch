import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "BoilerLaunchpad - Discover Amazing Projects from Purdue",
    template: "%s | BoilerLaunchpad",
  },
  description:
    "Discover and share incredible projects created by the Purdue University community. Submit your own creations and get upvoted by fellow Boilermakers!",
  keywords: [
    "Purdue University",
    "student projects",
    "product hunt",
    "boilermakers",
    "university community",
    "project showcase",
    "student innovation",
    "Purdue students",
    "tech projects",
    "startup showcase",
  ],
  authors: [{ name: "BoilerLaunchpad Team" }],
  creator: "BoilerLaunchpad",
  publisher: "BoilerLaunchpad",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://BoilerLaunchpad.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "🚀 BoilerLaunchpad - Discover Amazing Projects from Purdue",
    description:
      "Discover and share incredible projects created by the Purdue University community. Submit your own creations and get upvoted by fellow Boilermakers!",
    url: "/",
    siteName: "BoilerLaunchpad",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "BoilerLaunchpad - Discover Amazing Projects from Purdue",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "🚀 BoilerLaunchpad - Discover Amazing Projects from Purdue",
    description:
      "Discover and share incredible projects created by the Purdue University community. Submit your own creations and get upvoted by fellow Boilermakers!",
    images: ["/og-image.png"],
    creator: "maddox schmidlkofer",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
