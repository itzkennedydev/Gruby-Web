"use client";

export default function Customers() {
  return (
    <section
      id="savings"
      style={{
        display: "flex",
        flexDirection: "column",
        placeContent: "flex-start",
        alignItems: "center",
        width: "100%",
        padding: "80px 16px",
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#1a1a1a",
      }}
      className="customers-section"
    >
      {/* Grain overlay */}
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
      {/* Inner container */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          placeContent: "flex-start",
          alignItems: "center",
          gap: "48px",
          width: "100%",
          maxWidth: "1540px",
          position: "relative",
          zIndex: 1,
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
              placeContent: "center",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <p
              style={{
                fontWeight: 500,
                fontSize: "clamp(0.875rem, 0.8rem + 0.375vw, 1rem)",
                letterSpacing: "-0.01em",
                lineHeight: "24px",
                color: "rgba(255, 255, 255, 0.5)",
                textAlign: "center",
              }}
            >
              The real cost of convenience
            </p>
          </div>

          {/* Headline */}
          <h2
            style={{
              fontWeight: 600,
              fontSize: "clamp(1.75rem, 2.5vw + 1rem, 2.5rem)",
              letterSpacing: "-0.04em",
              lineHeight: "120%",
              color: "rgb(255, 255, 255)",
              textAlign: "center",
            }}
          >
            They monetized our hunger.
            <br />
            We&apos;re done feeding it.
          </h2>
        </div>

        {/* Cards Grid */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "24px",
            width: "100%",
          }}
          className="customers-grid"
        >
          {/* Left Column */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "24px",
              flex: "1 0 0",
            }}
            className="customers-column"
          >
            {/* Average Savings Row */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "24px",
                flex: "1 0 0",
              }}
              className="customers-row"
            >
              {/* Stats Card */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  flex: "1 0 0",
                  padding: "32px",
                  borderRadius: "16px",
                  backgroundColor: "rgb(255, 255, 255)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0px",
                  }}
                >
                  <h5
                    style={{
                      fontWeight: 600,
                      fontSize: "clamp(1rem, 0.9rem + 0.5vw, 1.125rem)",
                      letterSpacing: "-0.01em",
                      lineHeight: "140%",
                      color: "rgb(0, 0, 0)",
                    }}
                  >
                    Save up to
                  </h5>
                  <h1
                    style={{
                      fontWeight: 600,
                      fontSize: "clamp(4rem, 6vw + 2rem, 6rem)",
                      letterSpacing: "-0.05em",
                      lineHeight: "110%",
                      color: "#16A34A",
                      marginLeft: "-6px",
                    }}
                  >
                    $30
                  </h1>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0px",
                  }}
                >
                  <h5
                    style={{
                      fontWeight: 600,
                      fontSize: "clamp(1rem, 0.9rem + 0.5vw, 1.125rem)",
                      letterSpacing: "-0.01em",
                      lineHeight: "140%",
                      color: "rgb(0, 0, 0)",
                    }}
                  >
                    Per meal vs delivery
                    <br />
                    <span style={{ color: "#717171" }}>
                      $35 delivered vs ~$5 home cooked
                    </span>
                  </h5>
                </div>
              </div>

              {/* Image Column */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "284px",
                  flexShrink: 0,
                  borderRadius: "16px",
                  overflow: "hidden",
                  aspectRatio: "1 / 1",
                }}
              >
                <img
                  src="/savings-cooking-1.jpg"
                  alt="Home cooking savings"
                  style={{
                    display: "block",
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />
              </div>
            </div>

            {/* Yearly Savings Card */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                flex: "1 0 0",
                padding: "32px",
                borderRadius: "16px",
                backgroundColor: "rgb(38, 38, 38)",
                position: "relative",
                overflow: "hidden",
              }}
              className="yearly-savings-card"
            >
              {/* Gruby Icon Background Silhouette */}
              <svg
                width="750"
                height="750"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  position: "absolute",
                  bottom: "-150px",
                  right: "-80px",
                  opacity: 0.15,
                  pointerEvents: "none",
                }}
              >
                <path
                  d="M25.5609 7.42714C22.4222 7.42714 19.2805 7.33332 16.1468 7.4491C11.5511 7.61978 7.67385 11.4816 7.39541 15.9921C7.09501 20.854 10.2587 25.0732 14.8744 25.9845C15.6129 26.1302 16.3574 26.1731 17.1029 26.1681C17.4871 26.1661 17.7267 26.2579 17.9472 26.6073C18.7965 27.9498 20.058 28.6185 21.6358 28.6375C23.7276 28.6625 25.8204 28.6515 27.9132 28.6415C28.7256 28.6375 29.2116 28.1943 29.2016 27.5136C29.1916 26.8379 28.7066 26.4286 27.8783 26.4246C26.1597 26.4176 24.4402 26.4196 22.7216 26.4246C22.3234 26.4256 21.8973 26.4047 21.9063 25.9016C21.9152 25.4115 22.3374 25.3796 22.7366 25.3806C24.4551 25.3866 26.1747 25.3866 27.8932 25.3806C28.7226 25.3776 29.2186 24.9544 29.1996 24.2906C29.1806 23.6498 28.7116 23.2586 27.9132 23.2536C26.2944 23.2446 24.6747 23.2506 23.0559 23.2506C22.8813 23.2506 22.7066 23.2576 22.533 23.2476C22.1717 23.2266 21.8723 23.0869 21.9053 22.6756C21.9342 22.3143 22.2166 22.2155 22.556 22.2165C24.2246 22.2225 25.8942 22.2195 27.5629 22.2175C27.7864 22.2175 28.017 22.2405 28.2335 22.1985C28.8483 22.0788 29.2186 21.7025 29.1916 21.0617C29.1647 20.4258 28.7834 20.0176 28.1507 20.0116C25.8094 19.9897 23.4661 19.9487 21.1278 20.0376C19.8244 20.0875 18.7446 20.7782 18.039 21.8871C17.7207 22.3872 17.4303 22.509 16.8504 22.4351C14.3405 22.1157 12.4483 20.1643 12.3165 17.674C12.1848 15.1737 13.8345 12.9728 16.2826 12.4318C16.7636 12.326 17.2716 12.313 17.7676 12.312C22.0021 12.303 26.2366 12.298 30.472 12.31C33.2874 12.318 35.1886 13.7024 35.8443 16.2207C35.962 16.6719 35.997 17.155 35.997 17.6231C35.994 20.2112 36.0249 22.8004 35.9391 25.3866C35.7714 30.4122 31.3633 35.1753 26.3693 35.842C25.5509 35.9508 24.7356 35.9937 23.9142 35.9937C19.8294 35.9937 15.7436 36.0107 11.6588 35.9888C6.06907 35.9588 1.64496 32.4544 0.29168 27.0245C0.0801048 26.1751 0.0112431 25.3087 0.0112431 24.4383C0.0142371 19.9088 -0.0376586 15.3783 0.0591469 10.8507C0.173916 5.50374 4.68885 0.705705 10.0112 0.134772C10.8016 0.0499304 11.601 0.00900692 12.3964 0.00800878C17.6269 -0.0029707 22.8583 -0.000974427 28.0898 0.00401625C29.6547 0.00601251 31.1597 0.273513 32.501 1.14189C34.5479 2.46741 35.7145 4.32893 35.955 6.77137C36.0069 7.29439 35.8283 7.3952 35.3512 7.39321C32.0878 7.37624 28.8244 7.38422 25.5619 7.38422C25.5619 7.3982 25.5619 7.41317 25.5619 7.42714H25.5609Z"
                  fill="#717171"
                />
              </svg>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0px",
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
                  That adds up to
                </h5>
                <h1
                  style={{
                    fontWeight: 600,
                    fontSize: "clamp(4rem, 6vw + 2rem, 6rem)",
                    letterSpacing: "-0.05em",
                    lineHeight: "110%",
                    color: "rgb(255, 255, 255)",
                    marginLeft: "-6px",
                  }}
                >
                  $3,600
                </h1>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0px",
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
                  Per year back in your pocket
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
                  A vacation, a new phone, or just peace of mind
                </h5>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "24px",
              flex: "1 0 0",
            }}
            className="customers-column"
          >
            {/* Meals Cooked Row */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "24px",
                flex: "1 0 0",
              }}
              className="customers-row"
            >
              {/* Stats Card */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  flex: "1 0 0",
                  padding: "32px",
                  borderRadius: "16px",
                  backgroundColor: "rgb(255, 255, 255)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0px",
                  }}
                >
                  <h5
                    style={{
                      fontWeight: 600,
                      fontSize: "clamp(1rem, 0.9rem + 0.5vw, 1.125rem)",
                      letterSpacing: "-0.01em",
                      lineHeight: "140%",
                      color: "rgb(0, 0, 0)",
                    }}
                  >
                    Save up to
                  </h5>
                  <h1
                    style={{
                      fontWeight: 600,
                      fontSize: "clamp(4rem, 6vw + 2rem, 6rem)",
                      letterSpacing: "-0.05em",
                      lineHeight: "110%",
                      color: "#16A34A",
                      marginLeft: "-6px",
                    }}
                  >
                    $250
                  </h1>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0px",
                  }}
                >
                  <h5
                    style={{
                      fontWeight: 600,
                      fontSize: "clamp(1rem, 0.9rem + 0.5vw, 1.125rem)",
                      letterSpacing: "-0.01em",
                      lineHeight: "140%",
                      color: "rgb(0, 0, 0)",
                    }}
                  >
                    Per month vs delivery apps
                    <br />
                    <span style={{ color: "#717171" }}>
                      Cook just 8 meals at home instead
                    </span>
                  </h5>
                </div>
              </div>

              {/* Image Column */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "284px",
                  flexShrink: 0,
                  borderRadius: "16px",
                  overflow: "hidden",
                  aspectRatio: "1 / 1",
                }}
              >
                <img
                  src="/savings-cooking-2.jpg"
                  alt="Home cooking"
                  style={{
                    display: "block",
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />
              </div>
            </div>

            {/* Time Saved Row */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "24px",
                flex: "1 0 0",
              }}
              className="customers-row"
            >
              {/* Image Column */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "284px",
                  flexShrink: 0,
                  borderRadius: "16px",
                  overflow: "hidden",
                  aspectRatio: "1 / 1",
                }}
              >
                <img
                  src="/savings-cooking-3.jpg"
                  alt="Cooking at home"
                  style={{
                    display: "block",
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />
              </div>

              {/* Stats Card */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  flex: "1 0 0",
                  padding: "32px",
                  borderRadius: "16px",
                  backgroundColor: "rgb(255, 255, 255)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0px",
                  }}
                >
                  <h5
                    style={{
                      fontWeight: 600,
                      fontSize: "clamp(1rem, 0.9rem + 0.5vw, 1.125rem)",
                      letterSpacing: "-0.01em",
                      lineHeight: "140%",
                      color: "rgb(0, 0, 0)",
                    }}
                  >
                    Save up to
                  </h5>
                  <h1
                    style={{
                      fontWeight: 600,
                      fontSize: "clamp(4rem, 6vw + 2rem, 6rem)",
                      letterSpacing: "-0.05em",
                      lineHeight: "110%",
                      color: "#16A34A",
                      marginLeft: "-6px",
                    }}
                  >
                    $60
                  </h1>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0px",
                  }}
                >
                  <h5
                    style={{
                      fontWeight: 600,
                      fontSize: "clamp(1rem, 0.9rem + 0.5vw, 1.125rem)",
                      letterSpacing: "-0.01em",
                      lineHeight: "140%",
                      color: "rgb(0, 0, 0)",
                    }}
                  >
                    Per week cooking at home
                    <br />
                    <span style={{ color: "#717171" }}>
                      Just 2 home-cooked meals instead of delivery
                    </span>
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
