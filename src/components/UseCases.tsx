"use client";

import Link from "next/link";

export default function UseCases() {
  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        placeContent: "flex-start",
        alignItems: "center",
        gap: "48px",
        width: "100%",
        padding: "80px 16px",
        position: "relative",
        overflow: "visible",
      }}
      className="use-cases-section"
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-end",
          width: "100%",
          maxWidth: "1540px",
          gap: "48px",
        }}
        className="use-cases-header"
      >
        {/* Left side */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            placeContent: "flex-start",
            alignItems: "flex-start",
            gap: "16px",
          }}
        >
          {/* Label with icon */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              placeContent: "center",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <p
              style={{
                fontWeight: 500,
                fontSize: "clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)",
                letterSpacing: "-0.01em",
                lineHeight: "24px",
                color: "#717171",
              }}
            >
              Made for every cook
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
              textAlign: "left",
            }}
          >
            Whether you&apos;re learning to cook or leveling up
          </h2>
        </div>

        {/* Right side - subtext */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
          className="use-cases-subtext"
        >
          <h5
            style={{
              fontWeight: 600,
              fontSize: "clamp(1rem, 0.9rem + 0.5vw, 1.125rem)",
              letterSpacing: "-0.01em",
              lineHeight: "140%",
              color: "rgb(0, 0, 0)",
              textAlign: "right",
            }}
          >
            Save money, eat better
            <br />
            <span style={{ color: "rgb(178, 178, 178)" }}>
              and actually enjoy the process
            </span>
          </h5>
        </div>
      </div>

      {/* Cards Grid */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "24px",
          width: "100%",
          maxWidth: "1540px",
          height: "600px",
        }}
        className="use-cases-grid"
      >
        {/* Busy Professionals Card */}
        <div
          style={{
            flex: "1 0 0",
            borderRadius: "16px",
            overflow: "hidden",
            position: "relative",
            backgroundColor: "rgb(230, 230, 230)",
          }}
        >
          {/* Content overlay */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              padding: "24px",
              gap: "16px",
            }}
          >
            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              <div
                style={{
                  display: "inline-flex",
                  alignSelf: "flex-start",
                  padding: "6px 12px",
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                  borderRadius: "8px",
                }}
              >
                <p
                  style={{
                    fontWeight: 500,
                    fontSize: "clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)",
                    color: "rgb(0, 0, 0)",
                  }}
                >
                  Busy professionals
                </p>
              </div>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "4px" }}
              >
                <h5
                  style={{
                    fontWeight: 600,
                    fontSize: "clamp(1rem, 0.9rem + 0.5vw, 1.125rem)",
                    lineHeight: "140%",
                    color: "rgb(0, 0, 0)",
                  }}
                >
                  Quick weeknight dinners
                </h5>
                <h5
                  style={{
                    fontWeight: 600,
                    fontSize: "clamp(1rem, 0.9rem + 0.5vw, 1.125rem)",
                    lineHeight: "140%",
                    color: "rgba(0, 0, 0, 0.5)",
                  }}
                >
                  30-minute meals that don&apos;t sacrifice flavor or nutrition
                </h5>
              </div>
            </div>
          </div>
        </div>

        {/* Budget-Conscious Card */}
        <div
          style={{
            flex: "1 0 0",
            borderRadius: "16px",
            overflow: "hidden",
            position: "relative",
            backgroundColor: "rgb(230, 230, 230)",
          }}
        >
          {/* Content overlay */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              padding: "24px",
              gap: "16px",
            }}
          >
            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              <div
                style={{
                  display: "inline-flex",
                  alignSelf: "flex-start",
                  padding: "6px 12px",
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                  borderRadius: "8px",
                }}
              >
                <p
                  style={{
                    fontWeight: 500,
                    fontSize: "clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)",
                    color: "rgb(0, 0, 0)",
                  }}
                >
                  Budget-conscious cooks
                </p>
              </div>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "4px" }}
              >
                <h5
                  style={{
                    fontWeight: 600,
                    fontSize: "clamp(1rem, 0.9rem + 0.5vw, 1.125rem)",
                    lineHeight: "140%",
                    color: "rgb(0, 0, 0)",
                  }}
                >
                  Stretch every dollar
                </h5>
                <h5
                  style={{
                    fontWeight: 600,
                    fontSize: "clamp(1rem, 0.9rem + 0.5vw, 1.125rem)",
                    lineHeight: "140%",
                    color: "rgba(0, 0, 0, 0.5)",
                  }}
                >
                  See real prices, plan smarter, and waste nothing
                </h5>
              </div>
            </div>
          </div>
        </div>

        {/* Right column - stacked cards */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            flex: "1 0 0",
          }}
        >
          {/* Families Card */}
          <div
            style={{
              flex: "1 0 0",
              borderRadius: "16px",
              overflow: "hidden",
              position: "relative",
              backgroundColor: "rgb(230, 230, 230)",
            }}
          >
            {/* Content overlay */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                padding: "24px",
                gap: "12px",
              }}
            >
              <div
                style={{
                  display: "inline-flex",
                  alignSelf: "flex-start",
                  padding: "6px 12px",
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                  borderRadius: "8px",
                }}
              >
                <p
                  style={{
                    fontWeight: 500,
                    fontSize: "clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)",
                    color: "rgb(0, 0, 0)",
                  }}
                >
                  Families
                </p>
              </div>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "4px" }}
              >
                <h5
                  style={{
                    fontWeight: 600,
                    fontSize: "clamp(1rem, 0.9rem + 0.5vw, 1.125rem)",
                    lineHeight: "140%",
                    color: "rgb(0, 0, 0)",
                  }}
                >
                  Kid-friendly meals everyone will eat
                </h5>
                <h5
                  style={{
                    fontWeight: 600,
                    fontSize: "clamp(1rem, 0.9rem + 0.5vw, 1.125rem)",
                    lineHeight: "140%",
                    color: "rgba(0, 0, 0, 0.5)",
                  }}
                >
                  Recipes designed to please picky eaters and adventurous kids
                </h5>
              </div>
            </div>
          </div>

          {/* Beginners Card */}
          <div
            style={{
              flex: "1 0 0",
              borderRadius: "16px",
              overflow: "hidden",
              position: "relative",
              backgroundColor: "rgb(230, 230, 230)",
            }}
          >
            {/* Content overlay */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                padding: "24px",
                gap: "12px",
              }}
            >
              <div
                style={{
                  display: "inline-flex",
                  alignSelf: "flex-start",
                  padding: "6px 12px",
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                  borderRadius: "8px",
                }}
              >
                <p
                  style={{
                    fontWeight: 500,
                    fontSize: "clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)",
                    color: "rgb(0, 0, 0)",
                  }}
                >
                  Beginners
                </p>
              </div>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "4px" }}
              >
                <h5
                  style={{
                    fontWeight: 600,
                    fontSize: "clamp(1rem, 0.9rem + 0.5vw, 1.125rem)",
                    lineHeight: "140%",
                    color: "rgb(0, 0, 0)",
                  }}
                >
                  Learn to cook with video guidance
                </h5>
                <h5
                  style={{
                    fontWeight: 600,
                    fontSize: "clamp(1rem, 0.9rem + 0.5vw, 1.125rem)",
                    lineHeight: "140%",
                    color: "rgba(0, 0, 0, 0.5)",
                  }}
                >
                  Step-by-step instructions that build your confidence in the
                  kitchen
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
