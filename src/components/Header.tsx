"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setWaitlistModalOpen } from "@/store/slices/uiSlice";
import {
  setEmail,
  setSubmitting,
  setSubmitted,
  setError,
} from "@/store/slices/betaSlice";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const Header = () => {
  const dispatch = useAppDispatch();
  const waitlistModalOpen = useAppSelector(
    (state) => state.ui.waitlistModalOpen,
  );
  const { email, isSubmitting, isSubmitted, error } = useAppSelector(
    (state) => state.beta,
  );
  const [localEmail, setLocalEmail] = useState("");
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
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
        body: JSON.stringify({ email: localEmail.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to join waitlist");
      }

      dispatch(setEmail(localEmail));
      dispatch(setSubmitted(true));
      setLocalEmail("");

      // Reset submitted state after 3 seconds
      setTimeout(() => {
        dispatch(setSubmitted(false));
        dispatch(setWaitlistModalOpen(false));
      }, 3000);
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
          className="rounded-full border border-gray-200 bg-white/95 shadow-lg backdrop-blur-sm"
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
              className="rounded-full bg-[#FF1E00] font-semibold text-white shadow-md hover:bg-[#E01A00] hover:shadow-lg"
              style={{
                paddingLeft: "clamp(1rem, 2vw, 1.5rem)",
                paddingRight: "clamp(1rem, 2vw, 1.5rem)",
                paddingTop: "clamp(0.5rem, 0.75vw, 0.625rem)",
                paddingBottom: "clamp(0.5rem, 0.75vw, 0.625rem)",
                fontSize: "clamp(0.875rem, 1vw, 0.9375rem)",
              }}
            >
              Get Notified
            </Button>
          </div>
        </div>
      </div>

      {/* Join Waitlist Modal */}
      <Dialog
        open={waitlistModalOpen}
        onOpenChange={(open) => dispatch(setWaitlistModalOpen(open))}
      >
        <DialogContent className="rounded-3xl border-0 bg-white p-8 shadow-xl outline-none sm:max-w-md sm:p-10">
          <DialogHeader className="space-y-3 pb-6 text-center">
            <DialogTitle className="text-3xl font-bold tracking-tight text-[#222222] sm:text-[2rem]">
              Join the waitlist
            </DialogTitle>

            <DialogDescription className="mx-auto max-w-sm text-base leading-relaxed text-[#717171]">
              Gruby is coming soon. Save your spot and be part of the first
              group to try it.
            </DialogDescription>
          </DialogHeader>

          {isSubmitted ? (
            <div className="animate-fadeIn mt-6 rounded-3xl border border-gray-200 bg-[#fafafa] p-8 text-center shadow-sm">
              <p className="mb-3 text-xl font-semibold text-[#222222]">
                You are in, {email.split("@")[0]} ✨
              </p>

              <p className="text-base leading-relaxed text-[#717171]">
                You just joined an early group of people who will get access
                before everyone else. We will send all updates to
                <span className="font-semibold text-[#222222]"> {email}</span>.
              </p>

              <div className="mt-6 text-sm text-[#717171]">
                You are closer than most.
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleBetaSignup}
              className="animate-fadeIn space-y-6"
            >
              <div className="space-y-2">
                <label className="block text-sm font-medium text-[#222222]">
                  Email address
                </label>

                <input
                  type="email"
                  value={localEmail}
                  onChange={(e) => setLocalEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  disabled={isSubmitting}
                  className="w-full rounded-full border border-gray-300 bg-white px-5 py-4 text-base text-[#222222] placeholder-[#9e9e9e] shadow-sm transition-all duration-200 focus:border-[#FF1E00] focus:outline-none focus:ring-2 focus:ring-[#FF1E00]"
                />

                {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full transform rounded-full bg-[#FF1E00] py-4 text-lg font-semibold text-white shadow-md transition-colors duration-200 hover:bg-[#E01A00] active:scale-[0.98] disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Securing your spot...
                  </>
                ) : (
                  "Reserve My Spot"
                )}
              </Button>

              <p className="text-center text-sm text-[#9e9e9e]">
                No spam, ever. Just thoughtful updates.
              </p>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default Header;
