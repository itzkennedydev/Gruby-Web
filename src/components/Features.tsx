'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

// Sparkle icon for AI
const SparkleIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
    <path d="M8 0L9.5 5.5L15 7L9.5 8.5L8 14L6.5 8.5L1 7L6.5 5.5L8 0Z"/>
  </svg>
)

// Chevron icon for explore button
const ChevronIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
    <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

// Play icon small (for corner button)
const PlayIconSmall = () => (
  <svg viewBox="0 0 10 12" fill="white" width="10" height="12">
    <path d="M0.319 0.08C0.515 -0.03 0.756 -0.026 0.949 0.09L9.699 5.403C9.886 5.516 10 5.719 10 5.937C10 6.156 9.886 6.358 9.699 6.472L0.949 11.784C0.756 11.901 0.515 11.905 0.318 11.795C0.122 11.684 0 11.476 0 11.25L0 0.625C0 0.399 0.122 0.191 0.319 0.08Z"/>
  </svg>
)

// Play icon large (for center button)
const PlayIconLarge = () => (
  <svg viewBox="0 0 24 28.5" fill="black" width="24" height="28">
    <path d="M0.765 0.193C1.237 -0.073 1.815 -0.064 2.279 0.217L23.279 12.967C23.727 13.239 24.001 13.725 24.001 14.25C24.001 14.774 23.727 15.26 23.279 15.532L2.279 28.282C1.815 28.563 1.236 28.573 0.764 28.307C0.292 28.041 0 27.541 0 27L0 1.5C0 0.958 0.293 0.459 0.765 0.193Z"/>
  </svg>
)

// External link arrow icon
const ExternalArrowIcon = () => (
  <svg viewBox="0 0 20 21" fill="none" width="20" height="21">
    <path d="M5.83331 14.6667L14.1666 6.33337" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M5.83331 6.33337H14.1666V14.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const tabs = [
  { id: 'import', label: 'Recipe Import', subtitle: 'Paste any link' },
  { id: 'prices', label: 'Grocery Prices', subtitle: 'Real-time costs' },
  { id: 'cooking', label: 'Cooking Mode', subtitle: 'Step-by-step' },
  { id: 'stories', label: 'Stories', subtitle: 'Share your wins' },
  { id: 'ai-coach', label: 'AI Coach', subtitle: 'Ask anything' },
  { id: 'pantry', label: 'Pantry', subtitle: 'Zero waste' },
]

const tabImages: Record<string, string> = {
  'import': '/mockups/recipe-import.png',
  'prices': '/mockups/grocery-prices.png',
  'cooking': '/mockups/cooking-mode.png',
  'stories': '/mockups/stories.png',
  'ai-coach': '/mockups/ai-coach.png',
  'pantry': '/mockups/pantry.png',
}

export default function Features() {
  const [activeTab, setActiveTab] = useState('import')

  return (
    <section
      id="features"
      className="features-section"
      style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 'none',
        placeContent: 'center flex-start',
        alignItems: 'center',
        gap: '48px',
        width: '100%',
        height: 'min-content',
        padding: '80px 0',
        position: 'relative',
        overflow: 'visible',
      }}
    >
      {/* Header content */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 'none',
          placeContent: 'center',
          alignItems: 'center',
          gap: '24px',
          width: '100%',
          maxWidth: '1540px',
          height: 'min-content',
          padding: '0 16px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Badge */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            flex: 'none',
            placeContent: 'center',
            alignItems: 'center',
            gap: '8px',
            width: 'min-content',
            height: 'min-content',
            padding: '4px 8px',
            borderRadius: '8px',
            position: 'relative',
            overflow: 'visible',
          }}
        >
          <p
            style={{
              fontWeight: 500,
              fontSize: '14px',
              letterSpacing: '-0.01em',
              lineHeight: '24px',
              color: '#717171',
              whiteSpace: 'pre',
            }}
          >
            AI-powered cooking
          </p>
        </div>

        {/* Headline */}
        <div
          className="features-headline"
          style={{
            width: '80%',
            maxWidth: '800px',
          }}
        >
          <h2
            className="features-headline-text"
            style={{
              fontWeight: 600,
              fontSize: '48px',
              letterSpacing: '-0.04em',
              lineHeight: '110%',
              color: '#1c1b17',
              textAlign: 'center',
            }}
          >
            From TikTok to table.
            <br />
            Cook smarter, spend less.
          </h2>
        </div>

        {/* Subtitle */}
        <div
          className="features-subtitle"
          style={{
            width: '570px',
            maxWidth: '100%',
          }}
        >
          <h6
            style={{
              fontWeight: 500,
              fontSize: '16px',
              letterSpacing: '-0.01em',
              lineHeight: '1.4em',
              color: 'rgb(105, 105, 105)',
              textAlign: 'center',
            }}
          >
            Paste any recipe link. Get real grocery prices. Cook with AI-powered guidance. Save money on every meal.
          </h6>
        </div>
      </div>

      {/* Buttons */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flex: 'none',
          placeContent: 'center',
          alignItems: 'center',
          gap: '10px',
          width: '100%',
          maxWidth: '1540px',
          height: 'min-content',
          padding: '0 16px',
          position: 'relative',
          overflow: 'visible',
        }}
      >
        {/* Download Now - Primary */}
        <Link
          href="#download"
          rel="noopener"
          className="transition-colors hover:opacity-90"
          style={{
            display: 'flex',
            flexDirection: 'row',
            placeContent: 'center',
            alignItems: 'center',
            width: 'min-content',
            height: 'min-content',
            padding: '8px 16px',
            textDecoration: 'none',
            backgroundColor: 'var(--gruby-primary)',
            borderRadius: '13px',
            boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.12), 0px 2px 8px 0px rgba(0, 0, 0, 0.04)',
          }}
        >
          <div style={{ whiteSpace: 'pre', flex: 'none' }}>
            <p
              style={{
                letterSpacing: '-0.01em',
                lineHeight: '24px',
                color: 'rgb(255, 255, 255)',
              }}
            >
              Get Early Access
            </p>
          </div>
        </Link>

        {/* See How It Works - Gray */}
        <Link
          href="#how-it-works"
          className="transition-colors hover:bg-[#eeeeee]"
          style={{
            display: 'flex',
            flexDirection: 'row',
            placeContent: 'center',
            alignItems: 'center',
            gap: '4px',
            width: 'min-content',
            height: 'min-content',
            padding: '8px 8px 8px 16px',
            textDecoration: 'none',
            backgroundColor: 'rgb(247, 247, 247)',
            borderRadius: '13px',
          }}
        >
          <div style={{ whiteSpace: 'pre', flex: 'none' }}>
            <p
              style={{
                letterSpacing: '-0.01em',
                lineHeight: '24px',
                color: 'rgb(0, 0, 0)',
              }}
            >
              See how it works
            </p>
          </div>
          <div style={{ flex: 'none', width: '24px', height: '24px', color: 'black' }}>
            <ChevronIcon />
          </div>
        </Link>
      </div>

      {/* Interactive Demo - wrapper for consistent padding */}
      <div
        style={{
          width: '100%',
          maxWidth: '1540px',
          padding: '0 16px',
        }}
      >
        <div
          className="features-demo"
          style={{
            width: '100%',
            height: '720px',
            backgroundColor: 'rgb(249, 248, 248)',
            borderRadius: '16px',
            position: 'relative',
            overflow: 'hidden',
            backdropFilter: 'blur(6px)',
          }}
        >
        {/* Main image */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: 'inherit',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #f5f5f7 0%, #e8e8ed 100%)',
          }}
        >
          <Image
            src={tabImages[activeTab]}
            alt="Feature demo"
            fill
            style={{
              objectFit: 'cover',
              objectPosition: 'center top',
              borderRadius: 'inherit',
            }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
          {/* Fallback content */}
          <div style={{
            position: 'absolute',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            color: '#717171',
            zIndex: 0,
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '20px',
              backgroundColor: 'rgba(107, 106, 70, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <SparkleIcon />
            </div>
            <p style={{ fontSize: '16px', fontWeight: 500 }}>
              {tabs.find(t => t.id === activeTab)?.label}
            </p>
          </div>
        </div>

        {/* Video overlay with hover state */}
        <div
          className="features-video-overlay group"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backdropFilter: 'blur(0px)',
            backgroundColor: 'rgba(0, 0, 0, 0)',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
          }}
        >
          {/* Center play button and View Demo - shown on hover */}
          <div
            className="features-center-controls"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '16px',
              opacity: 0,
              transition: 'opacity 0.3s ease',
            }}
          >
            {/* Large circular play button */}
            <div
              style={{
                width: '80px',
                height: '80px',
                backgroundColor: 'rgb(255, 255, 255)',
                borderRadius: '999px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '6px solid rgba(0, 0, 0, 0.1)',
                boxShadow: 'rgba(0, 0, 0, 0.18) 0px 0.602187px 0.602187px -1.25px, rgba(0, 0, 0, 0.16) 0px 2.28853px 2.28853px -2.5px, rgba(0, 0, 0, 0.06) 0px 10px 10px -3.75px',
              }}
            >
              <PlayIconLarge />
            </div>

            {/* View Demo button */}
            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 12px 8px 16px',
                backgroundColor: 'rgb(255, 255, 255)',
                borderRadius: '13px',
                border: 'none',
                boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 2px 0px, rgba(0, 0, 0, 0.04) 0px 2px 8px 0px',
                cursor: 'pointer',
              }}
            >
              <p
                style={{
                  letterSpacing: '-0.01em',
                  lineHeight: '24px',
                  color: 'rgb(0, 0, 0)',
                }}
              >
                Watch Demo
              </p>
              <div style={{ color: 'black' }}>
                <ExternalArrowIcon />
              </div>
            </button>
          </div>

          {/* Corner play button with time - always visible */}
          <div
            className="features-corner-button"
            style={{
              position: 'absolute',
              top: '24px',
              left: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'rgba(0, 0, 0, 0.15)',
              borderRadius: '10px',
              padding: '8px 12px',
              transition: 'opacity 0.3s ease',
            }}
          >
            <PlayIconSmall />
            <p
              style={{
                fontSize: '14px',
                fontWeight: 500,
                letterSpacing: '-0.01em',
                lineHeight: '24px',
                color: 'rgb(255, 255, 255)',
              }}
            >
              2:30
            </p>
          </div>
        </div>

        {/* Tabs bar container */}
        <div
          className="features-tabs-container"
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '24px',
            width: '100%',
          }}
        >
          <div
            className="features-tabs"
            style={{
              display: 'flex',
              flexDirection: 'row',
              flex: '1 0 0',
              width: '1px',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                backgroundColor: 'rgb(0, 0, 0)',
                borderRadius: '16px',
                padding: '8px',
                gap: '4px',
              }}
            >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '8px 16px',
                borderRadius: '12px',
                border: 'none',
                backgroundColor: activeTab === tab.id ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
              }}
            >
              <p
                style={{
                  fontWeight: 600,
                  fontSize: '16px',
                  color: 'rgb(255, 255, 255)',
                  opacity: activeTab === tab.id ? 1 : 0.5,
                  textAlign: 'center',
                }}
              >
                {tab.label}
              </p>
              <p
                style={{
                  fontWeight: 600,
                  fontSize: '14px',
                  color: 'rgba(255, 255, 255, 0.5)',
                  opacity: activeTab === tab.id ? 1 : 0.5,
                  textAlign: 'center',
                }}
              >
                {tab.subtitle}
              </p>
            </button>
          ))}
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  )
}
