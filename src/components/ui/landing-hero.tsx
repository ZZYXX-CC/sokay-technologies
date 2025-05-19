"use client"

import Link from "next/link"
import Image from "next/image"
import { LayoutGroup, motion } from "framer-motion"
import { TextRotate } from "@/components/ui/text-rotate"
import { SynchronizedTextRotate } from "@/components/ui/synchronized-text-rotate"
import { Button } from "@/components/ui/button"
import { AuroraBackground } from "@/components/ui/aurora-background"
import { InfiniteSlider } from "@/components/ui/infinite-slider"
import { ProgressiveBlur } from "@/components/ui/progressive-blur"
import { cn, getImagePath } from "@/lib/utils"
import { memo } from "react"

// Memoize the component to prevent unnecessary re-renders
export const LandingHero = memo(function LandingHero() {
  // Predefine animation properties to reduce calculations
  const fadeInAnimation = {
    animate: { opacity: 1, y: 0 },
    initial: { opacity: 0, y: 20 },
    transition: { duration: 0.2, ease: "easeOut" }
  };

  return (
    <AuroraBackground
      className="w-full min-h-screen overflow-hidden text-foreground"
      blendMode="multiply"
      opacity={0.75}
      showRadialGradient={false}
      extendBehindHeader={true}
      backgroundImage="/images/gradient-bg.jpg"
    >
      {/* Main content */}
      <div className="flex flex-col justify-center items-center h-full w-full pt-20 sm:pt-24 md:pt-28 lg:pt-32">
        <div className="flex flex-col justify-center items-center w-[280px] sm:w-[350px] md:w-[550px] lg:w-[750px] z-10 pointer-events-auto">
        <motion.h1
          className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl text-center w-full justify-center items-center flex-col flex whitespace-nowrap leading-tight font-geist-sans tracking-tight space-y-0 md:space-y-1 text-foreground text-shadow-lg"
          {...fadeInAnimation}
          transition={{ ...fadeInAnimation.transition, delay: 0.3 }}
        >
          <span>Experience</span>
          <LayoutGroup>
            <motion.span layout className="flex whitespace-nowrap items-center">
              <motion.span
                layout
                className="flex whitespace-nowrap"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
              >
                audio
              </motion.span>

              <div className="flex items-center ml-1">
                <SynchronizedTextRotate
                  emojiItems={["🎧", "🎚️", "🎛️", "🎤"]}
                  textItems={[
                    "clarity",
                    "quality",
                    "precision",
                    "performance",
                  ]}
                  emojiClassName="mx-1 text-primary"
                  textClassName="text-primary py-0 pb-0 md:pb-1 rounded-xl font-geist-sans"
                  staggerDuration={0.03}
                  staggerFrom="last"
                  rotationInterval={3000}
                />
              </div>
            </motion.span>
          </LayoutGroup>
        </motion.h1>
        <motion.p
          className="text-sm sm:text-lg md:text-xl lg:text-2xl text-center font-geist-sans pt-1 sm:pt-2 md:pt-3 lg:pt-4 text-foreground text-shadow-sm"
          {...fadeInAnimation}
          transition={{ ...fadeInAnimation.transition, delay: 0.5 }}
        >
          Premium audio equipment designed for studio recording, podcasting, and professional sound production.
        </motion.p>

        <div className="flex flex-row justify-center space-x-4 items-center mt-2 sm:mt-3 md:mt-4 lg:mt-6">
          <motion.div
            {...fadeInAnimation}
            transition={{ ...fadeInAnimation.transition, delay: 0.7 }}
          >
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="font-geist-sans rounded-md"
            >
              <Link href="/store" prefetch={false}>
                Shop Now <span className="ml-1">→</span>
              </Link>
            </Button>
          </motion.div>

          <motion.div
            {...fadeInAnimation}
            transition={{ ...fadeInAnimation.transition, delay: 0.7 }}
          >
            <Button
              asChild
              size="lg"
              variant="outline"
              className="font-geist-sans rounded-md hover:text-accent-foreground"
            >
              <Link href="/about" prefetch={false}>
                Learn More
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* Microphone Image Display */}
        <motion.div
          className="mt-4 sm:mt-6 md:mt-8 lg:mt-10 mb-16 sm:mb-20 md:mb-24 lg:mb-32 relative"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <div className="relative mx-auto max-w-md transform scale-80 sm:scale-85 md:scale-90 lg:scale-95">
            <div className="bg-background/40 border-primary/30 rounded-[2rem] border shadow-lg p-2 backdrop-blur-sm">
              <div className="relative overflow-hidden rounded-[1.5rem] border border-primary/50 p-2 shadow-lg before:absolute before:inset-0 before:bg-[repeating-linear-gradient(-45deg,var(--border),var(--border)_1px,transparent_1px,transparent_6px)] before:opacity-20">
                <div className="flex justify-center items-center p-2">
                  <Image
                    src={getImagePath("/images/products/sokay-A1-microphone-product-350x350.png")}
                    alt="Sokay A1 Microphone"
                    width={220}
                    height={220}
                    className="object-contain"
                    unoptimized={process.env.NEXT_PUBLIC_SHOW_IMAGES_LOCALLY === 'true'}
                  />
                </div>
                <div className="bg-gradient-to-br from-background/40 to-background/60 rounded-[1rem] p-4 shadow-inner">
                  <div className="space-y-2">
                    <div className="text-foreground text-sm font-medium border-b border-primary/20 pb-2 text-shadow-sm">Sokay A1 Microphone - Studio-grade condenser with noise cancellation</div>
                    <div className="space-y-2">
                      <div className="space-y-1">
                        <div className="space-x-1">
                          <span className="text-foreground text-xl font-medium text-shadow-sm">Premium</span>
                          <span className="text-foreground text-xs text-shadow-sm">Quality</span>
                        </div>
                        <div className="flex h-5 items-center rounded bg-blue-500/30 px-2 text-xs text-foreground text-shadow-sm">Studio Grade</div>
                      </div>
                      <div className="space-y-1">
                        <div className="space-x-1">
                          <span className="text-foreground text-xl font-medium text-shadow-sm">Professional</span>
                          <span className="text-foreground text-xs text-shadow-sm">Audio Equipment</span>
                        </div>
                        <div className="flex h-5 items-center rounded bg-gray-800/70 px-2 text-xs text-gray-200">Noise Cancellation</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute inset-0 bg-[radial-gradient(#588b8b_1px,transparent_1px)] mix-blend-overlay [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />
          </div>
        </motion.div>
        </div>

        {/* Logo Cloud */}
        <motion.div
          className="absolute bottom-0 sm:bottom-0 md:bottom-0 lg:bottom-0 left-0 right-0 w-full z-20 mt-16 sm:mt-20 md:mt-24 lg:mt-28"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <div className="relative mx-auto max-w-5xl px-6 pt-12 sm:pt-14 md:pt-16 lg:pt-20">
            <div className="flex flex-col items-center md:flex-row">
              <div className="inline md:max-w-44 md:border-r md:border-gray-700/50 md:pr-6">
                <p className="text-end text-sm text-foreground font-medium text-shadow-sm">Trusted by professionals</p>
              </div>
              <div className="relative py-4 md:w-[calc(100%-11rem)]">
                <InfiniteSlider
                  speedOnHover={20}
                  speed={40}
                  gap={112}>
                  <div className="flex">
                    <span className="text-primary font-semibold text-shadow-sm">STUDIO ONE</span>
                  </div>
                  <div className="flex">
                    <span className="text-primary font-semibold text-shadow-sm">ABBEY ROAD</span>
                  </div>
                  <div className="flex">
                    <span className="text-primary font-semibold text-shadow-sm">SONY MUSIC</span>
                  </div>
                  <div className="flex">
                    <span className="text-primary font-semibold text-shadow-sm">CAPITOL</span>
                  </div>
                  <div className="flex">
                    <span className="text-primary font-semibold text-shadow-sm">INTERSCOPE</span>
                  </div>
                </InfiniteSlider>

                <div className="bg-gradient-to-r from-background absolute inset-y-0 left-0 w-20"></div>
                <div className="bg-gradient-to-l from-background absolute inset-y-0 right-0 w-20"></div>
                <ProgressiveBlur
                  className="pointer-events-none absolute left-0 top-0 h-full w-20"
                  direction="left"
                  blurIntensity={1}
                />
                <ProgressiveBlur
                  className="pointer-events-none absolute right-0 top-0 h-full w-20"
                  direction="right"
                  blurIntensity={1}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AuroraBackground>
  )
});
