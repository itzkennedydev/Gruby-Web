"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface FooterProps {
  variant?: "default" | "docs";
}

export function Footer({ variant = "default" }: FooterProps) {
  const [footerEmail, setFooterEmail] = useState("");
  const isDocs = variant === "docs";

  function handleNewsletterSubmit(event: React.FormEvent) {
    event.preventDefault();
    // Handle newsletter subscription logic here
    setFooterEmail(""); // Clear the input after submission
  }

  return (
    <footer className="border-t border-[#E5E5E5] bg-white">
      <div
        className="mx-auto max-w-[1920px]"
        style={{
          paddingLeft: "clamp(1rem, 2vw, 2rem)",
          paddingRight: "clamp(1rem, 2vw, 2rem)",
          paddingTop: "clamp(2rem, 3vw, 3rem)",
          paddingBottom: "clamp(2rem, 3vw, 3rem)",
          containerType: "inline-size",
        }}
      >
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5"
          style={{ gap: "clamp(1.5rem, 2vw, 2rem)" }}
        >
          <div className="col-span-1 sm:col-span-2 md:col-span-1">
            <Image
              src={isDocs ? "/GrubyLogoDark.svg" : "/GrubyLogo.svg"}
              alt="Gruby Logo"
              width={100}
              height={36}
              className="mb-3 sm:mb-4"
            />
            <p
              className="text-[#717171]"
              style={{ fontSize: "clamp(0.75rem, 1vw + 0.25rem, 0.875rem)" }}
            >
              Join the people who are choosing to eat better and spend less on
              groceries.
            </p>

            {/* App Store Download Links */}
            <div className="mt-3 flex flex-row gap-2">
              <a
                href="https://apps.apple.com/in/app/gruby/id6755449783"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1.5 rounded border border-[#D9D9D6] bg-white px-2.5 py-1.5 text-[#717171] no-underline transition-all duration-200 active:scale-[0.98] ${
                  isDocs
                    ? "hover:border-[#222222] hover:text-[#222222]"
                    : "hover:border-[#ff1e00] hover:text-[#ff1e00]"
                }`}
              >
                <svg
                  className="h-3.5 w-3.5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C1.79 15.25 2.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                </svg>
                <div className="flex flex-col items-start">
                  <span className="text-[8px] leading-tight opacity-60">
                    Download on the
                  </span>
                  <span className="text-[10px] font-semibold leading-tight">
                    App Store
                  </span>
                </div>
              </a>
            </div>
          </div>

          <div>
            <h3
              className="font-semibold text-[#222222]"
              style={{
                marginBottom: "clamp(0.75rem, 1vw, 1rem)",
                fontSize: "clamp(0.75rem, 1vw + 0.25rem, 0.875rem)",
              }}
            >
              Support
            </h3>
            <ul
              className="space-y-2 sm:space-y-3"
              style={{ fontSize: "clamp(0.75rem, 1vw + 0.25rem, 0.875rem)" }}
            >
              <li>
                <Link
                  href="/faq"
                  className="text-[#717171] transition-colors hover:text-[#222222]"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/media-kit"
                  className="text-[#717171] transition-colors hover:text-[#222222]"
                >
                  Media Kit
                </Link>
              </li>
              <li>
                <Link
                  href="/logos"
                  className="text-[#717171] transition-colors hover:text-[#222222]"
                >
                  Logos & Assets
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3
              className="font-semibold text-[#222222]"
              style={{
                marginBottom: "clamp(0.75rem, 1vw, 1rem)",
                fontSize: "clamp(0.75rem, 1vw + 0.25rem, 0.875rem)",
              }}
            >
              Legal
            </h3>
            <ul
              className="space-y-2 sm:space-y-3"
              style={{ fontSize: "clamp(0.75rem, 1vw + 0.25rem, 0.875rem)" }}
            >
              <li>
                <Link
                  href="/terms"
                  className="text-[#717171] transition-colors hover:text-[#222222]"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-[#717171] transition-colors hover:text-[#222222]"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/cookies"
                  className="text-[#717171] transition-colors hover:text-[#222222]"
                >
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/dmca"
                  className="text-[#717171] transition-colors hover:text-[#222222]"
                >
                  DMCA Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3
              className="font-semibold text-[#222222]"
              style={{
                marginBottom: "clamp(0.75rem, 1vw, 1rem)",
                fontSize: "clamp(0.75rem, 1vw + 0.25rem, 0.875rem)",
              }}
            >
              Community
            </h3>
            <ul
              className="space-y-2 sm:space-y-3"
              style={{ fontSize: "clamp(0.75rem, 1vw + 0.25rem, 0.875rem)" }}
            >
              <li>
                <Link
                  href="/community-guidelines"
                  className="text-[#717171] transition-colors hover:text-[#222222]"
                >
                  Community Guidelines
                </Link>
              </li>
              <li>
                <Link
                  href="/accessibility"
                  className="text-[#717171] transition-colors hover:text-[#222222]"
                >
                  Accessibility
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-xs font-semibold text-[#222222] sm:mb-4 sm:text-sm">
              Newsletter
            </h3>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <input
                type="email"
                value={footerEmail}
                onChange={(e) => setFooterEmail(e.target.value)}
                placeholder="Enter your email"
                className={`w-full rounded-full border-0 bg-[#f5f5f7] px-3 py-2 text-xs transition-shadow focus:outline-none focus:ring-2 sm:px-4 sm:py-2.5 sm:text-sm md:py-3 md:text-base ${
                  isDocs ? "focus:ring-[#222222]" : "focus:ring-[#ff1e00]"
                }`}
                required
              />
              <button
                type="submit"
                className={`inline-flex w-full items-center justify-center rounded-full px-4 py-2 text-xs font-medium text-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_2px_8px_0px_rgba(0,0,0,0.04)] transition-all duration-200 active:scale-[0.98] sm:py-2.5 sm:text-sm md:py-3 md:text-base ${
                  isDocs
                    ? "bg-[#222222] hover:bg-[#333333]"
                    : "bg-[#ff1e00] hover:bg-[#e61b00]"
                }`}
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="border-t border-[#E5E5E5]">
        <div
          className="mx-auto max-w-[1920px]"
          style={{
            paddingLeft: "clamp(1rem, 2vw, 2rem)",
            paddingRight: "clamp(1rem, 2vw, 2rem)",
            paddingTop: "clamp(1rem, 1.5vw, 1.5rem)",
            paddingBottom: "clamp(1rem, 1.5vw, 1.5rem)",
          }}
        >
          <p
            className="text-center text-[#717171]"
            style={{ fontSize: "clamp(0.75rem, 1vw + 0.25rem, 0.875rem)" }}
          >
            © {new Date().getFullYear()} Gruby. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
