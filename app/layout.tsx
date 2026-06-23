import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { JsonLd } from "@/components/json-ld";
import { ThreeRoot } from "@/components/three/three-root";
import {
  navigationSettings,
  profileSettings,
  siteSettings,
  SITE_URL,
} from "@/lib/content/settings";
import { jsonLdGraph, personJsonLd, websiteJsonLd } from "@/lib/seo";
import "./globals.css";

const displayFont = localFont({
  src: "../fonts/ClashDisplay-Variable.woff2",
  variable: "--font-display-face",
  weight: "200 700",
  display: "swap",
  preload: true,
  adjustFontFallback: "Arial",
});

const monoFont = localFont({
  src: "../fonts/GeistMono-Variable.woff2",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
  preload: true,
});

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: siteSettings.title,
    template: `%s — ${siteSettings.name}`,
  },
  description: siteSettings.description,
  keywords: [
    "Hasib Ahmad Bhuyan",
    "Backend Engineer",
    "Tech Lead",
    "Agentic AI",
    "AI Automation",
    "Multi-Agent Systems",
    "LLM Orchestration",
    "LangChain",
    "LangGraph",
    "RAG",
    "Django",
    "FastAPI",
    "Go",
    "Python",
    "Dhaka",
    "Bangladesh",
  ],
  authors: [{ name: siteSettings.name, url: SITE_URL }],
  creator: siteSettings.name,
  alternates: {
    canonical: "/",
    types: {
      "application/atom+xml": [
        { url: "/feed.xml", title: `${siteSettings.name} — Feed` },
      ],
    },
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: siteSettings.name,
    title: siteSettings.title,
    description: siteSettings.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: siteSettings.title,
    description: siteSettings.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${displayFont.variable} ${monoFont.variable}`}>
      <body>
        <a
          href="#main"
          className="mono-label bg-accent fixed top-4 left-4 z-[100] -translate-y-20 rounded-full px-5 py-2.5 text-base transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <JsonLd graph={jsonLdGraph(personJsonLd(), websiteJsonLd())} />
        <SiteHeader
          items={navigationSettings.items}
          contactEmail={profileSettings.email}
        />
        <main id="main" className="relative z-20">
          {children}
        </main>
        <SiteFooter />
        <ThreeRoot />
        <div className="grain-overlay" aria-hidden="true" />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
