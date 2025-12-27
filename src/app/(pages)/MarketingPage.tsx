"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setEmail,
  setSubmitting,
  setSubmitted,
  setError,
} from "@/store/slices/betaSlice";
import { setWaitlistModalOpen } from "@/store/slices/uiSlice";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

// Marketing components
import CaseStudies from "@/components/CaseStudies";
import Features from "@/components/Features";
import Customers from "@/components/Customers";
import UseCases from "@/components/UseCases";
import Templates from "@/components/Templates";
import Comparison from "@/components/Comparison";

// App slides data for phone mockup section
const appSlides = [
  {
    title: "Import any recipe instantly",
    description:
      "Paste a TikTok, YouTube, or Instagram link. Gruby AI extracts everything.",
    features: [
      "AI-powered recipe import",
      "Works with any video platform",
      "Automatic ingredient detection",
    ],
  },
  {
    title: "Cook with confidence",
    description:
      "Step-by-step cooking mode with built-in timers, video clips, and voice guidance.",
    features: [
      "Guided cooking mode",
      "Video clips at each step",
      "Voice instructions",
    ],
  },
  {
    title: "Track your wins",
    description:
      "Every home-cooked meal saves money. Watch your savings grow daily.",
    features: ["Savings dashboard", "Cooking streaks", "Achievement badges"],
  },
];

// CTA Section
function CTASection({
  localEmail,
  setLocalEmail,
  handleBetaSignup,
  isSubmitting,
  error,
  isSubmitted,
  email,
}: {
  localEmail: string;
  setLocalEmail: (email: string) => void;
  handleBetaSignup: (e: React.FormEvent) => void;
  isSubmitting: boolean;
  error: string | null;
  isSubmitted: boolean;
  email: string;
}) {
  return (
    <section
      id="download"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        padding: "100px 16px",
        backgroundColor: "#1a1a1a",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Grain texture overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url(/GrubyGrain.webp)",
          backgroundSize: "200px 200px",
          opacity: 0.22,
          pointerEvents: "none",
          mixBlendMode: "overlay",
          zIndex: 0,
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "28px",
          width: "100%",
          maxWidth: "600px",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <h2
          style={{
            fontWeight: 600,
            fontSize: "clamp(1.75rem, 2.5vw + 1rem, 2.5rem)",
            letterSpacing: "-0.03em",
            lineHeight: "115%",
            color: "#ffffff",
            margin: 0,
          }}
        >
          Stop overpaying. Start cooking.
        </h2>
        <p
          style={{
            fontWeight: 400,
            fontSize: "clamp(1rem, 0.9rem + 0.5vw, 1.125rem)",
            lineHeight: "160%",
            color: "rgba(255, 255, 255, 0.6)",
            margin: 0,
          }}
        >
          Eat better. Spend less. It&apos;s that simple.
        </p>

        {isSubmitted ? (
          <div
            style={{
              padding: "24px 32px",
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              borderRadius: "16px",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <p
              style={{
                fontWeight: 500,
                fontSize: "16px",
                color: "#ffffff",
                marginBottom: "8px",
              }}
            >
              You&apos;re on the list!
            </p>
            <p style={{ fontSize: "14px", color: "rgba(255, 255, 255, 0.6)" }}>
              We&apos;ll notify {email} when Gruby launches.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleBetaSignup}
            className="flex w-full max-w-[480px] flex-col gap-3"
          >
            <input
              type="email"
              value={localEmail}
              onChange={(e) => setLocalEmail(e.target.value)}
              placeholder="Enter your email"
              required
              disabled={isSubmitting}
              className="w-full rounded-[13px] border-0 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-white/50"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex w-full items-center justify-center rounded-[13px] bg-[var(--gruby-primary)] px-4 py-3 text-sm font-medium text-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_2px_8px_0px_rgba(0,0,0,0.04)] transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
            >
              {isSubmitting ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                "Join Waitlist"
              )}
            </button>
          </form>
        )}
        {error && (
          <p style={{ fontSize: "14px", color: "rgb(239, 68, 68)" }}>{error}</p>
        )}
      </div>
    </section>
  );
}

export default function MarketingPage() {
  const dispatch = useAppDispatch();
  const { email, isSubmitting, isSubmitted, error } = useAppSelector(
    (state) => state.beta,
  );
  const [localEmail, setLocalEmail] = useState("");
  const [footerEmail, setFooterEmail] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % appSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleBetaSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!localEmail.trim()) return;

    dispatch(setSubmitting(true));
    dispatch(setError(null));

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: localEmail.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to join waitlist");
      }

      dispatch(setEmail(localEmail));
      dispatch(setSubmitted(true));
      setLocalEmail("");
      setTimeout(() => {
        dispatch(setSubmitted(false));
        dispatch(setWaitlistModalOpen(false));
      }, 3000);
    } catch (err) {
      dispatch(
        setError(
          err instanceof Error
            ? err.message
            : "Something went wrong. Please try again.",
        ),
      );
    } finally {
      dispatch(setSubmitting(false));
    }
  };

  function handleNewsletterSubmit(event: React.FormEvent) {
    event.preventDefault();
    setFooterEmail("");
  }

  return (
    <>
      {/* eslint-disable-next-line react/no-unknown-property */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap");

        * {
          font-family:
            "Inter",
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            Roboto,
            sans-serif;
        }

        body {
          color: var(--color-text);
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          font-family:
            "Inter",
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            Roboto,
            sans-serif !important;
          font-weight: 600;
          letter-spacing: -0.02em;
        }

        /* Responsive styles */
        @media (max-width: 640px) {
          .cta-form {
            flex-direction: column !important;
          }
          .app-store-links,
          .app-store-buttons {
            flex-direction: column !important;
            width: 100%;
          }
          .app-store-links a,
          .app-store-buttons a {
            justify-content: center;
          }
        }

        @media (max-width: 1024px) {
          .use-cases-header {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
          .use-cases-subtext {
            align-items: flex-start !important;
          }
          .use-cases-subtext h5 {
            text-align: left !important;
          }
          .use-cases-grid {
            flex-direction: column !important;
            height: auto !important;
          }
          .use-cases-grid > div:last-child {
            flex-direction: row !important;
          }
        }

        @media (max-width: 768px) {
          .use-cases-grid > div:last-child {
            flex-direction: column !important;
          }
          .case-studies-grid {
            flex-direction: column !important;
          }
          .case-study-card {
            flex: none !important;
          }
          .customers-grid {
            flex-direction: column !important;
          }
          .operations-content {
            flex-direction: column !important;
          }
          .operations-left {
            height: auto !important;
          }
          .operations-preview {
            min-height: 400px !important;
          }
        }

        /* Hide scrollbar for templates carousel */
        .templates-carousel::-webkit-scrollbar {
          display: none;
        }

        /* Features demo hover */
        .features-video-overlay:hover {
          backdrop-filter: blur(4px);
          background-color: rgba(0, 0, 0, 0.3);
        }
        .features-video-overlay:hover .features-center-controls {
          opacity: 1 !important;
        }
        .features-video-overlay:hover .features-corner-button {
          opacity: 0 !important;
        }
      `}</style>

      <div className="flex min-h-screen flex-col bg-white">
        {/* Hero Section */}
        <div className="relative -mt-32 h-[720px] overflow-hidden pt-32 sm:h-[550px] md:h-[650px] lg:h-[750px]">
          {/* Background Image */}
          <div className="absolute inset-0">
            {/* Mobile Background - using div with background-image */}
            <div
              className="absolute inset-0 sm:hidden"
              style={{
                backgroundImage: "url(/HeroMobileNew.JPG)",
                backgroundSize: "cover",
                backgroundPosition: "center -100px",
              }}
            />
            {/* Desktop Image */}
            <Image
              src="/GrubyHeroDesktop.webp"
              alt="Woman cooking homemade burgers in kitchen"
              fill
              priority
              quality={90}
              className="hero-image hidden object-cover sm:block"
              sizes="100vw"
              fetchPriority="high"
              style={{ objectPosition: "center 15%" }}
            />
          </div>
          {/* Gradient overlay - mobile: dark at bottom, desktop: dark on left */}
          <div
            className="absolute inset-0 sm:hidden"
            style={{
              background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 30%, transparent 50%)",
            }}
          />
          {/* Desktop: left-side gradient for content area */}
          <div
            className="absolute inset-0 hidden sm:block"
            style={{
              background: "linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.65) 25%, rgba(0,0,0,0.35) 50%, transparent 70%)",
            }}
          />
          {/* Top blur gradient - subtle, starts at top of image */}
          <div
            className="absolute left-0 right-0 top-0 pointer-events-none"
            style={{
              height: "100px",
              background: "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.15) 50%, transparent 100%)",
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
              maskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
            }}
          />

          {/* Hero Content Container */}
          <div className="relative z-10 mx-auto flex h-full max-w-[1920px] flex-col items-start justify-end px-4 pb-8 sm:justify-center sm:px-6 sm:pb-0 lg:px-8">
            {/* Mobile-only gradient under content */}
            <div className="pointer-events-none absolute -bottom-16 left-0 right-0 h-[32rem] bg-gradient-to-t from-black/90 via-black/70 to-transparent sm:hidden" />
            <div className="relative z-10">
              <h1
                className="mb-3 font-bold leading-tight text-white sm:mb-4 md:mb-6"
                style={{ fontSize: "clamp(1.5rem, 3vw + 1rem, 3rem)" }}
              >
                Mom Was Right.
              </h1>
              <p
                className="mb-4 max-w-xl leading-relaxed text-gray-200 sm:mb-6 md:mb-8"
                style={{ fontSize: "clamp(1rem, 1.25vw + 0.75rem, 1.25rem)" }}
              >
                We got food at home. Paste any recipe link, get live grocery
                prices, and cook with step-by-step guidance.
              </p>
              <div className="relative z-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    dispatch(setWaitlistModalOpen(true));
                  }}
                  className="inline-flex h-[44px] items-center justify-center rounded-[13px] bg-white px-4 text-sm font-semibold text-[#1a1a1a] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_2px_8px_0px_rgba(0,0,0,0.04)] transition-all duration-200 hover:bg-white/90 active:scale-[0.98] sm:h-[48px] sm:text-base"
                >
                  Get Early Access
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const element = document.getElementById("features");
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                  }}
                  className="hero-outline-button inline-flex h-[44px] items-center justify-center rounded-[13px] border-2 border-white px-4 text-sm font-semibold text-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_2px_8px_0px_rgba(0,0,0,0.04)] transition-all duration-200 active:scale-[0.98] sm:h-[48px] sm:text-base"
                >
                  See How It Works
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* App Preview Section - Phone mockup with content */}
        <section className="pb-12 pt-12 sm:pb-16 sm:pt-16 md:pb-20 md:pt-20 lg:pb-28 lg:pt-28">
          <div className="mx-auto max-w-[1920px] px-4 sm:px-6 lg:px-8">
            <div className="phone-mockup-section relative flex min-h-[720px] flex-col rounded-2xl bg-[#1a1a1a] px-6 pb-20 pt-12 sm:min-h-[780px] sm:rounded-3xl sm:px-8 sm:pb-24 sm:pt-16 md:min-h-[820px] md:px-12 md:pb-12 md:pt-36 lg:min-h-[600px] lg:flex-row lg:items-center lg:px-16 lg:pb-16 lg:pt-40">
              {/* Grain texture overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: "url(/GrubyGrain.webp)",
                  backgroundSize: "200px 200px",
                  opacity: 0.22,
                  pointerEvents: "none",
                  borderRadius: "inherit",
                  mixBlendMode: "overlay",
                  zIndex: 0,
                }}
              />
              {/* Content - Right side on desktop */}
              <div className="phone-mockup-content z-10 order-1 flex w-full max-w-xl flex-shrink-0 flex-col items-start justify-center px-4 pb-[380px] sm:px-0 sm:pb-[420px] md:pb-[480px] lg:-mt-28 lg:ml-[52%] lg:pb-0 xl:ml-[54%]">
                {/* Heading */}
                <h2 className="mb-5 text-left text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                  Your AI-powered kitchen companion
                </h2>
                <p className="mb-8 text-left text-lg leading-relaxed text-white/60 sm:text-xl">
                  Real grocery prices. Guided cooking. Smart savings on every meal.
                </p>

                {/* Rotating Bullet Points */}
                <div className="mb-8 min-h-[120px] w-full">
                  {appSlides.map((slide, index) => (
                    <ul
                      key={index}
                      className="m-0 flex list-none flex-col gap-4 p-0"
                      style={{
                        display: currentSlide === index ? "flex" : "none",
                      }}
                    >
                      {slide.features.map((feature, i) => (
                        <li
                          key={i}
                          className="flex items-center justify-start gap-3 text-base font-medium text-white sm:text-lg"
                        >
                          <div className="h-2.5 w-2.5 flex-shrink-0 rounded-full bg-white" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  ))}
                </div>

                {/* Progress Bar */}
                <div className="mb-10 flex w-full gap-2.5 sm:max-w-[340px]">
                  {appSlides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className="h-2 flex-1 rounded-full border-none transition-colors"
                      style={{
                        backgroundColor:
                          currentSlide === index
                            ? "#ffffff"
                            : "rgba(255, 255, 255, 0.3)",
                        cursor: "pointer",
                      }}
                      aria-label={`Go to slide ${index + 1}`}
                      type="button"
                    />
                  ))}
                </div>

                {/* App Store Links */}
                <div className="app-store-buttons flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                  <a
                    href="https://apps.apple.com/app/gruby"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-12 w-full items-center justify-center rounded-[13px] bg-white px-4 text-black transition-colors duration-200 hover:bg-gray-100 sm:h-14 sm:w-auto sm:px-6"
                  >
                    <svg
                      className="mr-2 h-6 w-6 sm:h-7 sm:w-7"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C1.79 15.25 2.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                    </svg>
                    <div className="flex flex-col items-start">
                      <span className="text-[10px] leading-tight sm:text-xs">
                        Download on the
                      </span>
                      <span className="text-sm font-semibold leading-tight sm:text-base">
                        App Store
                      </span>
                    </div>
                  </a>
                  <a
                    href="https://play.google.com/store/apps/details?id=com.gruby.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-12 w-full items-center justify-center rounded-[13px] bg-white px-4 text-black transition-colors duration-200 hover:bg-gray-100 sm:h-14 sm:w-auto sm:px-6"
                  >
                    <svg
                      className="mr-2 h-6 w-6 sm:h-7 sm:w-7"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.19,14.5L15.12,12.42L17.19,10.33L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                    </svg>
                    <div className="flex flex-col items-start">
                      <span className="text-[10px] leading-tight sm:text-xs">
                        Get it on
                      </span>
                      <span className="text-sm font-semibold leading-tight sm:text-base">
                        Google Play
                      </span>
                    </div>
                  </a>
                </div>
              </div>

              {/* Phone Image - Absolutely positioned at bottom-left */}
              <div className="absolute bottom-0 left-1/2 z-20 order-2 flex w-full flex-shrink-0 -translate-x-1/2 justify-center lg:absolute lg:bottom-0 lg:left-16 lg:w-auto lg:translate-x-0 lg:justify-start">
                <Image
                  src="/GrubyMobile.webp"
                  alt="Gruby mobile app"
                  width={500}
                  height={1000}
                  className="h-auto w-[320px] max-w-[85vw] object-contain sm:w-[360px] sm:max-w-[70vw] md:w-[400px] md:max-w-[50vw] lg:w-[500px] lg:max-w-none xl:w-[600px] 2xl:w-[720px]"
                  priority
                  quality={100}
                />
              </div>
            </div>
          </div>
        </section>

        {/*
          MARKETING STORYLINE:
          1. Templates - Visual hook showing exciting recipes (attention grabber)
          2. Features - How it works (the app's core features)
          3. Customers - Social proof with savings stats
          4. UseCases - Who it's for
          5. CaseStudies - Testimonials
          6. CTA - Convert
        */}

        {/* Case Studies Section */}
        <CaseStudies />

        {/* Features Section */}
        <Features />

        {/* Price Comparison Section */}
        <Comparison />

        {/* Customers/Savings Section */}
        <Customers />

        {/* Use Cases Section */}
        <UseCases />

        {/* Templates/Recipes Section */}
        <Templates />

        {/* CTA Section */}
        <CTASection
          localEmail={localEmail}
          setLocalEmail={setLocalEmail}
          handleBetaSignup={handleBetaSignup}
          isSubmitting={isSubmitting}
          error={error}
          isSubmitted={isSubmitted}
          email={email}
        />

        {/* Footer */}
        <footer className="border-t border-[#e5e5e5] bg-white">
          <div className="mx-auto max-w-[1920px] px-4 py-12 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-5">
              <div className="col-span-1 sm:col-span-2 md:col-span-1">
                <Image
                  src="/GrubyLogo.svg"
                  alt="Gruby Logo"
                  width={100}
                  height={36}
                  className="mb-4 transition-opacity hover:opacity-80"
                  style={{
                    filter:
                      "brightness(0) saturate(100%) invert(27%) sepia(8%) saturate(1089%) hue-rotate(334deg) brightness(95%) contrast(88%)",
                  }}
                />
                <p className="text-sm leading-relaxed text-[#717171]">
                  Cook smarter. Save more. Eat better.
                </p>

                {/* App Store Download Links */}
                <div className="mt-3 flex flex-row gap-2">
                  <a
                    href="https://apps.apple.com/app/gruby"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded border border-[#D9D9D6] bg-white px-2.5 py-1.5 text-[#717171] no-underline transition-all duration-200 hover:border-[#222222] hover:text-[#222222] active:scale-[0.98]"
                  >
                    <svg
                      className="h-3.5 w-3.5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C1.79 15.25 2.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                    </svg>
                    <div className="flex flex-col items-start">
                      <span className="text-[8px] leading-tight opacity-60">
                        Download on the
                      </span>
                      <span className="text-[10px] font-semibold leading-tight">
                        App Store
                      </span>
                    </div>
                  </a>
                  <a
                    href="https://play.google.com/store/apps/details?id=com.gruby.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded border border-[#D9D9D6] bg-white px-2.5 py-1.5 text-[#717171] no-underline transition-all duration-200 hover:border-[#222222] hover:text-[#222222] active:scale-[0.98]"
                  >
                    <svg
                      className="h-3.5 w-3.5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.19,14.5L15.12,12.42L17.19,10.33L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                    </svg>
                    <div className="flex flex-col items-start">
                      <span className="text-[8px] leading-tight opacity-60">
                        Get it on
                      </span>
                      <span className="text-[10px] font-semibold leading-tight">
                        Google Play
                      </span>
                    </div>
                  </a>
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-sm font-semibold text-[#1a1a1a]">
                  Support
                </h3>
                <ul className="flex list-none flex-col gap-3 p-0">
                  <li>
                    <Link
                      href="/faq"
                      className="text-sm text-[#717171] no-underline hover:text-[#1a1a1a]"
                    >
                      FAQ
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/media-kit"
                      className="text-sm text-[#717171] no-underline hover:text-[#1a1a1a]"
                    >
                      Media Kit
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/logos"
                      className="text-sm text-[#717171] no-underline hover:text-[#1a1a1a]"
                    >
                      Logos & Assets
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="mb-4 text-sm font-semibold text-[#1a1a1a]">
                  Legal
                </h3>
                <ul className="flex list-none flex-col gap-3 p-0">
                  <li>
                    <Link
                      href="/terms"
                      className="text-sm text-[#717171] no-underline hover:text-[#1a1a1a]"
                    >
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/privacy"
                      className="text-sm text-[#717171] no-underline hover:text-[#1a1a1a]"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/cookies"
                      className="text-sm text-[#717171] no-underline hover:text-[#1a1a1a]"
                    >
                      Cookie Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/dmca"
                      className="text-sm text-[#717171] no-underline hover:text-[#1a1a1a]"
                    >
                      DMCA Policy
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="mb-4 text-sm font-semibold text-[#1a1a1a]">
                  Community
                </h3>
                <ul className="flex list-none flex-col gap-3 p-0">
                  <li>
                    <Link
                      href="/community-guidelines"
                      className="text-sm text-[#717171] no-underline hover:text-[#1a1a1a]"
                    >
                      Community Guidelines
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/accessibility"
                      className="text-sm text-[#717171] no-underline hover:text-[#1a1a1a]"
                    >
                      Accessibility
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="mb-4 text-sm font-semibold text-[#1a1a1a]">
                  Newsletter
                </h3>
                <form
                  onSubmit={handleNewsletterSubmit}
                  className="flex flex-col gap-3"
                >
                  <input
                    type="email"
                    value={footerEmail}
                    onChange={(e) => setFooterEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full rounded-[13px] border border-[#e5e5e5] bg-[#fafafa] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#222222]"
                    required
                  />
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center rounded-[13px] bg-[var(--gruby-primary)] px-4 py-3 text-sm font-medium text-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_2px_8px_0px_rgba(0,0,0,0.04)] transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="border-t border-[#e5e5e5]">
            <div className="mx-auto max-w-[1920px] px-4 py-6 sm:px-6 lg:px-8">
              <p className="text-center text-sm text-[#717171]">
                © {new Date().getFullYear()} Gruby. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
