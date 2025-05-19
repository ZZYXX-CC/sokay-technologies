'use client'
import React from 'react'
import { Mail, SendHorizonal, Menu, X, ShoppingCart, ShoppingBag, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Button as NeonButton } from '@/components/ui/neon-button'
import { AnimatedGroup } from '@/components/ui/animated-group'
import { cn, getImagePath } from '@/lib/utils'
import Link from 'next/link'
import Image from 'next/image'
import { InfiniteSlider } from '@/components/ui/infinite-slider'
import { ProgressiveBlur } from '@/components/ui/progressive-blur'

const transitionVariants = {
    item: {
        hidden: {
            opacity: 0,
            filter: 'blur(12px)',
            y: 12,
        },
        visible: {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            transition: {
                type: 'spring',
                bounce: 0.3,
                duration: 1.5,
            },
        },
    },
}

export function HeroSection() {
    // Ensure we're using client-side rendering for theme changes
    const [mounted, setMounted] = React.useState(false)

    // After mounting, we can render the component
    React.useEffect(() => {
        setMounted(true)
    }, [])
    // Only render the component after mounting to avoid hydration mismatch
    if (!mounted) return null

    return (
        <>
            <main className="overflow-hidden bg-gradient-to-b from-isabelline-700 to-isabelline-500 dark:bg-background">
                <section>
                    <div className="relative mx-auto max-w-6xl px-6 pt-24 lg:pb-16 lg:pt-32">
                        <div className="relative z-10 mx-auto max-w-4xl text-center">
                            {/* Light mode decorative elements */}
                            <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-dark_cyan-800/50 blur-3xl dark:hidden"></div>
                            <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-dark_cyan-700/50 blur-3xl dark:hidden"></div>

                            <AnimatedGroup
                                variants={{
                                    // Using a type assertion to avoid TypeScript errors
                                    container: {
                                        visible: {
                                            transition: {
                                                staggerChildren: 0.05,
                                                delayChildren: 0.75,
                                            },
                                        },
                                    } as any,
                                    ...transitionVariants,
                                }}
                            >
                                <h1 className="text-balance text-4xl font-semibold text-rich_black-500 dark:text-isabelline-500 sm:text-5xl md:text-6xl">
                                    Premium Audio Products for <span className="text-rich_black-600 dark:text-dark_cyan-500">Professionals</span>
                                </h1>

                                <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-rich_black-400 dark:text-dark_cyan-600 mb-8">
                                    Discover our range of high-quality audio equipment designed for studio recording, podcasting, and professional sound production.
                                </p>

                                <div className="flex flex-col md:flex-row justify-center items-center gap-6 mt-12 max-w-lg mx-auto">
                                    <Button asChild className="w-full md:w-auto md:min-w-[160px] h-12 bg-[#93b7be] hover:bg-[#699ba5] text-[#12263a] border border-[#93b7be] hover:border-[#699ba5] transition-colors">
                                        <Link href="/store" className="flex items-center justify-center gap-2 px-8 h-full w-full">
                                            <ShoppingBag className="h-5 w-5" />
                                            Shop Now
                                        </Link>
                                    </Button>
                                    <Button
                                        asChild
                                        variant="link"
                                        className="w-full md:w-auto text-rich_black-500 dark:text-mint_cream-500 font-medium tracking-wide hover:text-rich_black-600 dark:hover:text-mint_cream-600 transition-all duration-300 flex items-center justify-center gap-2"
                                    >
                                        <Link href="#features" className="flex items-center justify-center gap-2">
                                            Learn More
                                            <ChevronDown className="h-4 w-4 animate-bounce" />
                                        </Link>
                                    </Button>
                                </div>

                                <div
                                    aria-hidden
                                    className="bg-radial from-isabelline-100/80 dark:from-rich_black-500/50 relative mx-auto mt-32 max-w-2xl to-transparent to-55% text-left"
                                >
                                    <div className="bg-isabelline-500 dark:bg-rich_black-500 border-dark_cyan-300/50 dark:border-dark_cyan-600/50 absolute inset-0 mx-auto w-80 -translate-x-3 -translate-y-12 rounded-[2rem] border shadow-lg shadow-dark_cyan-200/50 dark:shadow-rich_black-600/30 p-2 [mask-image:linear-gradient(to_bottom,#000_50%,transparent_90%)] sm:-translate-x-6">
                                        <div className="relative h-96 overflow-hidden rounded-[1.5rem] border border-dark_cyan-400 dark:border-dark_cyan-700 p-2 pb-12 before:absolute before:inset-0 before:bg-[repeating-linear-gradient(-45deg,var(--border),var(--border)_1px,transparent_1px,transparent_6px)] before:opacity-20"></div>
                                    </div>
                                    <div className="bg-isabelline-400 dark:bg-rich_black-400 border-dark_cyan-300/50 dark:border-dark_cyan-600/50 mx-auto w-80 translate-x-4 rounded-[2rem] border p-2 backdrop-blur-3xl [mask-image:linear-gradient(to_bottom,#000_50%,transparent_90%)] sm:translate-x-8">
                                        <div className="bg-isabelline-500 dark:bg-rich_black-500 space-y-2 overflow-hidden rounded-[1.5rem] border border-dark_cyan-400 dark:border-dark_cyan-700 p-2 shadow-xl dark:shadow-rich_black-600/50 dark:backdrop-blur-3xl">
                                            <div className="flex justify-center items-center p-4">
                                                <Image
                                                    src={getImagePath("/images/products/sokay-A1-microphone-buy-350x350.png")}
                                                    alt="Sokay A1 Microphone"
                                                    width={250}
                                                    height={250}
                                                    className="object-contain"
                                                    unoptimized={process.env.NEXT_PUBLIC_SHOW_IMAGES_LOCALLY === 'true'}
                                                />
                                            </div>

                                            <div className="bg-gradient-to-br from-isabelline-400 to-isabelline-500 dark:from-rich_black-400 dark:to-rich_black-500 rounded-[1rem] p-4 pb-16 dark:bg-dark_cyan-900/5 shadow-inner">
                                                <div className="space-y-3">
                                                    <div className="text-rich_black-500 dark:text-isabelline-500 border-b border-dark_cyan-300/70 dark:border-dark_cyan-700/50 pb-3 text-sm font-medium">Sokay A1 Microphone - Studio-grade condenser with noise cancellation</div>
                                                    <div className="space-y-3">
                                                        <div className="space-y-1">
                                                            <div className="space-x-1">
                                                                <span className="text-rich_black-500 dark:text-isabelline-500 align-baseline text-xl font-medium">Premium</span>
                                                                <span className="text-rich_black-400 dark:text-isabelline-400 text-xs">Quality</span>
                                                            </div>
                                                            <div className="flex h-5 items-center rounded bg-light_blue-500 dark:bg-light_blue-700 px-2 text-xs text-rich_black-500 dark:text-mint_cream-500">Studio Grade</div>
                                                        </div>
                                                        <div className="space-y-1">
                                                            <div className="space-x-1">
                                                                <span className="text-rich_black-500 dark:text-isabelline-500 align-baseline text-xl font-medium">Professional</span>
                                                                <span className="text-rich_black-400 dark:text-isabelline-400 text-xs">Audio Equipment</span>
                                                            </div>
                                                            <div className="flex h-5 items-center rounded bg-rich_black-500 dark:bg-rich_black-600 px-2 text-xs text-mint_cream-500">Noise Cancellation</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="absolute inset-0 bg-[radial-gradient(#588b8b_1px,transparent_1px)] dark:bg-[radial-gradient(#007670_1px,transparent_1px)] mix-blend-overlay [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 dark:opacity-20" />
                                </div>
                            </AnimatedGroup>
                        </div>
                    </div>
                </section>
                <LogoCloud />
            </main>
        </>
    )
}


const LogoCloud = () => {
    return (
        <section className="bg-isabelline-700 dark:bg-background pb-16 md:pb-32">
            <div className="group relative m-auto max-w-6xl px-6">
                <div className="flex flex-col items-center md:flex-row">
                    <div className="inline md:max-w-44 md:border-r md:border-dark_cyan-500 dark:md:border-rich_black-600 md:pr-6">
                        <p className="text-end text-sm text-rich_black-500 dark:text-dark_cyan-500 font-medium">Trusted by professionals</p>
                    </div>
                    <div className="relative py-6 md:w-[calc(100%-11rem)]">
                        <InfiniteSlider
                            speedOnHover={20}
                            speed={40}
                            gap={112}>
                            <div className="flex">
                                <span className="text-rich_black-500 dark:text-dark_cyan-500 font-semibold">STUDIO ONE</span>
                            </div>
                            <div className="flex">
                                <span className="text-rich_black-500 dark:text-dark_cyan-500 font-semibold">ABBEY ROAD</span>
                            </div>
                            <div className="flex">
                                <span className="text-rich_black-500 dark:text-dark_cyan-500 font-semibold">SONY MUSIC</span>
                            </div>
                            <div className="flex">
                                <span className="text-rich_black-500 dark:text-dark_cyan-500 font-semibold">UNIVERSAL</span>
                            </div>
                            <div className="flex">
                                <span className="text-rich_black-500 dark:text-dark_cyan-500 font-semibold">WARNER</span>
                            </div>
                            <div className="flex">
                                <span className="text-rich_black-500 dark:text-dark_cyan-500 font-semibold">ATLANTIC</span>
                            </div>
                            <div className="flex">
                                <span className="text-rich_black-500 dark:text-dark_cyan-500 font-semibold">CAPITOL</span>
                            </div>
                            <div className="flex">
                                <span className="text-rich_black-500 dark:text-dark_cyan-500 font-semibold">INTERSCOPE</span>
                            </div>
                        </InfiniteSlider>

                        <div className="bg-gradient-to-r from-isabelline-700 dark:from-rich_black-500 absolute inset-y-0 left-0 w-20"></div>
                        <div className="bg-gradient-to-l from-isabelline-700 dark:from-rich_black-500 absolute inset-y-0 right-0 w-20"></div>
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
        </section>
    )
}
