'use client'

import React from 'react'
import { motion, Variants } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AnimatedGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  variants?: Variants
  as?: React.ElementType
  delay?: number
  duration?: number
  children: React.ReactNode
}

export function AnimatedGroup({
  variants,
  as = motion.div,
  delay = 0,
  duration = 0.5,
  className,
  children,
  ...props
}: AnimatedGroupProps) {
  const Component = as

  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={
        variants || {
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              duration,
              delay,
              staggerChildren: 0.1,
            },
          },
        }
      }
      className={cn(className)}
      {...props}
    >
      {children}
    </Component>
  )
}
