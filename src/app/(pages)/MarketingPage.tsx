"use client";

import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setEmail,
  setSubmitting,
  setSubmitted,
  setError,
} from "@/store/slices/betaSlice";
import { setWaitlistModalOpen } from "@/store/slices/uiSlice";
import {
  Loader2,
  X,
  Check,
  ShoppingCart,
  Users,
  TrendingUp,
  Sparkles,
  Video,
  ChefHat,
  Camera,
  Leaf,
  Trophy,
} from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { calculateMealPrice } from "@/lib/kroger-api";
import Image from "next/image";
import Link from "next/link";
import React from "react";

// Features data
const features = [
  {
    title: "TikTok to Table",
    description:
      "See a recipe you like? Paste the link. Gruby AI extracts ingredients, steps, and nutrition automatically. Works with TikTok, YouTube, Instagram, and more.",
    icon: Video,
  },
  {
    title: "Real-Time Grocery Prices",
    description:
      "Grocery prices updated in real-time. See exactly what ingredients cost, compare options, and add everything to your cart in one tap.",
    icon: ShoppingCart,
  },
  {
    title: "Step-by-Step Cooking Mode",
    description:
      "Timers, video clips, voice instructions. Cook like a pro, even if you're not. Confetti celebration when you're done (seriously).",
    icon: ChefHat,
  },
  {
    title: "24-Hour Stories",
    description:
      "Share your kitchen wins. Post what you're cooking, see what your friends are making, and get inspo from real home cooks. No influencer energy required.",
    icon: Camera,
  },
  {
    title: "Gruby AI Budget Coach",
    description:
      "Ask anything. \"What can I make with chicken and rice?\" \"How do I reduce my cart total?\" Gruby AI has your back.",
    icon: Sparkles,
  },
  {
    title: "Zero Waste Pantry",
    description:
      "Track what's in your fridge. Get alerts before things expire. Gruby suggests recipes to use up ingredients before they go bad.",
    icon: Leaf,
  },
];

// App slides data
const appSlides = [
  {
    title: "Import any recipe instantly",
    description:
      "Paste a TikTok, YouTube, or Instagram link. Gruby AI extracts everything — ingredients, steps, nutrition, even timestamps for cooking videos.",
    features: [
      "AI-powered recipe import",
      "Works with any video platform",
      "Automatic ingredient detection",
    ],
  },
  {
    title: "Cook with confidence",
    description:
      "Step-by-step cooking mode with built-in timers, video clips for each step, and voice guidance. Even beginners cook like pros.",
    features: [
      "Guided cooking mode",
      "Video clips at each step",
      "Voice instructions",
    ],
  },
  {
    title: "Track your wins",
    description:
      "Every home-cooked meal saves money. Watch your savings grow daily, weekly, and yearly. Build streaks. Unlock achievements. Flex on DoorDash.",
    features: ["Savings dashboard", "Cooking streaks", "Achievement badges"],
  },
];

// Benefits data
const benefits = [
  {
    title: "Keep Your Cash",
    description:
      "The average person spends $300/month on delivery fees and markups alone. That's $3,600/year. Cook at home and actually keep it.",
    stats: "$3,600",
    statLabel: "Yearly savings potential",
  },
  {
    title: "Skip the Waste",
    description:
      "Every delivery order = foam containers, plastic bags, and carbon emissions. Cooking at home is the greenest choice you can make.",
    stats: "Zero",
    statLabel: "Packaging waste",
  },
  {
    title: "Level Up Your Skills",
    description:
      "Cooking streaks, achievement badges, and guided cooking mode help you go from microwave meals to actual chef-level. For real.",
    stats: "100+",
    statLabel: "Achievements to unlock",
  },
];

// About values
const values = [
  {
    title: "AI That Actually Helps",
    description:
      "Gruby AI imports recipes from any link, suggests meals based on what's in your fridge, and helps you cut your grocery bill. It's like having a personal chef and accountant in your pocket.",
  },
  {
    title: "Real People, Real Food",
    description:
      "No influencers. No 10-paragraph life stories before the recipe. Just home cooks sharing what actually works, what their families actually eat, and what actually tastes good.",
  },
  {
    title: "Built for Your Budget",
    description:
      "Whether you're a college student with $20 or a parent feeding five, Gruby shows you exactly what things cost and helps you eat better for less. No gatekeeping.",
  },
];

// Comparison data with images
interface MealComparison {
  meal: string;
  image: string;
  delivery: {
    price: number;
    fees: number;
    tip: number;
    total: number;
  };
  homeCooked: {
    ingredients: string[];
    price: number;
    servings: number;
    perServing: number;
    loading?: boolean;
  };
  savings: number;
  savingsPercent: number;
}

const initialMealComparisons: MealComparison[] = [
  {
    meal: "Chicken Stir Fry",
    image:
      "https://images.pexels.com/photos/2673353/pexels-photo-2673353.jpeg?auto=compress&cs=tinysrgb&w=800",
    delivery: {
      price: 16.99,
      fees: 3.5,
      tip: 3.0,
      total: 23.49,
    },
    homeCooked: {
      ingredients: [
        "Chicken breast",
        "Bell pepper",
        "Broccoli",
        "Rice",
        "Soy sauce",
      ],
      price: 0,
      servings: 4,
      perServing: 0,
      loading: true,
    },
    savings: 0,
    savingsPercent: 0,
  },
  {
    meal: "Pasta Carbonara",
    image:
      "https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=800",
    delivery: {
      price: 15.99,
      fees: 3.25,
      tip: 2.75,
      total: 21.99,
    },
    homeCooked: {
      ingredients: ["Pasta", "Bacon", "Eggs", "Parmesan cheese", "Heavy cream"],
      price: 0,
      servings: 4,
      perServing: 0,
      loading: true,
    },
    savings: 0,
    savingsPercent: 0,
  },
  {
    meal: "Burger & Fries",
    image:
      "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=800",
    delivery: {
      price: 14.99,
      fees: 3.0,
      tip: 2.5,
      total: 20.49,
    },
    homeCooked: {
      ingredients: [
        "Ground beef",
        "Hamburger buns",
        "Cheese",
        "Potatoes",
        "Lettuce",
      ],
      price: 0,
      servings: 4,
      perServing: 0,
      loading: true,
    },
    savings: 0,
    savingsPercent: 0,
  },
];

// Footer data - removed social links for cleaner design

// Phone Mockup Component
function _PhoneMockup({
  children,
  className = "",
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <div className="relative mx-auto h-[420px] w-[200px] rounded-[2rem] bg-[#1a1a1a] p-2 shadow-2xl ring-1 ring-black/10 sm:h-[500px] sm:w-[240px] sm:rounded-[2.25rem] sm:p-2.5 md:h-[540px] md:w-[260px] md:rounded-[2.5rem]">
        <div className="absolute left-1/2 top-0 z-10 h-5 w-20 -translate-x-1/2 rounded-b-xl bg-[#1a1a1a] sm:h-5 sm:w-24 sm:rounded-b-2xl md:h-6 md:w-28" />
        <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-[1.5rem] bg-white sm:rounded-[1.75rem] md:rounded-[2rem]">
          {children || (
            <div className="p-4 text-center text-[#717171] sm:p-6">
              <p className="text-xs font-medium sm:text-sm">Phone</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Tablet Mockup Component (Landscape iPad)
// Animated App Preview Section Component
function AppPreviewSectionAnimated({
  currentSlide,
  setCurrentSlide,
}: {
  currentSlide: number;
  setCurrentSlide: (index: number) => void;
}) {
  return (
    <section className="pb-12 pt-12 sm:pb-16 sm:pt-16 md:pb-20 md:pt-20 lg:pb-28 lg:pt-28">
      <div className="mx-auto max-w-[1920px] px-4 sm:px-6 lg:px-8">
        <div
          className="relative flex min-h-[500px] flex-col rounded-2xl bg-black px-6 pb-20 pt-12 sm:min-h-[560px] sm:rounded-3xl sm:px-8 sm:pb-24 sm:pt-16 md:min-h-[550px] md:px-12 md:pb-12 md:pt-36 lg:min-h-[600px] lg:flex-row lg:items-center lg:px-16 lg:pb-16 lg:pt-40"
          style={{ containerType: "inline-size" }}
        >
          <div className="flex h-full w-full flex-col items-center justify-between gap-8 sm:gap-12 lg:flex-row lg:items-center lg:gap-16">
            {/* Content and Progress Bar - Right side / Top on mobile */}
            <div className="z-10 order-1 flex w-full max-w-md flex-shrink-0 flex-col items-center justify-center px-4 pb-[482px] sm:px-0 sm:pb-[560px] md:pb-[620px] lg:-mt-28 lg:ml-[45%] lg:items-start lg:pb-0">
              {/* Heading and Description */}
              <div className="mb-6 w-full text-left sm:mb-8">
                <h2
                  className="mb-4 whitespace-nowrap font-semibold text-white sm:mb-6"
                  style={{ fontSize: "clamp(1.5rem, 2.5vw + 1rem, 3rem)" }}
                >
                  Your AI kitchen assistant
                </h2>
                <p
                  className="leading-relaxed text-gray-300"
                  style={{ fontSize: "clamp(1rem, 1.25vw + 0.75rem, 1.25rem)" }}
                >
                  Import recipes from anywhere. Get real prices. Cook like a pro.
                </p>
              </div>

              {/* Rotating Bullet Points */}
              <div className="relative mb-0 min-h-[200px] w-full overflow-hidden sm:min-h-[220px]">
                {appSlides.map((slide, index) => (
                  <ul
                    key={index}
                    className={`list-inside list-disc space-y-4 sm:space-y-5 ${
                      currentSlide === index
                        ? "translate-x-0 opacity-100"
                        : "absolute left-0 right-0 top-0 translate-x-8 opacity-0"
                    }`}
                  >
                    {slide.features.map((feature, i) => (
                      <li
                        key={i}
                        className="text-base leading-relaxed text-white sm:text-lg"
                      >
                        {feature}
                      </li>
                    ))}
                  </ul>
                ))}
              </div>

              {/* Progress Bar */}
              <div className="relative z-20 -mt-8 flex w-full items-center justify-between gap-2 sm:-mt-10">
                {appSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-1.5 flex-1 cursor-pointer rounded-full transition-all duration-200 sm:h-2 ${
                      currentSlide === index
                        ? "bg-white"
                        : "bg-white/30 hover:bg-white/50 active:bg-white/60"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                    type="button"
                  />
                ))}
              </div>

              {/* App Store Links */}
              <div className="mt-6 flex w-full flex-col gap-3 sm:mt-8 sm:flex-row sm:gap-4">
                <a
                  href="https://apps.apple.com/app/gruby"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center rounded-xl bg-white px-4 text-black transition-colors duration-200 hover:bg-gray-100 sm:h-14 sm:rounded-2xl sm:px-6"
                  aria-label="Download on the App Store"
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
                  className="inline-flex h-12 items-center justify-center rounded-xl bg-white px-4 text-black transition-colors duration-200 hover:bg-gray-100 sm:h-14 sm:rounded-2xl sm:px-6"
                  aria-label="Get it on Google Play"
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

            {/* Image - Left side on desktop, bottom on mobile */}
            <div className="absolute bottom-0 left-1/2 z-0 order-2 flex w-full flex-shrink-0 -translate-x-1/2 justify-center lg:absolute lg:bottom-0 lg:left-16 lg:w-auto lg:translate-x-0 lg:justify-start">
              <Image
                src="/Mobile phone.png"
                alt="Gruby mobile app"
                width={500}
                height={1000}
                className="h-auto w-auto object-contain"
                style={{
                  maxWidth: "clamp(420px, 40vw, 720px)",
                }}
                priority
                quality={100}
                sizes="(max-width: 640px) 500px, (max-width: 768px) 450px, (max-width: 1024px) 400px, (max-width: 1280px) 480px, (max-width: 1536px) 640px, 720px"
                loading="eager"
                fetchPriority="high"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Feature Showcase Data with mockup images
const featureShowcase = [
  {
    title: "TikTok to Table",
    description:
      "See a recipe you like? Paste the link. Gruby AI extracts ingredients, steps, and nutrition automatically. Works with TikTok, YouTube, Instagram, and more.",
    icon: Video,
    bullets: [
      "AI-powered recipe extraction",
      "Works with any video platform",
      "Automatic ingredient detection",
      "Timestamps synced to cooking steps",
    ],
    mockupImage: "/mockups/recipe-import.png", // Placeholder - user will add
  },
  {
    title: "Real-Time Grocery Prices",
    description:
      "Grocery prices updated in real-time. See exactly what ingredients cost, compare options, and add everything to your cart in one tap.",
    icon: ShoppingCart,
    bullets: [
      "Live grocery prices",
      "Per-serving cost breakdown",
      "One-tap cart sync",
      "Price comparison across brands",
    ],
    mockupImage: "/mockups/grocery-prices.png",
  },
  {
    title: "Step-by-Step Cooking Mode",
    description:
      "Timers, video clips, voice instructions. Cook like a pro, even if you're not. Confetti celebration when you're done (seriously).",
    icon: ChefHat,
    bullets: [
      "Built-in timers for each step",
      "Video clips at key moments",
      "Hands-free voice guidance",
      "Achievement unlocks when done",
    ],
    mockupImage: "/mockups/cooking-mode.png",
  },
  {
    title: "24-Hour Stories",
    description:
      "Share your kitchen wins. Post what you're cooking, see what your friends are making, and get inspo from real home cooks. No influencer energy required.",
    icon: Camera,
    bullets: [
      "Photo and video stories",
      "24-hour auto-expiration",
      "React and comment on posts",
      "Build your cooking community",
    ],
    mockupImage: "/mockups/stories.png",
  },
  {
    title: "Gruby AI Budget Coach",
    description:
      "Ask anything. \"What can I make with chicken and rice?\" \"How do I reduce my cart total?\" Gruby AI has your back.",
    icon: Sparkles,
    bullets: [
      "Natural language chat",
      "Meal suggestions from pantry",
      "Budget optimization tips",
      "Answers any cooking question",
    ],
    mockupImage: "/mockups/ai-coach.png",
  },
  {
    title: "Zero Waste Pantry",
    description:
      "Track what's in your fridge. Get alerts before things expire. Gruby suggests recipes to use up ingredients before they go bad.",
    icon: Leaf,
    bullets: [
      "Pantry inventory tracking",
      "Expiration date alerts",
      "Use-it-up recipe suggestions",
      "Reduce food waste by 40%",
    ],
    mockupImage: "/mockups/pantry.png",
  },
];

// Phone Mockup for Feature Showcase
function FeatureMockup({
  imageSrc,
  alt,
  icon: Icon,
  title,
}: {
  imageSrc: string;
  alt: string;
  icon?: React.ComponentType<{ className?: string }>;
  title?: string;
}) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="relative mx-auto w-[240px] sm:w-[280px] md:w-[300px]">
      {/* Phone frame */}
      <div className="relative rounded-[2.5rem] bg-[#1a1a1a] p-2 shadow-2xl ring-1 ring-black/10 sm:rounded-[3rem] sm:p-2.5">
        {/* Notch */}
        <div className="absolute left-1/2 top-0 z-10 h-5 w-20 -translate-x-1/2 rounded-b-xl bg-[#1a1a1a] sm:h-6 sm:w-24 sm:rounded-b-2xl" />
        {/* Screen */}
        <div className="relative aspect-[9/19] overflow-hidden rounded-[2rem] bg-gradient-to-b from-gray-50 to-gray-100 sm:rounded-[2.5rem]">
          {!imageError ? (
            <Image
              src={imageSrc}
              alt={alt}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 240px, (max-width: 768px) 280px, 300px"
              onError={() => setImageError(true)}
            />
          ) : (
            // Placeholder when image is not available
            <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center">
              {Icon && (
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FF1E00]/10">
                  <Icon className="h-8 w-8 text-[#FF1E00]" />
                </div>
              )}
              <p className="text-sm font-medium text-gray-500">
                {title || "Screenshot coming soon"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Feature Showcase Section with Rotating Mockups
function FeatureShowcaseSectionAnimated() {
  const [currentFeature, setCurrentFeature] = useState(0);

  const feature = featureShowcase[currentFeature];
  const Icon = feature?.icon || Video;

  return (
    <section id="features" className="bg-white pb-16 pt-16 sm:pb-20 sm:pt-20 md:pb-24 md:pt-24 lg:pb-32 lg:pt-32">
      <div className="mx-auto max-w-[1920px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 text-center sm:mb-14 md:mb-16">
          <h2
            className="mb-3 font-semibold text-[#222222] sm:mb-4"
            style={{ fontSize: "clamp(1.5rem, 2.5vw + 1rem, 2.5rem)" }}
          >
            Features that actually matter
          </h2>
          <p className="mx-auto max-w-2xl px-4 text-base text-[#717171] sm:text-lg">
            AI-powered recipe import. Real-time grocery prices. Guided cooking mode.
            Everything you need to cook better and spend less.
          </p>
        </div>

        {/* Feature Showcase Container */}
        <div className="flex flex-col items-stretch gap-8 lg:flex-row lg:gap-0">
          {/* Phone Mockup Container - Left Side (50%) */}
          <div className="flex w-full justify-center lg:w-1/2">
            <div className="relative w-full overflow-hidden rounded-[2rem] bg-[#f5f5f7] sm:rounded-[2.5rem] lg:rounded-r-[2.5rem]" style={{ minHeight: '500px' }}>
              {/* Phone Mockup - Positioned to show top half, centered horizontally */}
              <div className="absolute left-1/2 top-[35%] -translate-x-1/2 scale-110 sm:top-[30%] sm:scale-125 md:scale-130">
                <FeatureMockup
                  imageSrc={feature?.mockupImage || ""}
                  alt={`${feature?.title || "Feature"} screenshot`}
                  icon={Icon}
                  title={feature?.title}
                />
              </div>
            </div>
          </div>

          {/* Feature Content - Right Side (50%) */}
          <div className="flex w-full flex-col justify-center px-4 sm:px-6 lg:w-1/2 lg:px-10 xl:px-16">
            {/* Feature Title */}
            <h3
              className="mb-4 font-semibold text-[#222222] sm:mb-5"
              style={{ fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.75rem)" }}
            >
              {feature?.title}
            </h3>

            {/* Description */}
            <p className="mb-5 text-base leading-relaxed text-[#717171] sm:mb-6 sm:text-lg">
              {feature?.description}
            </p>

            {/* Bullet Points */}
            <ul className="mb-8 space-y-3 sm:mb-10 sm:space-y-4">
              {feature?.bullets.map((bullet, bulletIndex) => (
                <li key={bulletIndex} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#FF1E00]/10">
                    <Check className="h-3 w-3 text-[#FF1E00]" strokeWidth={3} />
                  </div>
                  <span className="text-sm text-[#222222] sm:text-base">
                    {bullet}
                  </span>
                </li>
              ))}
            </ul>

            {/* Feature Navigation List */}
            <div className="space-y-2 sm:space-y-3">
              {featureShowcase.map((f, index) => {
                const isActive = currentFeature === index;
                return (
                  <button
                    key={index}
                    onClick={() => setCurrentFeature(index)}
                    className={`w-full rounded-xl px-4 py-3 text-left transition-all duration-200 sm:rounded-2xl sm:px-5 sm:py-4 ${
                      isActive
                        ? "bg-white ring-2 ring-[#E5E5E5] shadow-sm"
                        : "bg-transparent hover:bg-gray-50"
                    }`}
                    type="button"
                  >
                    <span className={`text-sm font-semibold sm:text-base ${
                      isActive ? "text-[#222222]" : "text-[#717171]"
                    }`}>
                      {f.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Animated Features Section Component (Grid version - kept as backup)
function FeaturesSectionAnimated() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const containerWidth = container.clientWidth;
      const cardWidth = containerWidth; // First card is full width
      const otherCardWidth = containerWidth * 0.85; // Other cards are 85vw

      // Calculate which card is currently in view
      let currentIndex = 0;

      if (scrollLeft < cardWidth * 0.5) {
        currentIndex = 0;
      } else {
        currentIndex =
          Math.round(
            (scrollLeft - cardWidth + otherCardWidth * 0.5) /
              (otherCardWidth + 16),
          ) + 1;
        currentIndex = Math.min(currentIndex, features.length - 1);
      }

      setActiveIndex(currentIndex);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="pb-12 sm:pb-16 md:pb-20 lg:pb-28">
      <div
        className="mx-auto max-w-[1920px] px-4 sm:px-6 lg:px-8"
        style={{ containerType: "inline-size" }}
      >
        <div className="mb-10 text-center sm:mb-12 md:mb-16">
          <h2
            className="mb-2 font-semibold text-[#222222] sm:mb-3"
            style={{ fontSize: "clamp(1.25rem, 2vw + 0.75rem, 1.875rem)" }}
          >
            Features that actually matter
          </h2>
          <p className="mx-auto max-w-xl px-4 text-sm text-[#717171] sm:text-base">
            AI-powered recipe import. Real-time grocery prices. Guided cooking mode.
            Everything you need to cook better and spend less.
          </p>
        </div>

        {/* Mobile: simple stacked list */}
        <div className="space-y-4 sm:hidden">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="rounded-2xl border border-[#E5E5E5] bg-white p-6"
              >
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-gray-100">
                    <Icon className="h-4 w-4 text-gray-700" />
                  </div>
                  <h3
                    className="flex-1 text-lg font-semibold leading-tight text-[#222222]"
                    style={{ fontSize: "clamp(1rem, 4vw, 1.125rem)" }}
                  >
                    {feature.title}
                  </h3>
                </div>
                <p
                  className="text-sm leading-relaxed text-[#717171]"
                  style={{ fontSize: "clamp(0.875rem, 3.5vw, 0.9375rem)" }}
                >
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Tablet and Desktop: Grid layout */}
        <div className="hidden gap-6 sm:grid sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="rounded-2xl border border-[#E5E5E5] bg-white p-6 sm:p-8"
              >
                <div className="mb-4 flex items-center gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-gray-100">
                    <Icon className="h-5 w-5 text-gray-700" />
                  </div>
                  <h3 className="flex-1 text-xl font-semibold leading-tight text-[#222222] sm:text-2xl">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-base leading-relaxed text-[#717171]">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Animated Tablet Preview Section
function TabletPreviewSectionAnimated() {
  return (
    <section className="pb-16 sm:pb-20 md:pb-24 lg:pb-32">
      <div className="mx-auto max-w-[1920px] px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center sm:mb-12 md:mb-14">
          <h2
            className="mb-3 font-semibold text-[#222222] sm:mb-4"
            style={{ fontSize: "clamp(1.5rem, 2.5vw + 1rem, 2.5rem)" }}
          >
            Access Gruby wherever you go
          </h2>
          <p className="mx-auto max-w-2xl px-4 text-base text-[#717171] sm:text-lg">
            Available on all your devices
          </p>
        </div>

        <div
          className="relative w-full overflow-hidden rounded-2xl sm:rounded-3xl"
          style={{ aspectRatio: "16/9", maxHeight: "650px" }}
        >
          <Image
            src="/GrubyWatch.png"
            alt="Gruby Watch"
            fill
            className="rounded-2xl object-cover sm:rounded-3xl"
            priority
            quality={100}
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, (max-width: 1280px) 100vw, (max-width: 1920px) 1920px, 1920px"
          />
        </div>
      </div>
    </section>
  );
}

// Animated Benefits Section
function BenefitsSectionAnimated() {
  return (
    <section id="how-it-works" className="pb-16 sm:pb-20 md:pb-24 lg:pb-32">
      <div className="mx-auto max-w-[1920px] px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center sm:mb-14 md:mb-16">
          <h2
            className="mb-3 font-semibold text-[#222222] sm:mb-4"
            style={{ fontSize: "clamp(1.5rem, 2.5vw + 1rem, 2.5rem)" }}
          >
            Why cook with Gruby?
          </h2>
          <p className="mx-auto max-w-2xl px-4 text-base text-[#717171] sm:text-lg">
            Because scrolling DoorDash at 8pm isn't a personality trait. But saving $3,600 a year? That's a flex.
          </p>
        </div>

        <div className="mb-12 grid grid-cols-1 gap-6 sm:mb-16 sm:grid-cols-2 sm:gap-8 md:mb-20 md:grid-cols-3">
          {benefits.map((benefit, index) => (
            <div key={index} className="px-4 text-center">
              <p className="mb-2 text-3xl font-bold text-[#FF1E00] sm:text-4xl">
                {benefit.stats}
              </p>
              <p className="mb-3 text-xs uppercase tracking-wide text-[#717171] sm:mb-4">
                {benefit.statLabel}
              </p>
              <h3 className="mb-2 text-base font-semibold text-[#222222] sm:text-lg">
                {benefit.title}
              </h3>
              <p className="text-sm leading-relaxed text-[#717171]">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Animated About Section
function AboutSectionAnimated() {
  return (
    <section
      id="about"
      className="pb-16 pt-16 sm:pb-20 sm:pt-20 md:pb-24 md:pt-24 lg:pb-32 lg:pt-32"
    >
      <div className="mx-auto max-w-[1920px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-4xl text-center sm:mb-14 md:mb-16">
          <h2
            className="mb-4 font-semibold text-[#222222] sm:mb-6"
            style={{ fontSize: "clamp(1.5rem, 2.5vw + 1rem, 2.5rem)" }}
          >
            About Gruby
          </h2>
          <p className="text-base leading-relaxed text-[#717171] sm:text-lg md:text-xl">
            Gruby is your AI-powered kitchen companion. Import recipes from TikTok, YouTube, or any website. Get real-time grocery prices. Cook with step-by-step guidance. Track your savings. Share your wins with a community of real home cooks — not influencers with sponsored content. Just people who actually love to cook.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 sm:gap-10 md:grid-cols-3 md:gap-12">
          {values.map((value, index) => (
            <div key={index} className="text-center">
              <h3 className="mb-3 text-xl font-semibold leading-tight text-[#222222] sm:mb-4 sm:text-2xl">
                {value.title}
              </h3>
              <p className="text-base leading-relaxed text-[#717171]">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Animated CTA Section
function CTASectionAnimated({
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
      id="beta-signup"
      className="bg-[#1a1a1a] pt-12 sm:pt-16 md:pt-20 lg:pt-28"
    >
      <div className="mx-auto max-w-[1920px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-col items-center justify-between gap-8 sm:gap-12 lg:flex-col lg:items-center lg:gap-12">
            {/* Content - Top on mobile, left on desktop */}
            <div className="order-1 w-full flex-1 text-center lg:text-center">
              <h2 className="mb-3 text-xl font-semibold text-white sm:mb-4 sm:text-2xl md:text-3xl">
                Ready to cook smarter?
              </h2>
              <p className="mb-6 text-sm text-gray-400 sm:mb-8 sm:text-base">
                Join thousands of home cooks who are saving money, eating better, and actually enjoying cooking.
              </p>

              {isSubmitted ? (
                <div className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
                  <p className="mb-2 font-medium text-white">
                    You&apos;re on the list!
                  </p>
                  <p className="text-sm text-gray-400">
                    We&apos;ll notify {email} when Gruby launches.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleBetaSignup}
                  className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center"
                >
                  <input
                    type="email"
                    value={localEmail}
                    onChange={(e) => setLocalEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="h-[42px] flex-1 rounded-full bg-white px-4 py-2.5 text-sm leading-normal text-[#222222] placeholder-[#717171] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#FF1E00] sm:h-[44px] sm:py-3 sm:text-base"
                    disabled={isSubmitting}
                  />
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="h-[42px] whitespace-nowrap rounded-full bg-[#FF1E00] px-6 py-2.5 text-sm font-medium leading-normal text-white transition-colors duration-200 hover:bg-[#E01A00] disabled:opacity-50 sm:h-[44px] sm:py-3 sm:text-base"
                  >
                    {isSubmitting ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      "Join"
                    )}
                  </Button>
                </form>
              )}
              {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
            </div>

            {/* Image area - Bottom on mobile, right on desktop */}
            <div className="order-2 flex w-full flex-shrink-0 justify-center lg:w-auto lg:justify-end">
              {/* Image placeholder - will be positioned here if needed */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Animated Comparison Section
function ComparisonSectionAnimated({
  comparisons,
  isLoading: _isLoading,
}: {
  comparisons: MealComparison[];
  isLoading: boolean;
}) {
  return (
    <section
      id="comparison"
      className="bg-[#f5f5f7] pb-12 pt-12 sm:pb-16 sm:pt-16 md:pb-20 md:pt-20 lg:pb-28 lg:pt-28"
    >
      <div className="mx-auto max-w-[1920px] px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header Section */}
        <div className="mb-8 text-center sm:mb-10 md:mb-14">
          <h2
            className="mx-auto mb-3 max-w-3xl px-4 font-bold leading-tight text-[#222222] sm:mb-4"
            style={{ fontSize: "clamp(1.5rem, 3vw + 1rem, 3rem)" }}
          >
            Spoiler: You&apos;re paying{" "}
            <span className="text-[#FF1E00]">3x more</span> for the same meal.
          </h2>
          <p
            className="mx-auto mb-2 max-w-2xl px-4 font-medium text-[#717171] sm:mb-3"
            style={{ fontSize: "clamp(1.125rem, 1.5vw + 0.875rem, 1.5rem)" }}
          >
            That $24 restaurant meal? The ingredients cost $8. The rest is
            markup, fees, and tip.
          </p>
          <p className="mx-auto max-w-xl px-4 text-sm text-[#999999]">
            Live prices from major retailers
          </p>
        </div>

        <div className="space-y-4 sm:space-y-6">
          {comparisons.map((comparison, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5 sm:rounded-2xl"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12">
                {/* Image */}
                <div className="relative h-40 sm:h-48 lg:col-span-3 lg:h-auto">
                  <Image
                    src={comparison.image}
                    alt={comparison.meal}
                    fill
                    className="object-cover"
                    loading={index < 2 ? "eager" : "lazy"}
                    sizes="(max-width: 1024px) 100vw, 25vw"
                    quality={100}
                    fetchPriority={index < 2 ? "high" : "auto"}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent lg:bg-gradient-to-t" />
                  <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 lg:bottom-6 lg:left-6">
                    <h3 className="text-lg font-semibold text-white sm:text-xl">
                      {comparison.meal}
                    </h3>
                  </div>
                </div>

                {/* Comparison Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:col-span-9">
                  {/* Eating Out - The "bad" option */}
                  <div className="border-b border-gray-200 bg-white p-4 sm:p-6 md:border-b-0 md:border-r md:p-8">
                    <div className="mb-4 flex items-center justify-between sm:mb-6">
                      <div className="min-w-0 flex-1 pr-2">
                        <p className="mb-0.5 text-xs font-medium text-[#222222] sm:text-sm">
                          Eating Out
                        </p>
                        <p className="text-[10px] leading-tight text-[#717171] sm:text-xs">
                          1 serving • wait time • inconsistent quality
                        </p>
                      </div>
                      <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:h-8 sm:w-8">
                        <X
                          className="h-3.5 w-3.5 text-red-600 sm:h-4 sm:w-4"
                          strokeWidth={2.5}
                        />
                      </div>
                    </div>

                    <div className="mb-3 space-y-1.5 text-xs sm:mb-4 sm:space-y-2 sm:text-sm">
                      <div className="flex justify-between">
                        <span className="text-[#717171]">Food</span>
                        <span className="text-[#222222]">
                          ${comparison.delivery.price.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#717171]">
                          Fees & service charges
                        </span>
                        <span className="text-[#222222]">
                          ${comparison.delivery.fees.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#717171]">Tip</span>
                        <span className="text-[#222222]">
                          ${comparison.delivery.tip.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-3 sm:pt-4">
                      <div className="flex min-h-[3rem] items-end justify-between sm:min-h-[3.5rem]">
                        <span className="text-xs font-medium text-[#222222] sm:text-sm">
                          Your total
                        </span>
                        <span className="text-xl font-bold text-[#222222] sm:text-2xl">
                          ${comparison.delivery.total.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Home Cooking - The "good" option */}
                  <div className="bg-white p-4 sm:p-6 md:p-8">
                    <div className="mb-4 flex items-center justify-between sm:mb-6">
                      <div className="min-w-0 flex-1 pr-2">
                        <p className="mb-0.5 text-xs font-medium text-[#222222] sm:text-sm">
                          Home cooked
                        </p>
                        <p className="text-[10px] leading-tight text-[#717171] sm:text-xs">
                          {comparison.homeCooked.servings} servings • fresh •
                          actually hot
                        </p>
                      </div>
                      <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:h-8 sm:w-8">
                        <Check
                          className="h-3.5 w-3.5 text-[#16A34A] sm:h-4 sm:w-4"
                          strokeWidth={2.5}
                        />
                      </div>
                    </div>

                    <div className="mb-3 sm:mb-4">
                      <p className="mb-1.5 text-[10px] text-[#717171] sm:mb-2 sm:text-xs">
                        What you&apos;ll need:
                      </p>
                      <div className="flex flex-wrap gap-1 sm:gap-1.5">
                        {comparison.homeCooked.ingredients.map((ing, i) => (
                          <span
                            key={i}
                            className="rounded bg-white px-1.5 py-0.5 text-[10px] text-[#222222] ring-1 ring-black/5 sm:px-2 sm:text-xs"
                          >
                            {ing}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mb-3 space-y-1.5 text-xs sm:mb-4 sm:space-y-2 sm:text-sm">
                      <div className="flex justify-between">
                        <span className="text-[#717171]">
                          Groceries (for {comparison.homeCooked.servings})
                        </span>
                        <span className="text-[#222222]">
                          {comparison.homeCooked.loading ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin sm:h-4 sm:w-4" />
                          ) : (
                            `$${comparison.homeCooked.price.toFixed(2)}`
                          )}
                        </span>
                      </div>
                    </div>

                    <div className="flex min-h-[3rem] flex-col justify-end space-y-1.5 border-t border-gray-200 pt-3 sm:min-h-[3.5rem] sm:space-y-2 sm:pt-4">
                      <div className="flex items-baseline justify-between">
                        <span className="text-xs text-[#717171] sm:text-sm">
                          Hidden fees
                        </span>
                        <span className="text-xs text-[#222222] sm:text-sm">
                          $0.00
                        </span>
                      </div>
                      <div className="flex items-baseline justify-between">
                        <span className="text-xs font-medium text-[#222222] sm:text-sm">
                          Per serving
                        </span>
                        <span className="text-xl font-bold text-[#222222] sm:text-2xl">
                          {comparison.homeCooked.loading ? (
                            <Loader2 className="h-4 w-4 animate-spin sm:h-5 sm:w-5" />
                          ) : (
                            `$${comparison.homeCooked.perServing.toFixed(2)}`
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Savings Strip */}
              <div className="flex flex-col items-center justify-between gap-2 bg-[#222222] px-4 py-3 sm:flex-row sm:gap-3 sm:px-6 sm:py-4 md:px-8">
                <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start sm:gap-4">
                  <p className="text-xs text-white/70 sm:text-sm">You keep</p>
                  <p className="text-xl font-bold text-white sm:text-2xl">
                    {comparison.homeCooked.loading ? (
                      <Loader2 className="h-4 w-4 animate-spin text-white sm:h-5 sm:w-5" />
                    ) : (
                      `$${comparison.savings.toFixed(2)}`
                    )}
                  </p>
                  {!comparison.homeCooked.loading && (
                    <span className="rounded bg-[#16A34A] px-1.5 py-0.5 text-[10px] font-semibold text-white sm:px-2 sm:text-xs">
                      Save {comparison.savingsPercent}%
                    </span>
                  )}
                </div>
                <p className="text-center text-xs text-white/70 sm:text-left sm:text-sm">
                  + {comparison.homeCooked.servings - 1} extra meals for
                  tomorrow
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-8 rounded-xl bg-[#FF1E00] p-6 text-center text-white sm:mt-10 sm:rounded-2xl sm:p-8 md:mt-12 md:p-10">
          <h3 className="mb-2 text-lg font-semibold sm:mb-3 sm:text-xl md:text-2xl">
            Keep your money. Skip the plastic.
          </h3>
          <p className="mx-auto mb-6 max-w-lg px-4 text-sm text-white/90 sm:mb-8 sm:text-base">
            Every delivery order = fees, markup, and a pile of packaging. Cook at home with Gruby and keep the difference.
          </p>
          <div className="mx-auto grid max-w-md grid-cols-3 gap-4 sm:gap-6">
            <div>
              <p className="mb-1 text-xl font-bold sm:text-2xl md:text-3xl">
                $300+
              </p>
              <p className="text-[10px] text-white/80 sm:text-xs">
                Back in your pocket
              </p>
            </div>
            <div>
              <p className="mb-1 text-xl font-bold sm:text-2xl md:text-3xl">
                4x
              </p>
              <p className="text-[10px] text-white/80 sm:text-xs">More food</p>
            </div>
            <div>
              <p className="mb-1 text-xl font-bold sm:text-2xl md:text-3xl">
                0
              </p>
              <p className="text-[10px] text-white/80 sm:text-xs">
                Hidden fees
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function MarketingPage() {
  const dispatch = useAppDispatch();
  const { email, isSubmitting, isSubmitted, error } = useAppSelector(
    (state) => state.beta,
  );
  const _waitlistModalOpen = useAppSelector(
    (state) => state.ui.waitlistModalOpen,
  );
  const [localEmail, setLocalEmail] = useState("");
  const [comparisons, setComparisons] = useState<MealComparison[]>(
    initialMealComparisons,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [footerEmail, setFooterEmail] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % appSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    async function fetchPrices() {
      setIsLoading(true);
      const updatedComparisons = await Promise.all(
        initialMealComparisons.map(async (comparison) => {
          try {
            const mealData = await calculateMealPrice(
              comparison.homeCooked.ingredients,
            );
            const _perServing = mealData.perServing;
            const total = mealData.total;

            const finalTotal =
              total > 0
                ? total
                : comparison.homeCooked.ingredients.length * 3.5;
            const finalPerServing = finalTotal / 4;
            const savings = comparison.delivery.total - finalPerServing;
            const savingsPercent = Math.round(
              (savings / comparison.delivery.total) * 100,
            );

            return {
              ...comparison,
              homeCooked: {
                ...comparison.homeCooked,
                price: finalTotal,
                perServing: finalPerServing,
                loading: false,
              },
              savings,
              savingsPercent,
            };
          } catch (error) {
            console.error(
              `Error fetching prices for ${comparison.meal}:`,
              error,
            );
            const estimatedPrice =
              comparison.homeCooked.ingredients.length * 3.5;
            const perServing = estimatedPrice / 4;
            const savings = comparison.delivery.total - perServing;
            const savingsPercent = Math.round(
              (savings / comparison.delivery.total) * 100,
            );

            return {
              ...comparison,
              homeCooked: {
                ...comparison.homeCooked,
                price: estimatedPrice,
                perServing,
                loading: false,
              },
              savings,
              savingsPercent,
            };
          }
        }),
      );

      setComparisons(updatedComparisons);
      setIsLoading(false);
    }

    fetchPrices();
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

        :root {
          --color-primary: #ff1e00;
          --color-primary-hover: #e01a00;
          --color-text: #222222;
          --color-text-secondary: #717171;
          --color-border: #e5e5e5;
          --color-surface: #f5f5f7;
          --color-success: #16a34a;
        }

        * {
          font-family:
            "Inter",
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            Roboto,
            sans-serif;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          font-family:
            "Aeonik Pro",
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            Roboto,
            sans-serif !important;
        }
      `}</style>

      <div className="flex min-h-screen flex-col bg-white">
        {/* Hero Section */}
        <div className="relative -mt-32 h-[680px] overflow-hidden pt-32 sm:h-[550px] md:h-[650px] lg:h-[750px]">
          <div className="absolute inset-0">
            <Image
              src="/HeroImage.jpg"
              alt="Hero background"
              fill
              priority
              quality={100}
              className="object-cover"
              style={{ filter: "brightness(0.7)" }}
              sizes="100vw"
              fetchPriority="high"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
          <div className="relative z-10 mx-auto flex h-full max-w-[1920px] flex-col items-start justify-end px-4 pb-16 sm:justify-center sm:px-6 sm:pb-0 lg:px-8">
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
                We got food at home. Paste any recipe link, get real grocery prices, and cook with AI-powered guidance.
              </p>
              <div className="relative z-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    dispatch(setWaitlistModalOpen(true));
                  }}
                  className="inline-flex h-[42px] items-center justify-center rounded-full bg-[#FF1E00] px-6 text-sm font-medium text-white transition-colors duration-200 hover:bg-[#E01A00] sm:h-[44px] sm:text-base"
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
                      element.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }
                  }}
                  className="inline-flex h-[42px] items-center justify-center rounded-full border-2 border-white bg-transparent px-6 text-sm font-medium text-white transition-all duration-200 hover:border-white hover:bg-white/20 hover:text-white sm:h-[44px] sm:text-base"
                >
                  Explore Features
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* App Preview Section */}
        <AppPreviewSectionAnimated
          currentSlide={currentSlide}
          setCurrentSlide={setCurrentSlide}
        />

        {/* Features Section with Mockups */}
        <FeatureShowcaseSectionAnimated />

        {/* Tablet Preview Section */}
        <TabletPreviewSectionAnimated />

        {/* Benefits Section */}
        <BenefitsSectionAnimated />

        {/* Comparison Section - Redesigned */}
        <ComparisonSectionAnimated
          comparisons={comparisons}
          isLoading={isLoading}
        />

        {/* About Section */}
        <AboutSectionAnimated />

        {/* CTA Section */}
        <CTASectionAnimated
          localEmail={localEmail}
          setLocalEmail={setLocalEmail}
          handleBetaSignup={handleBetaSignup}
          isSubmitting={isSubmitting}
          error={error}
          isSubmitted={isSubmitted}
          email={email}
        />

        {/* Footer */}
        <footer className="border-t border-[#E5E5E5] bg-white">
          <div className="mx-auto max-w-[1920px] px-4 py-8 sm:px-6 sm:py-10 md:py-12 lg:px-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 md:grid-cols-5">
              <div className="col-span-1 sm:col-span-2 md:col-span-1">
                <Image
                  src="/GrubyLogo.svg"
                  alt="Gruby Logo"
                  width={100}
                  height={36}
                  className="mb-3 sm:mb-4"
                />
                <p className="text-xs text-[#717171] sm:text-sm">
                  Your AI-powered kitchen companion. Import recipes, get real prices, cook like a pro.
                </p>
              </div>

              <div>
                <h3 className="mb-3 text-xs font-semibold text-[#222222] sm:mb-4 sm:text-sm">
                  Support
                </h3>
                <ul className="space-y-2 text-xs sm:space-y-3 sm:text-sm">
                  <li>
                    <Link
                      href="/faq"
                      className="text-[#717171] transition-colors hover:text-[#222222]"
                    >
                      FAQ
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/media-kit"
                      className="text-[#717171] transition-colors hover:text-[#222222]"
                    >
                      Media Kit
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/logos"
                      className="text-[#717171] transition-colors hover:text-[#222222]"
                    >
                      Logos & Assets
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="mb-3 text-xs font-semibold text-[#222222] sm:mb-4 sm:text-sm">
                  Legal
                </h3>
                <ul className="space-y-2 text-xs sm:space-y-3 sm:text-sm">
                  <li>
                    <Link
                      href="/terms"
                      className="text-[#717171] transition-colors hover:text-[#222222]"
                    >
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/privacy"
                      className="text-[#717171] transition-colors hover:text-[#222222]"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/cookies"
                      className="text-[#717171] transition-colors hover:text-[#222222]"
                    >
                      Cookie Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/dmca"
                      className="text-[#717171] transition-colors hover:text-[#222222]"
                    >
                      DMCA Policy
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="mb-3 text-xs font-semibold text-[#222222] sm:mb-4 sm:text-sm">
                  Community
                </h3>
                <ul className="space-y-2 text-xs sm:space-y-3 sm:text-sm">
                  <li>
                    <Link
                      href="/community-guidelines"
                      className="text-[#717171] transition-colors hover:text-[#222222]"
                    >
                      Community Guidelines
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/accessibility"
                      className="text-[#717171] transition-colors hover:text-[#222222]"
                    >
                      Accessibility
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="mb-3 text-xs font-semibold text-[#222222] sm:mb-4 sm:text-sm">
                  Newsletter
                </h3>
                <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                  <input
                    type="email"
                    value={footerEmail}
                    onChange={(e) => setFooterEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full rounded-full border-0 bg-[#f5f5f7] px-3 py-2 text-xs transition-shadow focus:outline-none focus:ring-2 focus:ring-[#FF1E00] sm:px-4 sm:py-2.5 sm:text-sm md:py-3 md:text-base"
                    required
                  />
                  <button
                    type="submit"
                    className="h-[44px] w-full rounded-full bg-[#FF1E00] px-4 text-xs font-medium text-white transition-colors duration-200 hover:bg-[#E01A00] sm:h-[46px] sm:text-sm md:h-[48px] md:text-base"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="border-t border-[#E5E5E5]">
            <div className="mx-auto max-w-[1920px] px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
              <p className="text-center text-xs text-[#717171] sm:text-sm">
                © {new Date().getFullYear()} Gruby. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
