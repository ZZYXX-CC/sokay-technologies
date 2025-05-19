import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-rich_black-500 text-mint_cream-500 shadow-xs hover:bg-rich_black-600 dark:bg-dark_cyan-500 dark:text-rich_black-500 dark:hover:bg-dark_cyan-400",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border border-dark_cyan-500 bg-background shadow-xs hover:bg-dark_cyan-800 hover:text-rich_black-500 dark:bg-rich_black-300/30 dark:border-rich_black-600 dark:hover:bg-rich_black-400/50 dark:text-isabelline-500",
        secondary:
          "bg-dark_cyan-500 text-rich_black-500 shadow-xs hover:bg-dark_cyan-400 dark:bg-rich_black-600 dark:text-isabelline-500 dark:hover:bg-rich_black-500/80",
        ghost:
          "hover:bg-dark_cyan-800 hover:text-rich_black-500 dark:hover:bg-rich_black-600/50 dark:hover:text-isabelline-500",
        link: "text-rich_black-500 dark:text-dark_cyan-500 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
