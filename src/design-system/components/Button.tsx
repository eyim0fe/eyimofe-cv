import React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

export const buttonVariants = cva(
  "inline-flex items-center justify-center font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-40 cursor-pointer select-none",
  {
    variants: {
      variant: {
        primary:
          "bg-neutral-900 text-white hover:bg-neutral-800 active:scale-[0.98] shadow-xs dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-white focus-visible:ring-neutral-900 dark:focus-visible:ring-neutral-200",
        secondary:
          "bg-neutral-100 text-neutral-900 hover:bg-neutral-200 active:scale-[0.98] dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700 focus-visible:ring-neutral-400",
        outline:
          "border border-neutral-300 bg-transparent text-neutral-800 hover:bg-neutral-100 active:scale-[0.98] dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800/60 focus-visible:ring-neutral-400",
        ghost:
          "bg-transparent text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800 focus-visible:ring-neutral-400",
        accent:
          "bg-sky-600 text-white hover:bg-sky-500 active:scale-[0.98] shadow-xs dark:bg-sky-500 dark:hover:bg-sky-400 dark:text-slate-950 focus-visible:ring-sky-400",
        forest:
          "bg-emerald-700 text-white hover:bg-emerald-600 active:scale-[0.98] shadow-xs dark:bg-emerald-600 dark:hover:bg-emerald-500 dark:text-neutral-950 focus-visible:ring-emerald-500"
      },
      size: {
        sm: "h-8 px-3 text-xs rounded-xs gap-1.5",
        md: "h-9 px-4 text-sm rounded-sm gap-2",
        lg: "h-11 px-6 text-base rounded-md gap-2.5",
        icon: "h-9 w-9 p-0 rounded-sm"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md"
    }
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"
