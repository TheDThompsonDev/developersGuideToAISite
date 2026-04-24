import type { Metadata } from "next";
import { Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { BookSchema } from "../components/BookSchema";
import "./globals.css";

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const geist = GeistSans;

const SITE_URL = "https://devguidetoai.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "The Developer's Guide to AI: From Prompts to Agents",
    template: "%s | The Developer's Guide to AI",
  },
  description:
    "Build real AI systems, not toy demos. A hands-on field guide from LLMs to prompt engineering, RAG, fine-tuning, and autonomous agents. By Jacob Orshalick, Jerry Reghunadh, and Danny Thompson. From No Starch Press.",
  keywords: [
    "AI book for developers",
    "prompt engineering book",
    "RAG book",
    "retrieval augmented generation",
    "fine-tuning LLMs",
    "autonomous agents book",
    "LLM developers guide",
    "Danny Thompson",
    "Jacob Orshalick",
    "Jerry Reghunadh",
    "No Starch Press AI",
    "from prompts to agents",
  ],
  authors: [
    { name: "Jacob Orshalick", url: "https://focus.dev" },
    { name: "Jerry Reghunadh", url: "https://jerrymannel.me" },
    { name: "Danny Thompson", url: "https://dthompsondev.com" },
  ],
  creator: "Jacob Orshalick, Jerry Reghunadh, Danny Thompson",
  publisher: "No Starch Press",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "book",
    locale: "en_US",
    url: SITE_URL,
    siteName: "The Developer's Guide to AI",
    title: "The Developer's Guide to AI: From Prompts to Agents",
    description:
      "Build real AI systems, not toy demos. A hands-on field guide for working developers. From No Starch Press.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "The Developer's Guide to AI - From Prompts to Agents",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Developer's Guide to AI: From Prompts to Agents",
    description:
      "A hands-on field guide for developers shipping real AI systems. From No Starch Press.",
    images: ["/og.png"],
    creator: "@DThompsonDev",
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
  icons: {
    icon: "/book-cover.png",
    apple: "/book-cover.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${bricolageGrotesque.variable} ${jetBrainsMono.variable} ${geist.variable}`}
    >
      <body className="antialiased bg-ink text-bone font-sans">
        <BookSchema siteUrl={SITE_URL} />
        {children}
      </body>
    </html>
  );
}
