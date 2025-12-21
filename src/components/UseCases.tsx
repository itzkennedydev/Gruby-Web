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
                fontSize: "14px",
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
              fontSize: "40px",
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
              fontSize: "18px",
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
          }}
        >
          <img
            src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1200&fit=crop"
            alt="Busy professionals"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
          {/* Gradient overlay */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "60%",
              background:
                "linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 100%)",
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
                  backgroundColor: "rgba(255, 255, 255, 0.25)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "8px",
                }}
              >
                <p
                  style={{
                    fontWeight: 500,
                    fontSize: "14px",
                    color: "rgb(255, 255, 255)",
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
                    fontSize: "18px",
                    lineHeight: "140%",
                    color: "rgb(255, 255, 255)",
                  }}
                >
                  Quick weeknight dinners
                </h5>
                <h5
                  style={{
                    fontWeight: 600,
                    fontSize: "18px",
                    lineHeight: "140%",
                    color: "rgba(255, 255, 255, 0.5)",
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
            backgroundColor: "rgb(247, 247, 247)",
          }}
        >
          <img
            src="https://images.pexels.com/photos/4551832/pexels-photo-4551832.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1200&fit=crop"
            alt="Budget cooking"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
          {/* Gradient overlay */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "60%",
              background:
                "linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 100%)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              padding: "24px",
              gap: "16px",
            }}
          >
            {/* Content */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              {/* Tag */}
              <div
                style={{
                  display: "inline-flex",
                  alignSelf: "flex-start",
                  padding: "6px 12px",
                  backgroundColor: "rgba(255, 255, 255, 0.25)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "8px",
                }}
              >
                <p
                  style={{
                    fontWeight: 500,
                    fontSize: "14px",
                    letterSpacing: "-0.01em",
                    lineHeight: "24px",
                    color: "rgb(255, 255, 255)",
                  }}
                >
                  Budget-conscious cooks
                </p>
              </div>
              {/* Text */}
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
                    fontSize: "18px",
                    letterSpacing: "-0.01em",
                    lineHeight: "140%",
                    color: "rgb(255, 255, 255)",
                  }}
                >
                  Stretch every dollar
                </h5>
                <h5
                  style={{
                    fontWeight: 600,
                    fontSize: "18px",
                    letterSpacing: "-0.01em",
                    lineHeight: "140%",
                    color: "rgba(255, 255, 255, 0.5)",
                  }}
                >
                  See real prices, plan smarter, and waste nothing
                </h5>
              </div>
            </div>
            {/* Button */}
            <Link
              href="#download"
              style={{
                display: "inline-flex",
                alignSelf: "flex-start",
                alignItems: "center",
                gap: "8px",
                padding: "12px 20px",
                backgroundColor: "rgb(255, 255, 255)",
                borderRadius: "13px",
                boxShadow:
                  "0px 1px 2px 0px rgba(0, 0, 0, 0.12), 0px 2px 8px 0px rgba(0, 0, 0, 0.04)",
                textDecoration: "none",
              }}
            >
              <p
                style={{
                  fontWeight: 500,
                  fontSize: "16px",
                  letterSpacing: "-0.01em",
                  lineHeight: "24px",
                  color: "rgb(0, 0, 0)",
                }}
              >
                Start saving
              </p>
              <svg
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
                style={{ flexShrink: 0 }}
              >
                <path
                  d="M4.16667 10.5H15.8333"
                  stroke="rgb(0, 0, 0)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10 4.66667L15.8333 10.5L10 16.3333"
                  stroke="rgb(0, 0, 0)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
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
              backgroundColor: "rgb(247, 247, 247)",
            }}
          >
            <img
              src="https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1200&fit=crop"
              alt="Family cooking"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
            {/* Gradient overlay */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "70%",
                background:
                  "linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 100%)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                padding: "20px",
              }}
            >
              <div
                style={{
                  display: "inline-flex",
                  alignSelf: "flex-start",
                  padding: "6px 12px",
                  backgroundColor: "rgba(255, 255, 255, 0.25)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "8px",
                  marginBottom: "8px",
                }}
              >
                <p
                  style={{
                    fontWeight: 500,
                    fontSize: "14px",
                    color: "rgb(255, 255, 255)",
                  }}
                >
                  Families
                </p>
              </div>
              <h5
                style={{
                  fontWeight: 600,
                  fontSize: "16px",
                  color: "rgb(255, 255, 255)",
                }}
              >
                Kid-friendly meals everyone will eat
              </h5>
            </div>
          </div>

          {/* Beginners Card */}
          <div
            style={{
              flex: "1 0 0",
              borderRadius: "16px",
              overflow: "hidden",
              position: "relative",
              backgroundColor: "rgb(247, 247, 247)",
            }}
          >
            <img
              src="https://images.pexels.com/photos/4252138/pexels-photo-4252138.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1200&fit=crop"
              alt="Learning to cook"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
            {/* Gradient overlay */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "70%",
                background:
                  "linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 100%)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                padding: "20px",
              }}
            >
              <div
                style={{
                  display: "inline-flex",
                  alignSelf: "flex-start",
                  padding: "6px 12px",
                  backgroundColor: "rgba(255, 255, 255, 0.25)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "8px",
                  marginBottom: "8px",
                }}
              >
                <p
                  style={{
                    fontWeight: 500,
                    fontSize: "14px",
                    color: "rgb(255, 255, 255)",
                  }}
                >
                  Beginners
                </p>
              </div>
              <h5
                style={{
                  fontWeight: 600,
                  fontSize: "16px",
                  color: "rgb(255, 255, 255)",
                }}
              >
                Learn to cook with video guidance
              </h5>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
