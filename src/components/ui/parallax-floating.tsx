"use client"

import React, { useRef, useEffect, ReactNode } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { cn } from "@/lib/utils"

interface FloatingProps {
  children: ReactNode
  className?: string
  sensitivity?: number
}

interface FloatingElementProps {
  children: ReactNode
  className?: string
  depth?: number
}

export function FloatingElement({
  children,
  className,
  depth = 1,
}: FloatingElementProps) {
  return (
    <div
      className={cn("absolute", className)}
      style={{
        "--depth": depth,
      } as React.CSSProperties}
    >
      {children}
    </div>
  )
}

export default function Floating({
  children,
  className,
  sensitivity = 1,
}: FloatingProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 50, stiffness: 400 }
  const springX = useSpring(mouseX, springConfig)
  const springY = useSpring(mouseY, springConfig)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const container = containerRef.current
      if (!container) return

      const rect = container.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      // Calculate distance from center (normalized from -1 to 1)
      const normalizedX = ((e.clientX - centerX) / (rect.width / 2)) * sensitivity
      const normalizedY = ((e.clientY - centerY) / (rect.height / 2)) * sensitivity

      mouseX.set(normalizedX)
      mouseY.set(normalizedY)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY, sensitivity])

  return (
    <motion.div
      ref={containerRef}
      className={cn("relative", className)}
      style={{
        perspective: "1000px",
      }}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, {
            style: {
              ...child.props.style,
              position: "absolute",
              transform: `translate3d(${springX.get() * 
                (child.props["--depth"] || 1) * 20}px, ${
                springY.get() * (child.props["--depth"] || 1) * 20
              }px, 0)`,
            },
          })
        }
        return child
      })}
    </motion.div>
  )
}
