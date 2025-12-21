"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export function Footer() {
  const [footerEmail, setFooterEmail] = useState("");

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
              src="/GrubyLogo.svg"
              alt="Gruby Logo"
              width={100}
              height={36}
              className="mb-3 sm:mb-4"
            />
            <p
              className="text-[#717171]"
              style={{ fontSize: "clamp(0.75rem, 1vw + 0.25rem, 0.875rem)" }}
            >
              Join thousands of home cooks who are saving money, eating better,
              and actually enjoying cooking.
            </p>

            {/* App Store Download Links */}
            <div className="mt-3 flex flex-row gap-2">
              <a
                href="https://apps.apple.com/app/gruby"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded border border-[#D9D9D6] bg-white px-2.5 py-1.5 text-[#717171] no-underline transition-all duration-200 hover:border-[#504944] hover:text-[#504944] active:scale-[0.98]"
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
              <a
                href="https://play.google.com/store/apps/details?id=com.gruby.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded border border-[#D9D9D6] bg-white px-2.5 py-1.5 text-[#717171] no-underline transition-all duration-200 hover:border-[#504944] hover:text-[#504944] active:scale-[0.98]"
              >
                <svg
                  className="h-3.5 w-3.5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.19,14.5L15.12,12.42L17.19,10.33L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                </svg>
                <div className="flex flex-col items-start">
                  <span className="text-[8px] leading-tight opacity-60">
                    Get it on
                  </span>
                  <span className="text-[10px] font-semibold leading-tight">
                    Google Play
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
                className="w-full rounded-[13px] border-0 bg-[#f5f5f7] px-3 py-2 text-xs transition-shadow focus:outline-none focus:ring-2 focus:ring-[#222222] sm:px-4 sm:py-2.5 sm:text-sm md:py-3 md:text-base"
                required
              />
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-[13px] bg-[#222222] px-4 py-2 text-xs font-medium text-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_2px_8px_0px_rgba(0,0,0,0.04)] transition-all duration-200 hover:bg-[#333333] active:scale-[0.98] sm:py-2.5 sm:text-sm md:py-3 md:text-base"
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
