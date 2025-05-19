import React from 'react'
import { cn } from '@/lib/utils'
import { VariantProps, cva } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";

const buttonVariants = cva(
    "relative group border text-foreground mx-auto text-center rounded-full",
    {
        variants: {
            variant: {
                default: "bg-dark_cyan-500/5 hover:bg-dark_cyan-500/0 border-dark_cyan-500/20 dark:bg-rich_black-600/5 dark:hover:bg-rich_black-600/0 dark:border-rich_black-600/20",
                solid: "bg-rich_black-500 hover:bg-rich_black-600 text-isabelline-500 border-transparent hover:border-foreground/50 transition-all duration-200 dark:bg-dark_cyan-500 dark:hover:bg-dark_cyan-400 dark:text-rich_black-500",
                ghost: "border-transparent bg-transparent hover:border-dark_cyan-600 hover:bg-isabelline-500/10 dark:hover:border-dark_cyan-500 dark:hover:bg-rich_black-400/10",
            },
            size: {
                default: "px-7 py-1.5 ",
                sm: "px-4 py-0.5 ",
                lg: "px-10 py-2.5 ",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
        neon?: boolean;
        asChild?: boolean;
    }

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, neon = true, size, variant, asChild = false, children, ...props }, ref) => {
        const Comp = asChild ? Slot : "button";
        return (
            <Comp
                className={cn(buttonVariants({ variant, size }), className)}
                ref={ref}
                {...props}
            >
                <span className={cn("absolute h-px opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out inset-x-0 inset-y-0 bg-gradient-to-r w-3/4 mx-auto from-transparent dark:via-dark_cyan-500 via-rich_black-600 to-transparent hidden", neon && "block")} />
                {children}
                <span className={cn("absolute group-hover:opacity-30 transition-all duration-500 ease-in-out inset-x-0 h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent dark:via-dark_cyan-500 via-rich_black-600 to-transparent hidden", neon && "block")} />
            </Comp>
        );
    }
)

Button.displayName = 'Button';

export { Button, buttonVariants };
