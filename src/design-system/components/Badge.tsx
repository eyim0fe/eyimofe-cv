import React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

export const badgeVariants = cva(
  "inline-flex items-center font-mono text-[11px] font-medium tracking-tight px-2 py-0.5 rounded-xs transition-colors select-none",
  {
    variants: {
      variant: {
        default:
          "border border-neutral-300 bg-neutral-100 text-neutral-800 dark:border-neutral-700 dark:bg-neutral-800/80 dark:text-neutral-200",
        outline:
          "border border-neutral-300 text-neutral-700 dark:border-neutral-700 dark:text-neutral-300",
        navy:
          "border border-sky-300/40 bg-sky-50 text-sky-900 dark:border-sky-800/60 dark:bg-sky-950/70 dark:text-sky-300",
        forest:
          "border border-emerald-300/40 bg-emerald-50 text-emerald-900 dark:border-emerald-800/60 dark:bg-emerald-950/70 dark:text-emerald-300",
        yellow:
          "border border-amber-300/60 bg-amber-50 text-amber-900 dark:border-amber-800/60 dark:bg-amber-950/70 dark:text-amber-200",
        impact:
          "border border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-semibold"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean
  dotColor?: string
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant,
  dot = false,
  dotColor,
  children,
  ...props
}) => {
  return (
    <div className={cn(badgeVariants({ variant, className }))} {...props}>
      {dot && (
        <span
          className="w-1.5 h-1.5 rounded-full mr-1.5 animate-pulse"
          style={{ backgroundColor: dotColor || "currentColor" }}
        />
      )}
      {children}
    </div>
  )
}
