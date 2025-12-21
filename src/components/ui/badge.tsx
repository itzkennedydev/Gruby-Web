// components/ui/badge.tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-pill border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ds-focus-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        // Default uses Support (Olive) for badges per design system
        default:
          "border-transparent bg-ds-badge text-ds-badge-text",
        // Secondary: Muted background
        secondary:
          "border-transparent bg-ds-bg-subtle text-ds-text-muted",
        // Destructive: Danger color
        destructive:
          "border-transparent bg-ds-danger-muted text-ds-danger",
        // Outline: Border only
        outline: "border-ds-border text-ds-text",
        // Support: Olive filled (for nav/tab indicators)
        support:
          "border-transparent bg-ds-support text-ds-support-fg",
        // Accent Warm: Burnt Umber for highlights
        warm:
          "border-transparent bg-ds-accent-warm-muted text-ds-accent-warm",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }