import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from "@/lib/utils";

const buttonVariants = cva(
    'inline-flex items-center justify-center rounded-button text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ds-focus-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-disabled active:scale-press-button transition-all duration-200',
    {
        variants: {
            variant: {
                // Primary: Charcoal background, white text (infrastructure color)
                default: 'bg-ds-primary text-ds-primary-fg hover:bg-ds-primary-hover shadow-button',
                // Destructive: Dried Chili
                destructive: 'bg-ds-danger text-ds-danger-fg hover:opacity-90 shadow-button',
                // Outline: Transparent with Wolf Gray border
                outline: 'border-2 border-ds-border bg-background hover:bg-ds-bg-subtle shadow-button',
                // Secondary: White background, charcoal text
                secondary: 'bg-ds-secondary text-ds-secondary-fg border border-ds-secondary-border hover:bg-ds-bg-subtle shadow-button',
                // Ghost: No background, hover shows subtle fill
                ghost: 'hover:bg-ds-bg-subtle hover:text-ds-text',
                // Link: Primary text color with underline
                link: 'text-ds-primary underline-offset-4 hover:underline',
                // Support: Olive accent for special actions (nav, badges)
                support: 'bg-ds-support text-ds-support-fg hover:opacity-90 shadow-button',
            },
            size: {
                default: 'h-10 px-4 py-2',
                sm: 'h-9 px-3 py-1.5',
                lg: 'h-12 px-5 py-2.5',
                icon: 'h-10 w-10',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
);

// Arrow icon component for buttons
const ButtonArrow = () => (
    <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        className="w-5 h-5 flex-shrink-0"
    >
        <path
            d="M4.16669 10H15.8334"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M10 4.16669L15.8334 10L10 15.8334"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean;
    showArrow?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({
        className,
        variant,
        size,
        asChild = false,
        showArrow = false,
        children,
        ...props
    }, ref) => {
        const Comp = asChild ? Slot : 'button';
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            >
                {children}
                {showArrow && <ButtonArrow />}
            </Comp>
        );
    },
);
Button.displayName = 'Button';

export { Button, buttonVariants, ButtonArrow };
