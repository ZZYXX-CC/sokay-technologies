'use client'

import React, { useRef, useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface InfiniteSliderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  direction?: 'left' | 'right'
  speed?: number
  speedOnHover?: number
  gap?: number
}

export function InfiniteSlider({
  children,
  direction = 'left',
  speed = 20,
  speedOnHover = 0,
  gap = 20,
  className,
  ...props
}: InfiniteSliderProps) {
  const [isHovering, setIsHovering] = useState(false)
  const [loopCount, setLoopCount] = useState(1)
  const [contentWidth, setContentWidth] = useState(0)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (contentRef.current) {
      setContentWidth(contentRef.current.scrollWidth)
    }
  }, [children])

  useEffect(() => {
    if (contentWidth > 0) {
      const screenWidth = window.innerWidth
      const itemCount = Math.ceil(screenWidth / contentWidth) + 1
      setLoopCount(itemCount)
    }
  }, [contentWidth])

  const currentSpeed = isHovering ? speedOnHover : speed

  const containerStyle = {
    '--animation-duration': `${contentWidth / currentSpeed}s`,
    '--gap': `${gap}px`,
  } as React.CSSProperties

  return (
    <div
      className={cn('group relative flex overflow-hidden', className)}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={containerStyle}
      {...props}
    >
      <div
        className={cn(
          'animate-infinite-slider flex items-center',
          direction === 'right' ? 'flex-row-reverse' : 'flex-row',
          currentSpeed === 0 && 'pause-animation'
        )}
        style={{
          animationDuration: `var(--animation-duration)`,
          animationDirection: direction === 'right' ? 'reverse' : 'normal',
          gap: 'var(--gap)',
        }}
      >
        <div ref={contentRef} className="flex items-center" style={{ gap: 'var(--gap)' }}>
          {children}
        </div>

        {Array.from({ length: loopCount }).map((_, index) => (
          <div key={index} className="flex items-center" style={{ gap: 'var(--gap)' }}>
            {children}
          </div>
        ))}
      </div>
    </div>
  )
}
