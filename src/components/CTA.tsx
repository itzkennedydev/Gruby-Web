"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="bg-black px-4 py-20">
      <div className="mx-auto max-w-[1200px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white">
            <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 0L10.163 5.837L16 8L10.163 10.163L8 16L5.837 10.163L0 8L5.837 5.837L8 0Z"
                fill="currentColor"
              />
            </svg>
            Try Gruby yourself
          </div>

          <h2 className="mx-auto mb-6 max-w-3xl text-3xl font-semibold tracking-[-0.02em] text-white md:text-4xl lg:text-5xl">
            Ready to cook smarter and save more?
          </h2>

          <p className="mx-auto mb-10 max-w-xl text-lg text-white/60">
            Join the people who are choosing to eat better and spend less on
            groceries.
          </p>

          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/demo"
              className="inline-flex h-12 items-center justify-center rounded-full bg-white px-8 font-medium text-black transition-colors hover:bg-gray-100"
            >
              Get Started
            </Link>
            <Link
              href="/faq"
              className="inline-flex h-12 items-center justify-center rounded-full bg-white/10 px-8 font-medium text-white transition-colors hover:bg-white/20"
            >
              Learn More
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
