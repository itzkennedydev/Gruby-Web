'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const tabs = [
  {
    id: 'import',
    label: 'Recipe Import',
    color: 'var(--gruby-primary)',
    bgColor: 'rgba(107, 106, 70, 0.1)',
    headline: 'Import any recipe with a single tap',
    features: [
      {
        icon: '/images/DUyfIhV5ywko8hvJHxUDn95ydU.svg',
        title: 'AI-Powered Extraction',
        description: 'Paste a TikTok, YouTube, or Instagram link. Gruby AI extracts ingredients, steps, and nutrition automatically.',
      },
      {
        icon: '/images/FKCE5EjaJHZ9u3NDl744VMAo.svg',
        title: 'Works With Any Platform',
        description: 'Import from any website, video platform, or social media. Even screenshot a recipe and we\'ll extract it.',
      },
      {
        icon: '/images/v3Inm1RRhQ9WkbaJJlLdfx9iYk.svg',
        title: 'Nutrition & Macros',
        description: 'Get automatic nutritional information and macro breakdowns for every recipe you import.',
      },
    ],
    previewImage: '/mockups/recipe-import.png',
  },
  {
    id: 'prices',
    label: 'Grocery Prices',
    color: 'rgb(16, 163, 74)',
    bgColor: 'rgba(16, 163, 74, 0.1)',
    headline: 'See exactly what ingredients cost',
    features: [
      {
        icon: '/images/NLaAGG0AOWp5h5mmtJqGwp2FHTo.svg',
        title: 'Real-Time Prices',
        description: 'Grocery prices updated in real-time from your local stores. No more guessing what dinner will cost.',
      },
      {
        icon: '/images/CNeLW1D2DEOxf4CsiXuGsLHrE.svg',
        title: 'One-Tap Cart Sync',
        description: 'Add all ingredients to your grocery cart with a single tap. Works with Kroger, Walmart, and more.',
      },
      {
        icon: '/images/nub49VxhDPkGtZMW0ThOhHsWaQ.svg',
        title: 'Price Comparison',
        description: 'Compare prices across brands and stores. Find the best deals without clipping coupons.',
      },
    ],
    previewImage: '/mockups/grocery-prices.png',
  },
  {
    id: 'cooking',
    label: 'Cooking Mode',
    color: 'rgb(147, 125, 242)',
    bgColor: 'rgba(147, 125, 242, 0.1)',
    headline: 'Cook like a pro, even if you\'re not',
    features: [
      {
        icon: '/images/e2A9GjuMc33MVHae7qkVGAu12YY.svg',
        title: 'Step-by-Step Guidance',
        description: 'Follow along with clear, timed steps. Built-in timers and video clips for each stage.',
      },
      {
        icon: '/images/2ryo1vX9jafvLqSqcZ5jj3dTw.svg',
        title: 'Hands-Free Voice',
        description: 'Voice instructions let you cook without touching your phone. Just say "next step" to continue.',
      },
      {
        icon: '/images/E6ev8oIZacU4s200DGoivVKgGE0.svg',
        title: 'Video Timestamps',
        description: 'Original recipe videos are synced to each cooking step. See exactly what the chef did.',
      },
    ],
    previewImage: '/mockups/cooking-mode.png',
  },
  {
    id: 'pantry',
    label: 'Smart Pantry',
    color: 'rgb(88, 210, 147)',
    bgColor: 'rgba(88, 210, 147, 0.1)',
    headline: 'Track what you have, waste less food',
    features: [
      {
        icon: '/images/JVS4rx3IDZXE8h0KF5eXgdLC0I.svg',
        title: 'Pantry Inventory',
        description: 'Scan receipts or add items manually. Always know what\'s in your fridge and pantry.',
      },
      {
        icon: '/images/InX6xGN6V0EkgGtIMB8Jjr1wWI.svg',
        title: 'Expiration Alerts',
        description: 'Get notified before food goes bad. Gruby suggests recipes to use up expiring ingredients.',
      },
      {
        icon: '/images/Lip4FNmc2B3tKiEMawVbUGUtA.svg',
        title: 'Use-It-Up Recipes',
        description: 'Ask "what can I make?" and Gruby finds recipes using ingredients you already have.',
      },
    ],
    previewImage: '/mockups/pantry.png',
  },
]

export default function OperationsSuite() {
  const [activeTab, setActiveTab] = useState(0)
  const currentTab = tabs[activeTab]

  return (
    <section
      id="how-it-works"
      className="operations-suite-section"
      style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 'none',
        placeContent: 'flex-start',
        alignItems: 'center',
        gap: '48px',
        width: '100%',
        height: 'min-content',
        padding: '80px 16px',
        position: 'relative',
        overflow: 'visible',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 'none',
          placeContent: 'flex-start',
          alignItems: 'center',
          gap: '24px',
          width: '100%',
          height: 'min-content',
          position: 'relative',
          overflow: 'visible',
        }}
      >
        {/* Label with icon */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            flex: 'none',
            placeContent: 'flex-start',
            alignItems: 'center',
            gap: '8px',
            height: 'min-content',
            position: 'relative',
            overflow: 'visible',
          }}
        >
          {/* Chef hat icon */}
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            style={{ flexShrink: 0 }}
          >
            <path
              d="M4 13V11M12 13V11M8 13V11M3 11H13C14.1046 11 15 10.1046 15 9V6C15 3.79086 13.2091 2 11 2C10.2316 2 9.5159 2.2199 8.91167 2.60127C8.62995 2.32382 8.26996 2.11916 7.87035 2.01584C7.32929 1.87714 6.75448 1.93917 6.25623 2.19015C5.75798 2.44112 5.37246 2.8633 5.16795 3.38197C4.45808 3.69547 3.84694 4.19044 3.39819 4.81458C2.52447 4.89109 1.7296 5.35178 1.21212 6.07324C0.694633 6.79469 0.504396 7.70864 0.685971 8.58371C0.867545 9.45879 1.40331 10.2164 2.16795 10.6731"
              stroke="var(--gruby-primary)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p
            style={{
              fontWeight: 500,
              fontSize: '14px',
              letterSpacing: '-0.01em',
              lineHeight: '24px',
              color: 'var(--gruby-primary)',
            }}
          >
            Your AI kitchen companion
          </p>
        </div>

        {/* Headline */}
        <h2
          style={{
            fontWeight: 600,
            fontSize: '40px',
            letterSpacing: '-0.04em',
            lineHeight: '120%',
            color: 'rgb(0, 0, 0)',
            textAlign: 'center',
            maxWidth: '800px',
          }}
        >
          Everything you need to cook better
        </h2>

        {/* Buttons */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            flex: 'none',
            placeContent: 'flex-start',
            alignItems: 'center',
            gap: '8px',
            height: 'min-content',
            position: 'relative',
            overflow: 'visible',
          }}
        >
          <Link
            href="#download"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 20px',
              backgroundColor: 'rgb(0, 0, 0)',
              color: 'rgb(255, 255, 255)',
              borderRadius: '13px',
              boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.12), 0px 2px 8px 0px rgba(0, 0, 0, 0.04)',
              textDecoration: 'none',
              fontWeight: 500,
              fontSize: '16px',
              letterSpacing: '-0.01em',
              lineHeight: '24px',
            }}
          >
            Download Now
          </Link>
          <Link
            href="#features"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 20px',
              backgroundColor: 'rgb(247, 247, 247)',
              color: 'rgb(0, 0, 0)',
              borderRadius: '13px',
              textDecoration: 'none',
              fontWeight: 500,
              fontSize: '16px',
              letterSpacing: '-0.01em',
              lineHeight: '24px',
            }}
          >
            See all features
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 18L15 12L9 6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>

      {/* Content container */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 'none',
          placeContent: 'flex-start',
          alignItems: 'center',
          gap: '0px',
          width: '100%',
          maxWidth: 'min(1540px, calc(100% - 32px))',
          height: 'min-content',
          position: 'relative',
          overflow: 'visible',
        }}
        className="operations-container"
      >
        {/* Tab content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            flex: 'none',
            placeContent: 'flex-start',
            alignItems: 'stretch',
            gap: '24px',
            width: '100%',
            maxWidth: '1200px',
            height: 'min-content',
            position: 'relative',
            overflow: 'visible',
          }}
          className="operations-content"
        >
          {/* Left side - Features */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 1,
              flexShrink: 0,
              flexBasis: '0px',
              alignContent: 'flex-start',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              height: '711px',
              padding: '0',
              position: 'relative',
              overflow: 'visible',
            }}
            className="operations-left"
          >
            {/* Category label and headline */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                flex: 'none',
                placeContent: 'center flex-start',
                alignItems: 'flex-start',
                gap: '12px',
                width: '100%',
                height: 'min-content',
                padding: '0',
                position: 'relative',
                overflow: 'visible',
              }}
            >
              {/* Category tag */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  flex: 'none',
                  placeContent: 'center',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 8px',
                  backgroundColor: currentTab.bgColor,
                  borderRadius: '8px',
                  width: 'min-content',
                  height: 'min-content',
                  position: 'relative',
                  overflow: 'visible',
                  transition: 'background-color 0.3s ease',
                }}
              >
                {/* Sparkle icon */}
                <svg width="16" height="16" viewBox="0 0 16 16" fill={currentTab.color}>
                  <path d="M8 0L9.5 5.5L15 7L9.5 8.5L8 14L6.5 8.5L1 7L6.5 5.5L8 0Z"/>
                </svg>
                <p
                  style={{
                    fontWeight: 500,
                    fontSize: '14px',
                    letterSpacing: '-0.01em',
                    lineHeight: '24px',
                    color: currentTab.color,
                    transition: 'color 0.3s ease',
                  }}
                >
                  {currentTab.label}
                </p>
              </div>

              {/* Section headline */}
              <h3
                style={{
                  fontWeight: 600,
                  fontSize: '24px',
                  letterSpacing: '-0.03em',
                  lineHeight: '130%',
                  color: 'rgb(0, 0, 0)',
                }}
              >
                {currentTab.headline}
              </h3>
            </div>

            {/* Feature cards */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                flex: 'none',
                placeContent: 'center flex-start',
                alignItems: 'flex-start',
                gap: '0px',
                width: '100%',
                height: 'min-content',
                padding: '0',
                position: 'relative',
                overflow: 'visible',
              }}
            >
              {currentTab.features.map((feature, index) => (
                <div
                  key={feature.title}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 'none',
                    placeContent: 'flex-start',
                    alignItems: 'flex-start',
                    gap: '0px',
                    width: '100%',
                    padding: '16px',
                    backgroundColor: index === 0 ? 'rgb(247, 247, 247)' : 'rgba(247, 247, 247, 0)',
                    borderRadius: '16px',
                    height: 'min-content',
                    position: 'relative',
                    overflow: 'visible',
                    opacity: index === 0 ? 1 : 0.6,
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                  }}
                >
                  {/* Icon and title row */}
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      flex: 'none',
                      placeContent: 'center flex-start',
                      alignItems: 'center',
                      gap: '12px',
                      height: 'min-content',
                      width: 'min-content',
                      position: 'relative',
                      overflow: 'visible',
                    }}
                  >
                    {/* Icon placeholder */}
                    <div
                      style={{
                        width: '16px',
                        height: '16px',
                        aspectRatio: '1',
                        flexShrink: 0,
                        position: 'relative',
                        backgroundColor: currentTab.bgColor,
                        borderRadius: '4px',
                      }}
                    />
                    <p
                      style={{
                        fontWeight: 500,
                        fontSize: '16px',
                        letterSpacing: '-0.01em',
                        lineHeight: '24px',
                        color: 'rgb(0, 0, 0)',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {feature.title}
                    </p>
                  </div>

                  {/* Description */}
                  <p
                    style={{
                      fontWeight: 400,
                      fontSize: '14px',
                      letterSpacing: '-0.01em',
                      lineHeight: '160%',
                      color: 'rgb(105, 105, 105)',
                      marginTop: '8px',
                    }}
                  >
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Preview image */}
          <div
            style={{
              flex: '1 0 0',
              position: 'relative',
              overflow: 'visible',
            }}
            className="operations-preview"
          >
            <div
              style={{
                height: '100%',
                width: '100%',
                borderRadius: '16px',
                position: 'relative',
                overflow: 'hidden',
                backgroundColor: '#f5f5f7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Image
                src={currentTab.previewImage}
                alt={`${currentTab.label} preview`}
                fill
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
              {/* Fallback */}
              <div style={{
                position: 'absolute',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px',
                color: '#717171',
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '16px',
                  backgroundColor: currentTab.bgColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <svg width="24" height="24" viewBox="0 0 16 16" fill={currentTab.color}>
                    <path d="M8 0L9.5 5.5L15 7L9.5 8.5L8 14L6.5 8.5L1 7L6.5 5.5L8 0Z"/>
                  </svg>
                </div>
                <p style={{ fontSize: '14px', fontWeight: 500 }}>{currentTab.label}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab navigation */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            flex: 'none',
            placeContent: 'center',
            alignItems: 'center',
            gap: '8px',
            width: '100%',
            height: 'min-content',
            padding: '24px 0 0',
            position: 'relative',
            overflow: 'visible',
          }}
        >
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(index)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                backgroundColor: activeTab === index ? 'rgb(0, 0, 0)' : 'rgb(247, 247, 247)',
                color: activeTab === index ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)',
                borderRadius: '10px',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 500,
                fontSize: '14px',
                letterSpacing: '-0.01em',
                lineHeight: '22px',
                transition: 'all 0.3s ease',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
