import React from "react";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/Header";
import ErrorBoundary from "@/components/ErrorBoundary";
import { ReduxProvider } from "@/components/ReduxProvider";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Gruby - Budgeting-Focused Cooking Companion",
  description:
    "Gruby is a financial-minded cooking companion that guides you through recipes while showing exactly how much money you save by cooking at home.",
  icons: {
    icon: "/favicon-white.svg",
    apple: "/favicon-white.svg",
  },
  other: {
    "preload-hero": "/HeroImage.jpg",
    "preload-mobile": "/Mobile phone.png",
  },
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
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
