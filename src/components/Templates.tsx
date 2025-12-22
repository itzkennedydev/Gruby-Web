'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'

const recipes = [
  {
    title: 'Creamy Tuscan Chicken',
    category: 'Under 30 mins',
    image: 'https://images.pexels.com/photos/6210747/pexels-photo-6210747.jpeg?auto=compress&cs=tinysrgb&w=800',
    href: '#download',
  },
  {
    title: 'Sheet Pan Salmon',
    category: 'Healthy',
    image: 'https://images.pexels.com/photos/3763847/pexels-photo-3763847.jpeg?auto=compress&cs=tinysrgb&w=800',
    href: '#download',
  },
  {
    title: 'Viral Baked Feta Pasta',
    category: 'TikTok Trending',
    image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=800',
    href: '#download',
  },
  {
    title: 'Korean Beef Bowls',
    category: 'Budget-Friendly',
    image: 'https://images.pexels.com/photos/5409015/pexels-photo-5409015.jpeg?auto=compress&cs=tinysrgb&w=800',
    href: '#download',
  },
  {
    title: 'One-Pot Chicken Alfredo',
    category: 'Kid-Friendly',
    image: 'https://images.pexels.com/photos/11220209/pexels-photo-11220209.jpeg?auto=compress&cs=tinysrgb&w=800',
    href: '#download',
  },
  {
    title: 'Mediterranean Bowls',
    category: 'Meal Prep',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
    href: '#download',
  },
  {
    title: 'Homemade Ramen',
    category: 'Comfort Food',
    image: 'https://images.pexels.com/photos/884600/pexels-photo-884600.jpeg?auto=compress&cs=tinysrgb&w=800',
    href: '#download',
  },
  {
    title: 'Avocado Toast 5 Ways',
    category: 'Breakfast',
    image: 'https://images.pexels.com/photos/1351238/pexels-photo-1351238.jpeg?auto=compress&cs=tinysrgb&w=800',
    href: '#download',
  },
]

function RecipeCard({ recipe }: { recipe: typeof recipes[0] }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        flexShrink: 0,
        width: '420px',
        height: '560px',
        borderRadius: '20px',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Background image */}
      <img
        src={recipe.image}
        alt={recipe.title}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
        }}
      />
      {/* Gradient overlay */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '60%',
          background: 'linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 100%)',
        }}
      />
      {/* Content */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          padding: '32px',
        }}
      >
        {/* Category tag */}
        <div
          style={{
            display: 'inline-flex',
            alignSelf: 'flex-start',
            padding: '8px 16px',
            backgroundColor: 'rgba(255, 255, 255, 0.25)',
            backdropFilter: 'blur(10px)',
            borderRadius: '10px',
          }}
        >
          <p
            style={{
              fontWeight: 500,
              fontSize: '15px',
              letterSpacing: '-0.01em',
              lineHeight: '24px',
              color: 'rgb(255, 255, 255)',
            }}
          >
            {recipe.category}
          </p>
        </div>
        {/* Title */}
        <h5
          style={{
            fontWeight: 600,
            fontSize: '22px',
            letterSpacing: '-0.02em',
            lineHeight: '140%',
            color: 'rgb(255, 255, 255)',
          }}
        >
          {recipe.title}
        </h5>
        {/* Button */}
        <Link
          href={recipe.href}
          className="transition-all hover:opacity-90 active:scale-[0.98]"
          style={{
            display: 'inline-flex',
            alignSelf: 'flex-start',
            alignItems: 'center',
            gap: '8px',
            padding: '14px 24px',
            backgroundColor: 'rgb(255, 255, 255)',
            borderRadius: '13px',
            boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.12), 0px 2px 8px 0px rgba(0, 0, 0, 0.04)',
            textDecoration: 'none',
          }}
        >
          <p
            style={{
              fontWeight: 500,
              fontSize: '17px',
              letterSpacing: '-0.01em',
              lineHeight: '24px',
              color: 'rgb(0, 0, 0)',
            }}
          >
            View Recipe
          </p>
        </Link>
      </div>
    </div>
  )
}

export default function Templates() {
  const carouselRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const carousel = carouselRef.current
    if (!carousel) return

    let animationId: number
    let scrollPosition = 0
    const scrollSpeed = 0.5

    const scroll = () => {
      scrollPosition += scrollSpeed

      // Reset when we've scrolled half the content (since we duplicate it)
      if (scrollPosition >= carousel.scrollWidth / 2) {
        scrollPosition = 0
      }

      carousel.scrollLeft = scrollPosition
      animationId = requestAnimationFrame(scroll)
    }

    // Start scrolling
    animationId = requestAnimationFrame(scroll)

    // Pause on hover
    const handleMouseEnter = () => cancelAnimationFrame(animationId)
    const handleMouseLeave = () => {
      scrollPosition = carousel.scrollLeft
      animationId = requestAnimationFrame(scroll)
    }

    carousel.addEventListener('mouseenter', handleMouseEnter)
    carousel.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      cancelAnimationFrame(animationId)
      carousel.removeEventListener('mouseenter', handleMouseEnter)
      carousel.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <section
      id="recipes"
      style={{
        display: 'flex',
        flexDirection: 'column',
        placeContent: 'flex-start',
        alignItems: 'center',
        gap: '48px',
        width: '100%',
        padding: '80px 0',
        position: 'relative',
        overflow: 'hidden',
      }}
      className="templates-section"
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          placeContent: 'flex-start',
          alignItems: 'center',
          gap: '16px',
          width: '100%',
          maxWidth: '1540px',
          padding: '0 16px',
        }}
      >
        {/* Label with icon */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            placeContent: 'center',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <p
            style={{
              fontWeight: 500,
              fontSize: '14px',
              letterSpacing: '-0.01em',
              lineHeight: '24px',
              color: '#717171',
            }}
          >
            Trending recipes
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
          }}
        >
          Recipes you&apos;ll actually want to make
        </h2>

        {/* Subtext */}
        <h5
          style={{
            fontWeight: 600,
            fontSize: '18px',
            letterSpacing: '-0.01em',
            lineHeight: '140%',
            color: 'rgb(178, 178, 178)',
            textAlign: 'center',
          }}
        >
          Curated from TikTok, YouTube, and top food creators
        </h5>

        {/* Browse Recipes button */}
        <Link
          href="#download"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 20px',
            backgroundColor: 'rgb(0, 0, 0)',
            borderRadius: '13px',
            boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.12), 0px 2px 8px 0px rgba(0, 0, 0, 0.04)',
            textDecoration: 'none',
          }}
        >
          <p
            style={{
              fontWeight: 500,
              fontSize: '16px',
              letterSpacing: '-0.01em',
              lineHeight: '24px',
              color: 'rgb(255, 255, 255)',
            }}
          >
            Browse All Recipes
          </p>
        </Link>
      </div>

      {/* Horizontal scrolling carousel */}
      <div
        ref={carouselRef}
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '32px',
          width: '100%',
          overflowX: 'auto',
          padding: '0 16px',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
        className="templates-carousel"
      >
        {/* Duplicate recipes for seamless infinite scroll */}
        {[...recipes, ...recipes].map((recipe, index) => (
          <RecipeCard key={`${recipe.title}-${index}`} recipe={recipe} />
        ))}
      </div>
    </section>
  )
}
