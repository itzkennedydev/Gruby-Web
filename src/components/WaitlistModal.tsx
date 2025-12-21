"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

interface WaitlistModalProps {
  waitlistModalOpen: boolean;
  setWaitlistModalOpen: (open: boolean) => void;
  isSubmitted: boolean;
  isSubmitting: boolean;
  email: string;
  name: string;
  localEmail: string;
  setLocalEmail: (email: string) => void;
  localName: string;
  setLocalName: (name: string) => void;
  handleBetaSignup: (e: React.FormEvent) => void;
  error: string | null;
  position?: number | string;
}

export function WaitlistModal({
  waitlistModalOpen,
  setWaitlistModalOpen,
  isSubmitted,
  isSubmitting,
  email,
  name,
  localEmail,
  setLocalEmail,
  localName,
  setLocalName,
  handleBetaSignup,
  error,
  position,
}: WaitlistModalProps) {
  return (
    <Dialog open={waitlistModalOpen} onOpenChange={setWaitlistModalOpen}>
      <DialogContent className="sm:max-w-md border-0 outline-none shadow-xl bg-white rounded-3xl p-8 sm:p-10 animate-fadeIn">
        <DialogHeader className="text-center space-y-3 pb-6">
          <DialogTitle className="text-3xl sm:text-[2rem] font-bold text-[#222222] tracking-tight">
            Join the waitlist
          </DialogTitle>

          <DialogDescription className="text-base leading-relaxed text-[#717171] max-w-sm mx-auto">
            Gruby is coming soon. Save your spot and be part of the first group to try it.
          </DialogDescription>
        </DialogHeader>

        {/* SUCCESS STATE */}
        {isSubmitted ? (
          <SuccessCard email={email} name={name} position={position} />
        ) : (
          /* FORM STATE */
          <form onSubmit={handleBetaSignup} className="space-y-6 animate-fadeIn">
            {/* Duplicate email notice */}
            {error === "duplicate" && (
              <div className="bg-white border border-gray-200 rounded-2xl p-6 animate-fadeIn shadow-sm">
                {/* Badge - Airbnb Guest Favorite Style */}
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="flex items-center gap-1.5 bg-[var(--gruby-primary)] text-white px-3 py-1 rounded-[10px]">
                    <span className="text-xs font-semibold">Already a member</span>
                  </div>
                </div>

                {/* Message */}
                <div className="text-center space-y-2">
                  <p className="text-[#222222] text-base font-medium leading-relaxed">
                    We get it, the excitement is real.
                  </p>
                  <p className="text-[#717171] text-sm leading-relaxed">
                    You are already on the list and good to go.
                  </p>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="block font-medium text-[#222222] text-sm">
                Name <span className="text-[#9e9e9e] font-normal">(optional)</span>
              </label>

              <input
                type="text"
                value={localName}
                onChange={(e) => setLocalName(e.target.value)}
                placeholder="Your name"
                disabled={isSubmitting}
                className="w-full px-5 py-4 rounded-[13px] bg-white border border-gray-300 text-[#222222] placeholder-[#9e9e9e]
                           focus:outline-none focus:ring-2 focus:ring-[#222222] focus:border-[#222222]
                           transition-all duration-200 text-base shadow-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="block font-medium text-[#222222] text-sm">
                Email address
              </label>

              <input
                type="email"
                value={localEmail}
                onChange={(e) => setLocalEmail(e.target.value)}
                placeholder="you@example.com"
                required
                disabled={isSubmitting}
                className="w-full px-5 py-4 rounded-[13px] bg-white border border-gray-300 text-[#222222] placeholder-[#9e9e9e]
                           focus:outline-none focus:ring-2 focus:ring-[#222222] focus:border-[#222222]
                           transition-all duration-200 text-base shadow-sm"
              />

              {error && error !== "duplicate" && (
                <p className="text-red-500 text-sm mt-1">{error}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full text-lg py-4 h-auto font-semibold"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  Securing your spot...
                </>
              ) : (
                "Reserve My Spot"
              )}
            </Button>

            <p className="text-center text-[#9e9e9e] text-sm">
              No spam, ever. Unsubscribe anytime.
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

/* SUCCESS CARD WITH CELEBRATION + BADGE */
function SuccessCard({ email, name, position }: { email: string; name: string; position?: number | string }) {
  // Trigger confetti once on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      import("canvas-confetti")
        .then((module) => {
          const confetti = module.default;
          confetti({
            particleCount: 85,
            spread: 70,
            origin: { y: 0.65 },
            ticks: 200,
            gravity: 0.9,
            scalar: 0.9,
            colors: ["#FF385C", "#FFB400", "#00A699", "#FC642D"],
          });
        })
        .catch(() => {
          // canvas-confetti not installed, confetti will not show
          console.warn("canvas-confetti not available");
        });
    }
  }, []);

  return (
    <div className="mt-6 bg-[#fafafa] rounded-3xl p-8 text-center border border-gray-200 shadow-sm animate-fadeIn">
      {/* Exclusive Badge */}
      <div className="inline-flex items-center gap-2 bg-white border border-gray-300 px-4 py-1.5 rounded-[10px]
                      text-sm font-medium text-[#444] shadow-sm mb-5 animate-fadeIn">
        Early Member No. {position || "—"}
      </div>

      <p className="font-semibold text-[#222222] mb-3 text-xl">
        You are in 🍳
      </p>

      <p className="text-[#717171] text-base leading-relaxed">
        {name ? `Hi ${name}, ` : ""}You just joined a small group of early users who will hear from us before everyone else.
        We will send your updates to 
        <span className="font-semibold text-[#222222]"> {email}</span>.
      </p>

      <div className="mt-6 text-sm text-[#717171]">
        Welcome to the beginning.
      </div>
    </div>
  );
}
