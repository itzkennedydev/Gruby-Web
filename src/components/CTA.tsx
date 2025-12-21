'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function CTA() {
  return (
    <section className="bg-black py-20 px-4">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white mb-6">
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 0L10.163 5.837L16 8L10.163 10.163L8 16L5.837 10.163L0 8L5.837 5.837L8 0Z"
                fill="currentColor"
              />
            </svg>
            Try Gruby yourself
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white tracking-[-0.02em] max-w-3xl mx-auto mb-6">
            Ready to cook smarter and save more?
          </h2>

          <p className="text-lg text-white/60 max-w-xl mx-auto mb-10">
            Join thousands of home cooks using Gruby to discover recipes, save money, and share their cooking journey.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/demo"
              className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-white text-black font-medium transition-colors hover:bg-gray-100"
            >
              Get Started Free
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-white/10 text-white font-medium transition-colors hover:bg-white/20"
            >
              View pricing
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
