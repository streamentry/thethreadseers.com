import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'luminous' | 'ghost'
  size?: 'default' | 'sm' | 'lg'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex min-h-[44px] items-center justify-center font-sans font-medium transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-accent-thread disabled:opacity-50 disabled:pointer-events-none",
          {
            'ghost-link px-6 py-3': variant === 'default',
            'hold-cta px-6 py-3': variant === 'luminous',
            'ghost-link text-text-secondary hover:text-text-primary px-6 py-3': variant === 'ghost',
          },
          {
            'text-sm px-4 py-2': size === 'sm',
            'text-lg px-8 py-4': size === 'lg',
          },
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
