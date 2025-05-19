'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface ProgressiveBlurProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: 'left' | 'right' | 'top' | 'bottom'
  blurIntensity?: number
}

export function ProgressiveBlur({
  direction = 'right',
  blurIntensity = 10,
  className,
  ...props
}: ProgressiveBlurProps) {
  const getGradient = () => {
    const intensity = Math.max(1, Math.min(20, blurIntensity))
    
    switch (direction) {
      case 'left':
        return `linear-gradient(to left, transparent, rgba(var(--background-rgb), ${intensity / 10}))`
      case 'right':
        return `linear-gradient(to right, transparent, rgba(var(--background-rgb), ${intensity / 10}))`
      case 'top':
        return `linear-gradient(to top, transparent, rgba(var(--background-rgb), ${intensity / 10}))`
      case 'bottom':
        return `linear-gradient(to bottom, transparent, rgba(var(--background-rgb), ${intensity / 10}))`
      default:
        return `linear-gradient(to right, transparent, rgba(var(--background-rgb), ${intensity / 10}))`
    }
  }

  return (
    <div
      className={cn(className)}
      style={{
        background: getGradient(),
        // @ts-ignore - Custom CSS variable
        '--background-rgb': '0, 0, 0',
      }}
      {...props}
    />
  )
}
