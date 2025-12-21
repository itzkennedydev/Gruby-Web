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
              Join a community of home cooks sharing recipes and growing
              together.
            </p>
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
