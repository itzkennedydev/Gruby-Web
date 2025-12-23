/**
 * Gruby Typography System
 *
 * Hierarchy based on:
 * - Label: Small eyebrow text (e.g., "Made for every cook")
 * - Headline: Main section titles (e.g., "From ramen packets to restaurant-worthy")
 * - Subheadline: Supporting text (e.g., "Save money, eat better and actually enjoy the process")
 * - Body: Regular paragraph text
 * - Small: Fine print, captions
 */

export const typography = {
  // Label/Eyebrow - Muted text above headlines
  label: {
    fontSize: "clamp(0.875rem, 0.8rem + 0.375vw, 1rem)",
    fontWeight: 500,
    letterSpacing: "-0.01em",
    lineHeight: "1.5",
    color: "#717171",
  },

  // Display - Hero headlines (largest)
  display: {
    fontSize: "clamp(2.5rem, 4vw + 1.5rem, 4rem)",
    fontWeight: 600,
    letterSpacing: "-0.04em",
    lineHeight: "1.1",
  },

  // Headline - Section titles
  headline: {
    fontSize: "clamp(1.75rem, 2.5vw + 1rem, 2.5rem)",
    fontWeight: 600,
    letterSpacing: "-0.03em",
    lineHeight: "1.2",
  },

  // Subheadline - Supporting headline text
  subheadline: {
    fontSize: "clamp(1rem, 0.9rem + 0.5vw, 1.25rem)",
    fontWeight: 400,
    letterSpacing: "-0.01em",
    lineHeight: "1.6",
    color: "#717171",
  },

  // Title - Card titles, smaller sections
  title: {
    fontSize: "clamp(1.25rem, 1.5vw + 0.75rem, 1.5rem)",
    fontWeight: 600,
    letterSpacing: "-0.02em",
    lineHeight: "1.3",
  },

  // Body - Regular paragraph text
  body: {
    fontSize: "clamp(1rem, 0.9rem + 0.25vw, 1.125rem)",
    fontWeight: 400,
    letterSpacing: "-0.01em",
    lineHeight: "1.75",
  },

  // Small - Captions, fine print
  small: {
    fontSize: "clamp(0.75rem, 0.7rem + 0.15vw, 0.875rem)",
    fontWeight: 400,
    letterSpacing: "0",
    lineHeight: "1.5",
    color: "#717171",
  },

  // Button text
  button: {
    fontSize: "clamp(0.875rem, 0.8rem + 0.2vw, 1rem)",
    fontWeight: 500,
    letterSpacing: "-0.01em",
    lineHeight: "1.5",
  },
} as const;

// Tailwind-compatible class strings for common patterns
export const typographyClasses = {
  label: "text-base font-medium tracking-tight text-[#717171]",
  headline: "text-[clamp(1.75rem,2.5vw+1rem,2.5rem)] font-semibold tracking-tight leading-tight",
  subheadline: "text-[clamp(1rem,0.9rem+0.5vw,1.25rem)] font-normal leading-relaxed text-[#717171]",
  title: "text-[clamp(1.25rem,1.5vw+0.75rem,1.5rem)] font-semibold tracking-tight leading-snug",
  body: "text-[clamp(1rem,0.9rem+0.25vw,1.125rem)] leading-relaxed",
  small: "text-sm text-[#717171]",
} as const;

// Colors used in typography
export const colors = {
  text: {
    primary: "#222222",    // Main text
    secondary: "#717171",  // Muted/supporting text
    inverse: "#ffffff",    // Text on dark backgrounds
    inverseSecondary: "rgba(255, 255, 255, 0.6)", // Muted text on dark
  },
  accent: {
    success: "#16A34A",    // Savings, positive numbers
    error: "#DC2626",      // Expensive, negative numbers
    primary: "var(--gruby-primary)", // Brand coral
  },
} as const;
