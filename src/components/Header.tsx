"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setWaitlistModalOpen } from "@/store/slices/uiSlice";
import {
  setEmail,
  setName,
  setSubmitting,
  setSubmitted,
  setError,
} from "@/store/slices/betaSlice";
import { Button } from "@/components/ui/button";
import { WaitlistModal } from "@/components/WaitlistModal";

// Routes where header should be hidden
const HIDDEN_HEADER_ROUTES = [
  '/faq',
  '/privacy',
  '/terms',
  '/cookies',
  '/eula',
  '/community-guidelines',
  '/data-retention',
  '/acceptable-use',
  '/third-party-services',
  '/messaging-policy',
  '/content-licensing',
  '/gatherings-terms',
  '/location-services',
  '/dmca',
  '/accessibility',
];

const Header = () => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const waitlistModalOpen = useAppSelector(
    (state) => state.ui.waitlistModalOpen,
  );
  const { email, name, isSubmitting, isSubmitted, error } = useAppSelector(
    (state) => state.beta,
  );
  const [localEmail, setLocalEmail] = useState("");
  const [localName, setLocalName] = useState("");
  const [position, setPosition] = useState<number | undefined>(undefined);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Hide header on certain routes
  const shouldHideHeader = HIDDEN_HEADER_ROUTES.includes(pathname);

  useEffect(() => {
    // Skip scroll handling if header is hidden
    if (shouldHideHeader) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show header at the top
      if (currentScrollY < 100) {
        setIsHeaderVisible(true);
      }
      // Hide when scrolling down, show when scrolling up
      else if (currentScrollY > lastScrollY && currentScrollY > 200) {
        setIsHeaderVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsHeaderVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleBetaSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!localEmail.trim()) return;

    dispatch(setSubmitting(true));
    dispatch(setError(null));

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          email: localEmail.trim(),
          name: localName.trim() || "",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage = data.error || "Failed to join waitlist";
        // Check if it's a duplicate email error
        if (errorMessage.includes("already on the waitlist") || response.status === 409) {
          dispatch(setError("duplicate"));
          return;
        }
        throw new Error(errorMessage);
      }

      dispatch(setEmail(localEmail));
      dispatch(setName(localName));
      dispatch(setSubmitted(true));
      setPosition(data.position || undefined);
      setLocalEmail("");
      setLocalName("");

      // Modal will stay open until user manually closes it
    } catch (err) {
      dispatch(
        setError(
          err instanceof Error
            ? err.message
            : "Something went wrong. Please try again.",
        ),
      );
    } finally {
      dispatch(setSubmitting(false));
    }
  };

  // Don't render header on hidden routes
  if (shouldHideHeader) {
    return null;
  }

  return (
    <header
      className="sticky z-50 transition-transform duration-300 ease-in-out"
      style={{
        paddingTop: "clamp(1rem, 1.5vw, 2rem)",
        paddingLeft: "clamp(1rem, 2vw, 2rem)",
        paddingRight: "clamp(1rem, 2vw, 2rem)",
        top: isHeaderVisible ? "0" : "-100px",
        transform: isHeaderVisible ? "translateY(0)" : "translateY(-100%)",
      }}
    >
      <div
        className="mx-auto max-w-[1920px]"
        style={{ containerType: "inline-size" }}
      >
        <div
          className="rounded-[20px] border border-gray-200 bg-white/95 shadow-lg backdrop-blur-sm"
          style={{
            paddingLeft: "clamp(1rem, 2vw, 1.5rem)",
            paddingRight: "clamp(1rem, 2vw, 1.5rem)",
          }}
        >
          <div
            className="flex items-center justify-between"
            style={{
              paddingTop: "clamp(0.75rem, 1vw, 1rem)",
              paddingBottom: "clamp(0.75rem, 1vw, 1rem)",
            }}
          >
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/GrubyLogo.svg"
                alt="Gruby Logo"
                width={120}
                height={28}
                className="w-auto"
                style={{ height: "clamp(1.5rem, 2vw, 1.75rem)" }}
                priority
              />
            </Link>

            {/* CTA Button */}
            <Button
              onClick={() => dispatch(setWaitlistModalOpen(true))}
              className="font-semibold"
              style={{
                fontSize: "clamp(0.875rem, 1vw, 0.9375rem)",
              }}
            >
              Get Notified
            </Button>
          </div>
        </div>
      </div>

      {/* Join Waitlist Modal */}
      <WaitlistModal
        waitlistModalOpen={waitlistModalOpen}
        setWaitlistModalOpen={(open) => dispatch(setWaitlistModalOpen(open))}
        isSubmitted={isSubmitted}
        isSubmitting={isSubmitting}
        email={email}
        name={name}
        localEmail={localEmail}
        setLocalEmail={setLocalEmail}
        localName={localName}
        setLocalName={setLocalName}
        handleBetaSignup={handleBetaSignup}
        error={error}
        position={position}
      />
    </header>
  );
};

export default Header;
