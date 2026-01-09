/**
 * Stories Layout
 *
 * This layout is used for story viewing pages.
 * The header is automatically hidden via HIDDEN_HEADER_PREFIXES in Header.tsx.
 * This layout provides a fullscreen container for story content.
 */

import React from "react";
import type { ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Story | Gruby",
  description: "View stories on Gruby",
};

interface StoriesLayoutProps {
  children: ReactNode;
}

export default function StoriesLayout({ children }: StoriesLayoutProps) {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#000000',
        overflow: 'hidden',
      }}
    >
      {children}
    </div>
  );
}
