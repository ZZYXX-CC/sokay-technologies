"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface CTAProps {
  badge?: {
    text: string
  }
  title: string
  description?: string
  action: {
    text: string
    href: string
    variant?: "default" | "link" | "secondary" | "destructive" | "outline" | "ghost"
  }
  withGlow?: boolean
  className?: string
}

export function CTASection({
  badge,
  title,
  description,
  action,
  withGlow = true,
  className,
}: CTAProps) {
  return (
    <section className={cn("overflow-hidden pt-0 md:pt-0", className)}>
      <div className="relative mx-auto flex max-w-container flex-col items-center gap-6 px-8 py-12 text-center sm:gap-8 md:py-24">
        {/* Badge */}
        {badge && (
          <Badge
            variant="outline"
            className="opacity-0 animate-fade-in-up delay-100 border-gray-300 dark:border-gray-800"
          >
            <span className="text-gray-600 dark:text-muted-foreground">{badge.text}</span>
          </Badge>
        )}

        {/* Title */}
        <h2 className="text-3xl font-semibold sm:text-5xl opacity-0 animate-fade-in-up delay-200 text-gray-900 dark:text-white">
          {title}
        </h2>

        {/* Description */}
        {description && (
          <p className="text-gray-600 dark:text-muted-foreground opacity-0 animate-fade-in-up delay-300">
            {description}
          </p>
        )}

        {/* Action Button */}
        {action.text && (
          <Button
            variant={action.variant || "default"}
            size="lg"
            className="opacity-0 animate-fade-in-up delay-500"
            asChild
          >
            <a href={action.href}>{action.text}</a>
          </Button>
        )}

        {/* Glow Effect */}
        {withGlow && (
          <div className="fade-top-lg pointer-events-none absolute inset-0 shadow-glow opacity-0 animate-scale-in delay-700" />
        )}
      </div>
    </section>
  )
}
