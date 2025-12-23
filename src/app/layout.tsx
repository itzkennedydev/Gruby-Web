import React from "react";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/Header";
import ErrorBoundary from "@/components/ErrorBoundary";
import { ReduxProvider } from "@/components/ReduxProvider";
import "@/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://gruby.app"),
  title: {
    default: "Gruby - Budgeting-Focused Cooking Companion | Save Money Cooking at Home",
    template: "%s | Gruby",
  },
  description:
    "Gruby is a financial-minded cooking companion that guides you through recipes while showing exactly how much money you save by cooking at home. Track grocery costs, meal prep smarter, and build better food budgets.",
  keywords: [
    "cooking app",
    "meal planning",
    "budget cooking",
    "save money cooking",
    "recipe app",
    "grocery budget",
    "meal prep",
    "food savings",
    "cooking companion",
    "home cooking",
    "budget meals",
    "cost per serving",
    "pantry management",
    "shopping list",
    "recipe cost calculator",
  ],
  authors: [{ name: "Gruby" }],
  creator: "Gruby",
  publisher: "Gruby",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/favicon-white.svg",
    apple: "/favicon-white.svg",
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://gruby.app",
    siteName: "Gruby",
    title: "Gruby - Budgeting-Focused Cooking Companion",
    description:
      "Gruby is a financial-minded cooking companion that guides you through recipes while showing exactly how much money you save by cooking at home.",
    images: [
      {
        url: "/HeroImagen.jpg",
        width: 1200,
        height: 630,
        alt: "Gruby - Cook smarter, save more",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gruby - Budgeting-Focused Cooking Companion",
    description:
      "Gruby is a financial-minded cooking companion that guides you through recipes while showing exactly how much money you save by cooking at home.",
    images: ["/HeroImagen.jpg"],
    creator: "@grubyapp",
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
  verification: {
    google: "google-site-verification-code",
  },
  alternates: {
    canonical: "https://gruby.app",
  },
  category: "food & cooking",
};

interface RootLayoutProps {
  children: ReactNode;
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://gruby.app/#organization",
      name: "Gruby",
      url: "https://gruby.app",
      logo: {
        "@type": "ImageObject",
        url: "https://gruby.app/GrubyLogo.svg",
      },
      sameAs: [],
    },
    {
      "@type": "WebSite",
      "@id": "https://gruby.app/#website",
      url: "https://gruby.app",
      name: "Gruby",
      description:
        "Gruby is a financial-minded cooking companion that guides you through recipes while showing exactly how much money you save by cooking at home.",
      publisher: {
        "@id": "https://gruby.app/#organization",
      },
    },
    {
      "@type": "SoftwareApplication",
      name: "Gruby",
      operatingSystem: "iOS, Android",
      applicationCategory: "LifestyleApplication",
      description:
        "A budgeting-focused cooking companion that guides you through recipes while showing exactly how much money you save by cooking at home.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        ratingCount: "1000",
      },
    },
    {
      "@type": "FAQPage",
      "@id": "https://gruby.app/faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is Gruby?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Gruby is a budgeting-focused cooking companion app that helps you save money by cooking at home. It guides you through recipes while showing exactly how much you save compared to eating out or ordering delivery.",
          },
        },
        {
          "@type": "Question",
          name: "How does Gruby help me save money?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Gruby tracks grocery costs, calculates cost per serving for recipes, manages your pantry to reduce food waste, and shows you real-time savings compared to restaurant and delivery prices.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          <link
            rel="preload"
            href="/HeroImage.jpg"
            as="image"
            fetchPriority="high"
          />
          <link
            rel="preload"
            href="/Mobile phone.png"
            as="image"
            fetchPriority="high"
          />
        </head>
        <body className="flex min-h-screen flex-col bg-white">
          <ErrorBoundary>
            <ReduxProvider>
              <Header />
              <main className="flex-1">{children}</main>
            </ReduxProvider>
          </ErrorBoundary>
        </body>
      </html>
    </ClerkProvider>
  );
}
