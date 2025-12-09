import { Suspense } from "react";
import Link from "next/link";

function UnsubscribedContent() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#FF1E00]/10 rounded-full mb-4">
            <svg
              className="w-8 h-8 text-[#FF1E00]"
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
          <h1 className="text-2xl font-bold text-[#222222] mb-2">
            You&apos;ve been unsubscribed
          </h1>
          <p className="text-[#717171] text-base">
            You&apos;ve been successfully removed from our waitlist. We&apos;re sorry to see you go!
          </p>
        </div>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-[#FF1E00] text-white font-semibold rounded-full hover:bg-[#E01A00] transition-colors"
        >
          Return to Home
        </Link>
      </div>
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
