"use client";

import Image from "next/image";
import { useEffect, useRef, memo } from "react";

const recipes = [
  {
    title: "Creamy Tuscan Chicken",
    category: "Under 30 mins",
    image:
      "https://images.pexels.com/photos/6210747/pexels-photo-6210747.jpeg?auto=compress&cs=tinysrgb&w=800",
    pricePerServing: 4.12,
    savings: 8.50,
  },
  {
    title: "Sheet Pan Salmon",
    category: "Healthy",
    image:
      "https://images.pexels.com/photos/3763847/pexels-photo-3763847.jpeg?auto=compress&cs=tinysrgb&w=800",
    pricePerServing: 5.89,
    savings: 12.00,
  },
  {
    title: "Viral Baked Feta Pasta",
    category: "TikTok Trending",
    image:
      "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=800",
    pricePerServing: 2.75,
    savings: 9.25,
  },
  {
    title: "Korean Beef Bowls",
    category: "Budget-Friendly",
    image:
      "https://images.pexels.com/photos/5409015/pexels-photo-5409015.jpeg?auto=compress&cs=tinysrgb&w=800",
    pricePerServing: 3.40,
    savings: 11.60,
  },
  {
    title: "One-Pot Chicken Alfredo",
    category: "Kid-Friendly",
    image:
      "https://images.pexels.com/photos/11220209/pexels-photo-11220209.jpeg?auto=compress&cs=tinysrgb&w=800",
    pricePerServing: 3.25,
    savings: 7.75,
  },
  {
    title: "Mediterranean Bowls",
    category: "Meal Prep",
    image:
      "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800",
    pricePerServing: 4.50,
    savings: 6.50,
  },
  {
    title: "Homemade Ramen",
    category: "Comfort Food",
    image:
      "https://images.pexels.com/photos/884600/pexels-photo-884600.jpeg?auto=compress&cs=tinysrgb&w=800",
    pricePerServing: 2.95,
    savings: 14.05,
  },
  {
    title: "Avocado Toast 5 Ways",
    category: "Breakfast",
    image:
      "https://images.pexels.com/photos/1351238/pexels-photo-1351238.jpeg?auto=compress&cs=tinysrgb&w=800",
    pricePerServing: 1.85,
    savings: 5.15,
  },
];

const RecipeCard = memo(function RecipeCard({ recipe }: { recipe: (typeof recipes)[0] }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        flexShrink: 0,
        width: "360px",
        height: "480px",
        borderRadius: "16px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Background image */}
      <Image
        src={recipe.image}
        alt={recipe.title}
        fill
        sizes="360px"
        className="object-cover object-center"
        loading="lazy"
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
        }}
      />
      {/* Content */}
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          padding: "24px",
        }}
      >
        {/* Category tag */}
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
              fontSize: "clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)",
              letterSpacing: "-0.01em",
              lineHeight: "24px",
              color: "rgb(255, 255, 255)",
            }}
          >
            {recipe.category}
          </p>
        </div>
        {/* Title */}
        <h5
          style={{
            fontWeight: 600,
            fontSize: "clamp(1rem, 0.9rem + 0.5vw, 1.125rem)",
            letterSpacing: "-0.01em",
            lineHeight: "140%",
            color: "rgb(255, 255, 255)",
          }}
        >
          {recipe.title}
        </h5>
        {/* Price and Savings */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "2px",
            }}
          >
            <p
              style={{
                fontWeight: 600,
                fontSize: "clamp(1.125rem, 1rem + 0.5vw, 1.25rem)",
                letterSpacing: "-0.02em",
                lineHeight: "1.2",
                color: "rgb(255, 255, 255)",
              }}
            >
              ${recipe.pricePerServing.toFixed(2)}/serving
            </p>
            <p
              style={{
                fontWeight: 500,
                fontSize: "clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)",
                letterSpacing: "-0.01em",
                lineHeight: "1.4",
                color: "rgb(74, 222, 128)",
              }}
            >
              Save ${recipe.savings.toFixed(2)} vs takeout
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});

export default function Templates() {
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    let animationId: number;
    let scrollPosition = 0;
    const scrollSpeed = 0.5;

    const scroll = () => {
      scrollPosition += scrollSpeed;

      // Reset when we've scrolled half the content (since we duplicate it)
      if (scrollPosition >= carousel.scrollWidth / 2) {
        scrollPosition = 0;
      }

      carousel.scrollLeft = scrollPosition;
      animationId = requestAnimationFrame(scroll);
    };

    // Start scrolling
    animationId = requestAnimationFrame(scroll);

    // Pause on hover
    const handleMouseEnter = () => cancelAnimationFrame(animationId);
    const handleMouseLeave = () => {
      scrollPosition = carousel.scrollLeft;
      animationId = requestAnimationFrame(scroll);
    };

    carousel.addEventListener("mouseenter", handleMouseEnter);
    carousel.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      carousel.removeEventListener("mouseenter", handleMouseEnter);
      carousel.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section
      id="recipes"
      style={{
        display: "flex",
        flexDirection: "column",
        placeContent: "flex-start",
        alignItems: "center",
        gap: "48px",
        width: "100%",
        padding: "80px 0",
        position: "relative",
        overflow: "hidden",
      }}
      className="templates-section"
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
          maxWidth: "1540px",
          padding: "0 16px",
        }}
      >
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
          Recipes you&apos;ll actually want to make
        </h2>

        {/* Subtext */}
        <h5
          style={{
            fontWeight: 600,
            fontSize: "clamp(1rem, 0.9rem + 0.5vw, 1.125rem)",
            letterSpacing: "-0.01em",
            lineHeight: "140%",
            color: "rgb(178, 178, 178)",
            textAlign: "center",
          }}
        >
          From viral videos to your kitchen in seconds
        </h5>
      </div>

      {/* Horizontal scrolling carousel */}
      <div
        ref={carouselRef}
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "24px",
          width: "100%",
          overflowX: "auto",
          padding: "0 16px",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
        className="templates-carousel"
      >
        {/* Duplicate recipes for seamless infinite scroll */}
        {[...recipes, ...recipes].map((recipe, index) => (
          <RecipeCard key={`${recipe.title}-${index}`} recipe={recipe} />
        ))}
      </div>
    </section>
  );
}
