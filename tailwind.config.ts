import type { Config } from "tailwindcss";

/**
 * Gruby Design System v2.0 - Tailwind Configuration
 *
 * SIMPLIFIED COLOR PALETTE:
 * - PRIMARY (#ff1e00): Brand Red - Buttons, key interactive elements
 * - CHARCOAL (#222222): Text, icons, borders
 * - SURFACE: White (#FFFFFF) / Warm Parchment (#FAF9F6) - Backgrounds
 * - BORDER (#D9D9D6): Wolf Gray - Borders, dividers
 */

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        aeonik: [
          "Aeonik Pro",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      colors: {
        // SHADCN COMPATIBILITY (using HSL variables)
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        // GRUBY DESIGN SYSTEM v2.0 - Semantic Token Colors
        // These use the CSS custom properties from globals.css
        ds: {
          // Backgrounds
          bg: "var(--color-bg)",
          "bg-subtle": "var(--color-bg-subtle)",
          surface: "var(--color-surface)",
          "surface-elevated": "var(--color-surface-elevated)",
          "surface-muted": "var(--color-surface-muted)",

          // Text
          text: "var(--color-text)",
          "text-muted": "var(--color-text-muted)",
          "text-subtle": "var(--color-text-subtle)",
          "text-inverse": "var(--color-text-inverse)",

          // Icons
          icon: "var(--color-icon)",
          "icon-muted": "var(--color-icon-muted)",
          "icon-subtle": "var(--color-icon-subtle)",

          // Borders
          border: "var(--color-border)",
          "border-subtle": "var(--color-border-subtle)",
          "border-strong": "var(--color-border-strong)",

          // Primary (Primary Brown - Buttons & Key Elements)
          primary: "var(--color-primary)",
          "primary-fg": "var(--color-primary-foreground)",
          "primary-hover": "var(--color-primary-hover)",

          // Secondary
          secondary: "var(--color-secondary)",
          "secondary-fg": "var(--color-secondary-foreground)",
          "secondary-border": "var(--color-secondary-border)",

          // Support (Olive - Accent)
          support: "var(--color-support)",
          "support-fg": "var(--color-support-foreground)",
          "support-muted": "var(--color-support-muted)",

          // Accent Warm (Burnt Umber)
          "accent-warm": "var(--color-accent-warm)",
          "accent-warm-fg": "var(--color-accent-warm-foreground)",
          "accent-warm-muted": "var(--color-accent-warm-muted)",

          // Danger (Dried Chili)
          danger: "var(--color-danger)",
          "danger-fg": "var(--color-danger-foreground)",
          "danger-muted": "var(--color-danger-muted)",

          // Status
          success: "var(--color-success)",
          warning: "var(--color-warning)",
          info: "var(--color-info)",

          // Interactive
          focus: "var(--color-focus)",
          "focus-ring": "var(--color-focus-ring)",
          overlay: "var(--color-overlay)",

          // UI Elements
          skeleton: "var(--color-skeleton)",
          input: "var(--color-input)",
          "input-border": "var(--color-input-border)",
          "nav-chrome": "var(--color-nav-chrome)",
          "tab-indicator": "var(--color-tab-indicator)",
          badge: "var(--color-badge)",
          "badge-text": "var(--color-badge-text)",
          chip: "var(--color-chip)",
          "chip-border": "var(--color-chip-border)",
          "chip-selected": "var(--color-chip-selected)",
          "chip-selected-text": "var(--color-chip-selected-text)",
        },

        // PRIMITIVE COLORS (direct hex for edge cases)
        primitive: {
          "primary-brown": "#ff1e00",
          charcoal: "#222222",
          white: "#FFFFFF",
          parchment: "#FAF9F6",
          "wolf-gray": "#D9D9D6",
          olive: "#222222", // DEPRECATED - Maps to charcoal
          "burnt-umber": "#9C6B3F",
          "clay-taupe": "#B8A89A",
          "dried-chili": "#7A3E2E",
        },

        // LEGACY ALIASES (for backwards compatibility)
        gruby: {
          primary: "var(--color-support)",
          secondary: "var(--color-accent-warm)",
          accent: "var(--color-danger)",
        },
      },

      // SPACING - 4px base unit
      spacing: {
        "0.5": "2px",
        "1": "4px",
        "1.5": "6px",
        "2": "8px",
        "2.5": "10px",
        "3": "12px",
        "4": "16px",
        "5": "20px",
        "6": "24px",
        "8": "32px",
        "10": "40px",
        "12": "48px",
        "16": "64px",
        "20": "80px",
        "24": "96px",
      },

      // BORDER RADIUS
      borderRadius: {
        none: "0px",
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        DEFAULT: "var(--radius)",
        lg: "var(--radius-lg)",
        button: "var(--radius-button)",
        card: "var(--radius-card)",
        pill: "var(--radius-pill)",
        xl: "var(--radius-xl)",
        full: "var(--radius-full)",
      },

      // BOX SHADOW
      boxShadow: {
        sm: "0 1px 2px var(--color-shadow)",
        DEFAULT: "0 2px 8px var(--color-shadow)",
        md: "0 4px 12px var(--color-shadow)",
        lg: "0 8px 24px var(--color-shadow-strong)",
        button: "0px 1px 2px rgba(0,0,0,0.08), 0px 2px 8px rgba(0,0,0,0.04)",
      },

      // RING (focus states)
      ringColor: {
        DEFAULT: "var(--color-focus-ring)",
        focus: "var(--color-focus)",
      },
      ringOffsetColor: {
        DEFAULT: "var(--color-bg)",
      },

      // ANIMATION SCALES
      scale: {
        "press-button": "var(--press-scale-button)",
        "press-card": "var(--press-scale-card)",
        "press-chip": "var(--press-scale-chip)",
        "press-icon": "var(--press-scale-icon)",
      },

      // OPACITY
      opacity: {
        disabled: "var(--opacity-disabled)",
        hover: "var(--opacity-hover)",
        active: "var(--opacity-active)",
      },

      // KEYFRAMES
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "skeleton-pulse": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },

      // ANIMATIONS
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        skeleton: "skeleton-pulse 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
