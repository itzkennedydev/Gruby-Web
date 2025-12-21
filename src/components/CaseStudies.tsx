"use client";

import { useRef, useState } from "react";

const caseStudies = [
  {
    name: "Kennedy M.",
    tagline: "Gruby Founder/College Student",
    videoSrc:
      "https://framerusercontent.com/assets/FZPLFPptCKG59IZKD5USBywVzs8.mp4",
    posterSrc:
      "https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop",
    quote:
      '"I built this because I was tired of paying $18 for a burrito bowl. Now I make the same recipes I see online for a fraction of the cost. If I can do it, trust me, anyone can."',
    ctaText: "Save on groceries",
  },
  {
    name: "Tyler K.",
    tagline: "College Student",
    videoSrc:
      "https://framerusercontent.com/assets/tdYuQuj3hfC9WmQtuSzoIuzqZjA.mp4",
    posterSrc:
      "https://images.pexels.com/photos/3771120/pexels-photo-3771120.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop",
    quote:
      '"Delivery apps were bleeding me dry. Like $400+ some months. Started meal prepping Sundays with recipes from the app - now I\'m spending maybe $180/month total on groceries. Already paid off my credit card."',
    ctaText: "Start meal prepping",
  },
  {
    name: "Maria S.",
    tagline: "Single Mom",
    videoSrc:
      "https://framerusercontent.com/assets/PhEaJ5dFs4rUIGQkAeHC3YvY.mp4",
    posterSrc:
      "https://images.pexels.com/photos/4259707/pexels-photo-4259707.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop",
    quote:
      '"Between work and two kids, cooking felt impossible. The price compare saved me so much money - found out one store was half the price for my weekly staples. That\'s $70 extra every week for their activities."',
    ctaText: "Compare prices",
  },
  {
    name: "David L.",
    tagline: "Never Cooked Before",
    videoSrc:
      "https://framerusercontent.com/assets/GbKzCOnk9Xq3skJhcQYX6cjn2o.mp4",
    posterSrc:
      "https://images.pexels.com/photos/4253311/pexels-photo-4253311.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop",
    quote:
      '"Literally never made anything beyond ramen. The step-by-step mode walks you through everything. Made chicken tikka masala that tasted better than takeout. My girlfriend keeps asking when I learned to cook lol."',
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
        }}
      >
        {/* Poster image as fallback */}
        <img
          src={study.posterSrc}
          alt={study.name}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
        <video
          ref={videoRef}
          src={study.videoSrc}
          poster={study.posterSrc}
          loop
          playsInline
          muted
          preload={isExpanded ? "auto" : "metadata"}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            display: "block",
            cursor: "auto",
            borderRadius: "0px",
            backgroundColor: "rgba(0, 0, 0, 0)",
          }}
        />

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
              gap: "16px",
              maxWidth: "580px",
              flex: 1,
            }}
          >
            {/* Glassmorphism badge */}
            <div
              style={{
                display: "inline-flex",
                width: "fit-content",
                padding: "6px 12px",
                borderRadius: "8px",
                backdropFilter: "blur(10px)",
                backgroundColor: "rgba(255, 255, 255, 0.25)",
              }}
            >
              <p
                style={{
                  fontWeight: 600,
                  fontSize: "14px",
                  lineHeight: "20px",
                  color: "rgb(255, 255, 255)",
                  margin: 0,
                }}
              >
                {study.tagline}
              </p>
            </div>

            {/* Name and quote */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <h5
                style={{
                  fontWeight: 600,
                  fontSize: "18px",
                  lineHeight: "140%",
                  color: "rgb(255, 255, 255)",
                  margin: 0,
                }}
              >
                {study.name}
              </h5>
              {isExpanded && (
                <h5
                  style={{
                    fontWeight: 600,
                    fontSize: "18px",
                    lineHeight: "140%",
                    color: "rgba(255, 255, 255, 0.5)",
                    margin: 0,
                  }}
                >
                  {study.quote}
                </h5>
              )}
            </div>
          </div>

          {/* Right side: CTA Button */}
          {isExpanded && (
            <button
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
                  fontSize: "14px",
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
                  fontSize: "14px",
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
                fontSize: "40px",
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
              flexDirection: "row",
              placeContent: "flex-start",
              alignItems: "flex-start",
              gap: "24px",
              width: "100%",
            }}
            className="case-studies-grid"
            onMouseLeave={() => setHoveredIndex(0)}
          >
            {caseStudies.map((study, index) => (
              <CaseStudyCard
                key={study.name}
                study={study}
                isExpanded={hoveredIndex === index}
                onHover={() => setHoveredIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
