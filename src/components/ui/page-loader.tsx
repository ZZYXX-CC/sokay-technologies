"use client"

import React, { useState, useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ClipLoader } from "react-spinners"
import { cn } from "@/lib/utils"

interface PageLoaderProps {
  color?: string
  size?: number
  speedMultiplier?: number
}

export function PageLoader({
  color = "#699ba5", // dark_cyan color
  size = 35,
  speedMultiplier = 0.8,
}: PageLoaderProps) {
  return (
    <div className="flex flex-col items-center justify-center">
      <ClipLoader
        color={color}
        size={size}
        speedMultiplier={speedMultiplier}
        cssOverride={{
          display: "block",
          margin: "0 auto",
          borderWidth: "3px",
        }}
      />
      <p className="mt-4 text-sm text-muted-foreground font-medium">
        Loading...
      </p>
    </div>
  )
}

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const [isInitialLoad, setIsInitialLoad] = useState(true)

  // Handle initial page load
  useEffect(() => {
    if (isInitialLoad) {
      setIsLoading(true)
      const timer = setTimeout(() => {
        setIsLoading(false)
        setIsInitialLoad(false)
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [isInitialLoad])

  // Handle route changes
  useEffect(() => {
    if (!isInitialLoad) {
      setIsLoading(true)
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 800)

      return () => clearTimeout(timer)
    }
  }, [pathname, searchParams, isInitialLoad])

  return (
    <>
      {children}

      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-background/90 backdrop-blur-md z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, type: "spring", stiffness: 200, damping: 20 }}
              className="flex flex-col items-center"
            >
              <PageLoader size={50} speedMultiplier={0.8} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export function usePageLoader() {
  const [isLoading, setIsLoading] = useState(false)

  const startLoading = () => setIsLoading(true)
  const stopLoading = () => setIsLoading(false)

  return {
    isLoading,
    startLoading,
    stopLoading,
  }
}

export function LoadingLink({
  children,
  href,
  className,
  onClick,
  ...props
}: React.ComponentProps<"a"> & { href: string }) {
  const { startLoading } = usePageLoader()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Don't trigger loading for external links, anchor links, or if modifier keys are pressed
    if (
      href.startsWith("http") ||
      href.startsWith("#") ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey
    ) {
      if (onClick) onClick(e)
      return
    }

    startLoading()
    if (onClick) onClick(e)
  }

  return (
    <a href={href} className={className} onClick={handleClick} {...props}>
      {children}
    </a>
  )
}
