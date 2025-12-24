"use client";

import { useRef, useState, useEffect } from "react";

const caseStudies = [
  {
    name: "Kennedy M.",
    tagline: "Gruby Founder/College Student",
    videoSrc:
      "https://framerusercontent.com/assets/FZPLFPptCKG59IZKD5USBywVzs8.mp4",
    posterSrc: "/KennedyHero2.webp",
    posterPosition: "right",
    quote:
      '"I built this because I kept paying $18 for a burrito bowl that costs $6 to make. We all know convenience costs extra, but 3x the price? I want people to see what that convenience is actually costing them."',
    highlight: "We all know convenience costs extra, but 3x the price?",
    ctaText: "Save on groceries",
  },
  {
    name: "Carson K.",
    tagline: "College Student",
    videoSrc:
      "https://framerusercontent.com/assets/tdYuQuj3hfC9WmQtuSzoIuzqZjA.mp4",
    posterSrc: "/CarsonK.webp",
    quote:
      '"I was spending like $400 a month on delivery apps. Started using this to meal prep on Sundays and now I spend maybe $180 total. Crazy how much you save when you actually cook."',
    highlight: "Crazy how much you save when you actually cook.",
    ctaText: "Start meal prepping",
  },
  {
    name: "Maria S.",
    tagline: "Single Parent",
    videoSrc:
      "https://framerusercontent.com/assets/PhEaJ5dFs4rUIGQkAeHC3YvY.mp4",
    posterSrc: "",
    quote:
      '"With two kids and work, I thought I didn\'t have time to cook. But comparing prices showed me I was overpaying so much. Switching stores alone saves me like $70 a week. That adds up fast."',
    ctaText: "Compare prices",
  },
  {
    name: "David L.",
    tagline: "Never Cooked Before",
    videoSrc:
      "https://framerusercontent.com/assets/GbKzCOnk9Xq3skJhcQYX6cjn2o.mp4",
    posterSrc: "",
    quote:
      '"Honestly never cooked anything real before this. The instructions are so easy to follow. Made chicken tikka masala last week and it came out better than the restaurant version. My girlfriend was shocked."',
    ctaText: "Learn to cook",
  },
];

function CaseStudyCard({
  study,
  isExpanded,
  onHover,
}: {
  study: (typeof caseStudies)[0];
  isExpanded: boolean;
  onHover: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    onHover();
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: isExpanded ? "6 0 0" : "2 0 0",
        placeContent: "flex-start",
        alignItems: "flex-start",
        gap: "16px",
        width: "100%",
        height: "min-content",
        position: "relative",
        overflow: "visible",
        transition: "flex 0.4s ease",
      }}
      className="case-study-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Video container with overlay */}
      <div
        style={{
          width: "100%",
          height: "507px",
          borderRadius: "16px",
          position: "relative",
          overflow: "hidden",
          backgroundColor: study.posterSrc ? "transparent" : "#e5e5e5",
        }}
      >
        {/* Poster image as fallback */}
        {study.posterSrc && (
          <img
            src={study.posterSrc}
            alt={study.name}
            className="case-study-image"
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        )}

        {/* Bottom gradient overlay */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "70%",
            background:
              "linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.95) 100%)",
            pointerEvents: "none",
          }}
        />

        {/* Content overlay */}
        <div
          style={{
            position: "absolute",
            bottom: "24px",
            left: "24px",
            right: "24px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: "24px",
          }}
        >
          {/* Left side: Text content */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              maxWidth: "580px",
              flex: 1,
            }}
          >
            {/* Name with tagline */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "4px",
              }}
            >
              <h5
                style={{
                  fontWeight: 600,
                  fontSize: "clamp(1rem, 0.9rem + 0.5vw, 1.125rem)",
                  lineHeight: "140%",
                  color: "rgb(255, 255, 255)",
                  margin: 0,
                }}
              >
                {study.name}
              </h5>
              <p
                style={{
                  fontWeight: 500,
                  fontSize: "clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)",
                  lineHeight: "20px",
                  color: "rgba(255, 255, 255, 0.7)",
                  margin: 0,
                }}
              >
                {study.tagline}
              </p>
            </div>

            {/* Quote */}
            {isExpanded && (
              <h5
                style={{
                  fontWeight: 600,
                  fontSize: "clamp(1rem, 0.9rem + 0.5vw, 1.125rem)",
                  lineHeight: "140%",
                  color: "rgba(255, 255, 255, 0.5)",
                  margin: 0,
                }}
              >
                {study.quote.split(/(?<=[.!?])\s+/).map((sentence, i) => {
                  const isHighlighted = study.highlight && sentence.includes(study.highlight);
                  const highlightParts = isHighlighted
                    ? sentence.split(study.highlight)
                    : null;

                  return (
                    <span
                      key={i}
                      style={{
                        display: "inline",
                        opacity: 0,
                        animation: `slideDownLine 0.5s ease ${i * 0.15}s forwards`,
                      }}
                    >
                      {highlightParts ? (
                        <>
                          {highlightParts[0]}
                          <span style={{ color: "rgb(255, 255, 255)" }}>
                            {study.highlight}
                          </span>
                          {highlightParts[1] || ""}
                        </>
                      ) : (
                        sentence
                      )}{" "}
                      <style jsx>{`
                        @keyframes slideDownLine {
                          from {
                            opacity: 0;
                            transform: translateY(-16px);
                          }
                          to {
                            opacity: 1;
                            transform: translateY(0);
                          }
                        }
                      `}</style>
                    </span>
                  );
                })}
              </h5>
            )}
          </div>

          {/* Right side: CTA Button */}
          {isExpanded && (
            <button
              className="case-study-cta-button"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                width: "fit-content",
                padding: "12px 20px",
                borderRadius: "13px",
                backgroundColor: "rgb(255, 255, 255)",
                border: "none",
                cursor: "pointer",
                boxShadow:
                  "rgba(0, 0, 0, 0.12) 0px 1px 2px 0px, rgba(0, 0, 0, 0.04) 0px 2px 8px 0px",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                pointerEvents: "auto",
                flexShrink: 0,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "rgba(0, 0, 0, 0.15) 0px 2px 4px 0px, rgba(0, 0, 0, 0.06) 0px 4px 12px 0px";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "rgba(0, 0, 0, 0.12) 0px 1px 2px 0px, rgba(0, 0, 0, 0.04) 0px 2px 8px 0px";
              }}
            >
              <span
                style={{
                  fontWeight: 500,
                  fontSize: "clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)",
                  lineHeight: "24px",
                  letterSpacing: "-0.01em",
                  color: "rgb(0, 0, 0)",
                }}
              >
                {study.ctaText}
              </span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 21"
                fill="none"
                style={{ flexShrink: 0 }}
              >
                <path
                  d="M7.5 15.5L12.5 10.5L7.5 5.5"
                  stroke="rgb(0, 0, 0)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CaseStudies() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(0);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section className="case-studies-section py-20">
      <div className="mx-auto max-w-[1920px] px-4 sm:px-6 lg:px-8">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "48px",
            width: "100%",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              placeContent: "flex-start",
              alignItems: "center",
              gap: "16px",
              width: "100%",
            }}
          >
            {/* Label with icon */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flex: "none",
                placeContent: "center",
                alignItems: "center",
                gap: "8px",
                height: "min-content",
                position: "relative",
                overflow: "visible",
              }}
            >
              <p
                style={{
                  fontWeight: 500,
                  fontSize: "clamp(0.875rem, 0.8rem + 0.375vw, 1rem)",
                  letterSpacing: "-0.01em",
                  lineHeight: "24px",
                  color: "#717171",
                  textAlign: "center",
                }}
              >
                Stories from our community
              </p>
            </div>

            {/* Headline */}
            <h2
              style={{
                fontWeight: 600,
                fontSize: "clamp(1.75rem, 2.5vw + 1rem, 2.5rem)",
                letterSpacing: "-0.04em",
                lineHeight: "120%",
                color: "rgb(0, 0, 0)",
                textAlign: "center",
              }}
            >
              Real people. Real savings. Real meals.
            </h2>
          </div>

          {/* Case studies grid */}
          <div
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              placeContent: "flex-start",
              alignItems: "flex-start",
              gap: isMobile ? "16px" : "24px",
              width: "100%",
            }}
            className="case-studies-grid"
            onMouseLeave={() => setHoveredIndex(0)}
          >
            {caseStudies.map((study, index) => (
              <CaseStudyCard
                key={study.name}
                study={study}
                isExpanded={isMobile ? true : hoveredIndex === index}
                onHover={() => setHoveredIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
