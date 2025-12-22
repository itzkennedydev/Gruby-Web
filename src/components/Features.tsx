"use client";

import { useState } from "react";
import Image from "next/image";

// Chevron icon for explore button
const ChevronIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
    <path
      d="M9 18L15 12L9 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Play icon small (for corner button)
const PlayIconSmall = () => (
  <svg viewBox="0 0 10 12" fill="white" width="10" height="12">
    <path d="M0.319 0.08C0.515 -0.03 0.756 -0.026 0.949 0.09L9.699 5.403C9.886 5.516 10 5.719 10 5.937C10 6.156 9.886 6.358 9.699 6.472L0.949 11.784C0.756 11.901 0.515 11.905 0.318 11.795C0.122 11.684 0 11.476 0 11.25L0 0.625C0 0.399 0.122 0.191 0.319 0.08Z" />
  </svg>
);

// Play icon large (for center button)
const PlayIconLarge = () => (
  <svg viewBox="0 0 24 28.5" fill="black" width="24" height="28">
    <path d="M0.765 0.193C1.237 -0.073 1.815 -0.064 2.279 0.217L23.279 12.967C23.727 13.239 24.001 13.725 24.001 14.25C24.001 14.774 23.727 15.26 23.279 15.532L2.279 28.282C1.815 28.563 1.236 28.573 0.764 28.307C0.292 28.041 0 27.541 0 27L0 1.5C0 0.958 0.293 0.459 0.765 0.193Z" />
  </svg>
);

// External link arrow icon
const ExternalArrowIcon = () => (
  <svg viewBox="0 0 20 21" fill="none" width="20" height="21">
    <path
      d="M5.83331 14.6667L14.1666 6.33337"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.83331 6.33337H14.1666V14.6667"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const tabs = [
  { id: "import", label: "Recipe Import", subtitle: "Paste any link" },
  { id: "prices", label: "Grocery Prices", subtitle: "Real-time costs" },
  { id: "cooking", label: "Cooking Mode", subtitle: "Step-by-step" },
  { id: "stories", label: "Stories", subtitle: "Share your wins" },
  { id: "ai-coach", label: "AI Coach", subtitle: "Ask anything" },
  { id: "pantry", label: "Pantry", subtitle: "Zero waste" },
];

const tabImages: Record<string, string> = {
  import: "/mockups/recipe-import.png",
  prices: "/mockups/grocery-prices.png",
  cooking: "/mockups/cooking-mode.png",
  stories: "/mockups/stories.png",
  "ai-coach": "/mockups/ai-coach.png",
  pantry: "/mockups/pantry.png",
};

export default function Features() {
  const [activeTab, setActiveTab] = useState("import");

  return (
    <section
      id="features"
      className="features-section"
      style={{
        display: "flex",
        flexDirection: "column",
        flex: "none",
        placeContent: "center flex-start",
        alignItems: "center",
        gap: "48px",
        width: "100%",
        height: "min-content",
        padding: "80px 0",
        position: "relative",
        overflow: "visible",
      }}
    >
      {/* Interactive Demo - wrapper for consistent padding */}
      <div
        style={{
          width: "100%",
          maxWidth: "1540px",
          padding: "0 16px",
        }}
      >
        <div
          className="features-demo"
          style={{
            width: "100%",
            height: "720px",
            backgroundColor: "rgb(249, 248, 248)",
            borderRadius: "16px",
            position: "relative",
            overflow: "hidden",
            backdropFilter: "blur(6px)",
          }}
        >
          {/* Main image */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: "inherit",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(135deg, #f5f5f7 0%, #e8e8ed 100%)",
            }}
          >
            <Image
              src={tabImages[activeTab]}
              alt="Feature demo"
              fill
              style={{
                objectFit: "cover",
                objectPosition: "center top",
                borderRadius: "inherit",
              }}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
              }}
            />
          </div>

          {/* Video overlay with hover state */}
          <div
            className="features-video-overlay group"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backdropFilter: "blur(0px)",
              backgroundColor: "rgba(0, 0, 0, 0)",
              transition: "all 0.3s ease",
              cursor: "pointer",
            }}
          >
            {/* Center play button and View Demo - shown on hover */}
            <div
              className="features-center-controls"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "16px",
                opacity: 0,
                transition: "opacity 0.3s ease",
              }}
            >
              {/* Large circular play button */}
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  backgroundColor: "rgb(255, 255, 255)",
                  borderRadius: "999px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "6px solid rgba(0, 0, 0, 0.1)",
                  boxShadow:
                    "rgba(0, 0, 0, 0.18) 0px 0.602187px 0.602187px -1.25px, rgba(0, 0, 0, 0.16) 0px 2.28853px 2.28853px -2.5px, rgba(0, 0, 0, 0.06) 0px 10px 10px -3.75px",
                }}
              >
                <PlayIconLarge />
              </div>

              {/* View Demo button */}
              <button
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 12px 8px 16px",
                  backgroundColor: "rgb(255, 255, 255)",
                  borderRadius: "13px",
                  border: "none",
                  boxShadow:
                    "rgba(0, 0, 0, 0.12) 0px 1px 2px 0px, rgba(0, 0, 0, 0.04) 0px 2px 8px 0px",
                  cursor: "pointer",
                }}
              >
                <p
                  style={{
                    letterSpacing: "-0.01em",
                    lineHeight: "24px",
                    color: "rgb(0, 0, 0)",
                  }}
                >
                  Watch Demo
                </p>
                <div style={{ color: "black" }}>
                  <ExternalArrowIcon />
                </div>
              </button>
            </div>
          </div>

          {/* Tabs bar container */}
          <div
            className="features-tabs-container"
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              padding: "24px",
              width: "100%",
            }}
          >
            {/* Desktop tabs */}
            <div
              className="features-tabs features-tabs-desktop"
              style={{
                display: "flex",
                flexDirection: "row",
                flex: "1 0 0",
                width: "1px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  backgroundColor: "rgb(0, 0, 0)",
                  borderRadius: "16px",
                  padding: "8px",
                  gap: "4px",
                }}
              >
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      padding: "8px 16px",
                      borderRadius: "12px",
                      border: "none",
                      backgroundColor:
                        activeTab === tab.id
                          ? "rgba(255, 255, 255, 0.15)"
                          : "transparent",
                      cursor: "pointer",
                      transition: "background-color 0.2s",
                    }}
                  >
                    <p
                      style={{
                        fontWeight: 600,
                        fontSize: "clamp(0.8125rem, 0.75rem + 0.3vw, 1rem)",
                        color: "rgb(255, 255, 255)",
                        opacity: activeTab === tab.id ? 1 : 0.5,
                        textAlign: "center",
                      }}
                    >
                      {tab.label}
                    </p>
                    <p
                      style={{
                        fontWeight: 600,
                        fontSize: "clamp(0.6875rem, 0.65rem + 0.2vw, 0.875rem)",
                        color: "rgba(255, 255, 255, 0.5)",
                        opacity: activeTab === tab.id ? 1 : 0.5,
                        textAlign: "center",
                      }}
                    >
                      {tab.subtitle}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile dropdown */}
            <div
              className="features-tabs-mobile"
              style={{ display: "none", width: "100%" }}
            >
              <select
                value={activeTab}
                onChange={(e) => setActiveTab(e.target.value)}
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  backgroundColor: "rgb(0, 0, 0)",
                  color: "rgb(255, 255, 255)",
                  border: "none",
                  borderRadius: "16px",
                  fontSize: "16px",
                  fontWeight: 600,
                  cursor: "pointer",
                  appearance: "none",
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 16px center",
                  paddingRight: "40px",
                }}
              >
                {tabs.map((tab) => (
                  <option key={tab.id} value={tab.id}>
                    {tab.label} - {tab.subtitle}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
