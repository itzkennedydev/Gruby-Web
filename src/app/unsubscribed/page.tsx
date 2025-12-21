import { Suspense } from "react";
import Link from "next/link";
import { Footer } from "@/components/Footer";

function UnsubscribedContent() {
  return (
    <div className="flex min-h-screen flex-col bg-[#f8f9fa]">
      <div className="flex flex-grow items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">
          <div className="mb-6">
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-[var(--gruby-primary)]/10">
              <svg
                className="h-8 w-8 text-[var(--gruby-primary)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="mb-2 text-2xl font-bold text-[#222222]">
              You&apos;ve been unsubscribed
            </h1>
            <p className="text-base text-[#717171]">
              You&apos;ve been successfully removed from our waitlist.
              We&apos;re sorry to see you go!
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center rounded-[13px] bg-[var(--gruby-primary)] px-4 py-3 font-semibold text-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_2px_8px_0px_rgba(0,0,0,0.04)] transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
          >
            Return to Home
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default function UnsubscribedPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UnsubscribedContent />
    </Suspense>
  );
}
