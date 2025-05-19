"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mic, Cable, Sliders, Headphones, Music } from "lucide-react";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";
import { motion } from "framer-motion";
import { getImagePath } from "@/lib/utils";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";

// Product images mapping
const productImages = {
  'sokay-a1': '/images/products/placeholder.svg',
  'sokay-cs22': '/images/products/placeholder.svg',
  'sokay-cs22a': '/images/products/placeholder.svg',
  'headphones': '/images/products/placeholder.svg',
  'cables': '/images/products/placeholder.svg'
};

// Custom product icon components that include product images
const ProductIcon = ({ productId, size = 24 }: { productId: string, size?: number }) => {
  // Add a dark background for all products to ensure consistency
  const bgClass = "bg-gray-800";

  return (
    <div className={`relative w-full h-full rounded-full overflow-hidden flex items-center justify-center ${bgClass}`}>
      <Image
        src={getImagePath(productImages[productId as keyof typeof productImages] || '/images/products/placeholder.svg')}
        alt={productId}
        width={size * 2.5}
        height={size * 2.5}
        className="object-contain scale-125"
        unoptimized={process.env.NEXT_PUBLIC_SHOW_IMAGES_LOCALLY === 'true'}
      />
    </div>
  );
};

// Convert existing product data to timeline format
const productTimelineData = [
  {
    id: 1,
    title: "Sokay A1 Microphone",
    date: "Premium",
    content: "Studio-grade condenser microphone with noise cancellation. Features include Noise Cancellation, Studio Grade, and Quality Tone.",
    category: "Microphone",
    icon: ({ size }: { size: number }) => <ProductIcon productId="sokay-a1" size={size} />,
    relatedIds: [2, 3],
    status: "completed" as const,
    energy: 100,
  },
  {
    id: 2,
    title: "Sokay CS-22",
    date: "Professional",
    content: "Professional audio interface with dual XLR inputs. Features include Dual XLR, Low Latency, and 24-bit/192kHz audio quality.",
    category: "Interface",
    icon: ({ size }: { size: number }) => <ProductIcon productId="sokay-cs22" size={size} />,
    relatedIds: [1, 3],
    status: "completed" as const,
    energy: 90,
  },
  {
    id: 3,
    title: "Sokay CS-22A",
    date: "Advanced",
    content: "Advanced audio interface with premium preamps. Features include Premium Preamps, MIDI I/O, and USB-C connectivity.",
    category: "Interface",
    icon: ({ size }: { size: number }) => <ProductIcon productId="sokay-cs22a" size={size} />,
    relatedIds: [1, 2, 4],
    status: "completed" as const,
    energy: 95,
  },
  {
    id: 4,
    title: "Sokay M-424 Headphones",
    date: "Premium",
    content: "Experience precise sound reproduction with the Sokay M-424 headphones. Designed for producers, mixing and mastering engineers, music listeners, and audiophiles alike.",
    category: "Headphones",
    icon: ({ size }: { size: number }) => <ProductIcon productId="headphones" size={size} />,
    relatedIds: [1, 3],
    status: "pending" as const,
    energy: 80,
  },
  {
    id: 5,
    title: "Sokay Premium Cables",
    date: "Coming Soon",
    content: "Premium XLR and instrument cables with gold-plated connectors for superior signal transfer.",
    category: "Accessories",
    icon: ({ size }: { size: number }) => <ProductIcon productId="cables" size={size} />,
    relatedIds: [1, 2, 3],
    status: "pending" as const,
    energy: 70,
  },
];

export default function ProductShowcaseOrbital() {
  // Use state to force re-render after component mounts
  const [mounted, setMounted] = useState(false);

  // Force a re-render after component mounts
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      className="relative min-h-screen py-32 bg-black overflow-hidden"
      id="features"
      style={{ position: 'relative' }}
    >
      {/* Use inline styles to ensure proper z-indexing */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0
      }}>
        {mounted && (
          <CanvasRevealEffect
            animationSpeed={0.8}
            containerClassName="bg-black"
            colors={[
              [38, 82, 125], // prussian_blue-600 (#26527d)
              [147, 183, 190] // light_blue (#93b7be)
            ]}
            opacities={[0.2, 0.2, 0.2, 0.3, 0.3, 0.3, 0.4, 0.4, 0.4, 0.5]}
            dotSize={5}
            showGradient={false}
          />
        )}
      </div>
      <div className="container relative z-10 px-4 mx-auto" style={{ position: 'relative', zIndex: 10 }}>
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h2
            className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Our Professional <span className="text-light_blue">Audio Solutions</span>
          </motion.h2>
          <motion.p
            className="text-lg text-white max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            From our top-of-the-line Sokay A1 microphones to the versatile Sokay CS-22 audio interfaces, our products are designed to elevate your sound experience.
          </motion.p>
        </div>

        <div className="h-[600px] sm:h-[600px] md:h-[700px] w-full relative flex items-center justify-center">
          <div className="relative z-10 w-full h-full">
            <RadialOrbitalTimeline
              timelineData={productTimelineData}
            />
          </div>
        </div>

        <div className="mt-16 text-center relative" style={{ position: 'relative', zIndex: 20 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link
              href="/store"
              className="inline-flex items-center justify-center h-12 px-8 py-3 border border-light_blue/50 text-white bg-light_blue hover:bg-light_blue/80 hover:border-white rounded-md transition-all duration-300 backdrop-blur-sm hover:scale-105"
              style={{ position: 'relative', zIndex: 20 }}
            >
              View All Products
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
