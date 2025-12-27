/**
 * Public Layout - No main header
 *
 * Used for shared pages like gathering links that should have
 * their own custom headers instead of the main app header.
 */

import React from "react";
import type { ReactNode } from "react";
import { ReduxProvider } from "@/components/ReduxProvider";

interface PublicLayoutProps {
  children: ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <ReduxProvider>
      {children}
    </ReduxProvider>
  );
}
